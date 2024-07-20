import React, { useContext, useEffect, useState } from 'react';
import { Users, XCircle } from 'lucide-react';
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/header";
import Loader from "@/components/loader/loader";
import { webAppContext } from "@/app/context";

const FriendsPage = () => {
    const app = useContext(webAppContext);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [isInvitePressed, setIsInvitePressed] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [referralsCount, setReferralsCount] = useState(0);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/user/data?id=${app.initDataUnsafe.user?.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserData(data.user);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchReferralsCount = async () => {
            try {
                const response = await fetch(`/api/user/referrals?id=${app.initDataUnsafe.user?.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setReferralsCount(data.referralsCount);
            } catch (error) {
                console.error("Error fetching referrals count:", error);
            }
        };

        const fetchUsers = async () => {
            const testUsers = [
                { first_name: "TestUser1", scores: 250 },
                { first_name: "TestUser2", scores: 200 },
                { first_name: "TestUser3", scores: 150 },
                { first_name: "TestUser4", scores: 100 },
                { first_name: "TestUser5", scores: 50 },
            ];

            try {
                const response = await fetch('/api/users');
                const data = await response.json();

                if (data.users) {
                    const sortedUsers = [...data.users, ...testUsers].sort((a, b) => b.scores - a.scores);
                    setUsers(sortedUsers);
                } else {
                    setUsers(testUsers);
                }
            } catch (error) {
                setUsers(testUsers);
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        if (app.initDataUnsafe.user?.id) {
            fetchUserData();
            fetchReferralsCount();
            fetchUsers();
        }
    }, [app.initDataUnsafe.user?.id]);

    const copyToClipboard = () => {
        const referralLink = `https://t.me/hearthneuro_bot/demo?startapp=${app.initDataUnsafe.user?.id}`;
        navigator.clipboard.writeText(referralLink)
            .then(() => {
                alert("Скопировано!");
            })
            .catch((err) => {
                alert("Error copying to clipboard: ", err);
                console.error("Error copying to clipboard: ", err);
            });
    };


    const buttonStyle = {
        transition: 'all 0.3s ease',
        transform: 'scale(1)',
        ':active': {
            transform: 'scale(0.98)',
        }
    };

    const ScoreboardDisplay = ({ icon, value, color, fontSize, width }) => (
        <div style={{
            fontSize: fontSize,
            fontWeight: 'bold',
            color: color,
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '10px',
            padding: '5px 10px',
            margin: '5px auto',
            border: `2px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
        }}>
            {icon} {value}
        </div>
    );

    if (loading) {
        return <Loader loading={loading} />;
    }


    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to top, #842221, black)', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', overflowY: 'auto' }}>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.07)', backdropFilter: 'blur(10px)', borderRadius: '25px', border: '1px solid rgba(255, 255, 255, 0.18)', width: '100%', maxWidth: '500px', padding: '20px', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#f0f0f0', marginBottom: '15px' }}>👤 Мой профиль</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f8cc46' }}>{app.initDataUnsafe.user?.first_name}</h3>
                        <span style={{ fontSize: '1rem', color: '#f0f0f0' }}>Король танцпола</span>
                    </div>
                    <ScoreboardDisplay icon="⭐" value={userData?.scores || 0} color="#f8cc46" fontSize="1.8rem" width="100%" />
                    <ScoreboardDisplay icon="⚡️" value="995/1000" color="#ffffff" fontSize="1.2rem" width="60%" />
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', marginTop: '20px', marginBottom: '10px', textAlign: 'left', borderBottom: '2px solid #f8cc46', paddingBottom: '5px' }}>📊 Статистика:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', color: '#ffffff' }}>
                        <div>🪙 Всего нажатий: <span style={{ color: '#f8cc46' }}>{userData?.scores || 0}</span></div>
                        <div>🎰 Прокруток слота: <span style={{ color: '#f8cc46' }}>1000</span></div>
                        <div>👥 Приглашено друзей: <span style={{ color: '#f8cc46' }}>{referralsCount}</span></div>
                    </div>
                    <button
                        onMouseDown={() => setIsInvitePressed(true)}
                        onMouseUp={() => setIsInvitePressed(false)}
                        onMouseLeave={() => setIsInvitePressed(false)}
                        onClick={copyToClipboard}
                        style={{
                            ...buttonStyle,
                            width: '100%',
                            padding: '15px',
                            marginTop: '15px',
                            borderRadius: '10px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: isInvitePressed ? '#1a7999' : '#2596be',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: isInvitePressed ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.1)',
                            transform: isInvitePressed ? 'scale(0.98)' : 'scale(1)',
                        }}
                    >
                        <Users size={20} style={{ marginRight: '10px' }} /> Пригласить друзей
                    </button>
                    <p style={{ fontSize: '0.8rem', marginTop: '10px', textAlign: 'center', color: '#f0f0f0' }}>
                        Пригласи друзей и получи +500⚡ к лимиту Party Energy навсегда.
                        Больше энергии – больше монет и ⭐ каждый день!
                    </p>
                </div>

                <button onClick={() => setShowLeaderboard(true)} style={{ ...buttonStyle, backgroundColor: '#f8cc46', borderRadius: '25px', width: '100%', maxWidth: '500px', padding: '15px', fontSize: '1.3rem', fontWeight: 'bold', color: '#000000', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    🏆 Лидеры VNVNC
                </button>
            </div>

            <div className={'z-50 w-full fixed bottom-0'}>
                <Footer activeTab='Frens' />
            </div>

            {showLeaderboard && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '25px', border: '1px solid rgba(255, 255, 255, 0.18)', width: '95%', maxWidth: '500px', height: '90%', overflowY: 'auto', padding: '20px', color: '#f0f0f0', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>🏆 Лидеры VNVNC</h2>
                            <button onClick={() => setShowLeaderboard(false)} style={{ ...buttonStyle, background: 'none', border: 'none', color: '#f0f0f0', cursor: 'pointer' }}><XCircle size={30} /></button>
                        </div>
                        <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '10px', marginBottom: '15px', paddingTop: '10px' }}>
                            {users.map((user, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    marginBottom: '10px',
                                    backgroundColor: index < 3 ? ['gold', 'silver', '#cd7f32'][index] : 'rgba(255,255,255,0.1)',
                                    color: index < 3 ? '#000000' : '#ffffff',
                                    position: 'relative',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                                        <span style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '1.5rem', color: index < 3 ? '#96231a' : 'inherit' }}>{index + 1}</span>
                                        <span>{user.first_name}</span>
                                        {index === 0 && <span style={{ fontSize: '1.5rem', marginLeft: '5px' }}>👑</span>}
                                    </div>
                                    <div style={{ width: '50%', textAlign: 'right' }}>
                                        <div>{user.scores}</div>
                                        <span className="text-yellow-300">⭐</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p style={{ textAlign: 'center', marginTop: 'auto', fontSize: '0.9rem', color: '#888' }}>
                            В полной версии отображается топ-30 игроков
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendsPage;
