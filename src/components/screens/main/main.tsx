"use client";

import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import RedeemIcon from "@mui/icons-material/Redeem";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { webAppContext } from "@/app/context";
import supabase from "@/db/supabase";
import styles from "./CoinMania.module.css";

const CoinMania = () => {
  const app = useContext(webAppContext);
  const [userData, setUserData] = useState(null);
  const [points, setPoints] = useState(0);

  const savedEnergy = Number(localStorage.getItem("energy"));
  const lastExitTime = Number(localStorage.getItem("lastExitTime"));
  const timeDifference = (new Date().getTime() - Number(lastExitTime)) / 1000;
  const energyToUpdate = savedEnergy + Math.floor(timeDifference);

  const [energy, setEnergy] = useState(
    energyToUpdate > 100 ? 100 : energyToUpdate
  );
  const [clickCount, setClickCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clickEffects, setClickEffects] = useState([]);
  const [isCoinPressed, setIsCoinPressed] = useState(false);
  const [boosterMultiplier, setBoosterMultiplier] = useState(1);

  const storage = app.CloudStorage;

  const getStorageItem = (key: string): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      storage.getItem(key, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `/api/user/checkbooster?id=${app.initDataUnsafe.user?.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("User data fetched:", data); // Логирование данных пользователя
        setUserData(data.user);
        setPoints(data.user.scores);
        updateBoosterMultiplier(
          data.user.booster_x2,
          data.user.booster_x3,
          data.user.booster_x5
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [app.initDataUnsafe.user?.id]);

  useEffect(() => {
    const tryRestoreEnergyValue = async () => {
      const savedEnergy = localStorage.getItem("energy");
      const lastExitTime = localStorage.getItem("lastExitTime");

      console.log({
        savedEnergy,
        lastExitTime: new Date(Number(lastExitTime)).toString(),
      });

      if (savedEnergy !== null) {
        let accumulatedEnergy = Number(savedEnergy);

        if (lastExitTime) {
          const currentTime = new Date().getTime();
          const timeDifference = (currentTime - Number(lastExitTime)) / 1000; // разница в секундах
          accumulatedEnergy += Math.floor(timeDifference); // энергия растет на 1 каждую секунду
          if (accumulatedEnergy > 100) {
            accumulatedEnergy = 100;
          }
        }

        setEnergy(accumulatedEnergy);
      }
    };

    tryRestoreEnergyValue();
  }, []);

  useEffect(() => {
    const energyInterval = setInterval(() => {
      setEnergy((prevEnergy) =>
        prevEnergy < 100 ? prevEnergy + 1 : prevEnergy
      );
    }, 1000);

    return () => clearInterval(energyInterval);
  }, []);

  useEffect(() => {
    const boosterInterval = setInterval(() => {
      if (userData) {
        updateBoosterMultiplier(
          userData.booster_x2,
          userData.booster_x3,
          userData.booster_x5
        );
      }
    }, 10000); // Проверка каждые 10 секунд

    return () => clearInterval(boosterInterval);
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("energy", String(energy));
    localStorage.setItem("lastExitTime", new Date().getTime().toString());
  });

  const updateBoosterMultiplier = (booster_x2, booster_x3, booster_x5) => {
    let activeMultiplier = 1;

    const boosterEndTimes = [
      { endTime: new Date(booster_x2), multiplier: 2 },
      { endTime: new Date(booster_x3), multiplier: 3 },
      { endTime: new Date(booster_x5), multiplier: 5 },
    ];

    boosterEndTimes.forEach(({ endTime, multiplier }) => {
      if (endTime > new Date()) {
        activeMultiplier = multiplier;
      }
    });

    console.log("Active multiplier:", activeMultiplier);
    setBoosterMultiplier(activeMultiplier);
  };

  const handleButtonClick = async (event) => {
    if (energy <= 0) return;

    const { clientX, clientY } = event;
    const newClickEffect = {
      id: Date.now(),
      x: clientX,
      y: clientY,
    };
    setClickEffects((prevEffects) => [...prevEffects, newClickEffect]);

    setTimeout(() => {
      setClickEffects((prevEffects) =>
        prevEffects.filter((effect) => effect.id !== newClickEffect.id)
      );
    }, 1000); // Эффект будет виден 1 секунду

    const pointsToAdd = boosterMultiplier;
    console.log(
      "Booster multiplier:",
      boosterMultiplier,
      "Points to add:",
      pointsToAdd
    );
    setPoints((prevPoints) => prevPoints + pointsToAdd);
    setEnergy((prevEnergy) => prevEnergy - 1);
    setClickCount((prevCount) => prevCount + 1);

    setIsCoinPressed(true);
    setTimeout(() => setIsCoinPressed(false), 300); // Длительность анимации совпадает с её временем

    if ((clickCount + 1) % 10 === 0) {
      try {
        const { error } = await supabase
          .from("users")
          .update({ scores: points + pointsToAdd })
          .eq("id", app.initDataUnsafe.user?.id);

        if (error) {
          throw error;
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="bg-black flex flex-col min-h-screen items-center justify-center text-white p-2 select-none">
      <div className="w-full max-w-md mx-auto bg-gradient-to-r from-black to-zinc-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl relative">
        <div className="p-4 text-center">
          <h1 className="text-3xl font-bold text-white">VNVNC COIN MANIA</h1>
          <div className="mt-4">
            <div className="flex justify-center items-center">
              <span className="text-yellow-500 text-3xl">⭐</span>
              <span className="text-white text-3xl ml-2">{points}</span>
            </div>

            <button
              className={`mt-4 p-4 text-white rounded-full transform active:scale-95 ${
                isCoinPressed ? styles.coinPress : ""
              }`}
              onClick={handleButtonClick}
              onTouchStart={handleButtonClick}
            >
              <img
                src="/coin.svg"
                width={200}
                alt="Coin SVG"
                className="mx-auto"
              />
            </button>

            <div className="w-full text-center z-10">
              <img src="/shadow.svg" alt="Shadow SVG" className="mx-auto" />
            </div>
            <div className="mt-4">
              <p className="text-white text-xl">Energy: {energy}</p>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                <div
                  className="bg-yellow-500 h-full rounded-full"
                  style={{ width: `${energy}%` }}
                ></div>
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
        {clickEffects.map((effect) => (
          <div
            key={effect.id}
            className="absolute text-white text-xl font-thin animate-ping pointer-events-none select-none"
            style={{ top: effect.y - 40, left: effect.x + 20 }}
          >
            +{boosterMultiplier}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinMania;
