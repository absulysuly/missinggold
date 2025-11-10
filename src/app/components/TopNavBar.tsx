"use client";

import Link from "next/link";
import type { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type JSX,
} from "react";

import { useLanguage } from "./LanguageProvider";
import { useTranslations } from "../hooks/useTranslations";

const MOBILE_BREAKPOINT = 768;
const SHOW_TOP_BANNER = process.env.NEXT_PUBLIC_SHOW_TOP_BANNER === "true";

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ar", label: "العربية", flag: "🇮🇶" },
  { code: "ku", label: "کوردی", flag: "🇮🇶" },
] as const;

const PRIMARY_LINKS = [
  { slug: "/", labelKey: "navigation.home", accent: "events" },
  { slug: "/events", labelKey: "navigation.events", accent: "events" },
  { slug: "/hotels", label: "Hotels", accent: "hotels" },
  { slug: "/restaurants", label: "Restaurants", accent: "restaurants" },
  { slug: "/tourism", label: "Tourism", accent: "tourism" },
  { slug: "/categories", labelKey: "navigation.categories", accent: "events" },
  { slug: "/about", labelKey: "navigation.about", accent: "events" },
] as const;

type SupportedLanguage = (typeof LANGUAGE_OPTIONS)[number]["code"];
type PrimaryLink = (typeof PRIMARY_LINKS)[number];

type NavigationLink = PrimaryLink & { href: string; label: string };

type LanguageOption = (typeof LANGUAGE_OPTIONS)[number];
type LanguageValue = ReturnType<typeof useLanguage>["language"];

const languageLabel = (option: LanguageOption): string =>
  `${option.flag} ${option.label}`;

const buildLocalizedPath = (
  basePath: string,
  slug: PrimaryLink["slug"] | "/login" | "/register" | "/dashboard"
): string => {
  if (!slug.startsWith("/")) {
    throw new Error(`Expected slug to start with "/": ${slug}`);
  }

  return `${basePath}${slug}`.replace(/\/{2,}/g, "/");
};

const getBasePath = (language: SupportedLanguage): string =>
  language === "en" ? "" : `/${language}`;

const TopBanner = ({
  registerPath,
  isRTL,
  translate,
}: {
  registerPath: string;
  isRTL: boolean;
  translate: (key: string) => string;
}): JSX.Element | null => {
  if (!SHOW_TOP_BANNER) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 text-center text-sm font-medium">
      🎉 {translate("navigation.aiRecommendations")}
      <Link
        href={registerPath}
        className="underline ml-2 font-semibold hover:text-yellow-300"
      >
        {translate("navigation.tryItFree")} {isRTL ? "←" : "→"}
      </Link>
    </div>
  );
};

const AccountActions = ({
  session,
  loginPath,
  registerPath,
  dashboardPath,
  onLogout,
  translate,
}: {
  session: Session | null;
  loginPath: string;
  registerPath: string;
  dashboardPath: string;
  onLogout: () => void;
  translate: (key: string) => string;
}): JSX.Element => {
  if (session) {
    const userInitial = (
      session.user?.name?.charAt(0) ??
      session.user?.email?.charAt(0) ??
      "U"
    ).toUpperCase();

    return (
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {userInitial}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-800">
              {session.user?.name ?? "User"}
            </span>
            <span className="text-xs text-gray-500">
              {session.user?.email ?? ""}
            </span>
          </div>
        </div>
        <Link
          href={dashboardPath}
          className="inline-block px-3 py-1.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          {translate("navigation.dashboard")}
        </Link>
        <button
          onClick={onLogout}
          className="text-gray-600 hover:text-red-600 font-medium transition-colors hidden md:block"
          type="button"
        >
          {translate("navigation.logout")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href={loginPath}
        className="inline-block px-4 py-1.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
      >
        {translate("navigation.login")}
      </Link>
      <Link
        href={registerPath}
        className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500 text-purple-600 font-semibold hover:bg-purple-50 transition-colors"
      >
        <span>✨</span>
        {translate("navigation.tryItFree")}
      </Link>
    </div>
  );
};

const LanguageMenu = ({
  language,
  isRTL,
  onLanguageChange,
}: {
  language: SupportedLanguage;
  isRTL: boolean;
  onLanguageChange: (lang: SupportedLanguage) => void;
}): JSX.Element => {
  const activeLanguageLabel = useMemo(() => {
    const activeOption = LANGUAGE_OPTIONS.find(
      (option) => option.code === language
    );

    return activeOption ? languageLabel(activeOption) : languageLabel(LANGUAGE_OPTIONS[0]);
  }, [language]);

  return (
    <div className="relative group hidden sm:block" data-testid="language-switcher">
      <button
        className="flex items-center gap-2 px-3 py-2 font-medium transition-colors rounded-full"
        style={{ color: "var(--text-primary)" }}
        type="button"
      >
        <span className="text-lg">🌐</span>
        <span className="text-sm" suppressHydrationWarning>
          {activeLanguageLabel}
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
            key={option.code}
            onClick={() => onLanguageChange(option.code)}
            className="w-full px-4 py-2 text-left transition-colors rounded-lg hover:bg-white/10"
            style={{
              color:
                language === option.code
                  ? "var(--events-color)"
                  : "var(--text-primary)",
            }}
            type="button"
          >
            {languageLabel(option)}
          </button>
        ))}
      </div>
    </div>
  );
};

