import React from "react";
import { signOutUser } from "@/firebase/auth/signOut";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        const result = await signOutUser();
        if (result.success) {
            router.push("/signin");
        } else {
            console.error("Erro ao fazer logout:", result.error);
        }
    };
    
    return (
        <button onClick={handleSignOut} className="px-4 py-2 bg-red-500 text-white rounded">
            Sair
        </button>
    );
};

export default SignOutButton;
