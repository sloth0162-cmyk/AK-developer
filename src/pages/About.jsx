import {
    ShieldCheck,
    FileCheck2,
    MapPinCheck,
    Building2,
    ArrowRight,
    Users,
    Home,
    Phone,
    MessageCircle,
} from "lucide-react";

import { Badge } from "../components/ui/badge";
import {
    Card,
    CardContent,
} from "../components/ui/card";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingAnimation from "../components/LoadingAnimation";

import { whatsappLink, callLink } from "../utils/contact";

function About() {
    const trustPoints = [
        {
            icon: ShieldCheck,
            title: "RERA Registered Projects",
            description:
                "We focus on RERA-registered projects and verified property information to help clients make informed decisions.",
        },
        {
            icon: FileCheck2,
            title: "Property Verification",
            description:
                "We give importance to property documentation and title verification before presenting projects to clients.",
        },
        {
            icon: MapPinCheck,
            title: "Site Visit Support",
            description:
                "Clients can visit the property and understand the location, surroundings, and development before making a decision.",
        },
        {
            icon: Building2,
            title: "Hyderabad Real Estate Expertise",
            description:
                "Backed by more than 10 years of experience in Hyderabad real estate, our team understands the city's growing property corridors.",
        },
    ];

    return (
        <>
            <LoadingAnimation />

            <Navbar />

            <section className="relative overflow-hidden bg-white py-20 lg:py-28">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
                <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                    {/* HERO */}
                    <div className="mx-auto max-w-3xl text-center">
                        <Badge
                            variant="secondary"
                            className="
                                mb-5 rounded-full
                                border border-blue-100
                                bg-blue-50 px-4 py-1.5
                                text-blue-700
                            "
                        >
                            About AK Developer
                        </Badge>

                        <h1
                            className="
                                text-3xl font-bold tracking-tight
                                text-slate-900
                                sm:text-4xl
                                lg:text-5xl
                            "
                        >
                            Experience in Real Estate.
                            <span className="text-blue-600">
                                {" "}Focus on Your Next Plot.
                            </span>
                        </h1>

                        <p
                            className="
                                mt-6 text-base leading-8
                                text-slate-600
                                sm:text-lg
                            "
                        >
                            AK Developer helps clients discover and purchase
                            residential plots across Hyderabad, backed by
                            years of practical experience in the city's
                            real-estate market.
                        </p>
                    </div>

                    {/* MAIN CONTENT */}
                    <div
                        className="
                            mt-16 grid gap-10
                            lg:grid-cols-[1.05fr_0.95fr]
                            lg:items-center
                        "
                    >
                        {/* LEFT */}
                        <div>
                            <p className="text-base leading-8 text-slate-600">
                                <span className="font-semibold text-slate-900">
                                    AK Developer
                                </span>{" "}
                                is a Hyderabad-focused real-estate company
                                specializing in residential plots. Our team
                                brings more than{" "}
                                <span className="font-semibold text-slate-900">
                                    10 years of real-estate experience
                                </span>{" "}
                                to the business, with practical knowledge of
                                Hyderabad's locations, development corridors,
                                and property market.
                            </p>

                            <p className="mt-5 text-base leading-8 text-slate-600">
                                Over the years, our team has helped{" "}
                                <span className="font-semibold text-slate-900">
                                    hundreds of families and clients
                                </span>{" "}
                                find and purchase properties. That experience
                                has helped us understand what buyers need when
                                they are making an important land investment.
                            </p>

                            <p className="mt-5 text-base leading-8 text-slate-600">
                                We believe buying a plot should involve more
                                than simply seeing photos or receiving
                                brochures. That's why we support{" "}
                                <span className="font-semibold text-slate-900">
                                    property and site visits
                                </span>
                                , giving clients the opportunity to see the
                                location, understand the surroundings, and
                                evaluate the property themselves.
                            </p>

                            <p className="mt-5 text-base leading-8 text-slate-600">
                                With dedicated teams for client coordination
                                and property visits, we aim to make the
                                process simpler, clearer, and more comfortable
                                for every buyer.
                            </p>

                            {/* CTA */}
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href={whatsappLink(
                                        "Hi, I am looking for plots in Hyderabad"
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        inline-flex items-center justify-center
                                        gap-2 rounded-xl
                                        bg-green-500 px-6 py-3
                                        font-medium text-white
                                        shadow
                                        transition
                                        hover:bg-green-600
                                        active:scale-95
                                    "
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    WhatsApp for Details
                                </a>

                                <a
                                    href={callLink()}
                                    className="
                                        inline-flex items-center justify-center
                                        gap-2 rounded-xl
                                        bg-blue-600 px-6 py-3
                                        font-medium text-white
                                        shadow
                                        transition
                                        hover:bg-blue-700
                                        active:scale-95
                                    "
                                >
                                    <Phone className="h-4 w-4" />
                                    Call Now
                                </a>
                            </div>
                        </div>

                        {/* STATS CARD */}
                        <Card
                            className="
                                overflow-hidden
                                rounded-3xl
                                border-slate-200
                                bg-slate-50/70
                                shadow-sm
                            "
                        >
                            <CardContent className="p-8">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="
                                            flex h-12 w-12 items-center
                                            justify-center rounded-2xl
                                            bg-blue-600 text-white
                                        "
                                    >
                                        <Users className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Our experience
                                        </p>

                                        <p className="text-3xl font-bold text-slate-900">
                                            10+ Years
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            in Hyderabad Real Estate
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 grid grid-cols-2 divide-x divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                    <div className="p-5">
                                        <p className="text-2xl font-bold text-blue-600">
                                            100+
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Plots Sold
                                        </p>
                                    </div>

                                    <div className="p-5">
                                        <p className="text-2xl font-bold text-blue-600">
                                            500+
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Families Served
                                        </p>
                                    </div>

                                    <div className="p-5">
                                        <p className="text-2xl font-bold text-blue-600">
                                            Hyderabad
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Our Market
                                        </p>
                                    </div>

                                    <div className="p-5">
                                        <p className="text-2xl font-bold text-blue-600">
                                            Site Visits
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Client Support
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* WHY CHOOSE US */}
                    <div className="mt-20">
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                                Why families choose us
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                                Experience that helps you decide better
                            </h2>

                            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                                Our goal is not simply to sell a plot. We want
                                clients to understand what they are buying,
                                where they are buying, and what makes a
                                location suitable for them.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {trustPoints.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Card
                                        key={item.title}
                                        className="
                                            group rounded-2xl
                                            border-slate-200
                                            bg-white
                                            transition-all duration-300
                                            hover:-translate-y-1
                                            hover:border-blue-200
                                            hover:shadow-lg
                                        "
                                    >
                                        <CardContent className="p-6">
                                            <div
                                                className="
                                                    flex h-11 w-11
                                                    items-center justify-center
                                                    rounded-xl
                                                    bg-blue-50
                                                    text-blue-600
                                                    transition-all duration-300
                                                    group-hover:bg-blue-600
                                                    group-hover:text-white
                                                "
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <h3 className="mt-5 font-semibold text-slate-900">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                                {item.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* SITE VISIT */}
                    <div className="mt-20 overflow-hidden rounded-3xl bg-slate-900">
                        <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
                            <div className="px-6 py-10 sm:px-10">
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                                    See it for yourself
                                </p>

                                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                                    Visit the property before you decide
                                </h2>

                                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                                    We encourage clients to visit properties
                                    personally. See the location, understand
                                    the surroundings, ask questions, and make
                                    your decision with a clearer picture of
                                    what you are buying.
                                </p>

                                <div className="mt-6">
                                    <a
                                        href={whatsappLink(
                                            "Hi, I would like to arrange a site visit for a plot in Hyderabad"
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            inline-flex items-center gap-2
                                            rounded-xl bg-white
                                            px-5 py-3
                                            font-medium text-slate-900
                                            transition
                                            hover:bg-slate-100
                                            active:scale-95
                                        "
                                    >
                                        Arrange a Site Visit
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>

                            <div className="hidden px-10 lg:block">
                                <Home className="h-24 w-24 text-blue-400/80" />
                            </div>
                        </div>
                    </div>

                    {/* FINAL CTA */}
                    <div className="mt-20 text-center">
                        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                            Looking for plots in Hyderabad?
                        </h2>

                        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
                            Talk to our team to explore available properties,
                            ask questions, or arrange a site visit.
                        </p>

                        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href={whatsappLink(
                                    "Hi, I am looking for plots in Hyderabad"
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex items-center justify-center
                                    gap-2 rounded-xl
                                    bg-green-500 px-6 py-3
                                    font-medium text-white shadow
                                    transition
                                    hover:bg-green-600
                                    active:scale-95
                                "
                            >
                                <MessageCircle className="h-4 w-4" />
                                WhatsApp for Details
                            </a>

                            <a
                                href={callLink()}
                                className="
                                    inline-flex items-center justify-center
                                    gap-2 rounded-xl
                                    bg-blue-600 px-6 py-3
                                    font-medium text-white shadow
                                    transition
                                    hover:bg-blue-700
                                    active:scale-95
                                "
                            >
                                <Phone className="h-4 w-4" />
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default About;