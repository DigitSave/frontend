"use client";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { BackArrowIcon } from "@/icon";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import CreateSaveForm from "@/components/dashboard/CreateSaveForm";
import { useState } from "react";

export default function CreateSave() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <main className="text-neutral-2">
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <section className="flex min-h-screen border-t border-tertiary-6">
        <div className="w-1/5">
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
        </div>

        <div className="w-4/5 flex flex-col">
          <Link href="/save" className="flex gap-2 p-6 pb-2 items-center">
            <BackArrowIcon />
            <p className="text-tertiary-4">Back</p>
          </Link>

          <div className="p-6 pb-0">
            <h1 className="font-bold text-2xl">Savings</h1>
            <p className="text-tertiary-4 font-medium text-xl">
              Let’s see how well you are doing.
            </p>
          </div>

          <section className="w-full m-h-screen w-4/4 px-6 py-10">
            <div className="flex flex-col rounded-md gap-4 w-full border border-tertiary-4">
              <h1 className="font-swiss text-2xl p-6 border-b border-tertiary-4 w-full">
                Create Savings
              </h1>

              <div className="w-3/5 mx-auto py-6">
                <CreateSaveForm />
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
