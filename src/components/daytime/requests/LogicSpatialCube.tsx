import React from 'react';
import { motion } from 'framer-motion';

interface LogicSpatialCubeProps {
  visualData: {
    matrix: boolean[][][];
    size: number;
  };
}

export const LogicSpatialCube: React.FC<LogicSpatialCubeProps> = ({ visualData }) => {
  const { matrix, size } = visualData;
  const cubeSize = 40; 
  // 核心修正 1: 计算整体偏移量，使几何中心对齐到 (0,0,0)
  // x=0, size=3 => offset = 1.5 * 40 = 60
  // center of block x=0 is 20. tx = 20 - 60 = -40. 
  const centerOffset = (size * cubeSize) / 2;

  const cubes = [];
  for (let y = 0; y < size; y++) {
    for (let z = 0; z < size; z++) {
      for (let x = 0; x < size; x++) {
        if (matrix[y]?.[z]?.[x]) {
          cubes.push({ x, y, z });
        }
      }
    }
  }

  const CubeUnit = ({ x, y, z }: { x: number, y: number, z: number }) => {
    // 坐标系修正：
    // 我们希望整个方块组的几何中心就在 (0,0,0)
    // 假设 size=3，x的范围是 0,1,2。中心是 1。
    // x=1 的方块中心应该在 0。
    // x=0 的方块中心应该在 -40。
    // x=2 的方块中心应该在 +40。
    
    // x * cubeSize 是 grid index to px (left edge)
    // + cubeSize/2 是移到方块中心
    // - centerOffset 是移到整体中心
    const tx = (x * cubeSize + cubeSize / 2) - centerOffset;
    
    // y轴是高度，y=0 是底层。
    // 我们希望 y=1 (中间层) 的中心在 0。
    // y=0 的中心在 +40 (因为 CSS y向下)
    // y=2 的中心在 -40
    // 公式：((size - 1)/2 - y) * cubeSize
    const ty = ((size - 1) / 2 - y) * cubeSize;
    
    const tz = (z * cubeSize + cubeSize / 2) - centerOffset;

    const faceClass = "absolute inset-0 border border-black bg-danger-red opacity-100 backface-hidden";  
    const half = cubeSize / 2;
    
    return (
      <div 
        className="absolute w-full h-full preserve-3d"
        style={{
          width: cubeSize,
          height: cubeSize,
          transform: `translate3d(${tx}px, ${ty}px, ${tz}px)`
        }}
      >
        <div className={faceClass} style={{ transform: `translateZ(${half}px)` }} />
        <div className={faceClass} style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
        <div className={faceClass} style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
        <div className={faceClass} style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
        <div className={`${faceClass} brightness-125`} style={{ transform: `rotateX(90deg) translateZ(${half}px)` }} />
        <div className={`${faceClass} brightness-75`} style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
      </div>
    );
  };

  return (
    <div className="w-full h-64 flex items-center justify-center overflow-hidden relative">
      {/* 
         关键修正：
         为了让自转看起来是绕着几何中心，我们需要一个绝对定位的容器，
         并且这个容器的中心必须对齐到父容器的中心。
      */}
      <div className="scene relative perspective-[1000px] flex items-center justify-center" style={{ width: 0, height: 0 }}>
        <motion.div
          className="preserve-3d"
          style={{ 
            // 容器大小设为0，或者设为正好包裹方块
            // 设为0的好处是，所有的子元素都是相对于 (0,0,0) 偏移的，
            // 只要子元素的 translate 是相对于中心的，那么旋转轴心自然就是 (0,0,0)
            width: 0, 
            height: 0,
            position: 'absolute',
            transformStyle: 'preserve-3d'
          }}
          // 初始角度
          initial={{ rotateX: -20, rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {cubes.map((c, i) => (
             <CubeUnit key={i} x={c.x} y={c.y} z={c.z} />
          ))}
        </motion.div>
      </div>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; } 
      `}</style>
    </div>
  );
};
