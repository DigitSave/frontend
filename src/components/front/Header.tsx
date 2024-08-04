"use client";

import Link from "next/link";
import { HamburgerIcon, LogoIcon } from "../../icon.js";
// import { BlueCreateWalletButton } from './BlueCreateWalletButton';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link as ScrollLink } from "react-scroll";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className="relative w-full h-20">
      <div
        className={`w-full z-50 fixed top-0 left-0 ${
          scrolled ? "bg-[#008888]" : ""
        } transition-all duration-500 ease-in-out`}
      >
        <div
          className={`flex justify-between items-center h-20 px-10 md:py-6 md:px-20`}
        >
          <Link href={"/"}>
            <LogoIcon />
          </Link>

          {/* desktop nav */}
          <nav className={`hidden md:flex gap-12 items-center`}>
            <ul className="flex gap-8 text-neutral-3">
              <ScrollLink
                to="learn"
                spy={true}
                smooth={true}
                duration={500}
                className={`cursor-pointer hover:text-white ${
                  scrolled ? "text-[#fff]" : ""
                } transition-colors duration-300`}
              >
                Learn
              </ScrollLink>

              <ScrollLink
                to="about"
                spy={true}
                smooth={true}
                duration={500}
                className={`cursor-pointer hover:text-white ${
                  scrolled ? "text-[#fff]" : ""
                } transition-colors duration-300`}
              >
                About Us
              </ScrollLink>

              <ScrollLink
                to="assets"
                spy={true}
                smooth={true}
                duration={500}
                className={`cursor-pointer hover:text-white ${
                  scrolled ? "text-[#fff]" : ""
                } transition-colors duration-300`}
              >
                Crypto Assets
              </ScrollLink>

              <ScrollLink
                to="faq"
                spy={true}
                smooth={true}
                duration={500}
                className={`cursor-pointer hover:text-white ${
                  scrolled ? "text-[#fff]" : ""
                } transition-colors duration-300`}
              >
                FAQ
              </ScrollLink>
            </ul>

            <div className="flex gap-6">
              <Link
                href="/dashboard"
                className={`text-center py-3 px-8 rounded-lg text-neutral-1 transition-all duration-100 ${
                  scrolled
                    ? "bg-transparent border border-neutral-1"
                    : "bg-btn-gradient-0"
                } font-semibold`}
              >
                Lunch App
              </Link>
              {/* <BlueCreateWalletButton label="Create Wallet" coinbaseLogo={true} /> */}
              {/* <ConnectButton showBalance={false} /> */}
            </div>
          </nav>

          {/* Mobile Nav menu */}
          <div className="md:hidden">
            <button>
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </div>

      {/* mobile nav */}
      <nav className="hidden absolute top-20 right-0 flex flex-col gap-2 items-left bg-neutral">
        <ul className="flex flex-col gap-2 text-neutral-3">
          <ScrollLink
            to="learn"
            spy={true}
            smooth={true}
            duration={500}
            className={`cursor-pointer hover:text-white ${
              scrolled ? "text-[#fff]" : ""
            } transition-colors duration-300`}
          >
            Learn
          </ScrollLink>

          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className={`cursor-pointer hover:text-white ${
              scrolled ? "text-[#fff]" : ""
            } transition-colors duration-300`}
          >
            About Us
          </ScrollLink>

          <ScrollLink
            to="assets"
            spy={true}
            smooth={true}
            duration={500}
            className={`cursor-pointer hover:text-white ${
              scrolled ? "text-[#fff]" : ""
            } transition-colors duration-300`}
          >
            Crypto Assets
          </ScrollLink>

          <ScrollLink
            to="faq"
            spy={true}
            smooth={true}
            duration={500}
            className={`cursor-pointer hover:text-white ${
              scrolled ? "text-[#fff]" : ""
            } transition-colors duration-300`}
          >
            FAQ
          </ScrollLink>
        </ul>

        {/* <BlueCreateWalletButton label="Create Wallet" coinbaseLogo={true} /> */}
        {/* <ConnectButton showBalance={false} /> */}
        <Link
          href="/dashboard"
          className=" text-center py-3 px-8 rounded-lg bg-primary-0 text-neutral-1 bg-custom font-semibold"
        >
          Lunch App
        </Link>
      </nav>
    </header>
  );
}
