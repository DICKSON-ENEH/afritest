"use client";

import React, { useEffect } from "react";
// import OtherHeader from "@/components/static/OtherHeader";
// import VendorContentSwitcher from "@/components/VendorCompmtents/VendorContentSwitcher";
import { usePathname } from "next/navigation";
import Head from "next/head";
import OtherHeader from "../../components/static/OtherHeader";
import VendorContentSwitcher from "components/VendorCompmtents/VendorContentSwitcher";

const VendorPage = () => {
  useEffect(() => {

    document.title = "VENDOR";
  }, []);

  return (
    <>
      <Head>
        <title>VENDOR</title>
      </Head>
      <main className="w-full min-h-screen">
        <div className="mb-10">
          <OtherHeader />
        </div>
        <VendorContentSwitcher />
      </main>
    </>
  );
};

export default VendorPage;