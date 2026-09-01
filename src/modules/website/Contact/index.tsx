import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

import {
  ArrowUpRight01Icon,
  CheckmarkCircle01Icon,
  Linkedin01Icon,
  SentIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/common/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/common/components/ui/field";
import { Input } from "@/common/components/ui/input";
import { cn } from "@/common/lib/utils";

const LINKEDIN_HANDLE = "linkedin.com/in/jsalazarv";
const LINKEDIN_URL = "https://linkedin.com/in/jsalazarv";

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

function validateForm(
  data: ContactFormData,
  t: TFunction,
): ContactFormErrors {
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

export function Contact() {
  const { t } = useTranslation();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});

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
    // TODO: replace with actual API call (e.g., Formspree, EmailJS, custom endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitState("sent");
  }

  const isSending = submitState === "sending";
  const isSent = submitState === "sent";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {t("contact.title")}
          <span className="text-primary">.</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("contact.subtitle")}
        </p>
      </div>

      {/* LinkedIn direct link */}
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group flex items-center justify-between gap-3 w-full",
          "bg-card border border-border rounded-2xl px-5 py-4",
          "transition-colors duration-200 hover:border-ring/40",
        )}
      >
        <span className="flex items-center gap-3">
          <HugeiconsIcon
            icon={Linkedin01Icon}
            size={16}
            strokeWidth={1.5}
            className="text-muted-foreground group-hover:text-primary transition-colors duration-200 shrink-0"
          />
          <span className="font-mono text-sm text-foreground">
            {LINKEDIN_HANDLE}
          </span>
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors duration-200 shrink-0">
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            size={14}
            strokeWidth={1.5}
          />
          {t("contact.openProfile")}
        </span>
      </a>

      {isSent ? (
        <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center gap-3">
          <HugeiconsIcon
            icon={CheckmarkCircle01Icon}
            size={32}
            strokeWidth={1.2}
            className="text-primary"
          />
          <div>
            <p className="font-semibold text-foreground">{t("contact.sent")}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("contact.sentDescription")}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-5">
            {t("contact.formTitle")}
          </p>
          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">{t("contact.name")}</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFieldChange}
                  placeholder={t("contact.namePlaceholder")}
                  aria-invalid={!!errors.name}
                  disabled={isSending}
                />
                <FieldError>{errors.name}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="email">
                  {t("contact.emailField")}
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFieldChange}
                  placeholder={t("contact.emailPlaceholder")}
                  aria-invalid={!!errors.email}
                  disabled={isSending}
                />
                <FieldError>{errors.email}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="message">
                  {t("contact.message")}
                </FieldLabel>
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
                    "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none resize-none md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                    errors.message &&
                      "border-destructive ring-2 ring-destructive/20 dark:ring-destructive/40",
                  )}
                />
                <FieldError>{errors.message}</FieldError>
              </Field>

              <div className="flex justify-end">
                <Button type="submit" disabled={isSending} className="gap-2">
                  {isSending ? (
                    t("contact.sending")
                  ) : (
                    <>
                      {t("contact.send")}
                      <HugeiconsIcon
                        icon={SentIcon}
                        size={14}
                        strokeWidth={1.5}
                      />
                    </>
                  )}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </div>
      )}
    </div>
  );
}
