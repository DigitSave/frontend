"use client";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Circle, WalletIconPlain } from "@/icon";
import { AnimatePresence, motion } from "framer-motion";
import MobileSidebar from "@/components/dashboard/MobileSidebar";

export default function Activities() {
  const { isDisconnected } = useAccount();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (isDisconnected) {
      router.push("/");
    }
  }, [isDisconnected, router]);
  return (
    <main className="text-neutral-2">
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <section className="flex border-t border-tertiary-6">
        <div className="w-1/5 hidden lg:block">
          <div className="w-1/5 fixed">
            <Sidebar />
          </div>
        </div>
        <AnimatePresence>
          {navOpen && (
            <div className="w-full h-screen lg:hidden fixed block  z-20">
              <div
                onClick={() => setNavOpen(!navOpen)}
                className="h-screen w-full cursor-pointer bg-transparent backdrop-blur-sm fixed z-20"
              ></div>
              <motion.div
                exit={{ width: 0, opacity: 0, transition: { duration: 0.6 } }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.9 },
                }}
                initial={{ opacity: 0 }}
                className=" sm:w-1/3 w-full fixed bg-tertiary-0 z-40"
              >
                {" "}
                <MobileSidebar />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="w-4/5 flex flex-col">
          {/* history */}
          <section className="w-full m-h-screen w-4/4 px-6 py-10">
            <div className="flex gap-4 w-full">
              <div className="w-full flex flex-col gap-4">
                <p className="font-semibold">Recent activities</p>
                <p className="text-tertiary-4">
                  Let’s see how well you are doing.
                </p>

                <div className="mt-4 w-full flex flex-col rounded-lg bg-tertiary-6">
                  <div className="text-sm p-6">
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-8 justify-between items-center">
                        <div className="flex gap-4">
                          <WalletIconPlain />
                          <div className="flex flex-col gap-1 ">
                            <p>Savings account credited</p>
                            <p className="text-xs">2 days ago</p>
                          </div>
                        </div>

                        <div className="flex gap-2 py-1 px-3 items-center bg-tertiary-7 rounded-xl">
                          <Circle />
                          <p>Successful</p>
                        </div>

                        <p>$120</p>

                        <p>24-04-2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm p-6">
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-8 justify-between items-center">
                        <div className="flex gap-4">
                          <WalletIconPlain />
                          <div className="flex flex-col gap-1 ">
                            <p>Savings account credited</p>
                            <p className="text-xs">2 days ago</p>
                          </div>
                        </div>

                        <div className="flex gap-2 py-1 px-3 items-center bg-tertiary-7 rounded-xl">
                          <Circle />
                          <p>Successful</p>
                        </div>

                        <p>$120</p>

                        <p>24-04-2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm p-6">
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-8 justify-between items-center">
                        <div className="flex gap-4">
                          <WalletIconPlain />
                          <div className="flex flex-col gap-1 ">
                            <p>Savings account credited</p>
                            <p className="text-xs">2 days ago</p>
                          </div>
                        </div>

                        <div className="flex gap-2 py-1 px-3 items-center bg-tertiary-7 rounded-xl">
                          <Circle />
                          <p>Successful</p>
                        </div>

                        <p>$120</p>

                        <p>24-04-2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm p-6">
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-8 justify-between items-center">
                        <div className="flex gap-4">
                          <WalletIconPlain />
                          <div className="flex flex-col gap-1 ">
                            <p>Savings account credited</p>
                            <p className="text-xs">2 days ago</p>
                          </div>
                        </div>

                        <div className="flex gap-2 py-1 px-3 items-center bg-tertiary-7 rounded-xl">
                          <Circle />
                          <p>Successful</p>
                        </div>

                        <p>$120</p>

                        <p>24-04-2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
