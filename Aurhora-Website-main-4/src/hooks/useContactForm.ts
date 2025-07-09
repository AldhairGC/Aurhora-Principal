import { useState } from "react";

interface ContactFormData {
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  mensaje?: string;
  proyecto?: string;
  proceso?: string;
  necesidad?: string;
  source?: string;
  selectedPlan?: string;
}

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    submitForm,
    isSubmitting,
    error,
  };
};
