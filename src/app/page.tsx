import { cookies } from "next/headers";
import ClientPage from "./ClientPage";

export default async function Page() {
  const cookieStore = await cookies();
  const splashTimestamp = cookieStore.get("kurian_splash_timestamp");
  const now = new Date().getTime();
  const twoHours = 2 * 60 * 60 * 1000;
  
  let showSplash = true;
  if (splashTimestamp && now - parseInt(splashTimestamp.value) < twoHours) {
    showSplash = false;
  }

  return <ClientPage initialShowSplash={showSplash} />;
}
