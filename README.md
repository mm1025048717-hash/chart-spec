# 🍎 Chart Spec - 专业级图表设计系统

<p align="center">
  <a href="https://chart-spec.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/Design-Apple%20Style-black?style=for-the-badge&logo=apple" alt="Apple Style" />
  <img src="https://img.shields.io/badge/Powered%20by-Ant%20Design%20Charts-blue?style=for-the-badge&logo=ant-design" alt="Ant Design" />
</p>

## 🌟 简介

**Chart Spec** 是一个追求极致视觉体验与工程实践的数据可视化设计规范系统。它不仅仅是一个组件库的二次封装，更是一套完整的可视化语言体系。

基于 **Ant Design Chart (G2Plot)**，我们为每一个图表注入了苹果级别的审美标准：精准的间距、优雅的动效、极致的排版以及人性化的交互逻辑。

---

## ✨ 核心特性

- 🍏 **苹果级视觉设计**：蓝白配色、简约质感、毛玻璃导航、SF Pro 级排版，带来顶级的产品感。
- 📊 **全能型图表覆盖**：包含 26+ 种常用图表类型（柱状图、折线图、饼图、环图、散点图、气泡图、雷达图、帕累托图、瀑布图、双轴图、玫瑰图、旭日图、桑基图、进度图等）。
- 🧠 **智能文本优化**：内置 X 轴文本智能缩减与旋转算法，完美解决长文本重叠的痛点。
- 📐 **严谨的设计规范**：统一的设计系统，从颜色色板、字体大小到内边距，均有详尽的文档定义。
- 🚀 **开箱即用**：提供完整的配置示例，一键复制，即刻部署。
- ✅ **设计一致性**：所有图表遵循统一的设计规范，确保视觉体验的一致性。

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
- 饼图 (Pie)、环图 (Ring)、漏斗图 (Funnel)、矩形树图 (Treemap)、直方图 (Histogram)、玫瑰图 (Rose)、旭日图 (Sunburst)

### 高级分析
- 散点图 (Scatter)、气泡图 (Bubble)、热力图 (Heatmap)、雷达图 (Radar)、帕累托图 (Pareto)、双轴图 (Dual Axes)、桑基图 (Sankey)

### 其它
- 仪表盘 (Gauge)、指标卡 (Indicator)、词云图 (Word Cloud)、地图 (Map)、表格 (Table)、瀑布图 (Waterfall)、进度图 (Progress)

---

## 🚀 快速开始

### 在线体验
访问 [https://chart-spec.vercel.app](https://chart-spec.vercel.app) 查看完整示例和设计规范。

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/mm1025048717-hash/chart-spec.git
cd chart-spec

# 安装依赖（如果需要）
npm install @ant-design/charts

# 启动本地服务器
npm start
# 或
npx serve .
```

### 使用示例

```javascript
// 引入组件
import { Column } from '@ant-design/charts';

// 使用标准配置
const config = {
  data,
  xField: 'type',
  yField: 'value',
  padding: [40, 20, 50, 50],  // 标准内边距
  columnWidthRatio: 0.5,
  columnStyle: { radius: [4, 4, 0, 0] },
  xAxis: {
    label: {
      style: { fontSize: 11, fill: '#86868B' }
    }
  },
  yAxis: {
    label: {
      style: { fontSize: 11, fill: '#86868B' }
    },
    grid: {
      line: {
        style: { stroke: '#E8E8ED', lineDash: [4, 4] }
      }
    }
  }
};
```

---

## 📚 设计规范

所有图表遵循统一的设计系统规范：
- **标准 Padding**: `[40, 20, 50, 50]` - [上, 右, 下, 左]
- **坐标轴字号**: `11px`
- **坐标轴颜色**: `#86868B`
- **网格线**: `#E8E8ED` 虚线 `[4, 4]`
- **圆角规范**: 柱状图顶部 `[4, 4, 0, 0]`

详细规范请查看 [设计系统文档](https://chart-spec.vercel.app/00-design-system/)。

---

## 📄 开源协议

本项目采用 [MIT](LICENSE) 协议开源。

---

<p align="center">
  由 <a href="https://github.com/mm1025048717-hash">AlexChen</a> 精心打造<br>
  <a href="https://chart-spec.vercel.app">在线体验</a> · 
  <a href="https://github.com/mm1025048717-hash/chart-spec">GitHub</a> · 
  <a href="https://chart-spec.vercel.app/00-design-system/">设计规范</a>
</p>
