import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export const metadata: Metadata = {
  title: `Page not found · ${site.name}`,
  description: "This page doesn’t exist or has been moved.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <header className="mx-auto flex w-full max-w-6xl items-center px-5 py-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={36} height={36} priority />
            <span className="text-lg font-semibold tracking-tight">{site.name}</span>
          </Link>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
          <p className="text-8xl font-semibold tracking-tighter text-accent sm:text-9xl">404</p>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
          <p className="mt-4 max-w-md text-lg leading-8 text-neutral-400">
            This page doesn’t exist or has been moved. Let’s get you back to the start.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-base font-semibold text-black transition-opacity hover:opacity-85"
          >
            Back to home
          </Link>
        </main>
      </body>
    </html>
  );
}
