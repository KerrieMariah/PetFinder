import { useState, useEffect, useRef } from "react";

const companions = [
  {
    id: "wolf",
    name: "Shadowfang",
    type: "Dire Wolf",
    emoji: "🐺",
    lore: "A massive wolf with fur dark as midnight and eyes like molten amber. Shadowfang is fiercely loyal, moving silently through the underbrush and always watching your back. Together, you are a pack.",
    traits: ["loyal", "brave", "protective"],
    stats: { STR: 16, DEX: 14, CON: 15, INT: 6, WIS: 13, CHA: 8 },
    ability: "Pack Tactics — Advantage on attacks when an ally is within 5ft of the target.",
    biome: "Deep Forest",
  },
  {
    id: "hawk",
    name: "Zephyrclaw",
    type: "Giant Hawk",
    emoji: "🦅",
    lore: "A breathtaking raptor with a wingspan that blots out the sun. Zephyrclaw soars above the battlefield, spotting threats from miles away and diving with devastating precision. Your eyes in the sky.",
    traits: ["strategic", "independent", "perceptive"],
    stats: { STR: 12, DEX: 18, CON: 10, INT: 8, WIS: 16, CHA: 10 },
    ability: "Keen Sight — Advantage on Perception checks that rely on sight. Flyby attacks.",
    biome: "Mountain Peaks",
  },
  {
    id: "bear",
    name: "Thornback",
    type: "Cave Bear",
    emoji: "🐻",
    lore: "A colossal bear scarred from countless battles, yet gentle as a spring breeze with those it trusts. Thornback's thunderous roar shakes the earth, and enemies flee at the mere sight of this living fortress.",
    traits: ["gentle", "strong", "nurturing"],
    stats: { STR: 20, DEX: 8, CON: 18, INT: 4, WIS: 12, CHA: 7 },
    ability: "Intimidating Presence — Enemies within 30ft must pass a WIS save or be Frightened.",
    biome: "Mountain Caves",
  },
  {
    id: "panther",
    name: "Mistwalker",
    type: "Shadow Panther",
    emoji: "🐆",
    lore: "A sleek, ink-black panther that seems to melt into darkness itself. Mistwalker is cunning and patient, preferring to strike from the shadows with lethal grace. The perfect partner for a Ranger who favors stealth.",
    traits: ["cunning", "stealthy", "mysterious"],
    stats: { STR: 14, DEX: 20, CON: 12, INT: 10, WIS: 14, CHA: 12 },
    ability: "Shadow Meld — Can become invisible in dim light or darkness as a bonus action.",
    biome: "Twilight Jungle",
  },
  {
    id: "owl",
    name: "Aetherwing",
    type: "Mystic Owl",
    emoji: "🦉",
    lore: "An owl touched by the Feywild, its feathers shimmer with an iridescent glow. Aetherwing is ancient and wise, communicating through empathic visions and guiding you with cryptic but invaluable insight.",
    traits: ["wise", "mystical", "calm"],
    stats: { STR: 6, DEX: 16, CON: 10, INT: 16, WIS: 20, CHA: 14 },
    ability: "Fey Whisper — Once per long rest, grants the Ranger a vision of a hidden truth.",
    biome: "Enchanted Glade",
  },
  {
    id: "snake",
    name: "Venomcoil",
    type: "Giant Serpent",
    emoji: "🐍",
    lore: "A massive constrictor with iridescent scales that shift between emerald and obsidian. Venomcoil is patient and calculating, coiling around problems both literal and metaphorical. Underestimate this companion at your peril.",
    traits: ["patient", "clever", "adaptable"],
    stats: { STR: 16, DEX: 16, CON: 14, INT: 12, WIS: 10, CHA: 6 },
    ability: "Constrict — Grapples and restrains a target, dealing ongoing damage each turn.",
    biome: "Ancient Swamp",
  },
];

