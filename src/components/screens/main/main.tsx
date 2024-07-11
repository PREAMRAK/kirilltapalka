import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import RedeemIcon from '@mui/icons-material/Redeem';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { webAppContext } from "@/app/context";
import supabase from "@/db/supabase";

const CoinMania = () => {
    const app = useContext(webAppContext);
    const [userData, setUserData] = useState(null);
    const [points, setPoints] = useState(0);
    const [energy, setEnergy] = useState(100);
    const [clickCount, setClickCount] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/user/data?id=${app.initDataUnsafe.user?.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserData(data.user);
                setPoints(data.user.scores);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [app.initDataUnsafe.user?.id]);

    useEffect(() => {
        const energyInterval = setInterval(() => {
            setEnergy(prevEnergy => (prevEnergy < 100 ? prevEnergy + 1 : prevEnergy));
        }, 1000);

        return () => clearInterval(energyInterval);
    }, []);

    const handleButtonClick = async () => {
        if (energy <= 0) return;

        setPoints(prevPoints => prevPoints + 1);
        setEnergy(prevEnergy => prevEnergy - 1);
        setClickCount(prevCount => prevCount + 1);

        if ((clickCount + 1) % 10 === 0) {
            try {
                const { error } = await supabase
                    .from('users')
                    .update({ scores: points + 1 })
                    .eq('id', app.initDataUnsafe.user?.id);

                if (error) {
                    throw error;
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="bg-black flex flex-col min-h-screen items-center justify-center text-white p-2">
            <div className="w-full max-w-md mx-auto bg-gradient-to-r from-black to-zinc-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-4 text-center">
                    <h1 className="text-3xl font-bold text-white">VNVNC COIN MANIA</h1>
                    <div className="mt-4">
                        <div className="flex justify-center items-center">
                            <span className="text-yellow-500 text-3xl">⭐</span>
                            <span className="text-white text-3xl ml-2">{points}</span>
                        </div>

                        <button
                            className="mt-4 p-4 text-white rounded-full transform active:scale-95"
                            onClick={handleButtonClick}
                        >
                            <img src="/coin.svg" width={200} alt="Coin SVG" className="mx-auto" />
                        </button>

                        <div className="w-full text-center z-10">
                            <img src="/shadow.svg" alt="Shadow SVG" className="mx-auto" />
                        </div>
                        <div className="mt-4">
                            <p className="text-white text-xl">Energy: {energy}</p>
                            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                                <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${energy}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="p-4 grid grid-cols-4 gap-2 h-20">
                        <Link href="/bonus" passHref>
                            <button className="bg-gradient-to-r from-purple-700 to-blue-500 text-white py-2 rounded-lg w-full h-full flex flex-col items-center justify-center">
                                <RedeemIcon className="mb-1" />
                                Bonus
                            </button>
                        </Link>
                        <Link href="/tasks" passHref>
                            <button className="bg-gradient-to-r from-green-800 to-green-600 text-white py-2 rounded-lg w-full h-full flex flex-col items-center justify-center">
                                <ListAltIcon className="mb-1" />
                                Tasks
                            </button>
                        </Link>
                        <Link href="/leaderboard" passHref>
                            <button className="bg-gradient-to-r from-orange-700 to-orange-500 text-white py-2 rounded-lg w-full h-full flex flex-col items-center justify-center">
                                <EmojiEventsIcon className="mb-1" />
                                Top
                            </button>
                        </Link>
                        <Link href="/profile" passHref className="flex-1">
                            <button className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-2 rounded-lg w-full h-full flex flex-col items-center justify-center">
                                <PeopleAltIcon className="mb-1" />
                                More
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoinMania;
