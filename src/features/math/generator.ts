import { type Question, QuestionType } from './types';

// 生成唯一ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// ----------------------------------------------------------------------
// 1. 基础计算生成器 (Lv1 - Lv2)
// ----------------------------------------------------------------------
const generateCalculation = (difficulty: number): Question => {
  // 简单的加减法逻辑
  // Lv1: 20以内加减
  // Lv2: 100以内加减
  const maxNum = difficulty === 1 ? 20 : 100;
  const operator = Math.random() > 0.5 ? '+' : '-';
  
  let num1 = Math.floor(Math.random() * maxNum);
  let num2 = Math.floor(Math.random() * maxNum);
  
  // 保证减法结果非负
  if (operator === '-' && num1 < num2) {
    [num1, num2] = [num2, num1];
  }

  const answer = operator === '+' ? num1 + num2 : num1 - num2;
  
  // 将答案拆解为卡牌 (e.g. 12 -> ['1', '2'])
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
  // 场景：Joker 在队伍中
  // 变量：前面有几人(front), 后面有几人(back)
  // 提问方向：一共几人？ or 第几？
  
  const frontCount = Math.floor(Math.random() * 5) + 1; // 前面 1-5 人
  const backCount = Math.floor(Math.random() * 5) + 1;  // 后面 1-5 人
  const total = frontCount + 1 + backCount;
  
  const myIndex = frontCount; // 0-based index for visual rendering

  // 随机选择一种提问模式
  const mode = Math.random() > 0.5 ? 'TOTAL' : 'POSITION';

  let text = '';
  let answer = 0;

  if (mode === 'TOTAL') {
    // 问总数
    // 文案变体：Joker排第X，后面还有Y人，一共有几人？
    text = `Joker排在第 ${frontCount + 1} 位，他后面还有 ${backCount} 个暗影守卫。请确认敌方总人数。`;
    answer = total;
  } else {
    // 问位置 (逆向)
    // 文案变体：一共有Total人，Joker排第X，从后往前数他是第几？
    text = `敌方小队共 ${total} 人。Joker排在第 ${frontCount + 1} 位。从后往前数，他在第几位？`;
    answer = backCount + 1;
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
        direction: 'left', // 默认从左到右排
        myRole: 'Joker'
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
// 主工厂函数
// ----------------------------------------------------------------------
export const generateQuestion = (type?: QuestionType, difficulty: number = 1): Question => {
  // 如果没指定类型，根据权重随机 (70% 计算, 30% 逻辑)
  const selectedType = type || (Math.random() > 0.3 ? QuestionType.CALCULATION : QuestionType.LOGIC_QUEUE);

  switch (selectedType) {
    case QuestionType.LOGIC_QUEUE:
      return generateQueueLogic(difficulty);
    case QuestionType.CALCULATION:
    default:
      return generateCalculation(difficulty);
  }
};

