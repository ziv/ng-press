export type MenuItem = {
  text: string;
  link?: string;
  items?: MenuItem[];
}

export type NgPressConfig = {
  title: string;
  name: string;
  footerText: string;

  topbar: {
    items: MenuItem[][];
  };

  sidebar: {
    items: MenuItem[][];
  };

  shiki: {
    langs: string[];
    theme: string;
  }
}
