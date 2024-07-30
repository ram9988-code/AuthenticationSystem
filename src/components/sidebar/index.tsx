import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SidebarItem from "./sidebar-items";
import { Loader } from "lucide-react";

interface SidebarPrps {
  className?: string;
}

const sidebarData = [
  {
    iconSrc: "/icons/learn.svg",
    label: "Learn",
    href: "/learn",
  },
  {
    iconSrc: "/icons/trophy.svg",
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    iconSrc: "/icons/quest.svg",
    label: "Quest",
    href: "/quest",
  },
  {
    iconSrc: "/icons/shop.svg",
    label: "Shop",
    href: "/shop",
  },
];

const Sidebar = ({ className }: SidebarPrps) => {
  return (
    <div
      className={cn(
        "h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col ",
        className
      )}
    >
      <Link href={"/learn"}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-2">
          <Image
            src={"/logo.svg"}
            alt="Worksheet Logo"
            height={40}
            width={40}
          />
          <h1 className="text-2xl font-extrabold text-[#17cf97] tracking-wide">
            Worksheet
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        {sidebarData.map((data) => (
          <SidebarItem
            key={data.label}
            iconSrc={data.iconSrc}
            label={data.label}
            href={data.href}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
