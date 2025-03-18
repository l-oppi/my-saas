import { auth } from "@/firebase/BaseConfig";
import { FirebaseError } from "firebase/app";
import { getFirebaseErrorMessage } from "@/utils/firebaseErrors";

export const signOut = async () => {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        console.error("Error signing out:", error);
        
        if (error instanceof FirebaseError) {
            return { 
                success: false, 
                error: getFirebaseErrorMessage(error.code)
            };
        }
        
        return { 
            success: false, 
            error: "Ocorreu um erro ao sair. Tente novamente" 
        };
    }
};
