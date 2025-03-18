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
        try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            const isComplete = userDoc.exists() && userDoc.data().isProfileComplete === true;
            setIsProfileComplete(isComplete);
            return isComplete;
        } catch (error) {
            console.error("Error checking profile completion:", error);
            return false;
        }
    };

    // Handle redirects based on profile completion
    const handleProfileRedirect = async (currentUser: User) => {
        const isComplete = await checkProfileCompletion(currentUser);
        const publicPaths = ['/', '/signin', '/signup'];
        const isPublicPath = publicPaths.includes(pathname);
        const isCompletingProfile = pathname === '/signup/complete-profile';

        // Only allow access to complete-profile or public paths if profile is not complete
        if (!isComplete && !isCompletingProfile && !isPublicPath) {
            router.push('/signup/complete-profile');
            return false;
        }

        // Don't allow access to complete-profile if profile is already complete
        if (isComplete && isCompletingProfile) {
            router.push('/dashboard');
            return false;
        }

        return true;
    };

    // Auth state change effect
    useEffect(() => {
        setMounted(true);
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const publicPaths = ['/', '/signin', '/signup'];
                const isPublicPath = publicPaths.includes(pathname);
                
                // Always set the user state
                setUser(currentUser);
                
                // Only check profile completion if not on a public path
                if (!isPublicPath) {
                    const isComplete = await checkProfileCompletion(currentUser);
                    const isCompletingProfile = pathname === '/signup/complete-profile';
                    
                    // Redirect to complete-profile only if profile is incomplete and not already there
                    if (!isComplete && !isCompletingProfile) {
                        router.push('/signup/complete-profile');
                    }
                }
            } else {
                setUser(null);
                setIsProfileComplete(false);
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
            setMounted(false);
        };
    }, [pathname]);

    // Route change effect
    useEffect(() => {
        const checkAuth = async () => {
            if (!user) return;
            
            const publicPaths = ['/', '/signin', '/signup'];
            const isPublicPath = publicPaths.includes(pathname);
            
            // If on a public path and authenticated, redirect to dashboard
            if (isPublicPath) {
                const isComplete = await checkProfileCompletion(user);
                if (isComplete) {
                    router.push('/dashboard');
                }
                return;
            }
            
            // For protected routes, check profile completion
            await handleProfileRedirect(user);
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
