import { Home, RefreshCw, ServerCrash } from "lucide-react";
import { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";

import { Button } from "@/common/components/ui/button";
import { ErrorLayout } from "@/common/layouts/ErrorLayout";

export function ServerError() {
  const error = useRouteError();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("Route error:", error);
    }
  }, [error]);

  return (
    <ErrorLayout
      icon={
        <ServerCrash
          className="w-24 h-24 text-destructive/40"
          strokeWidth={1.5}
        />
      }
      errorCode="500"
      title="Error del servidor"
      description="Algo salió mal en nuestros servidores. Por favor, intenta nuevamente más tarde."
      standalone={true}
    >
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link to="/">
          <Home className="w-4 h-4" />
          Volver al inicio
        </Link>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full sm:w-auto"
        onClick={() => window.location.reload()}
      >
        <RefreshCw className="w-4 h-4" />
        Reintentar
      </Button>
    </ErrorLayout>
  );
}
