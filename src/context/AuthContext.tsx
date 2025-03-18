"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/firebase/BaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthContextType } from "@/interfaces/authContext";
import { doc, getDoc } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isProfileComplete: false
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Check profile completion status
    const checkProfileCompletion = async (currentUser: User) => {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const isComplete = userDoc.exists() && userDoc.data().isProfileComplete === true;
        setIsProfileComplete(isComplete);
        return isComplete;
    };

    // Handle redirects based on profile completion
    const handleProfileRedirect = async (currentUser: User) => {
        const isComplete = await checkProfileCompletion(currentUser);
        const publicPaths = ['/', '/signin', '/signup'];
        const isPublicPath = publicPaths.includes(pathname);
        const isCompletingProfile = pathname === '/signup/complete-profile';

        if (!isComplete && !isCompletingProfile && !isPublicPath) {
            router.push('/signup/complete-profile');
            return false;
        }
        return true;
    };

    // Auth state change effect
    useEffect(() => {
        setMounted(true);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const canProceed = await handleProfileRedirect(user);
                if (canProceed || pathname === '/signup/complete-profile') {
                    setUser(user);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
            setMounted(false);
        };
    }, []);

    // Route change effect
    useEffect(() => {
        const checkAuth = async () => {
            if (user) {
                await handleProfileRedirect(user);
            }
        };
        checkAuth();
    }, [pathname, user]);

    // Prevent hydration errors by not rendering until mounted
    if (!mounted) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, loading, isProfileComplete }}>
            {children}
        </AuthContext.Provider>
    );
};
