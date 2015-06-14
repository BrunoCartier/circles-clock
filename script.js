/*jslint indent: 4, maxlen: 80 */
/*global window */

(function (win) {
    'use strict';

    var // Constants
        INTERVAL_BIG = 1000,
        INTERVAL_SMALL = INTERVAL_BIG / 3,

        // Variables
        c = win.Circles,
        hoursCircle,
        minutesCircle,
        secondsCircle,
        allCircles,

        // Functions
        debounce,
        makeText,
        makeCircleOptions,
        onResize;

    allCircles = [
        hoursCircle,
        minutesCircle,
        secondsCircle
    ];

    // Source: http://goo.gl/c3mZHP
    debounce = function (func, wait) {
        var timeout,
            args,
            context,
            timestamp;

        return function () {
            context = this;
            args = [].slice.call(arguments, 0);
            timestamp = new Date();

            var later = function () {
                var last = (new Date()) - timestamp;

                if (last < wait) {
                    timeout = win.setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    func.apply(context, args);
                }
            };

            if (!timeout) {
                timeout = win.setTimeout(later, wait);
            }
        };
    };


    makeText = function (val) {
        return parseInt(val, 10);
    };

    makeCircleOptions = function (elementId, maxVal) {
        return {
            id: elementId,
            radius: 100,
            maxValue: maxVal,
            duration: null,
            width: 10,
            text: makeText
        };
    };

    onResize = debounce(function () {
        console.log('resize');
    }, INTERVAL_SMALL);

    (function () {
        hoursCircle = c.create(makeCircleOptions('hours', 24));
        minutesCircle = c.create(makeCircleOptions('minutes', 60));
        secondsCircle = c.create(makeCircleOptions('seconds', 60));

        win.setInterval(function () {
            var currentTime = new Date();

            hoursCircle.update(currentTime.getHours());
            minutesCircle.update(currentTime.getMinutes());
            secondsCircle.update(currentTime.getSeconds());
        }, INTERVAL_BIG);

        win.addEventListener('resize', onResize);
    }());
}(window));
