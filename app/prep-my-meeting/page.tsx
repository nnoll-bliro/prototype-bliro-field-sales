import type { Metadata } from "next";
import { PrepMeetingView } from "@/components/prep-meeting/prep-meeting-view";

export const metadata: Metadata = {
  title: "Prep my meeting",
  description: "A simple, guided briefing for the next customer meeting.",
};

export default function PrepMyMeetingPage() {
  return <PrepMeetingView />;
}
