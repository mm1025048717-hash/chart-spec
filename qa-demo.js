/**
 * 问答演示 - 真正交互式 ChatBI，回答可展示对应卡片/图表
 * showQaDemo(question, answer [, morePairs [, options]])
 * options: { cardSelector: 'CSS选择器', cardHtml: 'HTML字符串' }
 */
(function() {
    var presetPairs = [];
    var currentFirstAnswer = '';
    var currentCardContent = null;

    function ensureModal() {
        if (document.getElementById('qaDemoOverlay')) return;
        var overlay = document.createElement('div');
        overlay.className = 'qa-demo-overlay';
        overlay.id = 'qaDemoOverlay';
        overlay.onclick = closeQaDemo;
        var modal = document.createElement('div');
        modal.className = 'qa-demo-modal';
        modal.id = 'qaDemoModal';
        modal.onclick = function(e) { e.stopPropagation(); };
        modal.innerHTML =
            '<div class="qa-header">' +
                '<div class="qa-title">问答演示 · 多轮对话</div>' +
                '<button type="button" class="qa-close-btn" onclick="closeQaDemo()">×</button>' +
            '</div>' +
            '<div class="qa-chat-list" id="qaChatList"></div>' +
            '<div class="qa-input-area">' +
                '<textarea class="qa-input" id="qaInput" placeholder="输入问题，例如：转化率怎么样？" rows="1"></textarea>' +
                '<button type="button" class="qa-send-btn" id="qaSendBtn">发送</button>' +
            '</div>';
        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        var input = document.getElementById('qaInput');
        var sendBtn = document.getElementById('qaSendBtn');
        if (input && sendBtn) {
            sendBtn.onclick = function() { sendUserMessage(); };
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendUserMessage();
                }
            });
        }
    }

    function highlightKeywords(text) {
        if (!text) return '';
        var s = String(text)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return s
            .replace(/(¥[\d,]+(?:\.\d+)?[万千百十]?[元]?)/g, '<span class="qa-highlight">$1</span>')
            .replace(/([\d,]+(?:\.\d+)?%)/g, '<span class="qa-highlight">$1</span>')
            .replace(/(「[^」]+」)/g, '<span class="qa-highlight">$1</span>');
    }

    function appendMessage(role, text, cardContent) {
        var list = document.getElementById('qaChatList');
        if (!list) return;
        var wrap = document.createElement('div');
        wrap.className = 'qa-message';
        var el = document.createElement('div');
        el.className = role === 'question' ? 'qa-question' : 'qa-answer';
        if (role === 'question') {
            el.textContent = text;
        } else {
            var inner = document.createElement('div');
            inner.className = 'qa-answer-inner';
            inner.innerHTML = '<div class="qa-answer-text">' + highlightKeywords(text) + '</div>';
            if (cardContent) {
                var cardWrap = document.createElement('div');
                cardWrap.className = 'qa-answer-card';
                if (typeof cardContent === 'string') {
                    cardWrap.innerHTML = cardContent;
                } else if (cardContent && cardContent.nodeType === 1) {
                    cardWrap.appendChild(cardContent);
                }
                inner.appendChild(cardWrap);
            }
            el.appendChild(inner);
        }
        wrap.appendChild(el);
        list.appendChild(wrap);
        list.scrollTop = list.scrollHeight;
    }

    function cloneCard(selector) {
        var el = document.querySelector(selector);
        if (!el) return null;
        var clone = el.cloneNode(true);
        clone.classList.add('qa-demo-card-clone');
        return clone;
    }

    function findAnswer(userText) {
        var t = (userText || '').trim().toLowerCase();
        if (!t) return null;
        for (var i = 0; i < presetPairs.length; i++) {
            var q = (presetPairs[i].q || '').toLowerCase();
            if (q && (t.indexOf(q) !== -1 || q.indexOf(t) !== -1))
                return presetPairs[i].a;
        }
        if (currentFirstAnswer && (t.indexOf('转化') !== -1 || t.indexOf('销售额') !== -1 || t.indexOf('累计') !== -1 || t.indexOf('环比') !== -1 || t.indexOf('同比') !== -1))
            return currentFirstAnswer;
        return null;
    }

    function sendUserMessage() {
        var input = document.getElementById('qaInput');
        if (!input) return;
        var text = (input.value || '').trim();
        if (!text) return;
        input.value = '';
        appendMessage('question', text);
        var answer = findAnswer(text);
        if (!answer) {
            answer = '当前为演示模式。您可以尝试问与本页相关的问题，例如：本页指标汇总、某指标趋势、环比同比等。';
        }
        appendMessage('answer', answer, currentCardContent);
    }

    window.showQaDemo = function(question, answer, morePairs, options) {
        ensureModal();
        presetPairs = Array.isArray(morePairs) ? morePairs : [];
        currentFirstAnswer = (answer != null && answer !== '') ? String(answer) : '';
        currentCardContent = null;

        var opts = options && typeof options === 'object' ? options : {};
        if (opts.cardSelector) {
            var cloned = cloneCard(opts.cardSelector);
            if (cloned) currentCardContent = cloned;
        } else if (opts.cardHtml) {
            currentCardContent = opts.cardHtml;
        }

        var list = document.getElementById('qaChatList');
        var input = document.getElementById('qaInput');
        if (list) list.innerHTML = '';
        if (input) input.value = '';

        var q = (question != null && question !== '') ? String(question).replace(/^问：?/, '') : '';
        var a = (answer != null && answer !== '') ? String(answer).replace(/^答：?/, '') : '';
        if (q) appendMessage('question', q);
        if (a) appendMessage('answer', a, currentCardContent);

        if (q && a && presetPairs.length === 0) {
            presetPairs.push({ q: q, a: a });
        }

        var o = document.getElementById('qaDemoOverlay');
        var m = document.getElementById('qaDemoModal');
        if (o) o.classList.add('show');
        if (m) m.classList.add('show');
        if (input) setTimeout(function() { input.focus(); }, 100);
    };

    window.closeQaDemo = function() {
        var o = document.getElementById('qaDemoOverlay');
        var m = document.getElementById('qaDemoModal');
        if (o) o.classList.remove('show');
        if (m) m.classList.remove('show');
    };
})();
