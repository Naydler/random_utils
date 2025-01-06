'use client';

import React, { useState } from 'react';
import RouletteWheel from '@/components/roullete';
import OptionsList from '@/components/option-list';

export default function Roulette() {
    const [options, setOptions] = useState<{ id: number; text: string }[]>([]);
    const [newOption, setNewOption] = useState('');



    return (
        <div className="min-h-screen bg-gray-50 flex flex-row items-center justify-center gap-8 p-8">
            <div className="w-1/3 bg-white p-6 shadow rounded">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Options</h2>
                <OptionsList options={options} setOptions={setOptions} />
            </div>

            <div className="w-2/3 bg-white p-6 shadow rounded flex justify-center items-center">
                {options.length < 2 ? (
                    <p className="text-xl text-gray-700">Please add at least two options to start the roulette.</p>
                ) : (
                    <RouletteWheel options={options} />
                )}
            </div>
        </div>
    );
}