import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useTranslation } from "react-i18next";

import { cn } from "@/common/lib/utils";

type SubmitState = "idle" | "sending" | "sent" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CLIP_OUTER =
  "polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)";
const CLIP_INNER =
  "polygon(19px 0%, 100% 0%, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0% 100%, 0% 19px)";
const CLIP_BEVEL_OUTER =
  "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)";
const CLIP_BEVEL_INNER =
  "polygon(7px 0%, 100% 0%, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0% 100%, 0% 7px)";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

interface DossierModalProps {
  onClose: () => void;
}

export function DossierModal({ onClose }: DossierModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const isSending = submitState === "sending";
  const isSent = submitState === "sent";
  const isError = submitState === "error";

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError(t("contact.validation.emailRequired"));
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError(t("contact.validation.emailInvalid"));
      return;
    }
    if (!captchaToken) return;

    setSubmitState("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          title: "Solicitud de expediente",
          name: email,
          message: `${email} ha solicitado tu expediente.`,
          email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setSubmitState("sent");
    } catch (err) {
      console.error("[EmailJS error]", err);
      setSubmitState("error");
      turnstileRef.current?.reset();
      setCaptchaToken(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Blur overlay */}
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal HUD frame */}
      <div className="relative z-10 w-full max-w-md">
        <div
          className="bg-muted-foreground/50 p-px"
          style={{ clipPath: CLIP_OUTER }}
        >
          <div
            className="relative bg-background overflow-hidden"
            style={{ clipPath: CLIP_INNER }}
          >
            {/* Scanlines */}
            <div className="absolute inset-0 scanlines-overlay pointer-events-none z-10" />

            {/* Header bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/60 border-b border-border font-mono text-[11px] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="text-primary tracking-widest uppercase">
                [ {t("about.dossier.title")} ]
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="ml-auto relative font-mono text-[10px] tracking-widest uppercase text-muted-foreground cursor-pointer focus-visible:outline-none"
              >
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: CLIP_BEVEL_OUTER,
                    background:
                      "color-mix(in oklch, var(--muted-foreground) 40%, transparent)",
                  }}
                />
                <span
                  className="absolute inset-[1px]"
                  style={{
                    clipPath: CLIP_BEVEL_INNER,
                    background: "var(--background)",
                  }}
                />
                <span className="relative z-10 px-3 py-1 block">✕</span>
              </button>
            </div>

            {/* Body */}
            <div className="relative z-20 px-6 py-6 font-mono">
              {isSent ? (
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <span className="text-green-500 text-2xl animate-pulse">
                    ✓
                  </span>
                  <p className="text-sm tracking-widest uppercase text-foreground">
                    {t("about.dossier.sent")}
                  </p>
                  <p className="text-xs tracking-wider text-muted-foreground">
                    {t("about.dossier.sentDescription")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <p className="text-[11px] tracking-wider text-muted-foreground uppercase mb-5">
                    {t("about.dossier.subtitle")}
                  </p>

                  <div className="mb-4">
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-1.5">
                      {t("about.dossier.email")}::
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder={t("about.dossier.emailPlaceholder")}
                      disabled={isSending}
                      className={cn(
                        "w-full bg-transparent font-mono text-xs tracking-wider text-foreground",
                        "placeholder:text-muted-foreground/40 placeholder:tracking-widest placeholder:uppercase",
                        "border border-muted-foreground/30 px-3 py-2",
                        "focus:outline-none focus:border-primary/60 transition-colors duration-200",
                        "disabled:opacity-40 disabled:cursor-not-allowed",
                        error && "border-red-500/60",
                      )}
                    />
                    {error && (
                      <p className="text-[10px] text-red-400 tracking-wider mt-1">
                        {error}
                      </p>
                    )}
                    {isError && (
                      <p className="text-[10px] text-red-400 tracking-wider mt-1">
                        {t("about.dossier.sendError")}
                      </p>
                    )}
                  </div>

                  <Turnstile
                    ref={turnstileRef}
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={setCaptchaToken}
                    onExpire={() => setCaptchaToken(null)}
                    options={{ theme: "dark", size: "flexible" }}
                    className="mt-4"
                  />

                  {/* Submit button */}
                  <div className="relative w-full mt-4">
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
                      {isSending
                        ? t("about.dossier.sending")
                        : t("about.dossier.send")}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer bar */}
            <div className="flex items-center gap-3 px-4 py-1.5 bg-muted/60 border-t border-border font-mono text-[10px] text-muted-foreground tracking-wider">
              <span>ID::jsalazarv</span>
              <span className="text-border">|</span>
              <span className="text-green-500 animate-pulse">
                ● {t("about.hud.online")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
