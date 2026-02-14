'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, Music, VolumeX, Sparkles, CheckCircle, Lock, ArrowRight, Image as ImageIcon, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Level types
type Level = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
};

// Game state type
type GameState = {
  currentLevel: number;
  levels: Level[];
  totalLevels: number;
};

// Romantic messages for each level
const romanticMessages = {
  1: "Riddle of love solved! 💕 Your heart speaks in mysteries that only you and I understand.",
  2: "Memory match complete! 💖 Just like our hearts, perfectly paired and inseparable.",
  3: "Words unscrambled, and so is my love! 💝 Every letter spells out you and me.",
  4: "Puzzle completed! 🌸 Every piece fits perfectly, just like the moments we share.",
  5: "Love quiz aced! 💕 Your heart knows all the answers, and so does mine for you.",
  6: "Final gift unlocked! 💖 You are the treasure I’ll always cherish, now and forever."
};

// Name Input Dialog Component
function NameInputDialog({
  isOpen,
  onClose,
  playerName,
  setPlayerName,
}: {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  setPlayerName: (name: string) => void;
}) {
  const canStart = playerName.trim().length > 0;

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-md"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to Love's Adventure 💕
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Before we begin this romantic journey, what should we call you?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Input
            type="text"
            placeholder="Enter your name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="text-lg text-center"
            autoFocus
          />
        </div>

        <DialogFooter>
          <Button
            disabled={!canStart}
            onClick={onClose}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white"
            size="lg"
          >
            Begin Adventure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


// Level Completion Message Component
function LevelCompletionMessage({
  isOpen,
  onClose,
  message,
  level,
  playerName,
}: {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  level: number;
  playerName: string;
}) {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-lg"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            🎉 Level {level} Complete!
          </DialogTitle>
        </DialogHeader>

        <CardContent className="space-y-4 py-6">
          <p className="text-lg text-center italic text-muted-foreground">
            "{message}"
          </p>

          <p className="text-center text-base">
            <span className="font-semibold text-pink-600">With love,</span>
            <br />
            <span className="text-xl text-red-600 font-bold">SOSO</span>
            💖
          </p>
        </CardContent>

        <DialogFooter>
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
            size="lg"
          >
            {level === 6
              ? "Watch Your Special Video 🎥💘"
              : "Continue Journey"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


// Level 1: Riddle
function Level1Riddle({
  playerName,
  onComplete,
}: {
  playerName: string;
  onComplete: () => void;
}) {
  const riddles = [
    {
      question:
        "I can be dark, milk, or white, a little treat, a pure delight. I come in boxes or a single piece, a love-filled bite—oh, what a feast! What am I?",
      answer: "chocolate",
    },
    {
      question:
        "What has a face and two hands but no arms or legs?",
      answer: "clock",
    },
    {
      question:
        "I travel all around the world, but never leave the corner. What am I?",
      answer: "stamp",
    },
    {
      question:
        `I beat inside you every day, especially faster when you see me. What am I?`,
      answer: "heart",
    },
    {
      question:
        "I’m not a word, yet you feel me. I can’t be seen, but I can change your world. What am I?",
      answer: "love",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const correctAnswer = riddles[currentIndex].answer.toLowerCase().trim();

    if (guess.toLowerCase().trim() === correctAnswer) {
      setError("");

      if (currentIndex === riddles.length - 1) {
        onComplete(); // all riddles solved
      } else {
        setCurrentIndex(prev => prev + 1);
        setGuess("");
      }
    } else {
      setError("Not quite! Think again 💭");
    }
  };

  return (
    <div className="space-y-6 text-center">

      <h2 className="text-2xl font-bold text-red-500">
        Riddle {currentIndex + 1} of {riddles.length}
      </h2>

      <p className="text-lg text-muted-foreground">
        {riddles[currentIndex].question}
      </p>

      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Your answer..."
          className="border rounded-md px-4 py-2 w-64 text-center"
        />

        <Button onClick={handleSubmit}>
          Submit Answer
        </Button>

        {error && (
          <p className="text-red-500 font-medium">{error}</p>
        )}
      </div>

    </div>
  );
}


// Level 2: Memory Match Game
function Level2MemoryMatch({
  playerName,
  onComplete,
}: {
  playerName: string;
  onComplete: () => void;
}) {
  const foodItems = [
    { id: 1, emoji: "🍔", name: "Burger" },
    { id: 2, emoji: "🍜", name: "Maggie" },
    { id: 3, emoji: "🍗", name: "Chicken" },
    { id: 4, emoji: "🥞", name: "Dosa" },
    { id: 5, emoji: "🍫", name: "Chocolate" },
    { id: 6, emoji: "🍰", name: "Cake" },
    { id: 7, emoji: "🍿", name: "Popcorn" },
    { id: 8, emoji: "💧", name: "Water" },
  ];

  // 🔥 Proper Fisher-Yates Shuffle
  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateCards = () => {
    const duplicated = [...foodItems, ...foodItems];

    const cards = duplicated.map((item, index) => ({
      uniqueId: index,
      pairId: item.id,
      emoji: item.emoji,
      name: item.name,
      isFlipped: false,
      isMatched: false,
    }));

    return shuffleArray(cards);
  };

  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const handleCardClick = (index: number) => {
    if (isChecking) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;
    if (flippedCards.length === 2) return;

    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;
    setCards(updatedCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);

      const [firstIndex, secondIndex] = newFlipped;

      if (updatedCards[firstIndex].pairId === updatedCards[secondIndex].pairId) {
        updatedCards[firstIndex].isMatched = true;
        updatedCards[secondIndex].isMatched = true;

        setTimeout(() => {
          setCards([...updatedCards]);
          setFlippedCards([]);
          setMatchedPairs(prev => {
            const newCount = prev + 1;

            if (newCount === foodItems.length) {
              setTimeout(() => {
                onComplete();
              }, 800);
            }

            return newCount;
          });
          setIsChecking(false);
        }, 500);

      } else {
        setTimeout(() => {
          updatedCards[firstIndex].isFlipped = false;
          updatedCards[secondIndex].isFlipped = false;

          setCards([...updatedCards]);
          setFlippedCards([]);
          setIsChecking(false);
        }, 900);
      }
    }
  };

  return (
    <div className="space-y-6 text-center">

      <h2 className="text-2xl font-bold text-pink-500">
        Memory Match – Ultimate Food Challenge 🍽️
      </h2>

      <p className="text-muted-foreground">
        Match all 8 favorite foods to win, {playerName}! 💕
      </p>

      <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={card.uniqueId}
            onClick={() => handleCardClick(index)}
            className={`h-20 md:h-24 flex items-center justify-center rounded-xl cursor-pointer text-3xl transition-all duration-300 shadow-md
              ${card.isFlipped || card.isMatched
                ? "bg-pink-200 scale-105"
                : "bg-pink-500 text-white hover:scale-105"
              }
            `}
          >
            {card.isFlipped || card.isMatched ? card.emoji : "❓"}
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Matches found: {matchedPairs} / {foodItems.length}
      </p>

    </div>
  );
}

// Level 3: Word Scramble
function Level3WordScramble({
  playerName,
  onComplete,
}: {
  playerName: string;
  onComplete: () => void;
}) {
  const words = [
    { word: "forever", hint: "A promise that has no end." },
    { word: "passion", hint: "Strong romantic emotion." },
    { word: "destiny", hint: "Something meant to happen." },
    { word: "cherish", hint: "To deeply value someone." },
    { word: "smile", hint: "It brightens your face instantly." },
    { word: "promise", hint: "A vow you should never break." },
    { word: "soulmate", hint: "The one meant just for you." },
    { word: "pillu", hint: "Your name saved on Instagram" },
    { word: "muffin", hint: "Your name saved on Snapchat" },
    { word: "paaokilo", hint: "You name saved in my phone" },
  ];

  const shuffleWord = (word: string) => {
    if (word.length <= 1) return word;

    let shuffled = word;
    let attempts = 0;

    while (shuffled === word && attempts < 10) {
      const letters = word.split("");

      for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
      }

      shuffled = letters.join("");
      attempts++;
    }

    if (shuffled === word) {
      shuffled = word
        .split("")
        .reverse()
        .join("");
    }

    return shuffled;
  };


  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledWord, setScrambledWord] = useState(
    shuffleWord(words[0].word)
  );
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const correctWord = words[currentIndex].word;

    if (guess.toLowerCase().trim() === correctWord) {
      setError("");
      setAttempts(0);

      if (currentIndex === words.length - 1) {
        onComplete();
      } else {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setScrambledWord(shuffleWord(words[nextIndex].word));
        setGuess("");
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError("Not quite! Try again 💭");
    }
  };

  return (
    <div className="space-y-6 text-center">

      <h2 className="text-2xl font-bold text-purple-500">
        Word Scramble Challenge ✨
      </h2>

      <p className="text-muted-foreground">
        Word {currentIndex + 1} of {words.length}
      </p>

      <div className="text-3xl font-bold tracking-widest text-pink-500">
        {scrambledWord}
      </div>

      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Unscramble the word..."
          className="border rounded-md px-4 py-2 w-64 text-center"
        />

        <Button onClick={handleSubmit}>
          Submit
        </Button>

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {/* 🔥 Show Hint After 2 Wrong Attempts */}
        {attempts >= 2 && (
          <div className="bg-yellow-100 border border-yellow-300 p-3 rounded-md max-w-md mx-auto">
            <p className="text-sm text-yellow-700">
              💡 Hint: {words[currentIndex].hint}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}


// Level 4: Photo Puzzle (Changed from blur reveal to click-in-order puzzle)
function Level4PhotoPuzzle({
  playerName,
  onComplete,
}: {
  playerName: string;
  onComplete: () => void;
}) {
  const totalPieces = 9;
  const gridSize = 3;

  const revealOrder = [6, 2, 8, 1, 9, 3, 7, 4, 5];

  const [revealedCount, setRevealedCount] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const handleReveal = () => {
    if (revealedCount < totalPieces) {
      setRevealedCount((prev) => prev + 1);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/images/collage.jpeg";
    link.download = "our-special-memory.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setHasDownloaded(true);
  };

  useEffect(() => {
    if (revealedCount === totalPieces) {
      setTimeout(() => setIsZoomed(true), 600);
    }
  }, [revealedCount]);

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";

      const blockEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") e.preventDefault();
      };

      window.addEventListener("keydown", blockEscape);

      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", blockEscape);
      };
    }
  }, [isZoomed]);

  useEffect(() => {
    if (isZoomed && hasDownloaded) {
      setTimeout(() => {
        onComplete();
      }, 800);
    }
  }, [isZoomed, hasDownloaded, onComplete]);

  return (
    <div className="space-y-6 text-center relative">

      <h2 className="text-2xl font-bold text-pink-500">
        Special Memory Puzzle 💖
      </h2>

      {/* GRID */}
      {!isZoomed && (
        <>
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {Array.from({ length: totalPieces }).map((_, index) => {
              const pieceNumber = index + 1;

              const isVisible =
                revealOrder
                  .slice(0, revealedCount)
                  .includes(pieceNumber);

              const row = Math.floor(index / gridSize);
              const col = index % gridSize;

              return (
                <div
                  key={index}
                  className="aspect-square border rounded-lg overflow-hidden bg-pink-100 flex items-center justify-center"
                >
                  {isVisible ? (
                    <div
                      className="w-full h-full bg-cover"
                      style={{
                        backgroundImage: "url('/images/collage.jpeg')",
                        backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                        backgroundPosition: `${(col * 100) / (gridSize - 1)}% ${(row * 100) / (gridSize - 1)}%`,
                      }}
                    />
                  ) : (
                    <span className="text-xl font-bold text-pink-400">?</span>
                  )}
                </div>
              );
            })}
          </div>

          {revealedCount < totalPieces && (
            <Button onClick={handleReveal}>
              Reveal Next Piece ✨
            </Button>
          )}
        </>
      )}

      {/* FULLSCREEN ZOOM */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-6">
          <img
            src="/images/collage.jpeg"
            alt="Full Memory"
            className="max-w-full max-h-[80vh] rounded-xl shadow-2xl"
          />

          {!hasDownloaded ? (
            <>
              <p className="text-white mt-6 font-semibold">
                You must save this memory before continuing 💖
              </p>

              <Button
                className="mt-4"
                onClick={handleDownload}
              >
                Save This Memory 💾
              </Button>
            </>
          ) : (
            <p className="mt-6 text-green-400 font-semibold">
              Memory Saved ❤️
            </p>
          )}
        </div>
      )}
    </div>
  );
}


