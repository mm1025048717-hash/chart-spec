# 指标卡设计规范

## 组件标识
- **类型**: Indicator Card / Statistic
- **组件**: Ant Design - Statistic
- **用途**: 关键业务指标展示

## 核心配置

```javascript
import { Statistic, Card } from 'antd';

<Card>
    <Statistic
        title="总销售额"
        value={8846}
        suffix="万元"
        valueStyle={{ fontSize: 28, fontWeight: 600 }}
    />
</Card>
```

## 样式规范

| 元素 | 值 | 说明 |
|-----|---|-----|
| 数值字号 | 28px | 字重600 |
| 标签字号 | 13px | 颜色 #8C8C8C |
| 单位字号 | 14px | 紧跟数值 |
| 趋势上涨 | #52C41A | 绿色 |
| 趋势下跌 | #FF4D4F | 红色 |

## 常用变体
- 基础指标卡
- 带趋势指标卡
- 紧凑型指标卡
- 带图标指标卡
