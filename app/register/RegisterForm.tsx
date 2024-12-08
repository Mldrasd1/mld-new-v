"use client";

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "", name: "" },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post("/api/register", data).then(() => {
        toast.success("Account Created");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged in");
          }
          if (callback?.error) toast.success(callback.error);
        });
      })
      .catch(() => toast.error("somthin went wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Heading title="Sing up To TDF-SHOP-STOR" />
      <Button
        outline
        lable="Sing up with Google "
        icon={AiOutlineGoogle}
        OnClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        lable={isLoading ? "Loading" : "Sing up"}
        OnClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already Have account?
        <Link className="underline" href="/login">
          log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
