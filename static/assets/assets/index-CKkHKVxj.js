(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const s of i)
      if (s.type === "childList")
        for (const o of s.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(i) {
    const s = {};
    return (
      i.integrity && (s.integrity = i.integrity),
      i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
      s
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const s = t(i);
    fetch(i.href, s);
  }
})();
var Re = ((n) => (
  (n.docTypeError = "docTypeError"),
  (n.contextNotFound = "contextNotFound"),
  (n.timerNotFound = "timerNotFound"),
  (n.ctxCallOutOfScope = "ctxCallOutOfScope"),
  (n.createNodeInParserFail = "createNodeInParserFail"),
  (n.stackOverFlow = "stackOverFlow"),
  (n.parserMatchError = "parserMatchError"),
  (n.serializerMatchError = "serializerMatchError"),
  (n.getAtomFromSchemaFail = "getAtomFromSchemaFail"),
  (n.expectDomTypeError = "expectDomTypeError"),
  (n.callCommandBeforeEditorView = "callCommandBeforeEditorView"),
  (n.missingRootElement = "missingRootElement"),
  (n.missingNodeInSchema = "missingNodeInSchema"),
  (n.missingMarkInSchema = "missingMarkInSchema"),
  (n.ctxNotBind = "ctxNotBind"),
  (n.missingYjsDoc = "missingYjsDoc"),
  n
))(Re || {});
class Le extends Error {
  constructor(e, t) {
    super(t), (this.name = "MilkdownError"), (this.code = e);
  }
}
const Af = (n, e) => (typeof e == "function" ? "[Function]" : e),
  qn = (n) => JSON.stringify(n, Af);
function Df(n) {
  return new Le(Re.docTypeError, `Doc type error, unsupported type: ${qn(n)}`);
}
function Rf(n) {
  return new Le(
    Re.contextNotFound,
    `Context "${n}" not found, do you forget to inject it?`,
  );
}
function zf(n) {
  return new Le(
    Re.timerNotFound,
    `Timer "${n}" not found, do you forget to record it?`,
  );
}
function Eo() {
  return new Le(
    Re.ctxCallOutOfScope,
    "Should not call a context out of the plugin.",
  );
}
function Pf(...n) {
  const e = n.reduce((t, r) => {
    if (!r) return t;
    const i = (s) =>
      Array.isArray(s)
        ? s.map((o) => i(o)).join(", ")
        : s.toJSON
          ? qn(s.toJSON())
          : s.spec
            ? qn(s.spec)
            : s.toString();
    return `${t}, ${i(r)}`;
  }, "Create prosemirror node from remark failed in parser");
  return new Le(Re.createNodeInParserFail, e);
}
function Ac() {
  return new Le(
    Re.stackOverFlow,
    "Stack over flow, cannot pop on an empty stack.",
  );
}
function Bf(n) {
  return new Le(
    Re.parserMatchError,
    `Cannot match target parser for node: ${qn(n)}.`,
  );
}
function vf(n) {
  return new Le(
    Re.serializerMatchError,
    `Cannot match target serializer for node: ${qn(n)}.`,
  );
}
function gn(n) {
  return new Le(
    Re.expectDomTypeError,
    `Expect to be a dom, but get: ${qn(n)}.`,
  );
}
function Ff() {
  return new Le(
    Re.callCommandBeforeEditorView,
    "You're trying to call a command before editor view initialized, make sure to get commandManager from ctx after editor view has been initialized",
  );
}
function Lf(n) {
  return new Le(
    Re.missingNodeInSchema,
    `Missing node in schema, milkdown cannot find "${n}" in schema.`,
  );
}
function $f(n) {
  return new Le(
    Re.missingMarkInSchema,
    `Missing mark in schema, milkdown cannot find "${n}" in schema.`,
  );
}
var Dc = (n) => {
    throw TypeError(n);
  },
  Rc = (n, e, t) => e.has(n) || Dc("Cannot " + t),
  I = (n, e, t) => (
    Rc(n, e, "read from private field"), t ? t.call(n) : e.get(n)
  ),
  ne = (n, e, t) =>
    e.has(n)
      ? Dc("Cannot add the same private member more than once")
      : e instanceof WeakSet
        ? e.add(n)
        : e.set(n, t),
  j = (n, e, t, r) => (Rc(n, e, "write to private field"), e.set(n, t), t);
let zc = class {
  constructor() {
    (this.sliceMap = new Map()),
      (this.get = (e) => {
        const t =
          typeof e == "string"
            ? [...this.sliceMap.values()].find((r) => r.type.name === e)
            : this.sliceMap.get(e.id);
        if (!t) {
          const r = typeof e == "string" ? e : e.name;
          throw Rf(r);
        }
        return t;
      }),
      (this.remove = (e) => {
        const t =
          typeof e == "string"
            ? [...this.sliceMap.values()].find((r) => r.type.name === e)
            : this.sliceMap.get(e.id);
        t && this.sliceMap.delete(t.type.id);
      }),
      (this.has = (e) =>
        typeof e == "string"
          ? [...this.sliceMap.values()].some((t) => t.type.name === e)
          : this.sliceMap.has(e.id));
  }
};
var Ze, Ct, sr;
let Vf = class {
  constructor(e, t, r) {
    ne(this, Ze),
      ne(this, Ct),
      ne(this, sr),
      j(this, Ze, []),
      j(this, sr, () => {
        I(this, Ze).forEach((i) => i(I(this, Ct)));
      }),
      (this.set = (i) => {
        j(this, Ct, i), I(this, sr).call(this);
      }),
      (this.get = () => I(this, Ct)),
      (this.update = (i) => {
        j(this, Ct, i(I(this, Ct))), I(this, sr).call(this);
      }),
      (this.type = r),
      j(this, Ct, t),
      e.set(r.id, this);
  }
  on(e) {
    return (
      I(this, Ze).push(e),
      () => {
        j(
          this,
          Ze,
          I(this, Ze).filter((t) => t !== e),
        );
      }
    );
  }
  once(e) {
    const t = this.on((r) => {
      e(r), t();
    });
    return t;
  }
  off(e) {
    j(
      this,
      Ze,
      I(this, Ze).filter((t) => t !== e),
    );
  }
  offAll() {
    j(this, Ze, []);
  }
};
(Ze = new WeakMap()), (Ct = new WeakMap()), (sr = new WeakMap());
let Wf = class {
  constructor(e, t) {
    (this.id = Symbol(`Context-${t}`)),
      (this.name = t),
      (this._defaultValue = e),
      (this._typeInfo = () => {
        throw Eo();
      });
  }
  create(e, t = this._defaultValue) {
    return new Vf(e, t, this);
  }
};
const U = (n, e) => new Wf(n, e);
var oi, li, ai, Nn, or, Zt, lr, ar, cr;
let qf = class {
  constructor(e, t, r) {
    ne(this, oi),
      ne(this, li),
      ne(this, ai),
      ne(this, Nn),
      ne(this, or),
      ne(this, Zt),
      ne(this, lr),
      ne(this, ar),
      ne(this, cr),
      j(this, Nn, new Set()),
      j(this, or, new Set()),
      j(this, Zt, new Map()),
      j(this, lr, new Map()),
      (this.read = () => ({
        metadata: I(this, oi),
        injectedSlices: [...I(this, Nn)].map((i) => ({
          name: typeof i == "string" ? i : i.name,
          value: I(this, ar).call(this, i),
        })),
        consumedSlices: [...I(this, or)].map((i) => ({
          name: typeof i == "string" ? i : i.name,
          value: I(this, ar).call(this, i),
        })),
        recordedTimers: [...I(this, Zt)].map(([i, { duration: s }]) => ({
          name: i.name,
          duration: s,
          status: I(this, cr).call(this, i),
        })),
        waitTimers: [...I(this, lr)].map(([i, { duration: s }]) => ({
          name: i.name,
          duration: s,
          status: I(this, cr).call(this, i),
        })),
      })),
      (this.onRecord = (i) => {
        I(this, Zt).set(i, { start: Date.now(), duration: 0 });
      }),
      (this.onClear = (i) => {
        I(this, Zt).delete(i);
      }),
      (this.onDone = (i) => {
        const s = I(this, Zt).get(i);
        s && (s.duration = Date.now() - s.start);
      }),
      (this.onWait = (i, s) => {
        const o = Date.now();
        s.finally(() => {
          I(this, lr).set(i, { duration: Date.now() - o });
        });
      }),
      (this.onInject = (i) => {
        I(this, Nn).add(i);
      }),
      (this.onRemove = (i) => {
        I(this, Nn).delete(i);
      }),
      (this.onUse = (i) => {
        I(this, or).add(i);
      }),
      j(this, ar, (i) => I(this, li).get(i).get()),
      j(this, cr, (i) => I(this, ai).get(i).status),
      j(this, li, e),
      j(this, ai, t),
      j(this, oi, r);
  }
};
(oi = new WeakMap()),
  (li = new WeakMap()),
  (ai = new WeakMap()),
  (Nn = new WeakMap()),
  (or = new WeakMap()),
  (Zt = new WeakMap()),
  (lr = new WeakMap()),
  (ar = new WeakMap()),
  (cr = new WeakMap());
var Mt, Nt, ci, He;
const Hf = class Pc {
  constructor(e, t, r) {
    ne(this, Mt),
      ne(this, Nt),
      ne(this, ci),
      ne(this, He),
      (this.produce = (i) =>
        i && Object.keys(i).length
          ? new Pc(I(this, Mt), I(this, Nt), { ...i })
          : this),
      (this.inject = (i, s) => {
        var o;
        const l = i.create(I(this, Mt).sliceMap);
        return (
          s != null && l.set(s),
          (o = I(this, He)) == null || o.onInject(i),
          this
        );
      }),
      (this.remove = (i) => {
        var s;
        return (
          I(this, Mt).remove(i),
          (s = I(this, He)) == null || s.onRemove(i),
          this
        );
      }),
      (this.record = (i) => {
        var s;
        return (
          i.create(I(this, Nt).store),
          (s = I(this, He)) == null || s.onRecord(i),
          this
        );
      }),
      (this.clearTimer = (i) => {
        var s;
        return (
          I(this, Nt).remove(i), (s = I(this, He)) == null || s.onClear(i), this
        );
      }),
      (this.isInjected = (i) => I(this, Mt).has(i)),
      (this.isRecorded = (i) => I(this, Nt).has(i)),
      (this.use = (i) => {
        var s;
        return (s = I(this, He)) == null || s.onUse(i), I(this, Mt).get(i);
      }),
      (this.get = (i) => this.use(i).get()),
      (this.set = (i, s) => this.use(i).set(s)),
      (this.update = (i, s) => this.use(i).update(s)),
      (this.timer = (i) => I(this, Nt).get(i)),
      (this.done = (i) => {
        var s;
        this.timer(i).done(), (s = I(this, He)) == null || s.onDone(i);
      }),
      (this.wait = (i) => {
        var s;
        const o = this.timer(i).start();
        return (s = I(this, He)) == null || s.onWait(i, o), o;
      }),
      (this.waitTimers = async (i) => {
        await Promise.all(this.get(i).map((s) => this.wait(s)));
      }),
      j(this, Mt, e),
      j(this, Nt, t),
      j(this, ci, r),
      r && j(this, He, new qf(e, t, r));
  }
  get meta() {
    return I(this, ci);
  }
  get inspector() {
    return I(this, He);
  }
};
(Mt = new WeakMap()),
  (Nt = new WeakMap()),
  (ci = new WeakMap()),
  (He = new WeakMap());
let _f = Hf,
  jf = class {
    constructor() {
      (this.store = new Map()),
        (this.get = (e) => {
          const t = this.store.get(e.id);
          if (!t) throw zf(e.name);
          return t;
        }),
        (this.remove = (e) => {
          this.store.delete(e.id);
        }),
        (this.has = (e) => this.store.has(e.id));
    }
  };
var Tn, Xt, ur, Tt, hr, ui;
let Kf = class {
  constructor(e, t) {
    ne(this, Tn),
      ne(this, Xt),
      ne(this, ur),
      ne(this, Tt),
      ne(this, hr),
      ne(this, ui),
      j(this, Tn, null),
      j(this, Xt, null),
      j(this, Tt, "pending"),
      (this.start = () => (
        I(this, Tn) ??
          j(
            this,
            Tn,
            new Promise((r, i) => {
              j(this, Xt, (s) => {
                s instanceof CustomEvent &&
                  s.detail.id === I(this, ur) &&
                  (j(this, Tt, "resolved"),
                  I(this, hr).call(this),
                  s.stopImmediatePropagation(),
                  r());
              }),
                I(this, ui).call(this, () => {
                  I(this, Tt) === "pending" && j(this, Tt, "rejected"),
                    I(this, hr).call(this),
                    i(new Error(`Timing ${this.type.name} timeout.`));
                }),
                j(this, Tt, "pending"),
                addEventListener(this.type.name, I(this, Xt));
            }),
          ),
        I(this, Tn)
      )),
      (this.done = () => {
        const r = new CustomEvent(this.type.name, {
          detail: { id: I(this, ur) },
        });
        dispatchEvent(r);
      }),
      j(this, hr, () => {
        I(this, Xt) && removeEventListener(this.type.name, I(this, Xt));
      }),
      j(this, ui, (r) => {
        setTimeout(() => {
          r();
        }, this.type.timeout);
      }),
      j(this, ur, Symbol(t.name)),
      (this.type = t),
      e.set(t.id, this);
  }
  get status() {
    return I(this, Tt);
  }
};
(Tn = new WeakMap()),
  (Xt = new WeakMap()),
  (ur = new WeakMap()),
  (Tt = new WeakMap()),
  (hr = new WeakMap()),
  (ui = new WeakMap());
let Jf = class {
  constructor(e, t = 3e3) {
    (this.create = (r) => new Kf(r, this)),
      (this.id = Symbol(`Timer-${e}`)),
      (this.name = e),
      (this.timeout = t);
  }
};
const Ht = (n, e = 3e3) => new Jf(n, e);
function he(n) {
  this.content = n;
}
he.prototype = {
  constructor: he,
  find: function (n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n) return e;
    return -1;
  },
  get: function (n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  update: function (n, e, t) {
    var r = t && t != n ? this.remove(t) : this,
      i = r.find(n),
      s = r.content.slice();
    return (
      i == -1 ? s.push(t || n, e) : ((s[i + 1] = e), t && (s[i] = t)), new he(s)
    );
  },
  remove: function (n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new he(t);
  },
  addToStart: function (n, e) {
    return new he([n, e].concat(this.remove(n).content));
  },
  addToEnd: function (n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new he(t);
  },
  addBefore: function (n, e, t) {
    var r = this.remove(e),
      i = r.content.slice(),
      s = r.find(n);
    return i.splice(s == -1 ? i.length : s, 0, e, t), new he(i);
  },
  forEach: function (n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  prepend: function (n) {
    return (
      (n = he.from(n)),
      n.size ? new he(n.content.concat(this.subtract(n).content)) : this
    );
  },
  append: function (n) {
    return (
      (n = he.from(n)),
      n.size ? new he(this.subtract(n).content.concat(n.content)) : this
    );
  },
  subtract: function (n) {
    var e = this;
    n = he.from(n);
    for (var t = 0; t < n.content.length; t += 2) e = e.remove(n.content[t]);
    return e;
  },
  toObject: function () {
    var n = {};
    return (
      this.forEach(function (e, t) {
        n[e] = t;
      }),
      n
    );
  },
  get size() {
    return this.content.length >> 1;
  },
};
he.from = function (n) {
  if (n instanceof he) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new he(e);
};
function Bc(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let i = n.child(r),
      s = e.child(r);
    if (i == s) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(s)) return t;
    if (i.isText && i.text != s.text) {
      for (let o = 0; i.text[o] == s.text[o]; o++) t++;
      return t;
    }
    if (i.content.size || s.content.size) {
      let o = Bc(i.content, s.content, t + 1);
      if (o != null) return o;
    }
    t += i.nodeSize;
  }
}
function vc(n, e, t, r) {
  for (let i = n.childCount, s = e.childCount; ; ) {
    if (i == 0 || s == 0) return i == s ? null : { a: t, b: r };
    let o = n.child(--i),
      l = e.child(--s),
      a = o.nodeSize;
    if (o == l) {
      (t -= a), (r -= a);
      continue;
    }
    if (!o.sameMarkup(l)) return { a: t, b: r };
    if (o.isText && o.text != l.text) {
      let c = 0,
        u = Math.min(o.text.length, l.text.length);
      for (
        ;
        c < u && o.text[o.text.length - c - 1] == l.text[l.text.length - c - 1];

      )
        c++, t--, r--;
      return { a: t, b: r };
    }
    if (o.content.size || l.content.size) {
      let c = vc(o.content, l.content, t - 1, r - 1);
      if (c) return c;
    }
    (t -= a), (r -= a);
  }
}
class C {
  constructor(e, t) {
    if (((this.content = e), (this.size = t || 0), t == null))
      for (let r = 0; r < e.length; r++) this.size += e[r].nodeSize;
  }
  nodesBetween(e, t, r, i = 0, s) {
    for (let o = 0, l = 0; l < t; o++) {
      let a = this.content[o],
        c = l + a.nodeSize;
      if (c > e && r(a, i + l, s || null, o) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(
          Math.max(0, e - u),
          Math.min(a.content.size, t - u),
          r,
          i + u,
        );
      }
      l = c;
    }
  }
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  textBetween(e, t, r, i) {
    let s = "",
      o = !0;
    return (
      this.nodesBetween(
        e,
        t,
        (l, a) => {
          let c = l.isText
            ? l.text.slice(Math.max(e, a) - a, t - a)
            : l.isLeaf
              ? i
                ? typeof i == "function"
                  ? i(l)
                  : i
                : l.type.spec.leafText
                  ? l.type.spec.leafText(l)
                  : ""
              : "";
          l.isBlock &&
            ((l.isLeaf && c) || l.isTextblock) &&
            r &&
            (o ? (o = !1) : (s += r)),
            (s += c);
        },
        0,
      ),
      s
    );
  }
  append(e) {
    if (!e.size) return this;
    if (!this.size) return e;
    let t = this.lastChild,
      r = e.firstChild,
      i = this.content.slice(),
      s = 0;
    for (
      t.isText &&
      t.sameMarkup(r) &&
      ((i[i.length - 1] = t.withText(t.text + r.text)), (s = 1));
      s < e.content.length;
      s++
    )
      i.push(e.content[s]);
    return new C(i, this.size + e.size);
  }
  cut(e, t = this.size) {
    if (e == 0 && t == this.size) return this;
    let r = [],
      i = 0;
    if (t > e)
      for (let s = 0, o = 0; o < t; s++) {
        let l = this.content[s],
          a = o + l.nodeSize;
        a > e &&
          ((o < e || a > t) &&
            (l.isText
              ? (l = l.cut(Math.max(0, e - o), Math.min(l.text.length, t - o)))
              : (l = l.cut(
                  Math.max(0, e - o - 1),
                  Math.min(l.content.size, t - o - 1),
                ))),
          r.push(l),
          (i += l.nodeSize)),
          (o = a);
      }
    return new C(r, i);
  }
  cutByIndex(e, t) {
    return e == t
      ? C.empty
      : e == 0 && t == this.content.length
        ? this
        : new C(this.content.slice(e, t));
  }
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t) return this;
    let i = this.content.slice(),
      s = this.size + t.nodeSize - r.nodeSize;
    return (i[e] = t), new C(i, s);
  }
  addToStart(e) {
    return new C([e].concat(this.content), this.size + e.nodeSize);
  }
  addToEnd(e) {
    return new C(this.content.concat(e), this.size + e.nodeSize);
  }
  eq(e) {
    if (this.content.length != e.content.length) return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t])) return !1;
    return !0;
  }
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  get childCount() {
    return this.content.length;
  }
  child(e) {
    let t = this.content[e];
    if (!t) throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  maybeChild(e) {
    return this.content[e] || null;
  }
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, r, t), (r += i.nodeSize);
    }
  }
  findDiffStart(e, t = 0) {
    return Bc(this, e, t);
  }
  findDiffEnd(e, t = this.size, r = e.size) {
    return vc(this, e, t, r);
  }
  findIndex(e, t = -1) {
    if (e == 0) return ri(0, e);
    if (e == this.size) return ri(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, i = 0; ; r++) {
      let s = this.child(r),
        o = i + s.nodeSize;
      if (o >= e) return o == e || t > 0 ? ri(r + 1, o) : ri(r, i);
      i = o;
    }
  }
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  toStringInner() {
    return this.content.join(", ");
  }
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  static fromJSON(e, t) {
    if (!t) return C.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new C(t.map(e.nodeFromJSON));
  }
  static fromArray(e) {
    if (!e.length) return C.empty;
    let t,
      r = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      (r += s.nodeSize),
        i && s.isText && e[i - 1].sameMarkup(s)
          ? (t || (t = e.slice(0, i)),
            (t[t.length - 1] = s.withText(t[t.length - 1].text + s.text)))
          : t && t.push(s);
    }
    return new C(t || e, r);
  }
  static from(e) {
    if (!e) return C.empty;
    if (e instanceof C) return e;
    if (Array.isArray(e)) return this.fromArray(e);
    if (e.attrs) return new C([e], e.nodeSize);
    throw new RangeError(
      "Can not convert " +
        e +
        " to a Fragment" +
        (e.nodesBetween
          ? " (looks like multiple versions of prosemirror-model were loaded)"
          : ""),
    );
  }
}
C.empty = new C([], 0);
const cs = { index: 0, offset: 0 };
function ri(n, e) {
  return (cs.index = n), (cs.offset = e), cs;
}
function Bi(n, e) {
  if (n === e) return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object")) return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t) return !1;
  if (t) {
    if (n.length != e.length) return !1;
    for (let r = 0; r < n.length; r++) if (!Bi(n[r], e[r])) return !1;
  } else {
    for (let r in n) if (!(r in e) || !Bi(n[r], e[r])) return !1;
    for (let r in e) if (!(r in n)) return !1;
  }
  return !0;
}
class W {
  constructor(e, t) {
    (this.type = e), (this.attrs = t);
  }
  addToSet(e) {
    let t,
      r = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      if (this.eq(s)) return e;
      if (this.type.excludes(s.type)) t || (t = e.slice(0, i));
      else {
        if (s.type.excludes(this.type)) return e;
        !r &&
          s.type.rank > this.type.rank &&
          (t || (t = e.slice(0, i)), t.push(this), (r = !0)),
          t && t.push(s);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  isInSet(e) {
    for (let t = 0; t < e.length; t++) if (this.eq(e[t])) return !0;
    return !1;
  }
  eq(e) {
    return this == e || (this.type == e.type && Bi(this.attrs, e.attrs));
  }
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  static fromJSON(e, t) {
    if (!t) throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    let i = r.create(t.attrs);
    return r.checkAttrs(i.attrs), i;
  }
  static sameSet(e, t) {
    if (e == t) return !0;
    if (e.length != t.length) return !1;
    for (let r = 0; r < e.length; r++) if (!e[r].eq(t[r])) return !1;
    return !0;
  }
  static setFrom(e) {
    if (!e || (Array.isArray(e) && e.length == 0)) return W.none;
    if (e instanceof W) return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
}
W.none = [];
class vi extends Error {}
class T {
  constructor(e, t, r) {
    (this.content = e), (this.openStart = t), (this.openEnd = r);
  }
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  insertAt(e, t) {
    let r = Lc(this.content, e + this.openStart, t);
    return r && new T(r, this.openStart, this.openEnd);
  }
  removeBetween(e, t) {
    return new T(
      Fc(this.content, e + this.openStart, t + this.openStart),
      this.openStart,
      this.openEnd,
    );
  }
  eq(e) {
    return (
      this.content.eq(e.content) &&
      this.openStart == e.openStart &&
      this.openEnd == e.openEnd
    );
  }
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  toJSON() {
    if (!this.content.size) return null;
    let e = { content: this.content.toJSON() };
    return (
      this.openStart > 0 && (e.openStart = this.openStart),
      this.openEnd > 0 && (e.openEnd = this.openEnd),
      e
    );
  }
  static fromJSON(e, t) {
    if (!t) return T.empty;
    let r = t.openStart || 0,
      i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new T(C.fromJSON(e, t.content), r, i);
  }
  static maxOpen(e, t = !0) {
    let r = 0,
      i = 0;
    for (
      let s = e.firstChild;
      s && !s.isLeaf && (t || !s.type.spec.isolating);
      s = s.firstChild
    )
      r++;
    for (
      let s = e.lastChild;
      s && !s.isLeaf && (t || !s.type.spec.isolating);
      s = s.lastChild
    )
      i++;
    return new T(e, r, i);
  }
}
T.empty = new T(C.empty, 0, 0);
function Fc(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e),
    s = n.maybeChild(r),
    { index: o, offset: l } = n.findIndex(t);
  if (i == e || s.isText) {
    if (l != t && !n.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != o) throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, s.copy(Fc(s.content, e - i - 1, t - i - 1)));
}
function Lc(n, e, t, r) {
  let { index: i, offset: s } = n.findIndex(e),
    o = n.maybeChild(i);
  if (s == e || o.isText) return n.cut(0, e).append(t).append(n.cut(e));
  let l = Lc(o.content, e - s - 1, t);
  return l && n.replaceChild(i, o.copy(l));
}
function Uf(n, e, t) {
  if (t.openStart > n.depth)
    throw new vi("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new vi("Inconsistent open depths");
  return $c(n, e, t, 0);
}
function $c(n, e, t, r) {
  let i = n.index(r),
    s = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let o = $c(n, e, t, r + 1);
    return s.copy(s.content.replaceChild(i, o));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let o = n.parent,
        l = o.content;
      return an(
        o,
        l
          .cut(0, n.parentOffset)
          .append(t.content)
          .append(l.cut(e.parentOffset)),
      );
    } else {
      let { start: o, end: l } = Yf(t, n);
      return an(s, Wc(n, o, l, e, r));
    }
  else return an(s, Fi(n, e, r));
}
function Vc(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new vi("Cannot join " + e.type.name + " onto " + n.type.name);
}
function Js(n, e, t) {
  let r = n.node(t);
  return Vc(r, e.node(t)), r;
}
function ln(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t])
    ? (e[t] = n.withText(e[t].text + n.text))
    : e.push(n);
}
function Tr(n, e, t, r) {
  let i = (e || n).node(t),
    s = 0,
    o = e ? e.index(t) : i.childCount;
  n &&
    ((s = n.index(t)),
    n.depth > t ? s++ : n.textOffset && (ln(n.nodeAfter, r), s++));
  for (let l = s; l < o; l++) ln(i.child(l), r);
  e && e.depth == t && e.textOffset && ln(e.nodeBefore, r);
}
function an(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function Wc(n, e, t, r, i) {
  let s = n.depth > i && Js(n, e, i + 1),
    o = r.depth > i && Js(t, r, i + 1),
    l = [];
  return (
    Tr(null, n, i, l),
    s && o && e.index(i) == t.index(i)
      ? (Vc(s, o), ln(an(s, Wc(n, e, t, r, i + 1)), l))
      : (s && ln(an(s, Fi(n, e, i + 1)), l),
        Tr(e, t, i, l),
        o && ln(an(o, Fi(t, r, i + 1)), l)),
    Tr(r, null, i, l),
    new C(l)
  );
}
function Fi(n, e, t) {
  let r = [];
  if ((Tr(null, n, t, r), n.depth > t)) {
    let i = Js(n, e, t + 1);
    ln(an(i, Fi(n, e, t + 1)), r);
  }
  return Tr(e, null, t, r), new C(r);
}
function Yf(n, e) {
  let t = e.depth - n.openStart,
    i = e.node(t).copy(n.content);
  for (let s = t - 1; s >= 0; s--) i = e.node(s).copy(C.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t),
  };
}
class vr {
  constructor(e, t, r) {
    (this.pos = e),
      (this.path = t),
      (this.parentOffset = r),
      (this.depth = t.length / 3 - 1);
  }
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  get parent() {
    return this.node(this.depth);
  }
  get doc() {
    return this.node(0);
  }
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  indexAfter(e) {
    return (
      (e = this.resolveDepth(e)),
      this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1)
    );
  }
  start(e) {
    return (e = this.resolveDepth(e)), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  end(e) {
    return (
      (e = this.resolveDepth(e)), this.start(e) + this.node(e).content.size
    );
  }
  before(e) {
    if (((e = this.resolveDepth(e)), !e))
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  after(e) {
    if (((e = this.resolveDepth(e)), !e))
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1
      ? this.pos
      : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  get nodeAfter() {
    let e = this.parent,
      t = this.index(this.depth);
    if (t == e.childCount) return null;
    let r = this.pos - this.path[this.path.length - 1],
      i = e.child(t);
    return r ? e.child(t).cut(r) : i;
  }
  get nodeBefore() {
    let e = this.index(this.depth),
      t = this.pos - this.path[this.path.length - 1];
    return t
      ? this.parent.child(e).cut(0, t)
      : e == 0
        ? null
        : this.parent.child(e - 1);
  }
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3],
      i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let s = 0; s < e; s++) i += r.child(s).nodeSize;
    return i;
  }
  marks() {
    let e = this.parent,
      t = this.index();
    if (e.content.size == 0) return W.none;
    if (this.textOffset) return e.child(t).marks;
    let r = e.maybeChild(t - 1),
      i = e.maybeChild(t);
    if (!r) {
      let l = r;
      (r = i), (i = l);
    }
    let s = r.marks;
    for (var o = 0; o < s.length; o++)
      s[o].type.spec.inclusive === !1 &&
        (!i || !s[o].isInSet(i.marks)) &&
        (s = s[o--].removeFromSet(s));
    return s;
  }
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline) return null;
    let r = t.marks,
      i = e.parent.maybeChild(e.index());
    for (var s = 0; s < r.length; s++)
      r[s].type.spec.inclusive === !1 &&
        (!i || !r[s].isInSet(i.marks)) &&
        (r = r[s--].removeFromSet(r));
    return r;
  }
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e) return t;
    return 0;
  }
  blockRange(e = this, t) {
    if (e.pos < this.pos) return e.blockRange(this);
    for (
      let r =
        this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0);
      r >= 0;
      r--
    )
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new qc(this, e, r);
    return null;
  }
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [],
      i = 0,
      s = t;
    for (let o = e; ; ) {
      let { index: l, offset: a } = o.content.findIndex(s),
        c = s - a;
      if ((r.push(o, l, i + a), !c || ((o = o.child(l)), o.isText))) break;
      (s = c - 1), (i += a + 1);
    }
    return new vr(t, r, s);
  }
  static resolveCached(e, t) {
    let r = ta.get(e);
    if (r)
      for (let s = 0; s < r.elts.length; s++) {
        let o = r.elts[s];
        if (o.pos == t) return o;
      }
    else ta.set(e, (r = new Gf()));
    let i = (r.elts[r.i] = vr.resolve(e, t));
    return (r.i = (r.i + 1) % Qf), i;
  }
}
class Gf {
  constructor() {
    (this.elts = []), (this.i = 0);
  }
}
const Qf = 12,
  ta = new WeakMap();
class qc {
  constructor(e, t, r) {
    (this.$from = e), (this.$to = t), (this.depth = r);
  }
  get start() {
    return this.$from.before(this.depth + 1);
  }
  get end() {
    return this.$to.after(this.depth + 1);
  }
  get parent() {
    return this.$from.node(this.depth);
  }
  get startIndex() {
    return this.$from.index(this.depth);
  }
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const Zf = Object.create(null);
class je {
  constructor(e, t, r, i = W.none) {
    (this.type = e),
      (this.attrs = t),
      (this.marks = i),
      (this.content = r || C.empty);
  }
  get children() {
    return this.content.content;
  }
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  get childCount() {
    return this.content.childCount;
  }
  child(e) {
    return this.content.child(e);
  }
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  forEach(e) {
    this.content.forEach(e);
  }
  nodesBetween(e, t, r, i = 0) {
    this.content.nodesBetween(e, t, r, i, this);
  }
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  get textContent() {
    return this.isLeaf && this.type.spec.leafText
      ? this.type.spec.leafText(this)
      : this.textBetween(0, this.content.size, "");
  }
  textBetween(e, t, r, i) {
    return this.content.textBetween(e, t, r, i);
  }
  get firstChild() {
    return this.content.firstChild;
  }
  get lastChild() {
    return this.content.lastChild;
  }
  eq(e) {
    return this == e || (this.sameMarkup(e) && this.content.eq(e.content));
  }
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  hasMarkup(e, t, r) {
    return (
      this.type == e &&
      Bi(this.attrs, t || e.defaultAttrs || Zf) &&
      W.sameSet(this.marks, r || W.none)
    );
  }
  copy(e = null) {
    return e == this.content
      ? this
      : new je(this.type, this.attrs, e, this.marks);
  }
  mark(e) {
    return e == this.marks
      ? this
      : new je(this.type, this.attrs, this.content, e);
  }
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size
      ? this
      : this.copy(this.content.cut(e, t));
  }
  slice(e, t = this.content.size, r = !1) {
    if (e == t) return T.empty;
    let i = this.resolve(e),
      s = this.resolve(t),
      o = r ? 0 : i.sharedDepth(t),
      l = i.start(o),
      c = i.node(o).content.cut(i.pos - l, s.pos - l);
    return new T(c, i.depth - o, s.depth - o);
  }
  replace(e, t, r) {
    return Uf(this.resolve(e), this.resolve(t), r);
  }
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: i } = t.content.findIndex(e);
      if (((t = t.maybeChild(r)), !t)) return null;
      if (i == e || t.isText) return t;
      e -= i + 1;
    }
  }
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  childBefore(e) {
    if (e == 0) return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e) return { node: this.content.child(t), index: t, offset: r };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: r - i.nodeSize };
  }
  resolve(e) {
    return vr.resolveCached(this, e);
  }
  resolveNoCache(e) {
    return vr.resolve(this, e);
  }
  rangeHasMark(e, t, r) {
    let i = !1;
    return (
      t > e &&
        this.nodesBetween(e, t, (s) => (r.isInSet(s.marks) && (i = !0), !i)),
      i
    );
  }
  get isBlock() {
    return this.type.isBlock;
  }
  get isTextblock() {
    return this.type.isTextblock;
  }
  get inlineContent() {
    return this.type.inlineContent;
  }
  get isInline() {
    return this.type.isInline;
  }
  get isText() {
    return this.type.isText;
  }
  get isLeaf() {
    return this.type.isLeaf;
  }
  get isAtom() {
    return this.type.isAtom;
  }
  toString() {
    if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return (
      this.content.size && (e += "(" + this.content.toStringInner() + ")"),
      Hc(this.marks, e)
    );
  }
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  canReplace(e, t, r = C.empty, i = 0, s = r.childCount) {
    let o = this.contentMatchAt(e).matchFragment(r, i, s),
      l = o && o.matchFragment(this.content, t);
    if (!l || !l.validEnd) return !1;
    for (let a = i; a < s; a++)
      if (!this.type.allowsMarks(r.child(a).marks)) return !1;
    return !0;
  }
  canReplaceWith(e, t, r, i) {
    if (i && !this.type.allowsMarks(i)) return !1;
    let s = this.contentMatchAt(e).matchType(r),
      o = s && s.matchFragment(this.content, t);
    return o ? o.validEnd : !1;
  }
  canAppend(e) {
    return e.content.size
      ? this.canReplace(this.childCount, this.childCount, e.content)
      : this.type.compatibleContent(e.type);
  }
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = W.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      r.type.checkAttrs(r.attrs), (e = r.addToSet(e));
    }
    if (!W.sameSet(e, this.marks))
      throw new RangeError(
        `Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`,
      );
    this.content.forEach((t) => t.check());
  }
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return (
      this.content.size && (e.content = this.content.toJSON()),
      this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())),
      e
    );
  }
  static fromJSON(e, t) {
    if (!t) throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let i = C.fromJSON(e, t.content),
      s = e.nodeType(t.type).create(t.attrs, i, r);
    return s.type.checkAttrs(s.attrs), s;
  }
}
je.prototype.text = void 0;
class Li extends je {
  constructor(e, t, r, i) {
    if ((super(e, t, null, i), !r))
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString
      ? this.type.spec.toDebugString(this)
      : Hc(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new Li(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Li(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length
      ? this
      : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return (e.text = this.text), e;
  }
}
function Hc(n, e) {
  for (let t = n.length - 1; t >= 0; t--) e = n[t].type.name + "(" + e + ")";
  return e;
}
class dn {
  constructor(e) {
    (this.validEnd = e), (this.next = []), (this.wrapCache = []);
  }
  static parse(e, t) {
    let r = new Xf(e, t);
    if (r.next == null) return dn.empty;
    let i = _c(r);
    r.next && r.err("Unexpected trailing text");
    let s = od(sd(i));
    return ld(s, r), s;
  }
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e) return this.next[t].next;
    return null;
  }
  matchFragment(e, t = 0, r = e.childCount) {
    let i = this;
    for (let s = t; i && s < r; s++) i = i.matchType(e.child(s).type);
    return i;
  }
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs())) return t;
    }
    return null;
  }
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type) return !0;
    return !1;
  }
  fillBefore(e, t = !1, r = 0) {
    let i = [this];
    function s(o, l) {
      let a = o.matchFragment(e, r);
      if (a && (!t || a.validEnd))
        return C.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < o.next.length; c++) {
        let { type: u, next: h } = o.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(h) == -1) {
          i.push(h);
          let d = s(h, l.concat(u));
          if (d) return d;
        }
      }
      return null;
    }
    return s(this, []);
  }
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e) return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  computeWrapping(e) {
    let t = Object.create(null),
      r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(),
        s = i.match;
      if (s.matchType(e)) {
        let o = [];
        for (let l = i; l.type; l = l.via) o.push(l.type);
        return o.reverse();
      }
      for (let o = 0; o < s.next.length; o++) {
        let { type: l, next: a } = s.next[o];
        !l.isLeaf &&
          !l.hasRequiredAttrs() &&
          !(l.name in t) &&
          (!i.type || a.validEnd) &&
          (r.push({ match: l.contentMatch, type: l, via: i }),
          (t[l.name] = !0));
      }
    }
    return null;
  }
  get edgeCount() {
    return this.next.length;
  }
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && t(r.next[i].next);
    }
    return (
      t(this),
      e.map((r, i) => {
        let s = i + (r.validEnd ? "*" : " ") + " ";
        for (let o = 0; o < r.next.length; o++)
          s +=
            (o ? ", " : "") +
            r.next[o].type.name +
            "->" +
            e.indexOf(r.next[o].next);
        return s;
      }).join(`
`)
    );
  }
}
dn.empty = new dn(!0);
class Xf {
  constructor(e, t) {
    (this.string = e),
      (this.nodeTypes = t),
      (this.inline = null),
      (this.pos = 0),
      (this.tokens = e.split(/\s*(?=\b|\W|$)/)),
      this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(),
      this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function _c(n) {
  let e = [];
  do e.push(ed(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function ed(n) {
  let e = [];
  do e.push(td(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function td(n) {
  let e = id(n);
  for (;;)
    if (n.eat("+")) e = { type: "plus", expr: e };
    else if (n.eat("*")) e = { type: "star", expr: e };
    else if (n.eat("?")) e = { type: "opt", expr: e };
    else if (n.eat("{")) e = nd(n, e);
    else break;
  return e;
}
function na(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function nd(n, e) {
  let t = na(n),
    r = t;
  return (
    n.eat(",") && (n.next != "}" ? (r = na(n)) : (r = -1)),
    n.eat("}") || n.err("Unclosed braced range"),
    { type: "range", min: t, max: r, expr: e }
  );
}
function rd(n, e) {
  let t = n.nodeTypes,
    r = t[e];
  if (r) return [r];
  let i = [];
  for (let s in t) {
    let o = t[s];
    o.isInGroup(e) && i.push(o);
  }
  return i.length == 0 && n.err("No node type or group '" + e + "' found"), i;
}
function id(n) {
  if (n.eat("(")) {
    let e = _c(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next)) n.err("Unexpected token '" + n.next + "'");
  else {
    let e = rd(n, n.next).map(
      (t) => (
        n.inline == null
          ? (n.inline = t.isInline)
          : n.inline != t.isInline && n.err("Mixing inline and block content"),
        { type: "name", value: t }
      ),
    );
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function sd(n) {
  let e = [[]];
  return i(s(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(o, l, a) {
    let c = { term: a, to: l };
    return e[o].push(c), c;
  }
  function i(o, l) {
    o.forEach((a) => (a.to = l));
  }
  function s(o, l) {
    if (o.type == "choice")
      return o.exprs.reduce((a, c) => a.concat(s(c, l)), []);
    if (o.type == "seq")
      for (let a = 0; ; a++) {
        let c = s(o.exprs[a], l);
        if (a == o.exprs.length - 1) return c;
        i(c, (l = t()));
      }
    else if (o.type == "star") {
      let a = t();
      return r(l, a), i(s(o.expr, a), a), [r(a)];
    } else if (o.type == "plus") {
      let a = t();
      return i(s(o.expr, l), a), i(s(o.expr, a), a), [r(a)];
    } else {
      if (o.type == "opt") return [r(l)].concat(s(o.expr, l));
      if (o.type == "range") {
        let a = l;
        for (let c = 0; c < o.min; c++) {
          let u = t();
          i(s(o.expr, a), u), (a = u);
        }
        if (o.max == -1) i(s(o.expr, a), a);
        else
          for (let c = o.min; c < o.max; c++) {
            let u = t();
            r(a, u), i(s(o.expr, a), u), (a = u);
          }
        return [r(a)];
      } else {
        if (o.type == "name") return [r(l, void 0, o.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function jc(n, e) {
  return e - n;
}
function ra(n, e) {
  let t = [];
  return r(e), t.sort(jc);
  function r(i) {
    let s = n[i];
    if (s.length == 1 && !s[0].term) return r(s[0].to);
    t.push(i);
    for (let o = 0; o < s.length; o++) {
      let { term: l, to: a } = s[o];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function od(n) {
  let e = Object.create(null);
  return t(ra(n, 0));
  function t(r) {
    let i = [];
    r.forEach((o) => {
      n[o].forEach(({ term: l, to: a }) => {
        if (!l) return;
        let c;
        for (let u = 0; u < i.length; u++) i[u][0] == l && (c = i[u][1]);
        ra(n, a).forEach((u) => {
          c || i.push([l, (c = [])]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let s = (e[r.join(",")] = new dn(r.indexOf(n.length - 1) > -1));
    for (let o = 0; o < i.length; o++) {
      let l = i[o][1].sort(jc);
      s.next.push({ type: i[o][0], next: e[l.join(",")] || t(l) });
    }
    return s;
  }
}
function ld(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t],
      s = !i.validEnd,
      o = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      o.push(a.name),
        s && !(a.isText || a.hasRequiredAttrs()) && (s = !1),
        r.indexOf(c) == -1 && r.push(c);
    }
    s &&
      e.err(
        "Only non-generatable nodes (" +
          o.join(", ") +
          ") in a required position (see https://prosemirror.net/docs/guide/#generatable)",
      );
  }
}
function Kc(n) {
  let e = Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault) return null;
    e[t] = r.default;
  }
  return e;
}
function Jc(n, e) {
  let t = Object.create(null);
  for (let r in n) {
    let i = e && e[r];
    if (i === void 0) {
      let s = n[r];
      if (s.hasDefault) i = s.default;
      else throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = i;
  }
  return t;
}
function Uc(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${i}`);
  for (let i in n) {
    let s = n[i];
    s.validate && s.validate(e[i]);
  }
}
function Yc(n, e) {
  let t = Object.create(null);
  if (e) for (let r in e) t[r] = new cd(n, r, e[r]);
  return t;
}
let ia = class Gc {
  constructor(e, t, r) {
    (this.name = e),
      (this.schema = t),
      (this.spec = r),
      (this.markSet = null),
      (this.groups = r.group ? r.group.split(" ") : []),
      (this.attrs = Yc(e, r.attrs)),
      (this.defaultAttrs = Kc(this.attrs)),
      (this.contentMatch = null),
      (this.inlineContent = null),
      (this.isBlock = !(r.inline || e == "text")),
      (this.isText = e == "text");
  }
  get isInline() {
    return !this.isBlock;
  }
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  get isLeaf() {
    return this.contentMatch == dn.empty;
  }
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  hasRequiredAttrs() {
    for (let e in this.attrs) if (this.attrs[e].isRequired) return !0;
    return !1;
  }
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : Jc(this.attrs, e);
  }
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new je(this, this.computeAttrs(e), C.from(t), W.setFrom(r));
  }
  createChecked(e = null, t, r) {
    return (
      (t = C.from(t)),
      this.checkContent(t),
      new je(this, this.computeAttrs(e), t, W.setFrom(r))
    );
  }
  createAndFill(e = null, t, r) {
    if (((e = this.computeAttrs(e)), (t = C.from(t)), t.size)) {
      let o = this.contentMatch.fillBefore(t);
      if (!o) return null;
      t = o.append(t);
    }
    let i = this.contentMatch.matchFragment(t),
      s = i && i.fillBefore(C.empty, !0);
    return s ? new je(this, e, t.append(s), W.setFrom(r)) : null;
  }
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd) return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks)) return !1;
    return !0;
  }
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(
        `Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`,
      );
  }
  checkAttrs(e) {
    Uc(this.attrs, e, "node", this.name);
  }
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  allowsMarks(e) {
    if (this.markSet == null) return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type)) return !1;
    return !0;
  }
  allowedMarks(e) {
    if (this.markSet == null) return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type)
        ? t && t.push(e[r])
        : t || (t = e.slice(0, r));
    return t ? (t.length ? t : W.none) : e;
  }
  static compile(e, t) {
    let r = Object.create(null);
    e.forEach((s, o) => (r[s] = new Gc(s, t, o)));
    let i = t.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text) throw new RangeError("Every schema needs a 'text' type");
    for (let s in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function ad(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let s = i === null ? "null" : typeof i;
    if (r.indexOf(s) < 0)
      throw new RangeError(
        `Expected value of type ${r} for attribute ${e} on type ${n}, got ${s}`,
      );
  };
}
class cd {
  constructor(e, t, r) {
    (this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default")),
      (this.default = r.default),
      (this.validate =
        typeof r.validate == "string" ? ad(e, t, r.validate) : r.validate);
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Ui {
  constructor(e, t, r, i) {
    (this.name = e),
      (this.rank = t),
      (this.schema = r),
      (this.spec = i),
      (this.attrs = Yc(e, i.attrs)),
      (this.excluded = null);
    let s = Kc(this.attrs);
    this.instance = s ? new W(this, s) : null;
  }
  create(e = null) {
    return !e && this.instance ? this.instance : new W(this, Jc(this.attrs, e));
  }
  static compile(e, t) {
    let r = Object.create(null),
      i = 0;
    return e.forEach((s, o) => (r[s] = new Ui(s, i++, t, o))), r;
  }
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && ((e = e.slice(0, t).concat(e.slice(t + 1))), t--);
    return e;
  }
  isInSet(e) {
    for (let t = 0; t < e.length; t++) if (e[t].type == this) return e[t];
  }
  checkAttrs(e) {
    Uc(this.attrs, e, "mark", this.name);
  }
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class ud {
  constructor(e) {
    (this.linebreakReplacement = null), (this.cached = Object.create(null));
    let t = (this.spec = {});
    for (let i in e) t[i] = e[i];
    (t.nodes = he.from(e.nodes)),
      (t.marks = he.from(e.marks || {})),
      (this.nodes = ia.compile(this.spec.nodes, this)),
      (this.marks = Ui.compile(this.spec.marks, this));
    let r = Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let s = this.nodes[i],
        o = s.spec.content || "",
        l = s.spec.marks;
      if (
        ((s.contentMatch = r[o] || (r[o] = dn.parse(o, this.nodes))),
        (s.inlineContent = s.contentMatch.inlineContent),
        s.spec.linebreakReplacement)
      ) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!s.isInline || !s.isLeaf)
          throw new RangeError(
            "Linebreak replacement nodes must be inline leaf nodes",
          );
        this.linebreakReplacement = s;
      }
      s.markSet =
        l == "_"
          ? null
          : l
            ? sa(this, l.split(" "))
            : l == "" || !s.inlineContent
              ? []
              : null;
    }
    for (let i in this.marks) {
      let s = this.marks[i],
        o = s.spec.excludes;
      s.excluded = o == null ? [s] : o == "" ? [] : sa(this, o.split(" "));
    }
    (this.nodeFromJSON = this.nodeFromJSON.bind(this)),
      (this.markFromJSON = this.markFromJSON.bind(this)),
      (this.topNodeType = this.nodes[this.spec.topNode || "doc"]),
      (this.cached.wrappings = Object.create(null));
  }
  node(e, t = null, r, i) {
    if (typeof e == "string") e = this.nodeType(e);
    else if (e instanceof ia) {
      if (e.schema != this)
        throw new RangeError(
          "Node type from different schema used (" + e.name + ")",
        );
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, i);
  }
  text(e, t) {
    let r = this.nodes.text;
    return new Li(r, r.defaultAttrs, e, W.setFrom(t));
  }
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  nodeFromJSON(e) {
    return je.fromJSON(this, e);
  }
  markFromJSON(e) {
    return W.fromJSON(this, e);
  }
  nodeType(e) {
    let t = this.nodes[e];
    if (!t) throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function sa(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r],
      s = n.marks[i],
      o = s;
    if (s) t.push(s);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (i == "_" ||
          (a.spec.group && a.spec.group.split(" ").indexOf(i) > -1)) &&
          t.push((o = a));
      }
    if (!o) throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function hd(n) {
  return n.tag != null;
}
function fd(n) {
  return n.style != null;
}
class Hn {
  constructor(e, t) {
    (this.schema = e), (this.rules = t), (this.tags = []), (this.styles = []);
    let r = (this.matchedStyles = []);
    t.forEach((i) => {
      if (hd(i)) this.tags.push(i);
      else if (fd(i)) {
        let s = /[^=]*/.exec(i.style)[0];
        r.indexOf(s) < 0 && r.push(s), this.styles.push(i);
      }
    }),
      (this.normalizeLists = !this.tags.some((i) => {
        if (!/^(ul|ol)\b/.test(i.tag) || !i.node) return !1;
        let s = e.nodes[i.node];
        return s.contentMatch.matchType(s);
      }));
  }
  parse(e, t = {}) {
    let r = new la(this, t, !1);
    return r.addAll(e, W.none, t.from, t.to), r.finish();
  }
  parseSlice(e, t = {}) {
    let r = new la(this, t, !0);
    return r.addAll(e, W.none, t.from, t.to), T.maxOpen(r.finish());
  }
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let s = this.tags[i];
      if (
        md(e, s.tag) &&
        (s.namespace === void 0 || e.namespaceURI == s.namespace) &&
        (!s.context || t.matchesContext(s.context))
      ) {
        if (s.getAttrs) {
          let o = s.getAttrs(e);
          if (o === !1) continue;
          s.attrs = o || void 0;
        }
        return s;
      }
    }
  }
  matchStyle(e, t, r, i) {
    for (
      let s = i ? this.styles.indexOf(i) + 1 : 0;
      s < this.styles.length;
      s++
    ) {
      let o = this.styles[s],
        l = o.style;
      if (
        !(
          l.indexOf(e) != 0 ||
          (o.context && !r.matchesContext(o.context)) ||
          (l.length > e.length &&
            (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))
        )
      ) {
        if (o.getAttrs) {
          let a = o.getAttrs(t);
          if (a === !1) continue;
          o.attrs = a || void 0;
        }
        return o;
      }
    }
  }
  static schemaRules(e) {
    let t = [];
    function r(i) {
      let s = i.priority == null ? 50 : i.priority,
        o = 0;
      for (; o < t.length; o++) {
        let l = t[o];
        if ((l.priority == null ? 50 : l.priority) < s) break;
      }
      t.splice(o, 0, i);
    }
    for (let i in e.marks) {
      let s = e.marks[i].spec.parseDOM;
      s &&
        s.forEach((o) => {
          r((o = aa(o))), o.mark || o.ignore || o.clearMark || (o.mark = i);
        });
    }
    for (let i in e.nodes) {
      let s = e.nodes[i].spec.parseDOM;
      s &&
        s.forEach((o) => {
          r((o = aa(o))), o.node || o.ignore || o.mark || (o.node = i);
        });
    }
    return t;
  }
  static fromSchema(e) {
    return (
      e.cached.domParser || (e.cached.domParser = new Hn(e, Hn.schemaRules(e)))
    );
  }
}
const Qc = {
    address: !0,
    article: !0,
    aside: !0,
    blockquote: !0,
    canvas: !0,
    dd: !0,
    div: !0,
    dl: !0,
    fieldset: !0,
    figcaption: !0,
    figure: !0,
    footer: !0,
    form: !0,
    h1: !0,
    h2: !0,
    h3: !0,
    h4: !0,
    h5: !0,
    h6: !0,
    header: !0,
    hgroup: !0,
    hr: !0,
    li: !0,
    noscript: !0,
    ol: !0,
    output: !0,
    p: !0,
    pre: !0,
    section: !0,
    table: !0,
    tfoot: !0,
    ul: !0,
  },
  dd = { head: !0, noscript: !0, object: !0, script: !0, style: !0, title: !0 },
  Zc = { ol: !0, ul: !0 },
  Fr = 1,
  Us = 2,
  hi = 4;
function oa(n, e, t) {
  return e != null
    ? (e ? Fr : 0) | (e === "full" ? Us : 0)
    : n && n.whitespace == "pre"
      ? Fr | Us
      : t & -5;
}
class ii {
  constructor(e, t, r, i, s, o) {
    (this.type = e),
      (this.attrs = t),
      (this.marks = r),
      (this.solid = i),
      (this.options = o),
      (this.content = []),
      (this.activeMarks = W.none),
      (this.match = s || (o & hi ? null : e.contentMatch));
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type) return [];
      let t = this.type.contentMatch.fillBefore(C.from(e));
      if (t) this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch,
          i;
        return (i = r.findWrapping(e.type)) ? ((this.match = r), i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Fr)) {
      let r = this.content[this.content.length - 1],
        i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let s = r;
        r.text.length == i[0].length
          ? this.content.pop()
          : (this.content[this.content.length - 1] = s.withText(
              s.text.slice(0, s.text.length - i[0].length),
            ));
      }
    }
    let t = C.from(this.content);
    return (
      !e && this.match && (t = t.append(this.match.fillBefore(C.empty, !0))),
      this.type ? this.type.create(this.attrs, t, this.marks) : t
    );
  }
  inlineContext(e) {
    return this.type
      ? this.type.inlineContent
      : this.content.length
        ? this.content[0].isInline
        : e.parentNode &&
          !Qc.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class la {
  constructor(e, t, r) {
    (this.parser = e),
      (this.options = t),
      (this.isOpen = r),
      (this.open = 0),
      (this.localPreserveWS = !1);
    let i = t.topNode,
      s,
      o = oa(null, t.preserveWhitespace, 0) | (r ? hi : 0);
    i
      ? (s = new ii(
          i.type,
          i.attrs,
          W.none,
          !0,
          t.topMatch || i.type.contentMatch,
          o,
        ))
      : r
        ? (s = new ii(null, null, W.none, !0, null, o))
        : (s = new ii(e.schema.topNodeType, null, W.none, !0, null, o)),
      (this.nodes = [s]),
      (this.find = t.findPositions),
      (this.needsBlock = !1);
  }
  get top() {
    return this.nodes[this.open];
  }
  addDOM(e, t) {
    e.nodeType == 3
      ? this.addTextNode(e, t)
      : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let r = e.nodeValue,
      i = this.top,
      s =
        i.options & Us ? "full" : this.localPreserveWS || (i.options & Fr) > 0;
    if (s === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (s)
        s !== "full"
          ? (r = r.replace(/\r?\n|\r/g, " "))
          : (r = r.replace(
              /\r\n?/g,
              `
`,
            ));
      else if (
        ((r = r.replace(/[ \t\r\n\u000c]+/g, " ")),
        /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1)
      ) {
        let o = i.content[i.content.length - 1],
          l = e.previousSibling;
        (!o ||
          (l && l.nodeName == "BR") ||
          (o.isText && /[ \t\r\n\u000c]$/.test(o.text))) &&
          (r = r.slice(1));
      }
      r && this.insertNode(this.parser.schema.text(r), t), this.findInText(e);
    } else this.findInside(e);
  }
  addElement(e, t, r) {
    let i = this.localPreserveWS,
      s = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) &&
      (this.localPreserveWS = !0);
    let o = e.nodeName.toLowerCase(),
      l;
    Zc.hasOwnProperty(o) && this.parser.normalizeLists && pd(e);
    let a =
      (this.options.ruleFromNode && this.options.ruleFromNode(e)) ||
      (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : dd.hasOwnProperty(o))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent
        ? (this.open = Math.max(0, this.open - 1))
        : a && a.skip.nodeType && (e = a.skip);
      let c,
        u = this.needsBlock;
      if (Qc.hasOwnProperty(o))
        s.content.length &&
          s.content[0].isInline &&
          this.open &&
          (this.open--, (s = this.top)),
          (c = !0),
          s.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let h = a && a.skip ? t : this.readStyles(e, t);
      h && this.addAll(e, h), c && this.sync(s), (this.needsBlock = u);
    } else {
      let c = this.readStyles(e, t);
      c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
    }
    this.localPreserveWS = i;
  }
  leafFallback(e, t) {
    e.nodeName == "BR" &&
      this.top.type &&
      this.top.type.inlineContent &&
      this.addTextNode(
        e.ownerDocument.createTextNode(`
`),
        t,
      );
  }
  ignoreFallback(e, t) {
    e.nodeName == "BR" &&
      (!this.top.type || !this.top.type.inlineContent) &&
      this.findPlace(this.parser.schema.text("-"), t);
  }
  readStyles(e, t) {
    let r = e.style;
    if (r && r.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let s = this.parser.matchedStyles[i],
          o = r.getPropertyValue(s);
        if (o)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(s, o, this, l);
            if (!a) break;
            if (a.ignore) return null;
            if (
              (a.clearMark
                ? (t = t.filter((c) => !a.clearMark(c)))
                : (t = t.concat(
                    this.parser.schema.marks[a.mark].create(a.attrs),
                  )),
              a.consuming === !1)
            )
              l = a;
            else break;
          }
      }
    return t;
  }
  addElementByRule(e, t, r, i) {
    let s, o;
    if (t.node)
      if (((o = this.parser.schema.nodes[t.node]), o.isLeaf))
        this.insertNode(o.create(t.attrs), r) || this.leafFallback(e, r);
      else {
        let a = this.enter(o, t.attrs || null, r, t.preserveWhitespace);
        a && ((s = !0), (r = a));
      }
    else {
      let a = this.parser.schema.marks[t.mark];
      r = r.concat(a.create(t.attrs));
    }
    let l = this.top;
    if (o && o.isLeaf) this.findInside(e);
    else if (i) this.addElement(e, r, i);
    else if (t.getContent)
      this.findInside(e),
        t
          .getContent(e, this.parser.schema)
          .forEach((a) => this.insertNode(a, r));
    else {
      let a = e;
      typeof t.contentElement == "string"
        ? (a = e.querySelector(t.contentElement))
        : typeof t.contentElement == "function"
          ? (a = t.contentElement(e))
          : t.contentElement && (a = t.contentElement),
        this.findAround(e, a, !0),
        this.addAll(a, r),
        this.findAround(e, a, !1);
    }
    s && this.sync(l) && this.open--;
  }
  addAll(e, t, r, i) {
    let s = r || 0;
    for (
      let o = r ? e.childNodes[r] : e.firstChild,
        l = i == null ? null : e.childNodes[i];
      o != l;
      o = o.nextSibling, ++s
    )
      this.findAtPoint(e, s), this.addDOM(o, t);
    this.findAtPoint(e, s);
  }
  findPlace(e, t) {
    let r, i;
    for (let s = this.open; s >= 0; s--) {
      let o = this.nodes[s],
        l = o.findWrapping(e);
      if (
        (l && (!r || r.length > l.length) && ((r = l), (i = o), !l.length)) ||
        o.solid
      )
        break;
    }
    if (!r) return null;
    this.sync(i);
    for (let s = 0; s < r.length; s++) t = this.enterInner(r[s], null, t, !1);
    return t;
  }
  insertNode(e, t) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let i = this.textblockFromContext();
      i && (t = this.enterInner(i, null, t));
    }
    let r = this.findPlace(e, t);
    if (r) {
      this.closeExtra();
      let i = this.top;
      i.match && (i.match = i.match.matchType(e.type));
      let s = W.none;
      for (let o of r.concat(e.marks))
        (i.type ? i.type.allowsMarkType(o.type) : ca(o.type, e.type)) &&
          (s = o.addToSet(s));
      return i.content.push(e.mark(s)), !0;
    }
    return !1;
  }
  enter(e, t, r, i) {
    let s = this.findPlace(e.create(t), r);
    return s && (s = this.enterInner(e, t, r, !0, i)), s;
  }
  enterInner(e, t, r, i = !1, s) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(e);
    let l = oa(e, s, o.options);
    o.options & hi && o.content.length == 0 && (l |= hi);
    let a = W.none;
    return (
      (r = r.filter((c) =>
        (o.type ? o.type.allowsMarkType(c.type) : ca(c.type, e))
          ? ((a = c.addToSet(a)), !1)
          : !0,
      )),
      this.nodes.push(new ii(e, t, a, i, null, l)),
      this.open++,
      r
    );
  }
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return (
      (this.open = 0),
      this.closeExtra(this.isOpen),
      this.nodes[0].finish(!!(this.isOpen || this.options.topOpen))
    );
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--) {
      if (this.nodes[t] == e) return (this.open = t), !0;
      this.localPreserveWS && (this.nodes[t].options |= Fr);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let i = r.length - 1; i >= 0; i--) e += r[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e &&
          this.find[r].offset == t &&
          (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null &&
          e.nodeType == 1 &&
          e.contains(this.find[t].node) &&
          (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null &&
          e.nodeType == 1 &&
          e.contains(this.find[i].node) &&
          t.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) &&
          (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e &&
          (this.find[t].pos =
            this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"),
      r = this.options.context,
      i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type),
      s = -(r ? r.depth + 1 : 0) + (i ? 0 : 1),
      o = (l, a) => {
        for (; l >= 0; l--) {
          let c = t[l];
          if (c == "") {
            if (l == t.length - 1 || l == 0) continue;
            for (; a >= s; a--) if (o(l - 1, a)) return !0;
            return !1;
          } else {
            let u =
              a > 0 || (a == 0 && i)
                ? this.nodes[a].type
                : r && a >= s
                  ? r.node(a - s).type
                  : null;
            if (!u || (u.name != c && !u.isInGroup(c))) return !1;
            a--;
          }
        }
        return !0;
      };
    return o(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs) return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs) return r;
    }
  }
}
function pd(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Zc.hasOwnProperty(r) && t
      ? (t.appendChild(e), (e = t))
      : r == "li"
        ? (t = e)
        : r && (t = null);
  }
}
function md(n, e) {
  return (
    n.matches ||
    n.msMatchesSelector ||
    n.webkitMatchesSelector ||
    n.mozMatchesSelector
  ).call(n, e);
}
function aa(n) {
  let e = {};
  for (let t in n) e[t] = n[t];
  return e;
}
function ca(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n)) continue;
    let s = [],
      o = (l) => {
        s.push(l);
        for (let a = 0; a < l.edgeCount; a++) {
          let { type: c, next: u } = l.edge(a);
          if (c == e || (s.indexOf(u) < 0 && o(u))) return !0;
        }
      };
    if (o(i.contentMatch)) return !0;
  }
}
class Un {
  constructor(e, t) {
    (this.nodes = e), (this.marks = t);
  }
  serializeFragment(e, t = {}, r) {
    r || (r = us(t).createDocumentFragment());
    let i = r,
      s = [];
    return (
      e.forEach((o) => {
        if (s.length || o.marks.length) {
          let l = 0,
            a = 0;
          for (; l < s.length && a < o.marks.length; ) {
            let c = o.marks[a];
            if (!this.marks[c.type.name]) {
              a++;
              continue;
            }
            if (!c.eq(s[l][0]) || c.type.spec.spanning === !1) break;
            l++, a++;
          }
          for (; l < s.length; ) i = s.pop()[1];
          for (; a < o.marks.length; ) {
            let c = o.marks[a++],
              u = this.serializeMark(c, o.isInline, t);
            u &&
              (s.push([c, i]),
              i.appendChild(u.dom),
              (i = u.contentDOM || u.dom));
          }
        }
        i.appendChild(this.serializeNodeInner(o, t));
      }),
      r
    );
  }
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: i } = fi(
      us(t),
      this.nodes[e.type.name](e),
      null,
      e.attrs,
    );
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, i);
    }
    return r;
  }
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let s = this.serializeMark(e.marks[i], e.isInline, t);
      s && ((s.contentDOM || s.dom).appendChild(r), (r = s.dom));
    }
    return r;
  }
  serializeMark(e, t, r = {}) {
    let i = this.marks[e.type.name];
    return i && fi(us(r), i(e, t), null, e.attrs);
  }
  static renderSpec(e, t, r = null, i) {
    return fi(e, t, r, i);
  }
  static fromSchema(e) {
    return (
      e.cached.domSerializer ||
      (e.cached.domSerializer = new Un(
        this.nodesFromSchema(e),
        this.marksFromSchema(e),
      ))
    );
  }
  static nodesFromSchema(e) {
    let t = ua(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  static marksFromSchema(e) {
    return ua(e.marks);
  }
}
function ua(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function us(n) {
  return n.document || window.document;
}
const ha = new WeakMap();
function gd(n) {
  let e = ha.get(n);
  return e === void 0 && ha.set(n, (e = yd(n))), e;
}
function yd(n) {
  let e = null;
  function t(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string") e || (e = []), e.push(r);
        else for (let i = 0; i < r.length; i++) t(r[i]);
      else for (let i in r) t(r[i]);
  }
  return t(n), e;
}
function fi(n, e, t, r) {
  if (typeof e == "string") return { dom: n.createTextNode(e) };
  if (e.nodeType != null) return { dom: e };
  if (e.dom && e.dom.nodeType != null) return e;
  let i = e[0],
    s;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (s = gd(r)) && s.indexOf(e) > -1)
    throw new RangeError(
      "Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.",
    );
  let o = i.indexOf(" ");
  o > 0 && ((t = i.slice(0, o)), (i = i.slice(o + 1)));
  let l,
    a = t ? n.createElementNS(t, i) : n.createElement(i),
    c = e[1],
    u = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let h in c)
      if (c[h] != null) {
        let d = h.indexOf(" ");
        d > 0
          ? a.setAttributeNS(h.slice(0, d), h.slice(d + 1), c[h])
          : a.setAttribute(h, c[h]);
      }
  }
  for (let h = u; h < e.length; h++) {
    let d = e[h];
    if (d === 0) {
      if (h < e.length - 1 || h > u)
        throw new RangeError(
          "Content hole must be the only child of its parent node",
        );
      return { dom: a, contentDOM: a };
    } else {
      let { dom: f, contentDOM: p } = fi(n, d, t, r);
      if ((a.appendChild(f), p)) {
        if (l) throw new RangeError("Multiple content holes");
        l = p;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const kd = {};
function Ao(n, e) {
  const t = kd,
    r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0,
    i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return Xc(n, r, i);
}
function Xc(n, e, t) {
  if (xd(n)) {
    if ("value" in n) return n.type === "html" && !t ? "" : n.value;
    if (e && "alt" in n && n.alt) return n.alt;
    if ("children" in n) return fa(n.children, e, t);
  }
  return Array.isArray(n) ? fa(n, e, t) : "";
}
function fa(n, e, t) {
  const r = [];
  let i = -1;
  for (; ++i < n.length; ) r[i] = Xc(n[i], e, t);
  return r.join("");
}
function xd(n) {
  return !!(n && typeof n == "object");
}
const da = document.createElement("i");
function Do(n) {
  const e = "&" + n + ";";
  da.innerHTML = e;
  const t = da.textContent;
  return (t.charCodeAt(t.length - 1) === 59 && n !== "semi") || t === e
    ? !1
    : t;
}
function it(n, e, t, r) {
  const i = n.length;
  let s = 0,
    o;
  if (
    (e < 0 ? (e = -e > i ? 0 : i + e) : (e = e > i ? i : e),
    (t = t > 0 ? t : 0),
    r.length < 1e4)
  )
    (o = Array.from(r)), o.unshift(e, t), n.splice(...o);
  else
    for (t && n.splice(e, t); s < r.length; )
      (o = r.slice(s, s + 1e4)),
        o.unshift(e, 0),
        n.splice(...o),
        (s += 1e4),
        (e += 1e4);
}
function Be(n, e) {
  return n.length > 0 ? (it(n, n.length, 0, e), n) : e;
}
const pa = {}.hasOwnProperty;
function bd(n) {
  const e = {};
  let t = -1;
  for (; ++t < n.length; ) Sd(e, n[t]);
  return e;
}
function Sd(n, e) {
  let t;
  for (t in e) {
    const i = (pa.call(n, t) ? n[t] : void 0) || (n[t] = {}),
      s = e[t];
    let o;
    if (s)
      for (o in s) {
        pa.call(i, o) || (i[o] = []);
        const l = s[o];
        wd(i[o], Array.isArray(l) ? l : l ? [l] : []);
      }
  }
}
function wd(n, e) {
  let t = -1;
  const r = [];
  for (; ++t < e.length; ) (e[t].add === "after" ? n : r).push(e[t]);
  it(n, 0, 0, r);
}
function eu(n, e) {
  const t = Number.parseInt(n, e);
  return t < 9 ||
    t === 11 ||
    (t > 13 && t < 32) ||
    (t > 126 && t < 160) ||
    (t > 55295 && t < 57344) ||
    (t > 64975 && t < 65008) ||
    (t & 65535) === 65535 ||
    (t & 65535) === 65534 ||
    t > 1114111
    ? "�"
    : String.fromCodePoint(t);
}
function Bn(n) {
  return n
    .replace(/[\t\n\r ]+/g, " ")
    .replace(/^ | $/g, "")
    .toLowerCase()
    .toUpperCase();
}
const tt = _t(/[A-Za-z]/),
  _e = _t(/[\dA-Za-z]/),
  Cd = _t(/[#-'*+\--9=?A-Z^-~]/);
function Ys(n) {
  return n !== null && (n < 32 || n === 127);
}
const Gs = _t(/\d/),
  Md = _t(/[\dA-Fa-f]/),
  Nd = _t(/[!-/:-@[-`{-~]/);
function z(n) {
  return n !== null && n < -2;
}
function Me(n) {
  return n !== null && (n < 0 || n === 32);
}
function K(n) {
  return n === -2 || n === -1 || n === 32;
}
const Td = _t(new RegExp("\\p{P}|\\p{S}", "u")),
  Od = _t(/\s/);
function _t(n) {
  return e;
  function e(t) {
    return t !== null && t > -1 && n.test(String.fromCharCode(t));
  }
}
function G(n, e, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let s = 0;
  return o;
  function o(a) {
    return K(a) ? (n.enter(t), l(a)) : e(a);
  }
  function l(a) {
    return K(a) && s++ < i ? (n.consume(a), l) : (n.exit(t), e(a));
  }
}
const Id = { tokenize: Ed };
function Ed(n) {
  const e = n.attempt(this.parser.constructs.contentInitial, r, i);
  let t;
  return e;
  function r(l) {
    if (l === null) {
      n.consume(l);
      return;
    }
    return (
      n.enter("lineEnding"),
      n.consume(l),
      n.exit("lineEnding"),
      G(n, e, "linePrefix")
    );
  }
  function i(l) {
    return n.enter("paragraph"), s(l);
  }
  function s(l) {
    const a = n.enter("chunkText", { contentType: "text", previous: t });
    return t && (t.next = a), (t = a), o(l);
  }
  function o(l) {
    if (l === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(l);
      return;
    }
    return z(l) ? (n.consume(l), n.exit("chunkText"), s) : (n.consume(l), o);
  }
}
const Ad = { tokenize: Dd },
  ma = { tokenize: Rd };
function Dd(n) {
  const e = this,
    t = [];
  let r = 0,
    i,
    s,
    o;
  return l;
  function l(N) {
    if (r < t.length) {
      const F = t[r];
      return (e.containerState = F[1]), n.attempt(F[0].continuation, a, c)(N);
    }
    return c(N);
  }
  function a(N) {
    if ((r++, e.containerState._closeFlow)) {
      (e.containerState._closeFlow = void 0), i && E();
      const F = e.events.length;
      let $ = F,
        w;
      for (; $--; )
        if (e.events[$][0] === "exit" && e.events[$][1].type === "chunkFlow") {
          w = e.events[$][1].end;
          break;
        }
      k(r);
      let _ = F;
      for (; _ < e.events.length; ) (e.events[_][1].end = { ...w }), _++;
      return (
        it(e.events, $ + 1, 0, e.events.slice(F)), (e.events.length = _), c(N)
      );
    }
    return l(N);
  }
  function c(N) {
    if (r === t.length) {
      if (!i) return d(N);
      if (i.currentConstruct && i.currentConstruct.concrete) return p(N);
      e.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return (e.containerState = {}), n.check(ma, u, h)(N);
  }
  function u(N) {
    return i && E(), k(r), d(N);
  }
  function h(N) {
    return (
      (e.parser.lazy[e.now().line] = r !== t.length), (o = e.now().offset), p(N)
    );
  }
  function d(N) {
    return (e.containerState = {}), n.attempt(ma, f, p)(N);
  }
  function f(N) {
    return r++, t.push([e.currentConstruct, e.containerState]), d(N);
  }
  function p(N) {
    if (N === null) {
      i && E(), k(0), n.consume(N);
      return;
    }
    return (
      (i = i || e.parser.flow(e.now())),
      n.enter("chunkFlow", { _tokenizer: i, contentType: "flow", previous: s }),
      y(N)
    );
  }
  function y(N) {
    if (N === null) {
      x(n.exit("chunkFlow"), !0), k(0), n.consume(N);
      return;
    }
    return z(N)
      ? (n.consume(N),
        x(n.exit("chunkFlow")),
        (r = 0),
        (e.interrupt = void 0),
        l)
      : (n.consume(N), y);
  }
  function x(N, F) {
    const $ = e.sliceStream(N);
    if (
      (F && $.push(null),
      (N.previous = s),
      s && (s.next = N),
      (s = N),
      i.defineSkip(N.start),
      i.write($),
      e.parser.lazy[N.start.line])
    ) {
      let w = i.events.length;
      for (; w--; )
        if (
          i.events[w][1].start.offset < o &&
          (!i.events[w][1].end || i.events[w][1].end.offset > o)
        )
          return;
      const _ = e.events.length;
      let Q = _,
        O,
        V;
      for (; Q--; )
        if (e.events[Q][0] === "exit" && e.events[Q][1].type === "chunkFlow") {
          if (O) {
            V = e.events[Q][1].end;
            break;
          }
          O = !0;
        }
      for (k(r), w = _; w < e.events.length; )
        (e.events[w][1].end = { ...V }), w++;
      it(e.events, Q + 1, 0, e.events.slice(_)), (e.events.length = w);
    }
  }
  function k(N) {
    let F = t.length;
    for (; F-- > N; ) {
      const $ = t[F];
      (e.containerState = $[1]), $[0].exit.call(e, n);
    }
    t.length = N;
  }
  function E() {
    i.write([null]),
      (s = void 0),
      (i = void 0),
      (e.containerState._closeFlow = void 0);
  }
}
function Rd(n, e, t) {
  return G(
    n,
    n.attempt(this.parser.constructs.document, e, t),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
  );
}
function $i(n) {
  if (n === null || Me(n) || Od(n)) return 1;
  if (Td(n)) return 2;
}
function Ro(n, e, t) {
  const r = [];
  let i = -1;
  for (; ++i < n.length; ) {
    const s = n[i].resolveAll;
    s && !r.includes(s) && ((e = s(e, t)), r.push(s));
  }
  return e;
}
const Qs = { name: "attention", resolveAll: zd, tokenize: Pd };
function zd(n, e) {
  let t = -1,
    r,
    i,
    s,
    o,
    l,
    a,
    c,
    u;
  for (; ++t < n.length; )
    if (
      n[t][0] === "enter" &&
      n[t][1].type === "attentionSequence" &&
      n[t][1]._close
    ) {
      for (r = t; r--; )
        if (
          n[r][0] === "exit" &&
          n[r][1].type === "attentionSequence" &&
          n[r][1]._open &&
          e.sliceSerialize(n[r][1]).charCodeAt(0) ===
            e.sliceSerialize(n[t][1]).charCodeAt(0)
        ) {
          if (
            (n[r][1]._close || n[t][1]._open) &&
            (n[t][1].end.offset - n[t][1].start.offset) % 3 &&
            !(
              (n[r][1].end.offset -
                n[r][1].start.offset +
                n[t][1].end.offset -
                n[t][1].start.offset) %
              3
            )
          )
            continue;
          a =
            n[r][1].end.offset - n[r][1].start.offset > 1 &&
            n[t][1].end.offset - n[t][1].start.offset > 1
              ? 2
              : 1;
          const h = { ...n[r][1].end },
            d = { ...n[t][1].start };
          ga(h, -a),
            ga(d, a),
            (o = {
              type: a > 1 ? "strongSequence" : "emphasisSequence",
              start: h,
              end: { ...n[r][1].end },
            }),
            (l = {
              type: a > 1 ? "strongSequence" : "emphasisSequence",
              start: { ...n[t][1].start },
              end: d,
            }),
            (s = {
              type: a > 1 ? "strongText" : "emphasisText",
              start: { ...n[r][1].end },
              end: { ...n[t][1].start },
            }),
            (i = {
              type: a > 1 ? "strong" : "emphasis",
              start: { ...o.start },
              end: { ...l.end },
            }),
            (n[r][1].end = { ...o.start }),
            (n[t][1].start = { ...l.end }),
            (c = []),
            n[r][1].end.offset - n[r][1].start.offset &&
              (c = Be(c, [
                ["enter", n[r][1], e],
                ["exit", n[r][1], e],
              ])),
            (c = Be(c, [
              ["enter", i, e],
              ["enter", o, e],
              ["exit", o, e],
              ["enter", s, e],
            ])),
            (c = Be(
              c,
              Ro(e.parser.constructs.insideSpan.null, n.slice(r + 1, t), e),
            )),
            (c = Be(c, [
              ["exit", s, e],
              ["enter", l, e],
              ["exit", l, e],
              ["exit", i, e],
            ])),
            n[t][1].end.offset - n[t][1].start.offset
              ? ((u = 2),
                (c = Be(c, [
                  ["enter", n[t][1], e],
                  ["exit", n[t][1], e],
                ])))
              : (u = 0),
            it(n, r - 1, t - r + 3, c),
            (t = r + c.length - u - 2);
          break;
        }
    }
  for (t = -1; ++t < n.length; )
    n[t][1].type === "attentionSequence" && (n[t][1].type = "data");
  return n;
}
function Pd(n, e) {
  const t = this.parser.constructs.attentionMarkers.null,
    r = this.previous,
    i = $i(r);
  let s;
  return o;
  function o(a) {
    return (s = a), n.enter("attentionSequence"), l(a);
  }
  function l(a) {
    if (a === s) return n.consume(a), l;
    const c = n.exit("attentionSequence"),
      u = $i(a),
      h = !u || (u === 2 && i) || t.includes(a),
      d = !i || (i === 2 && u) || t.includes(r);
    return (
      (c._open = !!(s === 42 ? h : h && (i || !d))),
      (c._close = !!(s === 42 ? d : d && (u || !h))),
      e(a)
    );
  }
}
function ga(n, e) {
  (n.column += e), (n.offset += e), (n._bufferIndex += e);
}
const Bd = { name: "autolink", tokenize: vd };
function vd(n, e, t) {
  let r = 0;
  return i;
  function i(f) {
    return (
      n.enter("autolink"),
      n.enter("autolinkMarker"),
      n.consume(f),
      n.exit("autolinkMarker"),
      n.enter("autolinkProtocol"),
      s
    );
  }
  function s(f) {
    return tt(f) ? (n.consume(f), o) : f === 64 ? t(f) : c(f);
  }
  function o(f) {
    return f === 43 || f === 45 || f === 46 || _e(f) ? ((r = 1), l(f)) : c(f);
  }
  function l(f) {
    return f === 58
      ? (n.consume(f), (r = 0), a)
      : (f === 43 || f === 45 || f === 46 || _e(f)) && r++ < 32
        ? (n.consume(f), l)
        : ((r = 0), c(f));
  }
  function a(f) {
    return f === 62
      ? (n.exit("autolinkProtocol"),
        n.enter("autolinkMarker"),
        n.consume(f),
        n.exit("autolinkMarker"),
        n.exit("autolink"),
        e)
      : f === null || f === 32 || f === 60 || Ys(f)
        ? t(f)
        : (n.consume(f), a);
  }
  function c(f) {
    return f === 64 ? (n.consume(f), u) : Cd(f) ? (n.consume(f), c) : t(f);
  }
  function u(f) {
    return _e(f) ? h(f) : t(f);
  }
  function h(f) {
    return f === 46
      ? (n.consume(f), (r = 0), u)
      : f === 62
        ? ((n.exit("autolinkProtocol").type = "autolinkEmail"),
          n.enter("autolinkMarker"),
          n.consume(f),
          n.exit("autolinkMarker"),
          n.exit("autolink"),
          e)
        : d(f);
  }
  function d(f) {
    if ((f === 45 || _e(f)) && r++ < 63) {
      const p = f === 45 ? d : h;
      return n.consume(f), p;
    }
    return t(f);
  }
}
const Yi = { partial: !0, tokenize: Fd };
function Fd(n, e, t) {
  return r;
  function r(s) {
    return K(s) ? G(n, i, "linePrefix")(s) : i(s);
  }
  function i(s) {
    return s === null || z(s) ? e(s) : t(s);
  }
}
const tu = {
  continuation: { tokenize: $d },
  exit: Vd,
  name: "blockQuote",
  tokenize: Ld,
};
function Ld(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const l = r.containerState;
      return (
        l.open || (n.enter("blockQuote", { _container: !0 }), (l.open = !0)),
        n.enter("blockQuotePrefix"),
        n.enter("blockQuoteMarker"),
        n.consume(o),
        n.exit("blockQuoteMarker"),
        s
      );
    }
    return t(o);
  }
  function s(o) {
    return K(o)
      ? (n.enter("blockQuotePrefixWhitespace"),
        n.consume(o),
        n.exit("blockQuotePrefixWhitespace"),
        n.exit("blockQuotePrefix"),
        e)
      : (n.exit("blockQuotePrefix"), e(o));
  }
}
function $d(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return K(o)
      ? G(
          n,
          s,
          "linePrefix",
          r.parser.constructs.disable.null.includes("codeIndented")
            ? void 0
            : 4,
        )(o)
      : s(o);
  }
  function s(o) {
    return n.attempt(tu, e, t)(o);
  }
}
function Vd(n) {
  n.exit("blockQuote");
}
const nu = { name: "characterEscape", tokenize: Wd };
function Wd(n, e, t) {
  return r;
  function r(s) {
    return (
      n.enter("characterEscape"),
      n.enter("escapeMarker"),
      n.consume(s),
      n.exit("escapeMarker"),
      i
    );
  }
  function i(s) {
    return Nd(s)
      ? (n.enter("characterEscapeValue"),
        n.consume(s),
        n.exit("characterEscapeValue"),
        n.exit("characterEscape"),
        e)
      : t(s);
  }
}
const ru = { name: "characterReference", tokenize: qd };
function qd(n, e, t) {
  const r = this;
  let i = 0,
    s,
    o;
  return l;
  function l(h) {
    return (
      n.enter("characterReference"),
      n.enter("characterReferenceMarker"),
      n.consume(h),
      n.exit("characterReferenceMarker"),
      a
    );
  }
  function a(h) {
    return h === 35
      ? (n.enter("characterReferenceMarkerNumeric"),
        n.consume(h),
        n.exit("characterReferenceMarkerNumeric"),
        c)
      : (n.enter("characterReferenceValue"), (s = 31), (o = _e), u(h));
  }
  function c(h) {
    return h === 88 || h === 120
      ? (n.enter("characterReferenceMarkerHexadecimal"),
        n.consume(h),
        n.exit("characterReferenceMarkerHexadecimal"),
        n.enter("characterReferenceValue"),
        (s = 6),
        (o = Md),
        u)
      : (n.enter("characterReferenceValue"), (s = 7), (o = Gs), u(h));
  }
  function u(h) {
    if (h === 59 && i) {
      const d = n.exit("characterReferenceValue");
      return o === _e && !Do(r.sliceSerialize(d))
        ? t(h)
        : (n.enter("characterReferenceMarker"),
          n.consume(h),
          n.exit("characterReferenceMarker"),
          n.exit("characterReference"),
          e);
    }
    return o(h) && i++ < s ? (n.consume(h), u) : t(h);
  }
}
const ya = { partial: !0, tokenize: _d },
  ka = { concrete: !0, name: "codeFenced", tokenize: Hd };
function Hd(n, e, t) {
  const r = this,
    i = { partial: !0, tokenize: $ };
  let s = 0,
    o = 0,
    l;
  return a;
  function a(w) {
    return c(w);
  }
  function c(w) {
    const _ = r.events[r.events.length - 1];
    return (
      (s =
        _ && _[1].type === "linePrefix"
          ? _[2].sliceSerialize(_[1], !0).length
          : 0),
      (l = w),
      n.enter("codeFenced"),
      n.enter("codeFencedFence"),
      n.enter("codeFencedFenceSequence"),
      u(w)
    );
  }
  function u(w) {
    return w === l
      ? (o++, n.consume(w), u)
      : o < 3
        ? t(w)
        : (n.exit("codeFencedFenceSequence"),
          K(w) ? G(n, h, "whitespace")(w) : h(w));
  }
  function h(w) {
    return w === null || z(w)
      ? (n.exit("codeFencedFence"), r.interrupt ? e(w) : n.check(ya, y, F)(w))
      : (n.enter("codeFencedFenceInfo"),
        n.enter("chunkString", { contentType: "string" }),
        d(w));
  }
  function d(w) {
    return w === null || z(w)
      ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), h(w))
      : K(w)
        ? (n.exit("chunkString"),
          n.exit("codeFencedFenceInfo"),
          G(n, f, "whitespace")(w))
        : w === 96 && w === l
          ? t(w)
          : (n.consume(w), d);
  }
  function f(w) {
    return w === null || z(w)
      ? h(w)
      : (n.enter("codeFencedFenceMeta"),
        n.enter("chunkString", { contentType: "string" }),
        p(w));
  }
  function p(w) {
    return w === null || z(w)
      ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), h(w))
      : w === 96 && w === l
        ? t(w)
        : (n.consume(w), p);
  }
  function y(w) {
    return n.attempt(i, F, x)(w);
  }
  function x(w) {
    return n.enter("lineEnding"), n.consume(w), n.exit("lineEnding"), k;
  }
  function k(w) {
    return s > 0 && K(w) ? G(n, E, "linePrefix", s + 1)(w) : E(w);
  }
  function E(w) {
    return w === null || z(w)
      ? n.check(ya, y, F)(w)
      : (n.enter("codeFlowValue"), N(w));
  }
  function N(w) {
    return w === null || z(w)
      ? (n.exit("codeFlowValue"), E(w))
      : (n.consume(w), N);
  }
  function F(w) {
    return n.exit("codeFenced"), e(w);
  }
  function $(w, _, Q) {
    let O = 0;
    return V;
    function V(q) {
      return w.enter("lineEnding"), w.consume(q), w.exit("lineEnding"), A;
    }
    function A(q) {
      return (
        w.enter("codeFencedFence"),
        K(q)
          ? G(
              w,
              D,
              "linePrefix",
              r.parser.constructs.disable.null.includes("codeIndented")
                ? void 0
                : 4,
            )(q)
          : D(q)
      );
    }
    function D(q) {
      return q === l ? (w.enter("codeFencedFenceSequence"), ee(q)) : Q(q);
    }
    function ee(q) {
      return q === l
        ? (O++, w.consume(q), ee)
        : O >= o
          ? (w.exit("codeFencedFenceSequence"),
            K(q) ? G(w, ie, "whitespace")(q) : ie(q))
          : Q(q);
    }
    function ie(q) {
      return q === null || z(q) ? (w.exit("codeFencedFence"), _(q)) : Q(q);
    }
  }
}
function _d(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return o === null
      ? t(o)
      : (n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), s);
  }
  function s(o) {
    return r.parser.lazy[r.now().line] ? t(o) : e(o);
  }
}
const hs = { name: "codeIndented", tokenize: Kd },
  jd = { partial: !0, tokenize: Jd };
function Kd(n, e, t) {
  const r = this;
  return i;
  function i(c) {
    return n.enter("codeIndented"), G(n, s, "linePrefix", 5)(c);
  }
  function s(c) {
    const u = r.events[r.events.length - 1];
    return u &&
      u[1].type === "linePrefix" &&
      u[2].sliceSerialize(u[1], !0).length >= 4
      ? o(c)
      : t(c);
  }
  function o(c) {
    return c === null
      ? a(c)
      : z(c)
        ? n.attempt(jd, o, a)(c)
        : (n.enter("codeFlowValue"), l(c));
  }
  function l(c) {
    return c === null || z(c)
      ? (n.exit("codeFlowValue"), o(c))
      : (n.consume(c), l);
  }
  function a(c) {
    return n.exit("codeIndented"), e(c);
  }
}
function Jd(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line]
      ? t(o)
      : z(o)
        ? (n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), i)
        : G(n, s, "linePrefix", 5)(o);
  }
  function s(o) {
    const l = r.events[r.events.length - 1];
    return l &&
      l[1].type === "linePrefix" &&
      l[2].sliceSerialize(l[1], !0).length >= 4
      ? e(o)
      : z(o)
        ? i(o)
        : t(o);
  }
}
const Ud = { name: "codeText", previous: Gd, resolve: Yd, tokenize: Qd };
function Yd(n) {
  let e = n.length - 4,
    t = 3,
    r,
    i;
  if (
    (n[t][1].type === "lineEnding" || n[t][1].type === "space") &&
    (n[e][1].type === "lineEnding" || n[e][1].type === "space")
  ) {
    for (r = t; ++r < e; )
      if (n[r][1].type === "codeTextData") {
        (n[t][1].type = "codeTextPadding"),
          (n[e][1].type = "codeTextPadding"),
          (t += 2),
          (e -= 2);
        break;
      }
  }
  for (r = t - 1, e++; ++r <= e; )
    i === void 0
      ? r !== e && n[r][1].type !== "lineEnding" && (i = r)
      : (r === e || n[r][1].type === "lineEnding") &&
        ((n[i][1].type = "codeTextData"),
        r !== i + 2 &&
          ((n[i][1].end = n[r - 1][1].end),
          n.splice(i + 2, r - i - 2),
          (e -= r - i - 2),
          (r = i + 2)),
        (i = void 0));
  return n;
}
function Gd(n) {
  return (
    n !== 96 ||
    this.events[this.events.length - 1][1].type === "characterEscape"
  );
}
function Qd(n, e, t) {
  let r = 0,
    i,
    s;
  return o;
  function o(h) {
    return n.enter("codeText"), n.enter("codeTextSequence"), l(h);
  }
  function l(h) {
    return h === 96
      ? (n.consume(h), r++, l)
      : (n.exit("codeTextSequence"), a(h));
  }
  function a(h) {
    return h === null
      ? t(h)
      : h === 32
        ? (n.enter("space"), n.consume(h), n.exit("space"), a)
        : h === 96
          ? ((s = n.enter("codeTextSequence")), (i = 0), u(h))
          : z(h)
            ? (n.enter("lineEnding"), n.consume(h), n.exit("lineEnding"), a)
            : (n.enter("codeTextData"), c(h));
  }
  function c(h) {
    return h === null || h === 32 || h === 96 || z(h)
      ? (n.exit("codeTextData"), a(h))
      : (n.consume(h), c);
  }
  function u(h) {
    return h === 96
      ? (n.consume(h), i++, u)
      : i === r
        ? (n.exit("codeTextSequence"), n.exit("codeText"), e(h))
        : ((s.type = "codeTextData"), c(h));
  }
}
class Zd {
  constructor(e) {
    (this.left = e ? [...e] : []), (this.right = []);
  }
  get(e) {
    if (e < 0 || e >= this.left.length + this.right.length)
      throw new RangeError(
        "Cannot access index `" +
          e +
          "` in a splice buffer of size `" +
          (this.left.length + this.right.length) +
          "`",
      );
    return e < this.left.length
      ? this.left[e]
      : this.right[this.right.length - e + this.left.length - 1];
  }
  get length() {
    return this.left.length + this.right.length;
  }
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  slice(e, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length
      ? this.left.slice(e, r)
      : e > this.left.length
        ? this.right
            .slice(
              this.right.length - r + this.left.length,
              this.right.length - e + this.left.length,
            )
            .reverse()
        : this.left
            .slice(e)
            .concat(
              this.right
                .slice(this.right.length - r + this.left.length)
                .reverse(),
            );
  }
  splice(e, t, r) {
    const i = t || 0;
    this.setCursor(Math.trunc(e));
    const s = this.right.splice(
      this.right.length - i,
      Number.POSITIVE_INFINITY,
    );
    return r && rr(this.left, r), s.reverse();
  }
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  push(e) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(e);
  }
  pushMany(e) {
    this.setCursor(Number.POSITIVE_INFINITY), rr(this.left, e);
  }
  unshift(e) {
    this.setCursor(0), this.right.push(e);
  }
  unshiftMany(e) {
    this.setCursor(0), rr(this.right, e.reverse());
  }
  setCursor(e) {
    if (
      !(
        e === this.left.length ||
        (e > this.left.length && this.right.length === 0) ||
        (e < 0 && this.left.length === 0)
      )
    )
      if (e < this.left.length) {
        const t = this.left.splice(e, Number.POSITIVE_INFINITY);
        rr(this.right, t.reverse());
      } else {
        const t = this.right.splice(
          this.left.length + this.right.length - e,
          Number.POSITIVE_INFINITY,
        );
        rr(this.left, t.reverse());
      }
  }
}
function rr(n, e) {
  let t = 0;
  if (e.length < 1e4) n.push(...e);
  else for (; t < e.length; ) n.push(...e.slice(t, t + 1e4)), (t += 1e4);
}
function iu(n) {
  const e = {};
  let t = -1,
    r,
    i,
    s,
    o,
    l,
    a,
    c;
  const u = new Zd(n);
  for (; ++t < u.length; ) {
    for (; t in e; ) t = e[t];
    if (
      ((r = u.get(t)),
      t &&
        r[1].type === "chunkFlow" &&
        u.get(t - 1)[1].type === "listItemPrefix" &&
        ((a = r[1]._tokenizer.events),
        (s = 0),
        s < a.length && a[s][1].type === "lineEndingBlank" && (s += 2),
        s < a.length && a[s][1].type === "content"))
    )
      for (; ++s < a.length && a[s][1].type !== "content"; )
        a[s][1].type === "chunkText" &&
          ((a[s][1]._isInFirstContentOfListItem = !0), s++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, Xd(u, t)), (t = e[t]), (c = !0));
    else if (r[1]._container) {
      for (s = t, i = void 0; s--; )
        if (
          ((o = u.get(s)),
          o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
        )
          o[0] === "enter" &&
            (i && (u.get(i)[1].type = "lineEndingBlank"),
            (o[1].type = "lineEnding"),
            (i = s));
        else if (o[1].type !== "linePrefix") break;
      i &&
        ((r[1].end = { ...u.get(i)[1].start }),
        (l = u.slice(i, t)),
        l.unshift(r),
        u.splice(i, t - i + 1, l));
    }
  }
  return it(n, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function Xd(n, e) {
  const t = n.get(e)[1],
    r = n.get(e)[2];
  let i = e - 1;
  const s = [],
    o = t._tokenizer || r.parser[t.contentType](t.start),
    l = o.events,
    a = [],
    c = {};
  let u,
    h,
    d = -1,
    f = t,
    p = 0,
    y = 0;
  const x = [y];
  for (; f; ) {
    for (; n.get(++i)[1] !== f; );
    s.push(i),
      f._tokenizer ||
        ((u = r.sliceStream(f)),
        f.next || u.push(null),
        h && o.defineSkip(f.start),
        f._isInFirstContentOfListItem &&
          (o._gfmTasklistFirstContentOfListItem = !0),
        o.write(u),
        f._isInFirstContentOfListItem &&
          (o._gfmTasklistFirstContentOfListItem = void 0)),
      (h = f),
      (f = f.next);
  }
  for (f = t; ++d < l.length; )
    l[d][0] === "exit" &&
      l[d - 1][0] === "enter" &&
      l[d][1].type === l[d - 1][1].type &&
      l[d][1].start.line !== l[d][1].end.line &&
      ((y = d + 1),
      x.push(y),
      (f._tokenizer = void 0),
      (f.previous = void 0),
      (f = f.next));
  for (
    o.events = [],
      f ? ((f._tokenizer = void 0), (f.previous = void 0)) : x.pop(),
      d = x.length;
    d--;

  ) {
    const k = l.slice(x[d], x[d + 1]),
      E = s.pop();
    a.push([E, E + k.length - 1]), n.splice(E, 2, k);
  }
  for (a.reverse(), d = -1; ++d < a.length; )
    (c[p + a[d][0]] = p + a[d][1]), (p += a[d][1] - a[d][0] - 1);
  return c;
}
const ep = { resolve: np, tokenize: rp },
  tp = { partial: !0, tokenize: ip };
function np(n) {
  return iu(n), n;
}
function rp(n, e) {
  let t;
  return r;
  function r(l) {
    return (
      n.enter("content"),
      (t = n.enter("chunkContent", { contentType: "content" })),
      i(l)
    );
  }
  function i(l) {
    return l === null ? s(l) : z(l) ? n.check(tp, o, s)(l) : (n.consume(l), i);
  }
  function s(l) {
    return n.exit("chunkContent"), n.exit("content"), e(l);
  }
  function o(l) {
    return (
      n.consume(l),
      n.exit("chunkContent"),
      (t.next = n.enter("chunkContent", {
        contentType: "content",
        previous: t,
      })),
      (t = t.next),
      i
    );
  }
}
function ip(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return (
      n.exit("chunkContent"),
      n.enter("lineEnding"),
      n.consume(o),
      n.exit("lineEnding"),
      G(n, s, "linePrefix")
    );
  }
  function s(o) {
    if (o === null || z(o)) return t(o);
    const l = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") &&
      l &&
      l[1].type === "linePrefix" &&
      l[2].sliceSerialize(l[1], !0).length >= 4
      ? e(o)
      : n.interrupt(r.parser.constructs.flow, t, e)(o);
  }
}
function su(n, e, t, r, i, s, o, l, a) {
  const c = a || Number.POSITIVE_INFINITY;
  let u = 0;
  return h;
  function h(k) {
    return k === 60
      ? (n.enter(r), n.enter(i), n.enter(s), n.consume(k), n.exit(s), d)
      : k === null || k === 32 || k === 41 || Ys(k)
        ? t(k)
        : (n.enter(r),
          n.enter(o),
          n.enter(l),
          n.enter("chunkString", { contentType: "string" }),
          y(k));
  }
  function d(k) {
    return k === 62
      ? (n.enter(s), n.consume(k), n.exit(s), n.exit(i), n.exit(r), e)
      : (n.enter(l), n.enter("chunkString", { contentType: "string" }), f(k));
  }
  function f(k) {
    return k === 62
      ? (n.exit("chunkString"), n.exit(l), d(k))
      : k === null || k === 60 || z(k)
        ? t(k)
        : (n.consume(k), k === 92 ? p : f);
  }
  function p(k) {
    return k === 60 || k === 62 || k === 92 ? (n.consume(k), f) : f(k);
  }
  function y(k) {
    return !u && (k === null || k === 41 || Me(k))
      ? (n.exit("chunkString"), n.exit(l), n.exit(o), n.exit(r), e(k))
      : u < c && k === 40
        ? (n.consume(k), u++, y)
        : k === 41
          ? (n.consume(k), u--, y)
          : k === null || k === 32 || k === 40 || Ys(k)
            ? t(k)
            : (n.consume(k), k === 92 ? x : y);
  }
  function x(k) {
    return k === 40 || k === 41 || k === 92 ? (n.consume(k), y) : y(k);
  }
}
function ou(n, e, t, r, i, s) {
  const o = this;
  let l = 0,
    a;
  return c;
  function c(f) {
    return n.enter(r), n.enter(i), n.consume(f), n.exit(i), n.enter(s), u;
  }
  function u(f) {
    return l > 999 ||
      f === null ||
      f === 91 ||
      (f === 93 && !a) ||
      (f === 94 && !l && "_hiddenFootnoteSupport" in o.parser.constructs)
      ? t(f)
      : f === 93
        ? (n.exit(s), n.enter(i), n.consume(f), n.exit(i), n.exit(r), e)
        : z(f)
          ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), u)
          : (n.enter("chunkString", { contentType: "string" }), h(f));
  }
  function h(f) {
    return f === null || f === 91 || f === 93 || z(f) || l++ > 999
      ? (n.exit("chunkString"), u(f))
      : (n.consume(f), a || (a = !K(f)), f === 92 ? d : h);
  }
  function d(f) {
    return f === 91 || f === 92 || f === 93 ? (n.consume(f), l++, h) : h(f);
  }
}
function lu(n, e, t, r, i, s) {
  let o;
  return l;
  function l(d) {
    return d === 34 || d === 39 || d === 40
      ? (n.enter(r),
        n.enter(i),
        n.consume(d),
        n.exit(i),
        (o = d === 40 ? 41 : d),
        a)
      : t(d);
  }
  function a(d) {
    return d === o
      ? (n.enter(i), n.consume(d), n.exit(i), n.exit(r), e)
      : (n.enter(s), c(d));
  }
  function c(d) {
    return d === o
      ? (n.exit(s), a(o))
      : d === null
        ? t(d)
        : z(d)
          ? (n.enter("lineEnding"),
            n.consume(d),
            n.exit("lineEnding"),
            G(n, c, "linePrefix"))
          : (n.enter("chunkString", { contentType: "string" }), u(d));
  }
  function u(d) {
    return d === o || d === null || z(d)
      ? (n.exit("chunkString"), c(d))
      : (n.consume(d), d === 92 ? h : u);
  }
  function h(d) {
    return d === o || d === 92 ? (n.consume(d), u) : u(d);
  }
}
function Or(n, e) {
  let t;
  return r;
  function r(i) {
    return z(i)
      ? (n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), (t = !0), r)
      : K(i)
        ? G(n, r, t ? "linePrefix" : "lineSuffix")(i)
        : e(i);
  }
}
const sp = { name: "definition", tokenize: lp },
  op = { partial: !0, tokenize: ap };
function lp(n, e, t) {
  const r = this;
  let i;
  return s;
  function s(f) {
    return n.enter("definition"), o(f);
  }
  function o(f) {
    return ou.call(
      r,
      n,
      l,
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString",
    )(f);
  }
  function l(f) {
    return (
      (i = Bn(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))),
      f === 58
        ? (n.enter("definitionMarker"),
          n.consume(f),
          n.exit("definitionMarker"),
          a)
        : t(f)
    );
  }
  function a(f) {
    return Me(f) ? Or(n, c)(f) : c(f);
  }
  function c(f) {
    return su(
      n,
      u,
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString",
    )(f);
  }
  function u(f) {
    return n.attempt(op, h, h)(f);
  }
  function h(f) {
    return K(f) ? G(n, d, "whitespace")(f) : d(f);
  }
  function d(f) {
    return f === null || z(f)
      ? (n.exit("definition"), r.parser.defined.push(i), e(f))
      : t(f);
  }
}
function ap(n, e, t) {
  return r;
  function r(l) {
    return Me(l) ? Or(n, i)(l) : t(l);
  }
  function i(l) {
    return lu(
      n,
      s,
      t,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString",
    )(l);
  }
  function s(l) {
    return K(l) ? G(n, o, "whitespace")(l) : o(l);
  }
  function o(l) {
    return l === null || z(l) ? e(l) : t(l);
  }
}
const cp = { name: "hardBreakEscape", tokenize: up };
function up(n, e, t) {
  return r;
  function r(s) {
    return n.enter("hardBreakEscape"), n.consume(s), i;
  }
  function i(s) {
    return z(s) ? (n.exit("hardBreakEscape"), e(s)) : t(s);
  }
}
const hp = { name: "headingAtx", resolve: fp, tokenize: dp };
function fp(n, e) {
  let t = n.length - 2,
    r = 3,
    i,
    s;
  return (
    n[r][1].type === "whitespace" && (r += 2),
    t - 2 > r && n[t][1].type === "whitespace" && (t -= 2),
    n[t][1].type === "atxHeadingSequence" &&
      (r === t - 1 || (t - 4 > r && n[t - 2][1].type === "whitespace")) &&
      (t -= r + 1 === t ? 2 : 4),
    t > r &&
      ((i = { type: "atxHeadingText", start: n[r][1].start, end: n[t][1].end }),
      (s = {
        type: "chunkText",
        start: n[r][1].start,
        end: n[t][1].end,
        contentType: "text",
      }),
      it(n, r, t - r + 1, [
        ["enter", i, e],
        ["enter", s, e],
        ["exit", s, e],
        ["exit", i, e],
      ])),
    n
  );
}
function dp(n, e, t) {
  let r = 0;
  return i;
  function i(u) {
    return n.enter("atxHeading"), s(u);
  }
  function s(u) {
    return n.enter("atxHeadingSequence"), o(u);
  }
  function o(u) {
    return u === 35 && r++ < 6
      ? (n.consume(u), o)
      : u === null || Me(u)
        ? (n.exit("atxHeadingSequence"), l(u))
        : t(u);
  }
  function l(u) {
    return u === 35
      ? (n.enter("atxHeadingSequence"), a(u))
      : u === null || z(u)
        ? (n.exit("atxHeading"), e(u))
        : K(u)
          ? G(n, l, "whitespace")(u)
          : (n.enter("atxHeadingText"), c(u));
  }
  function a(u) {
    return u === 35 ? (n.consume(u), a) : (n.exit("atxHeadingSequence"), l(u));
  }
  function c(u) {
    return u === null || u === 35 || Me(u)
      ? (n.exit("atxHeadingText"), l(u))
      : (n.consume(u), c);
  }
}
const pp = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "search",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul",
  ],
  xa = ["pre", "script", "style", "textarea"],
  mp = { concrete: !0, name: "htmlFlow", resolveTo: kp, tokenize: xp },
  gp = { partial: !0, tokenize: Sp },
  yp = { partial: !0, tokenize: bp };
function kp(n) {
  let e = n.length;
  for (; e-- && !(n[e][0] === "enter" && n[e][1].type === "htmlFlow"); );
  return (
    e > 1 &&
      n[e - 2][1].type === "linePrefix" &&
      ((n[e][1].start = n[e - 2][1].start),
      (n[e + 1][1].start = n[e - 2][1].start),
      n.splice(e - 2, 2)),
    n
  );
}
function xp(n, e, t) {
  const r = this;
  let i, s, o, l, a;
  return c;
  function c(g) {
    return u(g);
  }
  function u(g) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(g), h;
  }
  function h(g) {
    return g === 33
      ? (n.consume(g), d)
      : g === 47
        ? (n.consume(g), (s = !0), y)
        : g === 63
          ? (n.consume(g), (i = 3), r.interrupt ? e : m)
          : tt(g)
            ? (n.consume(g), (o = String.fromCharCode(g)), x)
            : t(g);
  }
  function d(g) {
    return g === 45
      ? (n.consume(g), (i = 2), f)
      : g === 91
        ? (n.consume(g), (i = 5), (l = 0), p)
        : tt(g)
          ? (n.consume(g), (i = 4), r.interrupt ? e : m)
          : t(g);
  }
  function f(g) {
    return g === 45 ? (n.consume(g), r.interrupt ? e : m) : t(g);
  }
  function p(g) {
    const We = "CDATA[";
    return g === We.charCodeAt(l++)
      ? (n.consume(g), l === We.length ? (r.interrupt ? e : D) : p)
      : t(g);
  }
  function y(g) {
    return tt(g) ? (n.consume(g), (o = String.fromCharCode(g)), x) : t(g);
  }
  function x(g) {
    if (g === null || g === 47 || g === 62 || Me(g)) {
      const We = g === 47,
        Yt = o.toLowerCase();
      return !We && !s && xa.includes(Yt)
        ? ((i = 1), r.interrupt ? e(g) : D(g))
        : pp.includes(o.toLowerCase())
          ? ((i = 6), We ? (n.consume(g), k) : r.interrupt ? e(g) : D(g))
          : ((i = 7),
            r.interrupt && !r.parser.lazy[r.now().line]
              ? t(g)
              : s
                ? E(g)
                : N(g));
    }
    return g === 45 || _e(g)
      ? (n.consume(g), (o += String.fromCharCode(g)), x)
      : t(g);
  }
  function k(g) {
    return g === 62 ? (n.consume(g), r.interrupt ? e : D) : t(g);
  }
  function E(g) {
    return K(g) ? (n.consume(g), E) : V(g);
  }
  function N(g) {
    return g === 47
      ? (n.consume(g), V)
      : g === 58 || g === 95 || tt(g)
        ? (n.consume(g), F)
        : K(g)
          ? (n.consume(g), N)
          : V(g);
  }
  function F(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || _e(g)
      ? (n.consume(g), F)
      : $(g);
  }
  function $(g) {
    return g === 61 ? (n.consume(g), w) : K(g) ? (n.consume(g), $) : N(g);
  }
  function w(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96
      ? t(g)
      : g === 34 || g === 39
        ? (n.consume(g), (a = g), _)
        : K(g)
          ? (n.consume(g), w)
          : Q(g);
  }
  function _(g) {
    return g === a
      ? (n.consume(g), (a = null), O)
      : g === null || z(g)
        ? t(g)
        : (n.consume(g), _);
  }
  function Q(g) {
    return g === null ||
      g === 34 ||
      g === 39 ||
      g === 47 ||
      g === 60 ||
      g === 61 ||
      g === 62 ||
      g === 96 ||
      Me(g)
      ? $(g)
      : (n.consume(g), Q);
  }
  function O(g) {
    return g === 47 || g === 62 || K(g) ? N(g) : t(g);
  }
  function V(g) {
    return g === 62 ? (n.consume(g), A) : t(g);
  }
  function A(g) {
    return g === null || z(g) ? D(g) : K(g) ? (n.consume(g), A) : t(g);
  }
  function D(g) {
    return g === 45 && i === 2
      ? (n.consume(g), me)
      : g === 60 && i === 1
        ? (n.consume(g), ae)
        : g === 62 && i === 4
          ? (n.consume(g), Ve)
          : g === 63 && i === 3
            ? (n.consume(g), m)
            : g === 93 && i === 5
              ? (n.consume(g), lt)
              : z(g) && (i === 6 || i === 7)
                ? (n.exit("htmlFlowData"), n.check(gp, at, ee)(g))
                : g === null || z(g)
                  ? (n.exit("htmlFlowData"), ee(g))
                  : (n.consume(g), D);
  }
  function ee(g) {
    return n.check(yp, ie, at)(g);
  }
  function ie(g) {
    return n.enter("lineEnding"), n.consume(g), n.exit("lineEnding"), q;
  }
  function q(g) {
    return g === null || z(g) ? ee(g) : (n.enter("htmlFlowData"), D(g));
  }
  function me(g) {
    return g === 45 ? (n.consume(g), m) : D(g);
  }
  function ae(g) {
    return g === 47 ? (n.consume(g), (o = ""), $e) : D(g);
  }
  function $e(g) {
    if (g === 62) {
      const We = o.toLowerCase();
      return xa.includes(We) ? (n.consume(g), Ve) : D(g);
    }
    return tt(g) && o.length < 8
      ? (n.consume(g), (o += String.fromCharCode(g)), $e)
      : D(g);
  }
  function lt(g) {
    return g === 93 ? (n.consume(g), m) : D(g);
  }
  function m(g) {
    return g === 62
      ? (n.consume(g), Ve)
      : g === 45 && i === 2
        ? (n.consume(g), m)
        : D(g);
  }
  function Ve(g) {
    return g === null || z(g)
      ? (n.exit("htmlFlowData"), at(g))
      : (n.consume(g), Ve);
  }
  function at(g) {
    return n.exit("htmlFlow"), e(g);
  }
}
function bp(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return z(o)
      ? (n.enter("lineEnding"), n.consume(o), n.exit("lineEnding"), s)
      : t(o);
  }
  function s(o) {
    return r.parser.lazy[r.now().line] ? t(o) : e(o);
  }
}
function Sp(n, e, t) {
  return r;
  function r(i) {
    return (
      n.enter("lineEnding"),
      n.consume(i),
      n.exit("lineEnding"),
      n.attempt(Yi, e, t)
    );
  }
}
const wp = { name: "htmlText", tokenize: Cp };
function Cp(n, e, t) {
  const r = this;
  let i, s, o;
  return l;
  function l(m) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(m), a;
  }
  function a(m) {
    return m === 33
      ? (n.consume(m), c)
      : m === 47
        ? (n.consume(m), $)
        : m === 63
          ? (n.consume(m), N)
          : tt(m)
            ? (n.consume(m), Q)
            : t(m);
  }
  function c(m) {
    return m === 45
      ? (n.consume(m), u)
      : m === 91
        ? (n.consume(m), (s = 0), p)
        : tt(m)
          ? (n.consume(m), E)
          : t(m);
  }
  function u(m) {
    return m === 45 ? (n.consume(m), f) : t(m);
  }
  function h(m) {
    return m === null
      ? t(m)
      : m === 45
        ? (n.consume(m), d)
        : z(m)
          ? ((o = h), ae(m))
          : (n.consume(m), h);
  }
  function d(m) {
    return m === 45 ? (n.consume(m), f) : h(m);
  }
  function f(m) {
    return m === 62 ? me(m) : m === 45 ? d(m) : h(m);
  }
  function p(m) {
    const Ve = "CDATA[";
    return m === Ve.charCodeAt(s++)
      ? (n.consume(m), s === Ve.length ? y : p)
      : t(m);
  }
  function y(m) {
    return m === null
      ? t(m)
      : m === 93
        ? (n.consume(m), x)
        : z(m)
          ? ((o = y), ae(m))
          : (n.consume(m), y);
  }
  function x(m) {
    return m === 93 ? (n.consume(m), k) : y(m);
  }
  function k(m) {
    return m === 62 ? me(m) : m === 93 ? (n.consume(m), k) : y(m);
  }
  function E(m) {
    return m === null || m === 62
      ? me(m)
      : z(m)
        ? ((o = E), ae(m))
        : (n.consume(m), E);
  }
  function N(m) {
    return m === null
      ? t(m)
      : m === 63
        ? (n.consume(m), F)
        : z(m)
          ? ((o = N), ae(m))
          : (n.consume(m), N);
  }
  function F(m) {
    return m === 62 ? me(m) : N(m);
  }
  function $(m) {
    return tt(m) ? (n.consume(m), w) : t(m);
  }
  function w(m) {
    return m === 45 || _e(m) ? (n.consume(m), w) : _(m);
  }
  function _(m) {
    return z(m) ? ((o = _), ae(m)) : K(m) ? (n.consume(m), _) : me(m);
  }
  function Q(m) {
    return m === 45 || _e(m)
      ? (n.consume(m), Q)
      : m === 47 || m === 62 || Me(m)
        ? O(m)
        : t(m);
  }
  function O(m) {
    return m === 47
      ? (n.consume(m), me)
      : m === 58 || m === 95 || tt(m)
        ? (n.consume(m), V)
        : z(m)
          ? ((o = O), ae(m))
          : K(m)
            ? (n.consume(m), O)
            : me(m);
  }
  function V(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || _e(m)
      ? (n.consume(m), V)
      : A(m);
  }
  function A(m) {
    return m === 61
      ? (n.consume(m), D)
      : z(m)
        ? ((o = A), ae(m))
        : K(m)
          ? (n.consume(m), A)
          : O(m);
  }
  function D(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96
      ? t(m)
      : m === 34 || m === 39
        ? (n.consume(m), (i = m), ee)
        : z(m)
          ? ((o = D), ae(m))
          : K(m)
            ? (n.consume(m), D)
            : (n.consume(m), ie);
  }
  function ee(m) {
    return m === i
      ? (n.consume(m), (i = void 0), q)
      : m === null
        ? t(m)
        : z(m)
          ? ((o = ee), ae(m))
          : (n.consume(m), ee);
  }
  function ie(m) {
    return m === null ||
      m === 34 ||
      m === 39 ||
      m === 60 ||
      m === 61 ||
      m === 96
      ? t(m)
      : m === 47 || m === 62 || Me(m)
        ? O(m)
        : (n.consume(m), ie);
  }
  function q(m) {
    return m === 47 || m === 62 || Me(m) ? O(m) : t(m);
  }
  function me(m) {
    return m === 62
      ? (n.consume(m), n.exit("htmlTextData"), n.exit("htmlText"), e)
      : t(m);
  }
  function ae(m) {
    return (
      n.exit("htmlTextData"),
      n.enter("lineEnding"),
      n.consume(m),
      n.exit("lineEnding"),
      $e
    );
  }
  function $e(m) {
    return K(m)
      ? G(
          n,
          lt,
          "linePrefix",
          r.parser.constructs.disable.null.includes("codeIndented")
            ? void 0
            : 4,
        )(m)
      : lt(m);
  }
  function lt(m) {
    return n.enter("htmlTextData"), o(m);
  }
}
const zo = { name: "labelEnd", resolveAll: Op, resolveTo: Ip, tokenize: Ep },
  Mp = { tokenize: Ap },
  Np = { tokenize: Dp },
  Tp = { tokenize: Rp };
function Op(n) {
  let e = -1;
  const t = [];
  for (; ++e < n.length; ) {
    const r = n[e][1];
    if (
      (t.push(n[e]),
      r.type === "labelImage" ||
        r.type === "labelLink" ||
        r.type === "labelEnd")
    ) {
      const i = r.type === "labelImage" ? 4 : 2;
      (r.type = "data"), (e += i);
    }
  }
  return n.length !== t.length && it(n, 0, n.length, t), n;
}
function Ip(n, e) {
  let t = n.length,
    r = 0,
    i,
    s,
    o,
    l;
  for (; t--; )
    if (((i = n[t][1]), s)) {
      if (i.type === "link" || (i.type === "labelLink" && i._inactive)) break;
      n[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (
        n[t][0] === "enter" &&
        (i.type === "labelImage" || i.type === "labelLink") &&
        !i._balanced &&
        ((s = t), i.type !== "labelLink")
      ) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = t);
  const a = {
      type: n[s][1].type === "labelLink" ? "link" : "image",
      start: { ...n[s][1].start },
      end: { ...n[n.length - 1][1].end },
    },
    c = { type: "label", start: { ...n[s][1].start }, end: { ...n[o][1].end } },
    u = {
      type: "labelText",
      start: { ...n[s + r + 2][1].end },
      end: { ...n[o - 2][1].start },
    };
  return (
    (l = [
      ["enter", a, e],
      ["enter", c, e],
    ]),
    (l = Be(l, n.slice(s + 1, s + r + 3))),
    (l = Be(l, [["enter", u, e]])),
    (l = Be(
      l,
      Ro(e.parser.constructs.insideSpan.null, n.slice(s + r + 4, o - 3), e),
    )),
    (l = Be(l, [["exit", u, e], n[o - 2], n[o - 1], ["exit", c, e]])),
    (l = Be(l, n.slice(o + 1))),
    (l = Be(l, [["exit", a, e]])),
    it(n, s, n.length, l),
    n
  );
}
function Ep(n, e, t) {
  const r = this;
  let i = r.events.length,
    s,
    o;
  for (; i--; )
    if (
      (r.events[i][1].type === "labelImage" ||
        r.events[i][1].type === "labelLink") &&
      !r.events[i][1]._balanced
    ) {
      s = r.events[i][1];
      break;
    }
  return l;
  function l(d) {
    return s
      ? s._inactive
        ? h(d)
        : ((o = r.parser.defined.includes(
            Bn(r.sliceSerialize({ start: s.end, end: r.now() })),
          )),
          n.enter("labelEnd"),
          n.enter("labelMarker"),
          n.consume(d),
          n.exit("labelMarker"),
          n.exit("labelEnd"),
          a)
      : t(d);
  }
  function a(d) {
    return d === 40
      ? n.attempt(Mp, u, o ? u : h)(d)
      : d === 91
        ? n.attempt(Np, u, o ? c : h)(d)
        : o
          ? u(d)
          : h(d);
  }
  function c(d) {
    return n.attempt(Tp, u, h)(d);
  }
  function u(d) {
    return e(d);
  }
  function h(d) {
    return (s._balanced = !0), t(d);
  }
}
function Ap(n, e, t) {
  return r;
  function r(h) {
    return (
      n.enter("resource"),
      n.enter("resourceMarker"),
      n.consume(h),
      n.exit("resourceMarker"),
      i
    );
  }
  function i(h) {
    return Me(h) ? Or(n, s)(h) : s(h);
  }
  function s(h) {
    return h === 41
      ? u(h)
      : su(
          n,
          o,
          l,
          "resourceDestination",
          "resourceDestinationLiteral",
          "resourceDestinationLiteralMarker",
          "resourceDestinationRaw",
          "resourceDestinationString",
          32,
        )(h);
  }
  function o(h) {
    return Me(h) ? Or(n, a)(h) : u(h);
  }
  function l(h) {
    return t(h);
  }
  function a(h) {
    return h === 34 || h === 39 || h === 40
      ? lu(
          n,
          c,
          t,
          "resourceTitle",
          "resourceTitleMarker",
          "resourceTitleString",
        )(h)
      : u(h);
  }
  function c(h) {
    return Me(h) ? Or(n, u)(h) : u(h);
  }
  function u(h) {
    return h === 41
      ? (n.enter("resourceMarker"),
        n.consume(h),
        n.exit("resourceMarker"),
        n.exit("resource"),
        e)
      : t(h);
  }
}
function Dp(n, e, t) {
  const r = this;
  return i;
  function i(l) {
    return ou.call(
      r,
      n,
      s,
      o,
      "reference",
      "referenceMarker",
      "referenceString",
    )(l);
  }
  function s(l) {
    return r.parser.defined.includes(
      Bn(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)),
    )
      ? e(l)
      : t(l);
  }
  function o(l) {
    return t(l);
  }
}
function Rp(n, e, t) {
  return r;
  function r(s) {
    return (
      n.enter("reference"),
      n.enter("referenceMarker"),
      n.consume(s),
      n.exit("referenceMarker"),
      i
    );
  }
  function i(s) {
    return s === 93
      ? (n.enter("referenceMarker"),
        n.consume(s),
        n.exit("referenceMarker"),
        n.exit("reference"),
        e)
      : t(s);
  }
}
const zp = { name: "labelStartImage", resolveAll: zo.resolveAll, tokenize: Pp };
function Pp(n, e, t) {
  const r = this;
  return i;
  function i(l) {
    return (
      n.enter("labelImage"),
      n.enter("labelImageMarker"),
      n.consume(l),
      n.exit("labelImageMarker"),
      s
    );
  }
  function s(l) {
    return l === 91
      ? (n.enter("labelMarker"),
        n.consume(l),
        n.exit("labelMarker"),
        n.exit("labelImage"),
        o)
      : t(l);
  }
  function o(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
      ? t(l)
      : e(l);
  }
}
const Bp = { name: "labelStartLink", resolveAll: zo.resolveAll, tokenize: vp };
function vp(n, e, t) {
  const r = this;
  return i;
  function i(o) {
    return (
      n.enter("labelLink"),
      n.enter("labelMarker"),
      n.consume(o),
      n.exit("labelMarker"),
      n.exit("labelLink"),
      s
    );
  }
  function s(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
      ? t(o)
      : e(o);
  }
}
const fs = { name: "lineEnding", tokenize: Fp };
function Fp(n, e) {
  return t;
  function t(r) {
    return (
      n.enter("lineEnding"),
      n.consume(r),
      n.exit("lineEnding"),
      G(n, e, "linePrefix")
    );
  }
}
const di = { name: "thematicBreak", tokenize: Lp };
function Lp(n, e, t) {
  let r = 0,
    i;
  return s;
  function s(c) {
    return n.enter("thematicBreak"), o(c);
  }
  function o(c) {
    return (i = c), l(c);
  }
  function l(c) {
    return c === i
      ? (n.enter("thematicBreakSequence"), a(c))
      : r >= 3 && (c === null || z(c))
        ? (n.exit("thematicBreak"), e(c))
        : t(c);
  }
  function a(c) {
    return c === i
      ? (n.consume(c), r++, a)
      : (n.exit("thematicBreakSequence"),
        K(c) ? G(n, l, "whitespace")(c) : l(c));
  }
}
const Ce = {
    continuation: { tokenize: qp },
    exit: _p,
    name: "list",
    tokenize: Wp,
  },
  $p = { partial: !0, tokenize: jp },
  Vp = { partial: !0, tokenize: Hp };
function Wp(n, e, t) {
  const r = this,
    i = r.events[r.events.length - 1];
  let s =
      i && i[1].type === "linePrefix"
        ? i[2].sliceSerialize(i[1], !0).length
        : 0,
    o = 0;
  return l;
  function l(f) {
    const p =
      r.containerState.type ||
      (f === 42 || f === 43 || f === 45 ? "listUnordered" : "listOrdered");
    if (
      p === "listUnordered"
        ? !r.containerState.marker || f === r.containerState.marker
        : Gs(f)
    ) {
      if (
        (r.containerState.type ||
          ((r.containerState.type = p), n.enter(p, { _container: !0 })),
        p === "listUnordered")
      )
        return (
          n.enter("listItemPrefix"),
          f === 42 || f === 45 ? n.check(di, t, c)(f) : c(f)
        );
      if (!r.interrupt || f === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), a(f);
    }
    return t(f);
  }
  function a(f) {
    return Gs(f) && ++o < 10
      ? (n.consume(f), a)
      : (!r.interrupt || o < 2) &&
          (r.containerState.marker
            ? f === r.containerState.marker
            : f === 41 || f === 46)
        ? (n.exit("listItemValue"), c(f))
        : t(f);
  }
  function c(f) {
    return (
      n.enter("listItemMarker"),
      n.consume(f),
      n.exit("listItemMarker"),
      (r.containerState.marker = r.containerState.marker || f),
      n.check(Yi, r.interrupt ? t : u, n.attempt($p, d, h))
    );
  }
  function u(f) {
    return (r.containerState.initialBlankLine = !0), s++, d(f);
  }
  function h(f) {
    return K(f)
      ? (n.enter("listItemPrefixWhitespace"),
        n.consume(f),
        n.exit("listItemPrefixWhitespace"),
        d)
      : t(f);
  }
  function d(f) {
    return (
      (r.containerState.size =
        s + r.sliceSerialize(n.exit("listItemPrefix"), !0).length),
      e(f)
    );
  }
}
function qp(n, e, t) {
  const r = this;
  return (r.containerState._closeFlow = void 0), n.check(Yi, i, s);
  function i(l) {
    return (
      (r.containerState.furtherBlankLines =
        r.containerState.furtherBlankLines ||
        r.containerState.initialBlankLine),
      G(n, e, "listItemIndent", r.containerState.size + 1)(l)
    );
  }
  function s(l) {
    return r.containerState.furtherBlankLines || !K(l)
      ? ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        o(l))
      : ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        n.attempt(Vp, e, o)(l));
  }
  function o(l) {
    return (
      (r.containerState._closeFlow = !0),
      (r.interrupt = void 0),
      G(
        n,
        n.attempt(Ce, e, t),
        "linePrefix",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
      )(l)
    );
  }
}
function Hp(n, e, t) {
  const r = this;
  return G(n, i, "listItemIndent", r.containerState.size + 1);
  function i(s) {
    const o = r.events[r.events.length - 1];
    return o &&
      o[1].type === "listItemIndent" &&
      o[2].sliceSerialize(o[1], !0).length === r.containerState.size
      ? e(s)
      : t(s);
  }
}
function _p(n) {
  n.exit(this.containerState.type);
}
function jp(n, e, t) {
  const r = this;
  return G(
    n,
    i,
    "listItemPrefixWhitespace",
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5,
  );
  function i(s) {
    const o = r.events[r.events.length - 1];
    return !K(s) && o && o[1].type === "listItemPrefixWhitespace" ? e(s) : t(s);
  }
}
const ba = { name: "setextUnderline", resolveTo: Kp, tokenize: Jp };
function Kp(n, e) {
  let t = n.length,
    r,
    i,
    s;
  for (; t--; )
    if (n[t][0] === "enter") {
      if (n[t][1].type === "content") {
        r = t;
        break;
      }
      n[t][1].type === "paragraph" && (i = t);
    } else
      n[t][1].type === "content" && n.splice(t, 1),
        !s && n[t][1].type === "definition" && (s = t);
  const o = {
    type: "setextHeading",
    start: { ...n[i][1].start },
    end: { ...n[n.length - 1][1].end },
  };
  return (
    (n[i][1].type = "setextHeadingText"),
    s
      ? (n.splice(i, 0, ["enter", o, e]),
        n.splice(s + 1, 0, ["exit", n[r][1], e]),
        (n[r][1].end = { ...n[s][1].end }))
      : (n[r][1] = o),
    n.push(["exit", o, e]),
    n
  );
}
function Jp(n, e, t) {
  const r = this;
  let i;
  return s;
  function s(c) {
    let u = r.events.length,
      h;
    for (; u--; )
      if (
        r.events[u][1].type !== "lineEnding" &&
        r.events[u][1].type !== "linePrefix" &&
        r.events[u][1].type !== "content"
      ) {
        h = r.events[u][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || h)
      ? (n.enter("setextHeadingLine"), (i = c), o(c))
      : t(c);
  }
  function o(c) {
    return n.enter("setextHeadingLineSequence"), l(c);
  }
  function l(c) {
    return c === i
      ? (n.consume(c), l)
      : (n.exit("setextHeadingLineSequence"),
        K(c) ? G(n, a, "lineSuffix")(c) : a(c));
  }
  function a(c) {
    return c === null || z(c) ? (n.exit("setextHeadingLine"), e(c)) : t(c);
  }
}
const Up = { tokenize: Yp };
function Yp(n) {
  const e = this,
    t = n.attempt(
      Yi,
      r,
      n.attempt(
        this.parser.constructs.flowInitial,
        i,
        G(
          n,
          n.attempt(this.parser.constructs.flow, i, n.attempt(ep, i)),
          "linePrefix",
        ),
      ),
    );
  return t;
  function r(s) {
    if (s === null) {
      n.consume(s);
      return;
    }
    return (
      n.enter("lineEndingBlank"),
      n.consume(s),
      n.exit("lineEndingBlank"),
      (e.currentConstruct = void 0),
      t
    );
  }
  function i(s) {
    if (s === null) {
      n.consume(s);
      return;
    }
    return (
      n.enter("lineEnding"),
      n.consume(s),
      n.exit("lineEnding"),
      (e.currentConstruct = void 0),
      t
    );
  }
}
const Gp = { resolveAll: cu() },
  Qp = au("string"),
  Zp = au("text");
function au(n) {
  return { resolveAll: cu(n === "text" ? Xp : void 0), tokenize: e };
  function e(t) {
    const r = this,
      i = this.parser.constructs[n],
      s = t.attempt(i, o, l);
    return o;
    function o(u) {
      return c(u) ? s(u) : l(u);
    }
    function l(u) {
      if (u === null) {
        t.consume(u);
        return;
      }
      return t.enter("data"), t.consume(u), a;
    }
    function a(u) {
      return c(u) ? (t.exit("data"), s(u)) : (t.consume(u), a);
    }
    function c(u) {
      if (u === null) return !0;
      const h = i[u];
      let d = -1;
      if (h)
        for (; ++d < h.length; ) {
          const f = h[d];
          if (!f.previous || f.previous.call(r, r.previous)) return !0;
        }
      return !1;
    }
  }
}
function cu(n) {
  return e;
  function e(t, r) {
    let i = -1,
      s;
    for (; ++i <= t.length; )
      s === void 0
        ? t[i] && t[i][1].type === "data" && ((s = i), i++)
        : (!t[i] || t[i][1].type !== "data") &&
          (i !== s + 2 &&
            ((t[s][1].end = t[i - 1][1].end),
            t.splice(s + 2, i - s - 2),
            (i = s + 2)),
          (s = void 0));
    return n ? n(t, r) : t;
  }
}
function Xp(n, e) {
  let t = 0;
  for (; ++t <= n.length; )
    if (
      (t === n.length || n[t][1].type === "lineEnding") &&
      n[t - 1][1].type === "data"
    ) {
      const r = n[t - 1][1],
        i = e.sliceStream(r);
      let s = i.length,
        o = -1,
        l = 0,
        a;
      for (; s--; ) {
        const c = i[s];
        if (typeof c == "string") {
          for (o = c.length; c.charCodeAt(o - 1) === 32; ) l++, o--;
          if (o) break;
          o = -1;
        } else if (c === -2) (a = !0), l++;
        else if (c !== -1) {
          s++;
          break;
        }
      }
      if (l) {
        const c = {
          type:
            t === n.length || a || l < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: s ? o : r.start._bufferIndex + o,
            _index: r.start._index + s,
            line: r.end.line,
            column: r.end.column - l,
            offset: r.end.offset - l,
          },
          end: { ...r.end },
        };
        (r.end = { ...c.start }),
          r.start.offset === r.end.offset
            ? Object.assign(r, c)
            : (n.splice(t, 0, ["enter", c, e], ["exit", c, e]), (t += 2));
      }
      t++;
    }
  return n;
}
const em = {
    42: Ce,
    43: Ce,
    45: Ce,
    48: Ce,
    49: Ce,
    50: Ce,
    51: Ce,
    52: Ce,
    53: Ce,
    54: Ce,
    55: Ce,
    56: Ce,
    57: Ce,
    62: tu,
  },
  tm = { 91: sp },
  nm = { [-2]: hs, [-1]: hs, 32: hs },
  rm = {
    35: hp,
    42: di,
    45: [ba, di],
    60: mp,
    61: ba,
    95: di,
    96: ka,
    126: ka,
  },
  im = { 38: ru, 92: nu },
  sm = {
    [-5]: fs,
    [-4]: fs,
    [-3]: fs,
    33: zp,
    38: ru,
    42: Qs,
    60: [Bd, wp],
    91: Bp,
    92: [cp, nu],
    93: zo,
    95: Qs,
    96: Ud,
  },
  om = { null: [Qs, Gp] },
  lm = { null: [42, 95] },
  am = { null: [] },
  cm = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        attentionMarkers: lm,
        contentInitial: tm,
        disable: am,
        document: em,
        flow: rm,
        flowInitial: nm,
        insideSpan: om,
        string: im,
        text: sm,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  );
function um(n, e, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: (t && t.line) || 1,
    column: (t && t.column) || 1,
    offset: (t && t.offset) || 0,
  };
  const i = {},
    s = [];
  let o = [],
    l = [];
  const a = {
      attempt: _($),
      check: _(w),
      consume: E,
      enter: N,
      exit: F,
      interrupt: _(w, { interrupt: !0 }),
    },
    c = {
      code: null,
      containerState: {},
      defineSkip: y,
      events: [],
      now: p,
      parser: n,
      previous: null,
      sliceSerialize: d,
      sliceStream: f,
      write: h,
    };
  let u = e.tokenize.call(c, a);
  return e.resolveAll && s.push(e), c;
  function h(A) {
    return (
      (o = Be(o, A)),
      x(),
      o[o.length - 1] !== null
        ? []
        : (Q(e, 0), (c.events = Ro(s, c.events, c)), c.events)
    );
  }
  function d(A, D) {
    return fm(f(A), D);
  }
  function f(A) {
    return hm(o, A);
  }
  function p() {
    const { _bufferIndex: A, _index: D, line: ee, column: ie, offset: q } = r;
    return { _bufferIndex: A, _index: D, line: ee, column: ie, offset: q };
  }
  function y(A) {
    (i[A.line] = A.column), V();
  }
  function x() {
    let A;
    for (; r._index < o.length; ) {
      const D = o[r._index];
      if (typeof D == "string")
        for (
          A = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0);
          r._index === A && r._bufferIndex < D.length;

        )
          k(D.charCodeAt(r._bufferIndex));
      else k(D);
    }
  }
  function k(A) {
    u = u(A);
  }
  function E(A) {
    z(A)
      ? (r.line++, (r.column = 1), (r.offset += A === -3 ? 2 : 1), V())
      : A !== -1 && (r.column++, r.offset++),
      r._bufferIndex < 0
        ? r._index++
        : (r._bufferIndex++,
          r._bufferIndex === o[r._index].length &&
            ((r._bufferIndex = -1), r._index++)),
      (c.previous = A);
  }
  function N(A, D) {
    const ee = D || {};
    return (
      (ee.type = A),
      (ee.start = p()),
      c.events.push(["enter", ee, c]),
      l.push(ee),
      ee
    );
  }
  function F(A) {
    const D = l.pop();
    return (D.end = p()), c.events.push(["exit", D, c]), D;
  }
  function $(A, D) {
    Q(A, D.from);
  }
  function w(A, D) {
    D.restore();
  }
  function _(A, D) {
    return ee;
    function ee(ie, q, me) {
      let ae, $e, lt, m;
      return Array.isArray(ie) ? at(ie) : "tokenize" in ie ? at([ie]) : Ve(ie);
      function Ve(ce) {
        return er;
        function er(St) {
          const bn = St !== null && ce[St],
            Sn = St !== null && ce.null,
            ni = [
              ...(Array.isArray(bn) ? bn : bn ? [bn] : []),
              ...(Array.isArray(Sn) ? Sn : Sn ? [Sn] : []),
            ];
          return at(ni)(St);
        }
      }
      function at(ce) {
        return (ae = ce), ($e = 0), ce.length === 0 ? me : g(ce[$e]);
      }
      function g(ce) {
        return er;
        function er(St) {
          return (
            (m = O()),
            (lt = ce),
            ce.partial || (c.currentConstruct = ce),
            ce.name && c.parser.constructs.disable.null.includes(ce.name)
              ? Yt()
              : ce.tokenize.call(
                  D ? Object.assign(Object.create(c), D) : c,
                  a,
                  We,
                  Yt,
                )(St)
          );
        }
      }
      function We(ce) {
        return A(lt, m), q;
      }
      function Yt(ce) {
        return m.restore(), ++$e < ae.length ? g(ae[$e]) : me;
      }
    }
  }
  function Q(A, D) {
    A.resolveAll && !s.includes(A) && s.push(A),
      A.resolve &&
        it(c.events, D, c.events.length - D, A.resolve(c.events.slice(D), c)),
      A.resolveTo && (c.events = A.resolveTo(c.events, c));
  }
  function O() {
    const A = p(),
      D = c.previous,
      ee = c.currentConstruct,
      ie = c.events.length,
      q = Array.from(l);
    return { from: ie, restore: me };
    function me() {
      (r = A),
        (c.previous = D),
        (c.currentConstruct = ee),
        (c.events.length = ie),
        (l = q),
        V();
    }
  }
  function V() {
    r.line in i &&
      r.column < 2 &&
      ((r.column = i[r.line]), (r.offset += i[r.line] - 1));
  }
}
function hm(n, e) {
  const t = e.start._index,
    r = e.start._bufferIndex,
    i = e.end._index,
    s = e.end._bufferIndex;
  let o;
  if (t === i) o = [n[t].slice(r, s)];
  else {
    if (((o = n.slice(t, i)), r > -1)) {
      const l = o[0];
      typeof l == "string" ? (o[0] = l.slice(r)) : o.shift();
    }
    s > 0 && o.push(n[i].slice(0, s));
  }
  return o;
}
function fm(n, e) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < n.length; ) {
    const s = n[t];
    let o;
    if (typeof s == "string") o = s;
    else
      switch (s) {
        case -5: {
          o = "\r";
          break;
        }
        case -4: {
          o = `
`;
          break;
        }
        case -3: {
          o = `\r
`;
          break;
        }
        case -2: {
          o = e ? " " : "	";
          break;
        }
        case -1: {
          if (!e && i) continue;
          o = " ";
          break;
        }
        default:
          o = String.fromCharCode(s);
      }
    (i = s === -2), r.push(o);
  }
  return r.join("");
}
function dm(n) {
  const r = {
    constructs: bd([cm, ...((n || {}).extensions || [])]),
    content: i(Id),
    defined: [],
    document: i(Ad),
    flow: i(Up),
    lazy: {},
    string: i(Qp),
    text: i(Zp),
  };
  return r;
  function i(s) {
    return o;
    function o(l) {
      return um(r, s, l);
    }
  }
}
function pm(n) {
  for (; !iu(n); );
  return n;
}
const Sa = /[\0\t\n\r]/g;
function mm() {
  let n = 1,
    e = "",
    t = !0,
    r;
  return i;
  function i(s, o, l) {
    const a = [];
    let c, u, h, d, f;
    for (
      s =
        e +
        (typeof s == "string"
          ? s.toString()
          : new TextDecoder(o || void 0).decode(s)),
        h = 0,
        e = "",
        t && (s.charCodeAt(0) === 65279 && h++, (t = void 0));
      h < s.length;

    ) {
      if (
        ((Sa.lastIndex = h),
        (c = Sa.exec(s)),
        (d = c && c.index !== void 0 ? c.index : s.length),
        (f = s.charCodeAt(d)),
        !c)
      ) {
        e = s.slice(h);
        break;
      }
      if (f === 10 && h === d && r) a.push(-3), (r = void 0);
      else
        switch (
          (r && (a.push(-5), (r = void 0)),
          h < d && (a.push(s.slice(h, d)), (n += d - h)),
          f)
        ) {
          case 0: {
            a.push(65533), n++;
            break;
          }
          case 9: {
            for (u = Math.ceil(n / 4) * 4, a.push(-2); n++ < u; ) a.push(-1);
            break;
          }
          case 10: {
            a.push(-4), (n = 1);
            break;
          }
          default:
            (r = !0), (n = 1);
        }
      h = d + 1;
    }
    return l && (r && a.push(-5), e && a.push(e), a.push(null)), a;
  }
}
const gm = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function uu(n) {
  return n.replace(gm, ym);
}
function ym(n, e, t) {
  if (e) return e;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1),
      s = i === 120 || i === 88;
    return eu(t.slice(s ? 2 : 1), s ? 16 : 10);
  }
  return Do(t) || n;
}
function Ir(n) {
  return !n || typeof n != "object"
    ? ""
    : "position" in n || "type" in n
      ? wa(n.position)
      : "start" in n || "end" in n
        ? wa(n)
        : "line" in n || "column" in n
          ? Zs(n)
          : "";
}
function Zs(n) {
  return Ca(n && n.line) + ":" + Ca(n && n.column);
}
function wa(n) {
  return Zs(n && n.start) + "-" + Zs(n && n.end);
}
function Ca(n) {
  return n && typeof n == "number" ? n : 1;
}
const hu = {}.hasOwnProperty;
function km(n, e, t) {
  return (
    typeof e != "string" && ((t = e), (e = void 0)),
    xm(t)(
      pm(
        dm(t)
          .document()
          .write(mm()(n, e, !0)),
      ),
    )
  );
}
function xm(n) {
  const e = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: s(Xl),
      autolinkProtocol: O,
      autolinkEmail: O,
      atxHeading: s(Gl),
      blockQuote: s(Sn),
      characterEscape: O,
      characterReference: O,
      codeFenced: s(ni),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: s(ni, o),
      codeText: s(Sf, o),
      codeTextData: O,
      data: O,
      codeFlowValue: O,
      definition: s(wf),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: s(Cf),
      hardBreakEscape: s(Ql),
      hardBreakTrailing: s(Ql),
      htmlFlow: s(Zl, o),
      htmlFlowData: O,
      htmlText: s(Zl, o),
      htmlTextData: O,
      image: s(Mf),
      label: o,
      link: s(Xl),
      listItem: s(Nf),
      listItemValue: d,
      listOrdered: s(ea, h),
      listUnordered: s(ea),
      paragraph: s(Tf),
      reference: g,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: s(Gl),
      strong: s(Of),
      thematicBreak: s(Ef),
    },
    exit: {
      atxHeading: a(),
      atxHeadingSequence: $,
      autolink: a(),
      autolinkEmail: bn,
      autolinkProtocol: St,
      blockQuote: a(),
      characterEscapeValue: V,
      characterReferenceMarkerHexadecimal: Yt,
      characterReferenceMarkerNumeric: Yt,
      characterReferenceValue: ce,
      characterReference: er,
      codeFenced: a(x),
      codeFencedFence: y,
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: p,
      codeFlowValue: V,
      codeIndented: a(k),
      codeText: a(q),
      codeTextData: V,
      data: V,
      definition: a(),
      definitionDestinationString: F,
      definitionLabelString: E,
      definitionTitleString: N,
      emphasis: a(),
      hardBreakEscape: a(D),
      hardBreakTrailing: a(D),
      htmlFlow: a(ee),
      htmlFlowData: V,
      htmlText: a(ie),
      htmlTextData: V,
      image: a(ae),
      label: lt,
      labelText: $e,
      lineEnding: A,
      link: a(me),
      listItem: a(),
      listOrdered: a(),
      listUnordered: a(),
      paragraph: a(),
      referenceString: We,
      resourceDestinationString: m,
      resourceTitleString: Ve,
      resource: at,
      setextHeading: a(Q),
      setextHeadingLineSequence: _,
      setextHeadingText: w,
      strong: a(),
      thematicBreak: a(),
    },
  };
  fu(e, (n || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(b) {
    let M = { type: "root", children: [] };
    const B = {
        stack: [M],
        tokenStack: [],
        config: e,
        enter: l,
        exit: c,
        buffer: o,
        resume: u,
        data: t,
      },
      L = [];
    let Y = -1;
    for (; ++Y < b.length; )
      if (b[Y][1].type === "listOrdered" || b[Y][1].type === "listUnordered")
        if (b[Y][0] === "enter") L.push(Y);
        else {
          const qe = L.pop();
          Y = i(b, qe, Y);
        }
    for (Y = -1; ++Y < b.length; ) {
      const qe = e[b[Y][0]];
      hu.call(qe, b[Y][1].type) &&
        qe[b[Y][1].type].call(
          Object.assign({ sliceSerialize: b[Y][2].sliceSerialize }, B),
          b[Y][1],
        );
    }
    if (B.tokenStack.length > 0) {
      const qe = B.tokenStack[B.tokenStack.length - 1];
      (qe[1] || Ma).call(B, void 0, qe[0]);
    }
    for (
      M.position = {
        start: wt(
          b.length > 0 ? b[0][1].start : { line: 1, column: 1, offset: 0 },
        ),
        end: wt(
          b.length > 0
            ? b[b.length - 2][1].end
            : { line: 1, column: 1, offset: 0 },
        ),
      },
        Y = -1;
      ++Y < e.transforms.length;

    )
      M = e.transforms[Y](M) || M;
    return M;
  }
  function i(b, M, B) {
    let L = M - 1,
      Y = -1,
      qe = !1,
      Gt,
      ct,
      tr,
      nr;
    for (; ++L <= B; ) {
      const Oe = b[L];
      switch (Oe[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Oe[0] === "enter" ? Y++ : Y--, (nr = void 0);
          break;
        }
        case "lineEndingBlank": {
          Oe[0] === "enter" &&
            (Gt && !nr && !Y && !tr && (tr = L), (nr = void 0));
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          nr = void 0;
      }
      if (
        (!Y && Oe[0] === "enter" && Oe[1].type === "listItemPrefix") ||
        (Y === -1 &&
          Oe[0] === "exit" &&
          (Oe[1].type === "listUnordered" || Oe[1].type === "listOrdered"))
      ) {
        if (Gt) {
          let wn = L;
          for (ct = void 0; wn--; ) {
            const ut = b[wn];
            if (
              ut[1].type === "lineEnding" ||
              ut[1].type === "lineEndingBlank"
            ) {
              if (ut[0] === "exit") continue;
              ct && ((b[ct][1].type = "lineEndingBlank"), (qe = !0)),
                (ut[1].type = "lineEnding"),
                (ct = wn);
            } else if (
              !(
                ut[1].type === "linePrefix" ||
                ut[1].type === "blockQuotePrefix" ||
                ut[1].type === "blockQuotePrefixWhitespace" ||
                ut[1].type === "blockQuoteMarker" ||
                ut[1].type === "listItemIndent"
              )
            )
              break;
          }
          tr && (!ct || tr < ct) && (Gt._spread = !0),
            (Gt.end = Object.assign({}, ct ? b[ct][1].start : Oe[1].end)),
            b.splice(ct || L, 0, ["exit", Gt, Oe[2]]),
            L++,
            B++;
        }
        if (Oe[1].type === "listItemPrefix") {
          const wn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Oe[1].start),
            end: void 0,
          };
          (Gt = wn),
            b.splice(L, 0, ["enter", wn, Oe[2]]),
            L++,
            B++,
            (tr = void 0),
            (nr = !0);
        }
      }
    }
    return (b[M][1]._spread = qe), B;
  }
  function s(b, M) {
    return B;
    function B(L) {
      l.call(this, b(L), L), M && M.call(this, L);
    }
  }
  function o() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function l(b, M, B) {
    this.stack[this.stack.length - 1].children.push(b),
      this.stack.push(b),
      this.tokenStack.push([M, B || void 0]),
      (b.position = { start: wt(M.start), end: void 0 });
  }
  function a(b) {
    return M;
    function M(B) {
      b && b.call(this, B), c.call(this, B);
    }
  }
  function c(b, M) {
    const B = this.stack.pop(),
      L = this.tokenStack.pop();
    if (L)
      L[0].type !== b.type &&
        (M ? M.call(this, b, L[0]) : (L[1] || Ma).call(this, b, L[0]));
    else
      throw new Error(
        "Cannot close `" +
          b.type +
          "` (" +
          Ir({ start: b.start, end: b.end }) +
          "): it’s not open",
      );
    B.position.end = wt(b.end);
  }
  function u() {
    return Ao(this.stack.pop());
  }
  function h() {
    this.data.expectingFirstListItemValue = !0;
  }
  function d(b) {
    if (this.data.expectingFirstListItemValue) {
      const M = this.stack[this.stack.length - 2];
      (M.start = Number.parseInt(this.sliceSerialize(b), 10)),
        (this.data.expectingFirstListItemValue = void 0);
    }
  }
  function f() {
    const b = this.resume(),
      M = this.stack[this.stack.length - 1];
    M.lang = b;
  }
  function p() {
    const b = this.resume(),
      M = this.stack[this.stack.length - 1];
    M.meta = b;
  }
  function y() {
    this.data.flowCodeInside ||
      (this.buffer(), (this.data.flowCodeInside = !0));
  }
  function x() {
    const b = this.resume(),
      M = this.stack[this.stack.length - 1];
    (M.value = b.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "")),
      (this.data.flowCodeInside = void 0);
  }
  function k() {
    const b = this.resume(),
      M = this.stack[this.stack.length - 1];
    M.value = b.replace(/(\r?\n|\r)$/g, "");
  }
  function E(b) {
    const M = this.resume(),
      B = this.stack[this.stack.length - 1];
    (B.label = M), (B.identifier = Bn(this.sliceSerialize(b)).toLowerCase());
  }
  function N() {
    const b = this.resume(),
      M = this.stack[this.stack.length - 1];
    M.title = b;
  }
  function F() {
    const b = this.resume(),
      M = this.stack[this.stack.length - 1];
    M.url = b;
  }
  function $(b) {
    const M = this.stack[this.stack.length - 1];
    if (!M.depth) {
      const B = this.sliceSerialize(b).length;
      M.depth = B;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function _(b) {
    const M = this.stack[this.stack.length - 1];
    M.depth = this.sliceSerialize(b).codePointAt(0) === 61 ? 1 : 2;
  }
  function Q() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function O(b) {
    const B = this.stack[this.stack.length - 1].children;
    let L = B[B.length - 1];
    (!L || L.type !== "text") &&
      ((L = If()),
      (L.position = { start: wt(b.start), end: void 0 }),
      B.push(L)),
      this.stack.push(L);
  }
  function V(b) {
    const M = this.stack.pop();
    (M.value += this.sliceSerialize(b)), (M.position.end = wt(b.end));
  }
  function A(b) {
    const M = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const B = M.children[M.children.length - 1];
      (B.position.end = wt(b.end)), (this.data.atHardBreak = void 0);
      return;
    }
    !this.data.setextHeadingSlurpLineEnding &&
      e.canContainEols.includes(M.type) &&
      (O.call(this, b), V.call(this, b));
  }
  function D() {
    this.data.atHardBreak = !0;
  }
  function ee() {
    const b = this.resume(),
      M = this.stack[this.stack.length - 1];
    M.value = b;
  }
  function ie() {
    const b = this.resume(),
      M = this.stack[this.stack.length - 1];
    M.value = b;
  }
  function q() {
    const b = this.resume(),
      M = this.stack[this.stack.length - 1];
    M.value = b;
  }
  function me() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const M = this.data.referenceType || "shortcut";
      (b.type += "Reference"),
        (b.referenceType = M),
        delete b.url,
        delete b.title;
    } else delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function ae() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const M = this.data.referenceType || "shortcut";
      (b.type += "Reference"),
        (b.referenceType = M),
        delete b.url,
        delete b.title;
    } else delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function $e(b) {
    const M = this.sliceSerialize(b),
      B = this.stack[this.stack.length - 2];
    (B.label = uu(M)), (B.identifier = Bn(M).toLowerCase());
  }
  function lt() {
    const b = this.stack[this.stack.length - 1],
      M = this.resume(),
      B = this.stack[this.stack.length - 1];
    if (((this.data.inReference = !0), B.type === "link")) {
      const L = b.children;
      B.children = L;
    } else B.alt = M;
  }
  function m() {
    const b = this.resume(),
      M = this.stack[this.stack.length - 1];
    M.url = b;
  }
  function Ve() {
    const b = this.resume(),
      M = this.stack[this.stack.length - 1];
    M.title = b;
  }
  function at() {
    this.data.inReference = void 0;
  }
  function g() {
    this.data.referenceType = "collapsed";
  }
  function We(b) {
    const M = this.resume(),
      B = this.stack[this.stack.length - 1];
    (B.label = M),
      (B.identifier = Bn(this.sliceSerialize(b)).toLowerCase()),
      (this.data.referenceType = "full");
  }
  function Yt(b) {
    this.data.characterReferenceType = b.type;
  }
  function ce(b) {
    const M = this.sliceSerialize(b),
      B = this.data.characterReferenceType;
    let L;
    B
      ? ((L = eu(M, B === "characterReferenceMarkerNumeric" ? 10 : 16)),
        (this.data.characterReferenceType = void 0))
      : (L = Do(M));
    const Y = this.stack[this.stack.length - 1];
    Y.value += L;
  }
  function er(b) {
    const M = this.stack.pop();
    M.position.end = wt(b.end);
  }
  function St(b) {
    V.call(this, b);
    const M = this.stack[this.stack.length - 1];
    M.url = this.sliceSerialize(b);
  }
  function bn(b) {
    V.call(this, b);
    const M = this.stack[this.stack.length - 1];
    M.url = "mailto:" + this.sliceSerialize(b);
  }
  function Sn() {
    return { type: "blockquote", children: [] };
  }
  function ni() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function Sf() {
    return { type: "inlineCode", value: "" };
  }
  function wf() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: "",
    };
  }
  function Cf() {
    return { type: "emphasis", children: [] };
  }
  function Gl() {
    return { type: "heading", depth: 0, children: [] };
  }
  function Ql() {
    return { type: "break" };
  }
  function Zl() {
    return { type: "html", value: "" };
  }
  function Mf() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function Xl() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function ea(b) {
    return {
      type: "list",
      ordered: b.type === "listOrdered",
      start: null,
      spread: b._spread,
      children: [],
    };
  }
  function Nf(b) {
    return { type: "listItem", spread: b._spread, checked: null, children: [] };
  }
  function Tf() {
    return { type: "paragraph", children: [] };
  }
  function Of() {
    return { type: "strong", children: [] };
  }
  function If() {
    return { type: "text", value: "" };
  }
  function Ef() {
    return { type: "thematicBreak" };
  }
}
function wt(n) {
  return { line: n.line, column: n.column, offset: n.offset };
}
function fu(n, e) {
  let t = -1;
  for (; ++t < e.length; ) {
    const r = e[t];
    Array.isArray(r) ? fu(n, r) : bm(n, r);
  }
}
function bm(n, e) {
  let t;
  for (t in e)
    if (hu.call(e, t))
      switch (t) {
        case "canContainEols": {
          const r = e[t];
          r && n[t].push(...r);
          break;
        }
        case "transforms": {
          const r = e[t];
          r && n[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = e[t];
          r && Object.assign(n[t], r);
          break;
        }
      }
}
function Ma(n, e) {
  throw n
    ? new Error(
        "Cannot close `" +
          n.type +
          "` (" +
          Ir({ start: n.start, end: n.end }) +
          "): a different token (`" +
          e.type +
          "`, " +
          Ir({ start: e.start, end: e.end }) +
          ") is open",
      )
    : new Error(
        "Cannot close document, a token (`" +
          e.type +
          "`, " +
          Ir({ start: e.start, end: e.end }) +
          ") is still open",
      );
}
function Xs(n) {
  const e = this;
  e.parser = t;
  function t(r) {
    return km(r, {
      ...e.data("settings"),
      ...n,
      extensions: e.data("micromarkExtensions") || [],
      mdastExtensions: e.data("fromMarkdownExtensions") || [],
    });
  }
}
const Na = {}.hasOwnProperty;
function Sm(n, e) {
  const t = e || {};
  function r(i, ...s) {
    let o = r.invalid;
    const l = r.handlers;
    if (i && Na.call(i, n)) {
      const a = String(i[n]);
      o = Na.call(l, a) ? l[a] : r.unknown;
    }
    if (o) return o.call(this, i, ...s);
  }
  return (
    (r.handlers = t.handlers || {}),
    (r.invalid = t.invalid),
    (r.unknown = t.unknown),
    r
  );
}
const wm = {}.hasOwnProperty;
function du(n, e) {
  let t = -1,
    r;
  if (e.extensions) for (; ++t < e.extensions.length; ) du(n, e.extensions[t]);
  for (r in e)
    if (wm.call(e, r))
      switch (r) {
        case "extensions":
          break;
        case "unsafe": {
          Ta(n[r], e[r]);
          break;
        }
        case "join": {
          Ta(n[r], e[r]);
          break;
        }
        case "handlers": {
          Cm(n[r], e[r]);
          break;
        }
        default:
          n.options[r] = e[r];
      }
  return n;
}
function Ta(n, e) {
  e && n.push(...e);
}
function Cm(n, e) {
  e && Object.assign(n, e);
}
function Mm(n, e, t, r) {
  const i = t.enter("blockquote"),
    s = t.createTracker(r);
  s.move("> "), s.shift(2);
  const o = t.indentLines(t.containerFlow(n, s.current()), Nm);
  return i(), o;
}
function Nm(n, e, t) {
  return ">" + (t ? "" : " ") + n;
}
function pu(n, e) {
  return Oa(n, e.inConstruct, !0) && !Oa(n, e.notInConstruct, !1);
}
function Oa(n, e, t) {
  if ((typeof e == "string" && (e = [e]), !e || e.length === 0)) return t;
  let r = -1;
  for (; ++r < e.length; ) if (n.includes(e[r])) return !0;
  return !1;
}
function Ia(n, e, t, r) {
  let i = -1;
  for (; ++i < t.unsafe.length; )
    if (
      t.unsafe[i].character ===
        `
` &&
      pu(t.stack, t.unsafe[i])
    )
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function Tm(n, e) {
  const t = String(n);
  let r = t.indexOf(e),
    i = r,
    s = 0,
    o = 0;
  if (typeof e != "string") throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === i ? ++s > o && (o = s) : (s = 1),
      (i = r + e.length),
      (r = t.indexOf(e, i));
  return o;
}
function eo(n, e) {
  return !!(
    e.options.fences === !1 &&
    n.value &&
    !n.lang &&
    /[^ \r\n]/.test(n.value) &&
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(n.value)
  );
}
function Om(n) {
  const e = n.options.fence || "`";
  if (e !== "`" && e !== "~")
    throw new Error(
      "Cannot serialize code with `" +
        e +
        "` for `options.fence`, expected `` ` `` or `~`",
    );
  return e;
}
function Im(n, e, t, r) {
  const i = Om(t),
    s = n.value || "",
    o = i === "`" ? "GraveAccent" : "Tilde";
  if (eo(n, t)) {
    const h = t.enter("codeIndented"),
      d = t.indentLines(s, Em);
    return h(), d;
  }
  const l = t.createTracker(r),
    a = i.repeat(Math.max(Tm(s, i) + 1, 3)),
    c = t.enter("codeFenced");
  let u = l.move(a);
  if (n.lang) {
    const h = t.enter(`codeFencedLang${o}`);
    (u += l.move(
      t.safe(n.lang, { before: u, after: " ", encode: ["`"], ...l.current() }),
    )),
      h();
  }
  if (n.lang && n.meta) {
    const h = t.enter(`codeFencedMeta${o}`);
    (u += l.move(" ")),
      (u += l.move(
        t.safe(n.meta, {
          before: u,
          after: `
`,
          encode: ["`"],
          ...l.current(),
        }),
      )),
      h();
  }
  return (
    (u += l.move(`
`)),
    s &&
      (u += l.move(
        s +
          `
`,
      )),
    (u += l.move(a)),
    c(),
    u
  );
}
function Em(n, e, t) {
  return (t ? "" : "    ") + n;
}
function Po(n) {
  const e = n.options.quote || '"';
  if (e !== '"' && e !== "'")
    throw new Error(
      "Cannot serialize title with `" +
        e +
        "` for `options.quote`, expected `\"`, or `'`",
    );
  return e;
}
function Am(n, e, t, r) {
  const i = Po(t),
    s = i === '"' ? "Quote" : "Apostrophe",
    o = t.enter("definition");
  let l = t.enter("label");
  const a = t.createTracker(r);
  let c = a.move("[");
  return (
    (c += a.move(
      t.safe(t.associationId(n), { before: c, after: "]", ...a.current() }),
    )),
    (c += a.move("]: ")),
    l(),
    !n.url || /[\0- \u007F]/.test(n.url)
      ? ((l = t.enter("destinationLiteral")),
        (c += a.move("<")),
        (c += a.move(t.safe(n.url, { before: c, after: ">", ...a.current() }))),
        (c += a.move(">")))
      : ((l = t.enter("destinationRaw")),
        (c += a.move(
          t.safe(n.url, {
            before: c,
            after: n.title
              ? " "
              : `
`,
            ...a.current(),
          }),
        ))),
    l(),
    n.title &&
      ((l = t.enter(`title${s}`)),
      (c += a.move(" " + i)),
      (c += a.move(t.safe(n.title, { before: c, after: i, ...a.current() }))),
      (c += a.move(i)),
      l()),
    o(),
    c
  );
}
function Dm(n) {
  const e = n.options.emphasis || "*";
  if (e !== "*" && e !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" +
        e +
        "` for `options.emphasis`, expected `*`, or `_`",
    );
  return e;
}
function Vt(n) {
  return "&#x" + n.toString(16).toUpperCase() + ";";
}
function Vi(n, e, t) {
  const r = $i(n),
    i = $i(e);
  return r === void 0
    ? i === void 0
      ? t === "_"
        ? { inside: !0, outside: !0 }
        : { inside: !1, outside: !1 }
      : i === 1
        ? { inside: !0, outside: !0 }
        : { inside: !1, outside: !0 }
    : r === 1
      ? i === void 0
        ? { inside: !1, outside: !1 }
        : i === 1
          ? { inside: !0, outside: !0 }
          : { inside: !1, outside: !1 }
      : i === void 0
        ? { inside: !1, outside: !1 }
        : i === 1
          ? { inside: !0, outside: !1 }
          : { inside: !1, outside: !1 };
}
mu.peek = Rm;
function mu(n, e, t, r) {
  const i = Dm(t),
    s = t.enter("emphasis"),
    o = t.createTracker(r),
    l = o.move(i);
  let a = o.move(
    t.containerPhrasing(n, { after: i, before: l, ...o.current() }),
  );
  const c = a.charCodeAt(0),
    u = Vi(r.before.charCodeAt(r.before.length - 1), c, i);
  u.inside && (a = Vt(c) + a.slice(1));
  const h = a.charCodeAt(a.length - 1),
    d = Vi(r.after.charCodeAt(0), h, i);
  d.inside && (a = a.slice(0, -1) + Vt(h));
  const f = o.move(i);
  return (
    s(),
    (t.attentionEncodeSurroundingInfo = {
      after: d.outside,
      before: u.outside,
    }),
    l + a + f
  );
}
function Rm(n, e, t) {
  return t.options.emphasis || "*";
}
const Bo = function (n) {
  if (n == null) return vm;
  if (typeof n == "function") return Gi(n);
  if (typeof n == "object") return Array.isArray(n) ? zm(n) : Pm(n);
  if (typeof n == "string") return Bm(n);
  throw new Error("Expected function, string, or object as test");
};
function zm(n) {
  const e = [];
  let t = -1;
  for (; ++t < n.length; ) e[t] = Bo(n[t]);
  return Gi(r);
  function r(...i) {
    let s = -1;
    for (; ++s < e.length; ) if (e[s].apply(this, i)) return !0;
    return !1;
  }
}
function Pm(n) {
  const e = n;
  return Gi(t);
  function t(r) {
    const i = r;
    let s;
    for (s in n) if (i[s] !== e[s]) return !1;
    return !0;
  }
}
function Bm(n) {
  return Gi(e);
  function e(t) {
    return t && t.type === n;
  }
}
function Gi(n) {
  return e;
  function e(t, r, i) {
    return !!(
      Fm(t) && n.call(this, t, typeof r == "number" ? r : void 0, i || void 0)
    );
  }
}
function vm() {
  return !0;
}
function Fm(n) {
  return n !== null && typeof n == "object" && "type" in n;
}
const gu = [],
  Lm = !0,
  to = !1,
  no = "skip";
function $m(n, e, t, r) {
  let i;
  typeof e == "function" && typeof t != "function"
    ? ((r = t), (t = e))
    : (i = e);
  const s = Bo(i),
    o = r ? -1 : 1;
  l(n, void 0, [])();
  function l(a, c, u) {
    const h = a && typeof a == "object" ? a : {};
    if (typeof h.type == "string") {
      const f =
        typeof h.tagName == "string"
          ? h.tagName
          : typeof h.name == "string"
            ? h.name
            : void 0;
      Object.defineProperty(d, "name", {
        value: "node (" + (a.type + (f ? "<" + f + ">" : "")) + ")",
      });
    }
    return d;
    function d() {
      let f = gu,
        p,
        y,
        x;
      if (
        (!e || s(a, c, u[u.length - 1] || void 0)) &&
        ((f = Vm(t(a, u))), f[0] === to)
      )
        return f;
      if ("children" in a && a.children) {
        const k = a;
        if (k.children && f[0] !== no)
          for (
            y = (r ? k.children.length : -1) + o, x = u.concat(k);
            y > -1 && y < k.children.length;

          ) {
            const E = k.children[y];
            if (((p = l(E, y, x)()), p[0] === to)) return p;
            y = typeof p[1] == "number" ? p[1] : y + o;
          }
      }
      return f;
    }
  }
}
function Vm(n) {
  return Array.isArray(n)
    ? n
    : typeof n == "number"
      ? [Lm, n]
      : n == null
        ? gu
        : [n];
}
function Yn(n, e, t, r) {
  let i, s, o;
  typeof e == "function" && typeof t != "function"
    ? ((s = void 0), (o = e), (i = t))
    : ((s = e), (o = t), (i = r)),
    $m(n, s, l, i);
  function l(a, c) {
    const u = c[c.length - 1],
      h = u ? u.children.indexOf(a) : void 0;
    return o(a, h, u);
  }
}
function yu(n, e) {
  let t = !1;
  return (
    Yn(n, function (r) {
      if (("value" in r && /\r?\n|\r/.test(r.value)) || r.type === "break")
        return (t = !0), to;
    }),
    !!((!n.depth || n.depth < 3) && Ao(n) && (e.options.setext || t))
  );
}
function Wm(n, e, t, r) {
  const i = Math.max(Math.min(6, n.depth || 1), 1),
    s = t.createTracker(r);
  if (yu(n, t)) {
    const u = t.enter("headingSetext"),
      h = t.enter("phrasing"),
      d = t.containerPhrasing(n, {
        ...s.current(),
        before: `
`,
        after: `
`,
      });
    return (
      h(),
      u(),
      d +
        `
` +
        (i === 1 ? "=" : "-").repeat(
          d.length -
            (Math.max(
              d.lastIndexOf("\r"),
              d.lastIndexOf(`
`),
            ) +
              1),
        )
    );
  }
  const o = "#".repeat(i),
    l = t.enter("headingAtx"),
    a = t.enter("phrasing");
  s.move(o + " ");
  let c = t.containerPhrasing(n, {
    before: "# ",
    after: `
`,
    ...s.current(),
  });
  return (
    /^[\t ]/.test(c) && (c = Vt(c.charCodeAt(0)) + c.slice(1)),
    (c = c ? o + " " + c : o),
    t.options.closeAtx && (c += " " + o),
    a(),
    l(),
    c
  );
}
ku.peek = qm;
function ku(n) {
  return n.value || "";
}
function qm() {
  return "<";
}
xu.peek = Hm;
function xu(n, e, t, r) {
  const i = Po(t),
    s = i === '"' ? "Quote" : "Apostrophe",
    o = t.enter("image");
  let l = t.enter("label");
  const a = t.createTracker(r);
  let c = a.move("![");
  return (
    (c += a.move(t.safe(n.alt, { before: c, after: "]", ...a.current() }))),
    (c += a.move("](")),
    l(),
    (!n.url && n.title) || /[\0- \u007F]/.test(n.url)
      ? ((l = t.enter("destinationLiteral")),
        (c += a.move("<")),
        (c += a.move(t.safe(n.url, { before: c, after: ">", ...a.current() }))),
        (c += a.move(">")))
      : ((l = t.enter("destinationRaw")),
        (c += a.move(
          t.safe(n.url, {
            before: c,
            after: n.title ? " " : ")",
            ...a.current(),
          }),
        ))),
    l(),
    n.title &&
      ((l = t.enter(`title${s}`)),
      (c += a.move(" " + i)),
      (c += a.move(t.safe(n.title, { before: c, after: i, ...a.current() }))),
      (c += a.move(i)),
      l()),
    (c += a.move(")")),
    o(),
    c
  );
}
function Hm() {
  return "!";
}
bu.peek = _m;
function bu(n, e, t, r) {
  const i = n.referenceType,
    s = t.enter("imageReference");
  let o = t.enter("label");
  const l = t.createTracker(r);
  let a = l.move("![");
  const c = t.safe(n.alt, { before: a, after: "]", ...l.current() });
  (a += l.move(c + "][")), o();
  const u = t.stack;
  (t.stack = []), (o = t.enter("reference"));
  const h = t.safe(t.associationId(n), {
    before: a,
    after: "]",
    ...l.current(),
  });
  return (
    o(),
    (t.stack = u),
    s(),
    i === "full" || !c || c !== h
      ? (a += l.move(h + "]"))
      : i === "shortcut"
        ? (a = a.slice(0, -1))
        : (a += l.move("]")),
    a
  );
}
function _m() {
  return "!";
}
Su.peek = jm;
function Su(n, e, t) {
  let r = n.value || "",
    i = "`",
    s = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); ) i += "`";
  for (
    /[^ \r\n]/.test(r) &&
    ((/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r)) || /^`|`$/.test(r)) &&
    (r = " " + r + " ");
    ++s < t.unsafe.length;

  ) {
    const o = t.unsafe[s],
      l = t.compilePattern(o);
    let a;
    if (o.atBreak)
      for (; (a = l.exec(r)); ) {
        let c = a.index;
        r.charCodeAt(c) === 10 && r.charCodeAt(c - 1) === 13 && c--,
          (r = r.slice(0, c) + " " + r.slice(a.index + 1));
      }
  }
  return i + r + i;
}
function jm() {
  return "`";
}
function wu(n, e) {
  const t = Ao(n);
  return !!(
    !e.options.resourceLink &&
    n.url &&
    !n.title &&
    n.children &&
    n.children.length === 1 &&
    n.children[0].type === "text" &&
    (t === n.url || "mailto:" + t === n.url) &&
    /^[a-z][a-z+.-]+:/i.test(n.url) &&
    !/[\0- <>\u007F]/.test(n.url)
  );
}
Cu.peek = Km;
function Cu(n, e, t, r) {
  const i = Po(t),
    s = i === '"' ? "Quote" : "Apostrophe",
    o = t.createTracker(r);
  let l, a;
  if (wu(n, t)) {
    const u = t.stack;
    (t.stack = []), (l = t.enter("autolink"));
    let h = o.move("<");
    return (
      (h += o.move(
        t.containerPhrasing(n, { before: h, after: ">", ...o.current() }),
      )),
      (h += o.move(">")),
      l(),
      (t.stack = u),
      h
    );
  }
  (l = t.enter("link")), (a = t.enter("label"));
  let c = o.move("[");
  return (
    (c += o.move(
      t.containerPhrasing(n, { before: c, after: "](", ...o.current() }),
    )),
    (c += o.move("](")),
    a(),
    (!n.url && n.title) || /[\0- \u007F]/.test(n.url)
      ? ((a = t.enter("destinationLiteral")),
        (c += o.move("<")),
        (c += o.move(t.safe(n.url, { before: c, after: ">", ...o.current() }))),
        (c += o.move(">")))
      : ((a = t.enter("destinationRaw")),
        (c += o.move(
          t.safe(n.url, {
            before: c,
            after: n.title ? " " : ")",
            ...o.current(),
          }),
        ))),
    a(),
    n.title &&
      ((a = t.enter(`title${s}`)),
      (c += o.move(" " + i)),
      (c += o.move(t.safe(n.title, { before: c, after: i, ...o.current() }))),
      (c += o.move(i)),
      a()),
    (c += o.move(")")),
    l(),
    c
  );
}
function Km(n, e, t) {
  return wu(n, t) ? "<" : "[";
}
Mu.peek = Jm;
function Mu(n, e, t, r) {
  const i = n.referenceType,
    s = t.enter("linkReference");
  let o = t.enter("label");
  const l = t.createTracker(r);
  let a = l.move("[");
  const c = t.containerPhrasing(n, { before: a, after: "]", ...l.current() });
  (a += l.move(c + "][")), o();
  const u = t.stack;
  (t.stack = []), (o = t.enter("reference"));
  const h = t.safe(t.associationId(n), {
    before: a,
    after: "]",
    ...l.current(),
  });
  return (
    o(),
    (t.stack = u),
    s(),
    i === "full" || !c || c !== h
      ? (a += l.move(h + "]"))
      : i === "shortcut"
        ? (a = a.slice(0, -1))
        : (a += l.move("]")),
    a
  );
}
function Jm() {
  return "[";
}
function vo(n) {
  const e = n.options.bullet || "*";
  if (e !== "*" && e !== "+" && e !== "-")
    throw new Error(
      "Cannot serialize items with `" +
        e +
        "` for `options.bullet`, expected `*`, `+`, or `-`",
    );
  return e;
}
function Um(n) {
  const e = vo(n),
    t = n.options.bulletOther;
  if (!t) return e === "*" ? "-" : "*";
  if (t !== "*" && t !== "+" && t !== "-")
    throw new Error(
      "Cannot serialize items with `" +
        t +
        "` for `options.bulletOther`, expected `*`, `+`, or `-`",
    );
  if (t === e)
    throw new Error(
      "Expected `bullet` (`" +
        e +
        "`) and `bulletOther` (`" +
        t +
        "`) to be different",
    );
  return t;
}
function Ym(n) {
  const e = n.options.bulletOrdered || ".";
  if (e !== "." && e !== ")")
    throw new Error(
      "Cannot serialize items with `" +
        e +
        "` for `options.bulletOrdered`, expected `.` or `)`",
    );
  return e;
}
function Nu(n) {
  const e = n.options.rule || "*";
  if (e !== "*" && e !== "-" && e !== "_")
    throw new Error(
      "Cannot serialize rules with `" +
        e +
        "` for `options.rule`, expected `*`, `-`, or `_`",
    );
  return e;
}
function Gm(n, e, t, r) {
  const i = t.enter("list"),
    s = t.bulletCurrent;
  let o = n.ordered ? Ym(t) : vo(t);
  const l = n.ordered ? (o === "." ? ")" : ".") : Um(t);
  let a = e && t.bulletLastUsed ? o === t.bulletLastUsed : !1;
  if (!n.ordered) {
    const u = n.children ? n.children[0] : void 0;
    if (
      ((o === "*" || o === "-") &&
        u &&
        (!u.children || !u.children[0]) &&
        t.stack[t.stack.length - 1] === "list" &&
        t.stack[t.stack.length - 2] === "listItem" &&
        t.stack[t.stack.length - 3] === "list" &&
        t.stack[t.stack.length - 4] === "listItem" &&
        t.indexStack[t.indexStack.length - 1] === 0 &&
        t.indexStack[t.indexStack.length - 2] === 0 &&
        t.indexStack[t.indexStack.length - 3] === 0 &&
        (a = !0),
      Nu(t) === o && u)
    ) {
      let h = -1;
      for (; ++h < n.children.length; ) {
        const d = n.children[h];
        if (
          d &&
          d.type === "listItem" &&
          d.children &&
          d.children[0] &&
          d.children[0].type === "thematicBreak"
        ) {
          a = !0;
          break;
        }
      }
    }
  }
  a && (o = l), (t.bulletCurrent = o);
  const c = t.containerFlow(n, r);
  return (t.bulletLastUsed = o), (t.bulletCurrent = s), i(), c;
}
function Qm(n) {
  const e = n.options.listItemIndent || "one";
  if (e !== "tab" && e !== "one" && e !== "mixed")
    throw new Error(
      "Cannot serialize items with `" +
        e +
        "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`",
    );
  return e;
}
function Zm(n, e, t, r) {
  const i = Qm(t);
  let s = t.bulletCurrent || vo(t);
  e &&
    e.type === "list" &&
    e.ordered &&
    (s =
      (typeof e.start == "number" && e.start > -1 ? e.start : 1) +
      (t.options.incrementListMarker === !1 ? 0 : e.children.indexOf(n)) +
      s);
  let o = s.length + 1;
  (i === "tab" ||
    (i === "mixed" && ((e && e.type === "list" && e.spread) || n.spread))) &&
    (o = Math.ceil(o / 4) * 4);
  const l = t.createTracker(r);
  l.move(s + " ".repeat(o - s.length)), l.shift(o);
  const a = t.enter("listItem"),
    c = t.indentLines(t.containerFlow(n, l.current()), u);
  return a(), c;
  function u(h, d, f) {
    return d
      ? (f ? "" : " ".repeat(o)) + h
      : (f ? s : s + " ".repeat(o - s.length)) + h;
  }
}
function Xm(n, e, t, r) {
  const i = t.enter("paragraph"),
    s = t.enter("phrasing"),
    o = t.containerPhrasing(n, r);
  return s(), i(), o;
}
const eg = Bo([
  "break",
  "delete",
  "emphasis",
  "footnote",
  "footnoteReference",
  "image",
  "imageReference",
  "inlineCode",
  "inlineMath",
  "link",
  "linkReference",
  "mdxJsxTextElement",
  "mdxTextExpression",
  "strong",
  "text",
  "textDirective",
]);
function tg(n, e, t, r) {
  return (
    n.children.some(function (o) {
      return eg(o);
    })
      ? t.containerPhrasing
      : t.containerFlow
  ).call(t, n, r);
}
function ng(n) {
  const e = n.options.strong || "*";
  if (e !== "*" && e !== "_")
    throw new Error(
      "Cannot serialize strong with `" +
        e +
        "` for `options.strong`, expected `*`, or `_`",
    );
  return e;
}
Tu.peek = rg;
function Tu(n, e, t, r) {
  const i = ng(t),
    s = t.enter("strong"),
    o = t.createTracker(r),
    l = o.move(i + i);
  let a = o.move(
    t.containerPhrasing(n, { after: i, before: l, ...o.current() }),
  );
  const c = a.charCodeAt(0),
    u = Vi(r.before.charCodeAt(r.before.length - 1), c, i);
  u.inside && (a = Vt(c) + a.slice(1));
  const h = a.charCodeAt(a.length - 1),
    d = Vi(r.after.charCodeAt(0), h, i);
  d.inside && (a = a.slice(0, -1) + Vt(h));
  const f = o.move(i + i);
  return (
    s(),
    (t.attentionEncodeSurroundingInfo = {
      after: d.outside,
      before: u.outside,
    }),
    l + a + f
  );
}
function rg(n, e, t) {
  return t.options.strong || "*";
}
function ig(n, e, t, r) {
  return t.safe(n.value, r);
}
function sg(n) {
  const e = n.options.ruleRepetition || 3;
  if (e < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" +
        e +
        "` for `options.ruleRepetition`, expected `3` or more",
    );
  return e;
}
function og(n, e, t) {
  const r = (Nu(t) + (t.options.ruleSpaces ? " " : "")).repeat(sg(t));
  return t.options.ruleSpaces ? r.slice(0, -1) : r;
}
const lg = {
    blockquote: Mm,
    break: Ia,
    code: Im,
    definition: Am,
    emphasis: mu,
    hardBreak: Ia,
    heading: Wm,
    html: ku,
    image: xu,
    imageReference: bu,
    inlineCode: Su,
    link: Cu,
    linkReference: Mu,
    list: Gm,
    listItem: Zm,
    paragraph: Xm,
    root: tg,
    strong: Tu,
    text: ig,
    thematicBreak: og,
  },
  ag = [cg];
function cg(n, e, t, r) {
  if (
    e.type === "code" &&
    eo(e, r) &&
    (n.type === "list" || (n.type === e.type && eo(n, r)))
  )
    return !1;
  if ("spread" in t && typeof t.spread == "boolean")
    return n.type === "paragraph" &&
      (n.type === e.type ||
        e.type === "definition" ||
        (e.type === "heading" && yu(e, r)))
      ? void 0
      : t.spread
        ? 1
        : 0;
}
const Qt = [
    "autolink",
    "destinationLiteral",
    "destinationRaw",
    "reference",
    "titleQuote",
    "titleApostrophe",
  ],
  ug = [
    { character: "	", after: "[\\r\\n]", inConstruct: "phrasing" },
    { character: "	", before: "[\\r\\n]", inConstruct: "phrasing" },
    {
      character: "	",
      inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"],
    },
    {
      character: "\r",
      inConstruct: [
        "codeFencedLangGraveAccent",
        "codeFencedLangTilde",
        "codeFencedMetaGraveAccent",
        "codeFencedMetaTilde",
        "destinationLiteral",
        "headingAtx",
      ],
    },
    {
      character: `
`,
      inConstruct: [
        "codeFencedLangGraveAccent",
        "codeFencedLangTilde",
        "codeFencedMetaGraveAccent",
        "codeFencedMetaTilde",
        "destinationLiteral",
        "headingAtx",
      ],
    },
    { character: " ", after: "[\\r\\n]", inConstruct: "phrasing" },
    { character: " ", before: "[\\r\\n]", inConstruct: "phrasing" },
    {
      character: " ",
      inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"],
    },
    {
      character: "!",
      after: "\\[",
      inConstruct: "phrasing",
      notInConstruct: Qt,
    },
    { character: '"', inConstruct: "titleQuote" },
    { atBreak: !0, character: "#" },
    {
      character: "#",
      inConstruct: "headingAtx",
      after: `(?:[\r
]|$)`,
    },
    { character: "&", after: "[#A-Za-z]", inConstruct: "phrasing" },
    { character: "'", inConstruct: "titleApostrophe" },
    { character: "(", inConstruct: "destinationRaw" },
    {
      before: "\\]",
      character: "(",
      inConstruct: "phrasing",
      notInConstruct: Qt,
    },
    { atBreak: !0, before: "\\d+", character: ")" },
    { character: ")", inConstruct: "destinationRaw" },
    {
      atBreak: !0,
      character: "*",
      after: `(?:[ 	\r
*])`,
    },
    { character: "*", inConstruct: "phrasing", notInConstruct: Qt },
    {
      atBreak: !0,
      character: "+",
      after: `(?:[ 	\r
])`,
    },
    {
      atBreak: !0,
      character: "-",
      after: `(?:[ 	\r
-])`,
    },
    {
      atBreak: !0,
      before: "\\d+",
      character: ".",
      after: `(?:[ 	\r
]|$)`,
    },
    { atBreak: !0, character: "<", after: "[!/?A-Za-z]" },
    {
      character: "<",
      after: "[!/?A-Za-z]",
      inConstruct: "phrasing",
      notInConstruct: Qt,
    },
    { character: "<", inConstruct: "destinationLiteral" },
    { atBreak: !0, character: "=" },
    { atBreak: !0, character: ">" },
    { character: ">", inConstruct: "destinationLiteral" },
    { atBreak: !0, character: "[" },
    { character: "[", inConstruct: "phrasing", notInConstruct: Qt },
    { character: "[", inConstruct: ["label", "reference"] },
    { character: "\\", after: "[\\r\\n]", inConstruct: "phrasing" },
    { character: "]", inConstruct: ["label", "reference"] },
    { atBreak: !0, character: "_" },
    { character: "_", inConstruct: "phrasing", notInConstruct: Qt },
    { atBreak: !0, character: "`" },
    {
      character: "`",
      inConstruct: ["codeFencedLangGraveAccent", "codeFencedMetaGraveAccent"],
    },
    { character: "`", inConstruct: "phrasing", notInConstruct: Qt },
    { atBreak: !0, character: "~" },
  ];
function hg(n) {
  return n.label || !n.identifier ? n.label || "" : uu(n.identifier);
}
function fg(n) {
  if (!n._compiled) {
    const e =
      (n.atBreak ? "[\\r\\n][\\t ]*" : "") +
      (n.before ? "(?:" + n.before + ")" : "");
    n._compiled = new RegExp(
      (e ? "(" + e + ")" : "") +
        (/[|\\{}()[\]^$+*?.-]/.test(n.character) ? "\\" : "") +
        n.character +
        (n.after ? "(?:" + n.after + ")" : ""),
      "g",
    );
  }
  return n._compiled;
}
function dg(n, e, t) {
  const r = e.indexStack,
    i = n.children || [],
    s = [];
  let o = -1,
    l = t.before,
    a;
  r.push(-1);
  let c = e.createTracker(t);
  for (; ++o < i.length; ) {
    const u = i[o];
    let h;
    if (((r[r.length - 1] = o), o + 1 < i.length)) {
      let p = e.handle.handlers[i[o + 1].type];
      p && p.peek && (p = p.peek),
        (h = p
          ? p(i[o + 1], n, e, { before: "", after: "", ...c.current() }).charAt(
              0,
            )
          : "");
    } else h = t.after;
    s.length > 0 &&
      (l === "\r" ||
        l ===
          `
`) &&
      u.type === "html" &&
      ((s[s.length - 1] = s[s.length - 1].replace(/(\r?\n|\r)$/, " ")),
      (l = " "),
      (c = e.createTracker(t)),
      c.move(s.join("")));
    let d = e.handle(u, n, e, { ...c.current(), after: h, before: l });
    a && a === d.slice(0, 1) && (d = Vt(a.charCodeAt(0)) + d.slice(1));
    const f = e.attentionEncodeSurroundingInfo;
    (e.attentionEncodeSurroundingInfo = void 0),
      (a = void 0),
      f &&
        (s.length > 0 &&
          f.before &&
          l === s[s.length - 1].slice(-1) &&
          (s[s.length - 1] =
            s[s.length - 1].slice(0, -1) + Vt(l.charCodeAt(0))),
        f.after && (a = h)),
      c.move(d),
      s.push(d),
      (l = d.slice(-1));
  }
  return r.pop(), s.join("");
}
function pg(n, e, t) {
  const r = e.indexStack,
    i = n.children || [],
    s = e.createTracker(t),
    o = [];
  let l = -1;
  for (r.push(-1); ++l < i.length; ) {
    const a = i[l];
    (r[r.length - 1] = l),
      o.push(
        s.move(
          e.handle(a, n, e, {
            before: `
`,
            after: `
`,
            ...s.current(),
          }),
        ),
      ),
      a.type !== "list" && (e.bulletLastUsed = void 0),
      l < i.length - 1 && o.push(s.move(mg(a, i[l + 1], n, e)));
  }
  return r.pop(), o.join("");
}
function mg(n, e, t, r) {
  let i = r.join.length;
  for (; i--; ) {
    const s = r.join[i](n, e, t, r);
    if (s === !0 || s === 1) break;
    if (typeof s == "number")
      return `
`.repeat(1 + s);
    if (s === !1)
      return `

<!---->

`;
  }
  return `

`;
}
const gg = /\r?\n|\r/g;
function yg(n, e) {
  const t = [];
  let r = 0,
    i = 0,
    s;
  for (; (s = gg.exec(n)); )
    o(n.slice(r, s.index)), t.push(s[0]), (r = s.index + s[0].length), i++;
  return o(n.slice(r)), t.join("");
  function o(l) {
    t.push(e(l, i, !l));
  }
}
function kg(n, e, t) {
  const r = (t.before || "") + (e || "") + (t.after || ""),
    i = [],
    s = [],
    o = {};
  let l = -1;
  for (; ++l < n.unsafe.length; ) {
    const u = n.unsafe[l];
    if (!pu(n.stack, u)) continue;
    const h = n.compilePattern(u);
    let d;
    for (; (d = h.exec(r)); ) {
      const f = "before" in u || !!u.atBreak,
        p = "after" in u,
        y = d.index + (f ? d[1].length : 0);
      i.includes(y)
        ? (o[y].before && !f && (o[y].before = !1),
          o[y].after && !p && (o[y].after = !1))
        : (i.push(y), (o[y] = { before: f, after: p }));
    }
  }
  i.sort(xg);
  let a = t.before ? t.before.length : 0;
  const c = r.length - (t.after ? t.after.length : 0);
  for (l = -1; ++l < i.length; ) {
    const u = i[l];
    u < a ||
      u >= c ||
      (u + 1 < c &&
        i[l + 1] === u + 1 &&
        o[u].after &&
        !o[u + 1].before &&
        !o[u + 1].after) ||
      (i[l - 1] === u - 1 &&
        o[u].before &&
        !o[u - 1].before &&
        !o[u - 1].after) ||
      (a !== u && s.push(Ea(r.slice(a, u), "\\")),
      (a = u),
      /[!-/:-@[-`{-~]/.test(r.charAt(u)) &&
      (!t.encode || !t.encode.includes(r.charAt(u)))
        ? s.push("\\")
        : (s.push(Vt(r.charCodeAt(u))), a++));
  }
  return s.push(Ea(r.slice(a, c), t.after)), s.join("");
}
function xg(n, e) {
  return n - e;
}
function Ea(n, e) {
  const t = /\\(?=[!-/:-@[-`{-~])/g,
    r = [],
    i = [],
    s = n + e;
  let o = -1,
    l = 0,
    a;
  for (; (a = t.exec(s)); ) r.push(a.index);
  for (; ++o < r.length; )
    l !== r[o] && i.push(n.slice(l, r[o])), i.push("\\"), (l = r[o]);
  return i.push(n.slice(l)), i.join("");
}
function bg(n) {
  const e = n || {},
    t = e.now || {};
  let r = e.lineShift || 0,
    i = t.line || 1,
    s = t.column || 1;
  return { move: a, current: o, shift: l };
  function o() {
    return { now: { line: i, column: s }, lineShift: r };
  }
  function l(c) {
    r += c;
  }
  function a(c) {
    const u = c || "",
      h = u.split(/\r?\n|\r/g),
      d = h[h.length - 1];
    return (
      (i += h.length - 1),
      (s = h.length === 1 ? s + d.length : 1 + d.length + r),
      u
    );
  }
}
function Sg(n, e) {
  const t = e || {},
    r = {
      associationId: hg,
      containerPhrasing: Ng,
      containerFlow: Tg,
      createTracker: bg,
      compilePattern: fg,
      enter: s,
      handlers: { ...lg },
      handle: void 0,
      indentLines: yg,
      indexStack: [],
      join: [...ag],
      options: {},
      safe: Og,
      stack: [],
      unsafe: [...ug],
    };
  du(r, t),
    r.options.tightDefinitions && r.join.push(Mg),
    (r.handle = Sm("type", { invalid: wg, unknown: Cg, handlers: r.handlers }));
  let i = r.handle(n, void 0, r, {
    before: `
`,
    after: `
`,
    now: { line: 1, column: 1 },
    lineShift: 0,
  });
  return (
    i &&
      i.charCodeAt(i.length - 1) !== 10 &&
      i.charCodeAt(i.length - 1) !== 13 &&
      (i += `
`),
    i
  );
  function s(o) {
    return r.stack.push(o), l;
    function l() {
      r.stack.pop();
    }
  }
}
function wg(n) {
  throw new Error("Cannot handle value `" + n + "`, expected node");
}
function Cg(n) {
  const e = n;
  throw new Error("Cannot handle unknown node `" + e.type + "`");
}
function Mg(n, e) {
  if (n.type === "definition" && n.type === e.type) return 0;
}
function Ng(n, e) {
  return dg(n, this, e);
}
function Tg(n, e) {
  return pg(n, this, e);
}
function Og(n, e) {
  return kg(this, n, e);
}
function ro(n) {
  const e = this;
  e.compiler = t;
  function t(r) {
    return Sg(r, {
      ...e.data("settings"),
      ...n,
      extensions: e.data("toMarkdownExtensions") || [],
    });
  }
}
function Aa(n) {
  if (n) throw n;
}
function Ig(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default")
    ? n.default
    : n;
}
var ds, Da;
function Eg() {
  if (Da) return ds;
  Da = 1;
  var n = Object.prototype.hasOwnProperty,
    e = Object.prototype.toString,
    t = Object.defineProperty,
    r = Object.getOwnPropertyDescriptor,
    i = function (c) {
      return typeof Array.isArray == "function"
        ? Array.isArray(c)
        : e.call(c) === "[object Array]";
    },
    s = function (c) {
      if (!c || e.call(c) !== "[object Object]") return !1;
      var u = n.call(c, "constructor"),
        h =
          c.constructor &&
          c.constructor.prototype &&
          n.call(c.constructor.prototype, "isPrototypeOf");
      if (c.constructor && !u && !h) return !1;
      var d;
      for (d in c);
      return typeof d > "u" || n.call(c, d);
    },
    o = function (c, u) {
      t && u.name === "__proto__"
        ? t(c, u.name, {
            enumerable: !0,
            configurable: !0,
            value: u.newValue,
            writable: !0,
          })
        : (c[u.name] = u.newValue);
    },
    l = function (c, u) {
      if (u === "__proto__")
        if (n.call(c, u)) {
          if (r) return r(c, u).value;
        } else return;
      return c[u];
    };
  return (
    (ds = function a() {
      var c,
        u,
        h,
        d,
        f,
        p,
        y = arguments[0],
        x = 1,
        k = arguments.length,
        E = !1;
      for (
        typeof y == "boolean" && ((E = y), (y = arguments[1] || {}), (x = 2)),
          (y == null || (typeof y != "object" && typeof y != "function")) &&
            (y = {});
        x < k;
        ++x
      )
        if (((c = arguments[x]), c != null))
          for (u in c)
            (h = l(y, u)),
              (d = l(c, u)),
              y !== d &&
                (E && d && (s(d) || (f = i(d)))
                  ? (f
                      ? ((f = !1), (p = h && i(h) ? h : []))
                      : (p = h && s(h) ? h : {}),
                    o(y, { name: u, newValue: a(E, p, d) }))
                  : typeof d < "u" && o(y, { name: u, newValue: d }));
      return y;
    }),
    ds
  );
}
var Ag = Eg();
const ps = Ig(Ag);
function io(n) {
  if (typeof n != "object" || n === null) return !1;
  const e = Object.getPrototypeOf(n);
  return (
    (e === null ||
      e === Object.prototype ||
      Object.getPrototypeOf(e) === null) &&
    !(Symbol.toStringTag in n) &&
    !(Symbol.iterator in n)
  );
}
function Dg() {
  const n = [],
    e = { run: t, use: r };
  return e;
  function t(...i) {
    let s = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    l(null, ...i);
    function l(a, ...c) {
      const u = n[++s];
      let h = -1;
      if (a) {
        o(a);
        return;
      }
      for (; ++h < i.length; )
        (c[h] === null || c[h] === void 0) && (c[h] = i[h]);
      (i = c), u ? Rg(u, l)(...c) : o(null, ...c);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError("Expected `middelware` to be a function, not " + i);
    return n.push(i), e;
  }
}
function Rg(n, e) {
  let t;
  return r;
  function r(...o) {
    const l = n.length > o.length;
    let a;
    l && o.push(i);
    try {
      a = n.apply(this, o);
    } catch (c) {
      const u = c;
      if (l && t) throw u;
      return i(u);
    }
    l ||
      (a && a.then && typeof a.then == "function"
        ? a.then(s, i)
        : a instanceof Error
          ? i(a)
          : s(a));
  }
  function i(o, ...l) {
    t || ((t = !0), e(o, ...l));
  }
  function s(o) {
    i(null, o);
  }
}
class Te extends Error {
  constructor(e, t, r) {
    super(), typeof t == "string" && ((r = t), (t = void 0));
    let i = "",
      s = {},
      o = !1;
    if (
      (t &&
        ("line" in t && "column" in t
          ? (s = { place: t })
          : "start" in t && "end" in t
            ? (s = { place: t })
            : "type" in t
              ? (s = { ancestors: [t], place: t.position })
              : (s = { ...t })),
      typeof e == "string"
        ? (i = e)
        : !s.cause && e && ((o = !0), (i = e.message), (s.cause = e)),
      !s.ruleId && !s.source && typeof r == "string")
    ) {
      const a = r.indexOf(":");
      a === -1
        ? (s.ruleId = r)
        : ((s.source = r.slice(0, a)), (s.ruleId = r.slice(a + 1)));
    }
    if (!s.place && s.ancestors && s.ancestors) {
      const a = s.ancestors[s.ancestors.length - 1];
      a && (s.place = a.position);
    }
    const l = s.place && "start" in s.place ? s.place.start : s.place;
    (this.ancestors = s.ancestors || void 0),
      (this.cause = s.cause || void 0),
      (this.column = l ? l.column : void 0),
      (this.fatal = void 0),
      this.file,
      (this.message = i),
      (this.line = l ? l.line : void 0),
      (this.name = Ir(s.place) || "1:1"),
      (this.place = s.place || void 0),
      (this.reason = this.message),
      (this.ruleId = s.ruleId || void 0),
      (this.source = s.source || void 0),
      (this.stack =
        o && s.cause && typeof s.cause.stack == "string" ? s.cause.stack : ""),
      this.actual,
      this.expected,
      this.note,
      this.url;
  }
}
Te.prototype.file = "";
Te.prototype.name = "";
Te.prototype.reason = "";
Te.prototype.message = "";
Te.prototype.stack = "";
Te.prototype.column = void 0;
Te.prototype.line = void 0;
Te.prototype.ancestors = void 0;
Te.prototype.cause = void 0;
Te.prototype.fatal = void 0;
Te.prototype.place = void 0;
Te.prototype.ruleId = void 0;
Te.prototype.source = void 0;
const et = { basename: zg, dirname: Pg, extname: Bg, join: vg, sep: "/" };
function zg(n, e) {
  if (e !== void 0 && typeof e != "string")
    throw new TypeError('"ext" argument must be a string');
  Kr(n);
  let t = 0,
    r = -1,
    i = n.length,
    s;
  if (e === void 0 || e.length === 0 || e.length > n.length) {
    for (; i--; )
      if (n.codePointAt(i) === 47) {
        if (s) {
          t = i + 1;
          break;
        }
      } else r < 0 && ((s = !0), (r = i + 1));
    return r < 0 ? "" : n.slice(t, r);
  }
  if (e === n) return "";
  let o = -1,
    l = e.length - 1;
  for (; i--; )
    if (n.codePointAt(i) === 47) {
      if (s) {
        t = i + 1;
        break;
      }
    } else
      o < 0 && ((s = !0), (o = i + 1)),
        l > -1 &&
          (n.codePointAt(i) === e.codePointAt(l--)
            ? l < 0 && (r = i)
            : ((l = -1), (r = o)));
  return t === r ? (r = o) : r < 0 && (r = n.length), n.slice(t, r);
}
function Pg(n) {
  if ((Kr(n), n.length === 0)) return ".";
  let e = -1,
    t = n.length,
    r;
  for (; --t; )
    if (n.codePointAt(t) === 47) {
      if (r) {
        e = t;
        break;
      }
    } else r || (r = !0);
  return e < 0
    ? n.codePointAt(0) === 47
      ? "/"
      : "."
    : e === 1 && n.codePointAt(0) === 47
      ? "//"
      : n.slice(0, e);
}
function Bg(n) {
  Kr(n);
  let e = n.length,
    t = -1,
    r = 0,
    i = -1,
    s = 0,
    o;
  for (; e--; ) {
    const l = n.codePointAt(e);
    if (l === 47) {
      if (o) {
        r = e + 1;
        break;
      }
      continue;
    }
    t < 0 && ((o = !0), (t = e + 1)),
      l === 46 ? (i < 0 ? (i = e) : s !== 1 && (s = 1)) : i > -1 && (s = -1);
  }
  return i < 0 || t < 0 || s === 0 || (s === 1 && i === t - 1 && i === r + 1)
    ? ""
    : n.slice(i, t);
}
function vg(...n) {
  let e = -1,
    t;
  for (; ++e < n.length; )
    Kr(n[e]), n[e] && (t = t === void 0 ? n[e] : t + "/" + n[e]);
  return t === void 0 ? "." : Fg(t);
}
function Fg(n) {
  Kr(n);
  const e = n.codePointAt(0) === 47;
  let t = Lg(n, !e);
  return (
    t.length === 0 && !e && (t = "."),
    t.length > 0 && n.codePointAt(n.length - 1) === 47 && (t += "/"),
    e ? "/" + t : t
  );
}
function Lg(n, e) {
  let t = "",
    r = 0,
    i = -1,
    s = 0,
    o = -1,
    l,
    a;
  for (; ++o <= n.length; ) {
    if (o < n.length) l = n.codePointAt(o);
    else {
      if (l === 47) break;
      l = 47;
    }
    if (l === 47) {
      if (!(i === o - 1 || s === 1))
        if (i !== o - 1 && s === 2) {
          if (
            t.length < 2 ||
            r !== 2 ||
            t.codePointAt(t.length - 1) !== 46 ||
            t.codePointAt(t.length - 2) !== 46
          ) {
            if (t.length > 2) {
              if (((a = t.lastIndexOf("/")), a !== t.length - 1)) {
                a < 0
                  ? ((t = ""), (r = 0))
                  : ((t = t.slice(0, a)),
                    (r = t.length - 1 - t.lastIndexOf("/"))),
                  (i = o),
                  (s = 0);
                continue;
              }
            } else if (t.length > 0) {
              (t = ""), (r = 0), (i = o), (s = 0);
              continue;
            }
          }
          e && ((t = t.length > 0 ? t + "/.." : ".."), (r = 2));
        } else
          t.length > 0
            ? (t += "/" + n.slice(i + 1, o))
            : (t = n.slice(i + 1, o)),
            (r = o - i - 1);
      (i = o), (s = 0);
    } else l === 46 && s > -1 ? s++ : (s = -1);
  }
  return t;
}
function Kr(n) {
  if (typeof n != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(n));
}
const $g = { cwd: Vg };
function Vg() {
  return "/";
}
function so(n) {
  return !!(
    n !== null &&
    typeof n == "object" &&
    "href" in n &&
    n.href &&
    "protocol" in n &&
    n.protocol &&
    n.auth === void 0
  );
}
function Wg(n) {
  if (typeof n == "string") n = new URL(n);
  else if (!so(n)) {
    const e = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        n +
        "`",
    );
    throw ((e.code = "ERR_INVALID_ARG_TYPE"), e);
  }
  if (n.protocol !== "file:") {
    const e = new TypeError("The URL must be of scheme file");
    throw ((e.code = "ERR_INVALID_URL_SCHEME"), e);
  }
  return qg(n);
}
function qg(n) {
  if (n.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin',
    );
    throw ((r.code = "ERR_INVALID_FILE_URL_HOST"), r);
  }
  const e = n.pathname;
  let t = -1;
  for (; ++t < e.length; )
    if (e.codePointAt(t) === 37 && e.codePointAt(t + 1) === 50) {
      const r = e.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters",
        );
        throw ((i.code = "ERR_INVALID_FILE_URL_PATH"), i);
      }
    }
  return decodeURIComponent(e);
}
const ms = ["history", "path", "basename", "stem", "extname", "dirname"];
class Hg {
  constructor(e) {
    let t;
    e
      ? so(e)
        ? (t = { path: e })
        : typeof e == "string" || _g(e)
          ? (t = { value: e })
          : (t = e)
      : (t = {}),
      (this.cwd = "cwd" in t ? "" : $g.cwd()),
      (this.data = {}),
      (this.history = []),
      (this.messages = []),
      this.value,
      this.map,
      this.result,
      this.stored;
    let r = -1;
    for (; ++r < ms.length; ) {
      const s = ms[r];
      s in t &&
        t[s] !== void 0 &&
        t[s] !== null &&
        (this[s] = s === "history" ? [...t[s]] : t[s]);
    }
    let i;
    for (i in t) ms.includes(i) || (this[i] = t[i]);
  }
  get basename() {
    return typeof this.path == "string" ? et.basename(this.path) : void 0;
  }
  set basename(e) {
    ys(e, "basename"),
      gs(e, "basename"),
      (this.path = et.join(this.dirname || "", e));
  }
  get dirname() {
    return typeof this.path == "string" ? et.dirname(this.path) : void 0;
  }
  set dirname(e) {
    Ra(this.basename, "dirname"), (this.path = et.join(e || "", this.basename));
  }
  get extname() {
    return typeof this.path == "string" ? et.extname(this.path) : void 0;
  }
  set extname(e) {
    if ((gs(e, "extname"), Ra(this.dirname, "extname"), e)) {
      if (e.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (e.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = et.join(this.dirname, this.stem + (e || ""));
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(e) {
    so(e) && (e = Wg(e)),
      ys(e, "path"),
      this.path !== e && this.history.push(e);
  }
  get stem() {
    return typeof this.path == "string"
      ? et.basename(this.path, this.extname)
      : void 0;
  }
  set stem(e) {
    ys(e, "stem"),
      gs(e, "stem"),
      (this.path = et.join(this.dirname || "", e + (this.extname || "")));
  }
  fail(e, t, r) {
    const i = this.message(e, t, r);
    throw ((i.fatal = !0), i);
  }
  info(e, t, r) {
    const i = this.message(e, t, r);
    return (i.fatal = void 0), i;
  }
  message(e, t, r) {
    const i = new Te(e, t, r);
    return (
      this.path && ((i.name = this.path + ":" + i.name), (i.file = this.path)),
      (i.fatal = !1),
      this.messages.push(i),
      i
    );
  }
  toString(e) {
    return this.value === void 0
      ? ""
      : typeof this.value == "string"
        ? this.value
        : new TextDecoder(e || void 0).decode(this.value);
  }
}
function gs(n, e) {
  if (n && n.includes(et.sep))
    throw new Error(
      "`" + e + "` cannot be a path: did not expect `" + et.sep + "`",
    );
}
function ys(n, e) {
  if (!n) throw new Error("`" + e + "` cannot be empty");
}
function Ra(n, e) {
  if (!n) throw new Error("Setting `" + e + "` requires `path` to be set too");
}
function _g(n) {
  return !!(
    n &&
    typeof n == "object" &&
    "byteLength" in n &&
    "byteOffset" in n
  );
}
const jg = function (n) {
    const r = this.constructor.prototype,
      i = r[n],
      s = function () {
        return i.apply(s, arguments);
      };
    return Object.setPrototypeOf(s, r), s;
  },
  Kg = {}.hasOwnProperty;
class Fo extends jg {
  constructor() {
    super("copy"),
      (this.Compiler = void 0),
      (this.Parser = void 0),
      (this.attachers = []),
      (this.compiler = void 0),
      (this.freezeIndex = -1),
      (this.frozen = void 0),
      (this.namespace = {}),
      (this.parser = void 0),
      (this.transformers = Dg());
  }
  copy() {
    const e = new Fo();
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      e.use(...r);
    }
    return e.data(ps(!0, {}, this.namespace)), e;
  }
  data(e, t) {
    return typeof e == "string"
      ? arguments.length === 2
        ? (bs("data", this.frozen), (this.namespace[e] = t), this)
        : (Kg.call(this.namespace, e) && this.namespace[e]) || void 0
      : e
        ? (bs("data", this.frozen), (this.namespace = e), this)
        : this.namespace;
  }
  freeze() {
    if (this.frozen) return this;
    const e = this;
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1) continue;
      r[0] === !0 && (r[0] = void 0);
      const i = t.call(e, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return (
      (this.frozen = !0), (this.freezeIndex = Number.POSITIVE_INFINITY), this
    );
  }
  parse(e) {
    this.freeze();
    const t = si(e),
      r = this.parser || this.Parser;
    return ks("parse", r), r(String(t), t);
  }
  process(e, t) {
    const r = this;
    return (
      this.freeze(),
      ks("process", this.parser || this.Parser),
      xs("process", this.compiler || this.Compiler),
      t ? i(void 0, t) : new Promise(i)
    );
    function i(s, o) {
      const l = si(e),
        a = r.parse(l);
      r.run(a, l, function (u, h, d) {
        if (u || !h || !d) return c(u);
        const f = h,
          p = r.stringify(f, d);
        Ug(p) ? (d.value = p) : (d.result = p), c(u, d);
      });
      function c(u, h) {
        u || !h ? o(u) : s ? s(h) : t(void 0, h);
      }
    }
  }
  processSync(e) {
    let t = !1,
      r;
    return (
      this.freeze(),
      ks("processSync", this.parser || this.Parser),
      xs("processSync", this.compiler || this.Compiler),
      this.process(e, i),
      Pa("processSync", "process", t),
      r
    );
    function i(s, o) {
      (t = !0), Aa(s), (r = o);
    }
  }
  run(e, t, r) {
    za(e), this.freeze();
    const i = this.transformers;
    return (
      !r && typeof t == "function" && ((r = t), (t = void 0)),
      r ? s(void 0, r) : new Promise(s)
    );
    function s(o, l) {
      const a = si(t);
      i.run(e, a, c);
      function c(u, h, d) {
        const f = h || e;
        u ? l(u) : o ? o(f) : r(void 0, f, d);
      }
    }
  }
  runSync(e, t) {
    let r = !1,
      i;
    return this.run(e, t, s), Pa("runSync", "run", r), i;
    function s(o, l) {
      Aa(o), (i = l), (r = !0);
    }
  }
  stringify(e, t) {
    this.freeze();
    const r = si(t),
      i = this.compiler || this.Compiler;
    return xs("stringify", i), za(e), i(e, r);
  }
  use(e, ...t) {
    const r = this.attachers,
      i = this.namespace;
    if ((bs("use", this.frozen), e != null))
      if (typeof e == "function") a(e, t);
      else if (typeof e == "object") Array.isArray(e) ? l(e) : o(e);
      else throw new TypeError("Expected usable value, not `" + e + "`");
    return this;
    function s(c) {
      if (typeof c == "function") a(c, []);
      else if (typeof c == "object")
        if (Array.isArray(c)) {
          const [u, ...h] = c;
          a(u, h);
        } else o(c);
      else throw new TypeError("Expected usable value, not `" + c + "`");
    }
    function o(c) {
      if (!("plugins" in c) && !("settings" in c))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither",
        );
      l(c.plugins), c.settings && (i.settings = ps(!0, i.settings, c.settings));
    }
    function l(c) {
      let u = -1;
      if (c != null)
        if (Array.isArray(c))
          for (; ++u < c.length; ) {
            const h = c[u];
            s(h);
          }
        else throw new TypeError("Expected a list of plugins, not `" + c + "`");
    }
    function a(c, u) {
      let h = -1,
        d = -1;
      for (; ++h < r.length; )
        if (r[h][0] === c) {
          d = h;
          break;
        }
      if (d === -1) r.push([c, ...u]);
      else if (u.length > 0) {
        let [f, ...p] = u;
        const y = r[d][1];
        io(y) && io(f) && (f = ps(!0, y, f)), (r[d] = [c, f, ...p]);
      }
    }
  }
}
const oo = new Fo().freeze();
function ks(n, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + n + "` without `parser`");
}
function xs(n, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + n + "` without `compiler`");
}
function bs(n, e) {
  if (e)
    throw new Error(
      "Cannot call `" +
        n +
        "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.",
    );
}
function za(n) {
  if (!io(n) || typeof n.type != "string")
    throw new TypeError("Expected node, got `" + n + "`");
}
function Pa(n, e, t) {
  if (!t)
    throw new Error("`" + n + "` finished async. Use `" + e + "` instead");
}
function si(n) {
  return Jg(n) ? n : new Hg(n);
}
function Jg(n) {
  return !!(n && typeof n == "object" && "message" in n && "messages" in n);
}
function Ug(n) {
  return typeof n == "string" || Yg(n);
}
function Yg(n) {
  return !!(
    n &&
    typeof n == "object" &&
    "byteLength" in n &&
    "byteOffset" in n
  );
}
var Ou = (n) => {
    throw TypeError(n);
  },
  Iu = (n, e, t) => e.has(n) || Ou("Cannot " + t),
  v = (n, e, t) => (
    Iu(n, e, "read from private field"), t ? t.call(n) : e.get(n)
  ),
  se = (n, e, t) =>
    e.has(n)
      ? Ou("Cannot add the same private member more than once")
      : e instanceof WeakSet
        ? e.add(n)
        : e.set(n, t),
  Z = (n, e, t, r) => (Iu(n, e, "write to private field"), e.set(n, t), t);
let Eu = class {},
  Au = class {
    constructor() {
      (this.elements = []),
        (this.size = () => this.elements.length),
        (this.top = () => this.elements.at(-1)),
        (this.push = (e) => {
          var t;
          (t = this.top()) == null || t.push(e);
        }),
        (this.open = (e) => {
          this.elements.push(e);
        }),
        (this.close = () => {
          const e = this.elements.pop();
          if (!e) throw Ac();
          return e;
        });
    }
  },
  Gg = class Du extends Eu {
    constructor(e, t, r) {
      super(), (this.type = e), (this.content = t), (this.attrs = r);
    }
    push(e, ...t) {
      this.content.push(e, ...t);
    }
    pop() {
      return this.content.pop();
    }
    static create(e, t, r) {
      return new Du(e, t, r);
    }
  };
var Xe, fr, pi, mi, gi, dr, pr;
const lo = class extends Au {
  constructor(e) {
    super(),
      se(this, Xe),
      se(this, fr),
      se(this, pi),
      se(this, mi),
      se(this, gi),
      se(this, dr),
      se(this, pr),
      Z(this, Xe, W.none),
      Z(this, fr, (t) => t.isText),
      Z(this, pi, (t, r) => {
        if (
          v(this, fr).call(this, t) &&
          v(this, fr).call(this, r) &&
          W.sameSet(t.marks, r.marks)
        )
          return this.schema.text(t.text + r.text, t.marks);
      }),
      Z(this, mi, (t) => {
        const r = Object.values({
          ...this.schema.nodes,
          ...this.schema.marks,
        }).find((i) => i.spec.parseMarkdown.match(t));
        if (!r) throw Bf(t);
        return r;
      }),
      Z(this, gi, (t) => {
        const r = v(this, mi).call(this, t);
        r.spec.parseMarkdown.runner(this, t, r);
      }),
      (this.injectRoot = (t, r, i) => (
        this.openNode(r, i), this.next(t.children), this
      )),
      (this.openNode = (t, r) => (this.open(Gg.create(t, [], r)), this)),
      Z(this, dr, () => {
        Z(this, Xe, W.none);
        const t = this.close();
        return v(this, pr).call(this, t.type, t.attrs, t.content);
      }),
      (this.closeNode = () => (v(this, dr).call(this), this)),
      Z(this, pr, (t, r, i) => {
        const s = t.createAndFill(r, i, v(this, Xe));
        if (!s) throw Pf(t, r, i);
        return this.push(s), s;
      }),
      (this.addNode = (t, r, i) => (v(this, pr).call(this, t, r, i), this)),
      (this.openMark = (t, r) => {
        const i = t.create(r);
        return Z(this, Xe, i.addToSet(v(this, Xe))), this;
      }),
      (this.closeMark = (t) => (
        Z(this, Xe, t.removeFromSet(v(this, Xe))), this
      )),
      (this.addText = (t) => {
        const r = this.top();
        if (!r) throw Ac();
        const i = r.pop(),
          s = this.schema.text(t, v(this, Xe));
        if (!i) return r.push(s), this;
        const o = v(this, pi).call(this, i, s);
        return o ? (r.push(o), this) : (r.push(i, s), this);
      }),
      (this.build = () => {
        let t;
        do t = v(this, dr).call(this);
        while (this.size());
        return t;
      }),
      (this.next = (t = []) => (
        [t].flat().forEach((r) => v(this, gi).call(this, r)), this
      )),
      (this.toDoc = () => this.build()),
      (this.run = (t, r) => {
        const i = t.runSync(t.parse(r), r);
        return this.next(i), this;
      }),
      (this.schema = e);
  }
};
(Xe = new WeakMap()),
  (fr = new WeakMap()),
  (pi = new WeakMap()),
  (mi = new WeakMap()),
  (gi = new WeakMap()),
  (dr = new WeakMap()),
  (pr = new WeakMap()),
  (lo.create = (n, e) => {
    const t = new lo(n);
    return (r) => (t.run(e, r), t.toDoc());
  });
let Qg = lo;
const ao = class extends Eu {
  constructor(e, t, r, i = {}) {
    super(),
      (this.type = e),
      (this.children = t),
      (this.value = r),
      (this.props = i),
      (this.push = (s, ...o) => {
        this.children || (this.children = []), this.children.push(s, ...o);
      }),
      (this.pop = () => {
        var s;
        return (s = this.children) == null ? void 0 : s.pop();
      });
  }
};
ao.create = (n, e, t, r = {}) => new ao(n, e, t, r);
let Ba = ao;
const Zg = (n) => Object.prototype.hasOwnProperty.call(n, "size");
var ft, mr, yi, ki, gr, xi, yr, bi, Si, On, en, wi, kr;
const co = class extends Au {
  constructor(e) {
    super(),
      se(this, ft),
      se(this, mr),
      se(this, yi),
      se(this, ki),
      se(this, gr),
      se(this, xi),
      se(this, yr),
      se(this, bi),
      se(this, Si),
      se(this, On),
      se(this, en),
      se(this, wi),
      se(this, kr),
      Z(this, ft, W.none),
      Z(this, mr, (t) => {
        const r = Object.values({
          ...this.schema.nodes,
          ...this.schema.marks,
        }).find((i) => i.spec.toMarkdown.match(t));
        if (!r) throw vf(t.type);
        return r;
      }),
      Z(this, yi, (t) =>
        v(this, mr).call(this, t).spec.toMarkdown.runner(this, t),
      ),
      Z(this, ki, (t, r) =>
        v(this, mr).call(this, t).spec.toMarkdown.runner(this, t, r),
      ),
      Z(this, gr, (t) => {
        const { marks: r } = t,
          i = (s) => s.type.spec.priority ?? 50;
        [...r]
          .sort((s, o) => i(s) - i(o))
          .every((s) => !v(this, ki).call(this, s, t)) &&
          v(this, yi).call(this, t),
          r.forEach((s) => v(this, kr).call(this, s));
      }),
      Z(this, xi, (t, r) => {
        var i;
        if (
          t.type === r ||
          ((i = t.children) == null ? void 0 : i.length) !== 1
        )
          return t;
        const s = (c) => {
            var u;
            if (c.type === r) return c;
            if (((u = c.children) == null ? void 0 : u.length) !== 1)
              return null;
            const [h] = c.children;
            return h ? s(h) : null;
          },
          o = s(t);
        if (!o) return t;
        const l = o.children ? [...o.children] : void 0,
          a = { ...t, children: l };
        return (a.children = l), (o.children = [a]), o;
      }),
      Z(this, yr, (t) => {
        const { children: r } = t;
        return (
          r &&
            (t.children = r.reduce((i, s, o) => {
              if (o === 0) return [s];
              const l = i.at(-1);
              if (l && l.isMark && s.isMark) {
                s = v(this, xi).call(this, s, l.type);
                const { children: a, ...c } = s,
                  { children: u, ...h } = l;
                if (
                  s.type === l.type &&
                  a &&
                  u &&
                  JSON.stringify(c) === JSON.stringify(h)
                ) {
                  const d = { ...h, children: [...u, ...a] };
                  return i.slice(0, -1).concat(v(this, yr).call(this, d));
                }
              }
              return i.concat(s);
            }, [])),
          t
        );
      }),
      Z(this, bi, (t) => {
        const r = { ...t.props, type: t.type };
        return (
          t.children && (r.children = t.children),
          t.value && (r.value = t.value),
          r
        );
      }),
      (this.openNode = (t, r, i) => (
        this.open(Ba.create(t, void 0, r, i)), this
      )),
      Z(this, Si, (t, r) => {
        let i = "",
          s = "";
        const o = t.children;
        let l = -1,
          a = -1;
        const c = (h) => {
          h &&
            h.forEach((d, f) => {
              d.type === "text" && d.value && (l < 0 && (l = f), (a = f));
            });
        };
        if (o) {
          c(o);
          const h = o == null ? void 0 : o[a],
            d = o == null ? void 0 : o[l];
          h &&
            h.value.endsWith(" ") &&
            ((s = h.value.match(/ +$/)[0]), (h.value = h.value.trimEnd())),
            d &&
              d.value.startsWith(" ") &&
              ((i = d.value.match(/^ +/)[0]), (d.value = d.value.trimStart()));
        }
        i.length && v(this, en).call(this, "text", void 0, i);
        const u = r();
        return s.length && v(this, en).call(this, "text", void 0, s), u;
      }),
      Z(this, On, (t = !1) => {
        const r = this.close(),
          i = () =>
            v(this, en).call(this, r.type, r.children, r.value, r.props);
        return t ? v(this, Si).call(this, r, i) : i();
      }),
      (this.closeNode = () => (v(this, On).call(this), this)),
      Z(this, en, (t, r, i, s) => {
        const o = Ba.create(t, r, i, s),
          l = v(this, yr).call(this, v(this, bi).call(this, o));
        return this.push(l), l;
      }),
      (this.addNode = (t, r, i, s) => (
        v(this, en).call(this, t, r, i, s), this
      )),
      Z(this, wi, (t, r, i, s) =>
        t.isInSet(v(this, ft))
          ? this
          : (Z(this, ft, t.addToSet(v(this, ft))),
            this.openNode(r, i, { ...s, isMark: !0 })),
      ),
      Z(this, kr, (t) => {
        t.isInSet(v(this, ft)) &&
          (Z(this, ft, t.type.removeFromSet(v(this, ft))),
          v(this, On).call(this, !0));
      }),
      (this.withMark = (t, r, i, s) => (
        v(this, wi).call(this, t, r, i, s), this
      )),
      (this.closeMark = (t) => (v(this, kr).call(this, t), this)),
      (this.build = () => {
        let t = null;
        do t = v(this, On).call(this);
        while (this.size());
        return t;
      }),
      (this.next = (t) =>
        Zg(t)
          ? (t.forEach((r) => {
              v(this, gr).call(this, r);
            }),
            this)
          : (v(this, gr).call(this, t), this)),
      (this.toString = (t) => t.stringify(this.build())),
      (this.run = (t) => (this.next(t), this)),
      (this.schema = e);
  }
};
(ft = new WeakMap()),
  (mr = new WeakMap()),
  (yi = new WeakMap()),
  (ki = new WeakMap()),
  (gr = new WeakMap()),
  (xi = new WeakMap()),
  (yr = new WeakMap()),
  (bi = new WeakMap()),
  (Si = new WeakMap()),
  (On = new WeakMap()),
  (en = new WeakMap()),
  (wi = new WeakMap()),
  (kr = new WeakMap()),
  (co.create = (n, e) => {
    const t = new co(n);
    return (r) => (t.run(r), t.toString(e));
  });
let Xg = co;
const Ru = 65535,
  zu = Math.pow(2, 16);
function ey(n, e) {
  return n + e * zu;
}
function va(n) {
  return n & Ru;
}
function ty(n) {
  return (n - (n & Ru)) / zu;
}
const Pu = 1,
  Bu = 2,
  Ci = 4,
  vu = 8;
class uo {
  constructor(e, t, r) {
    (this.pos = e), (this.delInfo = t), (this.recover = r);
  }
  get deleted() {
    return (this.delInfo & vu) > 0;
  }
  get deletedBefore() {
    return (this.delInfo & (Pu | Ci)) > 0;
  }
  get deletedAfter() {
    return (this.delInfo & (Bu | Ci)) > 0;
  }
  get deletedAcross() {
    return (this.delInfo & Ci) > 0;
  }
}
class Ee {
  constructor(e, t = !1) {
    if (((this.ranges = e), (this.inverted = t), !e.length && Ee.empty))
      return Ee.empty;
  }
  recover(e) {
    let t = 0,
      r = va(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + ty(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  _map(e, t, r) {
    let i = 0,
      s = this.inverted ? 2 : 1,
      o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e) break;
      let c = this.ranges[l + s],
        u = this.ranges[l + o],
        h = a + c;
      if (e <= h) {
        let d = c ? (e == a ? -1 : e == h ? 1 : t) : t,
          f = a + i + (d < 0 ? 0 : u);
        if (r) return f;
        let p = e == (t < 0 ? a : h) ? null : ey(l / 3, e - a),
          y = e == a ? Bu : e == h ? Pu : Ci;
        return (t < 0 ? e != a : e != h) && (y |= vu), new uo(f, y, p);
      }
      i += u - c;
    }
    return r ? e + i : new uo(e + i, 0, null);
  }
  touches(e, t) {
    let r = 0,
      i = va(t),
      s = this.inverted ? 2 : 1,
      o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e) break;
      let c = this.ranges[l + s],
        u = a + c;
      if (e <= u && l == i * 3) return !0;
      r += this.ranges[l + o] - c;
    }
    return !1;
  }
  forEach(e) {
    let t = this.inverted ? 2 : 1,
      r = this.inverted ? 1 : 2;
    for (let i = 0, s = 0; i < this.ranges.length; i += 3) {
      let o = this.ranges[i],
        l = o - (this.inverted ? s : 0),
        a = o + (this.inverted ? 0 : s),
        c = this.ranges[i + t],
        u = this.ranges[i + r];
      e(l, l + c, a, a + u), (s += u - c);
    }
  }
  invert() {
    return new Ee(this.ranges, !this.inverted);
  }
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  static offset(e) {
    return e == 0 ? Ee.empty : new Ee(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Ee.empty = new Ee([]);
class Er {
  constructor(e = [], t, r = 0, i = e.length) {
    (this.maps = e), (this.mirror = t), (this.from = r), (this.to = i);
  }
  slice(e = 0, t = this.maps.length) {
    return new Er(this.maps, this.mirror, e, t);
  }
  copy() {
    return new Er(
      this.maps.slice(),
      this.mirror && this.mirror.slice(),
      this.from,
      this.to,
    );
  }
  appendMap(e, t) {
    (this.to = this.maps.push(e)),
      t != null && this.setMirror(this.maps.length - 1, t);
  }
  appendMapping(e) {
    for (let t = 0, r = this.maps.length; t < e.maps.length; t++) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t], i != null && i < t ? r + i : void 0);
    }
  }
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e) return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  appendMappingInverted(e) {
    for (
      let t = e.maps.length - 1, r = this.maps.length + e.maps.length;
      t >= 0;
      t--
    ) {
      let i = e.getMirror(t);
      this.appendMap(
        e.maps[t].invert(),
        i != null && i > t ? r - i - 1 : void 0,
      );
    }
  }
  invert() {
    let e = new Er();
    return e.appendMappingInverted(this), e;
  }
  map(e, t = 1) {
    if (this.mirror) return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++) e = this.maps[r].map(e, t);
    return e;
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  _map(e, t, r) {
    let i = 0;
    for (let s = this.from; s < this.to; s++) {
      let o = this.maps[s],
        l = o.mapResult(e, t);
      if (l.recover != null) {
        let a = this.getMirror(s);
        if (a != null && a > s && a < this.to) {
          (s = a), (e = this.maps[a].recover(l.recover));
          continue;
        }
      }
      (i |= l.delInfo), (e = l.pos);
    }
    return r ? e : new uo(e, i, null);
  }
}
const Ss = Object.create(null);
class xe {
  getMap() {
    return Ee.empty;
  }
  merge(e) {
    return null;
  }
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = Ss[t.stepType];
    if (!r) throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  static jsonID(e, t) {
    if (e in Ss) throw new RangeError("Duplicate use of step JSON ID " + e);
    return (Ss[e] = t), (t.prototype.jsonID = e), t;
  }
}
class le {
  constructor(e, t) {
    (this.doc = e), (this.failed = t);
  }
  static ok(e) {
    return new le(e, null);
  }
  static fail(e) {
    return new le(null, e);
  }
  static fromReplace(e, t, r, i) {
    try {
      return le.ok(e.replace(t, r, i));
    } catch (s) {
      if (s instanceof vi) return le.fail(s.message);
      throw s;
    }
  }
}
function Lo(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let s = n.child(i);
    s.content.size && (s = s.copy(Lo(s.content, e, s))),
      s.isInline && (s = e(s, t, i)),
      r.push(s);
  }
  return C.fromArray(r);
}
class mt extends xe {
  constructor(e, t, r) {
    super(), (this.from = e), (this.to = t), (this.mark = r);
  }
  apply(e) {
    let t = e.slice(this.from, this.to),
      r = e.resolve(this.from),
      i = r.node(r.sharedDepth(this.to)),
      s = new T(
        Lo(
          t.content,
          (o, l) =>
            !o.isAtom || !l.type.allowsMarkType(this.mark.type)
              ? o
              : o.mark(this.mark.addToSet(o.marks)),
          i,
        ),
        t.openStart,
        t.openEnd,
      );
    return le.fromReplace(e, this.from, this.to, s);
  }
  invert() {
    return new nt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1),
      r = e.mapResult(this.to, -1);
    return (t.deleted && r.deleted) || t.pos >= r.pos
      ? null
      : new mt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof mt &&
      e.mark.eq(this.mark) &&
      this.from <= e.to &&
      this.to >= e.from
      ? new mt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark)
      : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to,
    };
  }
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new mt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
xe.jsonID("addMark", mt);
class nt extends xe {
  constructor(e, t, r) {
    super(), (this.from = e), (this.to = t), (this.mark = r);
  }
  apply(e) {
    let t = e.slice(this.from, this.to),
      r = new T(
        Lo(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e),
        t.openStart,
        t.openEnd,
      );
    return le.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new mt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1),
      r = e.mapResult(this.to, -1);
    return (t.deleted && r.deleted) || t.pos >= r.pos
      ? null
      : new nt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof nt &&
      e.mark.eq(this.mark) &&
      this.from <= e.to &&
      this.to >= e.from
      ? new nt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark)
      : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to,
    };
  }
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new nt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
xe.jsonID("removeMark", nt);
class zt extends xe {
  constructor(e, t) {
    super(), (this.pos = e), (this.mark = t);
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t) return le.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return le.fromReplace(
      e,
      this.pos,
      this.pos + 1,
      new T(C.from(r), 0, t.isLeaf ? 0 : 1),
    );
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r)) return new zt(this.pos, t.marks[i]);
        return new zt(this.pos, this.mark);
      }
    }
    return new _n(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new zt(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new zt(t.pos, e.markFromJSON(t.mark));
  }
}
xe.jsonID("addNodeMark", zt);
class _n extends xe {
  constructor(e, t) {
    super(), (this.pos = e), (this.mark = t);
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t) return le.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return le.fromReplace(
      e,
      this.pos,
      this.pos + 1,
      new T(C.from(r), 0, t.isLeaf ? 0 : 1),
    );
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks)
      ? this
      : new zt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new _n(t.pos, this.mark);
  }
  toJSON() {
    return {
      stepType: "removeNodeMark",
      pos: this.pos,
      mark: this.mark.toJSON(),
    };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new _n(t.pos, e.markFromJSON(t.mark));
  }
}
xe.jsonID("removeNodeMark", _n);
class fe extends xe {
  constructor(e, t, r, i = !1) {
    super(),
      (this.from = e),
      (this.to = t),
      (this.slice = r),
      (this.structure = i);
  }
  apply(e) {
    return this.structure && ho(e, this.from, this.to)
      ? le.fail("Structure replace would overwrite content")
      : le.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Ee([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new fe(
      this.from,
      this.from + this.slice.size,
      e.slice(this.from, this.to),
    );
  }
  map(e) {
    let t = e.mapResult(this.from, 1),
      r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross
      ? null
      : new fe(t.pos, Math.max(t.pos, r.pos), this.slice);
  }
  merge(e) {
    if (!(e instanceof fe) || e.structure || this.structure) return null;
    if (
      this.from + this.slice.size == e.from &&
      !this.slice.openEnd &&
      !e.slice.openStart
    ) {
      let t =
        this.slice.size + e.slice.size == 0
          ? T.empty
          : new T(
              this.slice.content.append(e.slice.content),
              this.slice.openStart,
              e.slice.openEnd,
            );
      return new fe(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t =
        this.slice.size + e.slice.size == 0
          ? T.empty
          : new T(
              e.slice.content.append(this.slice.content),
              e.slice.openStart,
              this.slice.openEnd,
            );
      return new fe(e.from, this.to, t, this.structure);
    } else return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return (
      this.slice.size && (e.slice = this.slice.toJSON()),
      this.structure && (e.structure = !0),
      e
    );
  }
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new fe(t.from, t.to, T.fromJSON(e, t.slice), !!t.structure);
  }
}
xe.jsonID("replace", fe);
class ke extends xe {
  constructor(e, t, r, i, s, o, l = !1) {
    super(),
      (this.from = e),
      (this.to = t),
      (this.gapFrom = r),
      (this.gapTo = i),
      (this.slice = s),
      (this.insert = o),
      (this.structure = l);
  }
  apply(e) {
    if (
      this.structure &&
      (ho(e, this.from, this.gapFrom) || ho(e, this.gapTo, this.to))
    )
      return le.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd) return le.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r
      ? le.fromReplace(e, this.from, this.to, r)
      : le.fail("Content does not fit in gap");
  }
  getMap() {
    return new Ee([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert,
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new ke(
      this.from,
      this.from + this.slice.size + t,
      this.from + this.insert,
      this.from + this.insert + t,
      e
        .slice(this.from, this.to)
        .removeBetween(this.gapFrom - this.from, this.gapTo - this.from),
      this.gapFrom - this.from,
      this.structure,
    );
  }
  map(e) {
    let t = e.mapResult(this.from, 1),
      r = e.mapResult(this.to, -1),
      i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1),
      s = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return (t.deletedAcross && r.deletedAcross) || i < t.pos || s > r.pos
      ? null
      : new ke(t.pos, r.pos, i, s, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert,
    };
    return (
      this.slice.size && (e.slice = this.slice.toJSON()),
      this.structure && (e.structure = !0),
      e
    );
  }
  static fromJSON(e, t) {
    if (
      typeof t.from != "number" ||
      typeof t.to != "number" ||
      typeof t.gapFrom != "number" ||
      typeof t.gapTo != "number" ||
      typeof t.insert != "number"
    )
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new ke(
      t.from,
      t.to,
      t.gapFrom,
      t.gapTo,
      T.fromJSON(e, t.slice),
      t.insert,
      !!t.structure,
    );
  }
}
xe.jsonID("replaceAround", ke);
function ho(n, e, t) {
  let r = n.resolve(e),
    i = t - e,
    s = r.depth;
  for (; i > 0 && s > 0 && r.indexAfter(s) == r.node(s).childCount; ) s--, i--;
  if (i > 0) {
    let o = r.node(s).maybeChild(r.indexAfter(s));
    for (; i > 0; ) {
      if (!o || o.isLeaf) return !0;
      (o = o.firstChild), i--;
    }
  }
  return !1;
}
function ny(n, e, t, r) {
  let i = [],
    s = [],
    o,
    l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline) return;
    let h = a.marks;
    if (!r.isInSet(h) && u.type.allowsMarkType(r.type)) {
      let d = Math.max(c, e),
        f = Math.min(c + a.nodeSize, t),
        p = r.addToSet(h);
      for (let y = 0; y < h.length; y++)
        h[y].isInSet(p) ||
          (o && o.to == d && o.mark.eq(h[y])
            ? (o.to = f)
            : i.push((o = new nt(d, f, h[y]))));
      l && l.to == d ? (l.to = f) : s.push((l = new mt(d, f, r)));
    }
  }),
    i.forEach((a) => n.step(a)),
    s.forEach((a) => n.step(a));
}
function ry(n, e, t, r) {
  let i = [],
    s = 0;
  n.doc.nodesBetween(e, t, (o, l) => {
    if (!o.isInline) return;
    s++;
    let a = null;
    if (r instanceof Ui) {
      let c = o.marks,
        u;
      for (; (u = r.isInSet(c)); )
        (a || (a = [])).push(u), (c = u.removeFromSet(c));
    } else r ? r.isInSet(o.marks) && (a = [r]) : (a = o.marks);
    if (a && a.length) {
      let c = Math.min(l + o.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let h = a[u],
          d;
        for (let f = 0; f < i.length; f++) {
          let p = i[f];
          p.step == s - 1 && h.eq(i[f].style) && (d = p);
        }
        d
          ? ((d.to = c), (d.step = s))
          : i.push({ style: h, from: Math.max(l, e), to: c, step: s });
      }
    }
  }),
    i.forEach((o) => n.step(new nt(o.from, o.to, o.style)));
}
function $o(n, e, t, r = t.contentMatch, i = !0) {
  let s = n.doc.nodeAt(e),
    o = [],
    l = e + 1;
  for (let a = 0; a < s.childCount; a++) {
    let c = s.child(a),
      u = l + c.nodeSize,
      h = r.matchType(c.type);
    if (!h) o.push(new fe(l, u, T.empty));
    else {
      r = h;
      for (let d = 0; d < c.marks.length; d++)
        t.allowsMarkType(c.marks[d].type) || n.step(new nt(l, u, c.marks[d]));
      if (i && c.isText && t.whitespace != "pre") {
        let d,
          f = /\r?\n|\r/g,
          p;
        for (; (d = f.exec(c.text)); )
          p ||
            (p = new T(
              C.from(t.schema.text(" ", t.allowedMarks(c.marks))),
              0,
              0,
            )),
            o.push(new fe(l + d.index, l + d.index + d[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(C.empty, !0);
    n.replace(l, l, new T(a, 0, 0));
  }
  for (let a = o.length - 1; a >= 0; a--) n.step(o[a]);
}
function iy(n, e, t) {
  return (
    (e == 0 || n.canReplace(e, n.childCount)) &&
    (t == n.childCount || n.canReplace(0, t))
  );
}
function Qi(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth; ; --r) {
    let i = n.$from.node(r),
      s = n.$from.index(r),
      o = n.$to.indexAfter(r);
    if (r < n.depth && i.canReplace(s, o, t)) return r;
    if (r == 0 || i.type.spec.isolating || !iy(i, s, o)) break;
  }
  return null;
}
function sy(n, e, t) {
  let { $from: r, $to: i, depth: s } = e,
    o = r.before(s + 1),
    l = i.after(s + 1),
    a = o,
    c = l,
    u = C.empty,
    h = 0;
  for (let p = s, y = !1; p > t; p--)
    y || r.index(p) > 0
      ? ((y = !0), (u = C.from(r.node(p).copy(u))), h++)
      : a--;
  let d = C.empty,
    f = 0;
  for (let p = s, y = !1; p > t; p--)
    y || i.after(p + 1) < i.end(p)
      ? ((y = !0), (d = C.from(i.node(p).copy(d))), f++)
      : c++;
  n.step(new ke(a, c, o, l, new T(u.append(d), h, f), u.size - h, !0));
}
function Fu(n, e, t = null, r = n) {
  let i = oy(n, e),
    s = i && ly(r, e);
  return s ? i.map(Fa).concat({ type: e, attrs: t }).concat(s.map(Fa)) : null;
}
function Fa(n) {
  return { type: n, attrs: null };
}
function oy(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n,
    s = t.contentMatchAt(r).findWrapping(e);
  if (!s) return null;
  let o = s.length ? s[0] : e;
  return t.canReplaceWith(r, i, o) ? s : null;
}
function ly(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n,
    s = t.child(r),
    o = e.contentMatch.findWrapping(s.type);
  if (!o) return null;
  let a = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++) a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : o;
}
function ay(n, e, t) {
  let r = C.empty;
  for (let o = t.length - 1; o >= 0; o--) {
    if (r.size) {
      let l = t[o].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError(
          "Wrapper type given to Transform.wrap does not form valid content of its parent wrapper",
        );
    }
    r = C.from(t[o].type.create(t[o].attrs, r));
  }
  let i = e.start,
    s = e.end;
  n.step(new ke(i, s, i, s, new T(r, 0, 0), t.length, !0));
}
function cy(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = n.steps.length;
  n.doc.nodesBetween(e, t, (o, l) => {
    let a = typeof i == "function" ? i(o) : i;
    if (
      o.isTextblock &&
      !o.hasMarkup(r, a) &&
      uy(n.doc, n.mapping.slice(s).map(l), r)
    ) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let f = r.whitespace == "pre",
          p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        f && !p ? (c = !1) : !f && p && (c = !0);
      }
      c === !1 && $u(n, o, l, s),
        $o(n, n.mapping.slice(s).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(s),
        h = u.map(l, 1),
        d = u.map(l + o.nodeSize, 1);
      return (
        n.step(
          new ke(
            h,
            d,
            h + 1,
            d - 1,
            new T(C.from(r.create(a, null, o.marks)), 0, 0),
            1,
            !0,
          ),
        ),
        c === !0 && Lu(n, o, l, s),
        !1
      );
    }
  });
}
function Lu(n, e, t, r) {
  e.forEach((i, s) => {
    if (i.isText) {
      let o,
        l = /\r?\n|\r/g;
      for (; (o = l.exec(i.text)); ) {
        let a = n.mapping.slice(r).map(t + 1 + s + o.index);
        n.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function $u(n, e, t, r) {
  e.forEach((i, s) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let o = n.mapping.slice(r).map(t + 1 + s);
      n.replaceWith(
        o,
        o + 1,
        e.type.schema.text(`
`),
      );
    }
  });
}
function uy(n, e, t) {
  let r = n.resolve(e),
    i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function hy(n, e, t, r, i) {
  let s = n.doc.nodeAt(e);
  if (!s) throw new RangeError("No node at given position");
  t || (t = s.type);
  let o = t.create(r, null, i || s.marks);
  if (s.isLeaf) return n.replaceWith(e, e + s.nodeSize, o);
  if (!t.validContent(s.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(
    new ke(
      e,
      e + s.nodeSize,
      e + 1,
      e + s.nodeSize - 1,
      new T(C.from(o), 0, 0),
      1,
      !0,
    ),
  );
}
function Ar(n, e, t = 1, r) {
  let i = n.resolve(e),
    s = i.depth - t,
    o = (r && r[r.length - 1]) || i.parent;
  if (
    s < 0 ||
    i.parent.type.spec.isolating ||
    !i.parent.canReplace(i.index(), i.parent.childCount) ||
    !o.type.validContent(
      i.parent.content.cutByIndex(i.index(), i.parent.childCount),
    )
  )
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > s; c--, u--) {
    let h = i.node(c),
      d = i.index(c);
    if (h.type.spec.isolating) return !1;
    let f = h.content.cutByIndex(d, h.childCount),
      p = r && r[u + 1];
    p && (f = f.replaceChild(0, p.type.create(p.attrs)));
    let y = (r && r[u]) || h;
    if (!h.canReplace(d + 1, h.childCount) || !y.type.validContent(f))
      return !1;
  }
  let l = i.indexAfter(s),
    a = r && r[0];
  return i.node(s).canReplaceWith(l, l, a ? a.type : i.node(s + 1).type);
}
function fy(n, e, t = 1, r) {
  let i = n.doc.resolve(e),
    s = C.empty,
    o = C.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    s = C.from(i.node(l).copy(s));
    let u = r && r[c];
    o = C.from(u ? u.type.create(u.attrs, o) : i.node(l).copy(o));
  }
  n.step(new fe(e, e, new T(s.append(o), t, t), !0));
}
function Zi(n, e) {
  let t = n.resolve(e),
    r = t.index();
  return py(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function dy(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount),
    { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let s = e.child(i),
      o = s.type == r ? n.type.schema.nodes.text : s.type;
    if (((t = t.matchType(o)), !t || !n.type.allowsMarks(s.marks))) return !1;
  }
  return t.validEnd;
}
function py(n, e) {
  return !!(n && e && !n.isLeaf && dy(n, e));
}
function my(n, e, t) {
  let r = null,
    { linebreakReplacement: i } = n.doc.type.schema,
    s = n.doc.resolve(e - t),
    o = s.node().type;
  if (i && o.inlineContent) {
    let u = o.whitespace == "pre",
      h = !!o.contentMatch.matchType(i);
    u && !h ? (r = !1) : !u && h && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    $u(n, u.node(), u.before(), l);
  }
  o.inlineContent &&
    $o(n, e + t - 1, o, s.node().contentMatchAt(s.index()), r == null);
  let a = n.mapping.slice(l),
    c = a.map(e - t);
  if ((n.step(new fe(c, a.map(e + t, -1), T.empty, !0)), r === !0)) {
    let u = n.doc.resolve(c);
    Lu(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function gy(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t)) return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.index(i);
      if (r.node(i).canReplaceWith(s, s, t)) return r.before(i + 1);
      if (s > 0) return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.indexAfter(i);
      if (r.node(i).canReplaceWith(s, s, t)) return r.after(i + 1);
      if (s < r.node(i).childCount) return null;
    }
  return null;
}
function yy(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size) return e;
  let i = t.content;
  for (let s = 0; s < t.openStart; s++) i = i.firstChild.content;
  for (let s = 1; s <= (t.openStart == 0 && t.size ? 2 : 1); s++)
    for (let o = r.depth; o >= 0; o--) {
      let l =
          o == r.depth
            ? 0
            : r.pos <= (r.start(o + 1) + r.end(o + 1)) / 2
              ? -1
              : 1,
        a = r.index(o) + (l > 0 ? 1 : 0),
        c = r.node(o),
        u = !1;
      if (s == 1) u = c.canReplace(a, a, i);
      else {
        let h = c.contentMatchAt(a).findWrapping(i.firstChild.type);
        u = h && c.canReplaceWith(a, a, h[0]);
      }
      if (u) return l == 0 ? r.pos : l < 0 ? r.before(o + 1) : r.after(o + 1);
    }
  return null;
}
function Vo(n, e, t = e, r = T.empty) {
  if (e == t && !r.size) return null;
  let i = n.resolve(e),
    s = n.resolve(t);
  return Vu(i, s, r) ? new fe(e, t, r) : new ky(i, s, r).fit();
}
function Vu(n, e, t) {
  return (
    !t.openStart &&
    !t.openEnd &&
    n.start() == e.start() &&
    n.parent.canReplace(n.index(), e.index(), t.content)
  );
}
class ky {
  constructor(e, t, r) {
    (this.$from = e),
      (this.$to = t),
      (this.unplaced = r),
      (this.frontier = []),
      (this.placed = C.empty);
    for (let i = 0; i <= e.depth; i++) {
      let s = e.node(i);
      this.frontier.push({
        type: s.type,
        match: s.contentMatchAt(e.indexAfter(i)),
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = C.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(),
      t = this.placed.size - this.depth - this.$from.depth,
      r = this.$from,
      i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i) return null;
    let s = this.placed,
      o = r.depth,
      l = i.depth;
    for (; o && l && s.childCount == 1; ) (s = s.firstChild.content), o--, l--;
    let a = new T(s, o, l);
    return e > -1
      ? new ke(r.pos, e, this.$to.pos, this.$to.end(), a, t)
      : a.size || r.pos != this.$to.pos
        ? new fe(r.pos, i.pos, a)
        : null;
  }
  findFittable() {
    let e = this.unplaced.openStart;
    for (
      let t = this.unplaced.content, r = 0, i = this.unplaced.openEnd;
      r < e;
      r++
    ) {
      let s = t.firstChild;
      if ((t.childCount > 1 && (i = 0), s.type.spec.isolating && i <= r)) {
        e = r;
        break;
      }
      t = s.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i,
          s = null;
        r
          ? ((s = ws(this.unplaced.content, r - 1).firstChild), (i = s.content))
          : (i = this.unplaced.content);
        let o = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l],
            u,
            h = null;
          if (
            t == 1 &&
            (o
              ? c.matchType(o.type) || (h = c.fillBefore(C.from(o), !1))
              : s && a.compatibleContent(s.type))
          )
            return { sliceDepth: r, frontierDepth: l, parent: s, inject: h };
          if (t == 2 && o && (u = c.findWrapping(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, wrap: u };
          if (s && c.matchType(s.type)) break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced,
      i = ws(e, t);
    return !i.childCount || i.firstChild.isLeaf
      ? !1
      : ((this.unplaced = new T(
          e,
          t + 1,
          Math.max(r, i.size + t >= e.size - r ? t + 1 : 0),
        )),
        !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced,
      i = ws(e, t);
    if (i.childCount <= 1 && t > 0) {
      let s = e.size - t <= t + i.size;
      this.unplaced = new T(xr(e, t - 1, 1), t - 1, s ? t - 1 : r);
    } else this.unplaced = new T(xr(e, t, 1), t, r);
  }
  placeNodes({
    sliceDepth: e,
    frontierDepth: t,
    parent: r,
    inject: i,
    wrap: s,
  }) {
    for (; this.depth > t; ) this.closeFrontierNode();
    if (s) for (let y = 0; y < s.length; y++) this.openFrontierNode(s[y]);
    let o = this.unplaced,
      l = r ? r.content : o.content,
      a = o.openStart - e,
      c = 0,
      u = [],
      { match: h, type: d } = this.frontier[t];
    if (i) {
      for (let y = 0; y < i.childCount; y++) u.push(i.child(y));
      h = h.matchFragment(i);
    }
    let f = l.size + e - (o.content.size - o.openEnd);
    for (; c < l.childCount; ) {
      let y = l.child(c),
        x = h.matchType(y.type);
      if (!x) break;
      c++,
        (c > 1 || a == 0 || y.content.size) &&
          ((h = x),
          u.push(
            Wu(
              y.mark(d.allowedMarks(y.marks)),
              c == 1 ? a : 0,
              c == l.childCount ? f : -1,
            ),
          ));
    }
    let p = c == l.childCount;
    p || (f = -1),
      (this.placed = br(this.placed, t, C.from(u))),
      (this.frontier[t].match = h),
      p &&
        f < 0 &&
        r &&
        r.type == this.frontier[this.depth].type &&
        this.frontier.length > 1 &&
        this.closeFrontierNode();
    for (let y = 0, x = l; y < f; y++) {
      let k = x.lastChild;
      this.frontier.push({
        type: k.type,
        match: k.contentMatchAt(k.childCount),
      }),
        (x = k.content);
    }
    this.unplaced = p
      ? e == 0
        ? T.empty
        : new T(xr(o.content, e - 1, 1), e - 1, f < 0 ? o.openEnd : e - 1)
      : new T(xr(o.content, e, c), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock) return -1;
    let e = this.frontier[this.depth],
      t;
    if (
      !e.type.isTextblock ||
      !Cs(this.$to, this.$to.depth, e.type, e.match, !1) ||
      (this.$to.depth == this.depth &&
        (t = this.findCloseLevel(this.$to)) &&
        t.depth == this.depth)
    )
      return -1;
    let { depth: r } = this.$to,
      i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); ) ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t],
        s = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)),
        o = Cs(e, t, i, r, s);
      if (o) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l],
            u = Cs(e, l, c, a, !0);
          if (!u || u.childCount) continue e;
        }
        return {
          depth: t,
          fit: o,
          move: s ? e.doc.resolve(e.after(t + 1)) : e,
        };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t) return null;
    for (; this.depth > t.depth; ) this.closeFrontierNode();
    t.fit.childCount && (this.placed = br(this.placed, t.depth, t.fit)),
      (e = t.move);
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r),
        s = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, s);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    (i.match = i.match.matchType(e)),
      (this.placed = br(this.placed, this.depth, C.from(e.create(t, r)))),
      this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(C.empty, !0);
    t.childCount && (this.placed = br(this.placed, this.frontier.length, t));
  }
}
function xr(n, e, t) {
  return e == 0
    ? n.cutByIndex(t, n.childCount)
    : n.replaceChild(0, n.firstChild.copy(xr(n.firstChild.content, e - 1, t)));
}
function br(n, e, t) {
  return e == 0
    ? n.append(t)
    : n.replaceChild(
        n.childCount - 1,
        n.lastChild.copy(br(n.lastChild.content, e - 1, t)),
      );
}
function ws(n, e) {
  for (let t = 0; t < e; t++) n = n.firstChild.content;
  return n;
}
function Wu(n, e, t) {
  if (e <= 0) return n;
  let r = n.content;
  return (
    e > 1 &&
      (r = r.replaceChild(
        0,
        Wu(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0),
      )),
    e > 0 &&
      ((r = n.type.contentMatch.fillBefore(r).append(r)),
      t <= 0 &&
        (r = r.append(
          n.type.contentMatch.matchFragment(r).fillBefore(C.empty, !0),
        ))),
    n.copy(r)
  );
}
function Cs(n, e, t, r, i) {
  let s = n.node(e),
    o = i ? n.indexAfter(e) : n.index(e);
  if (o == s.childCount && !t.compatibleContent(s.type)) return null;
  let l = r.fillBefore(s.content, !0, o);
  return l && !xy(t, s.content, o) ? l : null;
}
function xy(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks)) return !0;
  return !1;
}
function by(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Sy(n, e, t, r) {
  if (!r.size) return n.deleteRange(e, t);
  let i = n.doc.resolve(e),
    s = n.doc.resolve(t);
  if (Vu(i, s, r)) return n.step(new fe(e, t, r));
  let o = Hu(i, n.doc.resolve(t));
  o[o.length - 1] == 0 && o.pop();
  let l = -(i.depth + 1);
  o.unshift(l);
  for (let d = i.depth, f = i.pos - 1; d > 0; d--, f--) {
    let p = i.node(d).type.spec;
    if (p.defining || p.definingAsContext || p.isolating) break;
    o.indexOf(d) > -1 ? (l = d) : i.before(d) == f && o.splice(1, 0, -d);
  }
  let a = o.indexOf(l),
    c = [],
    u = r.openStart;
  for (let d = r.content, f = 0; ; f++) {
    let p = d.firstChild;
    if ((c.push(p), f == r.openStart)) break;
    d = p.content;
  }
  for (let d = u - 1; d >= 0; d--) {
    let f = c[d],
      p = by(f.type);
    if (p && !f.sameMarkup(i.node(Math.abs(l) - 1))) u = d;
    else if (p || !f.type.isTextblock) break;
  }
  for (let d = r.openStart; d >= 0; d--) {
    let f = (d + u + 1) % (r.openStart + 1),
      p = c[f];
    if (p)
      for (let y = 0; y < o.length; y++) {
        let x = o[(y + a) % o.length],
          k = !0;
        x < 0 && ((k = !1), (x = -x));
        let E = i.node(x - 1),
          N = i.index(x - 1);
        if (E.canReplaceWith(N, N, p.type, p.marks))
          return n.replace(
            i.before(x),
            k ? s.after(x) : t,
            new T(qu(r.content, 0, r.openStart, f), f, r.openEnd),
          );
      }
  }
  let h = n.steps.length;
  for (
    let d = o.length - 1;
    d >= 0 && (n.replace(e, t, r), !(n.steps.length > h));
    d--
  ) {
    let f = o[d];
    f < 0 || ((e = i.before(f)), (t = s.after(f)));
  }
}
function qu(n, e, t, r, i) {
  if (e < t) {
    let s = n.firstChild;
    n = n.replaceChild(0, s.copy(qu(s.content, e + 1, t, r, s)));
  }
  if (e > r) {
    let s = i.contentMatchAt(0),
      o = s.fillBefore(n).append(n);
    n = o.append(s.matchFragment(o).fillBefore(C.empty, !0));
  }
  return n;
}
function wy(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = gy(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new T(C.from(r), 0, 0));
}
function Cy(n, e, t) {
  let r = n.doc.resolve(e),
    i = n.doc.resolve(t),
    s = Hu(r, i);
  for (let o = 0; o < s.length; o++) {
    let l = s[o],
      a = o == s.length - 1;
    if ((a && l == 0) || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), i.end(l));
    if (
      l > 0 &&
      (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1)))
    )
      return n.delete(r.before(l), i.after(l));
  }
  for (let o = 1; o <= r.depth && o <= i.depth; o++)
    if (
      e - r.start(o) == r.depth - o &&
      t > r.end(o) &&
      i.end(o) - t != i.depth - o &&
      r.start(o - 1) == i.start(o - 1) &&
      r.node(o - 1).canReplace(r.index(o - 1), i.index(o - 1))
    )
      return n.delete(r.before(o), t);
  n.delete(e, t);
}
function Hu(n, e) {
  let t = [],
    r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let s = n.start(i);
    if (
      s < n.pos - (n.depth - i) ||
      e.end(i) > e.pos + (e.depth - i) ||
      n.node(i).type.spec.isolating ||
      e.node(i).type.spec.isolating
    )
      break;
    (s == e.start(i) ||
      (i == n.depth &&
        i == e.depth &&
        n.parent.inlineContent &&
        e.parent.inlineContent &&
        i &&
        e.start(i - 1) == s - 1)) &&
      t.push(i);
  }
  return t;
}
class vn extends xe {
  constructor(e, t, r) {
    super(), (this.pos = e), (this.attr = t), (this.value = r);
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t) return le.fail("No node at attribute step's position");
    let r = Object.create(null);
    for (let s in t.attrs) r[s] = t.attrs[s];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return le.fromReplace(
      e,
      this.pos,
      this.pos + 1,
      new T(C.from(i), 0, t.isLeaf ? 0 : 1),
    );
  }
  getMap() {
    return Ee.empty;
  }
  invert(e) {
    return new vn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new vn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return {
      stepType: "attr",
      pos: this.pos,
      attr: this.attr,
      value: this.value,
    };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new vn(t.pos, t.attr, t.value);
  }
}
xe.jsonID("attr", vn);
class Lr extends xe {
  constructor(e, t) {
    super(), (this.attr = e), (this.value = t);
  }
  apply(e) {
    let t = Object.create(null);
    for (let i in e.attrs) t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return le.ok(r);
  }
  getMap() {
    return Ee.empty;
  }
  invert(e) {
    return new Lr(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new Lr(t.attr, t.value);
  }
}
xe.jsonID("docAttr", Lr);
let jn = class extends Error {};
jn = function n(e) {
  let t = Error.call(this, e);
  return (t.__proto__ = n.prototype), t;
};
jn.prototype = Object.create(Error.prototype);
jn.prototype.constructor = jn;
jn.prototype.name = "TransformError";
class My {
  constructor(e) {
    (this.doc = e),
      (this.steps = []),
      (this.docs = []),
      (this.mapping = new Er());
  }
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed) throw new jn(t.failed);
    return this;
  }
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  get docChanged() {
    return this.steps.length > 0;
  }
  addStep(e, t) {
    this.docs.push(this.doc),
      this.steps.push(e),
      this.mapping.appendMap(e.getMap()),
      (this.doc = t);
  }
  replace(e, t = e, r = T.empty) {
    let i = Vo(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  replaceWith(e, t, r) {
    return this.replace(e, t, new T(C.from(r), 0, 0));
  }
  delete(e, t) {
    return this.replace(e, t, T.empty);
  }
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  replaceRange(e, t, r) {
    return Sy(this, e, t, r), this;
  }
  replaceRangeWith(e, t, r) {
    return wy(this, e, t, r), this;
  }
  deleteRange(e, t) {
    return Cy(this, e, t), this;
  }
  lift(e, t) {
    return sy(this, e, t), this;
  }
  join(e, t = 1) {
    return my(this, e, t), this;
  }
  wrap(e, t) {
    return ay(this, e, t), this;
  }
  setBlockType(e, t = e, r, i = null) {
    return cy(this, e, t, r, i), this;
  }
  setNodeMarkup(e, t, r = null, i) {
    return hy(this, e, t, r, i), this;
  }
  setNodeAttribute(e, t, r) {
    return this.step(new vn(e, t, r)), this;
  }
  setDocAttribute(e, t) {
    return this.step(new Lr(e, t)), this;
  }
  addNodeMark(e, t) {
    return this.step(new zt(e, t)), this;
  }
  removeNodeMark(e, t) {
    if (!(t instanceof W)) {
      let r = this.doc.nodeAt(e);
      if (!r) throw new RangeError("No node at position " + e);
      if (((t = t.isInSet(r.marks)), !t)) return this;
    }
    return this.step(new _n(e, t)), this;
  }
  split(e, t = 1, r) {
    return fy(this, e, t, r), this;
  }
  addMark(e, t, r) {
    return ny(this, e, t, r), this;
  }
  removeMark(e, t, r) {
    return ry(this, e, t, r), this;
  }
  clearIncompatible(e, t, r) {
    return $o(this, e, t, r), this;
  }
}
const Ms = Object.create(null);
class H {
  constructor(e, t, r) {
    (this.$anchor = e),
      (this.$head = t),
      (this.ranges = r || [new Ny(e.min(t), e.max(t))]);
  }
  get anchor() {
    return this.$anchor.pos;
  }
  get head() {
    return this.$head.pos;
  }
  get from() {
    return this.$from.pos;
  }
  get to() {
    return this.$to.pos;
  }
  get $from() {
    return this.ranges[0].$from;
  }
  get $to() {
    return this.ranges[0].$to;
  }
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos) return !1;
    return !0;
  }
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  replace(e, t = T.empty) {
    let r = t.content.lastChild,
      i = null;
    for (let l = 0; l < t.openEnd; l++) (i = r), (r = r.lastChild);
    let s = e.steps.length,
      o = this.ranges;
    for (let l = 0; l < o.length; l++) {
      let { $from: a, $to: c } = o[l],
        u = e.mapping.slice(s);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? T.empty : t),
        l == 0 && Va(e, s, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  replaceWith(e, t) {
    let r = e.steps.length,
      i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      let { $from: o, $to: l } = i[s],
        a = e.mapping.slice(r),
        c = a.map(o.pos),
        u = a.map(l.pos);
      s
        ? e.deleteRange(c, u)
        : (e.replaceRangeWith(c, u, t), Va(e, r, t.isInline ? -1 : 1));
    }
  }
  static findFrom(e, t, r = !1) {
    let i = e.parent.inlineContent
      ? new J(e)
      : In(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i) return i;
    for (let s = e.depth - 1; s >= 0; s--) {
      let o =
        t < 0
          ? In(e.node(0), e.node(s), e.before(s + 1), e.index(s), t, r)
          : In(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, t, r);
      if (o) return o;
    }
    return null;
  }
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new De(e.node(0));
  }
  static atStart(e) {
    return In(e, e, 0, 0, 1) || new De(e);
  }
  static atEnd(e) {
    return In(e, e, e.content.size, e.childCount, -1) || new De(e);
  }
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Ms[t.type];
    if (!r) throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  static jsonID(e, t) {
    if (e in Ms)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return (Ms[e] = t), (t.prototype.jsonID = e), t;
  }
  getBookmark() {
    return J.between(this.$anchor, this.$head).getBookmark();
  }
}
H.prototype.visible = !0;
class Ny {
  constructor(e, t) {
    (this.$from = e), (this.$to = t);
  }
}
let La = !1;
function $a(n) {
  !La &&
    !n.parent.inlineContent &&
    ((La = !0),
    console.warn(
      "TextSelection endpoint not pointing into a node with inline content (" +
        n.parent.type.name +
        ")",
    ));
}
class J extends H {
  constructor(e, t = e) {
    $a(e), $a(t), super(e, t);
  }
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent) return H.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new J(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = T.empty) {
    if ((super.replace(e, t), t == T.empty)) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof J && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Xi(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new J(e.resolve(t.anchor), e.resolve(t.head));
  }
  static create(e, t, r = t) {
    let i = e.resolve(t);
    return new this(i, r == t ? i : e.resolve(r));
  }
  static between(e, t, r) {
    let i = e.pos - t.pos;
    if (((!r || i) && (r = i >= 0 ? 1 : -1), !t.parent.inlineContent)) {
      let s = H.findFrom(t, r, !0) || H.findFrom(t, -r, !0);
      if (s) t = s.$head;
      else return H.near(t, r);
    }
    return (
      e.parent.inlineContent ||
        (i == 0
          ? (e = t)
          : ((e = (H.findFrom(e, -r, !0) || H.findFrom(e, r, !0)).$anchor),
            e.pos < t.pos != i < 0 && (e = t))),
      new J(e, t)
    );
  }
}
H.jsonID("text", J);
class Xi {
  constructor(e, t) {
    (this.anchor = e), (this.head = t);
  }
  map(e) {
    return new Xi(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return J.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class P extends H {
  constructor(e) {
    let t = e.nodeAfter,
      r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), (this.node = t);
  }
  map(e, t) {
    let { deleted: r, pos: i } = t.mapResult(this.anchor),
      s = e.resolve(i);
    return r ? H.near(s) : new P(s);
  }
  content() {
    return new T(C.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof P && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Wo(this.anchor);
  }
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new P(e.resolve(t.anchor));
  }
  static create(e, t) {
    return new P(e.resolve(t));
  }
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
P.prototype.visible = !1;
H.jsonID("node", P);
class Wo {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Xi(r, r) : new Wo(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor),
      r = t.nodeAfter;
    return r && P.isSelectable(r) ? new P(t) : H.near(t);
  }
}
class De extends H {
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = T.empty) {
    if (t == T.empty) {
      e.delete(0, e.doc.content.size);
      let r = H.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  static fromJSON(e) {
    return new De(e);
  }
  map(e) {
    return new De(e);
  }
  eq(e) {
    return e instanceof De;
  }
  getBookmark() {
    return Ty;
  }
}
H.jsonID("all", De);
const Ty = {
  map() {
    return this;
  },
  resolve(n) {
    return new De(n);
  },
};
function In(n, e, t, r, i, s = !1) {
  if (e.inlineContent) return J.create(n, t);
  for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < e.childCount : o >= 0; o += i) {
    let l = e.child(o);
    if (l.isAtom) {
      if (!s && P.isSelectable(l))
        return P.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = In(n, l, t + i, i < 0 ? l.childCount : 0, i, s);
      if (a) return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Va(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e) return;
  let i = n.steps[r];
  if (!(i instanceof fe || i instanceof ke)) return;
  let s = n.mapping.maps[r],
    o;
  s.forEach((l, a, c, u) => {
    o == null && (o = u);
  }),
    n.setSelection(H.near(n.doc.resolve(o), t));
}
const Wa = 1,
  qa = 2,
  Ha = 4;
class Oy extends My {
  constructor(e) {
    super(e.doc),
      (this.curSelectionFor = 0),
      (this.updated = 0),
      (this.meta = Object.create(null)),
      (this.time = Date.now()),
      (this.curSelection = e.selection),
      (this.storedMarks = e.storedMarks);
  }
  get selection() {
    return (
      this.curSelectionFor < this.steps.length &&
        ((this.curSelection = this.curSelection.map(
          this.doc,
          this.mapping.slice(this.curSelectionFor),
        )),
        (this.curSelectionFor = this.steps.length)),
      this.curSelection
    );
  }
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError(
        "Selection passed to setSelection must point at the current document",
      );
    return (
      (this.curSelection = e),
      (this.curSelectionFor = this.steps.length),
      (this.updated = (this.updated | Wa) & -3),
      (this.storedMarks = null),
      this
    );
  }
  get selectionSet() {
    return (this.updated & Wa) > 0;
  }
  setStoredMarks(e) {
    return (this.storedMarks = e), (this.updated |= qa), this;
  }
  ensureMarks(e) {
    return (
      W.sameSet(this.storedMarks || this.selection.$from.marks(), e) ||
        this.setStoredMarks(e),
      this
    );
  }
  addStoredMark(e) {
    return this.ensureMarks(
      e.addToSet(this.storedMarks || this.selection.$head.marks()),
    );
  }
  removeStoredMark(e) {
    return this.ensureMarks(
      e.removeFromSet(this.storedMarks || this.selection.$head.marks()),
    );
  }
  get storedMarksSet() {
    return (this.updated & qa) > 0;
  }
  addStep(e, t) {
    super.addStep(e, t),
      (this.updated = this.updated & -3),
      (this.storedMarks = null);
  }
  setTime(e) {
    return (this.time = e), this;
  }
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return (
      t &&
        (e = e.mark(
          this.storedMarks ||
            (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || W.none),
        )),
      r.replaceWith(this, e),
      this
    );
  }
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  insertText(e, t, r) {
    let i = this.doc.type.schema;
    if (t == null)
      return e
        ? this.replaceSelectionWith(i.text(e), !0)
        : this.deleteSelection();
    {
      if ((r == null && (r = t), (r = r ?? t), !e))
        return this.deleteRange(t, r);
      let s = this.storedMarks;
      if (!s) {
        let o = this.doc.resolve(t);
        s = r == t ? o.marks() : o.marksAcross(this.doc.resolve(r));
      }
      return (
        this.replaceRangeWith(t, r, i.text(e, s)),
        this.selection.empty || this.setSelection(H.near(this.selection.$to)),
        this
      );
    }
  }
  setMeta(e, t) {
    return (this.meta[typeof e == "string" ? e : e.key] = t), this;
  }
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  get isGeneric() {
    for (let e in this.meta) return !1;
    return !0;
  }
  scrollIntoView() {
    return (this.updated |= Ha), this;
  }
  get scrolledIntoView() {
    return (this.updated & Ha) > 0;
  }
}
function _a(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Sr {
  constructor(e, t, r) {
    (this.name = e), (this.init = _a(t.init, r)), (this.apply = _a(t.apply, r));
  }
}
const Iy = [
  new Sr("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    },
  }),
  new Sr("selection", {
    init(n, e) {
      return n.selection || H.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    },
  }),
  new Sr("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    },
  }),
  new Sr("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    },
  }),
];
class Ns {
  constructor(e, t) {
    (this.schema = e),
      (this.plugins = []),
      (this.pluginsByKey = Object.create(null)),
      (this.fields = Iy.slice()),
      t &&
        t.forEach((r) => {
          if (this.pluginsByKey[r.key])
            throw new RangeError(
              "Adding different instances of a keyed plugin (" + r.key + ")",
            );
          this.plugins.push(r),
            (this.pluginsByKey[r.key] = r),
            r.spec.state && this.fields.push(new Sr(r.key, r.spec.state, r));
        });
  }
}
class Pn {
  constructor(e) {
    this.config = e;
  }
  get schema() {
    return this.config.schema;
  }
  get plugins() {
    return this.config.plugins;
  }
  apply(e) {
    return this.applyTransaction(e).state;
  }
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
        let i = this.config.plugins[r];
        if (
          i.spec.filterTransaction &&
          !i.spec.filterTransaction.call(i, e, this)
        )
          return !1;
      }
    return !0;
  }
  applyTransaction(e) {
    if (!this.filterTransaction(e)) return { state: this, transactions: [] };
    let t = [e],
      r = this.applyInner(e),
      i = null;
    for (;;) {
      let s = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let l = this.config.plugins[o];
        if (l.spec.appendTransaction) {
          let a = i ? i[o].n : 0,
            c = i ? i[o].state : this,
            u =
              a < t.length &&
              l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, r);
          if (u && r.filterTransaction(u, o)) {
            if ((u.setMeta("appendedTransaction", e), !i)) {
              i = [];
              for (let h = 0; h < this.config.plugins.length; h++)
                i.push(
                  h < o ? { state: r, n: t.length } : { state: this, n: 0 },
                );
            }
            t.push(u), (r = r.applyInner(u)), (s = !0);
          }
          i && (i[o] = { state: r, n: t.length });
        }
      }
      if (!s) return { state: r, transactions: t };
    }
  }
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new Pn(this.config),
      r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let s = r[i];
      t[s.name] = s.apply(e, this[s.name], this, t);
    }
    return t;
  }
  get tr() {
    return new Oy(this);
  }
  static create(e) {
    let t = new Ns(e.doc ? e.doc.type.schema : e.schema, e.plugins),
      r = new Pn(t);
    for (let i = 0; i < t.fields.length; i++)
      r[t.fields[i].name] = t.fields[i].init(e, r);
    return r;
  }
  reconfigure(e) {
    let t = new Ns(this.schema, e.plugins),
      r = t.fields,
      i = new Pn(t);
    for (let s = 0; s < r.length; s++) {
      let o = r[s].name;
      i[o] = this.hasOwnProperty(o) ? this[o] : r[s].init(e, i);
    }
    return i;
  }
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (
      (this.storedMarks &&
        (t.storedMarks = this.storedMarks.map((r) => r.toJSON())),
      e && typeof e == "object")
    )
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError(
            "The JSON fields `doc` and `selection` are reserved",
          );
        let i = e[r],
          s = i.spec.state;
        s && s.toJSON && (t[r] = s.toJSON.call(i, this[i.key]));
      }
    return t;
  }
  static fromJSON(e, t, r) {
    if (!t) throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new Ns(e.schema, e.plugins),
      s = new Pn(i);
    return (
      i.fields.forEach((o) => {
        if (o.name == "doc") s.doc = je.fromJSON(e.schema, t.doc);
        else if (o.name == "selection")
          s.selection = H.fromJSON(s.doc, t.selection);
        else if (o.name == "storedMarks")
          t.storedMarks &&
            (s.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
        else {
          if (r)
            for (let l in r) {
              let a = r[l],
                c = a.spec.state;
              if (
                a.key == o.name &&
                c &&
                c.fromJSON &&
                Object.prototype.hasOwnProperty.call(t, l)
              ) {
                s[o.name] = c.fromJSON.call(a, e, t[l], s);
                return;
              }
            }
          s[o.name] = o.init(e, s);
        }
      }),
      s
    );
  }
}
function _u(n, e, t) {
  for (let r in n) {
    let i = n[r];
    i instanceof Function
      ? (i = i.bind(e))
      : r == "handleDOMEvents" && (i = _u(i, e, {})),
      (t[r] = i);
  }
  return t;
}
class bt {
  constructor(e) {
    (this.spec = e),
      (this.props = {}),
      e.props && _u(e.props, this, this.props),
      (this.key = e.key ? e.key.key : ju("plugin"));
  }
  getState(e) {
    return e[this.key];
  }
}
const Ts = Object.create(null);
function ju(n) {
  return n in Ts ? n + "$" + ++Ts[n] : ((Ts[n] = 0), n + "$");
}
class jt {
  constructor(e = "key") {
    this.key = ju(e);
  }
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  getState(e) {
    return e[this.key];
  }
}
class Je {
  constructor(e, t, r = {}) {
    (this.match = e),
      (this.match = e),
      (this.handler = typeof t == "string" ? Ey(t) : t),
      (this.undoable = r.undoable !== !1),
      (this.inCode = r.inCode || !1);
  }
}
function Ey(n) {
  return function (e, t, r, i) {
    let s = n;
    if (t[1]) {
      let o = t[0].lastIndexOf(t[1]);
      (s += t[0].slice(o + t[1].length)), (r += o);
      let l = r - i;
      l > 0 && ((s = t[0].slice(o - l, o) + s), (r = i));
    }
    return e.tr.insertText(s, r, i);
  };
}
const Ay = (n, e) => {
  let t = n.plugins;
  for (let r = 0; r < t.length; r++) {
    let i = t[r],
      s;
    if (i.spec.isInputRules && (s = i.getState(n))) {
      if (e) {
        let o = n.tr,
          l = s.transform;
        for (let a = l.steps.length - 1; a >= 0; a--)
          o.step(l.steps[a].invert(l.docs[a]));
        if (s.text) {
          let a = o.doc.resolve(s.from).marks();
          o.replaceWith(s.from, s.to, n.schema.text(s.text, a));
        } else o.delete(s.from, s.to);
        e(o);
      }
      return !0;
    }
  }
  return !1;
};
new Je(/--$/, "—");
new Je(/\.\.\.$/, "…");
new Je(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/, "“");
new Je(/"$/, "”");
new Je(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/, "‘");
new Je(/'$/, "’");
function qo(n, e, t = null, r) {
  return new Je(n, (i, s, o, l) => {
    let a = t instanceof Function ? t(s) : t,
      c = i.tr.delete(o, l),
      u = c.doc.resolve(o),
      h = u.blockRange(),
      d = h && Fu(h, e, a);
    if (!d) return null;
    c.wrap(h, d);
    let f = c.doc.resolve(o - 1).nodeBefore;
    return (
      f && f.type == e && Zi(c.doc, o - 1) && (!r || r(s, f)) && c.join(o - 1),
      c
    );
  });
}
function Ku(n, e, t = null) {
  return new Je(n, (r, i, s, o) => {
    let l = r.doc.resolve(s),
      a = t instanceof Function ? t(i) : t;
    return l.node(-1).canReplaceWith(l.index(-1), l.indexAfter(-1), e)
      ? r.tr.delete(s, o).setBlockType(s, s, e, a)
      : null;
  });
}
const Wt = typeof navigator < "u" ? navigator : null,
  ja = typeof document < "u" ? document : null,
  yn = (Wt && Wt.userAgent) || "",
  fo = /Edge\/(\d+)/.exec(yn),
  Ju = /MSIE \d/.exec(yn),
  po = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(yn),
  Ho = !!(Ju || po || fo);
Ju ? document.documentMode : po ? +po[1] : fo && +fo[1];
const Dy = !Ho && /gecko\/(\d+)/i.test(yn);
Dy && +(/Firefox\/(\d+)/.exec(yn) || [0, 0])[1];
const Ka = !Ho && /Chrome\/(\d+)/.exec(yn);
Ka && +Ka[1];
const Ry = !Ho && !!Wt && /Apple Computer/.test(Wt.vendor),
  zy = Ry && (/Mobile\/\w+/.test(yn) || (!!Wt && Wt.maxTouchPoints > 2));
zy || (Wt && /Mac/.test(Wt.platform));
const Py = !!ja && "webkitFontSmoothing" in ja.documentElement.style;
Py && +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1];
function Os(n, e, t, r, i, s) {
  var o;
  if (n.composing) return !1;
  const l = n.state,
    a = l.doc.resolve(e);
  if (a.parent.type.spec.code) return !1;
  const c =
    a.parent.textBetween(
      Math.max(0, a.parentOffset - 500),
      a.parentOffset,
      void 0,
      "￼",
    ) + r;
  for (let u = 0; u < i.length; u++) {
    const h = i[u].match.exec(c),
      d = h && h[0] && i[u].handler(l, h, e - (h[0].length - r.length), t);
    if (d)
      return (
        ((o = i[u]) == null ? void 0 : o.undoable) !== !1 &&
          d.setMeta(s, { transform: d, from: e, to: t, text: r }),
        n.dispatch(d),
        !0
      );
  }
  return !1;
}
const By = new jt("MILKDOWN_CUSTOM_INPUTRULES");
function vy({ rules: n }) {
  const e = new bt({
    key: By,
    isInputRules: !0,
    state: {
      init() {
        return null;
      },
      apply(t, r) {
        const i = t.getMeta(this);
        return i || (t.selectionSet || t.docChanged ? null : r);
      },
    },
    props: {
      handleTextInput(t, r, i, s) {
        return Os(t, r, i, s, n, e);
      },
      handleDOMEvents: {
        compositionend: (t) => (
          setTimeout(() => {
            const { $cursor: r } = t.state.selection;
            r && Os(t, r.pos, r.pos, "", n, e);
          }),
          !1
        ),
      },
      handleKeyDown(t, r) {
        if (r.key !== "Enter") return !1;
        const { $cursor: i } = t.state.selection;
        return i
          ? Os(
              t,
              i.pos,
              i.pos,
              `
`,
              n,
              e,
            )
          : !1;
      },
    },
  });
  return e;
}
function es(n, e, t = {}) {
  return new Je(n, (r, i, s, o) => {
    var l, a, c, u;
    const { tr: h } = r,
      d = i.length;
    let f = i[d - 1],
      p = i[0],
      y = [],
      x = o;
    const k = { group: f, fullMatch: p, start: s, end: o },
      E = (l = t.updateCaptured) == null ? void 0 : l.call(t, k);
    if (
      (Object.assign(k, E),
      ({ group: f, fullMatch: p, start: s, end: o } = k),
      p === null || (f == null ? void 0 : f.trim()) === "")
    )
      return null;
    if (f) {
      const N = p.search(/\S/),
        F = s + p.indexOf(f),
        $ = F + f.length;
      (y = (a = h.storedMarks) != null ? a : []),
        $ < o && h.delete($, o),
        F > s && h.delete(s + N, F),
        (x = s + N + f.length);
      const w = (c = t.getAttr) == null ? void 0 : c.call(t, i);
      h.addMark(s, x, e.create(w)),
        h.setStoredMarks(y),
        (u = t.beforeDispatch) == null ||
          u.call(t, { match: i, start: s, end: o, tr: h });
    }
    return h;
  });
}
function Fy(n, e) {
  return (Array.isArray(n) && n.includes(e.type)) || e.type === n;
}
function Ly(n, e) {
  if (!(n instanceof P)) return;
  const { node: t, $from: r } = n;
  if (Fy(e, t))
    return { node: t, pos: r.pos, start: r.start(r.depth), depth: r.depth };
}
const _o = (n, e) =>
  n.selection.empty
    ? !1
    : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function $y(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0)
    ? null
    : t;
}
const Uu = (n, e, t) => {
  let r = $y(n, t);
  if (!r) return !1;
  let i = Gu(r);
  if (!i) {
    let o = r.blockRange(),
      l = o && Qi(o);
    return l == null ? !1 : (e && e(n.tr.lift(o, l).scrollIntoView()), !0);
  }
  let s = i.nodeBefore;
  if (Zu(n, i, e, -1)) return !0;
  if (r.parent.content.size == 0 && (Kn(s, "end") || P.isSelectable(s)))
    for (let o = r.depth; ; o--) {
      let l = Vo(n.doc, r.before(o), r.after(o), T.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(
            Kn(s, "end")
              ? H.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1)
              : P.create(a.doc, i.pos - s.nodeSize),
          ),
            e(a.scrollIntoView());
        }
        return !0;
      }
      if (o == 1 || r.node(o - 1).childCount > 1) break;
    }
  return s.isAtom && i.depth == r.depth - 1
    ? (e && e(n.tr.delete(i.pos - s.nodeSize, i.pos).scrollIntoView()), !0)
    : !1;
};
function Kn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock) return !0;
    if (t && r.childCount != 1) return !1;
  }
  return !1;
}
const Yu = (n, e, t) => {
  let { $head: r, empty: i } = n.selection,
    s = r;
  if (!i) return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0) return !1;
    s = Gu(r);
  }
  let o = s && s.nodeBefore;
  return !o || !P.isSelectable(o)
    ? !1
    : (e &&
        e(
          n.tr
            .setSelection(P.create(n.doc, s.pos - o.nodeSize))
            .scrollIntoView(),
        ),
      !0);
};
function Gu(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0) return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating) break;
    }
  return null;
}
function Vy(n, e) {
  let { $cursor: t } = n.selection;
  return !t ||
    (e
      ? !e.endOfTextblock("forward", n)
      : t.parentOffset < t.parent.content.size)
    ? null
    : t;
}
const Wy = (n, e, t) => {
    let r = Vy(n, t);
    if (!r) return !1;
    let i = Qu(r);
    if (!i) return !1;
    let s = i.nodeAfter;
    if (Zu(n, i, e, 1)) return !0;
    if (r.parent.content.size == 0 && (Kn(s, "start") || P.isSelectable(s))) {
      let o = Vo(n.doc, r.before(), r.after(), T.empty);
      if (o && o.slice.size < o.to - o.from) {
        if (e) {
          let l = n.tr.step(o);
          l.setSelection(
            Kn(s, "start")
              ? H.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1)
              : P.create(l.doc, l.mapping.map(i.pos)),
          ),
            e(l.scrollIntoView());
        }
        return !0;
      }
    }
    return s.isAtom && i.depth == r.depth - 1
      ? (e && e(n.tr.delete(i.pos, i.pos + s.nodeSize).scrollIntoView()), !0)
      : !1;
  },
  qy = (n, e, t) => {
    let { $head: r, empty: i } = n.selection,
      s = r;
    if (!i) return !1;
    if (r.parent.isTextblock) {
      if (
        t
          ? !t.endOfTextblock("forward", n)
          : r.parentOffset < r.parent.content.size
      )
        return !1;
      s = Qu(r);
    }
    let o = s && s.nodeAfter;
    return !o || !P.isSelectable(o)
      ? !1
      : (e && e(n.tr.setSelection(P.create(n.doc, s.pos)).scrollIntoView()),
        !0);
  };
function Qu(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount) return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating) break;
    }
  return null;
}
const Hy = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r)
    ? !1
    : (e &&
        e(
          n.tr
            .insertText(
              `
`,
            )
            .scrollIntoView(),
        ),
      !0);
};
function jo(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const _y = (n, e) => {
    let { $head: t, $anchor: r } = n.selection;
    if (!t.parent.type.spec.code || !t.sameParent(r)) return !1;
    let i = t.node(-1),
      s = t.indexAfter(-1),
      o = jo(i.contentMatchAt(s));
    if (!o || !i.canReplaceWith(s, s, o)) return !1;
    if (e) {
      let l = t.after(),
        a = n.tr.replaceWith(l, l, o.createAndFill());
      a.setSelection(H.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
    }
    return !0;
  },
  jy = (n, e) => {
    let t = n.selection,
      { $from: r, $to: i } = t;
    if (t instanceof De || r.parent.inlineContent || i.parent.inlineContent)
      return !1;
    let s = jo(i.parent.contentMatchAt(i.indexAfter()));
    if (!s || !s.isTextblock) return !1;
    if (e) {
      let o = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos,
        l = n.tr.insert(o, s.createAndFill());
      l.setSelection(J.create(l.doc, o + 1)), e(l.scrollIntoView());
    }
    return !0;
  },
  Ky = (n, e) => {
    let { $cursor: t } = n.selection;
    if (!t || t.parent.content.size) return !1;
    if (t.depth > 1 && t.after() != t.end(-1)) {
      let s = t.before();
      if (Ar(n.doc, s)) return e && e(n.tr.split(s).scrollIntoView()), !0;
    }
    let r = t.blockRange(),
      i = r && Qi(r);
    return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
  };
function Jy(n) {
  return (e, t) => {
    let { $from: r, $to: i } = e.selection;
    if (e.selection instanceof P && e.selection.node.isBlock)
      return !r.parentOffset || !Ar(e.doc, r.pos)
        ? !1
        : (t && t(e.tr.split(r.pos).scrollIntoView()), !0);
    if (!r.depth) return !1;
    let s = [],
      o,
      l,
      a = !1,
      c = !1;
    for (let f = r.depth; ; f--)
      if (r.node(f).isBlock) {
        (a = r.end(f) == r.pos + (r.depth - f)),
          (c = r.start(f) == r.pos - (r.depth - f)),
          (l = jo(r.node(f - 1).contentMatchAt(r.indexAfter(f - 1)))),
          s.unshift(a && l ? { type: l } : null),
          (o = f);
        break;
      } else {
        if (f == 1) return !1;
        s.unshift(null);
      }
    let u = e.tr;
    (e.selection instanceof J || e.selection instanceof De) &&
      u.deleteSelection();
    let h = u.mapping.map(r.pos),
      d = Ar(u.doc, h, s.length, s);
    if (
      (d || ((s[0] = l ? { type: l } : null), (d = Ar(u.doc, h, s.length, s))),
      u.split(h, s.length, s),
      !a && c && r.node(o).type != l)
    ) {
      let f = u.mapping.map(r.before(o)),
        p = u.doc.resolve(f);
      l &&
        r.node(o - 1).canReplaceWith(p.index(), p.index() + 1, l) &&
        u.setNodeMarkup(u.mapping.map(r.before(o)), l);
    }
    return t && t(u.scrollIntoView()), !0;
  };
}
const Uy = Jy(),
  Yy = (n, e) => (e && e(n.tr.setSelection(new De(n.doc))), !0);
function Gy(n, e, t) {
  let r = e.nodeBefore,
    i = e.nodeAfter,
    s = e.index();
  return !r || !i || !r.type.compatibleContent(i.type)
    ? !1
    : !r.content.size && e.parent.canReplace(s - 1, s)
      ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0)
      : !e.parent.canReplace(s, s + 1) || !(i.isTextblock || Zi(n.doc, e.pos))
        ? !1
        : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function Zu(n, e, t, r) {
  let i = e.nodeBefore,
    s = e.nodeAfter,
    o,
    l,
    a = i.type.spec.isolating || s.type.spec.isolating;
  if (!a && Gy(n, e, t)) return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (
    c &&
    (o = (l = i.contentMatchAt(i.childCount)).findWrapping(s.type)) &&
    l.matchType(o[0] || s.type).validEnd
  ) {
    if (t) {
      let f = e.pos + s.nodeSize,
        p = C.empty;
      for (let k = o.length - 1; k >= 0; k--) p = C.from(o[k].create(null, p));
      p = C.from(i.copy(p));
      let y = n.tr.step(
          new ke(e.pos - 1, f, e.pos, f, new T(p, 1, 0), o.length, !0),
        ),
        x = y.doc.resolve(f + 2 * o.length);
      x.nodeAfter &&
        x.nodeAfter.type == i.type &&
        Zi(y.doc, x.pos) &&
        y.join(x.pos),
        t(y.scrollIntoView());
    }
    return !0;
  }
  let u = s.type.spec.isolating || (r > 0 && a) ? null : H.findFrom(e, 1),
    h = u && u.$from.blockRange(u.$to),
    d = h && Qi(h);
  if (d != null && d >= e.depth)
    return t && t(n.tr.lift(h, d).scrollIntoView()), !0;
  if (c && Kn(s, "start", !0) && Kn(i, "end")) {
    let f = i,
      p = [];
    for (; p.push(f), !f.isTextblock; ) f = f.lastChild;
    let y = s,
      x = 1;
    for (; !y.isTextblock; y = y.firstChild) x++;
    if (f.canReplace(f.childCount, f.childCount, y.content)) {
      if (t) {
        let k = C.empty;
        for (let N = p.length - 1; N >= 0; N--) k = C.from(p[N].copy(k));
        let E = n.tr.step(
          new ke(
            e.pos - p.length,
            e.pos + s.nodeSize,
            e.pos + x,
            e.pos + s.nodeSize - x,
            new T(k, p.length, 0),
            0,
            !0,
          ),
        );
        t(E.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Xu(n) {
  return function (e, t) {
    let r = e.selection,
      i = n < 0 ? r.$from : r.$to,
      s = i.depth;
    for (; i.node(s).isInline; ) {
      if (!s) return !1;
      s--;
    }
    return i.node(s).isTextblock
      ? (t &&
          t(e.tr.setSelection(J.create(e.doc, n < 0 ? i.start(s) : i.end(s)))),
        !0)
      : !1;
  };
}
const Qy = Xu(-1),
  Zy = Xu(1);
function Ko(n, e = null) {
  return function (t, r) {
    let { $from: i, $to: s } = t.selection,
      o = i.blockRange(s),
      l = o && Fu(o, n, e);
    return l ? (r && r(t.tr.wrap(o, l).scrollIntoView()), !0) : !1;
  };
}
function $r(n, e = null) {
  return function (t, r) {
    let i = !1;
    for (let s = 0; s < t.selection.ranges.length && !i; s++) {
      let {
        $from: { pos: o },
        $to: { pos: l },
      } = t.selection.ranges[s];
      t.doc.nodesBetween(o, l, (a, c) => {
        if (i) return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n) i = !0;
          else {
            let u = t.doc.resolve(c),
              h = u.index();
            i = u.parent.canReplaceWith(h, h + 1, n);
          }
      });
    }
    if (!i) return !1;
    if (r) {
      let s = t.tr;
      for (let o = 0; o < t.selection.ranges.length; o++) {
        let {
          $from: { pos: l },
          $to: { pos: a },
        } = t.selection.ranges[o];
        s.setBlockType(l, a, n, e);
      }
      r(s.scrollIntoView());
    }
    return !0;
  };
}
function Xy(n, e, t, r) {
  for (let i = 0; i < e.length; i++) {
    let { $from: s, $to: o } = e[i],
      l = s.depth == 0 ? n.inlineContent && n.type.allowsMarkType(t) : !1;
    if (
      (n.nodesBetween(s.pos, o.pos, (a, c) => {
        if (l) return !1;
        l = a.inlineContent && a.type.allowsMarkType(t);
      }),
      l)
    )
      return !0;
  }
  return !1;
}
function Jo(n, e = null, t) {
  return function (r, i) {
    let { empty: s, $cursor: o, ranges: l } = r.selection;
    if ((s && !o) || !Xy(r.doc, l, n)) return !1;
    if (i)
      if (o)
        n.isInSet(r.storedMarks || o.marks())
          ? i(r.tr.removeStoredMark(n))
          : i(r.tr.addStoredMark(n.create(e)));
      else {
        let a,
          c = r.tr;
        a = !l.some((u) => r.doc.rangeHasMark(u.$from.pos, u.$to.pos, n));
        for (let u = 0; u < l.length; u++) {
          let { $from: h, $to: d } = l[u];
          if (!a) c.removeMark(h.pos, d.pos, n);
          else {
            let f = h.pos,
              p = d.pos,
              y = h.nodeAfter,
              x = d.nodeBefore,
              k = y && y.isText ? /^\s*/.exec(y.text)[0].length : 0,
              E = x && x.isText ? /\s*$/.exec(x.text)[0].length : 0;
            f + k < p && ((f += k), (p -= E)), c.addMark(f, p, n.create(e));
          }
        }
        i(c.scrollIntoView());
      }
    return !0;
  };
}
function ts(...n) {
  return function (e, t, r) {
    for (let i = 0; i < n.length; i++) if (n[i](e, t, r)) return !0;
    return !1;
  };
}
let Is = ts(_o, Uu, Yu),
  Ja = ts(_o, Wy, qy);
const pt = {
    Enter: ts(Hy, jy, Ky, Uy),
    "Mod-Enter": _y,
    Backspace: Is,
    "Mod-Backspace": Is,
    "Shift-Backspace": Is,
    Delete: Ja,
    "Mod-Delete": Ja,
    "Mod-a": Yy,
  },
  eh = {
    "Ctrl-h": pt.Backspace,
    "Alt-Backspace": pt["Mod-Backspace"],
    "Ctrl-d": pt.Delete,
    "Ctrl-Alt-Backspace": pt["Mod-Delete"],
    "Alt-Delete": pt["Mod-Delete"],
    "Alt-d": pt["Mod-Delete"],
    "Ctrl-a": Qy,
    "Ctrl-e": Zy,
  };
for (let n in pt) eh[n] = pt[n];
const ek =
    typeof navigator < "u"
      ? /Mac|iP(hone|[oa]d)/.test(navigator.platform)
      : typeof os < "u" && os.platform
        ? os.platform() == "darwin"
        : !1,
  tk = ek ? eh : pt;
var qt = {
    8: "Backspace",
    9: "Tab",
    10: "Enter",
    12: "NumLock",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    44: "PrintScreen",
    45: "Insert",
    46: "Delete",
    59: ";",
    61: "=",
    91: "Meta",
    92: "Meta",
    106: "*",
    107: "+",
    108: ",",
    109: "-",
    110: ".",
    111: "/",
    144: "NumLock",
    145: "ScrollLock",
    160: "Shift",
    161: "Shift",
    162: "Control",
    163: "Control",
    164: "Alt",
    165: "Alt",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
  },
  Wi = {
    48: ")",
    49: "!",
    50: "@",
    51: "#",
    52: "$",
    53: "%",
    54: "^",
    55: "&",
    56: "*",
    57: "(",
    59: ":",
    61: "+",
    173: "_",
    186: ":",
    187: "+",
    188: "<",
    189: "_",
    190: ">",
    191: "?",
    192: "~",
    219: "{",
    220: "|",
    221: "}",
    222: '"',
  },
  nk = typeof navigator < "u" && /Mac/.test(navigator.platform),
  rk =
    typeof navigator < "u" &&
    /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var de = 0; de < 10; de++) qt[48 + de] = qt[96 + de] = String(de);
for (var de = 1; de <= 24; de++) qt[de + 111] = "F" + de;
for (var de = 65; de <= 90; de++)
  (qt[de] = String.fromCharCode(de + 32)), (Wi[de] = String.fromCharCode(de));
for (var Es in qt) Wi.hasOwnProperty(Es) || (Wi[Es] = qt[Es]);
function ik(n) {
  var e =
      (nk && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey) ||
      (rk && n.shiftKey && n.key && n.key.length == 1) ||
      n.key == "Unidentified",
    t =
      (!e && n.key) ||
      (n.shiftKey ? Wi : qt)[n.keyCode] ||
      n.key ||
      "Unidentified";
  return (
    t == "Esc" && (t = "Escape"),
    t == "Del" && (t = "Delete"),
    t == "Left" && (t = "ArrowLeft"),
    t == "Up" && (t = "ArrowUp"),
    t == "Right" && (t = "ArrowRight"),
    t == "Down" && (t = "ArrowDown"),
    t
  );
}
const sk =
  typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : !1;
function ok(n) {
  let e = n.split(/-(?!$)/),
    t = e[e.length - 1];
  t == "Space" && (t = " ");
  let r, i, s, o;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a)) o = !0;
    else if (/^a(lt)?$/i.test(a)) r = !0;
    else if (/^(c|ctrl|control)$/i.test(a)) i = !0;
    else if (/^s(hift)?$/i.test(a)) s = !0;
    else if (/^mod$/i.test(a)) sk ? (o = !0) : (i = !0);
    else throw new Error("Unrecognized modifier name: " + a);
  }
  return (
    r && (t = "Alt-" + t),
    i && (t = "Ctrl-" + t),
    o && (t = "Meta-" + t),
    s && (t = "Shift-" + t),
    t
  );
}
function lk(n) {
  let e = Object.create(null);
  for (let t in n) e[ok(t)] = n[t];
  return e;
}
function As(n, e, t = !0) {
  return (
    e.altKey && (n = "Alt-" + n),
    e.ctrlKey && (n = "Ctrl-" + n),
    e.metaKey && (n = "Meta-" + n),
    t && e.shiftKey && (n = "Shift-" + n),
    n
  );
}
function th(n) {
  return new bt({ props: { handleKeyDown: ak(n) } });
}
function ak(n) {
  let e = lk(n);
  return function (t, r) {
    let i = ik(r),
      s,
      o = e[As(i, r)];
    if (o && o(t.state, t.dispatch, t)) return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[As(i, r, !1)];
        if (l && l(t.state, t.dispatch, t)) return !0;
      }
      if (
        (r.shiftKey || r.altKey || r.metaKey || i.charCodeAt(0) > 127) &&
        (s = qt[r.keyCode]) &&
        s != i
      ) {
        let l = e[As(s, r)];
        if (l && l(t.state, t.dispatch, t)) return !0;
      }
    }
    return !1;
  };
}
const pe = function (n) {
    for (var e = 0; ; e++) if (((n = n.previousSibling), !n)) return e;
  },
  Vr = function (n) {
    let e = n.assignedSlot || n.parentNode;
    return e && e.nodeType == 11 ? e.host : e;
  };
let mo = null;
const dt = function (n, e, t) {
    let r = mo || (mo = document.createRange());
    return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
  },
  ck = function () {
    mo = null;
  },
  pn = function (n, e, t, r) {
    return t && (Ua(n, e, t, r, -1) || Ua(n, e, t, r, 1));
  },
  uk = /^(img|br|input|textarea|hr)$/i;
function Ua(n, e, t, r, i) {
  for (;;) {
    if (n == t && e == r) return !0;
    if (e == (i < 0 ? 0 : ve(n))) {
      let s = n.parentNode;
      if (
        !s ||
        s.nodeType != 1 ||
        Jr(n) ||
        uk.test(n.nodeName) ||
        n.contentEditable == "false"
      )
        return !1;
      (e = pe(n) + (i < 0 ? 0 : 1)), (n = s);
    } else if (n.nodeType == 1) {
      if (
        ((n = n.childNodes[e + (i < 0 ? -1 : 0)]), n.contentEditable == "false")
      )
        return !1;
      e = i < 0 ? ve(n) : 0;
    } else return !1;
  }
}
function ve(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function hk(n, e) {
  for (;;) {
    if (n.nodeType == 3 && e) return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false") return null;
      (n = n.childNodes[e - 1]), (e = ve(n));
    } else if (n.parentNode && !Jr(n)) (e = pe(n)), (n = n.parentNode);
    else return null;
  }
}
function fk(n, e) {
  for (;;) {
    if (n.nodeType == 3 && e < n.nodeValue.length) return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false") return null;
      (n = n.childNodes[e]), (e = 0);
    } else if (n.parentNode && !Jr(n)) (e = pe(n) + 1), (n = n.parentNode);
    else return null;
  }
}
function dk(n, e, t) {
  for (let r = e == 0, i = e == ve(n); r || i; ) {
    if (n == t) return !0;
    let s = pe(n);
    if (((n = n.parentNode), !n)) return !1;
    (r = r && s == 0), (i = i && s == ve(n));
  }
}
function Jr(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode);
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const ns = function (n) {
  return (
    n.focusNode && pn(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset)
  );
};
function rn(n, e) {
  let t = document.createEvent("Event");
  return (
    t.initEvent("keydown", !0, !0), (t.keyCode = n), (t.key = t.code = e), t
  );
}
function pk(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; ) e = e.shadowRoot.activeElement;
  return e;
}
function mk(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return {
          node: r.offsetNode,
          offset: Math.min(ve(r.offsetNode), r.offset),
        };
    } catch {}
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return {
        node: r.startContainer,
        offset: Math.min(ve(r.startContainer), r.startOffset),
      };
  }
}
const st = typeof navigator < "u" ? navigator : null,
  Ya = typeof document < "u" ? document : null,
  Kt = (st && st.userAgent) || "",
  go = /Edge\/(\d+)/.exec(Kt),
  nh = /MSIE \d/.exec(Kt),
  yo = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Kt),
  Ne = !!(nh || yo || go),
  vt = nh ? document.documentMode : yo ? +yo[1] : go ? +go[1] : 0,
  Ke = !Ne && /gecko\/(\d+)/i.test(Kt);
Ke && +(/Firefox\/(\d+)/.exec(Kt) || [0, 0])[1];
const ko = !Ne && /Chrome\/(\d+)/.exec(Kt),
  ye = !!ko,
  rh = ko ? +ko[1] : 0,
  be = !Ne && !!st && /Apple Computer/.test(st.vendor),
  Jn = be && (/Mobile\/\w+/.test(Kt) || (!!st && st.maxTouchPoints > 2)),
  Pe = Jn || (st ? /Mac/.test(st.platform) : !1),
  gk = st ? /Win/.test(st.platform) : !1,
  gt = /Android \d/.test(Kt),
  Ur = !!Ya && "webkitFontSmoothing" in Ya.documentElement.style,
  yk = Ur
    ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1]
    : 0;
function kk(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e
    ? { left: 0, right: e.width, top: 0, bottom: e.height }
    : {
        left: 0,
        right: n.documentElement.clientWidth,
        top: 0,
        bottom: n.documentElement.clientHeight,
      };
}
function ht(n, e) {
  return typeof n == "number" ? n : n[e];
}
function xk(n) {
  let e = n.getBoundingClientRect(),
    t = e.width / n.offsetWidth || 1,
    r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r,
  };
}
function Ga(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0,
    i = n.someProp("scrollMargin") || 5,
    s = n.dom.ownerDocument;
  for (let o = t || n.dom; o; o = Vr(o)) {
    if (o.nodeType != 1) continue;
    let l = o,
      a = l == s.body,
      c = a ? kk(s) : xk(l),
      u = 0,
      h = 0;
    if (
      (e.top < c.top + ht(r, "top")
        ? (h = -(c.top - e.top + ht(i, "top")))
        : e.bottom > c.bottom - ht(r, "bottom") &&
          (h =
            e.bottom - e.top > c.bottom - c.top
              ? e.top + ht(i, "top") - c.top
              : e.bottom - c.bottom + ht(i, "bottom")),
      e.left < c.left + ht(r, "left")
        ? (u = -(c.left - e.left + ht(i, "left")))
        : e.right > c.right - ht(r, "right") &&
          (u = e.right - c.right + ht(i, "right")),
      u || h)
    )
      if (a) s.defaultView.scrollBy(u, h);
      else {
        let d = l.scrollLeft,
          f = l.scrollTop;
        h && (l.scrollTop += h), u && (l.scrollLeft += u);
        let p = l.scrollLeft - d,
          y = l.scrollTop - f;
        e = {
          left: e.left - p,
          top: e.top - y,
          right: e.right - p,
          bottom: e.bottom - y,
        };
      }
    if (a || /^(fixed|sticky)$/.test(getComputedStyle(o).position)) break;
  }
}
function bk(n) {
  let e = n.dom.getBoundingClientRect(),
    t = Math.max(0, e.top),
    r,
    i;
  for (
    let s = (e.left + e.right) / 2, o = t + 1;
    o < Math.min(innerHeight, e.bottom);
    o += 5
  ) {
    let l = n.root.elementFromPoint(s, o);
    if (!l || l == n.dom || !n.dom.contains(l)) continue;
    let a = l.getBoundingClientRect();
    if (a.top >= t - 20) {
      (r = l), (i = a.top);
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: ih(n.dom) };
}
function ih(n) {
  let e = [],
    t = n.ownerDocument;
  for (
    let r = n;
    r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t);
    r = Vr(r)
  );
  return e;
}
function Sk({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  sh(t, r == 0 ? 0 : r - e);
}
function sh(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: i, left: s } = n[t];
    r.scrollTop != i + e && (r.scrollTop = i + e),
      r.scrollLeft != s && (r.scrollLeft = s);
  }
}
let Cn = null;
function wk(n) {
  if (n.setActive) return n.setActive();
  if (Cn) return n.focus(Cn);
  let e = ih(n);
  n.focus(
    Cn == null
      ? {
          get preventScroll() {
            return (Cn = { preventScroll: !0 }), !0;
          },
        }
      : void 0,
  ),
    Cn || ((Cn = !1), sh(e, 0));
}
function oh(n, e) {
  let t,
    r = 2e8,
    i,
    s = 0,
    o = e.top,
    l = e.top,
    a,
    c;
  for (let u = n.firstChild, h = 0; u; u = u.nextSibling, h++) {
    let d;
    if (u.nodeType == 1) d = u.getClientRects();
    else if (u.nodeType == 3) d = dt(u).getClientRects();
    else continue;
    for (let f = 0; f < d.length; f++) {
      let p = d[f];
      if (p.top <= o && p.bottom >= l) {
        (o = Math.max(p.bottom, o)), (l = Math.min(p.top, l));
        let y =
          p.left > e.left
            ? p.left - e.left
            : p.right < e.left
              ? e.left - p.right
              : 0;
        if (y < r) {
          (t = u),
            (r = y),
            (i =
              y && t.nodeType == 3
                ? { left: p.right < e.left ? p.right : p.left, top: e.top }
                : e),
            u.nodeType == 1 &&
              y &&
              (s = h + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else
        p.top > e.top &&
          !a &&
          p.left <= e.left &&
          p.right >= e.left &&
          ((a = u),
          (c = {
            left: Math.max(p.left, Math.min(p.right, e.left)),
            top: p.top,
          }));
      !t &&
        ((e.left >= p.right && e.top >= p.top) ||
          (e.left >= p.left && e.top >= p.bottom)) &&
        (s = h + 1);
    }
  }
  return (
    !t && a && ((t = a), (i = c), (r = 0)),
    t && t.nodeType == 3
      ? Ck(t, i)
      : !t || (r && t.nodeType == 1)
        ? { node: n, offset: s }
        : oh(t, i)
  );
}
function Ck(n, e) {
  let t = n.nodeValue.length,
    r = document.createRange();
  for (let i = 0; i < t; i++) {
    r.setEnd(n, i + 1), r.setStart(n, i);
    let s = Ot(r, 1);
    if (s.top != s.bottom && Uo(e, s))
      return {
        node: n,
        offset: i + (e.left >= (s.left + s.right) / 2 ? 1 : 0),
      };
  }
  return { node: n, offset: 0 };
}
function Uo(n, e) {
  return (
    n.left >= e.left - 1 &&
    n.left <= e.right + 1 &&
    n.top >= e.top - 1 &&
    n.top <= e.bottom + 1
  );
}
function Mk(n, e) {
  let t = n.parentNode;
  return t &&
    /^li$/i.test(t.nodeName) &&
    e.left < n.getBoundingClientRect().left
    ? t
    : n;
}
function Nk(n, e, t) {
  let { node: r, offset: i } = oh(e, t),
    s = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let o = r.getBoundingClientRect();
    s = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, i, s);
}
function Tk(n, e, t, r) {
  let i = -1;
  for (let s = e, o = !1; s != n.dom; ) {
    let l = n.docView.nearestDesc(s, !0),
      a;
    if (!l) return null;
    if (
      l.dom.nodeType == 1 &&
      ((l.node.isBlock && l.parent) || !l.contentDOM) &&
      ((a = l.dom.getBoundingClientRect()).width || a.height) &&
      (l.node.isBlock &&
        l.parent &&
        ((!o && a.left > r.left) || a.top > r.top
          ? (i = l.posBefore)
          : ((!o && a.right < r.left) || a.bottom < r.top) && (i = l.posAfter),
        (o = !0)),
      !l.contentDOM && i < 0 && !l.node.isText)
    )
      return (
        l.node.isBlock
          ? r.top < (a.top + a.bottom) / 2
          : r.left < (a.left + a.right) / 2
      )
        ? l.posBefore
        : l.posAfter;
    s = l.dom.parentNode;
  }
  return i > -1 ? i : n.docView.posFromDOM(e, t, -1);
}
function lh(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (
      let i = Math.max(
          0,
          Math.min(
            r - 1,
            Math.floor((r * (e.top - t.top)) / (t.bottom - t.top)) - 2,
          ),
        ),
        s = i;
      ;

    ) {
      let o = n.childNodes[s];
      if (o.nodeType == 1) {
        let l = o.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (Uo(e, c)) return lh(o, e, c);
        }
      }
      if ((s = (s + 1) % r) == i) break;
    }
  return n;
}
function Ok(n, e) {
  let t = n.dom.ownerDocument,
    r,
    i = 0,
    s = mk(t, e.left, e.top);
  s && ({ node: r, offset: i } = s);
  let o = (n.root.elementFromPoint ? n.root : t).elementFromPoint(
      e.left,
      e.top,
    ),
    l;
  if (!o || !n.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let c = n.dom.getBoundingClientRect();
    if (!Uo(e, c) || ((o = lh(n.dom, e, c)), !o)) return null;
  }
  if (be) for (let c = o; r && c; c = Vr(c)) c.draggable && (r = void 0);
  if (((o = Mk(o, e)), r)) {
    if (
      Ke &&
      r.nodeType == 1 &&
      ((i = Math.min(i, r.childNodes.length)), i < r.childNodes.length)
    ) {
      let u = r.childNodes[i],
        h;
      u.nodeName == "IMG" &&
        (h = u.getBoundingClientRect()).right <= e.left &&
        h.bottom > e.top &&
        i++;
    }
    let c;
    Ur &&
      i &&
      r.nodeType == 1 &&
      (c = r.childNodes[i - 1]).nodeType == 1 &&
      c.contentEditable == "false" &&
      c.getBoundingClientRect().top >= e.top &&
      i--,
      r == n.dom &&
      i == r.childNodes.length - 1 &&
      r.lastChild.nodeType == 1 &&
      e.top > r.lastChild.getBoundingClientRect().bottom
        ? (l = n.state.doc.content.size)
        : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") &&
          (l = Tk(n, r, i, e));
  }
  l == null && (l = Nk(n, o, e));
  let a = n.docView.nearestDesc(o, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function Qa(n) {
  return n.top < n.bottom || n.left < n.right;
}
function Ot(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (Qa(r)) return r;
  }
  return Array.prototype.find.call(t, Qa) || n.getBoundingClientRect();
}
const Ik = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function ah(n, e, t) {
  let { node: r, offset: i, atom: s } = n.docView.domFromPos(e, t < 0 ? -1 : 1),
    o = Ur || Ke;
  if (r.nodeType == 3)
    if (o && (Ik.test(r.nodeValue) || (t < 0 ? !i : i == r.nodeValue.length))) {
      let a = Ot(dt(r, i, i), t);
      if (Ke && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = Ot(dt(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let u = Ot(dt(r, i, i + 1), -1);
          if (u.top != a.top) return ir(u, u.left < c.left);
        }
      }
      return a;
    } else {
      let a = i,
        c = i,
        u = t < 0 ? 1 : -1;
      return (
        t < 0 && !i
          ? (c++, (u = -1))
          : t >= 0 && i == r.nodeValue.length
            ? (a--, (u = 1))
            : t < 0
              ? a--
              : c++,
        ir(Ot(dt(r, a, c), u), u < 0)
      );
    }
  if (!n.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && i && (t < 0 || i == ve(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1) return Ds(a.getBoundingClientRect(), !1);
    }
    if (s == null && i < ve(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1) return Ds(a.getBoundingClientRect(), !0);
    }
    return Ds(r.getBoundingClientRect(), t >= 0);
  }
  if (s == null && i && (t < 0 || i == ve(r))) {
    let a = r.childNodes[i - 1],
      c =
        a.nodeType == 3
          ? dt(a, ve(a) - (o ? 0 : 1))
          : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling)
            ? a
            : null;
    if (c) return ir(Ot(c, 1), !1);
  }
  if (s == null && i < ve(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; ) a = a.nextSibling;
    let c = a
      ? a.nodeType == 3
        ? dt(a, 0, o ? 0 : 1)
        : a.nodeType == 1
          ? a
          : null
      : null;
    if (c) return ir(Ot(c, -1), !0);
  }
  return ir(Ot(r.nodeType == 3 ? dt(r) : r, -t), t >= 0);
}
function ir(n, e) {
  if (n.width == 0) return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function Ds(n, e) {
  if (n.height == 0) return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function ch(n, e, t) {
  let r = n.state,
    i = n.root.activeElement;
  r != e && n.updateState(e), i != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), i != n.dom && i && i.focus();
  }
}
function Ek(n, e, t) {
  let r = e.selection,
    i = t == "up" ? r.$from : r.$to;
  return ch(n, e, () => {
    let { node: s } = n.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
    for (;;) {
      let l = n.docView.nearestDesc(s, !0);
      if (!l) break;
      if (l.node.isBlock) {
        s = l.contentDOM || l.dom;
        break;
      }
      s = l.dom.parentNode;
    }
    let o = ah(n, i.pos, 1);
    for (let l = s.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1) a = l.getClientRects();
      else if (l.nodeType == 3)
        a = dt(l, 0, l.nodeValue.length).getClientRects();
      else continue;
      for (let c = 0; c < a.length; c++) {
        let u = a[c];
        if (
          u.bottom > u.top + 1 &&
          (t == "up"
            ? o.top - u.top > (u.bottom - o.top) * 2
            : u.bottom - o.bottom > (o.bottom - u.top) * 2)
        )
          return !1;
      }
    }
    return !0;
  });
}
const Ak = /[\u0590-\u08ac]/;
function Dk(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock) return !1;
  let i = r.parentOffset,
    s = !i,
    o = i == r.parent.content.size,
    l = n.domSelection();
  return l
    ? !Ak.test(r.parent.textContent) || !l.modify
      ? t == "left" || t == "backward"
        ? s
        : o
      : ch(n, e, () => {
          let {
              focusNode: a,
              focusOffset: c,
              anchorNode: u,
              anchorOffset: h,
            } = n.domSelectionRange(),
            d = l.caretBidiLevel;
          l.modify("move", t, "character");
          let f = r.depth ? n.docView.domAfterPos(r.before()) : n.dom,
            { focusNode: p, focusOffset: y } = n.domSelectionRange(),
            x =
              (p && !f.contains(p.nodeType == 1 ? p : p.parentNode)) ||
              (a == p && c == y);
          try {
            l.collapse(u, h),
              a && (a != u || c != h) && l.extend && l.extend(a, c);
          } catch {}
          return d != null && (l.caretBidiLevel = d), x;
        })
    : r.pos == r.start() || r.pos == r.end();
}
let Za = null,
  Xa = null,
  ec = !1;
function Rk(n, e, t) {
  return Za == e && Xa == t
    ? ec
    : ((Za = e),
      (Xa = t),
      (ec = t == "up" || t == "down" ? Ek(n, e, t) : Dk(n, e, t)));
}
const Fe = 0,
  tc = 1,
  sn = 2,
  ot = 3;
class Yr {
  constructor(e, t, r, i) {
    (this.parent = e),
      (this.children = t),
      (this.dom = r),
      (this.contentDOM = i),
      (this.dirty = Fe),
      (r.pmViewDesc = this);
  }
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  parseRule() {
    return null;
  }
  stopEvent(e) {
    return !1;
  }
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++) e += this.children[t].size;
    return e;
  }
  get border() {
    return 0;
  }
  destroy() {
    (this.parent = void 0),
      this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++) this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, r = this.posAtStart; ; t++) {
      let i = this.children[t];
      if (i == e) return r;
      r += i.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, r) {
    if (
      this.contentDOM &&
      this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode)
    )
      if (r < 0) {
        let s, o;
        if (e == this.contentDOM) s = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; ) e = e.parentNode;
          s = e.previousSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.previousSibling;
        return s ? this.posBeforeChild(o) + o.size : this.posAtStart;
      } else {
        let s, o;
        if (e == this.contentDOM) s = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; ) e = e.parentNode;
          s = e.nextSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.nextSibling;
        return s ? this.posBeforeChild(o) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM) i = t > pe(this.contentDOM);
    else if (
      this.contentDOM &&
      this.contentDOM != this.dom &&
      this.dom.contains(this.contentDOM)
    )
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !1;
            break;
          }
          if (s.previousSibling) break;
        }
      if (i == null && t == e.childNodes.length)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !0;
            break;
          }
          if (s.nextSibling) break;
        }
    }
    return (i ?? r > 0) ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let s = this.getDesc(i),
        o;
      if (s && (!t || s.node))
        if (
          r &&
          (o = s.nodeDOM) &&
          !(o.nodeType == 1
            ? o.contains(e.nodeType == 1 ? e : e.parentNode)
            : o == e)
        )
          r = !1;
        else return s;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent) if (r == this) return t;
  }
  posFromDOM(e, t, r) {
    for (let i = e; i; i = i.parentNode) {
      let s = this.getDesc(i);
      if (s) return s.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let i = this.children[t],
        s = r + i.size;
      if (r == e && s != r) {
        for (; !i.border && i.children.length; )
          for (let o = 0; o < i.children.length; o++) {
            let l = i.children[o];
            if (l.size) {
              i = l;
              break;
            }
          }
        return i;
      }
      if (e < s) return i.descAt(e - r - i.border);
      r = s;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM) return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0,
      i = 0;
    for (let s = 0; r < this.children.length; r++) {
      let o = this.children[r],
        l = s + o.size;
      if (l > e || o instanceof hh) {
        i = e - s;
        break;
      }
      s = l;
    }
    if (i) return this.children[r].domFromPos(i - this.children[r].border, t);
    for (
      let s;
      r && !(s = this.children[r - 1]).size && s instanceof uh && s.side >= 0;
      r--
    );
    if (t <= 0) {
      let s,
        o = !0;
      for (
        ;
        (s = r ? this.children[r - 1] : null),
          !(!s || s.dom.parentNode == this.contentDOM);
        r--, o = !1
      );
      return s && t && o && !s.border && !s.domAtom
        ? s.domFromPos(s.size, t)
        : { node: this.contentDOM, offset: s ? pe(s.dom) + 1 : 0 };
    } else {
      let s,
        o = !0;
      for (
        ;
        (s = r < this.children.length ? this.children[r] : null),
          !(!s || s.dom.parentNode == this.contentDOM);
        r++, o = !1
      );
      return s && o && !s.border && !s.domAtom
        ? s.domFromPos(0, t)
        : {
            node: this.contentDOM,
            offset: s ? pe(s.dom) : this.contentDOM.childNodes.length,
          };
    }
  }
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return {
        node: this.contentDOM,
        from: e,
        to: t,
        fromOffset: 0,
        toOffset: this.contentDOM.childNodes.length,
      };
    let i = -1,
      s = -1;
    for (let o = r, l = 0; ; l++) {
      let a = this.children[l],
        c = o + a.size;
      if (i == -1 && e <= c) {
        let u = o + a.border;
        if (
          e >= u &&
          t <= c - a.border &&
          a.node &&
          a.contentDOM &&
          this.contentDOM.contains(a.contentDOM)
        )
          return a.parseRange(e, t, u);
        e = o;
        for (let h = l; h > 0; h--) {
          let d = this.children[h - 1];
          if (
            d.size &&
            d.dom.parentNode == this.contentDOM &&
            !d.emptyChildAt(1)
          ) {
            i = pe(d.dom) + 1;
            break;
          }
          e -= d.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > t || l == this.children.length - 1)) {
        t = c;
        for (let u = l + 1; u < this.children.length; u++) {
          let h = this.children[u];
          if (
            h.size &&
            h.dom.parentNode == this.contentDOM &&
            !h.emptyChildAt(-1)
          ) {
            s = pe(h.dom);
            break;
          }
          t += h.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      o = c;
    }
    return {
      node: this.contentDOM,
      from: e,
      to: t,
      fromOffset: i,
      toOffset: s,
    };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length) return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  setSelection(e, t, r, i = !1) {
    let s = Math.min(e, t),
      o = Math.max(e, t);
    for (let f = 0, p = 0; f < this.children.length; f++) {
      let y = this.children[f],
        x = p + y.size;
      if (s > p && o < x)
        return y.setSelection(e - p - y.border, t - p - y.border, r, i);
      p = x;
    }
    let l = this.domFromPos(e, e ? -1 : 1),
      a = t == e ? l : this.domFromPos(t, t ? -1 : 1),
      c = r.root.getSelection(),
      u = r.domSelectionRange(),
      h = !1;
    if ((Ke || be) && e == t) {
      let { node: f, offset: p } = l;
      if (f.nodeType == 3) {
        if (
          ((h = !!(
            p &&
            f.nodeValue[p - 1] ==
              `
`
          )),
          h && p == f.nodeValue.length)
        )
          for (let y = f, x; y; y = y.parentNode) {
            if ((x = y.nextSibling)) {
              x.nodeName == "BR" &&
                (l = a = { node: x.parentNode, offset: pe(x) + 1 });
              break;
            }
            let k = y.pmViewDesc;
            if (k && k.node && k.node.isBlock) break;
          }
      } else {
        let y = f.childNodes[p - 1];
        h = y && (y.nodeName == "BR" || y.contentEditable == "false");
      }
    }
    if (
      Ke &&
      u.focusNode &&
      u.focusNode != a.node &&
      u.focusNode.nodeType == 1
    ) {
      let f = u.focusNode.childNodes[u.focusOffset];
      f && f.contentEditable == "false" && (i = !0);
    }
    if (
      !(i || (h && be)) &&
      pn(l.node, l.offset, u.anchorNode, u.anchorOffset) &&
      pn(a.node, a.offset, u.focusNode, u.focusOffset)
    )
      return;
    let d = !1;
    if ((c.extend || e == t) && !h) {
      c.collapse(l.node, l.offset);
      try {
        e != t && c.extend(a.node, a.offset), (d = !0);
      } catch {}
    }
    if (!d) {
      if (e > t) {
        let p = l;
        (l = a), (a = p);
      }
      let f = document.createRange();
      f.setEnd(a.node, a.offset),
        f.setStart(l.node, l.offset),
        c.removeAllRanges(),
        c.addRange(f);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return (
      this.contentDOM &&
      this.contentDOM != this.dom &&
      !this.dom.contains(this.contentDOM)
    );
  }
  markDirty(e, t) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let s = this.children[i],
        o = r + s.size;
      if (r == o ? e <= o && t >= r : e < o && t > r) {
        let l = r + s.border,
          a = o - s.border;
        if (e >= l && t <= a) {
          (this.dirty = e == r || t == o ? sn : tc),
            e == l &&
            t == a &&
            (s.contentLost || s.dom.parentNode != this.contentDOM)
              ? (s.dirty = ot)
              : s.markDirty(e - l, t - l);
          return;
        } else
          s.dirty =
            s.dom == s.contentDOM &&
            s.dom.parentNode == this.contentDOM &&
            !s.children.length
              ? sn
              : ot;
      }
      r = o;
    }
    this.dirty = sn;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? sn : tc;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class uh extends Yr {
  constructor(e, t, r, i) {
    let s,
      o = t.type.toDOM;
    if (
      (typeof o == "function" &&
        (o = o(r, () => {
          if (!s) return i;
          if (s.parent) return s.parent.posBeforeChild(s);
        })),
      !t.type.spec.raw)
    ) {
      if (o.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(o), (o = l);
      }
      (o.contentEditable = "false"), o.classList.add("ProseMirror-widget");
    }
    super(e, [], o, null), (this.widget = t), (this.widget = t), (s = this);
  }
  matchesWidget(e) {
    return this.dirty == Fe && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get side() {
    return this.widget.type.side;
  }
}
class zk extends Yr {
  constructor(e, t, r, i) {
    super(e, [], t, null), (this.textDOM = r), (this.text = i);
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM
      ? this.posAtStart + (t ? this.size : 0)
      : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class mn extends Yr {
  constructor(e, t, r, i, s) {
    super(e, [], r, i), (this.mark = t), (this.spec = s);
  }
  static create(e, t, r, i) {
    let s = i.nodeViews[t.type.name],
      o = s && s(t, i, r);
    return (
      (!o || !o.dom) &&
        (o = Un.renderSpec(document, t.type.spec.toDOM(t, r), null, t.attrs)),
      new mn(e, t, o.dom, o.contentDOM || o.dom, o)
    );
  }
  parseRule() {
    return this.dirty & ot || this.mark.type.spec.reparseInView
      ? null
      : {
          mark: this.mark.type.name,
          attrs: this.mark.attrs,
          contentElement: this.contentDOM,
        };
  }
  matchesMark(e) {
    return this.dirty != ot && this.mark.eq(e);
  }
  markDirty(e, t) {
    if ((super.markDirty(e, t), this.dirty != Fe)) {
      let r = this.parent;
      for (; !r.node; ) r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), (this.dirty = Fe);
    }
  }
  slice(e, t, r) {
    let i = mn.create(this.parent, this.mark, !0, r),
      s = this.children,
      o = this.size;
    t < o && (s = bo(s, t, o, r)), e > 0 && (s = bo(s, 0, e, r));
    for (let l = 0; l < s.length; l++) s[l].parent = i;
    return (i.children = s), i;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation
      ? this.spec.ignoreMutation(e)
      : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class Ft extends Yr {
  constructor(e, t, r, i, s, o, l, a, c) {
    super(e, [], s, o),
      (this.node = t),
      (this.outerDeco = r),
      (this.innerDeco = i),
      (this.nodeDOM = l);
  }
  static create(e, t, r, i, s, o) {
    let l = s.nodeViews[t.type.name],
      a,
      c =
        l &&
        l(
          t,
          s,
          () => {
            if (!a) return o;
            if (a.parent) return a.parent.posBeforeChild(a);
          },
          r,
          i,
        ),
      u = c && c.dom,
      h = c && c.contentDOM;
    if (t.isText) {
      if (!u) u = document.createTextNode(t.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else
      u ||
        ({ dom: u, contentDOM: h } = Un.renderSpec(
          document,
          t.type.spec.toDOM(t),
          null,
          t.attrs,
        ));
    !h &&
      !t.isText &&
      u.nodeName != "BR" &&
      (u.hasAttribute("contenteditable") || (u.contentEditable = "false"),
      t.type.spec.draggable && (u.draggable = !0));
    let d = u;
    return (
      (u = ph(u, r, t)),
      c
        ? (a = new Pk(e, t, r, i, u, h || null, d, c, s, o + 1))
        : t.isText
          ? new rs(e, t, r, i, u, d, s)
          : new Ft(e, t, r, i, u, h || null, d, s, o + 1)
    );
  }
  parseRule() {
    if (this.node.type.spec.reparseInView) return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (
      (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"),
      !this.contentDOM)
    )
      e.getContent = () => this.node.content;
    else if (!this.contentLost) e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => C.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return (
      this.dirty == Fe &&
      e.eq(this.node) &&
      qi(t, this.outerDeco) &&
      r.eq(this.innerDeco)
    );
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  updateChildren(e, t) {
    let r = this.node.inlineContent,
      i = t,
      s = e.composing ? this.localCompositionInfo(e, t) : null,
      o = s && s.pos > -1 ? s : null,
      l = s && s.pos < 0,
      a = new vk(this, o && o.node, e);
    $k(
      this.node,
      this.innerDeco,
      (c, u, h) => {
        c.spec.marks
          ? a.syncToMarks(c.spec.marks, r, e)
          : c.type.side >= 0 &&
            !h &&
            a.syncToMarks(
              u == this.node.childCount ? W.none : this.node.child(u).marks,
              r,
              e,
            ),
          a.placeWidget(c, e, i);
      },
      (c, u, h, d) => {
        a.syncToMarks(c.marks, r, e);
        let f;
        a.findNodeMatch(c, u, h, d) ||
          (l &&
            e.state.selection.from > i &&
            e.state.selection.to < i + c.nodeSize &&
            (f = a.findIndexWithChild(s.node)) > -1 &&
            a.updateNodeAt(c, u, h, f, e)) ||
          a.updateNextNode(c, u, h, e, d, i) ||
          a.addNode(c, u, h, e, i),
          (i += c.nodeSize);
      },
    ),
      a.syncToMarks([], r, e),
      this.node.isTextblock && a.addTextblockHacks(),
      a.destroyRest(),
      (a.changed || this.dirty == sn) &&
        (o && this.protectLocalComposition(e, o),
        fh(this.contentDOM, this.children, e),
        Jn && Vk(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: i } = e.state.selection;
    if (
      !(e.state.selection instanceof J) ||
      r < t ||
      i > t + this.node.content.size
    )
      return null;
    let s = e.input.compositionNode;
    if (!s || !this.dom.contains(s.parentNode)) return null;
    if (this.node.inlineContent) {
      let o = s.nodeValue,
        l = Wk(this.node.content, o, r - t, i - t);
      return l < 0 ? null : { node: s, pos: l, text: o };
    } else return { node: s, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: i }) {
    if (this.getDesc(t)) return;
    let s = t;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; ) s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; ) s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let o = new zk(this, s, t, i);
    e.input.compositionNodes.push(o),
      (this.children = bo(this.children, r, r + i.length, e, o));
  }
  update(e, t, r, i) {
    return this.dirty == ot || !e.sameMarkup(this.node)
      ? !1
      : (this.updateInner(e, t, r, i), !0);
  }
  updateInner(e, t, r, i) {
    this.updateOuterDeco(t),
      (this.node = e),
      (this.innerDeco = r),
      this.contentDOM && this.updateChildren(i, this.posAtStart),
      (this.dirty = Fe);
  }
  updateOuterDeco(e) {
    if (qi(e, this.outerDeco)) return;
    let t = this.nodeDOM.nodeType != 1,
      r = this.dom;
    (this.dom = dh(
      this.dom,
      this.nodeDOM,
      xo(this.outerDeco, this.node, t),
      xo(e, this.node, t),
    )),
      this.dom != r && ((r.pmViewDesc = void 0), (this.dom.pmViewDesc = this)),
      (this.outerDeco = e);
  }
  selectNode() {
    this.nodeDOM.nodeType == 1 &&
      this.nodeDOM.classList.add("ProseMirror-selectednode"),
      (this.contentDOM || !this.node.type.spec.draggable) &&
        (this.dom.draggable = !0);
  }
  deselectNode() {
    this.nodeDOM.nodeType == 1 &&
      (this.nodeDOM.classList.remove("ProseMirror-selectednode"),
      (this.contentDOM || !this.node.type.spec.draggable) &&
        this.dom.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function nc(n, e, t, r, i) {
  ph(r, e, n);
  let s = new Ft(void 0, n, e, t, r, r, r, i, 0);
  return s.contentDOM && s.updateChildren(i, 0), s;
}
class rs extends Ft {
  constructor(e, t, r, i, s, o, l) {
    super(e, t, r, i, s, null, o, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; ) e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, i) {
    return this.dirty == ot ||
      (this.dirty != Fe && !this.inParent()) ||
      !e.sameMarkup(this.node)
      ? !1
      : (this.updateOuterDeco(t),
        (this.dirty != Fe || e.text != this.node.text) &&
          e.text != this.nodeDOM.nodeValue &&
          ((this.nodeDOM.nodeValue = e.text),
          i.trackWrites == this.nodeDOM && (i.trackWrites = null)),
        (this.node = e),
        (this.dirty = Fe),
        !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode) if (t == e) return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM
      ? this.posAtStart + Math.min(t, this.node.text.length)
      : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let i = this.node.cut(e, t),
      s = document.createTextNode(i.text);
    return new rs(this.parent, i, this.outerDeco, this.innerDeco, s, s, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t),
      this.dom != this.nodeDOM &&
        (e == 0 || t == this.nodeDOM.nodeValue.length) &&
        (this.dirty = ot);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class hh extends Yr {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Fe && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class Pk extends Ft {
  constructor(e, t, r, i, s, o, l, a, c, u) {
    super(e, t, r, i, s, o, l, c, u), (this.spec = a);
  }
  update(e, t, r, i) {
    if (this.dirty == ot) return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let s = this.spec.update(e, t, r);
      return s && this.updateInner(e, t, r, i), s;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, i) {
    this.spec.setSelection
      ? this.spec.setSelection(e, t, r.root)
      : super.setSelection(e, t, r, i);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation
      ? this.spec.ignoreMutation(e)
      : super.ignoreMutation(e);
  }
}
function fh(n, e, t) {
  let r = n.firstChild,
    i = !1;
  for (let s = 0; s < e.length; s++) {
    let o = e[s],
      l = o.dom;
    if (l.parentNode == n) {
      for (; l != r; ) (r = rc(r)), (i = !0);
      r = r.nextSibling;
    } else (i = !0), n.insertBefore(l, r);
    if (o instanceof mn) {
      let a = r ? r.previousSibling : n.lastChild;
      fh(o.contentDOM, o.children, t), (r = a ? a.nextSibling : n.firstChild);
    }
  }
  for (; r; ) (r = rc(r)), (i = !0);
  i && t.trackWrites == n && (t.trackWrites = null);
}
const Dr = function (n) {
  n && (this.nodeName = n);
};
Dr.prototype = Object.create(null);
const on = [new Dr()];
function xo(n, e, t) {
  if (n.length == 0) return on;
  let r = t ? on[0] : new Dr(),
    i = [r];
  for (let s = 0; s < n.length; s++) {
    let o = n[s].type.attrs;
    if (o) {
      o.nodeName && i.push((r = new Dr(o.nodeName)));
      for (let l in o) {
        let a = o[l];
        a != null &&
          (t &&
            i.length == 1 &&
            i.push((r = new Dr(e.isInline ? "span" : "div"))),
          l == "class"
            ? (r.class = (r.class ? r.class + " " : "") + a)
            : l == "style"
              ? (r.style = (r.style ? r.style + ";" : "") + a)
              : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function dh(n, e, t, r) {
  if (t == on && r == on) return e;
  let i = e;
  for (let s = 0; s < r.length; s++) {
    let o = r[s],
      l = t[s];
    if (s) {
      let a;
      (l &&
        l.nodeName == o.nodeName &&
        i != n &&
        (a = i.parentNode) &&
        a.nodeName.toLowerCase() == o.nodeName) ||
        ((a = document.createElement(o.nodeName)),
        (a.pmIsDeco = !0),
        a.appendChild(i),
        (l = on[0])),
        (i = a);
    }
    Bk(i, l || on[0], o);
  }
  return i;
}
function Bk(n, e, t) {
  for (let r in e)
    r != "class" &&
      r != "style" &&
      r != "nodeName" &&
      !(r in t) &&
      n.removeAttribute(r);
  for (let r in t)
    r != "class" &&
      r != "style" &&
      r != "nodeName" &&
      t[r] != e[r] &&
      n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [],
      i = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < r.length; s++)
      i.indexOf(r[s]) == -1 && n.classList.remove(r[s]);
    for (let s = 0; s < i.length; s++)
      r.indexOf(i[s]) == -1 && n.classList.add(i[s]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r =
          /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g,
        i;
      for (; (i = r.exec(e.style)); ) n.style.removeProperty(i[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function ph(n, e, t) {
  return dh(n, n, on, xo(e, t, n.nodeType != 1));
}
function qi(n, e) {
  if (n.length != e.length) return !1;
  for (let t = 0; t < n.length; t++) if (!n[t].type.eq(e[t].type)) return !1;
  return !0;
}
function rc(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class vk {
  constructor(e, t, r) {
    (this.lock = t),
      (this.view = r),
      (this.index = 0),
      (this.stack = []),
      (this.changed = !1),
      (this.top = e),
      (this.preMatch = Fk(e.node.content, e));
  }
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++) this.top.children[r].destroy();
      this.top.children.splice(e, t - e), (this.changed = !0);
    }
  }
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  syncToMarks(e, t, r) {
    let i = 0,
      s = this.stack.length >> 1,
      o = Math.min(s, e.length);
    for (
      ;
      i < o &&
      (i == s - 1 ? this.top : this.stack[(i + 1) << 1]).matchesMark(e[i]) &&
      e[i].type.spec.spanning !== !1;

    )
      i++;
    for (; i < s; )
      this.destroyRest(),
        (this.top.dirty = Fe),
        (this.index = this.stack.pop()),
        (this.top = this.stack.pop()),
        s--;
    for (; s < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let l = -1;
      for (
        let a = this.index;
        a < Math.min(this.index + 3, this.top.children.length);
        a++
      ) {
        let c = this.top.children[a];
        if (c.matchesMark(e[s]) && !this.isLocked(c.dom)) {
          l = a;
          break;
        }
      }
      if (l > -1)
        l > this.index &&
          ((this.changed = !0), this.destroyBetween(this.index, l)),
          (this.top = this.top.children[this.index]);
      else {
        let a = mn.create(this.top, e[s], t, r);
        this.top.children.splice(this.index, 0, a),
          (this.top = a),
          (this.changed = !0);
      }
      (this.index = 0), s++;
    }
  }
  findNodeMatch(e, t, r, i) {
    let s = -1,
      o;
    if (
      i >= this.preMatch.index &&
      (o = this.preMatch.matches[i - this.preMatch.index]).parent == this.top &&
      o.matchesNode(e, t, r)
    )
      s = this.top.children.indexOf(o, this.index);
    else
      for (
        let l = this.index, a = Math.min(this.top.children.length, l + 5);
        l < a;
        l++
      ) {
        let c = this.top.children[l];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          s = l;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, t, r, i, s) {
    let o = this.top.children[i];
    return (
      o.dirty == ot && o.dom == o.contentDOM && (o.dirty = sn),
      o.update(e, t, r, s)
        ? (this.destroyBetween(this.index, i), this.index++, !0)
        : !1
    );
  }
  findIndexWithChild(e) {
    for (;;) {
      let t = e.parentNode;
      if (!t) return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r) return i;
        }
        return -1;
      }
      e = t;
    }
  }
  updateNextNode(e, t, r, i, s, o) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof Ft) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != s) return !1;
        let u = a.dom,
          h,
          d =
            this.isLocked(u) &&
            !(
              e.isText &&
              a.node &&
              a.node.isText &&
              a.nodeDOM.nodeValue == e.text &&
              a.dirty != ot &&
              qi(t, a.outerDeco)
            );
        if (!d && a.update(e, t, r, i))
          return (
            this.destroyBetween(this.index, l),
            a.dom != u && (this.changed = !0),
            this.index++,
            !0
          );
        if (!d && (h = this.recreateWrapper(a, e, t, r, i, o)))
          return (
            this.destroyBetween(this.index, l),
            (this.top.children[this.index] = h),
            h.contentDOM &&
              ((h.dirty = sn), h.updateChildren(i, o + 1), (h.dirty = Fe)),
            (this.changed = !0),
            this.index++,
            !0
          );
        break;
      }
    }
    return !1;
  }
  recreateWrapper(e, t, r, i, s, o) {
    if (
      e.dirty ||
      t.isAtom ||
      !e.children.length ||
      !e.node.content.eq(t.content) ||
      !qi(r, e.outerDeco) ||
      !i.eq(e.innerDeco)
    )
      return null;
    let l = Ft.create(this.top, t, r, i, s, o);
    if (l.contentDOM) {
      (l.children = e.children), (e.children = []);
      for (let a of l.children) a.parent = l;
    }
    return e.destroy(), l;
  }
  addNode(e, t, r, i, s) {
    let o = Ft.create(this.top, e, t, r, i, s);
    o.contentDOM && o.updateChildren(i, s + 1),
      this.top.children.splice(this.index++, 0, o),
      (this.changed = !0);
  }
  placeWidget(e, t, r) {
    let i =
      this.index < this.top.children.length
        ? this.top.children[this.index]
        : null;
    if (
      i &&
      i.matchesWidget(e) &&
      (e == i.widget || !i.widget.type.toDOM.parentNode)
    )
      this.index++;
    else {
      let s = new uh(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, s), (this.changed = !0);
    }
  }
  addTextblockHacks() {
    let e = this.top.children[this.index - 1],
      t = this.top;
    for (; e instanceof mn; ) (t = e), (e = t.children[t.children.length - 1]);
    (!e ||
      !(e instanceof rs) ||
      /\n$/.test(e.node.text) ||
      (this.view.requiresGeckoHackNode && /\s$/.test(e.node.text))) &&
      ((be || ye) &&
        e &&
        e.dom.contentEditable == "false" &&
        this.addHackNode("IMG", t),
      this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (
      t == this.top &&
      this.index < t.children.length &&
      t.children[this.index].matchesHack(e)
    )
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && ((r.className = "ProseMirror-separator"), (r.alt = "")),
        e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new hh(this.top, [], r, null);
      t != this.top
        ? t.children.push(i)
        : t.children.splice(this.index++, 0, i),
        (this.changed = !0);
    }
  }
  isLocked(e) {
    return (
      this.lock &&
      (e == this.lock || (e.nodeType == 1 && e.contains(this.lock.parentNode)))
    );
  }
}
function Fk(n, e) {
  let t = e,
    r = t.children.length,
    i = n.childCount,
    s = new Map(),
    o = [];
  e: for (; i > 0; ) {
    let l;
    for (;;)
      if (r) {
        let c = t.children[r - 1];
        if (c instanceof mn) (t = c), (r = c.children.length);
        else {
          (l = c), r--;
          break;
        }
      } else {
        if (t == e) break e;
        (r = t.parent.children.indexOf(t)), (t = t.parent);
      }
    let a = l.node;
    if (a) {
      if (a != n.child(i - 1)) break;
      --i, s.set(l, i), o.push(l);
    }
  }
  return { index: i, matched: s, matches: o.reverse() };
}
function Lk(n, e) {
  return n.type.side - e.type.side;
}
function $k(n, e, t, r) {
  let i = e.locals(n),
    s = 0;
  if (i.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let u = n.child(c);
      r(u, i, e.forChild(s, u), c), (s += u.nodeSize);
    }
    return;
  }
  let o = 0,
    l = [],
    a = null;
  for (let c = 0; ; ) {
    let u, h;
    for (; o < i.length && i[o].to == s; ) {
      let x = i[o++];
      x.widget && (u ? (h || (h = [u])).push(x) : (u = x));
    }
    if (u)
      if (h) {
        h.sort(Lk);
        for (let x = 0; x < h.length; x++) t(h[x], c, !!a);
      } else t(u, c, !!a);
    let d, f;
    if (a) (f = -1), (d = a), (a = null);
    else if (c < n.childCount) (f = c), (d = n.child(c++));
    else break;
    for (let x = 0; x < l.length; x++) l[x].to <= s && l.splice(x--, 1);
    for (; o < i.length && i[o].from <= s && i[o].to > s; ) l.push(i[o++]);
    let p = s + d.nodeSize;
    if (d.isText) {
      let x = p;
      o < i.length && i[o].from < x && (x = i[o].from);
      for (let k = 0; k < l.length; k++) l[k].to < x && (x = l[k].to);
      x < p && ((a = d.cut(x - s)), (d = d.cut(0, x - s)), (p = x), (f = -1));
    } else for (; o < i.length && i[o].to < p; ) o++;
    let y = d.isInline && !d.isLeaf ? l.filter((x) => !x.inline) : l.slice();
    r(d, y, e.forChild(s, d), f), (s = p);
  }
}
function Vk(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    (n.style.cssText = e + "; list-style: square !important"),
      window.getComputedStyle(n).listStyle,
      (n.style.cssText = e);
  }
}
function Wk(n, e, t, r) {
  for (let i = 0, s = 0; i < n.childCount && s <= r; ) {
    let o = n.child(i++),
      l = s;
    if (((s += o.nodeSize), !o.isText)) continue;
    let a = o.text;
    for (; i < n.childCount; ) {
      let c = n.child(i++);
      if (((s += c.nodeSize), !c.isText)) break;
      a += c.text;
    }
    if (s >= t) {
      if (s >= r && a.slice(r - e.length - l, r - l) == e) return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= t) return l + c;
      if (
        t == r &&
        a.length >= r + e.length - l &&
        a.slice(r - l, r - l + e.length) == e
      )
        return r;
    }
  }
  return -1;
}
function bo(n, e, t, r, i) {
  let s = [];
  for (let o = 0, l = 0; o < n.length; o++) {
    let a = n[o],
      c = l,
      u = (l += a.size);
    c >= t || u <= e
      ? s.push(a)
      : (c < e && s.push(a.slice(0, e - c, r)),
        i && (s.push(i), (i = void 0)),
        u > t && s.push(a.slice(t - c, a.size, r)));
  }
  return s;
}
function Yo(n, e = null) {
  let t = n.domSelectionRange(),
    r = n.state.doc;
  if (!t.focusNode) return null;
  let i = n.docView.nearestDesc(t.focusNode),
    s = i && i.size == 0,
    o = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (o < 0) return null;
  let l = r.resolve(o),
    a,
    c;
  if (ns(t)) {
    for (a = o; i && !i.node; ) i = i.parent;
    let h = i.node;
    if (
      i &&
      h.isAtom &&
      P.isSelectable(h) &&
      i.parent &&
      !(h.isInline && dk(t.focusNode, t.focusOffset, i.dom))
    ) {
      let d = i.posBefore;
      c = new P(o == d ? l : r.resolve(d));
    }
  } else {
    if (
      t instanceof n.dom.ownerDocument.defaultView.Selection &&
      t.rangeCount > 1
    ) {
      let h = o,
        d = o;
      for (let f = 0; f < t.rangeCount; f++) {
        let p = t.getRangeAt(f);
        (h = Math.min(
          h,
          n.docView.posFromDOM(p.startContainer, p.startOffset, 1),
        )),
          (d = Math.max(
            d,
            n.docView.posFromDOM(p.endContainer, p.endOffset, -1),
          ));
      }
      if (h < 0) return null;
      ([a, o] = d == n.state.selection.anchor ? [d, h] : [h, d]),
        (l = r.resolve(o));
    } else a = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (a < 0) return null;
  }
  let u = r.resolve(a);
  if (!c) {
    let h = e == "pointer" || (n.state.selection.head < l.pos && !s) ? 1 : -1;
    c = Go(n, u, l, h);
  }
  return c;
}
function mh(n) {
  return n.editable
    ? n.hasFocus()
    : yh(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function yt(n, e = !1) {
  let t = n.state.selection;
  if ((gh(n, t), !!mh(n))) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && ye) {
      let r = n.domSelectionRange(),
        i = n.domObserver.currentSelection;
      if (
        r.anchorNode &&
        i.anchorNode &&
        pn(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)
      ) {
        (n.input.mouseDown.delayedSelectionSync = !0),
          n.domObserver.setCurSelection();
        return;
      }
    }
    if ((n.domObserver.disconnectSelection(), n.cursorWrapper)) Hk(n);
    else {
      let { anchor: r, head: i } = t,
        s,
        o;
      ic &&
        !(t instanceof J) &&
        (t.$from.parent.inlineContent || (s = sc(n, t.from)),
        !t.empty && !t.$from.parent.inlineContent && (o = sc(n, t.to))),
        n.docView.setSelection(r, i, n, e),
        ic && (s && oc(s), o && oc(o)),
        t.visible
          ? n.dom.classList.remove("ProseMirror-hideselection")
          : (n.dom.classList.add("ProseMirror-hideselection"),
            "onselectionchange" in document && qk(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const ic = be || (ye && rh < 63);
function sc(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0),
    i = r < t.childNodes.length ? t.childNodes[r] : null,
    s = r ? t.childNodes[r - 1] : null;
  if (be && i && i.contentEditable == "false") return Rs(i);
  if (
    (!i || i.contentEditable == "false") &&
    (!s || s.contentEditable == "false")
  ) {
    if (i) return Rs(i);
    if (s) return Rs(s);
  }
}
function Rs(n) {
  return (
    (n.contentEditable = "true"),
    be && n.draggable && ((n.draggable = !1), (n.wasDraggable = !0)),
    n
  );
}
function oc(n) {
  (n.contentEditable = "false"),
    n.wasDraggable && ((n.draggable = !0), (n.wasDraggable = null));
}
function qk(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(),
    r = t.anchorNode,
    i = t.anchorOffset;
  e.addEventListener(
    "selectionchange",
    (n.input.hideSelectionGuard = () => {
      (t.anchorNode != r || t.anchorOffset != i) &&
        (e.removeEventListener("selectionchange", n.input.hideSelectionGuard),
        setTimeout(() => {
          (!mh(n) || n.state.selection.visible) &&
            n.dom.classList.remove("ProseMirror-hideselection");
        }, 20));
    }),
  );
}
function Hk(n) {
  let e = n.domSelection(),
    t = document.createRange();
  if (!e) return;
  let r = n.cursorWrapper.dom,
    i = r.nodeName == "IMG";
  i ? t.setStart(r.parentNode, pe(r) + 1) : t.setStart(r, 0),
    t.collapse(!0),
    e.removeAllRanges(),
    e.addRange(t),
    !i &&
      !n.state.selection.visible &&
      Ne &&
      vt <= 11 &&
      ((r.disabled = !0), (r.disabled = !1));
}
function gh(n, e) {
  if (e instanceof P) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc &&
      (lc(n), t && t.selectNode(), (n.lastSelectedViewDesc = t));
  } else lc(n);
}
function lc(n) {
  n.lastSelectedViewDesc &&
    (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(),
    (n.lastSelectedViewDesc = void 0));
}
function Go(n, e, t, r) {
  return (
    n.someProp("createSelectionBetween", (i) => i(n, e, t)) ||
    J.between(e, t, r)
  );
}
function ac(n) {
  return n.editable && !n.hasFocus() ? !1 : yh(n);
}
function yh(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode) return !1;
  try {
    return (
      n.dom.contains(
        e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode,
      ) &&
      (n.editable ||
        n.dom.contains(
          e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode,
        ))
    );
  } catch {
    return !1;
  }
}
function _k(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0),
    t = n.domSelectionRange();
  return pn(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function So(n, e) {
  let { $anchor: t, $head: r } = n.selection,
    i = e > 0 ? t.max(r) : t.min(r),
    s = i.parent.inlineContent
      ? i.depth
        ? n.doc.resolve(e > 0 ? i.after() : i.before())
        : null
      : i;
  return s && H.findFrom(s, e);
}
function At(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function cc(n, e, t) {
  let r = n.state.selection;
  if (r instanceof J)
    if (t.indexOf("s") > -1) {
      let { $head: i } = r,
        s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!s || s.isText || !s.isLeaf) return !1;
      let o = n.state.doc.resolve(i.pos + s.nodeSize * (e < 0 ? -1 : 1));
      return At(n, new J(r.$anchor, o));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = So(n.state, e);
        return i && i instanceof P ? At(n, i) : !1;
      } else if (!(Pe && t.indexOf("m") > -1)) {
        let i = r.$head,
          s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter,
          o;
        if (!s || s.isText) return !1;
        let l = e < 0 ? i.pos - s.nodeSize : i.pos;
        return s.isAtom || ((o = n.docView.descAt(l)) && !o.contentDOM)
          ? P.isSelectable(s)
            ? At(n, new P(e < 0 ? n.state.doc.resolve(i.pos - s.nodeSize) : i))
            : Ur
              ? At(n, new J(n.state.doc.resolve(e < 0 ? l : l + s.nodeSize)))
              : !1
          : !1;
      }
    } else return !1;
  else {
    if (r instanceof P && r.node.isInline)
      return At(n, new J(e > 0 ? r.$to : r.$from));
    {
      let i = So(n.state, e);
      return i ? At(n, i) : !1;
    }
  }
}
function Hi(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Rr(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function Mn(n, e) {
  return e < 0 ? jk(n) : Kk(n);
}
function jk(n) {
  let e = n.domSelectionRange(),
    t = e.focusNode,
    r = e.focusOffset;
  if (!t) return;
  let i,
    s,
    o = !1;
  for (
    Ke && t.nodeType == 1 && r < Hi(t) && Rr(t.childNodes[r], -1) && (o = !0);
    ;

  )
    if (r > 0) {
      if (t.nodeType != 1) break;
      {
        let l = t.childNodes[r - 1];
        if (Rr(l, -1)) (i = t), (s = --r);
        else if (l.nodeType == 3) (t = l), (r = t.nodeValue.length);
        else break;
      }
    } else {
      if (kh(t)) break;
      {
        let l = t.previousSibling;
        for (; l && Rr(l, -1); )
          (i = t.parentNode), (s = pe(l)), (l = l.previousSibling);
        if (l) (t = l), (r = Hi(t));
        else {
          if (((t = t.parentNode), t == n.dom)) break;
          r = 0;
        }
      }
    }
  o ? wo(n, t, r) : i && wo(n, i, s);
}
function Kk(n) {
  let e = n.domSelectionRange(),
    t = e.focusNode,
    r = e.focusOffset;
  if (!t) return;
  let i = Hi(t),
    s,
    o;
  for (;;)
    if (r < i) {
      if (t.nodeType != 1) break;
      let l = t.childNodes[r];
      if (Rr(l, 1)) (s = t), (o = ++r);
      else break;
    } else {
      if (kh(t)) break;
      {
        let l = t.nextSibling;
        for (; l && Rr(l, 1); )
          (s = l.parentNode), (o = pe(l) + 1), (l = l.nextSibling);
        if (l) (t = l), (r = 0), (i = Hi(t));
        else {
          if (((t = t.parentNode), t == n.dom)) break;
          r = i = 0;
        }
      }
    }
  s && wo(n, s, o);
}
function kh(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function Jk(n, e) {
  for (; n && e == n.childNodes.length && !Jr(n); )
    (e = pe(n) + 1), (n = n.parentNode);
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3) return t;
    if (t.nodeType == 1 && t.contentEditable == "false") break;
    (n = t), (e = 0);
  }
}
function Uk(n, e) {
  for (; n && !e && !Jr(n); ) (e = pe(n)), (n = n.parentNode);
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3) return t;
    if (t.nodeType == 1 && t.contentEditable == "false") break;
    (n = t), (e = n.childNodes.length);
  }
}
function wo(n, e, t) {
  if (e.nodeType != 3) {
    let s, o;
    (o = Jk(e, t))
      ? ((e = o), (t = 0))
      : (s = Uk(e, t)) && ((e = s), (t = s.nodeValue.length));
  }
  let r = n.domSelection();
  if (!r) return;
  if (ns(r)) {
    let s = document.createRange();
    s.setEnd(e, t), s.setStart(e, t), r.removeAllRanges(), r.addRange(s);
  } else r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: i } = n;
  setTimeout(() => {
    n.state == i && yt(n);
  }, 50);
}
function uc(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(ye || gk) && t.parent.inlineContent) {
    let i = n.coordsAtPos(e);
    if (e > t.start()) {
      let s = n.coordsAtPos(e - 1),
        o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left < i.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let s = n.coordsAtPos(e + 1),
        o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function hc(n, e, t) {
  let r = n.state.selection;
  if (
    (r instanceof J && !r.empty) ||
    t.indexOf("s") > -1 ||
    (Pe && t.indexOf("m") > -1)
  )
    return !1;
  let { $from: i, $to: s } = r;
  if (!i.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let o = So(n.state, e);
    if (o && o instanceof P) return At(n, o);
  }
  if (!i.parent.inlineContent) {
    let o = e < 0 ? i : s,
      l = r instanceof De ? H.near(o, e) : H.findFrom(o, e);
    return l ? At(n, l) : !1;
  }
  return !1;
}
function fc(n, e) {
  if (!(n.state.selection instanceof J)) return !0;
  let { $head: t, $anchor: r, empty: i } = n.state.selection;
  if (!t.sameParent(r)) return !0;
  if (!i) return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward")) return !0;
  let s = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (s && !s.isText) {
    let o = n.state.tr;
    return (
      e < 0
        ? o.delete(t.pos - s.nodeSize, t.pos)
        : o.delete(t.pos, t.pos + s.nodeSize),
      n.dispatch(o),
      !0
    );
  }
  return !1;
}
function dc(n, e, t) {
  n.domObserver.stop(), (e.contentEditable = t), n.domObserver.start();
}
function Yk(n) {
  if (!be || n.state.selection.$head.parentOffset > 0) return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (
    e &&
    e.nodeType == 1 &&
    t == 0 &&
    e.firstChild &&
    e.firstChild.contentEditable == "false"
  ) {
    let r = e.firstChild;
    dc(n, r, "true"), setTimeout(() => dc(n, r, "false"), 20);
  }
  return !1;
}
function Gk(n) {
  let e = "";
  return (
    n.ctrlKey && (e += "c"),
    n.metaKey && (e += "m"),
    n.altKey && (e += "a"),
    n.shiftKey && (e += "s"),
    e
  );
}
function Qk(n, e) {
  let t = e.keyCode,
    r = Gk(e);
  if (t == 8 || (Pe && t == 72 && r == "c")) return fc(n, -1) || Mn(n, -1);
  if ((t == 46 && !e.shiftKey) || (Pe && t == 68 && r == "c"))
    return fc(n, 1) || Mn(n, 1);
  if (t == 13 || t == 27) return !0;
  if (t == 37 || (Pe && t == 66 && r == "c")) {
    let i = t == 37 ? (uc(n, n.state.selection.from) == "ltr" ? -1 : 1) : -1;
    return cc(n, i, r) || Mn(n, i);
  } else if (t == 39 || (Pe && t == 70 && r == "c")) {
    let i = t == 39 ? (uc(n, n.state.selection.from) == "ltr" ? 1 : -1) : 1;
    return cc(n, i, r) || Mn(n, i);
  } else {
    if (t == 38 || (Pe && t == 80 && r == "c"))
      return hc(n, -1, r) || Mn(n, -1);
    if (t == 40 || (Pe && t == 78 && r == "c"))
      return Yk(n) || hc(n, 1, r) || Mn(n, 1);
    if (r == (Pe ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function xh(n, e) {
  n.someProp("transformCopied", (f) => {
    e = f(e, n);
  });
  let t = [],
    { content: r, openStart: i, openEnd: s } = e;
  for (
    ;
    i > 1 && s > 1 && r.childCount == 1 && r.firstChild.childCount == 1;

  ) {
    i--, s--;
    let f = r.firstChild;
    t.push(f.type.name, f.attrs != f.type.defaultAttrs ? f.attrs : null),
      (r = f.content);
  }
  let o = n.someProp("clipboardSerializer") || Un.fromSchema(n.state.schema),
    l = Nh(),
    a = l.createElement("div");
  a.appendChild(o.serializeFragment(r, { document: l }));
  let c = a.firstChild,
    u,
    h = 0;
  for (; c && c.nodeType == 1 && (u = Mh[c.nodeName.toLowerCase()]); ) {
    for (let f = u.length - 1; f >= 0; f--) {
      let p = l.createElement(u[f]);
      for (; a.firstChild; ) p.appendChild(a.firstChild);
      a.appendChild(p), h++;
    }
    c = a.firstChild;
  }
  c &&
    c.nodeType == 1 &&
    c.setAttribute(
      "data-pm-slice",
      `${i} ${s}${h ? ` -${h}` : ""} ${JSON.stringify(t)}`,
    );
  let d =
    n.someProp("clipboardTextSerializer", (f) => f(e, n)) ||
    e.content.textBetween(
      0,
      e.content.size,
      `

`,
    );
  return { dom: a, text: d, slice: e };
}
function bh(n, e, t, r, i) {
  let s = i.parent.type.spec.code,
    o,
    l;
  if (!t && !e) return null;
  let a = e && (r || s || !t);
  if (a) {
    if (
      (n.someProp("transformPastedText", (d) => {
        e = d(e, s || r, n);
      }),
      s)
    )
      return e
        ? new T(
            C.from(
              n.state.schema.text(
                e.replace(
                  /\r\n?/g,
                  `
`,
                ),
              ),
            ),
            0,
            0,
          )
        : T.empty;
    let h = n.someProp("clipboardTextParser", (d) => d(e, i, r, n));
    if (h) l = h;
    else {
      let d = i.marks(),
        { schema: f } = n.state,
        p = Un.fromSchema(f);
      (o = document.createElement("div")),
        e.split(/(?:\r\n?|\n)+/).forEach((y) => {
          let x = o.appendChild(document.createElement("p"));
          y && x.appendChild(p.serializeNode(f.text(y, d)));
        });
    }
  } else
    n.someProp("transformPastedHTML", (h) => {
      t = h(t, n);
    }),
      (o = t1(t)),
      Ur && n1(o);
  let c = o && o.querySelector("[data-pm-slice]"),
    u =
      c &&
      /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(
        c.getAttribute("data-pm-slice") || "",
      );
  if (u && u[3])
    for (let h = +u[3]; h > 0; h--) {
      let d = o.firstChild;
      for (; d && d.nodeType != 1; ) d = d.nextSibling;
      if (!d) break;
      o = d;
    }
  if (
    (l ||
      (l = (
        n.someProp("clipboardParser") ||
        n.someProp("domParser") ||
        Hn.fromSchema(n.state.schema)
      ).parseSlice(o, {
        preserveWhitespace: !!(a || u),
        context: i,
        ruleFromNode(d) {
          return d.nodeName == "BR" &&
            !d.nextSibling &&
            d.parentNode &&
            !Zk.test(d.parentNode.nodeName)
            ? { ignore: !0 }
            : null;
        },
      })),
    u)
  )
    l = r1(pc(l, +u[1], +u[2]), u[4]);
  else if (((l = T.maxOpen(Xk(l.content, i), !0)), l.openStart || l.openEnd)) {
    let h = 0,
      d = 0;
    for (
      let f = l.content.firstChild;
      h < l.openStart && !f.type.spec.isolating;
      h++, f = f.firstChild
    );
    for (
      let f = l.content.lastChild;
      d < l.openEnd && !f.type.spec.isolating;
      d++, f = f.lastChild
    );
    l = pc(l, h, d);
  }
  return (
    n.someProp("transformPasted", (h) => {
      l = h(l, n);
    }),
    l
  );
}
const Zk =
  /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Xk(n, e) {
  if (n.childCount < 2) return n;
  for (let t = e.depth; t >= 0; t--) {
    let i = e.node(t).contentMatchAt(e.index(t)),
      s,
      o = [];
    if (
      (n.forEach((l) => {
        if (!o) return;
        let a = i.findWrapping(l.type),
          c;
        if (!a) return (o = null);
        if ((c = o.length && s.length && wh(a, s, l, o[o.length - 1], 0)))
          o[o.length - 1] = c;
        else {
          o.length && (o[o.length - 1] = Ch(o[o.length - 1], s.length));
          let u = Sh(l, a);
          o.push(u), (i = i.matchType(u.type)), (s = a);
        }
      }),
      o)
    )
      return C.from(o);
  }
  return n;
}
function Sh(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--) n = e[r].create(null, C.from(n));
  return n;
}
function wh(n, e, t, r, i) {
  if (i < n.length && i < e.length && n[i] == e[i]) {
    let s = wh(n, e, t, r.lastChild, i + 1);
    if (s) return r.copy(r.content.replaceChild(r.childCount - 1, s));
    if (
      r
        .contentMatchAt(r.childCount)
        .matchType(i == n.length - 1 ? t.type : n[i + 1])
    )
      return r.copy(r.content.append(C.from(Sh(t, n, i + 1))));
  }
}
function Ch(n, e) {
  if (e == 0) return n;
  let t = n.content.replaceChild(n.childCount - 1, Ch(n.lastChild, e - 1)),
    r = n.contentMatchAt(n.childCount).fillBefore(C.empty, !0);
  return n.copy(t.append(r));
}
function Co(n, e, t, r, i, s) {
  let o = e < 0 ? n.firstChild : n.lastChild,
    l = o.content;
  return (
    n.childCount > 1 && (s = 0),
    i < r - 1 && (l = Co(l, e, t, r, i + 1, s)),
    i >= t &&
      (l =
        e < 0
          ? o
              .contentMatchAt(0)
              .fillBefore(l, s <= i)
              .append(l)
          : l.append(o.contentMatchAt(o.childCount).fillBefore(C.empty, !0))),
    n.replaceChild(e < 0 ? 0 : n.childCount - 1, o.copy(l))
  );
}
function pc(n, e, t) {
  return (
    e < n.openStart &&
      (n = new T(
        Co(n.content, -1, e, n.openStart, 0, n.openEnd),
        e,
        n.openEnd,
      )),
    t < n.openEnd &&
      (n = new T(Co(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)),
    n
  );
}
const Mh = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"],
};
let mc = null;
function Nh() {
  return mc || (mc = document.implementation.createHTMLDocument("title"));
}
let zs = null;
function e1(n) {
  let e = window.trustedTypes;
  return e
    ? (zs ||
        (zs = e.createPolicy("ProseMirrorClipboard", { createHTML: (t) => t })),
      zs.createHTML(n))
    : n;
}
function t1(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = Nh().createElement("div"),
    r = /<([a-z][^>\s]+)/i.exec(n),
    i;
  if (
    ((i = r && Mh[r[1].toLowerCase()]) &&
      (n =
        i.map((s) => "<" + s + ">").join("") +
        n +
        i
          .map((s) => "</" + s + ">")
          .reverse()
          .join("")),
    (t.innerHTML = e1(n)),
    i)
  )
    for (let s = 0; s < i.length; s++) t = t.querySelector(i[s]) || t;
  return t;
}
function n1(n) {
  let e = n.querySelectorAll(
    ye ? "span:not([class]):not([style])" : "span.Apple-converted-space",
  );
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 &&
      r.textContent == " " &&
      r.parentNode &&
      r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function r1(n, e) {
  if (!n.size) return n;
  let t = n.content.firstChild.type.schema,
    r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: i, openStart: s, openEnd: o } = n;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = t.nodes[r[l]];
    if (!a || a.hasRequiredAttrs()) break;
    (i = C.from(a.create(r[l + 1], i))), s++, o++;
  }
  return new T(i, s, o);
}
const Se = {},
  we = {},
  i1 = { touchstart: !0, touchmove: !0 };
class s1 {
  constructor() {
    (this.shiftKey = !1),
      (this.mouseDown = null),
      (this.lastKeyCode = null),
      (this.lastKeyCodeTime = 0),
      (this.lastClick = { time: 0, x: 0, y: 0, type: "" }),
      (this.lastSelectionOrigin = null),
      (this.lastSelectionTime = 0),
      (this.lastIOSEnter = 0),
      (this.lastIOSEnterFallbackTimeout = -1),
      (this.lastFocus = 0),
      (this.lastTouch = 0),
      (this.lastChromeDelete = 0),
      (this.composing = !1),
      (this.compositionNode = null),
      (this.composingTimeout = -1),
      (this.compositionNodes = []),
      (this.compositionEndedAt = -2e8),
      (this.compositionID = 1),
      (this.compositionPendingChanges = 0),
      (this.domChangeCount = 0),
      (this.eventHandlers = Object.create(null)),
      (this.hideSelectionGuard = null);
  }
}
function o1(n) {
  for (let e in Se) {
    let t = Se[e];
    n.dom.addEventListener(
      e,
      (n.input.eventHandlers[e] = (r) => {
        a1(n, r) && !Qo(n, r) && (n.editable || !(r.type in we)) && t(n, r);
      }),
      i1[e] ? { passive: !0 } : void 0,
    );
  }
  be && n.dom.addEventListener("input", () => null), Mo(n);
}
function Pt(n, e) {
  (n.input.lastSelectionOrigin = e), (n.input.lastSelectionTime = Date.now());
}
function l1(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout),
    clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function Mo(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] ||
        n.dom.addEventListener(t, (n.input.eventHandlers[t] = (r) => Qo(n, r)));
  });
}
function Qo(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function a1(n, e) {
  if (!e.bubbles) return !0;
  if (e.defaultPrevented) return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || (t.pmViewDesc && t.pmViewDesc.stopEvent(e)))
      return !1;
  return !0;
}
function c1(n, e) {
  !Qo(n, e) &&
    Se[e.type] &&
    (n.editable || !(e.type in we)) &&
    Se[e.type](n, e);
}
we.keydown = (n, e) => {
  let t = e;
  if (
    ((n.input.shiftKey = t.keyCode == 16 || t.shiftKey),
    !Oh(n, t) &&
      ((n.input.lastKeyCode = t.keyCode),
      (n.input.lastKeyCodeTime = Date.now()),
      !(gt && ye && t.keyCode == 13)))
  )
    if (
      (t.keyCode != 229 && n.domObserver.forceFlush(),
      Jn && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey)
    ) {
      let r = Date.now();
      (n.input.lastIOSEnter = r),
        (n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
          n.input.lastIOSEnter == r &&
            (n.someProp("handleKeyDown", (i) => i(n, rn(13, "Enter"))),
            (n.input.lastIOSEnter = 0));
        }, 200));
    } else
      n.someProp("handleKeyDown", (r) => r(n, t)) || Qk(n, t)
        ? t.preventDefault()
        : Pt(n, "key");
};
we.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
we.keypress = (n, e) => {
  let t = e;
  if (Oh(n, t) || !t.charCode || (t.ctrlKey && !t.altKey) || (Pe && t.metaKey))
    return;
  if (n.someProp("handleKeyPress", (i) => i(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof J) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(t.charCode);
    !/[\r\n]/.test(i) &&
      !n.someProp("handleTextInput", (s) => s(n, r.$from.pos, r.$to.pos, i)) &&
      n.dispatch(n.state.tr.insertText(i).scrollIntoView()),
      t.preventDefault();
  }
};
function is(n) {
  return { left: n.clientX, top: n.clientY };
}
function u1(n, e) {
  let t = e.x - n.clientX,
    r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function Zo(n, e, t, r, i) {
  if (r == -1) return !1;
  let s = n.state.doc.resolve(r);
  for (let o = s.depth + 1; o > 0; o--)
    if (
      n.someProp(e, (l) =>
        o > s.depth
          ? l(n, t, s.nodeAfter, s.before(o), i, !0)
          : l(n, t, s.node(o), s.before(o), i, !1),
      )
    )
      return !0;
  return !1;
}
function Fn(n, e, t) {
  if ((n.focused || n.focus(), n.state.selection.eq(e))) return;
  let r = n.state.tr.setSelection(e);
  r.setMeta("pointer", !0), n.dispatch(r);
}
function h1(n, e) {
  if (e == -1) return !1;
  let t = n.state.doc.resolve(e),
    r = t.nodeAfter;
  return r && r.isAtom && P.isSelectable(r) ? (Fn(n, new P(t)), !0) : !1;
}
function f1(n, e) {
  if (e == -1) return !1;
  let t = n.state.selection,
    r,
    i;
  t instanceof P && (r = t.node);
  let s = n.state.doc.resolve(e);
  for (let o = s.depth + 1; o > 0; o--) {
    let l = o > s.depth ? s.nodeAfter : s.node(o);
    if (P.isSelectable(l)) {
      r &&
      t.$from.depth > 0 &&
      o >= t.$from.depth &&
      s.before(t.$from.depth + 1) == t.$from.pos
        ? (i = s.before(t.$from.depth))
        : (i = s.before(o));
      break;
    }
  }
  return i != null ? (Fn(n, P.create(n.state.doc, i)), !0) : !1;
}
function d1(n, e, t, r, i) {
  return (
    Zo(n, "handleClickOn", e, t, r) ||
    n.someProp("handleClick", (s) => s(n, e, r)) ||
    (i ? f1(n, t) : h1(n, t))
  );
}
function p1(n, e, t, r) {
  return (
    Zo(n, "handleDoubleClickOn", e, t, r) ||
    n.someProp("handleDoubleClick", (i) => i(n, e, r))
  );
}
function m1(n, e, t, r) {
  return (
    Zo(n, "handleTripleClickOn", e, t, r) ||
    n.someProp("handleTripleClick", (i) => i(n, e, r)) ||
    g1(n, t, r)
  );
}
function g1(n, e, t) {
  if (t.button != 0) return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (Fn(n, J.create(r, 0, r.content.size)), !0) : !1;
  let i = r.resolve(e);
  for (let s = i.depth + 1; s > 0; s--) {
    let o = s > i.depth ? i.nodeAfter : i.node(s),
      l = i.before(s);
    if (o.inlineContent) Fn(n, J.create(r, l + 1, l + 1 + o.content.size));
    else if (P.isSelectable(o)) Fn(n, P.create(r, l));
    else continue;
    return !0;
  }
}
function Xo(n) {
  return _i(n);
}
const Th = Pe ? "metaKey" : "ctrlKey";
Se.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = Xo(n),
    i = Date.now(),
    s = "singleClick";
  i - n.input.lastClick.time < 500 &&
    u1(t, n.input.lastClick) &&
    !t[Th] &&
    (n.input.lastClick.type == "singleClick"
      ? (s = "doubleClick")
      : n.input.lastClick.type == "doubleClick" && (s = "tripleClick")),
    (n.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: s });
  let o = n.posAtCoords(is(t));
  o &&
    (s == "singleClick"
      ? (n.input.mouseDown && n.input.mouseDown.done(),
        (n.input.mouseDown = new y1(n, o, t, !!r)))
      : (s == "doubleClick" ? p1 : m1)(n, o.pos, o.inside, t)
        ? t.preventDefault()
        : Pt(n, "pointer"));
};
class y1 {
  constructor(e, t, r, i) {
    (this.view = e),
      (this.pos = t),
      (this.event = r),
      (this.flushed = i),
      (this.delayedSelectionSync = !1),
      (this.mightDrag = null),
      (this.startDoc = e.state.doc),
      (this.selectNode = !!r[Th]),
      (this.allowDefault = r.shiftKey);
    let s, o;
    if (t.inside > -1) (s = e.state.doc.nodeAt(t.inside)), (o = t.inside);
    else {
      let u = e.state.doc.resolve(t.pos);
      (s = u.parent), (o = u.depth ? u.before() : 0);
    }
    const l = i ? null : r.target,
      a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.dom.nodeType == 1 ? a.dom : null;
    let { selection: c } = e.state;
    ((r.button == 0 &&
      s.type.spec.draggable &&
      s.type.spec.selectable !== !1) ||
      (c instanceof P && c.from <= o && c.to > o)) &&
      (this.mightDrag = {
        node: s,
        pos: o,
        addAttr: !!(this.target && !this.target.draggable),
        setUneditable: !!(
          this.target &&
          Ke &&
          !this.target.hasAttribute("contentEditable")
        ),
      }),
      this.target &&
        this.mightDrag &&
        (this.mightDrag.addAttr || this.mightDrag.setUneditable) &&
        (this.view.domObserver.stop(),
        this.mightDrag.addAttr && (this.target.draggable = !0),
        this.mightDrag.setUneditable &&
          setTimeout(() => {
            this.view.input.mouseDown == this &&
              this.target.setAttribute("contentEditable", "false");
          }, 20),
        this.view.domObserver.start()),
      e.root.addEventListener("mouseup", (this.up = this.up.bind(this))),
      e.root.addEventListener("mousemove", (this.move = this.move.bind(this))),
      Pt(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up),
      this.view.root.removeEventListener("mousemove", this.move),
      this.mightDrag &&
        this.target &&
        (this.view.domObserver.stop(),
        this.mightDrag.addAttr && this.target.removeAttribute("draggable"),
        this.mightDrag.setUneditable &&
          this.target.removeAttribute("contentEditable"),
        this.view.domObserver.start()),
      this.delayedSelectionSync && setTimeout(() => yt(this.view)),
      (this.view.input.mouseDown = null);
  }
  up(e) {
    if ((this.done(), !this.view.dom.contains(e.target))) return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(is(e))),
      this.updateAllowDefault(e),
      this.allowDefault || !t
        ? Pt(this.view, "pointer")
        : d1(this.view, t.pos, t.inside, e, this.selectNode)
          ? e.preventDefault()
          : e.button == 0 &&
              (this.flushed ||
                (be && this.mightDrag && !this.mightDrag.node.isAtom) ||
                (ye &&
                  !this.view.state.selection.visible &&
                  Math.min(
                    Math.abs(t.pos - this.view.state.selection.from),
                    Math.abs(t.pos - this.view.state.selection.to),
                  ) <= 2))
            ? (Fn(this.view, H.near(this.view.state.doc.resolve(t.pos))),
              e.preventDefault())
            : Pt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e),
      Pt(this.view, "pointer"),
      e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault &&
      (Math.abs(this.event.x - e.clientX) > 4 ||
        Math.abs(this.event.y - e.clientY) > 4) &&
      (this.allowDefault = !0);
  }
}
Se.touchstart = (n) => {
  (n.input.lastTouch = Date.now()), Xo(n), Pt(n, "pointer");
};
Se.touchmove = (n) => {
  (n.input.lastTouch = Date.now()), Pt(n, "pointer");
};
Se.contextmenu = (n) => Xo(n);
function Oh(n, e) {
  return n.composing
    ? !0
    : be && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500
      ? ((n.input.compositionEndedAt = -2e8), !0)
      : !1;
}
const k1 = gt ? 5e3 : -1;
we.compositionstart = we.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n,
      t = e.selection.$to;
    if (
      e.selection instanceof J &&
      (e.storedMarks ||
        (!t.textOffset &&
          t.parentOffset &&
          t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
    )
      (n.markCursor = n.state.storedMarks || t.marks()),
        _i(n, !0),
        (n.markCursor = null);
    else if (
      (_i(n, !e.selection.empty),
      Ke &&
        e.selection.empty &&
        t.parentOffset &&
        !t.textOffset &&
        t.nodeBefore.marks.length)
    ) {
      let r = n.domSelectionRange();
      for (
        let i = r.focusNode, s = r.focusOffset;
        i && i.nodeType == 1 && s != 0;

      ) {
        let o = s < 0 ? i.lastChild : i.childNodes[s - 1];
        if (!o) break;
        if (o.nodeType == 3) {
          let l = n.domSelection();
          l && l.collapse(o, o.nodeValue.length);
          break;
        } else (i = o), (s = -1);
      }
    }
    n.input.composing = !0;
  }
  Ih(n, k1);
};
we.compositionend = (n, e) => {
  n.composing &&
    ((n.input.composing = !1),
    (n.input.compositionEndedAt = e.timeStamp),
    (n.input.compositionPendingChanges = n.domObserver.pendingRecords().length
      ? n.input.compositionID
      : 0),
    (n.input.compositionNode = null),
    n.input.compositionPendingChanges &&
      Promise.resolve().then(() => n.domObserver.flush()),
    n.input.compositionID++,
    Ih(n, 20));
};
function Ih(n, e) {
  clearTimeout(n.input.composingTimeout),
    e > -1 && (n.input.composingTimeout = setTimeout(() => _i(n), e));
}
function Eh(n) {
  for (
    n.composing &&
    ((n.input.composing = !1), (n.input.compositionEndedAt = b1()));
    n.input.compositionNodes.length > 0;

  )
    n.input.compositionNodes.pop().markParentsDirty();
}
function x1(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode) return null;
  let t = hk(e.focusNode, e.focusOffset),
    r = fk(e.focusNode, e.focusOffset);
  if (t && r && t != r) {
    let i = r.pmViewDesc,
      s = n.domObserver.lastChangedTextNode;
    if (t == s || r == s) return s;
    if (!i || !i.isText(r.nodeValue)) return r;
    if (n.input.compositionNode == r) {
      let o = t.pmViewDesc;
      if (!(!o || !o.isText(t.nodeValue))) return r;
    }
  }
  return t || r;
}
function b1() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function _i(n, e = !1) {
  if (!(gt && n.domObserver.flushingSoon >= 0)) {
    if (
      (n.domObserver.forceFlush(), Eh(n), e || (n.docView && n.docView.dirty))
    ) {
      let t = Yo(n);
      return (
        t && !t.eq(n.state.selection)
          ? n.dispatch(n.state.tr.setSelection(t))
          : (n.markCursor || e) && !n.state.selection.empty
            ? n.dispatch(n.state.tr.deleteSelection())
            : n.updateState(n.state),
        !0
      );
    }
    return !1;
  }
}
function S1(n, e) {
  if (!n.dom.parentNode) return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e),
    (t.style.cssText = "position: fixed; left: -10000px; top: 10px");
  let r = getSelection(),
    i = document.createRange();
  i.selectNodeContents(e),
    n.dom.blur(),
    r.removeAllRanges(),
    r.addRange(i),
    setTimeout(() => {
      t.parentNode && t.parentNode.removeChild(t), n.focus();
    }, 50);
}
const Wr = (Ne && vt < 15) || (Jn && yk < 604);
Se.copy = we.cut = (n, e) => {
  let t = e,
    r = n.state.selection,
    i = t.type == "cut";
  if (r.empty) return;
  let s = Wr ? null : t.clipboardData,
    o = r.content(),
    { dom: l, text: a } = xh(n, o);
  s
    ? (t.preventDefault(),
      s.clearData(),
      s.setData("text/html", l.innerHTML),
      s.setData("text/plain", a))
    : S1(n, l),
    i &&
      n.dispatch(
        n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"),
      );
};
function w1(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1
    ? n.content.firstChild
    : null;
}
function C1(n, e) {
  if (!n.dom.parentNode) return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code,
    r = n.dom.parentNode.appendChild(
      document.createElement(t ? "textarea" : "div"),
    );
  t || (r.contentEditable = "true"),
    (r.style.cssText = "position: fixed; left: -10000px; top: 10px"),
    r.focus();
  let i = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(),
      r.parentNode && r.parentNode.removeChild(r),
      t ? qr(n, r.value, null, i, e) : qr(n, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function qr(n, e, t, r, i) {
  let s = bh(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (a) => a(n, i, s || T.empty))) return !0;
  if (!s) return !1;
  let o = w1(s),
    l = o
      ? n.state.tr.replaceSelectionWith(o, r)
      : n.state.tr.replaceSelection(s);
  return (
    n.dispatch(
      l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste"),
    ),
    !0
  );
}
function Ah(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e) return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
we.paste = (n, e) => {
  let t = e;
  if (n.composing && !gt) return;
  let r = Wr ? null : t.clipboardData,
    i = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && qr(n, Ah(r), r.getData("text/html"), i, t)
    ? t.preventDefault()
    : C1(n, t);
};
class Dh {
  constructor(e, t, r) {
    (this.slice = e), (this.move = t), (this.node = r);
  }
}
const Rh = Pe ? "altKey" : "ctrlKey";
Se.dragstart = (n, e) => {
  let t = e,
    r = n.input.mouseDown;
  if ((r && r.done(), !t.dataTransfer)) return;
  let i = n.state.selection,
    s = i.empty ? null : n.posAtCoords(is(t)),
    o;
  if (!(s && s.pos >= i.from && s.pos <= (i instanceof P ? i.to - 1 : i.to))) {
    if (r && r.mightDrag) o = P.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let h = n.docView.nearestDesc(t.target, !0);
      h &&
        h.node.type.spec.draggable &&
        h != n.docView &&
        (o = P.create(n.state.doc, h.posBefore));
    }
  }
  let l = (o || n.state.selection).content(),
    { dom: a, text: c, slice: u } = xh(n, l);
  (!t.dataTransfer.files.length || !ye || rh > 120) &&
    t.dataTransfer.clearData(),
    t.dataTransfer.setData(Wr ? "Text" : "text/html", a.innerHTML),
    (t.dataTransfer.effectAllowed = "copyMove"),
    Wr || t.dataTransfer.setData("text/plain", c),
    (n.dragging = new Dh(u, !t[Rh], o));
};
Se.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
we.dragover = we.dragenter = (n, e) => e.preventDefault();
we.drop = (n, e) => {
  let t = e,
    r = n.dragging;
  if (((n.dragging = null), !t.dataTransfer)) return;
  let i = n.posAtCoords(is(t));
  if (!i) return;
  let s = n.state.doc.resolve(i.pos),
    o = r && r.slice;
  o
    ? n.someProp("transformPasted", (p) => {
        o = p(o, n);
      })
    : (o = bh(
        n,
        Ah(t.dataTransfer),
        Wr ? null : t.dataTransfer.getData("text/html"),
        !1,
        s,
      ));
  let l = !!(r && !t[Rh]);
  if (n.someProp("handleDrop", (p) => p(n, t, o || T.empty, l))) {
    t.preventDefault();
    return;
  }
  if (!o) return;
  t.preventDefault();
  let a = o ? yy(n.state.doc, s.pos, o) : s.pos;
  a == null && (a = s.pos);
  let c = n.state.tr;
  if (l) {
    let { node: p } = r;
    p ? p.replace(c) : c.deleteSelection();
  }
  let u = c.mapping.map(a),
    h = o.openStart == 0 && o.openEnd == 0 && o.content.childCount == 1,
    d = c.doc;
  if (
    (h
      ? c.replaceRangeWith(u, u, o.content.firstChild)
      : c.replaceRange(u, u, o),
    c.doc.eq(d))
  )
    return;
  let f = c.doc.resolve(u);
  if (
    h &&
    P.isSelectable(o.content.firstChild) &&
    f.nodeAfter &&
    f.nodeAfter.sameMarkup(o.content.firstChild)
  )
    c.setSelection(new P(f));
  else {
    let p = c.mapping.map(a);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((y, x, k, E) => (p = E)),
      c.setSelection(Go(n, f, c.doc.resolve(p)));
  }
  n.focus(), n.dispatch(c.setMeta("uiEvent", "drop"));
};
Se.focus = (n) => {
  (n.input.lastFocus = Date.now()),
    n.focused ||
      (n.domObserver.stop(),
      n.dom.classList.add("ProseMirror-focused"),
      n.domObserver.start(),
      (n.focused = !0),
      setTimeout(() => {
        n.docView &&
          n.hasFocus() &&
          !n.domObserver.currentSelection.eq(n.domSelectionRange()) &&
          yt(n);
      }, 20));
};
Se.blur = (n, e) => {
  let t = e;
  n.focused &&
    (n.domObserver.stop(),
    n.dom.classList.remove("ProseMirror-focused"),
    n.domObserver.start(),
    t.relatedTarget &&
      n.dom.contains(t.relatedTarget) &&
      n.domObserver.currentSelection.clear(),
    (n.focused = !1));
};
Se.beforeinput = (n, e) => {
  if (ye && gt && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (
        n.input.domChangeCount != r ||
        (n.dom.blur(),
        n.focus(),
        n.someProp("handleKeyDown", (s) => s(n, rn(8, "Backspace"))))
      )
        return;
      let { $cursor: i } = n.state.selection;
      i &&
        i.pos > 0 &&
        n.dispatch(n.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in we) Se[n] = we[n];
function Hr(n, e) {
  if (n == e) return !0;
  for (let t in n) if (n[t] !== e[t]) return !1;
  for (let t in e) if (!(t in n)) return !1;
  return !0;
}
class ji {
  constructor(e, t) {
    (this.toDOM = e), (this.spec = t || cn), (this.side = this.spec.side || 0);
  }
  map(e, t, r, i) {
    let { pos: s, deleted: o } = e.mapResult(
      t.from + i,
      this.side < 0 ? -1 : 1,
    );
    return o ? null : new Ae(s - r, s - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return (
      this == e ||
      (e instanceof ji &&
        ((this.spec.key && this.spec.key == e.spec.key) ||
          (this.toDOM == e.toDOM && Hr(this.spec, e.spec))))
    );
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class Lt {
  constructor(e, t) {
    (this.attrs = e), (this.spec = t || cn);
  }
  map(e, t, r, i) {
    let s = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - r,
      o = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return s >= o ? null : new Ae(s, o, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return (
      this == e ||
      (e instanceof Lt && Hr(this.attrs, e.attrs) && Hr(this.spec, e.spec))
    );
  }
  static is(e) {
    return e.type instanceof Lt;
  }
  destroy() {}
}
class el {
  constructor(e, t) {
    (this.attrs = e), (this.spec = t || cn);
  }
  map(e, t, r, i) {
    let s = e.mapResult(t.from + i, 1);
    if (s.deleted) return null;
    let o = e.mapResult(t.to + i, -1);
    return o.deleted || o.pos <= s.pos
      ? null
      : new Ae(s.pos - r, o.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: i } = e.content.findIndex(t.from),
      s;
    return i == t.from && !(s = e.child(r)).isText && i + s.nodeSize == t.to;
  }
  eq(e) {
    return (
      this == e ||
      (e instanceof el && Hr(this.attrs, e.attrs) && Hr(this.spec, e.spec))
    );
  }
  destroy() {}
}
class Ae {
  constructor(e, t, r) {
    (this.from = e), (this.to = t), (this.type = r);
  }
  copy(e, t) {
    return new Ae(e, t, this.type);
  }
  eq(e, t = 0) {
    return (
      this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to
    );
  }
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  static widget(e, t, r) {
    return new Ae(e, e, new ji(t, r));
  }
  static inline(e, t, r, i) {
    return new Ae(e, t, new Lt(r, i));
  }
  static node(e, t, r, i) {
    return new Ae(e, t, new el(r, i));
  }
  get spec() {
    return this.type.spec;
  }
  get inline() {
    return this.type instanceof Lt;
  }
  get widget() {
    return this.type instanceof ji;
  }
}
const En = [],
  cn = {};
class oe {
  constructor(e, t) {
    (this.local = e.length ? e : En), (this.children = t.length ? t : En);
  }
  static create(e, t) {
    return t.length ? Ki(t, e, 0, cn) : ge;
  }
  find(e, t, r) {
    let i = [];
    return this.findInner(e ?? 0, t ?? 1e9, i, 0, r), i;
  }
  findInner(e, t, r, i, s) {
    for (let o = 0; o < this.local.length; o++) {
      let l = this.local[o];
      l.from <= t &&
        l.to >= e &&
        (!s || s(l.spec)) &&
        r.push(l.copy(l.from + i, l.to + i));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < t && this.children[o + 1] > e) {
        let l = this.children[o] + 1;
        this.children[o + 2].findInner(e - l, t - l, r, i + l, s);
      }
  }
  map(e, t, r) {
    return this == ge || e.maps.length == 0
      ? this
      : this.mapInner(e, t, 0, 0, r || cn);
  }
  mapInner(e, t, r, i, s) {
    let o;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(t, a)
        ? (o || (o = [])).push(a)
        : s.onRemove && s.onRemove(this.local[l].spec);
    }
    return this.children.length
      ? M1(this.children, o || [], e, t, r, i, s)
      : o
        ? new oe(o.sort(un), En)
        : ge;
  }
  add(e, t) {
    return t.length
      ? this == ge
        ? oe.create(e, t)
        : this.addInner(e, t, 0)
      : this;
  }
  addInner(e, t, r) {
    let i,
      s = 0;
    e.forEach((l, a) => {
      let c = a + r,
        u;
      if ((u = Ph(t, l, c))) {
        for (i || (i = this.children.slice()); s < i.length && i[s] < a; )
          s += 3;
        i[s] == a
          ? (i[s + 2] = i[s + 2].addInner(l, u, c + 1))
          : i.splice(s, 0, a, a + l.nodeSize, Ki(u, l, c + 1, cn)),
          (s += 3);
      }
    });
    let o = zh(s ? Bh(t) : t, -r);
    for (let l = 0; l < o.length; l++)
      o[l].type.valid(e, o[l]) || o.splice(l--, 1);
    return new oe(
      o.length ? this.local.concat(o).sort(un) : this.local,
      i || this.children,
    );
  }
  remove(e) {
    return e.length == 0 || this == ge ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children,
      i = this.local;
    for (let s = 0; s < r.length; s += 3) {
      let o,
        l = r[s] + t,
        a = r[s + 1] + t;
      for (let u = 0, h; u < e.length; u++)
        (h = e[u]) &&
          h.from > l &&
          h.to < a &&
          ((e[u] = null), (o || (o = [])).push(h));
      if (!o) continue;
      r == this.children && (r = this.children.slice());
      let c = r[s + 2].removeInner(o, l + 1);
      c != ge ? (r[s + 2] = c) : (r.splice(s, 3), (s -= 3));
    }
    if (i.length) {
      for (let s = 0, o; s < e.length; s++)
        if ((o = e[s]))
          for (let l = 0; l < i.length; l++)
            i[l].eq(o, t) &&
              (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local
      ? this
      : i.length || r.length
        ? new oe(i, r)
        : ge;
  }
  forChild(e, t) {
    if (this == ge) return this;
    if (t.isLeaf) return oe.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let s = e + 1,
      o = s + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < o && a.to > s && a.type instanceof Lt) {
        let c = Math.max(s, a.from) - s,
          u = Math.min(o, a.to) - s;
        c < u && (i || (i = [])).push(a.copy(c, u));
      }
    }
    if (i) {
      let l = new oe(i.sort(un), En);
      return r ? new Rt([l, r]) : l;
    }
    return r || ge;
  }
  eq(e) {
    if (this == e) return !0;
    if (
      !(e instanceof oe) ||
      this.local.length != e.local.length ||
      this.children.length != e.children.length
    )
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t])) return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (
        this.children[t] != e.children[t] ||
        this.children[t + 1] != e.children[t + 1] ||
        !this.children[t + 2].eq(e.children[t + 2])
      )
        return !1;
    return !0;
  }
  locals(e) {
    return tl(this.localsInner(e));
  }
  localsInner(e) {
    if (this == ge) return En;
    if (e.inlineContent || !this.local.some(Lt.is)) return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof Lt || t.push(this.local[r]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
oe.empty = new oe([], []);
oe.removeOverlap = tl;
const ge = oe.empty;
class Rt {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((i) => i.map(e, t, cn));
    return Rt.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf) return oe.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].forChild(e, t);
      s != ge && (s instanceof Rt ? (r = r.concat(s.members)) : r.push(s));
    }
    return Rt.from(r);
  }
  eq(e) {
    if (!(e instanceof Rt) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t])) return !1;
    return !0;
  }
  locals(e) {
    let t,
      r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].localsInner(e);
      if (s.length)
        if (!t) t = s;
        else {
          r && ((t = t.slice()), (r = !1));
          for (let o = 0; o < s.length; o++) t.push(s[o]);
        }
    }
    return t ? tl(r ? t : t.sort(un)) : En;
  }
  static from(e) {
    switch (e.length) {
      case 0:
        return ge;
      case 1:
        return e[0];
      default:
        return new Rt(
          e.every((t) => t instanceof oe)
            ? e
            : e.reduce((t, r) => t.concat(r instanceof oe ? r : r.members), []),
        );
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++) this.members[t].forEachSet(e);
  }
}
function M1(n, e, t, r, i, s, o) {
  let l = n.slice();
  for (let c = 0, u = s; c < t.maps.length; c++) {
    let h = 0;
    t.maps[c].forEach((d, f, p, y) => {
      let x = y - p - (f - d);
      for (let k = 0; k < l.length; k += 3) {
        let E = l[k + 1];
        if (E < 0 || d > E + u - h) continue;
        let N = l[k] + u - h;
        f >= N
          ? (l[k + 1] = d <= N ? -2 : -1)
          : d >= u && x && ((l[k] += x), (l[k + 1] += x));
      }
      h += x;
    }),
      (u = t.maps[c].map(u, -1));
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        (a = !0), (l[c + 1] = -1);
        continue;
      }
      let u = t.map(n[c] + s),
        h = u - i;
      if (h < 0 || h >= r.content.size) {
        a = !0;
        continue;
      }
      let d = t.map(n[c + 1] + s, -1),
        f = d - i,
        { index: p, offset: y } = r.content.findIndex(h),
        x = r.maybeChild(p);
      if (x && y == h && y + x.nodeSize == f) {
        let k = l[c + 2].mapInner(t, x, u + 1, n[c] + s + 1, o);
        k != ge
          ? ((l[c] = h), (l[c + 1] = f), (l[c + 2] = k))
          : ((l[c + 1] = -2), (a = !0));
      } else a = !0;
    }
  if (a) {
    let c = N1(l, n, e, t, i, s, o),
      u = Ki(c, r, 0, o);
    e = u.local;
    for (let h = 0; h < l.length; h += 3)
      l[h + 1] < 0 && (l.splice(h, 3), (h -= 3));
    for (let h = 0, d = 0; h < u.children.length; h += 3) {
      let f = u.children[h];
      for (; d < l.length && l[d] < f; ) d += 3;
      l.splice(d, 0, u.children[h], u.children[h + 1], u.children[h + 2]);
    }
  }
  return new oe(e.sort(un), l);
}
function zh(n, e) {
  if (!e || !n.length) return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    t.push(new Ae(i.from + e, i.to + e, i.type));
  }
  return t;
}
function N1(n, e, t, r, i, s, o) {
  function l(a, c) {
    for (let u = 0; u < a.local.length; u++) {
      let h = a.local[u].map(r, i, c);
      h ? t.push(h) : o.onRemove && o.onRemove(a.local[u].spec);
    }
    for (let u = 0; u < a.children.length; u += 3)
      l(a.children[u + 2], a.children[u] + c + 1);
  }
  for (let a = 0; a < n.length; a += 3)
    n[a + 1] == -1 && l(n[a + 2], e[a] + s + 1);
  return t;
}
function Ph(n, e, t) {
  if (e.isLeaf) return null;
  let r = t + e.nodeSize,
    i = null;
  for (let s = 0, o; s < n.length; s++)
    (o = n[s]) &&
      o.from > t &&
      o.to < r &&
      ((i || (i = [])).push(o), (n[s] = null));
  return i;
}
function Bh(n) {
  let e = [];
  for (let t = 0; t < n.length; t++) n[t] != null && e.push(n[t]);
  return e;
}
function Ki(n, e, t, r) {
  let i = [],
    s = !1;
  e.forEach((l, a) => {
    let c = Ph(n, l, a + t);
    if (c) {
      s = !0;
      let u = Ki(c, l, t + a + 1, r);
      u != ge && i.push(a, a + l.nodeSize, u);
    }
  });
  let o = zh(s ? Bh(n) : n, -t).sort(un);
  for (let l = 0; l < o.length; l++)
    o[l].type.valid(e, o[l]) ||
      (r.onRemove && r.onRemove(o[l].spec), o.splice(l--, 1));
  return o.length || i.length ? new oe(o, i) : ge;
}
function un(n, e) {
  return n.from - e.from || n.to - e.to;
}
function tl(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let i = t + 1; i < e.length; i++) {
        let s = e[i];
        if (s.from == r.from) {
          s.to != r.to &&
            (e == n && (e = n.slice()),
            (e[i] = s.copy(s.from, r.to)),
            gc(e, i + 1, s.copy(r.to, s.to)));
          continue;
        } else {
          s.from < r.to &&
            (e == n && (e = n.slice()),
            (e[t] = r.copy(r.from, s.from)),
            gc(e, i, r.copy(s.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function gc(n, e, t) {
  for (; e < n.length && un(t, n[e]) > 0; ) e++;
  n.splice(e, 0, t);
}
function Ps(n) {
  let e = [];
  return (
    n.someProp("decorations", (t) => {
      let r = t(n.state);
      r && r != ge && e.push(r);
    }),
    n.cursorWrapper && e.push(oe.create(n.state.doc, [n.cursorWrapper.deco])),
    Rt.from(e)
  );
}
const T1 = {
    childList: !0,
    characterData: !0,
    characterDataOldValue: !0,
    attributes: !0,
    attributeOldValue: !0,
    subtree: !0,
  },
  O1 = Ne && vt <= 11;
class I1 {
  constructor() {
    (this.anchorNode = null),
      (this.anchorOffset = 0),
      (this.focusNode = null),
      (this.focusOffset = 0);
  }
  set(e) {
    (this.anchorNode = e.anchorNode),
      (this.anchorOffset = e.anchorOffset),
      (this.focusNode = e.focusNode),
      (this.focusOffset = e.focusOffset);
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return (
      e.anchorNode == this.anchorNode &&
      e.anchorOffset == this.anchorOffset &&
      e.focusNode == this.focusNode &&
      e.focusOffset == this.focusOffset
    );
  }
}
class E1 {
  constructor(e, t) {
    (this.view = e),
      (this.handleDOMChange = t),
      (this.queue = []),
      (this.flushingSoon = -1),
      (this.observer = null),
      (this.currentSelection = new I1()),
      (this.onCharData = null),
      (this.suppressingSelectionUpdates = !1),
      (this.lastChangedTextNode = null),
      (this.observer =
        window.MutationObserver &&
        new window.MutationObserver((r) => {
          for (let i = 0; i < r.length; i++) this.queue.push(r[i]);
          Ne &&
          vt <= 11 &&
          r.some(
            (i) =>
              (i.type == "childList" && i.removedNodes.length) ||
              (i.type == "characterData" &&
                i.oldValue.length > i.target.nodeValue.length),
          )
            ? this.flushSoon()
            : this.flush();
        })),
      O1 &&
        (this.onCharData = (r) => {
          this.queue.push({
            target: r.target,
            type: "characterData",
            oldValue: r.prevValue,
          }),
            this.flushSoon();
        }),
      (this.onSelectionChange = this.onSelectionChange.bind(this));
  }
  flushSoon() {
    this.flushingSoon < 0 &&
      (this.flushingSoon = window.setTimeout(() => {
        (this.flushingSoon = -1), this.flush();
      }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 &&
      (window.clearTimeout(this.flushingSoon),
      (this.flushingSoon = -1),
      this.flush());
  }
  start() {
    this.observer &&
      (this.observer.takeRecords(), this.observer.observe(this.view.dom, T1)),
      this.onCharData &&
        this.view.dom.addEventListener(
          "DOMCharacterDataModified",
          this.onCharData,
        ),
      this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++) this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData &&
      this.view.dom.removeEventListener(
        "DOMCharacterDataModified",
        this.onCharData,
      ),
      this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener(
      "selectionchange",
      this.onSelectionChange,
    );
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener(
      "selectionchange",
      this.onSelectionChange,
    );
  }
  suppressSelectionUpdates() {
    (this.suppressingSelectionUpdates = !0),
      setTimeout(() => (this.suppressingSelectionUpdates = !1), 50);
  }
  onSelectionChange() {
    if (ac(this.view)) {
      if (this.suppressingSelectionUpdates) return yt(this.view);
      if (Ne && vt <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (
          e.focusNode &&
          pn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)
        )
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode) return !0;
    let t = new Set(),
      r;
    for (let s = e.focusNode; s; s = Vr(s)) t.add(s);
    for (let s = e.anchorNode; s; s = Vr(s))
      if (t.has(s)) {
        r = s;
        break;
      }
    let i = r && this.view.docView.nearestDesc(r);
    if (
      i &&
      i.ignoreMutation({
        type: "selection",
        target: r.nodeType == 3 ? r.parentNode : r,
      })
    )
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords()) this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1) return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(),
      i =
        !this.suppressingSelectionUpdates &&
        !this.currentSelection.eq(r) &&
        ac(e) &&
        !this.ignoreSelectionChange(r),
      s = -1,
      o = -1,
      l = !1,
      a = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let h = this.registerMutation(t[u], a);
        h &&
          ((s = s < 0 ? h.from : Math.min(h.from, s)),
          (o = o < 0 ? h.to : Math.max(h.to, o)),
          h.typeOver && (l = !0));
      }
    if (Ke && a.length) {
      let u = a.filter((h) => h.nodeName == "BR");
      if (u.length == 2) {
        let [h, d] = u;
        h.parentNode && h.parentNode.parentNode == d.parentNode
          ? d.remove()
          : h.remove();
      } else {
        let { focusNode: h } = this.currentSelection;
        for (let d of u) {
          let f = d.parentNode;
          f && f.nodeName == "LI" && (!h || R1(e, h) != f) && d.remove();
        }
      }
    }
    let c = null;
    s < 0 &&
    i &&
    e.input.lastFocus > Date.now() - 200 &&
    Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 &&
    ns(r) &&
    (c = Yo(e)) &&
    c.eq(H.near(e.state.doc.resolve(0), 1))
      ? ((e.input.lastFocus = 0),
        yt(e),
        this.currentSelection.set(r),
        e.scrollToSelection())
      : (s > -1 || i) &&
        (s > -1 && (e.docView.markDirty(s, o), A1(e)),
        this.handleDOMChange(s, o, l, a),
        e.docView && e.docView.dirty
          ? e.updateState(e.state)
          : this.currentSelection.eq(r) || yt(e),
        this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1) return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (
      (e.type == "attributes" &&
        (r == this.view.docView ||
          e.attributeName == "contenteditable" ||
          (e.attributeName == "style" &&
            !e.oldValue &&
            !e.target.getAttribute("style")))) ||
      !r ||
      r.ignoreMutation(e)
    )
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++) {
        let h = e.addedNodes[u];
        t.push(h), h.nodeType == 3 && (this.lastChangedTextNode = h);
      }
      if (
        r.contentDOM &&
        r.contentDOM != r.dom &&
        !r.contentDOM.contains(e.target)
      )
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling,
        s = e.nextSibling;
      if (Ne && vt <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: h, nextSibling: d } = e.addedNodes[u];
          (!h || Array.prototype.indexOf.call(e.addedNodes, h) < 0) && (i = h),
            (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) &&
              (s = d);
        }
      let o = i && i.parentNode == e.target ? pe(i) + 1 : 0,
        l = r.localPosFromDOM(e.target, o, -1),
        a = s && s.parentNode == e.target ? pe(s) : e.target.childNodes.length,
        c = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: c };
    } else
      return e.type == "attributes"
        ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border }
        : ((this.lastChangedTextNode = e.target),
          {
            from: r.posAtStart,
            to: r.posAtEnd,
            typeOver: e.target.nodeValue == e.oldValue,
          });
  }
}
let yc = new WeakMap(),
  kc = !1;
function A1(n) {
  if (
    !yc.has(n) &&
    (yc.set(n, null),
    ["normal", "nowrap", "pre-line"].indexOf(
      getComputedStyle(n.dom).whiteSpace,
    ) !== -1)
  ) {
    if (((n.requiresGeckoHackNode = Ke), kc)) return;
    console.warn(
      "ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package.",
    ),
      (kc = !0);
  }
}
function xc(n, e) {
  let t = e.startContainer,
    r = e.startOffset,
    i = e.endContainer,
    s = e.endOffset,
    o = n.domAtPos(n.state.selection.anchor);
  return (
    pn(o.node, o.offset, i, s) && ([t, r, i, s] = [i, s, t, r]),
    { anchorNode: t, anchorOffset: r, focusNode: i, focusOffset: s }
  );
}
function D1(n, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(n.root)[0];
    if (i) return xc(n, i);
  }
  let t;
  function r(i) {
    i.preventDefault(),
      i.stopImmediatePropagation(),
      (t = i.getTargetRanges()[0]);
  }
  return (
    n.dom.addEventListener("beforeinput", r, !0),
    document.execCommand("indent"),
    n.dom.removeEventListener("beforeinput", r, !0),
    t ? xc(n, t) : null
  );
}
function R1(n, e) {
  for (let t = e.parentNode; t && t != n.dom; t = t.parentNode) {
    let r = n.docView.nearestDesc(t, !0);
    if (r && r.node.isBlock) return t;
  }
  return null;
}
function z1(n, e, t) {
  let {
      node: r,
      fromOffset: i,
      toOffset: s,
      from: o,
      to: l,
    } = n.docView.parseRange(e, t),
    a = n.domSelectionRange(),
    c,
    u = a.anchorNode;
  if (
    (u &&
      n.dom.contains(u.nodeType == 1 ? u : u.parentNode) &&
      ((c = [{ node: u, offset: a.anchorOffset }]),
      ns(a) || c.push({ node: a.focusNode, offset: a.focusOffset })),
    ye && n.input.lastKeyCode === 8)
  )
    for (let x = s; x > i; x--) {
      let k = r.childNodes[x - 1],
        E = k.pmViewDesc;
      if (k.nodeName == "BR" && !E) {
        s = x;
        break;
      }
      if (!E || E.size) break;
    }
  let h = n.state.doc,
    d = n.someProp("domParser") || Hn.fromSchema(n.state.schema),
    f = h.resolve(o),
    p = null,
    y = d.parse(r, {
      topNode: f.parent,
      topMatch: f.parent.contentMatchAt(f.index()),
      topOpen: !0,
      from: i,
      to: s,
      preserveWhitespace: f.parent.type.whitespace == "pre" ? "full" : !0,
      findPositions: c,
      ruleFromNode: P1,
      context: f,
    });
  if (c && c[0].pos != null) {
    let x = c[0].pos,
      k = c[1] && c[1].pos;
    k == null && (k = x), (p = { anchor: x + o, head: k + o });
  }
  return { doc: y, sel: p, from: o, to: l };
}
function P1(n) {
  let e = n.pmViewDesc;
  if (e) return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (be && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (
      n.parentNode.lastChild == n ||
      (be && /^(tr|table)$/i.test(n.parentNode.nodeName))
    )
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const B1 =
  /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function v1(n, e, t, r, i) {
  let s =
    n.input.compositionPendingChanges ||
    (n.composing ? n.input.compositionID : 0);
  if (((n.input.compositionPendingChanges = 0), e < 0)) {
    let O =
        n.input.lastSelectionTime > Date.now() - 50
          ? n.input.lastSelectionOrigin
          : null,
      V = Yo(n, O);
    if (V && !n.state.selection.eq(V)) {
      if (
        ye &&
        gt &&
        n.input.lastKeyCode === 13 &&
        Date.now() - 100 < n.input.lastKeyCodeTime &&
        n.someProp("handleKeyDown", (D) => D(n, rn(13, "Enter")))
      )
        return;
      let A = n.state.tr.setSelection(V);
      O == "pointer"
        ? A.setMeta("pointer", !0)
        : O == "key" && A.scrollIntoView(),
        s && A.setMeta("composition", s),
        n.dispatch(A);
    }
    return;
  }
  let o = n.state.doc.resolve(e),
    l = o.sharedDepth(t);
  (e = o.before(l + 1)), (t = n.state.doc.resolve(t).after(l + 1));
  let a = n.state.selection,
    c = z1(n, e, t),
    u = n.state.doc,
    h = u.slice(c.from, c.to),
    d,
    f;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime
    ? ((d = n.state.selection.to), (f = "end"))
    : ((d = n.state.selection.from), (f = "start")),
    (n.input.lastKeyCode = null);
  let p = $1(h.content, c.doc.content, c.from, d, f);
  if (
    (p && n.input.domChangeCount++,
    ((Jn && n.input.lastIOSEnter > Date.now() - 225) || gt) &&
      i.some((O) => O.nodeType == 1 && !B1.test(O.nodeName)) &&
      (!p || p.endA >= p.endB) &&
      n.someProp("handleKeyDown", (O) => O(n, rn(13, "Enter"))))
  ) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (
      r &&
      a instanceof J &&
      !a.empty &&
      a.$head.sameParent(a.$anchor) &&
      !n.composing &&
      !(c.sel && c.sel.anchor != c.sel.head)
    )
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let O = bc(n, n.state.doc, c.sel);
        if (O && !O.eq(n.state.selection)) {
          let V = n.state.tr.setSelection(O);
          s && V.setMeta("composition", s), n.dispatch(V);
        }
      }
      return;
    }
  n.state.selection.from < n.state.selection.to &&
    p.start == p.endB &&
    n.state.selection instanceof J &&
    (p.start > n.state.selection.from &&
    p.start <= n.state.selection.from + 2 &&
    n.state.selection.from >= c.from
      ? (p.start = n.state.selection.from)
      : p.endA < n.state.selection.to &&
        p.endA >= n.state.selection.to - 2 &&
        n.state.selection.to <= c.to &&
        ((p.endB += n.state.selection.to - p.endA),
        (p.endA = n.state.selection.to))),
    Ne &&
      vt <= 11 &&
      p.endB == p.start + 1 &&
      p.endA == p.start &&
      p.start > c.from &&
      c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " &&
      (p.start--, p.endA--, p.endB--);
  let y = c.doc.resolveNoCache(p.start - c.from),
    x = c.doc.resolveNoCache(p.endB - c.from),
    k = u.resolve(p.start),
    E = y.sameParent(x) && y.parent.inlineContent && k.end() >= p.endA,
    N;
  if (
    ((Jn &&
      n.input.lastIOSEnter > Date.now() - 225 &&
      (!E || i.some((O) => O.nodeName == "DIV" || O.nodeName == "P"))) ||
      (!E &&
        y.pos < c.doc.content.size &&
        !y.sameParent(x) &&
        (N = H.findFrom(c.doc.resolve(y.pos + 1), 1, !0)) &&
        N.head == x.pos)) &&
    n.someProp("handleKeyDown", (O) => O(n, rn(13, "Enter")))
  ) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (
    n.state.selection.anchor > p.start &&
    L1(u, p.start, p.endA, y, x) &&
    n.someProp("handleKeyDown", (O) => O(n, rn(8, "Backspace")))
  ) {
    gt && ye && n.domObserver.suppressSelectionUpdates();
    return;
  }
  ye && p.endB == p.start && (n.input.lastChromeDelete = Date.now()),
    gt &&
      !E &&
      y.start() != x.start() &&
      x.parentOffset == 0 &&
      y.depth == x.depth &&
      c.sel &&
      c.sel.anchor == c.sel.head &&
      c.sel.head == p.endA &&
      ((p.endB -= 2),
      (x = c.doc.resolveNoCache(p.endB - c.from)),
      setTimeout(() => {
        n.someProp("handleKeyDown", function (O) {
          return O(n, rn(13, "Enter"));
        });
      }, 20));
  let F = p.start,
    $ = p.endA,
    w,
    _,
    Q;
  if (E) {
    if (y.pos == x.pos)
      Ne &&
        vt <= 11 &&
        y.parentOffset == 0 &&
        (n.domObserver.suppressSelectionUpdates(), setTimeout(() => yt(n), 20)),
        (w = n.state.tr.delete(F, $)),
        (_ = u.resolve(p.start).marksAcross(u.resolve(p.endA)));
    else if (
      p.endA == p.endB &&
      (Q = F1(
        y.parent.content.cut(y.parentOffset, x.parentOffset),
        k.parent.content.cut(k.parentOffset, p.endA - k.start()),
      ))
    )
      (w = n.state.tr),
        Q.type == "add" ? w.addMark(F, $, Q.mark) : w.removeMark(F, $, Q.mark);
    else if (
      y.parent.child(y.index()).isText &&
      y.index() == x.index() - (x.textOffset ? 0 : 1)
    ) {
      let O = y.parent.textBetween(y.parentOffset, x.parentOffset);
      if (n.someProp("handleTextInput", (V) => V(n, F, $, O))) return;
      w = n.state.tr.insertText(O, F, $);
    }
  }
  if (
    (w ||
      (w = n.state.tr.replace(
        F,
        $,
        c.doc.slice(p.start - c.from, p.endB - c.from),
      )),
    c.sel)
  ) {
    let O = bc(n, w.doc, c.sel);
    O &&
      !(
        (ye &&
          n.composing &&
          O.empty &&
          (p.start != p.endB || n.input.lastChromeDelete < Date.now() - 100) &&
          (O.head == F || O.head == w.mapping.map($) - 1)) ||
        (Ne && O.empty && O.head == F)
      ) &&
      w.setSelection(O);
  }
  _ && w.ensureMarks(_),
    s && w.setMeta("composition", s),
    n.dispatch(w.scrollIntoView());
}
function bc(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size
    ? null
    : Go(n, e.resolve(t.anchor), e.resolve(t.head));
}
function F1(n, e) {
  let t = n.firstChild.marks,
    r = e.firstChild.marks,
    i = t,
    s = r,
    o,
    l,
    a;
  for (let u = 0; u < r.length; u++) i = r[u].removeFromSet(i);
  for (let u = 0; u < t.length; u++) s = t[u].removeFromSet(s);
  if (i.length == 1 && s.length == 0)
    (l = i[0]), (o = "add"), (a = (u) => u.mark(l.addToSet(u.marks)));
  else if (i.length == 0 && s.length == 1)
    (l = s[0]), (o = "remove"), (a = (u) => u.mark(l.removeFromSet(u.marks)));
  else return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++) c.push(a(e.child(u)));
  if (C.from(c).eq(n)) return { mark: l, type: o };
}
function L1(n, e, t, r, i) {
  if (t - e <= i.pos - r.pos || Bs(r, !0, !1) < i.pos) return !1;
  let s = n.resolve(e);
  if (!r.parent.isTextblock) {
    let l = s.nodeAfter;
    return l != null && t == e + l.nodeSize;
  }
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let o = n.resolve(Bs(s, !0, !0));
  return !o.parent.isTextblock || o.pos > t || Bs(o, !0, !1) < t
    ? !1
    : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function Bs(n, e, t) {
  let r = n.depth,
    i = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, i++, (e = !1);
  if (t) {
    let s = n.node(r).maybeChild(n.indexAfter(r));
    for (; s && !s.isLeaf; ) (s = s.firstChild), i++;
  }
  return i;
}
function $1(n, e, t, r, i) {
  let s = n.findDiffStart(e, t);
  if (s == null) return null;
  let { a: o, b: l } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (i == "end") {
    let a = Math.max(0, s - Math.min(o, l));
    r -= o + a - s;
  }
  if (o < s && n.size < e.size) {
    let a = r <= s && r >= o ? s - r : 0;
    (s -= a),
      s && s < e.size && Sc(e.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1),
      (l = s + (l - o)),
      (o = s);
  } else if (l < s) {
    let a = r <= s && r >= l ? s - r : 0;
    (s -= a),
      s && s < n.size && Sc(n.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1),
      (o = s + (o - l)),
      (l = s);
  }
  return { start: s, endA: o, endB: l };
}
function Sc(n) {
  if (n.length != 2) return !1;
  let e = n.charCodeAt(0),
    t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class V1 {
  constructor(e, t) {
    (this._root = null),
      (this.focused = !1),
      (this.trackWrites = null),
      (this.mounted = !1),
      (this.markCursor = null),
      (this.cursorWrapper = null),
      (this.lastSelectedViewDesc = void 0),
      (this.input = new s1()),
      (this.prevDirectPlugins = []),
      (this.pluginViews = []),
      (this.requiresGeckoHackNode = !1),
      (this.dragging = null),
      (this._props = t),
      (this.state = t.state),
      (this.directPlugins = t.plugins || []),
      this.directPlugins.forEach(Tc),
      (this.dispatch = this.dispatch.bind(this)),
      (this.dom = (e && e.mount) || document.createElement("div")),
      e &&
        (e.appendChild
          ? e.appendChild(this.dom)
          : typeof e == "function"
            ? e(this.dom)
            : e.mount && (this.mounted = !0)),
      (this.editable = Mc(this)),
      Cc(this),
      (this.nodeViews = Nc(this)),
      (this.docView = nc(this.state.doc, wc(this), Ps(this), this.dom, this)),
      (this.domObserver = new E1(this, (r, i, s, o) => v1(this, r, i, s, o))),
      this.domObserver.start(),
      o1(this),
      this.updatePluginViews();
  }
  get composing() {
    return this.input.composing;
  }
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e) this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && Mo(this);
    let t = this._props;
    (this._props = e),
      e.plugins && (e.plugins.forEach(Tc), (this.directPlugins = e.plugins)),
      this.updateStateInner(e.state, t);
  }
  setProps(e) {
    let t = {};
    for (let r in this._props) t[r] = this._props[r];
    t.state = this.state;
    for (let r in e) t[r] = e[r];
    this.update(t);
  }
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var r;
    let i = this.state,
      s = !1,
      o = !1;
    e.storedMarks && this.composing && (Eh(this), (o = !0)), (this.state = e);
    let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
    if (
      l ||
      this._props.plugins != t.plugins ||
      this._props.nodeViews != t.nodeViews
    ) {
      let f = Nc(this);
      q1(f, this.nodeViews) && ((this.nodeViews = f), (s = !0));
    }
    (l || t.handleDOMEvents != this._props.handleDOMEvents) && Mo(this),
      (this.editable = Mc(this)),
      Cc(this);
    let a = Ps(this),
      c = wc(this),
      u =
        i.plugins != e.plugins && !i.doc.eq(e.doc)
          ? "reset"
          : e.scrollToSelection > i.scrollToSelection
            ? "to selection"
            : "preserve",
      h = s || !this.docView.matchesNode(e.doc, c, a);
    (h || !e.selection.eq(i.selection)) && (o = !0);
    let d =
      u == "preserve" && o && this.dom.style.overflowAnchor == null && bk(this);
    if (o) {
      this.domObserver.stop();
      let f =
        h &&
        (Ne || ye) &&
        !this.composing &&
        !i.selection.empty &&
        !e.selection.empty &&
        W1(i.selection, e.selection);
      if (h) {
        let p = ye
          ? (this.trackWrites = this.domSelectionRange().focusNode)
          : null;
        this.composing && (this.input.compositionNode = x1(this)),
          (s || !this.docView.update(e.doc, c, a, this)) &&
            (this.docView.updateOuterDeco(c),
            this.docView.destroy(),
            (this.docView = nc(e.doc, c, a, this.dom, this))),
          p && !this.trackWrites && (f = !0);
      }
      f ||
      !(
        this.input.mouseDown &&
        this.domObserver.currentSelection.eq(this.domSelectionRange()) &&
        _k(this)
      )
        ? yt(this, f)
        : (gh(this, e.selection), this.domObserver.setCurSelection()),
        this.domObserver.start();
    }
    this.updatePluginViews(i),
      !((r = this.dragging) === null || r === void 0) &&
        r.node &&
        !i.doc.eq(e.doc) &&
        this.updateDraggedNode(this.dragging, i),
      u == "reset"
        ? (this.dom.scrollTop = 0)
        : u == "to selection"
          ? this.scrollToSelection()
          : d && Sk(d);
  }
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp("handleScrollToSelection", (t) => t(this)))
        if (this.state.selection instanceof P) {
          let t = this.docView.domAfterPos(this.state.selection.from);
          t.nodeType == 1 && Ga(this, t.getBoundingClientRect(), e);
        } else Ga(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
  }
  destroyPluginViews() {
    let e;
    for (; (e = this.pluginViews.pop()); ) e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (
      !e ||
      e.plugins != this.state.plugins ||
      this.directPlugins != this.prevDirectPlugins
    ) {
      (this.prevDirectPlugins = this.directPlugins), this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let r = e.node,
      i = -1;
    if (this.state.doc.nodeAt(r.from) == r.node) i = r.from;
    else {
      let s = r.from + (this.state.doc.content.size - t.doc.content.size);
      (s > 0 && this.state.doc.nodeAt(s)) == r.node && (i = s);
    }
    this.dragging = new Dh(
      e.slice,
      e.move,
      i < 0 ? void 0 : P.create(this.state.doc, i),
    );
  }
  someProp(e, t) {
    let r = this._props && this._props[e],
      i;
    if (r != null && (i = t ? t(r) : r)) return i;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let l = this.directPlugins[o].props[e];
      if (l != null && (i = t ? t(l) : l)) return i;
    }
    let s = this.state.plugins;
    if (s)
      for (let o = 0; o < s.length; o++) {
        let l = s[o].props[e];
        if (l != null && (i = t ? t(l) : l)) return i;
      }
  }
  hasFocus() {
    if (Ne) {
      let e = this.root.activeElement;
      if (e == this.dom) return !0;
      if (!e || !this.dom.contains(e)) return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false") return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  focus() {
    this.domObserver.stop(),
      this.editable && wk(this.dom),
      yt(this),
      this.domObserver.start();
  }
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || (t.nodeType == 11 && t.host))
          return (
            t.getSelection ||
              (Object.getPrototypeOf(t).getSelection = () =>
                t.ownerDocument.getSelection()),
            (this._root = t)
          );
    }
    return e || document;
  }
  updateRoot() {
    this._root = null;
  }
  posAtCoords(e) {
    return Ok(this, e);
  }
  coordsAtPos(e, t = 1) {
    return ah(this, e, t);
  }
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  posAtDOM(e, t, r = -1) {
    let i = this.docView.posFromDOM(e, t, r);
    if (i == null) throw new RangeError("DOM position not inside the editor");
    return i;
  }
  endOfTextblock(e, t) {
    return Rk(this, t || this.state, e);
  }
  pasteHTML(e, t) {
    return qr(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  pasteText(e, t) {
    return qr(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  destroy() {
    this.docView &&
      (l1(this),
      this.destroyPluginViews(),
      this.mounted
        ? (this.docView.update(this.state.doc, [], Ps(this), this),
          (this.dom.textContent = ""))
        : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom),
      this.docView.destroy(),
      (this.docView = null),
      ck());
  }
  get isDestroyed() {
    return this.docView == null;
  }
  dispatchEvent(e) {
    return c1(this, e);
  }
  dispatch(e) {
    let t = this._props.dispatchTransaction;
    t ? t.call(this, e) : this.updateState(this.state.apply(e));
  }
  domSelectionRange() {
    let e = this.domSelection();
    return e
      ? (be &&
          this.root.nodeType === 11 &&
          pk(this.dom.ownerDocument) == this.dom &&
          D1(this, e)) ||
          e
      : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  domSelection() {
    return this.root.getSelection();
  }
}
function wc(n) {
  let e = Object.create(null);
  return (
    (e.class = "ProseMirror"),
    (e.contenteditable = String(n.editable)),
    n.someProp("attributes", (t) => {
      if ((typeof t == "function" && (t = t(n.state)), t))
        for (let r in t)
          r == "class"
            ? (e.class += " " + t[r])
            : r == "style"
              ? (e.style = (e.style ? e.style + ";" : "") + t[r])
              : !e[r] &&
                r != "contenteditable" &&
                r != "nodeName" &&
                (e[r] = String(t[r]));
    }),
    e.translate || (e.translate = "no"),
    [Ae.node(0, n.state.doc.content.size, e)]
  );
}
function Cc(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    (e.className = "ProseMirror-separator"),
      e.setAttribute("mark-placeholder", "true"),
      e.setAttribute("alt", ""),
      (n.cursorWrapper = {
        dom: e,
        deco: Ae.widget(n.state.selection.from, e, {
          raw: !0,
          marks: n.markCursor,
        }),
      });
  } else n.cursorWrapper = null;
}
function Mc(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function W1(n, e) {
  let t = Math.min(
    n.$anchor.sharedDepth(n.head),
    e.$anchor.sharedDepth(e.head),
  );
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function Nc(n) {
  let e = Object.create(null);
  function t(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function q1(n, e) {
  let t = 0,
    r = 0;
  for (let i in n) {
    if (n[i] != e[i]) return !0;
    t++;
  }
  for (let i in e) r++;
  return t != r;
}
function Tc(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError(
      "Plugins passed directly to the view must not have a state component",
    );
}
var vh = (n) => {
    throw TypeError(n);
  },
  Fh = (n, e, t) => e.has(n) || vh("Cannot " + t),
  R = (n, e, t) => (
    Fh(n, e, "read from private field"), t ? t.call(n) : e.get(n)
  ),
  ue = (n, e, t) =>
    e.has(n)
      ? vh("Cannot add the same private member more than once")
      : e instanceof WeakSet
        ? e.add(n)
        : e.set(n, t),
  te = (n, e, t, r) => (Fh(n, e, "write to private field"), e.set(n, t), t);
function Jt(n, e) {
  return (n.meta = { package: "@milkdown/core", group: "System", ...e }), n;
}
const Lh = {
    strong: (n, e, t, r) => {
      const i = n.marker || t.options.strong || "*",
        s = t.enter("strong"),
        o = t.createTracker(r);
      let l = o.move(i + i);
      return (
        (l += o.move(
          t.containerPhrasing(n, { before: l, after: i, ...o.current() }),
        )),
        (l += o.move(i + i)),
        s(),
        l
      );
    },
    emphasis: (n, e, t, r) => {
      const i = n.marker || t.options.emphasis || "*",
        s = t.enter("emphasis"),
        o = t.createTracker(r);
      let l = o.move(i);
      return (
        (l += o.move(
          t.containerPhrasing(n, { before: l, after: i, ...o.current() }),
        )),
        (l += o.move(i)),
        s(),
        l
      );
    },
  },
  zr = U({}, "editorView"),
  wr = U({}, "editorState"),
  vs = U([], "initTimer"),
  Oc = U({}, "editor"),
  _r = U([], "inputRules"),
  kt = U([], "prosePlugins"),
  jr = U([], "remarkPlugins"),
  No = U([], "nodeView"),
  To = U([], "markView"),
  hn = U(oo().use(Xs).use(ro), "remark"),
  Pr = U({ handlers: Lh }, "remarkStringifyOptions"),
  Mi = Ht("ConfigReady");
function H1(n) {
  const e = (t) => (
    t.record(Mi),
    async () => (
      await n(t),
      t.done(Mi),
      () => {
        t.clearTimer(Mi);
      }
    )
  );
  return Jt(e, { displayName: "Config" }), e;
}
const Ln = Ht("InitReady");
function _1(n) {
  const e = (t) => (
    t
      .inject(Oc, n)
      .inject(kt, [])
      .inject(jr, [])
      .inject(_r, [])
      .inject(No, [])
      .inject(To, [])
      .inject(Pr, { handlers: Lh })
      .inject(hn, oo().use(Xs).use(ro))
      .inject(vs, [Mi])
      .record(Ln),
    async () => {
      await t.waitTimers(vs);
      const r = t.get(Pr);
      return (
        t.set(hn, oo().use(Xs).use(ro, r)),
        t.done(Ln),
        () => {
          t.remove(Oc)
            .remove(kt)
            .remove(jr)
            .remove(_r)
            .remove(No)
            .remove(To)
            .remove(Pr)
            .remove(hn)
            .remove(vs)
            .clearTimer(Ln);
        }
      );
    }
  );
  return Jt(e, { displayName: "Init" }), e;
}
const rt = Ht("SchemaReady"),
  Fs = U([], "schemaTimer"),
  $t = U({}, "schema"),
  $n = U([], "nodes"),
  Vn = U([], "marks");
function Ic(n) {
  var e;
  return {
    ...n,
    parseDOM:
      (e = n.parseDOM) == null
        ? void 0
        : e.map((t) => ({ priority: n.priority, ...t })),
  };
}
const $h = (n) => (
  n.inject($t, {}).inject($n, []).inject(Vn, []).inject(Fs, [Ln]).record(rt),
  async () => {
    await n.waitTimers(Fs);
    const e = n.get(hn),
      t = n.get(jr).reduce((o, l) => o.use(l.plugin, l.options), e);
    n.set(hn, t);
    const r = Object.fromEntries(n.get($n).map(([o, l]) => [o, Ic(l)])),
      i = Object.fromEntries(n.get(Vn).map(([o, l]) => [o, Ic(l)])),
      s = new ud({ nodes: r, marks: i });
    return (
      n.set($t, s),
      n.done(rt),
      () => {
        n.remove($t).remove($n).remove(Vn).remove(Fs).clearTimer(rt);
      }
    );
  }
);
Jt($h, { displayName: "Schema" });
var An, tn;
let Vh = class {
  constructor() {
    ue(this, An),
      ue(this, tn),
      te(this, An, new zc()),
      te(this, tn, null),
      (this.setCtx = (e) => {
        te(this, tn, e);
      });
  }
  get ctx() {
    return R(this, tn);
  }
  create(e, t) {
    const r = e.create(R(this, An).sliceMap);
    return r.set(t), r;
  }
  get(e) {
    return R(this, An).get(e).get();
  }
  remove(e) {
    return R(this, An).remove(e);
  }
  call(e, t) {
    if (R(this, tn) == null) throw Ff();
    const r = this.get(e)(t),
      i = R(this, tn).get(zr);
    return r(i.state, i.dispatch, i);
  }
};
(An = new WeakMap()), (tn = new WeakMap());
function j1(n = "cmdKey") {
  return U(() => () => !1, n);
}
const X = U(new Vh(), "commands"),
  Ls = U([rt], "commandsTimer"),
  Br = Ht("CommandsReady"),
  Wh = (n) => {
    const e = new Vh();
    return (
      e.setCtx(n),
      n.inject(X, e).inject(Ls, [rt]).record(Br),
      async () => (
        await n.waitTimers(Ls),
        n.done(Br),
        () => {
          n.remove(X).remove(Ls).clearTimer(Br);
        }
      )
    );
  };
Jt(Wh, { displayName: "Commands" });
const Ni = Ht("ParserReady"),
  qh = () => {
    throw Eo();
  },
  Ti = U(qh, "parser"),
  $s = U([], "parserTimer"),
  Hh = (n) => (
    n.inject(Ti, qh).inject($s, [rt]).record(Ni),
    async () => {
      await n.waitTimers($s);
      const e = n.get(hn),
        t = n.get($t);
      return (
        n.set(Ti, Qg.create(t, e)),
        n.done(Ni),
        () => {
          n.remove(Ti).remove($s).clearTimer(Ni);
        }
      );
    }
  );
Jt(Hh, { displayName: "Parser" });
const Oi = Ht("SerializerReady"),
  Vs = U([], "serializerTimer"),
  _h = () => {
    throw Eo();
  },
  Ws = U(_h, "serializer"),
  jh = (n) => (
    n.inject(Ws, _h).inject(Vs, [rt]).record(Oi),
    async () => {
      await n.waitTimers(Vs);
      const e = n.get(hn),
        t = n.get($t);
      return (
        n.set(Ws, Xg.create(t, e)),
        n.done(Oi),
        () => {
          n.remove(Ws).remove(Vs).clearTimer(Oi);
        }
      );
    }
  );
Jt(jh, { displayName: "Serializer" });
const qs = U("", "defaultValue"),
  Hs = U((n) => n, "stateOptions"),
  _s = U([], "editorStateTimer"),
  Ii = Ht("EditorStateReady");
function K1(n, e, t) {
  if (typeof n == "string") return e(n);
  if (n.type === "html") return Hn.fromSchema(t).parse(n.dom);
  if (n.type === "json") return je.fromJSON(t, n.value);
  throw Df(n);
}
const J1 = new jt("MILKDOWN_STATE_TRACKER");
function U1(n) {
  const e = ts(Ay, _o, Uu, Yu);
  return (n.Backspace = e), n;
}
const Kh = (n) => (
  n
    .inject(qs, "")
    .inject(wr, {})
    .inject(Hs, (e) => e)
    .inject(_s, [Ni, Oi, Br])
    .record(Ii),
  async () => {
    await n.waitTimers(_s);
    const e = n.get($t),
      t = n.get(Ti),
      r = n.get(_r),
      i = n.get(Hs),
      s = n.get(kt),
      o = n.get(qs),
      l = K1(o, t, e),
      a = [
        ...s,
        new bt({
          key: J1,
          state: {
            init: () => {},
            apply: (h, d, f, p) => {
              n.set(wr, p);
            },
          },
        }),
        vy({ rules: r }),
        th(U1(tk)),
      ];
    n.set(kt, a);
    const c = i({ schema: e, doc: l, plugins: a }),
      u = Pn.create(c);
    return (
      n.set(wr, u),
      n.done(Ii),
      () => {
        n.remove(qs).remove(wr).remove(Hs).remove(_s).clearTimer(Ii);
      }
    );
  }
);
Jt(Kh, { displayName: "EditorState" });
const js = Ht("EditorViewReady"),
  Ks = U([], "editorViewTimer"),
  Ei = U({}, "editorViewOptions"),
  Ai = U(null, "root"),
  Oo = U(null, "rootDOM"),
  Io = U({}, "rootAttrs");
function Y1(n, e) {
  const t = document.createElement("div");
  (t.className = "milkdown"), n.appendChild(t), e.set(Oo, t);
  const r = e.get(Io);
  return Object.entries(r).forEach(([i, s]) => t.setAttribute(i, s)), t;
}
function G1(n) {
  n.classList.add("editor"), n.setAttribute("role", "textbox");
}
const Q1 = new jt("MILKDOWN_VIEW_CLEAR"),
  Jh = (n) => (
    n
      .inject(Ai, document.body)
      .inject(zr, {})
      .inject(Ei, {})
      .inject(Oo, null)
      .inject(Io, {})
      .inject(Ks, [Ii])
      .record(js),
    async () => {
      await n.wait(Ln);
      const e = n.get(Ai) || document.body,
        t = typeof e == "string" ? document.querySelector(e) : e;
      n.update(kt, (a) => [
        new bt({
          key: Q1,
          view: (c) => {
            const u = t ? Y1(t, n) : void 0;
            return (
              (() => {
                if (u && t) {
                  const h = c.dom;
                  t.replaceChild(u, h), u.appendChild(h);
                }
              })(),
              {
                destroy: () => {
                  u != null &&
                    u.parentNode &&
                    (u == null || u.parentNode.replaceChild(c.dom, u)),
                    u == null || u.remove();
                },
              }
            );
          },
        }),
        ...a,
      ]),
        await n.waitTimers(Ks);
      const r = n.get(wr),
        i = n.get(Ei),
        s = Object.fromEntries(n.get(No)),
        o = Object.fromEntries(n.get(To)),
        l = new V1(t, { state: r, nodeViews: s, markViews: o, ...i });
      return (
        G1(l.dom),
        n.set(zr, l),
        n.done(js),
        () => {
          l == null || l.destroy(),
            n
              .remove(Ai)
              .remove(zr)
              .remove(Ei)
              .remove(Oo)
              .remove(Io)
              .remove(Ks)
              .clearTimer(js);
        }
      );
    }
  );
Jt(Jh, { displayName: "EditorView" });
var Dn, ze, It, Cr, Di, Ri, Ie, Et, Rn, zi, zn, Mr, Pi, nn, Nr;
const Z1 = class Uh {
  constructor() {
    ue(this, Dn),
      ue(this, ze),
      ue(this, It),
      ue(this, Cr),
      ue(this, Di),
      ue(this, Ri),
      ue(this, Ie),
      ue(this, Et),
      ue(this, Rn),
      ue(this, zi),
      ue(this, zn),
      ue(this, Mr),
      ue(this, Pi),
      ue(this, nn),
      ue(this, Nr),
      te(this, Dn, !1),
      te(this, ze, "Idle"),
      te(this, It, []),
      te(this, Cr, () => {}),
      te(this, Di, new zc()),
      te(this, Ri, new jf()),
      te(this, Ie, new Map()),
      te(this, Et, new Map()),
      te(this, Rn, new _f(R(this, Di), R(this, Ri))),
      te(this, zi, () => {
        const e = H1(async (r) => {
            await Promise.all(R(this, It).map((i) => i(r)));
          }),
          t = [$h, Hh, jh, Wh, Kh, Jh, _1(this), e];
        R(this, zn).call(this, t, R(this, Et));
      }),
      te(this, zn, (e, t) => {
        e.forEach((r) => {
          const i = R(this, Rn).produce(R(this, Dn) ? r.meta : void 0),
            s = r(i);
          t.set(r, { ctx: i, handler: s, cleanup: void 0 });
        });
      }),
      te(this, Mr, (e, t = !1) =>
        Promise.all(
          [e].flat().map((r) => {
            const i = R(this, Ie).get(r),
              s = i == null ? void 0 : i.cleanup;
            return (
              t
                ? R(this, Ie).delete(r)
                : R(this, Ie).set(r, {
                    ctx: void 0,
                    handler: void 0,
                    cleanup: void 0,
                  }),
              typeof s == "function" ? s() : s
            );
          }),
        ),
      ),
      te(this, Pi, async () => {
        await Promise.all(
          [...R(this, Et).entries()].map(([e, { cleanup: t }]) =>
            typeof t == "function" ? t() : t,
          ),
        ),
          R(this, Et).clear();
      }),
      te(this, nn, (e) => {
        te(this, ze, e), R(this, Cr).call(this, e);
      }),
      te(this, Nr, (e) =>
        [...e.entries()].map(async ([t, r]) => {
          const { ctx: i, handler: s } = r;
          if (!s) return;
          const o = await s();
          e.set(t, { ctx: i, handler: s, cleanup: o });
        }),
      ),
      (this.enableInspector = (e = !0) => (te(this, Dn, e), this)),
      (this.onStatusChange = (e) => (te(this, Cr, e), this)),
      (this.config = (e) => (R(this, It).push(e), this)),
      (this.removeConfig = (e) => (
        te(
          this,
          It,
          R(this, It).filter((t) => t !== e),
        ),
        this
      )),
      (this.use = (e) => {
        const t = [e].flat();
        return (
          t.flat().forEach((r) => {
            R(this, Ie).set(r, {
              ctx: void 0,
              handler: void 0,
              cleanup: void 0,
            });
          }),
          R(this, ze) === "Created" && R(this, zn).call(this, t, R(this, Ie)),
          this
        );
      }),
      (this.remove = async (e) =>
        R(this, ze) === "OnCreate"
          ? (console.warn(
              "[Milkdown]: You are trying to remove plugins when the editor is creating, this is not recommended, please check your code.",
            ),
            new Promise((t) => {
              setTimeout(() => {
                t(this.remove(e));
              }, 50);
            }))
          : (await R(this, Mr).call(this, [e].flat(), !0), this)),
      (this.create = async () =>
        R(this, ze) === "OnCreate"
          ? this
          : (R(this, ze) === "Created" && (await this.destroy()),
            R(this, nn).call(this, "OnCreate"),
            R(this, zi).call(this),
            R(this, zn).call(this, [...R(this, Ie).keys()], R(this, Ie)),
            await Promise.all(
              [
                R(this, Nr).call(this, R(this, Et)),
                R(this, Nr).call(this, R(this, Ie)),
              ].flat(),
            ),
            R(this, nn).call(this, "Created"),
            this)),
      (this.destroy = async (e = !1) =>
        R(this, ze) === "Destroyed" || R(this, ze) === "OnDestroy"
          ? this
          : R(this, ze) === "OnCreate"
            ? new Promise((t) => {
                setTimeout(() => {
                  t(this.destroy(e));
                }, 50);
              })
            : (e && te(this, It, []),
              R(this, nn).call(this, "OnDestroy"),
              await R(this, Mr).call(this, [...R(this, Ie).keys()], e),
              await R(this, Pi).call(this),
              R(this, nn).call(this, "Destroyed"),
              this)),
      (this.action = (e) => e(R(this, Rn))),
      (this.inspect = () =>
        R(this, Dn)
          ? [...R(this, Et).values(), ...R(this, Ie).values()]
              .map(({ ctx: e }) => {
                var t;
                return (t = e == null ? void 0 : e.inspector) == null
                  ? void 0
                  : t.read();
              })
              .filter((e) => !!e)
          : (console.warn(
              "[Milkdown]: You are trying to collect inspection when inspector is disabled, please enable inspector by `editor.enableInspector()` first.",
            ),
            []));
  }
  static make() {
    return new Uh();
  }
  get ctx() {
    return R(this, Rn);
  }
  get status() {
    return R(this, ze);
  }
};
(Dn = new WeakMap()),
  (ze = new WeakMap()),
  (It = new WeakMap()),
  (Cr = new WeakMap()),
  (Di = new WeakMap()),
  (Ri = new WeakMap()),
  (Ie = new WeakMap()),
  (Et = new WeakMap()),
  (Rn = new WeakMap()),
  (zi = new WeakMap()),
  (zn = new WeakMap()),
  (Mr = new WeakMap()),
  (Pi = new WeakMap()),
  (nn = new WeakMap()),
  (Nr = new WeakMap());
let X1 = Z1;
function re(n, e) {
  const t = j1(n),
    r = (i) => async () => {
      (r.key = t), await i.wait(Br);
      const s = e(i);
      return (
        i.get(X).create(t, s),
        (r.run = (o) => i.get(X).call(n, o)),
        () => {
          i.get(X).remove(t);
        }
      );
    };
  return r;
}
function Ue(n) {
  const e = (t) => async () => {
    await t.wait(rt);
    const r = n(t);
    return (
      t.update(_r, (i) => [...i, r]),
      (e.inputRule = r),
      () => {
        t.update(_r, (i) => i.filter((s) => s !== r));
      }
    );
  };
  return e;
}
function ex(n, e) {
  const t = (r) => async () => {
    const i = e(r);
    return (
      r.update(Vn, (s) => [...s.filter((o) => o[0] !== n), [n, i]]),
      (t.id = n),
      (t.schema = i),
      () => {
        r.update(Vn, (s) => s.filter(([o]) => o !== n));
      }
    );
  };
  return (
    (t.type = (r) => {
      const i = r.get($t).marks[n];
      if (!i) throw $f(n);
      return i;
    }),
    t
  );
}
function nl(n, e) {
  const t = (r) => async () => {
    const i = e(r);
    return (
      r.update($n, (s) => [...s.filter((o) => o[0] !== n), [n, i]]),
      (t.id = n),
      (t.schema = i),
      () => {
        r.update($n, (s) => s.filter(([o]) => o !== n));
      }
    );
  };
  return (
    (t.type = (r) => {
      const i = r.get($t).nodes[n];
      if (!i) throw Lf(n);
      return i;
    }),
    t
  );
}
function Gr(n) {
  let e;
  const t = (r) => async () => (
    await r.wait(rt),
    (e = n(r)),
    r.update(kt, (i) => [...i, e]),
    () => {
      r.update(kt, (i) => i.filter((s) => s !== e));
    }
  );
  return (t.plugin = () => e), (t.key = () => e.spec.key), t;
}
function tx(n) {
  const e = (t) => async () => {
    await t.wait(rt);
    const r = n(t),
      i = th(r);
    return (
      t.update(kt, (s) => [...s, i]),
      (e.keymap = r),
      () => {
        t.update(kt, (s) => s.filter((o) => o !== i));
      }
    );
  };
  return e;
}
function Ut(n, e) {
  const t = U(n, e),
    r = (i) => (
      i.inject(t),
      () => () => {
        i.remove(t);
      }
    );
  return (r.key = t), r;
}
function Ye(n, e) {
  const t = Ut(e, n),
    r = nl(n, (s) => s.get(t.key)(s)),
    i = [t, r];
  return (
    (i.id = r.id),
    (i.node = r),
    (i.type = (s) => r.type(s)),
    (i.schema = r.schema),
    (i.ctx = t),
    (i.key = t.key),
    (i.extendSchema = (s) => (o) => () => {
      const l = o.get(t.key),
        a = s(l)(o);
      o.update($n, (c) => [...c.filter((u) => u[0] !== n), [n, a]]),
        (i.schema = a);
    }),
    i
  );
}
function ss(n, e) {
  const t = Ut(e, n),
    r = ex(n, (s) => s.get(t.key)(s)),
    i = [t, r];
  return (
    (i.id = r.id),
    (i.mark = r),
    (i.type = r.type),
    (i.schema = r.schema),
    (i.ctx = t),
    (i.key = t.key),
    (i.extendSchema = (s) => (o) => () => {
      const l = o.get(t.key),
        a = s(l)(o);
      o.update(Vn, (c) => [...c.filter((u) => u[0] !== n), [n, a]]),
        (i.schema = a);
    }),
    i
  );
}
function Ge(n, e) {
  const t = Object.fromEntries(
      Object.entries(e).map(([o, { shortcuts: l }]) => [o, l]),
    ),
    r = Ut(t, `${n}Keymap`),
    i = tx((o) => {
      const l = o.get(r.key),
        a = Object.entries(e).flatMap(([c, { command: u }]) =>
          [l[c]].flat().map((h) => [h, u(o)]),
        );
      return Object.fromEntries(a);
    }),
    s = [r, i];
  return (
    (s.ctx = r), (s.shortcuts = i), (s.key = r.key), (s.keymap = i.keymap), s
  );
}
const Qe = (n, e = () => ({})) => Ut(e, `${n}Attr`),
  ls = (n, e = () => ({})) => Ut(e, `${n}Attr`);
function Qr(n, e, t) {
  const r = Ut({}, n),
    i = (o) => async () => {
      await o.wait(Ln);
      const l = { plugin: e(o), options: o.get(r.key) };
      return (
        o.update(jr, (a) => [...a, l]),
        () => {
          o.update(jr, (a) => a.filter((c) => c !== l));
        }
      );
    },
    s = [r, i];
  return (s.id = n), (s.plugin = i), (s.options = r), s;
}
function rl(n) {
  if (typeof n != "string") throw new TypeError("Expected a string");
  return n.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
const nx = [
    ["ß", "ss"],
    ["ẞ", "Ss"],
    ["ä", "ae"],
    ["Ä", "Ae"],
    ["ö", "oe"],
    ["Ö", "Oe"],
    ["ü", "ue"],
    ["Ü", "Ue"],
    ["À", "A"],
    ["Á", "A"],
    ["Â", "A"],
    ["Ã", "A"],
    ["Ä", "Ae"],
    ["Å", "A"],
    ["Æ", "AE"],
    ["Ç", "C"],
    ["È", "E"],
    ["É", "E"],
    ["Ê", "E"],
    ["Ë", "E"],
    ["Ì", "I"],
    ["Í", "I"],
    ["Î", "I"],
    ["Ï", "I"],
    ["Ð", "D"],
    ["Ñ", "N"],
    ["Ò", "O"],
    ["Ó", "O"],
    ["Ô", "O"],
    ["Õ", "O"],
    ["Ö", "Oe"],
    ["Ő", "O"],
    ["Ø", "O"],
    ["Ù", "U"],
    ["Ú", "U"],
    ["Û", "U"],
    ["Ü", "Ue"],
    ["Ű", "U"],
    ["Ý", "Y"],
    ["Þ", "TH"],
    ["ß", "ss"],
    ["à", "a"],
    ["á", "a"],
    ["â", "a"],
    ["ã", "a"],
    ["ä", "ae"],
    ["å", "a"],
    ["æ", "ae"],
    ["ç", "c"],
    ["è", "e"],
    ["é", "e"],
    ["ê", "e"],
    ["ë", "e"],
    ["ì", "i"],
    ["í", "i"],
    ["î", "i"],
    ["ï", "i"],
    ["ð", "d"],
    ["ñ", "n"],
    ["ò", "o"],
    ["ó", "o"],
    ["ô", "o"],
    ["õ", "o"],
    ["ö", "oe"],
    ["ő", "o"],
    ["ø", "o"],
    ["ù", "u"],
    ["ú", "u"],
    ["û", "u"],
    ["ü", "ue"],
    ["ű", "u"],
    ["ý", "y"],
    ["þ", "th"],
    ["ÿ", "y"],
    ["ẞ", "SS"],
    ["à", "a"],
    ["À", "A"],
    ["á", "a"],
    ["Á", "A"],
    ["â", "a"],
    ["Â", "A"],
    ["ã", "a"],
    ["Ã", "A"],
    ["è", "e"],
    ["È", "E"],
    ["é", "e"],
    ["É", "E"],
    ["ê", "e"],
    ["Ê", "E"],
    ["ì", "i"],
    ["Ì", "I"],
    ["í", "i"],
    ["Í", "I"],
    ["ò", "o"],
    ["Ò", "O"],
    ["ó", "o"],
    ["Ó", "O"],
    ["ô", "o"],
    ["Ô", "O"],
    ["õ", "o"],
    ["Õ", "O"],
    ["ù", "u"],
    ["Ù", "U"],
    ["ú", "u"],
    ["Ú", "U"],
    ["ý", "y"],
    ["Ý", "Y"],
    ["ă", "a"],
    ["Ă", "A"],
    ["Đ", "D"],
    ["đ", "d"],
    ["ĩ", "i"],
    ["Ĩ", "I"],
    ["ũ", "u"],
    ["Ũ", "U"],
    ["ơ", "o"],
    ["Ơ", "O"],
    ["ư", "u"],
    ["Ư", "U"],
    ["ạ", "a"],
    ["Ạ", "A"],
    ["ả", "a"],
    ["Ả", "A"],
    ["ấ", "a"],
    ["Ấ", "A"],
    ["ầ", "a"],
    ["Ầ", "A"],
    ["ẩ", "a"],
    ["Ẩ", "A"],
    ["ẫ", "a"],
    ["Ẫ", "A"],
    ["ậ", "a"],
    ["Ậ", "A"],
    ["ắ", "a"],
    ["Ắ", "A"],
    ["ằ", "a"],
    ["Ằ", "A"],
    ["ẳ", "a"],
    ["Ẳ", "A"],
    ["ẵ", "a"],
    ["Ẵ", "A"],
    ["ặ", "a"],
    ["Ặ", "A"],
    ["ẹ", "e"],
    ["Ẹ", "E"],
    ["ẻ", "e"],
    ["Ẻ", "E"],
    ["ẽ", "e"],
    ["Ẽ", "E"],
    ["ế", "e"],
    ["Ế", "E"],
    ["ề", "e"],
    ["Ề", "E"],
    ["ể", "e"],
    ["Ể", "E"],
    ["ễ", "e"],
    ["Ễ", "E"],
    ["ệ", "e"],
    ["Ệ", "E"],
    ["ỉ", "i"],
    ["Ỉ", "I"],
    ["ị", "i"],
    ["Ị", "I"],
    ["ọ", "o"],
    ["Ọ", "O"],
    ["ỏ", "o"],
    ["Ỏ", "O"],
    ["ố", "o"],
    ["Ố", "O"],
    ["ồ", "o"],
    ["Ồ", "O"],
    ["ổ", "o"],
    ["Ổ", "O"],
    ["ỗ", "o"],
    ["Ỗ", "O"],
    ["ộ", "o"],
    ["Ộ", "O"],
    ["ớ", "o"],
    ["Ớ", "O"],
    ["ờ", "o"],
    ["Ờ", "O"],
    ["ở", "o"],
    ["Ở", "O"],
    ["ỡ", "o"],
    ["Ỡ", "O"],
    ["ợ", "o"],
    ["Ợ", "O"],
    ["ụ", "u"],
    ["Ụ", "U"],
    ["ủ", "u"],
    ["Ủ", "U"],
    ["ứ", "u"],
    ["Ứ", "U"],
    ["ừ", "u"],
    ["Ừ", "U"],
    ["ử", "u"],
    ["Ử", "U"],
    ["ữ", "u"],
    ["Ữ", "U"],
    ["ự", "u"],
    ["Ự", "U"],
    ["ỳ", "y"],
    ["Ỳ", "Y"],
    ["ỵ", "y"],
    ["Ỵ", "Y"],
    ["ỷ", "y"],
    ["Ỷ", "Y"],
    ["ỹ", "y"],
    ["Ỹ", "Y"],
    ["ء", "e"],
    ["آ", "a"],
    ["أ", "a"],
    ["ؤ", "w"],
    ["إ", "i"],
    ["ئ", "y"],
    ["ا", "a"],
    ["ب", "b"],
    ["ة", "t"],
    ["ت", "t"],
    ["ث", "th"],
    ["ج", "j"],
    ["ح", "h"],
    ["خ", "kh"],
    ["د", "d"],
    ["ذ", "dh"],
    ["ر", "r"],
    ["ز", "z"],
    ["س", "s"],
    ["ش", "sh"],
    ["ص", "s"],
    ["ض", "d"],
    ["ط", "t"],
    ["ظ", "z"],
    ["ع", "e"],
    ["غ", "gh"],
    ["ـ", "_"],
    ["ف", "f"],
    ["ق", "q"],
    ["ك", "k"],
    ["ل", "l"],
    ["م", "m"],
    ["ن", "n"],
    ["ه", "h"],
    ["و", "w"],
    ["ى", "a"],
    ["ي", "y"],
    ["َ‎", "a"],
    ["ُ", "u"],
    ["ِ‎", "i"],
    ["٠", "0"],
    ["١", "1"],
    ["٢", "2"],
    ["٣", "3"],
    ["٤", "4"],
    ["٥", "5"],
    ["٦", "6"],
    ["٧", "7"],
    ["٨", "8"],
    ["٩", "9"],
    ["چ", "ch"],
    ["ک", "k"],
    ["گ", "g"],
    ["پ", "p"],
    ["ژ", "zh"],
    ["ی", "y"],
    ["۰", "0"],
    ["۱", "1"],
    ["۲", "2"],
    ["۳", "3"],
    ["۴", "4"],
    ["۵", "5"],
    ["۶", "6"],
    ["۷", "7"],
    ["۸", "8"],
    ["۹", "9"],
    ["ټ", "p"],
    ["ځ", "z"],
    ["څ", "c"],
    ["ډ", "d"],
    ["ﺫ", "d"],
    ["ﺭ", "r"],
    ["ړ", "r"],
    ["ﺯ", "z"],
    ["ږ", "g"],
    ["ښ", "x"],
    ["ګ", "g"],
    ["ڼ", "n"],
    ["ۀ", "e"],
    ["ې", "e"],
    ["ۍ", "ai"],
    ["ٹ", "t"],
    ["ڈ", "d"],
    ["ڑ", "r"],
    ["ں", "n"],
    ["ہ", "h"],
    ["ھ", "h"],
    ["ے", "e"],
    ["А", "A"],
    ["а", "a"],
    ["Б", "B"],
    ["б", "b"],
    ["В", "V"],
    ["в", "v"],
    ["Г", "G"],
    ["г", "g"],
    ["Д", "D"],
    ["д", "d"],
    ["ъе", "ye"],
    ["Ъе", "Ye"],
    ["ъЕ", "yE"],
    ["ЪЕ", "YE"],
    ["Е", "E"],
    ["е", "e"],
    ["Ё", "Yo"],
    ["ё", "yo"],
    ["Ж", "Zh"],
    ["ж", "zh"],
    ["З", "Z"],
    ["з", "z"],
    ["И", "I"],
    ["и", "i"],
    ["ый", "iy"],
    ["Ый", "Iy"],
    ["ЫЙ", "IY"],
    ["ыЙ", "iY"],
    ["Й", "Y"],
    ["й", "y"],
    ["К", "K"],
    ["к", "k"],
    ["Л", "L"],
    ["л", "l"],
    ["М", "M"],
    ["м", "m"],
    ["Н", "N"],
    ["н", "n"],
    ["О", "O"],
    ["о", "o"],
    ["П", "P"],
    ["п", "p"],
    ["Р", "R"],
    ["р", "r"],
    ["С", "S"],
    ["с", "s"],
    ["Т", "T"],
    ["т", "t"],
    ["У", "U"],
    ["у", "u"],
    ["Ф", "F"],
    ["ф", "f"],
    ["Х", "Kh"],
    ["х", "kh"],
    ["Ц", "Ts"],
    ["ц", "ts"],
    ["Ч", "Ch"],
    ["ч", "ch"],
    ["Ш", "Sh"],
    ["ш", "sh"],
    ["Щ", "Sch"],
    ["щ", "sch"],
    ["Ъ", ""],
    ["ъ", ""],
    ["Ы", "Y"],
    ["ы", "y"],
    ["Ь", ""],
    ["ь", ""],
    ["Э", "E"],
    ["э", "e"],
    ["Ю", "Yu"],
    ["ю", "yu"],
    ["Я", "Ya"],
    ["я", "ya"],
    ["ă", "a"],
    ["Ă", "A"],
    ["ș", "s"],
    ["Ș", "S"],
    ["ț", "t"],
    ["Ț", "T"],
    ["ţ", "t"],
    ["Ţ", "T"],
    ["ş", "s"],
    ["Ş", "S"],
    ["ç", "c"],
    ["Ç", "C"],
    ["ğ", "g"],
    ["Ğ", "G"],
    ["ı", "i"],
    ["İ", "I"],
    ["ա", "a"],
    ["Ա", "A"],
    ["բ", "b"],
    ["Բ", "B"],
    ["գ", "g"],
    ["Գ", "G"],
    ["դ", "d"],
    ["Դ", "D"],
    ["ե", "ye"],
    ["Ե", "Ye"],
    ["զ", "z"],
    ["Զ", "Z"],
    ["է", "e"],
    ["Է", "E"],
    ["ը", "y"],
    ["Ը", "Y"],
    ["թ", "t"],
    ["Թ", "T"],
    ["ժ", "zh"],
    ["Ժ", "Zh"],
    ["ի", "i"],
    ["Ի", "I"],
    ["լ", "l"],
    ["Լ", "L"],
    ["խ", "kh"],
    ["Խ", "Kh"],
    ["ծ", "ts"],
    ["Ծ", "Ts"],
    ["կ", "k"],
    ["Կ", "K"],
    ["հ", "h"],
    ["Հ", "H"],
    ["ձ", "dz"],
    ["Ձ", "Dz"],
    ["ղ", "gh"],
    ["Ղ", "Gh"],
    ["ճ", "tch"],
    ["Ճ", "Tch"],
    ["մ", "m"],
    ["Մ", "M"],
    ["յ", "y"],
    ["Յ", "Y"],
    ["ն", "n"],
    ["Ն", "N"],
    ["շ", "sh"],
    ["Շ", "Sh"],
    ["ո", "vo"],
    ["Ո", "Vo"],
    ["չ", "ch"],
    ["Չ", "Ch"],
    ["պ", "p"],
    ["Պ", "P"],
    ["ջ", "j"],
    ["Ջ", "J"],
    ["ռ", "r"],
    ["Ռ", "R"],
    ["ս", "s"],
    ["Ս", "S"],
    ["վ", "v"],
    ["Վ", "V"],
    ["տ", "t"],
    ["Տ", "T"],
    ["ր", "r"],
    ["Ր", "R"],
    ["ց", "c"],
    ["Ց", "C"],
    ["ու", "u"],
    ["ՈՒ", "U"],
    ["Ու", "U"],
    ["փ", "p"],
    ["Փ", "P"],
    ["ք", "q"],
    ["Ք", "Q"],
    ["օ", "o"],
    ["Օ", "O"],
    ["ֆ", "f"],
    ["Ֆ", "F"],
    ["և", "yev"],
    ["ა", "a"],
    ["ბ", "b"],
    ["გ", "g"],
    ["დ", "d"],
    ["ე", "e"],
    ["ვ", "v"],
    ["ზ", "z"],
    ["თ", "t"],
    ["ი", "i"],
    ["კ", "k"],
    ["ლ", "l"],
    ["მ", "m"],
    ["ნ", "n"],
    ["ო", "o"],
    ["პ", "p"],
    ["ჟ", "zh"],
    ["რ", "r"],
    ["ს", "s"],
    ["ტ", "t"],
    ["უ", "u"],
    ["ფ", "ph"],
    ["ქ", "q"],
    ["ღ", "gh"],
    ["ყ", "k"],
    ["შ", "sh"],
    ["ჩ", "ch"],
    ["ც", "ts"],
    ["ძ", "dz"],
    ["წ", "ts"],
    ["ჭ", "tch"],
    ["ხ", "kh"],
    ["ჯ", "j"],
    ["ჰ", "h"],
    ["č", "c"],
    ["ď", "d"],
    ["ě", "e"],
    ["ň", "n"],
    ["ř", "r"],
    ["š", "s"],
    ["ť", "t"],
    ["ů", "u"],
    ["ž", "z"],
    ["Č", "C"],
    ["Ď", "D"],
    ["Ě", "E"],
    ["Ň", "N"],
    ["Ř", "R"],
    ["Š", "S"],
    ["Ť", "T"],
    ["Ů", "U"],
    ["Ž", "Z"],
    ["ހ", "h"],
    ["ށ", "sh"],
    ["ނ", "n"],
    ["ރ", "r"],
    ["ބ", "b"],
    ["ޅ", "lh"],
    ["ކ", "k"],
    ["އ", "a"],
    ["ވ", "v"],
    ["މ", "m"],
    ["ފ", "f"],
    ["ދ", "dh"],
    ["ތ", "th"],
    ["ލ", "l"],
    ["ގ", "g"],
    ["ޏ", "gn"],
    ["ސ", "s"],
    ["ޑ", "d"],
    ["ޒ", "z"],
    ["ޓ", "t"],
    ["ޔ", "y"],
    ["ޕ", "p"],
    ["ޖ", "j"],
    ["ޗ", "ch"],
    ["ޘ", "tt"],
    ["ޙ", "hh"],
    ["ޚ", "kh"],
    ["ޛ", "th"],
    ["ޜ", "z"],
    ["ޝ", "sh"],
    ["ޞ", "s"],
    ["ޟ", "d"],
    ["ޠ", "t"],
    ["ޡ", "z"],
    ["ޢ", "a"],
    ["ޣ", "gh"],
    ["ޤ", "q"],
    ["ޥ", "w"],
    ["ަ", "a"],
    ["ާ", "aa"],
    ["ި", "i"],
    ["ީ", "ee"],
    ["ު", "u"],
    ["ޫ", "oo"],
    ["ެ", "e"],
    ["ޭ", "ey"],
    ["ޮ", "o"],
    ["ޯ", "oa"],
    ["ް", ""],
    ["α", "a"],
    ["β", "v"],
    ["γ", "g"],
    ["δ", "d"],
    ["ε", "e"],
    ["ζ", "z"],
    ["η", "i"],
    ["θ", "th"],
    ["ι", "i"],
    ["κ", "k"],
    ["λ", "l"],
    ["μ", "m"],
    ["ν", "n"],
    ["ξ", "ks"],
    ["ο", "o"],
    ["π", "p"],
    ["ρ", "r"],
    ["σ", "s"],
    ["τ", "t"],
    ["υ", "y"],
    ["φ", "f"],
    ["χ", "x"],
    ["ψ", "ps"],
    ["ω", "o"],
    ["ά", "a"],
    ["έ", "e"],
    ["ί", "i"],
    ["ό", "o"],
    ["ύ", "y"],
    ["ή", "i"],
    ["ώ", "o"],
    ["ς", "s"],
    ["ϊ", "i"],
    ["ΰ", "y"],
    ["ϋ", "y"],
    ["ΐ", "i"],
    ["Α", "A"],
    ["Β", "B"],
    ["Γ", "G"],
    ["Δ", "D"],
    ["Ε", "E"],
    ["Ζ", "Z"],
    ["Η", "I"],
    ["Θ", "TH"],
    ["Ι", "I"],
    ["Κ", "K"],
    ["Λ", "L"],
    ["Μ", "M"],
    ["Ν", "N"],
    ["Ξ", "KS"],
    ["Ο", "O"],
    ["Π", "P"],
    ["Ρ", "R"],
    ["Σ", "S"],
    ["Τ", "T"],
    ["Υ", "Y"],
    ["Φ", "F"],
    ["Χ", "X"],
    ["Ψ", "PS"],
    ["Ω", "O"],
    ["Ά", "A"],
    ["Έ", "E"],
    ["Ί", "I"],
    ["Ό", "O"],
    ["Ύ", "Y"],
    ["Ή", "I"],
    ["Ώ", "O"],
    ["Ϊ", "I"],
    ["Ϋ", "Y"],
    ["ā", "a"],
    ["ē", "e"],
    ["ģ", "g"],
    ["ī", "i"],
    ["ķ", "k"],
    ["ļ", "l"],
    ["ņ", "n"],
    ["ū", "u"],
    ["Ā", "A"],
    ["Ē", "E"],
    ["Ģ", "G"],
    ["Ī", "I"],
    ["Ķ", "K"],
    ["Ļ", "L"],
    ["Ņ", "N"],
    ["Ū", "U"],
    ["č", "c"],
    ["š", "s"],
    ["ž", "z"],
    ["Č", "C"],
    ["Š", "S"],
    ["Ž", "Z"],
    ["ą", "a"],
    ["č", "c"],
    ["ę", "e"],
    ["ė", "e"],
    ["į", "i"],
    ["š", "s"],
    ["ų", "u"],
    ["ū", "u"],
    ["ž", "z"],
    ["Ą", "A"],
    ["Č", "C"],
    ["Ę", "E"],
    ["Ė", "E"],
    ["Į", "I"],
    ["Š", "S"],
    ["Ų", "U"],
    ["Ū", "U"],
    ["Ќ", "Kj"],
    ["ќ", "kj"],
    ["Љ", "Lj"],
    ["љ", "lj"],
    ["Њ", "Nj"],
    ["њ", "nj"],
    ["Тс", "Ts"],
    ["тс", "ts"],
    ["ą", "a"],
    ["ć", "c"],
    ["ę", "e"],
    ["ł", "l"],
    ["ń", "n"],
    ["ś", "s"],
    ["ź", "z"],
    ["ż", "z"],
    ["Ą", "A"],
    ["Ć", "C"],
    ["Ę", "E"],
    ["Ł", "L"],
    ["Ń", "N"],
    ["Ś", "S"],
    ["Ź", "Z"],
    ["Ż", "Z"],
    ["Є", "Ye"],
    ["І", "I"],
    ["Ї", "Yi"],
    ["Ґ", "G"],
    ["є", "ye"],
    ["і", "i"],
    ["ї", "yi"],
    ["ґ", "g"],
    ["Ĳ", "IJ"],
    ["ĳ", "ij"],
    ["¢", "c"],
    ["¥", "Y"],
    ["߿", "b"],
    ["৳", "t"],
    ["૱", "Bo"],
    ["฿", "B"],
    ["₠", "CE"],
    ["₡", "C"],
    ["₢", "Cr"],
    ["₣", "F"],
    ["₥", "m"],
    ["₦", "N"],
    ["₧", "Pt"],
    ["₨", "Rs"],
    ["₩", "W"],
    ["₫", "s"],
    ["€", "E"],
    ["₭", "K"],
    ["₮", "T"],
    ["₯", "Dp"],
    ["₰", "S"],
    ["₱", "P"],
    ["₲", "G"],
    ["₳", "A"],
    ["₴", "S"],
    ["₵", "C"],
    ["₶", "tt"],
    ["₷", "S"],
    ["₸", "T"],
    ["₹", "R"],
    ["₺", "L"],
    ["₽", "P"],
    ["₿", "B"],
    ["﹩", "$"],
    ["￠", "c"],
    ["￥", "Y"],
    ["￦", "W"],
    ["𝐀", "A"],
    ["𝐁", "B"],
    ["𝐂", "C"],
    ["𝐃", "D"],
    ["𝐄", "E"],
    ["𝐅", "F"],
    ["𝐆", "G"],
    ["𝐇", "H"],
    ["𝐈", "I"],
    ["𝐉", "J"],
    ["𝐊", "K"],
    ["𝐋", "L"],
    ["𝐌", "M"],
    ["𝐍", "N"],
    ["𝐎", "O"],
    ["𝐏", "P"],
    ["𝐐", "Q"],
    ["𝐑", "R"],
    ["𝐒", "S"],
    ["𝐓", "T"],
    ["𝐔", "U"],
    ["𝐕", "V"],
    ["𝐖", "W"],
    ["𝐗", "X"],
    ["𝐘", "Y"],
    ["𝐙", "Z"],
    ["𝐚", "a"],
    ["𝐛", "b"],
    ["𝐜", "c"],
    ["𝐝", "d"],
    ["𝐞", "e"],
    ["𝐟", "f"],
    ["𝐠", "g"],
    ["𝐡", "h"],
    ["𝐢", "i"],
    ["𝐣", "j"],
    ["𝐤", "k"],
    ["𝐥", "l"],
    ["𝐦", "m"],
    ["𝐧", "n"],
    ["𝐨", "o"],
    ["𝐩", "p"],
    ["𝐪", "q"],
    ["𝐫", "r"],
    ["𝐬", "s"],
    ["𝐭", "t"],
    ["𝐮", "u"],
    ["𝐯", "v"],
    ["𝐰", "w"],
    ["𝐱", "x"],
    ["𝐲", "y"],
    ["𝐳", "z"],
    ["𝐴", "A"],
    ["𝐵", "B"],
    ["𝐶", "C"],
    ["𝐷", "D"],
    ["𝐸", "E"],
    ["𝐹", "F"],
    ["𝐺", "G"],
    ["𝐻", "H"],
    ["𝐼", "I"],
    ["𝐽", "J"],
    ["𝐾", "K"],
    ["𝐿", "L"],
    ["𝑀", "M"],
    ["𝑁", "N"],
    ["𝑂", "O"],
    ["𝑃", "P"],
    ["𝑄", "Q"],
    ["𝑅", "R"],
    ["𝑆", "S"],
    ["𝑇", "T"],
    ["𝑈", "U"],
    ["𝑉", "V"],
    ["𝑊", "W"],
    ["𝑋", "X"],
    ["𝑌", "Y"],
    ["𝑍", "Z"],
    ["𝑎", "a"],
    ["𝑏", "b"],
    ["𝑐", "c"],
    ["𝑑", "d"],
    ["𝑒", "e"],
    ["𝑓", "f"],
    ["𝑔", "g"],
    ["𝑖", "i"],
    ["𝑗", "j"],
    ["𝑘", "k"],
    ["𝑙", "l"],
    ["𝑚", "m"],
    ["𝑛", "n"],
    ["𝑜", "o"],
    ["𝑝", "p"],
    ["𝑞", "q"],
    ["𝑟", "r"],
    ["𝑠", "s"],
    ["𝑡", "t"],
    ["𝑢", "u"],
    ["𝑣", "v"],
    ["𝑤", "w"],
    ["𝑥", "x"],
    ["𝑦", "y"],
    ["𝑧", "z"],
    ["𝑨", "A"],
    ["𝑩", "B"],
    ["𝑪", "C"],
    ["𝑫", "D"],
    ["𝑬", "E"],
    ["𝑭", "F"],
    ["𝑮", "G"],
    ["𝑯", "H"],
    ["𝑰", "I"],
    ["𝑱", "J"],
    ["𝑲", "K"],
    ["𝑳", "L"],
    ["𝑴", "M"],
    ["𝑵", "N"],
    ["𝑶", "O"],
    ["𝑷", "P"],
    ["𝑸", "Q"],
    ["𝑹", "R"],
    ["𝑺", "S"],
    ["𝑻", "T"],
    ["𝑼", "U"],
    ["𝑽", "V"],
    ["𝑾", "W"],
    ["𝑿", "X"],
    ["𝒀", "Y"],
    ["𝒁", "Z"],
    ["𝒂", "a"],
    ["𝒃", "b"],
    ["𝒄", "c"],
    ["𝒅", "d"],
    ["𝒆", "e"],
    ["𝒇", "f"],
    ["𝒈", "g"],
    ["𝒉", "h"],
    ["𝒊", "i"],
    ["𝒋", "j"],
    ["𝒌", "k"],
    ["𝒍", "l"],
    ["𝒎", "m"],
    ["𝒏", "n"],
    ["𝒐", "o"],
    ["𝒑", "p"],
    ["𝒒", "q"],
    ["𝒓", "r"],
    ["𝒔", "s"],
    ["𝒕", "t"],
    ["𝒖", "u"],
    ["𝒗", "v"],
    ["𝒘", "w"],
    ["𝒙", "x"],
    ["𝒚", "y"],
    ["𝒛", "z"],
    ["𝒜", "A"],
    ["𝒞", "C"],
    ["𝒟", "D"],
    ["𝒢", "g"],
    ["𝒥", "J"],
    ["𝒦", "K"],
    ["𝒩", "N"],
    ["𝒪", "O"],
    ["𝒫", "P"],
    ["𝒬", "Q"],
    ["𝒮", "S"],
    ["𝒯", "T"],
    ["𝒰", "U"],
    ["𝒱", "V"],
    ["𝒲", "W"],
    ["𝒳", "X"],
    ["𝒴", "Y"],
    ["𝒵", "Z"],
    ["𝒶", "a"],
    ["𝒷", "b"],
    ["𝒸", "c"],
    ["𝒹", "d"],
    ["𝒻", "f"],
    ["𝒽", "h"],
    ["𝒾", "i"],
    ["𝒿", "j"],
    ["𝓀", "h"],
    ["𝓁", "l"],
    ["𝓂", "m"],
    ["𝓃", "n"],
    ["𝓅", "p"],
    ["𝓆", "q"],
    ["𝓇", "r"],
    ["𝓈", "s"],
    ["𝓉", "t"],
    ["𝓊", "u"],
    ["𝓋", "v"],
    ["𝓌", "w"],
    ["𝓍", "x"],
    ["𝓎", "y"],
    ["𝓏", "z"],
    ["𝓐", "A"],
    ["𝓑", "B"],
    ["𝓒", "C"],
    ["𝓓", "D"],
    ["𝓔", "E"],
    ["𝓕", "F"],
    ["𝓖", "G"],
    ["𝓗", "H"],
    ["𝓘", "I"],
    ["𝓙", "J"],
    ["𝓚", "K"],
    ["𝓛", "L"],
    ["𝓜", "M"],
    ["𝓝", "N"],
    ["𝓞", "O"],
    ["𝓟", "P"],
    ["𝓠", "Q"],
    ["𝓡", "R"],
    ["𝓢", "S"],
    ["𝓣", "T"],
    ["𝓤", "U"],
    ["𝓥", "V"],
    ["𝓦", "W"],
    ["𝓧", "X"],
    ["𝓨", "Y"],
    ["𝓩", "Z"],
    ["𝓪", "a"],
    ["𝓫", "b"],
    ["𝓬", "c"],
    ["𝓭", "d"],
    ["𝓮", "e"],
    ["𝓯", "f"],
    ["𝓰", "g"],
    ["𝓱", "h"],
    ["𝓲", "i"],
    ["𝓳", "j"],
    ["𝓴", "k"],
    ["𝓵", "l"],
    ["𝓶", "m"],
    ["𝓷", "n"],
    ["𝓸", "o"],
    ["𝓹", "p"],
    ["𝓺", "q"],
    ["𝓻", "r"],
    ["𝓼", "s"],
    ["𝓽", "t"],
    ["𝓾", "u"],
    ["𝓿", "v"],
    ["𝔀", "w"],
    ["𝔁", "x"],
    ["𝔂", "y"],
    ["𝔃", "z"],
    ["𝔄", "A"],
    ["𝔅", "B"],
    ["𝔇", "D"],
    ["𝔈", "E"],
    ["𝔉", "F"],
    ["𝔊", "G"],
    ["𝔍", "J"],
    ["𝔎", "K"],
    ["𝔏", "L"],
    ["𝔐", "M"],
    ["𝔑", "N"],
    ["𝔒", "O"],
    ["𝔓", "P"],
    ["𝔔", "Q"],
    ["𝔖", "S"],
    ["𝔗", "T"],
    ["𝔘", "U"],
    ["𝔙", "V"],
    ["𝔚", "W"],
    ["𝔛", "X"],
    ["𝔜", "Y"],
    ["𝔞", "a"],
    ["𝔟", "b"],
    ["𝔠", "c"],
    ["𝔡", "d"],
    ["𝔢", "e"],
    ["𝔣", "f"],
    ["𝔤", "g"],
    ["𝔥", "h"],
    ["𝔦", "i"],
    ["𝔧", "j"],
    ["𝔨", "k"],
    ["𝔩", "l"],
    ["𝔪", "m"],
    ["𝔫", "n"],
    ["𝔬", "o"],
    ["𝔭", "p"],
    ["𝔮", "q"],
    ["𝔯", "r"],
    ["𝔰", "s"],
    ["𝔱", "t"],
    ["𝔲", "u"],
    ["𝔳", "v"],
    ["𝔴", "w"],
    ["𝔵", "x"],
    ["𝔶", "y"],
    ["𝔷", "z"],
    ["𝔸", "A"],
    ["𝔹", "B"],
    ["𝔻", "D"],
    ["𝔼", "E"],
    ["𝔽", "F"],
    ["𝔾", "G"],
    ["𝕀", "I"],
    ["𝕁", "J"],
    ["𝕂", "K"],
    ["𝕃", "L"],
    ["𝕄", "M"],
    ["𝕆", "N"],
    ["𝕊", "S"],
    ["𝕋", "T"],
    ["𝕌", "U"],
    ["𝕍", "V"],
    ["𝕎", "W"],
    ["𝕏", "X"],
    ["𝕐", "Y"],
    ["𝕒", "a"],
    ["𝕓", "b"],
    ["𝕔", "c"],
    ["𝕕", "d"],
    ["𝕖", "e"],
    ["𝕗", "f"],
    ["𝕘", "g"],
    ["𝕙", "h"],
    ["𝕚", "i"],
    ["𝕛", "j"],
    ["𝕜", "k"],
    ["𝕝", "l"],
    ["𝕞", "m"],
    ["𝕟", "n"],
    ["𝕠", "o"],
    ["𝕡", "p"],
    ["𝕢", "q"],
    ["𝕣", "r"],
    ["𝕤", "s"],
    ["𝕥", "t"],
    ["𝕦", "u"],
    ["𝕧", "v"],
    ["𝕨", "w"],
    ["𝕩", "x"],
    ["𝕪", "y"],
    ["𝕫", "z"],
    ["𝕬", "A"],
    ["𝕭", "B"],
    ["𝕮", "C"],
    ["𝕯", "D"],
    ["𝕰", "E"],
    ["𝕱", "F"],
    ["𝕲", "G"],
    ["𝕳", "H"],
    ["𝕴", "I"],
    ["𝕵", "J"],
    ["𝕶", "K"],
    ["𝕷", "L"],
    ["𝕸", "M"],
    ["𝕹", "N"],
    ["𝕺", "O"],
    ["𝕻", "P"],
    ["𝕼", "Q"],
    ["𝕽", "R"],
    ["𝕾", "S"],
    ["𝕿", "T"],
    ["𝖀", "U"],
    ["𝖁", "V"],
    ["𝖂", "W"],
    ["𝖃", "X"],
    ["𝖄", "Y"],
    ["𝖅", "Z"],
    ["𝖆", "a"],
    ["𝖇", "b"],
    ["𝖈", "c"],
    ["𝖉", "d"],
    ["𝖊", "e"],
    ["𝖋", "f"],
    ["𝖌", "g"],
    ["𝖍", "h"],
    ["𝖎", "i"],
    ["𝖏", "j"],
    ["𝖐", "k"],
    ["𝖑", "l"],
    ["𝖒", "m"],
    ["𝖓", "n"],
    ["𝖔", "o"],
    ["𝖕", "p"],
    ["𝖖", "q"],
    ["𝖗", "r"],
    ["𝖘", "s"],
    ["𝖙", "t"],
    ["𝖚", "u"],
    ["𝖛", "v"],
    ["𝖜", "w"],
    ["𝖝", "x"],
    ["𝖞", "y"],
    ["𝖟", "z"],
    ["𝖠", "A"],
    ["𝖡", "B"],
    ["𝖢", "C"],
    ["𝖣", "D"],
    ["𝖤", "E"],
    ["𝖥", "F"],
    ["𝖦", "G"],
    ["𝖧", "H"],
    ["𝖨", "I"],
    ["𝖩", "J"],
    ["𝖪", "K"],
    ["𝖫", "L"],
    ["𝖬", "M"],
    ["𝖭", "N"],
    ["𝖮", "O"],
    ["𝖯", "P"],
    ["𝖰", "Q"],
    ["𝖱", "R"],
    ["𝖲", "S"],
    ["𝖳", "T"],
    ["𝖴", "U"],
    ["𝖵", "V"],
    ["𝖶", "W"],
    ["𝖷", "X"],
    ["𝖸", "Y"],
    ["𝖹", "Z"],
    ["𝖺", "a"],
    ["𝖻", "b"],
    ["𝖼", "c"],
    ["𝖽", "d"],
    ["𝖾", "e"],
    ["𝖿", "f"],
    ["𝗀", "g"],
    ["𝗁", "h"],
    ["𝗂", "i"],
    ["𝗃", "j"],
    ["𝗄", "k"],
    ["𝗅", "l"],
    ["𝗆", "m"],
    ["𝗇", "n"],
    ["𝗈", "o"],
    ["𝗉", "p"],
    ["𝗊", "q"],
    ["𝗋", "r"],
    ["𝗌", "s"],
    ["𝗍", "t"],
    ["𝗎", "u"],
    ["𝗏", "v"],
    ["𝗐", "w"],
    ["𝗑", "x"],
    ["𝗒", "y"],
    ["𝗓", "z"],
    ["𝗔", "A"],
    ["𝗕", "B"],
    ["𝗖", "C"],
    ["𝗗", "D"],
    ["𝗘", "E"],
    ["𝗙", "F"],
    ["𝗚", "G"],
    ["𝗛", "H"],
    ["𝗜", "I"],
    ["𝗝", "J"],
    ["𝗞", "K"],
    ["𝗟", "L"],
    ["𝗠", "M"],
    ["𝗡", "N"],
    ["𝗢", "O"],
    ["𝗣", "P"],
    ["𝗤", "Q"],
    ["𝗥", "R"],
    ["𝗦", "S"],
    ["𝗧", "T"],
    ["𝗨", "U"],
    ["𝗩", "V"],
    ["𝗪", "W"],
    ["𝗫", "X"],
    ["𝗬", "Y"],
    ["𝗭", "Z"],
    ["𝗮", "a"],
    ["𝗯", "b"],
    ["𝗰", "c"],
    ["𝗱", "d"],
    ["𝗲", "e"],
    ["𝗳", "f"],
    ["𝗴", "g"],
    ["𝗵", "h"],
    ["𝗶", "i"],
    ["𝗷", "j"],
    ["𝗸", "k"],
    ["𝗹", "l"],
    ["𝗺", "m"],
    ["𝗻", "n"],
    ["𝗼", "o"],
    ["𝗽", "p"],
    ["𝗾", "q"],
    ["𝗿", "r"],
    ["𝘀", "s"],
    ["𝘁", "t"],
    ["𝘂", "u"],
    ["𝘃", "v"],
    ["𝘄", "w"],
    ["𝘅", "x"],
    ["𝘆", "y"],
    ["𝘇", "z"],
    ["𝘈", "A"],
    ["𝘉", "B"],
    ["𝘊", "C"],
    ["𝘋", "D"],
    ["𝘌", "E"],
    ["𝘍", "F"],
    ["𝘎", "G"],
    ["𝘏", "H"],
    ["𝘐", "I"],
    ["𝘑", "J"],
    ["𝘒", "K"],
    ["𝘓", "L"],
    ["𝘔", "M"],
    ["𝘕", "N"],
    ["𝘖", "O"],
    ["𝘗", "P"],
    ["𝘘", "Q"],
    ["𝘙", "R"],
    ["𝘚", "S"],
    ["𝘛", "T"],
    ["𝘜", "U"],
    ["𝘝", "V"],
    ["𝘞", "W"],
    ["𝘟", "X"],
    ["𝘠", "Y"],
    ["𝘡", "Z"],
    ["𝘢", "a"],
    ["𝘣", "b"],
    ["𝘤", "c"],
    ["𝘥", "d"],
    ["𝘦", "e"],
    ["𝘧", "f"],
    ["𝘨", "g"],
    ["𝘩", "h"],
    ["𝘪", "i"],
    ["𝘫", "j"],
    ["𝘬", "k"],
    ["𝘭", "l"],
    ["𝘮", "m"],
    ["𝘯", "n"],
    ["𝘰", "o"],
    ["𝘱", "p"],
    ["𝘲", "q"],
    ["𝘳", "r"],
    ["𝘴", "s"],
    ["𝘵", "t"],
    ["𝘶", "u"],
    ["𝘷", "v"],
    ["𝘸", "w"],
    ["𝘹", "x"],
    ["𝘺", "y"],
    ["𝘻", "z"],
    ["𝘼", "A"],
    ["𝘽", "B"],
    ["𝘾", "C"],
    ["𝘿", "D"],
    ["𝙀", "E"],
    ["𝙁", "F"],
    ["𝙂", "G"],
    ["𝙃", "H"],
    ["𝙄", "I"],
    ["𝙅", "J"],
    ["𝙆", "K"],
    ["𝙇", "L"],
    ["𝙈", "M"],
    ["𝙉", "N"],
    ["𝙊", "O"],
    ["𝙋", "P"],
    ["𝙌", "Q"],
    ["𝙍", "R"],
    ["𝙎", "S"],
    ["𝙏", "T"],
    ["𝙐", "U"],
    ["𝙑", "V"],
    ["𝙒", "W"],
    ["𝙓", "X"],
    ["𝙔", "Y"],
    ["𝙕", "Z"],
    ["𝙖", "a"],
    ["𝙗", "b"],
    ["𝙘", "c"],
    ["𝙙", "d"],
    ["𝙚", "e"],
    ["𝙛", "f"],
    ["𝙜", "g"],
    ["𝙝", "h"],
    ["𝙞", "i"],
    ["𝙟", "j"],
    ["𝙠", "k"],
    ["𝙡", "l"],
    ["𝙢", "m"],
    ["𝙣", "n"],
    ["𝙤", "o"],
    ["𝙥", "p"],
    ["𝙦", "q"],
    ["𝙧", "r"],
    ["𝙨", "s"],
    ["𝙩", "t"],
    ["𝙪", "u"],
    ["𝙫", "v"],
    ["𝙬", "w"],
    ["𝙭", "x"],
    ["𝙮", "y"],
    ["𝙯", "z"],
    ["𝙰", "A"],
    ["𝙱", "B"],
    ["𝙲", "C"],
    ["𝙳", "D"],
    ["𝙴", "E"],
    ["𝙵", "F"],
    ["𝙶", "G"],
    ["𝙷", "H"],
    ["𝙸", "I"],
    ["𝙹", "J"],
    ["𝙺", "K"],
    ["𝙻", "L"],
    ["𝙼", "M"],
    ["𝙽", "N"],
    ["𝙾", "O"],
    ["𝙿", "P"],
    ["𝚀", "Q"],
    ["𝚁", "R"],
    ["𝚂", "S"],
    ["𝚃", "T"],
    ["𝚄", "U"],
    ["𝚅", "V"],
    ["𝚆", "W"],
    ["𝚇", "X"],
    ["𝚈", "Y"],
    ["𝚉", "Z"],
    ["𝚊", "a"],
    ["𝚋", "b"],
    ["𝚌", "c"],
    ["𝚍", "d"],
    ["𝚎", "e"],
    ["𝚏", "f"],
    ["𝚐", "g"],
    ["𝚑", "h"],
    ["𝚒", "i"],
    ["𝚓", "j"],
    ["𝚔", "k"],
    ["𝚕", "l"],
    ["𝚖", "m"],
    ["𝚗", "n"],
    ["𝚘", "o"],
    ["𝚙", "p"],
    ["𝚚", "q"],
    ["𝚛", "r"],
    ["𝚜", "s"],
    ["𝚝", "t"],
    ["𝚞", "u"],
    ["𝚟", "v"],
    ["𝚠", "w"],
    ["𝚡", "x"],
    ["𝚢", "y"],
    ["𝚣", "z"],
    ["𝚤", "l"],
    ["𝚥", "j"],
    ["𝛢", "A"],
    ["𝛣", "B"],
    ["𝛤", "G"],
    ["𝛥", "D"],
    ["𝛦", "E"],
    ["𝛧", "Z"],
    ["𝛨", "I"],
    ["𝛩", "TH"],
    ["𝛪", "I"],
    ["𝛫", "K"],
    ["𝛬", "L"],
    ["𝛭", "M"],
    ["𝛮", "N"],
    ["𝛯", "KS"],
    ["𝛰", "O"],
    ["𝛱", "P"],
    ["𝛲", "R"],
    ["𝛳", "TH"],
    ["𝛴", "S"],
    ["𝛵", "T"],
    ["𝛶", "Y"],
    ["𝛷", "F"],
    ["𝛸", "x"],
    ["𝛹", "PS"],
    ["𝛺", "O"],
    ["𝛻", "D"],
    ["𝛼", "a"],
    ["𝛽", "b"],
    ["𝛾", "g"],
    ["𝛿", "d"],
    ["𝜀", "e"],
    ["𝜁", "z"],
    ["𝜂", "i"],
    ["𝜃", "th"],
    ["𝜄", "i"],
    ["𝜅", "k"],
    ["𝜆", "l"],
    ["𝜇", "m"],
    ["𝜈", "n"],
    ["𝜉", "ks"],
    ["𝜊", "o"],
    ["𝜋", "p"],
    ["𝜌", "r"],
    ["𝜍", "s"],
    ["𝜎", "s"],
    ["𝜏", "t"],
    ["𝜐", "y"],
    ["𝜑", "f"],
    ["𝜒", "x"],
    ["𝜓", "ps"],
    ["𝜔", "o"],
    ["𝜕", "d"],
    ["𝜖", "E"],
    ["𝜗", "TH"],
    ["𝜘", "K"],
    ["𝜙", "f"],
    ["𝜚", "r"],
    ["𝜛", "p"],
    ["𝜜", "A"],
    ["𝜝", "V"],
    ["𝜞", "G"],
    ["𝜟", "D"],
    ["𝜠", "E"],
    ["𝜡", "Z"],
    ["𝜢", "I"],
    ["𝜣", "TH"],
    ["𝜤", "I"],
    ["𝜥", "K"],
    ["𝜦", "L"],
    ["𝜧", "M"],
    ["𝜨", "N"],
    ["𝜩", "KS"],
    ["𝜪", "O"],
    ["𝜫", "P"],
    ["𝜬", "S"],
    ["𝜭", "TH"],
    ["𝜮", "S"],
    ["𝜯", "T"],
    ["𝜰", "Y"],
    ["𝜱", "F"],
    ["𝜲", "X"],
    ["𝜳", "PS"],
    ["𝜴", "O"],
    ["𝜵", "D"],
    ["𝜶", "a"],
    ["𝜷", "v"],
    ["𝜸", "g"],
    ["𝜹", "d"],
    ["𝜺", "e"],
    ["𝜻", "z"],
    ["𝜼", "i"],
    ["𝜽", "th"],
    ["𝜾", "i"],
    ["𝜿", "k"],
    ["𝝀", "l"],
    ["𝝁", "m"],
    ["𝝂", "n"],
    ["𝝃", "ks"],
    ["𝝄", "o"],
    ["𝝅", "p"],
    ["𝝆", "r"],
    ["𝝇", "s"],
    ["𝝈", "s"],
    ["𝝉", "t"],
    ["𝝊", "y"],
    ["𝝋", "f"],
    ["𝝌", "x"],
    ["𝝍", "ps"],
    ["𝝎", "o"],
    ["𝝏", "a"],
    ["𝝐", "e"],
    ["𝝑", "i"],
    ["𝝒", "k"],
    ["𝝓", "f"],
    ["𝝔", "r"],
    ["𝝕", "p"],
    ["𝝖", "A"],
    ["𝝗", "B"],
    ["𝝘", "G"],
    ["𝝙", "D"],
    ["𝝚", "E"],
    ["𝝛", "Z"],
    ["𝝜", "I"],
    ["𝝝", "TH"],
    ["𝝞", "I"],
    ["𝝟", "K"],
    ["𝝠", "L"],
    ["𝝡", "M"],
    ["𝝢", "N"],
    ["𝝣", "KS"],
    ["𝝤", "O"],
    ["𝝥", "P"],
    ["𝝦", "R"],
    ["𝝧", "TH"],
    ["𝝨", "S"],
    ["𝝩", "T"],
    ["𝝪", "Y"],
    ["𝝫", "F"],
    ["𝝬", "X"],
    ["𝝭", "PS"],
    ["𝝮", "O"],
    ["𝝯", "D"],
    ["𝝰", "a"],
    ["𝝱", "v"],
    ["𝝲", "g"],
    ["𝝳", "d"],
    ["𝝴", "e"],
    ["𝝵", "z"],
    ["𝝶", "i"],
    ["𝝷", "th"],
    ["𝝸", "i"],
    ["𝝹", "k"],
    ["𝝺", "l"],
    ["𝝻", "m"],
    ["𝝼", "n"],
    ["𝝽", "ks"],
    ["𝝾", "o"],
    ["𝝿", "p"],
    ["𝞀", "r"],
    ["𝞁", "s"],
    ["𝞂", "s"],
    ["𝞃", "t"],
    ["𝞄", "y"],
    ["𝞅", "f"],
    ["𝞆", "x"],
    ["𝞇", "ps"],
    ["𝞈", "o"],
    ["𝞉", "a"],
    ["𝞊", "e"],
    ["𝞋", "i"],
    ["𝞌", "k"],
    ["𝞍", "f"],
    ["𝞎", "r"],
    ["𝞏", "p"],
    ["𝞐", "A"],
    ["𝞑", "V"],
    ["𝞒", "G"],
    ["𝞓", "D"],
    ["𝞔", "E"],
    ["𝞕", "Z"],
    ["𝞖", "I"],
    ["𝞗", "TH"],
    ["𝞘", "I"],
    ["𝞙", "K"],
    ["𝞚", "L"],
    ["𝞛", "M"],
    ["𝞜", "N"],
    ["𝞝", "KS"],
    ["𝞞", "O"],
    ["𝞟", "P"],
    ["𝞠", "S"],
    ["𝞡", "TH"],
    ["𝞢", "S"],
    ["𝞣", "T"],
    ["𝞤", "Y"],
    ["𝞥", "F"],
    ["𝞦", "X"],
    ["𝞧", "PS"],
    ["𝞨", "O"],
    ["𝞩", "D"],
    ["𝞪", "av"],
    ["𝞫", "g"],
    ["𝞬", "d"],
    ["𝞭", "e"],
    ["𝞮", "z"],
    ["𝞯", "i"],
    ["𝞰", "i"],
    ["𝞱", "th"],
    ["𝞲", "i"],
    ["𝞳", "k"],
    ["𝞴", "l"],
    ["𝞵", "m"],
    ["𝞶", "n"],
    ["𝞷", "ks"],
    ["𝞸", "o"],
    ["𝞹", "p"],
    ["𝞺", "r"],
    ["𝞻", "s"],
    ["𝞼", "s"],
    ["𝞽", "t"],
    ["𝞾", "y"],
    ["𝞿", "f"],
    ["𝟀", "x"],
    ["𝟁", "ps"],
    ["𝟂", "o"],
    ["𝟃", "a"],
    ["𝟄", "e"],
    ["𝟅", "i"],
    ["𝟆", "k"],
    ["𝟇", "f"],
    ["𝟈", "r"],
    ["𝟉", "p"],
    ["𝟊", "F"],
    ["𝟋", "f"],
    ["⒜", "(a)"],
    ["⒝", "(b)"],
    ["⒞", "(c)"],
    ["⒟", "(d)"],
    ["⒠", "(e)"],
    ["⒡", "(f)"],
    ["⒢", "(g)"],
    ["⒣", "(h)"],
    ["⒤", "(i)"],
    ["⒥", "(j)"],
    ["⒦", "(k)"],
    ["⒧", "(l)"],
    ["⒨", "(m)"],
    ["⒩", "(n)"],
    ["⒪", "(o)"],
    ["⒫", "(p)"],
    ["⒬", "(q)"],
    ["⒭", "(r)"],
    ["⒮", "(s)"],
    ["⒯", "(t)"],
    ["⒰", "(u)"],
    ["⒱", "(v)"],
    ["⒲", "(w)"],
    ["⒳", "(x)"],
    ["⒴", "(y)"],
    ["⒵", "(z)"],
    ["Ⓐ", "(A)"],
    ["Ⓑ", "(B)"],
    ["Ⓒ", "(C)"],
    ["Ⓓ", "(D)"],
    ["Ⓔ", "(E)"],
    ["Ⓕ", "(F)"],
    ["Ⓖ", "(G)"],
    ["Ⓗ", "(H)"],
    ["Ⓘ", "(I)"],
    ["Ⓙ", "(J)"],
    ["Ⓚ", "(K)"],
    ["Ⓛ", "(L)"],
    ["Ⓝ", "(N)"],
    ["Ⓞ", "(O)"],
    ["Ⓟ", "(P)"],
    ["Ⓠ", "(Q)"],
    ["Ⓡ", "(R)"],
    ["Ⓢ", "(S)"],
    ["Ⓣ", "(T)"],
    ["Ⓤ", "(U)"],
    ["Ⓥ", "(V)"],
    ["Ⓦ", "(W)"],
    ["Ⓧ", "(X)"],
    ["Ⓨ", "(Y)"],
    ["Ⓩ", "(Z)"],
    ["ⓐ", "(a)"],
    ["ⓑ", "(b)"],
    ["ⓒ", "(b)"],
    ["ⓓ", "(c)"],
    ["ⓔ", "(e)"],
    ["ⓕ", "(f)"],
    ["ⓖ", "(g)"],
    ["ⓗ", "(h)"],
    ["ⓘ", "(i)"],
    ["ⓙ", "(j)"],
    ["ⓚ", "(k)"],
    ["ⓛ", "(l)"],
    ["ⓜ", "(m)"],
    ["ⓝ", "(n)"],
    ["ⓞ", "(o)"],
    ["ⓟ", "(p)"],
    ["ⓠ", "(q)"],
    ["ⓡ", "(r)"],
    ["ⓢ", "(s)"],
    ["ⓣ", "(t)"],
    ["ⓤ", "(u)"],
    ["ⓥ", "(v)"],
    ["ⓦ", "(w)"],
    ["ⓧ", "(x)"],
    ["ⓨ", "(y)"],
    ["ⓩ", "(z)"],
    ["Ċ", "C"],
    ["ċ", "c"],
    ["Ġ", "G"],
    ["ġ", "g"],
    ["Ħ", "H"],
    ["ħ", "h"],
    ["Ż", "Z"],
    ["ż", "z"],
    ["𝟎", "0"],
    ["𝟏", "1"],
    ["𝟐", "2"],
    ["𝟑", "3"],
    ["𝟒", "4"],
    ["𝟓", "5"],
    ["𝟔", "6"],
    ["𝟕", "7"],
    ["𝟖", "8"],
    ["𝟗", "9"],
    ["𝟘", "0"],
    ["𝟙", "1"],
    ["𝟚", "2"],
    ["𝟛", "3"],
    ["𝟜", "4"],
    ["𝟝", "5"],
    ["𝟞", "6"],
    ["𝟟", "7"],
    ["𝟠", "8"],
    ["𝟡", "9"],
    ["𝟢", "0"],
    ["𝟣", "1"],
    ["𝟤", "2"],
    ["𝟥", "3"],
    ["𝟦", "4"],
    ["𝟧", "5"],
    ["𝟨", "6"],
    ["𝟩", "7"],
    ["𝟪", "8"],
    ["𝟫", "9"],
    ["𝟬", "0"],
    ["𝟭", "1"],
    ["𝟮", "2"],
    ["𝟯", "3"],
    ["𝟰", "4"],
    ["𝟱", "5"],
    ["𝟲", "6"],
    ["𝟳", "7"],
    ["𝟴", "8"],
    ["𝟵", "9"],
    ["𝟶", "0"],
    ["𝟷", "1"],
    ["𝟸", "2"],
    ["𝟹", "3"],
    ["𝟺", "4"],
    ["𝟻", "5"],
    ["𝟼", "6"],
    ["𝟽", "7"],
    ["𝟾", "8"],
    ["𝟿", "9"],
    ["①", "1"],
    ["②", "2"],
    ["③", "3"],
    ["④", "4"],
    ["⑤", "5"],
    ["⑥", "6"],
    ["⑦", "7"],
    ["⑧", "8"],
    ["⑨", "9"],
    ["⑩", "10"],
    ["⑪", "11"],
    ["⑫", "12"],
    ["⑬", "13"],
    ["⑭", "14"],
    ["⑮", "15"],
    ["⑯", "16"],
    ["⑰", "17"],
    ["⑱", "18"],
    ["⑲", "19"],
    ["⑳", "20"],
    ["⑴", "1"],
    ["⑵", "2"],
    ["⑶", "3"],
    ["⑷", "4"],
    ["⑸", "5"],
    ["⑹", "6"],
    ["⑺", "7"],
    ["⑻", "8"],
    ["⑼", "9"],
    ["⑽", "10"],
    ["⑾", "11"],
    ["⑿", "12"],
    ["⒀", "13"],
    ["⒁", "14"],
    ["⒂", "15"],
    ["⒃", "16"],
    ["⒄", "17"],
    ["⒅", "18"],
    ["⒆", "19"],
    ["⒇", "20"],
    ["⒈", "1."],
    ["⒉", "2."],
    ["⒊", "3."],
    ["⒋", "4."],
    ["⒌", "5."],
    ["⒍", "6."],
    ["⒎", "7."],
    ["⒏", "8."],
    ["⒐", "9."],
    ["⒑", "10."],
    ["⒒", "11."],
    ["⒓", "12."],
    ["⒔", "13."],
    ["⒕", "14."],
    ["⒖", "15."],
    ["⒗", "16."],
    ["⒘", "17."],
    ["⒙", "18."],
    ["⒚", "19."],
    ["⒛", "20."],
    ["⓪", "0"],
    ["⓫", "11"],
    ["⓬", "12"],
    ["⓭", "13"],
    ["⓮", "14"],
    ["⓯", "15"],
    ["⓰", "16"],
    ["⓱", "17"],
    ["⓲", "18"],
    ["⓳", "19"],
    ["⓴", "20"],
    ["⓵", "1"],
    ["⓶", "2"],
    ["⓷", "3"],
    ["⓸", "4"],
    ["⓹", "5"],
    ["⓺", "6"],
    ["⓻", "7"],
    ["⓼", "8"],
    ["⓽", "9"],
    ["⓾", "10"],
    ["⓿", "0"],
    ["🙰", "&"],
    ["🙱", "&"],
    ["🙲", "&"],
    ["🙳", "&"],
    ["🙴", "&"],
    ["🙵", "&"],
    ["🙶", '"'],
    ["🙷", '"'],
    ["🙸", '"'],
    ["‽", "?!"],
    ["🙹", "?!"],
    ["🙺", "?!"],
    ["🙻", "?!"],
    ["🙼", "/"],
    ["🙽", "\\"],
    ["🜇", "AR"],
    ["🜈", "V"],
    ["🜉", "V"],
    ["🜆", "VR"],
    ["🜅", "VF"],
    ["🜩", "2"],
    ["🜪", "5"],
    ["🝡", "f"],
    ["🝢", "W"],
    ["🝣", "U"],
    ["🝧", "V"],
    ["🝨", "T"],
    ["🝪", "V"],
    ["🝫", "MB"],
    ["🝬", "VB"],
    ["🝲", "3B"],
    ["🝳", "3B"],
    ["💯", "100"],
    ["🔙", "BACK"],
    ["🔚", "END"],
    ["🔛", "ON!"],
    ["🔜", "SOON"],
    ["🔝", "TOP"],
    ["🔞", "18"],
    ["🔤", "abc"],
    ["🔠", "ABCD"],
    ["🔡", "abcd"],
    ["🔢", "1234"],
    ["🔣", "T&@%"],
    ["#️⃣", "#"],
    ["*️⃣", "*"],
    ["0️⃣", "0"],
    ["1️⃣", "1"],
    ["2️⃣", "2"],
    ["3️⃣", "3"],
    ["4️⃣", "4"],
    ["5️⃣", "5"],
    ["6️⃣", "6"],
    ["7️⃣", "7"],
    ["8️⃣", "8"],
    ["9️⃣", "9"],
    ["🔟", "10"],
    ["🅰️", "A"],
    ["🅱️", "B"],
    ["🆎", "AB"],
    ["🆑", "CL"],
    ["🅾️", "O"],
    ["🅿", "P"],
    ["🆘", "SOS"],
    ["🅲", "C"],
    ["🅳", "D"],
    ["🅴", "E"],
    ["🅵", "F"],
    ["🅶", "G"],
    ["🅷", "H"],
    ["🅸", "I"],
    ["🅹", "J"],
    ["🅺", "K"],
    ["🅻", "L"],
    ["🅼", "M"],
    ["🅽", "N"],
    ["🆀", "Q"],
    ["🆁", "R"],
    ["🆂", "S"],
    ["🆃", "T"],
    ["🆄", "U"],
    ["🆅", "V"],
    ["🆆", "W"],
    ["🆇", "X"],
    ["🆈", "Y"],
    ["🆉", "Z"],
  ],
  rx = (n, e) => {
    for (const [t, r] of e) n = n.replace(new RegExp(rl(t), "g"), r);
    return n;
  };
function ix(n, e) {
  if (typeof n != "string")
    throw new TypeError(`Expected a string, got \`${typeof n}\``);
  e = { customReplacements: [], ...e };
  const t = new Map([...nx, ...e.customReplacements]);
  return (
    (n = n.normalize()),
    (n = rx(n, t)),
    (n = n
      .normalize("NFD")
      .replace(new RegExp("\\p{Diacritic}", "gu"), "")
      .normalize()),
    n
  );
}
const sx = [
    ["&", " and "],
    ["🦄", " unicorn "],
    ["♥", " love "],
  ],
  ox = (n) =>
    n
      .replace(/([A-Z]{2,})(\d+)/g, "$1 $2")
      .replace(/([a-z\d]+)([A-Z]{2,})/g, "$1 $2")
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-rt-z\d]+)/g, "$1 $2"),
  lx = (n, e) => {
    const t = rl(e);
    return n
      .replace(new RegExp(`${t}{2,}`, "g"), e)
      .replace(new RegExp(`^${t}|${t}$`, "g"), "");
  },
  ax = (n) => {
    let e = "a-z\\d";
    if (((e += n.lowercase ? "" : "A-Z"), n.preserveCharacters.length > 0))
      for (const t of n.preserveCharacters) {
        if (t === n.separator)
          throw new Error(
            `The separator character \`${n.separator}\` cannot be included in preserved characters: ${n.preserveCharacters}`,
          );
        e += rl(t);
      }
    return new RegExp(`[^${e}]+`, "g");
  };
function cx(n, e) {
  if (typeof n != "string")
    throw new TypeError(`Expected a string, got \`${typeof n}\``);
  e = {
    separator: "-",
    lowercase: !0,
    decamelize: !0,
    customReplacements: [],
    preserveLeadingUnderscore: !1,
    preserveTrailingDash: !1,
    preserveCharacters: [],
    ...e,
  };
  const t = e.preserveLeadingUnderscore && n.startsWith("_"),
    r = e.preserveTrailingDash && n.endsWith("-"),
    i = new Map([...sx, ...e.customReplacements]);
  (n = ix(n, { customReplacements: i })), e.decamelize && (n = ox(n));
  const s = ax(e);
  return (
    e.lowercase && (n = n.toLowerCase()),
    (n = n.replace(/([a-zA-Z\d]+)'([ts])(\s|$)/g, "$1$2$3")),
    (n = n.replace(s, e.separator)),
    (n = n.replace(/\\/g, "")),
    e.separator && (n = lx(n, e.separator)),
    t && (n = `_${n}`),
    r && (n = `${n}-`),
    n
  );
}
function ux(n, e) {
  return function (t, r) {
    let { $from: i, $to: s, node: o } = t.selection;
    if ((o && o.isBlock) || i.depth < 2 || !i.sameParent(s)) return !1;
    let l = i.node(-1);
    if (l.type != n) return !1;
    if (
      i.parent.content.size == 0 &&
      i.node(-1).childCount == i.indexAfter(-1)
    ) {
      if (
        i.depth == 3 ||
        i.node(-3).type != n ||
        i.index(-2) != i.node(-2).childCount - 1
      )
        return !1;
      if (r) {
        let h = C.empty,
          d = i.index(-1) ? 1 : i.index(-2) ? 2 : 3;
        for (let k = i.depth - d; k >= i.depth - 3; k--)
          h = C.from(i.node(k).copy(h));
        let f =
          i.indexAfter(-1) < i.node(-2).childCount
            ? 1
            : i.indexAfter(-2) < i.node(-3).childCount
              ? 2
              : 3;
        h = h.append(C.from(n.createAndFill()));
        let p = i.before(i.depth - (d - 1)),
          y = t.tr.replace(p, i.after(-f), new T(h, 4 - d, 0)),
          x = -1;
        y.doc.nodesBetween(p, y.doc.content.size, (k, E) => {
          if (x > -1) return !1;
          k.isTextblock && k.content.size == 0 && (x = E + 1);
        }),
          x > -1 && y.setSelection(H.near(y.doc.resolve(x))),
          r(y.scrollIntoView());
      }
      return !0;
    }
    let a = s.pos == i.end() ? l.contentMatchAt(0).defaultType : null,
      c = t.tr.delete(i.pos, s.pos),
      u = a ? [null, { type: a }] : void 0;
    return Ar(c.doc, i.pos, 2, u)
      ? (r && r(c.split(i.pos, 2, u).scrollIntoView()), !0)
      : !1;
  };
}
function Yh(n) {
  return function (e, t) {
    let { $from: r, $to: i } = e.selection,
      s = r.blockRange(i, (o) => o.childCount > 0 && o.firstChild.type == n);
    return s
      ? t
        ? r.node(s.depth - 1).type == n
          ? hx(e, t, n, s)
          : fx(e, t, s)
        : !0
      : !1;
  };
}
function hx(n, e, t, r) {
  let i = n.tr,
    s = r.end,
    o = r.$to.end(r.depth);
  s < o &&
    (i.step(
      new ke(
        s - 1,
        o,
        s,
        o,
        new T(C.from(t.create(null, r.parent.copy())), 1, 0),
        1,
        !0,
      ),
    ),
    (r = new qc(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth)));
  const l = Qi(r);
  if (l == null) return !1;
  i.lift(r, l);
  let a = i.mapping.map(s, -1) - 1;
  return Zi(i.doc, a) && i.join(a), e(i.scrollIntoView()), !0;
}
function fx(n, e, t) {
  let r = n.tr,
    i = t.parent;
  for (let f = t.end, p = t.endIndex - 1, y = t.startIndex; p > y; p--)
    (f -= i.child(p).nodeSize), r.delete(f - 1, f + 1);
  let s = r.doc.resolve(t.start),
    o = s.nodeAfter;
  if (r.mapping.map(t.end) != t.start + s.nodeAfter.nodeSize) return !1;
  let l = t.startIndex == 0,
    a = t.endIndex == i.childCount,
    c = s.node(-1),
    u = s.index(-1);
  if (
    !c.canReplace(
      u + (l ? 0 : 1),
      u + 1,
      o.content.append(a ? C.empty : C.from(i)),
    )
  )
    return !1;
  let h = s.pos,
    d = h + o.nodeSize;
  return (
    r.step(
      new ke(
        h - (l ? 1 : 0),
        d + (a ? 1 : 0),
        h + 1,
        d - 1,
        new T(
          (l ? C.empty : C.from(i.copy(C.empty))).append(
            a ? C.empty : C.from(i.copy(C.empty)),
          ),
          l ? 0 : 1,
          a ? 0 : 1,
        ),
        l ? 0 : 1,
      ),
    ),
    e(r.scrollIntoView()),
    !0
  );
}
function dx(n) {
  return function (e, t) {
    let { $from: r, $to: i } = e.selection,
      s = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!s) return !1;
    let o = s.startIndex;
    if (o == 0) return !1;
    let l = s.parent,
      a = l.child(o - 1);
    if (a.type != n) return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type,
        u = C.from(c ? n.create() : null),
        h = new T(
          C.from(n.create(null, C.from(l.type.create(null, u)))),
          c ? 3 : 1,
          0,
        ),
        d = s.start,
        f = s.end;
      t(e.tr.step(new ke(d - (c ? 3 : 1), f, d, f, h, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function px(n) {
  const e = new Map();
  if (!n || !n.type) throw new Error("mdast-util-definitions expected node");
  return (
    Yn(n, "definition", function (r) {
      const i = Ec(r.identifier);
      i && !e.get(i) && e.set(i, r);
    }),
    t
  );
  function t(r) {
    const i = Ec(r);
    return e.get(i);
  }
}
function Ec(n) {
  return String(n || "").toUpperCase();
}
function mx() {
  return function (n) {
    const e = px(n);
    Yn(n, function (t, r, i) {
      if (t.type === "definition" && i !== void 0 && typeof r == "number")
        return i.children.splice(r, 1), [no, r];
      if (t.type === "imageReference" || t.type === "linkReference") {
        const s = e(t.identifier);
        if (s && i && typeof r == "number")
          return (
            (i.children[r] =
              t.type === "imageReference"
                ? { type: "image", url: s.url, title: s.title, alt: t.alt }
                : {
                    type: "link",
                    url: s.url,
                    title: s.title,
                    children: t.children,
                  }),
            [no, r]
          );
      }
    });
  };
}
function Gh(n, e) {
  var t;
  if (
    !(
      e.childCount >= 1 &&
      ((t = e.lastChild) == null ? void 0 : t.type.name) === "hardbreak"
    )
  ) {
    n.next(e.content);
    return;
  }
  const r = [];
  e.content.forEach((i, s, o) => {
    o !== e.childCount - 1 && r.push(i);
  }),
    n.next(C.fromArray(r));
}
function S(n, e) {
  return (
    Object.assign(n, {
      meta: { package: "@milkdown/preset-commonmark", ...e },
    }),
    n
  );
}
const il = ls("emphasis");
S(il, { displayName: "Attr<emphasis>", group: "Emphasis" });
const Gn = ss("emphasis", (n) => ({
  attrs: { marker: { default: n.get(Pr).emphasis || "*" } },
  parseDOM: [
    { tag: "i" },
    { tag: "em" },
    { style: "font-style", getAttrs: (e) => e === "italic" },
  ],
  toDOM: (e) => ["em", n.get(il.key)(e)],
  parseMarkdown: {
    match: (e) => e.type === "emphasis",
    runner: (e, t, r) => {
      e.openMark(r, { marker: t.marker }), e.next(t.children), e.closeMark(r);
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "emphasis",
    runner: (e, t) => {
      e.withMark(t, "emphasis", void 0, { marker: t.attrs.marker });
    },
  },
}));
S(Gn.mark, { displayName: "MarkSchema<emphasis>", group: "Emphasis" });
S(Gn.ctx, { displayName: "MarkSchemaCtx<emphasis>", group: "Emphasis" });
const sl = re("ToggleEmphasis", (n) => () => Jo(Gn.type(n)));
S(sl, { displayName: "Command<toggleEmphasisCommand>", group: "Emphasis" });
const Qh = Ue((n) =>
  es(/(?:^|[^*])\*([^*]+)\*$/, Gn.type(n), {
    getAttr: () => ({ marker: "*" }),
    updateCaptured: ({ fullMatch: e, start: t }) =>
      e.startsWith("*") ? {} : { fullMatch: e.slice(1), start: t + 1 },
  }),
);
S(Qh, { displayName: "InputRule<emphasis>|Star", group: "Emphasis" });
const Zh = Ue((n) =>
  es(/(?:^|[^_])_([^_]+)_$/, Gn.type(n), {
    getAttr: () => ({ marker: "_" }),
    updateCaptured: ({ fullMatch: e, start: t }) =>
      e.startsWith("_") ? {} : { fullMatch: e.slice(1), start: t + 1 },
  }),
);
S(Zh, { displayName: "InputRule<emphasis>|Underscore", group: "Emphasis" });
const ol = Ge("emphasisKeymap", {
  ToggleEmphasis: {
    shortcuts: "Mod-i",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(sl.key);
    },
  },
});
S(ol.ctx, { displayName: "KeymapCtx<emphasis>", group: "Emphasis" });
S(ol.shortcuts, { displayName: "Keymap<emphasis>", group: "Emphasis" });
const ll = ls("strong");
S(ll, { displayName: "Attr<strong>", group: "Strong" });
const Zr = ss("strong", (n) => ({
  attrs: { marker: { default: n.get(Pr).strong || "*" } },
  parseDOM: [
    { tag: "b" },
    { tag: "strong" },
    { style: "font-style", getAttrs: (e) => e === "bold" },
  ],
  toDOM: (e) => ["strong", n.get(ll.key)(e)],
  parseMarkdown: {
    match: (e) => e.type === "strong",
    runner: (e, t, r) => {
      e.openMark(r, { marker: t.marker }), e.next(t.children), e.closeMark(r);
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "strong",
    runner: (e, t) => {
      e.withMark(t, "strong", void 0, { marker: t.attrs.marker });
    },
  },
}));
S(Zr.mark, { displayName: "MarkSchema<strong>", group: "Strong" });
S(Zr.ctx, { displayName: "MarkSchemaCtx<strong>", group: "Strong" });
const al = re("ToggleStrong", (n) => () => Jo(Zr.type(n)));
S(al, { displayName: "Command<toggleStrongCommand>", group: "Strong" });
const Xh = Ue((n) =>
  es(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, Zr.type(n), {
    getAttr: (e) => ({ marker: e[0].startsWith("*") ? "*" : "_" }),
  }),
);
S(Xh, { displayName: "InputRule<strong>", group: "Strong" });
const cl = Ge("strongKeymap", {
  ToggleBold: {
    shortcuts: ["Mod-b"],
    command: (n) => {
      const e = n.get(X);
      return () => e.call(al.key);
    },
  },
});
S(cl.ctx, { displayName: "KeymapCtx<strong>", group: "Strong" });
S(cl.shortcuts, { displayName: "Keymap<strong>", group: "Strong" });
const ul = ls("inlineCode");
S(ul, { displayName: "Attr<inlineCode>", group: "InlineCode" });
const Bt = ss("inlineCode", (n) => ({
  priority: 100,
  code: !0,
  inclusive: !1,
  parseDOM: [{ tag: "code" }],
  toDOM: (e) => ["code", n.get(ul.key)(e)],
  parseMarkdown: {
    match: (e) => e.type === "inlineCode",
    runner: (e, t, r) => {
      e.openMark(r), e.addText(t.value), e.closeMark(r);
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "inlineCode",
    runner: (e, t, r) => {
      e.withMark(t, "inlineCode", r.text || "");
    },
  },
}));
S(Bt.mark, { displayName: "MarkSchema<inlineCode>", group: "InlineCode" });
S(Bt.ctx, { displayName: "MarkSchemaCtx<inlineCode>", group: "InlineCode" });
const hl = re("ToggleInlineCode", (n) => () => (e, t) => {
  const { selection: r, tr: i } = e;
  if (r.empty) return !1;
  const { from: s, to: o } = r;
  return e.doc.rangeHasMark(s, o, Bt.type(n))
    ? (t == null || t(i.removeMark(s, o, Bt.type(n))), !0)
    : (Object.keys(e.schema.marks)
        .filter((l) => l !== Bt.type.name)
        .map((l) => e.schema.marks[l])
        .forEach((l) => {
          i.removeMark(s, o, l);
        }),
      t == null || t(i.addMark(s, o, Bt.type(n).create())),
      !0);
});
S(hl, { displayName: "Command<toggleInlineCodeCommand>", group: "InlineCode" });
const ef = Ue((n) => es(/(?:`)([^`]+)(?:`)$/, Bt.type(n)));
S(ef, { displayName: "InputRule<inlineCodeInputRule>", group: "InlineCode" });
const fl = Ge("inlineCodeKeymap", {
  ToggleInlineCode: {
    shortcuts: "Mod-e",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(hl.key);
    },
  },
});
S(fl.ctx, { displayName: "KeymapCtx<inlineCode>", group: "InlineCode" });
S(fl.shortcuts, { displayName: "Keymap<inlineCode>", group: "InlineCode" });
const dl = ls("link");
S(dl, { displayName: "Attr<link>", group: "Link" });
const Wn = ss("link", (n) => ({
  attrs: { href: {}, title: { default: null } },
  parseDOM: [
    {
      tag: "a[href]",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw gn(e);
        return { href: e.getAttribute("href"), title: e.getAttribute("title") };
      },
    },
  ],
  toDOM: (e) => ["a", { ...n.get(dl.key)(e), ...e.attrs }],
  parseMarkdown: {
    match: (e) => e.type === "link",
    runner: (e, t, r) => {
      const i = t.url,
        s = t.title;
      e.openMark(r, { href: i, title: s }), e.next(t.children), e.closeMark(r);
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "link",
    runner: (e, t) => {
      e.withMark(t, "link", void 0, {
        title: t.attrs.title,
        url: t.attrs.href,
      });
    },
  },
}));
S(Wn.mark, { displayName: "MarkSchema<link>", group: "Link" });
const tf = re(
  "ToggleLink",
  (n) =>
    (e = {}) =>
      Jo(Wn.type(n), e),
);
S(tf, { displayName: "Command<toggleLinkCommand>", group: "Link" });
const nf = re("UpdateLink", (n) => (e = {}) => (t, r) => {
  if (!r) return !1;
  let i,
    s = -1;
  const { selection: o } = t,
    { from: l, to: a } = o;
  if (
    (t.doc.nodesBetween(l, l === a ? a + 1 : a, (p, y) => {
      if (Wn.type(n).isInSet(p.marks)) return (i = p), (s = y), !1;
    }),
    !i)
  )
    return !1;
  const c = i.marks.find(({ type: p }) => p === Wn.type(n));
  if (!c) return !1;
  const u = s,
    h = s + i.nodeSize,
    { tr: d } = t,
    f = Wn.type(n).create({ ...c.attrs, ...e });
  return f
    ? (r(
        d
          .removeMark(u, h, c)
          .addMark(u, h, f)
          .setSelection(new J(d.selection.$anchor))
          .scrollIntoView(),
      ),
      !0)
    : !1;
});
S(nf, { displayName: "Command<updateLinkCommand>", group: "Link" });
const rf = nl("doc", () => ({
  content: "block+",
  parseMarkdown: {
    match: ({ type: n }) => n === "root",
    runner: (n, e, t) => {
      n.injectRoot(e, t);
    },
  },
  toMarkdown: {
    match: (n) => n.type.name === "doc",
    runner: (n, e) => {
      n.openNode("root"), n.next(e.content);
    },
  },
}));
S(rf, { displayName: "NodeSchema<doc>", group: "Doc" });
const pl = Qe("paragraph");
S(pl, { displayName: "Attr<paragraph>", group: "Paragraph" });
const kn = Ye("paragraph", (n) => ({
  content: "inline*",
  group: "block",
  parseDOM: [{ tag: "p" }],
  toDOM: (e) => ["p", n.get(pl.key)(e), 0],
  parseMarkdown: {
    match: (e) => e.type === "paragraph",
    runner: (e, t, r) => {
      e.openNode(r),
        t.children ? e.next(t.children) : e.addText(t.value || ""),
        e.closeNode();
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "paragraph",
    runner: (e, t) => {
      e.openNode("paragraph"), Gh(e, t), e.closeNode();
    },
  },
}));
S(kn.node, { displayName: "NodeSchema<paragraph>", group: "Paragraph" });
S(kn.ctx, { displayName: "NodeSchemaCtx<paragraph>", group: "Paragraph" });
const ml = re("TurnIntoText", (n) => () => $r(kn.type(n)));
S(ml, { displayName: "Command<turnIntoTextCommand>", group: "Paragraph" });
const gl = Ge("paragraphKeymap", {
  TurnIntoText: {
    shortcuts: "Mod-Alt-0",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(ml.key);
    },
  },
});
S(gl.ctx, { displayName: "KeymapCtx<paragraph>", group: "Paragraph" });
S(gl.shortcuts, { displayName: "Keymap<paragraph>", group: "Paragraph" });
const gx = Array(6)
  .fill(0)
  .map((n, e) => e + 1);
function yx(n) {
  return cx(n.textContent);
}
const as = Ut(yx, "headingIdGenerator");
S(as, { displayName: "Ctx<HeadingIdGenerator>", group: "Heading" });
const yl = Qe("heading");
S(yl, { displayName: "Attr<heading>", group: "Heading" });
const xn = Ye("heading", (n) => {
  const e = n.get(as.key);
  return {
    content: "inline*",
    group: "block",
    defining: !0,
    attrs: { id: { default: "" }, level: { default: 1 } },
    parseDOM: gx.map((t) => ({
      tag: `h${t}`,
      getAttrs: (r) => {
        if (!(r instanceof HTMLElement)) throw gn(r);
        return { level: t, id: r.id };
      },
    })),
    toDOM: (t) => [
      `h${t.attrs.level}`,
      { ...n.get(yl.key)(t), id: t.attrs.id || e(t) },
      0,
    ],
    parseMarkdown: {
      match: ({ type: t }) => t === "heading",
      runner: (t, r, i) => {
        const s = r.depth;
        t.openNode(i, { level: s }), t.next(r.children), t.closeNode();
      },
    },
    toMarkdown: {
      match: (t) => t.type.name === "heading",
      runner: (t, r) => {
        t.openNode("heading", void 0, { depth: r.attrs.level }),
          Gh(t, r),
          t.closeNode();
      },
    },
  };
});
S(xn.node, { displayName: "NodeSchema<heading>", group: "Heading" });
S(xn.ctx, { displayName: "NodeSchemaCtx<heading>", group: "Heading" });
const sf = Ue((n) =>
  Ku(/^(?<hashes>#+)\s$/, xn.type(n), (e) => {
    var t, r;
    const i =
        ((r = (t = e.groups) == null ? void 0 : t.hashes) == null
          ? void 0
          : r.length) || 0,
      s = n.get(zr),
      { $from: o } = s.state.selection,
      l = o.node();
    if (l.type.name === "heading") {
      let a = Number(l.attrs.level) + Number(i);
      return a > 6 && (a = 6), { level: a };
    }
    return { level: i };
  }),
);
S(sf, { displayName: "InputRule<wrapInHeadingInputRule>", group: "Heading" });
const Dt = re(
  "WrapInHeading",
  (n) => (e) => (
    e ?? (e = 1), e < 1 ? $r(kn.type(n)) : $r(xn.type(n), { level: e })
  ),
);
S(Dt, { displayName: "Command<wrapInHeadingCommand>", group: "Heading" });
const kl = re("DowngradeHeading", (n) => () => (e, t, r) => {
  const { $from: i } = e.selection,
    s = i.node();
  if (s.type !== xn.type(n) || !e.selection.empty || i.parentOffset !== 0)
    return !1;
  const o = s.attrs.level - 1;
  return o
    ? (t == null ||
        t(
          e.tr.setNodeMarkup(e.selection.$from.before(), void 0, {
            ...s.attrs,
            level: o,
          }),
        ),
      !0)
    : $r(kn.type(n))(e, t, r);
});
S(kl, { displayName: "Command<downgradeHeadingCommand>", group: "Heading" });
const xl = Ge("headingKeymap", {
  TurnIntoH1: {
    shortcuts: "Mod-Alt-1",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Dt.key, 1);
    },
  },
  TurnIntoH2: {
    shortcuts: "Mod-Alt-2",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Dt.key, 2);
    },
  },
  TurnIntoH3: {
    shortcuts: "Mod-Alt-3",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Dt.key, 3);
    },
  },
  TurnIntoH4: {
    shortcuts: "Mod-Alt-4",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Dt.key, 4);
    },
  },
  TurnIntoH5: {
    shortcuts: "Mod-Alt-5",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Dt.key, 5);
    },
  },
  TurnIntoH6: {
    shortcuts: "Mod-Alt-6",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Dt.key, 6);
    },
  },
  DowngradeHeading: {
    shortcuts: ["Delete", "Backspace"],
    command: (n) => {
      const e = n.get(X);
      return () => e.call(kl.key);
    },
  },
});
S(xl.ctx, { displayName: "KeymapCtx<heading>", group: "Heading" });
S(xl.shortcuts, { displayName: "Keymap<heading>", group: "Heading" });
const bl = Qe("blockquote");
S(bl, { displayName: "Attr<blockquote>", group: "Blockquote" });
const Xr = Ye("blockquote", (n) => ({
  content: "block+",
  group: "block",
  defining: !0,
  parseDOM: [{ tag: "blockquote" }],
  toDOM: (e) => ["blockquote", n.get(bl.key)(e), 0],
  parseMarkdown: {
    match: ({ type: e }) => e === "blockquote",
    runner: (e, t, r) => {
      e.openNode(r).next(t.children).closeNode();
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "blockquote",
    runner: (e, t) => {
      e.openNode("blockquote").next(t.content).closeNode();
    },
  },
}));
S(Xr.node, { displayName: "NodeSchema<blockquote>", group: "Blockquote" });
S(Xr.ctx, { displayName: "NodeSchemaCtx<blockquote>", group: "Blockquote" });
const of = Ue((n) => qo(/^\s*>\s$/, Xr.type(n)));
S(of, {
  displayName: "InputRule<wrapInBlockquoteInputRule>",
  group: "Blockquote",
});
const Sl = re("WrapInBlockquote", (n) => () => Ko(Xr.type(n)));
S(Sl, { displayName: "Command<wrapInBlockquoteCommand>", group: "Blockquote" });
const wl = Ge("blockquoteKeymap", {
  WrapInBlockquote: {
    shortcuts: "Mod-Shift-b",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Sl.key);
    },
  },
});
S(wl.ctx, { displayName: "KeymapCtx<blockquote>", group: "Blockquote" });
S(wl.shortcuts, { displayName: "Keymap<blockquote>", group: "Blockquote" });
const Cl = Qe("codeBlock", () => ({ pre: {}, code: {} }));
S(Cl, { displayName: "Attr<codeBlock>", group: "CodeBlock" });
const ei = Ye("code_block", (n) => ({
  content: "text*",
  group: "block",
  marks: "",
  defining: !0,
  code: !0,
  attrs: { language: { default: "" } },
  parseDOM: [
    {
      tag: "pre",
      preserveWhitespace: "full",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw gn(e);
        return { language: e.dataset.language };
      },
    },
  ],
  toDOM: (e) => {
    const t = n.get(Cl.key)(e);
    return [
      "pre",
      { ...t.pre, "data-language": e.attrs.language },
      ["code", t.code, 0],
    ];
  },
  parseMarkdown: {
    match: ({ type: e }) => e === "code",
    runner: (e, t, r) => {
      const i = t.lang,
        s = t.value;
      e.openNode(r, { language: i }), s && e.addText(s), e.closeNode();
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "code_block",
    runner: (e, t) => {
      var r;
      e.addNode(
        "code",
        void 0,
        ((r = t.content.firstChild) == null ? void 0 : r.text) || "",
        { lang: t.attrs.language },
      );
    },
  },
}));
S(ei.node, { displayName: "NodeSchema<codeBlock>", group: "CodeBlock" });
S(ei.ctx, { displayName: "NodeSchemaCtx<codeBlock>", group: "CodeBlock" });
const lf = Ue((n) =>
  Ku(/^```(?<language>[a-z]*)?[\s\n]$/, ei.type(n), (e) => {
    var t;
    return { language: ((t = e.groups) == null ? void 0 : t.language) ?? "" };
  }),
);
S(lf, {
  displayName: "InputRule<createCodeBlockInputRule>",
  group: "CodeBlock",
});
const Ml = re(
  "CreateCodeBlock",
  (n) =>
    (e = "") =>
      $r(ei.type(n), { language: e }),
);
S(Ml, { displayName: "Command<createCodeBlockCommand>", group: "CodeBlock" });
const kx = re(
  "UpdateCodeBlockLanguage",
  () =>
    ({ pos: n, language: e } = { pos: -1, language: "" }) =>
    (t, r) =>
      n >= 0
        ? (r == null || r(t.tr.setNodeAttribute(n, "language", e)), !0)
        : !1,
);
S(kx, {
  displayName: "Command<updateCodeBlockLanguageCommand>",
  group: "CodeBlock",
});
const Nl = Ge("codeBlockKeymap", {
  CreateCodeBlock: {
    shortcuts: "Mod-Alt-c",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Ml.key);
    },
  },
});
S(Nl.ctx, { displayName: "KeymapCtx<codeBlock>", group: "CodeBlock" });
S(Nl.shortcuts, { displayName: "Keymap<codeBlock>", group: "CodeBlock" });
const Tl = Qe("image");
S(Tl, { displayName: "Attr<image>", group: "Image" });
const Qn = Ye("image", (n) => ({
  inline: !0,
  group: "inline",
  selectable: !0,
  draggable: !0,
  marks: "",
  atom: !0,
  defining: !0,
  isolating: !0,
  attrs: { src: { default: "" }, alt: { default: "" }, title: { default: "" } },
  parseDOM: [
    {
      tag: "img[src]",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw gn(e);
        return {
          src: e.getAttribute("src") || "",
          alt: e.getAttribute("alt") || "",
          title: e.getAttribute("title") || e.getAttribute("alt") || "",
        };
      },
    },
  ],
  toDOM: (e) => ["img", { ...n.get(Tl.key)(e), ...e.attrs }],
  parseMarkdown: {
    match: ({ type: e }) => e === "image",
    runner: (e, t, r) => {
      const i = t.url,
        s = t.alt,
        o = t.title;
      e.addNode(r, { src: i, alt: s, title: o });
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "image",
    runner: (e, t) => {
      e.addNode("image", void 0, void 0, {
        title: t.attrs.title,
        url: t.attrs.src,
        alt: t.attrs.alt,
      });
    },
  },
}));
S(Qn.node, { displayName: "NodeSchema<image>", group: "Image" });
S(Qn.ctx, { displayName: "NodeSchemaCtx<image>", group: "Image" });
const af = re("InsertImage", (n) => (e = {}) => (t, r) => {
  if (!r) return !0;
  const { src: i = "", alt: s = "", title: o = "" } = e,
    l = Qn.type(n).create({ src: i, alt: s, title: o });
  return l && r(t.tr.replaceSelectionWith(l).scrollIntoView()), !0;
});
S(af, { displayName: "Command<insertImageCommand>", group: "Image" });
const cf = re("UpdateImage", (n) => (e = {}) => (t, r) => {
  const i = Ly(t.selection, Qn.type(n));
  if (!i) return !1;
  const { node: s, pos: o } = i,
    l = { ...s.attrs },
    { src: a, alt: c, title: u } = e;
  return (
    a !== void 0 && (l.src = a),
    c !== void 0 && (l.alt = c),
    u !== void 0 && (l.title = u),
    r == null || r(t.tr.setNodeMarkup(o, void 0, l).scrollIntoView()),
    !0
  );
});
S(cf, { displayName: "Command<updateImageCommand>", group: "Image" });
const xx = Ue(
  (n) =>
    new Je(
      /!\[(?<alt>.*?)]\((?<filename>.*?)\s*(?="|\))"?(?<title>[^"]+)?"?\)/,
      (e, t, r, i) => {
        const [s, o, l = "", a] = t;
        return s
          ? e.tr.replaceWith(
              r,
              i,
              Qn.type(n).create({ src: l, alt: o, title: a }),
            )
          : null;
      },
    ),
);
S(xx, { displayName: "InputRule<insertImageInputRule>", group: "Image" });
const Ji = Qe("hardbreak", (n) => ({
  "data-type": "hardbreak",
  "data-is-inline": n.attrs.isInline,
}));
S(Ji, { displayName: "Attr<hardbreak>", group: "Hardbreak" });
const fn = Ye("hardbreak", (n) => ({
  inline: !0,
  group: "inline",
  attrs: { isInline: { default: !1 } },
  selectable: !1,
  parseDOM: [
    { tag: "br" },
    { tag: 'span[data-type="hardbreak"]', getAttrs: () => ({ isInline: !0 }) },
  ],
  toDOM: (e) =>
    e.attrs.isInline
      ? ["span", n.get(Ji.key)(e), " "]
      : ["br", n.get(Ji.key)(e)],
  parseMarkdown: {
    match: ({ type: e }) => e === "break",
    runner: (e, t, r) => {
      var i;
      e.addNode(r, { isInline: !!((i = t.data) != null && i.isInline) });
    },
  },
  leafText: () => `
`,
  toMarkdown: {
    match: (e) => e.type.name === "hardbreak",
    runner: (e, t) => {
      t.attrs.isInline
        ? e.addNode(
            "text",
            void 0,
            `
`,
          )
        : e.addNode("break");
    },
  },
}));
S(fn.node, { displayName: "NodeSchema<hardbreak>", group: "Hardbreak" });
S(fn.ctx, { displayName: "NodeSchemaCtx<hardbreak>", group: "Hardbreak" });
const Ol = re("InsertHardbreak", (n) => () => (e, t) => {
  var r;
  const { selection: i, tr: s } = e;
  if (!(i instanceof J)) return !1;
  if (i.empty) {
    const o = i.$from.node();
    if (
      o.childCount > 0 &&
      ((r = o.lastChild) == null ? void 0 : r.type.name) === "hardbreak"
    )
      return (
        t == null ||
          t(
            s
              .replaceRangeWith(i.to - 1, i.to, e.schema.node("paragraph"))
              .setSelection(H.near(s.doc.resolve(i.to)))
              .scrollIntoView(),
          ),
        !0
      );
  }
  return (
    t == null ||
      t(
        s
          .setMeta("hardbreak", !0)
          .replaceSelectionWith(fn.type(n).create())
          .scrollIntoView(),
      ),
    !0
  );
});
S(Ol, { displayName: "Command<insertHardbreakCommand>", group: "Hardbreak" });
const Il = Ge("hardbreakKeymap", {
  InsertHardbreak: {
    shortcuts: "Shift-Enter",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Ol.key);
    },
  },
});
S(Il.ctx, { displayName: "KeymapCtx<hardbreak>", group: "Hardbreak" });
S(Il.shortcuts, { displayName: "Keymap<hardbreak>", group: "Hardbreak" });
const El = Qe("hr");
S(El, { displayName: "Attr<hr>", group: "Hr" });
const ti = Ye("hr", (n) => ({
  group: "block",
  parseDOM: [{ tag: "hr" }],
  toDOM: (e) => ["hr", n.get(El.key)(e)],
  parseMarkdown: {
    match: ({ type: e }) => e === "thematicBreak",
    runner: (e, t, r) => {
      e.addNode(r);
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "hr",
    runner: (e) => {
      e.addNode("thematicBreak");
    },
  },
}));
S(ti.node, { displayName: "NodeSchema<hr>", group: "Hr" });
S(ti.ctx, { displayName: "NodeSchemaCtx<hr>", group: "Hr" });
const uf = Ue(
  (n) =>
    new Je(/^(?:---|___\s|\*\*\*\s)$/, (e, t, r, i) => {
      const { tr: s } = e;
      return t[0] && s.replaceWith(r - 1, i, ti.type(n).create()), s;
    }),
);
S(uf, { displayName: "InputRule<insertHrInputRule>", group: "Hr" });
const hf = re("InsertHr", (n) => () => (e, t) => {
  if (!t) return !0;
  const r = kn.node.type(n).create(),
    { tr: i, selection: s } = e,
    { from: o } = s,
    l = ti.type(n).create();
  if (!l) return !0;
  const a = i.replaceSelectionWith(l).insert(o, r),
    c = H.findFrom(a.doc.resolve(o), 1, !0);
  return c && t(a.setSelection(c).scrollIntoView()), !0;
});
S(hf, { displayName: "Command<insertHrCommand>", group: "Hr" });
const Al = Qe("bulletList");
S(Al, { displayName: "Attr<bulletList>", group: "BulletList" });
const Zn = Ye("bullet_list", (n) => ({
  content: "listItem+",
  group: "block",
  attrs: { spread: { default: !1 } },
  parseDOM: [
    {
      tag: "ul",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw gn(e);
        return { spread: e.dataset.spread };
      },
    },
  ],
  toDOM: (e) => [
    "ul",
    { ...n.get(Al.key)(e), "data-spread": e.attrs.spread },
    0,
  ],
  parseMarkdown: {
    match: ({ type: e, ordered: t }) => e === "list" && !t,
    runner: (e, t, r) => {
      const i = t.spread != null ? `${t.spread}` : "false";
      e.openNode(r, { spread: i }).next(t.children).closeNode();
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "bullet_list",
    runner: (e, t) => {
      e.openNode("list", void 0, {
        ordered: !1,
        spread: t.attrs.spread === "true",
      })
        .next(t.content)
        .closeNode();
    },
  },
}));
S(Zn.node, { displayName: "NodeSchema<bulletList>", group: "BulletList" });
S(Zn.ctx, { displayName: "NodeSchemaCtx<bulletList>", group: "BulletList" });
const ff = Ue((n) => qo(/^\s*([-+*])\s$/, Zn.type(n)));
S(ff, {
  displayName: "InputRule<wrapInBulletListInputRule>",
  group: "BulletList",
});
const Dl = re("WrapInBulletList", (n) => () => Ko(Zn.type(n)));
S(Dl, { displayName: "Command<wrapInBulletListCommand>", group: "BulletList" });
const Rl = Ge("bulletListKeymap", {
  WrapInBulletList: {
    shortcuts: "Mod-Alt-8",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Dl.key);
    },
  },
});
S(Rl.ctx, { displayName: "KeymapCtx<bulletListKeymap>", group: "BulletList" });
S(Rl.shortcuts, {
  displayName: "Keymap<bulletListKeymap>",
  group: "BulletList",
});
const zl = Qe("orderedList");
S(zl, { displayName: "Attr<orderedList>", group: "OrderedList" });
const Xn = Ye("ordered_list", (n) => ({
  content: "listItem+",
  group: "block",
  attrs: { order: { default: 1 }, spread: { default: !1 } },
  parseDOM: [
    {
      tag: "ol",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw gn(e);
        return {
          spread: e.dataset.spread,
          order: e.hasAttribute("start") ? Number(e.getAttribute("start")) : 1,
        };
      },
    },
  ],
  toDOM: (e) => [
    "ol",
    {
      ...n.get(zl.key)(e),
      ...(e.attrs.order === 1 ? {} : e.attrs.order),
      "data-spread": e.attrs.spread,
    },
    0,
  ],
  parseMarkdown: {
    match: ({ type: e, ordered: t }) => e === "list" && !!t,
    runner: (e, t, r) => {
      const i = t.spread != null ? `${t.spread}` : "true";
      e.openNode(r, { spread: i }).next(t.children).closeNode();
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "ordered_list",
    runner: (e, t) => {
      e.openNode("list", void 0, {
        ordered: !0,
        start: 1,
        spread: t.attrs.spread === "true",
      }),
        e.next(t.content),
        e.closeNode();
    },
  },
}));
S(Xn.node, { displayName: "NodeSchema<orderedList>", group: "OrderedList" });
S(Xn.ctx, { displayName: "NodeSchemaCtx<orderedList>", group: "OrderedList" });
const df = Ue((n) =>
  qo(
    /^\s*(\d+)\.\s$/,
    Xn.type(n),
    (e) => ({ order: Number(e[1]) }),
    (e, t) => t.childCount + t.attrs.order === Number(e[1]),
  ),
);
S(df, {
  displayName: "InputRule<wrapInOrderedListInputRule>",
  group: "OrderedList",
});
const Pl = re("WrapInOrderedList", (n) => () => Ko(Xn.type(n)));
S(Pl, {
  displayName: "Command<wrapInOrderedListCommand>",
  group: "OrderedList",
});
const Bl = Ge("orderedListKeymap", {
  WrapInOrderedList: {
    shortcuts: "Mod-Alt-7",
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Pl.key);
    },
  },
});
S(Bl.ctx, { displayName: "KeymapCtx<orderedList>", group: "OrderedList" });
S(Bl.shortcuts, { displayName: "Keymap<orderedList>", group: "OrderedList" });
const vl = Qe("listItem");
S(vl, { displayName: "Attr<listItem>", group: "ListItem" });
const xt = Ye("list_item", (n) => ({
  group: "listItem",
  content: "(paragraph|blockquote) block*",
  attrs: {
    label: { default: "•" },
    listType: { default: "bullet" },
    spread: { default: "true" },
  },
  defining: !0,
  parseDOM: [
    {
      tag: "li",
      getAttrs: (e) => {
        if (!(e instanceof HTMLElement)) throw gn(e);
        return {
          label: e.dataset.label,
          listType: e.dataset.listType,
          spread: e.dataset.spread,
        };
      },
    },
  ],
  toDOM: (e) => [
    "li",
    {
      ...n.get(vl.key)(e),
      "data-label": e.attrs.label,
      "data-list-type": e.attrs.listType,
      "data-spread": e.attrs.spread,
    },
    0,
  ],
  parseMarkdown: {
    match: ({ type: e }) => e === "listItem",
    runner: (e, t, r) => {
      const i = t.label != null ? `${t.label}.` : "•",
        s = t.label != null ? "ordered" : "bullet",
        o = t.spread != null ? `${t.spread}` : "true";
      e.openNode(r, { label: i, listType: s, spread: o }),
        e.next(t.children),
        e.closeNode();
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "list_item",
    runner: (e, t) => {
      e.openNode("listItem", void 0, { spread: t.attrs.spread === "true" }),
        e.next(t.content),
        e.closeNode();
    },
  },
}));
S(xt.node, { displayName: "NodeSchema<listItem>", group: "ListItem" });
S(xt.ctx, { displayName: "NodeSchemaCtx<listItem>", group: "ListItem" });
const Fl = re("SinkListItem", (n) => () => dx(xt.type(n)));
S(Fl, { displayName: "Command<sinkListItemCommand>", group: "ListItem" });
const Ll = re("LiftListItem", (n) => () => Yh(xt.type(n)));
S(Ll, { displayName: "Command<liftListItemCommand>", group: "ListItem" });
const $l = re("SplitListItem", (n) => () => ux(xt.type(n)));
S($l, { displayName: "Command<splitListItemCommand>", group: "ListItem" });
function bx(n) {
  return (e, t, r) => {
    const { selection: i } = e;
    if (!(i instanceof J)) return !1;
    const { empty: s, $from: o } = i;
    if (!s || o.parentOffset !== 0) return !1;
    const l = o.node(-1);
    return l.type !== xt.type(n) ||
      l.firstChild !== o.node() ||
      o.node(-2).childCount > 1
      ? !1
      : Yh(xt.type(n))(e, t, r);
  };
}
const Vl = re("LiftFirstListItem", (n) => () => bx(n));
S(Vl, { displayName: "Command<liftFirstListItemCommand>", group: "ListItem" });
const Wl = Ge("listItemKeymap", {
  NextListItem: {
    shortcuts: "Enter",
    command: (n) => {
      const e = n.get(X);
      return () => e.call($l.key);
    },
  },
  SinkListItem: {
    shortcuts: ["Tab", "Mod-]"],
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Fl.key);
    },
  },
  LiftListItem: {
    shortcuts: ["Shift-Tab", "Mod-["],
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Ll.key);
    },
  },
  LiftFirstListItem: {
    shortcuts: ["Backspace", "Delete"],
    command: (n) => {
      const e = n.get(X);
      return () => e.call(Vl.key);
    },
  },
});
S(Wl.ctx, { displayName: "KeymapCtx<listItem>", group: "ListItem" });
S(Wl.shortcuts, { displayName: "Keymap<listItem>", group: "ListItem" });
const pf = nl("text", () => ({
  group: "inline",
  parseMarkdown: {
    match: ({ type: n }) => n === "text",
    runner: (n, e) => {
      n.addText(e.value);
    },
  },
  toMarkdown: {
    match: (n) => n.type.name === "text",
    runner: (n, e) => {
      n.addNode("text", void 0, e.text);
    },
  },
}));
S(pf, { displayName: "NodeSchema<text>", group: "Text" });
const ql = Qe("html");
S(ql, { displayName: "Attr<html>", group: "Html" });
const Hl = Ye("html", (n) => ({
  atom: !0,
  group: "inline",
  inline: !0,
  attrs: { value: { default: "" } },
  toDOM: (e) => {
    const t = document.createElement("span"),
      r = {
        ...n.get(ql.key)(e),
        "data-value": e.attrs.value,
        "data-type": "html",
      };
    return (t.textContent = e.attrs.value), ["span", r, e.attrs.value];
  },
  parseDOM: [
    {
      tag: 'span[data-type="html"]',
      getAttrs: (e) => ({ value: e.dataset.value ?? "" }),
    },
  ],
  parseMarkdown: {
    match: ({ type: e }) => e === "html",
    runner: (e, t, r) => {
      e.addNode(r, { value: t.value });
    },
  },
  toMarkdown: {
    match: (e) => e.type.name === "html",
    runner: (e, t) => {
      e.addNode("html", void 0, t.attrs.value);
    },
  },
}));
S(Hl.node, { displayName: "NodeSchema<html>", group: "Html" });
S(Hl.ctx, { displayName: "NodeSchemaCtx<html>", group: "Html" });
const Sx = [
    rf,
    pl,
    kn,
    as,
    yl,
    xn,
    Ji,
    fn,
    bl,
    Xr,
    Cl,
    ei,
    El,
    ti,
    Tl,
    Qn,
    Al,
    Zn,
    zl,
    Xn,
    vl,
    xt,
    il,
    Gn,
    ll,
    Zr,
    ul,
    Bt,
    dl,
    Wn,
    ql,
    Hl,
    pf,
  ].flat(),
  wx = [of, ff, df, lf, uf, sf].flat(),
  Cx = [Qh, Zh, ef, Xh],
  Mx = [
    ml,
    Sl,
    Dt,
    kl,
    Ml,
    Ol,
    hf,
    af,
    cf,
    Pl,
    Dl,
    Fl,
    $l,
    Ll,
    Vl,
    sl,
    hl,
    al,
    tf,
    nf,
  ],
  Nx = [wl, Nl, Il, xl, Wl, Bl, Rl, gl, ol, fl, cl].flat(),
  _l = Qr("remarkAddOrderInList", () => () => (n) => {
    Yn(n, "list", (e) => {
      if (e.ordered) {
        const t = e.start ?? 1;
        e.children.forEach((r, i) => {
          r.label = i + t;
        });
      }
    });
  });
S(_l.plugin, {
  displayName: "Remark<remarkAddOrderInListPlugin>",
  group: "Remark",
});
S(_l.options, {
  displayName: "RemarkConfig<remarkAddOrderInListPlugin>",
  group: "Remark",
});
const jl = Qr("remarkLineBreak", () => () => (n) => {
  const e = /[\t ]*(?:\r?\n|\r)/g;
  Yn(n, "text", (t, r, i) => {
    if (!t.value || typeof t.value != "string") return;
    const s = [];
    let o = 0;
    e.lastIndex = 0;
    let l = e.exec(t.value);
    for (; l; ) {
      const a = l.index;
      o !== a && s.push({ type: "text", value: t.value.slice(o, a) }),
        s.push({ type: "break", data: { isInline: !0 } }),
        (o = a + l[0].length),
        (l = e.exec(t.value));
    }
    if (s.length > 0 && i && typeof r == "number")
      return (
        o < t.value.length && s.push({ type: "text", value: t.value.slice(o) }),
        i.children.splice(r, 1, ...s),
        r + s.length
      );
  });
});
S(jl.plugin, { displayName: "Remark<remarkLineBreak>", group: "Remark" });
S(jl.options, {
  displayName: "RemarkConfig<remarkLineBreak>",
  group: "Remark",
});
const Kl = Qr("remarkInlineLink", () => mx);
S(Kl.plugin, {
  displayName: "Remark<remarkInlineLinkPlugin>",
  group: "Remark",
});
S(Kl.options, {
  displayName: "RemarkConfig<remarkInlineLinkPlugin>",
  group: "Remark",
});
const Tx = (n) => !!n.children,
  Ox = (n) => n.type === "html";
function Ix(n, e) {
  return t(n, 0, null)[0];
  function t(r, i, s) {
    if (Tx(r)) {
      const o = [];
      for (let l = 0, a = r.children.length; l < a; l++) {
        const c = r.children[l];
        if (c) {
          const u = t(c, l, r);
          if (u)
            for (let h = 0, d = u.length; h < d; h++) {
              const f = u[h];
              f && o.push(f);
            }
        }
      }
      r.children = o;
    }
    return e(r, i, s);
  }
}
const Jl = Qr("remarkHTMLTransformer", () => () => (n) => {
  Ix(n, (e, t, r) =>
    Ox(e)
      ? ((r == null ? void 0 : r.type) === "root" &&
          ((e.children = [{ ...e }]), delete e.value, (e.type = "paragraph")),
        [e])
      : [e],
  );
});
S(Jl.plugin, { displayName: "Remark<remarkHtmlTransformer>", group: "Remark" });
S(Jl.options, {
  displayName: "RemarkConfig<remarkHtmlTransformer>",
  group: "Remark",
});
const Ul = Qr("remarkMarker", () => () => (n, e) => {
  const t = (r) => e.value.charAt(r.position.start.offset);
  Yn(
    n,
    (r) => ["strong", "emphasis"].includes(r.type),
    (r) => {
      r.marker = t(r);
    },
  );
});
S(Ul.plugin, { displayName: "Remark<remarkMarker>", group: "Remark" });
S(Ul.options, { displayName: "RemarkConfig<remarkMarker>", group: "Remark" });
const mf = Gr(() => {
  let n = !1;
  const e = new jt("MILKDOWN_INLINE_NODES_CURSOR"),
    t = new bt({
      key: e,
      state: {
        init() {
          return !1;
        },
        apply(r) {
          if (!r.selection.empty) return !1;
          const i = r.selection.$from,
            s = i.nodeBefore,
            o = i.nodeAfter;
          return !!(
            s &&
            o &&
            s.isInline &&
            !s.isText &&
            o.isInline &&
            !o.isText
          );
        },
      },
      props: {
        handleDOMEvents: {
          compositionend: (r, i) =>
            n
              ? ((n = !1),
                requestAnimationFrame(() => {
                  if (t.getState(r.state)) {
                    const s = r.state.selection.from;
                    i.preventDefault(),
                      r.dispatch(r.state.tr.insertText(i.data || "", s));
                  }
                }),
                !0)
              : !1,
          compositionstart: (r) => (t.getState(r.state) && (n = !0), !1),
          beforeinput: (r, i) => {
            if (
              t.getState(r.state) &&
              i instanceof InputEvent &&
              i.data &&
              !n
            ) {
              const s = r.state.selection.from;
              return (
                i.preventDefault(),
                r.dispatch(r.state.tr.insertText(i.data || "", s)),
                !0
              );
            }
            return !1;
          },
        },
        decorations(r) {
          if (t.getState(r)) {
            const i = r.selection.$from.pos,
              s = document.createElement("span"),
              o = Ae.widget(i, s, { side: -1 }),
              l = document.createElement("span"),
              a = Ae.widget(i, l);
            return (
              setTimeout(() => {
                (s.contentEditable = "true"), (l.contentEditable = "true");
              }),
              oe.create(r.doc, [o, a])
            );
          }
          return oe.empty;
        },
      },
    });
  return t;
});
S(mf, { displayName: "Prose<inlineNodesCursorPlugin>", group: "Prose" });
const gf = Gr(
  (n) =>
    new bt({
      key: new jt("MILKDOWN_HARDBREAK_MARKS"),
      appendTransaction: (e, t, r) => {
        if (!e.length) return;
        const [i] = e;
        if (!i) return;
        const [s] = i.steps;
        if (i.getMeta("hardbreak")) {
          if (!(s instanceof fe)) return;
          const { from: o } = s;
          return r.tr.setNodeMarkup(o, fn.type(n), void 0, []);
        }
        if (s instanceof mt) {
          let o = r.tr;
          const { from: l, to: a } = s;
          return (
            r.doc.nodesBetween(l, a, (c, u) => {
              c.type === fn.type(n) &&
                (o = o.setNodeMarkup(u, fn.type(n), void 0, []));
            }),
            o
          );
        }
      },
    }),
);
S(gf, { displayName: "Prose<hardbreakClearMarkPlugin>", group: "Prose" });
const Yl = Ut(["table", "code_block"], "hardbreakFilterNodes");
S(Yl, { displayName: "Ctx<hardbreakFilterNodes>", group: "Prose" });
const yf = Gr((n) => {
  const e = n.get(Yl.key);
  return new bt({
    key: new jt("MILKDOWN_HARDBREAK_FILTER"),
    filterTransaction: (t, r) => {
      const i = t.getMeta("hardbreak"),
        [s] = t.steps;
      if (i && s) {
        const { from: o } = s,
          l = r.doc.resolve(o);
        let a = l.depth,
          c = !0;
        for (; a > 0; ) e.includes(l.node(a).type.name) && (c = !1), a--;
        return c;
      }
      return !0;
    },
  });
});
S(yf, { displayName: "Prose<hardbreakFilterPlugin>", group: "Prose" });
const kf = Gr((n) => {
  const e = new jt("MILKDOWN_HEADING_ID"),
    t = (r) => {
      if (r.composing) return;
      const i = n.get(as.key),
        s = r.state.tr.setMeta("addToHistory", !1);
      let o = !1;
      const l = {};
      r.state.doc.descendants((a, c) => {
        if (a.type === xn.type(n)) {
          if (a.textContent.trim().length === 0) return;
          const u = a.attrs;
          let h = i(a);
          l[h] ? ((l[h] += 1), (h += `-#${l[h]}`)) : (l[h] = 1),
            u.id !== h &&
              ((o = !0),
              s.setMeta(e, !0).setNodeMarkup(c, void 0, { ...u, id: h }));
        }
      }),
        o && r.dispatch(s);
    };
  return new bt({
    key: e,
    view: (r) => (
      t(r),
      {
        update: (i, s) => {
          i.state.doc.eq(s.doc) || t(i);
        },
      }
    ),
  });
});
S(kf, { displayName: "Prose<syncHeadingIdPlugin>", group: "Prose" });
const xf = Gr((n) => {
  const e = (t) => {
    if (t.composing || !t.editable) return;
    const r = Xn.type(n),
      i = Zn.type(n),
      s = xt.type(n),
      o = t.state,
      l = (u, h) => {
        let d = !1;
        const f = `${h + 1}.`;
        return u.label !== f && ((u.label = f), (d = !0)), d;
      };
    let a = o.tr,
      c = !1;
    o.doc.descendants((u, h, d, f) => {
      if (u.type === i) {
        const p = u.maybeChild(0);
        (p == null ? void 0 : p.type) === s &&
          p.attrs.listType === "ordered" &&
          ((c = !0),
          a.setNodeMarkup(h, r, { spread: "true" }),
          u.descendants((y, x, k, E) => {
            if (y.type === s) {
              const N = { ...y.attrs };
              l(N, E) && (a = a.setNodeMarkup(x, void 0, N));
            }
            return !1;
          }));
      } else if (u.type === s && (d == null ? void 0 : d.type) === r) {
        const p = { ...u.attrs };
        let y = !1;
        p.listType !== "ordered" && ((p.listType = "ordered"), (y = !0)),
          d != null && d.maybeChild(0) && (y = l(p, f)),
          y && ((a = a.setNodeMarkup(h, void 0, p)), (c = !0));
      }
    }),
      c && t.dispatch(a.setMeta("addToHistory", !1));
  };
  return new bt({
    key: new jt("MILKDOWN_KEEP_LIST_ORDER"),
    view: (t) => (
      e(t),
      {
        update: (r) => {
          e(r);
        },
      }
    ),
  });
});
S(xf, { displayName: "Prose<syncListOrderPlugin>", group: "Prose" });
const Ex = [gf, Yl, yf, mf, _l, Kl, jl, Jl, Ul, kf, xf].flat(),
  Ax = [Sx, wx, Cx, Mx, Nx, Ex].flat();
function bf(n) {
  var e,
    t,
    r = "";
  if (typeof n == "string" || typeof n == "number") r += n;
  else if (typeof n == "object")
    if (Array.isArray(n)) {
      var i = n.length;
      for (e = 0; e < i; e++)
        n[e] && (t = bf(n[e])) && (r && (r += " "), (r += t));
    } else for (t in n) n[t] && (r && (r += " "), (r += t));
  return r;
}
function Dx() {
  for (var n, e, t = 0, r = "", i = arguments.length; t < i; t++)
    (n = arguments[t]) && (e = bf(n)) && (r && (r += " "), (r += e));
  return r;
}
function Rx(n) {
  n.update(Ei, (e) => {
    const t = e.attributes;
    return {
      ...e,
      attributes: (r) => {
        const i = typeof t == "function" ? t(r) : t;
        return {
          ...i,
          class: Dx(
            "prose dark:prose-invert",
            (i == null ? void 0 : i.class) || "",
            "milkdown-theme-nord",
          ),
        };
      },
    };
  });
}
X1.make()
  .config((n) => {
    n.set(Ai, document.getElementById("editor"));
  })
  .use(Ax)
  .use(Rx)
  .create();
