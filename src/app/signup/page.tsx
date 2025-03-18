"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpUser } from "@/firebase/auth/signUp";
import { useAuth } from "@/context/AuthContext";
import PasswordStrengthBar from "@/components/PasswordStrengthBar";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { user, isProfileComplete } = useAuth();

    useEffect(() => {
        if (user && isProfileComplete) {
            router.push("/dashboard");
        }
    }, [user, isProfileComplete, router]);

    useEffect(() => {
        if (confirmPassword && password !== confirmPassword) {
            setPasswordError("As senhas não coincidem");
        } else {
            setPasswordError("");
        }
    }, [password, confirmPassword]);

    if (user && isProfileComplete) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordError) {
            return;
        }
        
        setIsLoading(true);
        setError("");

        try {
            const result = await signUpUser(email, password);
            if (result.success) {
                router.push("/signup/complete-profile");
            } else {
                setError(result.error || "Erro ao criar conta");
            }
        } catch (err) {
            setError("Ocorreu um erro ao criar sua conta");
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-2xl border border-purple-800">
                <div>
                    <h1 className="text-center text-3xl font-extrabold text-purple-300 mb-2">Crie sua conta</h1>
                    <p className="text-center text-sm text-gray-400">Junte-se ao reino das sombras</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                        
                        <div>
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
                            <PasswordStrengthBar password={password} />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Confirme sua senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`appearance-none relative block w-full px-3 py-2 border 
                                ${passwordError ? 'border-red-500' : 'border-purple-700'}
                                placeholder-gray-500 text-gray-200 rounded-md bg-gray-700 focus:outline-none 
                                focus:ring-2 ${passwordError ? 'focus:ring-red-500' : 'focus:ring-purple-500'} 
                                focus:border-transparent`}
                                required
                            />
                            {passwordError && (
                                <p className="mt-1 text-sm text-red-400">{passwordError}</p>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900/20 border border-red-500 rounded-md p-3 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={isLoading || !!passwordError}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                            text-sm font-medium rounded-md text-white bg-purple-800 hover:bg-purple-700 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
                            transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Criando conta..." : "Criar conta"}
                        </button>

                        <div className="text-center">
                            <span className="text-gray-400 text-sm">
                                Já tem uma conta?{" "}
                                <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                                    Entre aqui
                                </Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}