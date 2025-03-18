"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebase/BaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthContextType } from "@/interfaces/authContext";

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => {
            unsubscribe();
            setMounted(false);
        };
    }, []);

    // Prevent hydration errors by not rendering until mounted
    if (!mounted) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
