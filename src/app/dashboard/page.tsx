"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import SignOutButton from "@/components/SignOutButton";

const Dashboard = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>;
    }
    
    if (!user) {
        return (
        <div>
            <p>Por favor, faça login para continuar</p>
        </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl">Bem-vindo, {user.displayName || "Usuário"}!</h1>
            <p>E-mail: {user.email}</p>
            <p>UID: {user.uid}</p>
            <SignOutButton />
        </div>
    );
};

export default Dashboard;
