import React, {useContext} from 'react';
import Header from "@/components/header/header";
import {webAppContext} from "@/app/context";

const Bonuses = () => {

    const app = useContext(webAppContext);

    return (
        <div className="bg-black flex min-h-svh flex-col items-center justify-center text-white p-4">
            <div className="w-full max-w-md flex-col flex  gap-4 mx-auto bg-gradient-to-r from-black to-zinc-950 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <Header />

                <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold text-white">🎁 VNVNC БОНУСЫ</h1>
                </div>

                <div className="p-4">
                    <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white rounded-lg p-4 mb-4">
                        <h2 className="text-2xl font-bold text-center">🎁 Ежедневный чек-ин</h2>
                        <button className="mt-4 bg-gradient-to-bl from-blue-900 to-blue-500 w-full text-white font-black py-2 px-4 rounded-lg">Получить 5000 ⭐</button>
                    </div>

                    {/* ДЖЕКПОТ */}
                    <div className="bg-gradient-to-r from-red-900 to-black text-white rounded-lg p-4 mb-4">
                        <h2 className="text-2xl font-bold text-center">🎰 VNVNC Слоты</h2>
                        <div className="flex justify-center my-2">
                            <span className="mx-1">🎉</span>
                            <span className="mx-1">🎊</span>
                            <span className="mx-1">💃</span>
                        </div>
                        <button className="bg-gradient-to-bl w-full from-red-900 to-red-600 text-white py-2 px-4 rounded-lg mt-2">Крутить (2 осталось)</button>
                    </div>


                    <div className="bg-gradient-to-r from-green-900 to-black text-white rounded-lg p-4 mb-4">
                        <h2 className="text-2xl font-bold text-center">🎁 Бустеры</h2>
                        <div className="mt-2">
                            <button className="bg-gradient-to-bl from-green-900 to-green-800 w-full text-white py-2 px-4 rounded-lg mt-2">x2 на 30 минут (1000 ⭐)</button>
                            <button className="bg-gradient-to-bl from-green-900 to-green-700 w-full text-white py-2 px-4 rounded-lg mt-2">x3 на 15 минут (2500 ⭐)</button>
                            <button className="bg-gradient-to-bl from-green-900 to-green-600 w-full text-white py-2 px-4 rounded-lg mt-2">x5 на 5 минут (5000 ⭐)</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bonuses;
