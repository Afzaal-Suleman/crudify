"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userSchema } from "@/schema/userSchema";
import { z } from "zod";
import { useParams } from "next/navigation";
import { fetchUserById } from "@/service/api";
import { updateUser } from "@/service/api";
import { useRouter } from "next/navigation";

type UserFormData = z.infer<typeof userSchema>;

const Updateuser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const params = useParams();
  const id = params.id as string;

  const {
    data,
    isLoading,
    isError: er,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });

  const {
    mutate,
    isError: err2,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: updateUser,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: any) => {
    const obj: any = {
      data: data,
      id: id,
    };
    mutate(obj, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        router.push("/");
        reset();
      },
    });
  };

  useEffect(() => {
    if (data?.users) {
      reset({
        name: data.users.name,
        email: data.users.email,
        number: data.users.number,
        fatherName: data.users.fatherName,
        cnic: data.users.cnic,
        password: data.users.password,
      });
    }
  }, [data, reset]);

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
            // defaultValue={data?.users?.name}
            className="border border-gray-300 p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label>Father's Name:</label>
          <input
            {...register("fatherName")}
            // defaultValue={data?.users?.fatherName}
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
          // defaultValue={data?.users?.email}
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
          // defaultValue={data?.users?.cnic}
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

export default Updateuser;
