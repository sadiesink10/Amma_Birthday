import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Polaroid from '../components/Polaroid';
import FloatingHearts from '../components/FloatingHearts';
import MemorySection from '../components/MemorySection';
import AnimatedHeading from '../components/AnimatedHeading';
import { memories } from '../data/memories';

export default function MemoriesPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="paper-texture min-h-screen bg-ivory">
      <FloatingHearts count={10} />

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16"
        aria-label="Opening"
      >
        {/* Introductory text */}
        <AnimatedHeading
          as="p"
          delay={0.2}
          className="font-sans text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] text-warm-brown/70 uppercase mb-4 sm:mb-6"
        >
          A Little Something Made with Love
        </AnimatedHeading>

        {/* Main heading */}
        <AnimatedHeading
          as="h1"
          delay={0.5}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-burgundy mb-3 sm:mb-4 text-center"
        >
          For You, Amma
        </AnimatedHeading>

        {/* Supporting text */}
        <AnimatedHeading
          as="p"
          delay={0.8}
          className="font-handwritten text-lg sm:text-xl md:text-2xl text-warm-brown/80 mb-8 sm:mb-12 text-center max-w-md"
        >
          Some of my favorite memories begin and end with you.
        </AnimatedHeading>

        {/* Hero Polaroid */}
        <motion.div
          className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] mb-10 sm:mb-14"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Polaroid
            src="/images/pic1.jpeg"
            alt="A cherished memory with Amma"
            rotation={-2}
            eager
          />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="flex flex-col items-center gap-2 text-warm-brown/50"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="font-handwritten text-sm sm:text-base">
            Scroll through our memories
          </span>
          {!shouldReduceMotion && (
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={20} />
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ===== MEMORY SECTIONS ===== */}
      <div className="relative z-10">
        {memories.map((memory, index) => (
          <MemorySection key={memory.id} memory={memory} index={index} />
        ))}
      </div>

      {/* ===== CLOSING + SURPRISE BUTTON ===== */}
      <section
        className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 text-center"
        aria-label="Birthday surprise"
      >
        <FloatingHearts count={6} contained />

        <motion.div
          className="max-w-2xl mx-auto"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative stars */}
          <div className="flex justify-center gap-2 mb-6 text-gold/50 text-xs tracking-[0.4em]" aria-hidden="true">
            ✦ ✦ ✦
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy mb-6 sm:mb-8 leading-tight">
            So Maa, Happy Happy Happy Birthday!
          </h2>

          {/* Message */}
          <p className="font-sans text-warm-brown text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-12 max-w-lg mx-auto">
            So Maa, Happy Happy Happy birthday. So wait, wait, there is more! Click the button below. I have a special surprise.
          </p>

          {/* Surprise button */}
          <motion.button
            onClick={() => navigate('/birthday')}
            className="heart-pulse-btn inline-flex items-center gap-2 bg-burgundy text-cream px-8 sm:px-10 py-4 sm:py-5 rounded-full font-serif text-lg sm:text-xl font-semibold shadow-lg hover:bg-burgundy-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2 focus:ring-offset-ivory cursor-pointer min-h-[48px]"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            animate={
              shouldReduceMotion
                ? {}
                : { scale: [1, 1.02, 1] }
            }
            transition={
              shouldReduceMotion
                ? {}
                : {
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }
            }
            aria-label="Go to the birthday surprise page"
          >
            One Last Surprise, Amma ❤️
          </motion.button>

          {/* Bottom hearts */}
          <div className="mt-8 sm:mt-12 flex justify-center gap-3 text-rose/40" aria-hidden="true">
            <span className="text-sm">♥</span>
            <span className="text-lg">♥</span>
            <span className="text-sm">♥</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
