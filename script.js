/*jslint indent: 4, maxlen: 80 */
/*globals window, document */

(function (win, doc) {
    'use strict';

    var // Constants
        INTERVAL_BIG = 1000,
        INTERVAL_SMALL = INTERVAL_BIG / 3,

        // Variables
        c = win.Circles,
        allCircles,

        // Functions
        debounce,
        makeText,
        makeCircleOptions,
        updateTime,
        onResize;

    allCircles = {
        hours: {
            element: doc.getElementById('hours')
        },
        minutes: {
            element: doc.getElementById('minutes')
        },
        seconds: {
            element: doc.getElementById('seconds')
        }
    };

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
        var output = parseInt(val, 10);

        if (output.toString().length === 1) {
            return '0' + output.toString();
        }

        return output;
    };

    makeCircleOptions = function (elementId, maxVal, color) {
        return {
            id: elementId,
            radius: 100,
            maxValue: maxVal,
            duration: null,
            width: 10,
            colors: ['#95a5a6', color],
            text: makeText
        };
    };

    updateTime = function () {
        var currentTime = new Date();

        allCircles.hours.circle.update(currentTime.getHours());
        allCircles.minutes.circle.update(currentTime.getMinutes());
        allCircles.seconds.circle.update(currentTime.getSeconds());
    };

    onResize = function () {
        Object.keys(allCircles).forEach(function (key) {
            var newWidth = allCircles[key].element.offsetWidth;

            allCircles[key].circle.updateRadius(newWidth / 2);
            allCircles[key].circle.updateWidth(newWidth / 2 * 0.25);
        });
    };

    (function () {
        allCircles.hours.circle = c.create(
            makeCircleOptions('hours', 24, '#c0392b')
        );
        allCircles.minutes.circle =  c.create(
            makeCircleOptions('minutes', 60, '#d35400')
        );
        allCircles.seconds.circle = c.create(
            makeCircleOptions('seconds', 60, '#f39c12')
        );

        onResize();
        updateTime();

        win.addEventListener('resize', debounce(onResize, INTERVAL_SMALL));
        win.setInterval(updateTime, INTERVAL_BIG);
    }());
}(window, document));
