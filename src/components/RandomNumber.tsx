"use client";

import { useState } from "react";
import { generateRandomNumber } from "@/app/utils/randomNumber";

export const RandomNumber = () => {
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(10);
    const [result, setResult] = useState<number | null>(null);
    const [dontRepeat, setDontRepeat] = useState<boolean>(false);
    const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleRangeChange = (setter: (value: number) => void, value: number) => {
        setter(value);
        setGeneratedNumbers([]);
        setError(null);
        setResult(null);
    };

    const handleGenerate = () => {
        try {
            setError(null);

            if (dontRepeat) {
                const availableNumbers = Array.from({ length: max - min + 1 }, (_, i) => min + i).filter(
                    (num) => !generatedNumbers.includes(num)
                );

                if (availableNumbers.length === 0) {
                    setError("Todos los números del rango ya han sido generados.");
                    return;
                }

                const randomIndex = Math.floor(Math.random() * availableNumbers.length);
                const randomNumber = availableNumbers[randomIndex];
                setGeneratedNumbers((prev) => [...prev, randomNumber]);
                setResult(randomNumber);
            } else {
                const randomNumber = generateRandomNumber(min, max);
                setResult(randomNumber);
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Generador de Números Aleatorios</h1>
            <div className="flex gap-4 mb-4">
                <div>
                    <label htmlFor="min" className="block font-medium">Mínimo:</label>
                    <input
                        type="number"
                        id="min"
                        value={min}
                        onChange={(e) => handleRangeChange(setMin, Number(e.target.value))}
                        className="border border-gray-300 rounded-md px-2 py-1"
                    />
                </div>
                <div>
                    <label htmlFor="max" className="block font-medium">Máximo:</label>
                    <input
                        type="number"
                        id="max"
                        value={max}
                        onChange={(e) => handleRangeChange(setMax, Number(e.target.value))}
                        className="border border-gray-300 rounded-md px-2 py-1"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="checkbox"
                    id="dontRepeat"
                    checked={dontRepeat}
                    onChange={(e) => setDontRepeat(e.target.checked)}
                />
                <label htmlFor="dontRepeat" className="font-medium">
                    No repetir número
                </label>
            </div>
            <div className="flex gap-2 mb-4">
                <p className="font-medium">Números generados:</p>
                <div className="flex gap-2">
                    {generatedNumbers.map((num) => (
                        <span key={num} className="bg-gray-200 px-2 py-1 rounded-md">
                            {num}
                        </span>
                    ))}
                </div>
            </div>
            <button
                onClick={handleGenerate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Generar
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {result !== null && (
                <p className="text-lg font-medium mt-4">
                    Número generado: <span className="font-bold">{result}</span>
                </p>
            )}
        </div>
    );
};

export default RandomNumber;