const questions = [
  {
    question: "You come across a camp of bandits raiding a merchant caravan. What do you do?",
    answers: [
      { text: "Charge in headfirst — those merchants need you NOW", id: "brave" },
      { text: "Scout from a vantage point and plan a tactical strike", id: "strategic" },
      { text: "Sneak around and sabotage their supplies first", id: "cunning" },
      { text: "Try to negotiate or intimidate them into leaving", id: "gentle" },
    ],
  },
  {
    question: "Your party sets camp for the night. How do you spend your watch?",
    answers: [
      { text: "Patrol the perimeter — nothing gets past you", id: "protective" },
      { text: "Climb a tree and keep an eye on the horizon", id: "perceptive" },
      { text: "Sit still and listen to the forest speak", id: "wise" },
      { text: "Set traps and alarms around the camp", id: "clever" },
    ],
  },
  {
    question: "A young druid asks what being a Ranger means to you. You say…",
    answers: [
      { text: '"It\'s about the bond between you and the wild"', id: "loyal" },
      { text: '"Freedom. The open sky and endless paths"', id: "independent" },
      { text: '"Protecting those who can\'t protect themselves"', id: "nurturing" },
      { text: '"Becoming one with the shadows of the world"', id: "mysterious" },
    ],
  },
  {
    question: "You find an ancient ruin deep in the forest. What draws you inside?",
    answers: [
      { text: "A strange magical energy pulling at your senses", id: "mystical" },
      { text: "The thrill of danger and the unknown", id: "brave" },
      { text: "Curiosity — there could be useful knowledge within", id: "clever" },
      { text: "A defensive instinct — something dangerous might escape", id: "protective" },
    ],
  },
  {
    question: "In a heated argument between two party members, you…",
    answers: [
      { text: "Step in firmly and mediate with calm authority", id: "wise" },
      { text: "Stay out of it — you prefer actions to words", id: "stealthy" },
      { text: "Side with whoever seems right, loyally", id: "loyal" },
      { text: "Crack a joke to defuse the tension", id: "adaptable" },
    ],
  },
  {
    question: "Which landscape calls to your Ranger's soul?",
    answers: [
      { text: "Dense, ancient forest with shafts of golden light", id: "nurturing" },
      { text: "Windswept mountain peaks above the clouds", id: "independent" },
      { text: "A misty swamp full of hidden dangers", id: "patient" },
      { text: "A moonlit clearing humming with fey magic", id: "calm" },
    ],
  },
];

const traitToCompanion = {
  loyal: "wolf", brave: "wolf", protective: "wolf",
  strategic: "hawk", independent: "hawk", perceptive: "hawk",
  gentle: "bear", strong: "bear", nurturing: "bear",
  cunning: "panther", stealthy: "panther", mysterious: "panther",
  wise: "owl", mystical: "owl", calm: "owl",
  patient: "snake", clever: "snake", adaptable: "snake",
};

function StatBar({ label, value }) {
  const maxStat = 20;
  const pct = (value / maxStat) * 100;
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontFamily: "'Cinzel', serif", color: "#c4a882", marginBottom: 2 }}>
        <span>{label}</span><span>{value}</span>
      </div>
      <div style={{ height: 6, background: "rgba(196,168,130,0.15)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`, borderRadius: 3,
          background: "linear-gradient(90deg, #8b6914, #d4a843, #f0d080)",
          transition: "width 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }} />
      </div>
    </div>
  );
}

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    size: 1 + Math.random() * 3,
    opacity: 0.2 + Math.random() * 0.5,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute", bottom: -10, left: `${p.left}%`,
          width: p.size, height: p.size, borderRadius: "50%",
          background: "#d4a843", opacity: 0,
          animation: `floatUp ${p.duration}s ${p.delay}s infinite ease-out`,
        }} />
      ))}
    </div>
  );
}

