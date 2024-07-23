import Link from "next/link";
import React from "react";

export default function AdminTopbar() {
  return (
    <div className="sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-secondary md:hidden bg-black">
      <div className="flex h-[60px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin"
            className="flex flex-row space-x-3 items-center justify-center "
          >
            <div className="flex justify-center text-white">ML</div>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-center">
            <span className="font-semibold text-sm">ML</span>
          </div>
        </div>
      </div>
    </div>
  );
}
