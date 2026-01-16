(function() {
    const navConfig = [
        {
            title: '专题方案',
            items: [
                { id: 'x-axis', name: 'X轴文字优化', path: '/x-axis-test/index.html', icon: '📊' }
            ]
        },
        {
            title: '基础图表',
            items: [
                { id: 'column', name: '柱状图', path: '/01-column/index.html', icon: '📊' },
                { id: 'stacked-column', name: '堆叠柱状图', path: '/02-stacked-column/index.html', icon: '📊' },
                { id: 'bar', name: '条形图', path: '/03-bar/index.html', icon: '📊' },
                { id: 'line', name: '折线图', path: '/04-line/index.html', icon: '📈' },
                { id: 'area', name: '面积图', path: '/05-area/index.html', icon: '📉' }
            ]
        },
        {
            title: '占比图表',
            items: [
                { id: 'pie', name: '饼图', path: '/06-pie/index.html', icon: '🥧' },
                { id: 'pie-zh', name: '饼图 (中文)', path: '/06-pie-zh/index.html', icon: '🥧' },
                { id: 'funnel', name: '漏斗图', path: '/11-funnel/index.html', icon: '🔻' },
                { id: 'treemap', name: '矩形树图', path: '/14-treemap/index.html', icon: '🔲' }
            ]
        },
        {
            title: '统计分布',
            items: [
                { id: 'histogram', name: '直方图', path: '/07-histogram/index.html', icon: '📊' },
                { id: 'scatter', name: '散点图', path: '/08-scatter/index.html', icon: '⚫' },
                { id: 'bubble', name: '气泡图', path: '/09-bubble/index.html', icon: '🫧' },
                { id: 'heatmap', name: '热力图', path: '/16-heatmap/index.html', icon: '🔥' }
            ]
        },
        {
            title: '分析图表',
            items: [
                { id: 'radar', name: '雷达图', path: '/10-radar/index.html', icon: '🕸️' },
                { id: 'pareto', name: '帕累托图', path: '/13-pareto/index.html', icon: '📊' }
            ]
        },
        {
            title: '其他组件',
            items: [
                { id: 'gauge', name: '仪表盘', path: '/12-gauge/index.html', icon: '⏱️' },
                { id: 'indicator', name: '指标卡', path: '/19-indicator/index.html', icon: '🎯' },
                { id: 'wordcloud', name: '词云图', path: '/15-wordcloud/index.html', icon: '☁️' },
                { id: 'map', name: '地图', path: '/17-map/index.html', icon: '🗺️' },
                { id: 'table', name: '表格', path: '/18-table/index.html', icon: '📋' }
            ]
        }
    ];

    function createSidebar() {
        // Find or create layout containers
        let layout = document.querySelector('.app-layout');
        if (!layout) {
            layout = document.createElement('div');
            layout.className = 'app-layout';
            
            const sidebar = document.createElement('aside');
            sidebar.className = 'app-sidebar';
            
            const main = document.createElement('main');
            main.className = 'app-main';
            
            // Move existing body content to main
            while (document.body.firstChild) {
                main.appendChild(document.body.firstChild);
            }
            
            layout.appendChild(sidebar);
            layout.appendChild(main);
            document.body.appendChild(layout);
        }

        const sidebar = document.querySelector('.app-sidebar');
        const currentPath = window.location.pathname;
        
        // Sidebar Header
        const header = document.createElement('div');
        header.style.padding = '32px 24px 16px';
        header.innerHTML = `
            <a href="/index.html" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 10px; margin-bottom: 24px;">
                <div style="width: 32px; height: 32px; background: #0071E3; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">C</div>
                <span style="font-weight: 600; font-size: 17px; letter-spacing: -0.02em;">Chart Spec</span>
            </a>
        `;
        sidebar.appendChild(header);

        const nav = document.createElement('nav');
        nav.className = 'sidebar-nav';

        navConfig.forEach(group => {
            const groupEl = document.createElement('div');
            groupEl.className = 'nav-group';
            
            const title = document.createElement('div');
            title.className = 'nav-group-title';
            title.textContent = group.title;
            groupEl.appendChild(title);

            group.items.forEach(item => {
                const link = document.createElement('a');
                link.className = 'nav-item';
                link.href = item.path;
                link.innerHTML = `
                    <span class="nav-item-text">${item.name}</span>
                `;

                // Active state
                const cleanPath = item.path.replace(/\/index\.html$/, '');
                if (currentPath.includes(cleanPath) && cleanPath !== '') {
                    link.classList.add('active');
                }

                groupEl.appendChild(link);
            });

            nav.appendChild(groupEl);
        });

        sidebar.appendChild(nav);
        
        // Add a back to home at bottom
        const footer = document.createElement('div');
        footer.style.padding = '20px 24px';
        footer.style.marginTop = 'auto';
        footer.innerHTML = `
            <a href="/index.html" class="nav-item" style="background: rgba(0,0,0,0.03); justify-content: center;">
                <span class="nav-item-text">返回首页</span>
            </a>
        `;
        sidebar.appendChild(footer);
        
        // Show body
        document.body.classList.add('nav-ready');
    }

    // Initialize
    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createSidebar);
        } else {
            createSidebar();
        }
    }
})();
