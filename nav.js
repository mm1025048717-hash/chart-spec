(function() {
    const navConfig = {
        brand: {
            name: 'Chart Spec',
            path: 'index.html'
        },
        sections: [
            {
                title: '专题方案',
                icon: 'gradient-special',
                items: [
                    { id: 'x-axis', name: 'X轴文字智能处理', path: 'x-axis-test/index.html', icon: '📊', status: 'ready' }
                ]
            },
            {
                title: '基础图表',
                icon: 'gradient-blue',
                items: [
                    { id: 'column', name: '柱状图', en: 'Column', path: '01-column/index.html', icon: '📊', status: 'ready' },
                    { id: 'stacked-column', name: '堆叠柱状图', en: 'Stacked Column', path: '02-stacked-column/index.html', icon: '📊', status: 'ready' },
                    { id: 'bar', name: '条形图', en: 'Bar', path: '03-bar/index.html', icon: '📊', status: 'ready' },
                    { id: 'line', name: '折线图', en: 'Line', path: '04-line/index.html', icon: '📈', status: 'ready' },
                    { id: 'area', name: '面积图', en: 'Area', path: '05-area/index.html', icon: '📉', status: 'ready' }
                ]
            },
            {
                title: '占比图表',
                icon: 'gradient-amber',
                items: [
                    { id: 'pie', name: '饼图', en: 'Pie', path: '06-pie/index.html', icon: '🥧', status: 'ready' },
                    { id: 'funnel', name: '漏斗图', en: 'Funnel', path: '11-funnel/index.html', icon: '🔻', status: 'ready' },
                    { id: 'treemap', name: '矩形树图', en: 'Treemap', path: '14-treemap/index.html', icon: '🔲', status: 'ready' }
                ]
            },
            {
                title: '统计分布',
                icon: 'gradient-emerald',
                items: [
                    { id: 'histogram', name: '直方图', en: 'Histogram', path: '07-histogram/index.html', icon: '📊', status: 'ready' },
                    { id: 'scatter', name: '散点图', en: 'Scatter', path: '08-scatter/index.html', icon: '⚫', status: 'ready' },
                    { id: 'bubble', name: '气泡图', en: 'Bubble', path: '09-bubble/index.html', icon: '🫧', status: 'ready' },
                    { id: 'heatmap', name: '热力图', en: 'Heatmap', path: '16-heatmap/index.html', icon: '🔥', status: 'ready' }
                ]
            },
            {
                title: '分析图表',
                icon: 'gradient-rose',
                items: [
                    { id: 'radar', name: '雷达图', en: 'Radar', path: '10-radar/index.html', icon: '🕸️', status: 'ready' },
                    { id: 'pareto', name: '帕累托图', en: 'Pareto', path: '13-pareto/index.html', icon: '📊', status: 'ready' }
                ]
            },
            {
                title: '其他组件',
                icon: 'gradient-purple',
                items: [
                    { id: 'gauge', name: '仪表盘', en: 'Gauge', path: '12-gauge/index.html', icon: '⏱️', status: 'ready' },
                    { id: 'indicator', name: '指标卡', en: 'Indicator', path: '19-indicator/index.html', icon: '🎯', status: 'ready' },
                    { id: 'wordcloud', name: '词云图', en: 'WordCloud', path: '15-wordcloud/index.html', icon: '☁️', status: 'ready' },
                    { id: 'map', name: '地图', en: 'Map', path: '17-map/index.html', icon: '🗺️', status: 'ready' },
                    { id: 'table', name: '表格', en: 'Table', path: '18-table/index.html', icon: '📋', status: 'ready' }
                ]
            }
        ]
    };

    function createNav() {
        const path = window.location.pathname;
        const isHome = path === '/' || path.endsWith('index.html') && !path.includes('/');
        
        // This is a simplified nav for subpages, we won't implement a full sidebar here
        // as the current design is landing-page focused.
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', createNav);
})();
