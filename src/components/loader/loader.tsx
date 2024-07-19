import React, { useState, useEffect } from 'react';
import styles from './CoinLoader.module.css';

interface LoaderProps {
    loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 1 : 100));
            }, 10); // Adjust the interval as needed

            return () => clearInterval(interval);
        }
    }, [loading]);

    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
            <img
                src='/images/coinmania.webp'
                alt="COINMANIA"
                className="fixed top-10 mx-auto"
                width={300}
            />
            <div className={`${styles.coin} absolute`}>
                <div className={`${styles.heads} ${styles.logo}`}/>
                <div className={`${styles.tails} ${styles.logo}`}/>
            </div>
            <div className="fixed bottom-20 items-center flex justify-center w-full">
                <span className={`text-2xl text-zinc-50 mx-auto font-black ${styles.typing} text-center`}></span>
            </div>
            <div className="w-2/3 fixed bottom-10">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{width: `${progress}%`}}></div>
                </div>
            </div>
        </div>
    );
}

export default Loader;
