import React from "react";
import { Menu } from "lucide-react";
import Sidebar from "..";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
