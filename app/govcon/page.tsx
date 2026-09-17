import { redirect } from "next/navigation";

// The signup page moved: /govcon → /newsletter (The Weekly MeND). Old
// links keep working via this redirect.
export default function GovConRedirect() {
  redirect("/newsletter");
}
