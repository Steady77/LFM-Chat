function e(e) {
  return e && e.__esModule ? e.default : e;
}
var t = {};
function n(e, t) {
  if (t.length < e)
    throw new TypeError(
      e + ' argument' + (e > 1 ? 's' : '') + ' required, but only ' + t.length + ' present'
    );
}
function r(e) {
  return (
    n(1, arguments),
    e instanceof Date ||
      ('object' == typeof e && '[object Date]' === Object.prototype.toString.call(e))
  );
}
function a(e) {
  n(1, arguments);
  var t = Object.prototype.toString.call(e);
  return e instanceof Date || ('object' == typeof e && '[object Date]' === t)
    ? new Date(e.getTime())
    : 'number' == typeof e || '[object Number]' === t
    ? new Date(e)
    : (('string' != typeof e && '[object String]' !== t) ||
        'undefined' == typeof console ||
        (console.warn(
          "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"
        ),
        console.warn(new Error().stack)),
      new Date(NaN));
}
function o(e) {
  if ((n(1, arguments), !r(e) && 'number' != typeof e)) return !1;
  var t = a(e);
  return !isNaN(Number(t));
}
t = (function () {
  function e(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) e[r] = n[r];
    }
    return e;
  }
  function t(n, r) {
    function a(t, a, o) {
      if ('undefined' != typeof document) {
        'number' == typeof (o = e({}, r, o)).expires &&
          (o.expires = new Date(Date.now() + 864e5 * o.expires)),
          o.expires && (o.expires = o.expires.toUTCString()),
          (t = encodeURIComponent(t)
            .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
            .replace(/[()]/g, escape));
        var i = '';
        for (var s in o) o[s] && ((i += '; ' + s), !0 !== o[s] && (i += '=' + o[s].split(';')[0]));
        return (document.cookie = t + '=' + n.write(a, t) + i);
      }
    }
    function o(e) {
      if ('undefined' != typeof document && (!arguments.length || e)) {
        for (
          var t = document.cookie ? document.cookie.split('; ') : [], r = {}, a = 0;
          a < t.length;
          a++
        ) {
          var o = t[a].split('='),
            i = o.slice(1).join('=');
          try {
            var s = decodeURIComponent(o[0]);
            if (((r[s] = n.read(i, s)), e === s)) break;
          } catch (e) {}
        }
        return e ? r[e] : r;
      }
    }
    return Object.create(
      {
        set: a,
        get: o,
        remove: function (t, n) {
          a(t, '', e({}, n, { expires: -1 }));
        },
        withAttributes: function (n) {
          return t(this.converter, e({}, this.attributes, n));
        },
        withConverter: function (n) {
          return t(e({}, this.converter, n), this.attributes);
        },
      },
      { attributes: { value: Object.freeze(r) }, converter: { value: Object.freeze(n) } }
    );
  }
  return t(
    {
      read: function (e) {
        return (
          '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
        );
      },
      write: function (e) {
        return encodeURIComponent(e).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        );
      },
    },
    { path: '/' }
  );
})();
var i = {
    lessThanXSeconds: { one: 'less than a second', other: 'less than {{count}} seconds' },
    xSeconds: { one: '1 second', other: '{{count}} seconds' },
    halfAMinute: 'half a minute',
    lessThanXMinutes: { one: 'less than a minute', other: 'less than {{count}} minutes' },
    xMinutes: { one: '1 minute', other: '{{count}} minutes' },
    aboutXHours: { one: 'about 1 hour', other: 'about {{count}} hours' },
    xHours: { one: '1 hour', other: '{{count}} hours' },
    xDays: { one: '1 day', other: '{{count}} days' },
    aboutXWeeks: { one: 'about 1 week', other: 'about {{count}} weeks' },
    xWeeks: { one: '1 week', other: '{{count}} weeks' },
    aboutXMonths: { one: 'about 1 month', other: 'about {{count}} months' },
    xMonths: { one: '1 month', other: '{{count}} months' },
    aboutXYears: { one: 'about 1 year', other: 'about {{count}} years' },
    xYears: { one: '1 year', other: '{{count}} years' },
    overXYears: { one: 'over 1 year', other: 'over {{count}} years' },
    almostXYears: { one: 'almost 1 year', other: 'almost {{count}} years' },
  },
  s = function (e, t, n) {
    var r,
      a = i[e];
    return (
      (r = 'string' == typeof a ? a : 1 === t ? a.one : a.other.replace('{{count}}', t.toString())),
      null != n && n.addSuffix ? (n.comparison && n.comparison > 0 ? 'in ' + r : r + ' ago') : r
    );
  };
function u(e) {
  return function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      n = t.width ? String(t.width) : e.defaultWidth,
      r = e.formats[n] || e.formats[e.defaultWidth];
    return r;
  };
}
var c = {
    date: u({
      formats: {
        full: 'EEEE, MMMM do, y',
        long: 'MMMM do, y',
        medium: 'MMM d, y',
        short: 'MM/dd/yyyy',
      },
      defaultWidth: 'full',
    }),
    time: u({
      formats: {
        full: 'h:mm:ss a zzzz',
        long: 'h:mm:ss a z',
        medium: 'h:mm:ss a',
        short: 'h:mm a',
      },
      defaultWidth: 'full',
    }),
    dateTime: u({
      formats: {
        full: "{{date}} 'at' {{time}}",
        long: "{{date}} 'at' {{time}}",
        medium: '{{date}}, {{time}}',
        short: '{{date}}, {{time}}',
      },
      defaultWidth: 'full',
    }),
  },
  l = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P',
  };
