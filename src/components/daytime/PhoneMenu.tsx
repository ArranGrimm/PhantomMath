import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleBottomCenterTextIcon, // 委托 (Messages)
  ExclamationTriangleIcon,        // 通缉 (Wanted/Alert)
  EyeIcon,                        // 异世界 (MetaNav)
  UserIcon,                       // 我的 (Profile)
  SignalIcon,                     // 信号
  Battery50Icon,                  // 电池
  WifiIcon
} from '@heroicons/react/24/solid';

// 定义菜单项
const MENU_ITEMS = [
  { id: 'requests', label: 'Requests', icon: ChatBubbleBottomCenterTextIcon, color: 'text-sky-400', badge: 3 },
  { id: 'wanted', label: 'Wanted', icon: ExclamationTriangleIcon, color: 'text-danger-red', badge: 12 },
  { id: 'metanav', label: 'MetaNav', icon: EyeIcon, color: 'text-purple-500', isSpecial: true },
  { id: 'profile', label: 'Phantom', icon: UserIcon, color: 'text-gray-300' },
];

export const PhoneMenu: React.FC = () => {
  return (
    <motion.div 
      className="absolute bottom-4 right-4 md:right-12 md:bottom-12 w-64 md:w-72 z-30 perspective-1000"
      initial={{ y: 200, rotate: 20 }}
      animate={{ y: 0, rotate: -5 }}
      transition={{ type: "spring", damping: 15 }}
    >
      {/* 手机外壳 */}
      <div className="bg-black border-4 border-gray-800 rounded-[2rem] p-3 shadow-2xl relative overflow-hidden transform transition-transform hover:rotate-0 hover:scale-105 duration-300">
        
        {/* 屏幕区域 */}
        <div className="bg-neutral-900 rounded-[1.5rem] h-96 overflow-hidden relative border border-gray-700">
          
          {/* 状态栏 */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-black/80 flex items-center justify-between px-4 text-[10px] text-white z-20">
            <span>16:40</span>
            <div className="flex gap-1">
              <SignalIcon className="w-3 h-3" />
              <WifiIcon className="w-3 h-3" />
              <Battery50Icon className="w-3 h-3" />
            </div>
          </div>

          {/* 动态壁纸背景 (红色网格) */}
          <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black pointer-events-none" />

          {/* 应用图标网格 */}
          <div className="absolute inset-0 pt-10 px-4 flex flex-col gap-3">
             {MENU_ITEMS.map((item) => (
               <motion.button
                 key={item.id}
                 whileHover={{ scale: 1.05, x: 5 }}
                 whileTap={{ scale: 0.95 }}
                 className={`
                   w-full p-3 rounded-xl flex items-center gap-3 relative overflow-hidden group
                   ${item.isSpecial ? 'bg-red-900/30 border border-red-600/50' : 'bg-white/5 border border-white/10'}
                 `}
               >
                  {/* 背景高亮效果 */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${item.isSpecial ? 'bg-red-600/20' : 'bg-white/10'}`} />

                  {/* 图标容器 */}
                  <div className={`
                    p-2 rounded-lg ${item.isSpecial ? 'bg-black' : 'bg-black/50'}
                    ${item.color}
                  `}>
                    <item.icon className="w-6 h-6" />
                  </div>

                  {/* 文字标签 */}
                  <span className="font-bold text-sm tracking-wider text-gray-200 group-hover:text-white">
                    {item.label}
                  </span>

                  {/* 角标 (Badge) */}
                  {item.badge && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-danger-red text-black text-xs font-black px-2 py-0.5 rounded-full shadow-lg border border-white/20">
                      {item.badge}
                    </div>
                  )}

                  {/* 装饰性箭头 */}
                  <div className="ml-auto opacity-30 group-hover:opacity-100 transition-opacity">
                    ›
                  </div>
               </motion.button>
             ))}
          </div>

        </div>

        {/* Home Bar */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/20 rounded-full" />
      </div>
    </motion.div>
  );
};

