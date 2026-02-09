import { Button } from "@/common/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/common/components/ui/field";
import { Input } from "@/common/components/ui/input";
import { cn } from "@/common/lib/utils";
import { Trans, useTranslation } from "react-i18next";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("auth.welcomeBack")}</CardTitle>
          <CardDescription>{t("auth.loginWithEmail")}</CardDescription>
        </CardHeader>
        <CardContent>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">{t("auth.password")}</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    {t("auth.forgotPassword")}
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit" variant="secondary">
                  {t("auth.login")}
                </Button>
                <FieldDescription className="text-center">
                  {t("auth.noAccount")}{" "}
                  <a href="/sign-up">{t("auth.signUp")}</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
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
