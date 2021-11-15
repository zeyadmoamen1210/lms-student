export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'lms-student',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  bootstrapVue: {
    // Add the icon plugin to the `componentsPlugins` array
    componentPlugins: ['LayoutPlugin']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

    '@/plugins/bootstrap-layout',
    '@/plugins/element-ui',
    '@/plugins/moment',
    '@/plugins/vuesax',
    '@/plugins/nuxt-i18n',
    '@/plugins/fontawesome',
    '@/plugins/countdown',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    'bootstrap-vue/nuxt',
    ['nuxt-i18n', {
      defaultLocale: 'ar',
      seo: false,
      strategy: 'no_prefix',
      locales: [{
          code: 'en',
          name: 'English',
          dir: 'ltr',
          file: 'en.json'
        },
        {
          code: 'ar',
          name: 'العربية',
          dir: 'rtl',
          file: 'ar.json'
        },
      ],

      langDir: 'locale/'
    }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://lms-systems.herokuapp.com/api/v1',
    common: {
      Accept: 'application/json',
      Authorization: '',
    },
  },




  i18n: {

    vueI18n: {
      defaultLocale: 'ar',
      fallbackLocale: 'en',

      messages: {
        ar: require ('./locale/ar.json'),
        en: require ('./locale/en.json'),
      }
    }
  },



  auth: {
    // Options
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'login-email',
            method: 'post',
            propertyName: 'token',
          },
          user: false,
          logout: false,
        },
        // tokenRequired: true,
        tokenType: 'Bearer',

        token: {
          maxAge: false,
        },
        refreshToken: {
          property: false,
          maxAge: false
        },

        autoLogout: false,


      },
    },
    plugins: [{
      src: '~plugins/auth.js',
      ssr: false,
    }, ],
  },



  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
