// app/page.tsx
import Hero from "./components/home/herosection";
import ClientsSection from "./components/home/ClientsSection";
import ServicesSection from "./components/home/ServicesSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientsSection />
      <ServicesSection />
    </main>
  );
}