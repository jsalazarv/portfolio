import { Button } from "@/common/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/common/components/ui/field";
import { Input } from "@/common/components/ui/input";
import { cn } from "@/common/lib/utils";
import { Trans, useTranslation } from "react-i18next";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="mb-5">
          <h2 className="text-foreground text-lg font-semibold">
            {t("auth.welcomeBack")}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t("auth.signUpWithEmail")}
          </p>
        </div>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">{t("auth.email")}</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">{t("auth.password")}</FieldLabel>
              <Input id="password" type="password" required />

              <FieldLabel htmlFor="password">
                {t("auth.confirmPassword")}
              </FieldLabel>
              <Input id="password" type="password" required />
            </Field>
            <Field>
              <Button type="submit" variant="secondary">
                {t("auth.signUp")}
              </Button>
              <FieldDescription className="text-center">
                {t("auth.alreadyAccount")}{" "}
                <a href="/">{t("auth.login")}</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </div>
      <FieldDescription className="px-6 text-center">
        <Trans
          i18nKey="auth.agree"
          components={{
            terms: <a href="#" />,
            privacy: <a href="#" />,
          }}
        />
      </FieldDescription>
    </div>
  );
}
