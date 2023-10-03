import InfiniteScrollPosts from "@/components/common/InfiniteScrollPosts";
import AdminLayout from "@/components/layout/AdminLayout";
import { filterPosts } from "@/utils/helper";
import { PostDetail } from "@/utils/types";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {}

const Search: NextPage<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [results, setResults] = useState<PostDetail[]>([]);
  const { query } = useRouter();
  const title = query.title as string;

  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios("/api/posts/search?title=" + title);
      setLoading(false);
      setResults(data.results);
      if (!data.results.length) setNotFound(true);
      else setNotFound(false);
    } catch (error) {
      console.log("Error while searching posts: ");
    }
  };

  useEffect(() => {
    if (loading) return;
    handleSearch();
  }, [title]);

  return (
    <AdminLayout>
      {notFound ? (
        <h1 className="text-center text-3xl font-semibold opacity-40 text-secondary-dark">
          Not Found.
        </h1>
      ) : null}

      {loading ? (
        <h1 className="text-center text-3xl font-semibold opacity-40 text-secondary-dark">
          Searching...
        </h1>
      ) : null}

      <InfiniteScrollPosts
        hasMore={false}
        next={() => {}}
        dataLength={results.length}
        posts={results}
        showControls
        onPostRemoved={(post) => setResults(filterPosts(results, post))}
      />
    </AdminLayout>
  );
};

export default Search;
