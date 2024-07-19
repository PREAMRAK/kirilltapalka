import React, { useContext, useEffect } from 'react';
import Header from "@/components/header/header";
import { webAppContext } from "@/app/context";
import Slots from "@/components/screens/bonus/slots/Slots";

const Bonuses = () => {
    const app = useContext(webAppContext);

    const id = app.initDataUnsafe.user?.id;

    useEffect(() => {
        console.log("App data:", app);
    }, [app]);

    const buyBooster = async (boosterType: any) => {
        const response = await fetch(`/api/util/buy_booster?userid=${id}&boosterType=${boosterType}`);
        const data = await response.json();
        if (data.success) {
            alert(`Бустер ${boosterType} приобретен до ${new Date(data.endTime).toLocaleTimeString()}`);
        } else {
            alert(data.error || "Не удалось приобрести бустер");
        }
    };

    const resetEnergy = async () => {
        const response = await fetch(`/api/util/reset_energy?userid=${id}`);
        const data = await response.json();
        if (data.success) {
            alert(`Энергия сброшена до ${data.energy}`);
        } else {
            alert(data.error || "Не удалось сбросить энергию");
        }
    };

    return (
        <div className="bg-black flex min-h-svh flex-col items-center justify-center text-white p-4">
            <div className="w-full max-w-md flex-col flex  gap-4 mx-auto bg-gradient-to-r from-black to-zinc-950 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <Header />

                <div className="p-4 text-center">
                    <h1 className="text-xl font-bold text-white">🎁 VNVNC БОНУСЫ</h1>
                </div>

                <div className="p-4">
                    <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-bold text-center">🎁 Ежедневный чек-ин</h2>
                        <button onClick={resetEnergy} className="mt-4 bg-gradient-to-bl from-blue-900 to-blue-500 w-full text-white font-black py-2 px-4 rounded-lg">Сбросить энергию</button>
                    </div>

                    {/* ДЖЕКПОТ */}
                    <div className="bg-gradient-to-r from-red-900 to-black text-white rounded-lg p-4 mb-4">
                        <Slots userId={id} />
                    </div>

                    <div className="bg-gradient-to-r from-green-900 to-black text-white rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-bold text-center">🎁 Бустеры</h2>
                        <div className="mt-2">
                            <button onClick={() => buyBooster('x2')} className="bg-gradient-to-bl from-green-900 to-green-800 w-full text-white py-2 px-4 rounded-lg mt-2">x2 на 30 минут <br />(1000 ⭐)</button>
                            <button onClick={() => buyBooster('x3')} className="bg-gradient-to-bl from-green-900 to-green-700 w-full text-white py-2 px-4 rounded-lg mt-2">x3 на 15 минут <br />(2500 ⭐)</button>
                            <button onClick={() => buyBooster('x5')} className="bg-gradient-to-bl from-green-900 to-green-600 w-full text-white py-2 px-4 rounded-lg mt-2">x5 на 5 минут <br />(5000 ⭐)</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bonuses;
