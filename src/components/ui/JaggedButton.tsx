import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 工具函数：合并 Tailwind 类名
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface JaggedButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const JaggedButton: React.FC<JaggedButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary',
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, skewX: -15 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        // 基础样式
        "relative px-8 py-3 font-black text-xl tracking-wider uppercase transition-colors duration-200",
        // 形状变换
        "transform -skew-x-12 clip-trapezoid",
        // 变体样式
        variant === 'primary' && "bg-danger-red text-deep-black hover:bg-rough-white hover:text-danger-red",
        variant === 'secondary' && "bg-deep-black text-rough-white border-2 border-rough-white hover:bg-danger-red hover:border-danger-red",
        className
      )}
      {...props}
    >
      <span className="block transform skew-x-12">
        {children}
      </span>
    </motion.button>
  );
};

