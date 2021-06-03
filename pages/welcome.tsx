import usePageNavigation from "hooks/usePageNavigation";
import TextBox from "components/investment/TextBox";

export default function WelcomePage() {
  const nextPathname = "/q1";
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
