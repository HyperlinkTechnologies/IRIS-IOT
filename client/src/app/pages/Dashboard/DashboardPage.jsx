import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";

import { HamburgerIcon, Menu, PanelLeftCloseIcon } from "lucide-react";

import { useUser } from "../../../context/UserContext";
import { getUser, createUser } from "../../services/user.service";

import { signOut } from "aws-amplify/auth";
import { BillingProvider } from "../../../context/BillingContext";
import { startSessionTimeout } from "../../core/security/sessionTimeout";

import {
  createSession,
  deleteSession,
  updateSessionActivity,
} from "../../services/session.service";

/* ================= PAGES ================= */

import DashboardHome from "./DashboardHome";

import DevicesPage from "./Devicespage";

import AlertsPage from "./AlertsPage";

import BillingPage from "./BillingPage";

import SettingsPage from "./SettingsPage";

import GetStartedPage from "./GetStartedPage";

import DocumentationPage from "./DocumentationPage";

import AnalyticsPage from "./AnalyticsPage";

import PrivacyPolicyPage from "./Legal/PrivacyPolicyPage";
import TermsConditionsPage from "./Legal/TermsConditionsPage";
import LicensesPage from "./Legal/LicensesPage";

/* ================= COMPONENTS ================= */

import Sidebar from "../../components/Layout/Sidebar";

import Topbar from "../../components/Layout/Topbar";

import ToastListener from "../../components/Alerts/ToastListener";

import { sendLoginAlert } from "../../services/loginAlertService";

