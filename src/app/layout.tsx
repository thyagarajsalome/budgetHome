'use client';

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {useState, useEffect} from "react";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {metadata} from './metadata';
import {usePathname, useRouter} from "next/navigation";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const scrollToCalculator = () => {
    setOpen(false);
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById('constructionCostSection');
        element?.scrollIntoView({behavior: "smooth", block: "start"});
      }, 500);
    } else {
      const element = document.getElementById('constructionCostSection');
      element?.scrollIntoView({behavior: "smooth", block: "start"});
    }
  };

  const scrollToAbout = () => {
    setOpen(false);
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById('aboutSection');
        element?.scrollIntoView({behavior: "smooth", block: "start"});
      }, 500);
    } else {
      const element = document.getElementById('aboutSection');
      element?.scrollIntoView({behavior: "smooth", block: "start"});
    }
  };

  const scrollToContact = () => {
    setOpen(false);
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById('contactSection');
        element?.scrollIntoView({behavior: "smooth", block: "start"});
      }, 500);
    } else {
      const element = document.getElementById('contactSection');
      element?.scrollIntoView({behavior: "smooth", block: "start"});
    }
  };






  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="md:hidden sticky top-0 bg-background z-50">
          <div className="container flex items-center justify-between py-4">
              <span className="font-bold text-xl">Toolify</span>
              <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                          <Menu className="h-5 w-5"/>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64">
                      <SheetHeader>
                          <SheetTitle>Toolify</SheetTitle>
                          <SheetDescription>
                              Mobile Navigation
                          </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                          <Link href="/" className="hover:underline">Home</Link>
                          <Button variant="link" onClick={scrollToAbout}>
                              About
                          </Button>
                          <Button variant="link" onClick={scrollToCalculator}>
                              Tools
                          </Button>
                          <Button variant="link" onClick={scrollToContact}>
                              Contact
                          </Button>
                      </div>
                  </SheetContent>
              </Sheet>
          </div>
      </div>
        {children}
      </body>
    </html>
  );
}
