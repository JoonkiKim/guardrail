import { useRouter } from "next/router";
import GuardRailWriter from "../../../../src/components/commons/units/guardRailWriter/guardRailWriter.container";

export default function GuardRailEditPage() {
  const router = useRouter();
  const { guardRailId } = router.query;

  return (
    <>
      <div>
        <GuardRailWriter isEdit={true} guardRailId={guardRailId as string} />
      </div>
    </>
  );
}
