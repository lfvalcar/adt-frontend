"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <main>
      <DefaultLayout>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? <Loader /> : children}
        </div>
      </DefaultLayout>
    </main>
  );
}
