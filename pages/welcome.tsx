import usePageNavigation from "hooks/usePageNavigation";
import useSurveyStore from "stores/useSurveyStore";
import { GamificationEnum } from "typings/survey";
import TextBox from "components/Investment/TextBox";

export default function WelcomePage() {
  const gamification = useSurveyStore((state) => state.gamification);
  const nextPathname =
    gamification === GamificationEnum.GAMIFICATION ? "/q1" : "/q1";

  const { toNext } = usePageNavigation({
    nextPathname,
  });

  return (
    <TextBox toNext={toNext}>
      <p>
        Welcome – thank you for funding your account and for your interest in
        Sound Waves Inc. and Virtuoso Corp.! Before you can access more
        information about these companies and make investment decisions, please
        complete your investor profile.
      </p>
    </TextBox>
  );
}
