import { trimText } from "@/utils/helper";
import Link from "next/link";
import { FC } from "react";

interface Props {
  title: string;
  meta: string;
  slug: string;
  onDeleteClick?(): void;
}

const LatestPostListCard: FC<Props> = ({
  title,
  meta,
  slug,
  onDeleteClick,
}): JSX.Element => {
  return (
    <div>
      <h1 className="font-semibold text-lg text-primary-dark dark:text-primary transition">
        {trimText(title, 50)}
      </h1>
      <p className="text-sm text-secondary-dark">{trimText(meta, 100)}</p>
      <div className="flex items-center justify-end space-x-3">
        <Link href={"/admin/posts/update/" + slug}>
          <div className="text-primary-dark dark:text-primary transition hover:underline">
            Edit
          </div>
        </Link>
        <button
          onClick={onDeleteClick}
          className="text-primary-dark dark:text-primary transition hover:underline"
        >
          Delete
        </button>
      </div>
      <hr className="mt-2" />
    </div>
  );
};

export default LatestPostListCard;
