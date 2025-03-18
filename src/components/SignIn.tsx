import React, { useState } from "react";
import { googleSignIn, emailSignIn } from "@/firebase/auth/signIn";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        const result = await googleSignIn();
        if (result.success) {
            router.push("/dashboard");        
        } else {
            setError(result.error || "Erro ao fazer login");
        }
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await emailSignIn(email, password);
        if (result.success) {
            router.push("/dashboard");
        } else {
            setError(result.error || "Erro ao fazer login");
        }
    };

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