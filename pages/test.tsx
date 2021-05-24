import dynamic from "next/dynamic";

const Fireworks = dynamic(() => import("components/animations/Fireworks"), {
  ssr: false,
});

export default function TestPage() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Fireworks />
    </div>
  );
}
