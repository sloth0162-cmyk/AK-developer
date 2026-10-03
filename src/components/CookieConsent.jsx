import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("analytics_consent");

    if (!consent) {
      setVisible(true);
      return;
    }

    // Restore previously selected consent
    if (consent === "granted") {
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    if (consent === "denied") {
      window.gtag?.("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  }, []);

  const acceptAnalytics = () => {
    localStorage.setItem("analytics_consent", "granted");

    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    setVisible(false);
  };

  const declineAnalytics = () => {
    localStorage.setItem("analytics_consent", "denied");

    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.banner}>
        <div style={styles.content}>
          <h3 style={styles.title}>We use analytics</h3>

          <p style={styles.text}>
            We use Google Analytics to understand how visitors use
            our website and improve our services. You can accept or
            decline analytics cookies.
          </p>

          <div style={styles.buttons}>
            <button
              onClick={declineAnalytics}
              style={styles.decline}
            >
              Decline
            </button>

            <button
              onClick={acceptAnalytics}
              style={styles.accept}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
    padding: "16px",
    pointerEvents: "none",
  },

  banner: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    pointerEvents: "auto",
  },

  content: {
    padding: "20px",
  },

  title: {
    margin: "0 0 8px",
    fontSize: "18px",
    fontWeight: 700,
    color: "#111827",
  },

  text: {
    margin: "0 0 16px",
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#4b5563",
  },

  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  decline: {
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#111827",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },

  accept: {
    border: "none",
    background: "#111827",
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
  },
};