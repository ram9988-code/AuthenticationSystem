"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Learn, practice, and master new languages with Worksheet
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <Button size={"lg"} variant={"secondary"} className="w-full">
            Get Started
          </Button>
          <Button size={"lg"} variant={"secondary"} className="w-full" asChild>
            <Link href={"/learn"}>Continue Learning</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
