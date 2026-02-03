import React, { useState, useEffect } from 'react';

export default function ApologyPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [forgiven, setForgiven] = useState(false);
  const [tears, setTears] = useState([]);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Auto-hide intro after animation
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!forgiven && !showIntro) {
      // Create falling tears
      const interval = setInterval(() => {
        const newTear = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 2 + Math.random() * 2
        };
        setTears(prev => [...prev, newTear]);
      }, 300);

      setTimeout(() => clearInterval(interval), 10000);
      return () => clearInterval(interval);
    }
  }, [forgiven, showIntro]);

  useEffect(() => {
    if (forgiven) {
      // Create healing hearts
      const interval = setInterval(() => {
        const newHeart = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          delay: Math.random(),
          duration: 3 + Math.random()
        };
        setHearts(prev => [...prev, newHeart]);
      }, 250);

      setTimeout(() => clearInterval(interval), 5000);
      return () => clearInterval(interval);
    }
  }, [forgiven]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setTears(prev => prev.slice(-30));
      setHearts(prev => prev.slice(-40));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: forgiven 
        ? 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 25%, #e0e7ff 50%, #f3e8ff 75%, #fce7f3 100%)'
        : 'radial-gradient(circle at 30% 40%, #bfdbfe 0%, transparent 50%), radial-gradient(circle at 70% 60%, #cbd5e1 0%, transparent 50%), linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Crimson Text', 'Georgia', serif",
      transition: 'background 1s ease',
      padding: '2rem'
    }}>
      {/* Rain/Cloud effect when not forgiven */}
      {!forgiven && !showIntro && (
        <>
          {[...Array(20)].map((_, i) => (
            <div key={`cloud-${i}`} style={{
              position: 'absolute',
              fontSize: '2rem',
              opacity: 0.3,
              animation: `drift ${30 + i * 2}s infinite linear`,
              left: `${-10 + i * 6}%`,
              top: `${10 + (i % 3) * 15}%`,
            }}>
              ☁️
            </div>
          ))}
        </>
      )}

      {/* Falling tears */}
      {tears.map(tear => (
        <div
          key={tear.id}
          style={{
            position: 'absolute',
            left: `${tear.left}%`,
            top: '-20px',
            fontSize: '1.5rem',
            animation: `fall ${tear.duration}s linear`,
            animationDelay: `${tear.delay}s`,
            pointerEvents: 'none',
            opacity: 0.6
          }}
        >
          💧
        </div>
      ))}

      {/* Healing hearts when forgiven */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
            top: '-50px',
            fontSize: '2rem',
            animation: `fall ${heart.duration}s linear`,
            animationDelay: `${heart.delay}s`,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.4))'
          }}
        >
          💖
        </div>
      ))}

      {/* Intro animation - Person kneeling and apologizing */}
      {showIntro && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)',
          zIndex: 100,
          animation: 'fadeOut 1s ease-in-out 4s forwards'
        }}>
          <div style={{
            textAlign: 'center',
            animation: 'scaleIn 0.8s ease-out'
          }}>
            {/* Person standing then kneeling */}
            <div style={{
              fontSize: '10rem',
              animation: 'kneel 3s ease-in-out',
              marginBottom: '2rem'
            }}>
              🧎
            </div>
            
            {/* Broken heart appearing */}
            <div style={{
              fontSize: '5rem',
              animation: 'heartBreak 1.5s ease-out 1.5s forwards',
              opacity: 0,
              filter: 'drop-shadow(0 5px 15px rgba(100, 116, 139, 0.5))'
            }}>
              💔
            </div>

            {/* Tears falling from person */}
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                fontSize: '1.5rem',
                animation: `tearDrop ${0.8 + i * 0.1}s ease-in ${2 + i * 0.2}s forwards`,
                left: `calc(50% + ${-20 + i * 8}px)`,
                top: '40%',
                opacity: 0
              }}>
                💧
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{
        textAlign: 'center',
        background: forgiven 
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(255, 255, 255, 0.92)',
        padding: '3.5rem 3rem',
        borderRadius: '35px',
        boxShadow: forgiven 
          ? '0 25px 70px rgba(236, 72, 153, 0.3), 0 10px 30px rgba(219, 234, 254, 0.2)'
          : '0 30px 80px rgba(100, 116, 139, 0.35)',
        backdropFilter: 'blur(20px)',
        border: forgiven ? '3px solid rgba(236, 72, 153, 0.3)' : '3px solid rgba(148, 163, 184, 0.4)',
        maxWidth: '700px',
        position: 'relative',
        zIndex: 10,
        animation: showIntro ? 'none' : 'slideInUp 1s ease-out',
        opacity: showIntro ? 0 : 1,
        transition: 'all 0.8s ease'
      }}>
        {!forgiven ? (
          <>
            <div style={{
              fontSize: '5rem',
              marginBottom: '1.5rem',
              animation: 'sadFace 2s infinite',
              filter: 'drop-shadow(0 5px 15px rgba(100, 116, 139, 0.3))'
            }}>
              😔💔
            </div>
            
            <h1 style={{
              fontSize: '3.5rem',
              color: '#475569',
              marginBottom: '1.5rem',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(100, 116, 139, 0.2)',
              lineHeight: '1.3',
              fontFamily: "'Playfair Display', serif"
            }}>
              I'm So Sorry, Nafisa
            </h1>

            <div style={{
              fontSize: '1.35rem',
              color: '#64748b',
              lineHeight: '1.9',
              marginBottom: '2.5rem',
              textAlign: 'left',
              padding: '0 1rem',
              fontStyle: 'italic'
            }}>
              <p style={{ marginBottom: '1.2rem' }}>
                My dearest Nafisa, words cannot express how deeply sorry I am for hurting you. 
                The pain I've caused weighs heavy on my heart, and I would give anything to take it back.
              </p>
              <p style={{ marginBottom: '1.2rem' }}>
                You mean the world to me, and knowing that I've brought tears to those beautiful eyes 
                breaks my heart into a thousand pieces. You deserve nothing but happiness, love, and respect.
              </p>
              <p style={{ marginBottom: '1.2rem' }}>
                I know saying "I'm sorry" isn't enough, but please know that I am truly, deeply remorseful. 
                I promise to be better, to cherish you more, and to never take your precious heart for granted again.
              </p>
              <p style={{ 
                marginBottom: '0',
                fontSize: '1.45rem',
                fontWeight: 'bold',
                color: '#475569',
                textAlign: 'center',
                fontStyle: 'normal',
                marginTop: '1.5rem'
              }}>
                Will you find it in your heart to forgive me? 🥺
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '2rem'
            }}>
              <button
                onClick={() => setForgiven(true)}
                style={{
                  padding: '1.1rem 3.5rem',
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={e => {
                  e.target.style.transform = 'scale(1.08) translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.5)';
                }}
                onMouseLeave={e => {
                  e.target.style.transform = 'scale(1) translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.4)';
                }}
              >
                I Forgive You 💙
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{
              fontSize: '6rem',
              marginBottom: '1.5rem',
              animation: 'celebration 1.5s infinite',
              filter: 'drop-shadow(0 8px 20px rgba(236, 72, 153, 0.4))'
            }}>
              🙏💖✨
            </div>
            
            <h2 style={{
              fontSize: '3.5rem',
              color: '#ec4899',
              marginBottom: '1.5rem',
              fontWeight: 'bold',
              animation: 'rainbow 3s infinite',
              fontFamily: "'Playfair Display', serif"
            }}>
              Thank You, My Angel! 
            </h2>
            
            <p style={{
              fontSize: '1.5rem',
              color: '#db2777',
              lineHeight: '1.8',
              marginBottom: '2rem',
              fontStyle: 'italic'
            }}>
              Your forgiveness means everything to me, Nafisa. 
              <br/>
              I promise to be the person you deserve. 
              <br/>
              Thank you for giving me another chance. 💕
            </p>

            <div style={{
              fontSize: '3rem',
              animation: 'float 3s infinite ease-in-out'
            }}>
              🤗💝🌟
            </div>

            <button
              onClick={() => {
                setForgiven(false);
                setTears([]);
                setHearts([]);
              }}
              style={{
                marginTop: '2rem',
                padding: '0.9rem 2.5rem',
                fontSize: '1.2rem',
                border: 'none',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
                color: 'white',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 5px 15px rgba(139, 92, 246, 0.4)'
              }}
            >
              Start Fresh 🌸
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes drift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100vw);
          }
        }

        @keyframes kneel {
          0% {
            transform: translateY(0) scale(1);
          }
          40% {
            transform: translateY(0) scale(1);
          }
          60% {
            transform: translateY(30px) scale(0.95);
          }
          100% {
            transform: translateY(30px) scale(0.95);
          }
        }

        @keyframes heartBreak {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.3) rotate(5deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes tearDrop {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(150px);
            opacity: 0;
          }
        }

        @keyframes sadFace {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes celebration {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.15) rotate(-5deg);
          }
          75% {
            transform: scale(1.15) rotate(5deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes rainbow {
          0% { color: #ec4899; }
          33% { color: #f472b6; }
          66% { color: #db2777; }
          100% { color: #ec4899; }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
