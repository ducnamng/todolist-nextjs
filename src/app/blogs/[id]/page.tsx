"use client";

import Link from "next/link";
import useSWR, { Fetcher } from "swr";

const ViewDetailBlogs = ({ params }: { params: { id: string } }) => {
  const fetcher: Fetcher<IBlog, string> = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <div>
      <Link className="btn btn-primary" href={"/blogs"}>
        Go back
      </Link>
      <h2>{data?.title}</h2>
      <p>{data?.content}</p>
      <h3>{data?.author}</h3>
    </div>
  );
};
export default ViewDetailBlogs;
