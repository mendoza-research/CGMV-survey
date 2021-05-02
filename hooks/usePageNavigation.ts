import { useEffect } from "react";
import { useRouter } from "next/router";
import useSurveyStore from "stores/useSurveyStore";

interface IPageNavigationOptions {
  nextPathname: string;
}

export default function usePageNavigation({
  nextPathname,
}: IPageNavigationOptions) {
  const router = useRouter();
  const currentPathname = useSurveyStore((state) => state.currentPathname);
  const setCurrentPathname = useSurveyStore(
    (state) => state.setCurrentPathname
  );
  const visitedPathnames = useSurveyStore((state) => state.visitedPathnames);

  useEffect(() => {
    if (router.isReady && router.pathname !== currentPathname) {
      // If the participant has already visited the page
      if (visitedPathnames.includes(router.pathname)) {
        // Send the participant back to originating page
        router.push(currentPathname);
        return;
      }

      setCurrentPathname(router.pathname);

      console.log(`Enter page ${router.pathname}`);
      console.log(new Date());
    }
  }, [router]);

  const toNext = () => {
    // Set next pathname to current
    setCurrentPathname(nextPathname);

    // Navigate to next pathname
    router.push(nextPathname);
  };

  return {
    isFirstVisit: !visitedPathnames.includes(router.pathname),
    toNext,
  };
}
