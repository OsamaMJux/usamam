import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import MagneticButton from "./interactive/MagneticButton";

const navItems = [
  { label: "About", href: "#about" },
  { 
    label: "Products", 
    href: "/products",
    isDropdown: true,
    dropdownItems: [
      { label: "All Products", href: "/products", description: "Browse all offerings" },
      { label: "Skills & Expertise", href: "/products#skills", description: "What I bring to the table" },
      { label: "Services", href: "/products#services", description: "How I can help you" },
      { label: "Digital Products", href: "/products#digital", description: "Templates & resources" },
    ]
  },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      if (!isHomePage) {
        window.location.href = "/" + href;
        return;
      }
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isDropdown) {
      setActiveDropdown(activeDropdown === item.label ? null : item.label);
    } else {
      scrollToSection(item.href);
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="text-2xl font-serif italic font-bold text-foreground hover:text-primary transition-colors"
            >
              Usama<span className="text-primary">.</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.isDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.isDropdown ? (
                  <>
                    <motion.button
                      onClick={() => handleNavClick(item)}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group flex items-center gap-1"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {item.label}
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="bg-card border border-border rounded-xl shadow-card p-2 min-w-[240px]">
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <Link
                                key={idx}
                                to={dropdownItem.href}
                                onClick={() => setActiveDropdown(null)}
                                className="block px-4 py-3 rounded-lg hover:bg-secondary transition-colors group"
                              >
                                <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                  {dropdownItem.label}
                                </span>
                                <span className="block text-xs text-muted-foreground mt-0.5">
                                  {dropdownItem.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -2 }}
                  >
                    {item.label}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <MagneticButton strength={0.15}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => scrollToSection("#contact")}
                >
                  Let's Talk
                </Button>
              </motion.div>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden py-6 border-t border-border bg-background/95 backdrop-blur-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <div key={item.label}>
                    {item.isDropdown ? (
                      <>
                        <motion.button
                          onClick={() => handleNavClick(item)}
                          className="flex items-center justify-between w-full text-left text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * index }}
                        >
                          {item.label}
                          <ChevronDown 
                            size={18} 
                            className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                          />
                        </motion.button>
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 border-l-2 border-primary/30 ml-2 overflow-hidden"
                            >
                              {item.dropdownItems?.map((dropdownItem, idx) => (
                                <Link
                                  key={idx}
                                  to={dropdownItem.href}
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className="block py-2 px-2"
                                >
                                  <span className="text-foreground font-medium">{dropdownItem.label}</span>
                                  <span className="block text-xs text-muted-foreground">{dropdownItem.description}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <motion.button
                        onClick={() => scrollToSection(item.href)}
                        className="text-left text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-2 w-full"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                        whileHover={{ x: 10 }}
                      >
                        {item.label}
                      </motion.button>
                    )}
                  </div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4"
                >
                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={() => scrollToSection("#contact")}
                  >
                    Let's Talk
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
