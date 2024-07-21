export type NavItem = {
  title: string;
  path: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  submenu?: boolean;
  submenuItems?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Featured",
    path: "/featured",
    submenu: true,
    submenuItems: [
      { title: "All", path: "/featured" },
      { title: "Water colors", path: "/watercolors" },
      { title: "Water colors", path: "/watercolors" },
    ],
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];
