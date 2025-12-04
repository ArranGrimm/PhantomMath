import React from 'react';
import { SubwayBackground } from '../components/daytime/SubwayBackground';
import { PhoneMenu } from '../components/daytime/PhoneMenu';
import { motion } from 'framer-motion';

export const DaytimeHub: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 1. 动态背景 (地铁隧道 + 城市剪影) */}
      <SubwayBackground />

      {/* 2. 前景 UI 层 */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* 左上角日期时间 (P5 风格) */}
        <motion.div 
          className="absolute top-8 left-8 flex flex-col items-start mix-blend-difference"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-6xl font-black text-white leading-none tracking-tighter">
            12/04
          </div>
          <div className="bg-white text-black px-2 py-0.5 text-xl font-bold transform -skew-x-12 mt-1">
            THURSDAY
          </div>
          <div className="text-white text-sm mt-1 tracking-widest uppercase">
            After School
          </div>
        </motion.div>

        {/* 
            右侧手机菜单
            注意：PhoneMenu 内部需要 pointer-events-auto 
            因为父容器是 pointer-events-none 
        */}
        <div className="pointer-events-auto w-full h-full">
            <PhoneMenu />
        </div>
      </div>
    </div>
  );
};

