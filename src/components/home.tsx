'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const menuItems = [
    { id: 1, title: 'Random Number', path: '/random-number', gradient: 'from-purple-500 to-pink-500' },
    { id: 2, title: 'Team Divider', path: '/random-team', gradient: 'from-green-500 to-teal-500' },
    { id: 3, title: 'Random Roulette', path: '/random-roulette', gradient: 'from-blue-500 to-indigo-500' },
    { id: 4, title: 'Dice', path: '/dice', gradient: 'from-yellow-500 to-orange-500' },
    { id: 5, title: 'SecretSanta', path: '/secret-santa', gradient: 'from-red-500 to-green-500' },
];

export const MainPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">Choose Your Tool</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                {menuItems.map((item) => (
                    <Link href={item.path} key={item.id}>
                        <motion.div
                            className={`bg-gradient-to-br ${item.gradient} rounded-xl shadow-md p-6 cursor-pointer transition-transform hover:scale-105`}
                            whileHover={{ y: -10 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex flex-col items-center justify-center h-full">
                                <h2 className="text-lg font-semibold text-white text-center">{item.title}</h2>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainPage;