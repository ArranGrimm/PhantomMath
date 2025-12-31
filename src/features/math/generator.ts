import { type Question, QuestionType } from './types';

// 生成唯一ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// ----------------------------------------------------------------------
// 1. 基础计算生成器 (Lv1 - Lv2)
// ----------------------------------------------------------------------
const generateCalculation = (difficulty: number): Question => {
  const maxNum = difficulty === 1 ? 20 : 100;
  const operator = Math.random() > 0.5 ? '+' : '-';
  
  let num1 = Math.floor(Math.random() * maxNum);
  let num2 = Math.floor(Math.random() * maxNum);
  
  if (operator === '-' && num1 < num2) {
    [num1, num2] = [num2, num1];
  }

  const answer = operator === '+' ? num1 + num2 : num1 - num2;
  const cards = answer.toString().split('');

  return {
    id: generateId(),
    type: QuestionType.CALCULATION,
    difficulty: difficulty as any,
    text: `目标确认：${num1} ${operator} ${num2} = ?`,
    answer,
    validate: (input) => Number(input) === answer,
    rewards: {
      coins: 10 * difficulty,
      cards
    }
  };
};

// ----------------------------------------------------------------------
// 2. 排队逻辑生成器 (The Queue)
// ----------------------------------------------------------------------
const generateQueueLogic = (difficulty: number): Question => {
  const frontCount = Math.floor(Math.random() * 5) + 1; // 1-5人
  const backCount = Math.floor(Math.random() * 5) + 1;  // 1-5人
  const total = frontCount + 1 + backCount;
  const myIndex = frontCount;

  // 模式：ASK_TOTAL (问总数) | ASK_POSITION_BACK (问从后数第几)
  const mode = Math.random() > 0.5 ? 'ASK_TOTAL' : 'ASK_POSITION_BACK';
  
  let text = '';
  let answer = 0;
  let hideMode: 'mask_front' | 'mask_back' | 'show_all' = 'show_all';

  if (mode === 'ASK_TOTAL') {
    text = `我在队伍第 ${frontCount + 1} 个，后面还有 ${backCount} 个暗影。请计算总人数。`;
    answer = total;
    hideMode = 'mask_front';
  } else {
    text = `队伍共 ${total} 人。从前往后数我在第 ${frontCount + 1} 个。从后往前数我在第几个？`;
    answer = backCount + 1;
    hideMode = 'mask_back';
  }

  return {
    id: generateId(),
    type: QuestionType.LOGIC_QUEUE,
    difficulty: difficulty as any,
    text,
    visualData: {
      queue: {
        total,
        targetIndex: myIndex,
        direction: 'left', // 保持默认 left (Front在右, Back在左)
        myRole: 'Me',
        hideMode
      }
    },
    answer,
    validate: (input) => Number(input) === answer,
    rewards: {
      coins: 20 * difficulty,
      cards: answer.toString().split('')
    }
  };
};

// ----------------------------------------------------------------------
// 3. 图形代数生成器 (Algebra Shapes)
// ----------------------------------------------------------------------
const generateAlgebra = (difficulty: number): Question => {
  const icons = ['🔺', '🟦', '🟡', '⭐', '❤️', '💎'];
  const shuffled = icons.sort(() => 0.5 - Math.random());
  const iconA = shuffled[0]!;
  const iconB = shuffled[1]!;

  const valA = Math.floor(Math.random() * 9) + 1;
  let valB = Math.floor(Math.random() * 9) + 1;
  while(valB === valA) valB = Math.floor(Math.random() * 9) + 1;

  const res1 = valA + valA;
  const res2 = valA + valB;

  return {
    id: generateId(),
    type: QuestionType.ALGEBRA_SHAPE,
    difficulty: difficulty as any,
    text: `破解密码：如果等式成立，${iconB} 代表数字几？`,
    visualData: {
      algebra: {
        vars: [
          { id: 'a', icon: iconA, value: valA },
          { id: 'b', icon: iconB, value: valB }
        ],
        formulas: [
          { left: ['a', 'a'], result: res1 },
          { left: ['a', 'b'], result: res2 }
        ],
        targetVarId: 'b'
      }
    },
    answer: valB,
    validate: (input) => Number(input) === valB,
    rewards: {
      coins: 25 * difficulty,
      cards: valB.toString().split('')
    }
  };
};

// ----------------------------------------------------------------------
// 4. 空间方块生成器 (Spatial Cubes)
// ----------------------------------------------------------------------
const generateSpatialCubes = (difficulty: number): Question => {
  // 定义空间大小：Lv1=3x3x3
  const size = 3;
  const matrix: boolean[][][] = Array(size).fill(null).map(() => 
    Array(size).fill(null).map(() => Array(size).fill(false))
  );

  // 1. 生成堆叠
  // 规则：不能悬空。每个位置 (x, z) 都有一个高度 h。
  let totalCubes = 0;
  
  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      // 随机高度 1~size, 但要有一定几率是0(空)
      let height = Math.floor(Math.random() * (size + 1)); 
      
      // 确保至少有一个方块
      if (totalCubes === 0 && x === size-1 && z === size-1) height = 1;

      for (let y = 0; y < height; y++) {
        matrix[y]![z]![x] = true;
        totalCubes++;
      }
    }
  }

  // 2. 模式选择：COUNT_TOTAL vs MISSING_CUBES
  const mode = Math.random() > 0.5 ? 'COUNT_TOTAL' : 'MISSING_CUBES'; 
  
  let text = '';
  let answer = 0;

  if (mode === 'COUNT_TOTAL') {
    text = `空间扫描：这堆物资一共有多少个箱子？(包括看不见的)`;
    answer = totalCubes;
  } else {
    // Missing Cubes: 还需要几个才能填满 3x3x3?
    const maxCapacity = size * size * size; // 27
    const missing = maxCapacity - totalCubes;
    text = `物资缺失：至少再添加几个箱子，才能拼成一个完整的大正方体 (${size}x${size}x${size})？`;
    answer = missing;
  }

  return {
    id: generateId(),
    type: QuestionType.SPATIAL_CUBE,
    difficulty: difficulty as any,
    text,
    visualData: {
      cubes: {
        matrix,
        size
      }
    },
    answer,
    validate: (input) => Number(input) === answer,
    rewards: {
      coins: 30 * difficulty,
      cards: answer.toString().split('')
    }
  };
};

export const generateQuestion = (type?: QuestionType, difficulty: number = 1): Question => {
  let selectedType = type;
  
  if (!selectedType) {
    const rand = Math.random();
    // 均衡概率
    if (rand < 0.3) selectedType = QuestionType.CALCULATION;
    else if (rand < 0.55) selectedType = QuestionType.LOGIC_QUEUE;
    else if (rand < 0.8) selectedType = QuestionType.ALGEBRA_SHAPE;
    else selectedType = QuestionType.SPATIAL_CUBE;
  }

  switch (selectedType) {
    case QuestionType.LOGIC_QUEUE:
      return generateQueueLogic(difficulty);
    case QuestionType.ALGEBRA_SHAPE:
      return generateAlgebra(difficulty);
    case QuestionType.SPATIAL_CUBE:
      return generateSpatialCubes(difficulty);
    case QuestionType.CALCULATION:
    default:
      return generateCalculation(difficulty);
  }
};
