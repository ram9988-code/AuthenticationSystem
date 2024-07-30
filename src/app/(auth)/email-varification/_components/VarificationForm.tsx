"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";

const CreateFormSchema = z.object({
  otp: z.string().min(0, "Enter your OTP"),
});

type CreateFormValues = z.infer<typeof CreateFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<CreateFormValues> = {
  otp: "",
};

function VarificationForm() {
  const router = useRouter();
  const [error, setError] = useState();

  const form = useForm<CreateFormValues>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: CreateFormValues) {
    try {
      const activationToken = cookies.get("activationToken");
      await axios
        .post("/api/activation", {
          activationCode: data.otp,
          activationToken,
        })
        .then((response) => {
          cookies.remove("activationToken");
          toast.success("Registration Successful!");
          router.push("/");
        })
        .catch((err) => {
          setError(err.response.data);
          console.log("RegistrationError", err.response.data);
        });
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <div className="w-2/5 justify-center border py-16 px-14 ">
      <p>{error}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Varify</Button>
        </form>
      </Form>
      <Toaster position="top-right" />
    </div>
  );
}

export default VarificationForm;
