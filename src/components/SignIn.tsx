"use client";
import React, { useState, useEffect } from "react";
import { emailSignIn, signInWithGoogle } from "@/firebase/auth/signIn";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/BaseConfig";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { user, loading } = useAuth();
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setTimeout(() => {
                    router.push("/dashboard");
                }, 0);
            }
        });

        return unsubscribe;
    }, [router]);

    useEffect(() => {
        if (redirect) {
            router.push('/dashboard');
        }
    }, [redirect, router]);

    if (user && !loading) {
        router.push("/dashboard");
    }

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        
        const result = await signInWithGoogle();
        
        if (result.success) {
            setTimeout(() => {
                router.push('/dashboard');
            }, 0);
        } else {
            setError(result.error);
        }
        
        setIsLoading(false);
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await emailSignIn(email, password);
        if (result.success) {
            setRedirect(true);
        } else {
            setError(result.error || "Erro ao fazer login");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-purple-300 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-2xl border border-purple-800">
                <div>
                    <h1 className="text-center text-3xl font-extrabold text-purple-300 mb-2">Welcome Back</h1>
                    <p className="text-center text-sm text-gray-400">Enter your realm</p>
                </div>
                <form onSubmit={handleEmailSignIn} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none relative block w-full px-3 py-2 border border-purple-700 
                            placeholder-gray-500 text-gray-200 rounded-md bg-gray-700 focus:outline-none 
                            focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none relative block w-full px-3 py-2 border border-purple-700 
                            placeholder-gray-500 text-gray-200 rounded-md bg-gray-700 focus:outline-none 
                            focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {error && <div className="text-red-400 text-sm text-center">{error}</div>}

                    <div className="space-y-4">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                            text-sm font-medium rounded-md text-white bg-purple-800 hover:bg-purple-700 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
                            transition-colors duration-200"
                        >
                            Enter
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center px-4 py-2 border border-purple-700 
                            rounded-md shadow-sm text-sm font-medium text-purple-300 bg-gray-800 
                            hover:bg-gray-700 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                                />
                            </svg>
                            {isLoading ? "Loading..." : "Sign in with Google"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;