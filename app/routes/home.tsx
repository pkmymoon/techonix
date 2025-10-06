import { buttonVariants } from "components/ui/button";
import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Welcome() {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <p className="mt-4">Please login or register to continue</p>
      <div className="flex items-center gap-2 mt-8">
        <Link to={"/login"} className={buttonVariants({ variant: "outline" })}>
          Login
        </Link>
        <Link to={"/login"} className={buttonVariants({ variant: "default" })}>
          Register
        </Link>
      </div>
    </main>
  );
}
