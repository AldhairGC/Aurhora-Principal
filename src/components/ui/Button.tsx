"use client";

/**
 * Button — botón/enlace del sistema Aurora.
 * Variantes: primary (gradiente firma), secondary (borde), ghost.
 * Renderiza <a> si recibe `href`, si no <button>.
 */
import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** Ícono final: "arrow" (→), "arrow-up" (↗) o ninguno */
  icon?: "arrow" | "arrow-up" | "none";
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };
type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-indigo focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-[0.95rem]",
  lg: "px-6 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-aurora text-white shadow-[0_10px_30px_-8px_rgba(79,70,229,0.5)] hover:brightness-110",
  secondary: "border border-line bg-white text-ink hover:border-zinc-300",
  ghost: "text-aurora-indigo hover:bg-aurora-indigo/5",
};

export function Button({
  children,
  variant = "primary",
  size = "lg",
  icon = "none",
  className = "",
  ...props
}: ButtonProps) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const iconEl =
    icon === "arrow" ? (
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    ) : icon === "arrow-up" ? (
      <ArrowUpRight className="h-4 w-4" />
    ) : null;

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={cls} {...rest}>
        {children}
        {iconEl}
      </a>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={cls} {...rest}>
      {children}
      {iconEl}
    </button>
  );
}

export default Button;
