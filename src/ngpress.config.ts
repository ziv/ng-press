import defineConfig from './app/services/define-config';


export default defineConfig({
  name: 'Demo NgPress',
  title: 'NgPress Demo',
  footerText: '2026 © NgPress MIT License',

  shiki: {
    langs: ['typescript', 'javascript', 'css', 'html', 'json', 'bash', "shell"],
    theme: "github-dark",
  },

  topbar: {
    items: [
      [
        {text: 'Home', link: '/home'},
        {text: 'Example', link: '/example'},
      ],
    ]
  },
  sidebar: {
    items: [
      [
        {text: 'Introduction', link: '/introduction'},
        {text: 'Quick Start', link: '/example/quick-start'},
        {
          text: 'Guides',
          items: [
            {text: 'Routing', link: '/guides/routing'},
            {text: 'Routing X', link: '/guides/abc'},
            {text: 'Routing Y', link: '/guides/xyz'},
          ]
        },
      ]
    ]
  }
});
