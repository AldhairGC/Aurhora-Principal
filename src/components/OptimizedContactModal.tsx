"use client";

import React, { memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";
import { Mail, Phone, Building, Send, CheckCircle, X } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  selectedPlan?: string;
  source?: string;
}

interface OptimizedContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<ContactFormData>;
}

/**
 * Modal de contacto optimizado con memoización
 */
export const OptimizedContactModal = memo(function OptimizedContactModal({
  isOpen,
  onClose,
  initialData = {},
}: OptimizedContactModalProps) {
  const { theme, currentTheme } = useTheme();
  const t = useTranslations();
  const modalRef = useFocusTrap(isOpen);
  
  const [formData, setFormData] = React.useState<ContactFormData>({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
    selectedPlan: "",
    source: "contact_modal",
    ...initialData,
  });
  
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const { submitForm, error } = useContactForm();

  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        empresa: "",
        mensaje: "",
        selectedPlan: "",
        source: "contact_modal",
        ...initialData,
      });
      setFormSubmitted(false);
    }
  }, [isOpen, initialData]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      alert(t("contact.required"));
      return;
    }
    
    const success = await submitForm(formData);
    if (success) {
      setFormSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      alert(error || t("contact.error"));
    }
  }, [formData, submitForm, error, t, onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const gradientColors = {
    inputBg: theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300",
    ctaButton: theme === "dark"
      ? "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-gray-900"
      : "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            ref={modalRef}
            className={`relative w-full max-w-lg ${currentTheme.card} rounded-3xl shadow-2xl overflow-hidden`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600" />
            
            <div className="p-6 sm:p-8">
              <button
                onClick={onClose}
                aria-label={t("common.close")}
                type="button"
                className={`absolute top-4 right-4 p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 z-10`}
              >
                <X className={`w-5 h-5 ${currentTheme.textSecondary}`} aria-hidden="true" />
              </button>

              {formSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h3 className={`text-3xl font-bold mb-3 ${currentTheme.text}`}>
                    {t("contact.sent")}
                  </h3>
                  <p className={`${currentTheme.textSecondary} text-lg`}>
                    {t("contact.thanks")}
                  </p>
                </div>
              ) : (
                <>
                  <h3
                    id="contact-modal-title"
                    className={`text-3xl font-bold mb-2 text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent`}
                  >
                    {t("contact.title")}
                  </h3>
                  <p className={`text-center ${currentTheme.textSecondary} mb-8 text-base`}>
                    {formData.selectedPlan
                      ? t("contact.interestedInPlan", { plan: formData.selectedPlan })
                      : t("contact.description")}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="modal-nombre" className={`block text-sm font-semibold mb-2 ${currentTheme.text}`}>
                        {t("contact.name")} <span className="text-purple-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="modal-nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl ${gradientColors.inputBg} border-2 ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all`}
                        placeholder={t("form.namePlaceholder")}
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-email" className={`block text-sm font-semibold mb-2 ${currentTheme.text}`}>
                        {t("contact.email")} <span className="text-purple-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                        <input
                          type="email"
                          id="modal-email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full pl-12 pr-4 py-3 rounded-xl ${gradientColors.inputBg} border-2 ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all`}
                          placeholder={t("form.emailPlaceholder")}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="modal-telefono" className={`block text-sm font-semibold mb-2 ${currentTheme.text}`}>
                          {t("contact.phone")}
                        </label>
                        <div className="relative">
                          <Phone className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                          <input
                            type="tel"
                            id="modal-telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl ${gradientColors.inputBg} border-2 ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all`}
                            placeholder={t("form.phonePlaceholder")}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="modal-empresa" className={`block text-sm font-semibold mb-2 ${currentTheme.text}`}>
                          {t("contact.company")}
                        </label>
                        <div className="relative">
                          <Building className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.textSecondary}`} />
                          <input
                            type="text"
                            id="modal-empresa"
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleInputChange}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl ${gradientColors.inputBg} border-2 ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all`}
                            placeholder={t("form.companyPlaceholder")}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="modal-mensaje" className={`block text-sm font-semibold mb-2 ${currentTheme.text}`}>
                        {t("contact.message")} <span className="text-purple-500">*</span>
                      </label>
                      <textarea
                        id="modal-mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        className={`w-full px-4 py-3 rounded-xl ${gradientColors.inputBg} border-2 ${currentTheme.border} ${currentTheme.text} focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all resize-none`}
                        placeholder={t("form.messagePlaceholder")}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-4 mt-3 rounded-xl ${gradientColors.ctaButton} text-lg font-semibold shadow-lg hover:shadow-2xl group flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all duration-300`}
                    >
                      {t("contact.send")}
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default OptimizedContactModal;
