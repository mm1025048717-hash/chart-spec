/**
 * 图表详情页响应式参数配置
 * 自动根据设备类型（移动端/PC端）切换图表参数和规范表格值
 */

(function() {
    'use strict';

    // 设备检测阈值（与 mobile-spec.html 保持一致）
    const MOBILE_BREAKPOINT = 769;

    // 检测是否为移动端
    function isMobile() {
        return window.innerWidth < MOBILE_BREAKPOINT;
    }

    // 图表参数配置 - 格式：[参数名, 移动端值, PC端值, 说明]
    const chartConfigs = {
        '01-column': [
            ['columnWidthRatio', '0.6', '0.5', '柱子宽度比例'],
            ['label.fontSize', '9px', '11px', '标签字号'],
            ['axis.fontSize', '9px', '11px', '轴标签字号'],
            ['borderRadius', '3px', '4px', '圆角大小']
        ],
        '02-stacked-column': [
            ['columnWidthRatio', '0.6', '0.5', '柱子宽度比例'],
            ['label.fontSize', '9px', '11px', '标签字号'],
            ['legend.fontSize', '9px', '12px', '图例字号']
        ],
        '03-bar': [
            ['barWidthRatio', '0.55', '0.5', '条形宽度比例'],
            ['label.fontSize', '9px', '11px', '标签字号'],
            ['axis.fontSize', '9px', '11px', '轴标签字号']
        ],
        '04-line': [
            ['lineWidth', '1.5', '2', '线条宽度'],
            ['point.size', '3', '4', '数据点大小'],
            ['axis.fontSize', '9px', '11px', '轴标签字号'],
            ['smooth', 'false', 'false', '是否平滑曲线']
        ],
        '05-area': [
            ['lineWidth', '1.5', '2', '边界线宽度'],
            ['fillOpacity', '0.25', '0.3', '填充透明度'],
            ['axis.fontSize', '9px', '11px', '轴标签字号'],
            ['smooth', 'true', 'true', '平滑曲线（面积图常用）']
        ],
        '06-pie': [
            ['radius', '0.85', '0.8', '饼图半径'],
            ['label.fontSize', '8px', '10px', '标签字号'],
            ['label.offset', '8', '12', '标签偏移量']
        ],
        '07-histogram': [
            ['binNumber', '8', '12', '分组数量'],
            ['axis.fontSize', '9px', '11px', '轴标签字号'],
            ['columnStyle.radius', '2', '3', '圆角大小']
        ],
        '08-scatter': [
            ['size', '4', '5', '点大小'],
            ['axis.fontSize', '9px', '11px', '轴标签字号'],
            ['legend.fontSize', '9px', '11px', '图例字号']
        ],
        '09-bubble': [
            ['size', '[6,24]', '[8,30]', '气泡大小范围'],
            ['axis.fontSize', '9px', '11px', '轴标签字号'],
            ['strokeWidth', '0.5', '1', '描边宽度']
        ],
        '10-radar': [
            ['point.size', '3', '4', '数据点大小'],
            ['lineWidth', '1.5', '2', '线条宽度'],
            ['label.fontSize', '9px', '11px', '标签字号']
        ],
        '11-funnel': [
            ['label.fontSize', '9px', '12px', '标签字号'],
            ['conversionTag.size', '10px', '12px', '转化标签字号']
        ],
        '12-gauge': [
            ['statistic.fontSize', '18px', '24px', '数值字号'],
            ['indicator.pin', '8px', '10px', '指针大小']
        ],
        '13-pareto': [
            ['lineWidth', '1.5', '2', '线条宽度'],
            ['point.size', '3', '4', '数据点大小'],
            ['axis.fontSize', '8px', '10px', '轴标签字号']
        ],
        '14-treemap': [
            ['label.fontSize', '9px', '11px', '标签字号'],
            ['rectStyle.lineWidth', '1', '2', '边框宽度']
        ],
        '15-wordcloud': [
            ['fontSize', '[10,36]', '[14,48]', '字号范围'],
            ['padding', '2', '4', '文字间距']
        ],
        '16-heatmap': [
            ['xAxis.fontSize', '7px', '9px', 'X轴标签字号'],
            ['yAxis.fontSize', '9px', '11px', 'Y轴标签字号']
        ],
        '17-map': [
            ['label.fontSize', '8px', '10px', '标签字号'],
            ['borderWidth', '0.5', '1', '边框宽度'],
            ['zoom', '1.0', '1.2', '缩放级别']
        ],
        '18-table': [
            ['header.fontSize', '10px', '12px', '表头字号'],
            ['cell.fontSize', '9px', '11px', '单元格字号'],
            ['cell.padding', '6px', '10px', '单元格内边距']
        ],
        '19-indicator': [
            ['value.fontSize', '24px', '32px', '数值字号'],
            ['label.fontSize', '11px', '14px', '标签字号'],
            ['trend.fontSize', '10px', '12px', '趋势字号']
        ],
        '20-ring': [
            ['innerRadius', '0.55', '0.6', '内圆半径'],
            ['label.fontSize', '9px', '11px', '标签字号'],
            ['statistic.fontSize', '16px', '20px', '中心数值字号']
        ],
        '21-waterfall': [
            ['columnWidthRatio', '0.55', '0.5', '柱子宽度比例'],
            ['label.fontSize', '9px', '11px', '标签字号'],
            ['axis.fontSize', '8px', '10px', '轴标签字号']
        ],
        '22-dual-axes': [
            ['columnWidthRatio', '0.45', '0.4', '柱子宽度比例'],
            ['lineWidth', '1.5', '2', '线条宽度'],
            ['axis.fontSize', '9px', '11px', '轴标签字号']
        ],
        '23-rose': [
            ['radius', '0.88', '0.9', '外圆半径'],
            ['innerRadius', '0.25', '0.3', '内圆半径'],
            ['label.fontSize', '9px', '11px', '标签字号']
        ],
        '24-sunburst': [
            ['innerRadius', '0.2', '0.25', '内圆半径'],
            ['label.fontSize', '8px', '10px', '标签字号'],
            ['strokeWidth', '1', '2', '分隔线宽度']
        ],
        '25-sankey': [
            ['nodeWidthRatio', '0.015', '0.012', '节点宽度比例'],
            ['label.fontSize', '7px', '9px', '标签字号'],
            ['edgeOpacity', '0.3', '0.35', '连线透明度']
        ],
        '26-progress': [
            ['barWidthRatio', '0.25', '0.3', '进度条宽度比例'],
            ['label.fontSize', '10px', '12px', '标签字号']
        ]
    };

    // 通用参数（所有图表共用）
    const commonParams = {
        mobile: {
            fontSize: 10,
            labelFontSize: 10,
            legendFontSize: 9,
            axisFontSize: 10,
            pointSize: 3,
            lineWidth: 2,
            borderRadius: 4,
            // 移动端专用 padding 配置
            padding: {
                column: [25, 10, 35, 35],
                bar: [15, 35, 25, 100],
                line: [25, 10, 35, 35],
                area: [25, 10, 35, 35],
                pie: [10, 10, 10, 10],
                radar: [20, 20, 20, 20],
                funnel: [10, 30, 10, 30],
                dualAxes: [25, 30, 35, 35],
                pareto: [25, 30, 35, 35],
                heatmap: [20, 10, 40, 50],
                treemap: [5, 5, 5, 5],
                scatter: [25, 15, 35, 40],
                waterfall: [25, 15, 35, 40],
                histogram: [25, 10, 35, 35],
                sankey: [10, 10, 10, 10],
                sunburst: [10, 10, 10, 10],
                rose: [15, 15, 15, 15],
                wordcloud: [10, 10, 10, 10],
                ring: [10, 10, 10, 10],
                gauge: [10, 10, 10, 10]
            }
        },
        pc: {
            fontSize: 11,
            labelFontSize: 11,
            legendFontSize: 12,
            axisFontSize: 11,
            pointSize: 4,
            lineWidth: 2,
            borderRadius: 4,
            // PC端 padding 配置
            padding: {
                column: [40, 20, 50, 50],
                bar: [30, 50, 40, 150],
                line: [40, 20, 50, 50],
                area: [40, 20, 50, 50],
                pie: [20, 20, 20, 20],
                radar: [30, 30, 30, 30],
                funnel: [20, 60, 20, 60],
                dualAxes: [40, 50, 50, 50],
                pareto: [40, 50, 50, 50],
                heatmap: [40, 20, 60, 80],
                treemap: [10, 10, 10, 10],
                scatter: [40, 30, 50, 60],
                waterfall: [40, 30, 50, 60],
                histogram: [40, 20, 50, 50],
                sankey: [20, 20, 20, 20],
                sunburst: [20, 20, 20, 20],
                rose: [20, 20, 20, 20],
                wordcloud: [20, 20, 20, 20],
                ring: [20, 20, 20, 20],
                gauge: [20, 20, 20, 20]
            }
        }
    };

    /**
     * 获取指定图表的参数配置
     * @param {string} chartId - 图表ID（如 '01-column'）
     * @returns {Array} 参数配置数组
     */
    function getChartSpecs(chartId) {
        return chartConfigs[chartId] || [];
    }

    /**
     * 获取当前设备对应的通用参数
     * @returns {Object} 参数对象
     */
    function getParams() {
        return isMobile() ? commonParams.mobile : commonParams.pc;
    }

    /**
     * 获取指定图表的响应式参数值
     * @param {string} chartId - 图表ID
     * @returns {Object} 参数名到值的映射
     */
    function getChartParams(chartId) {
        const specs = getChartSpecs(chartId);
        const valueIndex = isMobile() ? 1 : 2; // 移动端用索引1，PC端用索引2
        const result = {};
        
        specs.forEach(spec => {
            const [key, mobileVal, pcVal] = spec;
            result[key] = isMobile() ? mobileVal : pcVal;
        });
        
        return result;
    }

    /**
     * 更新页面中规范表格的参数值
     * 查找带有 data-param 属性的元素并更新其内容
     */
    function updateSpecTable() {
        const mobile = isMobile();
        const deviceClass = mobile ? 'mobile' : 'pc';
        
        // 更新带有 data-param 属性的元素
        document.querySelectorAll('[data-param]').forEach(el => {
            const paramName = el.getAttribute('data-param');
            const chartId = el.getAttribute('data-chart') || getCurrentChartId();
            const specs = getChartSpecs(chartId);
            
            const spec = specs.find(s => s[0] === paramName);
            if (spec) {
                const value = mobile ? spec[1] : spec[2];
                el.textContent = value;
                
                // 更新样式类
                el.classList.remove('mobile', 'pc');
                el.classList.add(deviceClass);
            }
        });
        
        // 更新设备指示器（如果存在）
        const deviceIndicator = document.getElementById('deviceIndicator');
        if (deviceIndicator) {
            const mobileIcon = deviceIndicator.querySelector('.mobile-icon');
            const pcIcon = deviceIndicator.querySelector('.pc-icon');
            const deviceText = document.getElementById('deviceText');
            
            if (mobile) {
                deviceIndicator.classList.remove('pc-mode');
                if (mobileIcon) mobileIcon.style.display = 'block';
                if (pcIcon) pcIcon.style.display = 'none';
                if (deviceText) deviceText.textContent = '移动端参数';
            } else {
                deviceIndicator.classList.add('pc-mode');
                if (mobileIcon) mobileIcon.style.display = 'none';
                if (pcIcon) pcIcon.style.display = 'block';
                if (deviceText) deviceText.textContent = 'PC端参数';
            }
        }
        
        // 更新设备标签
        document.querySelectorAll('.device-tag').forEach(tag => {
            tag.classList.remove('mobile', 'pc');
            tag.classList.add(deviceClass);
            const textSpan = tag.querySelector('span:last-child');
            if (textSpan) {
                textSpan.textContent = mobile ? '移动端' : 'PC端';
            }
        });
    }

    /**
     * 从当前URL路径推断图表ID
     * @returns {string} 图表ID
     */
    function getCurrentChartId() {
        const path = window.location.pathname;
        const match = path.match(/(\d{2}-[\w-]+)/);
        return match ? match[1] : '';
    }

    /**
     * 解析参数值（处理数字、数组等类型）
     * @param {string} value - 字符串形式的值
     * @returns {any} 解析后的值
     */
    function parseValue(value) {
        // 尝试解析为数组
        if (value.startsWith('[') && value.endsWith(']')) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        }
        
        // 尝试解析为数字
        const num = parseFloat(value);
        if (!isNaN(num) && !value.endsWith('px')) {
            return num;
        }
        
        // 解析布尔值
        if (value === 'true') return true;
        if (value === 'false') return false;
        
        return value;
    }

    // 记录当前设备状态
    let currentIsMobile = isMobile();

    /**
     * 初始化响应式功能
     * @param {Object} options - 配置选项
     * @param {Function} options.onDeviceChange - 设备类型变化时的回调
     */
    function init(options = {}) {
        currentIsMobile = isMobile();
        
        // 更新规范表格
        updateSpecTable();
        
        // 监听窗口大小变化
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                const nowMobile = isMobile();
                if (nowMobile !== currentIsMobile) {
                    currentIsMobile = nowMobile;
                    updateSpecTable();
                    
                    // 触发回调
                    if (typeof options.onDeviceChange === 'function') {
                        options.onDeviceChange(nowMobile);
                    }
                    
                    console.log(`🔄 切换到${nowMobile ? '移动端' : 'PC端'}模式 (宽度: ${window.innerWidth}px)`);
                }
            }, 200);
        });
        
        console.log(`📱 响应式初始化完成: ${currentIsMobile ? '移动端' : 'PC端'} (宽度: ${window.innerWidth}px)`);
    }

    // 导出到全局命名空间
    window.ChartSpec = {
        isMobile: isMobile,
        getParams: getParams,
        getChartParams: getChartParams,
        getChartSpecs: getChartSpecs,
        updateSpecTable: updateSpecTable,
        parseValue: parseValue,
        init: init,
        configs: chartConfigs,
        commonParams: commonParams
    };

})();
