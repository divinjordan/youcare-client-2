import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { Source_Sans_Pro } from "@next/font/google";
import { useEffect } from "react";
import { useErrors, useLoading } from "@/store/interact";

// const font = Source_Sans_Pro({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "600", "700", "900"],
// });

export default function App({ Component, pageProps }: AppProps) {
  const errors = useErrors();
  const loading = useLoading();

  useEffect(() => {
    errors.reset();
    loading.reset();
  }, []);

  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}
