import React from "react";
import { useQuery } from "urql";
import { activitiesQuery } from "@/queries/activitiesQuery";
import ActivityLoader from "@/components/dashboard/Loaders/ActivityLoader";
import { useAccount } from "wagmi";
import { Circle, FileIcon, WalletIconPlain } from "@/icon";
import { toRelativeTime, toFormattedDate } from "@/utils/dateFormat";


export default function Activities() {
  const { address } = useAccount();
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

  return (
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
            (arr) => Array.isArray(arr) && (arr as unknown[]).length === 0
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
                          activitiesData.savingsContractCreateds[0].date
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
                      activitiesData.savingsContractCreateds[0].savingsContract
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
  );
}
