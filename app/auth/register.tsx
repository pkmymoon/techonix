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
    { title: "Register" },
    // { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return (
    <div className="min-h-svh flex flex-col gap-8 items-center justify-center bg-gradient-to-b from-black to-slate-900">
      <h1 className="text-4xl font-bold text-white">Register</h1>
      <RegisterForm />
    </div>
  );
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  async function onSubmit(formdata: FormData) {
    const name = formdata.get("name");
    const email = formdata.get("email");
    const password = formdata.get("password");

    const res = await fetch(
      "https://employee-react.onrender.com/emp/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      if (data.token) {
        localStorage.setItem("authToken", data.token); // Store token
      }
      navigate("/departments");
      toast.success("Registration successful!");
    } else {
      // Registration failed

      toast.error("Registration failed!", {
        description: data.message,
      });
    }
  }
  return (
    <div
      className={cn("flex flex-col max-w-sm w-full gap-6", className)}
      {...props}
    >
      <Card className="">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your email below to register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="name"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </Field>
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
                <Input name="password" id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Register</Button>

                <FieldDescription className="text-center">
                  Already have an account? <Link to={"/login"}>Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
