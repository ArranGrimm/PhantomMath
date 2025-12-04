import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { JaggedButton } from '../components/ui/JaggedButton';

interface SplashProps {
  onStart: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onStart }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleStart = () => {
    setIsExiting(true);
    // 延迟一点时间真正切换视图，让破碎动画播放完
    setTimeout(onStart, 800);
  };

  // 定义破碎切片的动画参数
  // 我们将屏幕分为 4 个不规则的切片，模拟破碎飞出
  const shatterVariants: Variants = {
    initial: { x: 0, y: 0, opacity: 1 },
    exit: (custom: number) => {
      const directions = [
        { x: '-100%', y: '-100%', rotate: -15 }, // 左上
        { x: '100%', y: '-100%', rotate: 15 },   // 右上
        { x: '-100%', y: '100%', rotate: 15 },   // 左下
        { x: '100%', y: '100%', rotate: -15 },   // 右下
      ];
      
      const dir = directions[custom] || { x: 0, y: 0, rotate: 0 };

      return {
        x: dir.x,
        y: dir.y,
        rotate: dir.rotate,
        opacity: 0,
        transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
      };
    }
  };


  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep-black overflow-hidden"
          exit={{ opacity: 0 }}
        >
           {/* 背景纹理层 */}
           <div className="absolute inset-0 bg-danger-red opacity-10 pointer-events-none bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.3)_50%,transparent_75%,transparent_100%)] bg-[size:20px_20px]" />

          {/* 核心内容容器 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo 区域 */}
            <div className="relative mb-16">
              <motion.h1 
                className="text-6xl md:text-8xl font-black text-danger-red tracking-tighter mix-blend-difference select-none"
                animate={{ 
                  skewX: [0, -5, 0, 5, 0],
                  x: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 0.2, 
                  repeat: Infinity, 
                  repeatDelay: 3 
                }}
              >
                PHANTOM
                <br />
                <span className="text-rough-white ml-[1em]">MATH</span>
              </motion.h1>
              
              {/* 装饰性文字 */}
              <div className="absolute -right-4 -top-8 text-star-yellow font-bold text-sm rotate-12 border border-star-yellow px-2 py-1">
                Ver 1.0
              </div>
            </div>

            {/* 启动按钮 */}
            <JaggedButton onClick={handleStart}>
              TAKE YOUR HEART
            </JaggedButton>
          </motion.div>

          {/* 版权/底部信息 */}
          <div className="absolute bottom-8 text-xs text-rough-white/40 tracking-widest">
            © 2025 PHANTOM THIEVES OF HEARTS
          </div>

        </motion.div>
      ) : (
        /* 破碎动画层 - 这一层只在 isExiting 为 true 时短暂存在 */
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* 左上切片 */}
          <motion.div 
            custom={0}
            variants={shatterVariants}
            initial="initial"
            animate="exit"
            className="absolute top-0 left-0 w-1/2 h-1/2 bg-deep-black origin-bottom-right"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)' }}
          />
          {/* 右上切片 */}
          <motion.div 
            custom={1}
            variants={shatterVariants}
            initial="initial"
            animate="exit"
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-deep-black origin-bottom-left"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}
          />
          {/* 左下切片 */}
          <motion.div 
            custom={2}
            variants={shatterVariants}
            initial="initial"
            animate="exit"
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-deep-black origin-top-right"
            style={{ clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 100%)' }}
          />
          {/* 右下切片 */}
          <motion.div 
            custom={3}
            variants={shatterVariants}
            initial="initial"
            animate="exit"
            className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-deep-black origin-top-left"
            style={{ clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 0 100%)' }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

