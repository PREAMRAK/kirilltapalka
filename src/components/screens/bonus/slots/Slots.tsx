import React, { useState, useEffect } from 'react';

const SlotMachine = ({ userId }) => {
    const [slots, setSlots] = useState([['❓', '❓', '❓'], ['❓', '❓', '❓'], ['❓', '❓', '❓']]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [points, setPoints] = useState(0);
    const [error, setError] = useState("");
    const emojis = ["🎉", "🎊", "💃", "🍾", "🥂"];

    useEffect(() => {
        if (isSpinning) {
            const interval = setInterval(() => {
                setSlots([
                    [randomEmoji(), randomEmoji(), randomEmoji()],
                    [randomEmoji(), randomEmoji(), randomEmoji()],
                    [randomEmoji(), randomEmoji(), randomEmoji()],
                ]);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isSpinning]);

    const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

    const spin = async () => {
        setIsSpinning(true);
        setPoints(0);
        setError("");

        const response = await fetch(`/api/slot?userid=${userId}`);
        const data = await response.json();

        if (response.ok) {
            setTimeout(() => {
                setSlots([
                    [randomEmoji(), randomEmoji(), randomEmoji()],
                    [data.first_slot, data.second_slot, data.third_slot],
                    [randomEmoji(), randomEmoji(), randomEmoji()],
                ]);
                setIsSpinning(false);
                setPoints(data.points);
            }, 2000);
        } else {
            setIsSpinning(false);
            setError(data.error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {error && (
                <div className="mb-2 py-1 text-sm w-full rounded-md text-center text-white bg-gradient-to-bl from-blue-700 to-blue-800">
                    😵 {error}
                </div>
            )}
            <div className="p-2 mb-4 text-lg text-center bg-gradient-to-bl from-yellow-500 to-yellow-600 w-full text-black font-bold rounded-md">
                You won {points} points!
            </div>
            <div className="grid grid-rows-3 gap-2">
                {slots.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={`flex justify-center ${rowIndex === 1 ? 'border-2 border-zinc-200 rounded-md' : ''}`}
                    >
                        {row.map((slot, index) => (
                            <div key={index} className="w-16 h-16 flex items-center justify-center text-4xl">
                                {slot}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button
                onClick={spin}
                className={`mt-4 px-4 py-2 bg-yellow-400 w-full text-black font-bold rounded transition-colors duration-300 ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSpinning}
            >
                {isSpinning ? 'Spinning...' : 'Spin'}
            </button>
        </div>
    );
};

export default SlotMachine;