export default function DashboardPage() {
  /* ================= STATES ================= */

  const [activeTab, setActiveTab] = useState("getstarted");

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [appLoading, setAppLoading] = useState(true);

  const navigate = useNavigate();

  const { user, setUser } = useUser();

  /* ================= AUTH CHECK ================= */

  useEffect(() => {
    const checkUser = async () => {
      try {
        /* Current Cognito User */

        const user = await getCurrentUser();

        /* Current Session */

        const session = await fetchAuthSession();

        /* User Data */

        const payload = session.tokens?.idToken?.payload;

        const userData = {
          username:
            payload?.name ||
            payload?.preferred_username ||
            payload?.email?.split("@")[0] ||
            "User",

          email: payload?.email || "",
        };

        /* Store User */
        const userId = user.userId;

        let profile;

        try {
          profile = await getUser(userId);
        } catch (error) {
          if (error.status === 404) {
            profile = await createUser({
              userId,
              username: userData.username,
              email: userData.email,
              image: "",
              fullName: "",
              jobTitle: "",
              phone: "",
            });
          } else {
            throw error;
          }
        }

        // Store in React Context
        setUser(profile);
        const existingSession = sessionStorage.getItem("iris_session_id");

        const ua = navigator.userAgent;

        let deviceName = "Unknown Device";
        let browser = "Unknown";
        let browserVersion = "";
        let os = "Unknown";

        if (!existingSession) {
          /* ================= OS ================= */

          if (ua.includes("Windows NT 10.0")) {
            os = "Windows 10/11";
            deviceName = "Windows PC";
          } else if (ua.includes("Windows")) {
            os = "Windows";
            deviceName = "Windows PC";
          } else if (ua.includes("Android")) {
            os = "Android";
            deviceName = "Android Device";
          } else if (ua.includes("iPhone")) {
            os = "iPhone";
            deviceName = "iPhone";
          } else if (ua.includes("iPad")) {
            os = "iPad";
            deviceName = "iPad";
          } else if (ua.includes("Mac")) {
            os = "macOS";
            deviceName = "Mac";
          } else if (ua.includes("Linux")) {
            os = "Linux";
            deviceName = "Linux PC";
          }

          /* ================= Browser ================= */

          if (ua.includes("Edg/")) {
            browser = "Microsoft Edge";
            browserVersion = ua.match(/Edg\/([\d.]+)/)?.[1] ?? "";
          } else if (ua.includes("Chrome/")) {
            browser = "Google Chrome";
            browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] ?? "";
          } else if (ua.includes("Firefox/")) {
            browser = "Mozilla Firefox";
            browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] ?? "";
          } else if (ua.includes("Safari/") && ua.includes("Version/")) {
            browser = "Safari";
            browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] ?? "";
          }

          const session = await createSession({
            userId,
            device: deviceName,
            browser,
            browserVersion,
            os,
            ipAddress: "",
          });

          sessionStorage.setItem("iris_session_id", session.sessionId);
        }

        const isFreshLogin =
          sessionStorage.getItem("iris_fresh_login") === "true";

        if (isFreshLogin && profile.loginAlerts) {
          try {
            await sendLoginAlert({
              email: profile.email,
              name:
                profile.fullName ||
                profile.username ||
                profile.email.split("@")[0],
              loginTime: new Date().toLocaleString(),
              device: deviceName,
              browser,
              browserVersion,
              os,
            });
          } catch (error) {
            console.error("Login alert failed:", error);
          }

          sessionStorage.removeItem("iris_fresh_login");
        }
      } catch (error) {
        console.error("AUTH ERROR:", error);

        /* Remove Invalid User */

        localStorage.removeItem("iris_user");

        /* Redirect to Home */

        navigate("/");
      } finally {
        setAppLoading(false);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    if (user.sessionTimeout === "never") {
      return;
    }

    const cleanup = startSessionTimeout(user.sessionTimeout ?? 30, async () => {
      try {
        const sessionId = sessionStorage.getItem("iris_session_id");

        if (sessionId) {
          await deleteSession(sessionId);
          sessionStorage.removeItem("iris_session_id");
        }

        await signOut();
      } catch (error) {
        console.error(error);
      }

      setUser(null);
      window.location.href = "/";
    });

    return cleanup;
  }, [user, setUser]);

  useEffect(() => {
    const sessionId = sessionStorage.getItem("iris_session_id");

    if (!sessionId) return;

    let lastUpdate = 0;

    const update = async () => {
      const now = Date.now();

      if (now - lastUpdate < 60000) return;

      lastUpdate = now;

      try {
        await updateSessionActivity(sessionId);
      } catch (error) {
        console.error(error);
      }
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    events.forEach((event) => window.addEventListener(event, update));

    return () => {
      events.forEach((event) => window.removeEventListener(event, update));
    };
  }, []);

  if (appLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#ff5700] rounded-full animate-spin" />

        <p className="mt-4 text-gray-500">Loading IRIS...</p>
      </div>
    );
  }
  return (
    <div
      className="
        flex
        h-screen
        bg-white
        overflow-hidden
      "
    >
      {/* ================= SIDEBAR ================= */}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* ================= MAIN ================= */}
      <BillingProvider>
        <main
          className={`
          flex-1
          flex
          flex-col
          overflow-hidden
          transition-all
          duration-300
         ${sidebarOpen ? "lg:ml-60" : "lg:ml-20"}
        `}
        >
          {/* ================= FIXED TOPBAR ================= */}

          <header
            className="
    fixed
    top-0
    left-0
    right-0
    h-20
    z-50
    m-2
    mr-6
    rounded-xl
    bg-gray-300
    flex
    items-center
    px-4
    sm:px-6
    lg:px-5
  "
          >
            {/* ================= SIDEBAR TOGGLE ================= */}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="
      w-11
      h-11
      min-w-11
      rounded-lg
      cursor-pointer
      border
      border-black/10
      flex
      items-center
      justify-center
      bg-white
      hover:bg-gray-100
      transition-all
      shadow-sm
      mr-10
    "
            >
              <Menu size={24} />
            </button>

            {/* ================= TOPBAR ================= */}

            <div className="flex-1">
              <Topbar
                activeTab={activeTab}
                showProfileMenu={showProfileMenu}
                setShowProfileMenu={setShowProfileMenu}
                setActiveTab={setActiveTab}
              />

              <ToastListener />
            </div>
          </header>

          {/* ================= CONTENT ================= */}

          <section
            className="
            flex-1
            overflow-y-auto
            pt-24
            p-2
            sm:px-6
            lg:px-4
            custom-scrollbar

          "
          >
            {/* Dashboard */}

            {activeTab === "dashboard" && <DashboardHome />}

            {/* Devices */}

            {activeTab === "devices" && <DevicesPage />}

            {/* Alerts */}

            {activeTab === "alerts" && <AlertsPage />}

            {/* Billing */}

            {activeTab === "billing" && <BillingPage />}

            {/* Settings */}

            {activeTab === "settings" && (
              <SettingsPage setActiveTab={setActiveTab} />
            )}

            {/* Get Started */}

            {activeTab === "getstarted" && (
              <GetStartedPage setActiveTab={setActiveTab} />
            )}

            {/* Documentation */}

            {activeTab === "documentation" && <DocumentationPage />}

            {/* Analytics */}
            {activeTab === "analytics" && <AnalyticsPage />}

            {activeTab === "privacy-policy" && (
              <PrivacyPolicyPage setActiveTab={setActiveTab} />
            )}
            {activeTab === "terms-and-conditions" && (
              <TermsConditionsPage setActiveTab={setActiveTab} />
            )}
            {activeTab === "licenses" && (
              <LicensesPage setActiveTab={setActiveTab} />
            )}
          </section>
        </main>
      </BillingProvider>
    </div>
  );
}
