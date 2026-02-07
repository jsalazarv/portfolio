import { portfolioLinks } from "@/modules/website/Home/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="mx-auto max-w-3xl bg-card border border-border rounded-2xl px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">Connect:</span>
            <div className="flex gap-3">
              {portfolioLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:border-foreground/40 transition-colors"
                  aria-label={link.label}
                >
                  {typeof link.icon === "string" ? (
                    <span className="text-lg">{link.icon}</span>
                  ) : (
                    link.icon
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground/60 text-sm">
            © {currentYear} Juan Salazar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
