import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  themeConfig: {
    logo: { src: './icons/icon-32x32.png' },
    footer: {
      message: '',
      copyright: '',
    },
    nav: nav(),
    // *custom
    navCustom: navCustom(),
    search : {
      provider: 'local'
    },
  },
})


function nav() {
  return [
    // {
    //   text: 'Lab',
    //   items: [
    //     { text: 'Plugin', link: '/guide/lab/plugin' },
    //     { text: 'Edit', link: '/guide/lab/edit' },
    //     { text: 'Form', link: '/guide/lab/form' },
    //   ]
    // },
    // { text: 'ydrive', link: '/guide/ydrive', activeMatch:'/guide/ydrive' },
    { text: 's3', link: '/guide/s3', activeMatch:'/guide/s3' },
  ]
}

function navCustom() {
  return [
    {
      icon: 'mdi mdi-home',
      items: [
        { text: '', 
          items: [
            { text: 'Setting', link: '/guide/mine/setting', icon: 'mdi mdi-cog-outline' },
            { text: 'Scan Device', link: '/guide/mine/device', icon: 'mdi mdi-devices' },
          ]
        },
        {
          text: '',
          items: [
            { text: 'My Profile', link: '/guide/mine/profile', icon: 'mdi mdi-card-account-details-outline'},
            { text: 'My Docs', link: '/guide/mine/docs', icon: 'mdi mdi-file-document-outline' },
            { text: 'My Bucket', link: '/guide/mine/bucket', icon: 'mdi mdi-bucket-outline' },
            { text: 'My Qbix', link: '/guide/mine/qbix', icon: 'mdi mdi-cube-outline' },
            { text: 'My Assets', link: '/guide/mine/assets', icon: 'mdi mdi-bank-outline' },
          ]
        }
      ]
    },
  ]
}
