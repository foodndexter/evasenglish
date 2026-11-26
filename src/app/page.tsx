import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Home from "./Home";

const HomePage = async () => {
  const user_id = (await headers()).get("x-user-id");
  if (!user_id) {
    return redirect("/login");
  }
  return <Home />;
};

export default HomePage;
