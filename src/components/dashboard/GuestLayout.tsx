import React, { type ReactNode } from "react";
import Assets from "./Assets";
import GuestBalance from "./GuestBalance";

interface GuestLayoutProps {
  title: string;
  subTitle: string;
  children: ReactNode;
}

const GuestLayout: React.FC<GuestLayoutProps> = ({
  children,
  title,
  subTitle,
}) => {
  return (
    <div className="lg:w-4/5 w-full flex flex-col">
      <div className="p-6 pb-0">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p className="text-tertiary-4 font-medium font-swiss text-lg md:text-xl">
          {subTitle}
        </p>
      </div>
      {/* Balances */}
      <GuestBalance />

      {/* info and token */}
      {
        <section className="w-full m-h-screen px-6 py-0">
          <div className="flex flex-col md:flex-row  gap-4 w-full">
            <div className="w-full md:w-3/5 flex flex-col gap-4">
              <p className="font-semibold">Information</p>

              <div className="w-full flex flex-col rounded-lg bg-[#2B2B2B80]">
                {children}
              </div>
            </div>

            <div className="w-full md:w-2/5 ">
              <Assets />
            </div>
          </div>
        </section>
      }
    </div>
  );
};

export default GuestLayout;
