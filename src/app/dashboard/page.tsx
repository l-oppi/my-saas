"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Profile from "@/components/Profile";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-900">
            <nav className="bg-gray-800 border-b border-purple-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-purple-300">Painel</span>
                        </div>
                        <div className="flex items-center">
                            <Profile />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-purple-800 border-dashed rounded-lg h-96 bg-gray-800 p-6">
                        <h2 className="text-2xl font-bold text-purple-300 mb-4">
                            Bem-vindo ao seu Painel
                        </h2>
                        <p className="text-gray-400">
                            Aqui começa sua jornada...
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
