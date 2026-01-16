/**
 * Chart Spec - 统一导航组件
 * Apple-style Navigation System
 */

const ChartNav = {
    // 图表数据配置
    charts: {
        special: {
            title: '专题方案',
            icon: '✨',
            items: [
                { id: 'x-axis', name: 'X轴文字智能处理', path: 'X轴文本测试/index.html', icon: '📊', status: 'ready' }
            ]
        },
        basic: {
            title: '基础图表',
            icon: '📊',
            items: [
                { id: 'column', name: '柱状图', en: 'Column', path: '01-column/index.html', icon: '📊', status: 'ready' },
                { id: 'stacked-column', name: '堆叠柱状图', en: 'Stacked Column', path: '02-stacked-column/index.html', icon: '📊', status: 'ready' },
                { id: 'bar', name: '条形图', en: 'Bar', path: '03-bar/index.html', icon: '📊', status: 'ready' },
                { id: 'line', name: '折线图', en: 'Line', path: '04-line/index.html', icon: '📈', status: 'ready' },
                { id: 'area', name: '面积图', en: 'Area', path: '05-面积图/index.html', icon: '📉', status: 'ready' }
            ]
        },
        proportion: {
            title: '占比图表',
            icon: '🥧',
            items: [
                { id: 'pie', name: '饼图', en: 'Pie', path: '06-pie/index.html', icon: '🥧', status: 'ready' },
                { id: 'funnel', name: '漏斗图', en: 'Funnel', path: '11-漏斗图/index.html', icon: '🔻', status: 'ready' },
                { id: 'treemap', name: '矩形树图', en: 'Treemap', path: '14-矩形树图/index.html', icon: '🔲', status: 'ready' }
            ]
        },
        statistical: {
            title: '统计分布',
            icon: '📐',
            items: [
                { id: 'histogram', name: '直方图', en: 'Histogram', path: '07-直方图/index.html', icon: '📊', status: 'ready' },
                { id: 'scatter', name: '散点图', en: 'Scatter', path: '08-散点图/index.html', icon: '⚫', status: 'ready' },
                { id: 'bubble', name: '气泡图', en: 'Bubble', path: '09-气泡图/index.html', icon: '🫧', status: 'ready' },
                { id: 'heatmap', name: '热力图', en: 'Heatmap', path: '16-热力图/index.html', icon: '🔥', status: 'ready' }
            ]
        },
        analysis: {
            title: '分析图表',
            icon: '📡',
            items: [
                { id: 'radar', name: '雷达图', en: 'Radar', path: '10-雷达图/index.html', icon: '🕸️', status: 'ready' },
                { id: 'pareto', name: '帕累托图', en: 'Pareto', path: '13-帕累托图/index.html', icon: '📊', status: 'ready' }
            ]
        },
        other: {
            title: '其他组件',
            icon: '🎯',
            items: [
                { id: 'gauge', name: '仪表盘', en: 'Gauge', path: '12-仪表盘/index.html', icon: '⏱️', status: 'ready' },
                { id: 'indicator', name: '指标卡', en: 'Indicator', path: '19-指标卡/index.html', icon: '🎯', status: 'ready' },
                { id: 'wordcloud', name: '词云图', en: 'WordCloud', path: '15-词云图/index.html', icon: '☁️', status: 'ready' },
                { id: 'map', name: '地图', en: 'Map', path: '17-地图/index.html', icon: '🗺️', status: 'ready' },
                { id: 'table', name: '表格', en: 'Table', path: '18-表格/index.html', icon: '📋', status: 'ready' }
            ]
        }
    },

    // 获取基础路径
    getBasePath() {
        const path = window.location.pathname;
        const parts = path.split('/');
        const chartsIndex = parts.findIndex(p => p === 'charts');
        if (chartsIndex === -1) return './';
        
        const depth = parts.length - chartsIndex - 2;
        if (depth <= 0) return './';
        return '../'.repeat(depth);
    },

    // 获取当前页面ID
    getCurrentPageId() {
        const path = window.location.pathname;
        for (const category of Object.values(this.charts)) {
            for (const item of category.items) {
                if (path.includes(item.path.replace('index.html', ''))) {
                    return item.id;
                }
            }
        }
        return null;
    },

    // 渲染侧边栏
    renderSidebar() {
        const basePath = this.getBasePath();
        const currentId = this.getCurrentPageId();
        const isHome = window.location.pathname.endsWith('charts/index.html') || 
                       window.location.pathname.endsWith('charts/');

        const categoryIcons = {
            special: 'gradient',
            basic: 'blue',
            proportion: 'yellow',
            statistical: 'green',
            analysis: 'red',
            other: 'purple'
        };

        let navHTML = '';
        
        for (const [key, category] of Object.entries(this.charts)) {
            navHTML += `
                <div class="nav-section">
                    <div class="nav-section-title">${category.title}</div>
                    ${category.items.map(item => `
                        <a href="${basePath}${item.path}" 
                           class="nav-item ${item.id === currentId ? 'active' : ''}"
                           data-chart-id="${item.id}">
                            <span class="nav-item-icon ${categoryIcons[key]}">${item.icon}</span>
                            <span class="nav-item-text">${item.name}</span>
                            ${item.status === 'ready' ? '<span class="nav-item-badge">完成</span>' : ''}
                        </a>
                    `).join('')}
                </div>
            `;
        }

        const sidebarHTML = `
            <div class="app-sidebar" id="appSidebar">
                <div class="sidebar-header">
                    <a href="${basePath}index.html" class="sidebar-logo">
                        <div class="sidebar-logo-icon" style="background: #3B82F6; font-size: 14px; font-weight: 700;">C</div>
                        <div>
                            <div class="sidebar-logo-text">Chart Spec</div>
                            <div class="sidebar-logo-version">设计规范 v2.0</div>
                        </div>
                    </a>
                </div>
                <div class="sidebar-search">
                    <div class="search-input-wrapper">
                        <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input type="text" class="search-input" placeholder="搜索图表..." id="navSearchInput">
                    </div>
                </div>
                <nav class="sidebar-nav" id="sidebarNav">
                    <div class="nav-section">
                        <a href="${basePath}index.html" class="nav-item ${isHome ? 'active' : ''}">
                            <span class="nav-item-icon blue">🏠</span>
                            <span class="nav-item-text">概览</span>
                        </a>
                    </div>
                    ${navHTML}
                </nav>
            </div>
            <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle Sidebar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12h18M3 6h18M3 18h18"></path>
                </svg>
            </button>
        `;

        return sidebarHTML;
    },

    // 初始化导航
    init() {
        // 注入侧边栏
        const sidebarContainer = document.createElement('div');
        sidebarContainer.innerHTML = this.renderSidebar();
        document.body.insertBefore(sidebarContainer.firstElementChild, document.body.firstChild);
        
        // 添加移动端切换按钮样式
        const toggleButton = document.getElementById('sidebarToggle');
        if (toggleButton) {
            this.addToggleButtonStyles();
        }

        // 包装主内容
        this.wrapMainContent();

        // 绑定事件
        this.bindEvents();

        // 处理页面过渡动画
        this.handlePageTransition();
    },

    // 添加切换按钮样式
    addToggleButtonStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .sidebar-toggle {
                display: none;
                position: fixed;
                top: 16px;
                left: 16px;
                z-index: 1000;
                width: 44px;
                height: 44px;
                background: var(--bg-glass);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid var(--border-light);
                border-radius: 12px;
                cursor: pointer;
                align-items: center;
                justify-content: center;
                color: var(--text-primary);
                transition: all var(--transition-fast);
            }
            
            .sidebar-toggle:hover {
                background: var(--bg-primary);
                box-shadow: var(--shadow-md);
            }
            
            @media (max-width: 1024px) {
                .sidebar-toggle {
                    display: flex;
                }
            }
            
            .sidebar-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.3);
                z-index: 99;
                opacity: 0;
                transition: opacity var(--transition-normal);
            }
            
            .sidebar-overlay.show {
                display: block;
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    },

    // 包装主内容
    wrapMainContent() {
        const body = document.body;
        const sidebar = document.getElementById('appSidebar');
        const toggle = document.getElementById('sidebarToggle');
        
        // 获取所有非侧边栏内容
        const children = Array.from(body.children).filter(child => 
            child !== sidebar && child !== toggle && child.tagName !== 'SCRIPT'
        );
        
        // 创建主内容容器
        const mainWrapper = document.createElement('div');
        mainWrapper.className = 'app-main';
        
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'app-content';
        
        children.forEach(child => {
            contentWrapper.appendChild(child);
        });
        
        mainWrapper.appendChild(contentWrapper);
        body.appendChild(mainWrapper);
    },

    // 绑定事件
    bindEvents() {
        // 搜索功能
        const searchInput = document.getElementById('navSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // 移动端侧边栏切换
        const toggleBtn = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('appSidebar');
        
        if (toggleBtn && sidebar) {
            // 创建遮罩层
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
            
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                overlay.classList.toggle('show');
            });
            
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('show');
            });
        }

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K 聚焦搜索
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput?.focus();
            }
            // Escape 关闭移动端侧边栏
            if (e.key === 'Escape') {
                sidebar?.classList.remove('open');
                document.querySelector('.sidebar-overlay')?.classList.remove('show');
            }
        });

        // 链接预加载
        document.querySelectorAll('.nav-item[href]').forEach(link => {
            link.addEventListener('mouseenter', () => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#')) {
                    const preload = document.createElement('link');
                    preload.rel = 'prefetch';
                    preload.href = href;
                    document.head.appendChild(preload);
                }
            });
        });
    },

    // 搜索处理
    handleSearch(query) {
        const navItems = document.querySelectorAll('.nav-item[data-chart-id]');
        const sections = document.querySelectorAll('.nav-section');
        
        query = query.toLowerCase().trim();
        
        navItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = !query || text.includes(query);
            item.style.display = matches ? '' : 'none';
        });
        
        // 隐藏空的分类
        sections.forEach(section => {
            const visibleItems = section.querySelectorAll('.nav-item[data-chart-id]:not([style*="display: none"])');
            const title = section.querySelector('.nav-section-title');
            if (title) {
                title.style.display = visibleItems.length > 0 || !query ? '' : 'none';
            }
        });
    },

    // 页面过渡动画
    handlePageTransition() {
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(10px)';
        document.body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        });

        // 页面离开动画
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('javascript')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.body.style.opacity = '0';
                    document.body.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 200);
                });
            }
        });
    },

    // 获取前一个/后一个图表
    getAdjacentCharts() {
        const currentId = this.getCurrentPageId();
        if (!currentId) return { prev: null, next: null };
        
        const allItems = [];
        for (const category of Object.values(this.charts)) {
            allItems.push(...category.items);
        }
        
        const currentIndex = allItems.findIndex(item => item.id === currentId);
        
        return {
            prev: currentIndex > 0 ? allItems[currentIndex - 1] : null,
            next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null
        };
    },

    // 渲染底部导航
    renderBottomNav() {
        const { prev, next } = this.getAdjacentCharts();
        const basePath = this.getBasePath();
        
        if (!prev && !next) return '';
        
        return `
            <div class="bottom-nav">
                ${prev ? `
                    <a href="${basePath}${prev.path}" class="bottom-nav-item prev">
                        <span class="bottom-nav-arrow">←</span>
                        <div class="bottom-nav-content">
                            <span class="bottom-nav-label">上一个</span>
                            <span class="bottom-nav-title">${prev.name}</span>
                        </div>
                    </a>
                ` : '<div></div>'}
                ${next ? `
                    <a href="${basePath}${next.path}" class="bottom-nav-item next">
                        <div class="bottom-nav-content">
                            <span class="bottom-nav-label">下一个</span>
                            <span class="bottom-nav-title">${next.name}</span>
                        </div>
                        <span class="bottom-nav-arrow">→</span>
                    </a>
                ` : '<div></div>'}
            </div>
        `;
    }
};

