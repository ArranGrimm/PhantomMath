# 项目进度 (Progress)

## Phase 0: 初始化与架构 (Initialization)
- [x] 确定技术栈 (Bun + React + Tailwind + Framer Motion)
- [x] 完成架构文档 (`docs/技术选型与架构.md`)
- [x] 初始化项目结构
- [x] 配置 Tailwind CSS (P5 风格色板 & Clip-path)
- [x] 验证开发环境 (`bun run dev`)

## Phase 1: 原型开发 (Prototype)
- [x] **Splash Screen**: 实现 P5 风格的启动页与“玻璃破碎”转场动画 (`src/views/Splash.tsx`)
- [x] **UI Components**: 实现基础的锯齿按钮 (`JaggedButton`)
- [x] **Daytime Hub (表世界)**: 
    - [x] `SubwayBackground`: 
        - [x] 动态光影与吊环摇晃动画
        - [x] **集成视频素材**: 窗外赛博都市风景 (`subway-view-loop.mp4`)
        - [x] 静态资源服务配置 (`Bun.serve` in `src/index.ts`)
    - [x] `PhoneMenu`: 仿 P5 IM 风格的手机菜单
    - [x] `DaytimeHub`: 视图整合与日期显示
- [ ] **Nighttime Hub (里世界)**: 
    - [ ] `MetaNavTransition`: 红黑同心圆转场动画
    - [ ] 搭建扭曲空间基础布局
- [ ] **Battle System**: 实现核心算式拖拽逻辑
