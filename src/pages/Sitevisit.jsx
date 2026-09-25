import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createClient } from "../lib/client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarTwo from "../components/NavbarTwo";

const supabase = createClient();

function getLocalDate() {
  const now = new Date();

  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")}`;
}

function SiteVisit() {
  const location = useLocation();
  const navigate = useNavigate();

  // If user came from PropertyCard, area is already available.
  const propertyArea = location.state?.area || "";

  const [area, setArea] = useState(propertyArea);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [description, setDescription] = useState("");
  const [visitDate, setVisitDate] = useState("");

  const [user, setUser] = useState(null);
  const [hasSavedContact, setHasSavedContact] = useState(false);

  const [loadingUser, setLoadingUser] = useState(true);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get logged-in user and previous contact details
  useEffect(() => {
    async function loadUserDetails() {
      setLoadingUser(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (!user) {
        setLoadingUser(false);
        return;
      }

      // Find previous site-visit submissions from this user
      const { data, error } = await supabase
        .from("site_visits")
        .select("phone_number, email_id")
        .eq("user_id", user.id)
        .order("submitted_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error loading previous contact details:", error);
        setLoadingUser(false);
        return;
      }

      if (data && data.length > 0) {
        let savedPhone = "";
        let savedEmail = "";

        for (const visit of data) {
          if (!savedPhone && visit.phone_number) {
            savedPhone = visit.phone_number;
          }

          if (!savedEmail && visit.email_id) {
            savedEmail = visit.email_id;
          }

          if (savedPhone && savedEmail) {
            break;
          }
        }

        if (savedPhone || savedEmail) {
          setPhoneNumber(savedPhone);
          setEmailId(savedEmail);
          setHasSavedContact(true);
        }
      }

      setLoadingUser(false);
    }

    loadUserDetails();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setError("");

    // If the user has never submitted contact details before,
    // at least one contact method must be provided.
    if (!phoneNumber.trim() && !emailId.trim()) {
      setError(
        "Please provide at least your phone number or email address so we can contact you."
      );
      return;
    }

    if (!visitDate) {
      setError("Please select your preferred site visit date.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("site_visits")
      .insert([
        {
          user_id: user?.id || null,
          area: area.trim() || null,
          phone_number: phoneNumber.trim() || null,
          email_id: emailId.trim() || null,
          description: description.trim() || null,
          visit_date: visitDate,
        },
      ]);

    setLoading(false);

    if (error) {
      console.error("Site visit submission error:", error);
      setError("Something went wrong while submitting your request. Please try again.");
      return;
    }

    setMessage(
      "Your site visit request has been submitted. Our team will contact you soon to confirm the details."
    );

    // Don't erase saved contact details for logged-in users.
    setDescription("");
    setVisitDate("");

    if (!user) {
      setPhoneNumber("");
      setEmailId("");
    }
  }

  return <>
  <Navbar/>
  <NavbarTwo/>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Book a Site Visit
        </h1>

        <p className="text-gray-500 mb-8">
          Share your details and preferred visit date. Our team will get in
          touch with you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Area
            </label>

            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter property area (optional)"
              readOnly={Boolean(propertyArea)}
              className={`w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 outline-none ${
                propertyArea
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />

            {propertyArea && (
              <p className="text-xs text-gray-400 mt-2">
                Property area selected from your request.
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              pattern="[+]?[0-9]{10,15}"
              title="Enter 10 to 15 digits, optionally starting with +"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email ID
            </label>

            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          {/* Saved contact notification */}
          {!loadingUser && user && hasSavedContact && (
            <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
              <span className="text-emerald-600 text-lg leading-none">
                ✓
              </span>

              <p className="text-sm text-emerald-700">
                We found your previously saved contact details. You can submit
                the request directly or update them above.
              </p>
            </div>
          )}

          {/* Visit Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Site Visit Date
            </label>

            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              min={getLocalDate()}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-700"
            />

            <p className="text-xs text-gray-400 mt-2">
              Choose the day you would like to visit the property.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any requirements or preferred visit time?"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <span className="text-red-500 text-lg leading-none">
                !
              </span>

              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
              <span className="text-emerald-600 text-lg leading-none">
                ✓
              </span>

              <p className="text-sm font-medium text-emerald-700">
                {message}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-xl transition-colors"
          >
            {loading ? "Submitting..." : "Book Site Visit"}
          </button>

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full text-gray-500 hover:text-gray-800 font-semibold py-2"
          >
            Go Back
          </button>
        </form>
      </div>
    </div>
    <Footer/>
  </>
}

export default SiteVisit;