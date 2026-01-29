/**
 * 问答演示 - 所有图表页复用 - ChatBI风格
 * 提供 showQaDemo(question, answer) 与全局弹窗 DOM
 */
(function() {
    function ensureModal() {
        if (document.getElementById('qaDemoOverlay')) return;
        var overlay = document.createElement('div');
        overlay.className = 'qa-demo-overlay';
        overlay.id = 'qaDemoOverlay';
        overlay.onclick = closeQaDemo;
        var modal = document.createElement('div');
        modal.className = 'qa-demo-modal';
        modal.id = 'qaDemoModal';
        modal.innerHTML = '<div class="qa-header">' +
            '<div class="qa-title">问答案例</div>' +
            '<button type="button" class="qa-close-btn" onclick="closeQaDemo()">×</button>' +
            '</div>' +
            '<div class="qa-body">' +
            '<div class="qa-message">' +
            '<div class="qa-question" id="qaDemoQuestion"></div>' +
            '<div class="qa-answer" id="qaDemoAnswer"></div>' +
            '</div>' +
            '</div>';
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
    }
    function highlightKeywords(text) {
        // 高亮关键词：数值、百分比、操作词等
        return text
            .replace(/(¥[\d,]+(?:\.\d+)?[万千百十]?[元]?)/g, '<span class="qa-highlight">$1</span>')
            .replace(/([\d,]+(?:\.\d+)?%)/g, '<span class="qa-highlight">$1</span>')
            .replace(/(「[^」]+」)/g, '<span class="qa-highlight">$1</span>');
    }
    window.showQaDemo = function(question, answer) {
        ensureModal();
        var q = document.getElementById('qaDemoQuestion');
        var a = document.getElementById('qaDemoAnswer');
        if (q) {
            q.innerHTML = (question || '').replace(/^问：?/, '');
        }
        if (a) {
            var answerText = (answer || '').replace(/^答：?/, '');
            a.innerHTML = highlightKeywords(answerText);
        }
        var o = document.getElementById('qaDemoOverlay');
        var m = document.getElementById('qaDemoModal');
        if (o) o.classList.add('show');
        if (m) m.classList.add('show');
    };
    window.closeQaDemo = function() {
        var o = document.getElementById('qaDemoOverlay');
        var m = document.getElementById('qaDemoModal');
        if (o) o.classList.remove('show');
        if (m) m.classList.remove('show');
    };
})();