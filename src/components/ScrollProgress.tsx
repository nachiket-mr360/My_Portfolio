import { motion } from 'framer-motion';

interface ScrollProgressProps {
  progress: number;
}

function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 origin-left z-50"
      style={{ scaleX: progress / 100 }}
      initial={{ scaleX: 0 }}
    />
  );
}

export default ScrollProgress;
