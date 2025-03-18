import { auth, db } from "@/firebase/BaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

export const signUpUser = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
            email: user.email,
            isProfileComplete: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        return { success: true, user };
    } catch (error) {
        console.error("Error signing up:", error);
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" };
    }
};