/**
 * 统一筛选系统 - 适用于所有图表
 * 不遮挡图表，可拖拽，统一设计
 */

// 筛选状态管理
let filterState = {};
let hasBeenDragged = false;

// 初始化统一筛选系统
function initUnifiedFilter(config) {
    // config: { dimensions: [...], onApply: function, onReset: function }
    filterState = {};
    
    // 初始化筛选状态
    if (config && config.dimensions) {
        config.dimensions.forEach(dim => {
            if (dim.type === 'select' || dim.type === 'multi') {
                filterState[dim.key] = [];
            } else if (dim.type === 'range') {
                filterState[dim.key] = { min: null, max: null };
            }
        });
    }
    
    // 绑定事件
    bindFilterEvents();
}

// 绑定筛选事件
function bindFilterEvents() {
    // 点击外部关闭面板
    document.addEventListener('click', function(e) {
        const modal = document.querySelector('.filter-modal');
        const wrapper = document.querySelector('.filter-wrapper');
        const btn = document.querySelector('.filter-unified-btn');
        
        if (modal && modal.classList.contains('show')) {
            if (!modal.contains(e.target) && !btn && !btn.contains(e.target)) {
                closeFilterPanel();
            }
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeFilterPanel();
        }
    });
    
    // 窗口调整大小时重新定位
    window.addEventListener('resize', function() {
        const modal = document.querySelector('.filter-modal');
        if (modal && modal.classList.contains('show') && !hasBeenDragged) {
            repositionFilterPanel();
        }
    });
}

// 切换筛选面板
function toggleFilterPanel(event) {
    if (event) {
        event.stopPropagation();
    }
    
    const modal = document.querySelector('.filter-modal');
    const btn = document.querySelector('.filter-unified-btn');
    
    if (!modal || !btn) return;
    
    if (modal.classList.contains('show')) {
        closeFilterPanel();
    } else {
        openFilterPanel();
    }
}

// 打开筛选面板
function openFilterPanel() {
    const modal = document.querySelector('.filter-modal');
    const btn = document.querySelector('.filter-unified-btn');
    
    if (!modal || !btn) return;
    
    // 计算位置 - 紧贴按钮，不遮挡图表
    repositionFilterPanel();
    
    modal.classList.add('show');
    btn.classList.add('active');
    
    // 初始化拖拽
    initDragFilter();
}

// 重新定位筛选面板
function repositionFilterPanel() {
    const modal = document.querySelector('.filter-modal');
    const btn = document.querySelector('.filter-unified-btn');
    
    if (!modal || !btn) return;
    
    const rect = btn.getBoundingClientRect();
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        modal.style.top = rect.bottom + 'px';
        modal.style.left = '12px';
        modal.style.right = 'auto';
    } else {
        modal.style.top = rect.bottom + 'px';
        modal.style.right = (window.innerWidth - rect.right) + 'px';
        modal.style.left = 'auto';
    }
    
    modal.classList.add('positioned');
}

// 关闭筛选面板
function closeFilterPanel() {
    const modal = document.querySelector('.filter-modal');
    const btn = document.querySelector('.filter-unified-btn');
    
    if (modal) {
        modal.classList.remove('show', 'positioned');
    }
    if (btn) {
        btn.classList.remove('active');
    }
}

// 切换筛选维度展开/折叠
function toggleFilterDimension(header) {
    const dimension = header.closest('.filter-dimension');
    if (dimension) {
        dimension.classList.toggle('collapsed');
        const toggle = header.querySelector('.filter-dimension-toggle');
        if (toggle) {
            toggle.textContent = dimension.classList.contains('collapsed') ? '▶' : '▼';
        }
    }
}

// 切换筛选选项
function toggleFilterOption(element, dimension, value) {
    element.classList.toggle('selected');
    
    if (element.classList.contains('selected')) {
        if (!filterState[dimension]) {
            filterState[dimension] = [];
        }
        if (!filterState[dimension].includes(value)) {
            filterState[dimension].push(value);
        }
    } else {
        filterState[dimension] = filterState[dimension].filter(v => v !== value);
    }
    
    updateFilterUI();
}

