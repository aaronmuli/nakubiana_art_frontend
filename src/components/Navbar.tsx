import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { setIsOpen, itemCount } = useCart();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-8 ${
        isHome
          ? "mix-blend-difference text-primary-foreground"
          : "bg-background/60 backdrop-blur-xl text-foreground border-b border-border/50"
      }`}
    >
      <Link to="/" className="font-heading text-lg md:text-xl italic tracking-normal">
        Nakubiana . N
      </Link>

      <div className="flex items-center gap-10 text-label">
        <Link to="/gallery" className="gallery-link hidden md:block">
          Gallery
        </Link>
        <Link to="/about" className="gallery-link hidden md:block">
          About
        </Link>
        <Link to="/contact" className="gallery-link hidden md:block">
          Contact
        </Link>
        {/* <button
          onClick={() => setIsOpen(true)}
          className="relative transition-opacity hover:opacity-50 duration-500 text-label"
          aria-label="Open cart"
        >
          Cart{itemCount > 0 && <span className="ml-1">({itemCount})</span>}
        </button> */}
      </div>
    </motion.nav>
  );
};

export default Navbar;
