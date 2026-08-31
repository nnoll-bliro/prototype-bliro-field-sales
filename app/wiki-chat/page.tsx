import type { Metadata } from "next";
import { WikiChatView } from "@/components/wiki-chat/wiki-chat-view";

export const metadata: Metadata = {
  title: "Meeting prep chat",
  description: "Explore customer context and prepare for an upcoming sales meeting with Vicky.",
};

type WikiChatPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WikiChatPage({ searchParams }: WikiChatPageProps) {
  const params = await searchParams;
  const customer = Array.isArray(params.customer) ? params.customer[0] : params.customer;

  return <WikiChatView customerPreselected={customer === "john-deere"} />;
}
