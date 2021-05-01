import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function usePageNavigation() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );

      if (url == "/background") {
      }
    };

    // router.beforePopState(({ url, as, options }) => {
    //   console.log(`url=${url}, as=${as}`);
    //   console.log(as);

    //   if (as == "/background") {
    //     router.push("/welcome", "/welcome", {
    //       shallow: true,
    //     });
    //     return false;
    //   }

    //   return true;
    // });

    router.events.on("routeChangeStart", handleRouteChange);

    if (router.isReady) {
      console.log(`Enter page ${router.pathname}`);
      console.log(new Date());
    }

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);

      console.log(`Exit page ${router.pathname}`);
      console.log(new Date());
    };
  }, [router]);
}
