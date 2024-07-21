"use client";
import { ADMIN_NAV_ITEMS, AdminNavItem } from "@/constants/AdminNavLinks";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const AdminSidebar = () => {
  return (
    <div className="md:w-60 bg-black h-screen flex-1 fixed border-r border-secondary hidden md:flex">
      <div className="flex flex-col space-y-6 w-full py-5">
        <Link href="/admin" className="text-white md:px-6">
          ML
        </Link>

        <div className="flex flex-1 flex-col space-y-2 md:px-6 ">
          {ADMIN_NAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

const MenuItem = ({ item }: { item: AdminNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg  w-full justify-between hover:bg-secondary ${
              pathname.includes(item.path) ? "bg-secondary" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon && item.icon({ className: "size-4" })}
              <span className="font-medium flex">
                <Link href={item.path}>{item.title}</Link>
              </span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <ChevronDown />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.submenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold bg-secondary" : ""
                    } hover:bg-secondary p-1.5 rounded-md`}
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
          className={`flex text-white flex-row space-x-4 items-center p-2 rounded-lg hover:bg-[#1b1b1b] ${
            item.path === pathname ? "bg-[#1b1b1b] font-bold" : ""
          }`}
        >
          {item.icon && item.icon({ className: "size-4" })}
          <span className="font-medium text-sm flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
