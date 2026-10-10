import { motion, useReducedMotion } from 'framer-motion';

interface PolaroidProps {
  src: string;
  alt: string;
  rotation?: number;
  className?: string;
  eager?: boolean;
}

export default function Polaroid({
  src,
  alt,
  rotation = 0,
  className = '',
  eager = false,
}: PolaroidProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`polaroid-frame inline-block ${className}`}
      style={{ rotate: shouldReduceMotion ? 0 : rotation }}
      whileHover={
        shouldReduceMotion
          ? {}
          : { scale: 1.02, rotate: 0, transition: { duration: 0.3 } }
      }
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.background = '#F0E6D6';
          target.alt = 'Photo loading...';
        }}
      />
    </motion.div>
  );
}
