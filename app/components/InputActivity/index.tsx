import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ActivityList } from "@/app/types";
import moment from "moment";

const schema = yup.object().shape({
  daily_field: yup.string().required(),
});

interface FormData {
  daily_field: string;
}

interface IProps {
  dataRow: ActivityList;
  setFormData: (val: FormData) => void;
  activeEdit: boolean;
  btnProcessLoading: boolean;
}

const InputActivty = (props: IProps) => {
  const { dataRow, setFormData, activeEdit, btnProcessLoading } = props;

  const {
    control,
    setError,
    reset,
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      daily_field: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    (data: FormData) => {
      const payload = {
        daily_field: data.daily_field,
        id: dataRow._id,
      };
      setFormData(payload);
    },
    [dataRow]
  );

  useEffect(() => {
    if (activeEdit) {
      setValue(
        "daily_field",
        `${dataRow.activity}.${dataRow.work}.${moment(dataRow.date).format(
          "YYYY-MM-DD"
        )}`
      );
    } else {
      setValue("daily_field", "");
    }
    if (isSubmitSuccessful) {
      reset({ daily_field: "" });
    }
  }, [isSubmitSuccessful, reset, activeEdit, setValue, dataRow]);

  if (errors.daily_field) {
    setTimeout(() => {
      clearErrors("daily_field");
    }, 10000);
  }

  return (
    <div className="w-full lg:w-1/2">
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-10"
      >
        {activeEdit ? (
          <textarea
            className="p-2 text-sm border rounded border-amber-500 focus:outline-none"
            {...register("daily_field")}
          />
        ) : (
          <Controller
            name="daily_field"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <>
                <textarea
                  className="p-2 text-sm border border-gray-400 rounded focus:outline-amber-500"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              </>
            )}
          />
        )}

        {errors.daily_field && (
          <span className="text-xs text-rose-500">
            {errors.daily_field.message}
          </span>
        )}

        {btnProcessLoading ? (
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
          <button
            type="submit"
            className="w-32 px-4 py-2 font-semibold transition duration-150 ease-out bg-transparent border rounded hover:bg-amber-500 text-amber-500 hover:text-white border-amber-500 hover:border-transparent"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default InputActivty;
