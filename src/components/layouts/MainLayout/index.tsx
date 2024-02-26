import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import React, { FC } from "react";
import Faqs from "@/components/common/Faqs";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout: FC<MainLayoutProps> = ({ children, title = "" }) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <title>{`Youcare -${title}`}</title>
        <script
          src="//code.tidio.co/amlarq4yker3sau7ygvgcrt6ux9vl1yv.js"
          async
        ></script>
      </Head>
      <Header />
      <main className="relative">{children}</main>

      <div id="faqs" className="bg-gray-100">
        <Faqs />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
