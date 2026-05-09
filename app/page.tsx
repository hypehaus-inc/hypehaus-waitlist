export default function Home() {
  return (
    <main className="black-noise film-grain min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-16 max-w-4xl">
        <h1 className="display text-[12vw] md:text-[160px] leading-[0.86] mb-4">
          TONIGHT
        </h1>
        <p className="italic-glow text-[8vw] md:text-[96px]">
          is yours<span className="punct">.</span>
        </p>
      </div>
      <footer className="px-8 md:px-16 py-8 mono text-[10px]">
        HYPEHAUS  ·  COMING SOON
      </footer>
    </main>
  );
}
