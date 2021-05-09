import usePageNavigation from "hooks/usePageNavigation";
import TextBox from "components/investment/TextBox";
import { AnimationEnum } from "typings/animation";

export default function FinancialInformationPage() {
  const { toNext } = usePageNavigation({
    nextPathname: "/financial-information",
  });

  return (
    <TextBox toNext={toNext} animation={AnimationEnum.CONFETTI}>
      <p>Financial Information Page</p>
    </TextBox>
  );
}
