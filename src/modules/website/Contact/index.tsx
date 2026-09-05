import { Linkedin01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { TFunction } from "i18next";

import { FieldError } from "@/common/components/ui/field";
import { cn } from "@/common/lib/utils";

const LINKEDIN_URL = "https://linkedin.com/in/jsalazarv";

type SubmitState = "idle" | "sending" | "sent";

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
  if (!data.message.trim()) errors.message = t("contact.validation.messageRequired");
  return errors;
}

const FIELD_CLASS = cn(
  "w-full bg-transparent font-mono text-xs tracking-wider text-foreground",
  "placeholder:text-muted-foreground/40 placeholder:tracking-widest placeholder:uppercase",
  "border border-muted-foreground/30 px-3 py-2",
  "focus:outline-none focus:border-primary/60 transition-colors duration-200",
  "disabled:opacity-40 disabled:cursor-not-allowed",
);

export function Contact() {
  const { t } = useTranslation();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactFormErrors>({});

  function handleFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitState("sent");
  }

  const isSending = submitState === "sending";
  const isSent = submitState === "sent";

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
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/60 border-b border-border">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
            <span className="font-mono text-xs text-primary tracking-widest uppercase">
              [ {t("contact.title")} ]
            </span>
          </div>
          <div className="relative z-20 px-4 py-3 border-b border-border/40">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
              {t("contact.subtitle")}
            </p>
          </div>

          {/* Form / Sent */}
          {isSent ? (
            <div className="relative z-20 flex flex-col items-center text-center gap-2 py-14">
              <span className="font-mono text-primary text-lg">✓</span>
              <p className="font-mono text-xs tracking-widest uppercase text-foreground">{t("contact.sent")}</p>
              <p className="font-mono text-[10px] tracking-wider text-muted-foreground/60 mt-1">{t("contact.sentDescription")}</p>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit} noValidate className="relative z-20 p-4 flex flex-col gap-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
                {t("contact.formTitle")}
              </p>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
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
                  className={cn(FIELD_CLASS, errors.name && "border-destructive")}
                />
                <FieldError>{errors.name}</FieldError>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
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
                  className={cn(FIELD_CLASS, errors.email && "border-destructive")}
                />
                <FieldError>{errors.email}</FieldError>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
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
                  className={cn(FIELD_CLASS, "resize-none", errors.message && "border-destructive")}
                />
                <FieldError>{errors.message}</FieldError>
              </div>

            </form>
          )}
          {!isSent && (
            <div className="relative z-20 flex items-center justify-between px-4 py-1.5 bg-muted/60 border-t border-border">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-1.5 border border-border/70 px-2.5 py-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                <HugeiconsIcon icon={Linkedin01Icon} size={11} strokeWidth={1.5} />
                <span>LinkedIn</span>
              </a>
              <button
                type="submit"
                form="contact-form"
                disabled={isSending}
                className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-1.5 border border-border/70 px-2.5 py-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none"
              >
                <span>↑</span>
                <span>{isSending ? t("contact.sending") : t("contact.send")}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
