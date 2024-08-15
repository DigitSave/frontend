"use client";

import Link from "next/link";
import { CloseIcon, HamburgerIcon, LogoIcon } from "../../icon.js";
import { BlueCreateWalletButton } from "./BlueCreateWalletButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link as ScrollLink } from "react-scroll";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

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
        className={`w-full z-50 fixed top-0 left-0 ${scrolled ? "bg-neutral-8" : ""} transition-all duration-500 ease-in-out`}
      >
        <div
          className={`flex justify-between items-center h-20 px-10 md:py-6 md:px-20`}
        >
          <Link href={"/"}>
            <LogoIcon />
          </Link>

          {/* desktop nav */}
          <nav className="hidden lg:flex gap-12 items-center">
            <ul className="flex gap-8 text-neutral-3">
              <ScrollLink
                to="learn"
                spy={true}
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-white transition-colors duration-300"
              >
                Learn
              </ScrollLink>

              <ScrollLink
                to="about"
                spy={true}
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-white transition-colors duration-300"
              >
                About Us
              </ScrollLink>

              <ScrollLink
                to="assets"
                spy={true}
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-white transition-colors duration-300"
              >
                Crypto Assets
              </ScrollLink>

              <ScrollLink
                to="faq"
                spy={true}
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-white transition-colors duration-300"
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
                Launch App
              </Link>
              {/* <BlueCreateWalletButton label="Create Wallet" coinbaseLogo={true} /> */}
              {/* <ConnectButton showBalance={false} /> */}
            </div>
          </nav>

          {/* Mobile Nav menu */}
          <div className="lg:hidden flex gap-6">
            <ConnectButton showBalance={false} />
            <button onClick={() => setNavOpen(!navOpen)}>
              {navOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile nav */}
      {/* {navOpen && ( */}
      <nav
        className={`lg:hidden absolute top-20 right-0 ${navOpen ? "flex" : "hidden"} flex-col gap-4 items-left bg-tertiary-0 w-full px-6 py-6 transition-all duration-500 ease-in-out`}
      >
        <ul className="flex flex-col gap-2 text-neutral-3">
          <ScrollLink
            to="learn"
            spy={true}
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-white hover:bg-[#2B2B2B4D] py-4 px-4 transition-colors duration-300"
          >
            Learn
          </ScrollLink>

          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-white  hover:bg-[#2B2B2B4D] py-4 px-4 transition-colors duration-300"
          >
            About Us
          </ScrollLink>

          <ScrollLink
            to="assets"
            spy={true}
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-white hover:bg-[#2B2B2B4D] py-4 px-4 transition-colors duration-300"
          >
            Crypto Assets
          </ScrollLink>

          <ScrollLink
            to="faq"
            spy={true}
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-white  hover:bg-[#2B2B2B4D] py-4 px-4 transition-colors duration-300"
          >
            FAQ
          </ScrollLink>
        </ul>

        <BlueCreateWalletButton label="Create Wallet" coinbaseLogo={true} />
        {/* <ConnectButton showBalance={false} /> */}
        <Link
          href="/dashboard"
          className=" text-center py-3 px-8 rounded-lg bg-primary-0 text-neutral-1 bg-custom font-semibold"
        >
          Launch App
        </Link>
      </nav>
      {/* )} */}
    </header>
  );
}
