"use client";

import { InfoIcon, WarningIcon } from "@/icon";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { format, addMonths } from "date-fns";
import SubmitBtn from "@/components/dashboard/SubmitBtn";
import { factoryContractAddrs } from "@/constants";
import { FactoryAbi } from "@/abis/FactoryContractAbi";
import { DigitsaveAcctAbi } from "@/abis/DigitsaveAccountAbi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  type BaseError,
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { ethers } from "ethers";

type FormModel = {
  name: string;
  period: number;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name of your save is required").max(50),
  period: Yup.number().required("Lock period is required"),
});

export default function CreateSaveForm() {
  const [lockPeriod, setLockPeriod] = useState("");
  const [displayText, setDisplayText] = useState("");
  const { address } = useAccount();

  useEffect(() => {
    if (lockPeriod === "") {
      setDisplayText("");
      return;
    }

    const value = Number(lockPeriod);
    if (value >= 1) {
      const startDate = new Date();
      const endDate = addMonths(startDate, value);
      const formattedStartDate = format(startDate, "MMMM dd yyyy");
      const formattedEndDate = format(endDate, "MMMM dd yyyy");
      setDisplayText(`${formattedStartDate} to ${formattedEndDate}`);
    }
  }, [lockPeriod]);

  const handleLockPeriodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "" || (Number(value) >= 1 && !isNaN(Number(value)))) {
      setLockPeriod(value);
    }
  };

  const { data: savingsAcct }: any = useReadContract({
    abi: FactoryAbi,
    address: factoryContractAddrs,
    functionName: "userSavingsContracts",
    args: [address],
  });

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(values: FormModel) {
    const name = values.name;
    const period = values.period;
    writeContract({
      address: savingsAcct,
      abi: DigitsaveAcctAbi,
      functionName: "createSaving",
      args: [ethers.utils.formatBytes32String(name), period],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <Formik
      initialValues={{
        name: "",
        period: 1,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        submit(values);
        setSubmitting(false);
      }}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form className="w-full flex flex-col gap-6">
          <div className="flex gap-2 flex-col">
            <label htmlFor="name">Name of save</label>

            <Field
              type="text"
              id="name"
              name="name"
              className="outline-none w-full px-6 py-4 text-neutral-4 rounded-md bg-[#2B2B2B]"
              placeholder="eg : My rent"
            />
            {errors.name && touched.name ? (
              <div className="text-red-500">{errors.name}</div>
            ) : null}
          </div>

          <div className="flex gap-2 flex-col">
            <label htmlFor="period">Lock period</label>
            <div className="flex text-neutral-4 ">
              <Field
                type="number"
                id="period"
                name="period"
                value={lockPeriod}
                onChange={handleLockPeriodChange}
                min="1"
                className="outline-none w-4/5 px-6 py-4 rounded-l bg-[#2B2B2B]"
                placeholder="eg : 2"
              />
              {errors.period && touched.period ? (
                <div className="text-red-500">{errors.period}</div>
              ) : null}
              <p className="w-1/5 px-6 py-4 text-right bg-[#2B2B2B] rounded-r">
                {" "}
                month(s)
              </p>
            </div>
            {displayText && (
              <div className=" mt-2 flex gap-2 p-2 w-full bg-[#42B0B01A] rounded-tr-xl rounded-bl-xl">
                <InfoIcon />
                <Link href="/learn" className="text-xs">
                  From {displayText}
                </Link>
              </div>
            )}
          </div>

          <input required type="hidden" name="address" value={address} />

          <div className="flex gap-2 flex-col">
            <label htmlFor="type">Savings Type</label>
            <Field
              as="select"
              id="type"
              name="type"
              className="outline-none w-full px-6 py-4 text-neutral-4 rounded-md bg-[#2B2B2B]"
            >
              <option value="Fixed Saving">Fixed Saving</option>
              <option value="Fixed Saving" disabled>
                Flexible Saving
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                coming soon
              </option>
            </Field>

            {/* {errors.type && touched.type ? (
              <div className="text-red-500">{errors.type}</div>
            ) : null} */}

            <div className=" mt-2 flex gap-2 p-2 w-full bg-[#FFEF9926] rounded-tr-xl rounded-bl-xl">
              <WarningIcon />
              <div className="flex flex-col gap-2 text-sm">
                <h3 className="font-semibold">Important notice</h3>
                <Link href="/learn" className="">
                  Funds locked in a fixed savings cannot be withdrawn until due
                  date.
                </Link>
              </div>
            </div>
          </div>

          <SubmitBtn label="Create safelock" isSubmitting={isPending} />

          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {error && (
            <div>
              Error: {(error as BaseError).shortMessage || error.message}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
