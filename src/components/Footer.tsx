import { Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-charcoal-deep border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-2xl font-serif font-bold">
            Usama<span className="text-primary">.</span>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-8">
            {["About", "Portfolio", "Services", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  document
                    .querySelector(`#${item.toLowerCase()}`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/usamajm/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:hello@usamajamil.com"
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <Mail size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Usama Jamil. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
