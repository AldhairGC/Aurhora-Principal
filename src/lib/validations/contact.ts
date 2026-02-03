import { z } from "zod";

// Schema de validación para el formulario de contacto
export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(100, { message: "El nombre no puede exceder 100 caracteres" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: "El nombre solo debe contener letras y espacios",
    }),

  email: z
    .string()
    .email({ message: "Por favor, ingresa un correo electrónico válido" })
    .max(255, { message: "El correo no puede exceder 255 caracteres" }),

  telefono: z
    .string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/, {
      message: "Por favor, ingresa un número de teléfono válido",
    })
    .optional()
    .or(z.literal("")),

  empresa: z
    .string()
    .max(200, { message: "El nombre de la empresa no puede exceder 200 caracteres" })
    .optional()
    .or(z.literal("")),

  mensaje: z
    .string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres" })
    .max(2000, { message: "El mensaje no puede exceder 2000 caracteres" })
    .optional()
    .or(z.literal("")),

  proyecto: z.string().optional(),
  proceso: z.string().optional(),
  necesidad: z.string().optional(),
  source: z.string().optional(),
  selectedPlan: z.string().optional(),
  desafio: z.string().optional(),
  objetivos: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Schema para traducciones en inglés
export const contactFormSchemaEN = z.object({
  nombre: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name cannot exceed 100 characters" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: "Name should only contain letters and spaces",
    }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email cannot exceed 255 characters" }),

  telefono: z
    .string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/, {
      message: "Please enter a valid phone number",
    })
    .optional()
    .or(z.literal("")),

  empresa: z
    .string()
    .max(200, { message: "Company name cannot exceed 200 characters" })
    .optional()
    .or(z.literal("")),

  mensaje: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(2000, { message: "Message cannot exceed 2000 characters" })
    .optional()
    .or(z.literal("")),

  proyecto: z.string().optional(),
  proceso: z.string().optional(),
  necesidad: z.string().optional(),
  source: z.string().optional(),
  selectedPlan: z.string().optional(),
  desafio: z.string().optional(),
  objetivos: z.string().optional(),
});

// Schema para traducciones en portugués
export const contactFormSchemaPT = z.object({
  nombre: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "O nome não pode exceder 100 caracteres" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: "O nome deve conter apenas letras e espaços",
    }),

  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de e-mail válido" })
    .max(255, { message: "O e-mail não pode exceder 255 caracteres" }),

  telefono: z
    .string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/, {
      message: "Por favor, insira um número de telefone válido",
    })
    .optional()
    .or(z.literal("")),

  empresa: z
    .string()
    .max(200, { message: "O nome da empresa não pode exceder 200 caracteres" })
    .optional()
    .or(z.literal("")),

  mensaje: z
    .string()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" })
    .max(2000, { message: "A mensagem não pode exceder 2000 caracteres" })
    .optional()
    .or(z.literal("")),

  proyecto: z.string().optional(),
  proceso: z.string().optional(),
  necesidad: z.string().optional(),
  source: z.string().optional(),
  selectedPlan: z.string().optional(),
  desafio: z.string().optional(),
  objetivos: z.string().optional(),
});

// Helper function to get the correct schema based on locale
export function getContactFormSchema(locale: string = "es") {
  switch (locale) {
    case "en":
      return contactFormSchemaEN;
    case "pt":
      return contactFormSchemaPT;
    default:
      return contactFormSchema;
  }
}
