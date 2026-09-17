import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Orbit } from 'ldrs/react'
import 'ldrs/react/Orbit.css'
import { loginUser } from "../api/user";
import { toast } from "sonner";


const Auth = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("authenticated") === "true";
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const showSuccessToast = (message: string) => {
        toast.success(message);
    }
    
    const showErrorToast = (message: string) => {
        toast.error(message);
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            setIsLoading(true);
        
            const res = await loginUser(email, password);
            if (res.id && res.profile?.id) {
                localStorage.setItem("user", JSON.stringify(res));
                localStorage.setItem("authenticated", "true");
                setIsLoading(false);
                navigate("/dashboard");
            } else {
                showErrorToast("Login failed. Please check your credentials.");
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            showErrorToast("An error occurred while logging in.");
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F3EE] flex flex-col">
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="py-20"
        >
        {/* Login */}
        <main className="flex-1 flex items-center justify-center px-6">
            <div className="w-full max-w-[400px]">

            <div className="mb-10">
                <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-4">
                Administration
                </p>

                <h1 className="font-serif text-4xl md:text-5xl text-neutral-900">
                Sign in
                </h1>

                <p className="mt-4 text-sm text-neutral-500">
                Access your artist studio.
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>

                {/* Email */}
                <div>
                <label
                    htmlFor="email"
                    className="block text-[11px] uppercase tracking-[0.15em] text-neutral-600 mb-2"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    required
                    className="w-full h-12 px-4 bg-transparent border border-neutral-300
                            text-sm text-neutral-900 outline-none
                            focus:border-neutral-900 transition-colors"
                />
                </div>

                {/* Password */}
                <div>
                <label
                    htmlFor="password"
                    className="block text-[11px] uppercase tracking-[0.15em] text-neutral-600 mb-2"
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="w-full h-12 px-4 bg-transparent border border-neutral-300
                            text-sm text-neutral-900 outline-none
                            focus:border-neutral-900 transition-colors"
                />
                </div>

                {/* Submit */}
                <button
                type="submit"
                className="w-full h-12 bg-neutral-900 text-white
                            text-[11px] uppercase tracking-[0.18em]
                            hover:bg-neutral-800 transition-colors"
                >
                    Sign in
                </button>
            </form>

            {/* Back */}
            <div className="mt-10 text-center">
                <a
                href="/"
                className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                ← Back to website
                </a>
            </div>

            </div>
        </main>
        </motion.div>
        {/* Footer */}
        {/* <footer className="px-6 py-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400">
            Private Studio
            </p>
        </footer> */}
        </div>
    );
}

export default Auth;