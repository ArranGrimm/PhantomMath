import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 简单的视图切换逻辑，后续会替换为路由或状态管理
enum View {
  SPLASH = 'SPLASH',
  DAYTIME = 'DAYTIME',
  NIGHTTIME = 'NIGHTTIME'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.SPLASH);

  return (
    <div className="w-full h-screen bg-deep-black text-rough-white overflow-hidden relative">
      {/* 这是一个临时占位，用于验证环境是否跑通 */}
      {currentView === View.SPLASH && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center h-full z-10 relative"
        >
          <h1 className="text-6xl font-black text-danger-red -rotate-3 tracking-tighter mix-blend-difference">
            PHANTOM
            <br />
            <span className="text-rough-white ml-12">MATH</span>
          </h1>
          
          <button 
            onClick={() => setCurrentView(View.DAYTIME)}
            className="mt-12 px-8 py-3 bg-danger-red text-deep-black font-bold text-xl 
                       hover:bg-white hover:scale-105 transition-all duration-100
                       clip-trapezoid transform -skew-x-12"
          >
            TAKE YOUR HEART
          </button>
        </motion.div>
      )}

      {currentView === View.DAYTIME && (
        <div className="p-8">
          <h2 className="text-2xl text-danger-red">DAYTIME: SUBWAY</h2>
          <p className="mt-4">Waiting for mission...</p>
          <button onClick={() => setCurrentView(View.SPLASH)} className="mt-4 underline">Back</button>
        </div>
      )}
    </div>
  );
};

export default App;

