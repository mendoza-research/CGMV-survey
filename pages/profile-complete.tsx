import usePageNavigation from "hooks/usePageNavigation";
import TextBox from "components/investment/TextBox";
import { AnimationEnum } from "typings/animation";

export default function ProfileCompletePage() {
  const nextPathname = "/stock-selections";
  const { toNext } = usePageNavigation({
    nextPathname,
  });

  return (
    <TextBox toNext={toNext} animation={AnimationEnum.CONFETTI}>
      <p>
        Profile complete! On the next page, you will respond to a series of
        questions that will influence which free stock you will be given. Click
        "Next" to proceed.
      </p>
    </TextBox>
  );
}
