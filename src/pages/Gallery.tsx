import { motion } from "framer-motion";
import { Artwork } from "@/data/artworks";
import ArtworkCard from "@/components/ArtworkCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Orbit } from 'ldrs/react'
import 'ldrs/react/Orbit.css'
import { getPaintings } from "@/api/paintings";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Gallery = () => {

  interface Painting {
    id: string;
    title: string;
    year: string;
    medium: string;
    dimensions: string;
    category: string;
    description: string;
    image: string;
    // published: boolean;
  };

  const [paintings, setPaintings] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["paintings"],
    staleTime: 24 * 60 * 60 * 1000,
    queryFn: getPaintings,
  });

  const showErrorToast = (message: string) => {
    toast.error(message);
  }

  useEffect(() => {
    if(data) {
      setPaintings(data);
      setLoading(false);
    }
    else if(isLoading) {
      setLoading(true);
    }
    else if (error) {
      setError(error);
      showErrorToast("Failed to fetch paintings. Please try again.");
    }
  }, [data, isLoading, error]);

  return (
    <div className="min-h-screen bg-gallery-exhibit">
      <Navbar />

      {/* Exhibition header */}
      <div className="pt-40 md:pt-52 pb-24 md:pb-32 px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <p className="text-label mb-6">Current Exhibition</p>
          <h1 className="text-exhibit font-heading italic font-light">
            The
            <br />
            Collection
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 flex items-center gap-6"
        >
          <div className="h-[1px] w-16 bg-gallery-stone/30 animate-reveal-line" />
          <p className="text-muted-foreground text-sm font-body max-w-md">
            Six original works exploring the space between memory and sensation.
            Each piece is a room you can walk into.
          </p>
        </motion.div>
      </div>

      {/* Artworks — editorial staggered layout */}
      {
        loading ? (
          <div className="flex items-center justify-center">
            <Orbit
                size="35"
                speed="1.5"
                color="black" 
            />
          </div>
        ):
        (
          <div className="px-8 md:px-16 pb-32 space-y-28 md:space-y-40">
            {paintings.map((artwork, index) => (
              <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
            ))}
          </div>
        )
      }

      {/* Exhibition end marker */}
      <div className="flex flex-col items-center py-24 text-muted-foreground/40">
        <div className="w-[1px] h-16 bg-current mb-6" />
        <p className="text-label">End of Exhibition</p>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
