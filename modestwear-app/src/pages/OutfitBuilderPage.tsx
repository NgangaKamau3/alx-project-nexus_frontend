import dynamic from "next/dynamic";

const OutfitBuilderClient = dynamic(
  () => import("./OutfitBuilderClient"),
  { ssr: false }
);

export default function Page() {
  return <OutfitBuilderClient />;
}
