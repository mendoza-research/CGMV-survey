import usePageNavigation from "hooks/usePageNavigation";
import TextBox from "components/investment/TextBox";
import { AnimationEnum } from "typings/animation";

export default function OrderConfirmedPage() {
  const { toNext } = usePageNavigation({
    nextPathname: "/investment-questions",
  });

  return (
    <TextBox toNext={toNext} animation={AnimationEnum.RISING_BALLOONS}>
      <p>Investment questions</p>
    </TextBox>
  );
}
