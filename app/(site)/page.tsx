import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center bg-gray-100 sm:px-6 lg:py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={"/images/logo.png"}
          height="48"
          width="48"
          alt="msgr logo"
          className="mx-auto w-auto"
        />

        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-neutral-700 sm:text-3xl">
          Sign in to your account
        </h2>
      </div>

      <AuthForm />
    </main>
  );
}
