"use client";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useSimulateContract,
  useWriteContract,
} from "wagmi";
import { getEthersProvider } from "@/ethersProvider";
import { config } from "@/wagmi";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AccountTranseferModal from "@/components/dashboard/AccountTranseferModal";
import AccountRenounceModal from "@/components/dashboard/AccountRenounceModal";
import { isValidAddress } from "@/utils/validateAddress";
import { FactoryAbi } from "@/abis/FactoryContractAbi";
import { useContractAddresses } from "@/constants";
import { FileIcon } from "@/icon";

export default function Dashboard() {
  const [isTransferAlertModalOpen, setTransfertAlertModalOpen] =
    useState(false);
  const [isRenounceAlertModalOpen, setRenounceAlertModalOpen] = useState(false);
  const { factoryContractAddrs } = useContractAddresses();

  const { isDisconnected } = useAccount();

  const closeseTransfertAlertModal = () => {
    setTransfertAlertModalOpen(false);
  };

  const closeRenounceAlertModal = () => {
    setRenounceAlertModalOpen(false);
  };
  const { address } = useAccount();

  // fetch users contract >> savings account
  const {
    data: savingsAcct,
    error,
    isLoading,
  }: any = useReadContract({
    abi: FactoryAbi,
    address: factoryContractAddrs,
    functionName: "userSavingsContracts",
    args: [address],
  });

  const router = useRouter();

  useEffect(() => {
    if (isDisconnected) {
      router.push("/dashboard");
    }
  }, [isDisconnected, router]);

  // create a savings account for new user
  const { data: createSavingsAccount } = useSimulateContract({
    abi: FactoryAbi,
    address: factoryContractAddrs,
    functionName: "createSavingsAccount",
  });

  const { writeContract, isPending } = useWriteContract();

  const [navOpen, setNavOpen] = useState(false);
  const isAddressValid = savingsAcct ? isValidAddress(savingsAcct) : false;

  return (
    <main className="text-neutral-2">
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <section className="flex min-h-screen border-t border-tertiary-6">
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

        {/* NO SAVINGS ACCOUNT LAYOUT */}
        {!isAddressValid ? (
          <div className="w-full lg:w-4/5 ">
            <h1 className="f p-6 pb-2 font-bold text-lg font-swiss mb-20">
              <p className="text-white sm:px-4">Account</p>
            </h1>
            <div className="flex w-full flex-col item-center justify-center text-center gap-6">
              <div className="flex justify-center w-full">
                <FileIcon />
              </div>

              <p className="text-neutral-3 text-xl font-medium">
                No savings Account found
              </p>
              <p className="mx-auto text-neutral-6 w-3/5 lg:w-2/5">
                You don’t have a savings account yet.
              </p>
              <button
                className={` mx-auto mt-10 flex gap-2 items-center font-semibold  justify-center rounded-md bg-primary-0 text-white  py-3 md:py-4 px-10 md:px-12 ${
                  !Boolean(createSavingsAccount?.request)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                disabled={!Boolean(createSavingsAccount?.request)}
                onClick={() => writeContract(createSavingsAccount!.request)}
              >
                <span className="">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.8313 0H6.16868L0 6.16867V13.8313L6.16868 20H13.8313L20 13.8313V6.16867L13.8313 0ZM7.22892 13.9277L3.27712 9.97589L7.22892 6.0241C8.72289 4.53012 11.1807 4.53012 12.6747 6.0241L16.6265 9.97589L12.6747 13.9277C11.1807 15.4217 8.77108 15.4217 7.22892 13.9277Z"
                      fill="#F7F7F7"
                    />
                  </svg>
                </span>
                <span>{isPending ? "Loading..." : "create account"}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-4/5 flex flex-col gap-4">
            <div className="w-full flex flex-col">
              <div className="p-6 pb-0">
                <h1 className="font-bold text-2xl">Account</h1>
                <p className="text-tertiary-4 font-medium text-xl">
                  Manage your savings account here.
                </p>
              </div>
              {/* actions  */}
              <section className="w-full m-h-screen px-6  h-[500px] overflow-y-scroll py-10">
                <div className="flex gap-4 w-full">
                  <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-col  rounded-lg  ">
                      <div className="w-full flex flex-col gap-4">
                        <div
                          className="flex justify-between items-center border-b border-tertiary-4 gap-4 py-8 cursor-pointer"
                          onClick={() => {
                            setTransfertAlertModalOpen(true);
                            setRenounceAlertModalOpen(false);
                          }}
                        >
                          <div className="">
                            <h3 className="font-medium text-xl sm:text-2xl lg:text-2xl">
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
                          className="flex gap-4 justify-between items-center border-b border-tertiary-4 py-8 cursor-pointer"
                          onClick={() => {
                            setRenounceAlertModalOpen(true);
                            setTransfertAlertModalOpen(false);
                          }}
                        >
                          <div className="">
                            <h3 className="font-medium text-xl sm:text-2xl lg:text-2xl">
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
        )}
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
