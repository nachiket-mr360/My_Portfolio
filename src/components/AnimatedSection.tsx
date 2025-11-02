import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

type Props = PropsWithChildren<{
  className?: string;
  id?: string;
}>;

const AnimatedSection = ({ children, className = '', id }: Props) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      /* animate every time the section enters the viewport */
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
