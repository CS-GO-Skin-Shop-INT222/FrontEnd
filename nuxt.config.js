import colors from 'vuetify/es5/util/colors'
require('dotenv').config()
export default {
    env: {
        urlserver: 'https://api.blackcarrack.tech/api'
    },
    // Disable server-side rendering: http://go.nuxtjs.dev/ssr-mode
    ssr: true,

    // Global page headers: http://go.nuxtjs.dev/config-head
    head: {
        title: 'CS:GO Skin Shop',
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
            { rel: 'icon', type: 'image/x-icon', href: '/ms-icon-70x70.png' }
        ]
    },

    // Global CSS: http://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: http://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: http://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): http://go.nuxtjs.dev/config-modules
    buildModules: [
        // http://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // http://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: http://go.nuxtjs.dev/config-modules
    modules: [
      'nuxt-healthcheck',
        // http://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
    ],
    healthcheck: {
      path: '/healthcheck',
      contentType: 'application/json',
      healthy: () => {
        return JSON.stringify({ result: 'healthy naja' })
      }
    },

  auth: {
    redirect: {
      login: '/user/login',
      logout: '/dummy',
      callback: '/login',
      home: '/dummy',
      admin:'/admin/management'
    },
    strategies: {
      local: {
        scheme: 'local',
        token: {
          maxAge:3600,
          property: 'token',
          global: true,
        },
        user: {
          autoFetch:true
        },
        endpoints: {
          login: { url: 'https://api.blackcarrack.tech/api/user/login', method: 'post', propertyName:'token' },
          logout: { url: 'https://api.blackcarrack.tech/api/user/logout', method: 'delete' },
          user: { url: 'https://api.blackcarrack.tech/api/user/profile', method: 'get',propertyName:'user'}
        }
        , tokenName:'auth-token'
      },
      admin: {
        scheme: 'local',
        token: {
          maxAge:3600,
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          autoFetch:true
          // autoFetch: true
        },
        endpoints: {
          login: { url: 'https://api.blackcarrack.tech/api/admins/login', method: 'post', propertyName:'token' },
          logout: { url: 'https://api.blackcarrack.tech/api/admins/logout', method: 'delete' },
          user: { url: 'https://api.blackcarrack.tech/api/admins/admin', method: 'get',propertyName:false}
        }
        , tokenName:'auth-token'
      },
     
      
    }
  },
  loaders: {
    vue: {
      compilerOptions: {
        preserveWhitespace: false
      }
    }
  },
    // Axios module configuration: http://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: 'https://api.blackcarrack.tech/api',
        proxyHeaders: false,
        credentials: false 
    },
    telemetry: false,
    // Vuetify module configuration: http://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: true,
            themes: {
              light: {
                primary: colors.purple,
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3,
                background: colors.indigo.lighten5, // Not automatically applied
              
              },
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                },
            }
        }
    },

    // Build Configuration: http://go.nuxtjs.dev/config-build
    build: {}
}