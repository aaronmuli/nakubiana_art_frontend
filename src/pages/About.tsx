import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Orbit } from 'ldrs/react'
import 'ldrs/react/Orbit.css'

import { ProfileData } from "@/api/user";
import { toast } from "sonner";
import { about } from "@/api/analytics";

const About = () => {

  interface ContactModel {
    id: string;
    email: string;
    phone: string;
    location: string;
    instagram: string;
    facebook: string;  
    profile: ProfileModel
  }
  interface ProfileModel {
      id: string;
      photo: string;
      name: string;
      about: string;
      // contact: ContactModel;
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [errored, setErrored] = useState(null);
  const [profileData, setProfileData] = useState<ContactModel>({
    id: "",
    email: "",
    phone: "",
    location: "",
    instagram: "",
    facebook: "",  
    profile: {
      id: "",
      name: "",
      photo: "",
      about: "",
    }
  });

  const {data, isLoading, error} = useQuery({
    queryKey: ["profile_data"],
    staleTime: 24 * 60 * 60 * 1000,
    queryFn: ProfileData,
  });

  const showErrorToast = (message: string) => {
    toast.error(message);
  }

  async function triggerAbout() {
    await about();
  }

  useEffect(() => {
    triggerAbout();
    
    if(data) {
      setProfileData(data);
      setLoading(false);
    }
    else if(isLoading) {
      setLoading(true);
    }
    else if (error) {
      setErrored(error);
      showErrorToast("Failed to fetch paintings. Please try again.");
    }
  }, [data, isLoading, error]);

  return (
    <div className="min-h-screen bg-gallery-exhibit">
      <Navbar />

      {/* Title section */}
      <div className="pt-40 md:pt-52 pb-20 px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-label mb-6">About the Artist</p>
          <h1 className="text-exhibit font-heading italic font-light">
            The
            <br />
            Artist
          </h1>
        </motion.div>
      </div>

      {/* Content — asymmetric layout */}
      {
        loading ? (
          <div className="flex items-center justify-center px-8 md:px-16 pb-32">
            <Orbit
                size="35"
                speed="1.5"
                color="black" 
                />
          </div>
        ) : (
          <div className="px-8 md:px-16 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
              {/* Portrait */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5"
              >
                <img
                  src={profileData.profile.photo}
                  alt="Artist profile picture"
                  className="w-full object-cover"
                  loading="lazy"
                  width={800}
                  height={1000}
                />
                {/* <p className="text-label mt-4">In the studio, 2024</p> */}
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center"
              >
                <div className="space-y-8 text-foreground/70 text-sm leading-[2] font-body">
                  <p>
                   { profileData.profile.about }
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )
      }

      <Footer />
    </div>
  );
};

export default About;
