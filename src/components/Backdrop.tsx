/** Fixed ambient backdrop: faint grid + two accent glow orbs. Purely decorative. */
export function Backdrop() {
  return (
    <div className="app-backdrop" aria-hidden="true">
      <div className="grid" />
      <div
        className="orb orb-a left-1/2 top-[-260px] h-[520px] w-[720px] -translate-x-1/2"
      />
      <div
        className="orb orb-b right-[-180px] top-[32%] h-[420px] w-[420px]"
      />
    </div>
  );
}
