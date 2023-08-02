"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  const onSubmit = useCallback(() => {
    try {
      localStorage.setItem("username", JSON.stringify(username));
      router.replace("/");
    } catch (error) {
      console.log("err.submit", error);
    }
  }, [router, username]);
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-2/3 lg:w-1/2 h-[550px] md:h-[750px] mx-auto gap-10">
      <div
        className="w-full py-20 bg-right bg-no-repeat bg-cover rounded-md shadow-md md:py-32 lg:py-40 lg:w-1/2"
        style={{
          backgroundImage: "url(/img.webp)",
        }}
      ></div>
      <div className="w-full lg:flex-1">
        <h1 className="mb-5 text-xl font-bold uppercase">Timesheet</h1>
        <div className="text-gray-700 mb-7">
          <label className="block mb-1 text-sm">Username</label>
          <input
            className="w-full h-10 px-3 text-sm placeholder-gray-600 border rounded-lg focus:shadow-outline "
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          className="px-6 py-2 font-semibold text-slate-950 bg-[#F7F7F9] rounded hover:bg-[#CDDFEE]/80 text-sm"
          onClick={onSubmit}
        >
          Masuk
        </button>
      </div>
    </div>
  );
};

export default Page;
