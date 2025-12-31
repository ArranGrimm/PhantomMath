import React from 'react';
import { motion } from 'framer-motion';

interface LogicAlgebraProps {
  visualData: {
    vars: Array<{ id: string, icon: string, value: number }>;
    formulas: Array<{ left: string[], result: number }>;
    targetVarId: string;
  };
}

export const LogicAlgebra: React.FC<LogicAlgebraProps> = ({ visualData }) => {
  const { vars, formulas, targetVarId } = visualData;

  const getIcon = (id: string) => vars.find(v => v.id === id)?.icon || '?';
  const targetIcon = getIcon(targetVarId);

  return (
    <div className="w-full py-6 flex flex-col items-center gap-4">
      {/* 算式卡片容器 */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        
        {formulas.map((formula, idx) => (
          <motion.div 
            key={idx}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.2 }}
            className="flex items-center justify-between bg-neutral-900 border border-gray-700 p-4 rounded-lg shadow-lg relative overflow-hidden"
          >
            {/* 左侧装饰条 */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-sky-500" />
            
            {/* 算式内容 */}
            <div className="flex items-center gap-3 text-3xl font-black text-white pl-2">
              {formula.left.map((varId, i) => (
                <React.Fragment key={i}>
                  <span className="drop-shadow-md filter">{getIcon(varId)}</span>
                  {i < formula.left.length - 1 && <span className="text-gray-500 text-xl">+</span>}
                </React.Fragment>
              ))}
            </div>

            {/* 等号与结果 */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xl">=</span>
              <span className="text-4xl text-sky-400 font-mono tracking-wider">{formula.result}</span>
            </div>
          </motion.div>
        ))}

        {/* 目标问题区 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-2 flex items-center justify-center gap-4 bg-danger-red/10 border-2 border-dashed border-danger-red p-4 rounded-xl"
        >
          <span className="text-4xl animate-pulse">{targetIcon}</span>
          <span className="text-2xl text-danger-red font-bold">=</span>
          <div className="w-16 h-12 bg-black/50 border-b-2 border-danger-red flex items-center justify-center text-2xl text-gray-500 font-mono">
            ?
          </div>
        </motion.div>

      </div>
    </div>
  );
};

