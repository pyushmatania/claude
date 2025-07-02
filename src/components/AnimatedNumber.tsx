import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  format?: (val: number) => string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className, format }) => {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 20 });
  const display = useTransform(spring, latest => {
    const v = Math.round(latest);
    return format ? format(v) : v.toLocaleString();
  });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span className={className}>{display}</motion.span>;
};

export default AnimatedNumber;
