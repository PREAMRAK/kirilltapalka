import React, {useContext} from 'react';
import { ScrollShadow } from "@nextui-org/react";
import Header from "@/components/header/header";
import {webAppContext} from "@/app/context";

interface User {
    name: string;
    title: string;
    score: number;
}

const users: User[] = [
    { name: "Иван Петров", title: "Король Виновницы", score: 1500000 },
    { name: "Анна Сидорова", title: "Доминатор", score: 1400000 },
    { name: "Алексей Иванов", title: "Повелитель", score: 1300000 },
    { name: "Мария Козлова", title: "Легенда VNVNC", score: 1200000 },
    { name: "Дмитрий Смирнов", title: "Миллионер", score: 1100000 },
    { name: "Елена Новикова", title: "Магнат", score: 1000000 },
    { name: "Сергей Морозов", title: "Покоритель", score: 900000 },
    { name: "Ольга Волкова", title: "Звезда андеграунда", score: 800000 },
    { name: "Артем Соколов", title: "Полуночный тусовщик", score: 700000 },
    { name: "Наталья Кузнецова", title: "Восходящая звезда", score: 600000 },
];

const Leaderboard = () => {

    const app = useContext(webAppContext);

    return (
        <div className="bg-black min-h-svh flex flex-col items-center justify-center text-white p-4">
            <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <Header />

                <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold text-red-600">ТОП ИГРОКОВ</h1>
                </div>
                <div>
                    {users.map((user, index) => (
                        <div
                            key={index}
                            className={`p-4 flex justify-between items-center ${
                                index === 0 ? 'bg-yellow-500' :
                                    index === 1 ? 'bg-gray-400' :
                                        'bg-purple-500'
                            } ${index < 3 ? '' : 'bg-gradient-to-r from-purple-500 to-blue-500'} text-white m-2 rounded-lg`}
                        >
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                <div className="ml-4">
                                    <p className="font-bold">{index + 1}. {user.name}</p>
                                    <p className="text-sm">{user.title}</p>
                                </div>
                            </div>
                            <div>
                                <p>{user.score.toLocaleString()}</p>
                                <span className="text-yellow-300">⭐</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4">
                    <button className="bg-yellow-600 text-white py-2 px-4 rounded-full w-full">Мой рейтинг</button>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
