'use client';

import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

interface Option {
    text: string;
}

interface RouletteWheelProps {
    options: Option[];
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ options }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const data = options.length > 0
        ? options.map(option => ({ option: option.text }))  
        : [{ option: 'Default Option' }];  

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    return (
        <div className="flex flex-col items-center p-7">
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}  
                onStopSpinning={() => setMustSpin(false)}
            />
            <button
                onClick={handleSpinClick}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
            >
                SPIN
            </button>
        </div>
    );
};

export default RouletteWheel;