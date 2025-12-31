import React from 'react';
import { motion } from 'framer-motion';

interface LogicQueueProps {
  visualData: {
    total: number;
    targetIndex: number;
    direction: 'left' | 'right' | 'front' | 'back';
    myRole?: string;
    hideMode?: 'mask_front' | 'show_all' | 'mask_back';
  };
}

export const LogicQueue: React.FC<LogicQueueProps> = ({ visualData }) => {
  const { total, targetIndex, hideMode, myRole = 'Me' } = visualData;
  const backCount = total - 1 - targetIndex; // Number of people behind Me

  // 简单的剪影小人 SVG
  const PersonIcon = ({ isTarget, isHidden }: { isTarget: boolean, isHidden?: boolean }) => (
    <svg viewBox="0 0 24 24" className={`w-10 h-14 md:w-12 md:h-16 transition-all duration-300 ${isTarget ? 'text-danger-red scale-110 drop-shadow-[0_0_8px_rgba(216,19,38,0.8)]' : 'text-gray-400'} ${isHidden ? 'opacity-20 blur-sm' : ''}`}>
      <path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 10c-4.42 0-8 2.69-8 6v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2c0-3.31-3.58-6-8-6z" fill="currentColor" />
    </svg>
  );

  // 渲染一群人或一个代表群体的盒子
  const RenderGroup = ({ count }: { count: number }) => {
    // 阈值：超过5人显示为群体盒子
    if (count > 5) {
      return (
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center h-16 w-16 px-1 bg-neutral-800/80 border border-gray-600 rounded mx-1 relative"
        >
             <span className="text-[10px] text-gray-500 mb-0.5 tracking-tighter">GROUP</span>
             <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-black text-white">{count}</span>
                <span className="text-[10px] text-gray-400">人</span>
             </div>
             {/* Visual hint of stack */}
             <div className="absolute -right-1 top-2 bottom-2 w-1 bg-gray-700 rounded-r" />
        </motion.div>
      );
    }

    // 否则渲染具体的小人
    return (
      <div className="flex items-end -space-x-2">
        {[...Array(count)].map((_, i) => (
            <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="opacity-50"
            >
                <PersonIcon isTarget={false} />
            </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full py-6 md:py-8 flex flex-col items-center bg-gradient-to-b from-black/60 to-neutral-900/80 rounded-xl border-2 border-dashed border-gray-700 relative overflow-hidden shadow-inner">
      {/* 背景网格 */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.3)_25%,rgba(255,255,255,.3)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.3)_75%,rgba(255,255,255,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.3)_25%,rgba(255,255,255,.3)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.3)_75%,rgba(255,255,255,.3)_76%,transparent_77%,transparent)] bg-[length:30px_30px]" />

      {/* 方向指示标 */}
      <div className="w-full flex justify-between px-6 mb-4 text-xs font-bold text-gray-500 uppercase tracking-[0.2em] z-10">
        <span className="flex items-center gap-1">← BACK (后)</span>
        <span className="flex items-center gap-1">FRONT (前) →</span>
      </div>
      
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent absolute top-14 left-0 right-0 z-0" />

      {/* 队伍渲染 */}
      <div className="flex gap-2 md:gap-3 z-10 items-end mt-2 justify-center w-full px-2">
        {hideMode === 'mask_front' ? (
          // 模式 A: 遮挡前排 (Ask Total, 已知前面排名)
          <div className="flex items-end gap-4">
             {/* 后排 Shadows */}
             <RenderGroup count={backCount} />

             {/* 主角 Me */}
             <motion.div 
               initial={{ scale: 0 }} animate={{ scale: 1 }}
               className="flex flex-col items-center relative z-20"
             >
                <div className="absolute -top-7 text-[10px] font-black text-danger-red bg-black px-1.5 py-0.5 border border-danger-red rounded skew-x-[-10deg] whitespace-nowrap">
                   {myRole}
                </div>
                <div className="absolute inset-0 bg-danger-red/20 blur-xl rounded-full" />
                <PersonIcon isTarget={true} />
             </motion.div>

             {/* 前面的迷雾 (Front) */}
             <div className="flex flex-col items-center justify-center h-16 w-24 bg-black/40 border border-gray-800 rounded mx-2 relative">
                <span className="text-2xl font-black text-gray-600">? ? ?</span>
                <span className="text-[10px] text-gray-500 absolute -bottom-4">FRONT</span>
             </div>
          </div>

        ) : hideMode === 'mask_back' ? (
          // 模式 B: 遮挡后排 (Ask Position from Back, 已知前排位置)
          <div className="flex items-end gap-4">
             {/* 后面的迷雾 (Back) */}
             <div className="flex flex-col items-center justify-center h-16 w-24 bg-black/40 border border-gray-800 rounded mx-2 relative">
                <span className="text-2xl font-black text-gray-600">? ? ?</span>
                <span className="text-[10px] text-gray-500 absolute -bottom-4">BACK</span>
             </div>

             {/* 主角 Me */}
             <motion.div 
               initial={{ scale: 0 }} animate={{ scale: 1 }}
               className="flex flex-col items-center relative z-20"
             >
                <div className="absolute -top-7 text-[10px] font-black text-danger-red bg-black px-1.5 py-0.5 border border-danger-red rounded skew-x-[-10deg] whitespace-nowrap">
                   {myRole}
                </div>
                <div className="absolute inset-0 bg-danger-red/20 blur-xl rounded-full" />
                <PersonIcon isTarget={true} />
             </motion.div>

             {/* 前排 Shadows */}
             <RenderGroup count={targetIndex} />
          </div>

        ) : (
          // 模式 C: 全显示 (Show All) - Fallback
          // 如果总数太大，也应该使用Group逻辑
          <div className="flex items-end gap-2">
              <RenderGroup count={total} /> 
              {/* 注意：全显示模式下的 Group 逻辑可能需要调整，这里暂时只处理 mask 模式下的逻辑更安全。
                  原来的逻辑是画出所有人。如果 total > 5，原来的代码会画很多人。
                  为了安全起见，这里保持原来的逻辑，或者也引入 RenderGroup 但这会丢失 targetIndex 的高亮。
                  鉴于 hideMode=show_all 目前应该很少用到（除非以后有 Show All 题型），暂时保留原样。
              */}
              {[...Array(total)].map((_, i) => {
                const isTarget = i === targetIndex;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center relative group"
                  >
                    {isTarget && (
                      <motion.div className="absolute -top-6 text-[10px] font-black text-danger-red bg-black px-1.5 py-0.5 border border-danger-red rounded skew-x-[-10deg]">
                        {myRole}
                      </motion.div>
                    )}
                    <div className={`absolute bottom-1 w-8 h-1.5 rounded-[100%] transition-colors duration-300 ${isTarget ? 'bg-danger-red blur-[2px]' : 'bg-black/50'}`} />
                    <PersonIcon isTarget={isTarget} />
                    <div className={`mt-2 text-xs font-mono font-bold ${isTarget ? 'text-white' : 'text-gray-600'}`}>
                      {i + 1}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        )}
      </div>
      
      {/* 提示文案 */}
      {(hideMode === 'mask_front' || hideMode === 'mask_back') && (
        <div className="mt-6 text-xs text-gray-400 bg-black/50 px-3 py-1 rounded-full border border-gray-800">
           视觉传感器受干扰... 请使用逻辑推演
        </div>
      )}
    </div>
  );
};
