import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-center h-full">
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src="/flags/In.svg"
            alt="Flag"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Hindi
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src="/flags/US.svg"
            alt="Flag"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          American English
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src="/flags/JP.svg"
            alt="Flag"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Japanese
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src="/flags/RU.svg"
            alt="Flag"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Russian
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src="/flags/FR.svg"
            alt="Flag"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          French
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src="/flags/DE.svg"
            alt="Flag"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          German
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src="/flags/EN.svg"
            alt="Flag"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          British English
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
