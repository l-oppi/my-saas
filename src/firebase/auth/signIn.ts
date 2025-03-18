import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/BaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            phone: user.phoneNumber,
        });

        return { success: true, user };
    } catch (error) {
        console.error("Erro ao fazer login com o Google:", error);
        return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" };
    }
};

export const emailSignIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return { success: true, user };
    } catch (error) {
        console.error("Erro ao fazer login com o email:", error);
        return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" };
    }
};
