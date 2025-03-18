import { signOut } from "firebase/auth";
import { auth } from "@/firebase/BaseConfig";

export const signOutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
        return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" };
    }
};
