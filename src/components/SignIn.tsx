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
                router.push("/dashboard");
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
        return <div>Carregando...</div>;
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">Login</h1>
            <form onSubmit={handleEmailSignIn} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
                {error && <div className="text-red-500">{error}</div>}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Entrar
                </button>
            </form>
            <div className="space-y-4">
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Entrar com Google
                </button>
            </div>
        </div>
    );
};

export default SignIn;