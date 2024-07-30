import React from "react";
import { CreateForm } from "./_components/CreateForma";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center    ">
      <div>
        <h1 className="text-4xl font-bold my-16">Create your account</h1>
      </div>
      <CreateForm />
    </div>
  );
};

export default page;
