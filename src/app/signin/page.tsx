"use client";
import SignIn from "@/components/SignIn";
import { useState, useEffect } from "react";

const SignInPage = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <SignIn />
        </div>
    );
};

export default SignInPage;