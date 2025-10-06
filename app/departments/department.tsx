import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/departments";
import DeleteDepartmentModal from "./delete-department";

type Department = {
  _id: string;
  department: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Department Details" },
    // { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Departments({
  params,
}: {
  params: { deptId: string };
}) {
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(false);

  const deptId = params.deptId;

  useEffect(() => {
    async function getDepartment() {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `https://employee-react.onrender.com/emp/department/${deptId}`,
        {
          method: "GET",
          headers: {
            Authorization: token ? token : "",
          },
        }
      );
      const data = await res.json();
      setDepartment(data);
      setLoading(false);
    }
    getDepartment();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-svh container mx-auto flex flex-col py-20 gap-10">
      <Link to={"/departments"} className="flex items-center gap-2 text-sm">
        <ArrowLeftCircle className="size-4" /> Go back to departments
      </Link>
      <div className="flex items-center w-full justify-between">
        <h1 className="text-3xl font-bold mb-4"> {department?.department}</h1>
        <DeleteDepartmentModal deptId={deptId} />
      </div>
      <p>{department?.description}</p>
      {/* <pre>{JSON.stringify(department, null, 2)}</pre> */}
    </div>
  );
}
