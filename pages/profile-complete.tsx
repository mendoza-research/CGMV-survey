import usePageNavigation from "hooks/usePageNavigation";
import TextBox from "components/investment/TextBox";
import { AnimationEnum } from "typings/animation";

export default function ProfileCompletePage() {
  const { toNext } = usePageNavigation({
    nextPathname: "/financial-information",
  });

  return (
    <TextBox toNext={toNext} animation={AnimationEnum.CONFETTI}>
      <p>
        Profile complete! Now that you have completed your profile, you are
        ready to make an investment decision. Click "Next" to review the
        information you requested about Sound Waves Inc. and Virtuoso Corp.
      </p>
    </TextBox>
  );
}
