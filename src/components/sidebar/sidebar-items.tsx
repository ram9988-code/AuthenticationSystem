"use client";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  label: string;
  iconSrc: string;
  href: string;
}

const SidebarItem = ({ href, iconSrc, label }: SidebarProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
    >
      <Image
        src={iconSrc}
        alt={label}
        className="mr-5"
        height={32}
        width={32}
      />
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default SidebarItem;
