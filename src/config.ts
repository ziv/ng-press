import defineConfig from './app/services/define-config';


export default defineConfig({
  name: 'DEMO',
  title: 'NgPress Demo',
  copyright: '2024 © NgPress',

  shiki: {
    langs: ['typescript', 'javascript', 'css', 'html', 'json', 'bash', "shell"],
    theme: "github-dark",
  },

  topbar: {
    items: [
      {text: 'Home', link: '/index'},
      {text: 'Introduction', link: '/introduction'},
    ],
  },
  sidebar: {
    items: [
      {text: 'Introduction', link: '/introduction'},
      {text: 'Quick Start', link: '/example/quick-start'},
      {
        text: 'Guides',
        items: [
          {text: 'Routing', link: '/guides/routing'}
        ]
      },
    ]
  }
});
