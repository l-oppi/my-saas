"use client";

import { useState, useEffect } from 'react';

interface DatePickerProps {
    value: string;
    onChange: (value: string) => void;
    maxYear?: number;
    minYear?: number;
}

export default function DatePicker({ value, onChange, maxYear = new Date().getFullYear(), minYear = 1900 }: DatePickerProps) {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        if (value) {
            const [y, m, d] = value.split('-');
            setYear(y);
            setMonth(m);
            setDay(d);
        }
    }, [value]);

    const updateDate = (newDay: string, newMonth: string, newYear: string) => {
        if (newDay && newMonth && newYear) {
            const date = `${newYear}-${newMonth.padStart(2, '0')}-${newDay.padStart(2, '0')}`;
            onChange(date);
        }
    };

    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDay(e.target.value);
        updateDate(e.target.value, month, year);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMonth(e.target.value);
        updateDate(day, e.target.value, year);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(e.target.value);
        updateDate(day, month, e.target.value);
    };

    // Generate arrays for days, months, and years
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const months = [
        { value: "01", label: "Janeiro" },
        { value: "02", label: "Fevereiro" },
        { value: "03", label: "Março" },
        { value: "04", label: "Abril" },
        { value: "05", label: "Maio" },
        { value: "06", label: "Junho" },
        { value: "07", label: "Julho" },
        { value: "08", label: "Agosto" },
        { value: "09", label: "Setembro" },
        { value: "10", label: "Outubro" },
        { value: "11", label: "Novembro" },
        { value: "12", label: "Dezembro" }
    ];
    const years = Array.from(
        { length: maxYear - minYear + 1 },
        (_, i) => (maxYear - i).toString()
    );

    const selectClass = `appearance-none relative block w-full px-3 py-2
        border border-purple-700 text-gray-200 rounded-md bg-gray-700
        focus:outline-none focus:ring-purple-500 focus:border-purple-500
        cursor-pointer hover:bg-gray-600 transition-colors duration-200
        bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%239CA3AF%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')]
        bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat
        pr-10`;

    return (
        <div className="grid grid-cols-3 gap-2">
            <div>
                <select
                    value={day}
                    onChange={handleDayChange}
                    className={selectClass}
                >
                    <option value="">Dia</option>
                    {days.map(d => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select
                    value={month}
                    onChange={handleMonthChange}
                    className={selectClass}
                >
                    <option value="">Mês</option>
                    {months.map(m => (
                        <option key={m.value} value={m.value}>
                            {m.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select
                    value={year}
                    onChange={handleYearChange}
                    className={selectClass}
                >
                    <option value="">Ano</option>
                    {years.map(y => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
} 