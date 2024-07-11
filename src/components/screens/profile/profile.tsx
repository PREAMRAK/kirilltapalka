"use client";

import React, {useContext} from 'react';
import Header from "@/components/header/header";
import {webAppContext} from "@/app/context";

import QueryStatsIcon from '@mui/icons-material/QueryStats'; // Stats
import AdsClickIcon from '@mui/icons-material/AdsClick'; // Click
import LightModeIcon from '@mui/icons-material/LightMode'; // Days
import Diversity1Icon from '@mui/icons-material/Diversity1'; // Friends

const Profile = (app: any) => {

    // if (!app || !app.initDataUnsafe || !app.initDataUnsafe.user) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="bg-black min-h-svh flex flex-col items-center justify-center text-white p-4">
            <div className="w-full max-w-md flex-col flex  gap-4 mx-auto bg-gradient-to-r from-black to-zinc-950 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <Header />

                <div className="md:flex">
                    <div className="p-8 bg-gradient-to-r from-zinc-950 to-gray-900 w-full rounded-lg">
                        <div className="uppercase tracking-wide text-indigo-500 text-2xl font-black">Игорь</div>
                        {/*<p className="block mt-1 text-md leading-tight font-medium text-yellow-500">Король Виновницы</p>*/}
                        <p className="mt-2 text-gray-300 text-md">1,500,000 ⭐</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-900 to-black p-4 rounded-lg">
                    <h2 className="text-2xl font-bold mb-2 bg-green-900 w-full text-center p-2 rounded-lg">📊 Статистика</h2>
                    <div className="gap-1 flex-col flex text-md">
                        <p>👆 Всего тапов: 1,000,000</p>
                        <p>☀️ Дней подряд: 30</p>
                        <p>🕶 Друзей приглашено: 15</p>
                    </div>
                </div>
                <div className="min-h-[100px] p-4 relative rounded-lg" style={{ backgroundImage: "url('/comingsoon.svg')" }}>
                    <div className="mt-6 flex bg-black rounded-md">
                        <p className="text-yellow-500 mx-auto font-black my-auto text-2xl">COMING SOON</p>
                    </div>
                </div>

                    <button className="bg-red-600 text-white font-black py-2 rounded-md w-full hover:bg-red-700">Активировать бустер</button>
            </div>
        </div>
    );
};

export default Profile;
