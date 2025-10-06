import { Card, CardHeader, CardTitle } from "components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/departments";
import AddDepartmentModal from "./add-department";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Departments" },
    // { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getDepartments() {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        "https://employee-react.onrender.com/emp/departments",
        {
          method: "GET",
          headers: {
            Authorization: token ? token : "",
          },
        }
      );
      const data = await res.json();
      setDepartments(data);
      setLoading(false);
    }
    getDepartments();
  }, []);
  return (
    <div className="min-h-svh container mx-auto flex flex-col py-20 gap-10">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-3xl font-bold mb-4">Departments</h1>
        <AddDepartmentModal />
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin size-10" />
        </div>
      ) : null}
      <div className="grid grid-cols-3 gap-4">
        {!loading &&
          departments.map((department: any) => (
            <Card key={department._id} className="relative">
              <CardHeader>
                <CardTitle>{department.department}</CardTitle>
              </CardHeader>
              <Link
                to={`/departments/${department._id}`}
                className="absolute inset-0"
              />
            </Card>
          ))}
      </div>
      {/* <pre>{JSON.stringify(departments, null, 2)}</pre> */}
    </div>
  );
}
