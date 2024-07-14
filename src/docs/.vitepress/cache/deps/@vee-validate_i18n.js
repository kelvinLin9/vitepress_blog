import "./chunk-HKJ2B2AA.js";

// node_modules/@vee-validate/i18n/dist/vee-validate-i18n.esm.js
function isCallable(fn) {
  return typeof fn === "function";
}
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
function getTag(value) {
  if (value == null) {
    return value === void 0 ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}
function merge(target, source) {
  Object.keys(source).forEach((key) => {
    if (isPlainObject(source[key]) && isPlainObject(target[key])) {
      if (!target[key]) {
        target[key] = {};
      }
      merge(target[key], source[key]);
      return;
    }
    target[key] = source[key];
  });
  return target;
}
function interpolate(template, values, options) {
  const { prefix, suffix } = options;
  const regExp = new RegExp(`([0-9]:)?${prefix}([^${suffix}]+)${suffix}`, "g");
  return template.replace(regExp, function(_, param, placeholder) {
    if (!param || !values.params) {
      return placeholder in values ? values[placeholder] : values.params && placeholder in values.params ? values.params[placeholder] : `${prefix}${placeholder}${suffix}`;
    }
    if (!Array.isArray(values.params)) {
      return placeholder in values.params ? values.params[placeholder] : `${prefix}${placeholder}${suffix}`;
    }
    const paramIndex = Number(param.replace(":", ""));
    return paramIndex in values.params ? values.params[paramIndex] : `${param}${prefix}${placeholder}${suffix}`;
  });
}
var Dictionary = class {
  constructor(locale, dictionary, interpolateOptions = { prefix: "{", suffix: "}" }) {
    this.container = {};
    this.locale = locale;
    this.interpolateOptions = interpolateOptions;
    this.merge(dictionary);
  }
  resolve(ctx, interpolateOptions) {
    return this.format(this.locale, ctx, interpolateOptions);
  }
  getLocaleDefault(locale, field) {
    var _a, _b, _c, _d, _e;
    return ((_c = (_b = (_a = this.container[locale]) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b[field]) === null || _c === void 0 ? void 0 : _c._default) || ((_e = (_d = this.container[locale]) === null || _d === void 0 ? void 0 : _d.messages) === null || _e === void 0 ? void 0 : _e._default);
  }
  resolveLabel(locale, name, label) {
    var _a, _b, _c, _d;
    if (label) {
      return ((_b = (_a = this.container[locale]) === null || _a === void 0 ? void 0 : _a.names) === null || _b === void 0 ? void 0 : _b[label]) || label;
    }
    return ((_d = (_c = this.container[locale]) === null || _c === void 0 ? void 0 : _c.names) === null || _d === void 0 ? void 0 : _d[name]) || name;
  }
  format(locale, ctx, interpolateOptions) {
    var _a, _b, _c, _d, _e;
    let message;
    const { rule, form, label, name } = ctx;
    const fieldName = this.resolveLabel(locale, name, label);
    if (!rule) {
      message = this.getLocaleDefault(locale, name) || `${fieldName} is not valid`;
      return isCallable(message) ? message(ctx) : interpolate(message, Object.assign(Object.assign({}, form), { field: fieldName }), interpolateOptions !== null && interpolateOptions !== void 0 ? interpolateOptions : this.interpolateOptions);
    }
    message = ((_c = (_b = (_a = this.container[locale]) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b[name]) === null || _c === void 0 ? void 0 : _c[rule.name]) || ((_e = (_d = this.container[locale]) === null || _d === void 0 ? void 0 : _d.messages) === null || _e === void 0 ? void 0 : _e[rule.name]);
    if (!message) {
      message = this.getLocaleDefault(locale, name) || `${fieldName} is not valid`;
    }
    return isCallable(message) ? message(ctx) : interpolate(message, Object.assign(Object.assign({}, form), { field: fieldName, params: rule.params }), interpolateOptions !== null && interpolateOptions !== void 0 ? interpolateOptions : this.interpolateOptions);
  }
  merge(dictionary) {
    merge(this.container, dictionary);
  }
};
var DICTIONARY = new Dictionary("en", {});
function localize(locale, dictionary, interpolateOptions) {
  const generateMessage = (ctx) => {
    return DICTIONARY.resolve(ctx, interpolateOptions);
  };
  if (typeof locale === "string") {
    DICTIONARY.locale = locale;
    if (dictionary) {
      DICTIONARY.merge({ [locale]: dictionary });
    }
    return generateMessage;
  }
  DICTIONARY.merge(locale);
  return generateMessage;
}
function setLocale(locale) {
  DICTIONARY.locale = locale;
}
async function loadLocaleFromURL(url) {
  try {
    const locale = await fetch(url, {
      headers: {
        "content-type": "application/json"
      }
    }).then((res) => res.json());
    if (!locale.code) {
      console.error("Could not identify locale, ensure the locale file contains `code` field");
      return;
    }
    localize({ [locale.code]: locale });
  } catch (err) {
    console.error(`Failed to load locale `);
  }
}
export {
  loadLocaleFromURL,
  localize,
  setLocale
};
/*! Bundled license information:

@vee-validate/i18n/dist/vee-validate-i18n.esm.js:
  (**
    * vee-validate v4.13.1
    * (c) 2024 Abdelrahman Awad
    * @license MIT
    *)
*/
//# sourceMappingURL=@vee-validate_i18n.js.map
