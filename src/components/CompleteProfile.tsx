"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/BaseConfig";
import CountrySelect from "./CountrySelect";
import DatePicker from "./DatePicker";

export default function CompleteProfile() {
    const { user } = useAuth();
    const router = useRouter();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState("+55"); // Default to Brazil
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                console.log("No user found in fetchUserData");
                return;
            }
            
            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log("Fetched user data:", userData);
                    if (userData.displayName) {
                        const [firstName, ...lastNameParts] = userData.displayName.split(" ");
                        setName(firstName || "");
                        setSurname(lastNameParts.join(" ") || "");
                    }
                } else {
                    console.log("User document does not exist");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            console.error("No user found during submission");
            setError("Erro de autenticação. Tente fazer login novamente.");
            return;
        }

        // Validate required fields
        if (!name.trim()) {
            setError("Nome é obrigatório");
            return;
        }
        if (!surname.trim()) {
            setError("Sobrenome é obrigatório");
            return;
        }
        if (!phone.trim()) {
            setError("Telefone é obrigatório");
            return;
        }
        if (!birthDate) {
            setError("Data de nascimento é obrigatória");
            return;
        }
        if (!gender) {
            setError("Gênero é obrigatório");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log("Submitting form with data:", {
                name,
                surname,
                phone: `${countryCode}${phone}`,
                birthDate,
                gender
            });

            const userRef = doc(db, "users", user.uid);
            const userData = {
                name: name.trim(),
                surname: surname.trim(),
                phone: `${countryCode}${phone.trim()}`,
                birthDate: birthDate || null,
                gender: gender || null,
                isProfileComplete: true,
                updatedAt: new Date().toISOString(),
            };

            console.log("Updating user document with:", userData);
            await updateDoc(userRef, userData);
            console.log("Profile updated successfully");

            router.push("/dashboard");
        } catch (err) {
            console.error("Detailed error updating profile:", err);
            setError("Erro ao atualizar perfil. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    // Debug render
    console.log("Current form state:", { name, surname, phone, birthDate, gender, isLoading, error });

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-2xl border border-purple-800">
                <div>
                    <h1 className="text-center text-3xl font-extrabold text-purple-300 mb-2">Complete seu Perfil</h1>
                    <p className="text-center text-sm text-gray-400">Precisamos de algumas informações adicionais</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {error && (
                        <div className="bg-red-900/20 border border-red-500 rounded-md p-3 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}
                    
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-gray-300">
                            Nome
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="appearance-none relative block w-full px-3 py-2 mt-1
                            border border-purple-700 placeholder-gray-500 text-gray-200 rounded-md
                            bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="surname" className="text-sm font-medium text-gray-300">
                            Sobrenome
                        </label>
                        <input
                            id="surname"
                            type="text"
                            required
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="appearance-none relative block w-full px-3 py-2 mt-1
                            border border-purple-700 placeholder-gray-500 text-gray-200 rounded-md
                            bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                            Telefone
                        </label>
                        <div className="flex gap-2">
                            <div className="w-32">
                                <CountrySelect value={countryCode} onChange={setCountryCode} />
                            </div>
                            <input
                                id="phone"
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2
                                border border-purple-700 placeholder-gray-500 text-gray-200 rounded-md
                                bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                placeholder="99 99999-9999"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="birthDate" className="text-sm font-medium text-gray-300">
                            Data de Nascimento
                        </label>
                        <div className="mt-1">
                            <DatePicker
                                value={birthDate}
                                onChange={setBirthDate}
                                maxYear={new Date().getFullYear() - 13}
                                minYear={1900}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="gender" className="text-sm font-medium text-gray-300">
                            Gênero
                        </label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                            className="appearance-none relative block w-full px-3 py-2 mt-1
                            border border-purple-700 placeholder-gray-500 text-gray-200 rounded-md
                            bg-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500
                            bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%239CA3AF%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')]
                            bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat
                            pr-10"
                        >
                            <option value="">Selecione...</option>
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                            <option value="other">Outro</option>
                            <option value="prefer_not_to_say">Prefiro não dizer</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent
                            text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Salvando..." : "Salvar Perfil"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 