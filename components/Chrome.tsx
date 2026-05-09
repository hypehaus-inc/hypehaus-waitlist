export function TopChrome() {
  return (
    <div className="absolute top-0 left-0 right-0 flex items-start justify-between px-6 md:px-10 pt-6 md:pt-10 z-10">
      <div className="mono text-[10px] text-white-32">01 · TONIGHT</div>
      <div className="mono text-[10px] text-white-32">JOIN.HYPEHAUS.ORG</div>
    </div>
  );
}

export function BottomChrome() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 md:px-10 pb-6 md:pb-10 z-10">
      <div className="mono text-[10px] text-white-40">HYPEHAUS</div>
      <div className="mono text-[10px] text-white-32">WAITLIST · COMING SOON</div>
    </div>
  );
}
