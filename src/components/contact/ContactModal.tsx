"use client";

/**
 * ContactModal — modal de contacto del sistema Aurora.
 * Reutiliza useContactForm (RHF + Zod + Brevo) con el diseño nuevo.
 * Cierra con Escape / overlay, atrapa el foco y muestra estado de éxito.
 */

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, Send, CheckCircle } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
  source: string;
  selectedPlan?: string;
};

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink placeholder:text-zinc-400 outline-none transition-colors focus:border-aurora-indigo focus:ring-2 focus:ring-aurora-indigo/20";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";
const errorCls = "mt-1 text-xs text-red-500";

export function ContactModal({ open, onClose, source, selectedPlan }: ContactModalProps) {
  const t = useTranslations("contact");
  const tForm = useTranslations("form");
  const modalRef = useFocusTrap(open);
  const [submitted, setSubmitted] = useState(false);

  const { register, validateSubmit, errors, isSubmitting, error, submitForm, setValue } =
    useContactForm();

  // Inyectar source/plan al abrir
  useEffect(() => {
    if (open) {
      setValue("source", source);
      setValue("selectedPlan", selectedPlan || "");
      setSubmitted(false);
    }
  }, [open, source, selectedPlan, setValue]);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onValid = async (data: Record<string, unknown>) => {
    const ok = await submitForm({ ...data, source, selectedPlan } as never);
    if (ok) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 4500);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)]"
          >
            {/* barra aurora superior */}
            <div className="h-1 w-full bg-aurora" />

            <div className="p-7 md:p-8">
              <button
                onClick={onClose}
                aria-label={t("closeNow")}
                className="absolute right-5 top-6 flex h-9 w-9 items-center justify-center rounded-lg text-secondaryText transition-colors hover:bg-zinc-100 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>

              {submitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-aurora-indigo/[0.1] text-aurora-indigo">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.01em] text-ink">{t("sent")}</h3>
                  <p className="mx-auto mt-3 max-w-sm text-secondaryText">{t("thanks")}</p>
                </div>
              ) : (
                <>
                  <h3 id="contact-modal-title" className="text-2xl font-semibold tracking-[-0.01em] text-ink">
                    {t("title")}
                  </h3>
                  <p className="mt-2 text-secondaryText">{t("description")}</p>
                  {selectedPlan ? (
                    <p className="mt-3 rounded-lg bg-aurora-indigo/[0.06] px-3 py-2 text-sm text-aurora-indigo">
                      {t("planOfInterest", { plan: selectedPlan })}
                    </p>
                  ) : null}

                  <form onSubmit={validateSubmit(onValid)} className="mt-6 space-y-4" noValidate>
                    <div>
                      <label htmlFor="cm-nombre" className={labelCls}>
                        {t("name")} *
                      </label>
                      <input id="cm-nombre" {...register("nombre")} className={inputCls} placeholder={tForm("namePlaceholder")} />
                      {errors.nombre && <p className={errorCls}>{errors.nombre.message}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="cm-email" className={labelCls}>
                          {t("email")} *
                        </label>
                        <input id="cm-email" type="email" {...register("email")} className={inputCls} placeholder={tForm("emailPlaceholder")} />
                        {errors.email && <p className={errorCls}>{errors.email.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="cm-telefono" className={labelCls}>
                          {t("phone")}
                        </label>
                        <input id="cm-telefono" {...register("telefono")} className={inputCls} placeholder={tForm("phonePlaceholder")} />
                        {errors.telefono && <p className={errorCls}>{errors.telefono.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cm-empresa" className={labelCls}>
                        {t("company")}
                      </label>
                      <input id="cm-empresa" {...register("empresa")} className={inputCls} placeholder={tForm("companyPlaceholder")} />
                      {errors.empresa && <p className={errorCls}>{errors.empresa.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="cm-mensaje" className={labelCls}>
                        {t("message")} *
                      </label>
                      <textarea id="cm-mensaje" rows={4} {...register("mensaje")} className={`${inputCls} resize-none`} placeholder={tForm("messagePlaceholder")} />
                      {errors.mensaje && <p className={errorCls}>{errors.mensaje.message}</p>}
                    </div>

                    {error && <p className="text-sm text-red-500">{t("error")}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-aurora px-6 py-3.5 font-medium text-white shadow-[0_10px_30px_-8px_rgba(79,70,229,0.5)] transition-all hover:brightness-110 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      ) : (
                        <>
                          {t("send")}
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
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
}

export default ContactModal;
