export type MenuItem = {
  text: string;
  link?: string;
  items?: MenuItem[];
}

export type NgPressConfig = {
  title: string;
  name: string;
  copyright: string;

  topbar: {
    items: MenuItem[];
  };

  sidebar: {
    items: MenuItem[];
  };

  shiki: {
    langs: string[];
    theme: string;
  }
}
