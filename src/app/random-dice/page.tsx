"use client";
import DiceCreator from "@/components/diceCreator";
import { useState } from "react";


interface Dice {
    id: number;
    value: (number | string)[];
}


export default function RandomDice() {
    const [dices, setDices] = useState<Dice[]>([]);

    return (
        <div>
            <DiceCreator dice={dices} setDices={setDices} />
        </div>
    );
}


