import artwork1 from "@/assets/artwork-1.png";
import artwork2 from "@/assets/artwork-2.png";
import artwork3 from "@/assets/artwork-3.png";
import artwork4 from "@/assets/artwork-4.png";
import artwork5 from "@/assets/artwork-5.png";
import artwork6 from "@/assets/artwork-6.png";

export interface Artwork {
  id: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  category: string;
  description: string;
  image: string;
}

// export const artworks: Artwork[] = [
  // {
  //   id: "1",
  //   title: "Blush & Gold I",
  //   description: "A meditation on softness and light. Layers of blush pink meet delicate gold leaf, creating a landscape that feels both intimate and vast — like the first breath of morning.",
  //   price: 2800,
  //   medium: "Mixed media on canvas",
  //   size: '36" × 48"',
  //   year: 2024,
  //   image: artwork1,
  //   available: true,
  //   aspectRatio: "portrait",
  // },
  // {
  //   id: "2",
  //   title: "Emerald Depths",
  //   description: "Born from nights spent watching storms roll across the sea. The deep greens and sudden bursts of white capture that electric moment when nature holds its breath.",
  //   price: 3200,
  //   medium: "Oil on canvas",
  //   size: '40" × 40"',
  //   year: 2024,
  //   image: artwork2,
  //   available: true,
  //   aspectRatio: "square",
  // },
  // {
  //   id: "3",
  //   title: "Terra Firma",
  //   description: "Earth, fire, and memory. This piece channels the raw energy of landscapes shaped by time — layers of terracotta and sienna that tell stories older than words.",
  //   price: 4500,
  //   medium: "Acrylic & oil on canvas",
  //   size: '30" × 48"',
  //   year: 2023,
  //   image: artwork3,
  //   available: false,
  //   aspectRatio: "portrait",
  // },
  // {
  //   id: "4",
  //   title: "Ensō",
  //   description: "Inspired by the Zen concept of the circle — a single gesture that contains everything and nothing. Painted in one breath, one movement, one moment of total presence.",
  //   price: 1800,
  //   medium: "Sumi ink on paper",
  //   size: '42" × 34"',
  //   year: 2024,
  //   image: artwork4,
  //   available: true,
  //   aspectRatio: "landscape",
  // },
  // {
  //   id: "5",
  //   title: "Midnight Cartography",
  //   description: "Maps of imaginary places drawn in gold on deep navy seas. This piece explores the territories between sleep and waking, between memory and invention.",
  //   price: 3800,
  //   medium: "Oil & gold leaf on canvas",
  //   size: '32" × 42"',
  //   year: 2024,
  //   image: artwork5,
  //   available: true,
  //   aspectRatio: "portrait",
  // },
  // {
  //   id: "6",
  //   title: "Whisper Study",
  //   description: "The quietest painting in the collection. Soft greys dissolve into white, like fog lifting from a still lake. An exercise in restraint and the beauty of almost-nothing.",
  //   price: 2200,
  //   medium: "Oil on linen",
  //   size: '36" × 44"',
  //   year: 2023,
  //   image: artwork6,
  //   available: true,
  //   aspectRatio: "portrait",
  // },
// ];
