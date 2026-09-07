export default function Loading(){
  return <main className="page"><div className="shell"><div className="route-loading-page" role="status" aria-live="polite">
    <div className="avora-loader-mark" aria-hidden="true">
      <span className="avora-loader-ring ring-one" />
      <span className="avora-loader-ring ring-two" />
      <img src="/avora-mark.svg" alt="" />
    </div>
    <p>Getting your learning space ready…</p>
  </div></div></main>;
}