// 应用筛选
function applyFilters() {
    // 读取范围输入值
    const rangeInputs = document.querySelectorAll('.filter-range-input');
    rangeInputs.forEach(input => {
        const id = input.id;
        if (id) {
            const match = id.match(/(\w+)(Min|Max)/);
            if (match) {
                const dimension = match[1];
                const type = match[2];
                if (!filterState[dimension]) {
                    filterState[dimension] = { min: null, max: null };
                }
                filterState[dimension][type.toLowerCase()] = input.value ? parseFloat(input.value) : null;
            }
        }
    });
    
    updateFilterUI();
    closeFilterPanel();
    
    // 触发自定义应用回调
    if (window.onFilterApply) {
        window.onFilterApply(filterState);
    }
}

// 重置筛选
function resetFilters() {
    // 清除所有选中状态
    document.querySelectorAll('.filter-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // 清空范围输入
    document.querySelectorAll('.filter-range-input').forEach(input => {
        input.value = '';
    });
    
    // 重置状态
    Object.keys(filterState).forEach(key => {
        if (Array.isArray(filterState[key])) {
            filterState[key] = [];
        } else if (typeof filterState[key] === 'object') {
            filterState[key] = { min: null, max: null };
        }
    });
    
    updateFilterUI();
}

// 清除单个维度
function clearFilterDimension(dimension) {
    if (Array.isArray(filterState[dimension])) {
        filterState[dimension] = [];
        document.querySelectorAll(`#filter${dimension.charAt(0).toUpperCase() + dimension.slice(1)} .filter-option`).forEach(opt => {
            opt.classList.remove('selected');
        });
    } else if (typeof filterState[dimension] === 'object') {
        filterState[dimension] = { min: null, max: null };
        const minInput = document.getElementById(`${dimension}Min`);
        const maxInput = document.getElementById(`${dimension}Max`);
        if (minInput) minInput.value = '';
        if (maxInput) maxInput.value = '';
    }
    
    updateFilterUI();
    
    // 触发自定义应用回调
    if (window.onFilterApply) {
        window.onFilterApply(filterState);
    }
}

// 更新筛选UI
function updateFilterUI() {
    const filterSummary = document.querySelector('.filter-summary');
    const filterCount = document.querySelector('.filter-count');
    let count = 0;
    let summaryHTML = '';
    
    Object.keys(filterState).forEach(dimension => {
        const value = filterState[dimension];
        
        if (Array.isArray(value) && value.length > 0) {
            count += value.length;
            const labels = {
                'region': '地区',
                'change': '环比',
                'department': '部门',
                'category': '类别',
                'brand': '品牌',
                'channel': '渠道'
            };
            const label = labels[dimension] || dimension;
            summaryHTML += `<div class="filter-summary-item">
                <span class="filter-summary-label">${label}:</span>
                <span class="filter-summary-value">${value.join('、')}</span>
                <span class="filter-summary-clear" onclick="clearFilterDimension('${dimension}')" title="清除${label}筛选">×</span>
            </div>`;
        } else if (typeof value === 'object' && (value.min !== null || value.max !== null)) {
            count++;
            const labels = {
                'sales': '销售额',
                'completion': '完成率',
                'progress': '进度',
                'date': '日期'
            };
            const label = labels[dimension] || dimension;
            const min = value.min !== null ? value.min : '';
            const max = value.max !== null ? value.max : '';
            const range = min && max ? `${min}-${max}` : min || max;
            summaryHTML += `<div class="filter-summary-item">
                <span class="filter-summary-label">${label}:</span>
                <span class="filter-summary-value">${range}</span>
                <span class="filter-summary-clear" onclick="clearFilterDimension('${dimension}')" title="清除${label}筛选">×</span>
            </div>`;
        }
    });
    
    if (filterSummary) {
        if (summaryHTML) {
            filterSummary.innerHTML = summaryHTML;
            filterSummary.classList.add('has-filters');
        } else {
            filterSummary.innerHTML = '';
            filterSummary.classList.remove('has-filters');
        }
    }
    
    if (filterCount) {
        filterCount.textContent = count;
    }
    
    const filterBtn = document.querySelector('.filter-unified-btn');
    if (filterBtn) {
        if (count > 0) {
            filterBtn.classList.add('active');
        } else {
            filterBtn.classList.remove('active');
        }
    }
}

// 拖拽功能
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let panelStartX = 0;
let panelStartY = 0;
let rafId = null;

function initDragFilter() {
    const header = document.querySelector('.filter-panel-header');
    const modal = document.querySelector('.filter-modal');
    
    if (!header || !modal) return;
    
    // 移除旧的监听器
    header.removeEventListener('mousedown', startDrag);
    header.removeEventListener('touchstart', startDragTouch);
    
    // 添加新的监听器
    header.addEventListener('mousedown', startDrag, { passive: false });
    header.addEventListener('touchstart', startDragTouch, { passive: false });
    
    function startDrag(e) {
        if (e.target.closest('.filter-panel-close') || 
            e.target.closest('.filter-dimension-header') ||
            e.target.closest('.filter-option') ||
            e.target.closest('.filter-range-input')) {
            return;
        }
        
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        
        const rect = modal.getBoundingClientRect();
        panelStartX = rect.left;
        panelStartY = rect.top;
        
        modal.style.transition = 'none';
        modal.style.cursor = 'grabbing';
        header.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        
        document.addEventListener('mousemove', onDrag, { passive: false, capture: true });
        document.addEventListener('mouseup', stopDrag, { capture: true });
        e.preventDefault();
        e.stopPropagation();
    }
    
    function startDragTouch(e) {
        if (e.target.closest('.filter-panel-close') || 
            e.target.closest('.filter-dimension-header') ||
            e.target.closest('.filter-option') ||
            e.target.closest('.filter-range-input')) {
            return;
        }
        
        const touch = e.touches[0];
        if (!touch) return;
        
        isDragging = true;
        dragStartX = touch.clientX;
        dragStartY = touch.clientY;
        
        const rect = modal.getBoundingClientRect();
        panelStartX = rect.left;
        panelStartY = rect.top;
        
        modal.style.transition = 'none';
        modal.style.cursor = 'grabbing';
        header.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        
        document.addEventListener('touchmove', onDragTouch, { passive: false, capture: true });
        document.addEventListener('touchend', stopDrag, { capture: true });
        e.preventDefault();
        e.stopPropagation();
    }
    
    function onDrag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        
        rafId = requestAnimationFrame(() => {
            const deltaX = e.clientX - dragStartX;
            const deltaY = e.clientY - dragStartY;
            
            const newX = panelStartX + deltaX;
            const newY = panelStartY + deltaY;
            
            const maxX = window.innerWidth - modal.offsetWidth;
            const maxY = window.innerHeight - modal.offsetHeight;
            
            modal.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
            modal.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
            modal.style.right = 'auto';
            
            hasBeenDragged = true;
        });
    }
    
    function onDragTouch(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const touch = e.touches[0];
        if (!touch) return;
        
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        
        rafId = requestAnimationFrame(() => {
            const deltaX = touch.clientX - dragStartX;
            const deltaY = touch.clientY - dragStartY;
            
            const newX = panelStartX + deltaX;
            const newY = panelStartY + deltaY;
            
            const maxX = window.innerWidth - modal.offsetWidth;
            const maxY = window.innerHeight - modal.offsetHeight;
            
            modal.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
            modal.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
            modal.style.right = 'auto';
            
            hasBeenDragged = true;
        });
    }
    
    function stopDrag() {
        if (isDragging) {
            isDragging = false;
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            modal.style.transition = '';
            modal.style.cursor = '';
            header.style.cursor = 'move';
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', onDrag, { capture: true });
            document.removeEventListener('mouseup', stopDrag, { capture: true });
            document.removeEventListener('touchmove', onDragTouch, { capture: true });
            document.removeEventListener('touchend', stopDrag, { capture: true });
        }
    }
}

// 导出函数供全局使用
window.toggleFilterPanel = toggleFilterPanel;
window.openFilterPanel = openFilterPanel;
window.closeFilterPanel = closeFilterPanel;
window.toggleFilterDimension = toggleFilterDimension;
window.toggleFilterOption = toggleFilterOption;
window.applyFilters = applyFilters;
window.resetFilters = resetFilters;
window.clearFilterDimension = clearFilterDimension;
window.initUnifiedFilter = initUnifiedFilter;
