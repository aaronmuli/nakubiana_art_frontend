import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Artwork } from "@/data/artworks";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

const ArtworkCard = ({ artwork, index }: ArtworkCardProps) => {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 items-end ${
        isEven ? "" : "md:direction-rtl"
      }`}
    >
      {/* Image */}
      <Link
        to={`/artwork/${artwork.id}`}
        state={artwork}
        className={`relative group overflow-hidden ${
          isEven ? "md:col-span-7" : "md:col-span-7 md:col-start-6"
        }`}
      >
        <div className="overflow-hidden">
          <img
            src={artwork.image}
            alt={artwork.title}
            loading="lazy"
            className="w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
        </div>
        {/* Sold badge */}
        {/* {!artwork.available && (
          <div className="absolute top-0 left-0 bg-foreground text-background text-label px-4 py-2 tracking-[0.2em]">
            Sold
          </div>
        )} */}
      </Link>

      {/* Label — positioned like a museum wall label */}
      <div
        className={`${
          isEven
            ? "md:col-span-4 md:col-start-9 md:pl-12"
            : "md:col-span-4 md:col-start-1 md:pr-12 md:row-start-1"
        }`}
      >
        <Link to={`/artwork/${artwork.id}`} state={artwork} className="block group">
          <p className="text-label mb-3">No. {String(index + 1).padStart(2, "0")}</p>
          <h3 className="font-heading text-wall italic group-hover:opacity-60 transition-opacity duration-500">
            {artwork.title}
          </h3>
          <div className="h-[1px] w-8 bg-border mt-4 mb-4" />
          <p className="text-xs text-muted-foreground font-body">{artwork.medium}</p>
          <p className="text-xs text-muted-foreground font-body mt-1">{artwork.dimensions}</p>
          {/* <p className="font-heading text-base mt-4">
            ${artwork.price.toLocaleString()}
          </p> */}
        </Link>
      </div>
    </motion.article>
  );
};

export default ArtworkCard;
