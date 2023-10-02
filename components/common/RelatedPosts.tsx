import Link from "next/link";
import { FC } from "react";

interface Props {
  relatedPosts: { id: string; slug: string; title: string }[];
}

const RelatedPosts: FC<Props> = ({ relatedPosts }): JSX.Element => {
  return (
    <div className="pt-5">
      <h3 className="text-xl font-semibold bg-secondary-dark text-primary p-2 mb-4">
        {" "}
        Related Posts:
      </h3>
      <div className="flex flex-col space-y-4">
        {relatedPosts.map((p) => {
          return (
            <Link key={p.id} href={p.slug}>
              <div className="font-semibold text-primary-dark dark:text-primary hover:underline">
                {p.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPosts;
