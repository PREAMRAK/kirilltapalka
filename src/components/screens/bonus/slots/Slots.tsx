import React, { useState, useRef } from 'react';
import axios from 'axios';

const REEL_SYMBOLS = ['💃', '🎉', '🎁', '🍹', '🪩'] as const;
const SYMBOLS_PER_REEL = 20;

type ReelSymbol = typeof REEL_SYMBOLS[number];

const createReel = (): ReelSymbol[] => {
    const reel: ReelSymbol[] = [];
    for (let i = 0; i < SYMBOLS_PER_REEL; i++) {
        if (i < 8) reel.push('💃');
        else if (i < 13) reel.push('🎉');
        else if (i < 16) reel.push('🎁');
        else if (i < 18) reel.push('🍹');
        else reel.push('🪩');
    }
    return reel.sort(() => Math.random() - 0.5);
};

const SlotMachine: React.FC<{ userId: any }> = ({ userId }) => {
    const [reels, setReels] = useState<ReelSymbol[][]>([createReel(), createReel(), createReel()]);
    const [reelPositions, setReelPositions] = useState<number[]>([0, 0, 0]);
    const [spinning, setSpinning] = useState<boolean>(false);
    const [winEffect, setWinEffect] = useState<boolean>(false);
    const [winAmount, setWinAmount] = useState<number>(0);
    const reelRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

    const spinReel = (reelIndex: number, duration: number): Promise<void> => {
        return new Promise(resolve => {
            const startTime = performance.now();
            const startPosition = reelPositions[reelIndex];
            const totalRotations = SYMBOLS_PER_REEL * 3 + Math.floor(Math.random() * SYMBOLS_PER_REEL);

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentRotation = easeProgress * totalRotations;

                const newPosition = (startPosition + currentRotation) % SYMBOLS_PER_REEL;
                setReelPositions(prev => prev.map((pos, i) => i === reelIndex ? newPosition : pos));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    };

    const spin = async () => {
        if (spinning) return;
        setSpinning(true);
        setWinEffect(false);
        setWinAmount(0);

        // Start spinning the reels
        const spinPromises = reelRefs.map((_, index) => spinReel(index, 2000 + index * 500));

        try {
            // Call API while spinning
            const fetchResult = axios.get('/api/slot', { params: { userid: userId } });

            // Wait for API response
            const response = await fetchResult;
            const { first_slot, second_slot, third_slot, points } = response.data;

            // Wait for initial spinning to complete
            await Promise.all(spinPromises);

            // Update reels with the result from API one by one
            await new Promise(resolve => setTimeout(resolve, 500));
            setReels(prevReels => {
                const newReels = [...prevReels];
                newReels[0] = [first_slot, ...REEL_SYMBOLS.filter(s => s !== first_slot)];
                return newReels;
            });

            await new Promise(resolve => setTimeout(resolve, 500));
            setReels(prevReels => {
                const newReels = [...prevReels];
                newReels[1] = [second_slot, ...REEL_SYMBOLS.filter(s => s !== second_slot)];
                return newReels;
            });

            await new Promise(resolve => setTimeout(resolve, 500));
            setReels(prevReels => {
                const newReels = [...prevReels];
                newReels[2] = [third_slot, ...REEL_SYMBOLS.filter(s => s !== third_slot)];
                return newReels;
            });

            // Show win effect and amount
            if (points > 0) {
                setWinEffect(true);
                setWinAmount(points);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                alert('Дневной лимит исчерпан. Попробуйте завтра.');
            }
        }

        // Wait for a moment to show the result
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Reset reels to initial state
        setReels([createReel(), createReel(), createReel()]);
        setReelPositions([0, 0, 0]);
        setWinEffect(false);
        setWinAmount(0);
        setSpinning(false);
    };

    const getVisibleSymbols = (reelIndex: number): ReelSymbol[] => {
        const position = reelPositions[reelIndex];
        const reel = reels[reelIndex];
        return [
            reel[(Math.floor(position) - 1 + SYMBOLS_PER_REEL) % SYMBOLS_PER_REEL],
            reel[Math.floor(position) % SYMBOLS_PER_REEL],
            reel[(Math.floor(position) + 1) % SYMBOLS_PER_REEL],
            reel[(Math.floor(position) + 2) % SYMBOLS_PER_REEL]
        ];
    };

    return (
        <div className="w-full max-w-2xl flex-col flex gap-4 mx-auto bg-black bg-opacity-20 rounded-xl shadow-lg overflow-hidden p-4 z-10">
            <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-lg p-3 relative bg-opacity-70">
                <div className="flex justify-around mb-3 relative overflow-hidden h-40">
                    {[0, 1, 2].map(reelIndex => (
                        <div key={reelIndex} className="w-1/3 overflow-hidden h-full relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-10"></div>
                            <div
                                ref={reelRefs[reelIndex]}
                                className="absolute top-0 left-0 w-full transition-transform duration-100 ease-linear"
                                style={{ transform: `translateY(${-(reelPositions[reelIndex] % 1) * 100}%)` }}
                            >
                                {getVisibleSymbols(reelIndex).map((symbol, i) => (
                                    <div
                                        key={i}
                                        className="text-6xl h-[3.33rem] flex items-center justify-center"
                                        style={{ opacity: i === 1 ? 1 : 0.5 }}
                                    >
                                        {symbol}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center pointer-events-none">
                        <div className="w-full h-[3.33rem] border-t-2 border-b-2 border-yellow-400 bg-yellow-400 bg-opacity-20"></div>
                    </div>
                    {winEffect && (
                        <div className="absolute inset-0 pointer-events-none">
                            <svg className="w-full h-full">
                                <defs>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    fill="none"
                                    stroke="purple"
                                    strokeWidth="5"
                                    filter="url(#glow)"
                                >
                                    <animate attributeName="r" from="45%" to="50%" dur="0.8s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" from="1" to="0" dur="0.8s" repeatCount="indefinite" />
                                </circle>
                            </svg>
                            <div
                                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold ${winAmount >= 5000 ? 'text-5xl' : 'text-4xl'}`}
                                style={{
                                    textShadow: `0 0 10px ${winAmount >= 5000 ? '#f59e0b' : '#8b5cf6'}`,
                                    color: winAmount >= 5000 ? '#fbbf24' : '#a78bfa'
                                }}
                            >
                                +{winAmount} 🪙

                            </div>
                        </div>
                    )}
                </div>
                <button
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 px-4 rounded-lg transform transition duration-200 hover:scale-105 disabled:opacity-50 text-xl"
                    onClick={spin}
                    disabled={spinning}
                >
                    {spinning ? 'Spinning...' : 'SPIN 🎰'}
                </button>
            </div>
        </div>
    );
};

export default SlotMachine;
