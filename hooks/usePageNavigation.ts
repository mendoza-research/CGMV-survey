import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSurveyStore from "stores/useSurveyStore";
import {
  RECORD_PAGE_ENTER_QUERY,
  RECORD_PAGE_EXIT_QUERY,
} from "utils/gql-queries";

interface IPageNavigationOptions {
  nextPathname: string;
}

export default function usePageNavigation({
  nextPathname,
}: IPageNavigationOptions) {
  const router = useRouter();
  const sessionId = useSurveyStore((state) => state.sessionId);
  const [recordPageEnterInDb] = useMutation(RECORD_PAGE_ENTER_QUERY);
  const [recordPageExitInDb] = useMutation(RECORD_PAGE_EXIT_QUERY);
  const currentPathname = useSurveyStore((state) => state.currentPathname);
  const setCurrentPathname = useSurveyStore(
    (state) => state.setCurrentPathname
  );
  const visitedPathnames = useSurveyStore((state) => state.visitedPathnames);

  const recordPageEnter = async () => {
    try {
      await recordPageEnterInDb({
        variables: {
          session_id: sessionId,
          pathname: router.pathname,
        },
      });
    } catch (err) {
      // Common error case is when a participant presses the back button in the browser and navigates to a previous page
      // These backwards navigations should send back a participant to the originating page and NOT record a new page enter timestamp for a previous page
      // This is implemented by enforcing a unique constraint on (session_id, pathname) in the cgmv_navigations table
      console.error(err);
    }
  };

  const recordPageExit = async () => {
    try {
      await recordPageExitInDb({
        variables: {
          session_id: sessionId,
          pathname: router.pathname,
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
      recordPageEnter();
    }

    // Prefetch next page
    router.prefetch(nextPathname);

    return () => {
      if (sessionId) {
        recordPageExit();
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
