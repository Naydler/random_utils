"use client";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface Dice {
    id: number;
    value: (number | string)[]; // Representa los lados del dado
}

interface DiceCreatorProps {
    dice: Dice[];
    setDices: React.Dispatch<React.SetStateAction<Dice[]>>;
}

const DiceCreator: React.FC<DiceCreatorProps> = ({ dice, setDices }) => {
    const handleCreateDice = (sides: number) => {
        const newDice: Dice = {
            id: Date.now(),
            value: Array.from({ length: sides }, (_, i) => i + 1), // Crear lados numerados
        };
        setDices([...dice, newDice]);
    };

    const updateDiceSide = (diceId: number, sideIndex: number, newValue: string | number) => {
        const updatedDice = dice.map((d) =>
            d.id === diceId
                ? {
                    ...d,
                    value: d.value.map((side, idx) =>
                        idx === sideIndex ? newValue : side
                    ),
                }
                : d
        );
        setDices(updatedDice);
    };

    return (
        <Card className="p-6 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardContent>
                <h2 className="text-3xl font-bold mb-6 text-center">🎲 Dice Creator 🎲</h2>
                <div className="flex flex-col items-center mb-6">
                    <label
                        htmlFor="sides"
                        className="text-lg font-semibold mb-2"
                    >
                        Number of Sides
                    </label>
                    <input
                        type="number"
                        id="sides"
                        name="sides"
                        min="1"
                        max="20"
                        defaultValue={6}
                        className="w-24 text-center rounded-md border border-gray-300 py-2 text-black"
                    />
                </div>
                <Button
                    onClick={() => {
                        const sidesInput = document.getElementById("sides") as HTMLInputElement;
                        const sides = parseInt(sidesInput.value, 10);
                        if (!isNaN(sides) && sides > 0) {
                            handleCreateDice(sides);
                        }
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md"
                >
                    Create Dice
                </Button>
                <ul className="mt-8 space-y-6">
                    {dice.map((diceItem) => (
                        <li key={diceItem.id} className="p-4 bg-white text-black rounded-lg shadow-md">
                            <span className="text-xl font-bold">Dice {diceItem.id}:</span>
                            <ul className="mt-4 grid grid-cols-2 gap-4">
                                <Button
                                    onClick={() =>
                                        setDices(dice.filter((d) => d.id !== diceItem.id))
                                    }
                                    className="col-span-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md"
                                >
                                    Delete Dice
                                </Button>
                                {diceItem.value.map((side, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="w-20">Side {index + 1}:</span>
                                        <input
                                            type="text"
                                            value={side}
                                            onChange={(e) =>
                                                updateDiceSide(
                                                    diceItem.id,
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="ml-2 flex-1 rounded-md border border-gray-300 py-1 px-2"
                                        />
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default DiceCreator;