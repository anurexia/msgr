"use client";

import Button from "@/components/Button";
import Input from "@/components/input/Input";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { FaGithub, FaGoogle } from "react-icons/fa6";
import AuthSocialButton from "./AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "REGISTER" ? "LOGIN" : "REGISTER",
    );
  }, []);

  // - useForm is a hook used to manage the state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    // - default possible values of the form
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // placeholder
    if (variant === "REGISTER") {
      // axios signup
    }

    if (variant === "LOGIN") {
      // next-auth sign in
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
  };

  return (
    <div className="mt-8 flex h-auto w-full flex-col gap-4 bg-neutral-100 p-6 transition-all duration-300 sm:max-w-md sm:rounded-3xl sm:bg-white sm:p-8 sm:shadow-lg">
      {/* the handleSubmit functions comes from react-hook-form, which wraps the submitHandler that we made, we do this so we can get the data passed in the form */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Show the name input when the variant is register */}
        {variant === "REGISTER" && (
          <Input
            disabled={isLoading}
            id="name"
            label="Name"
            register={register}
            errors={errors}
          />
        )}

        <Input
          disabled={isLoading}
          id="email"
          label="Email Address"
          type=""
          register={register}
          errors={errors}
        />

        <Input
          disabled={isLoading}
          id="password"
          label="Password"
          register={register}
          errors={errors}
        />

        <Button disabled={isLoading} type="submit" fullWidth>
          {variant === "LOGIN" ? "Sign In" : "Sign Up"}
        </Button>
      </form>

      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <span className="h-[1px] w-full bg-neutral-300"></span>
          <p className="w-full text-center text-sm text-neutral-600">
            or continue with
          </p>
          <span className="h-[1px] w-full bg-neutral-300"></span>
        </div>

        {/*  social actions */}
        <div className="flex justify-between gap-2">
          <AuthSocialButton
            onClick={() => socialAction("github")}
            icon={FaGithub}
          />
          <AuthSocialButton
            onClick={() => socialAction("google")}
            icon={FaGoogle}
          />
        </div>

        {/* cta  */}
        <div className="flex justify-center gap-2 text-sm text-neutral-600">
          <p>
            {variant === "LOGIN" ? "New to msgr?" : "Already have an account?"}
          </p>

          <div onClick={toggleVariant} className="cursor-pointer underline">
            {variant === "LOGIN" ? "Create an account" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
