"use client";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useSimulateContract,
  useReadContract,
} from "wagmi";
import { useContractAddresses } from "@/constants/index";
import { DigitsaveAcctAbi } from "@/abis/DigitsaveAccountAbi";
import { FactoryAbi } from "@/abis/FactoryContractAbi";
import {
  Circle,
  FileIcon,
  FilterIcon,
  InfoIcon,
  SearchIcon,
  WalletIconPlain,
} from "@/icon";
import { isValidAddress } from "@/utils/validateAddress";
import OverviewLoader from "@/components/dashboard/Loaders/OverviewLoader";
import Balances from "@/components/dashboard/Balances";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import GuestLayout from "@/components/dashboard/GuestLayout";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Assets from "@/components/dashboard/Assets";
import { getEthersProvider } from "@/ethersProvider";
import { config } from "@/wagmi";
import { ethers } from "ethers";
import { NumericFormat } from "react-number-format";
import { toFormattedDate, toRelativeTime } from "@/utils/dateFormat";
import SavingListLoader from "@/components/dashboard/Loaders/SavingListLoader";
import Web3 from "web3";

export default function Save() {
  const { factoryContractAddrs } = useContractAddresses();
  const { address, isConnected } = useAccount();
  const [savings, setSavings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextSavingId, setNextSavingId] = useState<number | null>(null);
  const provider = getEthersProvider(config);
  const [navOpen, setNavOpen] = useState(false);
  const web3 = new Web3();

  // fetch users contract >> savings account
  const {
    data: savingsAcct,
    error: errorUserSavingsContracts,
    isLoading: isLoadingUserSavingsContracts,
  }: any = useReadContract({
    abi: FactoryAbi,
    address: factoryContractAddrs,
    functionName: "userSavingsContracts",
    args: [address],
  });

  // validates if user has created a savings account
  const isSavingsContractAddrsValid = savingsAcct
    ? isValidAddress(savingsAcct)
    : false;

  // create a savings account for new user
  const { data: createSavingsAccount } = useSimulateContract({
    abi: FactoryAbi,
    address: factoryContractAddrs,
    functionName: "createSavingsAccount",
  });
  const { writeContract, isPending } = useWriteContract();

  // fetch number of savings by user
  const {
    data: savingsId,
    error: errorSavingId,
    isLoading: isLoadingSavingId,
  }: any = useReadContract({
    abi: DigitsaveAcctAbi,
    address: savingsAcct,
    functionName: "savingId",
  });

  // validates if user has atleast 1 savings
  const hasSavings = savingsId > 1 ? true : false;
  console.log(hasSavings, savingsId);

  console.log(savings);

  useEffect(() => {
    if (savingsId) {
      setNextSavingId(parseInt(savingsId.toString()));
    }
  }, [savingsId]);

  useEffect(() => {
    if (nextSavingId !== null) {
      const fetchAllSavings = async () => {
        try {
          // Create an array of promises to fetch savings data
          const savingPromises = [];
          for (let i = 1; i < nextSavingId; i++) {
            // Each promise fetches data for a specific saving ID
            savingPromises.push(
              (async () => {
                const contract = new ethers.Contract(
                  savingsAcct,
                  DigitsaveAcctAbi,
                  provider
                );

                const savingData = await contract.savings(i);

                return {
                  id: savingData.id.toString(),
                  totalDepositInUSD: savingData.totalDepositInUSD.toString(),
                  totalWithdrawnInUSD:
                    savingData.totalWithdrawnInUSD.toString(),
                  totalAssetLocked: savingData.totalAssetLocked.toString(),
                  lockPeriod: savingData.lockPeriod,
                  isCompleted: savingData.isCompleted,
                  name: savingData.name,
                  date: 1725412179,
                };
              })()
            );
          }

          // Wait for all promises to resolve
          const savingsData = await Promise.all(savingPromises);
          setSavings(savingsData);
        } catch (error) {
          console.error("Error fetching assets:", error);
        } finally {
          // Ensure loading state is updated
          setLoading(false);
        }
      };

      fetchAllSavings();
    }
  }, [nextSavingId]);

  return (
    <main className="text-neutral-2">
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <section className="flex min-h-screen border-t border-tertiary-6">
        {/* sidebar */}
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

        {/* guest */}
        {!isConnected && (
          <GuestLayout
            title={"Savings"}
            subTitle="Let’s see how well you are doing."
          >
            <div className="flex w-full flex-col item-center py-10 justify-center text-center gap-6 min-h-[350px]">
              <div className="flex justify-center w-full">
                <FileIcon />
              </div>
              <p className="mx-auto text-neutral-6 w-4/5">
                Connect your wallet to start saving.
              </p>

              <div className="flex justify-center gap-6">
                <ConnectButton showBalance={false} />
              </div>
            </div>
          </GuestLayout>
        )}

        {(isConnected && isLoadingSavingId) ||
          (isConnected && isLoadingUserSavingsContracts && <OverviewLoader />)}

        {/* {isConnected && errorUserSavingsContracts && (
          <div className="flex w-4/5 flex-col my-auto text-center gap-6">
            <div className="flex justify-center w-full">
              <FileIcon />
            </div>
            {errorUserSavingsContracts && (
              <p className="mx-auto text-positive-7 w-2/5">
                Error: {errorUserSavingsContracts.message}
              </p>
            )}
          </div>
        )} */}

        {/* {isConnected && errorSavingId && !errorUserSavingsContracts && (
          <div className="flex w-4/5 flex-col my-auto text-center gap-6">
            <div className="flex justify-center w-full">
              <FileIcon />
            </div>
            {errorSavingId && (
              <p className="mx-auto text-positive-7 w-2/5">
                Error: {errorSavingId.message}
              </p>
            )}
          </div>
        )} */}

        {/* user have not created a savings account */}
        {isConnected &&
          !isSavingsContractAddrsValid &&
          !errorUserSavingsContracts &&
          !isLoadingUserSavingsContracts && (
            <div className="w-full lg:w-4/5 ">
              <h1 className="f p-6 pb-2 font-bold text-lg font-swiss mb-20">
                <p className="text-white sm:px-4">Savings</p>
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
          )}

        {isConnected && hasSavings && (
          <div className="w-full lg:w-4/5 flex flex-col">
            <div className="p-6 pb-0">
              <h1 className="font-bold text-2xl">Savings</h1>
              <p className="text-tertiary-4 font-medium text-xl">
                Let’s see how well you are doing.
              </p>
            </div>

            {/* Balances */}
            <Balances />

            <section className="w-full m-h-screen px-6 py-10">
              <div className="flex gap-4 w-full">
                <div className="w-full flex flex-col gap-4">
                  <h1 className="font-swiss text-2xl">All Savings</h1>
                  <form action="" className="flex gap-2">
                    <div className="py-3 px-5 flex items-center gap-2 bg-tertiary-5 rounded-md">
                      <label htmlFor="search">
                        <SearchIcon />
                      </label>
                      <input
                        className="bg-transparent outline-none"
                        id="search"
                        type="text"
                      />
                    </div>
                    <button className="py-3 px-5 bg-tertiary-5 rounded-md">
                      <FilterIcon />
                    </button>
                  </form>

                  <div className="">
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-[#0D0D0D] border border-tertiary-5">
                        <thead className="">
                          <tr className="bg-tertiary-5 text-neutral-1">
                            <th className="px-2 border-b border-tertiary-5 text-center py-[23px]">
                              S/N
                            </th>
                            <th className="px-2 border-b border-tertiary-5 text-center py-[23px]">
                              Save Name
                            </th>
                            {/* <th className="px-2 border-b border-tertiary-5 text-center py-[23px]">
                              Date Created
                            </th> */}
                            <th className="px-2 border-b border-tertiary-5 text-center py-[23px]">
                              Total Amount
                            </th>
                            <th className="px-2 border-b border-tertiary-5 text-center py-[23px]">
                              Type
                            </th>
                            <th className="px-2 border-b border-tertiary-5 text-center py-[23px]">
                              Due
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading && <SavingListLoader />}

                          {savings.map((saving, index) => (
                            <tr
                              key={index}
                              className="hover:bg-tertiary-4 transition-all ease-in-out py-[23px]"
                            >
                              <td className="border-b border-tertiary-5 text-center">
                                <Link
                                  href={`/view-save?id=${saving.id}&datecreated=${saving.date}&period=${saving.lockPeriod}`}
                                  className="inline-block px-2 py-[23px] w-full"
                                >
                                  #{index + 1}
                                </Link>
                              </td>

                              <td className="border-b border-tertiary-5 text-center">
                                <Link
                                  href={`/view-save?id=${saving.id}&datecreated=${saving.date}&period=${saving.lockPeriod}`}
                                  className="inline-block px-2 py-[23px] w-full"
                                >
                                  {/* {ethers.utils.parseBytes32String(saving.name)} */}
                                  {Web3.utils.hexToUtf8(saving.name)}
                                </Link>
                              </td>

                              {/* <td className="border-b border-tertiary-5 text-center">
                                <Link
                                  href={`/view-save?id=${saving.id}&datecreated=${saving.date}&period=${saving.lockPeriod}`}
                                  className="inline-block px-2 py-[23px] w-full"
                                >
                                  {toFormattedDate(saving.date)}
                                </Link>
                              </td> */}

                              <td className="border-b border-tertiary-5 text-center">
                                <Link
                                  href={`/view-save?id=${saving.id}&datecreated=${saving.date}&period=${saving.lockPeriod}`}
                                  className="inline-block px-2 py-[23px] w-full"
                                >
                                  $
                                  <NumericFormat
                                    thousandSeparator
                                    displayType="text"
                                    value={web3.utils.fromWei(
                                      saving.totalDepositInUSD,
                                      "ether"
                                    )}
                                    decimalScale={2}
                                    fixedDecimalScale={
                                      saving.totalDepositInUSD % 1 === 0
                                        ? true
                                        : false
                                    }
                                  />
                                </Link>
                              </td>

                              <td className="border-b border-tertiary-5 text-center">
                                <Link
                                  href={`/view-save?id=${saving.id}&datecreated=${saving.date}&period=${saving.lockPeriod}`}
                                  className="inline-block px-2 py-[23px] w-full"
                                >
                                  Fixed
                                </Link>
                              </td>

                              <td className="border-b border-tertiary-5 text-center">
                                <Link
                                  href={`/view-save?id=${saving.id}&datecreated=${saving.date}&period=${saving.lockPeriod}`}
                                  className="inline-block px-2 py-[23px] w-full"
                                >
                                  {toRelativeTime(saving.lockPeriod)}
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {isConnected &&
          !hasSavings &&
          !errorSavingId &&
          !isLoadingSavingId &&
          !errorUserSavingsContracts &&
          !isLoadingUserSavingsContracts && (
            <div className="w-full lg:w-4/5 flex flex-col">
              <div className="p-6 pb-0">
                <h1 className="font-bold text-2xl">Savings</h1>
                <p className="text-tertiary-4 font-medium text-xl">
                  Let’s see how well you are doing.
                </p>
              </div>
              {/* Balances */}
              <Balances />

              <div className="mx-6 mt-2 flex gap-2 p-2 w-[170px] bg-[#42B0B01A] rounded-tr-xl rounded-bl-xl">
                <InfoIcon />
                <Link href="/learn#faq" className="text-xs">
                  What is a Saving?
                </Link>
              </div>

              <div className="w-full px-6">
                <div className="flex w-full mt-8 rounded py-12 bg-[#2B2B2B80] flex-col item-center justify-center text-center gap-6">
                  <div className="flex justify-center w-full">
                    <FileIcon />
                  </div>
                  <p className="text-neutral-3 text-xl font-medium">
                    No savings found
                  </p>
                  <p className="mx-auto text-neutral-6 w-2/5">
                    All savings created will be found here
                  </p>
                  <Link
                    href="/create-save"
                    className={`mx-auto mt-5 flex gap-2 items-center font-semibold  justify-center rounded-md bg-primary-0 text-neutral-3 w-44 py-4 mb-3 px-2 `}
                  >
                    create save
                  </Link>
                </div>
              </div>
            </div>
          )}
      </section>
    </main>
  );
}
