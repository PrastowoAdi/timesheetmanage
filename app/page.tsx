"use client";

import { useCallback } from "react";
import moment from "moment";

import InputActivty from "./components/InputActivity";
import useGetList from "./hooks/useGetList";
import useAddDaily from "./hooks/useAddDaily";

export default function Home() {
  const mutationAddDaily = useAddDaily();
  const { data, isFetching, refetch } = useGetList();

  const onSubmitDailyActivity = useCallback(
    (val: any) => {
      // console.log("tes", val);
      try {
        mutationAddDaily.mutate(
          {
            ...val,
          },
          {
            onSuccess(data) {
              if (data) {
                //set notif success and middleware listen this event
                console.log(data);
                refetch();
              }
            },
            onError(err) {
              console.log("err>>response>>submit", err);
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    [mutationAddDaily, refetch]
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-10 md:p-24">
      <div className="py-2 border-b-2">
        <h1 className="font-bold text-2xl">Daily Timesheet Note</h1>
      </div>
      <InputActivty setFormData={(val: any) => onSubmitDailyActivity(val)} />
      {isFetching ? (
        <svg
          className="animate-spin mt-5 h-8 w-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="#f97316"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="#f97316"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <div className="w-full lg:w-1/2 h-56 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-amber-300 overflow-y-scroll px-10">
          {data.map((item: any, idx: any) => (
            <div
              className="flex gap-3 mx-auto border-b-2 border-amber-500 p-1"
              key={idx}
            >
              <p className="text-sm">{idx + 1 + "."}</p>
              <p className="text-sm">
                {item.activity}
                <span className="block text-xs text-gray-500 mt-1">
                  {moment(item.createdAt).format("DD-MM-YYYY HH:MM:SS")}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
      {/* <div className="bg-slate-400">
      </div> */}
    </main>
  );
}
