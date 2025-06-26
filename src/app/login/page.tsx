"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/service/api";
import { useRouter } from "next/navigation";

const userSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(4, "password must be 4 digits")
    .max(4, "password must be 4 digits"),
});
type UserFormData = z.infer<typeof userSchema>;

const page = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, mutate, isError, error, isSuccess } = useMutation({
    mutationFn: login,
  });
  if (data) {
    localStorage.setItem("token", data?.token);
    localStorage.setItem("role", data?.role);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: any) => {
    console.log("data", data);

    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        router.push("/");
        reset();
      },
    });
  };
  return (
    <div>
      <form
        action=""
        className="space-y-4 max-w-md mx-auto p-4  rounded shadow mt-40"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-center font-bold">Log In</div>
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
          <label>Password:</label>
          <input
            {...register("password")}
            className="border border-gray-300 p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mx-auto w-full rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default page;
