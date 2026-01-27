/**
 * 批量更新所有图表文件，添加统一筛选系统
 * 使用方法: node batch-update-filters.js
 */

const fs = require('fs');
const path = require('path');

// 需要更新的图表目录
const chartDirs = [
    '02-stacked-column',
    '03-bar',
    '04-line',
    '05-area',
    '07-histogram',
    '08-scatter',
    '09-bubble',
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

// 统一的筛选HTML模板
function getUnifiedFilterHTML(dimensionOptions = ['维度1', '维度2'], dateOptions = ['2024.12', '2024.Q4']) {
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
                    <!-- 统一筛选面板 -->
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
                                        <div class="filter-dimension-title">维度</div>
                                        <span class="filter-dimension-toggle">▶</span>
                                    </div>
                                    <div class="filter-dimension-content">
                                        <div class="filter-options" id="filterDimension">
${dimensionOptions.map(opt => `                                            <div class="filter-option" data-value="${opt}" onclick="toggleFilterOption(this, 'dimension', '${opt}')">${opt}</div>`).join('\n')}
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
${dateOptions.map(opt => `                                            <div class="filter-option" data-value="${opt}" onclick="toggleFilterOption(this, 'date', '${opt}')">${opt}</div>`).join('\n')}
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
                <!-- 筛选摘要 -->
                <div class="filter-summary" id="filterSummary"></div>
            </div>`;
}

function updateChartFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // 1. 检查并添加 unified-filter.js
        if (!content.includes('unified-filter.js')) {
            content = content.replace(
                /<script src="\.\.\/responsive-spec\.js"><\/script>/,
                '<script src="../responsive-spec.js"></script>\n    <script src="../unified-filter.js"></script>'
            );
            modified = true;
        }
        
        // 2. 替换旧的筛选控件
        const oldFilterPattern = /<div class="chart-filters">[\s\S]*?<\/div>\s*<\/div>/;
        if (oldFilterPattern.test(content) && !content.includes('filter-unified-btn')) {
            // 提取原有的选项
            const dimensionMatch = content.match(/<option>([^<]+)<\/option>/g);
            const dateMatch = content.match(/日期.*?<option>([^<]+)<\/option>/g);
            
            let dimensionOptions = ['选项1', '选项2'];
            let dateOptions = ['2024.12', '2024.Q4'];
            
            if (dimensionMatch && dimensionMatch.length > 0) {
                dimensionOptions = dimensionMatch.slice(0, 4).map(m => m.replace(/<\/?option>/g, '').trim());
            }
            if (dateMatch && dateMatch.length > 0) {
                dateOptions = dateMatch.map(m => m.replace(/<\/?option>/g, '').replace(/日期.*?/, '').trim()).slice(0, 4);
            }
            
            const newFilterHTML = getUnifiedFilterHTML(dimensionOptions, dateOptions);
            content = content.replace(oldFilterPattern, newFilterHTML);
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
            console.log(`✓ 已更新 ${filePath}`);
            return true;
        } else {
            console.log(`- 跳过 ${filePath} (已包含统一筛选系统)`);
            return false;
        }
    } catch (error) {
        console.error(`✗ 更新 ${filePath} 时出错:`, error.message);
        return false;
    }
}

// 更新所有图表文件
let updatedCount = 0;
chartDirs.forEach(dir => {
    const filePath = path.join(__dirname, dir, 'index.html');
    if (fs.existsSync(filePath)) {
        if (updateChartFile(filePath)) {
            updatedCount++;
        }
    } else {
        console.log(`✗ 文件不存在: ${filePath}`);
    }
});

console.log(`\n完成！共更新 ${updatedCount} 个文件。`);
