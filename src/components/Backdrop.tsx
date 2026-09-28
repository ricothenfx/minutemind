/** Fixed ambient backdrop: faint grid + two accent glow orbs. Purely decorative. */
export function Backdrop() {
  return (
    <div className="app-backdrop" aria-hidden="true">
      <div className="grid" />
      <div
        className="orb left-1/2 top-[-260px] h-[520px] w-[720px] -translate-x-1/2"
        style={{ background: "radial-gradient(closest-side, rgba(122,119,242,0.22), transparent)" }}
      />
      <div
        className="orb right-[-180px] top-[32%] h-[420px] w-[420px]"
        style={{ background: "radial-gradient(closest-side, rgba(147,119,241,0.1), transparent)" }}
      />
    </div>
  );
}