// Level 5: Relationship Quiz
function Level5Quiz({
  playerName,
  onComplete,
}: {
  playerName: string;
  onComplete: () => void;
}) {
  const questions = [
    {
      question: "When did you actually start liking me?",
      options: ["When i gave you assurance", "During our frequent meetups", "When I made you laugh", "Not sure yet 😉"],
      correctIndex: 0,
    },
    {
      question: "What snack always makes me think of you?",
      options: ["Chocolate", "Pizza", "Ice Cream", "Chips"],
      correctIndex: 1,
    },
    {
      question: "Which color do I secretly love seeing you wear?",
      options: ["Red", "Pink", "Black", "White"],
      correctIndex: 1,
    },
    {
      question: "What’s my favorite way to have from you before bed?",
      options: [
        "Good Night and I love you text",
        "Your cute photo",
        "Your voice on call",
        "All of the above",
      ],
      correctIndex: 3,
    },
    {
      question: "What do I treasure most in our moments together?",
      options: ["Laughs and Jokes", "Trust and Loyalty", "Gifts and Adventures", "Romance and Cuddles"],
      correctIndex: 1,
    },
  ];


  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1)
  );
  const [error, setError] = useState("");

  const handleSelect = (qIndex: number, optionIndex: number) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    // Ensure all answered
    if (answers.includes(-1)) {
      setError("Please answer all questions 💖");
      return;
    }

    // Check if all correct
    const allCorrect = questions.every(
      (q, index) => q.correctIndex === answers[index]
    );

    if (allCorrect) {
      onComplete();
    } else {
      setError("Oops! Not all answers are correct. Try again 💘");
      setAnswers(Array(questions.length).fill(-1));
    }
  };

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto">

      <h2 className="text-2xl font-bold text-center text-pink-500">
        Final Love Quiz 💞
      </h2>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="p-4 border rounded-lg bg-pink-50">
          <p className="font-semibold mb-3">
            {qIndex + 1}. {q.question}
          </p>

          <div className="space-y-2">
            {q.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                onClick={() => handleSelect(qIndex, optionIndex)}
                className={`w-full text-left px-3 py-2 rounded border transition 
                  ${answers[qIndex] === optionIndex
                    ? "bg-pink-300 border-pink-500"
                    : "bg-white hover:bg-pink-100"
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {error && (
        <p className="text-red-500 text-center font-medium">
          {error}
        </p>
      )}

      <div className="text-center">
        <Button onClick={handleSubmit}>
          Submit Answers 💌
        </Button>
      </div>
    </div>
  );
}

// Level 6: Final Gift Reveal
interface FinalRevealProps {
  onComplete: () => void;
}

const FinalReveal = ({ onComplete }: FinalRevealProps) => {
  const [stage, setStage] = useState<"proposal" | "confirm" | "final">("proposal");

  const [noCount, setNoCount] = useState(0);
  const [confirmNoCount, setConfirmNoCount] = useState(0);
  const [confirmYesCount, setConfirmYesCount] = useState(0);

  const handleNo = () => {
    if (stage === "proposal" && noCount < 4) {
      setNoCount(prev => prev + 1);
    }

    if (stage === "confirm" && confirmNoCount < 4) {
      setConfirmNoCount(prev => prev + 1);
    }
  };

  const handleYes = () => {
    if (stage === "proposal") {
      setStage("confirm");
      setNoCount(0);
      return;
    }

    if (stage === "confirm") {
      if (confirmYesCount < 4) {
        setConfirmYesCount(prev => prev + 1);
      } else {
        setStage("final");
      }
    }
  };

  const yesScale =
    stage === "proposal"
      ? 1 + noCount * 0.35
      : 1 + (confirmNoCount + confirmYesCount) * 0.25;

  const hideNo =
    (stage === "proposal" && noCount >= 4) ||
    (stage === "confirm" && confirmNoCount >= 4);

  const getYesText = () => {
    if (stage === "proposal") {
      return noCount >= 4
        ? "Yes is the only option 💘"
        : "Yes ❤️";
    }

    if (stage === "confirm") {
      return confirmYesCount >= 4
        ? "Yes is the only option 💘"
        : "Yes, I'm Sure ❤️";
    }

    return "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 text-center px-6">

      {stage !== "final" && (
        <div className="space-y-6">

          <h1 className="text-4xl font-bold text-pink-600">
            {stage === "proposal"
              ? "Will You Be My Valentine? 💖"
              : "Are You Absolutely Sure? 😌💘"}
          </h1>

          <div className="flex justify-center items-center gap-6">

            <Button
              onClick={handleYes}
              style={{
                transform: `scale(${yesScale})`,
                transition: "all 0.3s ease"
              }}
              className="bg-pink-500 text-white px-6 py-3 text-lg rounded-xl shadow-lg"
            >
              {getYesText()}
            </Button>

            {!hideNo && (
              <Button
                onClick={handleNo}
                className="bg-gray-300 text-gray-800 px-6 py-3 text-lg rounded-xl"
              >
                No
              </Button>
            )}

          </div>
        </div>
      )}

      {stage === "final" && (
        <div className="space-y-6 animate-fadeIn">

          <img
            src="/images/dudu-bubu.gif"
            alt="Celebration Hearts"
            className="mx-auto w-96 h-96 object-contain bg-transparent"
          />

          <h2 className="text-4xl font-bold text-pink-600">
            You just made me the happiest person alive ❤️
          </h2>

          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            From the moment we started talking, my world changed.
            Thank you for choosing me.
            I promise to always choose you too. 💖
          </p>

          <Button
            onClick={onComplete}
            className="mt-6 px-8 py-4 bg-pink-500 text-white text-lg rounded-xl shadow-lg"
          >
            Want Your Special Gift? 🎁💘
          </Button>

        </div>
      )}
    </div>
  );
};

// Main Game Component
export default function Home() {
  const DEV_MODE = false;
  const [playerName, setPlayerName] = useState('');
  const [playingLevel, setPlayingLevel] = useState<number | null>(null);
  const [showNameDialog, setShowNameDialog] = useState(true);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [completedLevel, setCompletedLevel] = useState(0);
  const [musicEnabled, setMusicEnabled] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const menuTimeRef = useRef(0);

  const menuMusic = "/music/menu.mp3";

  const levelMusic: Record<number, string> = {
    1: "/music/level1.mp3",
    2: "/music/level2.mp3",
    3: "/music/level3.mp3",
    4: "/music/level4.mp3",
    5: "/music/level5.mp3",
    6: "/music/level6.mp3",
  };

  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    levels: [
      { id: 1, title: 'Riddle Challenge', description: 'Solve a love riddle', completed: false, locked: false },
      { id: 2, title: 'Memory Match', description: 'Find matching pairs', completed: false, locked: !DEV_MODE },
      { id: 3, title: 'Word Scramble', description: 'Unscramble romantic words', completed: false, locked: !DEV_MODE },
      { id: 4, title: 'Love Puzzle', description: 'Solve the love puzzle', completed: false, locked: !DEV_MODE },
      { id: 5, title: 'Love Quiz', description: 'Test your love knowledge', completed: false, locked: !DEV_MODE },
      { id: 6, title: 'Final Gift', description: 'Open your special gift', completed: false, locked: !DEV_MODE },
    ],
    totalLevels: 6,
  });

  // 🎵 Music Switching Logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!musicEnabled) {
      audio.pause();
      return;
    }

    // If playing a level
    if (playingLevel) {
      const levelSrc = levelMusic[playingLevel];
      if (!levelSrc) return;

      // Save menu time before switching
      if (audio.src.includes("menu.mp3")) {
        menuTimeRef.current = audio.currentTime;
      }

      if (!audio.src.includes(levelSrc)) {
        audio.pause();
        audio.src = levelSrc;
        audio.load();
      }

      audio.loop = true;
      audio.play().catch(() => { });
    }

    // If in menu
    else {
      if (!audio.src.includes("menu.mp3")) {
        audio.pause();
        audio.src = menuMusic;
        audio.load();
        audio.currentTime = menuTimeRef.current;
      }

      audio.loop = true;
      audio.play().catch(() => { });
    }

  }, [playingLevel, musicEnabled]);

  const completeLevel = (levelId: number) => {
    setCompletedLevel(levelId);
    setShowCompletionMessage(true);

    const newLevels = gameState.levels.map(level =>
      level.id === levelId
        ? { ...level, completed: true }
        : level.id === levelId + 1
          ? { ...level, locked: false }
          : level
    );

    setGameState({
      ...gameState,
      levels: newLevels,
      currentLevel: levelId + 1,
    });
  };

  const renderLevel = () => {
    switch (playingLevel) {
      case 1:
        return <Level1Riddle playerName={playerName} onComplete={() => completeLevel(1)} />;
      case 2:
        return <Level2MemoryMatch playerName={playerName} onComplete={() => completeLevel(2)} />;
      case 3:
        return <Level3WordScramble playerName={playerName} onComplete={() => completeLevel(3)} />;
      case 4:
        return <Level4PhotoPuzzle playerName={playerName} onComplete={() => completeLevel(4)} />;
      case 5:
        return <Level5Quiz playerName={playerName} onComplete={() => completeLevel(5)} />;
      case 6:
        return <FinalReveal onComplete={() => completeLevel(6)} />;
      default:
        return null;
    }
  };

  const resetGame = () => {
    setPlayerName('');
    setShowNameDialog(true);
    setPlayingLevel(null);
    menuTimeRef.current = 0;

    setGameState({
      currentLevel: 1,
      levels: gameState.levels.map((level, index) => ({
        ...level,
        completed: false,
        locked: index !== 0,
      })),
      totalLevels: 6,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">

      {/* SINGLE AUDIO ELEMENT */}
      <audio ref={audioRef} src={menuMusic} preload="auto" />

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
        <div className="w-full max-w-4xl">

          {playingLevel ? (
            <div className="space-y-6">
              <Button variant="outline" onClick={() => setPlayingLevel(null)}>
                ← Back to Levels
              </Button>

              <Card className="border-2 shadow-lg">
                <CardContent className="p-8">
                  {renderLevel()}
                </CardContent>
              </Card>
            </div>
          ) : (
            <LevelSelect
              gameState={gameState}
              playerName={playerName}
              onLevelSelect={setPlayingLevel}
            />
          )}

        </div>
      </div>

      <footer className="py-4 px-8 border-t bg-background/80 backdrop-blur-sm mt-auto">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">

          <p className="text-sm text-muted-foreground">
            Valentine's Day Treasure Hunt
          </p>

          <div className="flex items-center gap-4">

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMusicEnabled(prev => {
                  const newValue = !prev;
                  const audio = audioRef.current;
                  if (!audio) return newValue;

                  if (!newValue) {
                    audio.pause();
                  } else {
                    audio.play().catch(() => { });
                  }

                  return newValue;
                });
              }}
            >
              {musicEnabled ? "Pause Music" : "Play Music"}
            </Button>

            {gameState.currentLevel > 1 && (
              <Button variant="outline" size="sm" onClick={resetGame}>
                Reset Game
              </Button>
            )}

          </div>
        </div>
      </footer>

      {/* 🔥 MUSIC STARTS HERE (User Interaction Trigger) */}
      <NameInputDialog
        isOpen={showNameDialog}
        onClose={() => {
          setShowNameDialog(false);

          const audio = audioRef.current;
          if (audio && musicEnabled) {
            audio.play().catch(() => { });
          }
        }}
        playerName={playerName}
        setPlayerName={setPlayerName}
      />

      <LevelCompletionMessage
        isOpen={showCompletionMessage}
        onClose={() => {
          setShowCompletionMessage(false);

          if (completedLevel === 6) {
            window.open(
              "https://drive.google.com/file/d/1YyoX0IcN6CYJ_m59bSj_lHjKDWN-w-NR/view?usp=sharing",
              "_blank"
            );
            return;
          }

          setPlayingLevel(null);
        }}
        message={romanticMessages[completedLevel as keyof typeof romanticMessages]}
        level={completedLevel}
        playerName={playerName}
      />

    </div>
  );
}

function LevelSelect({
  gameState,
  playerName,
  onLevelSelect,
}: {
  gameState: GameState;
  playerName: string;
  onLevelSelect: (levelId: number) => void;
}) {
  const progress =
    (gameState.levels.filter((l) => l.completed).length /
      gameState.totalLevels) *
    100;

  return (
    <div className="space-y-8">

      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-pink-600">
          Welcome, {playerName} 💖
        </h1>

        <p className="text-muted-foreground">
          Complete levels 1 by 1 and progress in your romantic adventure
        </p>

        <Progress value={progress} className="w-full max-w-md mx-auto mt-4" />
        <p className="text-sm text-muted-foreground">
          {gameState.levels.filter((l) => l.completed).length} /{" "}
          {gameState.totalLevels} Levels Completed
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {gameState.levels.map((level) => (
          <Card
            key={level.id}
            className={`transition-all duration-300 border-2 ${level.locked
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105 cursor-pointer"
              }`}
            onClick={() => {
              if (!level.locked) {
                onLevelSelect(level.id);
              }
            }}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{level.title}</CardTitle>

                {level.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : level.locked ? (
                  <Lock className="w-5 h-5 text-gray-400" />
                ) : (
                  <Badge variant="secondary">Unlocked</Badge>
                )}
              </div>

              <CardDescription>
                {level.description}
              </CardDescription>
            </CardHeader>

            {!level.locked && (
              <CardContent>
                <Button className="w-full">
                  {level.completed ? "Replay Level" : "Start Level"}
                </Button>
              </CardContent>
            )}
          </Card>
        ))}

      </div>
    </div>
  );
}
