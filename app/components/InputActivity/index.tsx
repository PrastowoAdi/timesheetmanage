import React, { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  daily_field: yup.string().required(),
});

interface FormData {
  daily_field: string;
}

interface IProps {
  setFormData: (val: FormData) => void;
}

const InputActivty = (props: IProps) => {
  const { setFormData } = props;
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      daily_field: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback((data: FormData) => {
    setFormData(data);
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ daily_field: "" });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="">
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-10 gap-3"
      >
        <Controller
          name="daily_field"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <textarea
                className="form-textarea rounded outline-none text-sm"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            </>
          )}
        />
        {errors.daily_field && (
          <span className="text-xs text-rose-500">
            {errors.daily_field.message}
          </span>
        )}

        <button
          type="submit"
          className="bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded transition duration-150 ease-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputActivty;
