import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import Polaroid from './Polaroid';
import type { Memory } from '../data/memories';

interface MemorySectionProps {
  memory: Memory;
  index: number;
}

export default function MemorySection({ memory, index }: MemorySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2, delayChildren: 0.1 },
        },
      };

  const photoVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: isEven ? -60 : 60, rotate: memory.rotation * 2 },
        visible: {
          opacity: 1,
          x: 0,
          rotate: memory.rotation,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const textVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section
      ref={ref}
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6"
      aria-label={`Memory ${memory.id}: ${memory.caption}`}
    >
      {/* Subtle scrapbook decoration */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <motion.div
        className={`max-w-5xl mx-auto flex flex-col ${
          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        } items-center gap-8 md:gap-12 lg:gap-16`}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Polaroid photo */}
        <motion.div
          className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] flex-shrink-0"
          variants={photoVariants}
        >
          <div className="relative">
            {/* Tape decoration */}
            <div
              className="tape-strip tape-strip-top"
              style={{ transform: `translateX(-50%) rotate(${isEven ? -2 : 3}deg)` }}
            />
            <Polaroid
              src={memory.image}
              alt={memory.caption}
              rotation={memory.rotation}
            />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          variants={textVariants}
        >
          {/* Memory number */}
          <span className="inline-block font-handwritten text-gold text-lg sm:text-xl mb-2">
            Memory {memory.id}
          </span>

          {/* Caption */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-burgundy mb-4 sm:mb-6 leading-tight">
            {memory.caption}
          </h2>

          {/* Decorative divider */}
          <div
            className={`w-12 h-0.5 bg-gradient-to-r from-gold to-rose mb-4 sm:mb-6 ${
              isEven ? 'md:mx-0' : 'md:ml-auto md:mr-0'
            } mx-auto`}
          />

          {/* Message */}
          <p className="font-sans text-warm-brown text-base sm:text-lg leading-relaxed sm:leading-loose max-w-prose">
            {memory.message}
          </p>

          {/* Small heart accent */}
          <span
            className="inline-block mt-4 text-burgundy/40 text-sm"
            aria-hidden="true"
          >
            ♥
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom sparkle dots */}
      {!shouldReduceMotion && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3" aria-hidden="true">
          <span className="sparkle-dot" style={{ animationDelay: '0s' }} />
          <span className="sparkle-dot" style={{ animationDelay: '0.5s' }} />
          <span className="sparkle-dot" style={{ animationDelay: '1s' }} />
        </div>
      )}
    </section>
  );
}
