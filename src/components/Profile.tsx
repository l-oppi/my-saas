"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import SignOut from "./SignOut";

export default function Profile() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const getInitials = (name: string | null | undefined) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map(part => part[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover:opacity-80 transition-opacity"
            >
                {user?.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt="Profile"
                        className="h-9 w-9 rounded-full ring-2 ring-purple-500"
                    />
                ) : (
                    <div className="h-9 w-9 rounded-full bg-purple-800 flex items-center justify-center text-sm font-medium ring-2 ring-purple-500">
                        {getInitials(user?.displayName)}
                    </div>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-purple-500 ring-opacity-50">
                    <div className="py-2">
                        <div className="px-4 py-3 text-sm text-gray-300 border-b border-gray-700">
                            <div className="flex items-center space-x-3 mb-2">
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full ring-2 ring-purple-500"
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-full bg-purple-800 flex items-center justify-center font-medium ring-2 ring-purple-500">
                                        {getInitials(user?.displayName)}
                                    </div>
                                )}
                                <div>
                                    <div className="font-medium">{user?.displayName || "Usuário"}</div>
                                    <div className="text-xs text-gray-400">{user?.email}</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-1">
                            <SignOut />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 