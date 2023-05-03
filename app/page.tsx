"use client";

import { useCallback, useState } from "react";
import moment from "moment";

import InputActivty from "./components/InputActivity";
import useGetList from "./hooks/useGetList";
import useAddDaily from "./hooks/useAddDaily";
import { ActivityList } from "./types";
import useEditDaily from "./hooks/useEditDaily";

export default function Home() {
  const mutationAddDaily = useAddDaily();
  const mutationUpdateDaily = useEditDaily();

  const { data, isFetching, refetch } = useGetList();

  const [activitySelected, setActivitySelected] = useState<ActivityList>({});
  const [activeEdited, setActiveEdited] = useState<boolean>(false);

  const onSubmitDailyActivity = useCallback(
    (val: any) => {
      if (activeEdited) {
        try {
          mutationUpdateDaily.mutate(
            {
              ...val,
            },
            {
              onSuccess(data) {
                if (data) {
                  //set notif success and middleware listen this event
                  // console.log(data);
                  refetch();
                  setActiveEdited(false);
                  setActivitySelected({});
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
      } else {
        try {
          mutationAddDaily.mutate(
            {
              ...val,
            },
            {
              onSuccess(data) {
                if (data) {
                  //set notif success and middleware listen this event
                  // console.log(data);
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
      }
    },
    [mutationAddDaily, activeEdited, refetch]
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-5 md:p-24">
      <div className="py-2 border-b-2">
        <h1 className="font-bold text-2xl">
          <span className="text-amber-500">Daily</span> Timesheet Note
        </h1>
      </div>
      <InputActivty
        dataRow={activitySelected}
        setFormData={(val: any) => onSubmitDailyActivity(val)}
        activeEdit={activeEdited}
      />
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
        <div className="w-full lg:w-1/2 h-56 scrollbar-thin scrollbar-thumb-white scrollbar-track-amber-400 overflow-y-scroll px-10">
          {data.map((item: any, idx: any) => (
            <div
              className="lg:flex gap-3 mx-auto border-b-2 border-amber-500 p-1 cursor-pointer"
              key={idx}
            >
              <div className="flex-1">
                <div className="flex">
                  <p className="text-sm mr-1">{idx + 1 + "."}</p>
                  <p className="text-sm">
                    {item.activity}
                    <span className="block text-xs text-gray-500 mt-1">
                      {moment(item.createdAt).format("DD-MM-YYYY HH:MM:SS")}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex-none justify-center my-auto p-3 lg:p-0">
                <div className="flex gap-1">
                  <p
                    onClick={() => {
                      setActiveEdited(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 hover:text-amber-500 transition duration-150"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </p>
                  <p
                    onClick={() => {
                      setActivitySelected(item);
                      setActiveEdited(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 hover:text-amber-500 transition duration-150"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                      <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* <div className="bg-slate-400">
      </div> */}
    </main>
  );
}
