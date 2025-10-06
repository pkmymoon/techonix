import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "components/ui/field";
import { Input } from "components/ui/input";
import { cn } from "lib/utils";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import type { Route } from "./+types/login";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return (
    <div className="min-h-svh flex items-center justify-center flex-col gap-8 bg-gradient-to-b from-black to-slate-900">
      <h1 className="text-4xl font-bold text-white">Login</h1>

      <LoginForm />
    </div>
  );
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  async function onSubmit(formdata: FormData) {
    const email = formdata.get("email");
    const password = formdata.get("password");

    const res = await fetch("https://employee-react.onrender.com/emp/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      if (data.token) {
        localStorage.setItem("authToken", data.token); // Store token
      }
      navigate("/departments");
      toast.success("Login successful!");
    } else {
      // Registration failed

      toast.error("Login failed!", {
        description: data.message,
      });
    }
  }
  return (
    <div
      className={cn("flex flex-col max-w-sm w-full gap-6 ", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Input id="password" type="password" name="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to={"/register"}>Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
