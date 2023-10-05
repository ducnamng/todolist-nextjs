"use client";

import useSWR from "swr";
import TableApp from "../components/Table";

const BlogsPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  return <TableApp blogs={data?.sort((a: any, b: any) => b.id - a.id) ?? []} />;
};

export default BlogsPage;
