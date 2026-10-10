import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  width: number;
  height: number;
}

const COLORS = ['#781D35', '#D9A3A9', '#D5B77A', '#725B50', '#E8D4A8', '#FAF7F0'];

export default function Confetti({ count = 40 }: { count?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      width: 6 + Math.random() * 6,
      height: 8 + Math.random() * 10,
    }));

    setPieces(generated);

    const timer = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(timer);
  }, [count, shouldReduceMotion]);

  if (shouldReduceMotion || !show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            width: piece.width,
            height: piece.height,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}
