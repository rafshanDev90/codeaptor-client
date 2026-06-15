export const metadata = {
  title: "Discover CLI Tools",
  description: "Discover the best command-line tools for developers. Search, browse, and find the perfect CLI tool for your workflow.",
  alternates: { canonical: "/" },
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import TrendingTools from "@/components/trending-tools";
import Workflows from "@/components/workflows";
import PopularCategories from "@/components/popular-categories";
import Features from "@/components/features";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <TrendingTools />
      <Workflows />
      <PopularCategories />
      <Features />
      <Cta />
    </>
  );
}
