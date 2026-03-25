"use client";
import Home from "@/components/Home";
import useApi from "@/utils/api";

const Page = () => {
  const {data: cars} = useApi({url : "cars"})
    console.log(cars);
  return <Home />;
};

export default Page;
