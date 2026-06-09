import Hero from "@/modules/home/components/Hero";
import Mission from "@/modules/home/components/Mission";
import Stats from "@/modules/home/components/Stats";
import LatestAlerts from "@/modules/home/components/LatestAlerts";
import Actions from "@/modules/home/components/Actions";
import Impact from"@/modules/home/components/Impact";
import Features from "@/modules/home/components/Features";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Impact />

      <Mission />

      <Stats />

      <LatestAlerts />

      <Actions />

      <Features />
    </>
  );
}