"use client";

import { useState, useRef, useEffect } from "react";

interface Country {
    code: string;
    name: string;
    dialCode: string;
}

const countries: Country[] = [
    { code: "BR", name: "Brasil", dialCode: "+55" },
    { code: "US", name: "United States", dialCode: "+1" },
    { code: "PT", name: "Portugal", dialCode: "+351" },
    { code: "GB", name: "United Kingdom", dialCode: "+44" },
    { code: "ES", name: "España", dialCode: "+34" },
    // Add more countries as needed
];

interface CountrySelectProps {
    value: string;
    onChange: (value: string) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedCountry = countries.find(country => country.dialCode === value);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center bg-gray-700 border border-purple-700 text-gray-200 
                rounded-md pl-2 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 
                focus:border-transparent h-[42px] min-w-[120px] relative"
            >
                <img
                    src={`https://flagcdn.com/${selectedCountry?.code.toLowerCase()}.svg`}
                    alt={selectedCountry?.name}
                    className="w-6 h-4 rounded-sm object-cover mr-2"
                />
                <span>{selectedCountry?.dialCode}</span>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
                    <svg 
                        className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-purple-500 ring-opacity-50">
                    <div className="py-1 max-h-60 overflow-auto">
                        {countries.map((country) => (
                            <button
                                key={country.code}
                                type="button"
                                className={`w-full text-left px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 
                                ${country.dialCode === value ? 'bg-gray-700' : ''}`}
                                onClick={() => {
                                    onChange(country.dialCode);
                                    setIsOpen(false);
                                }}
                            >
                                <img
                                    src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                                    alt={country.name}
                                    className="w-6 h-4 rounded-sm object-cover"
                                />
                                <span className="text-gray-200">{country.name}</span>
                                <span className="text-gray-400 ml-auto">{country.dialCode}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 