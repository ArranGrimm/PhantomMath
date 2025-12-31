export enum QuestionType {
  CALCULATION = 'CALCULATION',   // 基础计算
  LOGIC_QUEUE = 'LOGIC_QUEUE',   // 排队问题
  ALGEBRA_SHAPE = 'ALGEBRA_SHAPE', // 图形代数
  SPATIAL_CUBE = 'SPATIAL_CUBE',   // 空间方块 (待实现)
  MATCHSTICK = 'MATCHSTICK',       // 火柴棒 (待实现)
}

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  
  // 题干 (支持简单模板替换)
  text: string;
  
  // 视觉渲染数据
  visualData?: {
    queue?: {
      total: number;
      targetIndex: number; // 目标在数组中的索引 (0-based)
      direction: 'left' | 'right' | 'front' | 'back';
      myRole?: string; // e.g. 'Me'
      // mask_front: 遮挡前排 (用于 Ask Total, 已知前面排名)
      // mask_back: 遮挡后排 (用于 Ask Back Position, 已知前面排名)
      hideMode?: 'mask_front' | 'show_all' | 'mask_back'; 
    };
    algebra?: {
      vars: Array<{ id: string, icon: string, value: number }>; // 变量定义
      formulas: Array<{ left: string[], result: number }>; // 算式列表
      targetVarId: string; // 要求的变量ID
    };
    cubes?: { matrix: boolean[][][] };
    matchstick?: { equation: string };
  };

  // 验证逻辑
  validate: (input: string | number) => boolean;
  
  // 预期奖励
  rewards: {
    coins: number;
    cards: string[]; // 产出的卡牌，如 ['5', '2']
  };

  // 正确答案 (用于调试或提示)
  answer: string | number;
}
