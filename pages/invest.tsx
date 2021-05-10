import usePageNavigation from "hooks/usePageNavigation";
import InvestBox from "components/investment/InvestBox";
import { AnimationEnum } from "typings/animation";

export default function InvestPage() {
  const { toNext } = usePageNavigation({
    nextPathname: "/order-confirmed",
  });

  return <InvestBox toNext={toNext} animation={AnimationEnum.FALLING_STARS} />;
}
