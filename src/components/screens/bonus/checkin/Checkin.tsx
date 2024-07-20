import React from 'react';


const CheckIn: React.FC = ( id: any ) => {

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
        <div className="flex-shrink-0 w-full h-full bg-gradient-to-r from-blue-900 to-gray-900 text-white rounded-lg p-4 mb-4">
            <h2 className="text-lg font-bold text-center">🎁 Ежедневный чек-ин</h2>
            <button onClick={resetEnergy} className="mt-4 bg-gradient-to-bl from-blue-900 to-blue-500 w-full text-white font-black py-2 px-4 rounded-lg">Сбросить энергию</button>
        </div>
    );
};

export default CheckIn;
