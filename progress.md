# 项目进度 (Progress)

## Phase 0: 初始化与架构 (Initialization)
- [x] 确定技术栈 (Bun + React + Tailwind + Framer Motion)
- [x] 完成架构文档 (`docs/技术选型与架构.md`)
- [x] 初始化项目结构
- [x] 配置 Tailwind CSS (P5 风格色板 & Clip-path)
- [x] 验证开发环境 (`bun run dev`)

## Phase 1: 原型开发 (Prototype)
- [x] **Splash Screen**: 实现 P5 风格的启动页与“玻璃破碎”转场动画 (`src/views/Splash.tsx`)
- [x] **Daytime Hub (表世界)**: 
    - [x] `SubwayBackground`: 集成视频背景、动态光影与物理吊环动画。
    - [x] `PhoneMenu`: 仿 P5 IM 风格的手机菜单。
    - [x] **Daily Requests (每日委托)**:
        - [x] `Math Engine`: 实现了计算、排队(v2.0)、图形代数、**空间方块**四类题型 (`src/features/math/`)。
        - [x] `DailyRequests View`: 沉浸式答题界面，支持左右分栏自适应布局。
        - [x] `NumPad`: P5 风格自适应数字键盘。
        - [x] `LogicQueue`: 排队问题可视化组件 (支持智能分组、防剧透遮挡)。
        - [x] `LogicAlgebra`: 图形代数可视化组件。
        - [x] `LogicSpatialCube`: 空间方块组件 (CSS 3D 渲染，支持自转观察与补全模式)。
- [ ] **Nighttime Hub (里世界)**: 
    - [ ] `MetaNavTransition`: 红黑同心圆转场动画
    - [ ] 搭建扭曲空间基础布局
- [ ] **Battle System**: 实现核心算式拖拽逻辑