function d(e) {
  return function (t, n) {
    var r,
      a = n || {};
    if ('formatting' === (a.context ? String(a.context) : 'standalone') && e.formattingValues) {
      var o = e.defaultFormattingWidth || e.defaultWidth,
        i = a.width ? String(a.width) : o;
      r = e.formattingValues[i] || e.formattingValues[o];
    } else {
      var s = e.defaultWidth,
        u = a.width ? String(a.width) : e.defaultWidth;
      r = e.values[u] || e.values[s];
    }
    return r[e.argumentCallback ? e.argumentCallback(t) : t];
  };
}
function h(e) {
  return function (t) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      r = n.width,
      a = (r && e.matchPatterns[r]) || e.matchPatterns[e.defaultMatchWidth],
      o = t.match(a);
    if (!o) return null;
    var i,
      s = o[0],
      u = (r && e.parsePatterns[r]) || e.parsePatterns[e.defaultParseWidth],
      c = Array.isArray(u)
        ? m(u, function (e) {
            return e.test(s);
          })
        : f(u, function (e) {
            return e.test(s);
          });
    (i = e.valueCallback ? e.valueCallback(c) : c), (i = n.valueCallback ? n.valueCallback(i) : i);
    var l = t.slice(s.length);
    return { value: i, rest: l };
  };
}
function f(e, t) {
  for (var n in e) if (e.hasOwnProperty(n) && t(e[n])) return n;
}
function m(e, t) {
  for (var n = 0; n < e.length; n++) if (t(e[n])) return n;
}
var g,
  p = {
    code: 'en-US',
    formatDistance: s,
    formatLong: c,
    formatRelative: function (e, t, n, r) {
      return l[e];
    },
    localize: {
      ordinalNumber: function (e, t) {
        var n = Number(e),
          r = n % 100;
        if (r > 20 || r < 10)
          switch (r % 10) {
            case 1:
              return n + 'st';
            case 2:
              return n + 'nd';
            case 3:
              return n + 'rd';
          }
        return n + 'th';
      },
      era: d({
        values: {
          narrow: ['B', 'A'],
          abbreviated: ['BC', 'AD'],
          wide: ['Before Christ', 'Anno Domini'],
        },
        defaultWidth: 'wide',
      }),
      quarter: d({
        values: {
          narrow: ['1', '2', '3', '4'],
          abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
          wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
        },
        defaultWidth: 'wide',
        argumentCallback: function (e) {
          return e - 1;
        },
      }),
      month: d({
        values: {
          narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          abbreviated: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          wide: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        },
        defaultWidth: 'wide',
      }),
      day: d({
        values: {
          narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        },
        defaultWidth: 'wide',
      }),
      dayPeriod: d({
        values: {
          narrow: {
            am: 'a',
            pm: 'p',
            midnight: 'mi',
            noon: 'n',
            morning: 'morning',
            afternoon: 'afternoon',
            evening: 'evening',
            night: 'night',
          },
          abbreviated: {
            am: 'AM',
            pm: 'PM',
            midnight: 'midnight',
            noon: 'noon',
            morning: 'morning',
            afternoon: 'afternoon',
            evening: 'evening',
            night: 'night',
          },
          wide: {
            am: 'a.m.',
            pm: 'p.m.',
            midnight: 'midnight',
            noon: 'noon',
            morning: 'morning',
            afternoon: 'afternoon',
            evening: 'evening',
            night: 'night',
          },
        },
        defaultWidth: 'wide',
        formattingValues: {
          narrow: {
            am: 'a',
            pm: 'p',
            midnight: 'mi',
            noon: 'n',
            morning: 'in the morning',
            afternoon: 'in the afternoon',
            evening: 'in the evening',
            night: 'at night',
          },
          abbreviated: {
            am: 'AM',
            pm: 'PM',
            midnight: 'midnight',
            noon: 'noon',
            morning: 'in the morning',
            afternoon: 'in the afternoon',
            evening: 'in the evening',
            night: 'at night',
          },
          wide: {
            am: 'a.m.',
            pm: 'p.m.',
            midnight: 'midnight',
            noon: 'noon',
            morning: 'in the morning',
            afternoon: 'in the afternoon',
            evening: 'in the evening',
            night: 'at night',
          },
        },
        defaultFormattingWidth: 'wide',
      }),
    },
    match: {
      ordinalNumber:
        ((g = {
          matchPattern: /^(\d+)(th|st|nd|rd)?/i,
          parsePattern: /\d+/i,
          valueCallback: function (e) {
            return parseInt(e, 10);
          },
        }),
        function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = e.match(g.matchPattern);
          if (!n) return null;
          var r = n[0],
            a = e.match(g.parsePattern);
          if (!a) return null;
          var o = g.valueCallback ? g.valueCallback(a[0]) : a[0];
          o = t.valueCallback ? t.valueCallback(o) : o;
          var i = e.slice(r.length);
          return { value: o, rest: i };
        }),
      era: h({
        matchPatterns: {
          narrow: /^(b|a)/i,
          abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
          wide: /^(before christ|before common era|anno domini|common era)/i,
        },
        defaultMatchWidth: 'wide',
        parsePatterns: { any: [/^b/i, /^(a|c)/i] },
        defaultParseWidth: 'any',
      }),
      quarter: h({
        matchPatterns: {
          narrow: /^[1234]/i,
          abbreviated: /^q[1234]/i,
          wide: /^[1234](th|st|nd|rd)? quarter/i,
        },
        defaultMatchWidth: 'wide',
        parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
        defaultParseWidth: 'any',
        valueCallback: function (e) {
          return e + 1;
        },
      }),
      month: h({
        matchPatterns: {
          narrow: /^[jfmasond]/i,
          abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
          wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
        },
        defaultMatchWidth: 'wide',
        parsePatterns: {
          narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
          any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
        },
        defaultParseWidth: 'any',
      }),
      day: h({
        matchPatterns: {
          narrow: /^[smtwf]/i,
          short: /^(su|mo|tu|we|th|fr|sa)/i,
          abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
          wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
        },
        defaultMatchWidth: 'wide',
        parsePatterns: {
          narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
          any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
        },
        defaultParseWidth: 'any',
      }),
      dayPeriod: h({
        matchPatterns: {
          narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
          any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
        },
        defaultMatchWidth: 'any',
        parsePatterns: {
          any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i,
          },
        },
        defaultParseWidth: 'any',
      }),
    },
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  };
function y(e) {
  if (null === e || !0 === e || !1 === e) return NaN;
  var t = Number(e);
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
function v(e, t) {
  n(2, arguments);
  var r = a(e).getTime(),
    o = y(t);
  return new Date(r + o);
}
function w(e, t) {
  n(2, arguments);
  var r = y(t);
  return v(e, -r);
}
function b(e) {
  n(1, arguments);
  var t = 1,
    r = a(e),
    o = r.getUTCDay(),
    i = (o < t ? 7 : 0) + o - t;
  return r.setUTCDate(r.getUTCDate() - i), r.setUTCHours(0, 0, 0, 0), r;
}
function _(e) {
  n(1, arguments);
  var t = a(e),
    r = t.getUTCFullYear(),
    o = new Date(0);
  o.setUTCFullYear(r + 1, 0, 4), o.setUTCHours(0, 0, 0, 0);
  var i = b(o),
    s = new Date(0);
  s.setUTCFullYear(r, 0, 4), s.setUTCHours(0, 0, 0, 0);
  var u = b(s);
  return t.getTime() >= i.getTime() ? r + 1 : t.getTime() >= u.getTime() ? r : r - 1;
}
function T(e) {
  n(1, arguments);
  var t = _(e),
    r = new Date(0);
  r.setUTCFullYear(t, 0, 4), r.setUTCHours(0, 0, 0, 0);
  var a = b(r);
  return a;
}
function C(e, t) {
  n(1, arguments);
  var r = t || {},
    o = r.locale,
    i = o && o.options && o.options.weekStartsOn,
    s = null == i ? 0 : y(i),
    u = null == r.weekStartsOn ? s : y(r.weekStartsOn);
  if (!(u >= 0 && u <= 6)) throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  var c = a(e),
    l = c.getUTCDay(),
    d = (l < u ? 7 : 0) + l - u;
  return c.setUTCDate(c.getUTCDate() - d), c.setUTCHours(0, 0, 0, 0), c;
}
function M(e, t) {
  n(1, arguments);
  var r = a(e),
    o = r.getUTCFullYear(),
    i = t || {},
    s = i.locale,
    u = s && s.options && s.options.firstWeekContainsDate,
    c = null == u ? 1 : y(u),
    l = null == i.firstWeekContainsDate ? c : y(i.firstWeekContainsDate);
  if (!(l >= 1 && l <= 7))
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  var d = new Date(0);
  d.setUTCFullYear(o + 1, 0, l), d.setUTCHours(0, 0, 0, 0);
  var h = C(d, t),
    f = new Date(0);
  f.setUTCFullYear(o, 0, l), f.setUTCHours(0, 0, 0, 0);
  var m = C(f, t);
  return r.getTime() >= h.getTime() ? o + 1 : r.getTime() >= m.getTime() ? o : o - 1;
}
function E(e, t) {
  n(1, arguments);
  var r = t || {},
    a = r.locale,
    o = a && a.options && a.options.firstWeekContainsDate,
    i = null == o ? 1 : y(o),
    s = null == r.firstWeekContainsDate ? i : y(r.firstWeekContainsDate),
    u = M(e, t),
    c = new Date(0);
  c.setUTCFullYear(u, 0, s), c.setUTCHours(0, 0, 0, 0);
  var l = C(c, t);
  return l;
}
function D(e, t) {
  for (var n = e < 0 ? '-' : '', r = Math.abs(e).toString(); r.length < t; ) r = '0' + r;
  return n + r;
}
var S = {
    y: function (e, t) {
      var n = e.getUTCFullYear(),
        r = n > 0 ? n : 1 - n;
      return D('yy' === t ? r % 100 : r, t.length);
    },
    M: function (e, t) {
      var n = e.getUTCMonth();
      return 'M' === t ? String(n + 1) : D(n + 1, 2);
    },
    d: function (e, t) {
      return D(e.getUTCDate(), t.length);
    },
    a: function (e, t) {
      var n = e.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
      switch (t) {
        case 'a':
        case 'aa':
          return n.toUpperCase();
        case 'aaa':
          return n;
        case 'aaaaa':
          return n[0];
        default:
          return 'am' === n ? 'a.m.' : 'p.m.';
      }
    },
    h: function (e, t) {
      return D(e.getUTCHours() % 12 || 12, t.length);
    },
    H: function (e, t) {
      return D(e.getUTCHours(), t.length);
    },
    m: function (e, t) {
      return D(e.getUTCMinutes(), t.length);
    },
    s: function (e, t) {
      return D(e.getUTCSeconds(), t.length);
    },
    S: function (e, t) {
      var n = t.length,
        r = e.getUTCMilliseconds();
      return D(Math.floor(r * Math.pow(10, n - 3)), t.length);
    },
  },
  N = 'midnight',
  O = 'noon',
  x = 'morning',
  U = 'afternoon',
  L = 'evening',
  P = 'night';
function k(e, t) {
  var n = e > 0 ? '-' : '+',
    r = Math.abs(e),
    a = Math.floor(r / 60),
    o = r % 60;
  if (0 === o) return n + String(a);
  var i = t || '';
  return n + String(a) + i + D(o, 2);
}
function A(e, t) {
  return e % 60 == 0 ? (e > 0 ? '-' : '+') + D(Math.abs(e) / 60, 2) : I(e, t);
}
function I(e, t) {
  var n = t || '',
    r = e > 0 ? '-' : '+',
    a = Math.abs(e);
  return r + D(Math.floor(a / 60), 2) + n + D(a % 60, 2);
}
var R = {
  G: function (e, t, n) {
    var r = e.getUTCFullYear() > 0 ? 1 : 0;
    switch (t) {
      case 'G':
      case 'GG':
      case 'GGG':
        return n.era(r, { width: 'abbreviated' });
      case 'GGGGG':
        return n.era(r, { width: 'narrow' });
      default:
        return n.era(r, { width: 'wide' });
    }
  },
  y: function (e, t, n) {
    if ('yo' === t) {
      var r = e.getUTCFullYear(),
        a = r > 0 ? r : 1 - r;
      return n.ordinalNumber(a, { unit: 'year' });
    }
    return S.y(e, t);
  },
  Y: function (e, t, n, r) {
    var a = M(e, r),
      o = a > 0 ? a : 1 - a;
    return 'YY' === t
      ? D(o % 100, 2)
      : 'Yo' === t
      ? n.ordinalNumber(o, { unit: 'year' })
      : D(o, t.length);
  },
  R: function (e, t) {
    return D(_(e), t.length);
  },
  u: function (e, t) {
    return D(e.getUTCFullYear(), t.length);
  },
  Q: function (e, t, n) {
    var r = Math.ceil((e.getUTCMonth() + 1) / 3);
    switch (t) {
      case 'Q':
        return String(r);
      case 'QQ':
        return D(r, 2);
      case 'Qo':
        return n.ordinalNumber(r, { unit: 'quarter' });
      case 'QQQ':
        return n.quarter(r, { width: 'abbreviated', context: 'formatting' });
      case 'QQQQQ':
        return n.quarter(r, { width: 'narrow', context: 'formatting' });
      default:
        return n.quarter(r, { width: 'wide', context: 'formatting' });
    }
  },
  q: function (e, t, n) {
    var r = Math.ceil((e.getUTCMonth() + 1) / 3);
    switch (t) {
      case 'q':
        return String(r);
      case 'qq':
        return D(r, 2);
      case 'qo':
        return n.ordinalNumber(r, { unit: 'quarter' });
      case 'qqq':
        return n.quarter(r, { width: 'abbreviated', context: 'standalone' });
      case 'qqqqq':
        return n.quarter(r, { width: 'narrow', context: 'standalone' });
      default:
        return n.quarter(r, { width: 'wide', context: 'standalone' });
    }
  },
  M: function (e, t, n) {
    var r = e.getUTCMonth();
    switch (t) {
      case 'M':
      case 'MM':
        return S.M(e, t);
      case 'Mo':
        return n.ordinalNumber(r + 1, { unit: 'month' });
      case 'MMM':
        return n.month(r, { width: 'abbreviated', context: 'formatting' });
      case 'MMMMM':
        return n.month(r, { width: 'narrow', context: 'formatting' });
      default:
        return n.month(r, { width: 'wide', context: 'formatting' });
    }
  },
  L: function (e, t, n) {
    var r = e.getUTCMonth();
    switch (t) {
      case 'L':
        return String(r + 1);
      case 'LL':
        return D(r + 1, 2);
      case 'Lo':
        return n.ordinalNumber(r + 1, { unit: 'month' });
      case 'LLL':
        return n.month(r, { width: 'abbreviated', context: 'standalone' });
      case 'LLLLL':
        return n.month(r, { width: 'narrow', context: 'standalone' });
      default:
        return n.month(r, { width: 'wide', context: 'standalone' });
    }
  },
  w: function (e, t, r, o) {
    var i = (function (e, t) {
      n(1, arguments);
      var r = a(e),
        o = C(r, t).getTime() - E(r, t).getTime();
      return Math.round(o / 6048e5) + 1;
    })(e, o);
    return 'wo' === t ? r.ordinalNumber(i, { unit: 'week' }) : D(i, t.length);
  },
  I: function (e, t, r) {
    var o = (function (e) {
      n(1, arguments);
      var t = a(e),
        r = b(t).getTime() - T(t).getTime();
      return Math.round(r / 6048e5) + 1;
    })(e);
    return 'Io' === t ? r.ordinalNumber(o, { unit: 'week' }) : D(o, t.length);
  },
  d: function (e, t, n) {
    return 'do' === t ? n.ordinalNumber(e.getUTCDate(), { unit: 'date' }) : S.d(e, t);
  },
  D: function (e, t, r) {
    var o = (function (e) {
      n(1, arguments);
      var t = a(e),
        r = t.getTime();
      t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
      var o = t.getTime(),
        i = r - o;
      return Math.floor(i / 864e5) + 1;
    })(e);
    return 'Do' === t ? r.ordinalNumber(o, { unit: 'dayOfYear' }) : D(o, t.length);
  },
  E: function (e, t, n) {
    var r = e.getUTCDay();
    switch (t) {
      case 'E':
      case 'EE':
      case 'EEE':
        return n.day(r, { width: 'abbreviated', context: 'formatting' });
      case 'EEEEE':
        return n.day(r, { width: 'narrow', context: 'formatting' });
      case 'EEEEEE':
        return n.day(r, { width: 'short', context: 'formatting' });
      default:
        return n.day(r, { width: 'wide', context: 'formatting' });
    }
  },
  e: function (e, t, n, r) {
    var a = e.getUTCDay(),
      o = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case 'e':
        return String(o);
      case 'ee':
        return D(o, 2);
      case 'eo':
        return n.ordinalNumber(o, { unit: 'day' });
      case 'eee':
        return n.day(a, { width: 'abbreviated', context: 'formatting' });
      case 'eeeee':
        return n.day(a, { width: 'narrow', context: 'formatting' });
      case 'eeeeee':
        return n.day(a, { width: 'short', context: 'formatting' });
      default:
        return n.day(a, { width: 'wide', context: 'formatting' });
    }
  },
  c: function (e, t, n, r) {
    var a = e.getUTCDay(),
      o = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case 'c':
        return String(o);
      case 'cc':
        return D(o, t.length);
      case 'co':
        return n.ordinalNumber(o, { unit: 'day' });
      case 'ccc':
        return n.day(a, { width: 'abbreviated', context: 'standalone' });
      case 'ccccc':
        return n.day(a, { width: 'narrow', context: 'standalone' });
      case 'cccccc':
        return n.day(a, { width: 'short', context: 'standalone' });
      default:
        return n.day(a, { width: 'wide', context: 'standalone' });
    }
  },
  i: function (e, t, n) {
    var r = e.getUTCDay(),
      a = 0 === r ? 7 : r;
    switch (t) {
      case 'i':
        return String(a);
      case 'ii':
        return D(a, t.length);
      case 'io':
        return n.ordinalNumber(a, { unit: 'day' });
      case 'iii':
        return n.day(r, { width: 'abbreviated', context: 'formatting' });
      case 'iiiii':
        return n.day(r, { width: 'narrow', context: 'formatting' });
      case 'iiiiii':
        return n.day(r, { width: 'short', context: 'formatting' });
      default:
        return n.day(r, { width: 'wide', context: 'formatting' });
    }
  },
  a: function (e, t, n) {
    var r = e.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
    switch (t) {
      case 'a':
      case 'aa':
        return n.dayPeriod(r, { width: 'abbreviated', context: 'formatting' });
      case 'aaa':
        return n.dayPeriod(r, { width: 'abbreviated', context: 'formatting' }).toLowerCase();
      case 'aaaaa':
        return n.dayPeriod(r, { width: 'narrow', context: 'formatting' });
      default:
        return n.dayPeriod(r, { width: 'wide', context: 'formatting' });
    }
  },
  b: function (e, t, n) {
    var r,
      a = e.getUTCHours();
    switch (((r = 12 === a ? O : 0 === a ? N : a / 12 >= 1 ? 'pm' : 'am'), t)) {
      case 'b':
      case 'bb':
        return n.dayPeriod(r, { width: 'abbreviated', context: 'formatting' });
      case 'bbb':
        return n.dayPeriod(r, { width: 'abbreviated', context: 'formatting' }).toLowerCase();
      case 'bbbbb':
        return n.dayPeriod(r, { width: 'narrow', context: 'formatting' });
      default:
        return n.dayPeriod(r, { width: 'wide', context: 'formatting' });
    }
  },
  B: function (e, t, n) {
    var r,
      a = e.getUTCHours();
    switch (((r = a >= 17 ? L : a >= 12 ? U : a >= 4 ? x : P), t)) {
      case 'B':
      case 'BB':
      case 'BBB':
        return n.dayPeriod(r, { width: 'abbreviated', context: 'formatting' });
      case 'BBBBB':
        return n.dayPeriod(r, { width: 'narrow', context: 'formatting' });
      default:
        return n.dayPeriod(r, { width: 'wide', context: 'formatting' });
    }
  },
  h: function (e, t, n) {
    if ('ho' === t) {
      var r = e.getUTCHours() % 12;
      return 0 === r && (r = 12), n.ordinalNumber(r, { unit: 'hour' });
    }
    return S.h(e, t);
  },
  H: function (e, t, n) {
    return 'Ho' === t ? n.ordinalNumber(e.getUTCHours(), { unit: 'hour' }) : S.H(e, t);
  },
  K: function (e, t, n) {
    var r = e.getUTCHours() % 12;
    return 'Ko' === t ? n.ordinalNumber(r, { unit: 'hour' }) : D(r, t.length);
  },
  k: function (e, t, n) {
    var r = e.getUTCHours();
    return 0 === r && (r = 24), 'ko' === t ? n.ordinalNumber(r, { unit: 'hour' }) : D(r, t.length);
  },
  m: function (e, t, n) {
    return 'mo' === t ? n.ordinalNumber(e.getUTCMinutes(), { unit: 'minute' }) : S.m(e, t);
  },
  s: function (e, t, n) {
    return 'so' === t ? n.ordinalNumber(e.getUTCSeconds(), { unit: 'second' }) : S.s(e, t);
  },
  S: function (e, t) {
    return S.S(e, t);
  },
  X: function (e, t, n, r) {
    var a = (r._originalDate || e).getTimezoneOffset();
    if (0 === a) return 'Z';
    switch (t) {
      case 'X':
        return A(a);
      case 'XXXX':
      case 'XX':
        return I(a);
      default:
        return I(a, ':');
    }
  },
  x: function (e, t, n, r) {
    var a = (r._originalDate || e).getTimezoneOffset();
    switch (t) {
      case 'x':
        return A(a);
      case 'xxxx':
      case 'xx':
        return I(a);
      default:
        return I(a, ':');
    }
  },
  O: function (e, t, n, r) {
    var a = (r._originalDate || e).getTimezoneOffset();
    switch (t) {
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + k(a, ':');
      default:
        return 'GMT' + I(a, ':');
    }
  },
  z: function (e, t, n, r) {
    var a = (r._originalDate || e).getTimezoneOffset();
    switch (t) {
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + k(a, ':');
      default:
        return 'GMT' + I(a, ':');
    }
  },
  t: function (e, t, n, r) {
    var a = r._originalDate || e;
    return D(Math.floor(a.getTime() / 1e3), t.length);
  },
  T: function (e, t, n, r) {
    return D((r._originalDate || e).getTime(), t.length);
  },
};
function Y(e, t) {
  switch (e) {
    case 'P':
      return t.date({ width: 'short' });
    case 'PP':
      return t.date({ width: 'medium' });
    case 'PPP':
      return t.date({ width: 'long' });
    default:
      return t.date({ width: 'full' });
  }
}
function W(e, t) {
  switch (e) {
    case 'p':
      return t.time({ width: 'short' });
    case 'pp':
      return t.time({ width: 'medium' });
    case 'ppp':
      return t.time({ width: 'long' });
    default:
      return t.time({ width: 'full' });
  }
}
var j = {
  p: W,
  P: function (e, t) {
    var n,
      r = e.match(/(P+)(p+)?/) || [],
      a = r[1],
      o = r[2];
    if (!o) return Y(e, t);
    switch (a) {
      case 'P':
        n = t.dateTime({ width: 'short' });
        break;
      case 'PP':
        n = t.dateTime({ width: 'medium' });
        break;
      case 'PPP':
        n = t.dateTime({ width: 'long' });
        break;
      default:
        n = t.dateTime({ width: 'full' });
    }
    return n.replace('{{date}}', Y(a, t)).replace('{{time}}', W(o, t));
  },
};
function q(e) {
  var t = new Date(
    Date.UTC(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      e.getMilliseconds()
    )
  );
  return t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime();
}
var F = ['D', 'DD'],
  G = ['YY', 'YYYY'];
