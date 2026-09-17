import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Orbit } from 'ldrs/react'
import 'ldrs/react/Orbit.css'

import { ProfileData } from "@/api/user";

const Contact = () => {
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

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent. We will be in touch soon.");
    setForm({ name: "", email: "", message: "" });
  };

  const inputClasses = (field: string) =>
    `w-full bg-transparent border-b py-4 text-foreground text-sm font-body focus:outline-none transition-colors duration-500 ${
      focused === field ? "border-foreground" : "border-border/60"
    }`;

   useEffect(() => {
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

      <div className="pt-40 md:pt-52 pb-20 px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-label mb-6">Get in Touch</p>
          <h1 className="text-exhibit font-heading italic font-light">
            Let's
            <br />
            Talk
          </h1>
        </motion.div>
      </div>

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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit}
                className="lg:col-span-6 space-y-10"
              >
                <div>
                  <label className="text-label block mb-3">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your Name"
                    className={inputClasses("name")}
                  />
                </div>
                <div>
                  <label className="text-label block mb-3">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your Email"
                    className={inputClasses("email")}
                  />
                </div>
                <div>
                  <label className="text-label block mb-3">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your Message"
                    className={`${inputClasses("message")} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-4 text-label tracking-[0.2em] hover:opacity-50 transition-opacity duration-500 pt-4"
                >
                  <span>Send Message</span>
                  <span className="block w-8 h-[1px] bg-current transition-all duration-700 group-hover:w-16" />
                </button>
              </motion.form>

              {/* Side info */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end"
              >
                <div className="space-y-12">
                  {/* <div>
                    <p className="text-label mb-3">Email</p>
                    <a href="mailto:hello@elaravoss.art" className="font-heading italic text-lg gallery-link">
                      hello@elaravoss.art
                    </a>
                  </div> */}
                  <div>
                    <p className="text-label mb-3">Studio</p>
                    <p className="text-sm text-foreground/70 font-body leading-relaxed">
                      { profileData.location }
                    </p>
                  </div>
                  <div className="md:col-span-2 md:col-start-11">
                    <p className="text-label mb-3">Social</p>
                    <div className="space-y-3 flex flex-col">
                      <a
                        href={profileData.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-body gallery-link self-start"
                      >
                        Instagram
                      </a>
                      <a
                        href={profileData.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-body gallery-link self-start"
                      >
                        Facebook
                      </a>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-border/40">
                    <p className="text-label mb-3">Commissions</p>
                    <p className="text-sm text-foreground/70 font-body leading-[1.8]">
                      Every commissioned work begins with a conversation.
                      Tell me your vision, and together we'll create something
                      that speaks to you.
                    </p>
                  </div>
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

export default Contact;
