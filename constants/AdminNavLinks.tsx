import { BarChartBigIcon, Images, Star, Store } from "lucide-react";

export type AdminNavItem = {
  title: string;
  path: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  submenu?: boolean;
  submenuItems?: AdminNavItem[];
};

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: (props) => <BarChartBigIcon {...props} />,
  },
  {
    title: "Featured images",
    path: "/admin/featuredImages",
    icon: (props) => <Star {...props} />,
  },
  {
    title: "Gallery images",
    path: "/admin/galleryImages",
    icon: (props) => <Images {...props} />,
  },
  {
    title: "Live website",
    path: "/",
    icon: (props) => <Store {...props} />,
  },
];
