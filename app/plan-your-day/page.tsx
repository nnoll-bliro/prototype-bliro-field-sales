import type { Metadata } from "next";
import { PlanDayView } from "@/components/plan-day/plan-day-view";

export const metadata: Metadata = {
  title: "Plan your day",
  description: "Build and prepare your customer visit route for today.",
};

export default function PlanYourDayPage() {
  return <PlanDayView />;
}
