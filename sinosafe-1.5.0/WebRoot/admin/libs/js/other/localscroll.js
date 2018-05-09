(function(d) {
    var b = location.href.replace(/#.*/, "");
    var c = d.localScroll = function(e) {
        d("body").localScroll(e)
    };
    c.defaults = {
        duration: 1000,
        axis: "y",
        event: "click",
        stop: true,
        target: window,
        reset: true
    };
    c.hash = function(e) {
        if (location.hash) {
            e = d.extend({},
            c.defaults, e);
            e.hash = false;
            if (e.reset) {
                var f = e.duration;
                delete e.duration;
                d(e.target).scrollTo(0, e);
                e.duration = f
            }
            a(0, location, e)
        }
    };
    d.fn.localScroll = function(f) {
        f = d.extend({},
        c.defaults, f);
        return f.lazy ? this.bind(f.event,
        function(h) {
            var g = d([h.target, h.target.parentNode]).filter(e)[0];
            if (g) {
                a(h, g, f)
            }
        }) : this.find("a,area").filter(e).bind(f.event,
        function(g) {
            a(g, this, f)
        }).end().end();
        function e() {
            return !! this.href && !!this.hash && this.href.replace(this.hash, "") == b && (!f.filter || d(this).is(f.filter))
        }
    };
    function a(l, j, h) {
        var m = j.hash.slice(1),
        i = document.getElementById(m) || document.getElementsByName(m)[0];
        if (!i) {
            return
        }
        if (l) {
            l.preventDefault()
        }
        var g = d(h.target);
        if (h.lock && g.is(":animated") || h.onBefore && h.onBefore.call(h, l, i, g) === false) {
            return
        }
        if (h.stop) {
            g.stop(true)
        }
        if (h.hash) {
            var f = i.id == m ? "id": "name",
            k = d("<a> </a>").attr(f, m).css({
                position: "absolute",
                top: d(window).scrollTop(),
                left: d(window).scrollLeft()
            });
            i[f] = "";
            d("body").prepend(k);
            location = j.hash;
            k.remove();
            i[f] = m
        }
        g.scrollTo(i, h).trigger("notify.serialScroll", [i])
    }
})(jQuery);