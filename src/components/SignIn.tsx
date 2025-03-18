"use client";
import React, { useState } from "react";
import { emailSignIn, signInWithGoogle } from "@/firebase/auth/signIn";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/BaseConfig";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { loading } = useAuth();

    const checkProfileCompletion = async (userId: string) => {
        try {
            const userDoc = await getDoc(doc(db, "users", userId));
            return userDoc.exists() && userDoc.data().isProfileComplete === true;
        } catch (error) {
            console.error("Error checking profile completion:", error);
            return false;
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const result = await signInWithGoogle();
            
            if (result.success && result.user) {
                if (result.isNewUser) {
                    router.push('/signup/complete-profile');
                } else {
                    const isComplete = await checkProfileCompletion(result.user.uid);
                    router.push(isComplete ? '/dashboard' : '/signup/complete-profile');
                }
            } else {
                setError(result.error || "Erro ao fazer login com Google");
            }
        } catch (error) {
            console.error("Error during Google sign in:", error);
            setError("Erro ao fazer login com Google");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await emailSignIn(email, password);
            if (result.success && result.user) {
                const isComplete = await checkProfileCompletion(result.user.uid);
                router.push(isComplete ? '/dashboard' : '/signup/complete-profile');
            } else {
                setError(result.error || "Erro ao fazer login");
            }
        } catch (error) {
            console.error("Error during email sign in:", error);
            setError("Erro ao fazer login");
        } finally {
            setIsLoading(false);
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
                    <h1 className="text-center text-3xl font-extrabold text-purple-300 mb-2">Login</h1>
                    <p className="text-center text-sm text-gray-400">Entre no reino das sombras</p>
                </div>

                <form onSubmit={handleEmailSignIn} className="mt-8 space-y-6">
                    {error && (
                        <div className="bg-red-900/20 border border-red-500 rounded-md p-3 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

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
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none relative block w-full px-3 py-2 border border-purple-700 
                            placeholder-gray-500 text-gray-200 rounded-md bg-gray-700 focus:outline-none 
                            focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                            text-sm font-medium rounded-md text-white bg-purple-800 hover:bg-purple-700 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
                            transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Entrando..." : "Entrar"}
                        </button>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="group relative w-full flex items-center justify-center py-2 px-4 border border-purple-700
                            text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                            transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="currentColor"
                                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                                />
                            </svg>
                            {isLoading ? "Entrando..." : "Entrar com Google"}
                        </button>

                        <div className="text-center">
                            <span className="text-gray-400 text-sm">
                                Não tem uma conta?{" "}
                                <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
                                    Crie aqui
                                </Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;