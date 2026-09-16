import { redirect } from "next/navigation";

// Consolidated: the 10x story lives inside the Vertical Guide, so this
// page folds into /guide. Old links keep working via this redirect.
export default function TenXRedirect() {
  redirect("/guide");
}