export default function RangerCompanionQuiz() {
  const [phase, setPhase] = useState("intro"); // intro, quiz, revealing, result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [revealStep, setRevealStep] = useState(0);

  const transition = (callback) => {
    setFadeIn(false);
    setTimeout(() => { callback(); setFadeIn(true); }, 500);
  };

  const startQuiz = () => transition(() => { setPhase("quiz"); setCurrentQ(0); setAnswers([]); });

  const selectAnswer = (traitId) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(traitId);
    const newAnswers = [...answers, traitId];
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        transition(() => { setCurrentQ(currentQ + 1); setAnswers(newAnswers); setSelectedAnswer(null); });
      } else {
        setAnswers(newAnswers);
        transition(() => { setPhase("revealing"); calculateResult(newAnswers); });
      }
    }, 600);
  };

  const calculateResult = (allAnswers) => {
    const scores = {};
    allAnswers.forEach(trait => {
      const cId = traitToCompanion[trait];
      if (cId) scores[cId] = (scores[cId] || 0) + 1;
    });
    const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "wolf";
    const matched = companions.find(c => c.id === best);
    setResult(matched);
    // Dramatic reveal sequence
    setTimeout(() => setRevealStep(1), 800);
    setTimeout(() => setRevealStep(2), 2000);
    setTimeout(() => setRevealStep(3), 3200);
    setTimeout(() => { transition(() => setPhase("result")); }, 4500);
  };

  const restart = () => transition(() => { setPhase("intro"); setResult(null); setCurrentQ(0); setAnswers([]); setRevealStep(0); setSelectedAnswer(null); });

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 0%, #1a2a1a 0%, #0d1a0d 40%, #060d06 100%)",
      color: "#e8dcc8",
      fontFamily: "'EB Garamond', Georgia, serif",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: var(--opacity, 0.4); }
          90% { opacity: var(--opacity, 0.4); }
          100% { transform: translateY(-100vh) scale(0); opacity: 0; }
        }
        
        @keyframes pulse { 
          0%, 100% { opacity: 0.4; } 
          50% { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes runeGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(212,168,67,0.3); }
          50% { text-shadow: 0 0 25px rgba(212,168,67,0.8), 0 0 50px rgba(212,168,67,0.3); }
        }

        .fade-wrapper {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .answer-btn {
          background: linear-gradient(135deg, rgba(30,40,25,0.9), rgba(20,30,18,0.95));
          border: 1px solid rgba(196,168,130,0.2);
          color: #e8dcc8;
          padding: 18px 24px;
          font-family: 'EB Garamond', serif;
          font-size: 17px;
          text-align: left;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s ease;
          width: 100%;
          line-height: 1.4;
          position: relative;
          overflow: hidden;
        }
        .answer-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.02));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .answer-btn:hover::before { opacity: 1; }
        .answer-btn:hover {
          border-color: rgba(212,168,67,0.5);
          transform: translateX(6px);
          box-shadow: 0 0 20px rgba(212,168,67,0.1), inset 0 0 30px rgba(212,168,67,0.05);
        }
        .answer-btn.selected {
          border-color: #d4a843;
          background: linear-gradient(135deg, rgba(50,45,20,0.95), rgba(30,28,15,0.95));
          box-shadow: 0 0 30px rgba(212,168,67,0.2);
        }

        .cta-btn {
          background: linear-gradient(135deg, #8b6914, #d4a843);
          border: none;
          color: #1a1408;
          padding: 16px 48px;
          font-family: 'Cinzel', serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 3px;
          text-transform: uppercase;
          border-radius: 2px;
          transition: all 0.3s;
          position: relative;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(212,168,67,0.4);
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,168,130,0.3), transparent);
          margin: 24px 0;
        }

        .reveal-text {
          font-family: 'Cinzel Decorative', serif;
          color: #d4a843;
          animation: runeGlow 2s ease-in-out infinite;
        }
      `}</style>

      <Particles />

      {/* Vignette overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
      }} />

      {/* Forest canopy top decoration */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 120, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(6,13,6,0.95) 0%, transparent 100%)",
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 680, margin: "0 auto", padding: "60px 24px 80px" }}>
        <div className="fade-wrapper" style={{ opacity: fadeIn ? 1 : 0, transform: fadeIn ? "translateY(0)" : "translateY(20px)" }}>

          {/* ============ INTRO ============ */}
          {phase === "intro" && (
            <div style={{ textAlign: "center", paddingTop: 60 }}>
              <div style={{ fontSize: 64, marginBottom: 16, animation: "breathe 4s ease-in-out infinite" }}>🌿</div>
              <h1 style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "clamp(28px, 6vw, 48px)",
                fontWeight: 900,
                color: "#d4a843",
                lineHeight: 1.2,
                marginBottom: 8,
                textShadow: "0 0 40px rgba(212,168,67,0.3)",
              }}>
                The Companion's Call
              </h1>
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 14,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "rgba(196,168,130,0.6)",
                marginBottom: 40,
              }}>
                A Ranger's Beast Companion Quiz
              </p>

              <div style={{
                background: "linear-gradient(135deg, rgba(20,28,18,0.8), rgba(15,22,14,0.9))",
                border: "1px solid rgba(196,168,130,0.15)",
                borderRadius: 4,
                padding: "32px 28px",
                marginBottom: 40,
                textAlign: "left",
              }}>
                <p style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(232,220,200,0.85)", fontStyle: "italic" }}>
                  Deep in the wilds, where ancient trees whisper forgotten truths, every Ranger hears the call of a kindred spirit. The beast that will walk beside you through shadow and storm is not chosen — it is revealed.
                </p>
                <div className="divider" />
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(196,168,130,0.6)" }}>
                  Answer six questions to discover which legendary beast companion is destined to join your journey. Your choices will reveal the creature whose soul mirrors your own.
                </p>
              </div>

              <button className="cta-btn" onClick={startQuiz}>
                Enter the Wilds
              </button>

              <div style={{ marginTop: 60, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
                {companions.map(c => (
                  <div key={c.id} style={{ fontSize: 28, opacity: 0.25, transition: "opacity 0.3s", cursor: "default" }}
                    onMouseEnter={e => e.target.style.opacity = 0.7}
                    onMouseLeave={e => e.target.style.opacity = 0.25}>
                    {c.emoji}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============ QUIZ ============ */}
          {phase === "quiz" && (
            <div style={{ paddingTop: 40 }}>
              {/* Progress */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3, color: "rgba(196,168,130,0.5)", textTransform: "uppercase" }}>
                    Question {currentQ + 1} of {questions.length}
                  </span>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 2, color: "rgba(196,168,130,0.3)" }}>
                    {["🌑", "🌒", "🌓", "🌔", "🌕", "✨"][currentQ]}
                  </span>
                </div>
                <div style={{ height: 2, background: "rgba(196,168,130,0.1)", borderRadius: 1 }}>
                  <div style={{
                    height: "100%", borderRadius: 1,
                    width: `${((currentQ + 1) / questions.length) * 100}%`,
                    background: "linear-gradient(90deg, #8b6914, #d4a843)",
                    transition: "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                  }} />
                </div>
              </div>

              <h2 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(20px, 4vw, 26px)",
                fontWeight: 600,
                color: "#e8dcc8",
                lineHeight: 1.5,
                marginBottom: 32,
              }}>
                {questions[currentQ].question}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {questions[currentQ].answers.map((a, i) => (
                  <button
                    key={i}
                    className={`answer-btn ${selectedAnswer === a.id ? "selected" : ""}`}
                    onClick={() => selectAnswer(a.id)}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <span style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 13,
                      color: "rgba(212,168,67,0.5)",
                      marginRight: 12,
                    }}>
                      {["I", "II", "III", "IV"][i]}
                    </span>
                    {a.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ============ REVEALING ============ */}
          {phase === "revealing" && (
            <div style={{ textAlign: "center", paddingTop: 120, minHeight: "60vh" }}>
              <div style={{ opacity: revealStep >= 0 ? 1 : 0, transition: "opacity 1s" }}>
                <p className="reveal-text" style={{ fontSize: 18, marginBottom: 20 }}>
                  The wilds stir…
                </p>
              </div>
              <div style={{ opacity: revealStep >= 1 ? 1 : 0, transition: "opacity 1s" }}>
                <p className="reveal-text" style={{ fontSize: 22, marginBottom: 20 }}>
                  A presence emerges from the mist…
                </p>
              </div>
              <div style={{ opacity: revealStep >= 2 ? 1 : 0, transition: "opacity 1s" }}>
                <div style={{ fontSize: 72, marginBottom: 16, animation: "breathe 2s ease-in-out infinite" }}>
                  {result?.emoji}
                </div>
              </div>
              <div style={{ opacity: revealStep >= 3 ? 1 : 0, transition: "opacity 1s" }}>
                <p className="reveal-text" style={{ fontSize: 28 }}>
                  {result?.name}
                </p>
              </div>
            </div>
          )}

          {/* ============ RESULT ============ */}
          {phase === "result" && result && (
            <div style={{ paddingTop: 30 }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div style={{ fontSize: 80, marginBottom: 12, animation: "breathe 4s ease-in-out infinite" }}>
                  {result.emoji}
                </div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "rgba(196,168,130,0.5)", marginBottom: 8 }}>
                  Your Destined Companion
                </p>
                <h2 style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "clamp(30px, 7vw, 44px)",
                  fontWeight: 900,
                  color: "#d4a843",
                  textShadow: "0 0 40px rgba(212,168,67,0.3)",
                  marginBottom: 4,
                }}>
                  {result.name}
                </h2>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: "rgba(196,168,130,0.6)", letterSpacing: 2 }}>
                  {result.type}
                </p>
              </div>

              {/* Lore card */}
              <div style={{
                background: "linear-gradient(135deg, rgba(20,28,18,0.85), rgba(15,22,14,0.95))",
                border: "1px solid rgba(196,168,130,0.2)",
                borderRadius: 4,
                padding: "28px 24px",
                marginBottom: 20,
              }}>
                <p style={{ fontSize: 17, lineHeight: 1.85, fontStyle: "italic", color: "rgba(232,220,200,0.85)" }}>
                  "{result.lore}"
                </p>
              </div>

              {/* Stats + Info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                {/* Stats */}
                <div style={{
                  background: "rgba(15,22,14,0.8)",
                  border: "1px solid rgba(196,168,130,0.12)",
                  borderRadius: 4,
                  padding: "20px 18px",
                }}>
                  <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "rgba(212,168,67,0.6)", marginBottom: 14 }}>
                    Ability Scores
                  </h3>
                  {Object.entries(result.stats).map(([k, v]) => (
                    <StatBar key={k} label={k} value={v} />
                  ))}
                </div>

                {/* Details */}
                <div style={{
                  background: "rgba(15,22,14,0.8)",
                  border: "1px solid rgba(196,168,130,0.12)",
                  borderRadius: 4,
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}>
                  <div>
                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "rgba(212,168,67,0.6)", marginBottom: 8 }}>
                      Special Ability
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(232,220,200,0.8)" }}>{result.ability}</p>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "rgba(212,168,67,0.6)", marginBottom: 8 }}>
                      Preferred Biome
                    </h3>
                    <p style={{ fontSize: 14, color: "rgba(232,220,200,0.8)" }}>{result.biome}</p>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "rgba(212,168,67,0.6)", marginBottom: 8 }}>
                      Core Traits
                    </h3>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {result.traits.map(t => (
                        <span key={t} style={{
                          fontSize: 12, fontFamily: "'Cinzel', serif", textTransform: "uppercase", letterSpacing: 1,
                          padding: "4px 10px",
                          background: "rgba(212,168,67,0.1)",
                          border: "1px solid rgba(212,168,67,0.25)",
                          borderRadius: 2,
                          color: "#d4a843",
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Companion bond */}
              <div style={{
                background: "linear-gradient(135deg, rgba(30,25,10,0.8), rgba(20,18,8,0.9))",
                border: "1px solid rgba(212,168,67,0.2)",
                borderRadius: 4,
                padding: "20px 24px",
                textAlign: "center",
                marginBottom: 32,
              }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "rgba(212,168,67,0.5)", marginBottom: 8 }}>
                  Ranger's Bond
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(232,220,200,0.7)", fontStyle: "italic" }}>
                  "I, a Ranger of the wilds, do forge an unbreakable bond with {result.name}, the {result.type}. Through storm and shadow, through fire and frost, we walk as one."
                </p>
              </div>

              <div style={{ textAlign: "center" }}>
                <button className="cta-btn" onClick={restart}>
                  Seek Another Companion
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 80, paddingBottom: 20 }}>
          <div className="divider" />
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "rgba(196,168,130,0.2)", marginTop: 16 }}>
            The Companion's Call • A Ranger's Guide to Beast Bonds
          </p>
        </div>
      </div>
    </div>
  );
}