
self.$config = {
  landing: true,
  repo: 'chemzqm/wept',
  debug: true,
  twitter: 'chemzqm',
  'edit-link': 'https://github.com/chemzqm/wept/blob/master/docs',
  nav: {
    default: [
      {
        title: '首页', path: '/home',
      }, {
        title: '更新日志', path: '/history',
      }, {
        title: 'API支持情况', path: '/api',
      }, {
        title: '小技巧', path: '/tips'
      }, {
        title: '相关工具', path: '/tools'
      }
    ]
  },
  icons: [
    {
      label: '关注我的微博',
      svgId: 'i-weibo',
      svgClass: 'weibo-icon',
      link: 'http://weibo.com/chemzqm'
    }
  ],
  plugins: [
    evanyou()
  ]
}