// 底部导航样式
const bottomNavStyles = `
    .bottom-nav {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-top: 48px;
        padding-top: 32px;
        border-top: 1px solid var(--border-light);
    }
    
    .bottom-nav-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px 24px;
        background: var(--bg-primary);
        border: 1px solid var(--border-light);
        border-radius: var(--border-radius-lg);
        text-decoration: none;
        color: inherit;
        transition: all var(--transition-normal);
        flex: 1;
        max-width: 300px;
    }
    
    .bottom-nav-item:hover {
        border-color: var(--primary);
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
    }
    
    .bottom-nav-item.prev {
        margin-right: auto;
    }
    
    .bottom-nav-item.next {
        margin-left: auto;
        text-align: right;
        flex-direction: row-reverse;
    }
    
    .bottom-nav-arrow {
        font-size: 20px;
        color: var(--primary);
        font-weight: 300;
    }
    
    .bottom-nav-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    
    .bottom-nav-label {
        font-size: 12px;
        color: var(--text-tertiary);
    }
    
    .bottom-nav-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--text-primary);
    }
    
    @media (max-width: 640px) {
        .bottom-nav {
            flex-direction: column;
        }
        
        .bottom-nav-item {
            max-width: none;
        }
        
        .bottom-nav-item.next {
            flex-direction: row;
            text-align: left;
        }
    }
`;

