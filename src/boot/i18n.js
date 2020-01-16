// we import the external package
import VueI18n from 'vue-i18n'

// let's say we have a file in /src/i18n containing the language pack
import messages from 'src/i18n'

const numberFormats = {
  'en': {
    currency: {
      style: 'currency', currency: 'EUR'
    }
  },
  'es': {
    currency: {
      style: 'currency', currency: 'EUR'
    }
  }
}

export default ({ app, Vue }) => {
  // Set i18n instance on app;
  // We inject it into root component by doing so;
  // new Vue({..., i18n: ... }).$mount(...)
  Vue.use(VueI18n)
  app.i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    numberFormats,
    messages
  })
}
