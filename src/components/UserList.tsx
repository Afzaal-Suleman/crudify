"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Data } from "@/types/userData";
import { fetchUsers } from "@/service/api";
import { deleteUser } from "@/service/api";
import { useRouter } from "next/navigation";

export default function UserList() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const role = localStorage.getItem("role");
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleDelete = (_id: string) => {
    deleteMutation.mutate(_id);
  };

  const handleUpdate = (id: string) => {
    router.push(`/update/${id}`);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading users.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Father Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Number</th>
            {role === "admin" && <th className="p-2 border">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.users.map((data: Data) => (
            <tr key={data?._id} className="border-b hover:bg-gray-50">
              <td className="p-2 border">{data.name}</td>
              <td className="p-2 border">{data.fatherName}</td>
              <td className="p-2 border">{data.email}</td>
              <td className="p-2 border">{data.number}</td>
              {role === "admin" && (
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleUpdate(data._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
