import usePageNavigation from "hooks/usePageNavigation";
import TextBox from "components/investment/TextBox";
import { AnimationEnum } from "typings/animation";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ProfileCompletePage() {
  const nextPathname = "/invest";
  const { toNext } = usePageNavigation({
    nextPathname,
  });
  const router = useRouter();

  useEffect(() => {
    router.prefetch(nextPathname);
  }, []);

  return (
    <TextBox
      prefetchUrl={nextPathname}
      toNext={toNext}
      animation={AnimationEnum.CONFETTI}
    >
      <p>
        Profile complete! Now that you have completed your profile, you are
        ready to make an investment decision. Click "Next" to review the
        information you requested about Sound Waves Inc. and Virtuoso Corp.
      </p>
    </TextBox>
  );
}
