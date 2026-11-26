import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BizCreateForm from "./BizCreateForm";

const BizCreatePage = async () => {
  const user_id = (await headers()).get("x-user-id");
  if (!user_id) return redirect("/login");

  return (
    <main>
      <BizCreateForm user_id={user_id} />
    </main>
  );
};

export default BizCreatePage;
