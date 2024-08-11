"use client";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useSimulateContract,
  useReadContract,
  useWatchContractEvent,
} from "wagmi";
import { factoryContractAddrs } from "@/constants";
import { FactoryAbi } from "@/abis/FactoryContractAbi";
import { base, baseSepolia } from "wagmi/chains";
import { Circle, FileIcon, WalletIconPlain } from "@/icon";
import Image from "next/image";
import { isValidAddress } from "@/utils/validateAddress";
import OverviewLoader from "@/components/dashboard/Loaders/OverviewLoader";
import { ethers } from "ethers";
import { getEventSignature } from "@/utils/getEventSignature";
import { config } from "@/wagmi";
import { toRelativeTime, toFormattedDate } from "@/utils/dateFormat";
import ActivityLoader from "@/components/dashboard/Loaders/ActivityLoader";
import Balances from "@/components/dashboard/Balances";
import { BlueCreateWalletButton } from "@/components/front/BlueCreateWalletButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import GuestLayout from "@/components/dashboard/GuestLayout";
import Assets from "@/components/dashboard/Assets";
import { chain } from "@/utils/chain";
import { useQuery } from "urql";
import { activitiesQuery } from "@/queries/activitiesQuery";

export default function Dashboard() {
  const { address, isConnected } = useAccount();

  const activities = activitiesQuery(address);
  const [result, reexecuteQuery] = useQuery({
    query: activities,
    pause: address == undefined,
  });

  const refreshActivities = () => {
    // Refetch the query and skip the cache
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  const { data: activitiesData, fetching, error: activitiesError } = result;

  // console.log(
  //   activitiesData,
  //   Object.values(activitiesData).every(
  //     (arr) => Array.isArray(arr) && (arr as unknown[]).length === 0
  //   )
  // );

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
    chainId: chain.id,
  });

  // validates if user has created a savings account
  const isAddressValid = savingsAcct ? isValidAddress(savingsAcct) : false;

  // fetch users contract creation event
  useEffect(() => {
    if (!address) return;
  }, [address]);

  // create a savings account for new user
  const { data: createSavingsAccount } = useSimulateContract({
    abi: FactoryAbi,
    address: factoryContractAddrs,
    functionName: "createSavingsAccount",
    chainId: chain.id,
  });
  const { writeContract, isPending } = useWriteContract();

  return (
    <main className="text-neutral-2">
      <Header />
      <section className="flex min-h-screen border-t border-tertiary-6">
        <div className="w-1/5">
          <div className="w-1/5 fixed">
            <Sidebar />
          </div>
        </div>

        {!isConnected && (
          <GuestLayout>
            <div className="flex w-full flex-col item-center py-10 justify-center text-center gap-6">
              <div className="flex justify-center w-full">
                <FileIcon />
              </div>
              <p className="mx-auto text-neutral-6 w-4/5">
                If you don’t have a savings account yet, create a wallet or
                connect a wallet you already own to to create a savings account
                and start saving.
              </p>

              <p className="mx-auto text-neutral-6 w-4/5">
                If you already have a savings account connect your wallet to
                view savings.
              </p>
              <div className="flex justify-center gap-6">
                <BlueCreateWalletButton
                  label="Create Wallet"
                  coinbaseLogo={true}
                />
                <ConnectButton showBalance={false} />
              </div>
            </div>
          </GuestLayout>
        )}

        {isLoading && isConnected && <OverviewLoader />}

        {error && isConnected && (
          <div className="flex w-4/5 flex-col my-auto text-center gap-6">
            <div className="flex justify-center w-full">
              <FileIcon />
            </div>
            {error && (
              <p className="mx-auto text-positive-7 w-2/5">
                Error: {error.message}
              </p>
            )}
          </div>
        )}

        {isAddressValid && isConnected && (
          <div className="w-4/5 flex flex-col">
            {/* Balances */}
            <Balances />

            {/* history and token */}
            <section className="w-full m-h-screen w-4/4 px-6 py-10">
              <div className="flex gap-4 w-full">
                <div className="w-3/5 flex flex-col gap-4">
                  <p className="font-semibold">Recent activities</p>

                  <div className="w-full flex flex-col rounded-lg bg-tertiary-6 min-h-[350px]">
                    {fetching && <ActivityLoader />}

                    {!activitiesData && !fetching && (
                      <div className="p-6 w-full">
                        <p className="text-positive-7 text-center">
                          error fetching activity
                        </p>
                      </div>
                    )}

                    {activitiesData !== undefined &&
                      Object.values(activitiesData).every(
                        (arr) =>
                          Array.isArray(arr) && (arr as unknown[]).length === 0
                      ) &&
                      !fetching && (
                        <div className="flex w-full flex-col item-center justify-center text-center gap-6 pt-10">
                          <div className="flex justify-center w-full">
                            <FileIcon />
                          </div>
                          <p className="mx-auto text-neutral-6 w-2/5">
                            All activities will appear here
                          </p>
                          <button
                            className={`mx-auto mt-10 flex gap-2 items-center font-semibold  justify-center rounded-md bg-primary-0 text-neutral-3  py-4 px-12 ${
                              fetching ? "cursor-not-allowed" : "cursor-pointer"
                            }`}
                            disabled={fetching}
                            onClick={() => refreshActivities()}
                          >
                            {fetching ? "Loading..." : "Refresh"}
                          </button>
                        </div>
                      )}

                    {activitiesData !== undefined &&
                      activitiesData.savingsContractCreateds[0] && (
                        <div className="text-sm p-6">
                          <div className="flex flex-col gap-6">
                            <div className="flex gap-8 justify-between items-center">
                              <div className="flex gap-4">
                                <WalletIconPlain />
                                <div className="flex flex-col gap-1 ">
                                  <p>Savings account credited</p>
                                  <p className="text-xs">
                                    {toRelativeTime(
                                      activitiesData.savingsContractCreateds[0]
                                        .date
                                    )}
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-2 py-1 px-3 items-center bg-tertiary-7 rounded-xl">
                                <Circle />
                                <p>Successful</p>
                              </div>

                              <a
                                href={`https://${
                                  process.env.NODE_ENV === "development"
                                    ? "sepolia.basescan.org"
                                    : process.env.NODE_ENV === "production"
                                    ? "basescan.org"
                                    : "sepolia.basescan.org"
                                }/address/${
                                  activitiesData.savingsContractCreateds[0]
                                    .savingsContract
                                }`}
                                target="_blank"
                              >
                                view
                              </a>

                              <p>
                                {toFormattedDate(
                                  activitiesData.savingsContractCreateds[0].date
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                <Assets />
              </div>
            </section>
          </div>
        )}

        {!isAddressValid && isConnected && !error && !isLoading && (
          <div className="flex w-4/5 flex-col item-center justify-center text-center gap-6">
            <div className="flex justify-center w-full">
              <FileIcon />
            </div>
            <p className="mx-auto text-neutral-6 w-2/5">
              You don’t have a savings account yet, click on the button below to
              create an account
            </p>
            <button
              className={`mx-auto mt-10 flex gap-2 items-center font-semibold  justify-center rounded-md bg-primary-0 text-neutral-3  py-4 px-12 ${
                !Boolean(createSavingsAccount?.request)
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={!Boolean(createSavingsAccount?.request)}
              onClick={() => writeContract(createSavingsAccount!.request)}
            >
              {isPending ? "Loading..." : "create account"}
            </button>
          </div>
        )}

        {fetching}
        {activitiesError}
        {/* {activitiesData } */}
      </section>
    </main>
  );
}
