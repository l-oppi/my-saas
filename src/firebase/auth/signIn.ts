import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/BaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { getFirebaseErrorMessage } from "@/utils/firebaseErrors";

export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        
        // Check if user document exists
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        
        const isNewUser = !userDoc.exists();

        if (isNewUser) {
            // First time sign in - create user document
            await setDoc(userRef, {
                displayName: user.displayName || "",
                email: user.email,
                isProfileComplete: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }

        return {
            success: true,
            user: userCredential.user,
            isNewUser: isNewUser
        };
    } catch (error) {
        console.error("Error signing in with Google:", error);
        
        if (error instanceof FirebaseError) {
            return { 
                success: false, 
                error: getFirebaseErrorMessage(error.code)
            };
        }
        
        return { 
            success: false, 
            error: "Ocorreu um erro ao fazer login com Google. Tente novamente" 
        };
    }
};

export const emailSignIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error("Error signing in with email:", error);
        
        if (error instanceof FirebaseError) {
            return { 
                success: false, 
                error: getFirebaseErrorMessage(error.code)
            };
        }
        
        return { 
            success: false, 
            error: "Ocorreu um erro ao fazer login. Tente novamente" 
        };
    }
};
