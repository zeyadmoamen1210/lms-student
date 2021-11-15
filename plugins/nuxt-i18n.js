export default function ({ app }) {
    
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    app.store.commit('CHANGE_LANG', newLocale);
    app.$moment.locale(newLocale)
    app.i18n.setLocaleCookie(newLocale);
  }

}