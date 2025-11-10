"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useLanguage } from "./LanguageProvider";
import { useTranslations } from "../hooks/useTranslations";

type SupportedLanguage = "en" | "ar" | "ku";

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: "English",
  ar: "العربية",
  ku: "کوردی",
};

const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  en: "🇺🇸",
  ar: "🇮🇶",
  ku: "🇮🇶",
};

const LANGUAGE_OPTIONS: SupportedLanguage[] = ["en", "ar", "ku"];

const MOBILE_BREAKPOINT = 768;

const TopNavBar = () => {
  const { data: session } = useSession();
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslations();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showTopBanner = useMemo(
    () => process.env.NEXT_PUBLIC_SHOW_TOP_BANNER === "true",
    []
  );

  const basePath = useMemo(
    () => (language === "en" ? "" : `/${language}`),
    [language]
  );

  const languageDisplay = useMemo(() => {
    const label = LANGUAGE_LABELS[language as SupportedLanguage] ?? "Language";
    const flag = LANGUAGE_FLAGS[language as SupportedLanguage] ?? "🌐";
    return `${flag} ${label}`;
  }, [language]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleLanguageChange = useCallback(
    (targetLanguage: SupportedLanguage) => {
      setLanguage(targetLanguage as any);
    },
    [setLanguage]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.innerWidth < MOBILE_BREAKPOINT) {
      setIsMenuOpen(true);
    }
  }, []);

  const navigationLinks = useMemo(
    () => [
      { href: `${basePath}/`, label: t("navigation.home"), accent: "events" },
      {
        href: `${basePath}/events`,
        label: t("navigation.events"),
        accent: "events",
      },
      {
        href: `${basePath}/hotels`,
        label: "Hotels",
        accent: "hotels",
      },
      {
        href: `${basePath}/restaurants`,
        label: "Restaurants",
        accent: "restaurants",
      },
      {
        href: `${basePath}/tourism`,
        label: "Tourism",
        accent: "tourism",
      },
      {
        href: `${basePath}/categories`,
        label: t("navigation.categories"),
        accent: "events",
      },
      {
        href: `${basePath}/about`,
        label: t("navigation.about"),
        accent: "events",
      },
    ],
    [basePath, t]
  );

  const loginPath = language === "en" ? "/login" : `/${language}/login`;
  const registerPath =
    language === "en" ? "/register" : `/${language}/register`;
  const dashboardPath =
    language === "en" ? "/dashboard" : `/${language}/dashboard`;

  return (
    <>
      {showTopBanner && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 text-center text-sm font-medium">
          🎉 {t("navigation.aiRecommendations")}
          <Link
            href={registerPath}
            className="underline ml-2 font-semibold hover:text-yellow-300"
          >
            {t("navigation.tryItFree")} {isRTL ? "←" : "→"}
          </Link>
        </div>
      )}

      <nav className="neon-nav events-glow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link
              href={basePath || "/"}
              className="group flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-var(--events-color) via-var(--tourism-color) to-var(--hotels-color) rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 events-glow">
                <span className="text-white font-bold text-lg">🇮🇶</span>
              </div>
              <div>
                <span
                  className="text-2xl font-bold text-white neon-glow"
                  style={{
                    color: "var(--text-primary)",
                    textShadow: "0 0 10px var(--events-color)",
                  }}
                >
                  IraqGuide
                </span>
                <div
                  className="text-xs font-medium -mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t("navigation.eventPlatform")}
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navigationLinks.slice(0, 5).map(({ href, label, accent }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-medium transition-colors relative group"
                  style={{ color: "var(--text-primary)" }}
                >
                  {label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{
                      backgroundColor: `var(--${accent}-color)`,
                      boxShadow: `0 0 5px var(--${accent}-color)`,
                    }}
                  />
                </Link>
              ))}
            </div>

            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="relative group hidden sm:block" data-testid="language-switcher">
                <button
                  className="flex items-center gap-2 px-3 py-2 font-medium transition-colors rounded-full"
                  style={{ color: "var(--text-primary)" }}
                  type="button"
                >
                  <span className="text-lg">🌐</span>
                  <span className="text-sm" suppressHydrationWarning>
                    {languageDisplay}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`absolute ${isRTL ? "left-0" : "right-0"} top-full mt-1 rounded-lg min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50`}
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--events-color)",
                  }}
                >
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleLanguageChange(option)}
                      className="w-full px-4 py-2 text-left transition-colors rounded-lg hover:bg-white/10"
                      style={{
                        color:
                          language === option
                            ? "var(--events-color)"
                            : "var(--text-primary)",
                      }}
                      type="button"
                    >
                      {LANGUAGE_FLAGS[option]} {LANGUAGE_LABELS[option]}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                href={session ? dashboardPath : registerPath}
                className="neon-button tourism tourism-glow"
                style={{ fontSize: "0.9rem", padding: "8px 16px" }}
              >
                <span>+</span>
                {t("navigation.createEvent")}
              </Link>

              {session ? (
                <div className="flex items-center gap-4">
                  <div className="hidden lg:flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {(
                          session.user?.name?.charAt(0) ??
                          session.user?.email?.charAt(0) ??
                          "U"
                        ).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        {session.user?.name ?? "User"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {session.user?.email}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={dashboardPath}
                    className="inline-block px-3 py-1.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
                  >
                    {t("navigation.dashboard")}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-600 hover:text-red-600 font-medium transition-colors hidden md:block"
                    type="button"
                  >
                    {t("navigation.logout")}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href={loginPath}
                    className="inline-block px-4 py-1.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
                  >
                    {t("navigation.login")}
                  </Link>
                </div>
              )}

              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-700 hover:text-purple-600 transition-colors"
                type="button"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            id="mobile-nav"
            className={`md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-md ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-4">
              {navigationLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {!session && (
                <div className="flex gap-3 pt-2">
                  <Link
                    href={loginPath}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>🔑</span>
                    {t("navigation.login")}
                  </Link>
                  <Link
                    href={registerPath}
                    className="border border-purple-500 text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("navigation.tryItFree")}
                  </Link>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 mt-4">
                <div className="text-sm text-gray-600 mb-2">
                  {t("navigation.language")}
                </div>
                <div className="flex gap-2">
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleLanguageChange(option)}
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        language === option
                          ? "bg-purple-100 text-purple-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      type="button"
                    >
                      {LANGUAGE_FLAGS[option]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNavBar;

