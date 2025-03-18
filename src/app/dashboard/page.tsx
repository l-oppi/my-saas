"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-900">
            <nav className="bg-gray-800 border-b border-purple-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-purple-300">Dashboard</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-300 mr-4">{user?.email}</span>
                            <button
                                onClick={() => router.push('/profile')}
                                className="bg-gray-700 p-2 rounded-md text-purple-300 hover:bg-gray-600 transition-colors"
                            >
                                Profile
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-purple-800 border-dashed rounded-lg h-96 bg-gray-800 p-6">
                        <h2 className="text-2xl font-bold text-purple-300 mb-4">Welcome to Your Dashboard</h2>
                        <p className="text-gray-400">This is where your journey begins...</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
