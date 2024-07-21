"use client";
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { NAV_ITEMS, NavItem } from "@/constants/navLinks";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <div className="sticky inset-x-0 top-0 z-50 w-full transition-all border-b-[#0e2923] border-b bg-[#003b2f] p-4 shadow-md">
      <MaxWidthWrapper className="flex items-center justify-between">
        <Link href={"/"}>
          <h2 className="text-2xl md:text-4xl font-semibold text-white">ML</h2>
        </Link>
        <div className="items-center gap-6 hidden md:flex">
          {NAV_ITEMS.map((item, index) => (
            <MenuItem key={item.title} item={item} />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

const MenuItem = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="relative">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg w-full justify-between ${
              pathname.includes(item.path) ? "font-bold text-2xl" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon && item.icon({ className: "size-4" })}
              <span className="flex">
                <Link href={item.path} className="hover:font-bold text-2xl">
                  {item.title}
                </Link>
              </span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <ChevronDown />
            </div>
          </button>

          {subMenuOpen && (
            <div className="absolute top-12 flex flex-col space-y-4 bg-[#212323] p-3 rounded-md min-w-48">
              {item.submenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname
                        ? "font-bold bg-secondary text-black"
                        : "text-white"
                    } hover:bg-secondary p-1.5 rounded-md hover:text-black`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex  flex-row space-x-4 items-center p-2 rounded-lg  ${
            item.path === pathname ? "font-bold text-black" : ""
          }`}
        >
          {item.icon && item.icon({ className: "size-4" })}
          <span className="flex hover:font-bold text-2xl">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
