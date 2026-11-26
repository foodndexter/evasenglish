import { headers } from "next/headers";
import AuthForm from "./AuthForm";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const user_id = await (await headers()).get("x-user-id");

  if (user_id) return redirect("/");

  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default LoginPage;