function H(e) {
  return -1 !== F.indexOf(e);
}
function z(e) {
  return -1 !== G.indexOf(e);
}
function B(e, t, n) {
  if ('YYYY' === e)
    throw new RangeError(
      'Use `yyyy` instead of `YYYY` (in `'
        .concat(t, '`) for formatting years to the input `')
        .concat(n, '`; see: https://git.io/fxCyr')
    );
  if ('YY' === e)
    throw new RangeError(
      'Use `yy` instead of `YY` (in `'
        .concat(t, '`) for formatting years to the input `')
        .concat(n, '`; see: https://git.io/fxCyr')
    );
  if ('D' === e)
    throw new RangeError(
      'Use `d` instead of `D` (in `'
        .concat(t, '`) for formatting days of the month to the input `')
        .concat(n, '`; see: https://git.io/fxCyr')
    );
  if ('DD' === e)
    throw new RangeError(
      'Use `dd` instead of `DD` (in `'
        .concat(t, '`) for formatting days of the month to the input `')
        .concat(n, '`; see: https://git.io/fxCyr')
    );
}
var Q = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
  $ = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
  X = /^'([^]*?)'?$/,
  J = /''/g,
  Z = /[a-zA-Z]/;
function V(e) {
  return e.match(X)[1].replace(J, "'");
}
Math.pow(10, 8);
var K = { dateTimeDelimiter: /[T ]/, timeZoneDelimiter: /[Z ]/i, timezone: /([Z+-].*)$/ },
  ee = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
  te = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
  ne = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function re(e) {
  var t,
    n = {},
    r = e.split(K.dateTimeDelimiter);
  if (r.length > 2) return n;
  if (
    (/:/.test(r[0])
      ? (t = r[0])
      : ((n.date = r[0]),
        (t = r[1]),
        K.timeZoneDelimiter.test(n.date) &&
          ((n.date = e.split(K.timeZoneDelimiter)[0]), (t = e.substr(n.date.length, e.length)))),
    t)
  ) {
    var a = K.timezone.exec(t);
    a ? ((n.time = t.replace(a[1], '')), (n.timezone = a[1])) : (n.time = t);
  }
  return n;
}
function ae(e, t) {
  var n = new RegExp('^(?:(\\d{4}|[+-]\\d{' + (4 + t) + '})|(\\d{2}|[+-]\\d{' + (2 + t) + '})$)'),
    r = e.match(n);
  if (!r) return { year: NaN, restDateString: '' };
  var a = r[1] ? parseInt(r[1]) : null,
    o = r[2] ? parseInt(r[2]) : null;
  return { year: null === o ? a : 100 * o, restDateString: e.slice((r[1] || r[2]).length) };
}
function oe(e, t) {
  if (null === t) return new Date(NaN);
  var n = e.match(ee);
  if (!n) return new Date(NaN);
  var r = !!n[4],
    a = ie(n[1]),
    o = ie(n[2]) - 1,
    i = ie(n[3]),
    s = ie(n[4]),
    u = ie(n[5]) - 1;
  if (r)
    return (function (e, t, n) {
      return t >= 1 && t <= 53 && n >= 0 && n <= 6;
    })(0, s, u)
      ? (function (e, t, n) {
          var r = new Date(0);
          r.setUTCFullYear(e, 0, 4);
          var a = r.getUTCDay() || 7,
            o = 7 * (t - 1) + n + 1 - a;
          return r.setUTCDate(r.getUTCDate() + o), r;
        })(t, s, u)
      : new Date(NaN);
  var c = new Date(0);
  return (function (e, t, n) {
    return t >= 0 && t <= 11 && n >= 1 && n <= (le[t] || (de(e) ? 29 : 28));
  })(t, o, i) &&
    (function (e, t) {
      return t >= 1 && t <= (de(e) ? 366 : 365);
    })(t, a)
    ? (c.setUTCFullYear(t, o, Math.max(a, i)), c)
    : new Date(NaN);
}
function ie(e) {
  return e ? parseInt(e) : 1;
}
function se(e) {
  var t = e.match(te);
  if (!t) return NaN;
  var n = ue(t[1]),
    r = ue(t[2]),
    a = ue(t[3]);
  return (function (e, t, n) {
    return 24 === e ? 0 === t && 0 === n : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
  })(n, r, a)
    ? 36e5 * n + 6e4 * r + 1e3 * a
    : NaN;
}
function ue(e) {
  return (e && parseFloat(e.replace(',', '.'))) || 0;
}
function ce(e) {
  if ('Z' === e) return 0;
  var t = e.match(ne);
  if (!t) return 0;
  var n = '+' === t[1] ? -1 : 1,
    r = parseInt(t[2]),
    a = (t[3] && parseInt(t[3])) || 0;
  return (function (e, t) {
    return t >= 0 && t <= 59;
  })(0, a)
    ? n * (36e5 * r + 6e4 * a)
    : NaN;
}
var le = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function de(e) {
  return e % 400 == 0 || (e % 4 == 0 && e % 100 != 0);
}
function he(e) {
  return !e;
}
function fe() {
  return e(t).get('auth-key') && e(t).get('email');
}
function me(e) {
  return (function (e, t, r) {
    n(2, arguments);
    var i = String(t),
      s = r || {},
      u = s.locale || p,
      c = u.options && u.options.firstWeekContainsDate,
      l = null == c ? 1 : y(c),
      d = null == s.firstWeekContainsDate ? l : y(s.firstWeekContainsDate);
    if (!(d >= 1 && d <= 7))
      throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
    var h = u.options && u.options.weekStartsOn,
      f = null == h ? 0 : y(h),
      m = null == s.weekStartsOn ? f : y(s.weekStartsOn);
    if (!(m >= 0 && m <= 6))
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    if (!u.localize) throw new RangeError('locale must contain localize property');
    if (!u.formatLong) throw new RangeError('locale must contain formatLong property');
    var g = a(e);
    if (!o(g)) throw new RangeError('Invalid time value');
    var v = q(g),
      b = w(g, v),
      _ = { firstWeekContainsDate: d, weekStartsOn: m, locale: u, _originalDate: g };
    return i
      .match($)
      .map(function (e) {
        var t = e[0];
        return 'p' === t || 'P' === t ? (0, j[t])(e, u.formatLong, _) : e;
      })
      .join('')
      .match(Q)
      .map(function (n) {
        if ("''" === n) return "'";
        var r = n[0];
        if ("'" === r) return V(n);
        var a = R[r];
        if (a)
          return (
            !s.useAdditionalWeekYearTokens && z(n) && B(n, t, e),
            !s.useAdditionalDayOfYearTokens && H(n) && B(n, t, e),
            a(b, n, u.localize, _)
          );
        if (r.match(Z))
          throw new RangeError(
            'Format string contains an unescaped latin alphabet character `' + r + '`'
          );
        return n;
      })
      .join('');
  })(
    (function (e, t) {
      n(1, arguments);
      var r = t || {},
        a = null == r.additionalDigits ? 2 : y(r.additionalDigits);
      if (2 !== a && 1 !== a && 0 !== a) throw new RangeError('additionalDigits must be 0, 1 or 2');
      if ('string' != typeof e && '[object String]' !== Object.prototype.toString.call(e))
        return new Date(NaN);
      var o,
        i = re(e);
      if (i.date) {
        var s = ae(i.date, a);
        o = oe(s.restDateString, s.year);
      }
      if (!o || isNaN(o.getTime())) return new Date(NaN);
      var u,
        c = o.getTime(),
        l = 0;
      if (i.time && ((l = se(i.time)), isNaN(l))) return new Date(NaN);
      if (!i.timezone) {
        var d = new Date(c + l),
          h = new Date(0);
        return (
          h.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
          h.setHours(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()),
          h
        );
      }
      return (u = ce(i.timezone)), isNaN(u) ? new Date(NaN) : new Date(c + l + u);
    })(e),
    'HH:mm'
  );
}
function ge() {
  return `Bearer ${e(t).get('auth-key')}`;
}
const pe = {
    sendEmail: (e) =>
      fetch('https://mighty-cove-31255.herokuapp.com/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ email: e }),
      }),
    sendName: (e) =>
      fetch('https://mighty-cove-31255.herokuapp.com/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: ge() },
        body: JSON.stringify({ name: e }),
      }),
    async getMessages() {
      const e = await fetch('https://mighty-cove-31255.herokuapp.com/api/messages', {
        method: 'GET',
        headers: { Authorization: ge() },
      });
      if (e.ok) return e.json();
      throw new Error(`Данные небыли получены, ошибка ${e.status} ${e.statusText}`);
    },
    me: () =>
      fetch('https://mighty-cove-31255.herokuapp.com/api/user/me', {
        method: 'GET',
        headers: { Authorization: ge() },
      }),
  },
  ye = (e) => {
    e.classList.add('modal-overlay--open');
  },
  ve = (e) => {
    e.classList.remove('modal-overlay--open');
  },
  we = {
    SETTINGS_BUTTON: document.querySelector('.chat__settings-button'),
    MODALS_OVERLAYS: document.querySelectorAll('.modal-overlay'),
    CHAT_BODY: document.querySelector('.chat__inner'),
    MESSAGE_TEMPLATE: document.querySelector('#message-template'),
    SEND_MESSAGE_FORM: document.querySelector('.message-form'),
    MESSAGE_INPUT: document.querySelector('.message-form__input'),
    EMAIL_INPUT: document.querySelector('.auth-form__input'),
    EMAIL_FORM: document.querySelector('.auth-form'),
    CONFIRM_FORM: document.querySelector('.confirm-form'),
    CONFIRM_INPUT: document.querySelector('.confirm-form__input'),
    NAME_FORM: document.querySelector('.name-form'),
    NAME_INPUT: document.querySelector('.name-form__input'),
    EMAIL_MODAL: document.querySelector('.modal-email'),
    CONFIRM_MODAL: document.querySelector('.modal-cofirm'),
    NAME_MODAL: document.querySelector('.modal-name'),
  };
