import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateQuestion } from '../features/math/generator';
import { type Question, QuestionType } from '../features/math/types';
import { NumPad } from '../components/daytime/requests/NumPad';
import { LogicQueue } from '../components/daytime/requests/LogicQueue';
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
    <div className="absolute inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="h-16 bg-neutral-900 border-b border-gray-800 flex items-center px-4 justify-between">
        <button onClick={onBack} className="text-gray-400 hover:text-white" aria-label="Close">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-danger-red font-black tracking-widest uppercase">Mission Active</h2>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Mission Zone (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center relative">
        {currentQuestion && (
          <AnimatePresence mode='wait'>
            <motion.div 
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-md"
            >
              {/* NPC 气泡 */}
              <div className="flex gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-900 border border-purple-500 flex items-center justify-center text-xs font-bold">
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

              {/* 逻辑题可视化组件 */}
              {currentQuestion.type === QuestionType.LOGIC_QUEUE && currentQuestion.visualData?.queue && (
                <div className="mb-6">
                   <LogicQueue visualData={currentQuestion.visualData.queue} />
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

      {/* Input Zone (NumPad) */}
      <div className="w-full">
        <NumPad 
          onInput={handleInput} 
          onDelete={handleDelete} 
          onSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
};

