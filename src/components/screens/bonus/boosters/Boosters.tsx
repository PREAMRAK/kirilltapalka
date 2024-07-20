import React from 'react';

interface BoostersProps {
    buyBooster: (boosterType: string) => void;
}

const Boosters: React.FC<BoostersProps> = ({ buyBooster }) => {
    return (
        <div className="flex-shrink-0 w-full h-full bg-gradient-to-r from-green-900 to-black text-white rounded-lg p-4 mb-4">
            <h2 className="text-lg font-bold text-center">🎁 Бустеры</h2>
            <div className="mt-2">
                <button onClick={() => buyBooster('x2')} className="bg-gradient-to-bl from-green-900 to-green-800 w-full text-white py-2 px-4 rounded-lg mt-2">x2 на 30 минут <br />(1000 ⭐)</button>
                <button onClick={() => buyBooster('x3')} className="bg-gradient-to-bl from-green-900 to-green-700 w-full text-white py-2 px-4 rounded-lg mt-2">x3 на 15 минут <br />(2500 ⭐)</button>
                <button onClick={() => buyBooster('x5')} className="bg-gradient-to-bl from-green-900 to-green-600 w-full text-white py-2 px-4 rounded-lg mt-2">x5 на 5 минут <br />(5000 ⭐)</button>
            </div>
        </div>
    );
};

export default Boosters;