const MobileLanguageMenu = ({
  language,
  onLanguageChange,
  translate,
}: {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  translate: (key: string) => string;
}): JSX.Element => (
  <div className="pt-4 border-t border-gray-100 mt-4">
    <div className="text-sm text-gray-600 mb-2">{translate("navigation.language")}</div>
    <div className="flex gap-2">
      {LANGUAGE_OPTIONS.map((option) => (
        <button
          key={option.code}
          onClick={() => onLanguageChange(option.code)}
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            language === option.code
              ? "bg-purple-100 text-purple-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          type="button"
        >
          {option.flag}
        </button>
      ))}
    </div>
  </div>
);

const DesktopLinks = ({ links }: { links: NavigationLink[] }): JSX.Element => (
  <div className="hidden md:flex items-center gap-8">
    {links.slice(0, 5).map(({ href, label, accent }) => (
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
);

const MobileLinks = ({
  links,
  loginPath,
  registerPath,
  hasSession,
  translate,
  onClose,
}: {
  links: NavigationLink[];
  loginPath: string;
  registerPath: string;
  hasSession: boolean;
  translate: (key: string) => string;
  onClose: () => void;
}): JSX.Element => (
  <div className="flex flex-col gap-4">
    {links.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
        onClick={onClose}
      >
        {label}
      </Link>
    ))}

    {!session && (
      <div className="flex gap-3 pt-2">
        <Link
          href={loginPath}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2"
          onClick={onClose}
        >
          <span>🔑</span>
          {translate("navigation.login")}
        </Link>
        <Link
          href={registerPath}
          className="border border-purple-500 text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors"
          onClick={onClose}
        >
          {translate("navigation.tryItFree")}
        </Link>
      </div>
    )}
  </div>
);

export function TopNavBar(): JSX.Element {
  const { data: session } = useSession();
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslations();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentLanguage = language as SupportedLanguage;

  const basePath = useMemo(() => getBasePath(currentLanguage), [currentLanguage]);

  const navigationLinks = useMemo<NavigationLink[]>(() => {
    return PRIMARY_LINKS.map((link) => ({
      ...link,
      href: buildLocalizedPath(basePath, link.slug),
      label: link.label ?? (link.labelKey ? t(link.labelKey) : ""),
    }));
  }, [basePath, t]);

  const loginPath = useMemo(
    () => buildLocalizedPath(basePath, "/login"),
    [basePath]
  );
  const registerPath = useMemo(
    () => buildLocalizedPath(basePath, "/register"),
    [basePath]
  );
  const dashboardPath = useMemo(
    () => buildLocalizedPath(basePath, "/dashboard"),
    [basePath]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.innerWidth < MOBILE_BREAKPOINT) {
      setIsMenuOpen(true);
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleLanguageChange = useCallback(
    (target: SupportedLanguage) => {
      setLanguage(target as LanguageValue);
    },
    [setLanguage]
  );

  return (
    <>
      <TopBanner
        registerPath={registerPath}
        isRTL={isRTL}
        translate={t}
      />

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

            <DesktopLinks links={navigationLinks} />

            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <LanguageMenu
                language={currentLanguage}
                isRTL={isRTL}
                onLanguageChange={handleLanguageChange}
              />

              <Link
                href={registerPath}
                className="neon-button tourism tourism-glow"
                style={{ fontSize: "0.9rem", padding: "8px 16px" }}
              >
                <span>+</span>
                {t("navigation.createEvent")}
              </Link>

              <AccountActions
                session={session ?? null}
                loginPath={loginPath}
                registerPath={registerPath}
                dashboardPath={dashboardPath}
                onLogout={() => signOut()}
                translate={t}
              />

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
            <MobileLinks
              links={navigationLinks}
              loginPath={loginPath}
              registerPath={registerPath}
              hasSession={Boolean(session)}
              translate={t}
              onClose={closeMenu}
            />

            <MobileLanguageMenu
              language={currentLanguage}
              onLanguageChange={handleLanguageChange}
              translate={t}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default TopNavBar;
