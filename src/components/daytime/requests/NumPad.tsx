import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface NumPadProps {
  onInput: (value: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  className?: string;
}

export const NumPad: React.FC<NumPadProps> = ({ onInput, onDelete, onSubmit, className }) => {
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={clsx(
      // 容器样式：限制最大宽度和高度，居中显示
      "w-full max-w-md mx-auto bg-black/90 p-2 pb-6 md:pb-2",
      // 边框装饰
      "border-t-4 border-danger-red md:rounded-t-xl md:border-x-4 md:border-b-4 md:mb-4", 
      "grid grid-cols-4 gap-2", 
      className
    )}>
      {/* 数字键 1-9 */}
      <div className="col-span-3 grid grid-cols-3 gap-2">
        {keys.map((num) => (
          <motion.button
            key={num}
            whileTap={{ scale: 0.9 }}
            onClick={() => onInput(num.toString())}
            className="h-14 md:h-16 bg-[#2a2a2a] text-2xl md:text-3xl font-black text-rough-white 
                       border-b-4 border-black hover:bg-danger-red hover:text-black 
                       active:bg-danger-red active:border-t-2 active:border-b-0
                       transition-colors rounded-sm skew-x-[-5deg]"
          >
            {num}
          </motion.button>
        ))}
        
        {/* 底部功能键行 */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onDelete}
          className="h-14 md:h-16 bg-[#331111] text-lg md:text-xl font-bold text-danger-red 
                     border-b-4 border-black hover:bg-danger-red hover:text-white 
                     transition-colors rounded-sm skew-x-[-5deg]"
        >
          DEL
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onInput('0')}
          className="h-14 md:h-16 bg-[#2a2a2a] text-2xl md:text-3xl font-black text-rough-white 
                     border-b-4 border-black hover:bg-danger-red hover:text-black 
                     transition-colors rounded-sm skew-x-[-5deg]"
        >
          0
        </motion.button>
        
        <div className="h-14 md:h-16 bg-transparent" /> {/* 占位符 */}
      </div>

      {/* 右侧确认键 (竖长条) */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onSubmit}
        className="col-span-1 h-full min-h-[180px] bg-danger-red text-black font-black text-xl md:text-2xl tracking-widest 
                   clip-jagged flex items-center justify-center
                   hover:bg-white transition-colors"
        style={{ writingMode: 'vertical-rl' }}
      >
        SEND
      </motion.button>
    </div>
  );
};

