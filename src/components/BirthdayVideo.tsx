import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

interface BirthdayVideoProps {
  src: string;
  driveUrl?: string;
}

export default function BirthdayVideo({ src, driveUrl }: BirthdayVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();
  const [videoError, setVideoError] = useState(false);

  // Extract Google Drive ID if available
  const driveIdMatch = driveUrl?.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const driveId = driveIdMatch ? driveIdMatch[1] : null;
  const embedUrl = driveId ? `https://drive.google.com/file/d/${driveId}/preview` : null;

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-3xl mx-auto px-4 sm:px-6"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0, y: 40 }
      }
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="video-container bg-black/90">
        {!videoError ? (
          <video
            controls
            preload="metadata"
            playsInline
            className="w-full aspect-video"
            aria-label="Birthday video message from your children"
            onError={() => setVideoError(true)}
          >
            <source src={src} type="video/mp4" />
            {embedUrl && (
              <iframe
                src={embedUrl}
                className="w-full aspect-video border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Birthday Video Message"
              />
            )}
          </video>
        ) : embedUrl ? (
          <div className="relative aspect-video w-full">
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Birthday Video Message"
            />
          </div>
        ) : (
          <div className="p-8 text-center text-cream">
            <p className="mb-4">Unable to load video locally.</p>
            {driveUrl && (
              <a
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-burgundy text-cream px-6 py-3 rounded-full font-serif hover:bg-burgundy-dark transition-colors"
              >
                <Play size={16} /> Watch on Google Drive <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}
      </div>

      {driveUrl && (
        <div className="mt-3 text-center">
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-burgundy/80 hover:text-burgundy hover:underline font-sans transition-colors"
          >
            <ExternalLink size={14} /> Having trouble playing? Watch directly on Google Drive
          </a>
        </div>
      )}
    </motion.div>
  );
}
