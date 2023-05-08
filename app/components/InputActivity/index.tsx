import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ActivityList } from "@/app/types";

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
      setValue("daily_field", `${dataRow.activity}`);
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
        className="flex flex-col p-10 gap-3"
      >
        {activeEdit ? (
          <textarea
            className="rounded border border-amber-500 text-sm focus:outline-none p-2"
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
                  className="rounded border border-gray-400 text-sm focus:outline-amber-500 p-2"
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
          <button
            type="submit"
            className="bg-transparent hover:bg-amber-500 text-amber-500 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded transition duration-150 ease-out w-32"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default InputActivty;
