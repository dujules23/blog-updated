import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { NextPage } from "next";
import DefaultLayout from "@/components/layout/DefaultLayout";

const Home: NextPage = () => {
  return <DefaultLayout>Home</DefaultLayout>;
};

export default Home;
