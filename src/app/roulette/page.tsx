'use client';

import React, { useState } from 'react';
import RouletteWheel from '@/components/roullete';
import OptionsList from '@/components/option-list';

export default function Roulette() {
    const [options, setOptions] = useState<{ id: number; text: string }[]>([]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-row items-center justify-center gap-8 p-8">
                <OptionsList options={options} setOptions={setOptions} />

            <div className="w-2/3 bg-white p-6 shadow rounded flex justify-center items-center">
                {options.length < 2 ? (
                    <p className="text-xl text-gray-700">Agregue al menos dos opciones para iniciar la ruleta.</p>
                ) : (
                    <RouletteWheel options={options} />
                )}
            </div>
        </div>
    );
}