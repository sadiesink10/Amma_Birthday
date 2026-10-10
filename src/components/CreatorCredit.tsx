import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface CreatorCreditProps {
  credit: string;
  subtitle: string;
}

export default function CreatorCredit({ credit, subtitle }: CreatorCreditProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="text-center py-8 sm:py-12 px-4"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0, y: 20 }
      }
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Gold divider */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
        <span className="text-burgundy text-sm" aria-hidden="true">
          ♥
        </span>
        <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
      </div>

      {/* Creator credit */}
      <p className="font-serif text-warm-brown text-base sm:text-lg italic leading-relaxed max-w-md mx-auto break-words">
        {credit}
      </p>

      {/* Subtitle */}
      <p className="font-handwritten text-burgundy/70 text-lg sm:text-xl mt-3">
        {subtitle}
      </p>

      {/* Bottom accent */}
      <div className="mt-5">
        <span className="text-gold/40 text-xs tracking-[0.3em]" aria-hidden="true">
          ✦ ✦ ✦
        </span>
      </div>
    </motion.div>
  );
}
