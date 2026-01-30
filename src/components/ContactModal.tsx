"use client";

import React from "react";
import { Mail, Phone, Building, Send, CheckCircle, X as IconX } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations } from "next-intl";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  formData: {
    nombre: string;
    email: string;
    telefono: string;
    empresa: string;
    mensaje: string;
    selectedPlan?: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isSubmitted: boolean;
}

export default function ContactModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  isSubmitted,
}: ContactModalProps) {
  const { currentTheme } = useTheme();
  const t = useTranslations();
  const modalRef = useFocusTrap(isOpen);

  // Bloquear scroll del body cuando el modal está abierto
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const gradientColors = {
    bg: currentTheme.bg,
    card: currentTheme.card,
    text: currentTheme.text,
    textSecondary: currentTheme.textSecondary,
    inputBg: currentTheme.inputBg,
    border: currentTheme.border,
    ctaButton: currentTheme.ctaButton,
    hover: currentTheme.hover,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md animate-fadeInUp"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className={`relative w-full sm:max-w-lg max-h-[90vh] sm:max-h-[85vh] overflow-y-auto modal-scroll ${gradientColors.card} rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 sm:p-8 transform transition-all duration-300`}
        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <button
          onClick={onClose}
          aria-label={t("godigital.closeForm")}
          type="button"
          className={`absolute top-3 right-3 p-2.5 rounded-full ${gradientColors.hover} hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 touch-manipulation`}
        >
          <IconX className={`w-5 h-5 ${gradientColors.textSecondary}`} aria-hidden="true" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 sm:py-12">
            <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-5 animate-bounce" />
            <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${gradientColors.text}`}>
              {t("contact.sent")}
            </h3>
            <p className={`${gradientColors.textSecondary} text-base sm:text-lg`}>
              {t("contact.thanks")}
            </p>
            {formData.selectedPlan && (
              <p className={`${gradientColors.textSecondary} text-sm mt-3`}>
                {t("contact.planOfInterest", { plan: formData.selectedPlan })}
              </p>
            )}
            <div className="mt-6">
              <p className={`text-sm ${gradientColors.textSecondary} mb-3`}>
                {t("contact.modalAutoClose")}
              </p>
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-lg ${gradientColors.ctaButton} text-sm hover:scale-105 transition-all`}
              >
                {t("contact.closeNow")}
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3
              id="contact-modal-title"
              className={`text-2xl sm:text-3xl font-bold mb-1 text-center ${gradientColors.text}`}
            >
              {t("contact.title")}
            </h3>
            <p className={`text-center ${gradientColors.textSecondary} mb-6 text-sm sm:text-base`}>
              {formData.selectedPlan
                ? t("contact.interestedInPlan", { plan: formData.selectedPlan })
                : t("contact.description")}
            </p>

            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label
                  htmlFor="landing-nombre"
                  className={`block text-sm font-medium mb-1.5 ${gradientColors.textSecondary}`}
                >
                  {t("contact.name")}*
                </label>
                <input
                  type="text"
                  id="landing-nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={onInputChange}
                  required
                  aria-required="true"
                  className={`w-full px-4 py-2.5 rounded-lg ${gradientColors.inputBg} border ${gradientColors.border} ${gradientColors.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                  placeholder={t("form.namePlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="landing-email"
                  className={`block text-sm font-medium mb-1.5 ${gradientColors.textSecondary}`}
                >
                  {t("contact.email")}*
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${gradientColors.textSecondary}`}
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    id="landing-email"
                    name="email"
                    value={formData.email}
                    onChange={onInputChange}
                    required
                    aria-required="true"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${gradientColors.inputBg} border ${gradientColors.border} ${gradientColors.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                    placeholder={t("form.emailPlaceholder")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label
                    htmlFor="landing-telefono"
                    className={`block text-sm font-medium mb-1.5 ${gradientColors.textSecondary}`}
                  >
                    {t("contact.phone")}
                  </label>
                  <div className="relative">
                    <Phone
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${gradientColors.textSecondary}`}
                      aria-hidden="true"
                    />
                    <input
                      type="tel"
                      id="landing-telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={onInputChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${gradientColors.inputBg} border ${gradientColors.border} ${gradientColors.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                      placeholder={t("form.phonePlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="landing-empresa"
                    className={`block text-sm font-medium mb-1.5 ${gradientColors.textSecondary}`}
                  >
                    {t("contact.company")}
                  </label>
                  <div className="relative">
                    <Building
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${gradientColors.textSecondary}`}
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      id="landing-empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={onInputChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${gradientColors.inputBg} border ${gradientColors.border} ${gradientColors.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all`}
                      placeholder={t("form.companyPlaceholder")}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="landing-mensaje"
                  className={`block text-sm font-medium mb-1.5 ${gradientColors.textSecondary}`}
                >
                  {t("contact.message")}*
                </label>
                <textarea
                  id="landing-mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={onInputChange}
                  rows={3}
                  required
                  aria-required="true"
                  className={`w-full px-4 py-2.5 rounded-lg ${gradientColors.inputBg} border ${gradientColors.border} ${gradientColors.text} focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all resize-none`}
                  placeholder={t("form.messagePlaceholder")}
                />
              </div>

              {formData.selectedPlan && (
                <input type="hidden" name="selectedPlan" value={formData.selectedPlan} />
              )}

              <button
                type="submit"
                className={`w-full py-3.5 sm:py-3 mt-2 rounded-xl sm:rounded-lg ${gradientColors.ctaButton} text-base sm:text-lg hover:scale-[1.02] active:scale-[0.98] transform transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 touch-manipulation min-h-[48px]`}
              >
                {t("contact.send")}
                <Send
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
