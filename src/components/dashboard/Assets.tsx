"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useReadContract, useAccount, useChainId } from "wagmi";
import { StorageContractAbi } from "@/abis/StorageContractAbi";
import { assetsDetails } from "@/constants";
import { useContractAddresses } from "@/constants/index";
import { getEthersProvider } from "@/ethersProvider";
import { config } from "@/wagmi";
import { ethers } from "ethers";
import { NumericFormat } from "react-number-format";
import AssetsLoader from "./Loaders/AssetsLoader";
import { AssetDetail } from "@/@types/assets.types";
import { erc20Abi } from "viem";
import { isEqual } from "lodash";

// Define the type for an asset object
interface Asset {
  id: string;
  assetAddress: string;
  chainLinkAggregator: string;
  isActive: boolean;
  price: string;
}

const Assets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextAssetId, setNextAssetId] = useState<number | null>(null);
  const [balances, setBalances] = useState<any[]>([]);
  const { address, isDisconnected } = useAccount();
  const provider = getEthersProvider(config);
  const { storageContractAddrs } = useContractAddresses();
  const chainId = useChainId();

  const {
    data: nextAssetIdData,
    isLoading: isLoadingAssetId,
    error: errorAssetId,
  } = useReadContract({
    abi: StorageContractAbi,
    address: storageContractAddrs,
    functionName: "assetId",
    args: [],
  });

  // Set next asset ID when data is available
  useEffect(() => {
    if (nextAssetIdData) {
      setNextAssetId(parseInt(nextAssetIdData.toString()));
    }
  }, [nextAssetIdData]);

  // Fetch all assets when the next asset ID is set
  useEffect(() => {
    if (nextAssetId !== null) {
      const fetchAllAssets = async () => {
        try {
          const contract = new ethers.Contract(
            storageContractAddrs,
            StorageContractAbi,
            provider
          );

          const assetPromises = Array.from(
            { length: nextAssetId - 1 },
            (_, i) =>
              Promise.all([
                contract.assets(i + 1),
                contract.getAssetDetail(i + 1),
              ])
          );

          const assetsData = await Promise.all(assetPromises);
          const formattedAssets = assetsData.map(
            ([assetData, assetDetailData]) => ({
              id: assetData.id.toString(),
              assetAddress: assetData.asset,
              chainLinkAggregator: assetData.chainLinkAggregator,
              isActive: assetData.isActive,
              price: assetDetailData.price.toString(),
            })
          );

          if (!isEqual(assets, formattedAssets)) {
            setAssets(formattedAssets);
          }
        } catch (error) {
          console.error("Error fetching assets:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAllAssets();
    }
  }, [nextAssetId, chainId, provider, storageContractAddrs]);

  // fetches the balances of a user per asset
  useEffect(() => {
    if (assets.length > 0) {
      const fetchBalances = async () => {
        try {
          const assetBalancePromises = [];
          for (let i = 0; i < assets.length; i++) {
            // Create a new promise for each asset fetch
            assetBalancePromises.push(
              (async () => {
                const contract = new ethers.Contract(
                  assets[i].assetAddress,
                  erc20Abi,
                  provider
                );

                const [balance, decimals] = await Promise.all([
                  contract.balanceOf(address),
                  contract.decimals(),
                ]);

                const formatedBalance = ethers.utils.formatUnits(
                  balance,
                  decimals
                );
                const formatedPrice = ethers.utils.formatUnits(
                  assets[i].price,
                  decimals
                );

                return {
                  balance: formatedBalance,
                  usdBal: parseInt(formatedBalance) * parseInt(formatedPrice),
                };
              })()
            );
          }

          // Wait for all promises to resolve
          const assetBalance = await Promise.all(assetBalancePromises);

          if (!isEqual(balances, assetBalance)) {
            setBalances(assetBalance);
          }
        } catch (error) {
          console.error("Error fetching balances:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBalances();
    }
  }, [assets]);

  if (isLoadingAssetId || loading) return <AssetsLoader />;

  // Error rendering if asset ID retrieval fails
  if (errorAssetId) return <div>Error: {errorAssetId.message}</div>;

  const renderAsset = (asset: Asset, index: number) => {
    if (!asset.isActive || !assetsDetails || !chainId) return null;
    //@ts-ignore
    // const assetDetail = assetsDetails[chainId]?.[asset.assetAddress];

    const unsupportedChainIds: number[] = [
      /* array of chain IDs without Oracle support */
    ];

    const assetDetail = unsupportedChainIds.includes(chainId)
      ? assetsDetails[84532]?.[
          asset.assetAddress as keyof (typeof assetsDetails)[84532]
        ]
      : assetsDetails[chainId]?.[
          asset.assetAddress as keyof (typeof assetsDetails)[typeof chainId]
        ];

    if (!assetDetail) return null;

    const formattedPrice = Number(asset.price) / 10 ** assetDetail.decimal;

    return (
      <div key={index} className="w-full flex justify-between items-center">
        {isDisconnected ? (
          <>
            <div className="flex gap-4 items-center">
              <Image
                width={40}
                height={40}
                src={assetDetail.ticker}
                alt={assetDetail.name}
                className="border border-white rounded-full"
              />
              <div className="flex flex-col gap-1">
                <p>{assetDetail.name}</p>
              </div>
            </div>
            <p>
              {"$ "}
              <NumericFormat
                value={formattedPrice}
                thousandSeparator
                displayType="text"
                decimalScale={2}
                fixedDecimalScale={formattedPrice % 1 === 0}
              />
            </p>
          </>
        ) : (
          <>
            {" "}
            <div className="flex items-center gap-2">
              <Image
                width={40}
                height={40}
                src={`${
                  // @ts-ignore
                  assetsDetails[chainId][asset.assetAddress].ticker
                }`}
                alt={`${
                  // @ts-ignore
                  assetsDetails[chainId][asset.assetAddress].name
                }`}
                className="border border-white rounded-full"
              />
              <div className="flex flex-col">
                <p className="flex items-center gap-1">
                  <span className=" text-base">
                    {
                      // @ts-ignore
                      assetsDetails[chainId][asset.assetAddress].name
                    }
                  </span>
                </p>

                <p className="text-[12px] text-[#979797]">
                  {"$ "}
                  <NumericFormat
                    value={formattedPrice}
                    thousandSeparator
                    displayType="text"
                    decimalScale={2}
                    fixedDecimalScale={formattedPrice % 1 === 0}
                  />
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <p className="flex justify-end gap-1">
                  {balances.length > 0 && (
                    <NumericFormat
                      className=" text-base"
                      thousandSeparator
                      displayType="text"
                      value={balances[index].balance}
                      decimalScale={balances[index].balance % 1 === 0 ? 2 : 8}
                      fixedDecimalScale={
                        balances[index].balance % 1 === 0 ? true : false
                      }
                    />
                  )}
                </p>
                <p className="flex text-[12px] text-[#979797]">
                  {"~ $ "}
                  {balances.length > 0 && (
                    <NumericFormat
                      className="flex justify-end text-[12px] text-[#979797]"
                      thousandSeparator
                      displayType="text"
                      value={balances[index].usdBal}
                      decimalScale={balances[index].usdBal % 1 === 0 ? 2 : 8}
                      fixedDecimalScale={
                        balances[index].usdBal % 1 === 0 ? true : false
                      }
                    />
                  )}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="font-semibold">Supported assets</p>
      <div className="w-full flex flex-col rounded-lg gap-4 bg-[#2B2B2B80] p-6">
        {assets.map(renderAsset)}
      </div>
    </div>
  );
};

export default Assets;
