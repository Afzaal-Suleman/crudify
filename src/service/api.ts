import axios from 'axios';


export const adduser = async (userData: {
  name: string;
  email: string;
  number: string;
  fatherName: string;
  cnic: string;
}) => {
  const response = await axios.post('http://localhost:5000/api/users', userData);
  return response.data;
};

export const fetchUsers = async () => {
  const res = await fetch("http://localhost:5000/api/users/getuser", {
    method: "GET",
  });
  
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data;
}

export const deleteUser = async (_id: string) => {
  const res = await fetch(`http://localhost:5000/api/users/deleteuser/${_id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
};

export const fetchUserById = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/users/getuserbyid/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};
export const updateUser = async (obj: any) => {
  const { id, data } = obj;
  const res = await axios.put(`http://localhost:5000/api/users/updateuser/${id}`, data);
  return res.data; 
};

export const login = async (data: any) => {
  console.log(data,4);
  
  const res = await axios.post(`http://localhost:5000/api/users/login`, {data});

  
  return res.data; 
};
