import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSurveyStore from "stores/useSurveyStore";
import { getRecordPageDuration } from "utils/gql-queries";

interface IPageNavigationOptions {
  nextPathname: string;
}

export default function usePageNavigation({
  nextPathname,
}: IPageNavigationOptions) {
  const router = useRouter();
  const sessionId = useSurveyStore((state) => state.sessionId);
  const [recordPageDurationInDb] = useMutation(
    getRecordPageDuration(router.pathname)
  );
  const currentPathname = useSurveyStore((state) => state.currentPathname);
  const setCurrentPathname = useSurveyStore(
    (state) => state.setCurrentPathname
  );
  const visitedPathnames = useSurveyStore((state) => state.visitedPathnames);

  let enterTime;

  const handlePageEnter = async () => {
    enterTime = new Date();
  };

  const handlePageExit = async () => {
    // Calculate the duration based on enter timestamp
    let duration = Math.round(
      (new Date().getTime() - enterTime.getTime()) / 1000
    );

    try {
      await recordPageDurationInDb({
        variables: {
          session_id: sessionId,
          duration,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // If a participant tries to enter a page through a direct URL without initializing a session, redirect the participant to entry page
    if (!sessionId && router.pathname !== "/") {
      // Force page reload
      window.location.href = "/";
      return;
    }

    if (router.pathname !== currentPathname) {
      // If the participant has already visited the page
      if (visitedPathnames.includes(router.pathname)) {
        // Send the participant back to originating page
        router.push(currentPathname);
        return;
      }
    }

    // Record page enter timestamp if session has been intialized
    if (sessionId) {
      handlePageEnter();
    }

    // Prefetch next page
    router.prefetch(nextPathname);

    return () => {
      if (sessionId) {
        handlePageExit();
      }
    };
  }, []);

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
