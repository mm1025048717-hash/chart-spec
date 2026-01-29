/**
 * 问答演示 - 所有图表页复用
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
        modal.innerHTML = '<div class="qa-title">问答案例</div>' +
            '<div class="qa-question" id="qaDemoQuestion"></div>' +
            '<div class="qa-answer" id="qaDemoAnswer"></div>' +
            '<button type="button" class="qa-close" onclick="closeQaDemo()">关闭</button>';
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
    }
    window.showQaDemo = function(question, answer) {
        ensureModal();
        var q = document.getElementById('qaDemoQuestion');
        var a = document.getElementById('qaDemoAnswer');
        if (q) q.textContent = '问：' + (question || '');
        if (a) a.textContent = '答：' + (answer || '');
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
