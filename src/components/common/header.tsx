"use client"

import Link from "next/link"
import { toast } from "sonner"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { buttonVariants } from "../ui/button"

export function Header() {
  return (
    <header className={"inset-0 z-[500] h-[64px] w-full"}>
      <div className="container relative flex h-full w-full flex-1 px-4 sm:px-8">
        <div className="mx-auto flex h-full w-full max-w-screen-xl flex-1 items-center justify-between lg:px-20 xl:px-[60px]">
          <Link href="/" className={`flex items-center`}>
            <div className="size-12">
              <img src="/logo.svg" alt="logo" width={100} height={100} />
            </div>
            <h4 className="ml-2 font-heading text-xl">{siteConfig.name}</h4>
          </Link>

          <div className={`flex h-full w-1/2 items-center justify-end gap-2`}>
            <Link
              onClick={() => {
                toast.info("Coming Soon")
              }}
              href="#"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "h-9 rounded-full dark:border-white/20"
              )}
            >
              <Icons.user className="mr-2 h-4 w-4" />
              <span>Get Started</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
