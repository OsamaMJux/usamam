import { Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const navItems = [
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Blog", href: "/blog" },
    { label: "Process", href: "/process" },
  ];
  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/usamajm/" },
    { icon: Mail, href: "mailto:Usamamalikk@hotmail.com" },
    { icon: Twitter, href: "#" },
  ];

  return (
    <footer className="py-12 bg-charcoal-deep border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/">
              <img src="/logo-full.png" alt="theCreativeGuy" className="h-10 w-auto" />
            </Link>
          </motion.div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                whileHover={{ scale: 1.15, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-8 pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} theCreativeGuy. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
