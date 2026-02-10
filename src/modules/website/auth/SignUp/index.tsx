import { NotebookPen } from "lucide-react";

import { SignUpForm } from "./partials/SignUpForm";

export function SignUp() {
  return (
    <div className="min-h-svh flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
          <a href="#" className="flex items-center gap-2 self-center font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <NotebookPen className="w-5 h-5" />
            </div>
            Tasks
          </a>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
