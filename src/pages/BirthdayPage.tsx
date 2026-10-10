import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BirthdayVideo from '../components/BirthdayVideo';
import CreatorCredit from '../components/CreatorCredit';
import FloatingHearts from '../components/FloatingHearts';
import Confetti from '../components/Confetti';
import { birthdayContent } from '../data/birthdayContent';

export default function BirthdayPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const wordVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.12,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        }),
      };

  const headingWords = birthdayContent.heading.split(' ');

  return (
    <main className="paper-texture min-h-screen bg-ivory">
      <Confetti count={50} />
      <FloatingHearts count={12} />

      {/* ===== ANIMATED HEADING SECTION ===== */}
      <section
        className="relative min-h-[60dvh] sm:min-h-[70dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16"
        aria-label="Birthday greeting"
      >
        {/* Sparkle accents */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="sparkle-dot"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${i * 0.4}s`,
                  background: i % 2 === 0 ? '#D5B77A' : '#D9A3A9',
                }}
              />
            ))}
          </div>
        )}

        {/* HAPPY BIRTHDAY - word by word */}
        <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 mb-2 sm:mb-4">
          {headingWords.map((word, i) => (
            <motion.span
              key={`hw-${i}`}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-burgundy"
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* AMMA ❤️ */}
        <motion.h1
          className="font-handwritten text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-burgundy mb-4 sm:mb-6"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {birthdayContent.subheading}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-sans text-warm-brown/80 text-base sm:text-lg md:text-xl"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {birthdayContent.tagline}
        </motion.p>

        {/* Gold divider */}
        <motion.div
          className="mt-6 sm:mt-8 section-divider"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        />
      </section>

      {/* ===== BIRTHDAY MESSAGE ===== */}
      <section
        className="py-12 sm:py-16 px-4 sm:px-6 text-center"
        aria-label="Birthday message"
      >
        <motion.div
          className="max-w-2xl mx-auto"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
        >
          {birthdayContent.messages.map((msg, i) => (
            <p
              key={i}
              className="font-serif text-xl sm:text-2xl md:text-3xl text-warm-brown leading-relaxed mb-4 sm:mb-6"
            >
              {msg}
            </p>
          ))}

          <p className="font-handwritten text-xl sm:text-2xl text-burgundy mt-6 sm:mt-8">
            {birthdayContent.signoff}
          </p>

          <div className="mt-6 flex justify-center gap-2 text-rose/50 text-sm" aria-hidden="true">
            ♥ ♥ ♥
          </div>
        </motion.div>
      </section>

      {/* ===== VIDEO SECTION ===== */}
      <section
        className="py-12 sm:py-16 md:py-20"
        aria-label="Birthday video"
      >
        <motion.h2
          className="text-center font-handwritten text-xl sm:text-2xl text-warm-brown/70 mb-6 sm:mb-8 px-4"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Press play for our message to you ♥
        </motion.h2>

        <BirthdayVideo src={birthdayContent.videoPath} driveUrl={birthdayContent.googleDriveUrl} />
      </section>

      {/* ===== CREATOR CREDIT — directly below video ===== */}
      <CreatorCredit
        credit={birthdayContent.creatorCredit}
        subtitle={birthdayContent.creatorSubtitle}
      />

      {/* ===== FINAL CLOSING MESSAGE ===== */}
      <section
        className="relative py-16 sm:py-24 px-4 sm:px-6 text-center"
        aria-label="Closing message"
      >
        <FloatingHearts count={5} contained />

        <motion.div
          className="max-w-xl mx-auto"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8 }}
        >
          {birthdayContent.closing.map((line, i) => (
            <p
              key={i}
              className={`${
                i === 0
                  ? 'font-serif text-xl sm:text-2xl text-warm-brown mb-4 sm:mb-6'
                  : 'font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-burgundy'
              } leading-relaxed`}
            >
              {line}
            </p>
          ))}

          {/* Animated heart */}
          {!shouldReduceMotion ? (
            <motion.div
              className="mt-6 sm:mt-8 text-burgundy text-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              ♥
            </motion.div>
          ) : (
            <div className="mt-6 sm:mt-8 text-burgundy text-2xl" aria-hidden="true">
              ♥
            </div>
          )}

          {/* Back button */}
          <motion.button
            onClick={() => navigate('/')}
            className="mt-10 sm:mt-14 inline-flex items-center gap-2 bg-transparent border-2 border-burgundy/30 text-burgundy px-6 sm:px-8 py-3 sm:py-4 rounded-full font-serif text-base sm:text-lg hover:bg-burgundy hover:text-cream transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2 focus:ring-offset-ivory cursor-pointer min-h-[48px]"
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            aria-label="Back to our memories"
          >
            <ArrowLeft size={18} />
            Back to Our Memories
          </motion.button>
        </motion.div>

        {/* Final decorative footer */}
        <div className="mt-12 sm:mt-16 text-gold/30 text-xs tracking-[0.4em]" aria-hidden="true">
          MADE WITH ♥
        </div>
      </section>
    </main>
  );
}
