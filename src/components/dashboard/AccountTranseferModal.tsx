import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { ethers } from "ethers";
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

const AccountTransferModal: React.FC<ModalProps> = ({
  isOpen,
  onCloseModal,
}) => {
  const { factoryContractAddrs } = useContractAddresses();
  const { address } = useAccount();
  const [newAddress, setNewAddress] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

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
    data: transferOwnershipHash,
    error: transferOwnershipError,
    isPending: transferOwnershipPending,
    writeContract: transferOwnership,
    isSuccess: transferConfirmed,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: transferOwnershipHash,
    });

  async function handleTransfer() {
    setAlertModalOpen(true);

    transferOwnership({
      address: savingsAcct,
      abi: DigitsaveAcctAbi,
      functionName: "transferOwnership",
      args: [newAddress],
    });
  }

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setNewAddress(inputValue);

    // Validate input as an ERC20 address
    if (ethers.utils.isAddress(inputValue)) {
      setError("");
      setIsValid(true);
    } else {
      setError("Invalid ERC20 address.");
      setIsValid(false);
    }
  };

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
                fill="#F68524"
                fillOpacity="0.3"
                stroke="#FAB67C"
              />
              <path
                d="M37.0205 42.8496C37.0205 43.2349 36.8743 43.5953 36.6282 43.8536C36.3837 44.1103 36.0629 44.2449 35.7393 44.2449C35.4156 44.2449 35.0948 44.1103 34.8503 43.8536C34.6043 43.5953 34.458 43.2349 34.458 42.8496C34.458 42.4642 34.6043 42.1038 34.8503 41.8455C35.0948 41.5888 35.4156 41.4542 35.7393 41.4542C36.0629 41.4542 36.3837 41.5888 36.6282 41.8455C36.8743 42.1038 37.0205 42.4642 37.0205 42.8496ZM36.2249 22.5076C36.364 22.6536 36.4502 22.8617 36.4502 23.0882V33.8671C36.4502 34.0937 36.364 34.3017 36.2249 34.4478C36.0874 34.5922 35.9116 34.6636 35.7393 34.6636C35.5669 34.6636 35.3911 34.5922 35.2536 34.4478C35.1145 34.3017 35.0283 34.0937 35.0283 33.8671V23.0882C35.0283 22.8617 35.1145 22.6536 35.2536 22.5076C35.3911 22.3632 35.5669 22.2917 35.7393 22.2917C35.9116 22.2917 36.0874 22.3632 36.2249 22.5076Z"
                fill="#BB2D21"
                stroke="#FAB67C"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Title and Subtitle */}
          <h2 className="text-xl text-white font-semibold mb-2">
            Transfer account ownership
          </h2>
          <p className={`text-neutral-3 mb-4`}>
            Transferring ownership to a new address will automatically make the
            new address the owner of your savings account.
          </p>

          <div className="mt-4 flex justify-between items-center w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 w-full">
              <div className="w-full sm:w-1/2">
                <input
                  type="text"
                  placeholder="new owner"
                  value={newAddress}
                  onChange={handleInputChange}
                  className="w-full placeholder-tertiary-5 py-3 text-sm rounded-md bg-transparent border border-neutral-5 px-2 outline-none focus:ring-1 ring-primary-1"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <button
                  className={`w-full rounded-md bg-[#008080] text-white text-sm py-3 px-8 font-medium ${
                    !isValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleTransfer}
                  disabled={!isValid || transferOwnershipPending}
                >
                  {transferOwnershipPending ? "Transferring..." : "Transfer"}
                </button>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs pt-2">{error}</p>}

          {transferOwnershipError && (
            <>
              <div className="text-center text-red-400 text-sm pt-3 w-full">
                Error:{" "}
                {(transferOwnershipError as BaseError).shortMessage ||
                  transferOwnershipError.message}
              </div>
              {/* <div>{transferOwnershipError.message}</div> */}
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

        {transferOwnershipPending && (
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

        {transferConfirmed ||
          (isConfirmed && (
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
          ))}
      </div>
    </>
  );
};

export default AccountTransferModal;
