# Chart Spec

<p align="center">
  <img src="https://img.shields.io/badge/Charts-19+-blue" alt="Charts">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/Ant%20Design%20Chart-Compatible-orange" alt="Ant Design Chart">
  <img src="https://img.shields.io/badge/React-18+-61dafb" alt="React">
</p>

<p align="center">
  <strong>专业级图表设计规范与组件库</strong><br>
  基于 Ant Design Chart (G2Plot)，提供 19+ 图表类型的完整设计规范
</p>

---

## ✨ 特性

- **19+ 图表类型** - 覆盖柱状图、折线图、饼图、散点图等常用图表
- **统一设计语言** - 基于 Apple 设计理念的一致视觉规范
- **开箱即用** - 每个图表都附带完整代码示例和配置参数
- **响应式设计** - 适配桌面端和移动端
- **无依赖** - 纯 HTML/CSS/JS 实现，可直接集成

## 📦 图表类型

### 基础图表
- 柱状图 (Column)
- 堆叠柱状图 (Stacked Column)
- 条形图 (Bar)
- 折线图 (Line)
- 面积图 (Area)

### 占比图表
- 饼图 (Pie)
- 漏斗图 (Funnel)
- 矩形树图 (Treemap)

### 统计分布
- 直方图 (Histogram)
- 散点图 (Scatter)
- 气泡图 (Bubble)
- 热力图 (Heatmap)

### 分析图表
- 雷达图 (Radar)
- 帕累托图 (Pareto)

### 其他组件
- 仪表盘 (Gauge)
- 指标卡 (Indicator)
- 词云图 (Word Cloud)
- 地图 (Map)
- 表格 (Table)

## 🚀 快速开始

### 方式一：直接使用

```bash
# 克隆仓库
git clone https://github.com/your-username/chart-spec.git

# 进入目录
cd chart-spec

# 使用任意 HTTP 服务器打开
npx serve .
# 或
python -m http.server 8080
```

然后访问 `http://localhost:8080` 查看文档。

### 方式二：集成到 React 项目

```bash
# 安装 Ant Design Chart
npm install @ant-design/charts
```

```jsx
// 使用设计规范中的配置
import { Column } from '@ant-design/charts';

const MyChart = () => {
  const config = {
    data: yourData,
    xField: 'category',
    yField: 'value',
    // 应用设计规范
    color: '#0071E3',
    columnWidthRatio: 0.5,
    columnStyle: { radius: [4, 4, 0, 0] },
    padding: [40, 40, 60, 60],
  };
  
  return <Column {...config} />;
};
```

## 📐 设计规范

### 颜色系统

| 用途 | 色值 | 说明 |
|------|------|------|
| 主色 | `#0071E3` | 蓝色，用于主要数据 |
| 成功 | `#34C759` | 绿色，用于正向指标 |
| 警告 | `#FF9500` | 黄色，用于警示 |
| 错误 | `#FF3B30` | 红色，用于负向指标 |

### 图表色板

```javascript
const colors = [
  '#0071E3', // 蓝
  '#34C759', // 绿
  '#FF9500', // 黄
  '#FF3B30', // 红
  '#9270CA', // 紫
  '#6DC8EC', // 青
  '#FF9845', // 橙
];
```

### 尺寸规范

| 尺寸 | 高度 | CSS Class | 适用场景 |
|------|------|-----------|----------|
| XS | 200px | `.chart-body-xs` | 迷你图表 |
| SM | 300px | `.chart-body-sm` | 卡片图表 |
| MD | 400px | `.chart-body-md` | 标准图表 |
| LG | 500px | `.chart-body-lg` | 详情图表 |
| XL | 600px | `.chart-body-xl` | 全屏图表 |

### 间距规范

```javascript
// 标准 padding
padding: [40, 40, 60, 60]  // [上, 右, 下, 左]

// 紧凑 padding
padding: [30, 30, 50, 50]
```

## 📁 目录结构

```
chart-spec/
├── index.html          # 首页
├── common.css          # 公共样式
├── nav.js              # 导航组件
├── 00-设计系统/        # 设计规范文档
├── 01-column/          # 柱状图
├── 02-stacked-column/  # 堆叠柱状图
├── 03-bar/             # 条形图
├── 04-line/            # 折线图
├── 05-面积图/          # 面积图
├── 06-pie/             # 饼图
├── ...                 # 更多图表
└── X轴文本测试/        # 专题方案
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 License

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Ant Design Charts](https://charts.ant.design/) - React 图表组件库
- [G2Plot](https://g2plot.antv.antgroup.com/) - 底层图表引擎
- [Ant Design](https://ant.design/) - 设计系统参考
- [Apple Human Interface Guidelines](https://developer.apple.com/design/) - 设计灵感

---

<p align="center">
  Made with ❤️ for the data visualization community
</p>
