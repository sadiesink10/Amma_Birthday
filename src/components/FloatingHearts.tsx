import { useEffect, useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingHeartsProps {
  count?: number;
  contained?: boolean;
}

export default function FloatingHearts({
  count = 8,
  contained = false,
}: FloatingHeartsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hearts, setHearts] = useState<Heart[]>([]);

  const memoizedHearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 10 + Math.random() * 14,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 4,
      opacity: 0.08 + Math.random() * 0.15,
    }));
  }, [count]);

  useEffect(() => {
    setHearts(memoizedHearts);
  }, [memoizedHearts]);

  if (shouldReduceMotion) {
    return (
      <div
        className={`${contained ? 'absolute' : 'fixed'} inset-0 pointer-events-none overflow-hidden`}
        aria-hidden="true"
      >
        {hearts.slice(0, 3).map((heart) => (
          <span
            key={heart.id}
            className="absolute text-burgundy"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              fontSize: heart.size,
              opacity: heart.opacity,
            }}
          >
            ♥
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${contained ? 'absolute' : 'fixed'} inset-0 pointer-events-none overflow-hidden`}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute text-burgundy"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: heart.size,
          }}
          animate={{
            y: [-10, -30, -10],
            x: [-5, 5, -5],
            opacity: [heart.opacity, heart.opacity * 1.5, heart.opacity],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
