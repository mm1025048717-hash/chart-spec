# 地图设计规范

## 图表标识
- **类型**: Choropleth Map (区域着色地图)
- **库**: @antv/g2 (geoPath)
- **用途**: 地理区域数据可视化

## 技术选型

### ❌ 不推荐：导航地图 API
- 高德地图 (AMap)
- 百度地图 (BMap)
- 腾讯地图
- **原因**：需要 API Key，依赖网络，适合导航/POI 场景

### ✅ 推荐：GeoJSON 绑定渲染
- AntV G2 geoPath
- ECharts map
- D3.js geoPath
- **优势**：无需 API Key，离线可用，纯前端渲染

## 核心配置

```javascript
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', autoFit: true });

chart
    .geoPath()
    .coordinate({ type: 'mercator' })
    .data({
        value: chinaGeoJSON,  // GeoJSON 数据
        transform: [{ type: 'feature' }],
    })
    .scale('color', {
        type: 'linear',
        domain: [0, 5000],
        range: ['#E8F4FD', '#0071E3'],
    })
    .encode('shape', 'polygon')
    .encode('color', 'value')
    .style('stroke', '#fff')
    .style('strokeWidth', 0.5)
    .tooltip({ title: (d) => d.properties?.name });

chart.render();
```

## 数据来源

| 来源 | 地址 | 说明 |
|------|------|------|
| 阿里云 DataV | https://datav.aliyun.com/portal/school/atlas/area_selector | 中国行政区划 |
| Natural Earth | https://www.naturalearthdata.com/ | 全球地理数据 |
| GeoJSON.io | https://geojson.io/ | 自定义绘制 |

## 色阶规范

### 连续数据
```javascript
scale('color', {
    type: 'linear',
    domain: [min, max],
    range: ['#E8F4FD', '#0071E3'],  // Primary 色阶
})
```

### 分类数据
```javascript
scale('color', {
    type: 'ordinal',
    domain: ['类型A', '类型B', '类型C'],
    range: ['#0071E3', '#34C759', '#FF9500'],
})
```

## 交互配置

```javascript
.state('active', { 
    stroke: '#0071E3', 
    strokeWidth: 2,
})
.interaction('elementHighlight', true)
```

## 注意事项
1. GeoJSON 文件较大时建议使用 TopoJSON 压缩
2. 简化 polygon 精度可提升渲染性能
3. 边界线颜色建议使用白色 (#FFF) 以区分区块
