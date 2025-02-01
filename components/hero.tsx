import {  ArrowRightIcon, Truck } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex justify-center items-center">
        <a href={process.env.NEXT_PUBLIC_SITE_URL} target="_blank" rel="noreferrer">
          <Truck className="w-16 h-16" />
        </a>
      </div>
      <h1 className="sr-only">All-in-One Tracking App</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Track all your packages in one place with our{" "}
        <a
          href={process.env.NEXT_PUBLIC_SITE_URL}
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          All-in-One Package Tracking
        </a>
      </p>
      <Button> <Link href="/dashboard" className="flex items-center gap-2"> Go to Dashboard <ArrowRightIcon className="inline-block w-4 h-4" /></Link></Button>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
