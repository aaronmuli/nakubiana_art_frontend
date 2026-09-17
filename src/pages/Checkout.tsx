import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Checkout = () => {
  const { items, total, clearCart } = useCart();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed! You'll receive a confirmation email shortly.");
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-6 md:px-12 text-center">
          <h1 className="font-heading text-4xl font-light">Your cart is empty</h1>
          <Link to="/gallery" className="mt-8 inline-block gallery-link text-sm tracking-widest uppercase">
            Browse Gallery
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading text-3xl font-light mb-8">Checkout</h1>
            <form onSubmit={handleCheckout} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">First Name</label>
                  <input required className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-foreground transition-colors" />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Last Name</label>
                  <input required className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-foreground transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Email</label>
                <input type="email" required className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-foreground transition-colors" />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Address</label>
                <input required className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-foreground transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">City</label>
                  <input required className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-foreground transition-colors" />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Postal Code</label>
                  <input required className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-foreground transition-colors" />
                </div>
              </div>
              <button type="submit" className="w-full bg-foreground text-background py-3 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity mt-6">
                Place Order — ${total.toLocaleString()}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="font-heading text-2xl font-light mb-8">Order Summary</h2>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.artwork.id} className="flex gap-4">
                  <img src={item.artwork.image} alt={item.artwork.title} className="w-20 h-24 object-cover" loading="lazy" />
                  <div>
                    <h3 className="font-heading text-lg">{item.artwork.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.artwork.medium}</p>
                    <p className="text-sm mt-1">${item.artwork.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-border flex justify-between font-heading text-xl">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
