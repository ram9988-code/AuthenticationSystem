import { cookies } from "next/headers";
import React from "react";
import { LoginForm } from "./_components/LoginForm";

const page = () => {
  console.log(cookies().get("access_token"));
  return (
    <div className="flex flex-col justify-center items-center    ">
      <div>
        <h1 className="text-4xl font-bold my-16">Login to your account</h1>
      </div>
      <LoginForm />
    </div>
  );
};

export default page;
