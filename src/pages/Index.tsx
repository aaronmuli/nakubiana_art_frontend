import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-artwork.jpg";
import lock from "@/assets/lock.svg";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getPaintings } from "@/api/paintings";
import { ProfileData } from "@/api/user";
import { home } from "@/api/analytics";

const Index = () => {

  async function triggerHome(){
    await home();
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["paintings"],
    staleTime: 24 * 60 * 60 * 1000,
    queryFn: getPaintings,
  });

  const {} = useQuery({
    queryKey: ["profile_data"],
    staleTime: 24 * 60 * 60 * 1000,
    queryFn: ProfileData,
  });

  useEffect(() => {
    triggerHome();
  },[]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-foreground">
      {/* Hero Image with slow cinematic zoom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 animate-slow-zoom"
      >
        <img
          src={heroImage}
          alt="Featured artwork"
          className="w-full h-full object-cover opacity-70"
          width={1920}
          height={1280}
        />
      </motion.div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 2.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute top-8 right-8 z-20"
      >
        <Link to="/auth">
          <div className="border border-primary-foreground/50 rounded-full p-3 hover:bg-primary-foreground/10 transition-colors">
            <img
              src={lock}
              alt="Lock icon"
              className="w-5 h-5"
            />
          </div>
        </Link>
      </motion.div>

      {/* Content — positioned bottom-left like a gallery wall label */}
      <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-20 md:pb-28">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <h1 className="text-exhibit font-heading italic text-primary-foreground font-light">
            Nakubiana . 
            {/* <br /> */}
            N
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-8 flex items-center gap-8"
        >
          <div className="h-[1px] w-16 bg-primary-foreground/30" />
          <p className="text-primary-foreground/50 text-xs tracking-[0.35em] uppercase font-body">
            Where silence finds its color
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-16"
        >
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-4 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-700"
          >
            <span className="text-xs tracking-[0.35em] uppercase font-body">Enter Gallery</span>
            <span className="block w-8 h-[1px] bg-current transition-all duration-700 group-hover:w-16" />
          </Link>
        </motion.div>
      </div>

      {/* Room number — exhibition detail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 right-8 md:right-16 z-10 text-primary-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase"
      >
        Room 01
      </motion.div>
    </div>
  );
};

export default Index;