// 浮动返回按钮样式
const floatingBackStyles = `
    .floating-back-btn {
        position: fixed;
        bottom: 32px;
        right: 32px;
        z-index: 999;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 24px;
        background: #3B82F6;
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
        font-family: inherit;
    }
    
    .floating-back-btn:hover {
        background: #2563EB;
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 32px rgba(59, 130, 246, 0.45);
    }
    
    .floating-back-btn:active {
        transform: translateY(-2px) scale(0.98);
    }
    
    .floating-back-btn .icon {
        font-size: 18px;
        transition: transform 0.3s ease;
    }
    
    .floating-back-btn:hover .icon {
        transform: translateX(-4px);
    }
    
    @media (max-width: 768px) {
        .floating-back-btn {
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            font-size: 13px;
        }
        
        .floating-back-btn .text {
            display: none;
        }
        
        .floating-back-btn {
            border-radius: 50%;
            padding: 16px;
        }
    }
`;

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加底部导航样式
    const style = document.createElement('style');
    style.textContent = bottomNavStyles + floatingBackStyles;
    document.head.appendChild(style);
    
    // 初始化导航
    ChartNav.init();
    
    // 如果不是首页，添加底部导航和浮动返回按钮
    const isHome = window.location.pathname.endsWith('charts/index.html') || 
                   window.location.pathname.endsWith('charts/');
    if (!isHome) {
        const content = document.querySelector('.app-content');
        if (content) {
            content.insertAdjacentHTML('beforeend', ChartNav.renderBottomNav());
        }
        
        // 添加浮动返回按钮
        const basePath = ChartNav.getBasePath();
        const floatingBtn = document.createElement('a');
        floatingBtn.className = 'floating-back-btn';
        floatingBtn.href = basePath + 'index.html';
        floatingBtn.innerHTML = '<span class="icon">←</span><span class="text">返回首页</span>';
        document.body.appendChild(floatingBtn);
    }
});

// 导出供外部使用
window.ChartNav = ChartNav;
