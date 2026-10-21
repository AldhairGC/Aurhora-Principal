"use client";

import React, { useState, useEffect } from "react";
import { X, Cookie, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  applyConsent,
  COOKIE_CONSENT_KEY,
  COOKIE_PREFERENCES_KEY,
  OPEN_COOKIE_SETTINGS_EVENT,
  type CookiePreferences,
} from "@/lib/analytics/consent";

export default function CookieConsent() {
  const { currentTheme } = useTheme();
  const t = useTranslations();
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // El estado "default" y la elección guardada ya se aplicaron en <head>
    // (CONSENT_DEFAULT_SCRIPT). Aquí solo cargamos lo que no lee Consent Mode.
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (!consent || !savedPreferences) {
        setShowBanner(true);
      } else {
        const prefs = JSON.parse(savedPreferences) as CookiePreferences;
        setPreferences(prefs);
        applyConsent(prefs);
      }
    } catch {
      setShowBanner(true);
    }

    // Permite reabrir el panel desde cualquier enlace "Preferencias de cookies".
    const open = () => {
      setShowDetails(true);
      setShowBanner(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  const handleAcceptAll = () => {
    const allPreferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };

    setPreferences(allPreferences);
    saveConsent(allPreferences);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const minimalPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };

    setPreferences(minimalPreferences);
    saveConsent(minimalPreferences);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setShowBanner(false);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "true");
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    } catch {
      /* almacenamiento bloqueado: la elección aplica solo a esta visita */
    }
    applyConsent(prefs);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Cannot disable necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slideInUp"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div
        className={`max-w-6xl mx-auto ${currentTheme.card} rounded-2xl shadow-2xl border ${currentTheme.border} backdrop-blur-xl`}
        style={{
          backgroundColor:
            currentTheme.bg === "bg-gray-900"
              ? "rgba(17, 24, 39, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
        }}
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500">
                <Cookie className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h2
                id="cookie-consent-title"
                className={`text-xl sm:text-2xl font-bold ${currentTheme.text}`}
              >
                {t("cookies.title")}
              </h2>
            </div>
            <button
              onClick={handleRejectAll}
              aria-label={t("cookies.close")}
              className={`p-2 rounded-lg ${currentTheme.hover} transition-all hover:scale-110`}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Description */}
          <p
            id="cookie-consent-description"
            className={`${currentTheme.textSecondary} mb-6 text-sm sm:text-base`}
          >
            {t("cookies.description")}
          </p>

          {/* Details Toggle */}
          {!showDetails && (
            <button
              onClick={() => setShowDetails(true)}
              className="flex items-center gap-2 text-purple-500 hover:text-purple-600 transition-colors mb-4 text-sm font-medium"
            >
              <Shield className="w-4 h-4" aria-hidden="true" />
              {t("cookies.customizeSettings")}
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          {/* Cookie Categories */}
          {showDetails && (
            <div className="space-y-4 mb-6">
              <button
                onClick={() => setShowDetails(false)}
                className="flex items-center gap-2 text-purple-500 hover:text-purple-600 transition-colors text-sm font-medium"
              >
                <ChevronUp className="w-4 h-4" aria-hidden="true" />
                {t("cookies.hideSettings")}
              </button>

              {/* Necessary Cookies */}
              <div
                className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.border}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold ${currentTheme.text}`}>
                    {t("cookies.necessary.title")}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {t("cookies.alwaysActive")}
                    </span>
                    <div className="w-12 h-6 bg-green-500 rounded-full flex items-center px-1">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                    </div>
                  </div>
                </div>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  {t("cookies.necessary.description")}
                </p>
              </div>

              {/* Analytics Cookies */}
              <div
                className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.border}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold ${currentTheme.text}`}>
                    {t("cookies.analytics.title")}
                  </h3>
                  <button
                    onClick={() => togglePreference("analytics")}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.analytics ? "bg-green-500" : "bg-gray-300"
                    }`}
                    role="switch"
                    aria-checked={preferences.analytics}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.analytics ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  {t("cookies.analytics.description")}
                </p>
              </div>

              {/* Marketing Cookies */}
              <div
                className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.border}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold ${currentTheme.text}`}>
                    {t("cookies.marketing.title")}
                  </h3>
                  <button
                    onClick={() => togglePreference("marketing")}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.marketing ? "bg-green-500" : "bg-gray-300"
                    }`}
                    role="switch"
                    aria-checked={preferences.marketing}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.marketing ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  {t("cookies.marketing.description")}
                </p>
              </div>

              {/* Functional Cookies */}
              <div
                className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.border}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold ${currentTheme.text}`}>
                    {t("cookies.functional.title")}
                  </h3>
                  <button
                    onClick={() => togglePreference("functional")}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.functional ? "bg-green-500" : "bg-gray-300"
                    }`}
                    role="switch"
                    aria-checked={preferences.functional}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.functional ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
                <p className={`text-sm ${currentTheme.textSecondary}`}>
                  {t("cookies.functional.description")}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {showDetails ? (
              <>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:scale-105 transition-all shadow-lg"
                >
                  {t("cookies.savePreferences")}
                </button>
                <button
                  onClick={handleRejectAll}
                  className={`px-6 py-3 rounded-lg border-2 ${currentTheme.border} ${currentTheme.text} font-semibold hover:scale-105 transition-all`}
                >
                  {t("cookies.rejectAll")}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:scale-105 transition-all shadow-lg"
                >
                  {t("cookies.acceptAll")}
                </button>
                <button
                  onClick={handleRejectAll}
                  className={`px-6 py-3 rounded-lg border-2 ${currentTheme.border} ${currentTheme.text} font-semibold hover:scale-105 transition-all`}
                >
                  {t("cookies.rejectAll")}
                </button>
              </>
            )}
          </div>

          {/* Privacy Policy Link */}
          <p className={`text-xs ${currentTheme.textSecondary} mt-4 text-center`}>
            {t("cookies.learnMore")}{" "}
            <Link
              href="/aviso-privacidad"
              className="text-purple-500 hover:text-purple-600 underline"
            >
              {t("cookies.privacyPolicy")}
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
