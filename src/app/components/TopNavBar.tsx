"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { useLanguage } from "./LanguageProvider";
import { useTranslations } from "../hooks/useTranslations";

type LanguageCode = "en" | "ar" | "ku";

interface LanguageOption {
  code: LanguageCode;
  label: string;
  shortLabel: string;
  flag: string;
}

interface NavLinkConfig {
  href: string;
  label: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "en", label: "English", shortLabel: "EN", flag: "🇺🇸" },
  { code: "ar", label: "العربية", shortLabel: "AR", flag: "🇮🇶" },
  { code: "ku", label: "کوردی", shortLabel: "KU", flag: "🇮🇶" },
];

function getLocalizedHref(language: LanguageCode, path: string): string {
  if (language === "en") {
    return path;
  }

  if (path === "/") {
    return `/${language}`;
  }

  return `/${language}${path}`;
}

export default function TopNavBar() {
  const { data: session } = useSession();
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentLanguage = language as LanguageCode;

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMenuOpen(true);
    }
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [language]);

  const topBannerEnabled = process.env.NEXT_PUBLIC_SHOW_TOP_BANNER === "true";

  const navLinks = useMemo<NavLinkConfig[]>(() => {
    return [
      { href: "/", label: t("navigation.home") },
      { href: "/events", label: t("navigation.events") },
      { href: "/hotels", label: "Hotels" },
      { href: "/restaurants", label: "Restaurants" },
      { href: "/tourism", label: "Tourism" },
    ];
  }, [t]);

  const handleLanguageSelect = (code: LanguageCode) => {
    setLanguage(code);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const renderLanguageOption = (option: LanguageOption, variant: "desktop" | "mobile") => {
    const isActive = option.code === language;
    const baseClasses =
      variant === "desktop"
        ? "flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left transition-colors"
        : "flex items-center gap-2 rounded-full px-3 py-1 text-sm transition-colors";

    const activeClasses =
      variant === "desktop"
        ? "bg-white/10 text-[color:var(--events-color)]"
        : "bg-purple-100 text-purple-600";

    const inactiveClasses =
      variant === "desktop"
        ? "text-[color:var(--text-primary)] hover:bg-white/10"
        : "text-gray-600 hover:bg-gray-100";

    return (
      <button
        key={option.code}
        type="button"
        onClick={() => handleLanguageSelect(option.code)}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      >
        <span aria-hidden>{option.flag}</span>
        <span>{variant === "desktop" ? option.label : option.shortLabel}</span>
      </button>
    );
  };

  return (
    <>
      {topBannerEnabled && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-2 text-center text-sm font-medium text-white">
          🎉 {t("navigation.aiRecommendations")}{" "}
          <Link
            className="ml-2 font-semibold underline transition-colors hover:text-yellow-300"
            href="/register"
          >
            {t("navigation.tryItFree")} {isRTL ? "←" : "→"}
          </Link>
        </div>
      )}

      <nav className="sticky top-0 z-50 bg-white/95 shadow-lg backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col px-4">
          <div className="flex h-16 items-center justify-between">
            <Link
              className="group flex items-center gap-3"
              href={getLocalizedHref(currentLanguage, "/")}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110">
                🇮🇶
              </div>
              <div>
                <span className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  IraqGuide
                </span>
                <div className="-mt-1 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                  {t("navigation.eventPlatform")}
                </div>
              </div>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  className="group relative font-medium transition-colors hover:text-purple-600"
                  href={getLocalizedHref(currentLanguage, link.href)}
                  style={{ color: "var(--text-primary)" }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="group relative hidden sm:block" data-testid="language-switcher">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full px-3 py-2 font-medium transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span aria-hidden>🌐</span>
                  <span className="text-sm" suppressHydrationWarning>
                    {LANGUAGE_OPTIONS.find((option) => option.code === language)?.label ?? "Language"}
                  </span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </button>
                <div
                  className={`absolute ${isRTL ? "left-0" : "right-0"} top-full mt-1 min-w-[180px] rounded-xl border border-purple-200 bg-white p-2 shadow-lg opacity-0 invisible transition-all duration-200 ease-out focus-within:opacity-100 group-hover:opacity-100 group-hover:visible`}
                >
                  {LANGUAGE_OPTIONS.map((option) => renderLanguageOption(option, "desktop"))}
                </div>
              </div>

              <Link
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
                href={getLocalizedHref(currentLanguage, session ? "/dashboard" : "/register")}
              >
                <span aria-hidden>+</span>
                {t("navigation.createEvent")}
              </Link>

              {session ? (
                <div className="flex items-center gap-4">
                  <div className="hidden items-center gap-3 lg:flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-semibold text-white">
                      {(session.user?.name ?? session.user?.email ?? "U").charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        {session.user?.name ?? "User"}
                      </span>
                      <span className="text-xs text-gray-500">{session.user?.email}</span>
                    </div>
                  </div>
                  <Link
                    className="rounded-full bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                    href={getLocalizedHref(currentLanguage, "/dashboard")}
                  >
                    {t("navigation.dashboard")}
                  </Link>
                  <button
                    type="button"
                    className="hidden text-sm font-medium text-gray-600 transition-colors hover:text-red-600 md:block"
                    onClick={() => signOut()}
                  >
                    {t("navigation.logout")}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                    href={getLocalizedHref(currentLanguage, "/login")}
                  >
                    {t("navigation.login")}
                  </Link>
                </div>
              )}

              <button
                type="button"
                className="text-gray-700 transition-colors hover:text-purple-600 md:hidden"
                onClick={toggleMenu}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </button>
            </div>
          </div>

          <div className={`md:hidden border-t border-gray-100 py-4 transition-all ${isMenuOpen ? "block" : "hidden"}`}>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  className="font-medium text-gray-700 transition-colors hover:text-purple-600"
                  href={getLocalizedHref(currentLanguage, link.href)}
                >
                  {link.label}
                </Link>
              ))}

              {!session && (
                <div className="flex gap-3 pt-2">
                  <Link
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition-transform hover:scale-105"
                    href={getLocalizedHref(currentLanguage, "/login")}
                  >
                    <span aria-hidden>🔑</span>
                    {t("navigation.login")}
                  </Link>
                  <Link
                    className="flex items-center gap-2 rounded-full border border-purple-200 px-4 py-2 font-semibold text-purple-600 transition-colors hover:bg-purple-50"
                    href={getLocalizedHref(currentLanguage, "/register")}
                  >
                    <span aria-hidden>✨</span>
                    {t("navigation.register")}
                  </Link>
                </div>
              )}

              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="mb-2 text-sm text-gray-600">{t("navigation.language")}</div>
                <div className="flex gap-2">
                  {LANGUAGE_OPTIONS.map((option) => renderLanguageOption(option, "mobile"))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
