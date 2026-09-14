import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

const navigationItems = [
  { label: "Home", active: true },
  { label: "About Us", active: false },
  { label: "Our Brands", active: false },
  { label: "Careers", active: false },
  { label: "News & Media", active: false },
  { label: "Contact Us", active: false },
];

export const HeroSection = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full min-h-[70vh] lg:min-h-[80vh] bg-cover bg-center" style={{ backgroundImage: "url(/figmaAssets/vector-1.png)" }}>
      <header className="flex w-full items-center justify-between px-4 sm:px-6 lg:px-20 py-4 bg-white">
        <img
          className="w-[100px] sm:w-[120px] lg:w-[138.04px] h-auto"
          alt="Company Logo"
          src="/figmaAssets/image-1.png"
        />

        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-9">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              className={`inline-flex flex-col items-start ${
                item.active
                  ? "[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#1b48d4]"
                  : "[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#0c141c]"
              } text-base lg:text-lg tracking-[0] leading-[21.6px]`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[350px]">
            <nav className="flex flex-col gap-6 mt-8">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setIsOpen(false)}
                  className={`text-left px-4 py-2 ${
                    item.active
                      ? "[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#1b48d4]"
                      : "[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#0c141c]"
                  } text-lg tracking-[0] leading-[21.6px]`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <div className="flex items-center justify-center w-full h-full px-4 sm:px-6 lg:px-20 py-12 lg:py-20">
        <div className="flex flex-col items-start gap-8 lg:gap-[70px] w-full max-w-xl lg:max-w-2xl">
          <div className="flex flex-col items-start gap-5 lg:gap-[30px] w-full">
            <Badge className="inline-flex h-auto items-center justify-center gap-2 sm:gap-2.5 px-3 sm:px-[19px] py-1.5 bg-white rounded-[42px] border-0 hover:bg-white">
              <img
                className="w-4 sm:w-[18px] h-4 sm:h-[18px]"
                alt="India Flag"
                src="/figmaAssets/fi-619054.svg"
              />
              <span className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#1b48d4] text-xs sm:text-sm lg:text-base tracking-[0] leading-tight">
                India&apos;s Fastest Growing Tech Conglomerate
              </span>
            </Badge>

            <div className="flex flex-col items-start gap-4 lg:gap-[19px] w-full">
              <h1 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-white text-3xl sm:text-4xl lg:text-5xl tracking-[-1.5px] lg:tracking-[-2.00px] leading-tight lg:leading-[57.6px]">
                Health is Wealth &amp; Wealth is Health!
              </h1>

              <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-white text-base sm:text-lg tracking-[0] leading-relaxed lg:leading-[21.6px]">
                We are more than just a conglomerate — we are a movement, bringing
                together ideas, investments, and innovation to redefine how
                health, wealth, and technology impact everyday life.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:gap-3.5">
            <Link href="/brands" onClick={() => window.scrollTo(0, 0)}>
              <Button className="h-12 lg:h-[52px] bg-white hover:bg-white/90 px-4 sm:px-6 py-2.5 rounded-[10px]">
                <span className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#1b48d4] text-base sm:text-lg lg:text-xl tracking-[0] leading-tight lg:leading-[24.0px]">
                  Explore Our Subsidiaries
                </span>
              </Button>
            </Link>

            <Link href="/about" onClick={() => window.scrollTo(0, 0)}>
              <Button
                variant="outline"
                className="h-12 lg:h-[54px] px-4 sm:px-6 py-2.5 rounded-[10px] border-2 border-white bg-transparent hover:bg-white/10 text-white"
              >
                <span className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-white text-base sm:text-lg lg:text-xl tracking-[0] leading-tight lg:leading-[24.0px]">
                  Learn More
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
