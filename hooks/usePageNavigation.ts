import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function usePageNavigation() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      console.log(`Enter page ${router.pathname}`);
      console.log(new Date());
    }

    return () => {
      console.log(`Exit page ${router.pathname}`);
      console.log(new Date());
    };
  }, [router]);
}
