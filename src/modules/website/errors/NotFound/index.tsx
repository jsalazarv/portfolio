import { Home, LayoutDashboard, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/common/components/ui/button";
import { ErrorLayout } from "@/common/layouts/ErrorLayout";

export function NotFound() {
  return (
    <ErrorLayout
      icon={
        <SearchX
          className="w-24 h-24 text-muted-foreground/40"
          strokeWidth={1.5}
        />
      }
      errorCode="404"
      title="Página no encontrada"
      description="Lo sentimos, la página que buscas no existe o ha sido movida."
    >
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link to="/">
          <Home className="w-4 h-4" />
          Volver al inicio
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
        <Link to="/dashboard">
          <LayoutDashboard className="w-4 h-4" />
          Ir al dashboard
        </Link>
      </Button>
    </ErrorLayout>
  );
}
