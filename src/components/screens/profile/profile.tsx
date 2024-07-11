"use client";

import React, {useContext} from 'react';
import Header from "@/components/header/header";
import {webAppContext} from "@/app/context";

const Profile = (app: any) => {

    // if (!app || !app.initDataUnsafe || !app.initDataUnsafe.user) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="bg-black min-h-svh flex flex-col items-center justify-center text-white p-4">
            <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <Header />

                <div className="md:flex">
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{app.initDataUnsafe.user.id}</div>
                        <p className="block mt-1 text-lg leading-tight font-medium text-yellow-500">Король Виновницы</p>
                        <p className="mt-2 text-gray-300">1,500,000 ⭐ · Ранг #1</p>
                    </div>
                </div>
                <div className="bg-green-500 p-4">
                    <h2 className="text-lg font-semibold">Статистика</h2>
                    <div className="mt-2">
                        <p>Всего тапов: 1,000,000</p>
                        <p>Дней подряд: 30</p>
                        <p>Друзей приглашено: 15</p>
                    </div>
                </div>
                <div className="bg-orange-500 p-4">
                    <h2 className="text-lg font-semibold">Достижения</h2>
                    <div className="mt-2">
                        <p>Звездный магнат: Набрать 100000 ⭐</p>
                        <p>Душа компании: Пригласить 10 друзей</p>
                        <p className="text-gray-400">Везунчик: Выиграть джекпот 3 раза</p>
                    </div>
                </div>
                <div className="p-4">
                    <button className="bg-red-600 text-white py-2 px-4 rounded-full w-full">Активировать бустер</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
