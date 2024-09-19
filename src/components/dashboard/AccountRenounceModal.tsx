import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { FactoryAbi } from "@/abis/FactoryContractAbi";
import { useContractAddresses } from "@/constants";
import { useReadContract } from "wagmi";
import { DigitsaveAcctAbi } from "@/abis/DigitsaveAccountAbi";
import Modal from "./Modal";
import { useWaitForTransactionReceipt } from "wagmi";
import { BaseError } from "wagmi";

interface ModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

const AccountRenounceModal: React.FC<ModalProps> = ({
  isOpen,
  onCloseModal,
}) => {
  const { factoryContractAddrs } = useContractAddresses();
  const { address } = useAccount();

  const [isAlertModalOpen, setAlertModalOpen] = useState(true);

  const closeAlertModal = () => {
    setAlertModalOpen(false);
    onCloseModal();
  };

  const { data: savingsAcct }: any = useReadContract({
    abi: FactoryAbi,
    address: factoryContractAddrs,
    functionName: "userSavingsContracts",
    args: [address],
  });

  const {
    data: renounceOwnershipHash,
    error: renounceOwnershipError,
    isPending: renounceOwnershipPending,
    isSuccess: ronounceConfirmed,
    writeContract: renounceOwnership,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: renounceOwnershipHash,
    });

  async function handleTransfer() {
    setAlertModalOpen(true);

    renounceOwnership({
      address: savingsAcct,
      abi: DigitsaveAcctAbi,
      functionName: "renounceOwnership",
      args: [],
    });
  }

  return (
    <>
      <div
        className={`${
          isOpen ? "fixed" : "hidden"
        } inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-30`}
        onClick={onCloseModal} // Close modal on clicking overlay
      >
        <div
          className={`px-8 py-12 rounded-lg sm:w-[500px] bg-[#131313] max-[550px] text-center`}
          onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
        >
          {/* status */}
          <div className="flex justify-center mb-4">
            <svg
              width="73"
              height="73"
              viewBox="0 0 73 73"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.201 3.25C35.7783 2.25 37.2217 2.25 37.799 3.25L65.9449 52C66.5222 53 65.8005 54.25 64.6458 54.25H8.35417C7.19947 54.25 6.47779 53 7.05514 52L35.201 3.25Z"
                fill="#BB2D21"
                fill-opacity="0.2"
                stroke="#BB2D21"
              />
              <path
                d="M38.0205 42.8496C38.0205 43.4848 37.7802 44.0941 37.3523 44.5433C36.9245 44.9925 36.3443 45.2449 35.7393 45.2449C35.1342 45.2449 34.554 44.9925 34.1262 44.5433C33.6984 44.0941 33.458 43.4848 33.458 42.8496C33.458 42.2143 33.6984 41.605 34.1262 41.1558C34.554 40.7066 35.1342 40.4542 35.7393 40.4542C36.3443 40.4542 36.9245 40.7066 37.3523 41.1558C37.7802 41.605 38.0205 42.2143 38.0205 42.8496ZM37.4502 23.0882C37.4502 22.6118 37.2699 22.1548 36.9491 21.8179C36.6282 21.481 36.193 21.2917 35.7393 21.2917C35.2855 21.2917 34.8503 21.481 34.5294 21.8179C34.2086 22.1548 34.0283 22.6118 34.0283 23.0882V33.8671C34.0283 34.3436 34.2086 34.8005 34.5294 35.1374C34.8503 35.4744 35.2855 35.6636 35.7393 35.6636C36.193 35.6636 36.6282 35.4744 36.9491 35.1374C37.2699 34.8005 37.4502 34.3436 37.4502 33.8671V23.0882Z"
                fill="#BB2D21"
              />
            </svg>
          </div>

          {/* Title and Subtitle */}
          <h2 className="text-xl text-white font-semibold mb-3">
            Are you sure you want to Renounce account ownership?
          </h2>
          <p className={`text-neutral-3 mb-4`}>
            Renouncing ownership to your account will cause you to never have
            access to your account ever again. <br />{" "}
            <span className="text-positive-7">
              No one can retrieve this address.
            </span>
          </p>

          <div className="mt-4 flex justify-between items-center w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 w-full">
              <div className="w-full">
                <button
                  className={`w-full rounded-md bg-positive-4 text-white text-sm py-3 px-8 font-medium `}
                  onClick={handleTransfer}
                >
                  {renounceOwnershipPending ? "Renouceing..." : "Renouce"}
                </button>
              </div>
            </div>
          </div>

          {renounceOwnershipError && (
            <>
              <div className="text-center text-red-400 text-sm pt-3 w-full">
                Error:{" "}
                {(renounceOwnershipError as BaseError).shortMessage ||
                  renounceOwnershipError.message}
              </div>
              {/* <div>{renounceOwnershipError.message}</div> */}
            </>
          )}
        </div>

        {isConfirming && (
          <Modal
            centerBg={false}
            onCloseModal={closeAlertModal}
            isOpen={isAlertModalOpen}
            status={
              <div className="flex justify-center mb-8">
                <div className="relative w-16 h-16 flex justify-center items-center">
                  <div className="absolute w-full h-full border-4 border-yellow-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                  <div className="absolute w-full h-full border-4 border-yellow-500 border-t-transparent border-solid rounded-full animate-ring"></div>
                </div>
              </div>
            }
            title="Confirming"
            subtitle="This will only take a few seconds to complete"
          />
        )}

        {renounceOwnershipPending && (
          <Modal
            centerBg={false}
            onCloseModal={closeAlertModal}
            isOpen={isAlertModalOpen}
            status={
              <div className="flex justify-center mb-8">
                <div className="relative w-16 h-16 flex justify-center items-center">
                  <div className="absolute w-full h-full border-4 border-yellow-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                  <div className="absolute w-full h-full border-4 border-yellow-500 border-t-transparent border-solid rounded-full animate-ring"></div>
                </div>
              </div>
            }
            title="Pending"
            subtitle="Check the app"
          />
        )}

        {(ronounceConfirmed || isConfirmed) && (
          <Modal
            centerBg={false}
            onCloseModal={closeAlertModal}
            isOpen={isAlertModalOpen}
            status={
              <svg
                width="140"
                height="141"
                viewBox="0 0 140 141"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_241_2941)">
                  <circle
                    cx="70"
                    cy="66.25"
                    r="66"
                    fill="#94F2F2"
                    fillOpacity="0.1"
                    shapeRendering="crispEdges"
                  />
                </g>
                <circle cx="69.6988" cy="66.25" r="41.2877" fill="#006262" />
                <path
                  d="M88.3882 51.2856C89.2784 52.1758 89.2784 53.619 88.3882 54.5092L65.3999 77.4976C63.8378 79.0597 61.3051 79.0597 59.743 77.4976L51.6124 69.367C50.7219 68.4765 50.7219 67.0327 51.6124 66.1421C52.5022 65.2524 53.9444 65.2515 54.8353 66.1402L59.7443 71.0372C61.3065 72.5956 63.8354 72.5946 65.3964 71.0351L85.1653 51.2848C86.0556 50.3954 87.4983 50.3957 88.3882 51.2856Z"
                  fill="white"
                />
                <defs>
                  <filter
                    id="filter0_d_241_2941"
                    x="0"
                    y="0.25"
                    width="140"
                    height="140"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_241_2941"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_241_2941"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            }
            title="Success"
            subtitle="Transaction has completed successfully"
          />
        )}
      </div>
    </>
  );
};

export default AccountRenounceModal;
