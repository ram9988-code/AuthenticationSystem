"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import cookies from "js-cookie";

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
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const CreateFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(1, "Name is Required")
    .max(50, { message: "Too Long to display the Name." }),
  password: z
    .string({
      required_error: "Please select a subcategory.",
    })
    .min(5, { message: "Password must be 5 or more characters long" }),
});

type CreateFormValues = z.infer<typeof CreateFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<CreateFormValues> = {
  name: "",
  password: "",
  email: "",
};

export const CreateForm = () => {
  const router = useRouter();
  const [error, setError] = useState();

  const form = useForm<CreateFormValues>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: CreateFormValues) {
    try {
      await axios
        .post("/api/register", data)
        .then((response) => {
          toast.success("Registration Successful!");
          cookies.set("activationToken", response.data.activationToken);
          router.push(`/email-varification?${response.data.activationToken}`);
        })
        .catch((err) => {
          setError(err.response.data);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"secondary"} type="submit">
            Create Account
          </Button>
        </form>
      </Form>
      <div className="flex justify-center items-center pt-10">
        <h1>
          I have account?{" "}
          <span>
            <Link className="text-green-500 font-bold" href={"/login"}>
              Login
            </Link>
          </span>
        </h1>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};
