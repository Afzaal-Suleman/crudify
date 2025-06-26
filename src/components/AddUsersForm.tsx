"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { adduser } from "@/service/api";
import { userSchema } from "@/schema/userSchema";
import { z } from "zod";

type UserFormData = z.infer<typeof userSchema>;

const AddUsersForm = () => {
  const { mutate } = useMutation({
    mutationFn: adduser,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto p-4  rounded shadow mt-28"
    >
      <div className="flex flex-row gap-2 w-full">
        <div>
          <label>Name:</label>
          <input
            {...register("name")}
            className="border border-gray-300 p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label>Father&apos;s Name:</label>
          <input
            {...register("fatherName")}
            className="border border-gray-300 p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.fatherName && (
            <p className="text-red-500 text-sm">{errors.fatherName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label>Email:</label>
        <input
          {...register("email")}
          className="border border-gray-300 p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label>CNIC:</label>
        <input
          {...register("cnic")}
          className="border border-gray-300 p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.cnic && (
          <p className="text-red-500 text-sm">{errors.cnic.message}</p>
        )}
      </div>

      <div className="flex flex-row gap-2 w-full">
        <div>
          <label>Phone Number:</label>
          <input
            {...register("number")}
            className="border border-gray-300 p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.number && (
            <p className="text-red-500 text-sm">{errors.number.message}</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            {...register("password")}
            className="border border-gray-300 p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default AddUsersForm;
