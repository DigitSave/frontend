"use client";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getEthersProvider } from "@/ethersProvider";
import { config } from "@/wagmi";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AccountTranseferModal from "@/components/dashboard/AccountTranseferModal";
import AccountRenounceModal from "@/components/dashboard/AccountRenounceModal";

export default function Dashboard() {
  const [isTransferAlertModalOpen, setTransfertAlertModalOpen] =
    useState(false);
  const [isRenounceAlertModalOpen, setRenounceAlertModalOpen] = useState(false);

  const { isDisconnected } = useAccount();

  const closeseTransfertAlertModal = () => {
    setTransfertAlertModalOpen(false);
  };

  const closeRenounceAlertModal = () => {
    setRenounceAlertModalOpen(false);
  };

  // useEffect(() => {
  //   if (isDisconnected) {
  //     router.push("/dashboard");
  //   }
  // }, [isDisconnected, router]);

  const provider = getEthersProvider(config);

  const [navOpen, setNavOpen] = useState(false);

  return (
    <main className="text-neutral-2">
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <section className="flex min-h-screen border-t border-tertiary-6">
        <div className="w-1/5">
          <Sidebar />
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
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col">
            <div className="p-6 pb-0">
              <h1 className="font-bold text-2xl">Account</h1>
              <p className="text-tertiary-4 font-medium text-xl">
                Manage your savings account here.
              </p>
            </div>
            {/* actions  */}
            <section className="w-full m-h-screen w-4/4 px-6  h-[500px] overflow-y-scroll py-10">
              <div className="flex gap-4 w-full">
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex flex-col  rounded-lg  ">
                    <div className="w-full flex flex-col gap-4">
                      <div
                        className="flex justify-between items-center border-b border-tertiary-4 py-8 cursor-pointer"
                        onClick={() => {
                          setTransfertAlertModalOpen(true);
                          setRenounceAlertModalOpen(false);
                        }}
                      >
                        <div className="">
                          <h3 className="font-medium text-2xl">
                            Transfer account ownership
                          </h3>
                        </div>
                        <div className="">
                          <button className="rounded-md bg-secondry-6 text-tertiary-7 text-sm py-3 px-8 font-semibold">
                            Start
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                      <div
                        className="flex justify-between items-center border-b border-tertiary-4 py-8 cursor-pointer"
                        onClick={() => {
                          setRenounceAlertModalOpen(true);
                          setTransfertAlertModalOpen(false);
                        }}
                      >
                        <div className="">
                          <h3 className="font-medium text-2xl">
                            Renounce ownership
                          </h3>
                        </div>
                        <div className="">
                          <button className="rounded-md bg-secondry-6 text-tertiary-7 text-sm py-3 px-8 font-semibold">
                            Start
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <AccountTranseferModal
        onCloseModal={closeseTransfertAlertModal}
        isOpen={isTransferAlertModalOpen}
      />

      <AccountRenounceModal
        onCloseModal={closeRenounceAlertModal}
        isOpen={isRenounceAlertModalOpen}
      />
    </main>
  );
}
