import React, {useContext} from 'react';
import Header from "@/components/header/header";
import {webAppContext} from "@/app/context";

interface Task {
    name: string;
    platform: string;
    reward: number;
    status: 'pending' | 'completed';
}

const telegramTasks: Task[] = [
    { name: "VNVNC", platform: "Telegram", reward: 5000, status: 'pending' },
    { name: "Маленькая Виновница", platform: "Telegram", reward: 5000, status: 'pending' },
    { name: "ANGAR", platform: "Telegram", reward: 5000, status: 'pending' },
];

const instagramTasks: Task[] = [
    { name: "VNVNC", platform: "Instagram", reward: 10000, status: 'pending' },
    { name: "Маленькая Виновница", platform: "Instagram", reward: 10000, status: 'completed' },
    { name: "ANGAR", platform: "Instagram", reward: 10000, status: 'pending' },
];

const dailyTask = { name: "Ежедневное задание", description: "Выполнить чек-ин", reward: 1000 };

const Tasks = () => {

    const app = useContext(webAppContext);

    return (
        <div className="bg-black min-h-svh flex flex-col items-center justify-center text-white p-4">
            <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <Header />


                <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold text-red-600">ЗАДАНИЯ</h1>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mb-4">
                    <h2 className="text-lg font-bold">Подписаться на Telegram</h2>
                    {telegramTasks.map((task, index) => (
                        <div key={index} className="flex justify-between items-center bg-purple-700 p-2 rounded-lg mt-2">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                <div className="ml-4">
                                    <p className="font-bold">{task.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p className="mr-2">{task.reward} ⭐</p>
                                <button className="bg-yellow-500 text-black py-1 px-3 rounded-lg">Подписаться</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mb-4">
                    <h2 className="text-lg font-bold">Подписаться на Instagram</h2>
                    {instagramTasks.map((task, index) => (
                        <div key={index} className="flex justify-between items-center bg-purple-700 p-2 rounded-lg mt-2">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                <div className="ml-4">
                                    <p className="font-bold">{task.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p className="mr-2">{task.reward} ⭐</p>
                                <button className={`py-1 px-3 rounded-lg ${task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                                    {task.status === 'completed' ? 'Выполнено' : 'Подписаться'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-green-500 rounded-lg mb-4">
                    <h2 className="text-lg font-bold">{dailyTask.name}</h2>
                    <div className="flex justify-between items-center mt-2">
                        <p>{dailyTask.description}</p>
                        <p className="text-yellow-300">{dailyTask.reward} ⭐</p>
                    </div>
                </div>
                <div className="p-4 text-center">
                    <button className="bg-gray-600 text-white py-2 px-4 rounded-full">Вернуться в игру</button>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
