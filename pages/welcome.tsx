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
        Welcome to the investment platform! Please complete your investor
        profile.
      </p>
    </TextBox>
  );
}
