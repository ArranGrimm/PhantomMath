import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateQuestion } from '../features/math/generator';
import { type Question, QuestionType } from '../features/math/types';
import { NumPad } from '../components/daytime/requests/NumPad';
import { LogicQueue } from '../components/daytime/requests/LogicQueue';
import { LogicAlgebra } from '../components/daytime/requests/LogicAlgebra';
import { LogicSpatialCube } from '../components/daytime/requests/LogicSpatialCube';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface DailyRequestsProps {
  onBack: () => void;
}

export const DailyRequests: React.FC<DailyRequestsProps> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // 初始化加载题目
  useEffect(() => {
    loadNewQuestion();
  }, []);

  const loadNewQuestion = () => {
    setInputValue('');
    setFeedback('idle');
    // 随机生成一道题
    const newQ = generateQuestion(undefined, 1);
    setCurrentQuestion(newQ);
  };

  const handleInput = (val: string) => {
    if (inputValue.length < 8) {
      setInputValue(prev => prev + val);
    }
  };

  const handleDelete = () => {
    setInputValue(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (!currentQuestion || !inputValue) return;

    const isCorrect = currentQuestion.validate(inputValue);
    
    if (isCorrect) {
      setFeedback('correct');
      // 简单的延迟后下一题
      setTimeout(loadNewQuestion, 1500);
    } else {
      setFeedback('wrong');
      // 震动反馈 (Haptic API)
      if (navigator.vibrate) navigator.vibrate(200);
      setTimeout(() => setInputValue(''), 500);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-16 bg-neutral-900 border-b border-gray-800 flex items-center px-4 justify-between flex-shrink-0 z-50">
        <button onClick={onBack} className="text-gray-400 hover:text-white" aria-label="Close">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-danger-red font-black tracking-widest uppercase">Mission Active</h2>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Main Layout Area - Responsive Switch */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Panel: Question & Visuals (Scrollable on mobile, Fixed on Desktop) */}
        <div className="flex-1 overflow-y-auto md:overflow-y-auto p-4 flex flex-col items-center justify-start md:justify-center relative z-10 scrollbar-hide">
          {currentQuestion && (
            <AnimatePresence mode='wait'>
              <motion.div 
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full max-w-md md:max-w-xl pb-32 md:pb-0" // Mobile needs bottom padding for absolute NumPad fallback
              >
                {/* NPC 气泡 */}
                <div className="flex gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-900 border border-purple-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    AI
                  </div>
                  <div className="flex-1 bg-white text-black p-4 rounded-r-xl rounded-bl-xl shadow-lg relative">
                    {/* 装饰三角 */}
                    <div className="absolute -left-2 top-0 w-0 h-0 border-t-10 border-t-white border-l-10 border-l-transparent" />
                    
                    <p className="text-lg font-bold leading-relaxed font-mono">
                      {currentQuestion.text}
                    </p>
                  </div>
                </div>

                {/* 可视化组件渲染区 */}
                {currentQuestion.type === QuestionType.LOGIC_QUEUE && currentQuestion.visualData?.queue && (
                  <div className="mb-6 w-full">
                     <LogicQueue visualData={currentQuestion.visualData.queue} />
                  </div>
                )}

                {currentQuestion.type === QuestionType.ALGEBRA_SHAPE && currentQuestion.visualData?.algebra && (
                  <div className="mb-6 w-full">
                     <LogicAlgebra visualData={currentQuestion.visualData.algebra} />
                  </div>
                )}
                
                {currentQuestion.type === QuestionType.SPATIAL_CUBE && currentQuestion.visualData?.cubes && (
                  <div className="mb-6 w-full">
                     <LogicSpatialCube visualData={currentQuestion.visualData.cubes} />
                  </div>
                )}

                {/* 用户输入框 (显示屏) */}
                <div className={`
                  w-full h-16 bg-black border-2 flex items-center justify-end px-4 text-3xl font-mono tracking-widest mb-4
                  transition-colors duration-300
                  ${feedback === 'wrong' ? 'border-red-500 text-red-500 shake-animation' : 'border-gray-700 text-green-400'}
                `}>
                  {inputValue}<span className="animate-pulse">_</span>
                </div>
                
                {/* 反馈信息 */}
                {feedback === 'correct' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 text-green-400 font-black text-xl uppercase"
                  >
                    <CheckCircleIcon className="w-6 h-6" />
                    Mission Accomplished
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Right Panel: NumPad (Fixed at bottom on Mobile, Side on Desktop) */}
        <div className="w-full md:w-96 md:border-l md:border-gray-800 bg-black/95 md:bg-neutral-900/50 flex-shrink-0 z-20">
             <div className="h-full flex flex-col justify-end md:justify-center p-2 md:p-6">
                <NumPad 
                  onInput={handleInput} 
                  onDelete={handleDelete} 
                  onSubmit={handleSubmit} 
                  className="w-full"
                />
             </div>
        </div>

      </div>
    </div>
  );
};
