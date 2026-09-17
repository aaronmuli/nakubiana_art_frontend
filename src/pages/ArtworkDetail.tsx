import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
// import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X } from "lucide-react";


const ArtworkDetail = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  // const { addToCart } = useCart();
  const [zoomed, setZoomed] = useState(false);

  const location = useLocation();
  const artwork = location.state || [];

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gallery-exhibit">
        <p className="text-muted-foreground text-label">Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gallery-exhibit">
      <Navbar />

      {/* Back link */}
      <div className="pt-32 px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/gallery" className="text-label gallery-link">
            ← Back to Exhibition
          </Link>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="px-8 md:px-16 pt-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
          {/* Image — takes up most of the space */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 cursor-zoom-in"
            onClick={() => setZoomed(true)}
          >
            <div className="relative overflow-hidden">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Wall label — right side, museum-style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 lg:col-start-10 flex flex-col justify-end"
          >
            <h1 className="font-heading text-room italic font-light">
              {artwork.title}
            </h1>

            <p className="text-label mt-2">{artwork.year}</p>

            {
              (artwork.year || artwork.title || artwork.description) && (
                <div className="h-[1px] w-10 bg-border mt-8 mb-8" />
              )
            }

            <p className="text-sm leading-[1.8] text-foreground/70 font-body">
              {artwork.description}
            </p>

            <div className="mt-10 space-y-4 text-xs font-body">
              { artwork.medium && (
                <div className="flex justify-between py-3 border-b border-border/60">
                  <span className="text-muted-foreground uppercase tracking-widest">Medium</span>
                  <span className="text-right">{artwork.medium}</span>
                </div>) 
              }
              {
                artwork.dimensions && (
                <div className="flex justify-between py-3 border-b border-border/60">
                  <span className="text-muted-foreground uppercase tracking-widest">Size</span>
                  <span>{artwork.dimensions}</span>
                </div>
                )
              }
            </div>
          </motion.div>
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-foreground/95 z-[80] flex items-center justify-center p-8 cursor-zoom-out"
            onClick={() => setZoomed(false)}
          >
            <button
              className="absolute top-8 right-8 text-background/60 hover:text-background transition-colors duration-300"
              onClick={() => setZoomed(false)}
            >
              <X size={20} strokeWidth={1} />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={artwork.image}
              alt={artwork.title}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="absolute bottom-8 left-8 text-background/40 text-label">
              {artwork.title}, {artwork.year}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ArtworkDetail;
