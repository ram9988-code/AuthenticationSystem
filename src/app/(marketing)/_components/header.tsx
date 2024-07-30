"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
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
        <Button
          onClick={() => router.push("/login")}
          size={"lg"}
          variant={"ghost"}
        >
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
