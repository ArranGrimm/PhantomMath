import React from 'react';
import { motion } from 'framer-motion';

interface LogicQueueProps {
  visualData: {
    total: number;
    targetIndex: number;
    direction: 'left' | 'right' | 'front' | 'back';
    myRole?: string;
  };
}

export const LogicQueue: React.FC<LogicQueueProps> = ({ visualData }) => {
  const { total, targetIndex, direction } = visualData;

  // 简单的剪影小人 SVG
  const PersonIcon = ({ isTarget }: { isTarget: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-12 h-16 transition-all duration-300 ${isTarget ? 'text-danger-red scale-110 drop-shadow-[0_0_8px_rgba(216,19,38,0.8)]' : 'text-gray-400'}`}>
      <path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 10c-4.42 0-8 2.69-8 6v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2c0-3.31-3.58-6-8-6z" fill="currentColor" />
    </svg>
  );

  return (
    <div className="w-full py-8 flex flex-col items-center bg-gradient-to-b from-black/60 to-neutral-900/80 rounded-xl border-2 border-dashed border-gray-700 relative overflow-hidden shadow-inner">
      {/* 背景网格 */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.3)_25%,rgba(255,255,255,.3)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.3)_75%,rgba(255,255,255,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.3)_25%,rgba(255,255,255,.3)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.3)_75%,rgba(255,255,255,.3)_76%,transparent_77%,transparent)] bg-[length:30px_30px]" />

      {/* 方向指示标 */}
      <div className="w-full flex justify-between px-6 mb-4 text-xs font-bold text-gray-500 uppercase tracking-[0.2em] z-10">
        <span className="flex items-center gap-1">← BACK (后)</span>
        <span className="flex items-center gap-1">FRONT (前) →</span>
      </div>
      
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent absolute top-14 left-0 right-0 z-0" />

      {/* 队伍渲染 */}
      <div className="flex gap-3 z-10 items-end mt-2">
        {[...Array(total)].map((_, i) => {
          const isTarget = i === targetIndex;
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: i * 0.1 
              }}
              className="flex flex-col items-center relative group"
            >
              {/* 如果是目标，显示标识 */}
              {isTarget && (
                <motion.div 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: -5, opacity: 1 }}
                  className="absolute -top-6 text-[10px] font-black text-danger-red bg-black px-1.5 py-0.5 border border-danger-red rounded skew-x-[-10deg]"
                >
                  JOKER
                </motion.div>
              )}
              
              {/* 脚下光圈 (Selection Ring) */}
              <div className={`absolute bottom-1 w-8 h-1.5 rounded-[100%] transition-colors duration-300 ${isTarget ? 'bg-danger-red blur-[2px]' : 'bg-black/50'}`} />
              
              <PersonIcon isTarget={isTarget} />
              
              {/* 序号 (辅助线索) */}
              <div className={`mt-2 text-xs font-mono font-bold ${isTarget ? 'text-white' : 'text-gray-600'}`}>
                {i + 1}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

