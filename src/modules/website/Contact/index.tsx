import { Linkedin01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import type { TFunction } from "i18next";

import { FieldError } from "@/common/components/ui/field";
import { cn } from "@/common/lib/utils";

const LINKEDIN_URL = "https://linkedin.com/in/jsalazarv";
const GITHUB_URL = "https://github.com/jsalazarv";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

type SubmitState = "idle" | "sending" | "sent" | "error";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateForm(data: ContactFormData, t: TFunction): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!data.name.trim()) errors.name = t("contact.validation.nameRequired");
  if (!data.email.trim()) {
    errors.email = t("contact.validation.emailRequired");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = t("contact.validation.emailInvalid");
  }
  if (!data.message.trim())
    errors.message = t("contact.validation.messageRequired");
  return errors;
}

const CLIP_BEVEL_OUTER =
  "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)";
const CLIP_BEVEL_INNER =
  "polygon(7px 0%, 100% 0%, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0% 100%, 0% 7px)";

const FIELD_CLASS = cn(
  "w-full bg-transparent font-mono text-xs tracking-wider text-foreground",
  "placeholder:text-xs placeholder:text-muted-foreground/40 placeholder:tracking-widest placeholder:uppercase",
  "border border-muted-foreground/30 px-3 py-2",
  "focus:outline-none focus:border-primary/60 transition-colors duration-200",
  "disabled:opacity-40 disabled:cursor-not-allowed",
);

export function Contact() {
  const { t } = useTranslation();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});

  useEffect(() => {
    if (submitState !== "sent") return;
    const timeout = setTimeout(() => {
      setSubmitState("idle");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    }, 4000);
    return () => clearTimeout(timeout);
  }, [submitState]);

  function handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateForm(formData, t);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitState("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          title: "Mensaje de contacto",
          name: formData.name,
          message: formData.message,
          email: formData.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setSubmitState("sent");
    } catch {
      setSubmitState("error");
    }
  }

  const isSending = submitState === "sending";
  const isSent = submitState === "sent";
  const isError = submitState === "error";

  return (
    <div className="-mt-8">
      {/* Single HUD container */}
      <div
        className="bg-muted-foreground/50 p-px"
        style={{
          clipPath:
            "polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)",
        }}
      >
        <div
          className="relative bg-background overflow-hidden"
          style={{
            clipPath:
              "polygon(19px 0%, 100% 0%, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0% 100%, 0% 19px)",
          }}
        >
          <div className="absolute inset-0 scanlines-overlay pointer-events-none z-10" />

          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-4 bg-muted/60 border-b border-border font-mono text-[12px] backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
            <span className="text-primary tracking-widest uppercase">
              [ {t("contact.title")} ]
            </span>
          </div>
          <div className="relative z-20 px-6 py-3 border-b border-border/40">
            <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
              {t("contact.subtitle")}
            </p>
          </div>

          {/* Form / Sent */}
          {isSent ? (
            <div className="relative z-20 flex flex-col items-center text-center gap-2 py-14">
              <span className="font-mono text-primary text-lg">✓</span>
              <p className="font-mono text-xs tracking-widest uppercase text-foreground">
                {t("contact.sent")}
              </p>
              <p className="font-mono text-[10px] tracking-wider text-muted-foreground/60 mt-1">
                {t("contact.sentDescription")}
              </p>
            </div>
          ) : (
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              noValidate
              className="relative z-20 px-6 py-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  {t("contact.formTitle")}
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-1.5 border border-border/70 px-2.5 py-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200 cursor-pointer"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-1.5 border border-border/70 px-2.5 py-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200 cursor-pointer"
                  >
                    <HugeiconsIcon icon={Linkedin01Icon} size={11} strokeWidth={1.5} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50"
                >
                  {t("contact.name")}::
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFieldChange}
                  placeholder={t("contact.namePlaceholder")}
                  aria-invalid={!!errors.name}
                  disabled={isSending}
                  className={cn(
                    FIELD_CLASS,
                    errors.name && "border-destructive",
                  )}
                />
                <FieldError>{errors.name}</FieldError>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50"
                >
                  {t("contact.emailField")}::
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFieldChange}
                  placeholder={t("contact.emailPlaceholder")}
                  aria-invalid={!!errors.email}
                  disabled={isSending}
                  className={cn(
                    FIELD_CLASS,
                    errors.email && "border-destructive",
                  )}
                />
                <FieldError>{errors.email}</FieldError>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50"
                >
                  {t("contact.message")}::
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleFieldChange}
                  placeholder={t("contact.messagePlaceholder")}
                  aria-invalid={!!errors.message || undefined}
                  disabled={isSending}
                  className={cn(
                    FIELD_CLASS,
                    "resize-none",
                    errors.message && "border-destructive",
                  )}
                />
                <FieldError>{errors.message}</FieldError>
              </div>

              {isError && (
                <p className="font-mono text-[10px] text-red-400 tracking-wider">
                  {t("contact.sendError")}
                </p>
              )}

              {/* Submit button */}
              <div className="relative w-full mt-2">
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: CLIP_BEVEL_OUTER,
                    background: isSending
                      ? "color-mix(in oklch, var(--muted-foreground) 40%, transparent)"
                      : "var(--primary)",
                  }}
                />
                <button
                  type="submit"
                  disabled={isSending}
                  className="relative z-10 w-full font-mono text-[10px] tracking-widest uppercase py-2 text-center cursor-pointer focus-visible:outline-none disabled:cursor-not-allowed text-primary-foreground"
                >
                  {isSending ? t("contact.sending") : t("contact.send")}
                </button>
              </div>
            </form>
          )}
          <div className="flex items-center gap-3 px-4 py-1.5 bg-muted/60 border-t border-border font-mono text-[10px] text-muted-foreground tracking-wider backdrop-blur-sm">
            <span>ID::jsalazarv</span>
            <span className="text-border">|</span>
            <span>{t("about.hud.location")}</span>
            <span className="text-border">|</span>
            <span className="text-green-500">● {t("about.hud.online")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
