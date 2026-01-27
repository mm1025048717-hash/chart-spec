/**
 * 批量更新所有图表文件，添加统一筛选系统
 * 使用方法: node update-all-charts.js
 */

const fs = require('fs');
const path = require('path');

// 需要更新的图表目录
const chartDirs = [
    '04-line',
    '05-area',
    '07-histogram',
    '10-radar',
    '11-funnel',
    '12-gauge',
    '13-pareto',
    '14-treemap',
    '15-wordcloud',
    '16-heatmap',
    '17-map',
    '19-indicator',
    '20-ring',
    '21-waterfall',
    '22-dual-axes',
    '23-rose',
    '24-sunburst',
    '25-sankey',
    '26-progress'
];

// 获取统一筛选HTML
function getUnifiedFilterHTML(dimensionLabel = '维度', dimensionOptions = [], dateOptions = []) {
    const dimOptions = dimensionOptions.length > 0 ? dimensionOptions : ['选项1', '选项2'];
    const dtOptions = dateOptions.length > 0 ? dateOptions : ['2024.12', '2024.Q4'];
    
    return `
            <div class="chart-filters">
                <div class="filter-wrapper">
                    <button class="filter-unified-btn" onclick="toggleFilterPanel(event)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                        筛选
                        <span class="filter-count" id="filterCount">0</span>
                    </button>
                    <div class="filter-modal" id="filterModal" onclick="(function(e){e.stopPropagation();})(event)">
                        <div class="filter-panel">
                            <div class="filter-panel-header" id="filterPanelHeader">
                                <div class="filter-panel-title">
                                    <div class="filter-panel-drag-handle">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="9" cy="5" r="1"></circle>
                                            <circle cx="9" cy="12" r="1"></circle>
                                            <circle cx="9" cy="19" r="1"></circle>
                                            <circle cx="15" cy="5" r="1"></circle>
                                            <circle cx="15" cy="12" r="1"></circle>
                                            <circle cx="15" cy="19" r="1"></circle>
                                        </svg>
                                    </div>
                                    筛选
                                </div>
                                <button class="filter-panel-close" onclick="closeFilterPanel()">×</button>
                            </div>
                            <div class="filter-panel-body">
                                <div class="filter-dimension collapsed">
                                    <div class="filter-dimension-header" onclick="toggleFilterDimension(this)">
                                        <div class="filter-dimension-title">${dimensionLabel}</div>
                                        <span class="filter-dimension-toggle">▶</span>
                                    </div>
                                    <div class="filter-dimension-content">
                                        <div class="filter-options" id="filterDimension">
${dimOptions.map(opt => `                                            <div class="filter-option" data-value="${opt}" onclick="toggleFilterOption(this, 'dimension', '${opt}')">${opt}</div>`).join('\n')}
                                        </div>
                                    </div>
                                </div>
                                <div class="filter-dimension collapsed">
                                    <div class="filter-dimension-header" onclick="toggleFilterDimension(this)">
                                        <div class="filter-dimension-title">日期</div>
                                        <span class="filter-dimension-toggle">▶</span>
                                    </div>
                                    <div class="filter-dimension-content">
                                        <div class="filter-options" id="filterDate">
${dtOptions.map(opt => `                                            <div class="filter-option" data-value="${opt}" onclick="toggleFilterOption(this, 'date', '${opt}')">${opt}</div>`).join('\n')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-panel-footer">
                                <button class="filter-btn filter-btn-reset" onclick="resetFilters()">重置</button>
                                <button class="filter-btn filter-btn-apply" onclick="applyFilters()">应用</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="filter-summary" id="filterSummary"></div>
            </div>`;
}

function updateChartFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // 跳过已更新的文件
        if (content.includes('filter-unified-btn')) {
            return { updated: false, reason: '已包含统一筛选系统' };
        }
        
        // 1. 添加 unified-filter.js
        if (!content.includes('unified-filter.js')) {
            content = content.replace(
                /<script src="\.\.\/responsive-spec\.js"><\/script>/,
                '<script src="../responsive-spec.js"></script>\n    <script src="../unified-filter.js"></script>'
            );
            modified = true;
        }
        
        // 2. 提取原有选项并替换筛选控件
        const filterPattern = /<div class="chart-filters">[\s\S]*?<\/div>\s*<\/div>/;
        if (filterPattern.test(content)) {
            // 提取选项
            const dimensionMatch = content.match(/<select class="filter-select">[\s\S]*?<\/select>/);
            let dimensionOptions = [];
            let dimensionLabel = '维度';
            
            if (dimensionMatch) {
                const options = dimensionMatch[0].match(/<option>([^<]+)<\/option>/g);
                if (options) {
                    dimensionOptions = options.map(opt => opt.replace(/<\/?option>/g, '').trim());
                    // 从第一个select提取标签
                    const labelMatch = content.match(/按.*?<select/);
                    if (labelMatch) {
                        const labelText = labelMatch[0].replace(/<select.*/, '').replace(/按/, '').trim();
                        if (labelText) dimensionLabel = labelText || dimensionOptions[0] || '维度';
                    }
                }
            }
            
            const dateMatch = content.match(/日期.*?<select class="filter-select">[\s\S]*?<\/select>/);
            let dateOptions = [];
            if (dateMatch) {
                const options = dateMatch[0].match(/<option>([^<]+)<\/option>/g);
                if (options) {
                    dateOptions = options.map(opt => opt.replace(/<\/?option>/g, '').trim());
                }
            }
            
            const newFilterHTML = getUnifiedFilterHTML(dimensionLabel, dimensionOptions, dateOptions);
            content = content.replace(filterPattern, newFilterHTML);
            modified = true;
        }
        
        // 3. 添加初始化代码
        if (!content.includes('initUnifiedFilter')) {
            const initPattern = /(\/\/ 初始化响应式\s*ChartSpec\.init\(\);)/;
            if (initPattern.test(content)) {
                content = content.replace(
                    initPattern,
                    `$1\n\n// 初始化统一筛选系统\ndocument.addEventListener('DOMContentLoaded', function() {\n    initUnifiedFilter({\n        dimensions: [\n            { key: 'dimension', type: 'multi' },\n            { key: 'date', type: 'multi' }\n        ],\n        onApply: function(state) {\n            console.log('筛选已应用:', state);\n        }\n    });\n});`
                );
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            return { updated: true };
        }
        
        return { updated: false, reason: '无需更新' };
    } catch (error) {
        return { updated: false, error: error.message };
    }
}

// 更新所有图表文件
let updatedCount = 0;
let skippedCount = 0;
let errorCount = 0;

chartDirs.forEach(dir => {
    const filePath = path.join(__dirname, dir, 'index.html');
    if (fs.existsSync(filePath)) {
        const result = updateChartFile(filePath);
        if (result.updated) {
            console.log(`✓ 已更新 ${dir}/index.html`);
            updatedCount++;
        } else if (result.error) {
            console.error(`✗ ${dir}/index.html: ${result.error}`);
            errorCount++;
        } else {
            console.log(`- 跳过 ${dir}/index.html: ${result.reason}`);
            skippedCount++;
        }
    } else {
        console.log(`✗ 文件不存在: ${filePath}`);
        errorCount++;
    }
});

console.log(`\n完成！`);
console.log(`✓ 已更新: ${updatedCount} 个文件`);
console.log(`- 跳过: ${skippedCount} 个文件`);
console.log(`✗ 错误: ${errorCount} 个文件`);
