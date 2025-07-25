function hasCanvasSupport() {
  var t = document.createElement('canvas');
  return !(!t.getContext || !t.getContext('2d'));
}
define('com/fido/app/Fallback', ['require', 'exports', 'module'], function (t, e, i) {
  var r = function (t) {
    t = t || document.body;
    var e = {
        message:
          '<p>Uh-oh! It looks like you need to update your browser before you\'ll be able to play this game</p><p>In the meantime, check out <a href="#brand_url">this</a> or <a href="#cbeebies_games_url">this</a>.',
        brand_url: 'http://www.someurl.tld/',
        games_url: 'http://www.someurl.tld/',
        enabled: !0,
      },
      i = e.message;
    (i = i.replace('#brand_url', e.brand_url)), (i = i.replace('#games_url', e.games_url));
    var r = document.createElement('link');
    (r.type = 'text/css'),
      (r.rel = 'stylesheet'),
      (r.href = 'assets/css/unsupported.css'),
      document.getElementsByTagName('head')[0].appendChild(r),
      (t.innerHTML = i);
  };
  (r.constructor = r), (i.exports = r);
}),
  (function (t) {
    var e,
      i,
      r,
      n,
      o,
      s = t.GreenSockGlobals || t,
      a = function (t) {
        var e,
          i = t.split('.'),
          r = s;
        for (e = 0; i.length > e; e++) r[i[e]] = r = r[i[e]] || {};
        return r;
      },
      h = a('com.greensock'),
      l = [].slice,
      u = function () {},
      c = {},
      d = function (e, i, r, n) {
        (this.sc = c[e] ? c[e].sc : []), (c[e] = this), (this.gsClass = null), (this.func = r);
        var o = [];
        (this.check = function (h) {
          for (var l, u, p, f, m = i.length, v = m; --m > -1; )
            (l = c[i[m]] || new d(i[m], [])).gsClass ? ((o[m] = l.gsClass), v--) : h && l.sc.push(this);
          if (0 === v && r)
            for (
              u = ('com.greensock.' + e).split('.'),
                p = u.pop(),
                f = a(u.join('.'))[p] = this.gsClass = r.apply(r, o),
                n &&
                  ((s[p] = f),
                  'function' == typeof define && define.amd
                    ? define(
                        (t.GreenSockAMDPath ? t.GreenSockAMDPath + '/' : '') + e.split('.').join('/'),
                        [],
                        function () {
                          return f;
                        },
                      )
                    : 'undefined' != typeof module && module.exports && (module.exports = f)),
                m = 0;
              this.sc.length > m;
              m++
            )
              this.sc[m].check();
        }),
          this.check(!0);
      },
      p = (t._gsDefine = function (t, e, i, r) {
        return new d(t, e, i, r);
      }),
      f = (h._class = function (t, e, i) {
        return (
          (e = e || function () {}),
          p(
            t,
            [],
            function () {
              return e;
            },
            i,
          ),
          e
        );
      });
    p.globals = s;
    var m = [0, 0, 1, 1],
      v = [],
      g = f(
        'easing.Ease',
        function (t, e, i, r) {
          (this._func = t), (this._type = i || 0), (this._power = r || 0), (this._params = e ? m.concat(e) : m);
        },
        !0,
      ),
      y = (g.map = {}),
      x = (g.register = function (t, e, i, r) {
        for (
          var n, o, s, a, l = e.split(','), u = l.length, c = (i || 'easeIn,easeOut,easeInOut').split(',');
          --u > -1;

        )
          for (o = l[u], n = r ? f('easing.' + o, null, !0) : h.easing[o] || {}, s = c.length; --s > -1; )
            (a = c[s]), (y[o + '.' + a] = y[a + o] = n[a] = t.getRatio ? t : t[a] || new t());
      });
    for (
      r = g.prototype,
        r._calcEnd = !1,
        r.getRatio = function (t) {
          if (this._func) return (this._params[0] = t), this._func.apply(null, this._params);
          var e = this._type,
            i = this._power,
            r = 1 === e ? 1 - t : 2 === e ? t : 0.5 > t ? 2 * t : 2 * (1 - t);
          return (
            1 === i ? (r *= r) : 2 === i ? (r *= r * r) : 3 === i ? (r *= r * r * r) : 4 === i && (r *= r * r * r * r),
            1 === e ? 1 - r : 2 === e ? r : 0.5 > t ? r / 2 : 1 - r / 2
          );
        },
        e = ['Linear', 'Quad', 'Cubic', 'Quart', 'Quint,Strong'],
        i = e.length;
      --i > -1;

    )
      (r = e[i] + ',Power' + i),
        x(new g(null, null, 1, i), r, 'easeOut', !0),
        x(new g(null, null, 2, i), r, 'easeIn' + (0 === i ? ',easeNone' : '')),
        x(new g(null, null, 3, i), r, 'easeInOut');
    (y.linear = h.easing.Linear.easeIn), (y.swing = h.easing.Quad.easeInOut);
    var _ = f('events.EventDispatcher', function (t) {
      (this._listeners = {}), (this._eventTarget = t || this);
    });
    (r = _.prototype),
      (r.addEventListener = function (t, e, i, r, s) {
        s = s || 0;
        var a,
          h,
          l = this._listeners[t],
          u = 0;
        for (null == l && (this._listeners[t] = l = []), h = l.length; --h > -1; )
          (a = l[h]), a.c === e && a.s === i ? l.splice(h, 1) : 0 === u && s > a.pr && (u = h + 1);
        l.splice(u, 0, { c: e, s: i, up: r, pr: s }), this !== n || o || n.wake();
      }),
      (r.removeEventListener = function (t, e) {
        var i,
          r = this._listeners[t];
        if (r) for (i = r.length; --i > -1; ) if (r[i].c === e) return void r.splice(i, 1);
      }),
      (r.dispatchEvent = function (t) {
        var e,
          i,
          r,
          n = this._listeners[t];
        if (n)
          for (e = n.length, i = this._eventTarget; --e > -1; )
            (r = n[e]), r.up ? r.c.call(r.s || i, { type: t, target: i }) : r.c.call(r.s || i);
      });
    var b = t.requestAnimationFrame,
      w = t.cancelAnimationFrame,
      T =
        Date.now ||
        function () {
          return new Date().getTime();
        },
      S = T();
    for (e = ['ms', 'moz', 'webkit', 'o'], i = e.length; --i > -1 && !b; )
      (b = t[e[i] + 'RequestAnimationFrame']),
        (w = t[e[i] + 'CancelAnimationFrame'] || t[e[i] + 'CancelRequestAnimationFrame']);
    f('Ticker', function (t, e) {
      var i,
        r,
        s,
        a,
        h,
        l = this,
        c = T(),
        d = e !== !1 && b,
        p = function (t) {
          (S = T()), (l.time = (S - c) / 1e3);
          var e,
            n = l.time - h;
          (!i || n > 0 || t === !0) && (l.frame++, (h += n + (n >= a ? 0.004 : a - n)), (e = !0)),
            t !== !0 && (s = r(p)),
            e && l.dispatchEvent('tick');
        };
      _.call(l),
        (this.time = this.frame = 0),
        (this.tick = function () {
          p(!0);
        }),
        (this.sleep = function () {
          null != s && (d && w ? w(s) : clearTimeout(s), (r = u), (s = null), l === n && (o = !1));
        }),
        (this.wake = function () {
          null !== s && l.sleep(),
            (r =
              0 === i
                ? u
                : d && b
                  ? b
                  : function (t) {
                      return setTimeout(t, 0 | (1e3 * (h - l.time) + 1));
                    }),
            l === n && (o = !0),
            p(2);
        }),
        (this.fps = function (t) {
          return arguments.length ? ((i = t), (a = 1 / (i || 60)), (h = this.time + a), void l.wake()) : i;
        }),
        (this.useRAF = function (t) {
          return arguments.length ? (l.sleep(), (d = t), void l.fps(i)) : d;
        }),
        l.fps(t),
        setTimeout(function () {
          d && (!s || 5 > l.frame) && l.useRAF(!1);
        }, 1500);
    }),
      (r = h.Ticker.prototype = new h.events.EventDispatcher()),
      (r.constructor = h.Ticker);
    var E = f('core.Animation', function (t, e) {
      if (
        ((this.vars = e = e || {}),
        (this._duration = this._totalDuration = t || 0),
        (this._delay = Number(e.delay) || 0),
        (this._timeScale = 1),
        (this._active = e.immediateRender === !0),
        (this.data = e.data),
        (this._reversed = e.reversed === !0),
        N)
      ) {
        o || n.wake();
        var i = this.vars.useFrames ? B : N;
        i.add(this, i._time), this.vars.paused && this.paused(!0);
      }
    });
    (n = E.ticker = new h.Ticker()),
      (r = E.prototype),
      (r._dirty = r._gc = r._initted = r._paused = !1),
      (r._totalTime = r._time = 0),
      (r._rawPrevTime = -1),
      (r._next = r._last = r._onUpdate = r._timeline = r.timeline = null),
      (r._paused = !1);
    var A = function () {
      T() - S > 2e3 && n.wake(), setTimeout(A, 2e3);
    };
    A(),
      (r.play = function (t, e) {
        return arguments.length && this.seek(t, e), this.reversed(!1).paused(!1);
      }),
      (r.pause = function (t, e) {
        return arguments.length && this.seek(t, e), this.paused(!0);
      }),
      (r.resume = function (t, e) {
        return arguments.length && this.seek(t, e), this.paused(!1);
      }),
      (r.seek = function (t, e) {
        return this.totalTime(Number(t), e !== !1);
      }),
      (r.restart = function (t, e) {
        return this.reversed(!1)
          .paused(!1)
          .totalTime(t ? -this._delay : 0, e !== !1, !0);
      }),
      (r.reverse = function (t, e) {
        return arguments.length && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
      }),
      (r.render = function () {}),
      (r.invalidate = function () {
        return this;
      }),
      (r._enabled = function (t, e) {
        return (
          o || n.wake(),
          (this._gc = !t),
          (this._active = t && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration),
          e !== !0 &&
            (t && !this.timeline
              ? this._timeline.add(this, this._startTime - this._delay)
              : !t && this.timeline && this._timeline._remove(this, !0)),
          !1
        );
      }),
      (r._kill = function () {
        return this._enabled(!1, !1);
      }),
      (r.kill = function (t, e) {
        return this._kill(t, e), this;
      }),
      (r._uncache = function (t) {
        for (var e = t ? this : this.timeline; e; ) (e._dirty = !0), (e = e.timeline);
        return this;
      }),
      (r._swapSelfInParams = function (t) {
        for (var e = t.length, i = t.concat(); --e > -1; ) '{self}' === t[e] && (i[e] = this);
        return i;
      }),
      (r.eventCallback = function (t, e, i, r) {
        if ('on' === (t || '').substr(0, 2)) {
          var n = this.vars;
          if (1 === arguments.length) return n[t];
          null == e
            ? delete n[t]
            : ((n[t] = e),
              (n[t + 'Params'] =
                i instanceof Array && -1 !== i.join('').indexOf('{self}') ? this._swapSelfInParams(i) : i),
              (n[t + 'Scope'] = r)),
            'onUpdate' === t && (this._onUpdate = e);
        }
        return this;
      }),
      (r.delay = function (t) {
        return arguments.length
          ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay),
            (this._delay = t),
            this)
          : this._delay;
      }),
      (r.duration = function (t) {
        return arguments.length
          ? ((this._duration = this._totalDuration = t),
            this._uncache(!0),
            this._timeline.smoothChildTiming &&
              this._time > 0 &&
              this._time < this._duration &&
              0 !== t &&
              this.totalTime(this._totalTime * (t / this._duration), !0),
            this)
          : ((this._dirty = !1), this._duration);
      }),
      (r.totalDuration = function (t) {
        return (this._dirty = !1), arguments.length ? this.duration(t) : this._totalDuration;
      }),
      (r.time = function (t, e) {
        return arguments.length
          ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e))
          : this._time;
      }),
      (r.totalTime = function (t, e, i) {
        if ((o || n.wake(), !arguments.length)) return this._totalTime;
        if (this._timeline) {
          if ((0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming)) {
            this._dirty && this.totalDuration();
            var r = this._totalDuration,
              s = this._timeline;
            if (
              (t > r && !i && (t = r),
              (this._startTime =
                (this._paused ? this._pauseTime : s._time) - (this._reversed ? r - t : t) / this._timeScale),
              s._dirty || this._uncache(!1),
              s._timeline)
            )
              for (; s._timeline; )
                s._timeline._time !== (s._startTime + s._totalTime) / s._timeScale && s.totalTime(s._totalTime, !0),
                  (s = s._timeline);
          }
          this._gc && this._enabled(!0, !1), this._totalTime !== t && this.render(t, e, !1);
        }
        return this;
      }),
      (r.startTime = function (t) {
        return arguments.length
          ? (t !== this._startTime &&
              ((this._startTime = t),
              this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)),
            this)
          : this._startTime;
      }),
      (r.timeScale = function (t) {
        if (!arguments.length) return this._timeScale;
        if (((t = t || 1e-6), this._timeline && this._timeline.smoothChildTiming)) {
          var e = this._pauseTime,
            i = e || 0 === e ? e : this._timeline.totalTime();
          this._startTime = i - ((i - this._startTime) * this._timeScale) / t;
        }
        return (this._timeScale = t), this._uncache(!1);
      }),
      (r.reversed = function (t) {
        return arguments.length
          ? (t != this._reversed && ((this._reversed = t), this.totalTime(this._totalTime, !0)), this)
          : this._reversed;
      }),
      (r.paused = function (t) {
        if (!arguments.length) return this._paused;
        if (t != this._paused && this._timeline) {
          o || t || n.wake();
          var e = this._timeline,
            i = e.rawTime(),
            r = i - this._pauseTime;
          !t && e.smoothChildTiming && ((this._startTime += r), this._uncache(!1)),
            (this._pauseTime = t ? i : null),
            (this._paused = t),
            (this._active = !t && this._totalTime > 0 && this._totalTime < this._totalDuration),
            t ||
              0 === r ||
              0 === this._duration ||
              this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0);
        }
        return this._gc && !t && this._enabled(!0, !1), this;
      });
    var C = f('core.SimpleTimeline', function (t) {
      E.call(this, 0, t), (this.autoRemoveChildren = this.smoothChildTiming = !0);
    });
    (r = C.prototype = new E()),
      (r.constructor = C),
      (r.kill()._gc = !1),
      (r._first = r._last = null),
      (r._sortChildren = !1),
      (r.add = r.insert =
        function (t, e) {
          var i, r;
          if (
            ((t._startTime = Number(e || 0) + t._delay),
            t._paused &&
              this !== t._timeline &&
              (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale),
            t.timeline && t.timeline._remove(t, !0),
            (t.timeline = t._timeline = this),
            t._gc && t._enabled(!0, !0),
            (i = this._last),
            this._sortChildren)
          )
            for (r = t._startTime; i && i._startTime > r; ) i = i._prev;
          return (
            i ? ((t._next = i._next), (i._next = t)) : ((t._next = this._first), (this._first = t)),
            t._next ? (t._next._prev = t) : (this._last = t),
            (t._prev = i),
            this._timeline && this._uncache(!0),
            this
          );
        }),
      (r._remove = function (t, e) {
        return (
          t.timeline === this &&
            (e || t._enabled(!1, !0),
            (t.timeline = null),
            t._prev ? (t._prev._next = t._next) : this._first === t && (this._first = t._next),
            t._next ? (t._next._prev = t._prev) : this._last === t && (this._last = t._prev),
            this._timeline && this._uncache(!0)),
          this
        );
      }),
      (r.render = function (t, e, i) {
        var r,
          n = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = t; n; )
          (r = n._next),
            (n._active || (t >= n._startTime && !n._paused)) &&
              (n._reversed
                ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i)
                : n.render((t - n._startTime) * n._timeScale, e, i)),
            (n = r);
      }),
      (r.rawTime = function () {
        return o || n.wake(), this._totalTime;
      });
    var M = f(
        'TweenLite',
        function (e, i, r) {
          if ((E.call(this, i, r), (this.render = M.prototype.render), null == e)) throw 'Cannot tween a null target.';
          this.target = e = 'string' != typeof e ? e : M.selector(e) || e;
          var n,
            o,
            s,
            a =
              e.jquery || (e.length && e !== t && e[0] && (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))),
            h = this.vars.overwrite;
          if (
            ((this._overwrite = h = null == h ? I[M.defaultOverwrite] : 'number' == typeof h ? h >> 0 : I[h]),
            (a || e instanceof Array) && 'number' != typeof e[0])
          )
            for (this._targets = s = l.call(e, 0), this._propLookup = [], this._siblings = [], n = 0; s.length > n; n++)
              (o = s[n]),
                o
                  ? 'string' != typeof o
                    ? o.length && o !== t && o[0] && (o[0] === t || (o[0].nodeType && o[0].style && !o.nodeType))
                      ? (s.splice(n--, 1), (this._targets = s = s.concat(l.call(o, 0))))
                      : ((this._siblings[n] = U(o, this, !1)),
                        1 === h && this._siblings[n].length > 1 && X(o, this, null, 1, this._siblings[n]))
                    : ((o = s[n--] = M.selector(o)), 'string' == typeof o && s.splice(n + 1, 1))
                  : s.splice(n--, 1);
          else
            (this._propLookup = {}),
              (this._siblings = U(e, this, !1)),
              1 === h && this._siblings.length > 1 && X(e, this, null, 1, this._siblings);
          (this.vars.immediateRender || (0 === i && 0 === this._delay && this.vars.immediateRender !== !1)) &&
            this.render(-this._delay, !1, !0);
        },
        !0,
      ),
      R = function (e) {
        return e.length && e !== t && e[0] && (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType));
      },
      P = function (t, e) {
        var i,
          r = {};
        for (i in t)
          k[i] ||
            (i in e &&
              'x' !== i &&
              'y' !== i &&
              'width' !== i &&
              'height' !== i &&
              'className' !== i &&
              'border' !== i) ||
            !(!D[i] || (D[i] && D[i]._autoCSS)) ||
            ((r[i] = t[i]), delete t[i]);
        t.css = r;
      };
    (r = M.prototype = new E()),
      (r.constructor = M),
      (r.kill()._gc = !1),
      (r.ratio = 0),
      (r._firstPT = r._targets = r._overwrittenProps = r._startAt = null),
      (r._notifyPluginsOfEnabled = !1),
      (M.version = '1.10.2'),
      (M.defaultEase = r._ease = new g(null, null, 1, 1)),
      (M.defaultOverwrite = 'auto'),
      (M.ticker = n),
      (M.autoSleep = !0),
      (M.selector =
        t.$ ||
        t.jQuery ||
        function (e) {
          return t.$
            ? ((M.selector = t.$), t.$(e))
            : t.document
              ? t.document.getElementById('#' === e.charAt(0) ? e.substr(1) : e)
              : e;
        });
    var O = (M._internals = {}),
      D = (M._plugins = {}),
      F = (M._tweenLookup = {}),
      L = 0,
      k = (O.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
      }),
      I = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, true: 1, false: 0 },
      B = (E._rootFramesTimeline = new C()),
      N = (E._rootTimeline = new C());
    (N._startTime = n.time),
      (B._startTime = n.frame),
      (N._active = B._active = !0),
      (E._updateRoot = function () {
        if (
          (N.render((n.time - N._startTime) * N._timeScale, !1, !1),
          B.render((n.frame - B._startTime) * B._timeScale, !1, !1),
          !(n.frame % 120))
        ) {
          var t, e, i;
          for (i in F) {
            for (e = F[i].tweens, t = e.length; --t > -1; ) e[t]._gc && e.splice(t, 1);
            0 === e.length && delete F[i];
          }
          if (((i = N._first), (!i || i._paused) && M.autoSleep && !B._first && 1 === n._listeners.tick.length)) {
            for (; i && i._paused; ) i = i._next;
            i || n.sleep();
          }
        }
      }),
      n.addEventListener('tick', E._updateRoot);
    var U = function (t, e, i) {
        var r,
          n,
          o = t._gsTweenID;
        if (
          (F[o || (t._gsTweenID = o = 't' + L++)] || (F[o] = { target: t, tweens: [] }),
          e && ((r = F[o].tweens), (r[(n = r.length)] = e), i))
        )
          for (; --n > -1; ) r[n] === e && r.splice(n, 1);
        return F[o].tweens;
      },
      X = function (t, e, i, r, n) {
        var o, s, a, h;
        if (1 === r || r >= 4) {
          for (h = n.length, o = 0; h > o; o++)
            if ((a = n[o]) !== e) a._gc || (a._enabled(!1, !1) && (s = !0));
            else if (5 === r) break;
          return s;
        }
        var l,
          u = e._startTime + 1e-10,
          c = [],
          d = 0,
          p = 0 === e._duration;
        for (o = n.length; --o > -1; )
          (a = n[o]) === e ||
            a._gc ||
            a._paused ||
            (a._timeline !== e._timeline
              ? ((l = l || j(e, 0, p)), 0 === j(a, l, p) && (c[d++] = a))
              : u >= a._startTime &&
                a._startTime + a.totalDuration() / a._timeScale + 1e-10 > u &&
                (((p || !a._initted) && 2e-10 >= u - a._startTime) || (c[d++] = a)));
        for (o = d; --o > -1; )
          (a = c[o]),
            2 === r && a._kill(i, t) && (s = !0),
            (2 !== r || (!a._firstPT && a._initted)) && a._enabled(!1, !1) && (s = !0);
        return s;
      },
      j = function (t, e, i) {
        for (var r = t._timeline, n = r._timeScale, o = t._startTime, s = 1e-10; r._timeline; ) {
          if (((o += r._startTime), (n *= r._timeScale), r._paused)) return -100;
          r = r._timeline;
        }
        return (
          (o /= n),
          o > e
            ? o - e
            : (i && o === e) || (!t._initted && 2 * s > o - e)
              ? s
              : (o += t.totalDuration() / t._timeScale / n) > e + s
                ? 0
                : o - e - s
        );
      };
    (r._init = function () {
      var t,
        e,
        i,
        r,
        n = this.vars,
        o = this._overwrittenProps,
        s = this._duration,
        a = n.immediateRender,
        h = n.ease;
      if (n.startAt) {
        if (
          (this._startAt && this._startAt.render(-1, !0),
          (n.startAt.overwrite = 0),
          (n.startAt.immediateRender = !0),
          (this._startAt = M.to(this.target, 0, n.startAt)),
          a)
        )
          if (this._time > 0) this._startAt = null;
          else if (0 !== s) return;
      } else if (n.runBackwards && n.immediateRender && 0 !== s)
        if (this._startAt) this._startAt.render(-1, !0), (this._startAt = null);
        else if (0 === this._time) {
          i = {};
          for (r in n) (k[r] && 'autoCSS' !== r) || (i[r] = n[r]);
          return (i.overwrite = 0), void (this._startAt = M.to(this.target, 0, i));
        }
      if (
        ((this._ease = h
          ? h instanceof g
            ? n.easeParams instanceof Array
              ? h.config.apply(h, n.easeParams)
              : h
            : 'function' == typeof h
              ? new g(h, n.easeParams)
              : y[h] || M.defaultEase
          : M.defaultEase),
        (this._easeType = this._ease._type),
        (this._easePower = this._ease._power),
        (this._firstPT = null),
        this._targets)
      )
        for (t = this._targets.length; --t > -1; )
          this._initProps(this._targets[t], (this._propLookup[t] = {}), this._siblings[t], o ? o[t] : null) && (e = !0);
      else e = this._initProps(this.target, this._propLookup, this._siblings, o);
      if (
        (e && M._onPluginEvent('_onInitAllProps', this),
        o && (this._firstPT || ('function' != typeof this.target && this._enabled(!1, !1))),
        n.runBackwards)
      )
        for (i = this._firstPT; i; ) (i.s += i.c), (i.c = -i.c), (i = i._next);
      (this._onUpdate = n.onUpdate), (this._initted = !0);
    }),
      (r._initProps = function (e, i, r, n) {
        var o, s, a, h, l, u;
        if (null == e) return !1;
        this.vars.css || (e.style && e !== t && e.nodeType && D.css && this.vars.autoCSS !== !1 && P(this.vars, e));
        for (o in this.vars) {
          if (((u = this.vars[o]), k[o]))
            u instanceof Array &&
              -1 !== u.join('').indexOf('{self}') &&
              (this.vars[o] = u = this._swapSelfInParams(u, this));
          else if (D[o] && (h = new D[o]())._onInitTween(e, this.vars[o], this)) {
            for (
              this._firstPT = l =
                {
                  _next: this._firstPT,
                  t: h,
                  p: 'setRatio',
                  s: 0,
                  c: 1,
                  f: !0,
                  n: o,
                  pg: !0,
                  pr: h._priority,
                },
                s = h._overwriteProps.length;
              --s > -1;

            )
              i[h._overwriteProps[s]] = this._firstPT;
            (h._priority || h._onInitAllProps) && (a = !0),
              (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0);
          } else
            (this._firstPT =
              i[o] =
              l =
                { _next: this._firstPT, t: e, p: o, f: 'function' == typeof e[o], n: o, pg: !1, pr: 0 }),
              (l.s = l.f
                ? e[o.indexOf('set') || 'function' != typeof e['get' + o.substr(3)] ? o : 'get' + o.substr(3)]()
                : parseFloat(e[o])),
              (l.c =
                'string' == typeof u && '=' === u.charAt(1)
                  ? parseInt(u.charAt(0) + '1', 10) * Number(u.substr(2))
                  : Number(u) - l.s || 0);
          l && l._next && (l._next._prev = l);
        }
        return n && this._kill(n, e)
          ? this._initProps(e, i, r, n)
          : this._overwrite > 1 && this._firstPT && r.length > 1 && X(e, this, i, this._overwrite, r)
            ? (this._kill(i, e), this._initProps(e, i, r, n))
            : a;
      }),
      (r.render = function (t, e, i) {
        var r,
          n,
          o,
          s = this._time;
        if (t >= this._duration)
          (this._totalTime = this._time = this._duration),
            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
            this._reversed || ((r = !0), (n = 'onComplete')),
            0 === this._duration &&
              ((0 === t || 0 > this._rawPrevTime) &&
                this._rawPrevTime !== t &&
                ((i = !0), this._rawPrevTime > 0 && ((n = 'onReverseComplete'), e && (t = -1))),
              (this._rawPrevTime = t));
        else if (1e-7 > t)
          (this._totalTime = this._time = 0),
            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
            (0 !== s || (0 === this._duration && this._rawPrevTime > 0)) &&
              ((n = 'onReverseComplete'), (r = this._reversed)),
            0 > t
              ? ((this._active = !1),
                0 === this._duration && (this._rawPrevTime >= 0 && (i = !0), (this._rawPrevTime = t)))
              : this._initted || (i = !0);
        else if (((this._totalTime = this._time = t), this._easeType)) {
          var a = t / this._duration,
            h = this._easeType,
            l = this._easePower;
          (1 === h || (3 === h && a >= 0.5)) && (a = 1 - a),
            3 === h && (a *= 2),
            1 === l ? (a *= a) : 2 === l ? (a *= a * a) : 3 === l ? (a *= a * a * a) : 4 === l && (a *= a * a * a * a),
            (this.ratio = 1 === h ? 1 - a : 2 === h ? a : 0.5 > t / this._duration ? a / 2 : 1 - a / 2);
        } else this.ratio = this._ease.getRatio(t / this._duration);
        if (this._time !== s || i) {
          if (!this._initted) {
            if ((this._init(), !this._initted)) return;
            this._time && !r
              ? (this.ratio = this._ease.getRatio(this._time / this._duration))
              : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
          }
          for (
            this._active || (!this._paused && this._time !== s && t >= 0 && (this._active = !0)),
              0 === s &&
                (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : n || (n = '_dummyGS')),
                this.vars.onStart &&
                  (0 !== this._time || 0 === this._duration) &&
                  (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || v))),
              o = this._firstPT;
            o;

          )
            o.f ? o.t[o.p](o.c * this.ratio + o.s) : (o.t[o.p] = o.c * this.ratio + o.s), (o = o._next);
          this._onUpdate &&
            (0 > t && this._startAt && this._startAt.render(t, e, i),
            e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || v)),
            n &&
              (this._gc ||
                (0 > t && this._startAt && !this._onUpdate && this._startAt.render(t, e, i),
                r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), (this._active = !1)),
                !e &&
                  this.vars[n] &&
                  this.vars[n].apply(this.vars[n + 'Scope'] || this, this.vars[n + 'Params'] || v)));
        }
      }),
      (r._kill = function (t, e) {
        if (('all' === t && (t = null), null == t && (null == e || e === this.target))) return this._enabled(!1, !1);
        e = 'string' != typeof e ? e || this._targets || this.target : M.selector(e) || e;
        var i, r, n, o, s, a, h, l;
        if ((e instanceof Array || R(e)) && 'number' != typeof e[0])
          for (i = e.length; --i > -1; ) this._kill(t, e[i]) && (a = !0);
        else {
          if (this._targets) {
            for (i = this._targets.length; --i > -1; )
              if (e === this._targets[i]) {
                (s = this._propLookup[i] || {}),
                  (this._overwrittenProps = this._overwrittenProps || []),
                  (r = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : 'all');
                break;
              }
          } else {
            if (e !== this.target) return !1;
            (s = this._propLookup), (r = this._overwrittenProps = t ? this._overwrittenProps || {} : 'all');
          }
          if (s) {
            (h = t || s), (l = t !== r && 'all' !== r && t !== s && (null == t || t._tempKill !== !0));
            for (n in h)
              (o = s[n]) &&
                (o.pg && o.t._kill(h) && (a = !0),
                (o.pg && 0 !== o.t._overwriteProps.length) ||
                  (o._prev ? (o._prev._next = o._next) : o === this._firstPT && (this._firstPT = o._next),
                  o._next && (o._next._prev = o._prev),
                  (o._next = o._prev = null)),
                delete s[n]),
                l && (r[n] = 1);
            !this._firstPT && this._initted && this._enabled(!1, !1);
          }
        }
        return a;
      }),
      (r.invalidate = function () {
        return (
          this._notifyPluginsOfEnabled && M._onPluginEvent('_onDisable', this),
          (this._firstPT = null),
          (this._overwrittenProps = null),
          (this._onUpdate = null),
          (this._startAt = null),
          (this._initted = this._active = this._notifyPluginsOfEnabled = !1),
          (this._propLookup = this._targets ? {} : []),
          this
        );
      }),
      (r._enabled = function (t, e) {
        if ((o || n.wake(), t && this._gc)) {
          var i,
            r = this._targets;
          if (r) for (i = r.length; --i > -1; ) this._siblings[i] = U(r[i], this, !0);
          else this._siblings = U(this.target, this, !0);
        }
        return (
          E.prototype._enabled.call(this, t, e),
          this._notifyPluginsOfEnabled && this._firstPT ? M._onPluginEvent(t ? '_onEnable' : '_onDisable', this) : !1
        );
      }),
      (M.to = function (t, e, i) {
        return new M(t, e, i);
      }),
      (M.from = function (t, e, i) {
        return (i.runBackwards = !0), (i.immediateRender = 0 != i.immediateRender), new M(t, e, i);
      }),
      (M.fromTo = function (t, e, i, r) {
        return (r.startAt = i), (r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender), new M(t, e, r);
      }),
      (M.delayedCall = function (t, e, i, r, n) {
        return new M(e, 0, {
          delay: t,
          onComplete: e,
          onCompleteParams: i,
          onCompleteScope: r,
          onReverseComplete: e,
          onReverseCompleteParams: i,
          onReverseCompleteScope: r,
          immediateRender: !1,
          useFrames: n,
          overwrite: 0,
        });
      }),
      (M.set = function (t, e) {
        return new M(t, 0, e);
      }),
      (M.killTweensOf = M.killDelayedCallsTo =
        function (t, e) {
          for (var i = M.getTweensOf(t), r = i.length; --r > -1; ) i[r]._kill(e, t);
        }),
      (M.getTweensOf = function (t) {
        if (null == t) return [];
        t = 'string' != typeof t ? t : M.selector(t) || t;
        var e, i, r, n;
        if ((t instanceof Array || R(t)) && 'number' != typeof t[0]) {
          for (e = t.length, i = []; --e > -1; ) i = i.concat(M.getTweensOf(t[e]));
          for (e = i.length; --e > -1; ) for (n = i[e], r = e; --r > -1; ) n === i[r] && i.splice(e, 1);
        } else for (i = U(t).concat(), e = i.length; --e > -1; ) i[e]._gc && i.splice(e, 1);
        return i;
      });
    var z = f(
      'plugins.TweenPlugin',
      function (t, e) {
        (this._overwriteProps = (t || '').split(',')),
          (this._propName = this._overwriteProps[0]),
          (this._priority = e || 0),
          (this._super = z.prototype);
      },
      !0,
    );
    if (
      ((r = z.prototype),
      (z.version = '1.10.1'),
      (z.API = 2),
      (r._firstPT = null),
      (r._addTween = function (t, e, i, r, n, o) {
        var s, a;
        return null != r &&
          (s =
            'number' == typeof r || '=' !== r.charAt(1)
              ? Number(r) - i
              : parseInt(r.charAt(0) + '1', 10) * Number(r.substr(2)))
          ? ((this._firstPT = a =
              { _next: this._firstPT, t: t, p: e, s: i, c: s, f: 'function' == typeof t[e], n: n || e, r: o }),
            a._next && (a._next._prev = a),
            a)
          : void 0;
      }),
      (r.setRatio = function (t) {
        for (var e, i = this._firstPT, r = 1e-6; i; )
          (e = i.c * t + i.s),
            i.r ? (e = 0 | (e + (e > 0 ? 0.5 : -0.5))) : r > e && e > -r && (e = 0),
            i.f ? i.t[i.p](e) : (i.t[i.p] = e),
            (i = i._next);
      }),
      (r._kill = function (t) {
        var e,
          i = this._overwriteProps,
          r = this._firstPT;
        if (null != t[this._propName]) this._overwriteProps = [];
        else for (e = i.length; --e > -1; ) null != t[i[e]] && i.splice(e, 1);
        for (; r; )
          null != t[r.n] &&
            (r._next && (r._next._prev = r._prev),
            r._prev ? ((r._prev._next = r._next), (r._prev = null)) : this._firstPT === r && (this._firstPT = r._next)),
            (r = r._next);
        return !1;
      }),
      (r._roundProps = function (t, e) {
        for (var i = this._firstPT; i; )
          (t[this._propName] || (null != i.n && t[i.n.split(this._propName + '_').join('')])) && (i.r = e),
            (i = i._next);
      }),
      (M._onPluginEvent = function (t, e) {
        var i,
          r,
          n,
          o,
          s,
          a = e._firstPT;
        if ('_onInitAllProps' === t) {
          for (; a; ) {
            for (s = a._next, r = n; r && r.pr > a.pr; ) r = r._next;
            (a._prev = r ? r._prev : o) ? (a._prev._next = a) : (n = a),
              (a._next = r) ? (r._prev = a) : (o = a),
              (a = s);
          }
          a = e._firstPT = n;
        }
        for (; a; ) a.pg && 'function' == typeof a.t[t] && a.t[t]() && (i = !0), (a = a._next);
        return i;
      }),
      (z.activate = function (t) {
        for (var e = t.length; --e > -1; ) t[e].API === z.API && (D[new t[e]()._propName] = t[e]);
        return !0;
      }),
      (p.plugin = function (t) {
        if (!(t && t.propName && t.init && t.API)) throw 'illegal plugin definition.';
        var e,
          i = t.propName,
          r = t.priority || 0,
          n = t.overwriteProps,
          o = {
            init: '_onInitTween',
            set: 'setRatio',
            kill: '_kill',
            round: '_roundProps',
            initAll: '_onInitAllProps',
          },
          s = f(
            'plugins.' + i.charAt(0).toUpperCase() + i.substr(1) + 'Plugin',
            function () {
              z.call(this, i, r), (this._overwriteProps = n || []);
            },
            t.global === !0,
          ),
          a = (s.prototype = new z(i));
        (a.constructor = s), (s.API = t.API);
        for (e in o) 'function' == typeof t[e] && (a[o[e]] = t[e]);
        return (s.version = t.version), z.activate([s]), s;
      }),
      (e = t._gsQueue))
    ) {
      for (i = 0; e.length > i; i++) e[i]();
      for (r in c) c[r].func || t.console.log('GSAP encountered missing dependency: com.greensock.' + r);
    }
    o = !1;
  })(window),
  define('TWEEN', function () {}),
  (window._gsQueue || (window._gsQueue = [])).push(function () {
    window._gsDefine(
      'easing.Back',
      ['easing.Ease'],
      function (t) {
        var e,
          i,
          r,
          n = window.GreenSockGlobals || window,
          o = n.com.greensock,
          s = 2 * Math.PI,
          a = Math.PI / 2,
          h = o._class,
          l = function (e, i) {
            var r = h('easing.' + e, function () {}, !0),
              n = (r.prototype = new t());
            return (n.constructor = r), (n.getRatio = i), r;
          },
          u = t.register || function () {},
          c = function (t, e, i, r) {
            var n = h('easing.' + t, { easeOut: new e(), easeIn: new i(), easeInOut: new r() }, !0);
            return u(n, t), n;
          },
          d = function (t, e, i) {
            (this.t = t),
              (this.v = e),
              i && ((this.next = i), (i.prev = this), (this.c = i.v - e), (this.gap = i.t - t));
          },
          p = function (e, i) {
            var r = h(
                'easing.' + e,
                function (t) {
                  (this._p1 = t || 0 === t ? t : 1.70158), (this._p2 = 1.525 * this._p1);
                },
                !0,
              ),
              n = (r.prototype = new t());
            return (
              (n.constructor = r),
              (n.getRatio = i),
              (n.config = function (t) {
                return new r(t);
              }),
              r
            );
          },
          f = c(
            'Back',
            p('BackOut', function (t) {
              return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
            }),
            p('BackIn', function (t) {
              return t * t * ((this._p1 + 1) * t - this._p1);
            }),
            p('BackInOut', function (t) {
              return 1 > (t *= 2)
                ? 0.5 * t * t * ((this._p2 + 1) * t - this._p2)
                : 0.5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
            }),
          ),
          m = h(
            'easing.SlowMo',
            function (t, e, i) {
              (e = e || 0 === e ? e : 0.7),
                null == t ? (t = 0.7) : t > 1 && (t = 1),
                (this._p = 1 !== t ? e : 0),
                (this._p1 = (1 - t) / 2),
                (this._p2 = t),
                (this._p3 = this._p1 + this._p2),
                (this._calcEnd = i === !0);
            },
            !0,
          ),
          v = (m.prototype = new t());
        return (
          (v.constructor = m),
          (v.getRatio = function (t) {
            var e = t + (0.5 - t) * this._p;
            return this._p1 > t
              ? this._calcEnd
                ? 1 - (t = 1 - t / this._p1) * t
                : e - (t = 1 - t / this._p1) * t * t * t * e
              : t > this._p3
                ? this._calcEnd
                  ? 1 - (t = (t - this._p3) / this._p1) * t
                  : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t
                : this._calcEnd
                  ? 1
                  : e;
          }),
          (m.ease = new m(0.7, 0.7)),
          (v.config = m.config =
            function (t, e, i) {
              return new m(t, e, i);
            }),
          (e = h(
            'easing.SteppedEase',
            function (t) {
              (t = t || 1), (this._p1 = 1 / t), (this._p2 = t + 1);
            },
            !0,
          )),
          (v = e.prototype = new t()),
          (v.constructor = e),
          (v.getRatio = function (t) {
            return 0 > t ? (t = 0) : t >= 1 && (t = 0.999999999), ((this._p2 * t) >> 0) * this._p1;
          }),
          (v.config = e.config =
            function (t) {
              return new e(t);
            }),
          (i = h(
            'easing.RoughEase',
            function (e) {
              e = e || {};
              for (
                var i,
                  r,
                  n,
                  o,
                  s,
                  a,
                  h = e.taper || 'none',
                  l = [],
                  u = 0,
                  c = 0 | (e.points || 20),
                  p = c,
                  f = e.randomize !== !1,
                  m = e.clamp === !0,
                  v = e.template instanceof t ? e.template : null,
                  g = 'number' == typeof e.strength ? 0.4 * e.strength : 0.4;
                --p > -1;

              )
                (i = f ? Math.random() : (1 / c) * p),
                  (r = v ? v.getRatio(i) : i),
                  'none' === h
                    ? (n = g)
                    : 'out' === h
                      ? ((o = 1 - i), (n = o * o * g))
                      : 'in' === h
                        ? (n = i * i * g)
                        : 0.5 > i
                          ? ((o = 2 * i), (n = 0.5 * o * o * g))
                          : ((o = 2 * (1 - i)), (n = 0.5 * o * o * g)),
                  f ? (r += Math.random() * n - 0.5 * n) : p % 2 ? (r += 0.5 * n) : (r -= 0.5 * n),
                  m && (r > 1 ? (r = 1) : 0 > r && (r = 0)),
                  (l[u++] = { x: i, y: r });
              for (
                l.sort(function (t, e) {
                  return t.x - e.x;
                }),
                  a = new d(1, 1, null),
                  p = c;
                --p > -1;

              )
                (s = l[p]), (a = new d(s.x, s.y, a));
              this._prev = new d(0, 0, 0 !== a.t ? a : a.next);
            },
            !0,
          )),
          (v = i.prototype = new t()),
          (v.constructor = i),
          (v.getRatio = function (t) {
            var e = this._prev;
            if (t > e.t) {
              for (; e.next && t >= e.t; ) e = e.next;
              e = e.prev;
            } else for (; e.prev && e.t >= t; ) e = e.prev;
            return (this._prev = e), e.v + ((t - e.t) / e.gap) * e.c;
          }),
          (v.config = function (t) {
            return new i(t);
          }),
          (i.ease = new i()),
          c(
            'Bounce',
            l('BounceOut', function (t) {
              return 1 / 2.75 > t
                ? 7.5625 * t * t
                : 2 / 2.75 > t
                  ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                  : 2.5 / 2.75 > t
                    ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                    : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            }),
            l('BounceIn', function (t) {
              return 1 / 2.75 > (t = 1 - t)
                ? 1 - 7.5625 * t * t
                : 2 / 2.75 > t
                  ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                  : 2.5 / 2.75 > t
                    ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                    : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
            }),
            l('BounceInOut', function (t) {
              var e = 0.5 > t;
              return (
                (t = e ? 1 - 2 * t : 2 * t - 1),
                (t =
                  1 / 2.75 > t
                    ? 7.5625 * t * t
                    : 2 / 2.75 > t
                      ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                      : 2.5 / 2.75 > t
                        ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                        : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375),
                e ? 0.5 * (1 - t) : 0.5 * t + 0.5
              );
            }),
          ),
          c(
            'Circ',
            l('CircOut', function (t) {
              return Math.sqrt(1 - (t -= 1) * t);
            }),
            l('CircIn', function (t) {
              return -(Math.sqrt(1 - t * t) - 1);
            }),
            l('CircInOut', function (t) {
              return 1 > (t *= 2) ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
            }),
          ),
          (r = function (e, i, r) {
            var n = h(
                'easing.' + e,
                function (t, e) {
                  (this._p1 = t || 1),
                    (this._p2 = e || r),
                    (this._p3 = (this._p2 / s) * (Math.asin(1 / this._p1) || 0));
                },
                !0,
              ),
              o = (n.prototype = new t());
            return (
              (o.constructor = n),
              (o.getRatio = i),
              (o.config = function (t, e) {
                return new n(t, e);
              }),
              n
            );
          }),
          c(
            'Elastic',
            r(
              'ElasticOut',
              function (t) {
                return this._p1 * Math.pow(2, -10 * t) * Math.sin(((t - this._p3) * s) / this._p2) + 1;
              },
              0.3,
            ),
            r(
              'ElasticIn',
              function (t) {
                return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t - this._p3) * s) / this._p2));
              },
              0.3,
            ),
            r(
              'ElasticInOut',
              function (t) {
                return 1 > (t *= 2)
                  ? -0.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t - this._p3) * s) / this._p2)
                  : 0.5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin(((t - this._p3) * s) / this._p2) + 1;
              },
              0.45,
            ),
          ),
          c(
            'Expo',
            l('ExpoOut', function (t) {
              return 1 - Math.pow(2, -10 * t);
            }),
            l('ExpoIn', function (t) {
              return Math.pow(2, 10 * (t - 1)) - 0.001;
            }),
            l('ExpoInOut', function (t) {
              return 1 > (t *= 2) ? 0.5 * Math.pow(2, 10 * (t - 1)) : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
            }),
          ),
          c(
            'Sine',
            l('SineOut', function (t) {
              return Math.sin(t * a);
            }),
            l('SineIn', function (t) {
              return -Math.cos(t * a) + 1;
            }),
            l('SineInOut', function (t) {
              return -0.5 * (Math.cos(Math.PI * t) - 1);
            }),
          ),
          h(
            'easing.EaseLookup',
            {
              find: function (e) {
                return t.map[e];
              },
            },
            !0,
          ),
          u(n.SlowMo, 'SlowMo', 'ease,'),
          u(i, 'RoughEase', 'ease,'),
          u(e, 'SteppedEase', 'ease,'),
          f
        );
      },
      !0,
    );
  }),
  window._gsDefine && window._gsQueue.pop()(),
  define('EASEPACK', function () {}),
  (window._gsQueue || (window._gsQueue = [])).push(function () {
    window._gsDefine(
      'plugins.CSSPlugin',
      ['plugins.TweenPlugin', 'TweenLite'],
      function (t, e) {
        var i,
          r,
          n,
          o,
          s = function () {
            t.call(this, 'css'), (this._overwriteProps.length = 0);
          },
          a = {},
          h = (s.prototype = new t('css'));
        (h.constructor = s),
          (s.version = '1.9.6'),
          (s.API = 2),
          (s.defaultTransformPerspective = 0),
          (h = 'px'),
          (s.suffixMap = {
            top: h,
            right: h,
            bottom: h,
            left: h,
            width: h,
            height: h,
            fontSize: h,
            padding: h,
            margin: h,
            perspective: h,
          });
        var l,
          u,
          c,
          d,
          p,
          f,
          m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
          v = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
          g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
          y = /[^\d\-\.]/g,
          x = /(?:\d|\-|\+|=|#|\.)*/g,
          _ = /opacity *= *([^)]*)/,
          b = /opacity:([^;]*)/,
          w = /alpha\(opacity *=.+?\)/i,
          T = /^(rgb|hsl)/,
          S = /([A-Z])/g,
          E = /-([a-z])/gi,
          A = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
          C = function (t, e) {
            return e.toUpperCase();
          },
          M = /(?:Left|Right|Width)/i,
          R = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
          P = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
          O = /,(?=[^\)]*(?:\(|$))/gi,
          D = Math.PI / 180,
          F = 180 / Math.PI,
          L = {},
          k = document,
          I = k.createElement('div'),
          B = k.createElement('img'),
          N = (s._internals = { _specialProps: a }),
          U = navigator.userAgent,
          X = (function () {
            var t,
              e = U.indexOf('Android'),
              i = k.createElement('div');
            return (
              (c =
                -1 !== U.indexOf('Safari') &&
                -1 === U.indexOf('Chrome') &&
                (-1 === e || Number(U.substr(e + 8, 1)) > 3)),
              (p = c && 6 > Number(U.substr(U.indexOf('Version/') + 8, 1))),
              (d = -1 !== U.indexOf('Firefox')),
              /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(U),
              (f = parseFloat(RegExp.$1)),
              (i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>"),
              (t = i.getElementsByTagName('a')[0]),
              t ? /^0.55/.test(t.style.opacity) : !1
            );
          })(),
          j = function (t) {
            return _.test('string' == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || '')
              ? parseFloat(RegExp.$1) / 100
              : 1;
          },
          z = function (t) {
            window.console && void 0;
          },
          Y = '',
          W = '',
          G = function (t, e) {
            e = e || I;
            var i,
              r,
              n = e.style;
            if (void 0 !== n[t]) return t;
            for (
              t = t.charAt(0).toUpperCase() + t.substr(1), i = ['O', 'Moz', 'ms', 'Ms', 'Webkit'], r = 5;
              --r > -1 && void 0 === n[i[r] + t];

            );
            return r >= 0 ? ((W = 3 === r ? 'ms' : i[r]), (Y = '-' + W.toLowerCase() + '-'), W + t) : null;
          },
          H = k.defaultView ? k.defaultView.getComputedStyle : function () {},
          V = (s.getStyle = function (t, e, i, r, n) {
            var o;
            return X || 'opacity' !== e
              ? (!r && t.style[e]
                  ? (o = t.style[e])
                  : (i = i || H(t, null))
                    ? ((t = i.getPropertyValue(e.replace(S, '-$1').toLowerCase())), (o = t || i.length ? t : i[e]))
                    : t.currentStyle && ((i = t.currentStyle), (o = i[e])),
                null == n || (o && 'none' !== o && 'auto' !== o && 'auto auto' !== o) ? o : n)
              : j(t);
          }),
          q = function (t, e, i, r, n) {
            if ('px' === r || !r) return i;
            if ('auto' === r || !i) return 0;
            var o,
              s = M.test(e),
              a = t,
              h = I.style,
              l = 0 > i;
            return (
              l && (i = -i),
              '%' === r && -1 !== e.indexOf('border')
                ? (o = (i / 100) * (s ? t.clientWidth : t.clientHeight))
                : ((h.cssText = 'border-style:solid; border-width:0; position:absolute; line-height:0;'),
                  '%' !== r && a.appendChild
                    ? (h[s ? 'borderLeftWidth' : 'borderTopWidth'] = i + r)
                    : ((a = t.parentNode || k.body), (h[s ? 'width' : 'height'] = i + r)),
                  a.appendChild(I),
                  (o = parseFloat(I[s ? 'offsetWidth' : 'offsetHeight'])),
                  a.removeChild(I),
                  0 !== o || n || (o = q(t, e, i, r, !0))),
              l ? -o : o
            );
          },
          K = function (t, e, i) {
            if ('absolute' !== V(t, 'position', i)) return 0;
            var r = 'left' === e ? 'Left' : 'Top',
              n = V(t, 'margin' + r, i);
            return t['offset' + r] - (q(t, e, parseFloat(n), n.replace(x, '')) || 0);
          },
          Q = function (t, e) {
            var i,
              r,
              n = {};
            if ((e = e || H(t, null)))
              if ((i = e.length)) for (; --i > -1; ) n[e[i].replace(E, C)] = e.getPropertyValue(e[i]);
              else for (i in e) n[i] = e[i];
            else if ((e = t.currentStyle || t.style)) for (i in e) n[i.replace(E, C)] = e[i];
            return (
              X || (n.opacity = j(t)),
              (r = Te(t, e, !1)),
              (n.rotation = r.rotation * F),
              (n.skewX = r.skewX * F),
              (n.scaleX = r.scaleX),
              (n.scaleY = r.scaleY),
              (n.x = r.x),
              (n.y = r.y),
              we &&
                ((n.z = r.z), (n.rotationX = r.rotationX * F), (n.rotationY = r.rotationY * F), (n.scaleZ = r.scaleZ)),
              n.filters && delete n.filters,
              n
            );
          },
          $ = function (t, e, i, r, n) {
            var o,
              s,
              a,
              h = {},
              l = t.style;
            for (s in i)
              'cssText' !== s &&
                'length' !== s &&
                isNaN(s) &&
                (e[s] !== (o = i[s]) || (n && n[s])) &&
                -1 === s.indexOf('Origin') &&
                ('number' == typeof o || 'string' == typeof o) &&
                ((h[s] =
                  'auto' !== o || ('left' !== s && 'top' !== s)
                    ? ('' !== o && 'auto' !== o && 'none' !== o) ||
                      'string' != typeof e[s] ||
                      '' === e[s].replace(y, '')
                      ? o
                      : 0
                    : K(t, s)),
                void 0 !== l[s] && (a = new ce(l, s, l[s], a)));
            if (r) for (s in r) 'className' !== s && (h[s] = r[s]);
            return { difs: h, firstMPT: a };
          },
          J = { width: ['Left', 'Right'], height: ['Top', 'Bottom'] },
          Z = ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
          te = function (t, e, i) {
            var r = parseFloat('width' === e ? t.offsetWidth : t.offsetHeight),
              n = J[e],
              o = n.length;
            for (i = i || H(t, null); --o > -1; )
              (r -= parseFloat(V(t, 'padding' + n[o], i, !0)) || 0),
                (r -= parseFloat(V(t, 'border' + n[o] + 'Width', i, !0)) || 0);
            return r;
          },
          ee = function (t, e) {
            (null == t || '' === t || 'auto' === t || 'auto auto' === t) && (t = '0 0');
            var i = t.split(' '),
              r = -1 !== t.indexOf('left') ? '0%' : -1 !== t.indexOf('right') ? '100%' : i[0],
              n = -1 !== t.indexOf('top') ? '0%' : -1 !== t.indexOf('bottom') ? '100%' : i[1];
            return (
              null == n ? (n = '0') : 'center' === n && (n = '50%'),
              ('center' === r || isNaN(parseFloat(r))) && (r = '50%'),
              e &&
                ((e.oxp = -1 !== r.indexOf('%')),
                (e.oyp = -1 !== n.indexOf('%')),
                (e.oxr = '=' === r.charAt(1)),
                (e.oyr = '=' === n.charAt(1)),
                (e.ox = parseFloat(r.replace(y, ''))),
                (e.oy = parseFloat(n.replace(y, '')))),
              r + ' ' + n + (i.length > 2 ? ' ' + i[2] : '')
            );
          },
          ie = function (t, e) {
            return 'string' == typeof t && '=' === t.charAt(1)
              ? parseInt(t.charAt(0) + '1', 10) * parseFloat(t.substr(2))
              : parseFloat(t) - parseFloat(e);
          },
          re = function (t, e) {
            return null == t
              ? e
              : 'string' == typeof t && '=' === t.charAt(1)
                ? parseInt(t.charAt(0) + '1', 10) * Number(t.substr(2)) + e
                : parseFloat(t);
          },
          ne = function (t, e, i, r) {
            var n,
              o,
              s,
              a,
              h = 1e-6;
            return (
              null == t
                ? (a = e)
                : 'number' == typeof t
                  ? (a = t * D)
                  : ((n = 2 * Math.PI),
                    (o = t.split('_')),
                    (s =
                      Number(o[0].replace(y, '')) * (-1 === t.indexOf('rad') ? D : 1) - ('=' === t.charAt(1) ? 0 : e)),
                    o.length &&
                      (r && (r[i] = e + s),
                      -1 !== t.indexOf('short') && ((s %= n), s !== s % (n / 2) && (s = 0 > s ? s + n : s - n)),
                      -1 !== t.indexOf('_cw') && 0 > s
                        ? (s = ((s + 9999999999 * n) % n) - (0 | (s / n)) * n)
                        : -1 !== t.indexOf('ccw') && s > 0 && (s = ((s - 9999999999 * n) % n) - (0 | (s / n)) * n)),
                    (a = e + s)),
              h > a && a > -h && (a = 0),
              a
            );
          },
          oe = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0],
          },
          se = function (t, e, i) {
            return (
              (t = 0 > t ? t + 1 : t > 1 ? t - 1 : t),
              0 |
                (255 * (1 > 6 * t ? e + 6 * (i - e) * t : 0.5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) +
                  0.5)
            );
          },
          ae = function (t) {
            var e, i, r, n, o, s;
            return t && '' !== t
              ? 'number' == typeof t
                ? [t >> 16, 255 & (t >> 8), 255 & t]
                : (',' === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)),
                  oe[t]
                    ? oe[t]
                    : '#' === t.charAt(0)
                      ? (4 === t.length &&
                          ((e = t.charAt(1)), (i = t.charAt(2)), (r = t.charAt(3)), (t = '#' + e + e + i + i + r + r)),
                        (t = parseInt(t.substr(1), 16)),
                        [t >> 16, 255 & (t >> 8), 255 & t])
                      : 'hsl' === t.substr(0, 3)
                        ? ((t = t.match(m)),
                          (n = (Number(t[0]) % 360) / 360),
                          (o = Number(t[1]) / 100),
                          (s = Number(t[2]) / 100),
                          (i = 0.5 >= s ? s * (o + 1) : s + o - s * o),
                          (e = 2 * s - i),
                          t.length > 3 && (t[3] = Number(t[3])),
                          (t[0] = se(n + 1 / 3, e, i)),
                          (t[1] = se(n, e, i)),
                          (t[2] = se(n - 1 / 3, e, i)),
                          t)
                        : ((t = t.match(m) || oe.transparent),
                          (t[0] = Number(t[0])),
                          (t[1] = Number(t[1])),
                          (t[2] = Number(t[2])),
                          t.length > 3 && (t[3] = Number(t[3])),
                          t))
              : oe.black;
          },
          he = '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b';
        for (h in oe) he += '|' + h + '\\b';
        he = RegExp(he + ')', 'gi');
        var le = function (t, e, i, r) {
            if (null == t)
              return function (t) {
                return t;
              };
            var n,
              o = e ? (t.match(he) || [''])[0] : '',
              s = t.split(o).join('').match(g) || [],
              a = t.substr(0, t.indexOf(s[0])),
              h = ')' === t.charAt(t.length - 1) ? ')' : '',
              l = -1 !== t.indexOf(' ') ? ' ' : ',',
              u = s.length,
              c = u > 0 ? s[0].replace(m, '') : '';
            return u
              ? (n = e
                  ? function (t) {
                      var e, d, p, f;
                      if ('number' == typeof t) t += c;
                      else if (r && O.test(t)) {
                        for (f = t.replace(O, '|').split('|'), p = 0; f.length > p; p++) f[p] = n(f[p]);
                        return f.join(',');
                      }
                      if (
                        ((e = (t.match(he) || [o])[0]),
                        (d = t.split(e).join('').match(g) || []),
                        (p = d.length),
                        u > p--)
                      )
                        for (; u > ++p; ) d[p] = i ? d[0 | ((p - 1) / 2)] : s[p];
                      return a + d.join(l) + l + e + h + (-1 !== t.indexOf('inset') ? ' inset' : '');
                    }
                  : function (t) {
                      var e, o, d;
                      if ('number' == typeof t) t += c;
                      else if (r && O.test(t)) {
                        for (o = t.replace(O, '|').split('|'), d = 0; o.length > d; d++) o[d] = n(o[d]);
                        return o.join(',');
                      }
                      if (((e = t.match(g) || []), (d = e.length), u > d--))
                        for (; u > ++d; ) e[d] = i ? e[0 | ((d - 1) / 2)] : s[d];
                      return a + e.join(l) + h;
                    })
              : function (t) {
                  return t;
                };
          },
          ue = function (t) {
            return (
              (t = t.split(',')),
              function (e, i, r, n, o, s, a) {
                var h,
                  l = (i + '').split(' ');
                for (a = {}, h = 0; 4 > h; h++) a[t[h]] = l[h] = l[h] || l[((h - 1) / 2) >> 0];
                return n.parse(e, a, o, s);
              }
            );
          },
          ce =
            ((N._setPluginRatio = function (t) {
              this.plugin.setRatio(t);
              for (var e, i, r, n, o = this.data, s = o.proxy, a = o.firstMPT, h = 1e-6; a; )
                (e = s[a.v]),
                  a.r ? (e = e > 0 ? 0 | (e + 0.5) : 0 | (e - 0.5)) : h > e && e > -h && (e = 0),
                  (a.t[a.p] = e),
                  (a = a._next);
              if ((o.autoRotate && (o.autoRotate.rotation = s.rotation), 1 === t))
                for (a = o.firstMPT; a; ) {
                  if (((i = a.t), i.type)) {
                    if (1 === i.type) {
                      for (n = i.xs0 + i.s + i.xs1, r = 1; i.l > r; r++) n += i['xn' + r] + i['xs' + (r + 1)];
                      i.e = n;
                    }
                  } else i.e = i.s + i.xs0;
                  a = a._next;
                }
            }),
            function (t, e, i, r, n) {
              (this.t = t), (this.p = e), (this.v = i), (this.r = n), r && ((r._prev = this), (this._next = r));
            }),
          de =
            ((N._parseToProxy = function (t, e, i, r, n, o) {
              var s,
                a,
                h,
                l,
                u,
                c = r,
                d = {},
                p = {},
                f = i._transform,
                m = L;
              for (
                i._transform = null,
                  L = e,
                  r = u = i.parse(t, e, r, n),
                  L = m,
                  o && ((i._transform = f), c && ((c._prev = null), c._prev && (c._prev._next = null)));
                r && r !== c;

              ) {
                if (
                  1 >= r.type &&
                  ((a = r.p),
                  (p[a] = r.s + r.c),
                  (d[a] = r.s),
                  o || ((l = new ce(r, 's', a, l, r.r)), (r.c = 0)),
                  1 === r.type)
                )
                  for (s = r.l; --s > 0; )
                    (h = 'xn' + s),
                      (a = r.p + '_' + h),
                      (p[a] = r.data[h]),
                      (d[a] = r[h]),
                      o || (l = new ce(r, h, a, l, r.rxp[h]));
                r = r._next;
              }
              return { proxy: d, end: p, firstMPT: l, pt: u };
            }),
            (N.CSSPropTween = function (t, e, r, n, s, a, h, l, u, c, d) {
              (this.t = t),
                (this.p = e),
                (this.s = r),
                (this.c = n),
                (this.n = h || 'css_' + e),
                t instanceof de || o.push(this.n),
                (this.r = l),
                (this.type = a || 0),
                u && ((this.pr = u), (i = !0)),
                (this.b = void 0 === c ? r : c),
                (this.e = void 0 === d ? r + n : d),
                s && ((this._next = s), (s._prev = this));
            })),
          pe = (s.parseComplex = function (t, e, i, r, n, o, s, a, h, u) {
            (s = new de(t, e, 0, 0, s, u ? 2 : 1, null, !1, a, i, r)), (r += '');
            var c,
              d,
              p,
              f,
              g,
              y,
              x,
              _,
              b,
              w,
              S,
              E,
              A = i.split(', ').join(',').split(' '),
              C = r.split(', ').join(',').split(' '),
              M = A.length,
              R = l !== !1;
            for (
              (-1 !== r.indexOf(',') || -1 !== i.indexOf(',')) &&
                ((A = A.join(' ').replace(O, ', ').split(' ')),
                (C = C.join(' ').replace(O, ', ').split(' ')),
                (M = A.length)),
                M !== C.length && ((A = (o || '').split(' ')), (M = A.length)),
                s.plugin = h,
                s.setRatio = u,
                c = 0;
              M > c;
              c++
            )
              if (((f = A[c]), (g = C[c]), (_ = parseFloat(f)), _ || 0 === _))
                s.appendXtra('', _, ie(g, _), g.replace(v, ''), R && -1 !== g.indexOf('px'), !0);
              else if (n && ('#' === f.charAt(0) || oe[f] || T.test(f)))
                (E = ',' === g.charAt(g.length - 1) ? '),' : ')'),
                  (f = ae(f)),
                  (g = ae(g)),
                  (b = f.length + g.length > 6),
                  b && !X && 0 === g[3]
                    ? ((s['xs' + s.l] += s.l ? ' transparent' : 'transparent'),
                      (s.e = s.e.split(C[c]).join('transparent')))
                    : (X || (b = !1),
                      s
                        .appendXtra(b ? 'rgba(' : 'rgb(', f[0], g[0] - f[0], ',', !0, !0)
                        .appendXtra('', f[1], g[1] - f[1], ',', !0)
                        .appendXtra('', f[2], g[2] - f[2], b ? ',' : E, !0),
                      b && ((f = 4 > f.length ? 1 : f[3]), s.appendXtra('', f, (4 > g.length ? 1 : g[3]) - f, E, !1)));
              else if ((y = f.match(m))) {
                if (((x = g.match(v)), !x || x.length !== y.length)) return s;
                for (p = 0, d = 0; y.length > d; d++)
                  (S = y[d]),
                    (w = f.indexOf(S, p)),
                    s.appendXtra(
                      f.substr(p, w - p),
                      Number(S),
                      ie(x[d], S),
                      '',
                      R && 'px' === f.substr(w + S.length, 2),
                      0 === d,
                    ),
                    (p = w + S.length);
                s['xs' + s.l] += f.substr(p);
              } else s['xs' + s.l] += s.l ? ' ' + f : f;
            if (-1 !== r.indexOf('=') && s.data) {
              for (E = s.xs0 + s.data.s, c = 1; s.l > c; c++) E += s['xs' + c] + s.data['xn' + c];
              s.e = E + s['xs' + c];
            }
            return s.l || ((s.type = -1), (s.xs0 = s.e)), s.xfirst || s;
          }),
          fe = 9;
        for (h = de.prototype, h.l = h.pr = 0; --fe > 0; ) (h['xn' + fe] = 0), (h['xs' + fe] = '');
        (h.xs0 = ''),
          (h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null),
          (h.appendXtra = function (t, e, i, r, n, o) {
            var s = this,
              a = s.l;
            return (
              (s['xs' + a] += o && a ? ' ' + t : t || ''),
              i || 0 === a || s.plugin
                ? (s.l++,
                  (s.type = s.setRatio ? 2 : 1),
                  (s['xs' + s.l] = r || ''),
                  a > 0
                    ? ((s.data['xn' + a] = e + i),
                      (s.rxp['xn' + a] = n),
                      (s['xn' + a] = e),
                      s.plugin ||
                        ((s.xfirst = new de(s, 'xn' + a, e, i, s.xfirst || s, 0, s.n, n, s.pr)), (s.xfirst.xs0 = 0)),
                      s)
                    : ((s.data = { s: e + i }), (s.rxp = {}), (s.s = e), (s.c = i), (s.r = n), s))
                : ((s['xs' + a] += e + (r || '')), s)
            );
          });
        var me = function (t, e) {
            (e = e || {}),
              (this.p = e.prefix ? G(t) || t : t),
              (a[t] = a[this.p] = this),
              (this.format = e.formatter || le(e.defaultValue, e.color, e.collapsible, e.multi)),
              e.parser && (this.parse = e.parser),
              (this.clrs = e.color),
              (this.multi = e.multi),
              (this.keyword = e.keyword),
              (this.dflt = e.defaultValue),
              (this.pr = e.priority || 0);
          },
          ve = (N._registerComplexSpecialProp = function (t, e, i) {
            'object' != typeof e && (e = { parser: i });
            var r,
              n,
              o = t.split(','),
              s = e.defaultValue;
            for (i = i || [s], r = 0; o.length > r; r++)
              (e.prefix = 0 === r && e.prefix), (e.defaultValue = i[r] || s), (n = new me(o[r], e));
          }),
          ge = function (t) {
            if (!a[t]) {
              var e = t.charAt(0).toUpperCase() + t.substr(1) + 'Plugin';
              ve(t, {
                parser: function (t, i, r, n, o, s, h) {
                  var l = (window.GreenSockGlobals || window).com.greensock.plugins[e];
                  return l
                    ? (l._cssRegister(), a[r].parse(t, i, r, n, o, s, h))
                    : (z('Error: ' + e + ' js file not loaded.'), o);
                },
              });
            }
          };
        (h = me.prototype),
          (h.parseComplex = function (t, e, i, r, n, o) {
            var s,
              a,
              h,
              l,
              u,
              c,
              d = this.keyword;
            if (
              (this.multi &&
                (O.test(i) || O.test(e)
                  ? ((a = e.replace(O, '|').split('|')), (h = i.replace(O, '|').split('|')))
                  : d && ((a = [e]), (h = [i]))),
              h)
            ) {
              for (l = h.length > a.length ? h.length : a.length, s = 0; l > s; s++)
                (e = a[s] = a[s] || this.dflt),
                  (i = h[s] = h[s] || this.dflt),
                  d && ((u = e.indexOf(d)), (c = i.indexOf(d)), u !== c && ((i = -1 === c ? h : a), (i[s] += ' ' + d)));
              (e = a.join(', ')), (i = h.join(', '));
            }
            return pe(t, this.p, e, i, this.clrs, this.dflt, r, this.pr, n, o);
          }),
          (h.parse = function (t, e, i, r, o, s) {
            return this.parseComplex(t.style, this.format(V(t, this.p, n, !1, this.dflt)), this.format(e), o, s);
          }),
          (s.registerSpecialProp = function (t, e, i) {
            ve(t, {
              parser: function (t, r, n, o, s, a) {
                var h = new de(t, n, 0, 0, s, 2, n, !1, i);
                return (h.plugin = a), (h.setRatio = e(t, r, o._tween, n)), h;
              },
              priority: i,
            });
          });
        var ye = 'scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective'.split(','),
          xe = G('transform'),
          _e = Y + 'transform',
          be = G('transformOrigin'),
          we = null !== G('perspective'),
          Te = function (t, e, i) {
            var r,
              n,
              o,
              a,
              h,
              l,
              u,
              c,
              d,
              p,
              f,
              m,
              v,
              g = i ? t._gsTransform || { skewY: 0 } : { skewY: 0 },
              y = 0 > g.scaleX,
              x = 2e-5,
              _ = 1e5,
              b = -Math.PI + 1e-4,
              w = Math.PI - 1e-4,
              T = we ? parseFloat(V(t, be, e, !1, '0 0 0').split(' ')[2]) || g.zOrigin || 0 : 0;
            if (xe) r = V(t, _e, e, !0);
            else if (t.currentStyle)
              if (((r = t.currentStyle.filter.match(R)), r && 4 === r.length))
                r = [
                  r[0].substr(4),
                  Number(r[2].substr(4)),
                  Number(r[1].substr(4)),
                  r[3].substr(4),
                  g.x || 0,
                  g.y || 0,
                ].join(',');
              else {
                if (null != g.x) return g;
                r = '';
              }
            for (n = (r || '').match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], o = n.length; --o > -1; )
              (a = Number(n[o])), (n[o] = (h = a - (a |= 0)) ? (0 | (h * _ + (0 > h ? -0.5 : 0.5))) / _ + a : a);
            if (16 === n.length) {
              var S = n[8],
                E = n[9],
                A = n[10],
                C = n[12],
                M = n[13],
                P = n[14];
              if (
                (g.zOrigin &&
                  ((P = -g.zOrigin), (C = S * P - n[12]), (M = E * P - n[13]), (P = A * P + g.zOrigin - n[14])),
                !i || null == g.rotationX)
              ) {
                var O,
                  D,
                  F,
                  L,
                  k,
                  I,
                  B,
                  N = n[0],
                  U = n[1],
                  X = n[2],
                  j = n[3],
                  z = n[4],
                  Y = n[5],
                  W = n[6],
                  G = n[7],
                  H = n[11],
                  q = (g.rotationX = Math.atan2(W, A)),
                  K = b > q || q > w;
                q &&
                  ((L = Math.cos(-q)),
                  (k = Math.sin(-q)),
                  (O = z * L + S * k),
                  (D = Y * L + E * k),
                  (F = W * L + A * k),
                  (S = z * -k + S * L),
                  (E = Y * -k + E * L),
                  (A = W * -k + A * L),
                  (H = G * -k + H * L),
                  (z = O),
                  (Y = D),
                  (W = F)),
                  (q = g.rotationY = Math.atan2(S, N)),
                  q &&
                    ((I = b > q || q > w),
                    (L = Math.cos(-q)),
                    (k = Math.sin(-q)),
                    (O = N * L - S * k),
                    (D = U * L - E * k),
                    (F = X * L - A * k),
                    (E = U * k + E * L),
                    (A = X * k + A * L),
                    (H = j * k + H * L),
                    (N = O),
                    (U = D),
                    (X = F)),
                  (q = g.rotation = Math.atan2(U, Y)),
                  q &&
                    ((B = b > q || q > w),
                    (L = Math.cos(-q)),
                    (k = Math.sin(-q)),
                    (N = N * L + z * k),
                    (D = U * L + Y * k),
                    (Y = U * -k + Y * L),
                    (W = X * -k + W * L),
                    (U = D)),
                  B && K
                    ? (g.rotation = g.rotationX = 0)
                    : B && I
                      ? (g.rotation = g.rotationY = 0)
                      : I && K && (g.rotationY = g.rotationX = 0),
                  (g.scaleX = (0 | (Math.sqrt(N * N + U * U) * _ + 0.5)) / _),
                  (g.scaleY = (0 | (Math.sqrt(Y * Y + E * E) * _ + 0.5)) / _),
                  (g.scaleZ = (0 | (Math.sqrt(W * W + A * A) * _ + 0.5)) / _),
                  (g.skewX = 0),
                  (g.perspective = H ? 1 / (0 > H ? -H : H) : 0),
                  (g.x = C),
                  (g.y = M),
                  (g.z = P);
              }
            } else if (
              !(
                (we && 0 !== n.length && g.x === n[4] && g.y === n[5] && (g.rotationX || g.rotationY)) ||
                (void 0 !== g.x && 'none' === V(t, 'display', e))
              )
            ) {
              var Q = n.length >= 6,
                $ = Q ? n[0] : 1,
                J = n[1] || 0,
                Z = n[2] || 0,
                te = Q ? n[3] : 1;
              (g.x = n[4] || 0),
                (g.y = n[5] || 0),
                (l = Math.sqrt($ * $ + J * J)),
                (u = Math.sqrt(te * te + Z * Z)),
                (c = $ || J ? Math.atan2(J, $) : g.rotation || 0),
                (d = Z || te ? Math.atan2(Z, te) + c : g.skewX || 0),
                (p = l - Math.abs(g.scaleX || 0)),
                (f = u - Math.abs(g.scaleY || 0)),
                Math.abs(d) > Math.PI / 2 &&
                  Math.abs(d) < 1.5 * Math.PI &&
                  (y
                    ? ((l *= -1), (d += 0 >= c ? Math.PI : -Math.PI), (c += 0 >= c ? Math.PI : -Math.PI))
                    : ((u *= -1), (d += 0 >= d ? Math.PI : -Math.PI))),
                (m = (c - g.rotation) % Math.PI),
                (v = (d - g.skewX) % Math.PI),
                (void 0 === g.skewX ||
                  p > x ||
                  -x > p ||
                  f > x ||
                  -x > f ||
                  (m > b && w > m && !1 | (m * _)) ||
                  (v > b && w > v && !1 | (v * _))) &&
                  ((g.scaleX = l), (g.scaleY = u), (g.rotation = c), (g.skewX = d)),
                we &&
                  ((g.rotationX = g.rotationY = g.z = 0),
                  (g.perspective = parseFloat(s.defaultTransformPerspective) || 0),
                  (g.scaleZ = 1));
            }
            g.zOrigin = T;
            for (o in g) x > g[o] && g[o] > -x && (g[o] = 0);
            return i && (t._gsTransform = g), g;
          },
          Se = function (t) {
            var e,
              i,
              r = this.data,
              n = -r.rotation,
              o = n + r.skewX,
              s = 1e5,
              a = (0 | (Math.cos(n) * r.scaleX * s)) / s,
              h = (0 | (Math.sin(n) * r.scaleX * s)) / s,
              l = (0 | (Math.sin(o) * -r.scaleY * s)) / s,
              u = (0 | (Math.cos(o) * r.scaleY * s)) / s,
              c = this.t.style,
              d = this.t.currentStyle;
            if (d) {
              (i = h), (h = -l), (l = -i), (e = d.filter), (c.filter = '');
              var p,
                m,
                v = this.t.offsetWidth,
                g = this.t.offsetHeight,
                y = 'absolute' !== d.position,
                b = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + a + ', M12=' + h + ', M21=' + l + ', M22=' + u,
                w = r.x,
                T = r.y;
              if (
                (null != r.ox &&
                  ((p = (r.oxp ? 0.01 * v * r.ox : r.ox) - v / 2),
                  (m = (r.oyp ? 0.01 * g * r.oy : r.oy) - g / 2),
                  (w += p - (p * a + m * h)),
                  (T += m - (p * l + m * u))),
                y)
              )
                (p = v / 2),
                  (m = g / 2),
                  (b += ', Dx=' + (p - (p * a + m * h) + w) + ', Dy=' + (m - (p * l + m * u) + T) + ')');
              else {
                var S,
                  E,
                  A,
                  C = 8 > f ? 1 : -1;
                for (
                  p = r.ieOffsetX || 0,
                    m = r.ieOffsetY || 0,
                    r.ieOffsetX = Math.round((v - ((0 > a ? -a : a) * v + (0 > h ? -h : h) * g)) / 2 + w),
                    r.ieOffsetY = Math.round((g - ((0 > u ? -u : u) * g + (0 > l ? -l : l) * v)) / 2 + T),
                    fe = 0;
                  4 > fe;
                  fe++
                )
                  (E = Z[fe]),
                    (S = d[E]),
                    (i = -1 !== S.indexOf('px') ? parseFloat(S) : q(this.t, E, parseFloat(S), S.replace(x, '')) || 0),
                    (A =
                      i !== r[E] ? (2 > fe ? -r.ieOffsetX : -r.ieOffsetY) : 2 > fe ? p - r.ieOffsetX : m - r.ieOffsetY),
                    (c[E] = (r[E] = Math.round(i - A * (0 === fe || 2 === fe ? 1 : C))) + 'px');
                b += ", sizingMethod='auto expand')";
              }
              (c.filter = -1 !== e.indexOf('DXImageTransform.Microsoft.Matrix(') ? e.replace(P, b) : b + ' ' + e),
                (0 === t || 1 === t) &&
                  1 === a &&
                  0 === h &&
                  0 === l &&
                  1 === u &&
                  ((y && -1 === b.indexOf('Dx=0, Dy=0')) ||
                    (_.test(e) && 100 !== parseFloat(RegExp.$1)) ||
                    (-1 === e.indexOf('gradient(') && c.removeAttribute('filter')));
            }
          },
          Ee = function () {
            var t,
              e,
              i,
              r,
              n,
              o,
              s,
              a,
              h,
              l = this.data,
              u = this.t.style,
              c = l.perspective,
              p = l.scaleX,
              f = 0,
              m = 0,
              v = 0,
              g = 0,
              y = l.scaleY,
              x = 0,
              _ = 0,
              b = 0,
              w = 0,
              T = l.scaleZ,
              S = 0,
              E = 0,
              A = 0,
              C = c ? -1 / c : 0,
              M = l.rotation,
              R = l.zOrigin,
              P = 1e5;
            d &&
              ((s = u.top ? 'top' : u.bottom ? 'bottom' : parseFloat(V(this.t, 'top', null, !1)) ? 'bottom' : 'top'),
              (i = V(this.t, s, null, !1)),
              (a = parseFloat(i) || 0),
              (h = i.substr((a + '').length) || 'px'),
              (l._ffFix = !l._ffFix),
              (u[s] = (l._ffFix ? a + 0.05 : a - 0.05) + h)),
              (M || l.skewX) &&
                ((i = p * Math.cos(M)),
                (r = y * Math.sin(M)),
                (M -= l.skewX),
                (f = p * -Math.sin(M)),
                (y *= Math.cos(M)),
                (p = i),
                (g = r)),
              (M = l.rotationY),
              M &&
                ((t = Math.cos(M)),
                (e = Math.sin(M)),
                (i = p * t),
                (r = g * t),
                (n = T * -e),
                (o = C * -e),
                (m = p * e),
                (x = g * e),
                (T *= t),
                (C *= t),
                (p = i),
                (g = r),
                (b = n),
                (E = o)),
              (M = l.rotationX),
              M &&
                ((t = Math.cos(M)),
                (e = Math.sin(M)),
                (i = f * t + m * e),
                (r = y * t + x * e),
                (n = w * t + T * e),
                (o = A * t + C * e),
                (m = f * -e + m * t),
                (x = y * -e + x * t),
                (T = w * -e + T * t),
                (C = A * -e + C * t),
                (f = i),
                (y = r),
                (w = n),
                (A = o)),
              R && ((S -= R), (v = m * S), (_ = x * S), (S = T * S + R)),
              (v = (i = (v += l.x) - (v |= 0)) ? (0 | (i * P + (0 > i ? -0.5 : 0.5))) / P + v : v),
              (_ = (i = (_ += l.y) - (_ |= 0)) ? (0 | (i * P + (0 > i ? -0.5 : 0.5))) / P + _ : _),
              (S = (i = (S += l.z) - (S |= 0)) ? (0 | (i * P + (0 > i ? -0.5 : 0.5))) / P + S : S),
              (u[xe] =
                'matrix3d(' +
                [
                  (0 | (p * P)) / P,
                  (0 | (g * P)) / P,
                  (0 | (b * P)) / P,
                  (0 | (E * P)) / P,
                  (0 | (f * P)) / P,
                  (0 | (y * P)) / P,
                  (0 | (w * P)) / P,
                  (0 | (A * P)) / P,
                  (0 | (m * P)) / P,
                  (0 | (x * P)) / P,
                  (0 | (T * P)) / P,
                  (0 | (C * P)) / P,
                  v,
                  _,
                  S,
                  c ? 1 + -S / c : 1,
                ].join(',') +
                ')');
          },
          Ae = function () {
            var t,
              e,
              i,
              r,
              n,
              o,
              s,
              a,
              h,
              l = this.data,
              u = this.t,
              c = u.style;
            d &&
              ((t = c.top ? 'top' : c.bottom ? 'bottom' : parseFloat(V(u, 'top', null, !1)) ? 'bottom' : 'top'),
              (e = V(u, t, null, !1)),
              (i = parseFloat(e) || 0),
              (r = e.substr((i + '').length) || 'px'),
              (l._ffFix = !l._ffFix),
              (c[t] = (l._ffFix ? i + 0.05 : i - 0.05) + r)),
              l.rotation || l.skewX
                ? ((n = l.rotation),
                  (o = n - l.skewX),
                  (s = 1e5),
                  (a = l.scaleX * s),
                  (h = l.scaleY * s),
                  (c[xe] =
                    'matrix(' +
                    (0 | (Math.cos(n) * a)) / s +
                    ',' +
                    (0 | (Math.sin(n) * a)) / s +
                    ',' +
                    (0 | (Math.sin(o) * -h)) / s +
                    ',' +
                    (0 | (Math.cos(o) * h)) / s +
                    ',' +
                    l.x +
                    ',' +
                    l.y +
                    ')'))
                : (c[xe] = 'matrix(' + l.scaleX + ',0,0,' + l.scaleY + ',' + l.x + ',' + l.y + ')');
          };
        ve(
          'transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation',
          {
            parser: function (t, e, i, r, o, s, a) {
              if (r._transform) return o;
              var h,
                l,
                u,
                c,
                d,
                p,
                f,
                m = (r._transform = Te(t, n, !0)),
                v = t.style,
                g = 1e-6,
                y = ye.length,
                x = a,
                _ = {};
              if ('string' == typeof x.transform && xe)
                (u = v.cssText), (v[xe] = x.transform), (v.display = 'block'), (h = Te(t, null, !1)), (v.cssText = u);
              else if ('object' == typeof x) {
                if (
                  ((h = {
                    scaleX: re(null != x.scaleX ? x.scaleX : x.scale, m.scaleX),
                    scaleY: re(null != x.scaleY ? x.scaleY : x.scale, m.scaleY),
                    scaleZ: re(null != x.scaleZ ? x.scaleZ : x.scale, m.scaleZ),
                    x: re(x.x, m.x),
                    y: re(x.y, m.y),
                    z: re(x.z, m.z),
                    perspective: re(x.transformPerspective, m.perspective),
                  }),
                  (f = x.directionalRotation),
                  null != f)
                )
                  if ('object' == typeof f) for (u in f) x[u] = f[u];
                  else x.rotation = f;
                (h.rotation = ne(
                  'rotation' in x
                    ? x.rotation
                    : 'shortRotation' in x
                      ? x.shortRotation + '_short'
                      : 'rotationZ' in x
                        ? x.rotationZ
                        : m.rotation * F,
                  m.rotation,
                  'rotation',
                  _,
                )),
                  we &&
                    ((h.rotationX = ne(
                      'rotationX' in x
                        ? x.rotationX
                        : 'shortRotationX' in x
                          ? x.shortRotationX + '_short'
                          : m.rotationX * F || 0,
                      m.rotationX,
                      'rotationX',
                      _,
                    )),
                    (h.rotationY = ne(
                      'rotationY' in x
                        ? x.rotationY
                        : 'shortRotationY' in x
                          ? x.shortRotationY + '_short'
                          : m.rotationY * F || 0,
                      m.rotationY,
                      'rotationY',
                      _,
                    ))),
                  (h.skewX = null == x.skewX ? m.skewX : ne(x.skewX, m.skewX)),
                  (h.skewY = null == x.skewY ? m.skewY : ne(x.skewY, m.skewY)),
                  (l = h.skewY - m.skewY) && ((h.skewX += l), (h.rotation += l));
              }
              for (
                d = m.z || m.rotationX || m.rotationY || h.z || h.rotationX || h.rotationY || h.perspective,
                  d || null == x.scale || (h.scaleZ = 1);
                --y > -1;

              )
                (i = ye[y]),
                  (c = h[i] - m[i]),
                  (c > g || -g > c || null != L[i]) &&
                    ((p = !0),
                    (o = new de(m, i, m[i], c, o)),
                    i in _ && (o.e = _[i]),
                    (o.xs0 = 0),
                    (o.plugin = s),
                    r._overwriteProps.push(o.n));
              return (
                (c = x.transformOrigin),
                (c || (we && d && m.zOrigin)) &&
                  (xe
                    ? ((p = !0),
                      (c = (c || V(t, i, n, !1, '50% 50%')) + ''),
                      (i = be),
                      (o = new de(v, i, 0, 0, o, -1, 'css_transformOrigin')),
                      (o.b = v[i]),
                      (o.plugin = s),
                      we
                        ? ((u = m.zOrigin),
                          (c = c.split(' ')),
                          (m.zOrigin = (c.length > 2 ? parseFloat(c[2]) : u) || 0),
                          (o.xs0 = o.e = v[i] = c[0] + ' ' + (c[1] || '50%') + ' 0px'),
                          (o = new de(m, 'zOrigin', 0, 0, o, -1, o.n)),
                          (o.b = u),
                          (o.xs0 = o.e = m.zOrigin))
                        : (o.xs0 = o.e = v[i] = c))
                    : ee(c + '', m)),
                p && (r._transformType = d || 3 === this._transformType ? 3 : 2),
                o
              );
            },
            prefix: !0,
          },
        ),
          ve('boxShadow', {
            defaultValue: '0px 0px 0px 0px #999',
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: 'inset',
          }),
          ve('borderRadius', {
            defaultValue: '0px',
            parser: function (t, e, i, o, s) {
              e = this.format(e);
              var a,
                h,
                l,
                u,
                c,
                d,
                p,
                f,
                m,
                v,
                g,
                y,
                x,
                _,
                b,
                w,
                T = [
                  'borderTopLeftRadius',
                  'borderTopRightRadius',
                  'borderBottomRightRadius',
                  'borderBottomLeftRadius',
                ],
                S = t.style;
              for (
                m = parseFloat(t.offsetWidth), v = parseFloat(t.offsetHeight), a = e.split(' '), h = 0;
                T.length > h;
                h++
              )
                this.p.indexOf('border') && (T[h] = G(T[h])),
                  (c = u = V(t, T[h], n, !1, '0px')),
                  -1 !== c.indexOf(' ') && ((u = c.split(' ')), (c = u[0]), (u = u[1])),
                  (d = l = a[h]),
                  (p = parseFloat(c)),
                  (y = c.substr((p + '').length)),
                  (x = '=' === d.charAt(1)),
                  x
                    ? ((f = parseInt(d.charAt(0) + '1', 10)),
                      (d = d.substr(2)),
                      (f *= parseFloat(d)),
                      (g = d.substr((f + '').length - (0 > f ? 1 : 0)) || ''))
                    : ((f = parseFloat(d)), (g = d.substr((f + '').length))),
                  '' === g && (g = r[i] || y),
                  g !== y &&
                    ((_ = q(t, 'borderLeft', p, y)),
                    (b = q(t, 'borderTop', p, y)),
                    '%' === g
                      ? ((c = 100 * (_ / m) + '%'), (u = 100 * (b / v) + '%'))
                      : 'em' === g
                        ? ((w = q(t, 'borderLeft', 1, 'em')), (c = _ / w + 'em'), (u = b / w + 'em'))
                        : ((c = _ + 'px'), (u = b + 'px')),
                    x && ((d = parseFloat(c) + f + g), (l = parseFloat(u) + f + g))),
                  (s = pe(S, T[h], c + ' ' + u, d + ' ' + l, !1, '0px', s));
              return s;
            },
            prefix: !0,
            formatter: le('0px 0px 0px 0px', !1, !0),
          }),
          ve('backgroundPosition', {
            defaultValue: '0 0',
            parser: function (t, e, i, r, o, s) {
              var a,
                h,
                l,
                u,
                c,
                d,
                p = 'background-position',
                m = n || H(t, null),
                v = this.format(
                  (m
                    ? f
                      ? m.getPropertyValue(p + '-x') + ' ' + m.getPropertyValue(p + '-y')
                      : m.getPropertyValue(p)
                    : t.currentStyle.backgroundPositionX + ' ' + t.currentStyle.backgroundPositionY) || '0 0',
                ),
                g = this.format(e);
              if (
                (-1 !== v.indexOf('%')) != (-1 !== g.indexOf('%')) &&
                ((d = V(t, 'backgroundImage').replace(A, '')), d && 'none' !== d)
              ) {
                for (a = v.split(' '), h = g.split(' '), B.setAttribute('src', d), l = 2; --l > -1; )
                  (v = a[l]),
                    (u = -1 !== v.indexOf('%')),
                    u !== (-1 !== h[l].indexOf('%')) &&
                      ((c = 0 === l ? t.offsetWidth - B.width : t.offsetHeight - B.height),
                      (a[l] = u ? (parseFloat(v) / 100) * c + 'px' : 100 * (parseFloat(v) / c) + '%'));
                v = a.join(' ');
              }
              return this.parseComplex(t.style, v, g, o, s);
            },
            formatter: ee,
          }),
          ve('backgroundSize', { defaultValue: '0 0', formatter: ee }),
          ve('perspective', { defaultValue: '0px', prefix: !0 }),
          ve('perspectiveOrigin', { defaultValue: '50% 50%', prefix: !0 }),
          ve('transformStyle', { prefix: !0 }),
          ve('backfaceVisibility', { prefix: !0 }),
          ve('margin', { parser: ue('marginTop,marginRight,marginBottom,marginLeft') }),
          ve('padding', { parser: ue('paddingTop,paddingRight,paddingBottom,paddingLeft') }),
          ve('clip', {
            defaultValue: 'rect(0px,0px,0px,0px)',
            parser: function (t, e, i, r, o, s) {
              var a, h, l;
              return (
                9 > f
                  ? ((h = t.currentStyle),
                    (l = 8 > f ? ' ' : ','),
                    (a = 'rect(' + h.clipTop + l + h.clipRight + l + h.clipBottom + l + h.clipLeft + ')'),
                    (e = this.format(e).split(',').join(l)))
                  : ((a = this.format(V(t, this.p, n, !1, this.dflt))), (e = this.format(e))),
                this.parseComplex(t.style, a, e, o, s)
              );
            },
          }),
          ve('textShadow', { defaultValue: '0px 0px 0px #999', color: !0, multi: !0 }),
          ve('autoRound,strictUnits', {
            parser: function (t, e, i, r, n) {
              return n;
            },
          }),
          ve('border', {
            defaultValue: '0px solid #000',
            parser: function (t, e, i, r, o, s) {
              return this.parseComplex(
                t.style,
                this.format(
                  V(t, 'borderTopWidth', n, !1, '0px') +
                    ' ' +
                    V(t, 'borderTopStyle', n, !1, 'solid') +
                    ' ' +
                    V(t, 'borderTopColor', n, !1, '#000'),
                ),
                this.format(e),
                o,
                s,
              );
            },
            color: !0,
            formatter: function (t) {
              var e = t.split(' ');
              return e[0] + ' ' + (e[1] || 'solid') + ' ' + (t.match(he) || ['#000'])[0];
            },
          }),
          ve('float,cssFloat,styleFloat', {
            parser: function (t, e, i, r, n) {
              var o = t.style,
                s = 'cssFloat' in o ? 'cssFloat' : 'styleFloat';
              return new de(o, s, 0, 0, n, -1, i, !1, 0, o[s], e);
            },
          });
        var Ce = function (t) {
          var e,
            i = this.t,
            r = i.filter,
            n = 0 | (this.s + this.c * t);
          100 === n &&
            (-1 === r.indexOf('atrix(') && -1 === r.indexOf('radient(')
              ? (i.removeAttribute('filter'), (e = !V(this.data, 'filter')))
              : ((i.filter = r.replace(w, '')), (e = !0))),
            e ||
              (this.xn1 && (i.filter = r = r || 'alpha(opacity=100)'),
              -1 === r.indexOf('opacity')
                ? (i.filter += ' alpha(opacity=' + n + ')')
                : (i.filter = r.replace(_, 'opacity=' + n)));
        };
        ve('opacity,alpha,autoAlpha', {
          defaultValue: '1',
          parser: function (t, e, i, r, o, s) {
            var a,
              h = parseFloat(V(t, 'opacity', n, !1, '1')),
              l = t.style;
            return (
              (e = parseFloat(e)),
              'autoAlpha' === i &&
                ((a = V(t, 'visibility', n)),
                1 === h && 'hidden' === a && 0 !== e && (h = 0),
                (o = new de(
                  l,
                  'visibility',
                  0,
                  0,
                  o,
                  -1,
                  null,
                  !1,
                  0,
                  0 !== h ? 'visible' : 'hidden',
                  0 === e ? 'hidden' : 'visible',
                )),
                (o.xs0 = 'visible'),
                r._overwriteProps.push(o.n)),
              X
                ? (o = new de(l, 'opacity', h, e - h, o))
                : ((o = new de(l, 'opacity', 100 * h, 100 * (e - h), o)),
                  (o.xn1 = 'autoAlpha' === i ? 1 : 0),
                  (l.zoom = 1),
                  (o.type = 2),
                  (o.b = 'alpha(opacity=' + o.s + ')'),
                  (o.e = 'alpha(opacity=' + (o.s + o.c) + ')'),
                  (o.data = t),
                  (o.plugin = s),
                  (o.setRatio = Ce)),
              o
            );
          },
        });
        var Me = function (t, e) {
            e && (t.removeProperty ? t.removeProperty(e.replace(S, '-$1').toLowerCase()) : t.removeAttribute(e));
          },
          Re = function (t) {
            if (((this.t._gsClassPT = this), 1 === t || 0 === t)) {
              this.t.className = 0 === t ? this.b : this.e;
              for (var e = this.data, i = this.t.style; e; ) e.v ? (i[e.p] = e.v) : Me(i, e.p), (e = e._next);
              1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null);
            } else this.t.className !== this.e && (this.t.className = this.e);
          };
        ve('className', {
          parser: function (t, e, r, o, s, a, h) {
            var l,
              u,
              c,
              d,
              p,
              f = t.className,
              m = t.style.cssText;
            if (
              ((s = o._classNamePT = new de(t, r, 0, 0, s, 2)),
              (s.setRatio = Re),
              (s.pr = -11),
              (i = !0),
              (s.b = f),
              (u = Q(t, n)),
              (c = t._gsClassPT))
            ) {
              for (d = {}, p = c.data; p; ) (d[p.p] = 1), (p = p._next);
              c.setRatio(1);
            }
            return (
              (t._gsClassPT = s),
              (s.e =
                '=' !== e.charAt(1)
                  ? e
                  : f.replace(RegExp('\\s*\\b' + e.substr(2) + '\\b'), '') +
                    ('+' === e.charAt(0) ? ' ' + e.substr(2) : '')),
              o._tween._duration &&
                ((t.className = s.e),
                (l = $(t, u, Q(t), h, d)),
                (t.className = f),
                (s.data = l.firstMPT),
                (t.style.cssText = m),
                (s = s.xfirst = o.parse(t, l.difs, s, a))),
              s
            );
          },
        });
        var Pe = function (t) {
          if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration)
            for (
              var e,
                i = 'all' === this.e,
                r = this.t.style,
                n = i ? r.cssText.split(';') : this.e.split(','),
                o = n.length,
                s = a.transform.parse;
              --o > -1;

            )
              (e = n[o]),
                i && (e = e.substr(0, e.indexOf(':')).split(' ').join('')),
                a[e] && (e = a[e].parse === s ? xe : a[e].p),
                Me(r, e);
        };
        for (
          ve('clearProps', {
            parser: function (t, e, r, n, o) {
              return (
                (o = new de(t, r, 0, 0, o, 2)),
                (o.setRatio = Pe),
                (o.e = e),
                (o.pr = -10),
                (o.data = n._tween),
                (i = !0),
                o
              );
            },
          }),
            h = 'bezier,throwProps,physicsProps,physics2D'.split(','),
            fe = h.length;
          fe--;

        )
          ge(h[fe]);
        (h = s.prototype),
          (h._firstPT = null),
          (h._onInitTween = function (t, e, a) {
            if (!t.nodeType) return !1;
            (this._target = t),
              (this._tween = a),
              (this._vars = e),
              (l = e.autoRound),
              (i = !1),
              (r = e.suffixMap || s.suffixMap),
              (n = H(t, '')),
              (o = this._overwriteProps);
            var h,
              d,
              f,
              m,
              v,
              g,
              y,
              x,
              _,
              w = t.style;
            if (
              (u && '' === w.zIndex && ((h = V(t, 'zIndex', n)), ('auto' === h || '' === h) && (w.zIndex = 0)),
              'string' == typeof e &&
                ((m = w.cssText),
                (h = Q(t, n)),
                (w.cssText = m + ';' + e),
                (h = $(t, h, Q(t)).difs),
                !X && b.test(e) && (h.opacity = parseFloat(RegExp.$1)),
                (e = h),
                (w.cssText = m)),
              (this._firstPT = d = this.parse(t, e, null)),
              this._transformType)
            ) {
              for (
                _ = 3 === this._transformType,
                  xe
                    ? c &&
                      ((u = !0),
                      '' === w.zIndex && ((y = V(t, 'zIndex', n)), ('auto' === y || '' === y) && (w.zIndex = 0)),
                      p &&
                        (w.WebkitBackfaceVisibility =
                          this._vars.WebkitBackfaceVisibility || (_ ? 'visible' : 'hidden')))
                    : (w.zoom = 1),
                  f = d;
                f && f._next;

              )
                f = f._next;
              (x = new de(t, 'transform', 0, 0, null, 2)),
                this._linkCSSP(x, null, f),
                (x.setRatio = _ && we ? Ee : xe ? Ae : Se),
                (x.data = this._transform || Te(t, n, !0)),
                o.pop();
            }
            if (i) {
              for (; d; ) {
                for (g = d._next, f = m; f && f.pr > d.pr; ) f = f._next;
                (d._prev = f ? f._prev : v) ? (d._prev._next = d) : (m = d),
                  (d._next = f) ? (f._prev = d) : (v = d),
                  (d = g);
              }
              this._firstPT = m;
            }
            return !0;
          }),
          (h.parse = function (t, e, i, o) {
            var s,
              h,
              u,
              c,
              d,
              p,
              f,
              m,
              v,
              g,
              y = t.style;
            for (s in e)
              (p = e[s]),
                (h = a[s]),
                h
                  ? (i = h.parse(t, p, s, this, i, o, e))
                  : ((d = V(t, s, n) + ''),
                    (v = 'string' == typeof p),
                    'color' === s || 'fill' === s || 'stroke' === s || -1 !== s.indexOf('Color') || (v && T.test(p))
                      ? (v || ((p = ae(p)), (p = (p.length > 3 ? 'rgba(' : 'rgb(') + p.join(',') + ')')),
                        (i = pe(y, s, d, p, !0, 'transparent', i, 0, o)))
                      : !v || (-1 === p.indexOf(' ') && -1 === p.indexOf(','))
                        ? ((u = parseFloat(d)),
                          (f = u || 0 === u ? d.substr((u + '').length) : ''),
                          ('' === d || 'auto' === d) &&
                            ('width' === s || 'height' === s
                              ? ((u = te(t, s, n)), (f = 'px'))
                              : 'left' === s || 'top' === s
                                ? ((u = K(t, s, n)), (f = 'px'))
                                : ((u = 'opacity' !== s ? 0 : 1), (f = ''))),
                          (g = v && '=' === p.charAt(1)),
                          g
                            ? ((c = parseInt(p.charAt(0) + '1', 10)),
                              (p = p.substr(2)),
                              (c *= parseFloat(p)),
                              (m = p.replace(x, '')))
                            : ((c = parseFloat(p)), (m = v ? p.substr((c + '').length) || '' : '')),
                          '' === m && (m = r[s] || f),
                          (p = c || 0 === c ? (g ? c + u : c) + m : e[s]),
                          f !== m &&
                            '' !== m &&
                            (c || 0 === c) &&
                            (u || 0 === u) &&
                            ((u = q(t, s, u, f)),
                            '%' === m
                              ? ((u /= q(t, s, 100, '%') / 100),
                                u > 100 && (u = 100),
                                e.strictUnits !== !0 && (d = u + '%'))
                              : 'em' === m
                                ? (u /= q(t, s, 1, 'em'))
                                : ((c = q(t, s, c, m)), (m = 'px')),
                            g && (c || 0 === c) && (p = c + u + m)),
                          g && (c += u),
                          (!u && 0 !== u) || (!c && 0 !== c)
                            ? p || ('NaN' != p + '' && null != p)
                              ? ((i = new de(y, s, c || u || 0, 0, i, -1, 'css_' + s, !1, 0, d, p)),
                                (i.xs0 = 'none' !== p || ('display' !== s && -1 === s.indexOf('Style')) ? p : d))
                              : z('invalid ' + s + ' tween value: ' + e[s])
                            : ((i = new de(
                                y,
                                s,
                                u,
                                c - u,
                                i,
                                0,
                                'css_' + s,
                                l !== !1 && ('px' === m || 'zIndex' === s),
                                0,
                                d,
                                p,
                              )),
                              (i.xs0 = m)))
                        : (i = pe(y, s, d, p, !0, null, i, 0, o))),
                o && i && !i.plugin && (i.plugin = o);
            return i;
          }),
          (h.setRatio = function (t) {
            var e,
              i,
              r,
              n = this._firstPT,
              o = 1e-6;
            if (1 !== t || (this._tween._time !== this._tween._duration && 0 !== this._tween._time))
              if (
                t ||
                (this._tween._time !== this._tween._duration && 0 !== this._tween._time) ||
                this._tween._rawPrevTime === -1e-6
              )
                for (; n; ) {
                  if (
                    ((e = n.c * t + n.s),
                    n.r ? (e = e > 0 ? 0 | (e + 0.5) : 0 | (e - 0.5)) : o > e && e > -o && (e = 0),
                    n.type)
                  )
                    if (1 === n.type)
                      if (((r = n.l), 2 === r)) n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2;
                      else if (3 === r) n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3;
                      else if (4 === r) n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3 + n.xn3 + n.xs4;
                      else if (5 === r)
                        n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3 + n.xn3 + n.xs4 + n.xn4 + n.xs5;
                      else {
                        for (i = n.xs0 + e + n.xs1, r = 1; n.l > r; r++) i += n['xn' + r] + n['xs' + (r + 1)];
                        n.t[n.p] = i;
                      }
                    else -1 === n.type ? (n.t[n.p] = n.xs0) : n.setRatio && n.setRatio(t);
                  else n.t[n.p] = e + n.xs0;
                  n = n._next;
                }
              else for (; n; ) 2 !== n.type ? (n.t[n.p] = n.b) : n.setRatio(t), (n = n._next);
            else for (; n; ) 2 !== n.type ? (n.t[n.p] = n.e) : n.setRatio(t), (n = n._next);
          }),
          (h._enableTransforms = function (t) {
            this._transformType = t || 3 === this._transformType ? 3 : 2;
          }),
          (h._linkCSSP = function (t, e, i, r) {
            return (
              t &&
                (e && (e._prev = t),
                t._next && (t._next._prev = t._prev),
                i ? (i._next = t) : r || null !== this._firstPT || (this._firstPT = t),
                t._prev ? (t._prev._next = t._next) : this._firstPT === t && (this._firstPT = t._next),
                (t._next = e),
                (t._prev = i)),
              t
            );
          }),
          (h._kill = function (e) {
            var i,
              r,
              n,
              o = e;
            if (e.css_autoAlpha || e.css_alpha) {
              o = {};
              for (r in e) o[r] = e[r];
              (o.css_opacity = 1), o.css_autoAlpha && (o.css_visibility = 1);
            }
            return (
              e.css_className &&
                (i = this._classNamePT) &&
                ((n = i.xfirst),
                n && n._prev
                  ? this._linkCSSP(n._prev, i._next, n._prev._prev)
                  : n === this._firstPT && (this._firstPT = i._next),
                i._next && this._linkCSSP(i._next, i._next._next, n._prev),
                (this._classNamePT = null)),
              t.prototype._kill.call(this, o)
            );
          });
        var Oe = function (t, e, i) {
          var r, n, o, s;
          if (t.slice) for (n = t.length; --n > -1; ) Oe(t[n], e, i);
          else
            for (r = t.childNodes, n = r.length; --n > -1; )
              (o = r[n]),
                (s = o.type),
                o.style && (e.push(Q(o)), i && i.push(o)),
                (1 !== s && 9 !== s && 11 !== s) || !o.childNodes.length || Oe(o, e, i);
        };
        return (
          (s.cascadeTo = function (t, i, r) {
            var n,
              o,
              s,
              a = e.to(t, i, r),
              h = [a],
              l = [],
              u = [],
              c = [],
              d = e._internals.reservedProps;
            for (
              t = a._targets || a.target,
                Oe(t, l, c),
                a.render(i, !0),
                Oe(t, u),
                a.render(0, !0),
                a._enabled(!0),
                n = c.length;
              --n > -1;

            )
              if (((o = $(c[n], l[n], u[n])), o.firstMPT)) {
                o = o.difs;
                for (s in r) d[s] && (o[s] = r[s]);
                h.push(e.to(c[n], i, o));
              }
            return h;
          }),
          t.activate([s]),
          s
        );
      },
      !0,
    );
  }),
  window._gsDefine && window._gsQueue.pop()(),
  define('CSSPACK', function () {}),
  !(function () {
    var t = {},
      e = null,
      i = !0,
      r = !1;
    if ('undefined' != typeof AudioContext) e = new AudioContext();
    else if ('undefined' != typeof webkitAudioContext) e = new webkitAudioContext();
    else if ('undefined' != typeof Audio) {
      i = !1;
      try {
        new Audio();
      } catch (n) {
        r = !0;
      }
    } else (i = !1), (r = !0);
    if (i) {
      var o = void 0 === e.createGain ? e.createGainNode() : e.createGain();
      (o.gain.value = 1), o.connect(e.destination);
    }
    var s = function () {
      (this._volume = 1), (this._muted = !1), (this.usingWebAudio = i), (this._howls = []);
    };
    s.prototype = {
      volume: function (t) {
        var e = this;
        if (((t = parseFloat(t)), t && t >= 0 && 1 >= t)) {
          (e._volume = t), i && (o.gain.value = t);
          for (var r in e._howls)
            if (e._howls.hasOwnProperty(r) && e._howls[r]._webAudio === !1)
              for (var n = 0; n < e._howls[r]._audioNode.length; n++)
                e._howls[r]._audioNode[n].volume = e._howls[r]._volume * e._volume;
          return e;
        }
        return i ? o.gain.value : e._volume;
      },
      mute: function () {
        return this._setMuted(!0), this;
      },
      unmute: function () {
        return this._setMuted(!1), this;
      },
      _setMuted: function (t) {
        var e = this;
        (e._muted = t), i && (o.gain.value = t ? 0 : e._volume);
        for (var r in e._howls)
          if (e._howls.hasOwnProperty(r) && e._howls[r]._webAudio === !1)
            for (var n = 0; n < e._howls[r]._audioNode.length; n++) e._howls[r]._audioNode[n].muted = t;
      },
    };
    var a = new s(),
      h = null;
    if (!r) {
      h = new Audio();
      var l = {
        mp3: !!h.canPlayType('audio/mpeg;').replace(/^no$/, ''),
        opus: !!h.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
        ogg: !!h.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
        wav: !!h.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
        m4a: !!(h.canPlayType('audio/x-m4a;') || h.canPlayType('audio/aac;')).replace(/^no$/, ''),
        weba: !!h.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''),
      };
    }
    var u = function (t) {
      var e = this;
      (e._autoplay = t.autoplay || !1),
        (e._buffer = t.buffer || !1),
        (e._duration = t.duration || 0),
        (e._format = t.format || null),
        (e._loop = t.loop || !1),
        (e._loaded = !1),
        (e._sprite = t.sprite || {}),
        (e._src = t.src || ''),
        (e._pos3d = t.pos3d || [0, 0, -0.5]),
        (e._volume = t.volume || 1),
        (e._urls = t.urls || []),
        (e._rate = t.rate || 1),
        (e._onload = [t.onload || function () {}]),
        (e._onloaderror = [t.onloaderror || function () {}]),
        (e._onend = [t.onend || function () {}]),
        (e._onpause = [t.onpause || function () {}]),
        (e._onplay = [t.onplay || function () {}]),
        (e._onendTimer = []),
        (e._webAudio = i && !e._buffer),
        (e._audioNode = []),
        e._webAudio && e._setupAudioNode(),
        a._howls.push(e),
        e.load();
    };
    if (
      ((u.prototype = {
        load: function () {
          var e = this,
            i = null;
          if (r) return void e.on('loaderror');
          for (var n = 0; n < e._urls.length; n++) {
            var o, s;
            if (e._format) o = e._format;
            else {
              if (
                ((s = e._urls[n].toLowerCase().split('?')[0]),
                (o = s.match(/.+\.([^?]+)(\?|$)/)),
                (o = o && o.length >= 2 ? o : s.match(/data\:audio\/([^?]+);/)),
                !o)
              )
                return void e.on('loaderror');
              o = o[1];
            }
            if (l[o]) {
              i = e._urls[n];
              break;
            }
          }
          if (!i) return void e.on('loaderror');
          if (((e._src = i), e._webAudio)) c(e, i);
          else {
            var h = new Audio();
            e._audioNode.push(h),
              (h.src = i),
              (h._pos = 0),
              (h.preload = 'auto'),
              (h.volume = a._muted ? 0 : e._volume * a.volume()),
              (t[i] = e);
            var u = function () {
              (e._duration = h.duration),
                0 === Object.getOwnPropertyNames(e._sprite).length &&
                  (e._sprite = { _default: [0, 1e3 * e._duration] }),
                e._loaded || ((e._loaded = !0), e.on('load')),
                e._autoplay && e.play(),
                h.removeEventListener('canplaythrough', u, !1);
            };
            h.addEventListener('canplaythrough', u, !1), h.load();
          }
          return e;
        },
        urls: function (t) {
          var e = this;
          return t ? (e.stop(), (e._urls = 'string' == typeof t ? [t] : t), (e._loaded = !1), e.load(), e) : e._urls;
        },
        play: function (t, i) {
          var r = this;
          return (
            'function' == typeof t && (i = t),
            (t && 'function' != typeof t) || (t = '_default'),
            r._loaded
              ? r._sprite[t]
                ? (r._inactiveNode(function (n) {
                    n._sprite = t;
                    var o,
                      s = n._pos > 0 ? n._pos : r._sprite[t][0] / 1e3,
                      h = r._sprite[t][1] / 1e3 - n._pos,
                      l = !(!r._loop && !r._sprite[t][2]),
                      u = 'string' == typeof i ? i : Math.round(Date.now() * Math.random()) + '';
                    if (
                      ((function () {
                        var e = { id: u, sprite: t, loop: l };
                        (o = setTimeout(function () {
                          !r._webAudio && l && r.stop(e.id, e.timer).play(t, e.id),
                            r._webAudio && !l && (r._nodeById(e.id).paused = !0),
                            r._webAudio || l || r.stop(e.id, e.timer),
                            r.on('end', u);
                        }, 1e3 * h)),
                          r._onendTimer.push(o),
                          (e.timer = r._onendTimer[r._onendTimer.length - 1]);
                      })(),
                      r._webAudio)
                    ) {
                      var c = r._sprite[t][0] / 1e3,
                        d = r._sprite[t][1] / 1e3;
                      (n.id = u),
                        (n.paused = !1),
                        p(r, [l, c, d], u),
                        (r._playStart = e.currentTime),
                        (n.gain.value = r._volume),
                        void 0 === n.bufferSource.start
                          ? n.bufferSource.noteGrainOn(0, s, h)
                          : n.bufferSource.start(0, s, h);
                    } else {
                      if (4 !== n.readyState)
                        return (
                          r._clearEndTimer(o),
                          (function () {
                            var e = r,
                              o = t,
                              s = i,
                              a = n,
                              h = function () {
                                e.play(o, s), a.removeEventListener('canplaythrough', h, !1);
                              };
                            a.addEventListener('canplaythrough', h, !1);
                          })(),
                          r
                        );
                      (n.id = u),
                        (n.currentTime = s),
                        (n.muted = a._muted),
                        (n.volume = r._volume * a.volume()),
                        setTimeout(function () {
                          n.play();
                        }, 0);
                    }
                    return r.on('play'), 'function' == typeof i && i(u), r;
                  }),
                  r)
                : ('function' == typeof i && i(), r)
              : (r.on('load', function () {
                  r.play(t, i);
                }),
                r)
          );
        },
        pause: function (t, e) {
          var i = this;
          if (!i._loaded)
            return (
              i.on('play', function () {
                i.pause(t);
              }),
              i
            );
          i._clearEndTimer(e || 0);
          var r = t ? i._nodeById(t) : i._activeNode();
          if (r)
            if (((r._pos = i.pos(null, t)), i._webAudio)) {
              if (!r.bufferSource) return i;
              (r.paused = !0), void 0 === r.bufferSource.stop ? r.bufferSource.noteOff(0) : r.bufferSource.stop(0);
            } else r.pause();
          return i.on('pause'), i;
        },
        stop: function (t, e) {
          var i = this;
          if (!i._loaded)
            return (
              i.on('play', function () {
                i.stop(t);
              }),
              i
            );
          i._clearEndTimer(e || 0);
          var r = t ? i._nodeById(t) : i._activeNode();
          if (r)
            if (((r._pos = 0), i._webAudio)) {
              if (!r.bufferSource) return i;
              (r.paused = !0), void 0 === r.bufferSource.stop ? r.bufferSource.noteOff(0) : r.bufferSource.stop(0);
            } else r.pause(), (r.currentTime = 0);
          return i;
        },
        mute: function (t) {
          var e = this;
          if (!e._loaded)
            return (
              e.on('play', function () {
                e.mute(t);
              }),
              e
            );
          var i = t ? e._nodeById(t) : e._activeNode();
          return i && (e._webAudio ? (i.gain.value = 0) : (i.volume = 0)), e;
        },
        unmute: function (t) {
          var e = this;
          if (!e._loaded)
            return (
              e.on('play', function () {
                e.unmute(t);
              }),
              e
            );
          var i = t ? e._nodeById(t) : e._activeNode();
          return i && (e._webAudio ? (i.gain.value = e._volume) : (i.volume = e._volume)), e;
        },
        volume: function (t, e) {
          var i = this;
          if (((t = parseFloat(t)), t >= 0 && 1 >= t)) {
            if (((i._volume = t), !i._loaded))
              return (
                i.on('play', function () {
                  i.volume(t, e);
                }),
                i
              );
            var r = e ? i._nodeById(e) : i._activeNode();
            return r && (i._webAudio ? (r.gain.value = t) : (r.volume = t * a.volume())), i;
          }
          return i._volume;
        },
        loop: function (t) {
          var e = this;
          return 'boolean' == typeof t ? ((e._loop = t), e) : e._loop;
        },
        sprite: function (t) {
          var e = this;
          return 'object' == typeof t ? ((e._sprite = t), e) : e._sprite;
        },
        pos: function (t, i) {
          var r = this;
          if (!r._loaded)
            return (
              r.on('load', function () {
                r.pos(t);
              }),
              'number' == typeof t ? r : r._pos || 0
            );
          t = parseFloat(t);
          var n = i ? r._nodeById(i) : r._activeNode();
          if (n)
            return r._webAudio
              ? t >= 0
                ? ((n._pos = t), r.pause(i).play(n._sprite, i), r)
                : n._pos + (e.currentTime - r._playStart)
              : t >= 0
                ? ((n.currentTime = t), r)
                : n.currentTime;
          if (t >= 0) return r;
          for (var o = 0; o < r._audioNode.length; o++)
            if (r._audioNode[o].paused && 4 === r._audioNode[o].readyState)
              return r._webAudio ? r._audioNode[o]._pos : r._audioNode[o].currentTime;
        },
        pos3d: function (t, e, i, r) {
          var n = this;
          if (((e = void 0 !== e && e ? e : 0), (i = void 0 !== i && i ? i : -0.5), !n._loaded))
            return (
              n.on('play', function () {
                n.pos3d(t, e, i, r);
              }),
              n
            );
          if (!(t >= 0 || 0 > t)) return n._pos3d;
          if (n._webAudio) {
            var o = r ? n._nodeById(r) : n._activeNode();
            o && ((n._pos3d = [t, e, i]), o.panner.setPosition(t, e, i));
          }
          return n;
        },
        fade: function (t, e, i, r, n) {
          var o = this,
            s = Math.abs(t - e),
            a = t > e ? 'down' : 'up',
            h = s / 0.01,
            l = i / h;
          if (!o._loaded)
            return (
              o.on('load', function () {
                o.fade(t, e, i, r, n);
              }),
              o
            );
          o.volume(t, n);
          for (var u = 1; h >= u; u++)
            !(function () {
              var t = o._volume + ('up' === a ? 0.01 : -0.01) * u,
                i = Math.round(1e3 * t) / 1e3,
                s = e;
              setTimeout(function () {
                o.volume(i, n), i === s && r && r();
              }, l * u);
            })();
        },
        fadeIn: function (t, e, i) {
          return this.volume(0).play().fade(0, t, e, i);
        },
        fadeOut: function (t, e, i, r) {
          var n = this;
          return n.fade(
            n._volume,
            t,
            e,
            function () {
              i && i(), n.pause(r), n.on('end');
            },
            r,
          );
        },
        _nodeById: function (t) {
          for (var e = this, i = e._audioNode[0], r = 0; r < e._audioNode.length; r++)
            if (e._audioNode[r].id === t) {
              i = e._audioNode[r];
              break;
            }
          return i;
        },
        _activeNode: function () {
          for (var t = this, e = null, i = 0; i < t._audioNode.length; i++)
            if (!t._audioNode[i].paused) {
              e = t._audioNode[i];
              break;
            }
          return t._drainPool(), e;
        },
        _inactiveNode: function (t) {
          for (var e = this, i = null, r = 0; r < e._audioNode.length; r++)
            if (e._audioNode[r].paused && 4 === e._audioNode[r].readyState) {
              t(e._audioNode[r]), (i = !0);
              break;
            }
          if ((e._drainPool(), !i)) {
            var n;
            e._webAudio
              ? ((n = e._setupAudioNode()), t(n))
              : (e.load(),
                (n = e._audioNode[e._audioNode.length - 1]),
                n.addEventListener('loadedmetadata', function () {
                  t(n);
                }));
          }
        },
        _drainPool: function () {
          var t,
            e = this,
            i = 0;
          for (t = 0; t < e._audioNode.length; t++) e._audioNode[t].paused && i++;
          for (t = e._audioNode.length - 1; t >= 0 && !(5 >= i); t--)
            e._audioNode[t].paused && (e._webAudio && e._audioNode[t].disconnect(0), i--, e._audioNode.splice(t, 1));
        },
        _clearEndTimer: function (t) {
          var e = this,
            i = e._onendTimer.indexOf(t);
          (i = i >= 0 ? i : 0), e._onendTimer[i] && (clearTimeout(e._onendTimer[i]), e._onendTimer.splice(i, 1));
        },
        _setupAudioNode: function () {
          var t = this,
            i = t._audioNode,
            r = t._audioNode.length;
          return (
            (i[r] = void 0 === e.createGain ? e.createGainNode() : e.createGain()),
            (i[r].gain.value = t._volume),
            (i[r].paused = !0),
            (i[r]._pos = 0),
            (i[r].readyState = 4),
            i[r].connect(o),
            (i[r].panner = e.createPanner()),
            i[r].panner.setPosition(t._pos3d[0], t._pos3d[1], t._pos3d[2]),
            i[r].panner.connect(i[r]),
            i[r]
          );
        },
        on: function (t, e) {
          var i = this,
            r = i['_on' + t];
          if ('function' == typeof e) r.push(e);
          else for (var n = 0; n < r.length; n++) e ? r[n].call(i, e) : r[n].call(i);
          return i;
        },
        off: function (t, e) {
          for (var i = this, r = i['_on' + t], n = '' + e, o = 0; o < r.length; o++)
            if (n === '' + r[o]) {
              r.splice(o, 1);
              break;
            }
          return i;
        },
        unload: function () {
          for (var e = this, i = e._audioNode, r = 0; r < e._audioNode.length; r++)
            e.stop(i[r].id), e._webAudio ? i[r].disconnect(0) : (i[r].src = '');
          var n = a._howls.indexOf(e);
          n && a._howls.splice(n, 1), delete t[e._src], (e = null);
        },
      }),
      i)
    )
      var c = function (i, r) {
          if (r in t) (i._duration = t[r].duration), d(i);
          else {
            var n = new XMLHttpRequest();
            n.open('GET', r, !0),
              (n.responseType = 'arraybuffer'),
              (n.onload = function () {
                e.decodeAudioData(n.response, function (e) {
                  e && ((t[r] = e), d(i, e));
                });
              }),
              (n.onerror = function () {
                i._webAudio &&
                  ((i._buffer = !0), (i._webAudio = !1), (i._audioNode = []), delete i._gainNode, i.load());
              });
            try {
              n.send();
            } catch (o) {
              n.onerror();
            }
          }
        },
        d = function (t, e) {
          (t._duration = e ? e.duration : t._duration),
            0 === Object.getOwnPropertyNames(t._sprite).length && (t._sprite = { _default: [0, 1e3 * t._duration] }),
            t._loaded || ((t._loaded = !0), t.on('load')),
            t._autoplay && t.play();
        },
        p = function (i, r, n) {
          var o = i._nodeById(n);
          (o.bufferSource = e.createBufferSource()),
            (o.bufferSource.buffer = t[i._src]),
            o.bufferSource.connect(o.panner),
            (o.bufferSource.loop = r[0]),
            r[0] && ((o.bufferSource.loopStart = r[1]), (o.bufferSource.loopEnd = r[1] + r[2])),
            (o.bufferSource.playbackRate.value = i._rate);
        };
    'function' == typeof define &&
      define.amd &&
      define('HOWLER', [], function () {
        return { Howler: a, Howl: u };
      }),
      (window.Howler = a),
      (window.Howl = u);
  })(),
  !(function (t) {
    if ('object' == typeof exports && 'undefined' != typeof module) module.exports = t();
    else if ('function' == typeof define && define.amd) define('PIXI', [], t);
    else {
      var e;
      'undefined' != typeof window
        ? (e = window)
        : 'undefined' != typeof global
          ? (e = global)
          : 'undefined' != typeof self && (e = self),
        (e.PIXI = t());
    }
  })(function () {
    var t;
    return (function e(t, i, r) {
      function n(s, a) {
        if (!i[s]) {
          if (!t[s]) {
            var h = 'function' == typeof require && require;
            if (!a && h) return h(s, !0);
            if (o) return o(s, !0);
            var l = new Error("Cannot find module '" + s + "'");
            throw ((l.code = 'MODULE_NOT_FOUND'), l);
          }
          var u = (i[s] = { exports: {} });
          t[s][0].call(
            u.exports,
            function (e) {
              var i = t[s][1][e];
              return n(i ? i : e);
            },
            u,
            u.exports,
            e,
            t,
            i,
            r,
          );
        }
        return i[s].exports;
      }
      for (var o = 'function' == typeof require && require, s = 0; s < r.length; s++) n(r[s]);
      return n;
    })(
      {
        1: [
          function (t, e) {
            var i = (e.exports = t('./core'));
            (i.extras = t('./extras')),
              (i.filters = t('./filters')),
              (i.interaction = t('./interaction')),
              (i.loaders = t('./loaders')),
              (i.spine = t('./spine')),
              (i.text = t('./text')),
              (i.Text = i.text.Text),
              (i.Point = i.math.Point),
              (i.Rectangle = i.math.Rectangle),
              (i.Matrix = i.math.Matrix),
              (i.blendModes = i.CONST.BLEND_MODES);
            var r = 0;
            (i.Circle = i.math.Circle),
              (i.loaders.Loader.prototype.addList = function (t) {
                for (var e = 0; e < t.length; e++) this.add(r++ + '_', t[e]);
              }),
              (i.Sprite.prototype.setTexture = function (t) {
                this.texture = t;
              }),
              (i.Text.prototype.setText = function (t) {
                this.text = t;
              });
          },
          {
            './core': 20,
            './extras': 76,
            './filters': 90,
            './interaction': 105,
            './loaders': 109,
            './spine': 115,
            './text': 118,
          },
        ],
        2: [
          function (e, i) {
            (function (e) {
              !(function () {
                function r(t) {
                  var e = !1;
                  return function () {
                    if (e) throw new Error('Callback was already called.');
                    (e = !0), t.apply(n, arguments);
                  };
                }
                var n,
                  o,
                  s = {};
                (n = this),
                  null != n && (o = n.async),
                  (s.noConflict = function () {
                    return (n.async = o), s;
                  });
                var a = Object.prototype.toString,
                  h =
                    Array.isArray ||
                    function (t) {
                      return '[object Array]' === a.call(t);
                    },
                  l = function (t, e) {
                    if (t.forEach) return t.forEach(e);
                    for (var i = 0; i < t.length; i += 1) e(t[i], i, t);
                  },
                  u = function (t, e) {
                    if (t.map) return t.map(e);
                    var i = [];
                    return (
                      l(t, function (t, r, n) {
                        i.push(e(t, r, n));
                      }),
                      i
                    );
                  },
                  c = function (t, e, i) {
                    return t.reduce
                      ? t.reduce(e, i)
                      : (l(t, function (t, r, n) {
                          i = e(i, t, r, n);
                        }),
                        i);
                  },
                  d = function (t) {
                    if (Object.keys) return Object.keys(t);
                    var e = [];
                    for (var i in t) t.hasOwnProperty(i) && e.push(i);
                    return e;
                  };
                'undefined' != typeof e && e.nextTick
                  ? ((s.nextTick = e.nextTick),
                    (s.setImmediate =
                      'undefined' != typeof setImmediate
                        ? function (t) {
                            setImmediate(t);
                          }
                        : s.nextTick))
                  : 'function' == typeof setImmediate
                    ? ((s.nextTick = function (t) {
                        setImmediate(t);
                      }),
                      (s.setImmediate = s.nextTick))
                    : ((s.nextTick = function (t) {
                        setTimeout(t, 0);
                      }),
                      (s.setImmediate = s.nextTick)),
                  (s.each = function (t, e, i) {
                    function n(e) {
                      e ? (i(e), (i = function () {})) : ((o += 1), o >= t.length && i());
                    }
                    if (((i = i || function () {}), !t.length)) return i();
                    var o = 0;
                    l(t, function (t) {
                      e(t, r(n));
                    });
                  }),
                  (s.forEach = s.each),
                  (s.eachSeries = function (t, e, i) {
                    if (((i = i || function () {}), !t.length)) return i();
                    var r = 0,
                      n = function () {
                        e(t[r], function (e) {
                          e ? (i(e), (i = function () {})) : ((r += 1), r >= t.length ? i() : n());
                        });
                      };
                    n();
                  }),
                  (s.forEachSeries = s.eachSeries),
                  (s.eachLimit = function (t, e, i, r) {
                    var n = p(e);
                    n.apply(null, [t, i, r]);
                  }),
                  (s.forEachLimit = s.eachLimit);
                var p = function (t) {
                    return function (e, i, r) {
                      if (((r = r || function () {}), !e.length || 0 >= t)) return r();
                      var n = 0,
                        o = 0,
                        s = 0;
                      !(function a() {
                        if (n >= e.length) return r();
                        for (; t > s && o < e.length; )
                          (o += 1),
                            (s += 1),
                            i(e[o - 1], function (t) {
                              t ? (r(t), (r = function () {})) : ((n += 1), (s -= 1), n >= e.length ? r() : a());
                            });
                      })();
                    };
                  },
                  f = function (t) {
                    return function () {
                      var e = Array.prototype.slice.call(arguments);
                      return t.apply(null, [s.each].concat(e));
                    };
                  },
                  m = function (t, e) {
                    return function () {
                      var i = Array.prototype.slice.call(arguments);
                      return e.apply(null, [p(t)].concat(i));
                    };
                  },
                  v = function (t) {
                    return function () {
                      var e = Array.prototype.slice.call(arguments);
                      return t.apply(null, [s.eachSeries].concat(e));
                    };
                  },
                  g = function (t, e, i, r) {
                    if (
                      ((e = u(e, function (t, e) {
                        return { index: e, value: t };
                      })),
                      r)
                    ) {
                      var n = [];
                      t(
                        e,
                        function (t, e) {
                          i(t.value, function (i, r) {
                            (n[t.index] = r), e(i);
                          });
                        },
                        function (t) {
                          r(t, n);
                        },
                      );
                    } else
                      t(e, function (t, e) {
                        i(t.value, function (t) {
                          e(t);
                        });
                      });
                  };
                (s.map = f(g)),
                  (s.mapSeries = v(g)),
                  (s.mapLimit = function (t, e, i, r) {
                    return y(e)(t, i, r);
                  });
                var y = function (t) {
                  return m(t, g);
                };
                (s.reduce = function (t, e, i, r) {
                  s.eachSeries(
                    t,
                    function (t, r) {
                      i(e, t, function (t, i) {
                        (e = i), r(t);
                      });
                    },
                    function (t) {
                      r(t, e);
                    },
                  );
                }),
                  (s.inject = s.reduce),
                  (s.foldl = s.reduce),
                  (s.reduceRight = function (t, e, i, r) {
                    var n = u(t, function (t) {
                      return t;
                    }).reverse();
                    s.reduce(n, e, i, r);
                  }),
                  (s.foldr = s.reduceRight);
                var x = function (t, e, i, r) {
                  var n = [];
                  (e = u(e, function (t, e) {
                    return { index: e, value: t };
                  })),
                    t(
                      e,
                      function (t, e) {
                        i(t.value, function (i) {
                          i && n.push(t), e();
                        });
                      },
                      function () {
                        r(
                          u(
                            n.sort(function (t, e) {
                              return t.index - e.index;
                            }),
                            function (t) {
                              return t.value;
                            },
                          ),
                        );
                      },
                    );
                };
                (s.filter = f(x)), (s.filterSeries = v(x)), (s.select = s.filter), (s.selectSeries = s.filterSeries);
                var _ = function (t, e, i, r) {
                  var n = [];
                  (e = u(e, function (t, e) {
                    return { index: e, value: t };
                  })),
                    t(
                      e,
                      function (t, e) {
                        i(t.value, function (i) {
                          i || n.push(t), e();
                        });
                      },
                      function () {
                        r(
                          u(
                            n.sort(function (t, e) {
                              return t.index - e.index;
                            }),
                            function (t) {
                              return t.value;
                            },
                          ),
                        );
                      },
                    );
                };
                (s.reject = f(_)), (s.rejectSeries = v(_));
                var b = function (t, e, i, r) {
                  t(
                    e,
                    function (t, e) {
                      i(t, function (i) {
                        i ? (r(t), (r = function () {})) : e();
                      });
                    },
                    function () {
                      r();
                    },
                  );
                };
                (s.detect = f(b)),
                  (s.detectSeries = v(b)),
                  (s.some = function (t, e, i) {
                    s.each(
                      t,
                      function (t, r) {
                        e(t, function (t) {
                          t && (i(!0), (i = function () {})), r();
                        });
                      },
                      function () {
                        i(!1);
                      },
                    );
                  }),
                  (s.any = s.some),
                  (s.every = function (t, e, i) {
                    s.each(
                      t,
                      function (t, r) {
                        e(t, function (t) {
                          t || (i(!1), (i = function () {})), r();
                        });
                      },
                      function () {
                        i(!0);
                      },
                    );
                  }),
                  (s.all = s.every),
                  (s.sortBy = function (t, e, i) {
                    s.map(
                      t,
                      function (t, i) {
                        e(t, function (e, r) {
                          e ? i(e) : i(null, { value: t, criteria: r });
                        });
                      },
                      function (t, e) {
                        if (t) return i(t);
                        var r = function (t, e) {
                          var i = t.criteria,
                            r = e.criteria;
                          return r > i ? -1 : i > r ? 1 : 0;
                        };
                        i(
                          null,
                          u(e.sort(r), function (t) {
                            return t.value;
                          }),
                        );
                      },
                    );
                  }),
                  (s.auto = function (t, e) {
                    e = e || function () {};
                    var i = d(t),
                      r = i.length;
                    if (!r) return e();
                    var n = {},
                      o = [],
                      a = function (t) {
                        o.unshift(t);
                      },
                      u = function (t) {
                        for (var e = 0; e < o.length; e += 1) if (o[e] === t) return void o.splice(e, 1);
                      },
                      p = function () {
                        r--,
                          l(o.slice(0), function (t) {
                            t();
                          });
                      };
                    a(function () {
                      if (!r) {
                        var t = e;
                        (e = function () {}), t(null, n);
                      }
                    }),
                      l(i, function (i) {
                        var r = h(t[i]) ? t[i] : [t[i]],
                          o = function (t) {
                            var r = Array.prototype.slice.call(arguments, 1);
                            if ((r.length <= 1 && (r = r[0]), t)) {
                              var o = {};
                              l(d(n), function (t) {
                                o[t] = n[t];
                              }),
                                (o[i] = r),
                                e(t, o),
                                (e = function () {});
                            } else (n[i] = r), s.setImmediate(p);
                          },
                          f = r.slice(0, Math.abs(r.length - 1)) || [],
                          m = function () {
                            return (
                              c(
                                f,
                                function (t, e) {
                                  return t && n.hasOwnProperty(e);
                                },
                                !0,
                              ) && !n.hasOwnProperty(i)
                            );
                          };
                        if (m()) r[r.length - 1](o, n);
                        else {
                          var v = function () {
                            m() && (u(v), r[r.length - 1](o, n));
                          };
                          a(v);
                        }
                      });
                  }),
                  (s.retry = function (t, e, i) {
                    var r = 5,
                      n = [];
                    'function' == typeof t && ((i = e), (e = t), (t = r)), (t = parseInt(t, 10) || r);
                    var o = function (r, o) {
                      for (
                        var a = function (t, e) {
                          return function (i) {
                            t(function (t, r) {
                              i(!t || e, { err: t, result: r });
                            }, o);
                          };
                        };
                        t;

                      )
                        n.push(a(e, !(t -= 1)));
                      s.series(n, function (t, e) {
                        (e = e[e.length - 1]), (r || i)(e.err, e.result);
                      });
                    };
                    return i ? o() : o;
                  }),
                  (s.waterfall = function (t, e) {
                    if (((e = e || function () {}), !h(t))) {
                      var i = new Error('First argument to waterfall must be an array of functions');
                      return e(i);
                    }
                    if (!t.length) return e();
                    var r = function (t) {
                      return function (i) {
                        if (i) e.apply(null, arguments), (e = function () {});
                        else {
                          var n = Array.prototype.slice.call(arguments, 1),
                            o = t.next();
                          n.push(o ? r(o) : e),
                            s.setImmediate(function () {
                              t.apply(null, n);
                            });
                        }
                      };
                    };
                    r(s.iterator(t))();
                  });
                var w = function (t, e, i) {
                  if (((i = i || function () {}), h(e)))
                    t.map(
                      e,
                      function (t, e) {
                        t &&
                          t(function (t) {
                            var i = Array.prototype.slice.call(arguments, 1);
                            i.length <= 1 && (i = i[0]), e.call(null, t, i);
                          });
                      },
                      i,
                    );
                  else {
                    var r = {};
                    t.each(
                      d(e),
                      function (t, i) {
                        e[t](function (e) {
                          var n = Array.prototype.slice.call(arguments, 1);
                          n.length <= 1 && (n = n[0]), (r[t] = n), i(e);
                        });
                      },
                      function (t) {
                        i(t, r);
                      },
                    );
                  }
                };
                (s.parallel = function (t, e) {
                  w({ map: s.map, each: s.each }, t, e);
                }),
                  (s.parallelLimit = function (t, e, i) {
                    w({ map: y(e), each: p(e) }, t, i);
                  }),
                  (s.series = function (t, e) {
                    if (((e = e || function () {}), h(t)))
                      s.mapSeries(
                        t,
                        function (t, e) {
                          t &&
                            t(function (t) {
                              var i = Array.prototype.slice.call(arguments, 1);
                              i.length <= 1 && (i = i[0]), e.call(null, t, i);
                            });
                        },
                        e,
                      );
                    else {
                      var i = {};
                      s.eachSeries(
                        d(t),
                        function (e, r) {
                          t[e](function (t) {
                            var n = Array.prototype.slice.call(arguments, 1);
                            n.length <= 1 && (n = n[0]), (i[e] = n), r(t);
                          });
                        },
                        function (t) {
                          e(t, i);
                        },
                      );
                    }
                  }),
                  (s.iterator = function (t) {
                    var e = function (i) {
                      var r = function () {
                        return t.length && t[i].apply(null, arguments), r.next();
                      };
                      return (
                        (r.next = function () {
                          return i < t.length - 1 ? e(i + 1) : null;
                        }),
                        r
                      );
                    };
                    return e(0);
                  }),
                  (s.apply = function (t) {
                    var e = Array.prototype.slice.call(arguments, 1);
                    return function () {
                      return t.apply(null, e.concat(Array.prototype.slice.call(arguments)));
                    };
                  });
                var T = function (t, e, i, r) {
                  var n = [];
                  t(
                    e,
                    function (t, e) {
                      i(t, function (t, i) {
                        (n = n.concat(i || [])), e(t);
                      });
                    },
                    function (t) {
                      r(t, n);
                    },
                  );
                };
                (s.concat = f(T)),
                  (s.concatSeries = v(T)),
                  (s.whilst = function (t, e, i) {
                    t()
                      ? e(function (r) {
                          return r ? i(r) : void s.whilst(t, e, i);
                        })
                      : i();
                  }),
                  (s.doWhilst = function (t, e, i) {
                    t(function (r) {
                      if (r) return i(r);
                      var n = Array.prototype.slice.call(arguments, 1);
                      e.apply(null, n) ? s.doWhilst(t, e, i) : i();
                    });
                  }),
                  (s.until = function (t, e, i) {
                    t()
                      ? i()
                      : e(function (r) {
                          return r ? i(r) : void s.until(t, e, i);
                        });
                  }),
                  (s.doUntil = function (t, e, i) {
                    t(function (r) {
                      if (r) return i(r);
                      var n = Array.prototype.slice.call(arguments, 1);
                      e.apply(null, n) ? i() : s.doUntil(t, e, i);
                    });
                  }),
                  (s.queue = function (t, e) {
                    function i(t, e, i, r) {
                      return (
                        t.started || (t.started = !0),
                        h(e) || (e = [e]),
                        0 == e.length
                          ? s.setImmediate(function () {
                              t.drain && t.drain();
                            })
                          : void l(e, function (e) {
                              var n = { data: e, callback: 'function' == typeof r ? r : null };
                              i ? t.tasks.unshift(n) : t.tasks.push(n),
                                t.saturated && t.tasks.length === t.concurrency && t.saturated(),
                                s.setImmediate(t.process);
                            })
                      );
                    }
                    void 0 === e && (e = 1);
                    var n = 0,
                      o = {
                        tasks: [],
                        concurrency: e,
                        saturated: null,
                        empty: null,
                        drain: null,
                        started: !1,
                        paused: !1,
                        push: function (t, e) {
                          i(o, t, !1, e);
                        },
                        kill: function () {
                          (o.drain = null), (o.tasks = []);
                        },
                        unshift: function (t, e) {
                          i(o, t, !0, e);
                        },
                        process: function () {
                          if (!o.paused && n < o.concurrency && o.tasks.length) {
                            var e = o.tasks.shift();
                            o.empty && 0 === o.tasks.length && o.empty(), (n += 1);
                            var i = function () {
                                (n -= 1),
                                  e.callback && e.callback.apply(e, arguments),
                                  o.drain && o.tasks.length + n === 0 && o.drain(),
                                  o.process();
                              },
                              s = r(i);
                            t(e.data, s);
                          }
                        },
                        length: function () {
                          return o.tasks.length;
                        },
                        running: function () {
                          return n;
                        },
                        idle: function () {
                          return o.tasks.length + n === 0;
                        },
                        pause: function () {
                          o.paused !== !0 && ((o.paused = !0), o.process());
                        },
                        resume: function () {
                          o.paused !== !1 && ((o.paused = !1), o.process());
                        },
                      };
                    return o;
                  }),
                  (s.priorityQueue = function (t, e) {
                    function i(t, e) {
                      return t.priority - e.priority;
                    }
                    function r(t, e, i) {
                      for (var r = -1, n = t.length - 1; n > r; ) {
                        var o = r + ((n - r + 1) >>> 1);
                        i(e, t[o]) >= 0 ? (r = o) : (n = o - 1);
                      }
                      return r;
                    }
                    function n(t, e, n, o) {
                      return (
                        t.started || (t.started = !0),
                        h(e) || (e = [e]),
                        0 == e.length
                          ? s.setImmediate(function () {
                              t.drain && t.drain();
                            })
                          : void l(e, function (e) {
                              var a = {
                                data: e,
                                priority: n,
                                callback: 'function' == typeof o ? o : null,
                              };
                              t.tasks.splice(r(t.tasks, a, i) + 1, 0, a),
                                t.saturated && t.tasks.length === t.concurrency && t.saturated(),
                                s.setImmediate(t.process);
                            })
                      );
                    }
                    var o = s.queue(t, e);
                    return (
                      (o.push = function (t, e, i) {
                        n(o, t, e, i);
                      }),
                      delete o.unshift,
                      o
                    );
                  }),
                  (s.cargo = function (t, e) {
                    var i = !1,
                      r = [],
                      n = {
                        tasks: r,
                        payload: e,
                        saturated: null,
                        empty: null,
                        drain: null,
                        drained: !0,
                        push: function (t, i) {
                          h(t) || (t = [t]),
                            l(t, function (t) {
                              r.push({ data: t, callback: 'function' == typeof i ? i : null }),
                                (n.drained = !1),
                                n.saturated && r.length === e && n.saturated();
                            }),
                            s.setImmediate(n.process);
                        },
                        process: function o() {
                          if (!i) {
                            if (0 === r.length) return n.drain && !n.drained && n.drain(), void (n.drained = !0);
                            var s = 'number' == typeof e ? r.splice(0, e) : r.splice(0, r.length),
                              a = u(s, function (t) {
                                return t.data;
                              });
                            n.empty && n.empty(),
                              (i = !0),
                              t(a, function () {
                                i = !1;
                                var t = arguments;
                                l(s, function (e) {
                                  e.callback && e.callback.apply(null, t);
                                }),
                                  o();
                              });
                          }
                        },
                        length: function () {
                          return r.length;
                        },
                        running: function () {
                          return i;
                        },
                      };
                    return n;
                  });
                var S = function (t) {
                  return function (e) {
                    var i = Array.prototype.slice.call(arguments, 1);
                    e.apply(
                      null,
                      i.concat([
                        function (e) {
                          var i = Array.prototype.slice.call(arguments, 1);
                          'undefined' != typeof console &&
                            (e ? console.error && void 0 : console[t] && l(i, function (t) {}));
                        },
                      ]),
                    );
                  };
                };
                (s.log = S('log')),
                  (s.dir = S('dir')),
                  (s.memoize = function (t, e) {
                    var i = {},
                      r = {};
                    e =
                      e ||
                      function (t) {
                        return t;
                      };
                    var n = function () {
                      var n = Array.prototype.slice.call(arguments),
                        o = n.pop(),
                        a = e.apply(null, n);
                      a in i
                        ? s.nextTick(function () {
                            o.apply(null, i[a]);
                          })
                        : a in r
                          ? r[a].push(o)
                          : ((r[a] = [o]),
                            t.apply(
                              null,
                              n.concat([
                                function () {
                                  i[a] = arguments;
                                  var t = r[a];
                                  delete r[a];
                                  for (var e = 0, n = t.length; n > e; e++) t[e].apply(null, arguments);
                                },
                              ]),
                            ));
                    };
                    return (n.memo = i), (n.unmemoized = t), n;
                  }),
                  (s.unmemoize = function (t) {
                    return function () {
                      return (t.unmemoized || t).apply(null, arguments);
                    };
                  }),
                  (s.times = function (t, e, i) {
                    for (var r = [], n = 0; t > n; n++) r.push(n);
                    return s.map(r, e, i);
                  }),
                  (s.timesSeries = function (t, e, i) {
                    for (var r = [], n = 0; t > n; n++) r.push(n);
                    return s.mapSeries(r, e, i);
                  }),
                  (s.seq = function () {
                    var t = arguments;
                    return function () {
                      var e = this,
                        i = Array.prototype.slice.call(arguments),
                        r = i.pop();
                      s.reduce(
                        t,
                        i,
                        function (t, i, r) {
                          i.apply(
                            e,
                            t.concat([
                              function () {
                                var t = arguments[0],
                                  e = Array.prototype.slice.call(arguments, 1);
                                r(t, e);
                              },
                            ]),
                          );
                        },
                        function (t, i) {
                          r.apply(e, [t].concat(i));
                        },
                      );
                    };
                  }),
                  (s.compose = function () {
                    return s.seq.apply(null, Array.prototype.reverse.call(arguments));
                  });
                var E = function (t, e) {
                  var i = function () {
                    var i = this,
                      r = Array.prototype.slice.call(arguments),
                      n = r.pop();
                    return t(
                      e,
                      function (t, e) {
                        t.apply(i, r.concat([e]));
                      },
                      n,
                    );
                  };
                  if (arguments.length > 2) {
                    var r = Array.prototype.slice.call(arguments, 2);
                    return i.apply(this, r);
                  }
                  return i;
                };
                (s.applyEach = f(E)),
                  (s.applyEachSeries = v(E)),
                  (s.forever = function (t, e) {
                    function i(r) {
                      if (r) {
                        if (e) return e(r);
                        throw r;
                      }
                      t(i);
                    }
                    i();
                  }),
                  'undefined' != typeof i && i.exports
                    ? (i.exports = s)
                    : 'undefined' != typeof t && t.amd
                      ? t([], function () {
                          return s;
                        })
                      : (n.async = s);
              })();
            }).call(this, e('_process'));
          },
          { _process: 4 },
        ],
        3: [
          function (t, e, i) {
            (function (t) {
              function e(t, e) {
                for (var i = 0, r = t.length - 1; r >= 0; r--) {
                  var n = t[r];
                  '.' === n ? t.splice(r, 1) : '..' === n ? (t.splice(r, 1), i++) : i && (t.splice(r, 1), i--);
                }
                if (e) for (; i--; i) t.unshift('..');
                return t;
              }
              function r(t, e) {
                if (t.filter) return t.filter(e);
                for (var i = [], r = 0; r < t.length; r++) e(t[r], r, t) && i.push(t[r]);
                return i;
              }
              var n = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
                o = function (t) {
                  return n.exec(t).slice(1);
                };
              (i.resolve = function () {
                for (var i = '', n = !1, o = arguments.length - 1; o >= -1 && !n; o--) {
                  var s = o >= 0 ? arguments[o] : t.cwd();
                  if ('string' != typeof s) throw new TypeError('Arguments to path.resolve must be strings');
                  s && ((i = s + '/' + i), (n = '/' === s.charAt(0)));
                }
                return (
                  (i = e(
                    r(i.split('/'), function (t) {
                      return !!t;
                    }),
                    !n,
                  ).join('/')),
                  (n ? '/' : '') + i || '.'
                );
              }),
                (i.normalize = function (t) {
                  var n = i.isAbsolute(t),
                    o = '/' === s(t, -1);
                  return (
                    (t = e(
                      r(t.split('/'), function (t) {
                        return !!t;
                      }),
                      !n,
                    ).join('/')),
                    t || n || (t = '.'),
                    t && o && (t += '/'),
                    (n ? '/' : '') + t
                  );
                }),
                (i.isAbsolute = function (t) {
                  return '/' === t.charAt(0);
                }),
                (i.join = function () {
                  var t = Array.prototype.slice.call(arguments, 0);
                  return i.normalize(
                    r(t, function (t) {
                      if ('string' != typeof t) throw new TypeError('Arguments to path.join must be strings');
                      return t;
                    }).join('/'),
                  );
                }),
                (i.relative = function (t, e) {
                  function r(t) {
                    for (var e = 0; e < t.length && '' === t[e]; e++);
                    for (var i = t.length - 1; i >= 0 && '' === t[i]; i--);
                    return e > i ? [] : t.slice(e, i - e + 1);
                  }
                  (t = i.resolve(t).substr(1)), (e = i.resolve(e).substr(1));
                  for (
                    var n = r(t.split('/')), o = r(e.split('/')), s = Math.min(n.length, o.length), a = s, h = 0;
                    s > h;
                    h++
                  )
                    if (n[h] !== o[h]) {
                      a = h;
                      break;
                    }
                  for (var l = [], h = a; h < n.length; h++) l.push('..');
                  return (l = l.concat(o.slice(a))), l.join('/');
                }),
                (i.sep = '/'),
                (i.delimiter = ':'),
                (i.dirname = function (t) {
                  var e = o(t),
                    i = e[0],
                    r = e[1];
                  return i || r ? (r && (r = r.substr(0, r.length - 1)), i + r) : '.';
                }),
                (i.basename = function (t, e) {
                  var i = o(t)[2];
                  return e && i.substr(-1 * e.length) === e && (i = i.substr(0, i.length - e.length)), i;
                }),
                (i.extname = function (t) {
                  return o(t)[3];
                });
              var s =
                'b' === 'ab'.substr(-1)
                  ? function (t, e, i) {
                      return t.substr(e, i);
                    }
                  : function (t, e, i) {
                      return 0 > e && (e = t.length + e), t.substr(e, i);
                    };
            }).call(this, t('_process'));
          },
          { _process: 4 },
        ],
        4: [
          function (t, e) {
            function i() {
              if (!s) {
                s = !0;
                for (var t, e = o.length; e; ) {
                  (t = o), (o = []);
                  for (var i = -1; ++i < e; ) t[i]();
                  e = o.length;
                }
                s = !1;
              }
            }
            function r() {}
            var n = (e.exports = {}),
              o = [],
              s = !1;
            (n.nextTick = function (t) {
              o.push(t), s || setTimeout(i, 0);
            }),
              (n.title = 'browser'),
              (n.browser = !0),
              (n.env = {}),
              (n.argv = []),
              (n.version = ''),
              (n.on = r),
              (n.addListener = r),
              (n.once = r),
              (n.off = r),
              (n.removeListener = r),
              (n.removeAllListeners = r),
              (n.emit = r),
              (n.binding = function () {
                throw new Error('process.binding is not supported');
              }),
              (n.cwd = function () {
                return '/';
              }),
              (n.chdir = function () {
                throw new Error('process.chdir is not supported');
              }),
              (n.umask = function () {
                return 0;
              });
          },
          {},
        ],
        5: [
          function (e, i, r) {
            !(function () {
              function e() {
                (this._events = {}), this._conf && i.call(this, this._conf);
              }
              function i(t) {
                t &&
                  ((this._conf = t),
                  t.delimiter && (this.delimiter = t.delimiter),
                  t.maxListeners && (this._events.maxListeners = t.maxListeners),
                  t.wildcard && (this.wildcard = t.wildcard),
                  t.newListener && (this.newListener = t.newListener),
                  this.wildcard && (this.listenerTree = {}));
              }
              function n(t) {
                (this._events = {}), (this.newListener = !1), i.call(this, t);
              }
              function o(t, e, i, r) {
                if (!i) return [];
                var n,
                  s,
                  a,
                  h,
                  l,
                  u,
                  c,
                  d = [],
                  p = e.length,
                  f = e[r],
                  m = e[r + 1];
                if (r === p && i._listeners) {
                  if ('function' == typeof i._listeners) return t && t.push(i._listeners), [i];
                  for (n = 0, s = i._listeners.length; s > n; n++) t && t.push(i._listeners[n]);
                  return [i];
                }
                if ('*' === f || '**' === f || i[f]) {
                  if ('*' === f) {
                    for (a in i) '_listeners' !== a && i.hasOwnProperty(a) && (d = d.concat(o(t, e, i[a], r + 1)));
                    return d;
                  }
                  if ('**' === f) {
                    (c = r + 1 === p || (r + 2 === p && '*' === m)), c && i._listeners && (d = d.concat(o(t, e, i, p)));
                    for (a in i)
                      '_listeners' !== a &&
                        i.hasOwnProperty(a) &&
                        ('*' === a || '**' === a
                          ? (i[a]._listeners && !c && (d = d.concat(o(t, e, i[a], p))),
                            (d = d.concat(o(t, e, i[a], r))))
                          : (d = d.concat(a === m ? o(t, e, i[a], r + 2) : o(t, e, i[a], r))));
                    return d;
                  }
                  d = d.concat(o(t, e, i[f], r + 1));
                }
                if (((h = i['*']), h && o(t, e, h, r + 1), (l = i['**'])))
                  if (p > r) {
                    l._listeners && o(t, e, l, p);
                    for (a in l)
                      '_listeners' !== a &&
                        l.hasOwnProperty(a) &&
                        (a === m
                          ? o(t, e, l[a], r + 2)
                          : a === f
                            ? o(t, e, l[a], r + 1)
                            : ((u = {}), (u[a] = l[a]), o(t, e, { '**': u }, r + 1)));
                  } else l._listeners ? o(t, e, l, p) : l['*'] && l['*']._listeners && o(t, e, l['*'], p);
                return d;
              }
              function s(t, e) {
                t = 'string' == typeof t ? t.split(this.delimiter) : t.slice();
                for (var i = 0, r = t.length; r > i + 1; i++) if ('**' === t[i] && '**' === t[i + 1]) return;
                for (var n = this.listenerTree, o = t.shift(); o; ) {
                  if ((n[o] || (n[o] = {}), (n = n[o]), 0 === t.length)) {
                    if (n._listeners) {
                      if ('function' == typeof n._listeners) n._listeners = [n._listeners, e];
                      else if (a(n._listeners) && (n._listeners.push(e), !n._listeners.warned)) {
                        var s = h;
                        'undefined' != typeof this._events.maxListeners && (s = this._events.maxListeners),
                          s > 0 && n._listeners.length > s && void (n._listeners.warned = !0);
                      }
                    } else n._listeners = e;
                    return !0;
                  }
                  o = t.shift();
                }
                return !0;
              }
              var a = Array.isArray
                  ? Array.isArray
                  : function (t) {
                      return '[object Array]' === Object.prototype.toString.call(t);
                    },
                h = 10;
              (n.prototype.delimiter = '.'),
                (n.prototype.setMaxListeners = function (t) {
                  this._events || e.call(this),
                    (this._events.maxListeners = t),
                    this._conf || (this._conf = {}),
                    (this._conf.maxListeners = t);
                }),
                (n.prototype.event = ''),
                (n.prototype.once = function (t, e) {
                  return this.many(t, 1, e), this;
                }),
                (n.prototype.many = function (t, e, i) {
                  function r() {
                    0 === --e && n.off(t, r), i.apply(this, arguments);
                  }
                  var n = this;
                  if ('function' != typeof i) throw new Error('many only accepts instances of Function');
                  return (r._origin = i), this.on(t, r), n;
                }),
                (n.prototype.emit = function () {
                  this._events || e.call(this);
                  var t = arguments[0];
                  if ('newListener' === t && !this.newListener && !this._events.newListener) return !1;
                  if (this._all) {
                    for (var i = arguments.length, r = new Array(i - 1), n = 1; i > n; n++) r[n - 1] = arguments[n];
                    for (n = 0, i = this._all.length; i > n; n++) (this.event = t), this._all[n].apply(this, r);
                  }
                  if ('error' === t && !(this._all || this._events.error || (this.wildcard && this.listenerTree.error)))
                    throw arguments[1] instanceof Error
                      ? arguments[1]
                      : new Error("Uncaught, unspecified 'error' event.");
                  var s;
                  if (this.wildcard) {
                    s = [];
                    var a = 'string' == typeof t ? t.split(this.delimiter) : t.slice();
                    o.call(this, s, a, this.listenerTree, 0);
                  } else s = this._events[t];
                  if ('function' == typeof s) {
                    if (((this.event = t), 1 === arguments.length)) s.call(this);
                    else if (arguments.length > 1)
                      switch (arguments.length) {
                        case 2:
                          s.call(this, arguments[1]);
                          break;
                        case 3:
                          s.call(this, arguments[1], arguments[2]);
                          break;
                        default:
                          for (var i = arguments.length, r = new Array(i - 1), n = 1; i > n; n++)
                            r[n - 1] = arguments[n];
                          s.apply(this, r);
                      }
                    return !0;
                  }
                  if (s) {
                    for (var i = arguments.length, r = new Array(i - 1), n = 1; i > n; n++) r[n - 1] = arguments[n];
                    for (var h = s.slice(), n = 0, i = h.length; i > n; n++) (this.event = t), h[n].apply(this, r);
                    return h.length > 0 || !!this._all;
                  }
                  return !!this._all;
                }),
                (n.prototype.on = function (t, i) {
                  if ('function' == typeof t) return this.onAny(t), this;
                  if ('function' != typeof i) throw new Error('on only accepts instances of Function');
                  if ((this._events || e.call(this), this.emit('newListener', t, i), this.wildcard))
                    return s.call(this, t, i), this;
                  if (this._events[t]) {
                    if ('function' == typeof this._events[t]) this._events[t] = [this._events[t], i];
                    else if (a(this._events[t]) && (this._events[t].push(i), !this._events[t].warned)) {
                      var r = h;
                      'undefined' != typeof this._events.maxListeners && (r = this._events.maxListeners),
                        r > 0 && this._events[t].length > r && void (this._events[t].warned = !0);
                    }
                  } else this._events[t] = i;
                  return this;
                }),
                (n.prototype.onAny = function (t) {
                  if ('function' != typeof t) throw new Error('onAny only accepts instances of Function');
                  return this._all || (this._all = []), this._all.push(t), this;
                }),
                (n.prototype.addListener = n.prototype.on),
                (n.prototype.off = function (t, e) {
                  if ('function' != typeof e) throw new Error('removeListener only takes instances of Function');
                  var i,
                    r = [];
                  if (this.wildcard) {
                    var n = 'string' == typeof t ? t.split(this.delimiter) : t.slice();
                    r = o.call(this, null, n, this.listenerTree, 0);
                  } else {
                    if (!this._events[t]) return this;
                    (i = this._events[t]), r.push({ _listeners: i });
                  }
                  for (var s = 0; s < r.length; s++) {
                    var h = r[s];
                    if (((i = h._listeners), a(i))) {
                      for (var l = -1, u = 0, c = i.length; c > u; u++)
                        if (
                          i[u] === e ||
                          (i[u].listener && i[u].listener === e) ||
                          (i[u]._origin && i[u]._origin === e)
                        ) {
                          l = u;
                          break;
                        }
                      if (0 > l) continue;
                      return (
                        this.wildcard ? h._listeners.splice(l, 1) : this._events[t].splice(l, 1),
                        0 === i.length && (this.wildcard ? delete h._listeners : delete this._events[t]),
                        this
                      );
                    }
                    (i === e || (i.listener && i.listener === e) || (i._origin && i._origin === e)) &&
                      (this.wildcard ? delete h._listeners : delete this._events[t]);
                  }
                  return this;
                }),
                (n.prototype.offAny = function (t) {
                  var e,
                    i = 0,
                    r = 0;
                  if (t && this._all && this._all.length > 0) {
                    for (e = this._all, i = 0, r = e.length; r > i; i++) if (t === e[i]) return e.splice(i, 1), this;
                  } else this._all = [];
                  return this;
                }),
                (n.prototype.removeListener = n.prototype.off),
                (n.prototype.removeAllListeners = function (t) {
                  if (0 === arguments.length) return !this._events || e.call(this), this;
                  if (this.wildcard)
                    for (
                      var i = 'string' == typeof t ? t.split(this.delimiter) : t.slice(),
                        r = o.call(this, null, i, this.listenerTree, 0),
                        n = 0;
                      n < r.length;
                      n++
                    ) {
                      var s = r[n];
                      s._listeners = null;
                    }
                  else {
                    if (!this._events[t]) return this;
                    this._events[t] = null;
                  }
                  return this;
                }),
                (n.prototype.listeners = function (t) {
                  if (this.wildcard) {
                    var i = [],
                      r = 'string' == typeof t ? t.split(this.delimiter) : t.slice();
                    return o.call(this, i, r, this.listenerTree, 0), i;
                  }
                  return (
                    this._events || e.call(this),
                    this._events[t] || (this._events[t] = []),
                    a(this._events[t]) || (this._events[t] = [this._events[t]]),
                    this._events[t]
                  );
                }),
                (n.prototype.listenersAny = function () {
                  return this._all ? this._all : [];
                }),
                'function' == typeof t && t.amd
                  ? t(function () {
                      return n;
                    })
                  : 'object' == typeof r
                    ? (r.EventEmitter2 = n)
                    : (window.EventEmitter2 = n);
            })();
          },
          {},
        ],
        6: [
          function (t, e) {
            function i(t, e) {
              o.call(this),
                (e = e || 10),
                (this.baseUrl = t || ''),
                (this.progress = 0),
                (this.loading = !1),
                (this._progressChunk = 0),
                (this._beforeMiddleware = []),
                (this._afterMiddleware = []),
                (this._boundLoadResource = this.loadResource.bind(this)),
                (this._boundOnComplete = this._onComplete.bind(this)),
                (this._buffer = []),
                (this.queue = r.queue(this._boundLoadResource, e)),
                (this.resources = {});
            }
            var r = t('async'),
              n = t('./Resource'),
              o = t('eventemitter2').EventEmitter2;
            (i.prototype = Object.create(o.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.add = i.prototype.enqueue =
                function (t, e, i, r) {
                  if (('function' == typeof i && ((r = i), (i = null)), this.resources[t]))
                    throw new Error('Resource with name "' + t + '" already exists.');
                  return (
                    (this.resources[t] = new n(t, this.baseUrl + e, i)),
                    'function' == typeof r && this.resources[t].once('afterMiddleware', r),
                    this.queue.started
                      ? (this.queue.push(this.resources[t]),
                        (this._progressChunk = (100 - this.progress) / (this.queue.length() + this.queue.running())))
                      : (this._buffer.push(this.resources[t]), (this._progressChunk = 100 / this._buffer.length)),
                    this
                  );
                }),
              (i.prototype.before = i.prototype.pre =
                function (t) {
                  return this._beforeMiddleware.push(t), this;
                }),
              (i.prototype.after = i.prototype.use =
                function (t) {
                  return this._afterMiddleware.push(t), this;
                }),
              (i.prototype.reset = function () {
                (this._buffer.length = 0),
                  this.queue.kill(),
                  (this.queue.started = !1),
                  (this.progress = 0),
                  (this._progressChunk = 0),
                  (this.loading = !1);
              }),
              (i.prototype.load = function (t) {
                if (('function' == typeof t && this.once('complete', t), this.queue.started)) return this;
                (this.queue.drain = this._boundOnComplete), this.emit('start', this);
                for (var e = 0; e < this._buffer.length; ++e) this.queue.push(this._buffer[e]);
                return (this._buffer.length = 0), this;
              }),
              (i.prototype.loadResource = function (t, e) {
                var i = this;
                this._runMiddleware(t, this._beforeMiddleware, function () {
                  t.once('complete', i._onLoad.bind(i, t, e)), t.load();
                });
              }),
              (i.prototype._onComplete = function () {
                this.emit('complete', this, this.resources);
              }),
              (i.prototype._onLoad = function (t, e) {
                (this.progress += this._progressChunk),
                  this.emit('progress', this, t),
                  t.error ? this.emit('error', t.error, this, t) : this.emit('load', this, t),
                  this._runMiddleware(t, this._afterMiddleware, function () {
                    t.emit('afterMiddleware', t), e && e();
                  });
              }),
              (i.prototype._runMiddleware = function (t, e, i) {
                var n = this;
                r.eachSeries(
                  e,
                  function (e, i) {
                    e.call(n, t, i);
                  },
                  i.bind(this, t),
                );
              }),
              (i.LOAD_TYPE = n.LOAD_TYPE),
              (i.XHR_READY_STATE = n.XHR_READY_STATE),
              (i.XHR_RESPONSE_TYPE = n.XHR_RESPONSE_TYPE);
          },
          { './Resource': 7, async: 2, eventemitter2: 5 },
        ],
        7: [
          function (t, e) {
            function i(t, e, r) {
              if ((n.call(this), (r = r || {}), 'string' != typeof t || 'string' != typeof e))
                throw new Error('Both name and url are required for constructing a resource.');
              (this.name = t),
                (this.url = e),
                (this.data = null),
                (this.crossOrigin = r.crossOrigin),
                (this.loadType = r.loadType || i.LOAD_TYPE.XHR),
                (this.xhrType = r.xhrType),
                (this.error = null),
                (this.xhr = null),
                (this._boundComplete = this.complete.bind(this)),
                (this._boundOnError = this._onError.bind(this)),
                (this._boundOnProgress = this._onProgress.bind(this)),
                (this._boundXhrOnError = this._xhrOnError.bind(this)),
                (this._boundXhrOnAbort = this._xhrOnAbort.bind(this)),
                (this._boundXhrOnLoad = this._xhrOnLoad.bind(this)),
                (this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this));
            }
            function r(t) {
              return t.toString().replace('object ', '');
            }
            var n = t('eventemitter2').EventEmitter2,
              o = !(!window.XDomainRequest || 'withCredentials' in new XMLHttpRequest());
            (i.prototype = Object.create(n.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.complete = function () {
                this.data &&
                  this.data.removeEventListener &&
                  (this.data.removeEventListener('error', this._boundOnError),
                  this.data.removeEventListener('load', this._boundComplete),
                  this.data.removeEventListener('progress', this._boundOnProgress),
                  this.data.removeEventListener('canplaythrough', this._boundComplete)),
                  this.xhr &&
                    (this.xhr.removeEventListener
                      ? (this.xhr.removeEventListener('error', this._boundXhrOnError),
                        this.xhr.removeEventListener('abort', this._boundXhrOnAbort),
                        this.xhr.removeEventListener('progress', this._boundOnProgress),
                        this.xhr.removeEventListener('load', this._boundXhrOnLoad))
                      : ((this.xhr.onerror = null),
                        (this.xhr.ontimeout = null),
                        (this.xhr.onprogress = null),
                        (this.xhr.onload = null))),
                  this.emit('complete', this);
              }),
              (i.prototype.load = function () {
                switch (
                  (this.emit('start', this),
                  'string' != typeof this.crossOrigin && (this.crossOrigin = this._determineCrossOrigin()),
                  this.loadType)
                ) {
                  case i.LOAD_TYPE.IMAGE:
                    this._loadImage();
                    break;
                  case i.LOAD_TYPE.AUDIO:
                    this._loadElement('audio');
                    break;
                  case i.LOAD_TYPE.VIDEO:
                    this._loadElement('video');
                    break;
                  case i.LOAD_TYPE.XHR:
                  default:
                    o ? this._loadXdr() : this._loadXhr();
                }
              }),
              (i.prototype._loadImage = function () {
                (this.data = new Image()),
                  this.crossOrigin && (this.data.crossOrigin = ''),
                  (this.data.src = this.url),
                  this.data.addEventListener('error', this._boundOnError, !1),
                  this.data.addEventListener('load', this._boundComplete, !1),
                  this.data.addEventListener('progress', this._boundOnProgress, !1);
              }),
              (i.prototype._loadElement = function (t) {
                if (((this.data = document.createElement(t)), Array.isArray(this.url)))
                  for (var e = 0; e < this.url.length; ++e) this.data.appendChild(this._createSource(t, this.url[e]));
                else this.data.appendChild(this._createSource(t, this.url));
                this.data.addEventListener('error', this._boundOnError, !1),
                  this.data.addEventListener('load', this._boundComplete, !1),
                  this.data.addEventListener('progress', this._boundOnProgress, !1),
                  this.data.addEventListener('canplaythrough', this._boundComplete, !1),
                  this.data.load();
              }),
              (i.prototype._loadXhr = function () {
                'string' != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                var t = (this.xhr = new XMLHttpRequest());
                t.open('GET', this.url, !0),
                  (t.responseType = this.xhrType),
                  t.addEventListener('error', this._boundXhrOnError, !1),
                  t.addEventListener('abort', this._boundXhrOnAbort, !1),
                  t.addEventListener('progress', this._boundOnProgress, !1),
                  t.addEventListener('load', this._boundXhrOnLoad, !1),
                  t.send();
              }),
              (i.prototype._loadXdr = function () {
                var t = (this.xhr = new XDomainRequest());
                (t.timeout = 5e3),
                  (t.onerror = this._boundXhrOnError),
                  (t.ontimeout = this._boundXdrOnTimeout),
                  (t.onprogress = this._boundOnProgress),
                  (t.onload = this._boundXhrOnLoad);
              }),
              (i.prototype._createSource = function (t, e, i) {
                i || (i = t + '/' + e.substr(e.lastIndexOf('.') + 1));
                var r = document.createElement('source');
                return (r.src = e), (r.type = i), r;
              }),
              (i.prototype._onError = function (t) {
                (this.error = new Error('Failed to load element using ' + t.target.nodeName)), this.complete();
              }),
              (i.prototype._onProgress = function (t) {
                t.lengthComputable && this.emit('progress', this, t.loaded / t.total);
              }),
              (i.prototype._xhrOnError = function (t) {
                (this.error = new Error(
                  r(t.target) + ' Request failed. Status: ' + t.target.status + ', text: "' + t.target.statusText + '"',
                )),
                  this.complete();
              }),
              (i.prototype._xhrOnAbort = function (t) {
                (this.error = new Error(r(t.target) + ' Request was aborted by the user.')), this.complete();
              }),
              (i.prototype._xdrOnTimeout = function (t) {
                (this.error = new Error(r(t.target) + ' Request timed out.')), this.complete();
              }),
              (i.prototype._xhrOnLoad = function (t) {
                var e = t.target;
                200 === e.status
                  ? (this.data =
                      this.xhrType === i.XHR_RESPONSE_TYPE.TEXT
                        ? e.responseText
                        : this.xhrType === i.XHR_RESPONSE_TYPE.DOCUMENT
                          ? e.responseXML || e.response
                          : e.response)
                  : (this.error = new Error(e.responseText)),
                  this.complete();
              }),
              (i.prototype._determineCrossOrigin = function () {
                if (0 === this.url.indexOf('data:')) return '';
                var t = window.location,
                  e = document.createElement('a');
                return (
                  (e.href = this.url),
                  e.hostname !== t.hostname || e.port !== t.port || e.protocol !== t.protocol ? 'anonymous' : ''
                );
              }),
              (i.prototype._determineXhrType = function () {
                var t = this.url.substr(this.url.lastIndexOf('.') + 1);
                switch (t) {
                  case 'xhtml':
                  case 'html':
                  case 'htm':
                  case 'xml':
                  case 'tmx':
                  case 'tsx':
                  case 'svg':
                    return i.XHR_RESPONSE_TYPE.DOCUMENT;
                  case 'gif':
                  case 'png':
                  case 'jpg':
                  case 'jpeg':
                  case 'tif':
                  case 'tiff':
                  case 'webp':
                    return i.XHR_RESPONSE_TYPE.BLOB;
                  case 'json':
                    return i.XHR_RESPONSE_TYPE.JSON;
                  case 'text':
                  case 'txt':
                  default:
                    return i.XHR_RESPONSE_TYPE.TEXT;
                }
              }),
              (i.prototype._getMimeFromXhrType = function (t) {
                switch (t) {
                  case i.XHR_RESPONSE_TYPE.BUFFER:
                    return 'application/octet-binary';
                  case i.XHR_RESPONSE_TYPE.BLOB:
                    return 'application/blob';
                  case i.XHR_RESPONSE_TYPE.DOCUMENT:
                    return 'application/xml';
                  case i.XHR_RESPONSE_TYPE.JSON:
                    return 'application/json';
                  case i.XHR_RESPONSE_TYPE.DEFAULT:
                  case i.XHR_RESPONSE_TYPE.TEXT:
                  default:
                    return 'text/plain';
                }
              }),
              (i.LOAD_TYPE = { XHR: 1, IMAGE: 2, AUDIO: 3, VIDEO: 4 }),
              (i.XHR_READY_STATE = { UNSENT: 0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4 }),
              (i.XHR_RESPONSE_TYPE = {
                DEFAULT: 'text',
                BUFFER: 'arraybuffer',
                BLOB: 'blob',
                DOCUMENT: 'document',
                JSON: 'json',
                TEXT: 'text',
              });
          },
          { eventemitter2: 5 },
        ],
        8: [
          function (t, e) {
            (e.exports = t('./Loader')),
              (e.exports.Resource = t('./Resource')),
              (e.exports.middleware = {
                caching: { memory: t('./middlewares/caching/memory') },
                parsing: { json: t('./middlewares/parsing/json'), blob: t('./middlewares/parsing/blob') },
              });
          },
          {
            './Loader': 6,
            './Resource': 7,
            './middlewares/caching/memory': 9,
            './middlewares/parsing/blob': 10,
            './middlewares/parsing/json': 11,
          },
        ],
        9: [
          function (t, e) {
            var i = {};
            e.exports = function () {
              return function (t, e) {
                i[t.url]
                  ? ((t.data = i[t.url]), t.complete())
                  : (t.once('complete', function () {
                      i[this.url] = this.data;
                    }),
                    e());
              };
            };
          },
          {},
        ],
        10: [
          function (t, e) {
            var i = t('../../Resource');
            (window.URL = window.URL || window.webkitURL),
              (e.exports = function () {
                return function (t, e) {
                  if (t.xhr && t.xhrType === i.XHR_RESPONSE_TYPE.BLOB) {
                    if (0 === t.data.type.indexOf('image')) {
                      var r = URL.createObjectURL(t.data);
                      (t.data = new Image()),
                        (t.data.src = r),
                        (t.data.onload = function () {
                          URL.revokeObjectURL(r), (t.data.onload = null), e();
                        });
                    }
                  } else e();
                };
              });
          },
          { '../../Resource': 7 },
        ],
        11: [
          function (t, e) {
            e.exports = function () {
              return function (t, e) {
                if ('string' == typeof t.data)
                  try {
                    t.data = JSON.parse(t.data);
                  } catch (i) {}
                e();
              };
            };
          },
          {},
        ],
        12: [
          function (t, e) {
            e.exports = {
              name: 'pixi.js',
              version: '3.0.0',
              description: 'Pixi.js is a fast lightweight 2D library that works across all devices.',
              author: 'Mat Groves',
              contributors: ['Chad Engler <chad@pantherdev.com>', 'Richard Davey <rdavey@gmail.com>'],
              main: './src/index.js',
              homepage: 'http://goodboydigital.com/',
              bugs: 'https://github.com/pixijs/pixijs/issues',
              license: 'MIT',
              repository: { type: 'git', url: 'https://github.com/pixijs/pixijs.git' },
              scripts: { test: 'gulp test', docs: './node_modules/.bin/jsdoc -c ./gulp/util/jsdoc.conf.json' },
              devDependencies: {
                brfs: '^1.2.0',
                browserify: '^8.0.2',
                chai: '^1.10.0',
                del: '^1.1.0',
                gulp: '^3.8.10',
                'gulp-cached': '^1.0.1',
                'gulp-jshint': '^1.9.0',
                'gulp-plumber': '^0.6.6',
                'gulp-rename': '^1.2.0',
                'gulp-uglify': '^1.0.2',
                'gulp-util': '^3.0.1',
                'ink-docstrap': '^0.4.12',
                jsdoc: '^3.3.0-alpha13',
                'jshint-summary': '^0.4.0',
                karma: '^0.12.28',
                'karma-firefox-launcher': '^0.1.0',
                'karma-mocha': '^0.1.10',
                'karma-spec-reporter': '^0.0.16',
                minimist: '^1.1.0',
                mocha: '^2.1.0',
                'require-dir': '^0.1.0',
                'run-sequence': '^1.0.2',
                'vinyl-buffer': '^1.0.0',
                'vinyl-source-stream': '^1.0.0',
                watchify: '^2.2.1',
              },
              dependencies: { async: '^0.9.0', 'resource-loader': '^1.1.4' },
              browserify: { transform: ['brfs'] },
            };
          },
          {},
        ],
        13: [
          function (t, e) {
            e.exports = {
              VERSION: t('../../package.json').version,
              RENDERER_TYPE: { UNKNOWN: 0, WEBGL: 1, CANVAS: 2 },
              BLEND_MODES: {
                NORMAL: 0,
                ADD: 1,
                MULTIPLY: 2,
                SCREEN: 3,
                OVERLAY: 4,
                DARKEN: 5,
                LIGHTEN: 6,
                COLOR_DODGE: 7,
                COLOR_BURN: 8,
                HARD_LIGHT: 9,
                SOFT_LIGHT: 10,
                DIFFERENCE: 11,
                EXCLUSION: 12,
                HUE: 13,
                SATURATION: 14,
                COLOR: 15,
                LUMINOSITY: 16,
              },
              SCALE_MODES: { DEFAULT: 0, LINEAR: 0, NEAREST: 1 },
              RETINA_PREFIX: /@(.+)x/,
              RESOLUTION: 1,
              DEFAULT_RENDER_OPTIONS: {
                view: null,
                resolution: 1,
                antialias: !1,
                autoResize: !1,
                transparent: !1,
                backgroundColor: 0,
                clearBeforeRender: !0,
                preserveDrawingBuffer: !1,
              },
              SHAPES: { POLY: 0, RECT: 1, CIRC: 2, ELIP: 3, RREC: 4 },
              SPRITE_BATCH_SIZE: 2e3,
            };
          },
          { '../../package.json': 12 },
        ],
        14: [
          function (t, e) {
            function i() {
              n.call(this), (this.children = []);
            }
            var r = t('../math'),
              n = t('./DisplayObject'),
              o = t('../textures/RenderTexture'),
              s = new r.Matrix();
            (i.prototype = Object.create(n.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                width: {
                  get: function () {
                    return this.scale.x * this.getLocalBounds().width;
                  },
                  set: function (t) {
                    var e = this.getLocalBounds().width;
                    (this.scale.x = 0 !== e ? t / e : 1), (this._width = t);
                  },
                },
                height: {
                  get: function () {
                    return this.scale.y * this.getLocalBounds().height;
                  },
                  set: function (t) {
                    var e = this.getLocalBounds().height;
                    (this.scale.y = 0 !== e ? t / e : 1), (this._height = t);
                  },
                },
              }),
              (i.prototype.addChild = function (t) {
                return this.addChildAt(t, this.children.length);
              }),
              (i.prototype.addChildAt = function (t, e) {
                if (t === this) return t;
                if (e >= 0 && e <= this.children.length)
                  return t.parent && t.parent.removeChild(t), (t.parent = this), this.children.splice(e, 0, t), t;
                throw new Error(
                  t + 'addChildAt: The index ' + e + ' supplied is out of bounds ' + this.children.length,
                );
              }),
              (i.prototype.swapChildren = function (t, e) {
                if (t !== e) {
                  var i = this.getChildIndex(t),
                    r = this.getChildIndex(e);
                  if (0 > i || 0 > r)
                    throw new Error('swapChildren: Both the supplied DisplayObjects must be a child of the caller.');
                  (this.children[i] = e), (this.children[r] = t);
                }
              }),
              (i.prototype.getChildIndex = function (t) {
                var e = this.children.indexOf(t);
                if (-1 === e) throw new Error('The supplied DisplayObject must be a child of the caller');
                return e;
              }),
              (i.prototype.setChildIndex = function (t, e) {
                if (0 > e || e >= this.children.length) throw new Error('The supplied index is out of bounds');
                var i = this.getChildIndex(t);
                this.children.splice(i, 1), this.children.splice(e, 0, t);
              }),
              (i.prototype.getChildAt = function (t) {
                if (0 > t || t >= this.children.length)
                  throw new Error(
                    'getChildAt: Supplied index ' +
                      t +
                      ' does not exist in the child list, or the supplied DisplayObject must be a child of the caller',
                  );
                return this.children[t];
              }),
              (i.prototype.removeChild = function (t) {
                var e = this.children.indexOf(t);
                return -1 !== e ? this.removeChildAt(e) : void 0;
              }),
              (i.prototype.removeChildAt = function (t) {
                var e = this.getChildAt(t);
                return (e.parent = null), this.children.splice(t, 1), e;
              }),
              (i.prototype.removeChildren = function (t, e) {
                var i = t || 0,
                  r = 'number' == typeof e ? e : this.children.length,
                  n = r - i;
                if (n > 0 && r >= n) {
                  for (var o = this.children.splice(i, n), s = 0; s < o.length; ++s) o[s].parent = null;
                  return o;
                }
                if (0 === n && 0 === this.children.length) return [];
                throw new RangeError('removeChildren: numeric values are outside the acceptable range.');
              }),
              (i.prototype.generateTexture = function (t, e, i) {
                var r = this.getLocalBounds(),
                  n = new o(t, 0 | r.width, 0 | r.height, t, i, e);
                return (s.tx = -r.x), (s.ty = -r.y), n.render(this, s), n;
              }),
              (i.prototype.updateTransform = function () {
                if (this.visible) {
                  this.displayObjectUpdateTransform();
                  for (var t = 0, e = this.children.length; e > t; ++t) this.children[t].updateTransform();
                }
              }),
              (i.prototype.containerUpdateTransform = i.prototype.updateTransform),
              (i.prototype.getBounds = function () {
                if (!this._currentBounds) {
                  if (0 === this.children.length) return r.Rectangle.EMPTY;
                  for (
                    var t, e, i, n = 1 / 0, o = 1 / 0, s = -1 / 0, a = -1 / 0, h = !1, l = 0, u = this.children.length;
                    u > l;
                    ++l
                  ) {
                    var c = this.children[l];
                    c.visible &&
                      ((h = !0),
                      (t = this.children[l].getBounds()),
                      (n = n < t.x ? n : t.x),
                      (o = o < t.y ? o : t.y),
                      (e = t.width + t.x),
                      (i = t.height + t.y),
                      (s = s > e ? s : e),
                      (a = a > i ? a : i));
                  }
                  if (!h) return r.Rectangle.EMPTY;
                  var d = this._bounds;
                  (d.x = n), (d.y = o), (d.width = s - n), (d.height = a - o), (this._currentBounds = d);
                }
                return this._currentBounds;
              }),
              (i.prototype.getLocalBounds = function () {
                var t = this.worldTransform;
                this.worldTransform = r.Matrix.IDENTITY;
                for (var e = 0, i = this.children.length; i > e; ++e) this.children[e].updateTransform();
                return (this.worldTransform = t), (this._currentBounds = null), this.getBounds();
              }),
              (i.prototype.renderWebGL = function (t) {
                if (this.visible && !(this.worldAlpha <= 0) && this.renderable) {
                  var e, i;
                  if (this._mask || this._filters) {
                    for (
                      t.currentRenderer.flush(),
                        this._filters && t.filterManager.pushFilter(this, this._filters),
                        this._mask && t.maskManager.pushMask(this, this._mask),
                        t.currentRenderer.start(),
                        this._renderWebGL(t),
                        e = 0,
                        i = this.children.length;
                      i > e;
                      e++
                    )
                      this.children[e].renderWebGL(t);
                    t.currentRenderer.flush(),
                      this._mask && t.maskManager.popMask(this, this._mask),
                      this._filters && t.filterManager.popFilter(),
                      t.currentRenderer.start();
                  } else
                    for (this._renderWebGL(t), e = 0, i = this.children.length; i > e; ++e)
                      this.children[e].renderWebGL(t);
                }
              }),
              (i.prototype._renderWebGL = function () {}),
              (i.prototype.renderCanvas = function (t) {
                if (this.visible && !(this.alpha <= 0) && this.renderable) {
                  this._mask && t.maskManager.pushMask(this._mask, t);
                  for (var e = 0, i = this.children.length; i > e; ++e) this.children[e].renderCanvas(t);
                  this._mask && t.maskManager.popMask(t);
                }
              });
          },
          { '../math': 23, '../textures/RenderTexture': 60, './DisplayObject': 15 },
        ],
        15: [
          function (t, e) {
            function i() {
              (this.position = new r.Point()),
                (this.scale = new r.Point(1, 1)),
                (this.pivot = new r.Point(0, 0)),
                (this.rotation = 0),
                (this.alpha = 1),
                (this.visible = !0),
                (this.renderable = !0),
                (this.parent = null),
                (this.worldAlpha = 1),
                (this.worldTransform = new r.Matrix()),
                (this.filterArea = null),
                (this._sr = 0),
                (this._cr = 1),
                (this._bounds = new r.Rectangle(0, 0, 1, 1)),
                (this._currentBounds = null),
                (this._mask = null),
                (this._cacheAsBitmap = !1),
                (this._cachedObject = null);
            }
            var r = t('../math'),
              n = t('../utils'),
              o = t('../textures/RenderTexture'),
              s = new r.Matrix();
            (i.prototype.constructor = i),
              n.eventTarget.mixin(i.prototype),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                x: {
                  get: function () {
                    return this.position.x;
                  },
                  set: function (t) {
                    this.position.x = t;
                  },
                },
                y: {
                  get: function () {
                    return this.position.y;
                  },
                  set: function (t) {
                    this.position.y = t;
                  },
                },
                worldVisible: {
                  get: function () {
                    var t = this;
                    do {
                      if (!t.visible) return !1;
                      t = t.parent;
                    } while (t);
                    return !0;
                  },
                },
                mask: {
                  get: function () {
                    return this._mask;
                  },
                  set: function (t) {
                    this._mask && (this._mask.renderable = !0),
                      (this._mask = t),
                      this._mask && (this._mask.renderable = !1);
                  },
                },
                filters: {
                  get: function () {
                    return this._filters && this._filters.slice();
                  },
                  set: function (t) {
                    this._filters = t && t.slice();
                  },
                },
              }),
              (i.prototype.updateTransform = function () {
                var t,
                  e,
                  i,
                  n,
                  o,
                  s,
                  a = this.parent.worldTransform,
                  h = this.worldTransform;
                this.rotation % r.PI_2
                  ? (this.rotation !== this.rotationCache &&
                      ((this.rotationCache = this.rotation),
                      (this._sr = Math.sin(this.rotation)),
                      (this._cr = Math.cos(this.rotation))),
                    (t = this._cr * this.scale.x),
                    (e = this._sr * this.scale.x),
                    (i = -this._sr * this.scale.y),
                    (n = this._cr * this.scale.y),
                    (o = this.position.x),
                    (s = this.position.y),
                    (this.pivot.x || this.pivot.y) &&
                      ((o -= this.pivot.x * t + this.pivot.y * i), (s -= this.pivot.x * e + this.pivot.y * n)),
                    (h.a = t * a.a + e * a.c),
                    (h.b = t * a.b + e * a.d),
                    (h.c = i * a.a + n * a.c),
                    (h.d = i * a.b + n * a.d),
                    (h.tx = o * a.a + s * a.c + a.tx),
                    (h.ty = o * a.b + s * a.d + a.ty))
                  : ((t = this.scale.x),
                    (n = this.scale.y),
                    (o = this.position.x - this.pivot.x * t),
                    (s = this.position.y - this.pivot.y * n),
                    (h.a = t * a.a),
                    (h.b = t * a.b),
                    (h.c = n * a.c),
                    (h.d = n * a.d),
                    (h.tx = o * a.a + s * a.c + a.tx),
                    (h.ty = o * a.b + s * a.d + a.ty)),
                  (this.worldAlpha = this.alpha * this.parent.worldAlpha),
                  (this._currentBounds = null);
              }),
              (i.prototype.displayObjectUpdateTransform = i.prototype.updateTransform),
              (i.prototype.getBounds = function () {
                return r.Rectangle.EMPTY;
              }),
              (i.prototype.getLocalBounds = function () {
                return this.getBounds(r.Matrix.IDENTITY);
              }),
              (i.prototype.toGlobal = function (t) {
                return this.displayObjectUpdateTransform(), this.worldTransform.apply(t);
              }),
              (i.prototype.toLocal = function (t, e) {
                return (
                  e && (t = e.toGlobal(t)), this.displayObjectUpdateTransform(), this.worldTransform.applyInverse(t)
                );
              }),
              (i.prototype.renderWebGL = function () {}),
              (i.prototype.renderCanvas = function () {}),
              (i.prototype.generateTexture = function (t, e, i) {
                var r = this.getLocalBounds(),
                  n = new o(t, 0 | r.width, 0 | r.height, t, i, e);
                return (s.tx = -r.x), (s.ty = -r.y), n.render(this, s), n;
              });
          },
          { '../math': 23, '../textures/RenderTexture': 60, '../utils': 68 },
        ],
        16: [
          function (t, e) {
            function i() {
              r.call(this),
                (this.fillAlpha = 1),
                (this.lineWidth = 0),
                (this.lineColor = 0),
                (this.graphicsData = []),
                (this.tint = 16777215),
                (this.blendMode = u.BLEND_MODES.NORMAL),
                (this.currentPath = null),
                (this._webGL = {}),
                (this.isMask = !1),
                (this.boundsPadding = 0),
                (this._localBounds = new l.Rectangle(0, 0, 1, 1)),
                (this.dirty = !0),
                (this.glDirty = !1),
                (this.cachedSpriteDirty = !1);
            }
            var r = t('../display/Container'),
              n = t('../sprites/Sprite'),
              o = t('../textures/Texture'),
              s = t('../renderers/canvas/utils/CanvasBuffer'),
              a = t('../renderers/canvas/utils/CanvasGraphics'),
              h = t('./GraphicsData'),
              l = t('../math'),
              u = t('../const');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {}),
              (h.prototype.clone = function () {
                var t = new i();
                (t.renderable = this.renderable),
                  (t.fillAlpha = this.fillAlpha),
                  (t.lineWidth = this.lineWidth),
                  (t.lineColor = this.lineColor),
                  (t.tint = this.tint),
                  (t.blendMode = this.blendMode),
                  (t.isMask = this.isMask),
                  (t.boundsPadding = this.boundsPadding),
                  (t.dirty = this.dirty),
                  (t.glDirty = this.glDirty),
                  (t.cachedSpriteDirty = this.cachedSpriteDirty);
                for (var e = 0; e < this.graphicsData.length; ++e) t.graphicsData.push(this.graphicsData.clone());
                return (t.currentPath = t.graphicsData[t.graphicsData.length - 1]), t.updateLocalBounds(), t;
              }),
              (i.prototype.lineStyle = function (t, e, i) {
                return (
                  (this.lineWidth = t || 0),
                  (this.lineColor = e || 0),
                  (this.lineAlpha = arguments.length < 3 ? 1 : i),
                  this.currentPath &&
                    (this.currentPath.shape.points.length
                      ? this.drawShape(new l.Polygon(this.currentPath.shape.points.slice(-2)))
                      : ((this.currentPath.lineWidth = this.lineWidth),
                        (this.currentPath.lineColor = this.lineColor),
                        (this.currentPath.lineAlpha = this.lineAlpha))),
                  this
                );
              }),
              (i.prototype.moveTo = function (t, e) {
                return this.drawShape(new l.Polygon([t, e])), this;
              }),
              (i.prototype.lineTo = function (t, e) {
                return this.currentPath.shape.points.push(t, e), (this.dirty = !0), this;
              }),
              (i.prototype.quadraticCurveTo = function (t, e, i, r) {
                this.currentPath
                  ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0])
                  : this.moveTo(0, 0);
                var n,
                  o,
                  s = 20,
                  a = this.currentPath.shape.points;
                0 === a.length && this.moveTo(0, 0);
                for (var h = a[a.length - 2], l = a[a.length - 1], u = 0, c = 1; s >= c; ++c)
                  (u = c / s),
                    (n = h + (t - h) * u),
                    (o = l + (e - l) * u),
                    a.push(n + (t + (i - t) * u - n) * u, o + (e + (r - e) * u - o) * u);
                return (this.dirty = !0), this;
              }),
              (i.prototype.bezierCurveTo = function (t, e, i, r, n, o) {
                this.currentPath
                  ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0])
                  : this.moveTo(0, 0);
                for (
                  var s,
                    a,
                    h,
                    l,
                    u,
                    c = 20,
                    d = this.currentPath.shape.points,
                    p = d[d.length - 2],
                    f = d[d.length - 1],
                    m = 0,
                    v = 1;
                  c >= v;
                  ++v
                )
                  (m = v / c),
                    (s = 1 - m),
                    (a = s * s),
                    (h = a * s),
                    (l = m * m),
                    (u = l * m),
                    d.push(
                      h * p + 3 * a * m * t + 3 * s * l * i + u * n,
                      h * f + 3 * a * m * e + 3 * s * l * r + u * o,
                    );
                return (this.dirty = !0), this;
              }),
              (i.prototype.arcTo = function (t, e, i, r, n) {
                this.currentPath
                  ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(t, e)
                  : this.moveTo(t, e);
                var o = this.currentPath.shape.points,
                  s = o[o.length - 2],
                  a = o[o.length - 1],
                  h = a - e,
                  l = s - t,
                  u = r - e,
                  c = i - t,
                  d = Math.abs(h * c - l * u);
                if (1e-8 > d || 0 === n) (o[o.length - 2] !== t || o[o.length - 1] !== e) && o.push(t, e);
                else {
                  var p = h * h + l * l,
                    f = u * u + c * c,
                    m = h * u + l * c,
                    v = (n * Math.sqrt(p)) / d,
                    g = (n * Math.sqrt(f)) / d,
                    y = (v * m) / p,
                    x = (g * m) / f,
                    _ = v * c + g * l,
                    b = v * u + g * h,
                    w = l * (g + y),
                    T = h * (g + y),
                    S = c * (v + x),
                    E = u * (v + x),
                    A = Math.atan2(T - b, w - _),
                    C = Math.atan2(E - b, S - _);
                  this.arc(_ + t, b + e, n, A, C, l * u > c * h);
                }
                return (this.dirty = !0), this;
              }),
              (i.prototype.arc = function (t, e, i, r, n, o) {
                var s,
                  a = t + Math.cos(r) * i,
                  h = e + Math.sin(r) * i;
                if (
                  (this.currentPath
                    ? ((s = this.currentPath.shape.points),
                      0 === s.length ? s.push(a, h) : (s[s.length - 2] !== a || s[s.length - 1] !== h) && s.push(a, h))
                    : (this.moveTo(a, h), (s = this.currentPath.shape.points)),
                  r === n)
                )
                  return this;
                !o && r >= n ? (n += 2 * Math.PI) : o && n >= r && (r += 2 * Math.PI);
                var l = o ? -1 * (r - n) : n - r,
                  u = 40 * Math.ceil(Math.abs(l) / (2 * Math.PI));
                if (0 === l) return this;
                for (
                  var c = l / (2 * u), d = 2 * c, p = Math.cos(c), f = Math.sin(c), m = u - 1, v = (m % 1) / m, g = 0;
                  m >= g;
                  g++
                ) {
                  var y = g + v * g,
                    x = c + r + d * y,
                    _ = Math.cos(x),
                    b = -Math.sin(x);
                  s.push((p * _ + f * b) * i + t, (p * -b + f * _) * i + e);
                }
                return (this.dirty = !0), this;
              }),
              (i.prototype.beginFill = function (t, e) {
                return (
                  (this.filling = !0),
                  (this.fillColor = t || 0),
                  (this.fillAlpha = void 0 === e ? 1 : e),
                  this.currentPath &&
                    this.currentPath.shape.points.length <= 2 &&
                    ((this.currentPath.fill = this.filling),
                    (this.currentPath.fillColor = this.fillColor),
                    (this.currentPath.fillAlpha = this.fillAlpha)),
                  this
                );
              }),
              (i.prototype.endFill = function () {
                return (this.filling = !1), (this.fillColor = null), (this.fillAlpha = 1), this;
              }),
              (i.prototype.drawRect = function (t, e, i, r) {
                return this.drawShape(new l.Rectangle(t, e, i, r)), this;
              }),
              (i.prototype.drawRoundedRect = function (t, e, i, r, n) {
                return this.drawShape(new l.RoundedRectangle(t, e, i, r, n)), this;
              }),
              (i.prototype.drawCircle = function (t, e, i) {
                return this.drawShape(new l.Circle(t, e, i)), this;
              }),
              (i.prototype.drawEllipse = function (t, e, i, r) {
                return this.drawShape(new l.Ellipse(t, e, i, r)), this;
              }),
              (i.prototype.drawPolygon = function (t) {
                return (
                  t instanceof Array || (t = Array.prototype.slice.call(arguments)),
                  this.drawShape(new l.Polygon(t)),
                  this
                );
              }),
              (i.prototype.clear = function () {
                return (
                  (this.lineWidth = 0),
                  (this.filling = !1),
                  (this.dirty = !0),
                  (this.clearDirty = !0),
                  (this.graphicsData = []),
                  this
                );
              }),
              (i.prototype.generateTexture = function (t, e) {
                t = t || 1;
                var i = this.getBounds(),
                  r = new s(i.width * t, i.height * t),
                  n = o.fromCanvas(r.canvas, e);
                return (
                  (n.baseTexture.resolution = t),
                  r.context.scale(t, t),
                  r.context.translate(-i.x, -i.y),
                  a.renderGraphics(this, r.context),
                  n
                );
              }),
              (i.prototype._renderWebGL = function (t) {
                this.glDirty && ((this.dirty = !0), (this.glDirty = !1)),
                  t.setObjectRenderer(t.plugins.graphics),
                  t.plugins.graphics.render(this);
              }),
              (i.prototype.renderCanvas = function (t) {
                if (this.visible && !(this.alpha <= 0) && this.isMask !== !0 && this.renderable) {
                  if (this._cacheAsBitmap)
                    return (
                      (this.dirty || this.cachedSpriteDirty) &&
                        (this._generateCachedSprite(),
                        this.updateCachedSpriteTexture(),
                        (this.cachedSpriteDirty = !1),
                        (this.dirty = !1)),
                      (this._cachedSprite.alpha = this.alpha),
                      void n.prototype.renderCanvas.call(this._cachedSprite, t)
                    );
                  var e = t.context,
                    i = this.worldTransform;
                  this.blendMode !== t.currentBlendMode &&
                    ((t.currentBlendMode = this.blendMode),
                    (e.globalCompositeOperation = t.blendModes[t.currentBlendMode])),
                    this._mask && t.maskManager.pushMask(this._mask, t);
                  var r = t.resolution;
                  e.setTransform(i.a * r, i.b * r, i.c * r, i.d * r, i.tx * r, i.ty * r), a.renderGraphics(this, e);
                  for (var o = 0, s = this.children.length; s > o; ++o) this.children[o].renderCanvas(t);
                  this._mask && t.maskManager.popMask(t);
                }
              }),
              (i.prototype.getBounds = function (t) {
                if (!this._currentBounds) {
                  if (!this.renderable) return l.Rectangle.EMPTY;
                  this.dirty &&
                    (this.updateLocalBounds(), (this.glDirty = !0), (this.cachedSpriteDirty = !0), (this.dirty = !1));
                  var e = this._localBounds,
                    i = e.x,
                    r = e.width + e.x,
                    n = e.y,
                    o = e.height + e.y,
                    s = t || this.worldTransform,
                    a = s.a,
                    h = s.b,
                    u = s.c,
                    c = s.d,
                    d = s.tx,
                    p = s.ty,
                    f = a * r + u * o + d,
                    m = c * o + h * r + p,
                    v = a * i + u * o + d,
                    g = c * o + h * i + p,
                    y = a * i + u * n + d,
                    x = c * n + h * i + p,
                    _ = a * r + u * n + d,
                    b = c * n + h * r + p,
                    w = f,
                    T = m,
                    S = f,
                    E = m;
                  (S = S > v ? v : S),
                    (S = S > y ? y : S),
                    (S = S > _ ? _ : S),
                    (E = E > g ? g : E),
                    (E = E > x ? x : E),
                    (E = E > b ? b : E),
                    (w = v > w ? v : w),
                    (w = y > w ? y : w),
                    (w = _ > w ? _ : w),
                    (T = g > T ? g : T),
                    (T = x > T ? x : T),
                    (T = b > T ? b : T),
                    (this._bounds.x = S),
                    (this._bounds.width = w - S),
                    (this._bounds.y = E),
                    (this._bounds.height = T - E),
                    (this._currentBounds = this._bounds);
                }
                return this._currentBounds;
              }),
              (i.prototype.updateLocalBounds = function () {
                var t = 1 / 0,
                  e = -1 / 0,
                  i = 1 / 0,
                  r = -1 / 0;
                if (this.graphicsData.length)
                  for (var n, o, s, a, h, l, c = 0; c < this.graphicsData.length; c++) {
                    var d = this.graphicsData[c],
                      p = d.type,
                      f = d.lineWidth;
                    if (((n = d.shape), p === u.SHAPES.RECT || p === u.SHAPES.RREC))
                      (s = n.x - f / 2),
                        (a = n.y - f / 2),
                        (h = n.width + f),
                        (l = n.height + f),
                        (t = t > s ? s : t),
                        (e = s + h > e ? s + h : e),
                        (i = i > a ? a : i),
                        (r = a + l > r ? a + l : r);
                    else if (p === u.SHAPES.CIRC)
                      (s = n.x),
                        (a = n.y),
                        (h = n.radius + f / 2),
                        (l = n.radius + f / 2),
                        (t = t > s - h ? s - h : t),
                        (e = s + h > e ? s + h : e),
                        (i = i > a - l ? a - l : i),
                        (r = a + l > r ? a + l : r);
                    else if (p === u.SHAPES.ELIP)
                      (s = n.x),
                        (a = n.y),
                        (h = n.width + f / 2),
                        (l = n.height + f / 2),
                        (t = t > s - h ? s - h : t),
                        (e = s + h > e ? s + h : e),
                        (i = i > a - l ? a - l : i),
                        (r = a + l > r ? a + l : r);
                    else {
                      o = n.points;
                      for (var m = 0; m < o.length; m += 2)
                        (s = o[m]),
                          (a = o[m + 1]),
                          (t = t > s - f ? s - f : t),
                          (e = s + f > e ? s + f : e),
                          (i = i > a - f ? a - f : i),
                          (r = a + f > r ? a + f : r);
                    }
                  }
                else (t = 0), (e = 0), (i = 0), (r = 0);
                var v = this.boundsPadding;
                (this._localBounds.x = t - v),
                  (this._localBounds.width = e - t + 2 * v),
                  (this._localBounds.y = i - v),
                  (this._localBounds.height = r - i + 2 * v);
              }),
              (i.prototype.drawShape = function (t) {
                this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(),
                  (this.currentPath = null);
                var e = new h(
                  this.lineWidth,
                  this.lineColor,
                  this.lineAlpha,
                  this.fillColor,
                  this.fillAlpha,
                  this.filling,
                  t,
                );
                return (
                  this.graphicsData.push(e),
                  e.type === u.SHAPES.POLY && ((e.shape.closed = this.filling), (this.currentPath = e)),
                  (this.dirty = !0),
                  e
                );
              });
          },
          {
            '../const': 13,
            '../display/Container': 14,
            '../math': 23,
            '../renderers/canvas/utils/CanvasBuffer': 35,
            '../renderers/canvas/utils/CanvasGraphics': 36,
            '../sprites/Sprite': 57,
            '../textures/Texture': 61,
            './GraphicsData': 17,
          },
        ],
        17: [
          function (t, e) {
            function i(t, e, i, r, n, o, s) {
              (this.lineWidth = t),
                (this.lineColor = e),
                (this.lineAlpha = i),
                (this._lineTint = e),
                (this.fillColor = r),
                (this.fillAlpha = n),
                (this._fillTint = r),
                (this.fill = o),
                (this.shape = s),
                (this.type = s.type);
            }
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.clone = function () {
                return new i(
                  this.lineWidth,
                  this.lineColor,
                  this.lineAlpha,
                  this.fillColor,
                  this.fillAlpha,
                  this.fill,
                  this.shape,
                );
              });
          },
          {},
        ],
        18: [
          function (t, e) {
            function i(t) {
              s.call(this, t),
                (this.graphicsDataPool = []),
                (this.primitiveShader = null),
                (this.complexPrimitiveShader = null);
            }
            var r = t('../../utils'),
              n = t('../../math'),
              o = t('../../const'),
              s = t('../../renderers/webgl/utils/ObjectRenderer'),
              a = t('../../renderers/webgl/WebGLRenderer'),
              h = t('./WebGLGraphicsData');
            (i.prototype = Object.create(s.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              a.registerPlugin('graphics', i),
              (i.prototype.onContextChange = function () {}),
              (i.prototype.destroy = function () {
                s.prototype.destroy.call(this), (this.graphicsDataPool = null);
              }),
              (i.prototype.render = function (t) {
                var e,
                  i = this.renderer,
                  n = i.gl,
                  o = i.shaderManager.plugins.primitiveShader;
                t.dirty && this.updateGraphics(t, n);
                var s = t._webGL[n.id];
                i.blendModeManager.setBlendMode(t.blendMode);
                for (var a = 0; a < s.data.length; a++)
                  1 === s.data[a].mode
                    ? ((e = s.data[a]),
                      i.stencilManager.pushStencil(t, e, i),
                      n.drawElements(n.TRIANGLE_FAN, 4, n.UNSIGNED_SHORT, 2 * (e.indices.length - 4)),
                      i.stencilManager.popStencil(t, e, i))
                    : ((e = s.data[a]),
                      (o = i.shaderManager.primitiveShader),
                      i.shaderManager.setShader(o),
                      n.uniformMatrix3fv(o.uniforms.translationMatrix._location, !1, t.worldTransform.toArray(!0)),
                      n.uniformMatrix3fv(
                        o.uniforms.projectionMatrix._location,
                        !1,
                        i.currentRenderTarget.projectionMatrix.toArray(!0),
                      ),
                      n.uniform3fv(o.uniforms.tint._location, r.hex2rgb(t.tint)),
                      n.uniform1f(o.uniforms.alpha._location, t.worldAlpha),
                      n.bindBuffer(n.ARRAY_BUFFER, e.buffer),
                      n.vertexAttribPointer(o.attributes.aVertexPosition, 2, n.FLOAT, !1, 24, 0),
                      n.vertexAttribPointer(o.attributes.aColor, 4, n.FLOAT, !1, 24, 8),
                      n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, e.indexBuffer),
                      n.drawElements(n.TRIANGLE_STRIP, e.indices.length, n.UNSIGNED_SHORT, 0));
              }),
              (i.prototype.updateGraphics = function (t) {
                var e = this.renderer.gl,
                  i = t._webGL[e.id];
                i || (i = t._webGL[e.id] = { lastIndex: 0, data: [], gl: e }), (t.dirty = !1);
                var r;
                if (t.clearDirty) {
                  for (t.clearDirty = !1, r = 0; r < i.data.length; r++) {
                    var n = i.data[r];
                    n.reset(), this.graphicsDataPool.push(n);
                  }
                  (i.data = []), (i.lastIndex = 0);
                }
                var s;
                for (r = i.lastIndex; r < t.graphicsData.length; r++) {
                  var a = t.graphicsData[r];
                  if (a.type === o.SHAPES.POLY) {
                    if (
                      ((a.points = a.shape.points.slice()),
                      a.shape.closed &&
                        (a.points[0] !== a.points[a.points.length - 2] ||
                          a.points[1] !== a.points[a.points.length - 1]) &&
                        a.points.push(a.points[0], a.points[1]),
                      a.fill && a.points.length >= 6)
                    )
                      if (a.points.length < 12) {
                        s = this.switchMode(i, 0);
                        var h = this.buildPoly(a, s);
                        h || ((s = this.switchMode(i, 1)), this.buildComplexPoly(a, s));
                      } else (s = this.switchMode(i, 1)), this.buildComplexPoly(a, s);
                    a.lineWidth > 0 && ((s = this.switchMode(i, 0)), this.buildLine(a, s));
                  } else
                    (s = this.switchMode(i, 0)),
                      a.type === o.SHAPES.RECT
                        ? this.buildRectangle(a, s)
                        : a.type === o.SHAPES.CIRC || a.type === o.SHAPES.ELIP
                          ? this.buildCircle(a, s)
                          : a.type === o.SHAPES.RREC && this.buildRoundedRectangle(a, s);
                  i.lastIndex++;
                }
                for (r = 0; r < i.data.length; r++) (s = i.data[r]), s.dirty && s.upload();
              }),
              (i.prototype.switchMode = function (t, e) {
                var i;
                return (
                  t.data.length
                    ? ((i = t.data[t.data.length - 1]),
                      (i.points.length > 32e4 || i.mode !== e || 1 === e) &&
                        ((i = this.graphicsDataPool.pop() || new h(t.gl)), (i.mode = e), t.data.push(i)))
                    : ((i = this.graphicsDataPool.pop() || new h(t.gl)), (i.mode = e), t.data.push(i)),
                  (i.dirty = !0),
                  i
                );
              }),
              (i.prototype.buildRectangle = function (t, e) {
                var i = t.shape,
                  n = i.x,
                  o = i.y,
                  s = i.width,
                  a = i.height;
                if (t.fill) {
                  var h = r.hex2rgb(t.fillColor),
                    l = t.fillAlpha,
                    u = h[0] * l,
                    c = h[1] * l,
                    d = h[2] * l,
                    p = e.points,
                    f = e.indices,
                    m = p.length / 6;
                  p.push(n, o),
                    p.push(u, c, d, l),
                    p.push(n + s, o),
                    p.push(u, c, d, l),
                    p.push(n, o + a),
                    p.push(u, c, d, l),
                    p.push(n + s, o + a),
                    p.push(u, c, d, l),
                    f.push(m, m, m + 1, m + 2, m + 3, m + 3);
                }
                if (t.lineWidth) {
                  var v = t.points;
                  (t.points = [n, o, n + s, o, n + s, o + a, n, o + a, n, o]), this.buildLine(t, e), (t.points = v);
                }
              }),
              (i.prototype.buildRoundedRectangle = function (t, e) {
                var i = t.shape,
                  n = i.x,
                  o = i.y,
                  s = i.width,
                  a = i.height,
                  h = i.radius,
                  l = [];
                if (
                  (l.push(n, o + h),
                  (l = l.concat(this.quadraticBezierCurve(n, o + a - h, n, o + a, n + h, o + a))),
                  (l = l.concat(this.quadraticBezierCurve(n + s - h, o + a, n + s, o + a, n + s, o + a - h))),
                  (l = l.concat(this.quadraticBezierCurve(n + s, o + h, n + s, o, n + s - h, o))),
                  (l = l.concat(this.quadraticBezierCurve(n + h, o, n, o, n, o + h))),
                  t.fill)
                ) {
                  var u = r.hex2rgb(t.fillColor),
                    c = t.fillAlpha,
                    d = u[0] * c,
                    p = u[1] * c,
                    f = u[2] * c,
                    m = e.points,
                    v = e.indices,
                    g = m.length / 6,
                    y = r.PolyK.Triangulate(l),
                    x = 0;
                  for (x = 0; x < y.length; x += 3)
                    v.push(y[x] + g),
                      v.push(y[x] + g),
                      v.push(y[x + 1] + g),
                      v.push(y[x + 2] + g),
                      v.push(y[x + 2] + g);
                  for (x = 0; x < l.length; x++) m.push(l[x], l[++x], d, p, f, c);
                }
                if (t.lineWidth) {
                  var _ = t.points;
                  (t.points = l), this.buildLine(t, e), (t.points = _);
                }
              }),
              (i.prototype.quadraticBezierCurve = function (t, e, i, r, n, o) {
                function s(t, e, i) {
                  var r = e - t;
                  return t + r * i;
                }
                for (var a, h, l, u, c, d, p = 20, f = [], m = 0, v = 0; p >= v; v++)
                  (m = v / p),
                    (a = s(t, i, m)),
                    (h = s(e, r, m)),
                    (l = s(i, n, m)),
                    (u = s(r, o, m)),
                    (c = s(a, l, m)),
                    (d = s(h, u, m)),
                    f.push(c, d);
                return f;
              }),
              (i.prototype.buildCircle = function (t, e) {
                var i,
                  n,
                  s = t.shape,
                  a = s.x,
                  h = s.y;
                t.type === o.SHAPES.CIRC ? ((i = s.radius), (n = s.radius)) : ((i = s.width), (n = s.height));
                var l = 40,
                  u = (2 * Math.PI) / l,
                  c = 0;
                if (t.fill) {
                  var d = r.hex2rgb(t.fillColor),
                    p = t.fillAlpha,
                    f = d[0] * p,
                    m = d[1] * p,
                    v = d[2] * p,
                    g = e.points,
                    y = e.indices,
                    x = g.length / 6;
                  for (y.push(x), c = 0; l + 1 > c; c++)
                    g.push(a, h, f, m, v, p),
                      g.push(a + Math.sin(u * c) * i, h + Math.cos(u * c) * n, f, m, v, p),
                      y.push(x++, x++);
                  y.push(x - 1);
                }
                if (t.lineWidth) {
                  var _ = t.points;
                  for (t.points = [], c = 0; l + 1 > c; c++)
                    t.points.push(a + Math.sin(u * c) * i, h + Math.cos(u * c) * n);
                  this.buildLine(t, e), (t.points = _);
                }
              }),
              (i.prototype.buildLine = function (t, e) {
                var i = 0,
                  o = t.points;
                if (0 !== o.length) {
                  if (t.lineWidth % 2) for (i = 0; i < o.length; i++) o[i] += 0.5;
                  var s = new n.Point(o[0], o[1]),
                    a = new n.Point(o[o.length - 2], o[o.length - 1]);
                  if (s.x === a.x && s.y === a.y) {
                    (o = o.slice()), o.pop(), o.pop(), (a = new n.Point(o[o.length - 2], o[o.length - 1]));
                    var h = a.x + 0.5 * (s.x - a.x),
                      l = a.y + 0.5 * (s.y - a.y);
                    o.unshift(h, l), o.push(h, l);
                  }
                  var u,
                    c,
                    d,
                    p,
                    f,
                    m,
                    v,
                    g,
                    y,
                    x,
                    _,
                    b,
                    w,
                    T,
                    S,
                    E,
                    A,
                    C,
                    M,
                    R,
                    P,
                    O,
                    D,
                    F = e.points,
                    L = e.indices,
                    k = o.length / 2,
                    I = o.length,
                    B = F.length / 6,
                    N = t.lineWidth / 2,
                    U = r.hex2rgb(t.lineColor),
                    X = t.lineAlpha,
                    j = U[0] * X,
                    z = U[1] * X,
                    Y = U[2] * X;
                  for (
                    d = o[0],
                      p = o[1],
                      f = o[2],
                      m = o[3],
                      y = -(p - m),
                      x = d - f,
                      D = Math.sqrt(y * y + x * x),
                      y /= D,
                      x /= D,
                      y *= N,
                      x *= N,
                      F.push(d - y, p - x, j, z, Y, X),
                      F.push(d + y, p + x, j, z, Y, X),
                      i = 1;
                    k - 1 > i;
                    i++
                  )
                    (d = o[2 * (i - 1)]),
                      (p = o[2 * (i - 1) + 1]),
                      (f = o[2 * i]),
                      (m = o[2 * i + 1]),
                      (v = o[2 * (i + 1)]),
                      (g = o[2 * (i + 1) + 1]),
                      (y = -(p - m)),
                      (x = d - f),
                      (D = Math.sqrt(y * y + x * x)),
                      (y /= D),
                      (x /= D),
                      (y *= N),
                      (x *= N),
                      (_ = -(m - g)),
                      (b = f - v),
                      (D = Math.sqrt(_ * _ + b * b)),
                      (_ /= D),
                      (b /= D),
                      (_ *= N),
                      (b *= N),
                      (S = -x + p - (-x + m)),
                      (E = -y + f - (-y + d)),
                      (A = (-y + d) * (-x + m) - (-y + f) * (-x + p)),
                      (C = -b + g - (-b + m)),
                      (M = -_ + f - (-_ + v)),
                      (R = (-_ + v) * (-b + m) - (-_ + f) * (-b + g)),
                      (P = S * M - C * E),
                      Math.abs(P) < 0.1
                        ? ((P += 10.1), F.push(f - y, m - x, j, z, Y, X), F.push(f + y, m + x, j, z, Y, X))
                        : ((u = (E * R - M * A) / P),
                          (c = (C * A - S * R) / P),
                          (O = (u - f) * (u - f) + (c - m) + (c - m)),
                          O > 19600
                            ? ((w = y - _),
                              (T = x - b),
                              (D = Math.sqrt(w * w + T * T)),
                              (w /= D),
                              (T /= D),
                              (w *= N),
                              (T *= N),
                              F.push(f - w, m - T),
                              F.push(j, z, Y, X),
                              F.push(f + w, m + T),
                              F.push(j, z, Y, X),
                              F.push(f - w, m - T),
                              F.push(j, z, Y, X),
                              I++)
                            : (F.push(u, c), F.push(j, z, Y, X), F.push(f - (u - f), m - (c - m)), F.push(j, z, Y, X)));
                  for (
                    d = o[2 * (k - 2)],
                      p = o[2 * (k - 2) + 1],
                      f = o[2 * (k - 1)],
                      m = o[2 * (k - 1) + 1],
                      y = -(p - m),
                      x = d - f,
                      D = Math.sqrt(y * y + x * x),
                      y /= D,
                      x /= D,
                      y *= N,
                      x *= N,
                      F.push(f - y, m - x),
                      F.push(j, z, Y, X),
                      F.push(f + y, m + x),
                      F.push(j, z, Y, X),
                      L.push(B),
                      i = 0;
                    I > i;
                    i++
                  )
                    L.push(B++);
                  L.push(B - 1);
                }
              }),
              (i.prototype.buildComplexPoly = function (t, e) {
                var i = t.points.slice();
                if (!(i.length < 6)) {
                  var n = e.indices;
                  (e.points = i), (e.alpha = t.fillAlpha), (e.color = r.hex2rgb(t.fillColor));
                  for (var o, s, a = 1 / 0, h = -1 / 0, l = 1 / 0, u = -1 / 0, c = 0; c < i.length; c += 2)
                    (o = i[c]),
                      (s = i[c + 1]),
                      (a = a > o ? o : a),
                      (h = o > h ? o : h),
                      (l = l > s ? s : l),
                      (u = s > u ? s : u);
                  i.push(a, l, h, l, h, u, a, u);
                  var d = i.length / 2;
                  for (c = 0; d > c; c++) n.push(c);
                }
              }),
              (i.prototype.buildPoly = function (t, e) {
                var i = t.points;
                if (!(i.length < 6)) {
                  var n = e.points,
                    o = e.indices,
                    s = i.length / 2,
                    a = r.hex2rgb(t.fillColor),
                    h = t.fillAlpha,
                    l = a[0] * h,
                    u = a[1] * h,
                    c = a[2] * h,
                    d = r.PolyK.Triangulate(i);
                  if (!d) return !1;
                  var p = n.length / 6,
                    f = 0;
                  for (f = 0; f < d.length; f += 3)
                    o.push(d[f] + p),
                      o.push(d[f] + p),
                      o.push(d[f + 1] + p),
                      o.push(d[f + 2] + p),
                      o.push(d[f + 2] + p);
                  for (f = 0; s > f; f++) n.push(i[2 * f], i[2 * f + 1], l, u, c, h);
                  return !0;
                }
              });
          },
          {
            '../../const': 13,
            '../../math': 23,
            '../../renderers/webgl/WebGLRenderer': 39,
            '../../renderers/webgl/utils/ObjectRenderer': 53,
            '../../utils': 68,
            './WebGLGraphicsData': 19,
          },
        ],
        19: [
          function (t, e) {
            function i(t) {
              (this.gl = t),
                (this.color = [0, 0, 0]),
                (this.points = []),
                (this.indices = []),
                (this.buffer = t.createBuffer()),
                (this.indexBuffer = t.createBuffer()),
                (this.mode = 1),
                (this.alpha = 1),
                (this.dirty = !0);
            }
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.reset = function () {
                (this.points = []), (this.indices = []);
              }),
              (i.prototype.upload = function () {
                var t = this.gl;
                (this.glPoints = new Float32Array(this.points)),
                  t.bindBuffer(t.ARRAY_BUFFER, this.buffer),
                  t.bufferData(t.ARRAY_BUFFER, this.glPoints, t.STATIC_DRAW),
                  (this.glIndicies = new Uint16Array(this.indices)),
                  t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
                  t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.glIndicies, t.STATIC_DRAW),
                  (this.dirty = !1);
              });
          },
          {},
        ],
        20: [
          function (t, e) {
            function i() {
              try {
                if (!window.WebGLRenderingContext) return !1;
                var t = document.createElement('canvas'),
                  e = t.getContext('webgl', s) || t.getContext('experimental-webgl', s);
                return !(!e || !e.getContextAttributes().stencil);
              } catch (i) {
                return !1;
              }
            }
            var r = (e.exports = {
                utils: t('./utils'),
                math: t('./math'),
                CONST: t('./const'),
                DisplayObject: t('./display/DisplayObject'),
                Container: t('./display/Container'),
                Stage: t('./display/Container'),
                DisplayObjectContainer: t('./display/Container'),
                Sprite: t('./sprites/Sprite'),
                ParticleContainer: t('./particles/ParticleContainer'),
                SpriteRenderer: t('./sprites/webgl/SpriteRenderer'),
                ParticleRenderer: t('./particles/webgl/ParticleRenderer'),
                Graphics: t('./graphics/Graphics'),
                GraphicsData: t('./graphics/GraphicsData'),
                GraphicsRenderer: t('./graphics/webgl/GraphicsRenderer'),
                Texture: t('./textures/Texture'),
                BaseTexture: t('./textures/BaseTexture'),
                RenderTexture: t('./textures/RenderTexture'),
                VideoBaseTexture: t('./textures/VideoBaseTexture'),
                CanvasRenderer: t('./renderers/canvas/CanvasRenderer'),
                CanvasGraphics: t('./renderers/canvas/utils/CanvasGraphics'),
                CanvasBuffer: t('./renderers/canvas/utils/CanvasBuffer'),
                WebGLRenderer: t('./renderers/webgl/WebGLRenderer'),
                ShaderManager: t('./renderers/webgl/managers/ShaderManager'),
                Shader: t('./renderers/webgl/shaders/Shader'),
                AbstractFilter: t('./renderers/webgl/filters/AbstractFilter'),
                autoDetectRenderer: function (t, e, n, o) {
                  return (
                    (t = t || 800),
                    (e = e || 600),
                    !o && i() ? new r.WebGLRenderer(t, e, n) : new r.CanvasRenderer(t, e, n)
                  );
                },
              }),
              n = t('./const');
            for (var o in n) r[o] = n[o];
            var s = { stencil: !0 };
          },
          {
            './const': 13,
            './display/Container': 14,
            './display/DisplayObject': 15,
            './graphics/Graphics': 16,
            './graphics/GraphicsData': 17,
            './graphics/webgl/GraphicsRenderer': 18,
            './math': 23,
            './particles/ParticleContainer': 29,
            './particles/webgl/ParticleRenderer': 31,
            './renderers/canvas/CanvasRenderer': 34,
            './renderers/canvas/utils/CanvasBuffer': 35,
            './renderers/canvas/utils/CanvasGraphics': 36,
            './renderers/webgl/WebGLRenderer': 39,
            './renderers/webgl/filters/AbstractFilter': 40,
            './renderers/webgl/managers/ShaderManager': 46,
            './renderers/webgl/shaders/Shader': 51,
            './sprites/Sprite': 57,
            './sprites/webgl/SpriteRenderer': 58,
            './textures/BaseTexture': 59,
            './textures/RenderTexture': 60,
            './textures/Texture': 61,
            './textures/VideoBaseTexture': 63,
            './utils': 68,
          },
        ],
        21: [
          function (t, e) {
            function i() {
              (this.a = 1), (this.b = 0), (this.c = 0), (this.d = 1), (this.tx = 0), (this.ty = 0);
            }
            var r = t('./Point');
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.fromArray = function (t) {
                (this.a = t[0]), (this.b = t[1]), (this.c = t[3]), (this.d = t[4]), (this.tx = t[2]), (this.ty = t[5]);
              }),
              (i.prototype.toArray = function (t) {
                this.array || (this.array = new Float32Array(9));
                var e = this.array;
                return (
                  t
                    ? ((e[0] = this.a),
                      (e[1] = this.b),
                      (e[2] = 0),
                      (e[3] = this.c),
                      (e[4] = this.d),
                      (e[5] = 0),
                      (e[6] = this.tx),
                      (e[7] = this.ty),
                      (e[8] = 1))
                    : ((e[0] = this.a),
                      (e[1] = this.c),
                      (e[2] = this.tx),
                      (e[3] = this.b),
                      (e[4] = this.d),
                      (e[5] = this.ty),
                      (e[6] = 0),
                      (e[7] = 0),
                      (e[8] = 1)),
                  e
                );
              }),
              (i.prototype.apply = function (t, e) {
                e = e || new r();
                var i = t.x,
                  n = t.y;
                return (e.x = this.a * i + this.c * n + this.tx), (e.y = this.b * i + this.d * n + this.ty), e;
              }),
              (i.prototype.applyInverse = function (t, e) {
                e = e || new r();
                var i = 1 / (this.a * this.d + this.c * -this.b),
                  n = t.x,
                  o = t.y;
                return (
                  (e.x = this.d * i * n + -this.c * i * o + (this.ty * this.c - this.tx * this.d) * i),
                  (e.y = this.a * i * o + -this.b * i * n + (-this.ty * this.a + this.tx * this.b) * i),
                  e
                );
              }),
              (i.prototype.translate = function (t, e) {
                return (this.tx += t), (this.ty += e), this;
              }),
              (i.prototype.scale = function (t, e) {
                return (this.a *= t), (this.d *= e), (this.c *= t), (this.b *= e), (this.tx *= t), (this.ty *= e), this;
              }),
              (i.prototype.rotate = function (t) {
                var e = Math.cos(t),
                  i = Math.sin(t),
                  r = this.a,
                  n = this.c,
                  o = this.tx;
                return (
                  (this.a = r * e - this.b * i),
                  (this.b = r * i + this.b * e),
                  (this.c = n * e - this.d * i),
                  (this.d = n * i + this.d * e),
                  (this.tx = o * e - this.ty * i),
                  (this.ty = o * i + this.ty * e),
                  this
                );
              }),
              (i.prototype.append = function (t) {
                var e = this.a,
                  i = this.b,
                  r = this.c,
                  n = this.d;
                return (
                  (this.a = t.a * e + t.b * r),
                  (this.b = t.a * i + t.b * n),
                  (this.c = t.c * e + t.d * r),
                  (this.d = t.c * i + t.d * n),
                  (this.tx = t.tx * e + t.ty * r + this.tx),
                  (this.ty = t.tx * i + t.ty * n + this.ty),
                  this
                );
              }),
              (i.prototype.prepend = function (t) {
                var e = this.tx;
                if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
                  var i = this.a,
                    r = this.c;
                  (this.a = i * t.a + this.b * t.c),
                    (this.b = i * t.b + this.b * t.d),
                    (this.c = r * t.a + this.d * t.c),
                    (this.d = r * t.b + this.d * t.d);
                }
                return (this.tx = e * t.a + this.ty * t.c + t.tx), (this.ty = e * t.b + this.ty * t.d + t.ty), this;
              }),
              (i.prototype.invert = function () {
                var t = this.a,
                  e = this.b,
                  i = this.c,
                  r = this.d,
                  n = this.tx,
                  o = t * r - e * i;
                return (
                  (this.a = r / o),
                  (this.b = -e / o),
                  (this.c = -i / o),
                  (this.d = t / o),
                  (this.tx = (i * this.ty - r * n) / o),
                  (this.ty = -(t * this.ty - e * n) / o),
                  this
                );
              }),
              (i.prototype.identity = function () {
                return (this.a = 1), (this.b = 0), (this.c = 0), (this.d = 1), (this.tx = 0), (this.ty = 0), this;
              }),
              (i.prototype.clone = function () {
                var t = new i();
                return (
                  (t.a = this.a), (t.b = this.b), (t.c = this.c), (t.d = this.d), (t.tx = this.tx), (t.ty = this.ty), t
                );
              }),
              (i.prototype.copy = function (t) {
                return (
                  (t.a = this.a), (t.b = this.b), (t.c = this.c), (t.d = this.d), (t.tx = this.tx), (t.ty = this.ty), t
                );
              }),
              (i.IDENTITY = new i()),
              (i.TEMP_MATRIX = new i());
          },
          { './Point': 22 },
        ],
        22: [
          function (t, e) {
            function i(t, e) {
              (this.x = t || 0), (this.y = e || 0);
            }
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.clone = function () {
                return new i(this.x, this.y);
              }),
              (i.prototype.set = function (t, e) {
                (this.x = t || 0), (this.y = e || (0 !== e ? this.x : 0));
              });
          },
          {},
        ],
        23: [
          function (t, e) {
            e.exports = {
              PI_2: 2 * Math.PI,
              RAD_TO_DEG: 180 / Math.PI,
              DEG_TO_RAD: Math.PI / 180,
              Point: t('./Point'),
              Matrix: t('./Matrix'),
              Circle: t('./shapes/Circle'),
              Ellipse: t('./shapes/Ellipse'),
              Polygon: t('./shapes/Polygon'),
              Rectangle: t('./shapes/Rectangle'),
              RoundedRectangle: t('./shapes/RoundedRectangle'),
            };
          },
          {
            './Matrix': 21,
            './Point': 22,
            './shapes/Circle': 24,
            './shapes/Ellipse': 25,
            './shapes/Polygon': 26,
            './shapes/Rectangle': 27,
            './shapes/RoundedRectangle': 28,
          },
        ],
        24: [
          function (t, e) {
            function i(t, e, i) {
              (this.x = t || 0), (this.y = e || 0), (this.radius = i || 0), (this.type = n.SHAPES.CIRC);
            }
            var r = t('./Rectangle'),
              n = t('../../const');
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.clone = function () {
                return new i(this.x, this.y, this.radius);
              }),
              (i.prototype.contains = function (t, e) {
                if (this.radius <= 0) return !1;
                var i = this.x - t,
                  r = this.y - e,
                  n = this.radius * this.radius;
                return (i *= i), (r *= r), n >= i + r;
              }),
              (i.prototype.getBounds = function () {
                return new r(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
              });
          },
          { '../../const': 13, './Rectangle': 27 },
        ],
        25: [
          function (t, e) {
            function i(t, e, i, r) {
              (this.x = t || 0),
                (this.y = e || 0),
                (this.width = i || 0),
                (this.height = r || 0),
                (this.type = n.SHAPES.ELIP);
            }
            var r = t('./Rectangle'),
              n = t('../../const');
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.clone = function () {
                return new i(this.x, this.y, this.width, this.height);
              }),
              (i.prototype.contains = function (t, e) {
                if (this.width <= 0 || this.height <= 0) return !1;
                var i = (t - this.x) / this.width,
                  r = (e - this.y) / this.height;
                return (i *= i), (r *= r), 1 >= i + r;
              }),
              (i.prototype.getBounds = function () {
                return new r(this.x - this.width, this.y - this.height, this.width, this.height);
              });
          },
          { '../../const': 13, './Rectangle': 27 },
        ],
        26: [
          function (t, e) {
            function i(t) {
              if ((t instanceof Array || (t = Array.prototype.slice.call(arguments)), t[0] instanceof r)) {
                for (var e = [], i = 0, o = t.length; o > i; i++) e.push(t[i].x, t[i].y);
                t = e;
              }
              (this.closed = !0), (this.points = t), (this.type = n.SHAPES.POLY);
            }
            var r = t('../Point'),
              n = t('../../const');
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.clone = function () {
                return new i(this.points.slice());
              }),
              (i.prototype.contains = function (t, e) {
                for (var i = !1, r = this.points.length / 2, n = 0, o = r - 1; r > n; o = n++) {
                  var s = this.points[2 * n],
                    a = this.points[2 * n + 1],
                    h = this.points[2 * o],
                    l = this.points[2 * o + 1],
                    u = a > e != l > e && ((h - s) * (e - a)) / (l - a) + s > t;
                  u && (i = !i);
                }
                return i;
              });
          },
          { '../../const': 13, '../Point': 22 },
        ],
        27: [
          function (t, e) {
            function i(t, e, i, n) {
              (this.x = t || 0),
                (this.y = e || 0),
                (this.width = i || 0),
                (this.height = n || 0),
                (this.type = r.SHAPES.RECT);
            }
            var r = t('../../const');
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.EMPTY = new i(0, 0, 0, 0)),
              (i.prototype.clone = function () {
                return new i(this.x, this.y, this.width, this.height);
              }),
              (i.prototype.contains = function (t, e) {
                return this.width <= 0 || this.height <= 0
                  ? !1
                  : t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height
                    ? !0
                    : !1;
              });
          },
          { '../../const': 13 },
        ],
        28: [
          function (t, e) {
            function i(t, e, i, n, o) {
              (this.x = t || 0),
                (this.y = e || 0),
                (this.width = i || 0),
                (this.height = n || 0),
                (this.radius = o || 20),
                (this.type = r.SHAPES.RREC);
            }
            var r = t('../../const');
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.clone = function () {
                return new i(this.x, this.y, this.width, this.height, this.radius);
              }),
              (i.prototype.contains = function (t, e) {
                return this.width <= 0 || this.height <= 0
                  ? !1
                  : t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height
                    ? !0
                    : !1;
              });
          },
          { '../../const': 13 },
        ],
        29: [
          function (t, e) {
            function i(t, e) {
              r.call(this),
                (this._properties = e || [!1, !0, !1, !1, !1]),
                (this._size = t || 15e3),
                (this._buffers = null),
                (this._updateStatic = !1),
                (this.interactiveChildren = !1);
            }
            var r = t('../display/Container');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.updateTransform = function () {
                this.displayObjectUpdateTransform();
              }),
              (i.prototype.renderWebGL = function (t) {
                this.visible &&
                  !(this.worldAlpha <= 0) &&
                  this.children.length &&
                  this.renderable &&
                  (t.setObjectRenderer(t.plugins.particle), t.plugins.particle.render(this));
              }),
              (i.prototype.addChildAt = function (t, e) {
                if (t === this) return t;
                if (e >= 0 && e <= this.children.length)
                  return (
                    t.parent && t.parent.removeChild(t),
                    (t.parent = this),
                    this.children.splice(e, 0, t),
                    (this._updateStatic = !0),
                    t
                  );
                throw new Error(
                  t + 'addChildAt: The index ' + e + ' supplied is out of bounds ' + this.children.length,
                );
              }),
              (i.prototype.removeChildAt = function (t) {
                var e = this.getChildAt(t);
                return (e.parent = null), this.children.splice(t, 1), (this._updateStatic = !0), e;
              }),
              (i.prototype.renderCanvas = function (t) {
                if (this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable) {
                  var e = t.context,
                    i = this.worldTransform,
                    r = !0;
                  (e.globalAlpha = this.worldAlpha), this.displayObjectUpdateTransform();
                  for (var n = 0; n < this.children.length; ++n) {
                    var o = this.children[n];
                    if (o.visible) {
                      var s = o.texture.frame;
                      if (((e.globalAlpha = this.worldAlpha * o.alpha), o.rotation % (2 * Math.PI) === 0))
                        r && (e.setTransform(i.a, i.b, i.c, i.d, i.tx, i.ty), (r = !1)),
                          e.drawImage(
                            o.texture.baseTexture.source,
                            s.x,
                            s.y,
                            s.width,
                            s.height,
                            (o.anchor.x * -s.width * o.scale.x + o.position.x + 0.5) | 0,
                            (o.anchor.y * -s.height * o.scale.y + o.position.y + 0.5) | 0,
                            s.width * o.scale.x,
                            s.height * o.scale.y,
                          );
                      else {
                        r || (r = !0), o.displayObjectUpdateTransform();
                        var a = o.worldTransform;
                        t.roundPixels
                          ? e.setTransform(a.a, a.b, a.c, a.d, 0 | a.tx, 0 | a.ty)
                          : e.setTransform(a.a, a.b, a.c, a.d, a.tx, a.ty),
                          e.drawImage(
                            o.texture.baseTexture.source,
                            s.x,
                            s.y,
                            s.width,
                            s.height,
                            (o.anchor.x * -s.width + 0.5) | 0,
                            (o.anchor.y * -s.height + 0.5) | 0,
                            s.width,
                            s.height,
                          );
                      }
                    }
                  }
                }
              });
          },
          { '../display/Container': 14 },
        ],
        30: [
          function (t, e) {
            function i(t, e, i) {
              (this.gl = t),
                (this.vertSize = 2),
                (this.vertByteSize = 4 * this.vertSize),
                (this.size = i),
                (this.dynamicProperties = []),
                (this.staticProperties = []);
              for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.dynamic ? this.dynamicProperties.push(n) : this.staticProperties.push(n);
              }
              (this.staticStride = 0),
                (this.staticBuffer = null),
                (this.staticData = null),
                (this.dynamicStride = 0),
                (this.dynamicBuffer = null),
                (this.dynamicData = null),
                this.initBuffers();
            }
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.initBuffers = function () {
                var t,
                  e,
                  i = this.gl,
                  r = 0;
                for (this.dynamicStride = 0, t = 0; t < this.dynamicProperties.length; t++)
                  (e = this.dynamicProperties[t]), (e.offset = r), (r += e.size), (this.dynamicStride += e.size);
                (this.dynamicData = new Float32Array(this.size * this.dynamicStride * 4)),
                  (this.dynamicBuffer = i.createBuffer()),
                  i.bindBuffer(i.ARRAY_BUFFER, this.dynamicBuffer),
                  i.bufferData(i.ARRAY_BUFFER, this.dynamicData, i.DYNAMIC_DRAW);
                var n = 0;
                for (this.staticStride = 0, t = 0; t < this.staticProperties.length; t++)
                  (e = this.staticProperties[t]), (e.offset = n), (n += e.size), (this.staticStride += e.size);
                (this.staticData = new Float32Array(this.size * this.staticStride * 4)),
                  (this.staticBuffer = i.createBuffer()),
                  i.bindBuffer(i.ARRAY_BUFFER, this.staticBuffer),
                  i.bufferData(i.ARRAY_BUFFER, this.staticData, i.DYNAMIC_DRAW);
              }),
              (i.prototype.uploadDynamic = function (t, e, i) {
                for (var r = this.gl, n = 0; n < this.dynamicProperties.length; n++) {
                  var o = this.dynamicProperties[n];
                  o.uploadFunction(t, e, i, this.dynamicData, this.dynamicStride, o.offset);
                }
                r.bindBuffer(r.ARRAY_BUFFER, this.dynamicBuffer), r.bufferSubData(r.ARRAY_BUFFER, 0, this.dynamicData);
              }),
              (i.prototype.uploadStatic = function (t, e, i) {
                for (var r = this.gl, n = 0; n < this.staticProperties.length; n++) {
                  var o = this.staticProperties[n];
                  o.uploadFunction(t, e, i, this.staticData, this.staticStride, o.offset);
                }
                r.bindBuffer(r.ARRAY_BUFFER, this.staticBuffer), r.bufferSubData(r.ARRAY_BUFFER, 0, this.staticData);
              }),
              (i.prototype.bind = function () {
                var t,
                  e,
                  i = this.gl;
                for (i.bindBuffer(i.ARRAY_BUFFER, this.dynamicBuffer), t = 0; t < this.dynamicProperties.length; t++)
                  (e = this.dynamicProperties[t]),
                    i.vertexAttribPointer(e.attribute, e.size, i.FLOAT, !1, 4 * this.dynamicStride, 4 * e.offset);
                for (i.bindBuffer(i.ARRAY_BUFFER, this.staticBuffer), t = 0; t < this.staticProperties.length; t++)
                  (e = this.staticProperties[t]),
                    i.vertexAttribPointer(e.attribute, e.size, i.FLOAT, !1, 4 * this.staticStride, 4 * e.offset);
              }),
              (i.prototype.destroy = function () {});
          },
          {},
        ],
        31: [
          function (t, e) {
            function i(t) {
              r.call(this, t), (this.size = 15e3);
              var e = 6 * this.size;
              this.indices = new Uint16Array(e);
              for (var i = 0, n = 0; e > i; i += 6, n += 4)
                (this.indices[i + 0] = n + 0),
                  (this.indices[i + 1] = n + 1),
                  (this.indices[i + 2] = n + 2),
                  (this.indices[i + 3] = n + 0),
                  (this.indices[i + 4] = n + 2),
                  (this.indices[i + 5] = n + 3);
              (this.shader = null), (this.tempMatrix = new a.Matrix());
            }
            var r = t('../../renderers/webgl/utils/ObjectRenderer'),
              n = t('../../renderers/webgl/WebGLRenderer'),
              o = t('./ParticleShader'),
              s = t('./ParticleBuffer'),
              a = t('../../math');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              n.registerPlugin('particle', i),
              (i.prototype.onContextChange = function () {
                var t = this.renderer.gl;
                (this.shader = new o(this.renderer.shaderManager)),
                  (this.indexBuffer = t.createBuffer()),
                  t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
                  t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.indices, t.STATIC_DRAW),
                  (this.properties = [
                    {
                      attribute: this.shader.attributes.aVertexPosition,
                      dynamic: !1,
                      size: 2,
                      uploadFunction: this.uploadVerticies,
                      offset: 0,
                    },
                    {
                      attribute: this.shader.attributes.aPositionCoord,
                      dynamic: !0,
                      size: 2,
                      uploadFunction: this.uploadPosition,
                      offset: 0,
                    },
                    {
                      attribute: this.shader.attributes.aRotation,
                      dynamic: !1,
                      size: 1,
                      uploadFunction: this.uploadRotation,
                      offset: 0,
                    },
                    {
                      attribute: this.shader.attributes.aTextureCoord,
                      dynamic: !1,
                      size: 2,
                      uploadFunction: this.uploadUvs,
                      offset: 0,
                    },
                    {
                      attribute: this.shader.attributes.aColor,
                      dynamic: !1,
                      size: 1,
                      uploadFunction: this.uploadAlpha,
                      offset: 0,
                    },
                  ]);
              }),
              (i.prototype.start = function () {
                var t = this.renderer.gl;
                t.activeTexture(t.TEXTURE0), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                var e = this.shader;
                this.renderer.shaderManager.setShader(e);
              }),
              (i.prototype.render = function (t) {
                var e = t.children,
                  i = e.length,
                  r = t._size;
                if (0 !== i) {
                  i > r && (i = r), t._buffers || (t._buffers = this.generateBuffers(t));
                  var n = this.renderer.gl,
                    o = t.worldTransform.copy(this.tempMatrix);
                  o.prepend(this.renderer.currentRenderTarget.projectionMatrix),
                    n.uniformMatrix3fv(this.shader.uniforms.projectionMatrix._location, !1, o.toArray(!0));
                  var s = t._updateStatic,
                    a = e[0]._texture.baseTexture;
                  a._glTextures[n.id]
                    ? n.bindTexture(n.TEXTURE_2D, a._glTextures[n.id])
                    : (this.renderer.updateTexture(a),
                      (this.properties[0].dynamic && this.properties[3].dynamic) || (s = !0));
                  for (var h = 0, l = 0; i > l; l += this.size) {
                    var u = i - l;
                    u > this.size && (u = this.size);
                    var c = t._buffers[h++];
                    c.uploadDynamic(e, l, u),
                      s && c.uploadStatic(e, l, u),
                      c.bind(this.shader),
                      n.drawElements(n.TRIANGLES, 6 * u, n.UNSIGNED_SHORT, 0),
                      this.renderer.drawCount++;
                  }
                  t._updateStatic = !1;
                }
              }),
              (i.prototype.generateBuffers = function (t) {
                var e,
                  i = this.renderer.gl,
                  r = [],
                  n = t._size;
                for (e = 0; e < t._properties.length; e++) this.properties[e].dynamic = t._properties[e];
                for (e = 0; n > e; e += this.size) r.push(new s(i, this.properties, this.size, this.shader));
                return r;
              }),
              (i.prototype.uploadVerticies = function (t, e, i, r, n, o) {
                for (var s, a, h, l, u, c, d, p, f, m = 0; i > m; m++)
                  (s = t[e + m]),
                    (a = s._texture),
                    (l = s.scale.x),
                    (u = s.scale.y),
                    a.trim
                      ? ((h = a.trim),
                        (d = h.x - s.anchor.x * h.width),
                        (c = d + a.crop.width),
                        (f = h.y - s.anchor.y * h.height),
                        (p = f + a.crop.height))
                      : ((c = a._frame.width * (1 - s.anchor.x)),
                        (d = a._frame.width * -s.anchor.x),
                        (p = a._frame.height * (1 - s.anchor.y)),
                        (f = a._frame.height * -s.anchor.y)),
                    (r[o] = d * l),
                    (r[o + 1] = f * u),
                    (r[o + n] = c * l),
                    (r[o + n + 1] = f * u),
                    (r[o + 2 * n] = c * l),
                    (r[o + 2 * n + 1] = p * u),
                    (r[o + 3 * n] = d * l),
                    (r[o + 3 * n + 1] = p * u),
                    (o += 4 * n);
              }),
              (i.prototype.uploadPosition = function (t, e, i, r, n, o) {
                for (var s = 0; i > s; s++) {
                  var a = t[e + s].position;
                  (r[o] = a.x),
                    (r[o + 1] = a.y),
                    (r[o + n] = a.x),
                    (r[o + n + 1] = a.y),
                    (r[o + 2 * n] = a.x),
                    (r[o + 2 * n + 1] = a.y),
                    (r[o + 3 * n] = a.x),
                    (r[o + 3 * n + 1] = a.y),
                    (o += 4 * n);
                }
              }),
              (i.prototype.uploadRotation = function (t, e, i, r, n, o) {
                for (var s = 0; i > s; s++) {
                  var a = t[e + s].rotation;
                  (r[o] = a), (r[o + n] = a), (r[o + 2 * n] = a), (r[o + 3 * n] = a), (o += 4 * n);
                }
              }),
              (i.prototype.uploadUvs = function (t, e, i, r, n, o) {
                for (var s = 0; i > s; s++) {
                  var a = t[e + s]._texture._uvs;
                  a
                    ? ((r[o] = a.x0),
                      (r[o + 1] = a.y0),
                      (r[o + n] = a.x1),
                      (r[o + n + 1] = a.y1),
                      (r[o + 2 * n] = a.x2),
                      (r[o + 2 * n + 1] = a.y2),
                      (r[o + 3 * n] = a.x3),
                      (r[o + 3 * n + 1] = a.y3),
                      (o += 4 * n))
                    : ((r[o] = 0),
                      (r[o + 1] = 0),
                      (r[o + n] = 0),
                      (r[o + n + 1] = 0),
                      (r[o + 2 * n] = 0),
                      (r[o + 2 * n + 1] = 0),
                      (r[o + 3 * n] = 0),
                      (r[o + 3 * n + 1] = 0),
                      (o += 4 * n));
                }
              }),
              (i.prototype.uploadAlpha = function (t, e, i, r, n, o) {
                for (var s = 0; i > s; s++) {
                  var a = t[e + s].alpha;
                  (r[o] = a), (r[o + n] = a), (r[o + 2 * n] = a), (r[o + 3 * n] = a), (o += 4 * n);
                }
              }),
              (i.prototype.destroy = function () {
                this.shader.destroy();
              });
          },
          {
            '../../math': 23,
            '../../renderers/webgl/WebGLRenderer': 39,
            '../../renderers/webgl/utils/ObjectRenderer': 53,
            './ParticleBuffer': 30,
            './ParticleShader': 32,
          },
        ],
        32: [
          function (t, e) {
            function i(t) {
              r.call(
                this,
                t,
                [
                  'attribute vec2 aVertexPosition;',
                  'attribute vec2 aTextureCoord;',
                  'attribute float aColor;',
                  'attribute vec2 aPositionCoord;',
                  'attribute vec2 aScale;',
                  'attribute float aRotation;',
                  'uniform mat3 projectionMatrix;',
                  'varying vec2 vTextureCoord;',
                  'varying float vColor;',
                  'void main(void){',
                  '   vec2 v = aVertexPosition;',
                  '   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);',
                  '   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);',
                  '   v = v + aPositionCoord;',
                  '   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);',
                  '   vTextureCoord = aTextureCoord;',
                  '   vColor = aColor;',
                  '}',
                ].join('\n'),
                [
                  'precision lowp float;',
                  'varying vec2 vTextureCoord;',
                  'varying float vColor;',
                  'uniform sampler2D uSampler;',
                  'void main(void){',
                  '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;',
                  '}',
                ].join('\n'),
                null,
                { aPositionCoord: 0, aRotation: 0 },
              );
            }
            var r = t('../../renderers/webgl/shaders/TextureShader');
            (i.prototype = Object.create(r.prototype)), (i.prototype.constructor = i), (e.exports = i);
          },
          { '../../renderers/webgl/shaders/TextureShader': 52 },
        ],
        33: [
          function (t, e) {
            function i(t, e, i, s) {
              if ((r.sayHello(t), s))
                for (var a in o.DEFAULT_RENDER_OPTIONS)
                  'undefined' == typeof s[a] && (s[a] = o.DEFAULT_RENDER_OPTIONS[a]);
              else s = o.DEFAULT_RENDER_OPTIONS;
              (this.type = o.RENDERER_TYPE.UNKNOWN),
                (this.width = e || 800),
                (this.height = i || 600),
                (this.view = s.view || document.createElement('canvas')),
                (this.resolution = s.resolution),
                (this.transparent = s.transparent),
                (this.autoResize = s.autoResize || !1),
                (this.blendModes = null),
                (this.preserveDrawingBuffer = s.preserveDrawingBuffer),
                (this.clearBeforeRender = s.clearBeforeRender),
                (this._backgroundColor = 16777215),
                (this._backgroundColorRgb = [1, 1, 1]),
                (this._backgroundColorString = '#000000'),
                (this.backgroundColor = s.backgroundColor || this._backgroundColor),
                (this._tempDisplayObjectParent = {
                  worldTransform: new n.Matrix(),
                  worldAlpha: 1,
                  children: [],
                }),
                (this._lastObjectRendered = this._tempDisplayObjectParent);
            }
            var r = t('../utils'),
              n = t('../math'),
              o = t('../const');
            (i.prototype.constructor = i),
              (e.exports = i),
              r.eventTarget.mixin(i.prototype),
              Object.defineProperties(i.prototype, {
                backgroundColor: {
                  get: function () {
                    return this._backgroundColor;
                  },
                  set: function (t) {
                    (this._backgroundColor = t),
                      (this._backgroundColorString = r.hex2string(t)),
                      r.hex2rgb(t, this._backgroundColorRgb);
                  },
                },
              }),
              (i.prototype.resize = function (t, e) {
                (this.width = t * this.resolution),
                  (this.height = e * this.resolution),
                  (this.view.width = this.width),
                  (this.view.height = this.height),
                  this.autoResize &&
                    ((this.view.style.width = this.width / this.resolution + 'px'),
                    (this.view.style.height = this.height / this.resolution + 'px'));
              }),
              (i.prototype.destroy = function (t) {
                t && this.view.parent && this.view.parent.removeChild(this.view),
                  (this.type = o.RENDERER_TYPE.UNKNOWN),
                  (this.width = 0),
                  (this.height = 0),
                  (this.view = null),
                  (this.resolution = 0),
                  (this.transparent = !1),
                  (this.autoResize = !1),
                  (this.blendModes = null),
                  (this.preserveDrawingBuffer = !1),
                  (this.clearBeforeRender = !1),
                  (this._backgroundColor = 0),
                  (this._backgroundColorRgb = null),
                  (this._backgroundColorString = null);
              });
          },
          { '../const': 13, '../math': 23, '../utils': 68 },
        ],
        34: [
          function (t, e) {
            function i(t, e, i) {
              r.call(this, 'Canvas', t, e, i),
                (this.type = a.RENDERER_TYPE.CANVAS),
                (this.context = this.view.getContext('2d', { alpha: this.transparent })),
                (this.refresh = !0),
                (this.maskManager = new n()),
                (this.roundPixels = !1),
                (this.currentScaleMode = a.SCALE_MODES.DEFAULT),
                (this.currentBlendMode = a.BLEND_MODES.NORMAL),
                (this.smoothProperty = 'imageSmoothingEnabled'),
                this.context.imageSmoothingEnabled ||
                  (this.context.webkitImageSmoothingEnabled
                    ? (this.smoothProperty = 'webkitImageSmoothingEnabled')
                    : this.context.mozImageSmoothingEnabled
                      ? (this.smoothProperty = 'mozImageSmoothingEnabled')
                      : this.context.oImageSmoothingEnabled
                        ? (this.smoothProperty = 'oImageSmoothingEnabled')
                        : this.context.msImageSmoothingEnabled && (this.smoothProperty = 'msImageSmoothingEnabled')),
                this.initPlugins(),
                this._mapBlendModes(),
                (this._tempDisplayObjectParent = { worldTransform: new s.Matrix(), worldAlpha: 1 }),
                this.resize(t, e);
            }
            var r = t('../SystemRenderer'),
              n = t('./utils/CanvasMaskManager'),
              o = t('../../utils'),
              s = t('../../math'),
              a = t('../../const');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              o.pluginTarget.mixin(i),
              (i.prototype.render = function (t) {
                var e = t.parent;
                (this._lastObjectRendered = t),
                  (t.parent = this._tempDisplayObjectParent),
                  t.updateTransform(),
                  (t.parent = e),
                  this.context.setTransform(1, 0, 0, 1, 0, 0),
                  (this.context.globalAlpha = 1),
                  (this.currentBlendMode = a.BLEND_MODES.NORMAL),
                  (this.context.globalCompositeOperation = this.blendModes[a.BLEND_MODES.NORMAL]),
                  navigator.isCocoonJS &&
                    this.view.screencanvas &&
                    ((this.context.fillStyle = 'black'), this.context.clear()),
                  this.clearBeforeRender &&
                    (this.transparent
                      ? this.context.clearRect(0, 0, this.width, this.height)
                      : ((this.context.fillStyle = this._backgroundColorString),
                        this.context.fillRect(0, 0, this.width, this.height))),
                  this.renderDisplayObject(t, this.context);
              }),
              (i.prototype.destroy = function (t) {
                this.destroyPlugins(),
                  r.prototype.destroy.call(this, t),
                  (this.context = null),
                  (this.refresh = !0),
                  this.maskManager.destroy(),
                  (this.maskManager = null),
                  (this.roundPixels = !1),
                  (this.currentScaleMode = 0),
                  (this.currentBlendMode = 0),
                  (this.smoothProperty = null);
              }),
              (i.prototype.renderDisplayObject = function (t, e) {
                var i = this.context;
                (this.context = e), t.renderCanvas(this), (this.context = i);
              }),
              (i.prototype._mapBlendModes = function () {
                this.blendModes ||
                  ((this.blendModes = {}),
                  o.canUseNewCanvasBlendModes()
                    ? ((this.blendModes[a.BLEND_MODES.NORMAL] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.ADD] = 'lighter'),
                      (this.blendModes[a.BLEND_MODES.MULTIPLY] = 'multiply'),
                      (this.blendModes[a.BLEND_MODES.SCREEN] = 'screen'),
                      (this.blendModes[a.BLEND_MODES.OVERLAY] = 'overlay'),
                      (this.blendModes[a.BLEND_MODES.DARKEN] = 'darken'),
                      (this.blendModes[a.BLEND_MODES.LIGHTEN] = 'lighten'),
                      (this.blendModes[a.BLEND_MODES.COLOR_DODGE] = 'color-dodge'),
                      (this.blendModes[a.BLEND_MODES.COLOR_BURN] = 'color-burn'),
                      (this.blendModes[a.BLEND_MODES.HARD_LIGHT] = 'hard-light'),
                      (this.blendModes[a.BLEND_MODES.SOFT_LIGHT] = 'soft-light'),
                      (this.blendModes[a.BLEND_MODES.DIFFERENCE] = 'difference'),
                      (this.blendModes[a.BLEND_MODES.EXCLUSION] = 'exclusion'),
                      (this.blendModes[a.BLEND_MODES.HUE] = 'hue'),
                      (this.blendModes[a.BLEND_MODES.SATURATION] = 'saturation'),
                      (this.blendModes[a.BLEND_MODES.COLOR] = 'color'),
                      (this.blendModes[a.BLEND_MODES.LUMINOSITY] = 'luminosity'))
                    : ((this.blendModes[a.BLEND_MODES.NORMAL] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.ADD] = 'lighter'),
                      (this.blendModes[a.BLEND_MODES.MULTIPLY] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.SCREEN] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.OVERLAY] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.DARKEN] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.LIGHTEN] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.COLOR_DODGE] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.COLOR_BURN] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.HARD_LIGHT] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.SOFT_LIGHT] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.DIFFERENCE] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.EXCLUSION] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.HUE] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.SATURATION] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.COLOR] = 'source-over'),
                      (this.blendModes[a.BLEND_MODES.LUMINOSITY] = 'source-over')));
              });
          },
          {
            '../../const': 13,
            '../../math': 23,
            '../../utils': 68,
            '../SystemRenderer': 33,
            './utils/CanvasMaskManager': 37,
          },
        ],
        35: [
          function (t, e) {
            function i(t, e) {
              (this.canvas = document.createElement('canvas')),
                (this.context = this.canvas.getContext('2d')),
                (this.canvas.width = t),
                (this.canvas.height = e);
            }
            (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                width: {
                  get: function () {
                    return this.canvas.width;
                  },
                  set: function (t) {
                    this.canvas.width = t;
                  },
                },
                height: {
                  get: function () {
                    return this.canvas.height;
                  },
                  set: function (t) {
                    this.canvas.height = t;
                  },
                },
              }),
              (i.prototype.clear = function () {
                this.context.setTransform(1, 0, 0, 1, 0, 0),
                  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
              }),
              (i.prototype.resize = function (t, e) {
                (this.canvas.width = t), (this.canvas.height = e);
              }),
              (i.prototype.destroy = function () {
                (this.context = null), (this.canvas = null);
              });
          },
          {},
        ],
        36: [
          function (t, e) {
            var i = t('../../../const'),
              r = (e.exports = {});
            (r.renderGraphics = function (t, e) {
              var r = t.worldAlpha;
              t.dirty && (this.updateGraphicsTint(t), (t.dirty = !1));
              for (var n = 0; n < t.graphicsData.length; n++) {
                var o = t.graphicsData[n],
                  s = o.shape,
                  a = o._fillTint,
                  h = o._lineTint;
                if (((e.lineWidth = o.lineWidth), o.type === i.SHAPES.POLY)) {
                  e.beginPath();
                  var l = s.points;
                  e.moveTo(l[0], l[1]);
                  for (var u = 1; u < l.length / 2; u++) e.lineTo(l[2 * u], l[2 * u + 1]);
                  s.closed && e.lineTo(l[0], l[1]),
                    l[0] === l[l.length - 2] && l[1] === l[l.length - 1] && e.closePath(),
                    o.fill &&
                      ((e.globalAlpha = o.fillAlpha * r),
                      (e.fillStyle = '#' + ('00000' + (0 | a).toString(16)).substr(-6)),
                      e.fill()),
                    o.lineWidth &&
                      ((e.globalAlpha = o.lineAlpha * r),
                      (e.strokeStyle = '#' + ('00000' + (0 | h).toString(16)).substr(-6)),
                      e.stroke());
                } else if (o.type === i.SHAPES.RECT)
                  (o.fillColor || 0 === o.fillColor) &&
                    ((e.globalAlpha = o.fillAlpha * r),
                    (e.fillStyle = '#' + ('00000' + (0 | a).toString(16)).substr(-6)),
                    e.fillRect(s.x, s.y, s.width, s.height)),
                    o.lineWidth &&
                      ((e.globalAlpha = o.lineAlpha * r),
                      (e.strokeStyle = '#' + ('00000' + (0 | h).toString(16)).substr(-6)),
                      e.strokeRect(s.x, s.y, s.width, s.height));
                else if (o.type === i.SHAPES.CIRC)
                  e.beginPath(),
                    e.arc(s.x, s.y, s.radius, 0, 2 * Math.PI),
                    e.closePath(),
                    o.fill &&
                      ((e.globalAlpha = o.fillAlpha * r),
                      (e.fillStyle = '#' + ('00000' + (0 | a).toString(16)).substr(-6)),
                      e.fill()),
                    o.lineWidth &&
                      ((e.globalAlpha = o.lineAlpha * r),
                      (e.strokeStyle = '#' + ('00000' + (0 | h).toString(16)).substr(-6)),
                      e.stroke());
                else if (o.type === i.SHAPES.ELIP) {
                  var c = 2 * s.width,
                    d = 2 * s.height,
                    p = s.x - c / 2,
                    f = s.y - d / 2;
                  e.beginPath();
                  var m = 0.5522848,
                    v = (c / 2) * m,
                    g = (d / 2) * m,
                    y = p + c,
                    x = f + d,
                    _ = p + c / 2,
                    b = f + d / 2;
                  e.moveTo(p, b),
                    e.bezierCurveTo(p, b - g, _ - v, f, _, f),
                    e.bezierCurveTo(_ + v, f, y, b - g, y, b),
                    e.bezierCurveTo(y, b + g, _ + v, x, _, x),
                    e.bezierCurveTo(_ - v, x, p, b + g, p, b),
                    e.closePath(),
                    o.fill &&
                      ((e.globalAlpha = o.fillAlpha * r),
                      (e.fillStyle = '#' + ('00000' + (0 | a).toString(16)).substr(-6)),
                      e.fill()),
                    o.lineWidth &&
                      ((e.globalAlpha = o.lineAlpha * r),
                      (e.strokeStyle = '#' + ('00000' + (0 | h).toString(16)).substr(-6)),
                      e.stroke());
                } else if (o.type === i.SHAPES.RREC) {
                  var w = s.x,
                    T = s.y,
                    S = s.width,
                    E = s.height,
                    A = s.radius,
                    C = (Math.min(S, E) / 2) | 0;
                  (A = A > C ? C : A),
                    e.beginPath(),
                    e.moveTo(w, T + A),
                    e.lineTo(w, T + E - A),
                    e.quadraticCurveTo(w, T + E, w + A, T + E),
                    e.lineTo(w + S - A, T + E),
                    e.quadraticCurveTo(w + S, T + E, w + S, T + E - A),
                    e.lineTo(w + S, T + A),
                    e.quadraticCurveTo(w + S, T, w + S - A, T),
                    e.lineTo(w + A, T),
                    e.quadraticCurveTo(w, T, w, T + A),
                    e.closePath(),
                    (o.fillColor || 0 === o.fillColor) &&
                      ((e.globalAlpha = o.fillAlpha * r),
                      (e.fillStyle = '#' + ('00000' + (0 | a).toString(16)).substr(-6)),
                      e.fill()),
                    o.lineWidth &&
                      ((e.globalAlpha = o.lineAlpha * r),
                      (e.strokeStyle = '#' + ('00000' + (0 | h).toString(16)).substr(-6)),
                      e.stroke());
                }
              }
            }),
              (r.renderGraphicsMask = function (t, e) {
                var r = t.graphicsData.length;
                if (0 !== r) {
                  e.beginPath();
                  for (var n = 0; r > n; n++) {
                    var o = t.graphicsData[n],
                      s = o.shape;
                    if (o.type === i.SHAPES.POLY) {
                      var a = s.points;
                      e.moveTo(a[0], a[1]);
                      for (var h = 1; h < a.length / 2; h++) e.lineTo(a[2 * h], a[2 * h + 1]);
                      a[0] === a[a.length - 2] && a[1] === a[a.length - 1] && e.closePath();
                    } else if (o.type === i.SHAPES.RECT) e.rect(s.x, s.y, s.width, s.height), e.closePath();
                    else if (o.type === i.SHAPES.CIRC) e.arc(s.x, s.y, s.radius, 0, 2 * Math.PI), e.closePath();
                    else if (o.type === i.SHAPES.ELIP) {
                      var l = 2 * s.width,
                        u = 2 * s.height,
                        c = s.x - l / 2,
                        d = s.y - u / 2,
                        p = 0.5522848,
                        f = (l / 2) * p,
                        m = (u / 2) * p,
                        v = c + l,
                        g = d + u,
                        y = c + l / 2,
                        x = d + u / 2;
                      e.moveTo(c, x),
                        e.bezierCurveTo(c, x - m, y - f, d, y, d),
                        e.bezierCurveTo(y + f, d, v, x - m, v, x),
                        e.bezierCurveTo(v, x + m, y + f, g, y, g),
                        e.bezierCurveTo(y - f, g, c, x + m, c, x),
                        e.closePath();
                    } else if (o.type === i.SHAPES.RREC) {
                      var _ = s.x,
                        b = s.y,
                        w = s.width,
                        T = s.height,
                        S = s.radius,
                        E = (Math.min(w, T) / 2) | 0;
                      (S = S > E ? E : S),
                        e.moveTo(_, b + S),
                        e.lineTo(_, b + T - S),
                        e.quadraticCurveTo(_, b + T, _ + S, b + T),
                        e.lineTo(_ + w - S, b + T),
                        e.quadraticCurveTo(_ + w, b + T, _ + w, b + T - S),
                        e.lineTo(_ + w, b + S),
                        e.quadraticCurveTo(_ + w, b, _ + w - S, b),
                        e.lineTo(_ + S, b),
                        e.quadraticCurveTo(_, b, _, b + S),
                        e.closePath();
                    }
                  }
                }
              }),
              (r.updateGraphicsTint = function (t) {
                if (16777215 !== t.tint)
                  for (
                    var e = ((t.tint >> 16) & 255) / 255,
                      i = ((t.tint >> 8) & 255) / 255,
                      r = (255 & t.tint) / 255,
                      n = 0;
                    n < t.graphicsData.length;
                    n++
                  ) {
                    var o = t.graphicsData[n],
                      s = 0 | o.fillColor,
                      a = 0 | o.lineColor;
                    (o._fillTint =
                      (((((s >> 16) & 255) / 255) * e * 255) << 16) +
                      (((((s >> 8) & 255) / 255) * i * 255) << 8) +
                      ((255 & s) / 255) * r * 255),
                      (o._lineTint =
                        (((((a >> 16) & 255) / 255) * e * 255) << 16) +
                        (((((a >> 8) & 255) / 255) * i * 255) << 8) +
                        ((255 & a) / 255) * r * 255);
                  }
              });
          },
          { '../../../const': 13 },
        ],
        37: [
          function (t, e) {
            function i() {}
            var r = t('./CanvasGraphics');
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.pushMask = function (t, e) {
                e.context.save();
                var i = t.alpha,
                  n = t.worldTransform,
                  o = e.resolution;
                e.context.setTransform(n.a * o, n.b * o, n.c * o, n.d * o, n.tx * o, n.ty * o),
                  t.texture || (r.renderGraphicsMask(t, e.context), e.context.clip()),
                  (t.worldAlpha = i);
              }),
              (i.prototype.popMask = function (t) {
                t.context.restore();
              });
          },
          { './CanvasGraphics': 36 },
        ],
        38: [
          function (t, e) {
            var i = t('../../../utils'),
              r = (e.exports = {});
            (r.getTintedTexture = function (t, e) {
              var i = t.texture;
              e = r.roundColor(e);
              var n = '#' + ('00000' + (0 | e).toString(16)).substr(-6);
              if (((i.tintCache = i.tintCache || {}), i.tintCache[n])) return i.tintCache[n];
              var o = r.canvas || document.createElement('canvas');
              if ((r.tintMethod(i, e, o), r.convertTintToImage)) {
                var s = new Image();
                (s.src = o.toDataURL()), (i.tintCache[n] = s);
              } else (i.tintCache[n] = o), (r.canvas = null);
              return o;
            }),
              (r.tintWithMultiply = function (t, e, i) {
                var r = i.getContext('2d'),
                  n = t.crop;
                (i.width = n.width),
                  (i.height = n.height),
                  (r.fillStyle = '#' + ('00000' + (0 | e).toString(16)).substr(-6)),
                  r.fillRect(0, 0, n.width, n.height),
                  (r.globalCompositeOperation = 'multiply'),
                  r.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height),
                  (r.globalCompositeOperation = 'destination-atop'),
                  r.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height);
              }),
              (r.tintWithOverlay = function (t, e, i) {
                var r = i.getContext('2d'),
                  n = t.crop;
                (i.width = n.width),
                  (i.height = n.height),
                  (r.globalCompositeOperation = 'copy'),
                  (r.fillStyle = '#' + ('00000' + (0 | e).toString(16)).substr(-6)),
                  r.fillRect(0, 0, n.width, n.height),
                  (r.globalCompositeOperation = 'destination-atop'),
                  r.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height);
              }),
              (r.tintWithPerPixel = function (t, e, r) {
                var n = r.getContext('2d'),
                  o = t.crop;
                (r.width = o.width),
                  (r.height = o.height),
                  (n.globalCompositeOperation = 'copy'),
                  n.drawImage(t.baseTexture.source, o.x, o.y, o.width, o.height, 0, 0, o.width, o.height);
                for (
                  var s = i.hex2rgb(e),
                    a = s[0],
                    h = s[1],
                    l = s[2],
                    u = n.getImageData(0, 0, o.width, o.height),
                    c = u.data,
                    d = 0;
                  d < c.length;
                  d += 4
                )
                  (c[d + 0] *= a), (c[d + 1] *= h), (c[d + 2] *= l);
                n.putImageData(u, 0, 0);
              }),
              (r.roundColor = function (t) {
                var e = r.cacheStepsPerColorChannel,
                  n = i.hex2rgb(t);
                return (
                  (n[0] = Math.min(255, (n[0] / e) * e)),
                  (n[1] = Math.min(255, (n[1] / e) * e)),
                  (n[2] = Math.min(255, (n[2] / e) * e)),
                  i.rgb2hex(n)
                );
              }),
              (r.cacheStepsPerColorChannel = 8),
              (r.convertTintToImage = !1),
              (r.canUseMultiply = i.canUseNewCanvasBlendModes()),
              (r.tintMethod = r.canUseMultiply ? r.tintWithMultiply : r.tintWithPerPixel);
          },
          { '../../../utils': 68 },
        ],
        39: [
          function (t, e) {
            function i(t, e, i) {
              (i = i || {}),
                r.call(this, 'WebGL', t, e, i),
                (this.type = p.RENDERER_TYPE.WEBGL),
                (this.handleContextLost = this.handleContextLost.bind(this)),
                (this.handleContextRestored = this.handleContextRestored.bind(this)),
                (this._updateTextureBound = function (t) {
                  this.updateTexture(t.target);
                }.bind(this)),
                (this._destroyTextureBound = function (t) {
                  this.destroyTexture(t.target);
                }.bind(this)),
                this.view.addEventListener('webglcontextlost', this.handleContextLost, !1),
                this.view.addEventListener('webglcontextrestored', this.handleContextRestored, !1),
                (this._useFXAA = !1),
                (this._FXAAFilter = null),
                (this._contextOptions = {
                  alpha: this.transparent,
                  antialias: i.antialias,
                  premultipliedAlpha: this.transparent && 'notMultiplied' !== this.transparent,
                  stencil: !0,
                  preserveDrawingBuffer: i.preserveDrawingBuffer,
                }),
                (this.drawCount = 0),
                (this.shaderManager = new n(this)),
                (this.maskManager = new o(this)),
                (this.stencilManager = new s(this)),
                (this.filterManager = new a(this)),
                (this.blendModeManager = new h(this)),
                (this.currentRenderTarget = this.renderTarget),
                (this.currentRenderer = new u(this)),
                this.initPlugins(),
                this._initContext(),
                this._mapBlendModes(),
                (this._renderTargetStack = []);
            }
            var r = t('../SystemRenderer'),
              n = t('./managers/ShaderManager'),
              o = t('./managers/MaskManager'),
              s = t('./managers/StencilManager'),
              a = t('./managers/FilterManager'),
              h = t('./managers/BlendModeManager'),
              l = t('./utils/RenderTarget'),
              u = t('./utils/ObjectRenderer'),
              c = t('./filters/FXAAFilter'),
              d = t('../../utils'),
              p = t('../../const');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              d.pluginTarget.mixin(i),
              (i.glContextId = 0),
              (i.prototype._initContext = function () {
                var t =
                  this.view.getContext('webgl', this._contextOptions) ||
                  this.view.getContext('experimental-webgl', this._contextOptions);
                if (((this.gl = t), !t))
                  throw new Error('This browser does not support webGL. Try using the canvas renderer');
                (this.glContextId = i.glContextId++),
                  (t.id = this.glContextId),
                  (t.renderer = this),
                  t.disable(t.DEPTH_TEST),
                  t.disable(t.CULL_FACE),
                  t.enable(t.BLEND),
                  (this.renderTarget = new l(this.gl, this.width, this.height, null, this.resolution, !0)),
                  this.emit('context', t),
                  this.resize(this.width, this.height),
                  (this._useFXAA = this._contextOptions.antialias && !t.getContextAttributes().antialias),
                  this._useFXAA && (this._FXAAFilter = [new c()]);
              }),
              (i.prototype.render = function (t) {
                if (!this.gl.isContextLost()) {
                  (this._lastObjectRendered = t),
                    this._useFXAA &&
                      ((this._FXAAFilter[0].uniforms.resolution.value.x = this.width),
                      (this._FXAAFilter[0].uniforms.resolution.value.y = this.height),
                      (t.filterArea = this.renderTarget.size),
                      (t.filters = this._FXAAFilter));
                  var e = t.parent;
                  (t.parent = this._tempDisplayObjectParent), t.updateTransform(), (t.parent = e);
                  var i = this.gl;
                  i.bindFramebuffer(i.FRAMEBUFFER, null),
                    this.clearBeforeRender &&
                      (this.transparent
                        ? i.clearColor(0, 0, 0, 0)
                        : i.clearColor(
                            this._backgroundColorRgb[0],
                            this._backgroundColorRgb[1],
                            this._backgroundColorRgb[2],
                            1,
                          ),
                      i.clear(i.COLOR_BUFFER_BIT)),
                    this.renderDisplayObject(t, this.renderTarget);
                }
              }),
              (i.prototype.renderDisplayObject = function (t, e) {
                this.setRenderTarget(e),
                  this.filterManager.setFilterStack(e.filterStack),
                  t.renderWebGL(this),
                  this.currentRenderer.flush();
              }),
              (i.prototype.setObjectRenderer = function (t) {
                this.currentRenderer !== t &&
                  (this.currentRenderer.stop(), (this.currentRenderer = t), this.currentRenderer.start());
              }),
              (i.prototype.setRenderTarget = function (t) {
                (this.currentRenderTarget = t),
                  this.currentRenderTarget.activate(),
                  this.stencilManager.setMaskStack(t.stencilMaskStack);
              }),
              (i.prototype.resize = function (t, e) {
                r.prototype.resize.call(this, t, e), this.filterManager.resize(t, e), this.renderTarget.resize(t, e);
              }),
              (i.prototype.updateTexture = function (t) {
                if (((t = t.baseTexture || t), t.hasLoaded)) {
                  var e = this.gl;
                  return (
                    t._glTextures[e.id] ||
                      ((t._glTextures[e.id] = e.createTexture()),
                      t.on('update', this._updateTextureBound),
                      t.on('dispose', this._destroyTextureBound)),
                    e.bindTexture(e.TEXTURE_2D, t._glTextures[e.id]),
                    e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultipliedAlpha),
                    e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t.source),
                    e.texParameteri(
                      e.TEXTURE_2D,
                      e.TEXTURE_MAG_FILTER,
                      t.scaleMode === p.SCALE_MODES.LINEAR ? e.LINEAR : e.NEAREST,
                    ),
                    t.mipmap && t.isPowerOfTwo
                      ? (e.texParameteri(
                          e.TEXTURE_2D,
                          e.TEXTURE_MIN_FILTER,
                          t.scaleMode === p.SCALE_MODES.LINEAR ? e.LINEAR_MIPMAP_LINEAR : e.NEAREST_MIPMAP_NEAREST,
                        ),
                        e.generateMipmap(e.TEXTURE_2D))
                      : e.texParameteri(
                          e.TEXTURE_2D,
                          e.TEXTURE_MIN_FILTER,
                          t.scaleMode === p.SCALE_MODES.LINEAR ? e.LINEAR : e.NEAREST,
                        ),
                    t.isPowerOfTwo
                      ? (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.REPEAT),
                        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.REPEAT))
                      : (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
                        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE)),
                    t._glTextures[e.id]
                  );
                }
              }),
              (i.prototype.destroyTexture = function (t) {
                (t = t.baseTexture || t),
                  t.hasLoaded && t._glTextures[this.gl.id] && this.gl.deleteTexture(t._glTextures[this.gl.id]);
              }),
              (i.prototype.handleContextLost = function (t) {
                t.preventDefault();
              }),
              (i.prototype.handleContextRestored = function () {
                this._initContext();
                for (var t in d.BaseTextureCache) d.BaseTextureCache[t]._glTextures.length = 0;
              }),
              (i.prototype.destroy = function (t) {
                this.destroyPlugins(),
                  this.view.removeEventListener('webglcontextlost', this.handleContextLost),
                  this.view.removeEventListener('webglcontextrestored', this.handleContextRestored),
                  r.prototype.destroy.call(this, t),
                  (this.uuid = 0),
                  this.shaderManager.destroy(),
                  this.maskManager.destroy(),
                  this.stencilManager.destroy(),
                  this.filterManager.destroy(),
                  (this.shaderManager = null),
                  (this.maskManager = null),
                  (this.filterManager = null),
                  (this.blendModeManager = null),
                  (this.handleContextLost = null),
                  (this.handleContextRestored = null),
                  (this._contextOptions = null),
                  (this.drawCount = 0),
                  (this.gl = null);
              }),
              (i.prototype._mapBlendModes = function () {
                var t = this.gl;
                this.blendModes ||
                  ((this.blendModes = {}),
                  (this.blendModes[p.BLEND_MODES.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.ADD] = [t.SRC_ALPHA, t.DST_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.MULTIPLY] = [t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.SCREEN] = [t.SRC_ALPHA, t.ONE]),
                  (this.blendModes[p.BLEND_MODES.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]),
                  (this.blendModes[p.BLEND_MODES.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]));
              });
          },
          {
            '../../const': 13,
            '../../utils': 68,
            '../SystemRenderer': 33,
            './filters/FXAAFilter': 41,
            './managers/BlendModeManager': 43,
            './managers/FilterManager': 44,
            './managers/MaskManager': 45,
            './managers/ShaderManager': 46,
            './managers/StencilManager': 47,
            './utils/ObjectRenderer': 53,
            './utils/RenderTarget': 55,
          },
        ],
        40: [
          function (t, e) {
            function i(t, e, i) {
              (this.passes = [this]),
                (this.shaders = []),
                (this.padding = 0),
                (this.uniforms = i || {}),
                (this.vertexSrc = t),
                (this.fragmentSrc = e);
            }
            var r = t('../shaders/TextureShader');
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.getShader = function (t) {
                var e = t.gl,
                  i = this.shaders[e.id];
                return (
                  i ||
                    ((i = new r(t.shaderManager, this.vertexSrc, this.fragmentSrc, this.uniforms, this.attributes)),
                    (this.shaders[e.id] = i)),
                  i
                );
              }),
              (i.prototype.applyFilter = function (t, e, i, r) {
                var n = this.getShader(t);
                t.filterManager.applyFilter(n, e, i, r);
              }),
              (i.prototype.syncUniform = function (t) {
                for (var e = 0, i = this.shaders.length; i > e; ++e) this.shaders[e].syncUniform(t);
              });
          },
          { '../shaders/TextureShader': 52 },
        ],
        41: [
          function (t, e) {
            function i() {
              r.call(
                this,
                'precision mediump float;\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform vec2 resolution;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n            out vec2 v_rgbNW, out vec2 v_rgbNE,\n            out vec2 v_rgbSW, out vec2 v_rgbSE,\n            out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n   vResolution = resolution;\n\n   //compute the texture coords and send them to varyings\n   texcoords(aTextureCoord * resolution, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n',
                'precision lowp float;\n\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it\'s\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE,\n            vec2 v_rgbSW, vec2 v_rgbSE,\n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform sampler2D uSampler;\n\n\nvoid main(void){\n\n    gl_FragColor = fxaa(uSampler, vTextureCoord * vResolution, vResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n}\n',
                { resolution: { type: 'v2', value: { x: 1, y: 1 } } },
              );
            }
            var r = t('./AbstractFilter');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.applyFilter = function (t, e, i) {
                var r = t.filterManager,
                  n = this.getShader(t);
                r.applyFilter(n, e, i);
              });
          },
          { './AbstractFilter': 40 },
        ],
        42: [
          function (t, e) {
            function i(t) {
              var e = new n.Matrix();
              r.call(
                this,
                [
                  'attribute vec2 aVertexPosition;',
                  'attribute vec2 aTextureCoord;',
                  'attribute vec4 aColor;',
                  'uniform mat3 projectionMatrix;',
                  'uniform mat3 otherMatrix;',
                  'varying vec2 vMaskCoord;',
                  'varying vec2 vTextureCoord;',
                  'varying vec4 vColor;',
                  'void main(void)',
                  '{',
                  '   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
                  '   vTextureCoord = aTextureCoord;',
                  '   vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;',
                  '   vColor = vec4(aColor.rgb * aColor.a, aColor.a);',
                  '}',
                ].join('\n'),
                [
                  'precision lowp float;',
                  'varying vec2 vMaskCoord;',
                  'varying vec2 vTextureCoord;',
                  'varying vec4 vColor;',
                  'uniform sampler2D uSampler;',
                  'uniform sampler2D mask;',
                  'void main(void)',
                  '{',
                  '   vec4 original =  texture2D(uSampler, vTextureCoord);',
                  '   vec4 masky =  texture2D(mask, vMaskCoord);',
                  '   original *= (masky.r * masky.a);',
                  '   gl_FragColor =  original;',
                  '}',
                ].join('\n'),
                {
                  mask: { type: 'sampler2D', value: t.texture },
                  otherMatrix: { type: 'mat3', value: e.toArray(!0) },
                },
              ),
                (this.maskSprite = t),
                (this.maskMatrix = e);
            }
            var r = t('./AbstractFilter'),
              n = t('../../../math');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.applyFilter = function (t, e, i) {
                var r = t.filterManager;
                r.calculateMappedMatrix(e.frame, this.maskSprite, this.maskMatrix),
                  (this.uniforms.otherMatrix.value = this.maskMatrix.toArray(!0));
                var n = this.getShader(t);
                r.applyFilter(n, e, i);
              }),
              Object.defineProperties(i.prototype, {
                map: {
                  get: function () {
                    return this.uniforms.mask.value;
                  },
                  set: function (t) {
                    this.uniforms.mask.value = t;
                  },
                },
                offset: {
                  get: function () {
                    return this.uniforms.offset.value;
                  },
                  set: function (t) {
                    this.uniforms.offset.value = t;
                  },
                },
              });
          },
          { '../../../math': 23, './AbstractFilter': 40 },
        ],
        43: [
          function (t, e) {
            function i(t) {
              r.call(this, t), (this.currentBlendMode = 99999);
            }
            var r = t('./WebGLManager');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.setBlendMode = function (t) {
                if (this.currentBlendMode === t) return !1;
                this.currentBlendMode = t;
                var e = this.renderer.blendModes[this.currentBlendMode];
                return this.renderer.gl.blendFunc(e[0], e[1]), !0;
              });
          },
          { './WebGLManager': 48 },
        ],
        44: [
          function (t, e) {
            function i(t) {
              r.call(this, t),
                (this.filterStack = []),
                this.filterStack.push({ renderTarget: t.currentRenderTarget, filter: [], bounds: null }),
                (this.texturePool = []),
                (this.textureSize = new s.Rectangle(0, 0, t.width, t.height)),
                (this.currentFrame = null);
            }
            var r = t('./WebGLManager'),
              n = t('../utils/RenderTarget'),
              o = t('../utils/Quad'),
              s = t('../../../math');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.onContextChange = function () {
                this.texturePool.length = 0;
                var t = this.renderer.gl;
                this.quad = new o(t);
              }),
              (i.prototype.setFilterStack = function (t) {
                this.filterStack = t;
              }),
              (i.prototype.pushFilter = function (t, e) {
                var i = t.filterArea || t.getBounds();
                (i.x = 0 | i.x),
                  (i.y = 0 | i.y),
                  (i.width = 0 | i.width),
                  (i.height = 0 | i.height),
                  this.capFilterArea(i),
                  (this.currentFrame = i);
                var r = this.getRenderTarget();
                this.renderer.setRenderTarget(r), r.clear(), this.filterStack.push({ renderTarget: r, filter: e });
              }),
              (i.prototype.popFilter = function () {
                var t = this.filterStack.pop(),
                  e = this.filterStack[this.filterStack.length - 1],
                  i = t.renderTarget,
                  r = e.renderTarget,
                  n = this.renderer.gl;
                (this.currentFrame = i.frame),
                  this.quad.map(this.textureSize, i.frame),
                  n.bindBuffer(n.ARRAY_BUFFER, this.quad.vertexBuffer),
                  n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, this.quad.indexBuffer);
                var o = t.filter;
                if (1 === o.length)
                  o[0].uniforms.dimensions &&
                    ((o[0].uniforms.dimensions.value[0] = this.renderer.width),
                    (o[0].uniforms.dimensions.value[1] = this.renderer.height),
                    (o[0].uniforms.dimensions.value[2] = this.quad.vertices[0]),
                    (o[0].uniforms.dimensions.value[3] = this.quad.vertices[5])),
                    o[0].applyFilter(this.renderer, i, r),
                    this.returnRenderTarget(i);
                else {
                  for (var s = i, a = this.getRenderTarget(!0), h = 0; h < o.length - 1; h++) {
                    var l = o[h];
                    l.uniforms.dimensions &&
                      ((l.uniforms.dimensions.value[0] = this.renderer.width),
                      (l.uniforms.dimensions.value[1] = this.renderer.height),
                      (l.uniforms.dimensions.value[2] = this.quad.vertices[0]),
                      (l.uniforms.dimensions.value[3] = this.quad.vertices[5])),
                      l.applyFilter(this.renderer, s, a);
                    var u = s;
                    (s = a), (a = u);
                  }
                  o[o.length - 1].applyFilter(this.renderer, s, r),
                    this.returnRenderTarget(s),
                    this.returnRenderTarget(a);
                }
                return t.filter;
              }),
              (i.prototype.getRenderTarget = function (t) {
                var e =
                  this.texturePool.pop() ||
                  new n(
                    this.renderer.gl,
                    this.textureSize.width,
                    this.textureSize.height,
                    null,
                    this.renderer.resolution,
                  );
                return (e.frame = this.currentFrame), t && e.clear(), e;
              }),
              (i.prototype.returnRenderTarget = function (t) {
                this.texturePool.push(t);
              }),
              (i.prototype.applyFilter = function (t, e, i, r) {
                var n = this.renderer.gl;
                this.renderer.setRenderTarget(i),
                  r && i.clear(),
                  this.renderer.shaderManager.setShader(t),
                  (t.uniforms.projectionMatrix.value = this.renderer.currentRenderTarget.projectionMatrix.toArray(!0)),
                  t.syncUniforms(),
                  n.vertexAttribPointer(t.attributes.aVertexPosition, 2, n.FLOAT, !1, 0, 0),
                  n.vertexAttribPointer(t.attributes.aTextureCoord, 2, n.FLOAT, !1, 0, 32),
                  n.vertexAttribPointer(t.attributes.aColor, 4, n.FLOAT, !1, 0, 64),
                  n.activeTexture(n.TEXTURE0),
                  n.bindTexture(n.TEXTURE_2D, e.texture),
                  n.drawElements(n.TRIANGLES, 6, n.UNSIGNED_SHORT, 0);
              }),
              (i.prototype.calculateMappedMatrix = function (t, e, i) {
                var r = e.worldTransform.copy(s.Matrix.TEMP_MATRIX),
                  n = e._texture.baseTexture,
                  o = i.identity(),
                  a = this.textureSize.height / this.textureSize.width;
                o.translate(t.x / this.textureSize.width, t.y / this.textureSize.height), o.scale(1, a);
                var h = this.textureSize.width / n.width,
                  l = this.textureSize.height / n.height;
                return (
                  (r.tx /= n.width * h),
                  (r.ty /= n.width * h),
                  r.invert(),
                  o.prepend(r),
                  o.scale(1, 1 / a),
                  o.scale(h, l),
                  o.translate(e.anchor.x, e.anchor.y),
                  o
                );
              }),
              (i.prototype.capFilterArea = function (t) {
                t.x < 0 && ((t.width += t.x), (t.x = 0)),
                  t.y < 0 && ((t.height += t.y), (t.y = 0)),
                  t.x + t.width > this.textureSize.width && (t.width = this.textureSize.width - t.x),
                  t.y + t.height > this.textureSize.height && (t.height = this.textureSize.height - t.y);
              }),
              (i.prototype.resize = function (t, e) {
                (this.textureSize.width = t), (this.textureSize.height = e);
                for (var i = 0; i < this.texturePool.length; i++) this.texturePool[i].resize(t, e);
              }),
              (i.prototype.destroy = function () {
                (this.filterStack = null), (this.offsetY = 0);
                for (var t = 0; t < this.texturePool.length; t++) this.texturePool[t].destroy();
                this.texturePool = null;
              });
          },
          { '../../../math': 23, '../utils/Quad': 54, '../utils/RenderTarget': 55, './WebGLManager': 48 },
        ],
        45: [
          function (t, e) {
            function i(t) {
              r.call(this, t),
                (this.stencilStack = []),
                (this.reverse = !0),
                (this.count = 0),
                (this.alphaMaskPool = []);
            }
            var r = t('./WebGLManager'),
              n = t('../filters/SpriteMaskFilter');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.pushMask = function (t, e) {
                e.texture ? this.pushSpriteMask(t, e) : this.pushStencilMask(t, e);
              }),
              (i.prototype.popMask = function (t, e) {
                e.texture ? this.popSpriteMask(t, e) : this.popStencilMask(t, e);
              }),
              (i.prototype.pushSpriteMask = function (t, e) {
                var i = this.alphaMaskPool.pop();
                i || (i = [new n(e)]), this.renderer.filterManager.pushFilter(t, i);
              }),
              (i.prototype.popSpriteMask = function () {
                var t = this.renderer.filterManager.popFilter();
                this.alphaMaskPool.push(t);
              }),
              (i.prototype.pushStencilMask = function (t, e) {
                this.renderer.stencilManager.pushMask(e);
              }),
              (i.prototype.popStencilMask = function (t, e) {
                this.renderer.stencilManager.popMask(e);
              });
          },
          { '../filters/SpriteMaskFilter': 42, './WebGLManager': 48 },
        ],
        46: [
          function (t, e) {
            function i(t) {
              r.call(this, t), (this.maxAttibs = 10), (this.attribState = []), (this.tempAttribState = []);
              for (var e = 0; e < this.maxAttibs; e++) this.attribState[e] = !1;
              (this.stack = []), (this._currentId = -1), (this.currentShader = null), this.initPlugins();
            }
            var r = t('./WebGLManager'),
              n = t('../shaders/TextureShader'),
              o = t('../shaders/ComplexPrimitiveShader'),
              s = t('../shaders/PrimitiveShader'),
              a = t('../../../utils');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              a.pluginTarget.mixin(i),
              (e.exports = i),
              (i.prototype.onContextChange = function () {
                this.initPlugins(),
                  (this.defaultShader = new n(this)),
                  (this.primitiveShader = new s(this)),
                  (this.complexPrimitiveShader = new o(this));
              }),
              (i.prototype.setAttribs = function (t) {
                var e;
                for (e = 0; e < this.tempAttribState.length; e++) this.tempAttribState[e] = !1;
                for (var i in t) this.tempAttribState[t[i]] = !0;
                var r = this.renderer.gl;
                for (e = 0; e < this.attribState.length; e++)
                  this.attribState[e] !== this.tempAttribState[e] &&
                    ((this.attribState[e] = this.tempAttribState[e]),
                    this.attribState[e] ? r.enableVertexAttribArray(e) : r.disableVertexAttribArray(e));
              }),
              (i.prototype.setShader = function (t) {
                return this._currentId === t.uuid
                  ? !1
                  : ((this._currentId = t.uuid),
                    (this.currentShader = t),
                    this.renderer.gl.useProgram(t.program),
                    this.setAttribs(t.attributes),
                    !0);
              }),
              (i.prototype.destroy = function () {
                r.prototype.destroy.call(this),
                  this.destroyPlugins(),
                  (this.attribState = null),
                  (this.tempAttribState = null);
              });
          },
          {
            '../../../utils': 68,
            '../shaders/ComplexPrimitiveShader': 49,
            '../shaders/PrimitiveShader': 50,
            '../shaders/TextureShader': 52,
            './WebGLManager': 48,
          },
        ],
        47: [
          function (t, e) {
            function i(t) {
              r.call(this, t), (this.stencilMaskStack = null);
            }
            var r = t('./WebGLManager'),
              n = t('../../../utils');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.setMaskStack = function (t) {
                this.stencilMaskStack = t;
                var e = this.renderer.gl;
                0 === t.stencilStack.length ? e.disable(e.STENCIL_TEST) : e.enable(e.STENCIL_TEST);
              }),
              (i.prototype.pushStencil = function (t, e) {
                this.renderer.currentRenderTarget.attachStenilBuffer();
                var i = this.renderer.gl,
                  r = this.stencilMaskStack;
                this.bindGraphics(t, e, this.renderer),
                  0 === r.stencilStack.length &&
                    (i.enable(i.STENCIL_TEST), i.clear(i.STENCIL_BUFFER_BIT), (r.reverse = !0), (r.count = 0)),
                  r.stencilStack.push(e);
                var n = r.count;
                i.colorMask(!1, !1, !1, !1),
                  i.stencilFunc(i.ALWAYS, 0, 255),
                  i.stencilOp(i.KEEP, i.KEEP, i.INVERT),
                  1 === e.mode
                    ? (i.drawElements(i.TRIANGLE_FAN, e.indices.length - 4, i.UNSIGNED_SHORT, 0),
                      r.reverse
                        ? (i.stencilFunc(i.EQUAL, 255 - n, 255), i.stencilOp(i.KEEP, i.KEEP, i.DECR))
                        : (i.stencilFunc(i.EQUAL, n, 255), i.stencilOp(i.KEEP, i.KEEP, i.INCR)),
                      i.drawElements(i.TRIANGLE_FAN, 4, i.UNSIGNED_SHORT, 2 * (e.indices.length - 4)),
                      r.reverse ? i.stencilFunc(i.EQUAL, 255 - (n + 1), 255) : i.stencilFunc(i.EQUAL, n + 1, 255),
                      (r.reverse = !r.reverse))
                    : (r.reverse
                        ? (i.stencilFunc(i.EQUAL, n, 255), i.stencilOp(i.KEEP, i.KEEP, i.INCR))
                        : (i.stencilFunc(i.EQUAL, 255 - n, 255), i.stencilOp(i.KEEP, i.KEEP, i.DECR)),
                      i.drawElements(i.TRIANGLE_STRIP, e.indices.length, i.UNSIGNED_SHORT, 0),
                      r.reverse ? i.stencilFunc(i.EQUAL, n + 1, 255) : i.stencilFunc(i.EQUAL, 255 - (n + 1), 255)),
                  i.colorMask(!0, !0, !0, !0),
                  i.stencilOp(i.KEEP, i.KEEP, i.KEEP),
                  r.count++;
              }),
              (i.prototype.bindGraphics = function (t, e) {
                this._currentGraphics = t;
                var i,
                  r = this.renderer.gl;
                1 === e.mode
                  ? ((i = this.renderer.shaderManager.complexPrimitiveShader),
                    this.renderer.shaderManager.setShader(i),
                    r.uniformMatrix3fv(i.uniforms.translationMatrix._location, !1, t.worldTransform.toArray(!0)),
                    r.uniformMatrix3fv(
                      i.uniforms.projectionMatrix._location,
                      !1,
                      this.renderer.currentRenderTarget.projectionMatrix.toArray(!0),
                    ),
                    r.uniform3fv(i.uniforms.tint._location, n.hex2rgb(t.tint)),
                    r.uniform3fv(i.uniforms.color._location, e.color),
                    r.uniform1f(i.uniforms.alpha._location, t.worldAlpha),
                    r.bindBuffer(r.ARRAY_BUFFER, e.buffer),
                    r.vertexAttribPointer(i.attributes.aVertexPosition, 2, r.FLOAT, !1, 8, 0),
                    r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, e.indexBuffer))
                  : ((i = this.renderer.shaderManager.primitiveShader),
                    this.renderer.shaderManager.setShader(i),
                    r.uniformMatrix3fv(i.uniforms.translationMatrix._location, !1, t.worldTransform.toArray(!0)),
                    r.uniformMatrix3fv(
                      i.uniforms.projectionMatrix._location,
                      !1,
                      this.renderer.currentRenderTarget.projectionMatrix.toArray(!0),
                    ),
                    r.uniform3fv(i.uniforms.tint._location, n.hex2rgb(t.tint)),
                    r.uniform1f(i.uniforms.alpha._location, t.worldAlpha),
                    r.bindBuffer(r.ARRAY_BUFFER, e.buffer),
                    r.vertexAttribPointer(i.attributes.aVertexPosition, 2, r.FLOAT, !1, 24, 0),
                    r.vertexAttribPointer(i.attributes.aColor, 4, r.FLOAT, !1, 24, 8),
                    r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, e.indexBuffer));
              }),
              (i.prototype.popStencil = function (t, e) {
                var i = this.renderer.gl,
                  r = this.stencilMaskStack;
                if ((r.stencilStack.pop(), r.count--, 0 === r.stencilStack.length)) i.disable(i.STENCIL_TEST);
                else {
                  var n = r.count;
                  this.bindGraphics(t, e, this.renderer),
                    i.colorMask(!1, !1, !1, !1),
                    1 === e.mode
                      ? ((r.reverse = !r.reverse),
                        r.reverse
                          ? (i.stencilFunc(i.EQUAL, 255 - (n + 1), 255), i.stencilOp(i.KEEP, i.KEEP, i.INCR))
                          : (i.stencilFunc(i.EQUAL, n + 1, 255), i.stencilOp(i.KEEP, i.KEEP, i.DECR)),
                        i.drawElements(i.TRIANGLE_FAN, 4, i.UNSIGNED_SHORT, 2 * (e.indices.length - 4)),
                        i.stencilFunc(i.ALWAYS, 0, 255),
                        i.stencilOp(i.KEEP, i.KEEP, i.INVERT),
                        i.drawElements(i.TRIANGLE_FAN, e.indices.length - 4, i.UNSIGNED_SHORT, 0),
                        r.reverse ? i.stencilFunc(i.EQUAL, n, 255) : i.stencilFunc(i.EQUAL, 255 - n, 255))
                      : (r.reverse
                          ? (i.stencilFunc(i.EQUAL, n + 1, 255), i.stencilOp(i.KEEP, i.KEEP, i.DECR))
                          : (i.stencilFunc(i.EQUAL, 255 - (n + 1), 255), i.stencilOp(i.KEEP, i.KEEP, i.INCR)),
                        i.drawElements(i.TRIANGLE_STRIP, e.indices.length, i.UNSIGNED_SHORT, 0),
                        r.reverse ? i.stencilFunc(i.EQUAL, n, 255) : i.stencilFunc(i.EQUAL, 255 - n, 255)),
                    i.colorMask(!0, !0, !0, !0),
                    i.stencilOp(i.KEEP, i.KEEP, i.KEEP);
                }
              }),
              (i.prototype.destroy = function () {
                r.prototype.destroy.call(this), (this.stencilMaskStack.stencilStack = null);
              }),
              (i.prototype.pushMask = function (t) {
                this.renderer.setObjectRenderer(this.renderer.plugins.graphics),
                  t.dirty && this.renderer.plugins.graphics.updateGraphics(t, this.renderer.gl),
                  t._webGL[this.renderer.gl.id].data.length &&
                    this.pushStencil(t, t._webGL[this.renderer.gl.id].data[0], this.renderer);
              }),
              (i.prototype.popMask = function (t) {
                this.renderer.setObjectRenderer(this.renderer.plugins.graphics),
                  this.popStencil(t, t._webGL[this.renderer.gl.id].data[0], this.renderer);
              });
          },
          { '../../../utils': 68, './WebGLManager': 48 },
        ],
        48: [
          function (t, e) {
            function i(t) {
              this.renderer = t;
              var e = this;
              this.renderer.on(
                'context',
                (this._onContextChangeFn = function () {
                  e.onContextChange();
                }),
              );
            }
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.onContextChange = function () {}),
              (i.prototype.destroy = function () {
                this.renderer.off('context', this._onContextChangeFn), (this.renderer = null);
              });
          },
          {},
        ],
        49: [
          function (t, e) {
            function i(t) {
              r.call(
                this,
                t,
                [
                  'attribute vec2 aVertexPosition;',
                  'uniform mat3 translationMatrix;',
                  'uniform mat3 projectionMatrix;',
                  'uniform vec3 tint;',
                  'uniform float alpha;',
                  'uniform vec3 color;',
                  'varying vec4 vColor;',
                  'void main(void){',
                  '   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
                  '   vColor = vec4(color * alpha * tint, alpha);',
                  '}',
                ].join('\n'),
                [
                  'precision mediump float;',
                  'varying vec4 vColor;',
                  'void main(void){',
                  '   gl_FragColor = vColor;',
                  '}',
                ].join('\n'),
                {
                  tint: { type: '3f', value: [0, 0, 0] },
                  alpha: { type: '1f', value: 0 },
                  color: { type: '3f', value: [0, 0, 0] },
                  translationMatrix: { type: 'mat3', value: new Float32Array(9) },
                  projectionMatrix: { type: 'mat3', value: new Float32Array(9) },
                },
                { aVertexPosition: 0 },
              );
            }
            var r = t('./Shader');
            (i.prototype = Object.create(r.prototype)), (i.prototype.constructor = i), (e.exports = i);
          },
          { './Shader': 51 },
        ],
        50: [
          function (t, e) {
            function i(t) {
              r.call(
                this,
                t,
                [
                  'attribute vec2 aVertexPosition;',
                  'attribute vec4 aColor;',
                  'uniform mat3 translationMatrix;',
                  'uniform mat3 projectionMatrix;',
                  'uniform float alpha;',
                  'uniform float flipY;',
                  'uniform vec3 tint;',
                  'varying vec4 vColor;',
                  'void main(void){',
                  '   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
                  '   vColor = aColor * vec4(tint * alpha, alpha);',
                  '}',
                ].join('\n'),
                [
                  'precision mediump float;',
                  'varying vec4 vColor;',
                  'void main(void){',
                  '   gl_FragColor = vColor;',
                  '}',
                ].join('\n'),
                {
                  tint: { type: '3f', value: [0, 0, 0] },
                  alpha: { type: '1f', value: 0 },
                  translationMatrix: { type: 'mat3', value: new Float32Array(9) },
                  projectionMatrix: { type: 'mat3', value: new Float32Array(9) },
                },
                { aVertexPosition: 0, aColor: 0 },
              );
            }
            var r = t('./Shader');
            (i.prototype = Object.create(r.prototype)), (i.prototype.constructor = i), (e.exports = i);
          },
          { './Shader': 51 },
        ],
        51: [
          function (t, e) {
            function i(t, e, i, n, o) {
              if (!e || !i) throw new Error('Pixi.js Error. Shader requires vertexSrc and fragmentSrc');
              (this.uuid = r.uuid()),
                (this.gl = t.renderer.gl),
                (this.program = null),
                (this.uniforms = n || {}),
                (this.attributes = o || {}),
                (this.textureCount = 1),
                (this.vertexSrc = e),
                (this.fragmentSrc = i),
                this.init();
            }
            var r = t('../../../utils'),
              n = t('../../../const');
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.init = function () {
                this.compile(),
                  this.gl.useProgram(this.program),
                  this.cacheUniformLocations(Object.keys(this.uniforms)),
                  this.cacheAttributeLocations(Object.keys(this.attributes));
              }),
              (i.prototype.cacheUniformLocations = function (t) {
                for (var e = 0; e < t.length; ++e)
                  this.uniforms[t[e]]._location = this.gl.getUniformLocation(this.program, t[e]);
              }),
              (i.prototype.cacheAttributeLocations = function (t) {
                for (var e = 0; e < t.length; ++e)
                  this.attributes[t[e]] = this.gl.getAttribLocation(this.program, t[e]);
              }),
              (i.prototype.compile = function () {
                var t = this.gl,
                  e = this._glCompile(t.VERTEX_SHADER, this.vertexSrc),
                  i = this._glCompile(t.FRAGMENT_SHADER, this.fragmentSrc),
                  r = t.createProgram();
                return (
                  t.attachShader(r, e),
                  t.attachShader(r, i),
                  t.linkProgram(r),
                  t.getProgramParameter(r, t.LINK_STATUS) ||
                    (window.console.error('Pixi.js Error: Could not initialize shader.'),
                    window.console.error('gl.VALIDATE_STATUS', t.getProgramParameter(r, t.VALIDATE_STATUS)),
                    window.console.error('gl.getError()', t.getError()),
                    '' !== t.getProgramInfoLog(r) &&
                      window.console.warn('Pixi.js Warning: gl.getProgramInfoLog()', t.getProgramInfoLog(r)),
                    t.deleteProgram(r),
                    (r = null)),
                  t.deleteShader(e),
                  t.deleteShader(i),
                  (this.program = r)
                );
              }),
              (i.prototype.syncUniform = function (t) {
                var e,
                  i,
                  n = t._location,
                  o = t.value,
                  s = this.gl;
                switch (t.type) {
                  case 'i':
                  case '1i':
                    s.uniform1i(n, o);
                    break;
                  case 'f':
                  case '1f':
                    s.uniform1f(n, o);
                    break;
                  case '2f':
                    s.uniform2f(n, o[0], o[1]);
                    break;
                  case '3f':
                    s.uniform3f(n, o[0], o[1], o[2]);
                    break;
                  case '4f':
                    s.uniform4f(n, o[0], o[1], o[2], o[3]);
                    break;
                  case 'v2':
                    s.uniform2f(n, o.x, o.y);
                    break;
                  case 'v3':
                    s.uniform3f(n, o.x, o.y, o.z);
                    break;
                  case 'v4':
                    s.uniform4f(n, o.x, o.y, o.z, o.w);
                    break;
                  case '1iv':
                    s.uniform1iv(n, o);
                    break;
                  case '2iv':
                    s.uniform2iv(n, o);
                    break;
                  case '3iv':
                    s.uniform3iv(n, o);
                    break;
                  case '4iv':
                    s.uniform4iv(n, o);
                    break;
                  case '1fv':
                    s.uniform1fv(n, o);
                    break;
                  case '2fv':
                    s.uniform2fv(n, o);
                    break;
                  case '3fv':
                    s.uniform3fv(n, o);
                    break;
                  case '4fv':
                    s.uniform4fv(n, o);
                    break;
                  case 'm2':
                  case 'mat2':
                  case 'Matrix2fv':
                    s.uniformMatrix2fv(n, t.transpose, o);
                    break;
                  case 'm3':
                  case 'mat3':
                  case 'Matrix3fv':
                    s.uniformMatrix3fv(n, t.transpose, o);
                    break;
                  case 'm4':
                  case 'mat4':
                  case 'Matrix4fv':
                    s.uniformMatrix4fv(n, t.transpose, o);
                    break;
                  case 'c':
                    'number' == typeof o && (o = r.hex2rgb(o)), s.uniform3f(n, o[0], o[1], o[2]);
                    break;
                  case 'iv1':
                    s.uniform1iv(n, o);
                    break;
                  case 'iv':
                    s.uniform3iv(n, o);
                    break;
                  case 'fv1':
                    s.uniform1fv(n, o);
                    break;
                  case 'fv':
                    s.uniform3fv(n, o);
                    break;
                  case 'v2v':
                    for (t._array || (t._array = new Float32Array(2 * o.length)), e = 0, i = o.length; i > e; ++e)
                      (t._array[2 * e] = o[e].x), (t._array[2 * e + 1] = o[e].y);
                    s.uniform2fv(n, t._array);
                    break;
                  case 'v3v':
                    for (t._array || (t._array = new Float32Array(3 * o.length)), e = 0, i = o.length; i > e; ++e)
                      (t._array[3 * e] = o[e].x), (t._array[3 * e + 1] = o[e].y), (t._array[3 * e + 2] = o[e].z);
                    s.uniform3fv(n, t._array);
                    break;
                  case 'v4v':
                    for (t._array || (t._array = new Float32Array(4 * o.length)), e = 0, i = o.length; i > e; ++e)
                      (t._array[4 * e] = o[e].x),
                        (t._array[4 * e + 1] = o[e].y),
                        (t._array[4 * e + 2] = o[e].z),
                        (t._array[4 * e + 3] = o[e].w);
                    s.uniform4fv(n, t._array);
                    break;
                  case 't':
                  case 'sampler2D':
                    if (!t.value || !t.value.baseTexture.hasLoaded) break;
                    s.activeTexture(s['TEXTURE' + this.textureCount]);
                    var a = t.value.baseTexture._glTextures[s.id];
                    a || this.initSampler2D(t),
                      s.bindTexture(s.TEXTURE_2D, t.value.baseTexture._glTextures[s.id]),
                      s.uniform1i(t._location, this.textureCount),
                      this.textureCount++;
                    break;
                  default:
                    window.console.warn('Pixi.js Shader Warning: Unknown uniform type: ' + t.type);
                }
              }),
              (i.prototype.syncUniforms = function () {
                this.textureCount = 1;
                for (var t in this.uniforms) this.syncUniform(this.uniforms[t]);
              }),
              (i.prototype.initSampler2D = function (t) {
                var e = this.gl,
                  i = t.value.baseTexture;
                if (i.hasLoaded)
                  if (
                    ((i._glTextures[e.id] = e.createTexture()),
                    e.bindTexture(e.TEXTURE_2D, i._glTextures[e.id]),
                    e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.premultipliedAlpha),
                    t.textureData)
                  ) {
                    var r = t.textureData;
                    e.texImage2D(
                      e.TEXTURE_2D,
                      0,
                      r.luminance ? e.LUMINANCE : e.RGBA,
                      e.RGBA,
                      e.UNSIGNED_BYTE,
                      i.source,
                    ),
                      e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, r.magFilter ? r.magFilter : e.LINEAR),
                      e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, r.wrapS ? r.wrapS : e.CLAMP_TO_EDGE),
                      e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, r.wrapS ? r.wrapS : e.CLAMP_TO_EDGE),
                      e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, r.wrapT ? r.wrapT : e.CLAMP_TO_EDGE);
                  } else
                    e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, i.source),
                      e.texParameteri(
                        e.TEXTURE_2D,
                        e.TEXTURE_MAG_FILTER,
                        i.scaleMode === n.SCALE_MODES.LINEAR ? e.LINEAR : e.NEAREST,
                      ),
                      e.texParameteri(
                        e.TEXTURE_2D,
                        e.TEXTURE_MIN_FILTER,
                        i.scaleMode === n.SCALE_MODES.LINEAR ? e.LINEAR : e.NEAREST,
                      ),
                      i.isPowerOfTwo
                        ? (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.REPEAT),
                          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.REPEAT))
                        : (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
                          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE));
              }),
              (i.prototype.destroy = function () {
                this.gl.deleteProgram(this.program),
                  (this.gl = null),
                  (this.uniforms = null),
                  (this.attributes = null),
                  (this.vertexSrc = null),
                  (this.fragmentSrc = null);
              }),
              (i.prototype._glCompile = function (t, e) {
                var i = this.gl.createShader(t);
                return (
                  this.gl.shaderSource(i, e),
                  this.gl.compileShader(i),
                  this.gl.getShaderParameter(i, this.gl.COMPILE_STATUS)
                    ? i
                    : (window.console.log(this.gl.getShaderInfoLog(i)), null)
                );
              });
          },
          { '../../../const': 13, '../../../utils': 68 },
        ],
        52: [
          function (t, e) {
            function i(t, e, i, n, o) {
              var s = {
                uSampler: { type: 'sampler2D', value: 0 },
                projectionMatrix: { type: 'mat3', value: new Float32Array(1, 0, 0, 0, 1, 0, 0, 0, 1) },
              };
              if (n) for (var a in n) s[a] = n[a];
              var h = { aVertexPosition: 0, aTextureCoord: 0, aColor: 0 };
              if (o) for (var l in o) h[l] = o[l];
              (e =
                e ||
                [
                  'precision lowp float;',
                  'attribute vec2 aVertexPosition;',
                  'attribute vec2 aTextureCoord;',
                  'attribute vec4 aColor;',
                  'uniform mat3 projectionMatrix;',
                  'varying vec2 vTextureCoord;',
                  'varying vec4 vColor;',
                  'void main(void){',
                  '   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
                  '   vTextureCoord = aTextureCoord;',
                  '   vColor = vec4(aColor.rgb * aColor.a, aColor.a);',
                  '}',
                ].join('\n')),
                (i =
                  i ||
                  [
                    'precision lowp float;',
                    'varying vec2 vTextureCoord;',
                    'varying vec4 vColor;',
                    'uniform sampler2D uSampler;',
                    'void main(void){',
                    '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;',
                    '}',
                  ].join('\n')),
                r.call(this, t, e, i, s, h);
            }
            var r = t('./Shader');
            (i.prototype = Object.create(r.prototype)), (i.prototype.constructor = i), (e.exports = i);
          },
          { './Shader': 51 },
        ],
        53: [
          function (t, e) {
            function i(t) {
              r.call(this, t);
            }
            var r = t('../managers/WebGLManager');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.start = function () {}),
              (i.prototype.stop = function () {
                this.flush();
              }),
              (i.prototype.flush = function () {}),
              (i.prototype.render = function () {});
          },
          { '../managers/WebGLManager': 48 },
        ],
        54: [
          function (t, e) {
            function i(t) {
              (this.gl = t),
                (this.vertices = new Float32Array([0, 0, 200, 0, 200, 200, 0, 200])),
                (this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])),
                (this.colors = new Float32Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])),
                (this.indices = new Uint16Array([0, 1, 2, 0, 3, 2])),
                (this.vertexBuffer = t.createBuffer()),
                (this.indexBuffer = t.createBuffer()),
                t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
                t.bufferData(t.ARRAY_BUFFER, 128, t.DYNAMIC_DRAW),
                t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
                t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.indices, t.STATIC_DRAW),
                this.upload();
            }
            (i.prototype.constructor = i),
              (i.prototype.map = function (t, e) {
                var i = 0,
                  r = 0;
                (this.uvs[0] = i),
                  (this.uvs[1] = r),
                  (this.uvs[2] = i + e.width / t.width),
                  (this.uvs[3] = r),
                  (this.uvs[4] = i + e.width / t.width),
                  (this.uvs[5] = r + e.height / t.height),
                  (this.uvs[6] = i),
                  (this.uvs[7] = r + e.height / t.height),
                  (i = e.x),
                  (r = e.y),
                  (this.vertices[0] = i),
                  (this.vertices[1] = r),
                  (this.vertices[2] = i + e.width),
                  (this.vertices[3] = r),
                  (this.vertices[4] = i + e.width),
                  (this.vertices[5] = r + e.height),
                  (this.vertices[6] = i),
                  (this.vertices[7] = r + e.height),
                  this.upload();
              }),
              (i.prototype.upload = function () {
                var t = this.gl;
                t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
                  t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertices),
                  t.bufferSubData(t.ARRAY_BUFFER, 32, this.uvs),
                  t.bufferSubData(t.ARRAY_BUFFER, 64, this.colors);
              }),
              (e.exports = i);
          },
          {},
        ],
        55: [
          function (t, e) {
            var i = t('../../../math'),
              r = t('../../../utils'),
              n = t('../../../const'),
              o = t('./StencilMaskStack'),
              s = function (t, e, s, a, h, l) {
                if (
                  ((this.gl = t),
                  (this.frameBuffer = null),
                  (this.texture = null),
                  (this.size = new i.Rectangle(0, 0, 1, 1)),
                  (this.resolution = h || n.RESOLUTION),
                  (this.projectionMatrix = new i.Matrix()),
                  (this.transform = null),
                  (this.frame = null),
                  (this.stencilBuffer = null),
                  (this.stencilMaskStack = new o()),
                  (this.filterStack = [{ renderTarget: this, filter: [], bounds: this.size }]),
                  (this.scaleMode = a || n.SCALE_MODES.DEFAULT),
                  (this.root = l),
                  !this.root)
                ) {
                  (this.frameBuffer = t.createFramebuffer()),
                    (this.texture = t.createTexture()),
                    t.bindTexture(t.TEXTURE_2D, this.texture),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_MAG_FILTER,
                      a === n.SCALE_MODES.LINEAR ? t.LINEAR : t.NEAREST,
                    ),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_MIN_FILTER,
                      a === n.SCALE_MODES.LINEAR ? t.LINEAR : t.NEAREST,
                    );
                  var u = r.isPowerOfTwo(e, s);
                  u
                    ? (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT),
                      t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT))
                    : (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                      t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE)),
                    t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer),
                    t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.texture, 0);
                }
                this.resize(e, s);
              };
            (s.prototype.constructor = s),
              (e.exports = s),
              (s.prototype.clear = function () {
                var t = this.gl;
                t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer),
                  t.clearColor(0, 0, 0, 0),
                  t.clear(t.COLOR_BUFFER_BIT);
              }),
              (s.prototype.attachStenilBuffer = function () {
                if (!this.stencilBuffer && !this.root) {
                  var t = this.gl;
                  (this.stencilBuffer = t.createRenderbuffer()),
                    t.bindRenderbuffer(t.RENDERBUFFER, this.stencilBuffer),
                    t.framebufferRenderbuffer(
                      t.FRAMEBUFFER,
                      t.DEPTH_STENCIL_ATTACHMENT,
                      t.RENDERBUFFER,
                      this.stencilBuffer,
                    ),
                    t.renderbufferStorage(
                      t.RENDERBUFFER,
                      t.DEPTH_STENCIL,
                      this.size.width * this.resolution,
                      this.size.height * this.resolution,
                    );
                }
              }),
              (s.prototype.activate = function () {
                var t = this.gl;
                t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer);
                var e = this.frame || this.size;
                this.calculateProjection(e),
                  this.transform && this.projectionMatrix.append(this.transform),
                  t.viewport(0, 0, e.width * this.resolution, e.height * this.resolution);
              }),
              (s.prototype.calculateProjection = function (t) {
                var e = this.projectionMatrix;
                e.identity(),
                  this.root
                    ? ((e.a = (1 / t.width) * 2),
                      (e.d = (-1 / t.height) * 2),
                      (e.tx = -1 - t.x * e.a),
                      (e.ty = 1 - t.y * e.d))
                    : ((e.a = (1 / t.width) * 2),
                      (e.d = (1 / t.height) * 2),
                      (e.tx = -1 - t.x * e.a),
                      (e.ty = -1 - t.y * e.d));
              }),
              (s.prototype.resize = function (t, e) {
                if (((t = 0 | t), (e = 0 | e), this.size.width !== t || this.size.height !== e)) {
                  if (((this.size.width = t), (this.size.height = e), !this.root)) {
                    var i = this.gl;
                    i.bindTexture(i.TEXTURE_2D, this.texture),
                      i.texImage2D(
                        i.TEXTURE_2D,
                        0,
                        i.RGBA,
                        t * this.resolution,
                        e * this.resolution,
                        0,
                        i.RGBA,
                        i.UNSIGNED_BYTE,
                        null,
                      ),
                      this.stencilBuffer &&
                        (i.bindRenderbuffer(i.RENDERBUFFER, this.stencilBuffer),
                        i.renderbufferStorage(
                          i.RENDERBUFFER,
                          i.DEPTH_STENCIL,
                          t * this.resolution,
                          e * this.resolution,
                        ));
                  }
                  var r = this.frame || this.size;
                  this.calculateProjection(r);
                }
              }),
              (s.prototype.destroy = function () {
                var t = this.gl;
                t.deleteFramebuffer(this.frameBuffer),
                  t.deleteTexture(this.texture),
                  (this.frameBuffer = null),
                  (this.texture = null);
              });
          },
          { '../../../const': 13, '../../../math': 23, '../../../utils': 68, './StencilMaskStack': 56 },
        ],
        56: [
          function (t, e) {
            function i() {
              (this.stencilStack = []), (this.reverse = !0), (this.count = 0);
            }
            (i.prototype.constructor = i), (e.exports = i);
          },
          {},
        ],
        57: [
          function (t, e) {
            function i(t) {
              o.call(this),
                (this.anchor = new r.Point()),
                (this._texture = null),
                (this._width = 0),
                (this._height = 0),
                (this.tint = 16777215),
                (this.blendMode = h.BLEND_MODES.NORMAL),
                (this.shader = null),
                (this.cachedTint = 16777215),
                (this.texture = t || n.EMPTY);
            }
            var r = t('../math'),
              n = t('../textures/Texture'),
              o = t('../display/Container'),
              s = t('../renderers/canvas/utils/CanvasTinter'),
              a = t('../utils'),
              h = t('../const');
            (i.prototype.destroy = function (t, e) {
              o.prototype.destroy.call(this),
                (this.anchor = null),
                t && this._texture.destroy(e),
                (this._texture = null),
                (this.shader = null);
            }),
              (i.prototype = Object.create(o.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                width: {
                  get: function () {
                    return this.scale.x * this.texture._frame.width;
                  },
                  set: function (t) {
                    (this.scale.x = t / this.texture._frame.width), (this._width = t);
                  },
                },
                height: {
                  get: function () {
                    return this.scale.y * this.texture._frame.height;
                  },
                  set: function (t) {
                    (this.scale.y = t / this.texture._frame.height), (this._height = t);
                  },
                },
                texture: {
                  get: function () {
                    return this._texture;
                  },
                  set: function (t) {
                    this._texture !== t &&
                      ((this._texture = t),
                      (this.cachedTint = 16777215),
                      t &&
                        (t.baseTexture.hasLoaded
                          ? this._onTextureUpdate()
                          : t.once('update', this._onTextureUpdate.bind(this))));
                  },
                },
              }),
              (i.prototype._onTextureUpdate = function () {
                this._width && (this.scale.x = this._width / this.texture.frame.width),
                  this._height && (this.scale.y = this._height / this.texture.frame.height);
              }),
              (i.prototype._renderWebGL = function (t) {
                t.setObjectRenderer(t.plugins.sprite), t.plugins.sprite.render(this);
              }),
              (i.prototype.getBounds = function (t) {
                if (!this._currentBounds) {
                  var e,
                    i,
                    r,
                    n,
                    o = this._texture._frame.width,
                    s = this._texture._frame.height,
                    a = o * (1 - this.anchor.x),
                    h = o * -this.anchor.x,
                    l = s * (1 - this.anchor.y),
                    u = s * -this.anchor.y,
                    c = t || this.worldTransform,
                    d = c.a,
                    p = c.b,
                    f = c.c,
                    m = c.d,
                    v = c.tx,
                    g = c.ty;
                  if (0 === p && 0 === f)
                    0 > d && (d *= -1),
                      0 > m && (m *= -1),
                      (e = d * h + v),
                      (i = d * a + v),
                      (r = m * u + g),
                      (n = m * l + g);
                  else {
                    var y = d * h + f * u + v,
                      x = m * u + p * h + g,
                      _ = d * a + f * u + v,
                      b = m * u + p * a + g,
                      w = d * a + f * l + v,
                      T = m * l + p * a + g,
                      S = d * h + f * l + v,
                      E = m * l + p * h + g;
                    (e = y),
                      (e = e > _ ? _ : e),
                      (e = e > w ? w : e),
                      (e = e > S ? S : e),
                      (r = x),
                      (r = r > b ? b : r),
                      (r = r > T ? T : r),
                      (r = r > E ? E : r),
                      (i = y),
                      (i = _ > i ? _ : i),
                      (i = w > i ? w : i),
                      (i = S > i ? S : i),
                      (n = x),
                      (n = b > n ? b : n),
                      (n = T > n ? T : n),
                      (n = E > n ? E : n);
                  }
                  var A = this._bounds;
                  (A.x = e), (A.width = i - e), (A.y = r), (A.height = n - r), (this._currentBounds = A);
                }
                return this._currentBounds;
              }),
              (i.prototype.renderCanvas = function (t) {
                if (
                  !(
                    !this.visible ||
                    this.alpha <= 0 ||
                    this.texture.crop.width <= 0 ||
                    this.texture.crop.height <= 0
                  ) &&
                  this.renderable
                ) {
                  if (
                    (this.blendMode !== t.currentBlendMode &&
                      ((t.currentBlendMode = this.blendMode),
                      (t.context.globalCompositeOperation = t.blendModes[t.currentBlendMode])),
                    this._mask && t.maskManager.pushMask(this._mask, t),
                    this.texture.valid)
                  ) {
                    var e = this.texture.baseTexture.resolution / t.resolution;
                    (t.context.globalAlpha = this.worldAlpha),
                      t.smoothProperty &&
                        t.currentScaleMode !== this.texture.baseTexture.scaleMode &&
                        ((t.currentScaleMode = this.texture.baseTexture.scaleMode),
                        (t.context[t.smoothProperty] = t.currentScaleMode === h.SCALE_MODES.LINEAR));
                    var i = this.texture.trim
                        ? this.texture.trim.x - this.anchor.x * this.texture.trim.width
                        : this.anchor.x * -this.texture._frame.width,
                      r = this.texture.trim
                        ? this.texture.trim.y - this.anchor.y * this.texture.trim.height
                        : this.anchor.y * -this.texture._frame.height;
                    t.roundPixels
                      ? (t.context.setTransform(
                          this.worldTransform.a,
                          this.worldTransform.b,
                          this.worldTransform.c,
                          this.worldTransform.d,
                          (this.worldTransform.tx * t.resolution) | 0,
                          (this.worldTransform.ty * t.resolution) | 0,
                        ),
                        (i = 0 | i),
                        (r = 0 | r))
                      : t.context.setTransform(
                          this.worldTransform.a,
                          this.worldTransform.b,
                          this.worldTransform.c,
                          this.worldTransform.d,
                          this.worldTransform.tx * t.resolution,
                          this.worldTransform.ty * t.resolution,
                        ),
                      16777215 !== this.tint
                        ? (this.cachedTint !== this.tint &&
                            ((this.cachedTint = this.tint), (this.tintedTexture = s.getTintedTexture(this, this.tint))),
                          t.context.drawImage(
                            this.tintedTexture,
                            0,
                            0,
                            this.texture.crop.width,
                            this.texture.crop.height,
                            i / e,
                            r / e,
                            this.texture.crop.width / e,
                            this.texture.crop.height / e,
                          ))
                        : t.context.drawImage(
                            this.texture.baseTexture.source,
                            this.texture.crop.x,
                            this.texture.crop.y,
                            this.texture.crop.width,
                            this.texture.crop.height,
                            i / e,
                            r / e,
                            this.texture.crop.width / e,
                            this.texture.crop.height / e,
                          );
                  }
                  for (var n = 0, o = this.children.length; o > n; n++) this.children[n].renderCanvas(t);
                  this._mask && t.maskManager.popMask(t);
                }
              }),
              (i.fromFrame = function (t) {
                var e = a.TextureCache[t];
                if (!e) throw new Error('The frameId "' + t + '" does not exist in the texture cache' + this);
                return new i(e);
              }),
              (i.fromImage = function (t, e, r) {
                return new i(n.fromImage(t, e, r));
              });
          },
          {
            '../const': 13,
            '../display/Container': 14,
            '../math': 23,
            '../renderers/canvas/utils/CanvasTinter': 38,
            '../textures/Texture': 61,
            '../utils': 68,
          },
        ],
        58: [
          function (t, e) {
            function i(t) {
              r.call(this, t),
                (this.vertSize = 5),
                (this.vertByteSize = 4 * this.vertSize),
                (this.size = s.SPRITE_BATCH_SIZE);
              var e = 4 * this.size * this.vertByteSize,
                i = 6 * this.size;
              (this.vertices = new ArrayBuffer(e)),
                (this.positions = new Float32Array(this.vertices)),
                (this.colors = new Uint32Array(this.vertices)),
                (this.indices = new Uint16Array(i)),
                (this.lastIndexCount = 0);
              for (var n = 0, o = 0; i > n; n += 6, o += 4)
                (this.indices[n + 0] = o + 0),
                  (this.indices[n + 1] = o + 1),
                  (this.indices[n + 2] = o + 2),
                  (this.indices[n + 3] = o + 0),
                  (this.indices[n + 4] = o + 2),
                  (this.indices[n + 5] = o + 3);
              (this.drawing = !1),
                (this.currentBatchSize = 0),
                (this.currentBaseTexture = null),
                (this.textures = []),
                (this.blendModes = []),
                (this.shaders = []),
                (this.sprites = []),
                (this.shader = null);
            }
            var r = t('../../renderers/webgl/utils/ObjectRenderer'),
              n = t('../../renderers/webgl/shaders/Shader'),
              o = t('../../renderers/webgl/WebGLRenderer'),
              s = t('../../const');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              o.registerPlugin('sprite', i),
              (i.prototype.onContextChange = function () {
                var t = this.renderer.gl;
                (this.shader = this.renderer.shaderManager.defaultShader),
                  (this.vertexBuffer = t.createBuffer()),
                  (this.indexBuffer = t.createBuffer()),
                  t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
                  t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.indices, t.STATIC_DRAW),
                  t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
                  t.bufferData(t.ARRAY_BUFFER, this.vertices, t.DYNAMIC_DRAW),
                  (this.currentBlendMode = 99999);
              }),
              (i.prototype.render = function (t) {
                var e = t._texture;
                this.currentBatchSize >= this.size && (this.flush(), (this.currentBaseTexture = e.baseTexture));
                var i = e._uvs;
                if (i) {
                  var r,
                    n,
                    o,
                    s,
                    a = t.anchor.x,
                    h = t.anchor.y;
                  if (e.trim) {
                    var l = e.trim;
                    (n = l.x - a * l.width), (r = n + e.crop.width), (s = l.y - h * l.height), (o = s + e.crop.height);
                  } else
                    (r = e._frame.width * (1 - a)),
                      (n = e._frame.width * -a),
                      (o = e._frame.height * (1 - h)),
                      (s = e._frame.height * -h);
                  var u = this.currentBatchSize * this.vertByteSize,
                    c = t.worldTransform,
                    d = c.a,
                    p = c.b,
                    f = c.c,
                    m = c.d,
                    v = c.tx,
                    g = c.ty,
                    y = this.colors,
                    x = this.positions;
                  this.renderer.roundPixels
                    ? ((x[u] = (d * n + f * s + v) | 0),
                      (x[u + 1] = (m * s + p * n + g) | 0),
                      (x[u + 5] = (d * r + f * s + v) | 0),
                      (x[u + 6] = (m * s + p * r + g) | 0),
                      (x[u + 10] = (d * r + f * o + v) | 0),
                      (x[u + 11] = (m * o + p * r + g) | 0),
                      (x[u + 15] = (d * n + f * o + v) | 0),
                      (x[u + 16] = (m * o + p * n + g) | 0))
                    : ((x[u] = d * n + f * s + v),
                      (x[u + 1] = m * s + p * n + g),
                      (x[u + 5] = d * r + f * s + v),
                      (x[u + 6] = m * s + p * r + g),
                      (x[u + 10] = d * r + f * o + v),
                      (x[u + 11] = m * o + p * r + g),
                      (x[u + 15] = d * n + f * o + v),
                      (x[u + 16] = m * o + p * n + g)),
                    (x[u + 2] = i.x0),
                    (x[u + 3] = i.y0),
                    (x[u + 7] = i.x1),
                    (x[u + 8] = i.y1),
                    (x[u + 12] = i.x2),
                    (x[u + 13] = i.y2),
                    (x[u + 17] = i.x3),
                    (x[u + 18] = i.y3);
                  var _ = t.tint;
                  (y[u + 4] =
                    y[u + 9] =
                    y[u + 14] =
                    y[u + 19] =
                      (_ >> 16) + (65280 & _) + ((255 & _) << 16) + ((255 * t.worldAlpha) << 24)),
                    (this.sprites[this.currentBatchSize++] = t);
                }
              }),
              (i.prototype.flush = function () {
                if (0 !== this.currentBatchSize) {
                  var t,
                    e = this.renderer.gl;
                  if (this.currentBatchSize > 0.5 * this.size) e.bufferSubData(e.ARRAY_BUFFER, 0, this.vertices);
                  else {
                    var i = this.positions.subarray(0, this.currentBatchSize * this.vertByteSize);
                    e.bufferSubData(e.ARRAY_BUFFER, 0, i);
                  }
                  for (
                    var r,
                      o,
                      s,
                      a,
                      h = 0,
                      l = 0,
                      u = null,
                      c = this.renderer.blendModeManager.currentBlendMode,
                      d = null,
                      p = !1,
                      f = !1,
                      m = 0,
                      v = this.currentBatchSize;
                    v > m;
                    m++
                  )
                    (a = this.sprites[m]),
                      (r = a._texture.baseTexture),
                      (o = a.blendMode),
                      (s = a.shader || this.shader),
                      (p = c !== o),
                      (f = d !== s),
                      (u !== r || p || f) &&
                        (this.renderBatch(u, h, l),
                        (l = m),
                        (h = 0),
                        (u = r),
                        p && ((c = o), this.renderer.blendModeManager.setBlendMode(c)),
                        f &&
                          ((d = s),
                          (t = d.shaders ? d.shaders[e.id] : d),
                          t ||
                            ((t = new n(this.renderer.shaderManager, null, d.fragmentSrc, d.uniforms)),
                            (d.shaders[e.id] = t)),
                          this.renderer.shaderManager.setShader(t),
                          e.uniformMatrix3fv(
                            t.uniforms.projectionMatrix._location,
                            !1,
                            this.renderer.currentRenderTarget.projectionMatrix.toArray(!0),
                          ))),
                      h++;
                  this.renderBatch(u, h, l), (this.currentBatchSize = 0);
                }
              }),
              (i.prototype.renderBatch = function (t, e, i) {
                if (0 !== e) {
                  var r = this.renderer.gl;
                  t._glTextures[r.id]
                    ? r.bindTexture(r.TEXTURE_2D, t._glTextures[r.id])
                    : this.renderer.updateTexture(t),
                    r.drawElements(r.TRIANGLES, 6 * e, r.UNSIGNED_SHORT, 6 * i * 2),
                    this.renderer.drawCount++;
                }
              }),
              (i.prototype.start = function () {
                var t = this.renderer.gl;
                t.activeTexture(t.TEXTURE0),
                  t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer),
                  t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                var e = this.vertByteSize;
                t.vertexAttribPointer(this.shader.attributes.aVertexPosition, 2, t.FLOAT, !1, e, 0),
                  t.vertexAttribPointer(this.shader.attributes.aTextureCoord, 2, t.FLOAT, !1, e, 8),
                  t.vertexAttribPointer(this.shader.attributes.aColor, 4, t.UNSIGNED_BYTE, !0, e, 16);
              }),
              (i.prototype.destroy = function () {
                this.renderer.gl.deleteBuffer(this.vertexBuffer),
                  this.renderer.gl.deleteBuffer(this.indexBuffer),
                  this.shader.destroy(),
                  (this.renderer = null),
                  (this.vertices = null),
                  (this.positions = null),
                  (this.colors = null),
                  (this.indices = null),
                  (this.vertexBuffer = null),
                  (this.indexBuffer = null),
                  (this.currentBaseTexture = null),
                  (this.drawing = !1),
                  (this.textures = null),
                  (this.blendModes = null),
                  (this.shaders = null),
                  (this.sprites = null),
                  (this.shader = null);
              });
          },
          {
            '../../const': 13,
            '../../renderers/webgl/WebGLRenderer': 39,
            '../../renderers/webgl/shaders/Shader': 51,
            '../../renderers/webgl/utils/ObjectRenderer': 53,
          },
        ],
        59: [
          function (t, e) {
            function i(t, e, i) {
              (this.uuid = r.uuid()),
                (this.resolution = i || 1),
                (this.width = 100),
                (this.height = 100),
                (this.realWidth = 100),
                (this.realHeight = 100),
                (this.scaleMode = e || n.SCALE_MODES.DEFAULT),
                (this.hasLoaded = !1),
                (this.isLoading = !1),
                (this.source = null),
                (this.premultipliedAlpha = !0),
                (this.imageUrl = null),
                (this.isPowerOfTwo = !1),
                (this.mipmap = !1),
                (this._glTextures = []),
                t && this.loadSource(t);
            }
            var r = t('../utils'),
              n = t('../const');
            (i.prototype.constructor = i),
              (e.exports = i),
              r.eventTarget.mixin(i.prototype),
              (i.prototype.update = function () {
                this.emit('update', this);
              }),
              (i.prototype.loadSource = function (t) {
                var e = this.isLoading;
                if (
                  ((this.hasLoaded = !1),
                  (this.isLoading = !1),
                  e && this.source && ((this.source.onload = null), (this.source.onerror = null)),
                  (this.source = t),
                  (this.source.complete || this.source.getContext) && this.source.width && this.source.height)
                )
                  this._sourceLoaded();
                else if (!t.getContext) {
                  this.isLoading = !0;
                  var i = this;
                  (t.onload = function () {
                    (t.onload = null),
                      (t.onerror = null),
                      i.isLoading && ((i.isLoading = !1), i._sourceLoaded(), i.emit('loaded', i));
                  }),
                    (t.onerror = function () {
                      (t.onload = null), (t.onerror = null), i.isLoading && ((i.isLoading = !1), i.emit('error', i));
                    }),
                    t.complete &&
                      t.src &&
                      ((this.isLoading = !1),
                      (t.onload = null),
                      (t.onerror = null),
                      t.width && t.height
                        ? (this._sourceLoaded(), e && this.emit('loaded', this))
                        : e && this.emit('error', this));
                }
              }),
              (i.prototype._sourceLoaded = function () {
                (this.hasLoaded = !0),
                  (this.realWidth = this.source.naturalWidth || this.source.width),
                  (this.realHeight = this.source.naturalHeight || this.source.height),
                  (this.width = this.realWidth / this.resolution),
                  (this.height = this.realHeight / this.resolution),
                  (this.isPowerOfTwo = r.isPowerOfTwo(this.width, this.height)),
                  this.update();
              }),
              (i.prototype.destroy = function () {
                this.imageUrl
                  ? (delete r.BaseTextureCache[this.imageUrl],
                    delete r.TextureCache[this.imageUrl],
                    (this.imageUrl = null),
                    navigator.isCocoonJS || (this.source.src = ''))
                  : this.source && this.source._pixiId && delete r.BaseTextureCache[this.source._pixiId],
                  (this.source = null),
                  this.dispose();
              }),
              (i.prototype.dispose = function () {
                this.emit('dispose', this);
              }),
              (i.prototype.updateSourceImage = function (t) {
                (this.source.src = t), this.loadSource(this.source);
              }),
              (i.fromImage = function (t, e, n) {
                var o = r.BaseTextureCache[t];
                if ((void 0 === e && 0 !== t.indexOf('data:') && (e = !0), !o)) {
                  var s = new Image();
                  e && (s.crossOrigin = ''),
                    (o = new i(s, n)),
                    (o.imageUrl = t),
                    (s.src = t),
                    (r.BaseTextureCache[t] = o),
                    (this.resolution = r.getResolutionOfUrl(t));
                }
                return o;
              }),
              (i.fromCanvas = function (t, e) {
                t._pixiId || (t._pixiId = 'canvas_' + r.uuid());
                var n = r.BaseTextureCache[t._pixiId];
                return n || ((n = new i(t, e)), (r.BaseTextureCache[t._pixiId] = n)), n;
              });
          },
          { '../const': 13, '../utils': 68 },
        ],
        60: [
          function (t, e) {
            function i(t, e, i, l, u) {
              if (!t) throw new Error('Unable to create RenderTexture, you must pass a renderer into the constructor.');
              (e = e || 100), (i = i || 100), (u = u || h.RESOLUTION);
              var c = new r();
              if (
                ((c.width = e),
                (c.height = i),
                (c.resolution = u),
                (c.scaleMode = l || h.SCALE_MODES.DEFAULT),
                (c.hasLoaded = !0),
                n.call(this, c, new a.Rectangle(0, 0, e, i)),
                (this.width = e),
                (this.height = i),
                (this.resolution = u),
                (this.render = null),
                (this.renderer = t),
                this.renderer.type === h.RENDERER_TYPE.WEBGL)
              ) {
                var d = this.renderer.gl;
                (this.textureBuffer = new o(d, this.width, this.height, null, this.resolution)),
                  (this.baseTexture._glTextures[d.id] = this.textureBuffer.texture),
                  (this.render = this.renderWebGL);
              } else
                (this.render = this.renderCanvas),
                  (this.textureBuffer = new s(this.width * this.resolution, this.height * this.resolution)),
                  (this.baseTexture.source = this.textureBuffer.canvas);
              (this.valid = !0), this._updateUvs();
            }
            var r = t('./BaseTexture'),
              n = t('./Texture'),
              o = t('../renderers/webgl/utils/RenderTarget'),
              s = t('../renderers/canvas/utils/CanvasBuffer'),
              a = t('../math'),
              h = t('../const'),
              l = new a.Matrix();
            (i.prototype = Object.create(n.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.resize = function (t, e, i) {
                (t !== this.width || e !== this.height) &&
                  ((this.valid = t > 0 && e > 0),
                  (this.width = this._frame.width = this.crop.width = t),
                  (this.height = this._frame.height = this.crop.height = e),
                  i && ((this.baseTexture.width = this.width), (this.baseTexture.height = this.height)),
                  this.renderer.type === h.RENDERER_TYPE.WEBGL &&
                    ((this.projection.x = this.width / 2), (this.projection.y = -this.height / 2)),
                  this.valid && this.textureBuffer.resize(this.width * this.resolution, this.height * this.resolution));
              }),
              (i.prototype.clear = function () {
                this.valid &&
                  (this.renderer.type === h.RENDERER_TYPE.WEBGL &&
                    this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer),
                  this.textureBuffer.clear());
              }),
              (i.prototype.renderWebGL = function (t, e, i, r) {
                if (this.valid) {
                  if (((r = !!r), (this.textureBuffer.transform = e), (t.worldAlpha = t.alpha), r)) {
                    t.worldTransform.identity();
                    var n,
                      o,
                      s = t.children;
                    for (n = 0, o = s.length; o > n; ++n) s[n].updateTransform();
                  }
                  i && this.textureBuffer.clear(), this.renderer.renderDisplayObject(t, this.textureBuffer);
                }
              }),
              (i.prototype.renderCanvas = function (t, e, i, r) {
                if (this.valid) {
                  r = !!r;
                  var n = t.worldTransform,
                    o = l;
                  o.identity(), e && o.append(e), (t.worldTransform = o), (t.worldAlpha = 1);
                  var s,
                    a,
                    h = t.children;
                  for (s = 0, a = h.length; a > s; ++s) h[s].updateTransform();
                  i && this.textureBuffer.clear(), (t.worldTransform = n);
                  var u = this.textureBuffer.context,
                    c = this.renderer.resolution;
                  (this.renderer.resolution = this.resolution),
                    this.renderer.renderDisplayObject(t, u),
                    (this.renderer.resolution = c);
                }
              }),
              (i.prototype.destroy = function () {
                n.prototype.destroy.call(this, !0), this.textureBuffer.destroy(), (this.renderer = null);
              }),
              (i.prototype.getImage = function () {
                var t = new Image();
                return (t.src = this.getBase64()), t;
              }),
              (i.prototype.getBase64 = function () {
                return this.getCanvas().toDataURL();
              }),
              (i.prototype.getCanvas = function () {
                if (this.renderer.type === h.RENDERER_TYPE.WEBGL) {
                  var t = this.renderer.gl,
                    e = this.textureBuffer.width,
                    i = this.textureBuffer.height,
                    r = new Uint8Array(4 * e * i);
                  t.bindFramebuffer(t.FRAMEBUFFER, this.textureBuffer.frameBuffer),
                    t.readPixels(0, 0, e, i, t.RGBA, t.UNSIGNED_BYTE, r),
                    t.bindFramebuffer(t.FRAMEBUFFER, null);
                  var n = new s(e, i),
                    o = n.context.getImageData(0, 0, e, i);
                  return o.data.set(r), n.context.putImageData(o, 0, 0), n.canvas;
                }
                return this.textureBuffer.canvas;
              });
          },
          {
            '../const': 13,
            '../math': 23,
            '../renderers/canvas/utils/CanvasBuffer': 35,
            '../renderers/webgl/utils/RenderTarget': 55,
            './BaseTexture': 59,
            './Texture': 61,
          },
        ],
        61: [
          function (t, e) {
            function i(t, e, r, n, o) {
              (this.noFrame = !1),
                e || ((this.noFrame = !0), (e = new a.Rectangle(0, 0, 1, 1))),
                t instanceof i && (t = t.baseTexture),
                (this.baseTexture = t),
                (this._frame = e),
                (this.trim = n),
                (this.valid = !1),
                (this.requiresUpdate = !1),
                (this._uvs = null),
                (this.width = 0),
                (this.height = 0),
                (this.crop = r || e),
                (this.rotate = !!o),
                t.hasLoaded
                  ? (this.noFrame && (e = new a.Rectangle(0, 0, t.width, t.height)), (this.frame = e))
                  : t.addEventListener('loaded', this.onBaseTextureLoaded.bind(this));
            }
            var r = t('./BaseTexture'),
              n = t('./VideoBaseTexture'),
              o = t('./TextureUvs'),
              s = t('../utils/eventTarget'),
              a = t('../math'),
              h = t('../utils');
            (i.prototype.constructor = i),
              (e.exports = i),
              s.mixin(i.prototype),
              Object.defineProperties(i.prototype, {
                frame: {
                  get: function () {
                    return this._frame;
                  },
                  set: function (t) {
                    if (
                      ((this._frame = t),
                      (this.noFrame = !1),
                      (this.width = t.width),
                      (this.height = t.height),
                      !this.trim &&
                        !this.rotate &&
                        (t.x + t.width > this.baseTexture.width || t.y + t.height > this.baseTexture.height))
                    )
                      throw new Error('Texture Error: frame does not fit inside the base Texture dimensions ' + this);
                    (this.valid = t && t.width && t.height && this.baseTexture.source && this.baseTexture.hasLoaded),
                      this.trim
                        ? ((this.width = this.trim.width),
                          (this.height = this.trim.height),
                          (this._frame.width = this.trim.width),
                          (this._frame.height = this.trim.height))
                        : (this.crop = t),
                      this.valid && this._updateUvs();
                  },
                },
              }),
              (i.prototype.update = function () {
                this.baseTexture.update();
              }),
              (i.prototype.onBaseTextureLoaded = function () {
                var t = this.baseTexture;
                t.removeEventListener('loaded', this.onLoaded),
                  (this.frame = this.noFrame ? new a.Rectangle(0, 0, t.width, t.height) : this._frame),
                  this.dispatchEvent({ type: 'update', content: this });
              }),
              (i.prototype.destroy = function (t) {
                t && this.baseTexture.destroy(), (this.valid = !1);
              }),
              (i.prototype._updateUvs = function () {
                this._uvs || (this._uvs = new o()), this._uvs.set(this.crop, this.baseTexture, this.rotate);
              }),
              (i.fromImage = function (t, e, n) {
                var o = h.TextureCache[t];
                return o || ((o = new i(r.fromImage(t, e, n))), (h.TextureCache[t] = o)), o;
              }),
              (i.fromFrame = function (t) {
                var e = h.TextureCache[t];
                if (!e) throw new Error('The frameId "' + t + '" does not exist in the texture cache' + this);
                return e;
              }),
              (i.fromCanvas = function (t, e) {
                return new i(r.fromCanvas(t, e));
              }),
              (i.fromVideo = function (t, e) {
                return new i(n.baseTextureFromVideo(t, e));
              }),
              (i.addTextureToCache = function (t, e) {
                h.TextureCache[e] = t;
              }),
              (i.removeTextureFromCache = function (t) {
                var e = h.TextureCache[t];
                return delete h.TextureCache[t], delete h.BaseTextureCache[t], e;
              }),
              (i.emptyTexture = new i(new r()));
          },
          {
            '../math': 23,
            '../utils': 68,
            '../utils/eventTarget': 67,
            './BaseTexture': 59,
            './TextureUvs': 62,
            './VideoBaseTexture': 63,
          },
        ],
        62: [
          function (t, e) {
            function i() {
              (this.x0 = 0),
                (this.y0 = 0),
                (this.x1 = 0),
                (this.y1 = 0),
                (this.x2 = 0),
                (this.y2 = 0),
                (this.x3 = 0),
                (this.y3 = 0);
            }
            (e.exports = i),
              (i.prototype.set = function (t, e, i) {
                var r = e.width,
                  n = e.height;
                i
                  ? ((this.x0 = (t.x + t.height) / r),
                    (this.y0 = t.y / n),
                    (this.x1 = (t.x + t.height) / r),
                    (this.y1 = (t.y + t.width) / n),
                    (this.x2 = t.x / r),
                    (this.y2 = (t.y + t.width) / n),
                    (this.x3 = t.x / r),
                    (this.y3 = t.y / n))
                  : ((this.x0 = t.x / r),
                    (this.y0 = t.y / n),
                    (this.x1 = (t.x + t.width) / r),
                    (this.y1 = t.y / n),
                    (this.x2 = (t.x + t.width) / r),
                    (this.y2 = (t.y + t.height) / n),
                    (this.x3 = t.x / r),
                    (this.y3 = (t.y + t.height) / n));
              });
          },
          {},
        ],
        63: [
          function (t, e) {
            function i(t, e) {
              if (!t) throw new Error('No video source element specified.');
              (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) &&
                t.width &&
                t.height &&
                (t.complete = !0),
                n.call(this, t, e),
                (this.autoUpdate = !1),
                (this._onUpdate = this._onUpdate.bind(this)),
                (this._onCanPlay = this._onCanPlay.bind(this)),
                t.complete ||
                  (t.addEventListener('canplay', this._onCanPlay),
                  t.addEventListener('canplaythrough', this._onCanPlay),
                  t.addEventListener('play', this._onPlayStart.bind(this)),
                  t.addEventListener('pause', this._onPlayStop.bind(this))),
                (this.__loaded = !1);
            }
            function r(t, e) {
              e || (e = 'video/' + t.substr(t.lastIndexOf('.') + 1));
              var i = document.createElement('source');
              return (i.src = t), (i.type = e), i;
            }
            var n = t('./BaseTexture'),
              o = t('../utils');
            (i.prototype = Object.create(n.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype._onUpdate = function () {
                this.autoUpdate && (window.requestAnimationFrame(this._onUpdate), this.update());
              }),
              (i.prototype._onPlayStart = function () {
                this.autoUpdate || (window.requestAnimationFrame(this._onUpdate), (this.autoUpdate = !0));
              }),
              (i.prototype._onPlayStop = function () {
                this.autoUpdate = !1;
              }),
              (i.prototype._onCanPlay = function () {
                (this.hasLoaded = !0),
                  this.source &&
                    (this.source.removeEventListener('canplay', this._onCanPlay),
                    this.source.removeEventListener('canplaythrough', this._onCanPlay),
                    (this.width = this.source.videoWidth),
                    (this.height = this.source.videoHeight),
                    this.source.play(),
                    this.__loaded || ((this.__loaded = !0), this.emit('loaded', this)));
              }),
              (i.prototype.destroy = function () {
                this.source &&
                  this.source._pixiId &&
                  ((o.BaseTextureCache[this.source._pixiId] = null),
                  delete o.BaseTextureCache[this.source._pixiId],
                  (this.source._pixiId = null),
                  delete this.source._pixiId),
                  n.prototype.destroy.call(this);
              }),
              (i.fromVideo = function (t, e) {
                t._pixiId || (t._pixiId = 'video_' + o.uuid());
                var r = o.BaseTextureCache[t._pixiId];
                return r || ((r = new i(t, e)), (o.BaseTextureCache[t._pixiId] = r)), r;
              }),
              (i.fromUrl = function (t, e) {
                var n = document.createElement('video');
                if (Array.isArray(t)) for (var o = 0; o < t.length; ++o) n.appendChild(r(t.src || t, t.mime));
                else n.appendChild(r(t.src || t, t.mime));
                return n.load(), n.play(), i.textureFromVideo(n, e);
              }),
              (i.fromUrls = i.fromUrl);
          },
          { '../utils': 68, './BaseTexture': 59 },
        ],
        64: [
          function (t, e) {
            function i(t, e, i) {
              (this.__isEventObject = !0),
                (this.stopped = !1),
                (this.stoppedImmediate = !1),
                (this.target = t),
                (this.type = e),
                (this.data = i),
                (this.timeStamp = Date.now());
            }
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.stopPropagation = function () {
                this.stopped = !0;
              }),
              (i.prototype.stopImmediatePropagation = function () {
                this.stoppedImmediate = !0;
              });
          },
          {},
        ],
        65: [
          function (t, e) {
            var i = (e.exports = {});
            (i.Triangulate = function (t) {
              var e = !0,
                r = t.length >> 1;
              if (3 > r) return [];
              for (var n = [], o = [], s = 0; r > s; s++) o.push(s);
              s = 0;
              for (var a = r; a > 3; ) {
                var h = o[(s + 0) % a],
                  l = o[(s + 1) % a],
                  u = o[(s + 2) % a],
                  c = t[2 * h],
                  d = t[2 * h + 1],
                  p = t[2 * l],
                  f = t[2 * l + 1],
                  m = t[2 * u],
                  v = t[2 * u + 1],
                  g = !1;
                if (i._convex(c, d, p, f, m, v, e)) {
                  g = !0;
                  for (var y = 0; a > y; y++) {
                    var x = o[y];
                    if (x !== h && x !== l && x !== u && i._PointInTriangle(t[2 * x], t[2 * x + 1], c, d, p, f, m, v)) {
                      g = !1;
                      break;
                    }
                  }
                }
                if (g) n.push(h, l, u), o.splice((s + 1) % a, 1), a--, (s = 0);
                else if (s++ > 3 * a) {
                  if (!e) return null;
                  for (n = [], o = [], s = 0; r > s; s++) o.push(s);
                  (s = 0), (a = r), (e = !1);
                }
              }
              return n.push(o[0], o[1], o[2]), n;
            }),
              (i._PointInTriangle = function (t, e, i, r, n, o, s, a) {
                var h = s - i,
                  l = a - r,
                  u = n - i,
                  c = o - r,
                  d = t - i,
                  p = e - r,
                  f = h * h + l * l,
                  m = h * u + l * c,
                  v = h * d + l * p,
                  g = u * u + c * c,
                  y = u * d + c * p,
                  x = 1 / (f * g - m * m),
                  _ = (g * v - m * y) * x,
                  b = (f * y - m * v) * x;
                return _ >= 0 && b >= 0 && 1 > _ + b;
              }),
              (i._convex = function (t, e, i, r, n, o, s) {
                return (e - r) * (n - i) + (i - t) * (o - r) >= 0 === s;
              });
          },
          {},
        ],
        66: [
          function (t, e) {
            var i = t('./eventTarget'),
              r = t('./EventData'),
              n = function () {
                (this.updateBind = this.update.bind(this)),
                  (this.active = !1),
                  (this.eventData = new r(this, 'tick', { deltaTime: 1 })),
                  (this.deltaTime = 1),
                  (this.timeElapsed = 0),
                  (this.lastTime = 0),
                  (this.speed = 1),
                  this.start();
              };
            i.mixin(n.prototype),
              (n.prototype.start = function () {
                this.active || ((this.active = !0), requestAnimationFrame(this.updateBind));
              }),
              (n.prototype.stop = function () {
                this.active && (this.active = !1);
              }),
              (n.prototype.update = function () {
                if (this.active) {
                  requestAnimationFrame(this.updateBind);
                  var t = new Date().getTime(),
                    e = t - this.lastTime;
                  e > 100 && (e = 100),
                    (this.deltaTime = 0.06 * e),
                    (this.deltaTime *= this.speed),
                    (this.eventData.data.deltaTime = this.deltaTime),
                    this.emit('tick', this.eventData),
                    (this.lastTime = t);
                }
              }),
              (e.exports = new n());
          },
          { './EventData': 64, './eventTarget': 67 },
        ],
        67: [
          function (t, e) {
            function i(t) {
              (t.listeners = function (t) {
                return (this._listeners = this._listeners || {}), this._listeners[t] ? this._listeners[t].slice() : [];
              }),
                (t.emit = t.dispatchEvent =
                  function (t, e) {
                    if (((this._listeners = this._listeners || {}), this._listeners[t])) {
                      (e && e.__isEventObject) || ((n.target = this), (n.type = t), (n.data = e), (e = n));
                      var i,
                        r = this._listeners[t].slice(0),
                        o = r.length,
                        s = r[0];
                      for (i = 0; o > i; s = r[++i]) if ((s(e), e.stoppedImmediate)) return this;
                      return e.stopped ? this : this;
                    }
                  }),
                (t.on = t.addEventListener =
                  function (t, e) {
                    return (
                      (this._listeners = this._listeners || {}),
                      (this._listeners[t] = this._listeners[t] || []).push(e),
                      this
                    );
                  }),
                (t.once = function (t, e) {
                  function i() {
                    e.apply(r.off(t, i), arguments);
                  }
                  this._listeners = this._listeners || {};
                  var r = this;
                  return (i._originalHandler = e), this.on(t, i);
                }),
                (t.off = t.removeEventListener =
                  function (t, e) {
                    if (((this._listeners = this._listeners || {}), !this._listeners[t])) return this;
                    for (var i = this._listeners[t], r = e ? i.length : 0; r-- > 0; )
                      (i[r] === e || i[r]._originalHandler === e) && i.splice(r, 1);
                    return 0 === i.length && (this._listeners[t] = null), this;
                  }),
                (t.removeAllListeners = function (t) {
                  return (
                    (this._listeners = this._listeners || {}),
                    this._listeners[t] ? ((this._listeners[t] = null), this) : this
                  );
                });
            }
            var r = t('./EventData'),
              n = new r(null, null, {});
            e.exports = {
              mixin: function (t) {
                i(t);
              },
            };
          },
          { './EventData': 64 },
        ],
        68: [
          function (t, e) {
            var i = t('../const'),
              r = (e.exports = {
                _uid: 0,
                _saidHello: !1,
                Ticker: t('./Ticker'),
                EventData: t('./EventData'),
                eventTarget: t('./eventTarget'),
                pluginTarget: t('./pluginTarget'),
                PolyK: t('./PolyK'),
                uuid: function () {
                  return ++r._uid;
                },
                hex2rgb: function (t, e) {
                  return (
                    (e = e || []),
                    (e[0] = ((t >> 16) & 255) / 255),
                    (e[1] = ((t >> 8) & 255) / 255),
                    (e[2] = (255 & t) / 255),
                    e
                  );
                },
                hex2string: function (t) {
                  return (t = t.toString(16)), (t = '000000'.substr(0, 6 - t.length) + t), '#' + t;
                },
                rgb2hex: function (t) {
                  return ((255 * t[0]) << 16) + ((255 * t[1]) << 8) + 255 * t[2];
                },
                canUseNewCanvasBlendModes: function () {
                  if ('undefined' == typeof document) return !1;
                  var t = document.createElement('canvas'),
                    e = t.getContext('2d');
                  return (
                    (t.width = 1),
                    (t.height = 1),
                    (e.fillStyle = '#000'),
                    e.fillRect(0, 0, 1, 1),
                    (e.globalCompositeOperation = 'multiply'),
                    (e.fillStyle = '#fff'),
                    e.fillRect(0, 0, 1, 1),
                    0 === e.getImageData(0, 0, 1, 1).data[0]
                  );
                },
                getNextPowerOfTwo: function (t) {
                  if (t > 0 && 0 === (t & (t - 1))) return t;
                  for (var e = 1; t > e; ) e <<= 1;
                  return e;
                },
                isPowerOfTwo: function (t, e) {
                  return t > 0 && 0 === (t & (t - 1)) && e > 0 && 0 === (e & (e - 1));
                },
                getResolutionOfUrl: function (t) {
                  var e = i.RETINA_PREFIX.exec(t);
                  return e ? parseFloat(e[1]) : 1;
                },
                sayHello: function () {},
                TextureCache: {},
                BaseTextureCache: {},
              });
          },
          {
            '../const': 13,
            './EventData': 64,
            './PolyK': 65,
            './Ticker': 66,
            './eventTarget': 67,
            './pluginTarget': 69,
          },
        ],
        69: [
          function (t, e) {
            function i(t) {
              (t.__plugins = {}),
                (t.registerPlugin = function (e, i) {
                  t.__plugins[e] = i;
                }),
                (t.prototype.initPlugins = function () {
                  this.plugins = this.plugins || {};
                  for (var e in t.__plugins) this.plugins[e] = new t.__plugins[e](this);
                }),
                (t.prototype.destroyPlugins = function () {
                  for (var t in this.plugins) this.plugins[t].destroy(), (this.plugins[t] = null);
                  this.plugins = null;
                });
            }
            e.exports = {
              mixin: function (t) {
                i(t);
              },
            };
          },
          {},
        ],
        70: [
          function (t, e) {
            function i(t) {
              r.Sprite.call(this, t[0]),
                (this._textures = t),
                (this.animationSpeed = 1),
                (this.loop = !0),
                (this.onComplete = null),
                (this.currentFrame = 0),
                (this.playing = !1),
                (this._updateBound = this.update.bind(this));
            }
            var r = t('../core'),
              n = t('../core/utils');
            (i.prototype = Object.create(r.Sprite.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                totalFrames: {
                  get: function () {
                    return this._textures.length;
                  },
                },
                textures: {
                  get: function () {
                    return this._textures;
                  },
                  set: function (t) {
                    (this._textures = t),
                      (this.texture = this._textures[Math.floor(this.currentFrame) % this._textures.length]);
                  },
                },
              }),
              (i.prototype.stop = function () {
                this.playing && ((this.playing = !1), n.Ticker.off('tick', this._updateBound));
              }),
              (i.prototype.play = function () {
                this.playing || ((this.playing = !0), n.Ticker.on('tick', this._updateBound));
              }),
              (i.prototype.gotoAndStop = function (t) {
                this.stop(), (this.currentFrame = t);
                var e = Math.round(this.currentFrame);
                this.texture = this._textures[e % this._textures.length];
              }),
              (i.prototype.gotoAndPlay = function (t) {
                (this.currentFrame = t), this.play();
              }),
              (i.prototype.update = function (t) {
                this.currentFrame += this.animationSpeed * t.data.deltaTime;
                var e = Math.floor(this.currentFrame);
                0 > e
                  ? this.loop
                    ? ((this.currentFrame += this._textures.length), (this.texture = this._textures[this.currentFrame]))
                    : (this.gotoAndStop(0), this.onComplete && this.onComplete())
                  : this.loop || e < this._textures.length
                    ? (this.texture = this._textures[e % this._textures.length])
                    : e >= this._textures.length &&
                      (this.gotoAndStop(this.textures.length - 1), this.onComplete && this.onComplete());
              }),
              (i.prototype.destroy = function () {
                this.stop(), r.Sprite.prototype.destroy.call(this);
              }),
              (i.fromFrames = function (t) {
                for (var e = [], n = 0; n < t.length; ++n) e.push(new r.Texture.fromFrame(t[n]));
                return new i(e);
              }),
              (i.fromImages = function (t) {
                for (var e = [], n = 0; n < t.length; ++n) e.push(new r.Texture.fromImage(t[n]));
                return new i(e);
              });
          },
          { '../core': 20, '../core/utils': 68 },
        ],
        71: [
          function (t, e) {
            function i(t, e) {
              r.call(this, t),
                (this.points = e),
                (this.vertices = new Float32Array(4 * e.length)),
                (this.uvs = new Float32Array(4 * e.length)),
                (this.colors = new Float32Array(2 * e.length)),
                (this.indices = new Uint16Array(2 * e.length)),
                this.refresh();
            }
            var r = t('./Strip');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.refresh = function () {
                var t = this.points;
                if (!(t.length < 1)) {
                  var e = this.uvs,
                    i = this.indices,
                    r = this.colors;
                  (e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 1), (r[0] = 1), (r[1] = 1), (i[0] = 0), (i[1] = 1);
                  for (var n, o, s, a = t.length, h = 1; a > h; h++)
                    (n = t[h]),
                      (o = 4 * h),
                      (s = h / (a - 1)),
                      h % 2
                        ? ((e[o] = s), (e[o + 1] = 0), (e[o + 2] = s), (e[o + 3] = 1))
                        : ((e[o] = s), (e[o + 1] = 0), (e[o + 2] = s), (e[o + 3] = 1)),
                      (o = 2 * h),
                      (r[o] = 1),
                      (r[o + 1] = 1),
                      (o = 2 * h),
                      (i[o] = o),
                      (i[o + 1] = o + 1);
                }
              }),
              (i.prototype.updateTransform = function () {
                var t = this.points;
                if (!(t.length < 1)) {
                  for (var e, i, r, n, o, s, a = t[0], h = 0, l = 0, u = this.vertices, c = t.length, d = 0; c > d; d++)
                    (i = t[d]),
                      (r = 4 * d),
                      (e = d < t.length - 1 ? t[d + 1] : i),
                      (l = -(e.x - a.x)),
                      (h = e.y - a.y),
                      (n = 10 * (1 - d / (c - 1))),
                      n > 1 && (n = 1),
                      (o = Math.sqrt(h * h + l * l)),
                      (s = this.texture.height / 2),
                      (h /= o),
                      (l /= o),
                      (h *= s),
                      (l *= s),
                      (u[r] = i.x + h),
                      (u[r + 1] = i.y + l),
                      (u[r + 2] = i.x - h),
                      (u[r + 3] = i.y - l),
                      (a = i);
                  this.containerUpdateTransform();
                }
              });
          },
          { './Strip': 72 },
        ],
        72: [
          function (t, e) {
            function i(t) {
              r.Container.call(this),
                (this.texture = t),
                (this.uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1])),
                (this.vertices = new Float32Array([0, 0, 100, 0, 100, 100, 0, 100])),
                (this.colors = new Float32Array([1, 1, 1, 1])),
                (this.indices = new Uint16Array([0, 1, 2, 3])),
                (this.dirty = !0),
                (this.blendMode = r.CONST.BLEND_MODES.NORMAL),
                (this.canvasPadding = 0),
                (this.drawMode = i.DrawModes.TRIANGLE_STRIP);
            }
            var r = t('../core');
            (i.prototype = Object.create(r.Container.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.renderWebGL = function (t) {
                !this.visible ||
                  this.alpha <= 0 ||
                  !this.renderable ||
                  (t.spriteBatch.stop(),
                  this._vertexBuffer || this._initWebGL(t),
                  t.shaderManager.setShader(t.shaderManager.plugins.stripShader),
                  this._renderStrip(t),
                  t.spriteBatch.start());
              }),
              (i.prototype._initWebGL = function (t) {
                var e = t.gl;
                (this._vertexBuffer = e.createBuffer()),
                  (this._indexBuffer = e.createBuffer()),
                  (this._uvBuffer = e.createBuffer()),
                  (this._colorBuffer = e.createBuffer()),
                  e.bindBuffer(e.ARRAY_BUFFER, this._vertexBuffer),
                  e.bufferData(e.ARRAY_BUFFER, this.vertices, e.DYNAMIC_DRAW),
                  e.bindBuffer(e.ARRAY_BUFFER, this._uvBuffer),
                  e.bufferData(e.ARRAY_BUFFER, this.uvs, e.STATIC_DRAW),
                  e.bindBuffer(e.ARRAY_BUFFER, this._colorBuffer),
                  e.bufferData(e.ARRAY_BUFFER, this.colors, e.STATIC_DRAW),
                  e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this._indexBuffer),
                  e.bufferData(e.ELEMENT_ARRAY_BUFFER, this.indices, e.STATIC_DRAW);
              }),
              (i.prototype._renderStrip = function (t) {
                var e = t.gl,
                  r = t.projection,
                  n = t.offset,
                  o = t.shaderManager.plugins.stripShader,
                  s = this.drawMode === i.DrawModes.TRIANGLE_STRIP ? e.TRIANGLE_STRIP : e.TRIANGLES;
                t.blendModeManager.setBlendMode(this.blendMode),
                  e.uniformMatrix3fv(o.translationMatrix, !1, this.worldTransform.toArray(!0)),
                  e.uniform2f(o.projectionVector, r.x, -r.y),
                  e.uniform2f(o.offsetVector, -n.x, -n.y),
                  e.uniform1f(o.alpha, this.worldAlpha),
                  this.dirty
                    ? ((this.dirty = !1),
                      e.bindBuffer(e.ARRAY_BUFFER, this._vertexBuffer),
                      e.bufferData(e.ARRAY_BUFFER, this.vertices, e.STATIC_DRAW),
                      e.vertexAttribPointer(o.aVertexPosition, 2, e.FLOAT, !1, 0, 0),
                      e.bindBuffer(e.ARRAY_BUFFER, this._uvBuffer),
                      e.bufferData(e.ARRAY_BUFFER, this.uvs, e.STATIC_DRAW),
                      e.vertexAttribPointer(o.aTextureCoord, 2, e.FLOAT, !1, 0, 0),
                      e.activeTexture(e.TEXTURE0),
                      this.texture.baseTexture._dirty[e.id]
                        ? t.updateTexture(this.texture.baseTexture)
                        : e.bindTexture(e.TEXTURE_2D, this.texture.baseTexture._glTextures[e.id]),
                      e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this._indexBuffer),
                      e.bufferData(e.ELEMENT_ARRAY_BUFFER, this.indices, e.STATIC_DRAW))
                    : (e.bindBuffer(e.ARRAY_BUFFER, this._vertexBuffer),
                      e.bufferSubData(e.ARRAY_BUFFER, 0, this.vertices),
                      e.vertexAttribPointer(o.aVertexPosition, 2, e.FLOAT, !1, 0, 0),
                      e.bindBuffer(e.ARRAY_BUFFER, this._uvBuffer),
                      e.vertexAttribPointer(o.aTextureCoord, 2, e.FLOAT, !1, 0, 0),
                      e.activeTexture(e.TEXTURE0),
                      this.texture.baseTexture._dirty[e.id]
                        ? t.updateTexture(this.texture.baseTexture)
                        : e.bindTexture(e.TEXTURE_2D, this.texture.baseTexture._glTextures[e.id]),
                      e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this._indexBuffer)),
                  e.drawElements(s, this.indices.length, e.UNSIGNED_SHORT, 0);
              }),
              (i.prototype.renderCanvas = function (t) {
                if (this.visible && !(this.alpha <= 0) && this.renderable) {
                  var e = t.context,
                    r = this.worldTransform;
                  t.roundPixels
                    ? e.setTransform(r.a, r.b, r.c, r.d, 0 | r.tx, 0 | r.ty)
                    : e.setTransform(r.a, r.b, r.c, r.d, r.tx, r.ty),
                    this.drawMode === i.DrawModes.TRIANGLE_STRIP
                      ? this._renderCanvasTriangleStrip(e)
                      : this._renderCanvasTriangles(e);
                }
              }),
              (i.prototype._renderCanvasTriangleStrip = function (t) {
                for (var e = this.vertices, i = this.uvs, r = e.length / 2, n = 0; r - 2 > n; n++) {
                  var o = 2 * n;
                  this._renderCanvasDrawTriangle(t, e, i, o, o + 2, o + 4);
                }
              }),
              (i.prototype._renderCanvasTriangles = function (t) {
                for (var e = this.vertices, i = this.uvs, r = this.indices, n = r.length, o = 0; n > o; o += 3) {
                  var s = 2 * r[o],
                    a = 2 * r[o + 1],
                    h = 2 * r[o + 2];
                  this._renderCanvasDrawTriangle(t, e, i, s, a, h);
                }
              }),
              (i.prototype._renderCanvasDrawTriangle = function (t, e, i, r, n, o) {
                var s = this.texture.baseTexture.source,
                  a = this.texture.width,
                  h = this.texture.height,
                  l = e[r],
                  u = e[n],
                  c = e[o],
                  d = e[r + 1],
                  p = e[n + 1],
                  f = e[o + 1],
                  m = i[r] * a,
                  v = i[n] * a,
                  g = i[o] * a,
                  y = i[r + 1] * h,
                  x = i[n + 1] * h,
                  _ = i[o + 1] * h;
                if (this.canvasPadding > 0) {
                  var b = this.canvasPadding / this.worldTransform.a,
                    w = this.canvasPadding / this.worldTransform.d,
                    T = (l + u + c) / 3,
                    S = (d + p + f) / 3,
                    E = l - T,
                    A = d - S,
                    C = Math.sqrt(E * E + A * A);
                  (l = T + (E / C) * (C + b)),
                    (d = S + (A / C) * (C + w)),
                    (E = u - T),
                    (A = p - S),
                    (C = Math.sqrt(E * E + A * A)),
                    (u = T + (E / C) * (C + b)),
                    (p = S + (A / C) * (C + w)),
                    (E = c - T),
                    (A = f - S),
                    (C = Math.sqrt(E * E + A * A)),
                    (c = T + (E / C) * (C + b)),
                    (f = S + (A / C) * (C + w));
                }
                t.save(), t.beginPath(), t.moveTo(l, d), t.lineTo(u, p), t.lineTo(c, f), t.closePath(), t.clip();
                var M = m * x + y * g + v * _ - x * g - y * v - m * _,
                  R = l * x + y * c + u * _ - x * c - y * u - l * _,
                  P = m * u + l * g + v * c - u * g - l * v - m * c,
                  O = m * x * c + y * u * g + l * v * _ - l * x * g - y * v * c - m * u * _,
                  D = d * x + y * f + p * _ - x * f - y * p - d * _,
                  F = m * p + d * g + v * f - p * g - d * v - m * f,
                  L = m * x * f + y * p * g + d * v * _ - d * x * g - y * v * f - m * p * _;
                t.transform(R / M, D / M, P / M, F / M, O / M, L / M), t.drawImage(s, 0, 0), t.restore();
              }),
              (i.prototype.renderStripFlat = function (t) {
                var e = this.context,
                  i = t.vertices,
                  r = i.length / 2;
                e.beginPath();
                for (var n = 1; r - 2 > n; n++) {
                  var o = 2 * n,
                    s = i[o],
                    a = i[o + 2],
                    h = i[o + 4],
                    l = i[o + 1],
                    u = i[o + 3],
                    c = i[o + 5];
                  e.moveTo(s, l), e.lineTo(a, u), e.lineTo(h, c);
                }
                (e.fillStyle = '#FF0000'), e.fill(), e.closePath();
              }),
              (i.prototype.onTextureUpdate = function () {
                this.updateFrame = !0;
              }),
              (i.prototype.getBounds = function (t) {
                for (
                  var e = t || this.worldTransform,
                    i = e.a,
                    n = e.b,
                    o = e.c,
                    s = e.d,
                    a = e.tx,
                    h = e.ty,
                    l = -1 / 0,
                    u = -1 / 0,
                    c = 1 / 0,
                    d = 1 / 0,
                    p = this.vertices,
                    f = 0,
                    m = p.length;
                  m > f;
                  f += 2
                ) {
                  var v = p[f],
                    g = p[f + 1],
                    y = i * v + o * g + a,
                    x = s * g + n * v + h;
                  (c = c > y ? y : c), (d = d > x ? x : d), (l = y > l ? y : l), (u = x > u ? x : u);
                }
                if (c === -1 / 0 || 1 / 0 === u) return r.math.Rectangle.EMPTY;
                var _ = this._bounds;
                return (_.x = c), (_.width = l - c), (_.y = d), (_.height = u - d), (this._currentBounds = _), _;
              }),
              (i.DrawModes = { TRIANGLE_STRIP: 0, TRIANGLES: 1 });
          },
          { '../core': 20 },
        ],
        73: [
          function (t, e) {
            function i(t) {
              r.Shader.call(
                this,
                t,
                [
                  'attribute vec2 aVertexPosition;',
                  'attribute vec2 aTextureCoord;',
                  'uniform mat3 translationMatrix;',
                  'uniform vec2 projectionVector;',
                  'uniform vec2 offsetVector;',
                  'varying vec2 vTextureCoord;',
                  'void main(void){',
                  '   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);',
                  '   v -= offsetVector.xyx;',
                  '   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);',
                  '   vTextureCoord = aTextureCoord;',
                  '}',
                ].join('\n'),
                [
                  'precision mediump float;',
                  'uniform float alpha;',
                  'uniform sampler2D uSampler;',
                  'varying vec2 vTextureCoord;',
                  'void main(void){',
                  '   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * alpha;',
                  '}',
                ].join('\n'),
                {
                  alpha: { type: '1f', value: 0 },
                  translationMatrix: { type: 'mat3', value: new Float32Array(9) },
                },
              );
            }
            var r = t('../core');
            (i.prototype = Object.create(r.Shader.prototype)), (i.prototype.constructor = i), (e.exports = i);
          },
          { '../core': 20 },
        ],
        74: [
          function (t, e) {
            function i(t, e, i) {
              r.Sprite.call(this, t),
                (this.tileScale = new r.math.Point(1, 1)),
                (this.tilePosition = new r.math.Point(0, 0)),
                (this._width = e || 100),
                (this._height = i || 100),
                (this._tileScaleOffset = new r.math.Point(1, 1)),
                (this._tilingTexture = null),
                (this._refreshTexture = !1),
                (this._uvs = new n());
            }
            var r = t('../core'),
              n = t('../core/textures/TextureUvs'),
              o = t('../core/textures/RenderTexture'),
              s = new r.Sprite(),
              a = new r.math.Point();
            (i.prototype = Object.create(r.Sprite.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                width: {
                  get: function () {
                    return this._width;
                  },
                  set: function (t) {
                    this._width = t;
                  },
                },
                height: {
                  get: function () {
                    return this._height;
                  },
                  set: function (t) {
                    this._height = t;
                  },
                },
              }),
              (i.prototype._onTextureUpdate = function () {
                r.Sprite.prototype._onTextureUpdate.call(this), (this._refreshTexture = !0);
              }),
              (i.prototype._renderWebGL = function (t) {
                (!this._tilingTexture || this._refreshTexture) && this.generateTilingTexture(t, this.texture, !0);
                var e = this._tilingTexture;
                if (e) {
                  var i = this._uvs;
                  (this.tilePosition.x %= e.baseTexture.width * this._tileScaleOffset.x),
                    (this.tilePosition.y %= e.baseTexture.height * this._tileScaleOffset.y);
                  var r = this.tilePosition.x / (e.baseTexture.width * this._tileScaleOffset.x),
                    n = this.tilePosition.y / (e.baseTexture.height * this._tileScaleOffset.y),
                    o = this._width / e.baseTexture.width,
                    s = this._height / e.baseTexture.height;
                  (o /= this.tileScale.x),
                    (s /= this.tileScale.y),
                    (i.x0 = 0 - r),
                    (i.y0 = 0 - n),
                    (i.x1 = 1 * o - r),
                    (i.y1 = 0 - n),
                    (i.x2 = 1 * o - r),
                    (i.y2 = 1 * s - n),
                    (i.x3 = 0 - r),
                    (i.y3 = 1 * s - n);
                  var a = e._uvs,
                    h = e._frame.width,
                    l = e._frame.height;
                  (e._uvs = i),
                    (e._frame.width = this.width),
                    (e._frame.height = this.height),
                    t.setObjectRenderer(t.plugins.sprite),
                    t.plugins.sprite.render(this),
                    (e._uvs = a),
                    (e._frame.width = h),
                    (e._frame.height = l);
                }
              }),
              (i.prototype.renderCanvas = function (t) {
                if (this.visible && !(this.alpha <= 0)) {
                  var e = t.context;
                  this._mask && t.maskManager.pushMask(this._mask, t), (e.globalAlpha = this.worldAlpha);
                  var i,
                    r,
                    n = this.worldTransform,
                    o = t.resolution;
                  if (
                    (e.setTransform(n.a * o, n.b * o, n.c * o, n.d * o, n.tx * o, n.ty * o),
                    !this.__tilePattern || this._refreshTexture)
                  ) {
                    if ((this.generateTilingTexture(!1), !this._tilingTexture)) return;
                    this.__tilePattern = e.createPattern(this._tilingTexture.baseTexture.source, 'repeat');
                  }
                  this.blendMode !== t.currentBlendMode &&
                    ((t.currentBlendMode = this.blendMode),
                    (e.globalCompositeOperation = t.blendModes[t.currentBlendMode]));
                  var s = this.tilePosition,
                    a = this.tileScale;
                  for (
                    s.x %= this._tilingTexture.baseTexture.width,
                      s.y %= this._tilingTexture.baseTexture.height,
                      e.scale(a.x, a.y),
                      e.translate(s.x + this.anchor.x * -this._width, s.y + this.anchor.y * -this._height),
                      e.fillStyle = this.__tilePattern,
                      e.fillRect(-s.x, -s.y, this._width / a.x, this._height / a.y),
                      e.translate(-s.x + this.anchor.x * this._width, -s.y + this.anchor.y * this._height),
                      e.scale(1 / a.x, 1 / a.y),
                      this._mask && t.maskManager.popMask(t),
                      i = 0,
                      r = this.children.length;
                    r > i;
                    ++i
                  )
                    this.children[i].renderCanvas(t);
                }
              }),
              (i.prototype.getBounds = function () {
                var t,
                  e,
                  i,
                  r,
                  n = this._width,
                  o = this._height,
                  s = n * (1 - this.anchor.x),
                  a = n * -this.anchor.x,
                  h = o * (1 - this.anchor.y),
                  l = o * -this.anchor.y,
                  u = this.worldTransform,
                  c = u.a,
                  d = u.b,
                  p = u.c,
                  f = u.d,
                  m = u.tx,
                  v = u.ty,
                  g = c * a + p * l + m,
                  y = f * l + d * a + v,
                  x = c * s + p * l + m,
                  _ = f * l + d * s + v,
                  b = c * s + p * h + m,
                  w = f * h + d * s + v,
                  T = c * a + p * h + m,
                  S = f * h + d * a + v;
                (t = g),
                  (t = t > x ? x : t),
                  (t = t > b ? b : t),
                  (t = t > T ? T : t),
                  (i = y),
                  (i = i > _ ? _ : i),
                  (i = i > w ? w : i),
                  (i = i > S ? S : i),
                  (e = g),
                  (e = x > e ? x : e),
                  (e = b > e ? b : e),
                  (e = T > e ? T : e),
                  (r = y),
                  (r = _ > r ? _ : r),
                  (r = w > r ? w : r),
                  (r = S > r ? S : r);
                var E = this._bounds;
                return (E.x = t), (E.width = e - t), (E.y = i), (E.height = r - i), (this._currentBounds = E), E;
              }),
              (i.prototype.onTextureUpdate = function () {}),
              (i.prototype.generateTilingTexture = function (t, e, i) {
                if (this.texture.baseTexture.hasLoaded) {
                  e = this.originalTexture || this.texture;
                  var n,
                    a,
                    h = e.frame,
                    l = h.width !== e.baseTexture.width || h.height !== e.baseTexture.height;
                  if ((i && !e.baseTexture.isPowerOfTwo) || l) {
                    (n = r.utils.getNextPowerOfTwo(h.width)),
                      (a = r.utils.getNextPowerOfTwo(h.height)),
                      (s.texture = e);
                    var u = new o(t, n, a);
                    (s.worldTransform.a = n / h.width), (s.worldTransform.d = a / h.height);
                    var c = t.currentRenderTarget;
                    u.render(s, null, !0, !1), t.setRenderTarget(c), (this._tilingTexture = u);
                  } else
                    this._tilingTexture && this._tilingTexture.isTiling && this._tilingTexture.destroy(!0),
                      (this._tileScaleOffset.x = 1),
                      (this._tileScaleOffset.y = 1),
                      (this._tilingTexture = e);
                  (this._refreshTexture = !1),
                    (this.originalTexture = this.texture),
                    (this._texture = this._tilingTexture);
                }
              }),
              (i.prototype.hitTest = function (t) {
                this.worldTransform.applyInverse(t, a);
                var e,
                  i = this._width,
                  r = this._height,
                  n = -i * this.anchor.x;
                return a.x > n && a.x < n + i && ((e = -r * this.anchor.y), a.y > e && a.y < e + r) ? !0 : !1;
              }),
              (i.prototype.destroy = function () {
                r.Sprite.prototype.destroy.call(this),
                  (this.tileScale = null),
                  (this._tileScaleOffset = null),
                  (this.tilePosition = null),
                  this._tilingTexture.destroy(!0),
                  (this._tilingTexture = null),
                  (this._uvs = null);
              });
          },
          { '../core': 20, '../core/textures/RenderTexture': 60, '../core/textures/TextureUvs': 62 },
        ],
        75: [
          function (t, e) {
            var i = t('../core/math'),
              r = t('../core/textures/RenderTexture'),
              n = t('../core/display/DisplayObject'),
              o = t('../core/sprites/Sprite'),
              s = new i.Matrix();
            (n.prototype._cacheAsBitmap = !1),
              (n.prototype._originalRenderWebGL = null),
              (n.prototype._originalRenderCanvas = null),
              (n.prototype._originalUpdateTransform = null),
              (n.prototype._originalHitTest = null),
              (n.prototype._cachedSprite = null),
              Object.defineProperties(n.prototype, {
                cacheAsBitmap: {
                  get: function () {
                    return this._cacheAsBitmap;
                  },
                  set: function (t) {
                    this._cacheAsBitmap !== t &&
                      ((this._cacheAsBitmap = t),
                      t
                        ? ((this._originalRenderWebGL = this.renderWebGL),
                          (this._originalRenderCanvas = this.renderCanvas),
                          (this._originalUpdateTransform = this.updateTransform),
                          (this._originalGetBounds = this.getBounds),
                          (this._originalHitTest = this.hitTest),
                          (this.renderWebGL = this._renderCachedWebGL),
                          (this.renderCanvas = this._renderCachedCanvas))
                        : (this._cachedSprite && this._destroyCachedDisplayObject(),
                          (this.renderWebGL = this._originalRenderWebGL),
                          (this.renderCanvas = this._originalRenderCanvas),
                          (this.getBounds = this._originalGetBounds),
                          (this.updateTransform = this._originalUpdateTransform),
                          (this.hitTest = this._originalHitTest)));
                  },
                },
              }),
              (n.prototype._renderCachedWebGL = function (t) {
                this._initCachedDisplayObject(t),
                  (this._cachedSprite.worldAlpha = this.worldAlpha),
                  t.setObjectRenderer(t.plugins.sprite),
                  t.plugins.sprite.render(this._cachedSprite);
              }),
              (n.prototype._initCachedDisplayObject = function (t) {
                if (!this._cachedSprite) {
                  t.currentRenderer.flush();
                  var e = this.getLocalBounds().clone(),
                    i = t.currentRenderTarget,
                    n = t.filterManager.filterStack,
                    a = new r(t, 0 | e.width, 0 | e.height),
                    h = s;
                  (h.tx = -e.x),
                    (h.ty = -e.y),
                    (this.renderWebGL = this._originalRenderWebGL),
                    a.render(this, h, !0),
                    t.setRenderTarget(i),
                    (t.filterManager.filterStack = n),
                    (this.renderWebGL = this._renderCachedWebGL),
                    (this.updateTransform = this.displayObjectUpdateTransform),
                    (this.getBounds = this._getCahcedBounds),
                    (this._cachedSprite = new o(a)),
                    (this._cachedSprite.worldTransform = this.worldTransform),
                    (this._cachedSprite.anchor.x = -(e.x / e.width)),
                    (this._cachedSprite.anchor.y = -(e.y / e.height)),
                    (this.hitTest = this._cachedSprite.hitTest.bind(this._cachedSprite));
                }
              }),
              (n.prototype._renderCachedCanvas = function (t) {
                this._initCachedDisplayObjectCanvas(t),
                  (this._cachedSprite.worldAlpha = this.worldAlpha),
                  this._cachedSprite.renderCanvas(t);
              }),
              (n.prototype._initCachedDisplayObjectCanvas = function (t) {
                if (!this._cachedSprite) {
                  var e = this.getLocalBounds(),
                    i = t.context,
                    n = new r(t, 0 | e.width, 0 | e.height),
                    a = s;
                  (a.tx = -e.x),
                    (a.ty = -e.y),
                    (this.renderCanvas = this._originalRenderCanvas),
                    n.render(this, a, !0),
                    (t.context = i),
                    (this.renderCanvas = this._renderCachedCanvas),
                    (this.updateTransform = this.displayObjectUpdateTransform),
                    (this.getBounds = this._getCahcedBounds),
                    (this._cachedSprite = new o(n)),
                    (this._cachedSprite.worldTransform = this.worldTransform),
                    (this._cachedSprite.anchor.x = -(e.x / e.width)),
                    (this._cachedSprite.anchor.y = -(e.y / e.height)),
                    (this.hitTest = this._cachedSprite.hitTest.bind(this._cachedSprite));
                }
              }),
              (n.prototype._getCahcedBounds = function () {
                return (this._cachedSprite._currentBounds = null), this._cachedSprite.getBounds();
              }),
              (n.prototype._destroyCachedDisplayObject = function () {
                this._cachedSprite._texture.destroy(), (this._cachedSprite = null);
              }),
              (e.exports = {});
          },
          {
            '../core/display/DisplayObject': 15,
            '../core/math': 23,
            '../core/sprites/Sprite': 57,
            '../core/textures/RenderTexture': 60,
          },
        ],
        76: [
          function (t, e) {
            e.exports = {
              MovieClip: t('./MovieClip'),
              Rope: t('./Rope'),
              Strip: t('./Strip'),
              StripShader: t('./StripShader'),
              TilingSprite: t('./TilingSprite'),
              cacheAsBitmap: t('./cacheAsBitmap'),
            };
          },
          {
            './MovieClip': 70,
            './Rope': 71,
            './Strip': 72,
            './StripShader': 73,
            './TilingSprite': 74,
            './cacheAsBitmap': 75,
          },
        ],
        77: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nuniform vec4 dimensions;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y)\n    {\n        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 uv = gl_FragCoord.xy;\n\n    vec3 col = texture2D(uSampler, floor( uv / pixelSize ) * pixelSize / dimensions.xy).rgb;\n\n    float gray = (col.r + col.g + col.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    vec2 p = mod( uv / ( pixelSize * 0.5 ), 2.0) - vec2(1.0);\n    col = col * character(n, p);\n\n    gl_FragColor = vec4(col, 1.0);\n}\n',
                {
                  dimensions: { type: '4fv', value: new Float32Array([0, 0, 0, 0]) },
                  pixelSize: { type: '1f', value: 8 },
                },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                size: {
                  get: function () {
                    return this.uniforms.pixelSize.value;
                  },
                  set: function (t) {
                    this.uniforms.pixelSize.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        78: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(this),
                (this.blurXFilter = new n()),
                (this.blurYFilter = new o()),
                (this.defaultFilter = new r.AbstractFilter());
            }
            var r = t('../../core'),
              n = t('../blur/BlurXFilter'),
              o = t('../blur/BlurYFilter');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.applyFilter = function (t, e, i) {
                var n = t.filterManager.getRenderTarget(!0);
                this.defaultFilter.applyFilter(t, e, i),
                  this.blurXFilter.applyFilter(t, e, n),
                  t.blendModeManager.setBlendMode(r.CONST.BLEND_MODES.SCREEN),
                  this.blurYFilter.applyFilter(t, n, i),
                  t.blendModeManager.setBlendMode(r.CONST.BLEND_MODES.NORMAL),
                  t.filterManager.returnRenderTarget(n);
              }),
              Object.defineProperties(i.prototype, {
                blur: {
                  get: function () {
                    return this.blurXFilter.blur;
                  },
                  set: function (t) {
                    this.blurXFilter.blur = this.blurYFilter.blur = t;
                  },
                },
                blurX: {
                  get: function () {
                    return this.blurXFilter.blur;
                  },
                  set: function (t) {
                    this.blurXFilter.blur = t;
                  },
                },
                blurY: {
                  get: function () {
                    return this.blurYFilter.blur;
                  },
                  set: function (t) {
                    this.blurYFilter.blur = t;
                  },
                },
              });
          },
          { '../../core': 20, '../blur/BlurXFilter': 80, '../blur/BlurYFilter': 81 },
        ],
        79: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(this), (this.blurXFilter = new n()), (this.blurYFilter = new o());
            }
            var r = t('../../core'),
              n = t('./BlurXFilter'),
              o = t('./BlurYFilter');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.applyFilter = function (t, e, i) {
                var r = t.filterManager.getRenderTarget(!0);
                this.blurXFilter.applyFilter(t, e, r),
                  this.blurYFilter.applyFilter(t, r, i),
                  t.filterManager.returnRenderTarget(r);
              }),
              Object.defineProperties(i.prototype, {
                blur: {
                  get: function () {
                    return this.blurXFilter.blur;
                  },
                  set: function (t) {
                    this.blurXFilter.blur = this.blurYFilter.blur = t;
                  },
                },
                blurX: {
                  get: function () {
                    return this.blurXFilter.blur;
                  },
                  set: function (t) {
                    this.blurXFilter.blur = t;
                  },
                },
                blurY: {
                  get: function () {
                    return this.blurYFilter.blur;
                  },
                  set: function (t) {
                    this.blurYFilter.blur = t;
                  },
                },
              });
          },
          { '../../core': 20, './BlurXFilter': 80, './BlurYFilter': 81 },
        ],
        80: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float blur;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec4 sum = vec4(0.0);\n\n    sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;\n\n    gl_FragColor = sum;\n}\n',
                { blur: { type: '1f', value: 1 / 512 } },
              );
            }
            var r = t('../../core'),
              n = 1 / 7e3;
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                blur: {
                  get: function () {
                    return this.uniforms.blur.value / n;
                  },
                  set: function (t) {
                    this.uniforms.blur.value = n * t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        81: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float blur;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec4 sum = vec4(0.0);\n\n    sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;\n    sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;\n\n    gl_FragColor = sum;\n}\n',
                { blur: { type: '1f', value: 1 / 512 } },
              );
            }
            var r = t('../../core'),
              n = 1 / 7e3;
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                blur: {
                  get: function () {
                    return this.uniforms.blur.value / n;
                  },
                  set: function (t) {
                    this.uniforms.blur.value = n * t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        82: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nconst vec2 delta = vec2(1.0/10.0, 0.0);\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta * percent);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n',
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)), (i.prototype.constructor = i), (e.exports = i);
          },
          { '../../core': 20 },
        ],
        83: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform mat4 matrix;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;\n}\n',
                { matrix: { type: 'mat4', value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] } },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                matrix: {
                  get: function () {
                    return this.uniforms.matrix.value;
                  },
                  set: function (t) {
                    this.uniforms.matrix.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        84: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float step;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    color = floor(color * step) / step;\n\n    gl_FragColor = color;\n}\n',
                { step: { type: '1f', value: 5 } },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                step: {
                  get: function () {
                    return this.uniforms.step.value;
                  },
                  set: function (t) {
                    this.uniforms.step.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        85: [
          function (t, e) {
            function i(t, e, i) {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n',
                {
                  matrix: { type: '1fv', value: new Float32Array(t) },
                  texelSize: { type: '2v', value: { x: 1 / e, y: 1 / i } },
                },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                matrix: {
                  get: function () {
                    return this.uniforms.matrix.value;
                  },
                  set: function (t) {
                    this.uniforms.matrix.value = new Float32Array(t);
                  },
                },
                width: {
                  get: function () {
                    return 1 / this.uniforms.texelSize.value.x;
                  },
                  set: function (t) {
                    this.uniforms.texelSize.value.x = 1 / t;
                  },
                },
                height: {
                  get: function () {
                    return 1 / this.uniforms.texelSize.value.y;
                  },
                  set: function (t) {
                    this.uniforms.texelSize.value.y = 1 / t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        86: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n',
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)), (i.prototype.constructor = i), (e.exports = i);
          },
          { '../../core': 20 },
        ],
        87: [
          function (t, e) {
            function i(t) {
              var e = new r.math.Matrix();
              (t.renderable = !1),
                r.AbstractFilter.call(
                  this,
                  [
                    'attribute vec2 aVertexPosition;',
                    'attribute vec2 aTextureCoord;',
                    'attribute vec4 aColor;',
                    'uniform mat3 projectionMatrix;',
                    'uniform mat3 otherMatrix;',
                    'varying vec2 vMapCoord;',
                    'varying vec2 vTextureCoord;',
                    'varying vec4 vColor;',
                    'void main(void)',
                    '{',
                    '   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
                    '   vTextureCoord = aTextureCoord;',
                    '   vMapCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;',
                    '   vColor = vec4(aColor.rgb * aColor.a, aColor.a);',
                    '}',
                  ].join('\n'),
                  [
                    'precision lowp float;',
                    'varying vec2 vMapCoord;',
                    'varying vec2 vTextureCoord;',
                    'varying vec4 vColor;',
                    'uniform vec2 scale;',
                    'uniform sampler2D uSampler;',
                    'uniform sampler2D mapSampler;',
                    'void main(void)',
                    '{',
                    '   vec4 original =  texture2D(uSampler, vTextureCoord);',
                    '   vec4 map =  texture2D(mapSampler, vMapCoord);',
                    '  map -= 0.5;',
                    '   map.xy *= scale;',
                    '   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y));',
                    '}',
                  ].join('\n'),
                  {
                    mapSampler: { type: 'sampler2D', value: t.texture },
                    otherMatrix: { type: 'mat3', value: e.toArray(!0) },
                    scale: { type: 'v2', value: { x: 1, y: 1 } },
                  },
                ),
                (this.maskSprite = t),
                (this.maskMatrix = e),
                (this.scale = new r.math.Point(20, 20));
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.applyFilter = function (t, e, i) {
                var r = t.filterManager;
                r.calculateMappedMatrix(e.frame, this.maskSprite, this.maskMatrix),
                  (this.uniforms.otherMatrix.value = this.maskMatrix.toArray(!0)),
                  (this.uniforms.scale.value.x = this.scale.x * (1 / e.frame.width)),
                  (this.uniforms.scale.value.y = this.scale.y * (1 / e.frame.height));
                var n = this.getShader(t);
                r.applyFilter(n, e, i);
              }),
              Object.defineProperties(i.prototype, {
                map: {
                  get: function () {
                    return this.uniforms.mapSampler.value;
                  },
                  set: function (t) {
                    this.uniforms.mapSampler.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        88: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 dimensions;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * dimensions.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n',
                {
                  scale: { type: '1f', value: 1 },
                  angle: { type: '1f', value: 5 },
                  dimensions: { type: '4fv', value: [0, 0, 0, 0] },
                },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                scale: {
                  get: function () {
                    return this.uniforms.scale.value;
                  },
                  set: function (t) {
                    this.uniforms.scale.value = t;
                  },
                },
                angle: {
                  get: function () {
                    return this.uniforms.angle.value;
                  },
                  set: function (t) {
                    this.uniforms.angle.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        89: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float gray;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);\n}\n',
                { gray: { type: '1f', value: 1 } },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                gray: {
                  get: function () {
                    return this.uniforms.gray.value;
                  },
                  set: function (t) {
                    this.uniforms.gray.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        90: [
          function (t, e) {
            e.exports = {
              AsciiFilter: t('./ascii/AsciiFilter'),
              BloomFilter: t('./bloom/BloomFilter'),
              BlurFilter: t('./blur/BlurFilter'),
              BlurXFilter: t('./blur/BlurXFilter'),
              BlurYFilter: t('./blur/BlurYFilter'),
              ColorMatrixFilter: t('./color/ColorMatrixFilter'),
              ColorStepFilter: t('./color/ColorStepFilter'),
              ConvolutionFilter: t('./convolution/ConvolutionFilter'),
              CrossHatchFilter: t('./crosshatch/CrossHatchFilter'),
              DisplacementFilter: t('./displacement/DisplacementFilter'),
              DotScreenFilter: t('./dot/DotScreenFilter'),
              GrayFilter: t('./gray/GrayFilter'),
              InvertFilter: t('./invert/InvertFilter'),
              NoiseFilter: t('./noise/NoiseFilter'),
              NormalMapFilter: t('./normal/NormalMapFilter'),
              PixelateFilter: t('./pixelate/PixelateFilter'),
              RGBSplitFilter: t('./rgb/RGBSplitFilter'),
              ShockwaveFilter: t('./shockwave/ShockwaveFilter'),
              SepiaFilter: t('./sepia/SepiaFilter'),
              SmartBlurFilter: t('./blur/SmartBlurFilter'),
              TiltShiftFilter: t('./tiltshift/TiltShiftFilter'),
              TiltShiftXFilter: t('./tiltshift/TiltShiftXFilter'),
              TiltShiftYFilter: t('./tiltshift/TiltShiftYFilter'),
              TwistFilter: t('./twist/TwistFilter'),
            };
          },
          {
            './ascii/AsciiFilter': 77,
            './bloom/BloomFilter': 78,
            './blur/BlurFilter': 79,
            './blur/BlurXFilter': 80,
            './blur/BlurYFilter': 81,
            './blur/SmartBlurFilter': 82,
            './color/ColorMatrixFilter': 83,
            './color/ColorStepFilter': 84,
            './convolution/ConvolutionFilter': 85,
            './crosshatch/CrossHatchFilter': 86,
            './displacement/DisplacementFilter': 87,
            './dot/DotScreenFilter': 88,
            './gray/GrayFilter': 89,
            './invert/InvertFilter': 91,
            './noise/NoiseFilter': 92,
            './normal/NormalMapFilter': 93,
            './pixelate/PixelateFilter': 94,
            './rgb/RGBSplitFilter': 95,
            './sepia/SepiaFilter': 96,
            './shockwave/ShockwaveFilter': 97,
            './tiltshift/TiltShiftFilter': 99,
            './tiltshift/TiltShiftXFilter': 100,
            './tiltshift/TiltShiftYFilter': 101,
            './twist/TwistFilter': 102,
          },
        ],
        91: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform float invert;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);\n}\n',
                { invert: { type: '1f', value: 1 } },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                invert: {
                  get: function () {
                    return this.uniforms.invert.value;
                  },
                  set: function (t) {
                    this.uniforms.invert.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        92: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float noise;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    float diff = (rand(vTextureCoord) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n',
                { noise: { type: '1f', value: 0.5 } },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                noise: {
                  get: function () {
                    return this.uniforms.noise.value;
                  },
                  set: function (t) {
                    this.uniforms.noise.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        93: [
          function (t, e) {
            function i(t) {
              r.AbstractFilter.call(
                this,
                null,
                "precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying float vColor;\n\nuniform sampler2D displacementMap;\nuniform sampler2D uSampler;\n\nuniform vec4 dimensions;\n\nconst vec2 Resolution = vec2(1.0,1.0);      //resolution of screen\nuniform vec3 LightPos;    //light position, normalized\nconst vec4 LightColor = vec4(1.0, 1.0, 1.0, 1.0);      //light RGBA -- alpha is intensity\nconst vec4 AmbientColor = vec4(1.0, 1.0, 1.0, 0.5);    //ambient RGBA -- alpha is intensity\nconst vec3 Falloff = vec3(0.0, 1.0, 0.2);         //attenuation coefficients\n\nuniform vec3 LightDir; // = vec3(1.0, 0.0, 1.0);\n\nuniform vec2 mapDimensions; // = vec2(256.0, 256.0);\n\n\nvoid main(void)\n{\n    vec2 mapCords = vTextureCoord.xy;\n\n    vec4 color = texture2D(uSampler, vTextureCoord.st);\n    vec3 nColor = texture2D(displacementMap, vTextureCoord.st).rgb;\n\n\n    mapCords *= vec2(dimensions.x/512.0, dimensions.y/512.0);\n\n    mapCords.y *= -1.0;\n    mapCords.y += 1.0;\n\n    // RGBA of our diffuse color\n    vec4 DiffuseColor = texture2D(uSampler, vTextureCoord);\n\n    // RGB of our normal map\n    vec3 NormalMap = texture2D(displacementMap, mapCords).rgb;\n\n    // The delta position of light\n    // vec3 LightDir = vec3(LightPos.xy - (gl_FragCoord.xy / Resolution.xy), LightPos.z);\n    vec3 LightDir = vec3(LightPos.xy - (mapCords.xy), LightPos.z);\n\n    // Correct for aspect ratio\n    // LightDir.x *= Resolution.x / Resolution.y;\n\n    // Determine distance (used for attenuation) BEFORE we normalize our LightDir\n    float D = length(LightDir);\n\n    // normalize our vectors\n    vec3 N = normalize(NormalMap * 2.0 - 1.0);\n    vec3 L = normalize(LightDir);\n\n    // Pre-multiply light color with intensity\n    // Then perform 'N dot L' to determine our diffuse term\n    vec3 Diffuse = (LightColor.rgb * LightColor.a) * max(dot(N, L), 0.0);\n\n    // pre-multiply ambient color with intensity\n    vec3 Ambient = AmbientColor.rgb * AmbientColor.a;\n\n    // calculate attenuation\n    float Attenuation = 1.0 / ( Falloff.x + (Falloff.y*D) + (Falloff.z*D*D) );\n\n    // the calculation which brings it all together\n    vec3 Intensity = Ambient + Diffuse * Attenuation;\n    vec3 FinalColor = DiffuseColor.rgb * Intensity;\n    gl_FragColor = vColor * vec4(FinalColor, DiffuseColor.a);\n\n    // gl_FragColor = vec4(1.0, 0.0, 0.0, Attenuation); // vColor * vec4(FinalColor, DiffuseColor.a);\n\n/*\n    // normalise color\n    vec3 normal = normalize(nColor * 2.0 - 1.0);\n\n    vec3 deltaPos = vec3( (light.xy - gl_FragCoord.xy) / resolution.xy, light.z );\n\n    float lambert = clamp(dot(normal, lightDir), 0.0, 1.0);\n\n    float d = sqrt(dot(deltaPos, deltaPos));\n    float att = 1.0 / ( attenuation.x + (attenuation.y*d) + (attenuation.z*d*d) );\n\n    vec3 result = (ambientColor * ambientIntensity) + (lightColor.rgb * lambert) * att;\n    result *= color.rgb;\n\n    gl_FragColor = vec4(result, 1.0);\n*/\n}\n",
                {
                  displacementMap: { type: 'sampler2D', value: t },
                  scale: { type: '2f', value: { x: 15, y: 15 } },
                  offset: { type: '2f', value: { x: 0, y: 0 } },
                  mapDimensions: { type: '2f', value: { x: 1, y: 1 } },
                  dimensions: { type: '4f', value: [0, 0, 0, 0] },
                  LightPos: { type: '3f', value: [0, 1, 0] },
                },
              ),
                (t.baseTexture._powerOf2 = !0),
                t.baseTexture.hasLoaded
                  ? this.onTextureLoaded()
                  : t.baseTexture.once('loaded', this.onTextureLoaded.bind(this));
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.onTextureLoaded = function () {
                (this.uniforms.mapDimensions.value.x = this.uniforms.displacementMap.value.width),
                  (this.uniforms.mapDimensions.value.y = this.uniforms.displacementMap.value.height);
              }),
              Object.defineProperties(i.prototype, {
                map: {
                  get: function () {
                    return this.uniforms.displacementMap.value;
                  },
                  set: function (t) {
                    this.uniforms.displacementMap.value = t;
                  },
                },
                scale: {
                  get: function () {
                    return this.uniforms.scale.value;
                  },
                  set: function (t) {
                    this.uniforms.scale.value = t;
                  },
                },
                offset: {
                  get: function () {
                    return this.uniforms.offset.value;
                  },
                  set: function (t) {
                    this.uniforms.offset.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        94: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 dimensions;\nuniform vec2 pixelSize;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord;\n\n    vec2 size = dimensions.xy / pixelSize;\n\n    vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;\n\n    gl_FragColor = texture2D(uSampler, color);\n}\n',
                {
                  dimensions: { type: '4fv', value: new Float32Array([0, 0, 0, 0]) },
                  pixelSize: { type: 'v2', value: { x: 10, y: 10 } },
                },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                size: {
                  get: function () {
                    return this.uniforms.pixelSize.value;
                  },
                  set: function (t) {
                    this.uniforms.pixelSize.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        95: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 dimensions;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n',
                {
                  red: { type: 'v2', value: { x: 20, y: 20 } },
                  green: { type: 'v2', value: { x: -20, y: 20 } },
                  blue: { type: 'v2', value: { x: 20, y: -20 } },
                  dimensions: { type: '4fv', value: [0, 0, 0, 0] },
                },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                red: {
                  get: function () {
                    return this.uniforms.red.value;
                  },
                  set: function (t) {
                    this.uniforms.red.value = t;
                  },
                },
                green: {
                  get: function () {
                    return this.uniforms.green.value;
                  },
                  set: function (t) {
                    this.uniforms.green.value = t;
                  },
                },
                blue: {
                  get: function () {
                    return this.uniforms.blue.value;
                  },
                  set: function (t) {
                    this.uniforms.blue.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        96: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float sepia;\n\nconst mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);\n}\n',
                { sepia: { type: '1f', value: 1 } },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                sepia: {
                  get: function () {
                    return this.uniforms.sepia.value;
                  },
                  set: function (t) {
                    this.uniforms.sepia.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        97: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nuniform vec2 center;\nuniform vec3 params; // 10.0, 0.8, 0.1\nuniform float time;\n\nvoid main()\n{\n    vec2 uv = vTextureCoord;\n    vec2 texCoord = uv;\n\n    float dist = distance(uv, center);\n\n    if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )\n    {\n        float diff = (dist - time);\n        float powDiff = 1.0 - pow(abs(diff*params.x), params.y);\n\n        float diffTime = diff  * powDiff;\n        vec2 diffUV = normalize(uv - center);\n        texCoord = uv + (diffUV * diffTime);\n    }\n\n    gl_FragColor = texture2D(uSampler, texCoord);\n}\n',
                {
                  center: { type: 'v2', value: { x: 0.5, y: 0.5 } },
                  params: { type: 'v3', value: { x: 10, y: 0.8, z: 0.1 } },
                  time: { type: '1f', value: 0 },
                },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                center: {
                  get: function () {
                    return this.uniforms.center.value;
                  },
                  set: function (t) {
                    this.uniforms.center.value = t;
                  },
                },
                params: {
                  get: function () {
                    return this.uniforms.params.value;
                  },
                  set: function (t) {
                    this.uniforms.params.value = t;
                  },
                },
                time: {
                  get: function () {
                    return this.uniforms.time.value;
                  },
                  set: function (t) {
                    this.uniforms.time.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        98: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n',
                {
                  blur: { type: '1f', value: 100 },
                  gradientBlur: { type: '1f', value: 600 },
                  start: { type: 'v2', value: { x: 0, y: window.innerHeight / 2 } },
                  end: { type: 'v2', value: { x: 600, y: window.innerHeight / 2 } },
                  delta: { type: 'v2', value: { x: 30, y: 30 } },
                  texSize: { type: 'v2', value: { x: window.innerWidth, y: window.innerHeight } },
                },
              ),
                this.updateDelta();
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.updateDelta = function () {
                (this.uniforms.delta.value.x = 0), (this.uniforms.delta.value.y = 0);
              }),
              Object.defineProperties(i.prototype, {
                blur: {
                  get: function () {
                    return this.uniforms.blur.value;
                  },
                  set: function (t) {
                    this.uniforms.blur.value = t;
                  },
                },
                gradientBlur: {
                  get: function () {
                    return this.uniforms.gradientBlur.value;
                  },
                  set: function (t) {
                    this.uniforms.gradientBlur.value = t;
                  },
                },
                start: {
                  get: function () {
                    return this.uniforms.start.value;
                  },
                  set: function (t) {
                    (this.uniforms.start.value = t), this.updateDelta();
                  },
                },
                end: {
                  get: function () {
                    return this.uniforms.end.value;
                  },
                  set: function (t) {
                    (this.uniforms.end.value = t), this.updateDelta();
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        99: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(this), (this.tiltShiftXFilter = new n()), (this.tiltShiftYFilter = new o());
            }
            var r = t('../../core'),
              n = t('./TiltShiftXFilter'),
              o = t('./TiltShiftYFilter');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.applyFilter = function (t, e, i) {
                var r = t.filterManager.getRenderTarget(!0);
                this.tiltShiftXFilter.applyFilter(t, e, r),
                  this.tiltShiftYFilter.applyFilter(t, r, i),
                  t.filterManager.returnRenderTarget(r);
              }),
              Object.defineProperties(i.prototype, {
                blur: {
                  get: function () {
                    return this.tiltShiftXFilter.blur;
                  },
                  set: function (t) {
                    this.tiltShiftXFilter.blur = this.tiltShiftYFilter.blur = t;
                  },
                },
                gradientBlur: {
                  get: function () {
                    return this.tiltShiftXFilter.gradientBlur;
                  },
                  set: function (t) {
                    this.tiltShiftXFilter.gradientBlur = this.tiltShiftYFilter.gradientBlur = t;
                  },
                },
                start: {
                  get: function () {
                    return this.tiltShiftXFilter.start;
                  },
                  set: function (t) {
                    this.tiltShiftXFilter.start = this.tiltShiftYFilter.start = t;
                  },
                },
                end: {
                  get: function () {
                    return this.tiltShiftXFilter.end;
                  },
                  set: function (t) {
                    this.tiltShiftXFilter.end = this.tiltShiftYFilter.end = t;
                  },
                },
              });
          },
          { '../../core': 20, './TiltShiftXFilter': 100, './TiltShiftYFilter': 101 },
        ],
        100: [
          function (t, e) {
            function i() {
              r.call(this);
            }
            var r = t('./TiltShiftAxisFilter');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.updateDelta = function () {
                var t = this.uniforms.end.value.x - this.uniforms.start.value.x,
                  e = this.uniforms.end.value.y - this.uniforms.start.value.y,
                  i = Math.sqrt(t * t + e * e);
                (this.uniforms.delta.value.x = t / i), (this.uniforms.delta.value.y = e / i);
              });
          },
          { './TiltShiftAxisFilter': 98 },
        ],
        101: [
          function (t, e) {
            function i() {
              r.call(this);
            }
            var r = t('./TiltShiftAxisFilter');
            (i.prototype = Object.create(r.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.updateDelta = function () {
                var t = this.uniforms.end.value.x - this.uniforms.start.value.x,
                  e = this.uniforms.end.value.y - this.uniforms.start.value.y,
                  i = Math.sqrt(t * t + e * e);
                (this.uniforms.delta.value.x = -e / i), (this.uniforms.delta.value.y = t / i);
              });
          },
          { './TiltShiftAxisFilter': 98 },
        ],
        102: [
          function (t, e) {
            function i() {
              r.AbstractFilter.call(
                this,
                null,
                'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\n\nvoid main(void)\n{\n   vec2 coord = vTextureCoord - offset;\n   float dist = length(coord);\n\n   if (dist < radius)\n   {\n       float ratio = (radius - dist) / radius;\n       float angleMod = ratio * ratio * angle;\n       float s = sin(angleMod);\n       float c = cos(angleMod);\n       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n   }\n\n   gl_FragColor = texture2D(uSampler, coord+offset);\n}\n',
                {
                  radius: { type: '1f', value: 0.5 },
                  angle: { type: '1f', value: 5 },
                  offset: { type: 'v2', value: { x: 0.5, y: 0.5 } },
                },
              );
            }
            var r = t('../../core');
            (i.prototype = Object.create(r.AbstractFilter.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                offset: {
                  get: function () {
                    return this.uniforms.offset.value;
                  },
                  set: function (t) {
                    this.uniforms.offset.value = t;
                  },
                },
                radius: {
                  get: function () {
                    return this.uniforms.radius.value;
                  },
                  set: function (t) {
                    this.uniforms.radius.value = t;
                  },
                },
                angle: {
                  get: function () {
                    return this.uniforms.angle.value;
                  },
                  set: function (t) {
                    this.uniforms.angle.value = t;
                  },
                },
              });
          },
          { '../../core': 20 },
        ],
        103: [
          function (t, e) {
            function i() {
              (this.global = new r.math.Point()), (this.target = null), (this.originalEvent = null);
            }
            var r = t('../core');
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.getLocalPosition = function (t, e) {
                var i = t.worldTransform,
                  n = this.global,
                  o = i.a,
                  s = i.c,
                  a = i.tx,
                  h = i.b,
                  l = i.d,
                  u = i.ty,
                  c = 1 / (o * l + s * -h);
                return (
                  (e = e || new r.math.Point()),
                  (e.x = l * c * n.x + -s * c * n.y + (u * s - a * l) * c),
                  (e.y = o * c * n.y + -h * c * n.x + (-u * o + a * h) * c),
                  e
                );
              });
          },
          { '../core': 20 },
        ],
        104: [
          function (t, e) {
            function i(t) {
              (this.renderer = t),
                (this.mouse = new n()),
                (this.eventData = new r.utils.EventData()),
                (this.eventData.data = this.mouse),
                (this.interactiveDataPool = []),
                (this.interactionDOMElement = null),
                (this.eventsAdded = !1),
                (this.onMouseUp = this.onMouseUp.bind(this)),
                (this.processMouseUp = this.processMouseUp.bind(this)),
                (this.onMouseDown = this.onMouseDown.bind(this)),
                (this.processMouseDown = this.processMouseDown.bind(this)),
                (this.onMouseMove = this.onMouseMove.bind(this)),
                (this.processMouseMove = this.processMouseMove.bind(this)),
                (this.onMouseOut = this.onMouseOut.bind(this)),
                (this.processMouseOverOut = this.processMouseOverOut.bind(this)),
                (this.onTouchStart = this.onTouchStart.bind(this)),
                (this.processTouchStart = this.processTouchStart.bind(this)),
                (this.onTouchEnd = this.onTouchEnd.bind(this)),
                (this.processTouchEnd = this.processTouchEnd.bind(this)),
                (this.onTouchMove = this.onTouchMove.bind(this)),
                (this.processTouchMove = this.processTouchMove.bind(this)),
                (this.last = 0),
                (this.currentCursorStyle = 'inherit'),
                (this._tempPoint = new r.math.Point()),
                (this.resolution = 1),
                this.setTargetElement(this.renderer.view, this.renderer.resolution),
                this.update();
            }
            var r = t('../core'),
              n = t('./InteractionData'),
              o = 10,
              s = !0;
            (i.prototype.constructor = i),
              (e.exports = i),
              (i.prototype.setTargetElement = function (t, e) {
                this.removeEvents(), (this.interactionDOMElement = t), (this.resolution = e || 1), this.addEvents();
              }),
              (i.prototype.addEvents = function () {
                this.interactionDOMElement &&
                  (window.navigator.msPointerEnabled &&
                    ((this.interactionDOMElement.style['-ms-content-zooming'] = 'none'),
                    (this.interactionDOMElement.style['-ms-touch-action'] = 'none')),
                  this.interactionDOMElement.addEventListener('mousemove', this.onMouseMove, !0),
                  this.interactionDOMElement.addEventListener('mousedown', this.onMouseDown, !0),
                  this.interactionDOMElement.addEventListener('mouseout', this.onMouseOut, !0),
                  this.interactionDOMElement.addEventListener('touchstart', this.onTouchStart, !0),
                  this.interactionDOMElement.addEventListener('touchend', this.onTouchEnd, !0),
                  this.interactionDOMElement.addEventListener('touchmove', this.onTouchMove, !0),
                  window.addEventListener('mouseup', this.onMouseUp, !0),
                  (this.eventsAdded = !0));
              }),
              (i.prototype.removeEvents = function () {
                this.interactionDOMElement &&
                  (window.navigator.msPointerEnabled &&
                    ((this.interactionDOMElement.style['-ms-content-zooming'] = ''),
                    (this.interactionDOMElement.style['-ms-touch-action'] = '')),
                  this.interactionDOMElement.removeEventListener('mousemove', this.onMouseMove, !0),
                  this.interactionDOMElement.removeEventListener('mousedown', this.onMouseDown, !0),
                  this.interactionDOMElement.removeEventListener('mouseout', this.onMouseOut, !0),
                  this.interactionDOMElement.removeEventListener('touchstart', this.onTouchStart, !0),
                  this.interactionDOMElement.removeEventListener('touchend', this.onTouchEnd, !0),
                  this.interactionDOMElement.removeEventListener('touchmove', this.onTouchMove, !0),
                  (this.interactionDOMElement = null),
                  window.removeEventListener('mouseup', this.onMouseUp, !0),
                  (this.eventsAdded = !1));
              }),
              (i.prototype.update = function () {
                if (
                  (requestAnimationFrame(this.update.bind(this)), !this.throttleUpdate() && this.interactionDOMElement)
                ) {
                  if (this.didMove) return void (this.didMove = !1);
                  (this.cursor = 'inherit'),
                    this.processInteractive(
                      this.mouse.global,
                      this.renderer._lastObjectRendered,
                      this.processMouseOverOut.bind(this),
                      !0,
                    ),
                    this.currentCursorStyle !== this.cursor &&
                      ((this.currentCursorStyle = this.cursor),
                      (this.interactionDOMElement.style.cursor = this.cursor));
                }
              }),
              (i.prototype.dispatchEvent = function (t, e, i) {
                i.stopped || ((i.target = t), (i.type = e), t.emit(e, i), t[e] && t[e](i));
              }),
              (i.prototype.throttleUpdate = function () {
                var t = Date.now(),
                  e = t - this.last;
                return (e = (e * o) / 1e3), 1 > e ? !0 : ((this.last = t), !1);
              }),
              (i.prototype.mapPositionToPoint = function (t, e, i) {
                var r = this.interactionDOMElement.getBoundingClientRect();
                (t.x = ((e - r.left) * (this.interactionDOMElement.width / r.width)) / this.resolution),
                  (t.y = ((i - r.top) * (this.interactionDOMElement.height / r.height)) / this.resolution);
              }),
              (i.prototype.processInteractive = function (t, e, i, r, n) {
                if (!e.visible) return !1;
                var o = e.children,
                  s = !1;
                if (((n = n || e.interactive), e.interactiveChildren))
                  for (var a = o.length - 1; a >= 0; a--)
                    !s && r
                      ? (s = this.processInteractive(t, o[a], i, !0, n))
                      : this.processInteractive(t, o[a], i, !1, !1);
                return (
                  n &&
                    (r &&
                      (e.hitArea
                        ? (e.worldTransform.applyInverse(t, this._tempPoint),
                          (s = e.hitArea.contains(this._tempPoint.x, this._tempPoint.y)))
                        : e.hitTest && (s = e.hitTest(t))),
                    e.interactive && i(e, s)),
                  s
                );
              }),
              (i.prototype.onMouseDown = function (t) {
                (this.mouse.originalEvent = t),
                  (this.eventData.data = this.mouse),
                  (this.eventData.stopped = !1),
                  s && this.mouse.originalEvent.preventDefault(),
                  this.processInteractive(
                    this.mouse.global,
                    this.renderer._lastObjectRendered,
                    this.processMouseDown,
                    !0,
                  );
              }),
              (i.prototype.processMouseDown = function (t, e) {
                var i = this.mouse.originalEvent,
                  r = 2 === i.button || 3 === i.which;
                e &&
                  ((t[r ? '_isRightDown' : '_isLeftDown'] = !0),
                  this.dispatchEvent(t, r ? 'rightdown' : 'mousedown', this.eventData));
              }),
              (i.prototype.onMouseUp = function (t) {
                (this.mouse.originalEvent = t),
                  (this.eventData.data = this.mouse),
                  (this.eventData.stopped = !1),
                  this.processInteractive(
                    this.mouse.global,
                    this.renderer._lastObjectRendered,
                    this.processMouseUp,
                    !0,
                  );
              }),
              (i.prototype.processMouseUp = function (t, e) {
                var i = this.mouse.originalEvent,
                  r = 2 === i.button || 3 === i.which,
                  n = r ? '_isRightDown' : '_isLeftDown';
                e
                  ? (this.dispatchEvent(t, r ? 'rightup' : 'mouseup', this.eventData),
                    t[n] && ((t[n] = !1), this.dispatchEvent(t, r ? 'rightclick' : 'click', this.eventData)))
                  : t[n] &&
                    ((t[n] = !1), this.dispatchEvent(t, r ? 'rightupoutside' : 'mouseupoutside', this.eventData));
              }),
              (i.prototype.onMouseMove = function (t) {
                (this.mouse.originalEvent = t),
                  (this.eventData.data = this.mouse),
                  (this.eventData.stopped = !1),
                  this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY),
                  (this.didMove = !0),
                  (this.cursor = 'inherit'),
                  this.processInteractive(
                    this.mouse.global,
                    this.renderer._lastObjectRendered,
                    this.processMouseMove,
                    !0,
                  ),
                  this.currentCursorStyle !== this.cursor &&
                    ((this.currentCursorStyle = this.cursor), (this.interactionDOMElement.style.cursor = this.cursor));
              }),
              (i.prototype.processMouseMove = function (t, e) {
                this.dispatchEvent(t, 'mousemove', this.eventData), this.processMouseOverOut(t, e);
              }),
              (i.prototype.onMouseOut = function (t) {
                (this.mouse.originalEvent = t),
                  (this.eventData.stopped = !1),
                  (this.interactionDOMElement.style.cursor = 'inherit'),
                  this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY),
                  this.processInteractive(
                    this.mouse.global,
                    this.renderer._lastObjectRendered,
                    this.processMouseOverOut,
                    !1,
                  );
              }),
              (i.prototype.processMouseOverOut = function (t, e) {
                e
                  ? (t._over || ((t._over = !0), this.dispatchEvent(t, 'mouseover', this.eventData)),
                    t.buttonMode && (this.cursor = t.defaultCursor))
                  : t._over && ((t._over = !1), this.dispatchEvent(t, 'mouseout', this.eventData));
              }),
              (i.prototype.onTouchStart = function (t) {
                s && t.preventDefault();
                for (var e = t.changedTouches, i = 0; i < e.length; i++) {
                  var r = e[i],
                    n = this.getTouchData(r);
                  (n.originalEvent = t),
                    (this.eventData.data = n),
                    (this.eventData.stopped = !1),
                    this.processInteractive(n.global, this.renderer._lastObjectRendered, this.processTouchStart, !0),
                    this.returnTouchData(n);
                }
              }),
              (i.prototype.processTouchStart = function (t, e) {
                e && ((t._touchDown = !0), this.dispatchEvent(t, 'touchstart', this.eventData));
              }),
              (i.prototype.onTouchEnd = function (t) {
                s && t.preventDefault();
                for (var e = t.changedTouches, i = 0; i < e.length; i++) {
                  var r = e[i],
                    n = this.getTouchData(r);
                  (n.originalEvent = t),
                    (this.eventData.data = n),
                    (this.eventData.stopped = !1),
                    this.processInteractive(n.global, this.renderer._lastObjectRendered, this.processTouchEnd, !0),
                    this.returnTouchData(n);
                }
              }),
              (i.prototype.processTouchEnd = function (t, e) {
                e
                  ? (this.dispatchEvent(t, 'touchend', this.eventData),
                    t._touchDown && ((t._touchDown = !1), this.dispatchEvent(t, 'tap', this.eventData)))
                  : t._touchDown && ((t._touchDown = !1), this.dispatchEvent(t, 'touchendoutside', this.eventData));
              }),
              (i.prototype.onTouchMove = function (t) {
                s && t.preventDefault();
                for (var e = t.changedTouches, i = 0; i < e.length; i++) {
                  var r = e[i],
                    n = this.getTouchData(r);
                  (n.originalEvent = t),
                    (this.eventData.data = n),
                    (this.eventData.stopped = !1),
                    this.processInteractive(n.global, this.renderer._lastObjectRendered, this.processTouchMove, !1),
                    this.returnTouchData(n);
                }
              }),
              (i.prototype.processTouchMove = function (t, e) {
                (e = e), this.dispatchEvent(t, 'touchmove', this.eventData);
              }),
              (i.prototype.getTouchData = function (t) {
                var e = this.interactiveDataPool.pop();
                return (
                  e || (e = new n()),
                  (e.identifier = t.identifier),
                  this.mapPositionToPoint(e.global, t.clientX, t.clientY),
                  e
                );
              }),
              (i.prototype.returnTouchData = function (t) {
                this.interactiveDataPool.push(t);
              }),
              r.WebGLRenderer.registerPlugin('interaction', i),
              r.CanvasRenderer.registerPlugin('interaction', i);
          },
          { '../core': 20, './InteractionData': 103 },
        ],
        105: [
          function (t, e) {
            e.exports = {
              InteractionData: t('./InteractionData'),
              InteractionManager: t('./InteractionManager'),
              interactiveTarget: t('./interactiveTarget'),
            };
          },
          { './InteractionData': 103, './InteractionManager': 104, './interactiveTarget': 106 },
        ],
        106: [
          function (t, e) {
            var i = t('../core'),
              r = new i.math.Point();
            (i.DisplayObject.prototype.interactive = !1),
              (i.DisplayObject.prototype.buttonMode = !1),
              (i.DisplayObject.prototype.interactiveChildren = !0),
              (i.DisplayObject.prototype.defaultCursor = 'pointer'),
              (i.DisplayObject.prototype._over = !1),
              (i.DisplayObject.prototype._touchDown = !1),
              (i.Sprite.prototype.hitTest = function (t) {
                this.worldTransform.applyInverse(t, r);
                var e,
                  i = this._texture._frame.width,
                  n = this._texture._frame.height,
                  o = -i * this.anchor.x;
                return r.x > o && r.x < o + i && ((e = -n * this.anchor.y), r.y > e && r.y < e + n) ? !0 : !1;
              }),
              (i.Graphics.prototype.hitTest = function (t) {
                this.worldTransform.applyInverse(t, r);
                for (var e = this.graphicsData, i = 0; i < e.length; i++) {
                  var n = e[i];
                  if (n.fill && n.shape && n.shape.contains(r.x, r.y)) return !0;
                }
                return !1;
              }),
              (e.exports = {});
          },
          { '../core': 20 },
        ],
        107: [
          function (t, e) {
            var i = t('resource-loader'),
              r = t('./textureParser'),
              n = t('./spritesheetParser'),
              o = t('./spineAtlasParser'),
              s = t('./bitmapFontParser'),
              a = function () {
                i.call(this),
                  this.use(i.middleware.parsing.json())
                    .use(i.middleware.parsing.blob())
                    .use(r())
                    .use(n())
                    .use(o())
                    .use(s());
              };
            (a.prototype = Object.create(i.prototype)), (a.prototype.constructor = a), (e.exports = a);
          },
          {
            './bitmapFontParser': 108,
            './spineAtlasParser': 110,
            './spritesheetParser': 111,
            './textureParser': 112,
            'resource-loader': 8,
          },
        ],
        108: [
          function (t, e) {
            var i = t('resource-loader').Resource,
              r = t('../core');
            e.exports = function () {
              return function (t, e) {
                if (!t.data || navigator.isCocoonJS)
                  if (window.DOMParser) {
                    var n = new DOMParser();
                    t.data = n.parseFromString(this.xhr.responseText, 'text/xml');
                  } else {
                    var o = document.createElement('div');
                    (o.innerHTML = this.xhr.responseText), (t.data = o);
                  }
                var s = t.data.nodeName;
                if (!t.data || !s || '#document' !== s.toLowerCase() || 'div' !== s.toLowerCase()) return e();
                var a = this.baseUrl + t.data.getElementsByTagName('page')[0].getAttribute('file'),
                  h = { crossOrigin: t.crossOrigin, loadType: i.LOAD_TYPE.IMAGE };
                this.add(t.name + '_image', a, h, function (i) {
                  var n = {},
                    o = t.data.getElementsByTagName('info')[0],
                    s = t.data.getElementsByTagName('common')[0];
                  (n.font = o.getAttribute('face')),
                    (n.size = parseInt(o.getAttribute('size'), 10)),
                    (n.lineHeight = parseInt(s.getAttribute('lineHeight'), 10)),
                    (n.chars = {});
                  for (var a = t.data.getElementsByTagName('char'), h = 0; h < a.length; h++) {
                    var l = parseInt(a[h].getAttribute('id'), 10),
                      u = new r.math.Rectangle(
                        parseInt(a[h].getAttribute('x'), 10),
                        parseInt(a[h].getAttribute('y'), 10),
                        parseInt(a[h].getAttribute('width'), 10),
                        parseInt(a[h].getAttribute('height'), 10),
                      );
                    n.chars[l] = {
                      xOffset: parseInt(a[h].getAttribute('xoffset'), 10),
                      yOffset: parseInt(a[h].getAttribute('yoffset'), 10),
                      xAdvance: parseInt(a[h].getAttribute('xadvance'), 10),
                      kerning: {},
                      texture: (r.utils.TextureCache[l] = new r.Texture(i.texture.baseTexture, u)),
                    };
                  }
                  var c = t.data.getElementsByTagName('kerning');
                  for (h = 0; h < c.length; h++) {
                    var d = parseInt(c[h].getAttribute('first'), 10),
                      p = parseInt(c[h].getAttribute('second'), 10),
                      f = parseInt(c[h].getAttribute('amount'), 10);
                    n.chars[p].kerning[d] = f;
                  }
                  (t.bitmapFont = n), e();
                });
              };
            };
          },
          { '../core': 20, 'resource-loader': 8 },
        ],
        109: [
          function (t, e) {
            e.exports = {
              Loader: t('./Loader'),
              bitmapFontParser: t('./bitmapFontParser'),
              spineAtlasParser: t('./spineAtlasParser'),
              spritesheetParser: t('./spritesheetParser'),
              textureParser: t('./textureParser'),
            };
          },
          {
            './Loader': 107,
            './bitmapFontParser': 108,
            './spineAtlasParser': 110,
            './spritesheetParser': 111,
            './textureParser': 112,
          },
        ],
        110: [
          function (t, e) {
            var i = t('resource-loader').Resource,
              r = t('async'),
              n = t('../spine');
            e.exports = function () {
              return function (t, e) {
                if (t.data && t.data.bones) {
                  var o = t.url.substr(0, t.url.lastIndexOf('.')) + '.atlas',
                    s = { crossOrigin: t.crossOrigin, xhrType: i.XHR_RESPONSE_TYPE.TEXT };
                  this.add(t.name + '_atlas', o, s, function (i) {
                    var o = new n.Atlas(this.ajaxRequest.responseText, this.baseUrl, i.crossOrigin),
                      s = new n.SkeletonJsonParser(new n.AtlasAttachmentParser(o)),
                      a = s.readSkeletonData(t.data);
                    (t.spine = a),
                      (t.spineAtlas = o),
                      r.each(
                        o.pages,
                        function (t, e) {
                          t.rendererObject.hasLoaded ? e() : t.rendererObject.once('loaded', e);
                        },
                        e,
                      );
                  });
                } else e();
              };
            };
          },
          { '../spine': 115, async: 2, 'resource-loader': 8 },
        ],
        111: [
          function (t, e) {
            var i = t('resource-loader').Resource,
              r = t('path'),
              n = t('../core');
            e.exports = function () {
              return function (t, e) {
                if (t.data && t.data.frames) {
                  var o = { crossOrigin: t.crossOrigin, loadType: i.LOAD_TYPE.IMAGE },
                    s = r.dirname(t.url.replace(this.baseUrl, '')),
                    a = n.utils.getResolutionOfUrl(t.url);
                  this.add(t.name + '_image', this.baseUrl + s + '/' + t.data.meta.image, o, function (i) {
                    t.textures = {};
                    var r = t.data.frames;
                    for (var o in r) {
                      var s = r[o].frame;
                      if (s) {
                        var h = null,
                          l = null;
                        if (
                          ((h = r[o].rotated
                            ? new n.math.Rectangle(s.x, s.y, s.h, s.w)
                            : new n.math.Rectangle(s.x, s.y, s.w, s.h)),
                          r[o].trimmed &&
                            (l = new n.math.Rectangle(
                              r[o].spriteSourceSize.x / a,
                              r[o].spriteSourceSize.y / a,
                              r[o].sourceSize.w / a,
                              r[o].sourceSize.h / a,
                            )),
                          r[o].rotated)
                        ) {
                          var u = h.width;
                          (h.width = h.height), (h.height = u);
                        }
                        (h.x /= a),
                          (h.y /= a),
                          (h.width /= a),
                          (h.height /= a),
                          (t.textures[o] = new n.Texture(i.texture.baseTexture, h, h.clone(), l, r[o].rotated)),
                          (n.utils.TextureCache[o] = t.textures[o]);
                      }
                    }
                    e();
                  });
                } else e();
              };
            };
          },
          { '../core': 20, path: 3, 'resource-loader': 8 },
        ],
        112: [
          function (t, e) {
            var i = t('../core');
            e.exports = function () {
              return function (t, e) {
                t.data &&
                  t.data.nodeName &&
                  'img' === t.data.nodeName.toLowerCase() &&
                  ((t.texture = new i.Texture(new i.BaseTexture(t.data, null, i.utils.getResolutionOfUrl(t.url)))),
                  (i.utils.TextureCache[t.url] = t.texture)),
                  e();
              };
            };
          },
          { '../core': 20 },
        ],
        113: [
          function (t, e) {
            function i(t) {
              if ((r.Container.call(this), !t)) throw new Error('The spineData param is required.');
              (this.spineData = t),
                (this.skeleton = new n.Skeleton(t)),
                this.skeleton.updateWorldTransform(),
                (this.stateData = new n.AnimationStateData(t)),
                (this.state = new n.AnimationState(this.stateData)),
                (this.slotContainers = []);
              for (var e = 0, i = this.skeleton.drawOrder.length; i > e; e++) {
                var o = this.skeleton.drawOrder[e],
                  s = o.attachment,
                  a = new r.Container();
                if ((this.slotContainers.push(a), this.addChild(a), s instanceof n.RegionAttachment)) {
                  var h = s.rendererObject.name,
                    l = this.createSprite(o, s);
                  (o.currentSprite = l), (o.currentSpriteName = h), a.addChild(l);
                } else {
                  if (!(s instanceof n.MeshAttachment)) continue;
                  var u = this.createMesh(o, s);
                  (o.currentMesh = u), (o.currentMeshName = s.name), a.addChild(u);
                }
              }
              this.autoUpdate = !0;
            }
            var r = t('../core'),
              n = t('./SpineRuntime');
            (n.Bone.yDown = !0),
              (i.prototype = Object.create(r.Container.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                autoUpdate: {
                  get: function () {
                    return this.updateTransform === i.prototype.autoUpdateTransform;
                  },
                  set: function (t) {
                    this.updateTransform = t ? i.prototype.autoUpdateTransform : r.Container.prototype.updateTransform;
                  },
                },
              }),
              (i.prototype.update = function (t) {
                this.state.update(t), this.state.apply(this.skeleton), this.skeleton.updateWorldTransform();
                for (var e = this.skeleton.drawOrder, i = 0, o = e.length; o > i; i++) {
                  var s = e[i],
                    a = s.attachment,
                    h = this.slotContainers[i];
                  if (a) {
                    var l = a.type;
                    if (l === n.AttachmentType.region) {
                      if (a.rendererObject && (!s.currentSpriteName || s.currentSpriteName !== a.rendererObject.name)) {
                        var u = a.rendererObject.name;
                        if (
                          (void 0 !== s.currentSprite && (s.currentSprite.visible = !1),
                          (s.sprites = s.sprites || {}),
                          void 0 !== s.sprites[u])
                        )
                          s.sprites[u].visible = !0;
                        else {
                          var c = this.createSprite(s, a);
                          h.addChild(c);
                        }
                        (s.currentSprite = s.sprites[u]), (s.currentSpriteName = u);
                      }
                      var d = s.bone;
                      (h.position.x = d.worldX + a.x * d.m00 + a.y * d.m01),
                        (h.position.y = d.worldY + a.x * d.m10 + a.y * d.m11),
                        (h.scale.x = d.worldScaleX),
                        (h.scale.y = d.worldScaleY),
                        (h.rotation = -(s.bone.worldRotation * n.degRad)),
                        (s.currentSprite.tint = r.utils.rgb2hex([s.r, s.g, s.b]));
                    } else {
                      if (l !== n.AttachmentType.skinnedmesh) {
                        h.visible = !1;
                        continue;
                      }
                      if (!s.currentMeshName || s.currentMeshName !== a.name) {
                        var p = a.name;
                        if (
                          (void 0 !== s.currentMesh && (s.currentMesh.visible = !1),
                          (s.meshes = s.meshes || {}),
                          void 0 !== s.meshes[p])
                        )
                          s.meshes[p].visible = !0;
                        else {
                          var f = this.createMesh(s, a);
                          h.addChild(f);
                        }
                        (s.currentMesh = s.meshes[p]), (s.currentMeshName = p);
                      }
                      a.computeWorldVertices(s.bone.skeleton.x, s.bone.skeleton.y, s, s.currentMesh.vertices);
                    }
                    (h.visible = !0), (h.alpha = s.a);
                  } else h.visible = !1;
                }
              }),
              (i.prototype.autoUpdateTransform = function () {
                this.lastTime = this.lastTime || Date.now();
                var t = 0.001 * (Date.now() - this.lastTime);
                (this.lastTime = Date.now()), this.update(t), r.Container.prototype.updateTransform.call(this);
              }),
              (i.prototype.createSprite = function (t, e) {
                var i = e.rendererObject,
                  o = i.page.rendererObject,
                  s = new r.math.Rectangle(i.x, i.y, i.rotate ? i.height : i.width, i.rotate ? i.width : i.height),
                  a = new r.Texture(o, s),
                  h = new r.Sprite(a),
                  l = i.rotate ? 0.5 * Math.PI : 0;
                return (
                  h.scale.set(i.width / i.originalWidth, i.height / i.originalHeight),
                  (h.rotation = l - e.rotation * n.degRad),
                  (h.anchor.x = h.anchor.y = 0.5),
                  (t.sprites = t.sprites || {}),
                  (t.sprites[i.name] = h),
                  h
                );
              }),
              (i.prototype.createMesh = function (t, e) {
                var i = e.rendererObject,
                  n = i.page.rendererObject,
                  o = new r.Texture(n),
                  s = new r.Strip(o);
                return (
                  (s.drawMode = r.Strip.DrawModes.TRIANGLES),
                  (s.canvasPadding = 1.5),
                  (s.vertices = new Float32Array(e.uvs.length)),
                  (s.uvs = e.uvs),
                  (s.indices = e.triangles),
                  (t.meshes = t.meshes || {}),
                  (t.meshes[e.name] = s),
                  s
                );
              });
          },
          { '../core': 20, './SpineRuntime': 114 },
        ],
        114: [
          function (t, e) {
            var i = t('../core'),
              r = (e.exports = {
                radDeg: 180 / Math.PI,
                degRad: Math.PI / 180,
                temp: [],
                Float32Array: 'undefined' == typeof Float32Array ? Array : Float32Array,
                Uint16Array: 'undefined' == typeof Uint16Array ? Array : Uint16Array,
              });
            (r.BoneData = function (t, e) {
              (this.name = t), (this.parent = e);
            }),
              (r.BoneData.prototype = {
                length: 0,
                x: 0,
                y: 0,
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                inheritScale: !0,
                inheritRotation: !0,
                flipX: !1,
                flipY: !1,
              }),
              (r.SlotData = function (t, e) {
                (this.name = t), (this.boneData = e);
              }),
              (r.SlotData.prototype = { r: 1, g: 1, b: 1, a: 1, attachmentName: null, additiveBlending: !1 }),
              (r.IkConstraintData = function (t) {
                (this.name = t), (this.bones = []);
              }),
              (r.IkConstraintData.prototype = { target: null, bendDirection: 1, mix: 1 }),
              (r.Bone = function (t, e, i) {
                (this.data = t), (this.skeleton = e), (this.parent = i), this.setToSetupPose();
              }),
              (r.Bone.yDown = !1),
              (r.Bone.prototype = {
                x: 0,
                y: 0,
                rotation: 0,
                rotationIK: 0,
                scaleX: 1,
                scaleY: 1,
                flipX: !1,
                flipY: !1,
                m00: 0,
                m01: 0,
                worldX: 0,
                m10: 0,
                m11: 0,
                worldY: 0,
                worldRotation: 0,
                worldScaleX: 1,
                worldScaleY: 1,
                worldFlipX: !1,
                worldFlipY: !1,
                updateWorldTransform: function () {
                  var t = this.parent;
                  if (t)
                    (this.worldX = this.x * t.m00 + this.y * t.m01 + t.worldX),
                      (this.worldY = this.x * t.m10 + this.y * t.m11 + t.worldY),
                      this.data.inheritScale
                        ? ((this.worldScaleX = t.worldScaleX * this.scaleX),
                          (this.worldScaleY = t.worldScaleY * this.scaleY))
                        : ((this.worldScaleX = this.scaleX), (this.worldScaleY = this.scaleY)),
                      (this.worldRotation = this.data.inheritRotation
                        ? t.worldRotation + this.rotationIK
                        : this.rotationIK),
                      (this.worldFlipX = t.worldFlipX != this.flipX),
                      (this.worldFlipY = t.worldFlipY != this.flipY);
                  else {
                    var e = this.skeleton.flipX,
                      i = this.skeleton.flipY;
                    (this.worldX = e ? -this.x : this.x),
                      (this.worldY = i != r.Bone.yDown ? -this.y : this.y),
                      (this.worldScaleX = this.scaleX),
                      (this.worldScaleY = this.scaleY),
                      (this.worldRotation = this.rotationIK),
                      (this.worldFlipX = e != this.flipX),
                      (this.worldFlipY = i != this.flipY);
                  }
                  var n = this.worldRotation * r.degRad,
                    o = Math.cos(n),
                    s = Math.sin(n);
                  this.worldFlipX
                    ? ((this.m00 = -o * this.worldScaleX), (this.m01 = s * this.worldScaleY))
                    : ((this.m00 = o * this.worldScaleX), (this.m01 = -s * this.worldScaleY)),
                    this.worldFlipY != r.Bone.yDown
                      ? ((this.m10 = -s * this.worldScaleX), (this.m11 = -o * this.worldScaleY))
                      : ((this.m10 = s * this.worldScaleX), (this.m11 = o * this.worldScaleY));
                },
                setToSetupPose: function () {
                  var t = this.data;
                  (this.x = t.x),
                    (this.y = t.y),
                    (this.rotation = t.rotation),
                    (this.rotationIK = this.rotation),
                    (this.scaleX = t.scaleX),
                    (this.scaleY = t.scaleY),
                    (this.flipX = t.flipX),
                    (this.flipY = t.flipY);
                },
                worldToLocal: function (t) {
                  var e = t[0] - this.worldX,
                    i = t[1] - this.worldY,
                    n = this.m00,
                    o = this.m10,
                    s = this.m01,
                    a = this.m11;
                  this.worldFlipX != (this.worldFlipY != r.Bone.yDown) && ((n = -n), (a = -a));
                  var h = 1 / (n * a - s * o);
                  (t[0] = e * n * h - i * s * h), (t[1] = i * a * h - e * o * h);
                },
                localToWorld: function (t) {
                  var e = t[0],
                    i = t[1];
                  (t[0] = e * this.m00 + i * this.m01 + this.worldX),
                    (t[1] = e * this.m10 + i * this.m11 + this.worldY);
                },
              }),
              (r.Slot = function (t, e) {
                (this.data = t), (this.bone = e), this.setToSetupPose();
              }),
              (r.Slot.prototype = {
                r: 1,
                g: 1,
                b: 1,
                a: 1,
                _attachmentTime: 0,
                attachment: null,
                attachmentVertices: [],
                setAttachment: function (t) {
                  (this.attachment = t),
                    (this._attachmentTime = this.bone.skeleton.time),
                    (this.attachmentVertices.length = 0);
                },
                setAttachmentTime: function (t) {
                  this._attachmentTime = this.bone.skeleton.time - t;
                },
                getAttachmentTime: function () {
                  return this.bone.skeleton.time - this._attachmentTime;
                },
                setToSetupPose: function () {
                  var t = this.data;
                  (this.r = t.r), (this.g = t.g), (this.b = t.b), (this.a = t.a);
                  for (var e = this.bone.skeleton.data.slots, i = 0, r = e.length; r > i; i++)
                    if (e[i] == t) {
                      this.setAttachment(
                        t.attachmentName ? this.bone.skeleton.getAttachmentBySlotIndex(i, t.attachmentName) : null,
                      );
                      break;
                    }
                },
              }),
              (r.IkConstraint = function (t, e) {
                (this.data = t), (this.mix = t.mix), (this.bendDirection = t.bendDirection), (this.bones = []);
                for (var i = 0, r = t.bones.length; r > i; i++) this.bones.push(e.findBone(t.bones[i].name));
                this.target = e.findBone(t.target.name);
              }),
              (r.IkConstraint.prototype = {
                apply: function () {
                  var t = this.target,
                    e = this.bones;
                  switch (e.length) {
                    case 1:
                      r.IkConstraint.apply1(e[0], t.worldX, t.worldY, this.mix);
                      break;
                    case 2:
                      r.IkConstraint.apply2(e[0], e[1], t.worldX, t.worldY, this.bendDirection, this.mix);
                  }
                },
              }),
              (r.IkConstraint.apply1 = function (t, e, i, n) {
                var o = t.data.inheritRotation && t.parent ? t.parent.worldRotation : 0,
                  s = t.rotation,
                  a = Math.atan2(i - t.worldY, e - t.worldX) * r.radDeg - o;
                t.rotationIK = s + (a - s) * n;
              }),
              (r.IkConstraint.apply2 = function (t, e, i, n, o, s) {
                var a = e.rotation,
                  h = t.rotation;
                if (!s) return (e.rotationIK = a), void (t.rotationIK = h);
                var l,
                  u,
                  c = r.temp,
                  d = t.parent;
                d
                  ? ((c[0] = i),
                    (c[1] = n),
                    d.worldToLocal(c),
                    (i = (c[0] - t.x) * d.worldScaleX),
                    (n = (c[1] - t.y) * d.worldScaleY))
                  : ((i -= t.x), (n -= t.y)),
                  e.parent == t
                    ? ((l = e.x), (u = e.y))
                    : ((c[0] = e.x), (c[1] = e.y), e.parent.localToWorld(c), t.worldToLocal(c), (l = c[0]), (u = c[1]));
                var p = l * t.worldScaleX,
                  f = u * t.worldScaleY,
                  m = Math.atan2(f, p),
                  v = Math.sqrt(p * p + f * f),
                  g = e.data.length * e.worldScaleX,
                  y = 2 * v * g;
                if (1e-4 > y) return void (e.rotationIK = a + (Math.atan2(n, i) * r.radDeg - h - a) * s);
                var x = (i * i + n * n - v * v - g * g) / y;
                -1 > x ? (x = -1) : x > 1 && (x = 1);
                var _ = Math.acos(x) * o,
                  b = v + g * x,
                  w = g * Math.sin(_),
                  T = Math.atan2(n * b - i * w, i * b + n * w),
                  S = (T - m) * r.radDeg - h;
                S > 180 ? (S -= 360) : -180 > S && (S += 360),
                  (t.rotationIK = h + S * s),
                  (S = (_ + m) * r.radDeg - a),
                  S > 180 ? (S -= 360) : -180 > S && (S += 360),
                  (e.rotationIK = a + (S + t.worldRotation - e.parent.worldRotation) * s);
              }),
              (r.Skin = function (t) {
                (this.name = t), (this.attachments = {});
              }),
              (r.Skin.prototype = {
                addAttachment: function (t, e, i) {
                  this.attachments[t + ':' + e] = i;
                },
                getAttachment: function (t, e) {
                  return this.attachments[t + ':' + e];
                },
                _attachAll: function (t, e) {
                  for (var i in e.attachments) {
                    var r = i.indexOf(':'),
                      n = parseInt(i.substring(0, r)),
                      o = i.substring(r + 1),
                      s = t.slots[n];
                    if (s.attachment && s.attachment.name == o) {
                      var a = this.getAttachment(n, o);
                      a && s.setAttachment(a);
                    }
                  }
                },
              }),
              (r.Animation = function (t, e, i) {
                (this.name = t), (this.timelines = e), (this.duration = i);
              }),
              (r.Animation.prototype = {
                apply: function (t, e, i, r, n) {
                  r && 0 != this.duration && ((i %= this.duration), (e %= this.duration));
                  for (var o = this.timelines, s = 0, a = o.length; a > s; s++) o[s].apply(t, e, i, n, 1);
                },
                mix: function (t, e, i, r, n, o) {
                  r && 0 != this.duration && ((i %= this.duration), (e %= this.duration));
                  for (var s = this.timelines, a = 0, h = s.length; h > a; a++) s[a].apply(t, e, i, n, o);
                },
              }),
              (r.Animation.binarySearch = function (t, e, i) {
                var r = 0,
                  n = Math.floor(t.length / i) - 2;
                if (!n) return i;
                for (var o = n >>> 1; ; ) {
                  if ((t[(o + 1) * i] <= e ? (r = o + 1) : (n = o), r == n)) return (r + 1) * i;
                  o = (r + n) >>> 1;
                }
              }),
              (r.Animation.binarySearch1 = function (t, e) {
                var i = 0,
                  r = t.length - 2;
                if (!r) return 1;
                for (var n = r >>> 1; ; ) {
                  if ((t[n + 1] <= e ? (i = n + 1) : (r = n), i == r)) return i + 1;
                  n = (i + r) >>> 1;
                }
              }),
              (r.Animation.linearSearch = function (t, e, i) {
                for (var r = 0, n = t.length - i; n >= r; r += i) if (t[r] > e) return r;
                return -1;
              }),
              (r.Curves = function () {
                this.curves = [];
              }),
              (r.Curves.prototype = {
                setLinear: function (t) {
                  this.curves[19 * t] = 0;
                },
                setStepped: function (t) {
                  this.curves[19 * t] = 1;
                },
                setCurve: function (t, e, i, r, n) {
                  var o = 0.1,
                    s = o * o,
                    a = s * o,
                    h = 3 * o,
                    l = 3 * s,
                    u = 6 * s,
                    c = 6 * a,
                    d = 2 * -e + r,
                    p = 2 * -i + n,
                    f = 3 * (e - r) + 1,
                    m = 3 * (i - n) + 1,
                    v = e * h + d * l + f * a,
                    g = i * h + p * l + m * a,
                    y = d * u + f * c,
                    x = p * u + m * c,
                    _ = f * c,
                    b = m * c,
                    w = 19 * t,
                    T = this.curves;
                  T[w++] = 2;
                  for (var S = v, E = g, A = w + 19 - 1; A > w; w += 2)
                    (T[w] = S), (T[w + 1] = E), (v += y), (g += x), (y += _), (x += b), (S += v), (E += g);
                },
                getCurvePercent: function (t, e) {
                  e = 0 > e ? 0 : e > 1 ? 1 : e;
                  var i = this.curves,
                    r = 19 * t,
                    n = i[r];
                  if (0 === n) return e;
                  if (1 == n) return 0;
                  r++;
                  for (var o = 0, s = r, a = r + 19 - 1; a > r; r += 2)
                    if (((o = i[r]), o >= e)) {
                      var h, l;
                      return (
                        r == s ? ((h = 0), (l = 0)) : ((h = i[r - 2]), (l = i[r - 1])),
                        l + ((i[r + 1] - l) * (e - h)) / (o - h)
                      );
                    }
                  var u = i[r - 1];
                  return u + ((1 - u) * (e - o)) / (1 - o);
                },
              }),
              (r.RotateTimeline = function (t) {
                (this.curves = new r.Curves(t)), (this.frames = []), (this.frames.length = 2 * t);
              }),
              (r.RotateTimeline.prototype = {
                boneIndex: 0,
                getFrameCount: function () {
                  return this.frames.length / 2;
                },
                setFrame: function (t, e, i) {
                  (t *= 2), (this.frames[t] = e), (this.frames[t + 1] = i);
                },
                apply: function (t, e, i, n, o) {
                  var s = this.frames;
                  if (!(i < s[0])) {
                    var a = t.bones[this.boneIndex];
                    if (i >= s[s.length - 2]) {
                      for (var h = a.data.rotation + s[s.length - 1] - a.rotation; h > 180; ) h -= 360;
                      for (; -180 > h; ) h += 360;
                      return void (a.rotation += h * o);
                    }
                    var l = r.Animation.binarySearch(s, i, 2),
                      u = s[l - 1],
                      c = s[l],
                      d = 1 - (i - c) / (s[l - 2] - c);
                    d = this.curves.getCurvePercent(l / 2 - 1, d);
                    for (var h = s[l + 1] - u; h > 180; ) h -= 360;
                    for (; -180 > h; ) h += 360;
                    for (h = a.data.rotation + (u + h * d) - a.rotation; h > 180; ) h -= 360;
                    for (; -180 > h; ) h += 360;
                    a.rotation += h * o;
                  }
                },
              }),
              (r.TranslateTimeline = function (t) {
                (this.curves = new r.Curves(t)), (this.frames = []), (this.frames.length = 3 * t);
              }),
              (r.TranslateTimeline.prototype = {
                boneIndex: 0,
                getFrameCount: function () {
                  return this.frames.length / 3;
                },
                setFrame: function (t, e, i, r) {
                  (t *= 3), (this.frames[t] = e), (this.frames[t + 1] = i), (this.frames[t + 2] = r);
                },
                apply: function (t, e, i, n, o) {
                  var s = this.frames;
                  if (!(i < s[0])) {
                    var a = t.bones[this.boneIndex];
                    if (i >= s[s.length - 3])
                      return (
                        (a.x += (a.data.x + s[s.length - 2] - a.x) * o),
                        void (a.y += (a.data.y + s[s.length - 1] - a.y) * o)
                      );
                    var h = r.Animation.binarySearch(s, i, 3),
                      l = s[h - 2],
                      u = s[h - 1],
                      c = s[h],
                      d = 1 - (i - c) / (s[h + -3] - c);
                    (d = this.curves.getCurvePercent(h / 3 - 1, d)),
                      (a.x += (a.data.x + l + (s[h + 1] - l) * d - a.x) * o),
                      (a.y += (a.data.y + u + (s[h + 2] - u) * d - a.y) * o);
                  }
                },
              }),
              (r.ScaleTimeline = function (t) {
                (this.curves = new r.Curves(t)), (this.frames = []), (this.frames.length = 3 * t);
              }),
              (r.ScaleTimeline.prototype = {
                boneIndex: 0,
                getFrameCount: function () {
                  return this.frames.length / 3;
                },
                setFrame: function (t, e, i, r) {
                  (t *= 3), (this.frames[t] = e), (this.frames[t + 1] = i), (this.frames[t + 2] = r);
                },
                apply: function (t, e, i, n, o) {
                  var s = this.frames;
                  if (!(i < s[0])) {
                    var a = t.bones[this.boneIndex];
                    if (i >= s[s.length - 3])
                      return (
                        (a.scaleX += (a.data.scaleX * s[s.length - 2] - a.scaleX) * o),
                        void (a.scaleY += (a.data.scaleY * s[s.length - 1] - a.scaleY) * o)
                      );
                    var h = r.Animation.binarySearch(s, i, 3),
                      l = s[h - 2],
                      u = s[h - 1],
                      c = s[h],
                      d = 1 - (i - c) / (s[h + -3] - c);
                    (d = this.curves.getCurvePercent(h / 3 - 1, d)),
                      (a.scaleX += (a.data.scaleX * (l + (s[h + 1] - l) * d) - a.scaleX) * o),
                      (a.scaleY += (a.data.scaleY * (u + (s[h + 2] - u) * d) - a.scaleY) * o);
                  }
                },
              }),
              (r.ColorTimeline = function (t) {
                (this.curves = new r.Curves(t)), (this.frames = []), (this.frames.length = 5 * t);
              }),
              (r.ColorTimeline.prototype = {
                slotIndex: 0,
                getFrameCount: function () {
                  return this.frames.length / 5;
                },
                setFrame: function (t, e, i, r, n, o) {
                  (t *= 5),
                    (this.frames[t] = e),
                    (this.frames[t + 1] = i),
                    (this.frames[t + 2] = r),
                    (this.frames[t + 3] = n),
                    (this.frames[t + 4] = o);
                },
                apply: function (t, e, i, n, o) {
                  var s = this.frames;
                  if (!(i < s[0])) {
                    var a, h, l, u;
                    if (i >= s[s.length - 5]) {
                      var c = s.length - 1;
                      (a = s[c - 3]), (h = s[c - 2]), (l = s[c - 1]), (u = s[c]);
                    } else {
                      var d = r.Animation.binarySearch(s, i, 5),
                        p = s[d - 4],
                        f = s[d - 3],
                        m = s[d - 2],
                        v = s[d - 1],
                        g = s[d],
                        y = 1 - (i - g) / (s[d - 5] - g);
                      (y = this.curves.getCurvePercent(d / 5 - 1, y)),
                        (a = p + (s[d + 1] - p) * y),
                        (h = f + (s[d + 2] - f) * y),
                        (l = m + (s[d + 3] - m) * y),
                        (u = v + (s[d + 4] - v) * y);
                    }
                    var x = t.slots[this.slotIndex];
                    1 > o
                      ? ((x.r += (a - x.r) * o), (x.g += (h - x.g) * o), (x.b += (l - x.b) * o), (x.a += (u - x.a) * o))
                      : ((x.r = a), (x.g = h), (x.b = l), (x.a = u));
                  }
                },
              }),
              (r.AttachmentTimeline = function (t) {
                (this.curves = new r.Curves(t)),
                  (this.frames = []),
                  (this.frames.length = t),
                  (this.attachmentNames = []),
                  (this.attachmentNames.length = t);
              }),
              (r.AttachmentTimeline.prototype = {
                slotIndex: 0,
                getFrameCount: function () {
                  return this.frames.length;
                },
                setFrame: function (t, e, i) {
                  (this.frames[t] = e), (this.attachmentNames[t] = i);
                },
                apply: function (t, e, i) {
                  var n = this.frames;
                  if (i < n[0]) return void (e > i && this.apply(t, e, Number.MAX_VALUE, null, 0));
                  e > i && (e = -1);
                  var o = i >= n[n.length - 1] ? n.length - 1 : r.Animation.binarySearch1(n, i) - 1;
                  if (!(n[o] < e)) {
                    var s = this.attachmentNames[o];
                    t.slots[this.slotIndex].setAttachment(s ? t.getAttachmentBySlotIndex(this.slotIndex, s) : null);
                  }
                },
              }),
              (r.EventTimeline = function (t) {
                (this.frames = []), (this.frames.length = t), (this.events = []), (this.events.length = t);
              }),
              (r.EventTimeline.prototype = {
                getFrameCount: function () {
                  return this.frames.length;
                },
                setFrame: function (t, e, i) {
                  (this.frames[t] = e), (this.events[t] = i);
                },
                apply: function (t, e, i, n, o) {
                  if (n) {
                    var s = this.frames,
                      a = s.length;
                    if (e > i) this.apply(t, e, Number.MAX_VALUE, n, o), (e = -1);
                    else if (e >= s[a - 1]) return;
                    if (!(i < s[0])) {
                      var h;
                      if (e < s[0]) h = 0;
                      else {
                        h = r.Animation.binarySearch1(s, e);
                        for (var l = s[h]; h > 0 && s[h - 1] == l; ) h--;
                      }
                      for (var u = this.events; a > h && i >= s[h]; h++) n.push(u[h]);
                    }
                  }
                },
              }),
              (r.DrawOrderTimeline = function (t) {
                (this.frames = []), (this.frames.length = t), (this.drawOrders = []), (this.drawOrders.length = t);
              }),
              (r.DrawOrderTimeline.prototype = {
                getFrameCount: function () {
                  return this.frames.length;
                },
                setFrame: function (t, e, i) {
                  (this.frames[t] = e), (this.drawOrders[t] = i);
                },
                apply: function (t, e, i) {
                  var n = this.frames;
                  if (!(i < n[0])) {
                    var o;
                    o = i >= n[n.length - 1] ? n.length - 1 : r.Animation.binarySearch1(n, i) - 1;
                    var s = t.drawOrder,
                      a = t.slots,
                      h = this.drawOrders[o];
                    if (h) for (var l = 0, u = h.length; u > l; l++) s[l] = t.slots[h[l]];
                    else for (var l = 0, u = a.length; u > l; l++) s[l] = a[l];
                  }
                },
              }),
              (r.FfdTimeline = function (t) {
                (this.curves = new r.Curves(t)),
                  (this.frames = []),
                  (this.frames.length = t),
                  (this.frameVertices = []),
                  (this.frameVertices.length = t);
              }),
              (r.FfdTimeline.prototype = {
                slotIndex: 0,
                attachment: 0,
                getFrameCount: function () {
                  return this.frames.length;
                },
                setFrame: function (t, e, i) {
                  (this.frames[t] = e), (this.frameVertices[t] = i);
                },
                apply: function (t, e, i, n, o) {
                  var s = t.slots[this.slotIndex];
                  if (s.attachment == this.attachment) {
                    var a = this.frames;
                    if (!(i < a[0])) {
                      var h = this.frameVertices,
                        l = h[0].length,
                        u = s.attachmentVertices;
                      if ((u.length != l && (o = 1), (u.length = l), i >= a[a.length - 1])) {
                        var c = h[a.length - 1];
                        if (1 > o) for (var d = 0; l > d; d++) u[d] += (c[d] - u[d]) * o;
                        else for (var d = 0; l > d; d++) u[d] = c[d];
                      } else {
                        var p = r.Animation.binarySearch1(a, i),
                          f = a[p],
                          m = 1 - (i - f) / (a[p - 1] - f);
                        m = this.curves.getCurvePercent(p - 1, 0 > m ? 0 : m > 1 ? 1 : m);
                        var v = h[p - 1],
                          g = h[p];
                        if (1 > o)
                          for (var d = 0; l > d; d++) {
                            var y = v[d];
                            u[d] += (y + (g[d] - y) * m - u[d]) * o;
                          }
                        else
                          for (var d = 0; l > d; d++) {
                            var y = v[d];
                            u[d] = y + (g[d] - y) * m;
                          }
                      }
                    }
                  }
                },
              }),
              (r.IkConstraintTimeline = function (t) {
                (this.curves = new r.Curves(t)), (this.frames = []), (this.frames.length = 3 * t);
              }),
              (r.IkConstraintTimeline.prototype = {
                ikConstraintIndex: 0,
                getFrameCount: function () {
                  return this.frames.length / 3;
                },
                setFrame: function (t, e, i, r) {
                  (t *= 3), (this.frames[t] = e), (this.frames[t + 1] = i), (this.frames[t + 2] = r);
                },
                apply: function (t, e, i, n, o) {
                  var s = this.frames;
                  if (!(i < s[0])) {
                    var a = t.ikConstraints[this.ikConstraintIndex];
                    if (i >= s[s.length - 3])
                      return (a.mix += (s[s.length - 2] - a.mix) * o), void (a.bendDirection = s[s.length - 1]);
                    var h = r.Animation.binarySearch(s, i, 3),
                      l = s[h + -2],
                      u = s[h],
                      c = 1 - (i - u) / (s[h + -3] - u);
                    c = this.curves.getCurvePercent(h / 3 - 1, c);
                    var d = l + (s[h + 1] - l) * c;
                    (a.mix += (d - a.mix) * o), (a.bendDirection = s[h + -1]);
                  }
                },
              }),
              (r.FlipXTimeline = function (t) {
                (this.curves = new r.Curves(t)), (this.frames = []), (this.frames.length = 2 * t);
              }),
              (r.FlipXTimeline.prototype = {
                boneIndex: 0,
                getFrameCount: function () {
                  return this.frames.length / 2;
                },
                setFrame: function (t, e, i) {
                  (t *= 2), (this.frames[t] = e), (this.frames[t + 1] = i ? 1 : 0);
                },
                apply: function (t, e, i) {
                  var n = this.frames;
                  if (i < n[0]) return void (e > i && this.apply(t, e, Number.MAX_VALUE, null, 0));
                  e > i && (e = -1);
                  var o = (i >= n[n.length - 2] ? n.length : r.Animation.binarySearch(n, i, 2)) - 2;
                  n[o] < e || (t.bones[boneIndex].flipX = 0 != n[o + 1]);
                },
              }),
              (r.FlipYTimeline = function (t) {
                (this.curves = new r.Curves(t)), (this.frames = []), (this.frames.length = 2 * t);
              }),
              (r.FlipYTimeline.prototype = {
                boneIndex: 0,
                getFrameCount: function () {
                  return this.frames.length / 2;
                },
                setFrame: function (t, e, i) {
                  (t *= 2), (this.frames[t] = e), (this.frames[t + 1] = i ? 1 : 0);
                },
                apply: function (t, e, i) {
                  var n = this.frames;
                  if (i < n[0]) return void (e > i && this.apply(t, e, Number.MAX_VALUE, null, 0));
                  e > i && (e = -1);
                  var o = (i >= n[n.length - 2] ? n.length : r.Animation.binarySearch(n, i, 2)) - 2;
                  n[o] < e || (t.bones[boneIndex].flipY = 0 != n[o + 1]);
                },
              }),
              (r.SkeletonData = function () {
                (this.bones = []),
                  (this.slots = []),
                  (this.skins = []),
                  (this.events = []),
                  (this.animations = []),
                  (this.ikConstraints = []);
              }),
              (r.SkeletonData.prototype = {
                name: null,
                defaultSkin: null,
                width: 0,
                height: 0,
                version: null,
                hash: null,
                findBone: function (t) {
                  for (var e = this.bones, i = 0, r = e.length; r > i; i++) if (e[i].name == t) return e[i];
                  return null;
                },
                findBoneIndex: function (t) {
                  for (var e = this.bones, i = 0, r = e.length; r > i; i++) if (e[i].name == t) return i;
                  return -1;
                },
                findSlot: function (t) {
                  for (var e = this.slots, i = 0, r = e.length; r > i; i++) if (e[i].name == t) return slot[i];
                  return null;
                },
                findSlotIndex: function (t) {
                  for (var e = this.slots, i = 0, r = e.length; r > i; i++) if (e[i].name == t) return i;
                  return -1;
                },
                findSkin: function (t) {
                  for (var e = this.skins, i = 0, r = e.length; r > i; i++) if (e[i].name == t) return e[i];
                  return null;
                },
                findEvent: function (t) {
                  for (var e = this.events, i = 0, r = e.length; r > i; i++) if (e[i].name == t) return e[i];
                  return null;
                },
                findAnimation: function (t) {
                  for (var e = this.animations, i = 0, r = e.length; r > i; i++) if (e[i].name == t) return e[i];
                  return null;
                },
                findIkConstraint: function (t) {
                  for (var e = this.ikConstraints, i = 0, r = e.length; r > i; i++) if (e[i].name == t) return e[i];
                  return null;
                },
              }),
              (r.Skeleton = function (t) {
                (this.data = t), (this.bones = []);
                for (var e = 0, i = t.bones.length; i > e; e++) {
                  var n = t.bones[e],
                    o = n.parent ? this.bones[t.bones.indexOf(n.parent)] : null;
                  this.bones.push(new r.Bone(n, this, o));
                }
                (this.slots = []), (this.drawOrder = []);
                for (var e = 0, i = t.slots.length; i > e; e++) {
                  var s = t.slots[e],
                    a = this.bones[t.bones.indexOf(s.boneData)],
                    h = new r.Slot(s, a);
                  this.slots.push(h), this.drawOrder.push(h);
                }
                this.ikConstraints = [];
                for (var e = 0, i = t.ikConstraints.length; i > e; e++)
                  this.ikConstraints.push(new r.IkConstraint(t.ikConstraints[e], this));
                (this.boneCache = []), this.updateCache();
              }),
              (r.Skeleton.prototype = {
                x: 0,
                y: 0,
                skin: null,
                r: 1,
                g: 1,
                b: 1,
                a: 1,
                time: 0,
                flipX: !1,
                flipY: !1,
                updateCache: function () {
                  var t = this.ikConstraints,
                    e = t.length,
                    i = e + 1,
                    r = this.boneCache;
                  r.length > i && (r.length = i);
                  for (var n = 0, o = r.length; o > n; n++) r[n].length = 0;
                  for (; r.length < i; ) r[r.length] = [];
                  var s = r[0],
                    a = this.bones;
                  t: for (var n = 0, o = a.length; o > n; n++) {
                    var h = a[n],
                      l = h;
                    do {
                      for (var u = 0; e > u; u++)
                        for (var c = t[u], d = c.bones[0], p = c.bones[c.bones.length - 1]; ; ) {
                          if (l == p) {
                            r[u].push(h), r[u + 1].push(h);
                            continue t;
                          }
                          if (p == d) break;
                          p = p.parent;
                        }
                      l = l.parent;
                    } while (l);
                    s[s.length] = h;
                  }
                },
                updateWorldTransform: function () {
                  for (var t = this.bones, e = 0, i = t.length; i > e; e++) {
                    var r = t[e];
                    r.rotationIK = r.rotation;
                  }
                  for (var e = 0, n = this.boneCache.length - 1; ; ) {
                    for (var o = this.boneCache[e], s = 0, a = o.length; a > s; s++) o[s].updateWorldTransform();
                    if (e == n) break;
                    this.ikConstraints[e].apply(), e++;
                  }
                },
                setToSetupPose: function () {
                  this.setBonesToSetupPose(), this.setSlotsToSetupPose();
                },
                setBonesToSetupPose: function () {
                  for (var t = this.bones, e = 0, i = t.length; i > e; e++) t[e].setToSetupPose();
                  for (var r = this.ikConstraints, e = 0, i = r.length; i > e; e++) {
                    var n = r[e];
                    (n.bendDirection = n.data.bendDirection), (n.mix = n.data.mix);
                  }
                },
                setSlotsToSetupPose: function () {
                  for (var t = this.slots, e = this.drawOrder, i = 0, r = t.length; r > i; i++)
                    (e[i] = t[i]), t[i].setToSetupPose(i);
                },
                getRootBone: function () {
                  return this.bones.length ? this.bones[0] : null;
                },
                findBone: function (t) {
                  for (var e = this.bones, i = 0, r = e.length; r > i; i++) if (e[i].data.name == t) return e[i];
                  return null;
                },
                findBoneIndex: function (t) {
                  for (var e = this.bones, i = 0, r = e.length; r > i; i++) if (e[i].data.name == t) return i;
                  return -1;
                },
                findSlot: function (t) {
                  for (var e = this.slots, i = 0, r = e.length; r > i; i++) if (e[i].data.name == t) return e[i];
                  return null;
                },
                findSlotIndex: function (t) {
                  for (var e = this.slots, i = 0, r = e.length; r > i; i++) if (e[i].data.name == t) return i;
                  return -1;
                },
                setSkinByName: function (t) {
                  var e = this.data.findSkin(t);
                  if (!e) throw 'Skin not found: ' + t;
                  this.setSkin(e);
                },
                setSkin: function (t) {
                  if (t)
                    if (this.skin) t._attachAll(this, this.skin);
                    else
                      for (var e = this.slots, i = 0, r = e.length; r > i; i++) {
                        var n = e[i],
                          o = n.data.attachmentName;
                        if (o) {
                          var s = t.getAttachment(i, o);
                          s && n.setAttachment(s);
                        }
                      }
                  this.skin = t;
                },
                getAttachmentBySlotName: function (t, e) {
                  return this.getAttachmentBySlotIndex(this.data.findSlotIndex(t), e);
                },
                getAttachmentBySlotIndex: function (t, e) {
                  if (this.skin) {
                    var i = this.skin.getAttachment(t, e);
                    if (i) return i;
                  }
                  return this.data.defaultSkin ? this.data.defaultSkin.getAttachment(t, e) : null;
                },
                setAttachment: function (t, e) {
                  for (var i = this.slots, r = 0, n = i.length; n > r; r++) {
                    var o = i[r];
                    if (o.data.name == t) {
                      var s = null;
                      if (e && ((s = this.getAttachmentBySlotIndex(r, e)), !s))
                        throw 'Attachment not found: ' + e + ', for slot: ' + t;
                      return void o.setAttachment(s);
                    }
                  }
                  throw 'Slot not found: ' + t;
                },
                findIkConstraint: function (t) {
                  for (var e = this.ikConstraints, i = 0, r = e.length; r > i; i++)
                    if (e[i].data.name == t) return e[i];
                  return null;
                },
                update: function (t) {
                  this.time += t;
                },
              }),
              (r.EventData = function (t) {
                this.name = t;
              }),
              (r.EventData.prototype = { intValue: 0, floatValue: 0, stringValue: null }),
              (r.Event = function (t) {
                this.data = t;
              }),
              (r.Event.prototype = { intValue: 0, floatValue: 0, stringValue: null }),
              (r.AttachmentType = { region: 0, boundingbox: 1, mesh: 2, skinnedmesh: 3 }),
              (r.RegionAttachment = function (t) {
                (this.name = t), (this.offset = []), (this.offset.length = 8), (this.uvs = []), (this.uvs.length = 8);
              }),
              (r.RegionAttachment.prototype = {
                type: r.AttachmentType.region,
                x: 0,
                y: 0,
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                width: 0,
                height: 0,
                r: 1,
                g: 1,
                b: 1,
                a: 1,
                path: null,
                rendererObject: null,
                regionOffsetX: 0,
                regionOffsetY: 0,
                regionWidth: 0,
                regionHeight: 0,
                regionOriginalWidth: 0,
                regionOriginalHeight: 0,
                setUVs: function (t, e, i, r, n) {
                  var o = this.uvs;
                  n
                    ? ((o[2] = t), (o[3] = r), (o[4] = t), (o[5] = e), (o[6] = i), (o[7] = e), (o[0] = i), (o[1] = r))
                    : ((o[0] = t), (o[1] = r), (o[2] = t), (o[3] = e), (o[4] = i), (o[5] = e), (o[6] = i), (o[7] = r));
                },
                updateOffset: function () {
                  var t = (this.width / this.regionOriginalWidth) * this.scaleX,
                    e = (this.height / this.regionOriginalHeight) * this.scaleY,
                    i = (-this.width / 2) * this.scaleX + this.regionOffsetX * t,
                    n = (-this.height / 2) * this.scaleY + this.regionOffsetY * e,
                    o = i + this.regionWidth * t,
                    s = n + this.regionHeight * e,
                    a = this.rotation * r.degRad,
                    h = Math.cos(a),
                    l = Math.sin(a),
                    u = i * h + this.x,
                    c = i * l,
                    d = n * h + this.y,
                    p = n * l,
                    f = o * h + this.x,
                    m = o * l,
                    v = s * h + this.y,
                    g = s * l,
                    y = this.offset;
                  (y[0] = u - p),
                    (y[1] = d + c),
                    (y[2] = u - g),
                    (y[3] = v + c),
                    (y[4] = f - g),
                    (y[5] = v + m),
                    (y[6] = f - p),
                    (y[7] = d + m);
                },
                computeVertices: function (t, e, i, r) {
                  (t += i.worldX), (e += i.worldY);
                  var n = i.m00,
                    o = i.m01,
                    s = i.m10,
                    a = i.m11,
                    h = this.offset;
                  (r[0] = h[0] * n + h[1] * o + t),
                    (r[1] = h[0] * s + h[1] * a + e),
                    (r[2] = h[2] * n + h[3] * o + t),
                    (r[3] = h[2] * s + h[3] * a + e),
                    (r[4] = h[4] * n + h[5] * o + t),
                    (r[5] = h[4] * s + h[5] * a + e),
                    (r[6] = h[6] * n + h[7] * o + t),
                    (r[7] = h[6] * s + h[7] * a + e);
                },
              }),
              (r.MeshAttachment = function (t) {
                this.name = t;
              }),
              (r.MeshAttachment.prototype = {
                type: r.AttachmentType.mesh,
                vertices: null,
                uvs: null,
                regionUVs: null,
                triangles: null,
                hullLength: 0,
                r: 1,
                g: 1,
                b: 1,
                a: 1,
                path: null,
                rendererObject: null,
                regionU: 0,
                regionV: 0,
                regionU2: 0,
                regionV2: 0,
                regionRotate: !1,
                regionOffsetX: 0,
                regionOffsetY: 0,
                regionWidth: 0,
                regionHeight: 0,
                regionOriginalWidth: 0,
                regionOriginalHeight: 0,
                edges: null,
                width: 0,
                height: 0,
                updateUVs: function () {
                  var t = this.regionU2 - this.regionU,
                    e = this.regionV2 - this.regionV,
                    i = this.regionUVs.length;
                  if (((this.uvs && this.uvs.length == i) || (this.uvs = new r.Float32Array(i)), this.regionRotate))
                    for (var n = 0; i > n; n += 2)
                      (this.uvs[n] = this.regionU + this.regionUVs[n + 1] * t),
                        (this.uvs[n + 1] = this.regionV + e - this.regionUVs[n] * e);
                  else
                    for (var n = 0; i > n; n += 2)
                      (this.uvs[n] = this.regionU + this.regionUVs[n] * t),
                        (this.uvs[n + 1] = this.regionV + this.regionUVs[n + 1] * e);
                },
                computeWorldVertices: function (t, e, i, r) {
                  var n = i.bone;
                  (t += n.worldX), (e += n.worldY);
                  var o = n.m00,
                    s = n.m01,
                    a = n.m10,
                    h = n.m11,
                    l = this.vertices,
                    u = l.length;
                  i.attachmentVertices.length == u && (l = i.attachmentVertices);
                  for (var c = 0; u > c; c += 2) {
                    var d = l[c],
                      p = l[c + 1];
                    (r[c] = d * o + p * s + t), (r[c + 1] = d * a + p * h + e);
                  }
                },
              }),
              (r.SkinnedMeshAttachment = function (t) {
                this.name = t;
              }),
              (r.SkinnedMeshAttachment.prototype = {
                type: r.AttachmentType.skinnedmesh,
                bones: null,
                weights: null,
                uvs: null,
                regionUVs: null,
                triangles: null,
                hullLength: 0,
                r: 1,
                g: 1,
                b: 1,
                a: 1,
                path: null,
                rendererObject: null,
                regionU: 0,
                regionV: 0,
                regionU2: 0,
                regionV2: 0,
                regionRotate: !1,
                regionOffsetX: 0,
                regionOffsetY: 0,
                regionWidth: 0,
                regionHeight: 0,
                regionOriginalWidth: 0,
                regionOriginalHeight: 0,
                edges: null,
                width: 0,
                height: 0,
                updateUVs: function () {
                  var t = this.regionU2 - this.regionU,
                    e = this.regionV2 - this.regionV,
                    i = this.regionUVs.length;
                  if (((this.uvs && this.uvs.length == i) || (this.uvs = new r.Float32Array(i)), this.regionRotate))
                    for (var n = 0; i > n; n += 2)
                      (this.uvs[n] = this.regionU + this.regionUVs[n + 1] * t),
                        (this.uvs[n + 1] = this.regionV + e - this.regionUVs[n] * e);
                  else
                    for (var n = 0; i > n; n += 2)
                      (this.uvs[n] = this.regionU + this.regionUVs[n] * t),
                        (this.uvs[n + 1] = this.regionV + this.regionUVs[n + 1] * e);
                },
                computeWorldVertices: function (t, e, i, r) {
                  var n,
                    o,
                    s,
                    a,
                    h,
                    l,
                    u,
                    c = i.bone.skeleton.bones,
                    d = this.weights,
                    p = this.bones,
                    f = 0,
                    m = 0,
                    v = 0,
                    g = 0,
                    y = p.length;
                  if (i.attachmentVertices.length)
                    for (var x = i.attachmentVertices; y > m; f += 2) {
                      for (o = 0, s = 0, n = p[m++] + m; n > m; m++, v += 3, g += 2)
                        (a = c[p[m]]),
                          (h = d[v] + x[g]),
                          (l = d[v + 1] + x[g + 1]),
                          (u = d[v + 2]),
                          (o += (h * a.m00 + l * a.m01 + a.worldX) * u),
                          (s += (h * a.m10 + l * a.m11 + a.worldY) * u);
                      (r[f] = o + t), (r[f + 1] = s + e);
                    }
                  else
                    for (; y > m; f += 2) {
                      for (o = 0, s = 0, n = p[m++] + m; n > m; m++, v += 3)
                        (a = c[p[m]]),
                          (h = d[v]),
                          (l = d[v + 1]),
                          (u = d[v + 2]),
                          (o += (h * a.m00 + l * a.m01 + a.worldX) * u),
                          (s += (h * a.m10 + l * a.m11 + a.worldY) * u);
                      (r[f] = o + t), (r[f + 1] = s + e);
                    }
                },
              }),
              (r.BoundingBoxAttachment = function (t) {
                (this.name = t), (this.vertices = []);
              }),
              (r.BoundingBoxAttachment.prototype = {
                type: r.AttachmentType.boundingbox,
                computeWorldVertices: function (t, e, i, r) {
                  (t += i.worldX), (e += i.worldY);
                  for (
                    var n = i.m00, o = i.m01, s = i.m10, a = i.m11, h = this.vertices, l = 0, u = h.length;
                    u > l;
                    l += 2
                  ) {
                    var c = h[l],
                      d = h[l + 1];
                    (r[l] = c * n + d * o + t), (r[l + 1] = c * s + d * a + e);
                  }
                },
              }),
              (r.AnimationStateData = function (t) {
                (this.skeletonData = t), (this.animationToMixTime = {});
              }),
              (r.AnimationStateData.prototype = {
                defaultMix: 0,
                setMixByName: function (t, e, i) {
                  var r = this.skeletonData.findAnimation(t);
                  if (!r) throw 'Animation not found: ' + t;
                  var n = this.skeletonData.findAnimation(e);
                  if (!n) throw 'Animation not found: ' + e;
                  this.setMix(r, n, i);
                },
                setMix: function (t, e, i) {
                  this.animationToMixTime[t.name + ':' + e.name] = i;
                },
                getMix: function (t, e) {
                  var i = t.name + ':' + e.name;
                  return this.animationToMixTime.hasOwnProperty(i) ? this.animationToMixTime[i] : this.defaultMix;
                },
              }),
              (r.TrackEntry = function () {}),
              (r.TrackEntry.prototype = {
                next: null,
                previous: null,
                animation: null,
                loop: !1,
                delay: 0,
                time: 0,
                lastTime: -1,
                endTime: 0,
                timeScale: 1,
                mixTime: 0,
                mixDuration: 0,
                mix: 1,
                onStart: null,
                onEnd: null,
                onComplete: null,
                onEvent: null,
              }),
              (r.AnimationState = function (t) {
                (this.data = t), (this.tracks = []), (this.events = []);
              }),
              (r.AnimationState.prototype = {
                onStart: null,
                onEnd: null,
                onComplete: null,
                onEvent: null,
                timeScale: 1,
                update: function (t) {
                  t *= this.timeScale;
                  for (var e = 0; e < this.tracks.length; e++) {
                    var i = this.tracks[e];
                    if (i) {
                      if (((i.time += t * i.timeScale), i.previous)) {
                        var r = t * i.previous.timeScale;
                        (i.previous.time += r), (i.mixTime += r);
                      }
                      var n = i.next;
                      n
                        ? ((n.time = i.lastTime - n.delay), n.time >= 0 && this.setCurrent(e, n))
                        : !i.loop && i.lastTime >= i.endTime && this.clearTrack(e);
                    }
                  }
                },
                apply: function (t) {
                  for (var e = 0; e < this.tracks.length; e++) {
                    var i = this.tracks[e];
                    if (i) {
                      this.events.length = 0;
                      var r = i.time,
                        n = i.lastTime,
                        o = i.endTime,
                        s = i.loop;
                      !s && r > o && (r = o);
                      var a = i.previous;
                      if (a) {
                        var h = a.time;
                        !a.loop && h > a.endTime && (h = a.endTime), a.animation.apply(t, h, h, a.loop, null);
                        var l = (i.mixTime / i.mixDuration) * i.mix;
                        l >= 1 && ((l = 1), (i.previous = null)), i.animation.mix(t, i.lastTime, r, s, this.events, l);
                      } else
                        1 == i.mix
                          ? i.animation.apply(t, i.lastTime, r, s, this.events)
                          : i.animation.mix(t, i.lastTime, r, s, this.events, i.mix);
                      for (var u = 0, c = this.events.length; c > u; u++) {
                        var d = this.events[u];
                        i.onEvent && i.onEvent(e, d), this.onEvent && this.onEvent(e, d);
                      }
                      if (s ? n % o > r % o : o > n && r >= o) {
                        var p = Math.floor(r / o);
                        i.onComplete && i.onComplete(e, p), this.onComplete && this.onComplete(e, p);
                      }
                      i.lastTime = i.time;
                    }
                  }
                },
                clearTracks: function () {
                  for (var t = 0, e = this.tracks.length; e > t; t++) this.clearTrack(t);
                  this.tracks.length = 0;
                },
                clearTrack: function (t) {
                  if (!(t >= this.tracks.length)) {
                    var e = this.tracks[t];
                    e && (e.onEnd && e.onEnd(t), this.onEnd && this.onEnd(t), (this.tracks[t] = null));
                  }
                },
                _expandToIndex: function (t) {
                  if (t < this.tracks.length) return this.tracks[t];
                  for (; t >= this.tracks.length; ) this.tracks.push(null);
                  return null;
                },
                setCurrent: function (t, e) {
                  var i = this._expandToIndex(t);
                  if (i) {
                    var r = i.previous;
                    (i.previous = null),
                      i.onEnd && i.onEnd(t),
                      this.onEnd && this.onEnd(t),
                      (e.mixDuration = this.data.getMix(i.animation, e.animation)),
                      e.mixDuration > 0 &&
                        ((e.mixTime = 0), (e.previous = r && i.mixTime / i.mixDuration < 0.5 ? r : i));
                  }
                  (this.tracks[t] = e), e.onStart && e.onStart(t), this.onStart && this.onStart(t);
                },
                setAnimationByName: function (t, e, i) {
                  var r = this.data.skeletonData.findAnimation(e);
                  if (!r) throw 'Animation not found: ' + e;
                  return this.setAnimation(t, r, i);
                },
                setAnimation: function (t, e, i) {
                  var n = new r.TrackEntry();
                  return (n.animation = e), (n.loop = i), (n.endTime = e.duration), this.setCurrent(t, n), n;
                },
                addAnimationByName: function (t, e, i, r) {
                  var n = this.data.skeletonData.findAnimation(e);
                  if (!n) throw 'Animation not found: ' + e;
                  return this.addAnimation(t, n, i, r);
                },
                addAnimation: function (t, e, i, n) {
                  var o = new r.TrackEntry();
                  (o.animation = e), (o.loop = i), (o.endTime = e.duration);
                  var s = this._expandToIndex(t);
                  if (s) {
                    for (; s.next; ) s = s.next;
                    s.next = o;
                  } else this.tracks[t] = o;
                  return (
                    0 >= n && (s ? (n += s.endTime - this.data.getMix(s.animation, e)) : (n = 0)), (o.delay = n), o
                  );
                },
                getCurrent: function (t) {
                  return t >= this.tracks.length ? null : this.tracks[t];
                },
              }),
              (r.SkeletonJsonParser = function (t) {
                this.attachmentLoader = t;
              }),
              (r.SkeletonJsonParser.prototype = {
                scale: 1,
                readSkeletonData: function (t, e) {
                  var i = new r.SkeletonData();
                  i.name = e;
                  var n = t.skeleton;
                  n && ((i.hash = n.hash), (i.version = n.spine), (i.width = n.width || 0), (i.height = n.height || 0));
                  for (var o = t.bones, s = 0, a = o.length; a > s; s++) {
                    var h = o[s],
                      l = null;
                    if (h.parent && ((l = i.findBone(h.parent)), !l)) throw 'Parent bone not found: ' + h.parent;
                    var u = new r.BoneData(h.name, l);
                    (u.length = (h.length || 0) * this.scale),
                      (u.x = (h.x || 0) * this.scale),
                      (u.y = (h.y || 0) * this.scale),
                      (u.rotation = h.rotation || 0),
                      (u.scaleX = h.hasOwnProperty('scaleX') ? h.scaleX : 1),
                      (u.scaleY = h.hasOwnProperty('scaleY') ? h.scaleY : 1),
                      (u.inheritScale = h.hasOwnProperty('inheritScale') ? h.inheritScale : !0),
                      (u.inheritRotation = h.hasOwnProperty('inheritRotation') ? h.inheritRotation : !0),
                      i.bones.push(u);
                  }
                  var c = t.ik;
                  if (c)
                    for (var s = 0, a = c.length; a > s; s++) {
                      for (
                        var d = c[s], p = new r.IkConstraintData(d.name), o = d.bones, f = 0, m = o.length;
                        m > f;
                        f++
                      ) {
                        var v = i.findBone(o[f]);
                        if (!v) throw 'IK bone not found: ' + o[f];
                        p.bones.push(v);
                      }
                      if (((p.target = i.findBone(d.target)), !p.target)) throw 'Target bone not found: ' + d.target;
                      (p.bendDirection = !d.hasOwnProperty('bendPositive') || d.bendPositive ? 1 : -1),
                        (p.mix = d.hasOwnProperty('mix') ? d.mix : 1),
                        i.ikConstraints.push(p);
                    }
                  for (var g = t.slots, s = 0, a = g.length; a > s; s++) {
                    var y = g[s],
                      u = i.findBone(y.bone);
                    if (!u) throw 'Slot bone not found: ' + y.bone;
                    var x = new r.SlotData(y.name, u),
                      _ = y.color;
                    _ &&
                      ((x.r = this.toColor(_, 0)),
                      (x.g = this.toColor(_, 1)),
                      (x.b = this.toColor(_, 2)),
                      (x.a = this.toColor(_, 3))),
                      (x.attachmentName = y.attachment),
                      (x.additiveBlending = y.additive && 'true' == y.additive),
                      i.slots.push(x);
                  }
                  var b = t.skins;
                  for (var w in b)
                    if (b.hasOwnProperty(w)) {
                      var T = b[w],
                        S = new r.Skin(w);
                      for (var E in T)
                        if (T.hasOwnProperty(E)) {
                          var A = i.findSlotIndex(E),
                            C = T[E];
                          for (var M in C)
                            if (C.hasOwnProperty(M)) {
                              var R = this.readAttachment(S, M, C[M]);
                              R && S.addAttachment(A, M, R);
                            }
                        }
                      i.skins.push(S), 'default' == S.name && (i.defaultSkin = S);
                    }
                  var P = t.events;
                  for (var O in P)
                    if (P.hasOwnProperty(O)) {
                      var D = P[O],
                        F = new r.EventData(O);
                      (F.intValue = D['int'] || 0),
                        (F.floatValue = D['float'] || 0),
                        (F.stringValue = D.string || null),
                        i.events.push(F);
                    }
                  var L = t.animations;
                  for (var k in L) L.hasOwnProperty(k) && this.readAnimation(k, L[k], i);
                  return i;
                },
                readAttachment: function (t, e, i) {
                  e = i.name || e;
                  var n = r.AttachmentType[i.type || 'region'],
                    o = i.path || e,
                    s = this.scale;
                  if (n == r.AttachmentType.region) {
                    var a = this.attachmentLoader.newRegionAttachment(t, e, o);
                    if (!a) return null;
                    (a.path = o),
                      (a.x = (i.x || 0) * s),
                      (a.y = (i.y || 0) * s),
                      (a.scaleX = i.hasOwnProperty('scaleX') ? i.scaleX : 1),
                      (a.scaleY = i.hasOwnProperty('scaleY') ? i.scaleY : 1),
                      (a.rotation = i.rotation || 0),
                      (a.width = (i.width || 0) * s),
                      (a.height = (i.height || 0) * s);
                    var h = i.color;
                    return (
                      h &&
                        ((a.r = this.toColor(h, 0)),
                        (a.g = this.toColor(h, 1)),
                        (a.b = this.toColor(h, 2)),
                        (a.a = this.toColor(h, 3))),
                      a.updateOffset(),
                      a
                    );
                  }
                  if (n == r.AttachmentType.mesh) {
                    var l = this.attachmentLoader.newMeshAttachment(t, e, o);
                    return l
                      ? ((l.path = o),
                        (l.vertices = this.getFloatArray(i, 'vertices', s)),
                        (l.triangles = this.getIntArray(i, 'triangles')),
                        (l.regionUVs = this.getFloatArray(i, 'uvs', 1)),
                        l.updateUVs(),
                        (h = i.color),
                        h &&
                          ((l.r = this.toColor(h, 0)),
                          (l.g = this.toColor(h, 1)),
                          (l.b = this.toColor(h, 2)),
                          (l.a = this.toColor(h, 3))),
                        (l.hullLength = 2 * (i.hull || 0)),
                        i.edges && (l.edges = this.getIntArray(i, 'edges')),
                        (l.width = (i.width || 0) * s),
                        (l.height = (i.height || 0) * s),
                        l)
                      : null;
                  }
                  if (n == r.AttachmentType.skinnedmesh) {
                    var l = this.attachmentLoader.newSkinnedMeshAttachment(t, e, o);
                    if (!l) return null;
                    l.path = o;
                    for (
                      var u = this.getFloatArray(i, 'uvs', 1),
                        c = this.getFloatArray(i, 'vertices', 1),
                        d = [],
                        p = [],
                        f = 0,
                        m = c.length;
                      m > f;

                    ) {
                      var v = 0 | c[f++];
                      p[p.length] = v;
                      for (var g = f + 4 * v; g > f; )
                        (p[p.length] = c[f]),
                          (d[d.length] = c[f + 1] * s),
                          (d[d.length] = c[f + 2] * s),
                          (d[d.length] = c[f + 3]),
                          (f += 4);
                    }
                    return (
                      (l.bones = p),
                      (l.weights = d),
                      (l.triangles = this.getIntArray(i, 'triangles')),
                      (l.regionUVs = u),
                      l.updateUVs(),
                      (h = i.color),
                      h &&
                        ((l.r = this.toColor(h, 0)),
                        (l.g = this.toColor(h, 1)),
                        (l.b = this.toColor(h, 2)),
                        (l.a = this.toColor(h, 3))),
                      (l.hullLength = 2 * (i.hull || 0)),
                      i.edges && (l.edges = this.getIntArray(i, 'edges')),
                      (l.width = (i.width || 0) * s),
                      (l.height = (i.height || 0) * s),
                      l
                    );
                  }
                  if (n == r.AttachmentType.boundingbox) {
                    for (
                      var y = this.attachmentLoader.newBoundingBoxAttachment(t, e), c = i.vertices, f = 0, m = c.length;
                      m > f;
                      f++
                    )
                      y.vertices.push(c[f] * s);
                    return y;
                  }
                  throw 'Unknown attachment type: ' + n;
                },
                readAnimation: function (t, e, i) {
                  var n = [],
                    o = 0,
                    s = e.slots;
                  for (var a in s)
                    if (s.hasOwnProperty(a)) {
                      var h = s[a],
                        l = i.findSlotIndex(a);
                      for (var u in h)
                        if (h.hasOwnProperty(u)) {
                          var c = h[u];
                          if ('color' == u) {
                            var d = new r.ColorTimeline(c.length);
                            d.slotIndex = l;
                            for (var p = 0, f = 0, m = c.length; m > f; f++) {
                              var v = c[f],
                                g = v.color,
                                y = this.toColor(g, 0),
                                x = this.toColor(g, 1),
                                _ = this.toColor(g, 2),
                                b = this.toColor(g, 3);
                              d.setFrame(p, v.time, y, x, _, b), this.readCurve(d, p, v), p++;
                            }
                            n.push(d), (o = Math.max(o, d.frames[5 * d.getFrameCount() - 5]));
                          } else {
                            if ('attachment' != u) throw 'Invalid timeline type for a slot: ' + u + ' (' + a + ')';
                            var d = new r.AttachmentTimeline(c.length);
                            d.slotIndex = l;
                            for (var p = 0, f = 0, m = c.length; m > f; f++) {
                              var v = c[f];
                              d.setFrame(p++, v.time, v.name);
                            }
                            n.push(d), (o = Math.max(o, d.frames[d.getFrameCount() - 1]));
                          }
                        }
                    }
                  var w = e.bones;
                  for (var T in w)
                    if (w.hasOwnProperty(T)) {
                      var S = i.findBoneIndex(T);
                      if (-1 == S) throw 'Bone not found: ' + T;
                      var E = w[T];
                      for (var u in E)
                        if (E.hasOwnProperty(u)) {
                          var c = E[u];
                          if ('rotate' == u) {
                            var d = new r.RotateTimeline(c.length);
                            d.boneIndex = S;
                            for (var p = 0, f = 0, m = c.length; m > f; f++) {
                              var v = c[f];
                              d.setFrame(p, v.time, v.angle), this.readCurve(d, p, v), p++;
                            }
                            n.push(d), (o = Math.max(o, d.frames[2 * d.getFrameCount() - 2]));
                          } else if ('translate' == u || 'scale' == u) {
                            var d,
                              A = 1;
                            'scale' == u
                              ? (d = new r.ScaleTimeline(c.length))
                              : ((d = new r.TranslateTimeline(c.length)), (A = this.scale)),
                              (d.boneIndex = S);
                            for (var p = 0, f = 0, m = c.length; m > f; f++) {
                              var v = c[f],
                                C = (v.x || 0) * A,
                                M = (v.y || 0) * A;
                              d.setFrame(p, v.time, C, M), this.readCurve(d, p, v), p++;
                            }
                            n.push(d), (o = Math.max(o, d.frames[3 * d.getFrameCount() - 3]));
                          } else {
                            if ('flipX' != u && 'flipY' != u)
                              throw 'Invalid timeline type for a bone: ' + u + ' (' + T + ')';
                            var C = 'flipX' == u,
                              d = C ? new r.FlipXTimeline(c.length) : new r.FlipYTimeline(c.length);
                            d.boneIndex = S;
                            for (var R = C ? 'x' : 'y', p = 0, f = 0, m = c.length; m > f; f++) {
                              var v = c[f];
                              d.setFrame(p, v.time, v[R] || !1), p++;
                            }
                            n.push(d), (o = Math.max(o, d.frames[2 * d.getFrameCount() - 2]));
                          }
                        }
                    }
                  var P = e.ik;
                  for (var O in P)
                    if (P.hasOwnProperty(O)) {
                      var D = i.findIkConstraint(O),
                        c = P[O],
                        d = new r.IkConstraintTimeline(c.length);
                      d.ikConstraintIndex = i.ikConstraints.indexOf(D);
                      for (var p = 0, f = 0, m = c.length; m > f; f++) {
                        var v = c[f],
                          F = v.hasOwnProperty('mix') ? v.mix : 1,
                          L = !v.hasOwnProperty('bendPositive') || v.bendPositive ? 1 : -1;
                        d.setFrame(p, v.time, F, L), this.readCurve(d, p, v), p++;
                      }
                      n.push(d), (o = Math.max(o, d.frames[3 * d.frameCount - 3]));
                    }
                  var k = e.ffd;
                  for (var I in k) {
                    var B = i.findSkin(I),
                      h = k[I];
                    for (a in h) {
                      var l = i.findSlotIndex(a),
                        N = h[a];
                      for (var U in N) {
                        var c = N[U],
                          d = new r.FfdTimeline(c.length),
                          X = B.getAttachment(l, U);
                        if (!X) throw 'FFD attachment not found: ' + U;
                        (d.slotIndex = l), (d.attachment = X);
                        var j,
                          z = X.type == r.AttachmentType.mesh;
                        j = z ? X.vertices.length : (X.weights.length / 3) * 2;
                        for (var p = 0, f = 0, m = c.length; m > f; f++) {
                          var Y,
                            v = c[f];
                          if (v.vertices) {
                            var W = v.vertices,
                              Y = [];
                            Y.length = j;
                            var G = v.offset || 0,
                              H = W.length;
                            if (1 == this.scale) for (var V = 0; H > V; V++) Y[V + G] = W[V];
                            else for (var V = 0; H > V; V++) Y[V + G] = W[V] * this.scale;
                            if (z) for (var q = X.vertices, V = 0, H = Y.length; H > V; V++) Y[V] += q[V];
                          } else z ? (Y = X.vertices) : ((Y = []), (Y.length = j));
                          d.setFrame(p, v.time, Y), this.readCurve(d, p, v), p++;
                        }
                        (n[n.length] = d), (o = Math.max(o, d.frames[d.frameCount - 1]));
                      }
                    }
                  }
                  var K = e.drawOrder;
                  if ((K || (K = e.draworder), K)) {
                    for (
                      var d = new r.DrawOrderTimeline(K.length), Q = i.slots.length, p = 0, f = 0, m = K.length;
                      m > f;
                      f++
                    ) {
                      var $ = K[f],
                        J = null;
                      if ($.offsets) {
                        (J = []), (J.length = Q);
                        for (var V = Q - 1; V >= 0; V--) J[V] = -1;
                        var Z = $.offsets,
                          te = [];
                        te.length = Q - Z.length;
                        for (var ee = 0, ie = 0, V = 0, H = Z.length; H > V; V++) {
                          var re = Z[V],
                            l = i.findSlotIndex(re.slot);
                          if (-1 == l) throw 'Slot not found: ' + re.slot;
                          for (; ee != l; ) te[ie++] = ee++;
                          J[ee + re.offset] = ee++;
                        }
                        for (; Q > ee; ) te[ie++] = ee++;
                        for (var V = Q - 1; V >= 0; V--) -1 == J[V] && (J[V] = te[--ie]);
                      }
                      d.setFrame(p++, $.time, J);
                    }
                    n.push(d), (o = Math.max(o, d.frames[d.getFrameCount() - 1]));
                  }
                  var ne = e.events;
                  if (ne) {
                    for (var d = new r.EventTimeline(ne.length), p = 0, f = 0, m = ne.length; m > f; f++) {
                      var oe = ne[f],
                        se = i.findEvent(oe.name);
                      if (!se) throw 'Event not found: ' + oe.name;
                      var ae = new r.Event(se);
                      (ae.intValue = oe.hasOwnProperty('int') ? oe['int'] : se.intValue),
                        (ae.floatValue = oe.hasOwnProperty('float') ? oe['float'] : se.floatValue),
                        (ae.stringValue = oe.hasOwnProperty('string') ? oe.string : se.stringValue),
                        d.setFrame(p++, oe.time, ae);
                    }
                    n.push(d), (o = Math.max(o, d.frames[d.getFrameCount() - 1]));
                  }
                  i.animations.push(new r.Animation(t, n, o));
                },
                readCurve: function (t, e, i) {
                  var r = i.curve;
                  r
                    ? 'stepped' == r
                      ? t.curves.setStepped(e)
                      : r instanceof Array && t.curves.setCurve(e, r[0], r[1], r[2], r[3])
                    : t.curves.setLinear(e);
                },
                toColor: function (t, e) {
                  if (8 != t.length) throw 'Color hexidecimal length must be 8, recieved: ' + t;
                  return parseInt(t.substring(2 * e, 2 * e + 2), 16) / 255;
                },
                getFloatArray: function (t, e, i) {
                  var n = t[e],
                    o = new r.Float32Array(n.length),
                    s = 0,
                    a = n.length;
                  if (1 == i) for (; a > s; s++) o[s] = n[s];
                  else for (; a > s; s++) o[s] = n[s] * i;
                  return o;
                },
                getIntArray: function (t, e) {
                  for (var i = t[e], n = new r.Uint16Array(i.length), o = 0, s = i.length; s > o; o++) n[o] = 0 | i[o];
                  return n;
                },
              }),
              (r.Atlas = function (t, e, n) {
                e && e.indexOf('/') !== e.length && (e += '/'),
                  (this.pages = []),
                  (this.regions = []),
                  (this.texturesLoading = 0);
                var o = new r.AtlasReader(t),
                  s = [];
                s.length = 4;
                for (var a = null; ; ) {
                  var h = o.readLine();
                  if (null === h) break;
                  if (((h = o.trim(h)), h.length))
                    if (a) {
                      var l = new r.AtlasRegion();
                      (l.name = h), (l.page = a), (l.rotate = 'true' == o.readValue()), o.readTuple(s);
                      var u = parseInt(s[0]),
                        c = parseInt(s[1]);
                      o.readTuple(s);
                      var d = parseInt(s[0]),
                        p = parseInt(s[1]);
                      (l.u = u / a.width),
                        (l.v = c / a.height),
                        l.rotate
                          ? ((l.u2 = (u + p) / a.width), (l.v2 = (c + d) / a.height))
                          : ((l.u2 = (u + d) / a.width), (l.v2 = (c + p) / a.height)),
                        (l.x = u),
                        (l.y = c),
                        (l.width = Math.abs(d)),
                        (l.height = Math.abs(p)),
                        4 == o.readTuple(s) &&
                          ((l.splits = [parseInt(s[0]), parseInt(s[1]), parseInt(s[2]), parseInt(s[3])]),
                          4 == o.readTuple(s) &&
                            ((l.pads = [parseInt(s[0]), parseInt(s[1]), parseInt(s[2]), parseInt(s[3])]),
                            o.readTuple(s))),
                        (l.originalWidth = parseInt(s[0])),
                        (l.originalHeight = parseInt(s[1])),
                        o.readTuple(s),
                        (l.offsetX = parseInt(s[0])),
                        (l.offsetY = parseInt(s[1])),
                        (l.index = parseInt(o.readValue())),
                        this.regions.push(l);
                    } else {
                      (a = new r.AtlasPage()),
                        (a.name = h),
                        2 == o.readTuple(s) &&
                          ((a.width = parseInt(s[0])), (a.height = parseInt(s[1])), o.readTuple(s)),
                        (a.format = r.Atlas.Format[s[0]]),
                        o.readTuple(s),
                        (a.minFilter = r.Atlas.TextureFilter[s[0]]),
                        (a.magFilter = r.Atlas.TextureFilter[s[1]]);
                      var f = o.readValue();
                      (a.uWrap = r.Atlas.TextureWrap.clampToEdge),
                        (a.vWrap = r.Atlas.TextureWrap.clampToEdge),
                        'x' == f
                          ? (a.uWrap = r.Atlas.TextureWrap.repeat)
                          : 'y' == f
                            ? (a.vWrap = r.Atlas.TextureWrap.repeat)
                            : 'xy' == f && (a.uWrap = a.vWrap = r.Atlas.TextureWrap.repeat),
                        (a.rendererObject = i.BaseTexture.fromImage(e + h, n)),
                        this.pages.push(a);
                    }
                  else a = null;
                }
              }),
              (r.Atlas.prototype = {
                findRegion: function (t) {
                  for (var e = this.regions, i = 0, r = e.length; r > i; i++) if (e[i].name == t) return e[i];
                  return null;
                },
                dispose: function () {
                  for (var t = this.pages, e = 0, i = t.length; i > e; e++) t[e].rendererObject.destroy(!0);
                },
                updateUVs: function (t) {
                  for (var e = this.regions, i = 0, r = e.length; r > i; i++) {
                    var n = e[i];
                    n.page == t &&
                      ((n.u = n.x / t.width),
                      (n.v = n.y / t.height),
                      n.rotate
                        ? ((n.u2 = (n.x + n.height) / t.width), (n.v2 = (n.y + n.width) / t.height))
                        : ((n.u2 = (n.x + n.width) / t.width), (n.v2 = (n.y + n.height) / t.height)));
                  }
                },
              }),
              (r.Atlas.Format = {
                alpha: 0,
                intensity: 1,
                luminanceAlpha: 2,
                rgb565: 3,
                rgba4444: 4,
                rgb888: 5,
                rgba8888: 6,
              }),
              (r.Atlas.TextureFilter = {
                nearest: 0,
                linear: 1,
                mipMap: 2,
                mipMapNearestNearest: 3,
                mipMapLinearNearest: 4,
                mipMapNearestLinear: 5,
                mipMapLinearLinear: 6,
              }),
              (r.Atlas.TextureWrap = { mirroredRepeat: 0, clampToEdge: 1, repeat: 2 }),
              (r.AtlasPage = function () {}),
              (r.AtlasPage.prototype = {
                name: null,
                format: null,
                minFilter: null,
                magFilter: null,
                uWrap: null,
                vWrap: null,
                rendererObject: null,
                width: 0,
                height: 0,
              }),
              (r.AtlasRegion = function () {}),
              (r.AtlasRegion.prototype = {
                page: null,
                name: null,
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                u: 0,
                v: 0,
                u2: 0,
                v2: 0,
                offsetX: 0,
                offsetY: 0,
                originalWidth: 0,
                originalHeight: 0,
                index: 0,
                rotate: !1,
                splits: null,
                pads: null,
              }),
              (r.AtlasReader = function (t) {
                this.lines = t.split(/\r\n|\r|\n/);
              }),
              (r.AtlasReader.prototype = {
                index: 0,
                trim: function (t) {
                  return t.replace(/^\s+|\s+$/g, '');
                },
                readLine: function () {
                  return this.index >= this.lines.length ? null : this.lines[this.index++];
                },
                readValue: function () {
                  var t = this.readLine(),
                    e = t.indexOf(':');
                  if (-1 == e) throw 'Invalid line: ' + t;
                  return this.trim(t.substring(e + 1));
                },
                readTuple: function (t) {
                  var e = this.readLine(),
                    i = e.indexOf(':');
                  if (-1 == i) throw 'Invalid line: ' + e;
                  for (var r = 0, n = i + 1; 3 > r; r++) {
                    var o = e.indexOf(',', n);
                    if (-1 == o) break;
                    (t[r] = this.trim(e.substr(n, o - n))), (n = o + 1);
                  }
                  return (t[r] = this.trim(e.substring(n))), r + 1;
                },
              }),
              (r.AtlasAttachmentParser = function (t) {
                this.atlas = t;
              }),
              (r.AtlasAttachmentParser.prototype = {
                newRegionAttachment: function (t, e, i) {
                  var n = this.atlas.findRegion(i);
                  if (!n) throw 'Region not found in atlas: ' + i + ' (region attachment: ' + e + ')';
                  var o = new r.RegionAttachment(e);
                  return (
                    (o.rendererObject = n),
                    o.setUVs(n.u, n.v, n.u2, n.v2, n.rotate),
                    (o.regionOffsetX = n.offsetX),
                    (o.regionOffsetY = n.offsetY),
                    (o.regionWidth = n.width),
                    (o.regionHeight = n.height),
                    (o.regionOriginalWidth = n.originalWidth),
                    (o.regionOriginalHeight = n.originalHeight),
                    o
                  );
                },
                newMeshAttachment: function (t, e, i) {
                  var n = this.atlas.findRegion(i);
                  if (!n) throw 'Region not found in atlas: ' + i + ' (mesh attachment: ' + e + ')';
                  var o = new r.MeshAttachment(e);
                  return (
                    (o.rendererObject = n),
                    (o.regionU = n.u),
                    (o.regionV = n.v),
                    (o.regionU2 = n.u2),
                    (o.regionV2 = n.v2),
                    (o.regionRotate = n.rotate),
                    (o.regionOffsetX = n.offsetX),
                    (o.regionOffsetY = n.offsetY),
                    (o.regionWidth = n.width),
                    (o.regionHeight = n.height),
                    (o.regionOriginalWidth = n.originalWidth),
                    (o.regionOriginalHeight = n.originalHeight),
                    o
                  );
                },
                newSkinnedMeshAttachment: function (t, e, i) {
                  var n = this.atlas.findRegion(i);
                  if (!n) throw 'Region not found in atlas: ' + i + ' (skinned mesh attachment: ' + e + ')';
                  var o = new r.SkinnedMeshAttachment(e);
                  return (
                    (o.rendererObject = n),
                    (o.regionU = n.u),
                    (o.regionV = n.v),
                    (o.regionU2 = n.u2),
                    (o.regionV2 = n.v2),
                    (o.regionRotate = n.rotate),
                    (o.regionOffsetX = n.offsetX),
                    (o.regionOffsetY = n.offsetY),
                    (o.regionWidth = n.width),
                    (o.regionHeight = n.height),
                    (o.regionOriginalWidth = n.originalWidth),
                    (o.regionOriginalHeight = n.originalHeight),
                    o
                  );
                },
                newBoundingBoxAttachment: function (t, e) {
                  return new r.BoundingBoxAttachment(e);
                },
              }),
              (r.SkeletonBounds = function () {
                (this.polygonPool = []), (this.polygons = []), (this.boundingBoxes = []);
              }),
              (r.SkeletonBounds.prototype = {
                minX: 0,
                minY: 0,
                maxX: 0,
                maxY: 0,
                update: function (t, e) {
                  var i = t.slots,
                    n = i.length,
                    o = t.x,
                    s = t.y,
                    a = this.boundingBoxes,
                    h = this.polygonPool,
                    l = this.polygons;
                  a.length = 0;
                  for (var u = 0, c = l.length; c > u; u++) h.push(l[u]);
                  l.length = 0;
                  for (var u = 0; n > u; u++) {
                    var d = i[u],
                      p = d.attachment;
                    if (p.type == r.AttachmentType.boundingbox) {
                      a.push(p);
                      var f,
                        m = h.length;
                      m > 0 ? ((f = h[m - 1]), h.splice(m - 1, 1)) : (f = []),
                        l.push(f),
                        (f.length = p.vertices.length),
                        p.computeWorldVertices(o, s, d.bone, f);
                    }
                  }
                  e && this.aabbCompute();
                },
                aabbCompute: function () {
                  for (
                    var t = this.polygons,
                      e = Number.MAX_VALUE,
                      i = Number.MAX_VALUE,
                      r = Number.MIN_VALUE,
                      n = Number.MIN_VALUE,
                      o = 0,
                      s = t.length;
                    s > o;
                    o++
                  )
                    for (var a = t[o], h = 0, l = a.length; l > h; h += 2) {
                      var u = a[h],
                        c = a[h + 1];
                      (e = Math.min(e, u)), (i = Math.min(i, c)), (r = Math.max(r, u)), (n = Math.max(n, c));
                    }
                  (this.minX = e), (this.minY = i), (this.maxX = r), (this.maxY = n);
                },
                aabbContainsPoint: function (t, e) {
                  return t >= this.minX && t <= this.maxX && e >= this.minY && e <= this.maxY;
                },
                aabbIntersectsSegment: function (t, e, i, r) {
                  var n = this.minX,
                    o = this.minY,
                    s = this.maxX,
                    a = this.maxY;
                  if ((n >= t && n >= i) || (o >= e && o >= r) || (t >= s && i >= s) || (e >= a && r >= a)) return !1;
                  var h = (r - e) / (i - t),
                    l = h * (n - t) + e;
                  if (l > o && a > l) return !0;
                  if (((l = h * (s - t) + e), l > o && a > l)) return !0;
                  var u = (o - e) / h + t;
                  return u > n && s > u ? !0 : ((u = (a - e) / h + t), u > n && s > u ? !0 : !1);
                },
                aabbIntersectsSkeleton: function (t) {
                  return this.minX < t.maxX && this.maxX > t.minX && this.minY < t.maxY && this.maxY > t.minY;
                },
                containsPoint: function (t, e) {
                  for (var i = this.polygons, r = 0, n = i.length; n > r; r++)
                    if (this.polygonContainsPoint(i[r], t, e)) return this.boundingBoxes[r];
                  return null;
                },
                intersectsSegment: function (t, e, i, r) {
                  for (var n = this.polygons, o = 0, s = n.length; s > o; o++)
                    if (n[o].intersectsSegment(t, e, i, r)) return this.boundingBoxes[o];
                  return null;
                },
                polygonContainsPoint: function (t, e, i) {
                  for (var r = t.length, n = r - 2, o = !1, s = 0; r > s; s += 2) {
                    var a = t[s + 1],
                      h = t[n + 1];
                    if ((i > a && h >= i) || (i > h && a >= i)) {
                      var l = t[s];
                      l + ((i - a) / (h - a)) * (t[n] - l) < e && (o = !o);
                    }
                    n = s;
                  }
                  return o;
                },
                polygonIntersectsSegment: function (t, e, i, r, n) {
                  for (
                    var o = t.length, s = e - r, a = i - n, h = e * n - i * r, l = t[o - 2], u = t[o - 1], c = 0;
                    o > c;
                    c += 2
                  ) {
                    var d = t[c],
                      p = t[c + 1],
                      f = l * p - u * d,
                      m = l - d,
                      v = u - p,
                      g = s * v - a * m,
                      y = (h * m - s * f) / g;
                    if (((y >= l && d >= y) || (y >= d && l >= y)) && ((y >= e && r >= y) || (y >= r && e >= y))) {
                      var x = (h * v - a * f) / g;
                      if (((x >= u && p >= x) || (x >= p && u >= x)) && ((x >= i && n >= x) || (x >= n && i >= x)))
                        return !0;
                    }
                    (l = d), (u = p);
                  }
                  return !1;
                },
                getPolygon: function (t) {
                  var e = this.boundingBoxes.indexOf(t);
                  return -1 == e ? null : this.polygons[e];
                },
                getWidth: function () {
                  return this.maxX - this.minX;
                },
                getHeight: function () {
                  return this.maxY - this.minY;
                },
              });
          },
          { '../core': 20 },
        ],
        115: [
          function (t, e) {
            e.exports = { Spine: t('./Spine'), runtime: t('./SpineRuntime') };
          },
          { './Spine': 113, './SpineRuntime': 114 },
        ],
        116: [
          function (t, e) {
            function i(t, e) {
              r.Container.call(this),
                (this.textWidth = 0),
                (this.textHeight = 0),
                (this._glyphs = []),
                (this._style = { tint: e.tint, align: e.align, fontName: null, fontSize: 0 }),
                (this.font = e.font),
                (this._text = t),
                (this.maxWidth = 0),
                (this.dirty = !1),
                this.updateText();
            }
            var r = t('../core');
            (i.prototype = Object.create(r.Container.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              Object.defineProperties(i.prototype, {
                tint: {
                  get: function () {
                    return this._style.tint;
                  },
                  set: function (t) {
                    (this._style.tint = 'number' == typeof t && t >= 0 ? t : 16777215), (this.dirty = !0);
                  },
                },
                align: {
                  get: function () {
                    return this._style.align;
                  },
                  set: function (t) {
                    (this._style.align = t), (this.dirty = !0);
                  },
                },
                font: {
                  get: function () {
                    return this._style.font;
                  },
                  set: function (t) {
                    'string' == typeof t
                      ? ((t = t.split(' ')),
                        (this._style.fontName = t.slice(1).join(' ')),
                        (this._style.fontSize = t.length >= 2 ? parseInt(t[0], 10) : i.fonts[this.fontName].size))
                      : ((this._style.fontName = t.name),
                        (this._style.fontSize = 'number' == typeof t.size ? t.size : parseInt(t.size, 10))),
                      (this.dirty = !0);
                  },
                },
                text: {
                  get: function () {
                    return this._text;
                  },
                  set: function (t) {
                    (this._text = t), (this.dirty = !0);
                  },
                },
              }),
              (i.prototype.updateText = function () {
                for (
                  var t = i.fonts[this.fontName],
                    e = new r.math.Point(),
                    n = null,
                    o = [],
                    s = 0,
                    a = 0,
                    h = [],
                    l = 0,
                    u = this.fontSize / t.size,
                    c = -1,
                    d = 0;
                  d < this.text.length;
                  d++
                ) {
                  var p = this.text.charCodeAt(d);
                  if (((c = /(\s)/.test(this.text.charAt(d)) ? d : c), /(?:\r\n|\r|\n)/.test(this.text.charAt(d))))
                    h.push(s), (a = Math.max(a, s)), l++, (e.x = 0), (e.y += t.lineHeight), (n = null);
                  else if (-1 !== c && this.maxWidth > 0 && e.x * u > this.maxWidth)
                    o.splice(c, d - c),
                      (d = c),
                      (c = -1),
                      h.push(s),
                      (a = Math.max(a, s)),
                      l++,
                      (e.x = 0),
                      (e.y += t.lineHeight),
                      (n = null);
                  else {
                    var f = t.chars[p];
                    f &&
                      (n && f.kerning[n] && (e.x += f.kerning[n]),
                      o.push({
                        texture: f.texture,
                        line: l,
                        charCode: p,
                        position: new r.math.Point(e.x + f.xOffset, e.y + f.yOffset),
                      }),
                      (s = e.x + (f.texture.width + f.xOffset)),
                      (e.x += f.xAdvance),
                      (n = p));
                  }
                }
                h.push(s), (a = Math.max(a, s));
                var m = [];
                for (d = 0; l >= d; d++) {
                  var v = 0;
                  'right' === this.style.align ? (v = a - h[d]) : 'center' === this.style.align && (v = (a - h[d]) / 2),
                    m.push(v);
                }
                var g = o.length,
                  y = this.tint;
                for (d = 0; g > d; d++) {
                  var x = this._glyphs[d];
                  x ? (x.texture = o[d].texture) : ((x = new r.Sprite(o[d].texture)), this._glyphs.push(x)),
                    (x.position.x = (o[d].position.x + m[o[d].line]) * u),
                    (x.position.y = o[d].position.y * u),
                    (x.scale.x = x.scale.y = u),
                    (x.tint = y),
                    x.parent || this.addChild(x);
                }
                for (d = g; d < this._glyphs.length; ++d) this.removeChild(this._glyphs[d]);
                (this.textWidth = a * u), (this.textHeight = (e.y + t.lineHeight) * u);
              }),
              (i.prototype.updateTransform = function () {
                this.dirty && (this.updateText(), (this.dirty = !1)), this.containerUpdateTransform();
              }),
              (i.fonts = {});
          },
          { '../core': 20 },
        ],
        117: [
          function (t, e) {
            function i(t, e, i) {
              (this.canvas = document.createElement('canvas')),
                (this.context = this.canvas.getContext('2d')),
                (this.resolution = i || r.RESOLUTION),
                (this._text = null),
                (this._style = null),
                r.Sprite.call(this, r.Texture.fromCanvas(this.canvas)),
                (this.text = t),
                (this.style = e);
            }
            var r = t('../core');
            (i.prototype = Object.create(r.Sprite.prototype)),
              (i.prototype.constructor = i),
              (e.exports = i),
              (i.fontPropertiesCache = {}),
              (i.fontPropertiesCanvas = document.createElement('canvas')),
              (i.fontPropertiesContext = i.fontPropertiesCanvas.getContext('2d')),
              Object.defineProperties(i.prototype, {
                width: {
                  get: function () {
                    return this.dirty && this.updateText(), this.scale.x * this._texture._frame.width;
                  },
                  set: function (t) {
                    (this.scale.x = t / this._texture._frame.width), (this._width = t);
                  },
                },
                height: {
                  get: function () {
                    return this.dirty && this.updateText(), this.scale.y * this._texture._frame.height;
                  },
                  set: function (t) {
                    (this.scale.y = t / this._texture._frame.height), (this._height = t);
                  },
                },
                style: {
                  get: function () {
                    return this._style;
                  },
                  set: function (t) {
                    (t = t || {}),
                      (t.font = t.font || 'bold 20pt Arial'),
                      (t.fill = t.fill || 'black'),
                      (t.align = t.align || 'left'),
                      (t.stroke = t.stroke || 'black'),
                      (t.strokeThickness = t.strokeThickness || 0),
                      (t.wordWrap = t.wordWrap || !1),
                      (t.wordWrapWidth = t.wordWrapWidth || 100),
                      (t.dropShadow = t.dropShadow || !1),
                      (t.dropShadowColor = t.dropShadowColor || '#000000'),
                      (t.dropShadowAngle = t.dropShadowAngle || Math.PI / 6),
                      (t.dropShadowDistance = t.dropShadowDistance || 5),
                      (this._style = t),
                      (this.dirty = !0);
                  },
                },
                text: {
                  get: function () {
                    return this._text;
                  },
                  set: function (t) {
                    (t = t.toString() || ' '), this._text !== t && ((this._text = t), (this.dirty = !0));
                  },
                },
              }),
              (i.prototype.updateText = function () {
                var t = this._style;
                this.context.font = t.font;
                for (
                  var e = t.wordWrap ? this.wordWrap(this._text) : this._text,
                    i = e.split(/(?:\r\n|\r|\n)/),
                    r = new Array(i.length),
                    n = 0,
                    o = this.determineFontProperties(t.font),
                    s = 0;
                  s < i.length;
                  s++
                ) {
                  var a = this.context.measureText(i[s]).width;
                  (r[s] = a), (n = Math.max(n, a));
                }
                var h = n + t.strokeThickness;
                t.dropShadow && (h += t.dropShadowDistance),
                  (this.canvas.width = (h + this.context.lineWidth) * this.resolution);
                var l = o.fontSize + t.strokeThickness,
                  u = l * i.length;
                t.dropShadow && (u += t.dropShadowDistance),
                  (this.canvas.height = u * this.resolution),
                  this.context.scale(this.resolution, this.resolution),
                  navigator.isCocoonJS && this.context.clearRect(0, 0, this.canvas.width, this.canvas.height),
                  (this.context.font = t.font),
                  (this.context.strokeStyle = t.stroke),
                  (this.context.lineWidth = t.strokeThickness),
                  (this.context.textBaseline = 'alphabetic');
                var c, d;
                if (t.dropShadow) {
                  this.context.fillStyle = t.dropShadowColor;
                  var p = Math.cos(t.dropShadowAngle) * t.dropShadowDistance,
                    f = Math.sin(t.dropShadowAngle) * t.dropShadowDistance;
                  for (s = 0; s < i.length; s++)
                    (c = t.strokeThickness / 2),
                      (d = t.strokeThickness / 2 + s * l + o.ascent),
                      'right' === t.align ? (c += n - r[s]) : 'center' === t.align && (c += (n - r[s]) / 2),
                      t.fill && this.context.fillText(i[s], c + p, d + f);
                }
                for (this.context.fillStyle = t.fill, s = 0; s < i.length; s++)
                  (c = t.strokeThickness / 2),
                    (d = t.strokeThickness / 2 + s * l + o.ascent),
                    'right' === t.align ? (c += n - r[s]) : 'center' === t.align && (c += (n - r[s]) / 2),
                    t.stroke && t.strokeThickness && this.context.strokeText(i[s], c, d),
                    t.fill && this.context.fillText(i[s], c, d);
                this.updateTexture();
              }),
              (i.prototype.updateTexture = function () {
                (this._texture.baseTexture.hasLoaded = !0),
                  (this._texture.baseTexture.resolution = this.resolution),
                  (this._texture.baseTexture.width = this.canvas.width / this.resolution),
                  (this._texture.baseTexture.height = this.canvas.height / this.resolution),
                  (this._texture.crop.width = this._texture._frame.width = this.canvas.width / this.resolution),
                  (this._texture.crop.height = this._texture._frame.height = this.canvas.height / this.resolution),
                  (this._width = this.canvas.width / this.resolution),
                  (this._height = this.canvas.height / this.resolution),
                  this._texture.update(),
                  (this.dirty = !1);
              }),
              (i.prototype.renderWebGL = function (t) {
                this.dirty && ((this.resolution = t.resolution), this.updateText()),
                  r.Sprite.prototype.renderWebGL.call(this, t);
              }),
              (i.prototype.renderCanvas = function (t) {
                this.dirty && ((this.resolution = t.resolution), this.updateText()),
                  r.Sprite.prototype.renderCanvas.call(this, t);
              }),
              (i.prototype.determineFontProperties = function (t) {
                var e = i.fontPropertiesCache[t];
                if (!e) {
                  e = {};
                  var r = i.fontPropertiesCanvas,
                    n = i.fontPropertiesContext;
                  n.font = t;
                  var o = Math.ceil(n.measureText('|Mq').width),
                    s = Math.ceil(n.measureText('M').width),
                    a = 2 * s;
                  (s = (1.4 * s) | 0),
                    (r.width = o),
                    (r.height = a),
                    (n.fillStyle = '#f00'),
                    n.fillRect(0, 0, o, a),
                    (n.font = t),
                    (n.textBaseline = 'alphabetic'),
                    (n.fillStyle = '#000'),
                    n.fillText('|M�q', 0, s);
                  var h,
                    l,
                    u = n.getImageData(0, 0, o, a).data,
                    c = u.length,
                    d = 4 * o,
                    p = 0,
                    f = !1;
                  for (h = 0; s > h; h++) {
                    for (l = 0; d > l; l += 4)
                      if (255 !== u[p + l]) {
                        f = !0;
                        break;
                      }
                    if (f) break;
                    p += d;
                  }
                  for (e.ascent = s - h, p = c - d, f = !1, h = a; h > s; h--) {
                    for (l = 0; d > l; l += 4)
                      if (255 !== u[p + l]) {
                        f = !0;
                        break;
                      }
                    if (f) break;
                    p -= d;
                  }
                  (e.descent = h - s),
                    (e.descent += 6),
                    (e.fontSize = e.ascent + e.descent),
                    (i.fontPropertiesCache[t] = e);
                }
                return e;
              }),
              (i.prototype.wordWrap = function (t) {
                for (var e = '', i = t.split('\n'), r = this._style.wordWrapWidth, n = 0; n < i.length; n++) {
                  for (var o = r, s = i[n].split(' '), a = 0; a < s.length; a++) {
                    var h = this.context.measureText(s[a]).width,
                      l = h + this.context.measureText(' ').width;
                    0 === a || l > o ? (a > 0 && (e += '\n'), (e += s[a]), (o = r - h)) : ((o -= l), (e += ' ' + s[a]));
                  }
                  n < i.length - 1 && (e += '\n');
                }
                return e;
              }),
              (i.prototype.getBounds = function (t) {
                return this.dirty && this.updateText(), r.Sprite.prototype.getBounds.call(this, t);
              }),
              (i.prototype.destroy = function (t) {
                (this.context = null), (this.canvas = null), this._texture.destroy(void 0 === t ? !0 : t);
              });
          },
          { '../core': 20 },
        ],
        118: [
          function (t, e) {
            e.exports = { Text: t('./Text'), BitmapText: t('./BitmapText') };
          },
          { './BitmapText': 116, './Text': 117 },
        ],
      },
      {},
      [1],
    )(1);
  }),
  (function (t) {
    function e(t, e, i, r, n) {
      (this._listener = e), (this._isOnce = i), (this.context = r), (this._signal = t), (this._priority = n || 0);
    }
    function i(t, e) {
      if ('function' != typeof t)
        throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', e));
    }
    function r() {
      (this._bindings = []), (this._prevParams = null);
      var t = this;
      this.dispatch = function () {
        r.prototype.dispatch.apply(t, arguments);
      };
    }
    (e.prototype = {
      active: !0,
      params: null,
      execute: function (t) {
        var e, i;
        return (
          this.active &&
            this._listener &&
            ((i = this.params ? this.params.concat(t) : t),
            (e = this._listener.apply(this.context, i)),
            this._isOnce && this.detach()),
          e
        );
      },
      detach: function () {
        return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
      },
      isBound: function () {
        return !!this._signal && !!this._listener;
      },
      isOnce: function () {
        return this._isOnce;
      },
      getListener: function () {
        return this._listener;
      },
      getSignal: function () {
        return this._signal;
      },
      _destroy: function () {
        delete this._signal, delete this._listener, delete this.context;
      },
      toString: function () {
        return (
          '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']'
        );
      },
    }),
      (r.prototype = {
        VERSION: '1.0.0',
        memorize: !1,
        _shouldPropagate: !0,
        active: !0,
        _registerListener: function (t, i, r, n) {
          var o,
            s = this._indexOfListener(t, r);
          if (-1 !== s) {
            if (((o = this._bindings[s]), o.isOnce() !== i))
              throw new Error(
                'You cannot add' +
                  (i ? '' : 'Once') +
                  '() then add' +
                  (i ? 'Once' : '') +
                  '() the same listener without removing the relationship first.',
              );
          } else (o = new e(this, t, i, r, n)), this._addBinding(o);
          return this.memorize && this._prevParams && o.execute(this._prevParams), o;
        },
        _addBinding: function (t) {
          var e = this._bindings.length;
          do --e;
          while (this._bindings[e] && t._priority <= this._bindings[e]._priority);
          this._bindings.splice(e + 1, 0, t);
        },
        _indexOfListener: function (t, e) {
          for (var i, r = this._bindings.length; r--; )
            if (((i = this._bindings[r]), i._listener === t && i.context === e)) return r;
          return -1;
        },
        has: function (t, e) {
          return -1 !== this._indexOfListener(t, e);
        },
        add: function (t, e, r) {
          return i(t, 'add'), this._registerListener(t, !1, e, r);
        },
        addOnce: function (t, e, r) {
          return i(t, 'addOnce'), this._registerListener(t, !0, e, r);
        },
        remove: function (t, e) {
          i(t, 'remove');
          var r = this._indexOfListener(t, e);
          return -1 !== r && (this._bindings[r]._destroy(), this._bindings.splice(r, 1)), t;
        },
        removeAll: function () {
          for (var t = this._bindings.length; t--; ) this._bindings[t]._destroy();
          this._bindings.length = 0;
        },
        getNumListeners: function () {
          return this._bindings.length;
        },
        halt: function () {
          this._shouldPropagate = !1;
        },
        dispatch: function () {
          if (this.active) {
            var t,
              e = Array.prototype.slice.call(arguments),
              i = this._bindings.length;
            if ((this.memorize && (this._prevParams = e), i)) {
              (t = this._bindings.slice()), (this._shouldPropagate = !0);
              do i--;
              while (t[i] && this._shouldPropagate && t[i].execute(e) !== !1);
            }
          }
        },
        forget: function () {
          this._prevParams = null;
        },
        dispose: function () {
          this.removeAll(), delete this._bindings, delete this._prevParams;
        },
        toString: function () {
          return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
        },
      });
    var n = r;
    (n.Signal = r),
      'function' == typeof define && define.amd
        ? define('signals', [], function () {
            return n;
          })
        : 'undefined' != typeof module && module.exports
          ? (module.exports = n)
          : (t.signals = n);
  })(this),
  define('com/fido/loader/Cache', ['require', 'exports', 'module'], function (t, e, i) {
    var r = function () {
      (this._json = {}), (this._text = {});
    };
    (r.prototype.addJson = function (t, e) {
      this._json[e] = t;
    }),
      (r.prototype.addText = function (t, e) {
        this._text[e] = t;
      }),
      (r.prototype.getJson = function (t) {
        return this._json[t] ? this._json[t] : void 0;
      }),
      (r.prototype.getText = function (t) {
        return this._text[t] ? this._text[t] : void 0;
      }),
      (i.exports = new r());
  }),
  define(
    'com/fido/loader/Loader',
    ['require', 'exports', 'module', 'PIXI', 'signals', 'com/fido/loader/Cache'],
    function (t, e, i) {
      var r = t('PIXI'),
        n = t('signals'),
        o = t('com/fido/loader/Cache'),
        s = function () {
          (this.crossdomain = !1),
            window.XDomainRequest && this.crossdomain
              ? ((this.ajaxRequest = new window.XDomainRequest()),
                (this.ajaxRequest.timeout = 3e3),
                (this.ajaxRequest.onerror = function () {}),
                (this.ajaxRequest.ontimeout = function () {}),
                (this.ajaxRequest.onprogress = function () {}))
              : window.XMLHttpRequest && (this.ajaxRequest = new window.XMLHttpRequest()),
            (this.ajaxRequest.onload = this._onFileLoaded.bind(this)),
            (this.ajaxRequest.onreadystatechange = function () {}),
            (this.fileCount = 0),
            (this.filesToLoad = []),
            (this.fontsToLoad = []),
            (this.pixiAssetsToLoad = []),
            (this.soundsToLoad = []),
            (this.customToLoad = []),
            (this.onComplete = new n()),
            (this.onProgress = new n());
        };
      (s.prototype.addFonts = function (t) {
        this.fontsToLoad = this.fontsToLoad.concat(t);
      }),
        (s.prototype.addText = function (t, e) {
          var i = { url: t, id: e, type: s.TEXT };
          this.filesToLoad.push(i);
        }),
        (s.prototype.addJson = function (t, e) {
          var i = { url: t, id: e, type: s.JSON };
          this.filesToLoad.push(i);
        }),
        (s.prototype.addPixiAssets = function (t) {
          this.pixiAssetsToLoad = this.pixiAssetsToLoad.concat(t);
        }),
        (s.prototype.addCSS = function (t) {
          var e = document.createElement('link');
          (e.type = 'text/css'),
            (e.rel = 'stylesheet'),
            (e.href = t),
            document.getElementsByTagName('head')[0].appendChild(e);
        }),
        (s.prototype.addCustom = function (t) {
          var e = { object: t, type: s.CUSTOM };
          this.filesToLoad.push(e);
        }),
        (s.prototype.load = function () {
          this._loadFonts();
        }),
        (s.prototype._loadFiles = function () {
          (this.fileCount = 0), this.filesToLoad.length ? this._loadNextFile() : this._loadPixiAssets();
        }),
        (s.prototype._loadNextFile = function () {
          var t = this.filesToLoad[this.fileCount];
          t.type === s.CUSTOM
            ? (t.object.onLoaded.addOnce(this._onFileLoaded, this), t.object.load())
            : (this.ajaxRequest.open('GET', t.url, !0), this.ajaxRequest.send());
        }),
        (s.prototype._onFileLoaded = function () {
          var t = this.filesToLoad[this.fileCount];
          if (t.type === s.CUSTOM);
          else if (200 !== this.ajaxRequest.status);
          else
            switch (t.type) {
              case s.TEXT:
                var e = this.ajaxRequest.responseText;
                o.addText(e, t.id);
                break;
              case s.JSON:
                var i = JSON.parse(this.ajaxRequest.responseText);
                o.addJson(i, t.id);
            }
          this.fileCount++,
            this._onProgress(),
            this.fileCount === this.filesToLoad.length ? this._loadPixiAssets() : this._loadNextFile();
        }),
        (s.prototype._loadPixiAssets = function () {
          return 0 === this.pixiAssetsToLoad.length
            ? void this._onComplete()
            : ((this.pixiAssetLoader = new r.loaders.Loader()),
              this.pixiAssetLoader.addList(this.pixiAssetsToLoad),
              void this.pixiAssetLoader.load(
                function () {
                  this._onProgress(), this._onComplete();
                }.bind(this),
              ));
        }),
        (s.prototype._loadFonts = function () {
          return 0 === this.fontsToLoad.length
            ? void this._loadFiles()
            : ((WebFontConfig = {
                google: { families: this.fontsToLoad },
                active: function () {
                  this._loadFiles();
                }.bind(this),
              }),
              void (function () {
                var t = document.createElement('script');
                (t.src =
                  ('https:' == document.location.protocol ? 'https' : 'http') +
                  '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'),
                  (t.type = 'text/javascript'),
                  (t.async = 'true');
                var e = document.getElementsByTagName('script')[0];
                e.parentNode.insertBefore(t, e);
              })());
        }),
        (s.prototype._onComplete = function () {
          this.onComplete.dispatch();
        }),
        (s.prototype._onProgress = function () {
          var t = (this.filesToLoad.length + this.pixiAssetsToLoad.length, this.fileCount);
          this.pixiAssetLoader && (t += this.pixiAssetsToLoad.length - this.pixiAssetLoader.loadCount),
            this.onProgress.dispatch(1);
        }),
        (s.TEXT = 0),
        (s.JSON = 1),
        (s.CUSTOM = 2),
        (i.exports = s);
    },
  ),
  define('com/fido/app/transitions/AlphaTransition', ['require', 'exports', 'module'], function (t, e, i) {
    (AlphaTransition = function () {}),
      (AlphaTransition.constructor = AlphaTransition),
      (AlphaTransition.prototype.begin = function (t, e, i) {
        (this.screenManager = t),
          (this.currentScreen = e),
          (this.nextScreen = i),
          this.currentScreen
            ? (this.currentScreen.onHide && this.currentScreen.onHide(),
              TweenLite.to(this.currentScreen, 0.4, { alpha: 0, onComplete: this.onFadeout.bind(this) }))
            : this.onFadeout();
      }),
      (AlphaTransition.prototype.onFadeout = function () {
        this.currentScreen &&
          (this.currentScreen.onHidden && this.currentScreen.onHidden(),
          this.screenManager.container.removeChild(this.currentScreen),
          (this.currentScreen.alpha = 1)),
          (this.nextScreen.alpha = 0),
          this.nextScreen.onShow && this.nextScreen.onShow(),
          this.nextScreen.resize && this.nextScreen.resize(this.screenManager.w, this.screenManager.h),
          TweenLite.to(this.nextScreen, 0.4, { alpha: 1, onComplete: this.onFadein.bind(this) }),
          this.screenManager.container.addChild(this.nextScreen);
      }),
      (AlphaTransition.prototype.onFadein = function () {
        this.nextScreen.onShown && this.nextScreen.onShown(), this.screenManager.onTransitionComplete();
      }),
      (AlphaTransition.prototype.resize = function (t, e) {
        (this.w = t), (this.h = e);
      }),
      (i.exports = AlphaTransition);
  }),
  define(
    'com/fido/app/ScreenManager',
    ['require', 'exports', 'module', 'PIXI', './transitions/AlphaTransition'],
    function (t, e, i) {
      var r = t('PIXI'),
        n = t('./transitions/AlphaTransition'),
        o = function (t, e, i) {
          (this.container = t || new r.DisplayObjectContainer()),
            (this.screens = {}),
            this.currentScreen,
            (this.fading = !1),
            (this.w = e || 400),
            (this.h = i || 400),
            (this.history = []),
            (this.defaultTransition = new n()),
            (this.transition = this.defaultTransition),
            (this.active = !1);
        };
      (o.constructor = o),
        (o.prototype.gotoScreenByID = function (t, e) {
          var i = this.screens[t];
          if (!i) throw new Error('screen not found with id : ', t);
          this.gotoScreen(i, e);
        }),
        (o.prototype.addScreen = function (t, e) {
          (this.screens[e] = t), (t._screenID = e), (t.screenManager = this);
        }),
        (o.prototype.goBack = function () {
          this.history.pop();
          var t = this.history.pop();
          t && this.gotoScreen(t);
        }),
        (o.prototype.getScreenId = function (t) {
          for (var e in this.screens) if (this.screens[e] === t) return e;
          return null;
        }),
        (o.prototype.gotoScreen = function (t) {
          if (this.currentScreen !== t && (this.history.push(t), (this.nextScreen = t), !this.active)) {
            (this.active = !0),
              (this.transition = t.transition || this.defaultTransition),
              this.transition.onResize && this.transition.onResize(this.w, this.h);
            var e = this.currentScreen;
            this.nextScreen && this.nextScreen.resize && this.nextScreen.resize(this.w, this.h),
              (this.currentScreen = t),
              this.transition.begin(this, e, this.nextScreen);
          }
        }),
        (o.prototype.onTransitionComplete = function () {
          (this.active = !1), this.currentScreen != this.nextScreen && this.gotoScreen(this.nextScreen);
        }),
        (o.prototype.resize = function (t, e) {
          (this.w = t),
            (this.h = e),
            this.transition.onResize && this.transition.onResize(t, e),
            this.currentScreen && this.currentScreen.resize && this.currentScreen.resize(t, e);
        }),
        (i.exports = o);
    },
  ),
  define('com/fido/system/Ticker', ['require', 'exports', 'module', 'signals'], function (t, e, i) {
    var r = t('signals'),
      n = function () {
        (this.onUpdate = new r()),
          (this.updateBind = this.update.bind(this)),
          (this.active = !1),
          (this.deltaTime = 1),
          (this.timeElapsed = 0),
          (this.lastTime = 0),
          (this.speed = 1);
      };
    (n.prototype.start = function () {
      this.active || ((this.active = !0), requestAnimationFrame(this.updateBind));
    }),
      (n.prototype.stop = function () {
        this.active && (this.active = !1);
      }),
      (n.prototype.update = function () {
        if (this.active) {
          requestAnimationFrame(this.updateBind);
          var t = new Date().getTime(),
            e = t - this.lastTime;
          e > 100 && (e = 100),
            (this.deltaTime = 0.06 * e),
            (this.deltaTime *= this.speed),
            this.onUpdate.dispatch(this.deltaTime),
            (this.lastTime = t);
        }
      }),
      (n.prototype.add = function (t, e) {
        this.onUpdate.add(t, e);
      }),
      (n.prototype.remove = function (t, e) {
        this.onUpdate.remove(t, e);
      }),
      (n.instance = new n()),
      (i.exports = n);
  }),
  define('com/fido/system/Device', ['require', 'exports', 'module'], function (t, e, i) {
    (Device = function () {
      (this.arora = !1),
        (this.chrome = !1),
        (this.epiphany = !1),
        (this.firefox = !1),
        (this.mobileSafari = !1),
        (this.ie = !1),
        (this.ieVersion = 0),
        (this.midori = !1),
        (this.opera = !1),
        (this.safari = !1),
        (this.webApp = !1),
        (this.cocoonJS = !1),
        (this.android = !1),
        (this.chromeOS = !1),
        (this.iOS = !1),
        (this.linux = !1),
        (this.macOS = !1),
        (this.windows = !1),
        (this.desktop = !1),
        (this.pixelRatio = 0),
        (this.iPhone = !1),
        (this.iPhone4 = !1),
        (this.iPad = !1),
        (this.blob = !1),
        (this.canvas = !1),
        (this.localStorage = !1),
        (this.file = !1),
        (this.fileSystem = !1),
        (this.webGL = !1),
        (this.worker = !1),
        (this.audioData = !1),
        (this.webAudio = !1),
        (this.ogg = !1),
        (this.opus = !1),
        (this.mp3 = !1),
        (this.wav = !1),
        (this.m4a = !1),
        (this.webm = !1);
      var t = navigator.userAgent;
      this._checkBrowser(t),
        this._checkOS(t),
        this._checkDevice(t),
        this._checkAudio(),
        this._checkFeatures(),
        this._checkIsMobile();
    }),
      (Device.prototype._checkBrowser = function (t) {
        /Arora/.test(t)
          ? (this.arora = !0)
          : /Chrome/.test(t)
            ? (this.chrome = !0)
            : /Epiphany/.test(t)
              ? (this.epiphany = !0)
              : /Firefox/.test(t)
                ? (this.firefox = !0)
                : /Mobile Safari/.test(t)
                  ? (this.mobileSafari = !0)
                  : /MSIE (\d+\.\d+);/.test(t) || navigator.userAgent.match(/Trident.*rv[ :]*11\./)
                    ? ((this.ie = !0), (this.ieVersion = parseInt(RegExp.$1, 10)))
                    : /Midori/.test(t)
                      ? (this.midori = !0)
                      : /Opera/.test(t)
                        ? (this.opera = !0)
                        : /Safari/.test(t) && (this.safari = !0),
          navigator.standalone && (this.webApp = !0),
          navigator.isCocoonJS && (this.cocoonJS = !0);
      }),
      (Device.prototype._checkOS = function (t) {
        /Android/.test(t)
          ? (this.android = !0)
          : /CrOS/.test(t)
            ? (this.chromeOS = !0)
            : /iP[ao]d|iPhone/i.test(t)
              ? ((this.iOS = !0),
                (this.iOS_version =
                  parseFloat(
                    (
                      '' +
                      (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1]
                    )
                      .replace('undefined', '3_2')
                      .replace('_', '.')
                      .replace('_', ''),
                  ) || !1))
              : /Linux/.test(t)
                ? (this.linux = !0)
                : /Mac OS/.test(t)
                  ? (this.macOS = !0)
                  : /Windows/.test(t) && (this.windows = !0),
          (this.windows || this.macOS || this.linux) && (this.desktop = !0);
      }),
      (Device.prototype._checkDevice = function () {
        (this.pixelRatio = window.devicePixelRatio || 1),
          (this.iPhone = -1 !== navigator.userAgent.toLowerCase().indexOf('iphone')),
          (this.iPhone4 = 2 === this.pixelRatio && this.iPhone),
          (this.iPad = -1 !== navigator.userAgent.toLowerCase().indexOf('ipad'));
      }),
      (Device.prototype._checkFeatures = function () {
        'undefined' != typeof window.Blob && (this.blob = !0), (this.canvas = !!window.CanvasRenderingContext2D);
        try {
          this.localStorage = !!localStorage.getItem;
        } catch (t) {
          this.localStorage = !1;
        }
        (this.file = !!(window.File && window.FileReader && window.FileList && window.Blob)),
          (this.fileSystem = !!window.requestFileSystem),
          (this.webGL = (function () {
            try {
              var t = document.createElement('canvas');
              return !!window.WebGLRenderingContext && (t.getContext('webgl') || t.getContext('experimental-webgl'));
            } catch (e) {
              return !1;
            }
          })()),
          (this.android || this.ie) && (this.webGL = !1),
          (this.worker = !!window.Worker),
          ('ontouchstart' in document.documentElement || window.navigator.msPointerEnabled) && (this.touch = !0);
      }),
      (Device.prototype._checkAudio = function () {
        (this.audioData = !!window.Audio), (this.webaudio = !(!window.webkitAudioContext && !window.AudioContext));
        var t = document.createElement('audio'),
          e = !1;
        try {
          (e = !!t.canPlayType) &&
            (t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '') && (this.ogg = !0),
            t.canPlayType('audio/mpeg;').replace(/^no$/, '') && (this.mp3 = !0),
            t.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '') && (this.wav = !0),
            (t.canPlayType('audio/x-m4a;') || t.canPlayType('audio/aac;').replace(/^no$/, '')) && (this.m4a = !0));
        } catch (i) {}
      }),
      (Device.prototype._checkIsMobile = function () {
        var t = !1;
        !(function (e) {
          (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
            e,
          ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              e.substr(0, 4),
            )) &&
            (t = !0);
        })(navigator.userAgent || navigator.vendor || window.opera),
          (this.isMobile = t);
      }),
      (Device.prototype.getInfo = function () {
        var t = 'DEVICE OUTPUT\n\n';
        return (
          (t += '---\n'),
          (t += 'Browser Info :: \n'),
          (t += 'Arora : ' + this.arora + '\n'),
          (t += 'Chrome : ' + this.chrome + '\n'),
          (t += 'Epiphany : ' + this.epiphany + '\n'),
          (t += 'Firefox : ' + this.firefox + '\n'),
          (t += 'Mobile Safari : ' + this.mobileSafari + '\n'),
          (t += 'IE : ' + this.ie),
          (t += this.ie ? ' (Version ' + this.ieVersion + ')\n' : '\n'),
          (t += 'Midori : ' + this.midori + '\n'),
          (t += 'Opera : ' + this.opera + '\n'),
          (t += 'Safari : ' + this.safari + '\n'),
          (t += 'Web App : ' + this.webApp + '\n'),
          (t += 'CocoonJS : ' + this.cocoonJS + '\n'),
          (t += 'Android : ' + this.android + '\n'),
          (t += '---\n'),
          (t += 'Operating System :: \n'),
          (t += 'Chrome OS : ' + this.chromeOS + '\n'),
          (t += 'iOS : ' + this.iOS + '\n'),
          (t += 'Linux : ' + this.linux + '\n'),
          (t += 'Mac OS : ' + this.macOS + '\n'),
          (t += 'Windows : ' + this.windows + '\n'),
          (t += 'Desktop : ' + this.desktop + '\n'),
          (t += '---\n'),
          (t += 'Device Type : \n'),
          (t += 'Pixel Ratio : ' + this.pixelRatio + '\n'),
          (t += 'iPhone : ' + this.iPhone + '\n'),
          (t += 'iPhone 4 : ' + this.iPhone4 + '\n'),
          (t += 'iPad : ' + this.iPad + '\n'),
          (t += '---\n'),
          (t += 'Features :: \n'),
          (t += 'Blob : ' + this.blob + '\n'),
          (t += 'Canvas : ' + this.canvas + '\n'),
          (t += 'LocalStorage : ' + this.localStorage + '\n'),
          (t += 'File : ' + this.file + '\n'),
          (t += 'File System : ' + this.fileSystem + '\n'),
          (t += 'WebGL : ' + this.webGL + '\n'),
          (t += 'Workers : ' + this.worker + '\n'),
          (t += '---\n'),
          (t += 'Audio :: \n'),
          (t += 'AudioData : ' + this.audioData + '\n'),
          (t += 'WebAudio : ' + this.webAudio + '\n'),
          (t += 'Supports .ogg : ' + this.ogg + '\n'),
          (t += 'Supports Opus : ' + this.opus + '\n'),
          (t += 'Supports .mp3 : ' + this.mp3 + '\n'),
          (t += 'Supports .wav : ' + this.wav + '\n'),
          (t += 'Supports .m4a : ' + this.m4a + '\n'),
          (t += 'Supports .webm : ' + this.webm)
        );
      }),
      (Device.instance = new Device()),
      (i.exports = Device);
  }),
  define('com/fido/utils/FrameWait', ['require', 'exports', 'module'], function (t, e, i) {
    var r = function () {
      (this.updateBind = this.update.bind(this)), (this.waits = []);
    };
    (r.prototype.wait = function (t, e) {
      var i = { callback: t, count: e || 2 };
      this.waits.push(i), requestAnimationFrame(this.updateBind);
    }),
      (r.prototype.update = function () {
        for (var t = this.waits.length - 1; t >= 0; t--) {
          var e = this.waits[t];
          e.count--, e.count <= 0 && (e.callback(), this.waits.splice(t, 1));
        }
        this.waits.length > 0 && requestAnimationFrame(this.updateBind);
      }),
      (i.exports = new r());
  }),
  define(
    'com/fido/app/LoaderScreen',
    ['require', 'exports', 'module', 'PIXI', 'com/fido/system/Ticker', 'com/fido/utils/FrameWait', 'signals'],
    function (t, e, i) {
      var r = t('PIXI'),
        n = t('com/fido/system/Ticker'),
        o = t('com/fido/utils/FrameWait'),
        s = t('signals'),
        a = function (t) {
          r.DisplayObjectContainer.call(this),
            (this.app = t),
            (this.easeLoad = 0),
            (this.targetLoad = 0),
            (this.onReady = new s()),
            (this.onComplete = new s()),
            (this.bar = new r.Sprite()),
            this.initLoader();
        };
      (a.prototype = Object.create(r.DisplayObjectContainer.prototype)),
        (a.prototype.initLoader = function () {
          n.instance.add(this.update, this), this.resize(this.w, this.h), o.wait(this.showLoader.bind(this));
        }),
        (a.prototype.showLoader = function () {
          this.onReady.dispatch();
        }),
        (a.prototype.update = function () {
          (this.easeLoad += 0.3 * (this.targetLoad - this.easeLoad)),
            this.easeLoad > 0.99 &&
              ((this.easeLoad = 1), n.instance.remove(this.update, this), this.onComplete.dispatch()),
            (this.bar.scale.x = this.easeLoad);
        }),
        (a.prototype.updateProgress = function (t) {
          this.targetLoad = t;
        }),
        (a.prototype.onHide = function () {
          n.instance.remove(this.update, this);
        }),
        (a.prototype.resize = function (t, e) {
          (this.w = t), (this.h = e), this.barBg && ((this.barBg.scale.x = t / 100), (this.barBg.y = e / 2 - 50));
        }),
        (i.exports = a);
    },
  ),
  define(
    'com/fido/app/OrientationManager',
    ['require', 'exports', 'module', 'com/fido/system/Ticker'],
    function (t, e, i) {
      var r = t('com/fido/system/Ticker'),
        n = function (t) {
          (this.mode = t),
            (this.rotateScreen = new Image()),
            (this.rotateScreen.src = ASSET_URL + 'img/rotate-device.png'),
            (this.rotateScreen.style.position = 'absolute'),
            (this.rotateScreen.style.top = '0'),
            (this.rotateScreen.style.left = '0'),
            (this.rotateScreen.style.zIndex = 1e7),
            (this.rotateScreen.style.display = 'none'),
            (this.rotateScreen.width = 446),
            (this.rotateScreen.height = 288),
            document.body.appendChild(this.rotateScreen),
            (this.supportsOrientationChange = 'onorientationchange' in window),
            this.supportsOrientationChange &&
              window.addEventListener('orientationchange', this.checkOrientation.bind(this), !1);
        };
      (n.constructor = n),
        (n.prototype.checkOrientation = function () {
          90 === window.orientation || -90 === window.orientation
            ? (r.instance.stop(), (this.rotateScreen.style.display = 'block'))
            : (r.instance.start(), (this.rotateScreen.style.display = 'none'));
        }),
        (n.prototype.check = function (t, e) {
          var i = 0 === this.mode ? !(e > t) : e > t,
            n = t / 892,
            o = e / 576,
            s = Math.max(n, o);
          (this.rotateScreen.width = 892 * s),
            (this.rotateScreen.height = 576 * s),
            (this.rotateScreen.style.left = t / 2 - this.rotateScreen.width / 2 + 'px'),
            (this.rotateScreen.style.top = e / 2 - this.rotateScreen.height / 2 + 'px'),
            this.supportsOrientationChange ||
              (i
                ? (r.instance.stop(), (this.rotateScreen.style.display = 'block'))
                : (r.instance.start(), (this.rotateScreen.style.display = 'none')));
        }),
        (i.exports = n);
    },
  ),
  define(
    'com/fido/app/App',
    [
      'require',
      'exports',
      'module',
      'PIXI',
      'com/fido/loader/Loader',
      'com/fido/app/ScreenManager',
      'com/fido/system/Ticker',
      'com/fido/system/Device',
      'com/fido/app/LoaderScreen',
      'com/fido/app/OrientationManager',
      'signals',
    ],
    function (t, e, i) {
      var r = t('PIXI'),
        n = t('com/fido/loader/Loader'),
        o = t('com/fido/app/ScreenManager'),
        s = t('com/fido/system/Ticker'),
        a = t('com/fido/system/Device'),
        h = t('com/fido/app/LoaderScreen'),
        l = t('com/fido/app/OrientationManager'),
        u = t('signals'),
        c = function (t) {
          (t = t || c.defaultOptions), (this.options = {});
          for (var e in c.defaultOptions) this.options[e] = t[e] || c.defaultOptions[e];
          this.setupPixi(),
            s.instance.start(),
            s.instance.add(this.update, this),
            (this.screenManager = new o(null, 300, 300)),
            (this.loader = new n()),
            (this.onReady = new u()),
            this.options.orientationMode !== c.orientationModes.BOTH &&
              (this.orientationManager = new l(this.options.orientationMode)),
            this.stage.addChild(this.screenManager.container),
            (this.active = !0);
        };
      (c.prototype.setupPixi = function () {
        var t = this.options;
        (r.utils.sayHello = function () {}),
          t.forceCanvas || (a.instance.android && !a.instance.chrome)
            ? ((this.renderer = new r.CanvasRenderer(t.width, t.height)), (this.renderer.clearBeforeRender = !1))
            : (this.renderer = r.autoDetectRenderer(t.width, t.height, { backgroundColor: 1 })),
          (window.WEBGL = r.isWebGL = this.renderer instanceof r.WebGLRenderer),
          (this.view = this.renderer.view),
          (this.stage = new r.Stage(t.backgroundColor)),
          (this.view.style.position = 'absolute'),
          (r.stage = this.stage);
      }),
        (c.prototype.update = function () {
          this.renderer.render(this.stage);
        }),
        (c.prototype.startup = function () {
          (this.loaderScreen = new this.options.loaderScreen(this)),
            this.loaderScreen.onReady.addOnce(this.onLoaderScreenReady, this),
            this.loaderScreen.onComplete.addOnce(this.onLoaderScreenComplete, this),
            this.screenManager.addScreen(this.loaderScreen, 'loader'),
            this.screenManager.gotoScreenByID('loader');
        }),
        (c.prototype.onLoaderScreenReady = function () {
          this.loader.onComplete.addOnce(this.onAssetsLoaded, this),
            this.loader.onProgress.add(this.onProgresss, this),
            this.loader.load();
        }),
        (c.prototype.onAssetsLoaded = function () {}),
        (c.prototype.onProgresss = function (t) {
          this.loaderScreen.updateProgress(t);
        }),
        (c.prototype.onLoaderScreenComplete = function () {
          this.onReady.dispatch();
        }),
        (c.prototype.resize = function (t, e) {
          this.orientationManager && this.orientationManager.check(t, e),
            this.options.resizeMode === c.resizeModes.DEFUALT
              ? (this.renderer.resize(t, e), (this.view.style.width = 'auto'), (this.view.style.height = 'auto'))
              : this.this.options.resizeMode === c.resizeModes.CSS_RESIZE_PRESERVE_RATIO ||
                (this.options.resizeMode === c.resizeModes.CSS_RESIZE &&
                  ((this.view.style.width = t + 'px'), (this.view.style.height = e + 'px')));
        }),
        (c.resizeModes = { DEFUALT: 0, CSS_RESIZE_PRESERVE_RATIO: 1, CSS_RESIZE: 2 }),
        (c.orientationModes = { LANDSCAPE: 0, PORTRAIT: 1, BOTH: 2 }),
        (c.defaultOptions = {
          width: 800,
          height: 600,
          forceCanvas: !1,
          backgroundColor: 16777215,
          resizeMode: c.resizeModes.DEFUALT,
          orientationMode: c.orientationModes.LANDSCAPE,
          loaderScreen: h,
        }),
        (i.exports = c);
    },
  ),
  define('com/fido/system/VisibilityChecker', ['require', 'exports', 'module', 'signals'], function (t, e, i) {
    var r = t('signals'),
      n = function () {
        'undefined' != typeof document.hidden
          ? ((this.hidden = 'hidden'), (this.visibilityChange = 'visibilitychange'))
          : 'undefined' != typeof document.mozHidden
            ? ((this.hidden = 'mozHidden'), (this.visibilityChange = 'mozvisibilitychange'))
            : 'undefined' != typeof document.msHidden
              ? ((this.hidden = 'msHidden'), (this.visibilityChange = 'msvisibilitychange'))
              : 'undefined' != typeof document.webkitHidden &&
                ((this.hidden = 'webkitHidden'), (this.visibilityChange = 'webkitvisibilitychange')),
          (this.onHide = new r()),
          (this.onShow = new r()),
          this.init();
      };
    (n.prototype.handleVisibilityChange = function () {
      document[this.hidden] ? this.onHide.dispatch() : this.onShow.dispatch();
    }),
      (n.prototype.init = function () {
        document.addEventListener(this.visibilityChange, this.handleVisibilityChange.bind(this), !1);
      }),
      (i.exports = new n());
  }),
  define(
    'com/fido/sound/SoundManager',
    ['require', 'exports', 'module', 'signals', 'com/fido/system/VisibilityChecker'],
    function (t, e, i) {
      var r = t('signals'),
        n = t('com/fido/system/VisibilityChecker'),
        o = function () {
          (this.disabled = !1),
            (this.preload = !0),
            (this.sounds = {}),
            (this.groups = {}),
            (this.globalVolume = 1),
            (this.isMuted = !1),
            (this.onMuteToggle = new r());
        };
      (o.prototype.addSound = function (t, e, i) {
        if (!this.disabled && !this.sounds[e]) {
          i = i || {};
          var r = new Howl({
            urls: [t + '.mp3', t + '.ogg'],
            autoplay: i.autoplay || !1,
            loop: i.loop || !1,
            volume: i.volume || 1,
          });
          (r.realVolume = i.volume || 1), (this.sounds[e] = r);
        }
      }),
        (o.prototype.addGroup = function (t, e) {
          if (!this.disabled && !this.groups[e]) {
            var i = { index: 0, type: 0, sounds: t };
            this.groups[e] = i;
          }
        }),
        (o.prototype.play = function (t) {
          this.disabled || this.sounds[t].play();
        }),
        (o.prototype.playGroup = function (t) {
          if (!this.disabled) {
            var e = this.groups[t],
              i = (Math.random() * e.sounds.length) | 0;
            this.sounds[e.sounds[i]].play();
          }
        }),
        (o.prototype.setVolume = function (t, e) {
          if (!this.disabled) {
            var i = this.sounds[t];
            (i.realVolume = e), i.volume(e * this.globalVolume);
          }
        }),
        (o.prototype.stop = function (t) {
          this.disabled || this.sounds[t].stop();
        }),
        (o.prototype.setPlaybackSpeed = function (t, e) {
          if (!this.disabled) {
            var i = this.sounds[t];
            i._playbackSpeed = e;
            var r = 'music' == t ? 0 : 1;
            i._webAudio &&
              Howler._howls[r]._audioNode[0] &&
              (Howler._howls[r]._audioNode[0].bufferSource.playbackRate.value = e);
          }
        }),
        (o.prototype.getPlaybackSpeed = function (t) {
          if (!this.disabled) {
            var e = this.sounds[t];
            return e._playbackSpeed || 1;
          }
        }),
        (o.prototype.setGlobalVolume = function (t) {
          this.globalVolume = t;
          for (var e in this.sounds) {
            var i = this.sounds[e];
            i.volume(i.realVolume * t);
          }
        }),
        (o.prototype.mute = function () {
          (this.isMuted = !0), this.setGlobalVolume(0), this.onMuteToggle.dispatch(!0);
        }),
        (o.prototype.unmute = function () {
          (this.isMuted = !1), this.setGlobalVolume(1), this.onMuteToggle.dispatch(!1);
        }),
        (o.prototype.check = function () {
          this.lastSeen = Date.now();
          var t = function () {
            (lastSeen = Date.now()), setTimeout(t, 50);
          };
          t();
          var i = document.getElementById('music');
          i.addEventListener(
            'timeupdate',
            function () {
              Date.now() - e.lastSeen > 100 && this.pause();
            },
            !1,
          );
        }),
        (o.sfx = new o()),
        (o.music = new o()),
        (o.sfx.disabled = !Howler.usingWebAudio),
        n.onHide.add(Howler.mute, Howler),
        n.onShow.add(Howler.unmute, Howler),
        (i.exports = o);
    },
  ),
  define('com/fido/ui/buttons/Button', ['require', 'exports', 'module', 'signals'], function (t, e, i) {
    var r = t('signals'),
      n = function (t) {
        if (!t) throw 'FIDO: Button view must not be undefined';
        (this.view = t),
          (this.onPress = new r()),
          (this.onDown = new r()),
          (this.onUp = new r()),
          (this.view.interactive = !0),
          (this.view.buttonMode = !0),
          (this.view.mousedown = this.view.touchstart = this.onDown.dispatch.bind(this, this)),
          (this.view.mouseup = this.view.touchend = this.onUp.dispatch.bind(this, this)),
          (this.view.click = this.view.tap = this.onPress.dispatch.bind(this, this));
      };
    (n.constructor = n), (i.exports = n);
  }),
  define('com/fido/utils/ThreeSlice', ['require', 'exports', 'module', 'PIXI'], function (t, e, i) {
    var r = t('PIXI'),
      n = function (t, e, i) {
        (this.left = new r.Sprite(t)),
          (this.middle = new r.Sprite(e)),
          (this.right = new r.Sprite(i)),
          r.DisplayObjectContainer.call(this),
          this.addChild(this.left),
          this.addChild(this.middle),
          this.addChild(this.right);
      };
    (n.prototype = Object.create(r.DisplayObjectContainer.prototype)),
      Object.defineProperty(n.prototype, 'width', {
        get: function () {
          return this._width;
        },
        set: function (t) {
          (this._width = t),
            (this.left.position.x = 0),
            (this.middle.position.x = this.left.width),
            (this.middle.width = t - (this.left.width + this.right.width)),
            (this.right.position.x = this.middle.position.x + this.middle.width - 1);
        },
      }),
      (n.fromFrames = function (t, e, i) {
        return new n(r.Texture.fromFrame(t), r.Texture.fromFrame(e), r.Texture.fromFrame(i));
      }),
      (i.exports = n);
  }),
  define(
    'com/nebulon/app/buttons/AabButton',
    ['require', 'exports', 'module', 'PIXI', 'com/fido/ui/buttons/Button', 'com/fido/utils/ThreeSlice'],
    function (t, e, i) {
      var r = t('PIXI'),
        n = t('com/fido/ui/buttons/Button'),
        o = t('com/fido/utils/ThreeSlice'),
        s = function (t) {
          (this.label = new r.Text(t, { fill: '#FFFFFF' })), (this.label.x = 23), (this.label.y = 32);
          var e = this.createBackground(this.label.width);
          e.addChild(this.label), n.call(this, e);
        };
      (s.prototype = Object.create(n.prototype)),
        (s.prototype.createBackground = function (t) {
          var e = o.fromFrames('3_slice_left_frame.png', '3_slice_mid_frame.png', '3_slice_right_frame.png'),
            i = new r.Graphics().beginFill(3516639).drawRect(0, 0, 100, 71);
          e.addChildAt(i, 0),
            (e.width = Math.max(t + 40, 90)),
            (i.scale.x = (e.width - 14) / 100),
            (i.position.x = 10),
            (i.position.y = 11);
          var n = !0;
          return (
            n &&
              ((this.rollover = r.Sprite.fromFrame('3_slice_halftone_rollover.png')),
              (this.rollover.width = 2 * e.width),
              (this.rollover.height = 71),
              (this.rollover.y = 10),
              (this.rollover.x = 2 * -e.width),
              e.addChildAt(this.rollover, 1),
              (this.rolloverMask = new r.Graphics().beginFill(16763904).drawRect(0, 0, 100, 71)),
              (this.rolloverMask.position.x = 10),
              (this.rolloverMask.position.y = 11),
              (this.rolloverMask.scale.x = i.scale.x),
              (this.rollover.mask = this.rolloverMask),
              e.addChild(this.rolloverMask),
              (e.mouseover = this.onMouseOver.bind(this)),
              (e.mouseout = this.onMouseOut.bind(this)),
              (e.touchstart = this.onMouseOver.bind(this)),
              (e.touchend = e.touchendoutside = this.onMouseOut.bind(this))),
            (e.hitArea = new r.Rectangle(0, 0, Math.max(t + 40, 90), 90)),
            e
          );
        }),
        (s.prototype.onMouseOver = function () {
          TweenLite.to(this.rollover.position, 0.5, { x: 0 });
        }),
        (s.prototype.onMouseOut = function () {
          TweenLite.to(this.rollover.position, 0.5, { x: 2 * -this.view.width });
        }),
        (i.exports = s);
    },
  ),
  define(
    'com/nebulon/app/buttons/BaseAabButton',
    [
      'require',
      'exports',
      'module',
      'PIXI',
      'com/fido/ui/buttons/Button',
      'com/fido/utils/ThreeSlice',
      'com/fido/system/Ticker',
    ],
    function (t, e, i) {
      var r = t('PIXI'),
        n = t('com/fido/ui/buttons/Button'),
        o = t('com/fido/utils/ThreeSlice'),
        s =
          (t('com/fido/system/Ticker'),
          function (t) {
            n.call(this, t);
          });
      (s.prototype = Object.create(n.prototype)),
        (s.prototype.createBackground = function (t, e) {
          (e = e || 1), (t /= e);
          var i = o.fromFrames('3_slice_left_frame.png', '3_slice_mid_frame.png', '3_slice_right_frame.png'),
            n = new r.Graphics().beginFill(3516639).drawRect(0, 0, 100, 71);
          i.addChildAt(n, 0),
            (i.width = Math.max(t + 40, 90)),
            (n.scale.x = (i.width - 14) / 100),
            (n.position.x = 10),
            (n.position.y = 11);
          return (this.blueBg = n), i.scale.set(e), (i.pivot.x = i.width / 2), (i.pivot.y = 45), (this.bg = i), i;
        }),
        (s.prototype.activateDefaultRollover = function () {
          (this.rollover = r.Sprite.fromFrame('3_slice_halftone_rollover.png')),
            (this.rollover.width = 2 * this.bg.width),
            (this.rollover.height = 71),
            (this.rollover.y = 10),
            (this.rollover.x = 2 * -this.bg.width),
            this.bg.addChildAt(this.rollover, 1),
            (this.rolloverMask = new r.Graphics().beginFill(16763904).drawRect(0, 0, 100, 71)),
            (this.rolloverMask.position.x = 10),
            (this.rolloverMask.position.y = 11),
            (this.rolloverMask.scale.x = this.blueBg.scale.x),
            (this.rollover.mask = this.rolloverMask),
            this.bg.addChild(this.rolloverMask),
            (this.view.mouseover = this.onMouseOver.bind(this)),
            (this.view.mouseout = this.onMouseOut.bind(this)),
            (this.view.touchstart = this.onMouseOver.bind(this)),
            (this.view.touchend = this.view.touchendoutside = this.onMouseOut.bind(this)),
            (this.count = 0),
            (this.scale = 1),
            (this.intensity = 0.1),
            (this.defaultScale = 1),
            (this.overScale = 1.1);
        }),
        (s.prototype.toggleOn = function () {
          TweenLite.to(this.rollover.position, 0, { x: 0 }), (this.view.interactive = !1);
        }),
        (s.prototype.toggleOff = function () {
          TweenLite.to(this.rollover.position, 0, { x: 2 * -this.bg.width }), (this.view.interactive = !0);
        }),
        (s.prototype.onMouseOver = function () {
          TweenLite.to(this.rollover.position, 0.5, { x: 0 }),
            TweenLite.to(this.view.scale, 0.5, { x: this.overScale, y: this.overScale, ease: Elastic.easeOut }),
            TweenLite.to(this.view, 0.75, { rotation: 0.1 * (Math.random() - 0.5), ease: Elastic.easeOut });
        }),
        (s.prototype.onMouseOut = function () {
          TweenLite.to(this.rollover.position, 0.5, { x: 2 * -this.bg.width }),
            TweenLite.to(this.view.scale, 0.5, {
              x: this.defaultScale,
              y: this.defaultScale,
              ease: Elastic.easeOut,
            }),
            TweenLite.to(this.view, 0.75, { rotation: 0, ease: Elastic.easeOut });
        }),
        (i.exports = s);
    },
  ),
  define(
    'com/nebulon/app/buttons/AabLabelButton',
    ['require', 'exports', 'module', 'PIXI', './BaseAabButton', 'com/fido/sound/SoundManager'],
    function (t, e, i) {
      var r = t('PIXI'),
        n = t('./BaseAabButton'),
        o =
          (t('com/fido/sound/SoundManager'),
          function (t, e) {
            (this.label = new r.Sprite.fromFrame(t)),
              this.label.anchor.set(0.5),
              e && (this.label.x = -e / 2 + this.label.width / 2 + 5),
              (e = e || this.label.width + 10);
            var i = 0.7;
            this.createBackground(e, i);
            var o = new r.DisplayObjectContainer();
            o.addChild(this.bg);
            var s = e + 20;
            (o.hitArea = new r.Rectangle(-s / 2, (-90 * i) / 2, s, 90 * i)),
              o.addChild(this.label),
              n.call(this, o),
              (o.mousedown = o.touchstart = this.onTouch.bind(this)),
              this.activateDefaultRollover();
          });
      (o.prototype = Object.create(n.prototype)), (o.prototype.onTouch = function () {}), (i.exports = o);
    },
  ),
  define('com/fido/utils/Utils', ['require', 'exports', 'module', 'PIXI'], function (t, e, i) {
    var r = t('PIXI'),
      n = {};
    (n.getTexturesFromFrames = function (t) {
      for (var e = [], i = 0; i < t.length; i++) e.push(new r.Texture.fromFrame(t[i]));
      return e;
    }),
      (n.getTexturesFromImages = function (t) {
        for (var e = [], i = 0; i < t.length; i++) e.push(new r.Texture.fromImage(t[i]));
        return e;
      }),
      (n.getTexturesFromFramesWithPrefix = function (t, e, i) {
        var n = [];
        void 0 == i && (i = 0);
        for (var o = 0; e > o; o++) {
          var s = o + i,
            a = t.replace('%%', 10 > s ? '0' + s : s);
          n.push(new r.Texture.fromFrame(a));
        }
        return n;
      }),
      (n.formatScore = function (t) {
        for (var e = t.toString().split(''), i = '', r = e.length, n = (r % 3) - 1, o = 0; r > o; o++)
          (i += e[o]), (o - n) % 3 == 0 && o != r - 1 && (i += ',');
        return i;
      }),
      (n.formatName = function (t) {
        for (var e = t.split(' '), i = e.length - 1; i >= 0; i--)
          0 !== e[i].length &&
            ((wordArray = e[i].split('')), (wordArray[0] = wordArray[0].toUpperCase()), (e[i] = wordArray.join('')));
        return (word = e.join(' '));
      }),
      window.console || (window.console = { log: function () {} }),
      (n.get_query = function (t) {
        for (var e = location.href, i = e.substring(e.indexOf('?') + 1).split('&'), r = 0, n = {}; r < i.length; r++)
          (i[r] = i[r].split('=')), (n[i[r][0]] = decodeURIComponent(i[r][1]));
        return n.hasOwnProperty(t) ? n[t] : !1;
      }),
      (i.exports = n);
  }),
  define(
    'com/nebulon/app/screens/LoaderScreen',
    [
      'require',
      'exports',
      'module',
      'PIXI',
      '../buttons/AabButton',
      '../buttons/AabLabelButton',
      'com/fido/ui/buttons/Button',
      'com/fido/system/Ticker',
      'com/fido/utils/FrameWait',
      'com/fido/system/Device',
      'com/fido/utils/Utils',
    ],
    function (t, e, i) {
      var r = t('PIXI'),
        n =
          (t('../buttons/AabButton'),
          t('../buttons/AabLabelButton'),
          t('com/fido/ui/buttons/Button'),
          t('com/fido/system/Ticker')),
        o =
          (t('com/fido/utils/FrameWait'),
          t('com/fido/system/Device'),
          t('com/fido/utils/Utils'),
          function (t) {
            (this.app = t),
              r.DisplayObjectContainer.call(this),
              (this.text = new r.Text('l o a d i n g . . .', { fill: 'white', font: '20px Arial' })),
              this.text.anchor.set(0.5),
              (this.text.filters = [new r.filters.BloomFilter()]),
              (this.tick = 0);
          });
      (o.prototype = Object.create(r.DisplayObjectContainer.prototype)),
        (o.prototype.onShown = function () {
          n.instance.add(this.update, this);
        }),
        (o.prototype.onHidden = function () {
          n.instance.remove(this.update, this);
        }),
        (o.prototype.update = function () {
          (this.tick += 0.05), (this.text.alpha = 0.6 + 0.5 * (Math.sin(this.tick) + 1) * 0.4);
        }),
        (o.prototype.resize = function (t, e) {
          (this.w = t), (this.h = e), (this.text.x = t / 2), (this.text.y = e / 2);
        }),
        (i.exports = o);
    },
  ),
  define('com/fido/utils/Mini3d', ['require', 'exports', 'module'], function (t, e, i) {
    function r(t, e) {
      return t.depth - e.depth;
    }
    (Mini3d = function () {
      (this.view = new PIXI.DisplayObjectContainer()),
        (this.children = []),
        (this.focalLength = 400),
        (this.position3d = { x: 0, y: 0, z: 0 }),
        (this.rotation3d = { x: 0, y: 0, z: 0 });
    }),
      (Mini3d.constructor = Mini3d),
      (Mini3d.prototype.addChild = function (t) {
        t.position3d || (t.position3d = { x: 0, y: 0, z: 0 }),
          t.anchor.set(0.5),
          this.view.addChild(t),
          this.children.push(t);
      }),
      (Mini3d.prototype.update = function () {
        for (
          var t,
            e,
            i,
            n,
            o,
            s,
            a,
            h,
            l,
            u,
            c = Math.sin(this.rotation3d.x),
            d = Math.cos(this.rotation3d.x),
            p = Math.sin(this.rotation3d.y),
            f = Math.cos(this.rotation3d.y),
            m = Math.sin(this.rotation3d.z),
            v = Math.cos(this.rotation3d.z),
            g = 0;
          g < this.children.length;
          g++
        ) {
          var y = this.children[g];
          (t = y.position3d.x - this.position3d.x),
            (e = y.position3d.y - this.position3d.y),
            (i = y.position3d.z - this.position3d.z),
            (n = d * e - c * i),
            (o = c * e + d * i),
            (a = f * o - p * t),
            (s = p * o + f * t),
            (h = v * s - m * n),
            (l = m * s + v * n),
            (u = this.focalLength / (this.focalLength + a)),
            (t = h * u),
            (e = l * u),
            (i = a),
            (y.scale.x = y.scale.y = u * y.scaleRatio),
            (y.scale.x *= y.scaleOffset.x),
            (y.scale.y *= y.scaleOffset.y),
            (y.depth = -y.position3d.z),
            (y.position.x = t),
            (y.position.y = e);
        }
        this.view.children.sort(r);
      }),
      (i.exports = Mini3d);
  }),
  define(
    'com/nebulon/app/screens/Cloud',
    [
      'require',
      'exports',
      'module',
      'PIXI',
      'com/fido/system/Device',
      'com/fido/utils/Mini3d',
      'com/fido/system/Ticker',
    ],
    function (t, e, i) {
      var r = t('PIXI'),
        n = (t('com/fido/system/Device'), t('com/fido/utils/Mini3d'), t('com/fido/system/Ticker')),
        o = function (t) {
          r.Sprite.call(this, t),
            (this.position3d = { x: 0, y: 0, z: 0 }),
            (this.scaleRatio = 2),
            (this.scaleOffset = new r.Point(1, 1));
        };
      (o.prototype = Object.create(r.Sprite.prototype)),
        (o.prototype.onShow = function () {
          n.instance.add(this.update, this);
        }),
        (o.prototype.onShown = function () {}),
        (o.prototype.update = function () {}),
        (i.exports = o);
    },
  ),
  define('com/fido/utils/Math2', ['require', 'exports', 'module'], function (t, e, i) {
    var r = {};
    (r.random = function (t, e) {
      return (t = t || 0), (e = void 0 === e ? 1 : e), t + Math.random() * (e - t);
    }),
      (r.randomInt = function (t, e) {
        return (t + Math.random() * (e - t)) | 0;
      }),
      (r.randomSeed = function (t, e, i) {
        (min = t), (max = e), (i = i || 1), (i = (9301 * i + 49297) % 233280);
        var r = i / 233280;
        return min + r * (max - min);
      }),
      (r.randomChance = function (t, e) {
        return r.randomSeed(0, 1, e) > t;
      }),
      (i.exports = r);
  }),
  define(
    'com/nebulon/app/screens/Clouds',
    [
      'require',
      'exports',
      'module',
      'PIXI',
      'com/fido/system/Device',
      'com/fido/utils/Mini3d',
      './Cloud',
      'com/fido/utils/Math2',
    ],
    function (t, e, i) {
      var r = t('PIXI'),
        n = (t('com/fido/system/Device'), t('com/fido/utils/Mini3d')),
        o = t('./Cloud'),
        s = t('com/fido/utils/Math2'),
        a = function (t) {
          (this.app = t),
            r.DisplayObjectContainer.call(this),
            (this.bg = new r.Sprite.fromImage(window.ASSET_URL + 'img/skyBG.jpg')),
            this.addChild(this.bg),
            (this.mini3d = new n()),
            this.addChild(this.mini3d.view),
            (this.speed = -15),
            (this.range = 3e3),
            (this.clouds = []),
            (this.images = ['skyCloud1.png', 'skyCloud2.png']);
          for (var e = 0; 50 > e; e++) {
            var i = new o(r.Texture.fromImage(ASSET_URL + 'img/' + this.images[e % 2]));
            this.mini3d.addChild(i), this.clouds.push(i), (i.position3d.z = -(this.range / 50) * e);
          }
          this.count = 0;
        };
      (a.prototype = Object.create(r.DisplayObjectContainer.prototype)),
        (a.prototype.onShow = function () {}),
        (a.prototype.onShown = function () {}),
        (a.prototype.update = function () {
          for (var t = 0; t < this.clouds.length; t++) {
            var e = this.clouds[t];
            (e.position3d.z += this.speed),
              e.position3d.z < 300 ? (e.alpha = e.position3d.z / 300) : (e.alpha += 0.01 * (1 - e.alpha)),
              e.position3d.z < 0 &&
                ((e.scaleRatio = 5),
                (e.position3d.z += this.range),
                (e.position3d.x = s.random(-4500, 4500)),
                (e.position3d.y = 1200 - Math.abs(0.2 * e.position3d.x) + s.random(0, 200)),
                (e.rotation = e.position3d.x * -2e-4),
                (e.alpha = 0),
                (e.scaleOffset.x = s.random(0.6, 1.4)),
                (e.scaleOffset.y = s.random(0.9, 1.1)),
                Math.random() < 0.5 && (e.scaleOffset.x *= -1));
          }
          this.mini3d.update(),
            this.count++,
            (this.mini3d.view.rotation = 0.08 * Math.cos(0.02 * this.count)),
            (this.mini3d.position3d.y = 200 * Math.sin(0.03 * this.count)),
            (this.mini3d.position3d.y -= 50),
            (this.mini3d.rotation3d.y = 0.2 * Math.sin(0.02 * this.count * 0.5));
        }),
        (a.prototype.resize = function (t, e) {
          (this.mini3d.view.x = t / 2), (this.mini3d.view.y = e / 2);
        }),
        (i.exports = a);
    },
  ),
  define(
    'com/nebulon/app/screens/Stars',
    [
      'require',
      'exports',
      'module',
      'PIXI',
      'com/fido/system/Device',
      'com/fido/utils/Mini3d',
      'com/fido/system/Ticker',
      './Cloud',
      'com/fido/utils/Math2',
    ],
    function (t, e, i) {
      var r = t('PIXI'),
        n = (t('com/fido/system/Device'), t('com/fido/utils/Mini3d')),
        o = (t('com/fido/system/Ticker'), t('./Cloud')),
        s = t('com/fido/utils/Math2'),
        a = function (t) {
          (this.app = t),
            r.DisplayObjectContainer.call(this),
            (this.bg = new r.Sprite.fromImage(window.ASSET_URL + 'img/spaceBG.jpg')),
            this.bg.anchor.set(0.5),
            (this.bg.x = 950),
            (this.bg.y = 600),
            this.bg.scale.set(1.185),
            this.addChild(this.bg),
            (this.sun = new r.Sprite.fromImage(window.ASSET_URL + 'img/sun_add.png')),
            (this.mini3d = new n()),
            this.addChild(this.mini3d.view),
            (this.speed = -5),
            (this.range = 2e3),
            (this.clouds = []),
            (this.images = ['spaceCloud1.png', 'spaceCloud2.png', 'spaceCloud3.png']);
          for (var e = 0; 30 > e; e++) {
            var i = new o(r.Texture.fromImage(ASSET_URL + 'img/' + this.images[e % 3]));
            (i.blendMode = r.CONST.BLEND_MODES.SCREEN),
              (i.rotSpeed = 4),
              this.mini3d.addChild(i),
              this.clouds.push(i),
              (i.position3d.z = -(this.range / 30) * e);
          }
          this.addChild(this.sun), (this.count = 0);
        };
      (a.prototype = Object.create(r.DisplayObjectContainer.prototype)),
        (a.prototype.onShow = function () {}),
        (a.prototype.onShown = function () {}),
        (a.prototype.update = function () {
          for (var t = 0; t < this.clouds.length; t++) {
            var e = this.clouds[t];
            (e.position3d.z += this.speed),
              e.position3d.z < 300 ? (e.alpha = e.position3d.z / 300) : (e.alpha += 0.01 * (1 - e.alpha)),
              (e.rotation += e.rotSpeed),
              e.position3d.z < 0 &&
                ((e.scaleRatio = 5),
                (e.rotSpeed = s.random(-5e-4, 5e-4)),
                (e.position3d.z += this.range),
                (e.position3d.x = s.random(-4950, 4950)),
                (e.position3d.y = s.random(-4950, 4950)),
                (e.alpha = 0),
                (e.rotation = 0),
                (e.scaleOffset.x = s.random(1, 1.2)),
                (e.scaleOffset.y = s.random(1, 1.2)),
                Math.random() < 0.5 && (e.scaleOffset.x *= -1));
          }
          this.mini3d.update(),
            (this.count += 0.25),
            (this.bg.rotation += 2e-4),
            (this.mini3d.view.rotation = 0.08 * Math.cos(0.02 * this.count)),
            (this.mini3d.position3d.y = 200 * Math.sin(0.03 * this.count)),
            (this.mini3d.position3d.y -= 50),
            (this.mini3d.rotation3d.y = 0.2 * Math.sin(0.02 * this.count * 0.5));
        }),
        (a.prototype.resize = function (t, e) {
          (this.mini3d.view.x = t / 2), (this.mini3d.view.y = e / 2);
        }),
        (i.exports = a);
    },
  ),
  define('com/fido/physics/DoubleSpring', ['require', 'exports', 'module'], function (t, e, i) {
    var r = function () {
      (this.x = 0),
        (this.ax = 0),
        (this.dx = 0),
        (this.tx = 0),
        (this.y = 0),
        (this.ay = 0),
        (this.dy = 0),
        (this.ty = 0),
        (this.max = 30),
        (this.damp = 0.75),
        (this.springiness = 0.09),
        (this.max = 160),
        (this.damp = 0.7),
        (this.springiness = 0.69);
    };
    (r.constructor = r),
      (r.prototype.update = function () {
        (this.ax = (this.tx - this.x) * this.springiness),
          (this.dx += this.ax),
          (this.dx *= this.damp),
          this.dx < -this.max ? (this.dx = -this.max) : this.dx > this.max && (this.dx = this.max),
          (this.x += this.dx),
          (this.ay = (this.ty - this.y) * this.springiness),
          (this.dy += this.ay),
          (this.dy *= this.damp),
          this.dy < -this.max ? (this.dy = -this.max) : this.dy > this.max && (this.dy = this.max),
          (this.y += this.dy);
      }),
      (r.prototype.reset = function () {
        (this.x = 0),
          (this.ax = 0),
          (this.dx = 0),
          (this.tx = 0),
          (this.y = 0),
          (this.ay = 0),
          (this.dy = 0),
          (this.ty = 0);
      }),
      (i.exports = r);
  }),
  define(
    'com/nebulon/app/screens/MaskyMask',
    [
      'require',
      'exports',
      'module',
      'PIXI',
      'com/fido/system/Device',
      'com/fido/utils/Mini3d',
      'com/fido/system/Ticker',
      'com/fido/utils/Math2',
      'com/fido/physics/DoubleSpring',
    ],
    function (t, e, i) {
      var r = t('PIXI'),
        n =
          (t('com/fido/system/Device'),
          t('com/fido/utils/Mini3d'),
          t('com/fido/system/Ticker'),
          t('com/fido/utils/Math2')),
        o = t('com/fido/physics/DoubleSpring'),
        s = function () {
          var t = new r.RenderTexture(window.renderer, 1900, 1200);
          r.Sprite.call(this, t),
            (this.container = new r.Container()),
            (this.m = new r.Matrix()),
            this.m.translate(950, 600),
            (this.blobs = []);
          for (var e = 0; 50 > e; e++)
            (blob = new r.Sprite.fromImage(ASSET_URL + 'img/blob.png')),
              (blob.target = new r.Point(n.random(-950, 950), n.random(-600, 600))),
              this.blobs.push(blob),
              (blob.spring = new o()),
              (blob.rotationSpeed = n.random(-0.1, 0.1)),
              blob.anchor.set(0.5),
              (blob.count = Math.random() * Math.PI * 2),
              this.container.addChild(blob);
          (this.isOpen = !1), (this.count = 0), this.anchor.set(0.5), (this.target = new r.Point());
        };
      (s.prototype = Object.create(r.Sprite.prototype)),
        (s.prototype.update = function () {
          this.count += 0.01;
          for (var t = 0; t < this.blobs.length; t++) {
            var e = this.blobs[t];
            e.count += 0.1;
            var i = Math.sin(0.5 * e.count);
            if (
              (e.spring.update(),
              e.scale.set(i),
              (e.rotation += 0.1 * e.rotationSpeed),
              (e.alpha = 0.9),
              e.count > 2 * Math.PI)
            ) {
              e.count -= 2 * Math.PI;
              var r = Math.random() * Math.PI * 2,
                o = n.random(100, 200);
              (e.x = this.target.x + Math.sin(r) * o),
                (e.y = this.target.y + Math.cos(r) * o),
                (e.rotation = Math.random() * Math.PI * 2);
            }
          }
          this.texture.render(this.container, this.m, !0, !0);
        }),
        (s.prototype.open = function () {
          this.isOpen = !0;
          for (var t = 0; t < this.blobs.length; t++) {
            this.blobs[t];
          }
        }),
        (s.prototype.close = function () {
          this.isOpen = !1;
          for (var t = 0; t < this.blobs.length; t++) {
            this.blobs[t];
          }
        }),
        (s.prototype.resize = function (t, e) {
          (this.x = t / 2), (this.y = e / 2);
        }),
        (i.exports = s);
    },
  ),
  define('com/nebulon/app/screens/SuperFilter', ['require', 'exports', 'module', 'PIXI'], function (t, e, i) {
    function r(t) {
      var e = new n.math.Matrix();
      n.AbstractFilter.call(
        this,
        [
          'attribute vec2 aVertexPosition;',
          'attribute vec2 aTextureCoord;',
          'attribute vec4 aColor;',
          'uniform mat3 projectionMatrix;',
          'uniform mat3 otherMatrix;',
          'varying vec2 vMaskCoord;',
          'varying vec2 vTextureCoord;',
          'varying vec4 vColor;',
          'void main(void)',
          '{',
          '   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
          '   vTextureCoord = aTextureCoord;',
          '   vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;',
          '   vColor = vec4(aColor.rgb * aColor.a, aColor.a);',
          '}',
        ].join('\n'),
        [
          'precision lowp float;',
          'varying vec2 vMaskCoord;',
          'varying vec2 vTextureCoord;',
          'varying vec4 vColor;',
          'uniform sampler2D uSampler;',
          'uniform sampler2D mask;',
          'void main(void)',
          '{',
          '   vec4 masky =  texture2D(mask, vMaskCoord);',
          '   float strength =  (masky.r * masky.a);',
          '   strength *= 5.0;',
          '   strength = min(1.0, strength ) ;',
          '   vec4 original =  texture2D(uSampler, vTextureCoord +  (1.0-strength) * 0.1);',
          '   original *= strength;',
          '   gl_FragColor =  original;',
          '}',
        ].join('\n'),
        { mask: { type: 'sampler2D', value: t.texture }, otherMatrix: { type: 'mat3', value: e.toArray(!0) } },
      ),
        (this.maskSprite = t),
        (this.maskMatrix = e);
    }
    var n = t('PIXI');
    (r.prototype = Object.create(n.AbstractFilter.prototype)),
      (r.prototype.constructor = r),
      (i.exports = r),
      (r.prototype.applyFilter = function (t, e, i) {
        var r = t.filterManager;
        r.calculateMappedMatrix(e.frame, this.maskSprite, this.maskMatrix),
          (this.uniforms.otherMatrix.value = this.maskMatrix.toArray(!0));
        var n = this.getShader(t);
        r.applyFilter(n, e, i);
      }),
      Object.defineProperties(r.prototype, {
        map: {
          get: function () {
            return this.uniforms.mask.value;
          },
          set: function (t) {
            this.uniforms.mask.value = t;
          },
        },
        offset: {
          get: function () {
            return this.uniforms.offset.value;
          },
          set: function (t) {
            this.uniforms.offset.value = t;
          },
        },
      }),
      (i.exports = r);
  }),
  define('com/nebulon/app/screens/SpeedFilter', ['require', 'exports', 'module', 'PIXI'], function (t, e, i) {
    var r = t('PIXI'),
      n = (i.exports = function () {
        r.AbstractFilter.call(
          this,
          null,
          [
            'precision highp float;',
            'uniform sampler2D uSampler;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform vec2 center;',
            'uniform float strength;',
            'uniform vec2 texSize;',
            'uniform float vignetteOffset;',
            'uniform float vignetteDarkness;',
            'uniform float sine;',
            'uniform float cosine;',
            'uniform float shiftSampleDistance;',
            'uniform vec2 red;',
            'uniform vec2 green;',
            'uniform vec2 blue;',
            'uniform float saturation;',
            'uniform float saturationConstant;',
            'float random(vec3 scale, float seed) {',
            'return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);',
            '}',
            'vec3 czm_saturation(vec3 rgb, float adjustment)',
            '{',
            'const vec3 W = vec3(0.2125, 0.7154, 0.0721);',
            'vec3 intensity = vec3(dot(rgb, W));',
            'return mix(intensity, rgb, adjustment);',
            '}',
            'void main() {',
            'vec4 color = vec4(0.0);',
            'float total = 0.0;',
            'vec2 toCenter = center - vTextureCoord * texSize;',
            'float blurAmount = 0.3;',
            'vec4 actual = texture2D(uSampler, vTextureCoord );',
            'float dist = distance( vTextureCoord, vec2( 0.5 ) );',
            'float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);',
            'for (float t = 0.0; t <= 20.0; t++) {',
            '   float percent = (t + offset) / 20.0;',
            '   float weight = 4.0 * (percent - percent * percent);',
            '   vec4 sample = texture2D(uSampler, vTextureCoord + toCenter * percent * strength / texSize);',
            '   sample.rgb *= sample.a;',
            '   color += sample * weight;',
            '   total += weight;',
            '}',
            'color = color / total;',
            'float mixBlur = 0.08;',
            'float distMix = smoothstep( 0.8, vignetteDarkness * 0.799, dist *( vignetteOffset + vignetteDarkness ) );',
            'gl_FragColor = mix( color, actual, max( mixBlur, distMix ) );',
            'vec4 shift;',
            'float distMixInv = 1.0 - distMix;',
            'shift.r = texture2D(uSampler, vTextureCoord + ( red * distMixInv ) /texSize.xy ).r;',
            'shift.g = texture2D(uSampler, vTextureCoord + ( green * distMixInv ) /texSize.xy ).g;',
            'shift.b = texture2D(uSampler, vTextureCoord + ( blue * distMixInv ) /texSize.xy ).b;',
            'shift.a = texture2D(uSampler, vTextureCoord ).a;',
            'gl_FragColor = mix( gl_FragColor, shift, 0.3 );',
            'float feather = 0.005;',
            'float satMix = 1.0 - smoothstep( 0.5, feather * 0.499, dist * ( 1.2 + feather ) );',
            'satMix *= saturationConstant;',
            'gl_FragColor.rgb = czm_saturation(gl_FragColor.rgb, max( saturation * ( satMix + 1.0 ), 1.0 )  );',
            'gl_FragColor.rgb /= gl_FragColor.a + 0.00001;',
            '}',
          ].join('\n'),
          {
            center: { type: 'v2', value: { x: 950, y: 600 } },
            strength: { type: '1f', value: 0.15 },
            sine: { type: '1f', value: 0.3 },
            cosine: { type: '1f', value: 0 },
            red: { type: 'v2', value: { x: 20, y: 0 } },
            green: { type: 'v2', value: { x: 0, y: 10 } },
            blue: { type: 'v2', value: { x: -30, y: 5 } },
            texSize: { type: 'v2', value: { x: 1900, y: 1200 } },
            vignetteOffset: { type: '1f', value: 0.96 },
            vignetteDarkness: { type: '1f', value: 0 },
            saturation: { type: '1f', value: 0 },
            saturationConstant: { type: '1f', value: 0 },
          },
        );
      });
    (n.prototype = Object.create(r.AbstractFilter.prototype)),
      (n.constructor = n),
      Object.defineProperties(n.prototype, {
        center: {
          get: function () {
            return this.uniforms.center.value;
          },
          set: function (t) {
            this.uniforms.center.value = t;
          },
        },
        strength: {
          get: function () {
            return this.uniforms.strength.value;
          },
          set: function (t) {
            this.uniforms.strength.value = t;
          },
        },
        texSize: {
          get: function () {
            return this.uniforms.texSize.value;
          },
          set: function (t) {
            this.uniforms.texSize.value = t;
          },
        },
        vignetteDarkness: {
          get: function () {
            return this.uniforms.vignetteDarkness.value;
          },
          set: function (t) {
            this.uniforms.vignetteDarkness.value = t;
          },
        },
        vignetteOffset: {
          get: function () {
            return this.uniforms.vignetteOffset.value;
          },
          set: function (t) {
            this.uniforms.vignetteOffset.value = t;
          },
        },
        sine: {
          get: function () {
            return this.uniforms.sine.value;
          },
          set: function (t) {
            this.uniforms.sine.value = t;
          },
        },
        cosine: {
          get: function () {
            return this.uniforms.cosine.value;
          },
          set: function (t) {
            this.uniforms.cosine.value = t;
          },
        },
        red: {
          get: function () {
            return this.uniforms.red.value;
          },
          set: function (t) {
            this.uniforms.red.value = t;
          },
        },
        green: {
          get: function () {
            return this.uniforms.green.value;
          },
          set: function (t) {
            this.uniforms.green.value = t;
          },
        },
        blue: {
          get: function () {
            return this.uniforms.blue.value;
          },
          set: function (t) {
            this.uniforms.blue.value = t;
          },
        },
        saturation: {
          get: function () {
            return this.uniforms.saturation.value;
          },
          set: function (t) {
            this.uniforms.saturation.value = t;
          },
        },
        saturationConstant: {
          get: function () {
            return this.uniforms.saturationConstant.value;
          },
          set: function (t) {
            this.uniforms.saturationConstant.value = t;
          },
        },
      });
  }),
  define(
    'com/nebulon/app/screens/MainScreen',
    [
      'require',
      'exports',
      'module',
      'PIXI',
      'com/fido/system/Device',
      'com/nebulon/app/screens/Clouds',
      'com/nebulon/app/screens/Stars',
      'com/nebulon/app/screens/MaskyMask',
      'com/fido/system/Ticker',
      './SuperFilter',
      './SpeedFilter',
    ],
    function (t, e, i) {
      var r = t('PIXI'),
        n = t('com/fido/system/Device'),
        o = t('com/nebulon/app/screens/Clouds'),
        s = t('com/nebulon/app/screens/Stars'),
        a = t('com/nebulon/app/screens/MaskyMask'),
        h = t('com/fido/system/Ticker'),
        l = t('./SuperFilter'),
        u = t('./SpeedFilter'),
        c = function (t) {
          (this.app = t),
            r.DisplayObjectContainer.call(this),
            (this.clouds = new o()),
            (this.stars = new s()),
            this.addChild(this.clouds),
            this.addChild(this.stars),
            (this.maskyMask = new a()),
            this.addChild(this.maskyMask),
            (this.maskyMask.renderable = !1),
            (this.superFilter = new l(this.maskyMask)),
            (this.interactiveChildren = !1),
            (this.hitArea = new r.Rectangle(0, 0, 1900, 1200)),
            (this.interactive = !0),
            (this.mousedown = this.touchstart = this.onDown.bind(this)),
            (this.mousemove = this.touchmove = this.onMove.bind(this)),
            (this.speedFilter = new u()),
            (this.stars.filters = n.instance.isMobile ? [this.superFilter] : [this.superFilter]),
            (this.autoMode = !0),
            (this.posy = new r.Point()),
            (this.userposy = new r.Point()),
            (this.count = 0),
            (this.autoCount = 1e5),
            (this.ratio = 0);
        };
      (c.prototype = Object.create(r.DisplayObjectContainer.prototype)),
        (c.prototype.onDown = function () {
          this.maskyMask.isOpen ? this.maskyMask.close() : this.maskyMask.open();
        }),
        (c.prototype.onMove = function (t) {
          var e = t.data.getLocalPosition(this);
          (this.autoMode = !1), (this.autoCount = 0), (this.userposy.x = e.x - 950), (this.userposy.y = e.y - 600);
        }),
        (c.prototype.onShow = function () {
          h.instance.add(this.update, this);
        }),
        (c.prototype.onShown = function () {}),
        (c.prototype.update = function () {
          this.autoCount++,
            this.autoCount > 60
              ? ((this.count += 0.01),
                (this.posy.x = 1900 * Math.sin(this.count) * 0.25),
                (this.posy.y = 1200 * Math.cos(2 * this.count) * 0.05),
                (this.ratio += 0.1 * (1 - this.ratio)))
              : (this.ratio += 0.1 * (0 - this.ratio));
          var t = this.userposy.x + (this.posy.x - this.userposy.x) * this.ratio,
            e = this.userposy.y + (this.posy.y - this.userposy.y) * this.ratio;
          (this.maskyMask.target.x = t),
            (this.maskyMask.target.y = e),
            this.clouds.update(),
            this.stars.update(),
            this.maskyMask.update();
        }),
        (c.prototype.resize = function (t, e) {
          this.clouds.resize(t, e), this.stars.resize(t, e), this.maskyMask.resize(t, e);
        }),
        (i.exports = c);
    },
  ),
  define(
    'APP_root',
    [
      'require',
      'exports',
      'module',
      'PIXI',
      'com/fido/app/App',
      'com/fido/system/Ticker',
      'com/fido/system/Device',
      'com/fido/sound/SoundManager',
      'com/nebulon/app/screens/LoaderScreen',
      'com/nebulon/app/screens/MainScreen',
    ],
    function (t, e, i) {
      var r = t('PIXI');
      window.PIXI = r;
      var n = t('com/fido/app/App'),
        o = t('com/fido/system/Ticker'),
        s = (t('com/fido/system/Device'), t('com/fido/sound/SoundManager'), t('com/nebulon/app/screens/LoaderScreen')),
        a = t('com/nebulon/app/screens/MainScreen'),
        h = function () {
          var t = { orientationMode: 2 };
          n.call(this, t),
            (this.safeSize = { width: 1900, height: 1200 }),
            (this.maxSize = { width: 1900, height: 1200 }),
            this.onReady.add(this.onAppReady, this),
            this.startup(),
            (this.ls = new s()),
            this.screenManager.addScreen(this.ls, 'loader'),
            this.screenManager.gotoScreenByID('loader');
          var e = new r.loaders.Loader();
          e
            .add('x', window.ASSET_URL + 'img/skyBG.jpg')
            .add('x1', window.ASSET_URL + 'img/skyCloud1.png')
            .add('xx', window.ASSET_URL + 'img/skyCloud2.png')
            .add('x2', window.ASSET_URL + 'img/spaceBG.jpg')
            .add('x3', window.ASSET_URL + 'img/sun_add.png')
            .add('x4', window.ASSET_URL + 'img/spaceCloud1.png')
            .add('x5', window.ASSET_URL + 'img/spaceCloud2.png')
            .add('x6', window.ASSET_URL + 'img/spaceCloud3.png')
            .add('x7', window.ASSET_URL + 'img/blob.png')
            .load(this.onAppReady.bind(this)),
            window.addEventListener('message', function (t) {
              'resume' === t.data ? o.instance.start() : o.instance.stop();
            });
        };
      (h.prototype = Object.create(n.prototype)),
        (h.prototype.onAppReady = function () {
          (window.renderer = this.renderer),
            (this.starsScreen = new a(this)),
            this.screenManager.addScreen(this.starsScreen, 'title'),
            this.screenManager.gotoScreenByID('title'),
            this.resize(this.w, this.h);
        }),
        (h.prototype.resize = function (t, e) {
          (this.w = t), (this.h = e);
          var i = 1;
          this.isMobile &&
            (i = window.devicePixelRatio
              ? window.devicePixelRatio
              : window.screen.deviceXDPI / window.screen.logicalXDPI);
          var r =
              t / this.safeSize.width > e / this.safeSize.height ? t / this.safeSize.width : e / this.safeSize.height,
            n = Math.min(this.maxSize.width * r, t),
            o = Math.min(this.maxSize.height * r, e);
          this.renderer.resize((n * i) | 0, (o * i) | 0),
            (this.view.style.width = n + 'px'),
            (this.view.style.height = o + 'px'),
            (this.view.style.left = t / 2 - n / 2 + 'px'),
            (this.view.style.top = e / 2 - o / 2 + 'px'),
            this.screenManager.resize(n / r, o / r),
            this.screenManager.container.scale.set(r * i);
        }),
        (i.exports = h);
    },
  );
var Stats = function () {
  var t = Date.now(),
    e = t,
    i = 0,
    r = 1 / 0,
    n = 0,
    o = 0,
    s = 1 / 0,
    a = 0,
    h = 0,
    l = 0,
    u = document.createElement('div');
  (u.id = 'stats'),
    u.addEventListener(
      'mousedown',
      function (t) {
        t.preventDefault(), y(++l % 2);
      },
      !1,
    ),
    (u.style.cssText = 'width:80px;opacity:0.9;cursor:pointer');
  var c = document.createElement('div');
  (c.id = 'fps'), (c.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#002'), u.appendChild(c);
  var d = document.createElement('div');
  (d.id = 'fpsText'),
    (d.style.cssText =
      'color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px'),
    (d.innerHTML = 'FPS'),
    c.appendChild(d);
  var p = document.createElement('div');
  for (
    p.id = 'fpsGraph',
      p.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0ff',
      c.appendChild(p);
    74 > p.children.length;

  ) {
    var f = document.createElement('span');
    (f.style.cssText = 'width:1px;height:30px;float:left;background-color:#113'), p.appendChild(f);
  }
  var m = document.createElement('div');
  (m.id = 'ms'),
    (m.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;display:none'),
    u.appendChild(m);
  var v = document.createElement('div');
  (v.id = 'msText'),
    (v.style.cssText =
      'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px'),
    (v.innerHTML = 'MS'),
    m.appendChild(v);
  var g = document.createElement('div');
  for (
    g.id = 'msGraph',
      g.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0',
      m.appendChild(g);
    74 > g.children.length;

  )
    (f = document.createElement('span')),
      (f.style.cssText = 'width:1px;height:30px;float:left;background-color:#131'),
      g.appendChild(f);
  var y = function (t) {
    switch ((l = t)) {
      case 0:
        (c.style.display = 'block'), (m.style.display = 'none');
        break;
      case 1:
        (c.style.display = 'none'), (m.style.display = 'block');
    }
  };
  return {
    REVISION: 11,
    domElement: u,
    setMode: y,
    begin: function () {
      t = Date.now();
    },
    end: function () {
      var l = Date.now();
      (i = l - t), (r = Math.min(r, i)), (n = Math.max(n, i)), (v.textContent = i + ' MS (' + r + '-' + n + ')');
      var u = Math.min(30, 30 - 30 * (i / 200));
      return (
        (g.appendChild(g.firstChild).style.height = u + 'px'),
        h++,
        l > e + 1e3 &&
          ((o = Math.round((1e3 * h) / (l - e))),
          (s = Math.min(s, o)),
          (a = Math.max(a, o)),
          (d.textContent = o + ' FPS (' + s + '-' + a + ')'),
          (u = Math.min(30, 30 - 30 * (o / 100))),
          (p.appendChild(p.firstChild).style.height = u + 'px'),
          (e = l),
          (h = 0)),
        l
      );
    },
    update: function () {
      t = this.end();
    },
  };
};
define('stats', function () {}),
  (window.ASSET_URL = '/header/assets/'),
  (config = { app: 'com/fortieth/FortiethApp' }),
  window.console || (window.console = { log: function () {} }),
  window.console.log || (window.console.log = function () {}),
  require.config({
    baseUrl: './js',
    paths: {
      PIXI: 'libs/pixi.min',
      TWEEN: 'libs/TweenLite.min',
      EASEPACK: 'libs/EasePack.min',
      CSSPACK: 'libs/CSSPlugin.min',
      HOWLER: 'libs/howler.min',
      signals: '../node_modules/signals/dist/signals',
      APP_root: 'com/nebulon/app/NebulonApp',
      stats: 'libs/stats.min',
    },
  }),
  (window.DEVICE_SCALE = window.devicePixelRatio || 1),
  hasCanvasSupport()
    ? require([
        'TWEEN',
        'EASEPACK',
        'CSSPACK',
        'HOWLER',
        'PIXI',
        'APP_root',
        'stats',
        'com/fido/system/Device',
      ], function (t, e, i, r, n, o, s, a) {
        function h() {
          document.getElementById('container');
          (a.instance.iOS && a.instance.iOS_version < 7) || window.scrollTo(0, 0),
            l.resize(window.innerWidth, window.innerHeight);
        }
        var l = new o();
        window.app = l;
        var u = document.getElementById('container');
        u.appendChild(l.view),
          (u.style.background = 'black'),
          (l.view.style.position = 'absolute'),
          (l.view.style.top = 0),
          (l.view.style.left = 0),
          window.addEventListener('resize', function () {
            setTimeout(h, 100), setTimeout(h, 200);
          }),
          setTimeout(h, 100),
          setTimeout(h, 200);
      })
    : require(['com/fido/app/Fallback'], function () {
        new Fallback(document.body);
      }),
  define('Boot', function () {});
