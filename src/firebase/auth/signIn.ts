import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/BaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // Check if user document exists
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
            // First time sign in - create user document
            await setDoc(userRef, {
                displayName: user.displayName || "",
                email: user.email,
                isProfileComplete: false,
                createdAt: new Date().toISOString(),
            });
        }

        return {
            success: true,
            user: result.user,
            isNewUser: !userDoc.exists()
        };
    } catch (error: any) {
        if (error.code === 'auth/cancelled-popup-request' || 
            error.code === 'auth/popup-closed-by-user') {
            return {
                success: false,
                error: "Login cancelado pelo usuário"
            };
        }
        
        return {
            success: false,
            error: error.message || "Erro ao fazer login com Google"
        };
    }
};

export const emailSignIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return { success: true, user };
    } catch (error: any) {
        if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
            return {
                success: false,
                error: "E-mail ou senha inválidos"
            };
        } else if (error.code === "auth/user-not-found") {
            return {
                success: false,
                error: "E-mail não encontrado"
            };
        } else if (error.code === "auth/too-many-requests") {
            return {
                success: false,
                error: "Muitas tentativas de login. Tente novamente mais tarde."
            };
        }
        return {
            success: false,
            error: error.message || "Erro ao fazer login com o email"
        };
    }
};
