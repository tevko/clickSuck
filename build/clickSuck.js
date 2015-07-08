(function() {
    window.clickSuck = {
        settings: {
            touchEnabled: (function() { return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)); })(),
            lastEvent: ''
        },
        init: function() {
            var s = this.settings;
            s.touchEnabled && document.body.addEventListener('touchend', this.captureEvents.bind(this));
            s.touchEnabled && document.body.addEventListener('touchmove', this.captureEvents.bind(this));
        },
        captureEvents: function(e) {
            var s = this.settings;
            if (e.type === 'touchmove') {
                s.lastEvent = 'touchmove';
                document.body.addEventListener('touchend', this.resetTouchListener.bind(this));
            }
            if (s.lastEvent === '') {
                e.preventDefault();
                e.stopPropagation();
                this.fireClick(e);
            }
        },
        fireClick: function(e) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, false);
            e.target.dispatchEvent(event);
        },
        resetTouchListener: function() {
            var s = this.settings;
            s.lastEvent = '';
            document.body.removeEventListener('touchend', this.resetTouchListener);
            return false;
        }
    };
})();