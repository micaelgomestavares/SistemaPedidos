/* eslint-disable no-return-assign */
/* eslint-disable no-var */
/*
 *  jquery-maskmoney - v3.1.1
 *  jQuery plugin to mask data entry in the input text in the form of money (currency)
 *  https://github.com/plentz/jquery-maskmoney
 *
 *  Made by Diego Plentz
 *  Under MIT License
 */

!(function ($) {
  function e(e, t) { let n = ''; return e.indexOf('-') > -1 && (e = e.replace('-', ''), n = '-'), e.indexOf(t.prefix) > -1 && (e = e.replace(t.prefix, '')), e.indexOf(t.suffix) > -1 && (e = e.replace(t.suffix, '')), n + t.prefix + e + t.suffix; } function t(e, t) { return t.allowEmpty && e === '' ? '' : t.reverse ? a(e, t) : n(e, t); } function n(t, n) {
    let a; let i; let o; const l = t.indexOf('-') > -1 && n.allowNegative ? '-' : ''; const
      s = t.replace(/[^0-9]/g, ''); return a = r(s.slice(0, s.length - n.precision), l, n), n.precision > 0 && (i = s.slice(s.length - n.precision), o = new Array(n.precision + 1 - i.length).join(0), a += n.decimal + o + i), e(a, n);
  } function a(t, n) {
    let a; const i = t.indexOf('-') > -1 && n.allowNegative ? '-' : ''; const o = t.replace(n.prefix, '').replace(n.suffix, ''); let l = o.split(n.decimal)[0]; let
      s = ''; if (l === '' && (l = '0'), a = r(l, i, n), n.precision > 0) { const c = o.split(n.decimal); c.length > 1 && (s = c[1]), a += n.decimal + s; const u = Number.parseFloat(`${l}.${s}`).toFixed(n.precision).toString().split(n.decimal)[1]; a = `${a.split(n.decimal)[0]}.${u}`; } return e(a, n);
  } function r(e, t, n) { return e = e.replace(/^0*/g, ''), (e = e.replace(/\B(?=(\d{3})+(?!\d))/g, n.thousands)) === '' && (e = '0'), t + e; } $.browser || ($.browser = {}, $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase()), $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase()), $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase()), $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase()), $.browser.device = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())); const i = {
    prefix: '', suffix: '', affixesStay: !0, thousands: ',', decimal: '.', precision: 2, allowZero: !1, allowNegative: !1, doubleClickSelection: !0, allowEmpty: !1, bringCaretAtEndOnFocus: !0,
  }; const
    o = {
      destroy() { return $(this).unbind('.maskMoney'), $.browser.msie && (this.onpaste = null), this; },
      applyMask(e) { return t(e, $(this).data('settings')); },
      mask(e) { return this.each(function () { const t = $(this); return typeof e === 'number' && t.val(e), t.trigger('mask'); }); },
      unmasked() {
        return this.map(function () {
          let e; let t = $(this).val() || '0'; const
            n = t.indexOf('-') !== -1; return $(t.split(/\D/).reverse()).each((_t, n) => { if (n) return e = n, !1; }), t = t.replace(/\D/g, ''), t = t.replace(new RegExp(`${e}$`), `.${e}`), n && (t = `-${t}`), parseFloat(t);
        });
      },
      unmaskedWithOptions() {
        return this.map(function () {
          let e = $(this).val() || '0';
          const t = $(this).data('settings') || i;
          const n = new RegExp(t.thousandsForUnmasked || t.thousands, 'g'); return e = e.replace(n, ''), parseFloat(e);
        });
      },
      init(n) {
        return n = $.extend($.extend({}, i), n), this.each(function () {
          function a() {
            let e; let t; let n; let a; let r; const i = x.get(0); let o = 0; let
              l = 0; return typeof i.selectionStart === 'number' && typeof i.selectionEnd === 'number' ? (o = i.selectionStart, l = i.selectionEnd) : (t = document.selection.createRange()) && t.parentElement() === i && (a = i.value.length, e = i.value.replace(/\r\n/g, '\n'), (n = i.createTextRange()).moveToBookmark(t.getBookmark()), (r = i.createTextRange()).collapse(!1), n.compareEndPoints('StartToEnd', r) > -1 ? o = l = a : (o = -n.moveStart('character', -a), o += e.slice(0, o).split('\n').length - 1, n.compareEndPoints('EndToEnd', r) > -1 ? l = a : (l = -n.moveEnd('character', -a), l += e.slice(0, l).split('\n').length - 1))), { start: o, end: l };
          } function r() {
            const e = !(x.val().length >= x.attr('maxlength') && x.attr('maxlength') >= 0); const t = a(); const n = t.start; const r = t.end; const i = !(t.start === t.end || !x.val().substring(n, r).match(/\d/)); const
              o = x.val().substring(0, 1) === '0'; return e || i || o;
          } function i(e) { w.formatOnBlur || x.each((_t, n) => { if (n.setSelectionRange) n.focus(), n.setSelectionRange(e, e); else if (n.createTextRange) { const a = n.createTextRange(); a.collapse(!0), a.moveEnd('character', e), a.moveStart('character', e), a.select(); } }); } function o(e) {
            let n; const
              a = x.val().length; x.val(t(x.val(), w)), n = x.val().length, w.reverse || (e -= a - n), i(e);
          } function l() {
            let e = x.val(); if (!w.allowEmpty || e !== '') {
              const n = e.indexOf(w.decimal); if (w.precision > 0) {
                if (n < 0) e += w.decimal + new Array(w.precision + 1).join(0); else {
                  const a = e.slice(0, n); const
                    r = e.slice(n + 1); e = a + w.decimal + r + new Array(w.precision + 1 - r.length).join(0);
                }
              } else n > 0 && (e = e.slice(0, n)); x.val(t(e, w));
            }
          } function s() { const e = x.val(); return w.allowNegative ? e !== '' && e.charAt(0) === '-' ? e.replace('-', '') : `-${e}` : e; } function c(e) { e.preventDefault ? e.preventDefault() : e.returnValue = !1; } function u(e) {
            const t = (e = e || window.event).which || e.charCode || e.keyCode; const
              n = w.decimal.charCodeAt(0); return void 0 !== t && (!(t < 48 || t > 57) || t === n && w.reverse ? !!r() && ((t !== n || !d()) && (!!w.formatOnBlur || (c(e), p(e), !1))) : g(t, e));
          } function d() { return !v() && f(); } function v() {
            const e = x.val().length; const
              t = a(); return t.start === 0 && t.end === e;
          } function f() { return x.val().indexOf(w.decimal) > -1; } function p(e) {
            let t; let n; let r; let i; const l = (e = e || window.event).which || e.charCode || e.keyCode; let
              s = ''; l >= 48 && l <= 57 && (s = String.fromCharCode(l)), n = (t = a()).start, r = t.end, i = x.val(), x.val(i.substring(0, n) + s + i.substring(r, i.length)), o(n + 1);
          } function g(e, t) { return e === 45 ? (x.val(s()), !1) : e === 43 ? (x.val(x.val().replace('-', '')), !1) : e === 13 || e === 9 || (!(!$.browser.mozilla || e !== 37 && e !== 39 || t.charCode !== 0) || (c(t), !0)); } function m() { setTimeout(() => { l(); }, 0); } function h() { return (parseFloat('0') / Math.pow(10, w.precision)).toFixed(w.precision).replace(new RegExp('\\.', 'g'), w.decimal); } let w; let b; var
            x = $(this); w = $.extend({}, n), w = $.extend(w, x.data()), x.data('settings', w), $.browser.device && x.attr('type', 'tel'), x.unbind('.maskMoney'), x.bind('keypress.maskMoney', u), x.bind('keydown.maskMoney', (e) => {
            let t; let n; let r; let i; let l; const
              s = (e = e || window.event).which || e.charCode || e.keyCode; return void 0 !== s && (t = a(), n = t.start, r = t.end, s !== 8 && s !== 46 && s !== 63272 || (c(e), i = x.val(), n === r && (s === 8 ? w.suffix === '' ? n -= 1 : (l = i.split('').reverse().join('').search(/\d/), r = 1 + (n = i.length - l - 1)) : r += 1), x.val(i.substring(0, n) + i.substring(r, i.length)), o(n), !1));
          }), x.bind('blur.maskMoney', (t) => { if ($.browser.msie && u(t), w.formatOnBlur && x.val() !== b && p(t), x.val() === '' && w.allowEmpty) x.val(''); else if (x.val() === '' || x.val() === e(h(), w)) w.allowZero ? w.affixesStay ? x.val(e(h(), w)) : x.val(h()) : x.val(''); else if (!w.affixesStay) { const n = x.val().replace(w.prefix, '').replace(w.suffix, ''); x.val(n); } x.val() !== b && x.change(); }), x.bind('focus.maskMoney', () => {
            b = x.val(), l(); let e; const
              t = x.get(0); w.selectAllOnFocus ? t.select() : t.createTextRange && w.bringCaretAtEndOnFocus && ((e = t.createTextRange()).collapse(!1), e.select());
          }), x.bind('click.maskMoney', () => {
            let e; const
              t = x.get(0); w.selectAllOnFocus || (t.setSelectionRange && w.bringCaretAtEndOnFocus ? (e = x.val().length, t.setSelectionRange(e, e)) : x.val(x.val()));
          }), x.bind('dblclick.maskMoney', () => {
            let e; let t; const
              n = x.get(0); n.setSelectionRange && w.bringCaretAtEndOnFocus ? (t = x.val().length, e = w.doubleClickSelection ? 0 : t, n.setSelectionRange(e, t)) : x.val(x.val());
          }), x.bind('cut.maskMoney', m), x.bind('paste.maskMoney', m), x.bind('mask.maskMoney', l);
        });
      },
    }; $.fn.maskMoney = function (e) { return o[e] ? o[e].apply(this, Array.prototype.slice.call(arguments, 1)) : typeof e !== 'object' && e ? void $.error(`Method ${e} does not exist on jQuery.maskMoney`) : o.init.apply(this, arguments); };
}(window.jQuery || window.Zepto));
