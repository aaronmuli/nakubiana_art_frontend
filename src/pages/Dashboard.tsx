import { UpdateUser, UpdateContact } from "../api/user";
import { Orbit } from 'ldrs/react'
import 'ldrs/react/Orbit.css'
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Palette,
  User,
  Mail,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  X,
  Menu,
  Save,
  ImagePlus,
} from "lucide-react";
import { toast } from "sonner";
import { 
  addPainting, 
  getPaintings, 
  trashPainting,
  updatePainting
} from "../api/paintings";


type Painting = {
  id?: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  category: string;
  description: string;
  image: string | File;
  // published: boolean;
};

type ArtistProfile = {
  id: string;
  photo: string | File;
  name: string;
  about: string;
};

const Dashboard = () => {
  const [isLoading, setLoading] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [paintingFile, setPaintingFile] = useState<File | null>(null);

  const [showPaintingForm, setShowPaintingForm] = useState(false);
  const [editingPainting, setEditingPainting] = useState<Painting | null>(null);

  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<ArtistProfile>({
    id: "",
    photo: "",
    name: "",
    about: ""
  });

  const [contact, setContact] = useState({
    id: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    instagram: "",
    facebook: "",
  });

  const [paintingForm, setPaintingForm] = useState({
    title: "",
    year: "",
    medium: "",
    dimensions: "",
    category: "",
    description: "",
    image: ""
  });

  const resetPaintingForm = () => {
    setPaintingForm({
      title: "",
      year: "",
      medium: "",
      dimensions: "",
      category: "",
      description: "",
      image: ""
    });

    setEditingPainting(null);
    setShowPaintingForm(false);
  };

  // state management with tanstack
  const { data } = useQuery({
    queryKey: ["paintings"],
    staleTime: 24 * 60 * 60 * 1000,
    queryFn: getPaintings,
  });

  const showSuccessToast = (message: string) => {
    toast.success(message);
  }
  
  const showErrorToast = (message: string) => {
    toast.error(message);
  }

  function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) { // 5 AM to 11:59 AM
      return "morning";
    } else if (hour >= 12 && hour < 17) { // 12 PM to 5 PM
      return "afternoon";
    } else if (hour >= 17 && hour < 21) { // 5 PM to 9 PM
      return "evening";
    } else {
      return "night"; // Covers 9 PM to 4:59 AM
    }
  }


  // Paintings Functions 
  async function handlePaintingSubmit (e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (editingPainting) {
      setPaintings((current) =>
        current.map((painting) =>
          painting.id === editingPainting.id
            ? {
                ...painting,
                ...paintingForm,
              }
            : painting
        )
      );
      
      let updatedPaintingData: Painting;

      if (paintingFile !== null) {
        updatedPaintingData = { ...editingPainting, ...paintingForm, image: paintingFile };
      } else {
        updatedPaintingData = { ...editingPainting, ...paintingForm };
      }
      const updatedPainting = await updatePainting(updatedPaintingData, editingPainting.id as string);
      if (updatedPainting) {
        setLoading(false);
        showSuccessToast("Painting updated successfully!");
        setPaintingFile(null);
      }
      else {
        setLoading(false);
        showErrorToast("Failed to update painting. Please try again.");
        setPaintingFile(null);
      }
    } else {
      const newPainting: Painting = {
        ...paintingForm,
      };

      let finalPainting: Painting;

      if (paintingFile !== null) {
        finalPainting = { ...paintingForm, image: paintingFile };
      } else {
        finalPainting = { ...paintingForm };
      }

      const upload = await addPainting(finalPainting);

      setPaintings((current) => [newPainting, ...current]);
      
      if (upload) {
        setLoading(false);
        showSuccessToast("Painting added successfully!");
        setPaintingFile(null);
      }
      else {
        setLoading(false);
        showErrorToast("Failed to add painting. Please try again.");
        setPaintingFile(null);
      }
    }

    resetPaintingForm();
    setLoading(false);
  };

  const editPainting = (painting: Painting) => {
    setEditingPainting(painting);

    setPaintingForm({
      title: painting.title,
      year: painting.year,
      medium: painting.medium,
      dimensions: painting.dimensions,
      category: painting.category,
      description: painting.description,
      image: painting.image as string,
      // published: painting.published,
    });

    setShowPaintingForm(true);
  };

  const deletePainting = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this painting?"
    );

    if (!confirmed) return;
    if (confirmed) setLoading(true);

    const deletedId = trashPainting(id);

    if (!deletedId) {
      showErrorToast("Failed to delete painting. Please try again.");
      return;
    }

    setPaintings((current) =>
      current.filter((painting) => painting.id !== id)
    );
    setLoading(false);
    showSuccessToast("Painting deleted successfully!");
  };

  // Profile Functions
  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("authenticated");
    window.location.href = "/auth";
  }
  
  async function saveContact(e: React.FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await UpdateContact(contact);

      const storedData = {
        profile: profile,
        ...response
      }

      setContact(response);
      localStorage.setItem("user", JSON.stringify(storedData));

      setLoading(false);
      showSuccessToast("Contact information saved successfully!");
    } catch (error) {
      setLoading(false);
      showErrorToast("Failed to save contact information. Please try again.");
    }
  };

  async function saveProfile(e: React.FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      let updatedProfile: ArtistProfile;

      if (profilePhotoFile !== null) {
        updatedProfile = { ...profile, photo: profilePhotoFile };
      } else {
        updatedProfile = profile;
      }
      const response = await UpdateUser(updatedProfile);

      const storedData = {
        profile: response,
        ...contact
      }

      setProfilePhotoFile(null);
      setProfile(response);
      localStorage.setItem("user", JSON.stringify(storedData));

      setLoading(false);
      showSuccessToast("Profile updated successfully!");
    } catch (error) {
      setLoading(false);
      showErrorToast("Failed to update profile. Please try again.");
      setProfilePhotoFile(null);
    }
  };

  const navigation = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "paintings",
      label: "Paintings",
      icon: Palette,
    },
    {
      id: "profile",
      label: "Artist Profile",
      icon: User,
    },
    {
      id: "contact",
      label: "Contact",
      icon: Mail,
    },
  ];


  useEffect(() => {
    const timeofDay = getTimeOfDay();
    setTimeOfDay(timeofDay);
    
    const user = JSON.parse(localStorage.getItem("user"));
    
    setProfile({
      id: user?.profile.id,
      photo: user?.profile.photo,
      name: user?.profile.name,
      about: user?.profile.about,
    });
    setContact({
      id: user?.id,
      email: user?.email,
      password: "",
      phone: user?.phone,
      location: user?.location,
      instagram: user?.instagram,
      facebook: user?.facebook,
    });

    if(data) {
      setPaintings(data as Painting[]);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[#f7f6f3] text-[#181818]">
      {
        isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                <Orbit
                    size="35"
                    speed="1.5"
                    color="white" 
                />
            </div>
        )
      }
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-screen w-64 border-r border-black/10
          bg-[#f7f6f3] px-6 py-8 transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="mb-14">
            <h1 className="font-serif text-2xl italic">
              Nakubiana<span className="text-black/40">.</span>
            </h1>

            <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-black/40">
              Artist Administration
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    flex w-full items-center gap-3 px-3 py-3 text-left
                    text-sm transition-all duration-300
                    ${
                      active
                        ? "bg-black text-white"
                        : "text-black/50 hover:bg-black/5 hover:text-black"
                    }
                  `}
                >
                  <Icon size={17} strokeWidth={1.5} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-3 text-sm text-black/50 transition hover:text-black"
            >
              <ExternalLink size={17} strokeWidth={1.5} />
              View Website
            </Link>

            <button
              className="flex w-full items-center gap-3 border-t border-black/10 px-3 py-4 text-left text-sm text-black/50 transition hover:text-black"
              onClick={() => {
                handleLogout();
              }}
            >
              <LogOut size={17} strokeWidth={1.5} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-black/10 bg-[#f7f6f3]/90 px-6 backdrop-blur-md md:px-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <div className="ml-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-black/40">
              Artist Dashboard
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          {/* DASHBOARD */}
          {activeSection === "dashboard" && (
            <DashboardHome
              paintings={paintings}
              onNavigate={setActiveSection}
              profile={profile}
              timeOfDay={timeOfDay}
            />
          )}

          {/* PAINTINGS */}
          {activeSection === "paintings" && (
            <section>
              <SectionHeader
                eyebrow="Gallery"
                title="Paintings"
                description="Manage the artworks displayed in your online gallery."
                action={
                  <button
                    onClick={() => setShowPaintingForm(true)}
                    className="flex items-center gap-2 bg-black px-5 py-3 text-xs uppercase tracking-[0.15em] text-white transition hover:bg-black/80"
                  >
                    <Plus size={16} />
                    Add Painting
                  </button>
                }
              />

              <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paintings.map((painting) => (
                  <div
                    key={painting.id}
                    className="group overflow-hidden border border-black/10 bg-white"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                      <img
                        src={painting.image as string}
                        alt={painting.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-xl">
                            {painting.title}
                          </h3>

                          <p className="mt-1 text-xs text-black/40">
                            {painting.year} · {painting.medium}
                          </p>
                        </div>

                        <span className="text-[10px] uppercase tracking-widest text-black/30">
                          {painting.category}
                        </span>
                      </div>

                      <div className="mt-5 flex gap-2 border-t border-black/10 pt-4">
                        <button
                          onClick={() => editPainting(painting)}
                          className="flex flex-1 items-center justify-center gap-2 border border-black/10 py-2 text-xs transition hover:bg-black hover:text-white"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>

                        <button
                          onClick={() => deletePainting(painting.id)}
                          className="flex items-center justify-center border border-black/10 px-4 text-black/40 transition hover:border-red-200 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROFILE */}
          {activeSection === "profile" && (
            <section>
              <SectionHeader
                eyebrow="About"
                title="Artist Profile"
                description="Control how the artist is introduced on the website."
              />
            <form onSubmit={saveProfile}>
              <div className="mt-10 max-w-3xl">
                <div className="space-y-8">
                  <div className="group">
                    <div className="relative flex aspect-[4/2] items-center justify-center overflow-hidden border border-dashed border-black/20 bg-white group hover:border-black/40 transition-colors">
                      {profile.photo ? (
                        <img
                          src={profile.photo as string}
                          alt="Profile photo preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-black/30 pointer-events-none">
                          <ImagePlus
                            className="mx-auto mb-3 group-hover:scale-105 transition-transform"
                            size={30}
                            strokeWidth={1}
                          />
                          <p className="text-xs">
                            Choose or drag a profile photo to upload.
                          </p>
                        </div>
                      )}
                      {/* Hidden interactive input layer that naturally handles click and drag-and-drop */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfilePhotoFile(file);
                            setProfile({
                              ...profile,
                              photo: URL.createObjectURL(file),
                            });
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>
                  </div>

                  <FormField label="Artist Name">
                    <input
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          name: e.target.value,
                        })
                      }
                      className="input"
                    />
                  </FormField>

                  <FormField label="About the Artist">
                    <textarea
                      rows={7}
                      value={profile.about}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          about: e.target.value,
                        })
                      }
                      className="input resize-none"
                    />
                  </FormField>
                  <button type="submit" className="flex items-center gap-2 bg-black px-6 py-3 text-xs uppercase tracking-[0.15em] text-white transition hover:bg-black/80">
                    <Save size={15} />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
            </section>
          )}

          {/* CONTACT */}
          {activeSection === "contact" && (
            <section>
              <SectionHeader
                eyebrow="Contact"
                title="Contact Information"
                description="Manage the contact details and social links shown on your website."
              />

              <form onSubmit={saveContact} className="mt-10 max-w-3xl space-y-8">
                <FormField label="Email Address">
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        email: e.target.value,
                      })
                    }
                    className="input"
                  />
                </FormField>

                <FormField label="Phone Number">
                  <input
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        phone: e.target.value,
                      })
                    }
                    className="input"
                  />
                </FormField>

                <FormField label="Location">
                  <input
                    value={contact.location}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        location: e.target.value,
                      })
                    }
                    className="input"
                  />
                </FormField>

                <FormField label="Instagram">
                  <input
                    value={contact.instagram}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        instagram: e.target.value,
                      })
                    }
                    className="input"
                  />
                </FormField>

                <FormField label="Facebook">
                  <input
                    value={contact.facebook}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        facebook: e.target.value,
                      })
                    }
                    className="input"
                  />
                </FormField>

                <FormField label="New Password">
                  <input
                    type="password"
                    value={contact.password}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        password: e.target.value,
                      })
                    }
                    className="input"
                  />
                </FormField>

                <button type="submit" className="flex items-center gap-2 bg-black px-6 py-3 text-xs uppercase tracking-[0.15em] text-white transition hover:bg-black/80">
                  <Save size={15} />
                  Save Changes
                </button>
              </form>
            </section>
          )}
        </div>
      </main>

      {/* PAINTING MODAL */}
      {showPaintingForm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#f7f6f3]">
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
                  Gallery
                </p>

                <h2 className="mt-1 font-serif text-2xl">
                  {editingPainting ? "Edit Painting" : "Add New Painting"}
                </h2>
              </div>

              <button
                onClick={resetPaintingForm}
                className="text-black/40 transition hover:text-black"
              >
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={handlePaintingSubmit}
              className="space-y-6 p-6"
            >
              <div>
                <label className="label">Artwork Image</label>
              
                <div className="relative flex aspect-[4/2] items-center justify-center overflow-hidden border border-dashed border-black/20 bg-white group hover:border-black/40 transition-colors">
                  {paintingForm.image ? (
                    <img
                      src={paintingForm.image}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-black/30 pointer-events-none">
                      <ImagePlus
                        className="mx-auto mb-3 group-hover:scale-105 transition-transform"
                        size={30}
                        strokeWidth={1}
                      />
                      <p className="text-xs">
                        Choose or drag a painting to upload.
                      </p>
                    </div>
                  )}

                  {/* Hidden interactive input layer that naturally handles click and drag-and-drop */}
                  <input
                    required={!editingPainting}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPaintingFile(file);
                        setPaintingForm({
                          ...paintingForm,
                          image: URL.createObjectURL(file),
                        });
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
              </div>


              <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Title">
                  <input
                    value={paintingForm.title}
                    onChange={(e) =>
                      setPaintingForm({
                        ...paintingForm,
                        title: e.target.value,
                      })
                    }
                    className="input"
                  />
                </FormField>

                <FormField label="Year">
                  <input
                    value={paintingForm.year}
                    onChange={(e) =>
                      setPaintingForm({
                        ...paintingForm,
                        year: e.target.value,
                      })
                    }
                    className="input"
                  />
                </FormField>

                <FormField label="Medium">
                  <input
                    placeholder="Oil on canvas"
                    value={paintingForm.medium}
                    onChange={(e) =>
                      setPaintingForm({
                        ...paintingForm,
                        medium: e.target.value,
                      })
                    }
                    className="input"
                  />
                </FormField>

                <FormField label="Dimensions">
                  <input
                    placeholder="120 × 90 cm"
                    value={paintingForm.dimensions}
                    onChange={(e) =>
                      setPaintingForm({
                        ...paintingForm,
                        dimensions: e.target.value,
                      })
                    }
                    className="input"
                  />
                </FormField>
              </div>

              <FormField label="Category">
                <select
                  value={paintingForm.category}
                  onChange={(e) =>
                    setPaintingForm({
                      ...paintingForm,
                      category: e.target.value,
                    })
                  }
                  className="input"
                >
                  <option value="">Select category</option>
                  <option value="Abstract">Abstract</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Landscape">Landscape</option>
                  <option value="Figurative">Figurative</option>
                  <option value="Mixed Media">Mixed Media</option>
                  <option value="Other">Other</option>
                </select>
              </FormField>

              <FormField label="Description">
                <textarea
                  rows={5}
                  value={paintingForm.description}
                  onChange={(e) =>
                    setPaintingForm({
                      ...paintingForm,
                      description: e.target.value,
                    })
                  }
                  className="input resize-none"
                  placeholder="Tell visitors about this artwork..."
                />
              </FormField>

              <div className="flex justify-end gap-3 border-t border-black/10 pt-6">
                <button
                  type="button"
                  onClick={resetPaintingForm}
                  className="border border-black/10 px-5 py-3 text-xs uppercase tracking-widest transition hover:bg-black/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-black px-6 py-3 text-xs uppercase tracking-widest text-white transition hover:bg-black/80"
                >
                  {editingPainting
                    ? "Save Painting"
                    : "Publish Painting"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------ */
/* Dashboard Home                                  */
/* ------------------------------------------------ */

const DashboardHome = ({
  paintings,
  onNavigate,
  profile,
  timeOfDay,
}: {
  paintings: Painting[];
  onNavigate: (section: string) => void;
  profile: ArtistProfile;
  timeOfDay: string;
}) => {
  // const published = paintings.filter((painting) => painting.published);

  return (
    <section>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
          Welcome back
        </p>

        <h1 className="mt-2 font-serif text-4xl md:text-5xl">
          Good {timeOfDay}, { profile.name }.
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/50">
          Manage your artwork, artist profile and contact information
          from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-12 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2">
        <Stat
          label="Total Paintings"
          value={paintings.length.toString()}
        />

        <Stat
          label="Admin accounts"
          value="1"
        />

        {/* <Stat
          label="Drafts"
          value={(paintings.length - published.length).toString()}
        /> */}
      </div>

      {/* Recent paintings */}
      <div className="mt-14">
        <div className="flex items-end justify-between border-b border-black/10 pb-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
              Gallery
            </p>

            <h2 className="mt-1 font-serif text-2xl">
              Recent Paintings
            </h2>
          </div>

          <button
            onClick={() => onNavigate("paintings")}
            className="text-xs uppercase tracking-widest text-black/50 hover:text-black"
          >
            View all
          </button>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {paintings.slice(0, 3).map((painting) => (
            <div key={painting.id}>
              <div className="aspect-[4/3] overflow-hidden bg-black/5">
                <img
                  src={painting.image as string}
                  alt={painting.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="mt-3 font-serif text-lg">
                {painting.title}
              </h3>

              <p className="text-xs text-black/40">
                {painting.year} · {painting.medium}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------ */
/* Components                                      */
/* ------------------------------------------------ */

const SectionHeader = ({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
          {eyebrow}
        </p>

        <h1 className="mt-2 font-serif text-4xl">{title}</h1>

        <p className="mt-3 text-sm text-black/50">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
};

const FormField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
};

const Stat = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="bg-white p-7">
      <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
        {label}
      </p>

      <p className="mt-3 font-serif text-4xl">{value}</p>
    </div>
  );
};

export default Dashboard;