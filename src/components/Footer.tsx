import { Link } from "react-router-dom";
import Wordmark from "./Wordmark";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Builder", href: "/builder" },
  { label: "Process", href: "/process" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link to="/" aria-label="Taizai home">
            <Wordmark className="h-6 w-auto" />
          </Link>

          <nav className="flex flex-wrap gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="mailto:Usamajan20000@gmail.com"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/usamajm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Taizai
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
