"use client";

import { auth } from "@/firebase/BaseConfig";
import { useRouter } from "next/navigation";

export default function SignOut() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            router.push("/");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors"
        >
            Sair
        </button>
    );
} 