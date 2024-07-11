import React from 'react';
import Link from 'next/link';
import RedeemIcon from '@mui/icons-material/Redeem';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


import { useState } from 'react';

const CoinMania = () => {

    const [points, setPoints] = useState(0);

    return (
        <div className="bg-black flex flex-col min-h-screen items-center justify-center text-white p-2">
            <div className="w-full max-w-md mx-auto bg-gradient-to-r from-black to-zinc-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold text-red-600">VNVNC COIN MANIA</h1>
                    <div className="mt-4">
                        <div className="flex justify-center items-center">
                            <span className="text-yellow-500 text-3xl">⭐</span>
                            <span className="text-white text-3xl ml-2">{points}</span>
                        </div>
                        <div className="mt-4">
                            <button
                                className="mt-4 p-4 text-white rounded-full transform active:scale-95"
                                onClick={() => setPoints(points + 1)}
                            >
                                <img src="/coin.svg" alt="Coin SVG" className="mx-auto" />
                            </button>
                        </div>
                        <div className="w-full text-center z-10">
                            <img src="/shadow.svg" alt="Shadow SVG" className="mx-auto" />
                        </div>
                        <div className="mt-4">
                            <p className="text-white text-xl">1,000 Party Power</p>
                            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                                <div className="bg-yellow-500 h-full rounded-full" style={{ width: '100%' }}></div>
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
                                Invite
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CoinMania;