function be({ text: n, user: r, createdAt: a }) {
  const o = we.MESSAGE_TEMPLATE.content.firstElementChild.cloneNode(!0),
    i = o.querySelector('.message__text'),
    s = o.querySelector('.message__time');
  return (
    r.email === e(t).get('email')
      ? (o.classList.add('my-message'), (i.textContent = `Я: ${n}`), (s.textContent = me(a)))
      : (o.classList.add('partners-message'),
        (i.textContent = `${r.name}: ${n}`),
        (s.textContent = me(a))),
    o
  );
}
function _e(e) {
  e.value = '';
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */ var Te = function (
  e,
  t
) {
  return (Te =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (e, t) {
        e.__proto__ = t;
      }) ||
    function (e, t) {
      for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
    })(e, t);
};
function Ce(e, t) {
  function n() {
    this.constructor = e;
  }
  Te(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
}
function Me(e, t) {
  var n = 'function' == typeof Symbol && e[Symbol.iterator];
  if (!n) return e;
  var r,
    a,
    o = n.call(e),
    i = [];
  try {
    for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; ) i.push(r.value);
  } catch (e) {
    a = { error: e };
  } finally {
    try {
      r && !r.done && (n = o.return) && n.call(o);
    } finally {
      if (a) throw a.error;
    }
  }
  return i;
}
function Ee() {
  for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(Me(arguments[t]));
  return e;
}
var De = function (e, t) {
    (this.target = t), (this.type = e);
  },
  Se = (function (e) {
    function t(t, n) {
      var r = e.call(this, 'error', n) || this;
      return (r.message = t.message), (r.error = t), r;
    }
    return Ce(t, e), t;
  })(De),
  Ne = (function (e) {
    function t(t, n, r) {
      void 0 === t && (t = 1e3), void 0 === n && (n = '');
      var a = e.call(this, 'close', r) || this;
      return (a.wasClean = !0), (a.code = t), (a.reason = n), a;
    }
    return Ce(t, e), t;
  })(De),
  Oe = function () {
    if ('undefined' != typeof WebSocket) return WebSocket;
  },
  xe = {
    maxReconnectionDelay: 1e4,
    minReconnectionDelay: 1e3 + 4e3 * Math.random(),
    minUptime: 5e3,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 4e3,
    maxRetries: 1 / 0,
    maxEnqueuedMessages: 1 / 0,
    startClosed: !1,
    debug: !1,
  },
  Ue = (function () {
    function e(e, t, n) {
      var r = this;
      void 0 === n && (n = {}),
        (this._listeners = { error: [], message: [], open: [], close: [] }),
        (this._retryCount = -1),
        (this._shouldReconnect = !0),
        (this._connectLock = !1),
        (this._binaryType = 'blob'),
        (this._closeCalled = !1),
        (this._messageQueue = []),
        (this.onclose = null),
        (this.onerror = null),
        (this.onmessage = null),
        (this.onopen = null),
        (this._handleOpen = function (e) {
          r._debug('open event');
          var t = r._options.minUptime,
            n = void 0 === t ? xe.minUptime : t;
          clearTimeout(r._connectTimeout),
            (r._uptimeTimeout = setTimeout(function () {
              return r._acceptOpen();
            }, n)),
            (r._ws.binaryType = r._binaryType),
            r._messageQueue.forEach(function (e) {
              return r._ws.send(e);
            }),
            (r._messageQueue = []),
            r.onopen && r.onopen(e),
            r._listeners.open.forEach(function (t) {
              return r._callEventListener(e, t);
            });
        }),
        (this._handleMessage = function (e) {
          r._debug('message event'),
            r.onmessage && r.onmessage(e),
            r._listeners.message.forEach(function (t) {
              return r._callEventListener(e, t);
            });
        }),
        (this._handleError = function (e) {
          r._debug('error event', e.message),
            r._disconnect(void 0, 'TIMEOUT' === e.message ? 'timeout' : void 0),
            r.onerror && r.onerror(e),
            r._debug('exec error listeners'),
            r._listeners.error.forEach(function (t) {
              return r._callEventListener(e, t);
            }),
            r._connect();
        }),
        (this._handleClose = function (e) {
          r._debug('close event'),
            r._clearTimeouts(),
            r._shouldReconnect && r._connect(),
            r.onclose && r.onclose(e),
            r._listeners.close.forEach(function (t) {
              return r._callEventListener(e, t);
            });
        }),
        (this._url = e),
        (this._protocols = t),
        (this._options = n),
        this._options.startClosed && (this._shouldReconnect = !1),
        this._connect();
    }
    return (
      Object.defineProperty(e, 'CONNECTING', {
        get: function () {
          return 0;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e, 'OPEN', {
        get: function () {
          return 1;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e, 'CLOSING', {
        get: function () {
          return 2;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e, 'CLOSED', {
        get: function () {
          return 3;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'CONNECTING', {
        get: function () {
          return e.CONNECTING;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'OPEN', {
        get: function () {
          return e.OPEN;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'CLOSING', {
        get: function () {
          return e.CLOSING;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'CLOSED', {
        get: function () {
          return e.CLOSED;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'binaryType', {
        get: function () {
          return this._ws ? this._ws.binaryType : this._binaryType;
        },
        set: function (e) {
          (this._binaryType = e), this._ws && (this._ws.binaryType = e);
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'retryCount', {
        get: function () {
          return Math.max(this._retryCount, 0);
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'bufferedAmount', {
        get: function () {
          return (
            this._messageQueue.reduce(function (e, t) {
              return (
                'string' == typeof t
                  ? (e += t.length)
                  : t instanceof Blob
                  ? (e += t.size)
                  : (e += t.byteLength),
                e
              );
            }, 0) + (this._ws ? this._ws.bufferedAmount : 0)
          );
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'extensions', {
        get: function () {
          return this._ws ? this._ws.extensions : '';
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'protocol', {
        get: function () {
          return this._ws ? this._ws.protocol : '';
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'readyState', {
        get: function () {
          return this._ws
            ? this._ws.readyState
            : this._options.startClosed
            ? e.CLOSED
            : e.CONNECTING;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, 'url', {
        get: function () {
          return this._ws ? this._ws.url : '';
        },
        enumerable: !0,
        configurable: !0,
      }),
      (e.prototype.close = function (e, t) {
        void 0 === e && (e = 1e3),
          (this._closeCalled = !0),
          (this._shouldReconnect = !1),
          this._clearTimeouts(),
          this._ws
            ? this._ws.readyState !== this.CLOSED
              ? this._ws.close(e, t)
              : this._debug('close: already closed')
            : this._debug('close enqueued: no ws instance');
      }),
      (e.prototype.reconnect = function (e, t) {
        (this._shouldReconnect = !0),
          (this._closeCalled = !1),
          (this._retryCount = -1),
          this._ws && this._ws.readyState !== this.CLOSED
            ? (this._disconnect(e, t), this._connect())
            : this._connect();
      }),
      (e.prototype.send = function (e) {
        if (this._ws && this._ws.readyState === this.OPEN) this._debug('send', e), this._ws.send(e);
        else {
          var t = this._options.maxEnqueuedMessages,
            n = void 0 === t ? xe.maxEnqueuedMessages : t;
          this._messageQueue.length < n && (this._debug('enqueue', e), this._messageQueue.push(e));
        }
      }),
      (e.prototype.addEventListener = function (e, t) {
        this._listeners[e] && this._listeners[e].push(t);
      }),
      (e.prototype.dispatchEvent = function (e) {
        var t,
          n,
          r = this._listeners[e.type];
        if (r)
          try {
            for (
              var a = (function (e) {
                  var t = 'function' == typeof Symbol && e[Symbol.iterator],
                    n = 0;
                  return t
                    ? t.call(e)
                    : {
                        next: function () {
                          return (
                            e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e }
                          );
                        },
                      };
                })(r),
                o = a.next();
              !o.done;
              o = a.next()
            ) {
              var i = o.value;
              this._callEventListener(e, i);
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              o && !o.done && (n = a.return) && n.call(a);
            } finally {
              if (t) throw t.error;
            }
          }
        return !0;
      }),
      (e.prototype.removeEventListener = function (e, t) {
        this._listeners[e] &&
          (this._listeners[e] = this._listeners[e].filter(function (e) {
            return e !== t;
          }));
      }),
      (e.prototype._debug = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this._options.debug && console.log.apply(console, Ee(['RWS>'], e));
      }),
      (e.prototype._getNextDelay = function () {
        var e = this._options,
          t = e.reconnectionDelayGrowFactor,
          n = void 0 === t ? xe.reconnectionDelayGrowFactor : t,
          r = e.minReconnectionDelay,
          a = void 0 === r ? xe.minReconnectionDelay : r,
          o = e.maxReconnectionDelay,
          i = void 0 === o ? xe.maxReconnectionDelay : o,
          s = 0;
        return (
          this._retryCount > 0 && (s = a * Math.pow(n, this._retryCount - 1)) > i && (s = i),
          this._debug('next delay', s),
          s
        );
      }),
      (e.prototype._wait = function () {
        var e = this;
        return new Promise(function (t) {
          setTimeout(t, e._getNextDelay());
        });
      }),
      (e.prototype._getNextUrl = function (e) {
        if ('string' == typeof e) return Promise.resolve(e);
        if ('function' == typeof e) {
          var t = e();
          if ('string' == typeof t) return Promise.resolve(t);
          if (t.then) return t;
        }
        throw Error('Invalid URL');
      }),
      (e.prototype._connect = function () {
        var e = this;
        if (!this._connectLock && this._shouldReconnect) {
          this._connectLock = !0;
          var t = this._options,
            n = t.maxRetries,
            r = void 0 === n ? xe.maxRetries : n,
            a = t.connectionTimeout,
            o = void 0 === a ? xe.connectionTimeout : a,
            i = t.WebSocket,
            s = void 0 === i ? Oe() : i;
          if (this._retryCount >= r) this._debug('max retries reached', this._retryCount, '>=', r);
          else {
            if (
              (this._retryCount++,
              this._debug('connect', this._retryCount),
              this._removeListeners(),
              void 0 === (u = s) || !u || 2 !== u.CLOSING)
            )
              throw Error('No valid WebSocket class provided');
            var u;
            this._wait()
              .then(function () {
                return e._getNextUrl(e._url);
              })
              .then(function (t) {
                e._closeCalled ||
                  (e._debug('connect', { url: t, protocols: e._protocols }),
                  (e._ws = e._protocols ? new s(t, e._protocols) : new s(t)),
                  (e._ws.binaryType = e._binaryType),
                  (e._connectLock = !1),
                  e._addListeners(),
                  (e._connectTimeout = setTimeout(function () {
                    return e._handleTimeout();
                  }, o)));
              });
          }
        }
      }),
      (e.prototype._handleTimeout = function () {
        this._debug('timeout event'), this._handleError(new Se(Error('TIMEOUT'), this));
      }),
      (e.prototype._disconnect = function (e, t) {
        if ((void 0 === e && (e = 1e3), this._clearTimeouts(), this._ws)) {
          this._removeListeners();
          try {
            this._ws.close(e, t), this._handleClose(new Ne(e, t, this));
          } catch (e) {}
        }
      }),
      (e.prototype._acceptOpen = function () {
        this._debug('accept open'), (this._retryCount = 0);
      }),
      (e.prototype._callEventListener = function (e, t) {
        'handleEvent' in t ? t.handleEvent(e) : t(e);
      }),
      (e.prototype._removeListeners = function () {
        this._ws &&
          (this._debug('removeListeners'),
          this._ws.removeEventListener('open', this._handleOpen),
          this._ws.removeEventListener('close', this._handleClose),
          this._ws.removeEventListener('message', this._handleMessage),
          this._ws.removeEventListener('error', this._handleError));
      }),
      (e.prototype._addListeners = function () {
        this._ws &&
          (this._debug('addListeners'),
          this._ws.addEventListener('open', this._handleOpen),
          this._ws.addEventListener('close', this._handleClose),
          this._ws.addEventListener('message', this._handleMessage),
          this._ws.addEventListener('error', this._handleError));
      }),
      (e.prototype._clearTimeouts = function () {
        clearTimeout(this._connectTimeout), clearTimeout(this._uptimeTimeout);
      }),
      e
    );
  })();
const Le = new Ue(`wss://mighty-cove-31255.herokuapp.com/websockets?${e(t).get('auth-key')}`);
let Pe;
Le.addEventListener('open', () => {
  console.log('[open] Соединение установлено');
}),
  Le.addEventListener('message', (e) => {
    if (!fe()) return;
    let t;
    try {
      t = JSON.parse(e.data);
    } catch (e) {
      console.error(e);
    }
    we.CHAT_BODY.insertAdjacentElement('afterbegin', be(t));
  }),
  Le.addEventListener('error', (e) => {
    console.log(`[error] ${e.message}`);
  }),
  Le.addEventListener('close', (e) => {
    e.wasClean
      ? console.log(`[close] Соединение закрыто чисто, код: ${e.code} причина: ${e.reason}`)
      : console.log('[close] Соединение прервано'),
      console.log(`Код: ${e.code} Причина: ${e.reason}`);
  }),
  fe() &&
    (async function () {
      try {
        const { messages: e } = await pe.getMessages();
        Pe = e;
        e.slice(-20).forEach((e) => {
          we.CHAT_BODY.insertAdjacentElement('afterbegin', be(e));
        });
      } catch (e) {
        alert(e);
      }
    })(),
  we.MODALS_OVERLAYS.forEach((e, t) => {
    e.addEventListener('click', (e) => {
      const n = e.target;
      (n.matches('.modal-overlay') || n.matches('.modal__close')) && ve(we.MODALS_OVERLAYS[t]);
    });
  }),
  we.SEND_MESSAGE_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const t = we.MESSAGE_INPUT.value;
    var n;
    !he(t) &&
      fe() &&
      ((n = t), Le.readyState && Le.send(JSON.stringify({ text: n })), _e(we.MESSAGE_INPUT));
  }),
  we.EMAIL_FORM.addEventListener('submit', (n) => {
    n.preventDefault();
    const r = we.EMAIL_INPUT.value;
    he(r) ||
      (pe
        .sendEmail(r)
        .then((n) => {
          if (!n.ok) throw new Error(`Не корректный email, Ошибка ${n.status} ${n.statusText}`);
          e(t).set('email', r), ve(we.EMAIL_MODAL), ye(we.CONFIRM_MODAL);
        })
        .catch(alert),
      _e(we.EMAIL_INPUT));
  }),
  we.CONFIRM_FORM.addEventListener('submit', (n) => {
    n.preventDefault();
    const r = we.CONFIRM_INPUT.value;
    he(r) ||
      (e(t).set('auth-key', r), _e(we.CONFIRM_INPUT), ve(we.CONFIRM_MODAL), ye(we.NAME_MODAL));
  }),
  we.NAME_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const t = we.NAME_INPUT.value;
    he(t) ||
      (pe
        .sendName(t)
        .then((e) => {
          if (!e.ok) throw new Error(`Ошибка ${e.status} ${e.statusText}`);
          ve(we.NAME_MODAL);
        })
        .catch(alert),
      _e(we.NAME_INPUT));
  }),
  we.SETTINGS_BUTTON.addEventListener('click', () => {
    fe() ? ye(we.NAME_MODAL) : ye(we.EMAIL_MODAL);
  }),
  we.CHAT_BODY.addEventListener('scroll', function e(t) {
    const n = t.target,
      r = n.scrollTop,
      a = n.clientHeight;
    if (r - a <= a - n.scrollHeight) {
      const t = Pe.splice(-20);
      0 === t.length
        ? (n.insertAdjacentText('beforeend', 'Вся история загружена'),
          n.removeEventListener('scroll', e))
        : t.forEach((e) => {
            n.insertAdjacentElement('beforeend', be(e));
          });
    }
  });
//# sourceMappingURL=index.98a15dd0.js.map
