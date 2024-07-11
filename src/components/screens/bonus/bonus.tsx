import React, {useContext} from 'react';
import Header from "@/components/header/header";
import {webAppContext} from "@/app/context";

const Bonuses = () => {

    const app = useContext(webAppContext);

    return (
        <div className="bg-black flex min-h-svh flex-col items-center justify-center text-white p-4">
            <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <Header />

                <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold text-red-600">VNVNC БОНУСЫ</h1>
                </div>
                <div className="p-4">
                    <div className="bg-yellow-500 text-white rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-bold">Ежедневный чек-ин</h2>
                        <button className="bg-green-500 text-white py-2 px-4 rounded-lg mt-2">Получить 5000 ⭐</button>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-bold">VNVNC Слоты</h2>
                        <div className="flex justify-center my-2">
                            <span className="mx-1">🎉</span>
                            <span className="mx-1">🎊</span>
                            <span className="mx-1">💃</span>
                        </div>
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-2">Крутить (2 осталось)</button>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-bold">Бустеры</h2>
                        <div className="mt-2">
                            <div className="bg-yellow-500 text-black py-2 px-4 rounded-lg mb-2">x2 на 30 минут (1000 ⭐)</div>
                            <div className="bg-orange-500 text-black py-2 px-4 rounded-lg mb-2">x3 на 15 минут (2500 ⭐)</div>
                            <div className="bg-red-500 text-black py-2 px-4 rounded-lg">x5 на 5 минут (5000 ⭐)</div>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <button className="bg-gray-600 text-white py-2 px-4 rounded-full w-full">Вернуться в игру</button>
                </div>
            </div>
        </div>
    );
};

export default Bonuses;
