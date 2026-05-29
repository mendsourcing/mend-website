import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GovTraining — Government Contracting Courses & Training",
  description:
    "Master government contracting with MeND's GovTraining programs. From the $500 Jumpstart to the $4,000 MasterClass — practical, instructor-led courses for new and growing contractors.",
  alternates: { canonical: "/govtraining" },
  openGraph: {
    title: "GovTraining — Government Contracting Courses & Training",
    description:
      "Master government contracting with MeND's GovTraining programs. From Jumpstart to MasterClass — practical, instructor-led courses.",
    url: "https://mendsourcing.com/govtraining",
    type: "website",
  },
};

export default function GovTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
