import Updateuser from "@/components/Updateuser";
import ProtectedRoute from "@/components/ProtectedRoute";
const updatepage = () => {
  return (
    <ProtectedRoute>
      <Updateuser />
    </ProtectedRoute>
  );
};

export default updatepage;
