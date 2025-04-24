// module.exports = function getI18nText({  }) {
//   // ваш код здесь  

//   return i18nText // строка  
// }

const fn = {
  plural(locale, key, count) {
    const formatter = new Intl.PluralRules(locale)
    const rule = formatter.select(count)
    return `${count} ${key[rule]}`
  },
  number(locale, value, currency) {
    const formatter = new Intl.NumberFormat(locale, currency && { style: "currency", currency })
    console.log(formatter.format(value))
    return formatter.format(value)
  },
  list(locale, ...args) {
    const formatter = new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' });
    return formatter.format(args)
  },
  date(value, locale) {
    let formatter = new Intl.DateTimeFormat(locale)
    return formatter.format(value)
  }
}

console.log(getI18nText({
  stringTokens: ["key", " ", "$var", " ", "#translation"],
  variables: { var: 100 },
  translations: {
    "ru-RU": { translation: "тест" },
    "en-US": { translation: "test" },
    "de-DE": { translation: "prüfen" },
    "hi-IN": { translation: "परीक्षा" },
    "ar-AA": { translation: "امتحان" },
  },
}))

console.log(getI18nText({
  stringTokens: [["@number", "$var", "USD"]],
  variables: { var: 123456789.0123 },
  translations: {},
}))



const stringTokens = [
  "#price",
  " ",
  ["@plural", "#day", "$tripDays"],
  " - ",
  ["@number", "$tripPrice", "USD"]
]

const variables = {
  tripDays: 10,
  tripPrice: 56789.01,
}

const translations = {
  "ru-RU": {             // локаль  
    price: "Цена",        // обычный перевод для ключа price  
    day: {                // перевод для ключа day c учетом плюральных форм  
      zero: " дней",
      one: " день",
      few: " дня",
      many: " дней",
      other: " дней",
    }
  },
  "en-US": {
    price: "Price",
    day: {
      one: " day",
      other: " days",
      //...  
    }
  },
  //...  
}
// console.log(getI18nText({ stringTokens, variables, translations, locale: "ru-RU" }))
// console.log(getI18nText({ stringTokens, variables, translations, locale: "en-US" }))


function getI18nText({ stringTokens, variables, translations, locale }) {
  let output = stringTokens

  const tryGetVariable = i => (i[0] === '$' && i.slice(1) in variables) ? variables[i.slice(1)] : i
  const tryGetTranslation = (values, i) => (i[0] === '#' && i.slice(1) in values) ? values[i.slice(1)] : i

  if (typeof variables === 'object') {
    output = output.map(i => Array.isArray(i) ? i.map(tryGetVariable) : tryGetVariable(i))
  }

  if (typeof translations === 'object') {
    if (!Object.keys(translations).length) translations = ["ru-RU", "en-US", "de-DE", "hi-IN", "ar-AA"].reduce((r, i) => ({ ...r, [i]: null }), {})
    if (typeof locale === 'string') translations = (locale in translations) ? { [locale]: translations[locale] } : {}

    return Object.entries(translations)
      .map(([loc, values]) => output.map(i => {
        if (Array.isArray(i)) return fn[i[0].slice(1)](loc, ...i.slice(1).map(tryGetTranslation.bind(null, values)))
        return tryGetTranslation(values, i)
      }).join('')).join('\n')
  }

  return output.join('')
}

