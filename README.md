# 🍎 Chart Spec - 专业级图表设计系统

<p align="center">
  <img src="https://img.shields.io/badge/Design-Apple%20Style-black?style=for-the-badge&logo=apple" alt="Apple Style" />
  <img src="https://img.shields.io/badge/Powered%20by-Ant%20Design%20Charts-blue?style=for-the-badge&logo=ant-design" alt="Ant Design" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" />
</p>

## 🌟 简介

**Chart Spec** 是一个追求极致视觉体验与工程实践的数据可视化设计规范系统。它不仅仅是一个组件库的二次封装，更是一套完整的可视化语言体系。

基于 **Ant Design Chart (G2Plot)**，我们为每一个图表注入了苹果级别的审美标准：精准的间距、优雅的动效、极致的排版以及人性化的交互逻辑。

---

## ✨ 核心特性

- 🍏 **苹果级视觉设计**：深色模式英雄区、毛玻璃导航、SF Pro 级排版，带来顶级的产品感。
- 📊 **全能型图表覆盖**：包含 19+ 种常用图表类型（柱状图、折线图、饼图、散点图、雷达图、帕累托图等）。
- 🧠 **智能文本优化**：内置 X 轴文本智能缩减与旋转算法，完美解决长文本重叠的痛点。
- 📐 **严谨的设计规范**：从颜色色板、字体大小到内边距，均有详尽的文档定义。
- 🚀 **开箱即用**：提供完整的 React 配置示例，一键复制，即刻部署。

---

## 🎨 设计哲学

我们相信数据不应该是冰冷的，它应该是直观且美丽的。

- **减法原则**：去除冗余的网格线，只保留核心数据。
- **层次感**：利用投影与深色背景营造空间感。
- **响应式**：从 4K 屏幕到移动端设备，均能提供完美的视觉呈现。

---

## 🛠️ 包含组件

### 专题方案
- **X 轴文字智能处理**：自动识别并优化长文本显示策略。

### 基础图表
- 柱状图 (Column)、堆叠柱状图、条形图 (Bar)、折线图 (Line)、面积图 (Area)

### 占比与统计
- 饼图 (Pie)、漏斗图 (Funnel)、矩形树图 (Treemap)、直方图 (Histogram)

### 高级分析
- 散点图 (Scatter)、气泡图 (Bubble)、热力图 (Heatmap)、雷达图 (Radar)、帕累托图 (Pareto)

### 其它
- 仪表盘 (Gauge)、指标卡 (Indicator)、词云图 (Word Cloud)、地图 (Map)、表格 (Table)

---

## 🚀 快速开始

```bash
# 安装依赖
npm install @ant-design/charts

# 引入组件
import { Column } from '@ant-design/charts';

# 使用标准配置
const config = {
  data,
  xField: 'type',
  yField: 'value',
  columnWidthRatio: 0.5,
  columnStyle: { radius: [4, 4, 0, 0] },
};
```

---

## 📄 开源协议

本项目采用 [MIT](LICENSE) 协议开源。

---

<p align="center">
  由 <a href="https://github.com/mm1025048717-hash">AlexChen</a> 精心打造
</p>
