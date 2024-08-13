"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BaseError, useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import { StorageContractAbi } from "@/abis/StorageContractAbi";
import { assetsDetails, storageContractAddrs } from "@/constants";
import { chain } from "@/utils/chain";
import { getEthersProvider } from "@/ethersProvider";
import { config } from "@/wagmi";
import { ethers } from "ethers";
import { NumericFormat } from "react-number-format";

export default function Assets() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextAssetId, setNextAssetId] = useState<number | null>(null);
  const provider = getEthersProvider(config);

  const { chainId } = useAccount();
  // Fetch nextAssetId using useReadContract
  const {
    data: nextAssetIdData,
    error: errorAssetId,
    isLoading: isLoadingAssetId,
  } = useReadContract({
    abi: StorageContractAbi,
    address: storageContractAddrs,
    functionName: "assetId",
    args: [],
    chainId,
  });

  console.log(assets);
  useEffect(() => {
    if (nextAssetIdData) {
      setNextAssetId(parseInt(nextAssetIdData.toString()));
    }
  }, [nextAssetIdData]);

  useEffect(() => {
    if (nextAssetId !== null) {
      const fetchAllAssets = async () => {
        try {
          const assetPromises = [];
          for (let i = 1; i < nextAssetId; i++) {
            // Create a new promise for each asset fetch
            assetPromises.push(
              (async () => {
                const contract = new ethers.Contract(
                  storageContractAddrs,
                  StorageContractAbi,
                  provider
                );

                const [assetData, assetDetailData] = await Promise.all([
                  contract.assets(i),
                  contract.getAssetDetail(i),
                ]);

                return {
                  id: assetData.id.toString(),
                  assetAddress: assetData.asset,
                  chainLinkAggregator: assetData.chainLinkAggregator,
                  isActive: assetData.isActive,
                  price: assetDetailData.price.toString(),
                };
              })()
            );
          }

          // Wait for all promises to resolve
          const assetsData = await Promise.all(assetPromises);
          setAssets(assetsData);
        } catch (error) {
          console.error("Error fetching assets:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAllAssets();
    }
  }, [nextAssetId]);

  if (isLoadingAssetId || loading) return <div>Loading...</div>;
  if (errorAssetId) return <div>Error: {errorAssetId.message}</div>;

  console.log(nextAssetId);

  return (
    <div className="w-2/5 flex flex-col gap-4">
      <p className="font-semibold">Supported assets {nextAssetId}</p>
      {errorAssetId && (
        <div>
          Error:{" "}
          {(errorAssetId as BaseError).shortMessage || errorAssetId.message}
        </div>
      )}
      <div className="w-full flex flex-col rounded-lg gap-4 bg-[#2B2B2B80] p-6">
        {assets.map(
          (asset, index) =>
            // console.log(asset.assetAddress)
            //   <li key={index}>
            //     ID: {asset.id}, Address: {asset.assetAddress}, Price: {asset.price.toString()}, Active: {asset.isActive.toString()}
            //   </li>
            asset.isActive && (
              <div
                key={index}
                className="w-full flex justify-between items-center"
              >
                <div className="flex gap-4 items-center">
                  <Image
                    width={48}
                    height={48}
                    src={`${assetsDetails[chainId][asset.assetAddress].ticker}`}
                    alt={`${assetsDetails[chainId][asset.assetAddress].name}`}
                    className="border border-white rounded-full"
                  />
                  <div className="flex flex-col gap-1 ">
                    <p>{assetsDetails[chainId][asset.assetAddress].name}</p>
                  </div>
                </div>

                <p>
                  {"$ "}
                  <NumericFormat
                    thousandSeparator
                    displayType="text"
                    value={
                      asset.price /
                      10 ** assetsDetails[chainId][asset.assetAddress].decimal
                    }
                    decimalScale={
                      asset.price /
                        10 **
                          assetsDetails[chainId][asset.assetAddress].decimal &&
                      (asset.price /
                        10 **
                          assetsDetails[chainId][asset.assetAddress].decimal) %
                        1 ===
                        0
                        ? 0
                        : 2
                    }
                    fixedDecimalScale={
                      asset.price /
                        10 **
                          assetsDetails[chainId][asset.assetAddress].decimal &&
                      !(
                        (asset.price /
                          10 **
                            assetsDetails[chainId][asset.assetAddress]
                              .decimal) %
                          1 ===
                        0
                      ) === 0
                        ? true
                        : false
                    }
                  />
                  <span></span>
                </p>
              </div>
            )
        )}

        {/* <div className="w-full flex justify-between  items-center">
          <div className="flex gap-4 items-center">
            <Image
              width={48}
              height={48}
              src="/images/bitcoin.png"
              alt="bitcoin"
            />
            <div className="flex flex-col gap-1 ">
              <p>USDT </p>
            </div>
          </div>

          <p>23.00%</p>
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Image
              width={48}
              height={48}
              src="/images/bitcoin.png"
              alt="bitcoin"
            />
            <div className="flex flex-col gap-1 ">
              <p>USDT </p>
            </div>
          </div>

          <p>23.00%</p>
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Image
              width={48}
              height={48}
              src="/images/bitcoin.png"
              alt="bitcoin"
            />
            <div className="flex flex-col gap-1 ">
              <p>USDT </p>
            </div>
          </div>

          <p>23.00%</p>
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Image
              width={48}
              height={48}
              src="/images/bitcoin.png"
              alt="bitcoin"
            />
            <div className="flex flex-col gap-1 ">
              <p>USDT </p>
            </div>
          </div>

          <p>23.00%</p>
        </div> */}
      </div>
    </div>
  );
}
