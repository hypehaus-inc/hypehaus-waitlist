import { TopChrome, BottomChrome } from "@/components/Chrome";
import { Hero } from "@/components/Hero";
import { Form } from "@/components/Form";

export default function Home() {
  return (
    <main className="black-noise film-grain min-h-screen relative overflow-hidden">
      <TopChrome />

      <div className="relative z-10 flex flex-col px-6 md:px-12 lg:px-20 pt-32 pb-32 max-w-6xl">
        <Hero />

        <p className="mt-16 text-white-70 text-lg md:text-xl max-w-xl leading-relaxed">
          Events are weekly. Cafes are <em className="italic-glow not-italic">daily.</em>{" "}
          <em className="italic-glow not-italic">Both.</em>
        </p>

        <div className="mono text-[10px] text-white-32 mt-12">
          MUMBAI · NAGPUR · PUNE
        </div>

        <Form />
      </div>

      <BottomChrome />
    </main>
  );
}
