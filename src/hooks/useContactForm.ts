import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getContactFormSchema, ContactFormData } from "@/lib/validations/contact";
import { useLocale } from "next-intl";
import { trackEvent } from "@/lib/analytics/track";

export const useContactForm = (defaultValues?: Partial<ContactFormData>) => {
  const locale = useLocale();
  const schema = getContactFormSchema(locale);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      nombre: "",
      email: "",
      telefono: "",
      empresa: "",
      mensaje: "",
      source: "",
      selectedPlan: "",
    },
  });

  const submitForm = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el formulario");
      }

      // Medición: conversión principal. El `source` permite atribuir el lead
      // al CTA/canal de origen (ver docs/MARKETING_STRATEGY.md §2.1).
      const source = formData.source || "sitio_web";
      trackEvent("contact_submit", {
        source,
        plan: formData.selectedPlan || undefined,
      });
      // Si el CTA de origen es una demo, registramos también la conversión de demo.
      if (/demo/i.test(source)) {
        trackEvent("demo_scheduled", { source, plan: formData.selectedPlan || undefined });
      }

      reset();
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al enviar el formulario"
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(submitForm),
    /** RHF handleSubmit sin enlazar — valida y luego llama a tu callback */
    validateSubmit: handleSubmit,
    errors,
    isSubmitting,
    error,
    reset,
    setValue,
    watch,
    submitForm,
  };
};
