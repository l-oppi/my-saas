"use client";

interface PasswordStrengthBarProps {
    password: string;
}

export default function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
    const calculateStrength = (password: string): number => {
        if (!password) return 0;
        
        let score = 0;
        
        // Length check
        if (password.length >= 8) score += 1;
        
        // Character variety checks
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        
        // Return strength level (0-2)
        if (score <= 1) return 0; // Weak
        if (score <= 2) return 1; // Medium
        return 2; // Strong
    };

    const strength = calculateStrength(password);

    const getStrengthText = (strength: number): string => {
        switch (strength) {
            case 0:
                return "Senha fraca";
            case 1:
                return "Senha média";
            case 2:
                return "Senha forte";
            default:
                return "";
        }
    };

    const getBarSegments = () => {
        if (!password) return ["bg-gray-600", "bg-gray-600", "bg-gray-600"];

        switch (strength) {
            case 0: // Weak
                return ["bg-red-500", "bg-gray-600", "bg-gray-600"];
            case 1: // Medium
                return ["bg-red-500", "bg-yellow-500", "bg-gray-600"];
            case 2: // Strong
                return ["bg-red-500", "bg-yellow-500", "bg-green-500"];
            default:
                return ["bg-gray-600", "bg-gray-600", "bg-gray-600"];
        }
    };

    if (!password) return null;

    const segments = getBarSegments();

    return (
        <div className="mt-2">
            <div className="flex gap-1 mb-1">
                {segments.map((color, index) => (
                    <div
                        key={index}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${color}`}
                    />
                ))}
            </div>
            <p className={`text-xs ${
                strength === 0 ? 'text-red-400' : 
                strength === 1 ? 'text-yellow-400' : 
                'text-green-400'
            }`}>
                {getStrengthText(strength)}
            </p>
        </div>
    );
} 