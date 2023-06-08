"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
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
  const [btnProcessLoading, setBtnProcessLoading] = useState<boolean>(false);

  const downloadPdf = () => {
    const doc = new jsPDF();
    let text = data.map((e: any) => e.activity + " - " + e.work + "\n");
    let textString = text.toString();
    let replaceComma = textString.replaceAll(",", "");
    doc.setFontSize(12);
    doc.text(replaceComma, 10, 20);
    doc.save("timesheet.pdf");
  };

  const onSubmitDailyActivity = useCallback(
    (val: any) => {
      setBtnProcessLoading(true);
      const dailyField = val.daily_field;
      const splitField = dailyField.split(".");

      const payload = {
        id: val.id,
        activity: splitField[0],
        work: splitField[1],
      };
      if (activeEdited) {
        try {
          mutationUpdateDaily.mutate(
            {
              ...payload,
            },
            {
              onSuccess(data) {
                if (data) {
                  toast(`${data.data.message}`, {
                    autoClose: 2000,
                    type: "success",
                  });
                  refetch();
                  setActiveEdited(false);
                  setActivitySelected({});
                  setBtnProcessLoading(false);
                }
              },
              onError(err) {
                setBtnProcessLoading(false);
                console.log("err>>response>>submit", err);
              },
            }
          );
        } catch (error) {
          setBtnProcessLoading(false);
          console.log(error);
        }
      } else {
        try {
          mutationAddDaily.mutate(
            {
              ...payload,
            },
            {
              onSuccess(data) {
                if (data) {
                  toast(`${data.data.message}`, {
                    autoClose: 2000,
                    type: "success",
                  });
                  refetch();
                  setBtnProcessLoading(false);
                }
              },
              onError(err) {
                setBtnProcessLoading(false);
                console.log("err>>response>>submit", err);
              },
            }
          );
        } catch (error) {
          setBtnProcessLoading(false);
          console.log(error);
        }
      }
    },
    [mutationAddDaily, activeEdited, refetch]
  );

  return (
    <main className="flex flex-col items-center min-h-screen p-5 pt-10 md:p-24">
      <div className="py-2 border-b-2">
        <h1 className="text-2xl font-bold">
          <span className="text-amber-500">Daily</span> Timesheet Note
        </h1>
      </div>

      <button type="button" onClick={downloadPdf}>
        Download PDF
      </button>
      <InputActivty
        dataRow={activitySelected}
        setFormData={(val: any) => onSubmitDailyActivity(val)}
        activeEdit={activeEdited}
        btnProcessLoading={btnProcessLoading}
      />
      {isFetching ? (
        <svg
          className="w-8 h-8 mt-5 text-white animate-spin"
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
        <div className="w-full px-10 overflow-y-scroll lg:w-1/2 h-72 md:h-56 scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-slate-100">
          {data.map((item: ActivityList, idx: any) => (
            <div
              className={`lg:flex gap-3 mx-auto ${
                idx + 1 === data.length ? "border-none" : "border-b-2"
              } border-amber-500 p-1 cursor-pointer`}
              key={idx}
            >
              <div className="flex-1">
                <div className="flex">
                  <p className="mr-1 text-sm">{idx + 1 + "."}</p>
                  <p className="text-sm">
                    {item.activity}
                    {" - "}
                    <span className="font-semibold">{`(${item.work})`}</span>
                    <span className="block mt-1 text-xs text-gray-500">
                      {moment(item.createdAt).format("DD-MM-YYYY HH:MM:SS")}
                    </span>
                  </p>
                </div>
              </div>
              <div className="justify-center flex-none p-3 my-auto lg:p-0">
                <div className="flex gap-1">
                  <p
                    onClick={() => {
                      setActivitySelected({});
                      setActiveEdited(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 transition duration-150 hover:text-amber-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
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
                      className={`w-5 h-5 ${
                        activitySelected._id === item._id
                          ? "text-amber-400"
                          : ""
                      } hover:text-amber-500 transition duration-150`}
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
    </main>
  );
}
