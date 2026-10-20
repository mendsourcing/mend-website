import { defineRailway, github, project, service } from "railway/iac";
// This repository manages only its own resources in the environment. Other
// repositories export their own partial name.
// See https://docs.railway.com/infrastructure-as-code#multi-repo-projects
export const partial = "MeND - Main Website";
export default defineRailway(() => {
  const MeNDMainWebsite = service("MeND - Main Website", {
    source: github("mendsourcing/mend-website", { branch: "main", checkSuites: false }),
    build: { builder: "NIXPACKS" },
    start: "npm start",
    replicas: { "us-west2": 1 },
    domains: [{ domain: "mendsourcing.com", port: 3000 }, { domain: "security.mendsourcing.com", port: 3000 }, { domain: "www.mendsourcing.com", port: 3000 }],
    networking: { privateNetworkEndpoint: "mend-website" },
  });

  return project("MeNDSourcing.com", {
    variables: { managed: false },
    resources: [MeNDMainWebsite],
  });
});
