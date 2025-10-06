import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  // layout("./auth/layout.tsx", [
  route("login", "./auth/login.tsx"),
  route("register", "./auth/register.tsx"),
  // ]),
  // Protected routes
  // layout("./departments/layout.tsx", [
  ...prefix("departments", [
    index("./departments/departments.tsx"),
    route(":deptId", "./departments/department.tsx"),
  ]),
  // ]),
] satisfies RouteConfig;
