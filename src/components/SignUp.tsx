"use client";
import React, { useState } from "react";
import { signUpUser } from "@/firebase/auth/signUp";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signUpUser(email, password, name, surname, phone);

        if (result.success) {
            console.log("User created successfully", result.user);
        } else {
            setError(result.error ?? "");
        }
    };

    const publicPaths = ['/', '/signin', '/signup'];

    return (
        <div className="p-4 max-2-md mx-auto">
            <h1 className="text-2xl mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Sobrenome"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
                <input
                    type="tel"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    required
                />
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
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Criar conta
                </button>
            </form>
        </div>
    );
};

export default SignUp;