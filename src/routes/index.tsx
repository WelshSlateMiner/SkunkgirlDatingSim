import { createFileRoute } from "@tanstack/react-router";
import { CompanionApp } from "@/components/companion/CompanionApp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <CompanionApp />;
}
