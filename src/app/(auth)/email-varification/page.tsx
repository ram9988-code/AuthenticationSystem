import React from "react";
import VarificationForm from "./_components/VarificationForm";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center    ">
      <div>
        <h1 className="text-4xl font-bold my-16">Email Varification</h1>
      </div>
      <VarificationForm />
    </div>
  );
};

export default Page;
