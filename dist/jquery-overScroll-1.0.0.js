;(function (_, $, undefined) {
	$.fn.overScroll = function (custOpt) {
		var $element = this;
		var opt = {self: false, horizontal: false};    //default
		_.merge(opt, custOpt);

		var dist, lastTime, time, now, reach = -1; //top:-1, bottom:1
		var el = $element, element = el[0], drag = false, lastScroll = 0, delay = 0.07;
		var clientSize = opt.horizontal ? 'clientWidth' : 'clientHeight';
		var scrollSize = opt.horizontal ? 'scrollWidth' : 'scrollHeight';
		var scrollPos = opt.horizontal ? 'scrollLeft' : 'scrollTop';
		var screenPos = opt.horizontal ? 'screenX' : 'screenY';
		var translate = function (px) {
			var val = opt.horizontal ? px + 'px,0' : '0,' + px + 'px';
			return 'translate3d(' + val + ',0)';
		};
		var playBounce = function (dist, time) {
			var pn = dist < 0 ? -1 : 1;
			dist = Math.abs(dist);
			var velocity = dist / time * 12;
			(opt.self ? el : el.children()).css({
				transition: 'transform ' + delay + 's ease-out',
				transform: translate(velocity * pn)
			});
			setTimeout(function () {
				(opt.self ? el : el.children()).css({
					transition: 'transform ' + delay + 's ease-in',
					transform: translate(0)
				});
			}, delay * 1000);
		};
		el.bind('scroll', function (evt) {
			if (element[clientSize] + element[scrollPos] === element[scrollSize]) reach = 1;
			else if (element[scrollPos] === 0) reach = -1;
			else reach = 0;
			if (!reach && begin)   //닿지 않았는데 기준점이 잡혀있으면 재설정
				setBeginPos = _.once(function (p) {
					lastPos = begin = p;
				});
			dist = lastScroll - element[scrollPos];
			now = new Date().getTime();
			time = now - lastTime;
			if (reach && !drag) playBounce(dist, time);   //스크롤 끝에 닿았지만 드래그중이 아닐때
			lastScroll = element[scrollPos];
			lastTime = now;
		});

		var begin = 0, setBeginPos, lastPos, noScroll;
		var release = function () {
			drag = false;
			(opt.self ? el : el.children()).css({transition: 'transform 0.3s ease-in', transform: translate(0)});
		};

		var touchstart = function (evt) {
			drag = true;
			begin = lastPos = 0;
			noScroll = element[scrollSize] === element[clientSize];
			(opt.self ? el : el.children()).css({
				transition: 'transform 0s',
				transform: translate(0),
				'-webkit-backface-visibility': 'hidden',
				'backface-visibility': 'hidden'
			});
			setBeginPos = _.once(function (p) {
				lastPos = begin = p;
			});
		};

		el.bind('touchstart', touchstart);

		var lastDirection = 0;
		var triggerEvent = function (moved) {
			if (Math.abs(moved) < 20) return lastDirection = 0;
			var direction = moved > 0 ? 1 : -1;
			if (direction === lastDirection) return;
			if (direction > 0) {
				$element.trigger('overScrolledTop');
			} else {
				$element.trigger('overScrolledBottom');
			}
			lastDirection = direction;
		};

		var translateMove = function (moved) {
			if (moved !== 0) moved /= Math.pow(Math.abs(moved), 0.4);
			triggerEvent(moved);
			(opt.self ? el : el.children()).css({transform: translate(moved)});
		};
		el.bind('touchmove', function (evt) {
			var _evt = evt;
			evt = evt.originalEvent.touches ? evt.originalEvent.touches[0] : evt.originalEvent;
			if (noScroll) { //스크롤이 없을때 로직.
				setBeginPos(evt[screenPos]);
				return translateMove(evt[screenPos] - begin);
			}
			var dragUp = (lastPos || evt[screenPos]) < evt[screenPos];
			var dragDown = (lastPos || evt[screenPos]) > evt[screenPos];
			lastPos = evt[screenPos];
			if (reach === 1 && dragUp || reach === -1 && dragDown) {
				if (drag) setTimeout(touchstart, 300);
				release();
				return _evt.preventDefault();
			}
			if (!reach || !drag) return;
			setBeginPos(evt[screenPos]);
			translateMove(evt[screenPos] - begin);
		});
		el.bind('touchend', release);
		return this;
	};
})(_, jQuery);
