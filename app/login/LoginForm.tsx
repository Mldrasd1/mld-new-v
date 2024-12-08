"use client";

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  };

  return (
    <>
      <Heading title="Sing in To TDF-SHOP-STOR" />
      <Button
        outline
        lable="Continue with Google "
        icon={AiOutlineGoogle}
        OnClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        lable={isLoading ? "Loading" : "Login"}
        OnClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        do not have an account?
        <Link className="underline" href="/register">
          Sing Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
