import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const CartPanel = () => {
  const { items, removeFromCart, isOpen, setIsOpen, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-[60]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 35, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-gallery-exhibit z-[70] flex flex-col border-l border-border/40"
          >
            <div className="flex items-center justify-between p-8 pb-6">
              <p className="text-label">Your Selection</p>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-40 transition-opacity duration-500">
                <X size={16} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 space-y-8">
              {items.length === 0 ? (
                <p className="text-muted-foreground text-xs font-body pt-16 text-center">
                  No pieces selected
                </p>
              ) : (
                items.map((item) => (
                  <div key={item.artwork.id} className="flex gap-5">
                    <img
                      src={item.artwork.image}
                      alt={item.artwork.title}
                      className="w-16 h-20 object-cover"
                      loading="lazy"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-heading italic text-sm">{item.artwork.title}</h3>
                        <p className="text-[10px] text-muted-foreground font-body mt-1">{item.artwork.medium}</p>
                      </div>
                      {/* <p className="font-heading italic text-sm">${item.artwork.price.toLocaleString()}</p> */}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.artwork.id)}
                      className="self-start text-label hover:opacity-40 transition-opacity duration-500"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 pt-6 border-t border-border/40 space-y-6">
                <div className="flex justify-between">
                  <span className="text-label">Total</span>
                  <span className="font-heading italic text-lg">${total.toLocaleString()}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-foreground text-background text-center py-4 text-label tracking-[0.2em] hover:opacity-80 transition-opacity duration-500"
                >
                  Proceed
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;
