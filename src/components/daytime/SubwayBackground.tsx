import React from 'react';
import { motion } from 'framer-motion';

export const SubwayBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* 
        1. 核心背景：循环视频素材
        object-cover 确保视频填满屏幕且不变形
        brightness-75 稍微压暗一点视频，防止抢了前景 UI 的戏
      */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-75"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/videos/subway-view-loop.mp4" type="video/mp4" />
      </video>

      {/* 
        2. 近景：动态光影与设施
        即使有了视频，保留这层光影可以让画面更有层次感，
        而且能掩盖视频循环时的那一瞬间跳动。
      */}
      <motion.div 
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* 快速掠过的电线杆/隧道支架 (作为视频的前景遮挡) */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-48 bg-black/80 skew-x-12 blur-md"
            initial={{ left: '120%' }}
            animate={{ left: '-40%' }}
            transition={{ 
              duration: 0.8, // 比之前更快一点，增加速度感
              repeat: Infinity, 
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* 扫过车厢的外部灯光 (模拟路灯) */}
        <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent skew-x-12 pointer-events-none mix-blend-overlay"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* 
        3. 车厢内饰层 (前景)
      */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* 顶部结构 */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-[#1a1a1a] shadow-2xl border-b border-gray-800 z-30">
          {/* 吊环扶手 - 随机摆动 */}
          <div className="flex justify-around px-8 h-full items-end overflow-visible">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-32 bg-gray-400/50 origin-top flex flex-col items-center"
                animate={{ rotate: [Math.random() * 5, Math.random() * -5, Math.random() * 5] }}
                transition={{ 
                  duration: 2 + Math.random(), 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatType: "mirror"
                }}
              >
                {/* 吊环本身 */}
                <div className="w-12 h-12 rounded-full border-4 border-gray-400 mt-auto" />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* 底部座位区域 */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-[#1a1a1a] border-t-4 border-danger-red shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
           {/* 座位纹理 */}
           <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,#222_40px,#222_42px)] opacity-30" />
           {/* 座位高光 */}
           <div className="absolute top-0 left-0 right-0 h-2 bg-white/5" />
        </div>

        {/* 全局噪点滤镜 (Film Grain) - 增加质感 */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30 pointer-events-none mix-blend-overlay" />
      </div>

    </div>
  );
};

