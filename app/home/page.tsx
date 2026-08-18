import type { Metadata } from "next";
import { HomeView } from "@/components/home/home-view";
import {
  buildHomeMeetingModel,
  parseMeetingScenario,
} from "@/libs/mock-meetings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your meetings",
  description: "Prepare, transcribe, and follow up on customer meetings.",
};

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const scenario = parseMeetingScenario(first(params.scenario));
  const model = buildHomeMeetingModel(new Date(), scenario);

  return <HomeView model={model} transcriptionSaved={first(params.saved) === "1"} />;
}
