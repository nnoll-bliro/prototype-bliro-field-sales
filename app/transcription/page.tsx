import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TranscriptionView } from "@/components/home/transcription-view";
import {
  findOngoingMeetingForScenario,
  parseMeetingScenario,
} from "@/libs/mock-meetings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live transcription",
  description: "Mocked live meeting transcription.",
};

type TranscriptionPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TranscriptionPage({
  searchParams,
}: TranscriptionPageProps) {
  const params = await searchParams;
  const scenario = parseMeetingScenario(first(params.scenario));
  const meeting = findOngoingMeetingForScenario(
    first(params.id),
    scenario,
    new Date(),
  );

  if (!meeting) notFound();

  return <TranscriptionView meeting={meeting} scenario={scenario} />;
}
