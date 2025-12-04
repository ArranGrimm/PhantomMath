import React, { useState } from 'react';
import { Splash } from './views/Splash';
import { DaytimeHub } from './views/DaytimeHub';

enum View {
  SPLASH = 'SPLASH',
  DAYTIME = 'DAYTIME',
  NIGHTTIME = 'NIGHTTIME'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.SPLASH);

  return (
    <div className="w-full h-screen bg-neutral-900 text-white overflow-hidden relative">
      
      {/* 
        表世界 (Daytime Hub) 
        其实一开始就已经加载了，只是被 Splash 挡住了。
        这样当 Splash 破碎时，用户能直接看到底下的内容。
      */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${currentView === View.SPLASH ? 'opacity-0' : 'opacity-100'}`}>
        <DaytimeHub />
      </div>

      {/* Splash Screen - 位于最顶层 */}
      {currentView === View.SPLASH && (
        <Splash onStart={() => setCurrentView(View.DAYTIME)} />
      )}

    </div>
  );
};

export default App;
