import Hero from "@/modules/home/components/Hero";
import Mission from "@/modules/home/components/Mission";
import LatestAlerts from "@/modules/home/components/LatestAlerts";
import Actions from "@/modules/home/components/Actions";
import Impact from "@/modules/home/components/Impact";
import Features from "@/modules/home/components/Features";
import FeaturedGallery from "@/modules/home/components/gallery/FeaturedGallery";
import HomeMap from "@/modules/home/components/map/HomeMap";
import EkofuturaTV from "@/modules/home/components/ekofutura-tv/EkofuturaTV";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Mission />

      <HomeMap />

      <EkofuturaTV />

      <FeaturedGallery />

      <LatestAlerts />

      <Impact />

      <Actions />

      <Features />
    </>
  );
}