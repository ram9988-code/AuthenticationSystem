import Sidebar from "@/components/sidebar";
import MobileHeader from "@/components/sidebar/mobile/mobile-header";
import React from "react";

type props = {
  children: React.ReactNode;
};

const LearnLayout = ({ children }: props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="h-full max-w-[1056px] mx-auto pt-6F">{children}</div>
      </main>
    </>
  );
};

export default LearnLayout;
