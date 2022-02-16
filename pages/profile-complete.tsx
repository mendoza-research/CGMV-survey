//import usePageNavigation from "hooks/usePageNavigation";
import TextBox from "components/investment/TextBox";
import { AnimationEnum } from "typings/animation";

export default function ProfileCompletePage() {
  //const nextPathname = "/stock-selections";
  //const { toNext } = usePageNavigation({
  //nextPathname,
  //});

  return (
    <TextBox>
      <p>
        Profile complete! Please close this tab, return to the original survey window and enter “orange” to proceed with the study.
      </p>
    </TextBox>
  );
}
