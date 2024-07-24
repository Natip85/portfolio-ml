export type NavItem = {
  title: string;
  path: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  submenu?: boolean;
  submenuItems?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Gallery",
    path: "#",
    submenu: true,
    submenuItems: [
      { title: "All", path: "/gallery/ALL" },
      { title: "Water colors", path: "/gallery/WATERCOLORS" },
      { title: "Pastels", path: "/gallery/PASTELS" },
      { title: "Charcoal", path: "/gallery/CHARCOAL" },
      { title: "Acrylics", path: "/gallery/ACRYLICS" },
      // { title: "Multimedia & collage", path: "/gallery/MULTIMEDIACOLLAGE" },
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
