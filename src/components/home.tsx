'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
    { id: 1, title: 'Random Number', image: '/placeholder.svg?height=80&width=80', path: '/random-number', gradient: 'from-purple-500 to-pink-500' },
    { id: 2, title: 'Team Divider', image: '/placeholder.svg?height=80&width=80', path: '/random-team', gradient: 'from-green-500 to-teal-500' },
    { id: 3, title: 'Random Roulette', image: '/placeholder.svg?height=80&width=80', path: '/random-roulette', gradient: 'from-blue-500 to-indigo-500' },
    { id: 4, title: 'Dice', image: '/placeholder.svg?height=80&width=80', path: '/dice', gradient: 'from-yellow-500 to-orange-500' },
];

export const MainPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-12">Choose Your Tool</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                {menuItems.map((item) => (
                    <Link href={item.path} key={item.id}>
                        <motion.div
                            className={`relative bg-gradient-to-br ${item.gradient} rounded-xl shadow-md p-6 cursor-pointer transition-transform hover:scale-105`}
                            whileHover={{ y: -10 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="absolute inset-0 opacity-20 blur-lg rounded-xl bg-white"></div>
                            <div className="relative flex flex-col items-center justify-center">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={80}
                                    height={80}
                                    className="mb-4"
                                />
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
