// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/boot)
    boot: [
      'auth',
      'axios',
      'firebase',
      'boot',
      'i18n',
      'reloadNewVersion'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      'roboto-font',
      'material-icons',
      'ionicons-v4'
      // 'mdi-v3',
      // 'fontawesome-v5'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QBtn',
        'QCard',
        'QCardActions',
        // 'QCardMain', by QCardSection
        // 'QCardMedia', by QCardSection
        // 'QCardTitle', by QCardSection
        'QCardSection',
        'QField',
        'QIcon',
        'QInput',
        'QItem',
        // 'QItemMain', by QItemLabel
        'QItemLabel',
        // 'QItemSide', by QItemSection.side // not in use
        'QLayout',
        // 'QLayoutDrawer', by QDrawer
        'QDrawer',
        // 'QLayoutHeader', by QHeader
        'QHeader',
        'QList',
        // 'QListHeader', by QItemLabel.header
        'QPage',
        'QPageContainer',
        'QSpinner',
        'QToolbar',
        'QToolbarTitle',
        'QItemSection',
        'QAvatar',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QCheckbox'
      ],
      directives: [
        'Ripple'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Loading',
        'AddressbarColor'
      ],
      iconSet: 'ionicons-v4'
      // lang: 'de', // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [
    ],
    pwa: {
      workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'TS Blades',
        short_name: 'TS Blades',
        description: 'Place your TS Blades order',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
