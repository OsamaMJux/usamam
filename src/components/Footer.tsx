import { Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const navItems = ["About", "Process", "Products", "Contact"];
  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/usamajm/" },
    { icon: Mail, href: "mailto:Usamajan20000@gmail.com" },
    { icon: Twitter, href: "#" },
  ];

  return (
    <footer className="py-12 bg-charcoal-deep border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            className="text-2xl font-serif font-bold"
            whileHover={{ scale: 1.05 }}
          >
            Usama<span className="text-primary">.</span>
          </motion.div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                onClick={() =>
                  document
                    .querySelector(`#${item.toLowerCase()}`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                />
              </motion.button>
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
            © {new Date().getFullYear()} Usama Jamil. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
