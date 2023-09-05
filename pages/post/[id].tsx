import { FC } from "react";
import { useRouter } from "next/router";

interface Props {}

const OurNextCoolPageID: FC<Props> = (props): JSX.Element => {
  const router = useRouter();

  console.log(router);
  return <div>OurNextCoolPageID</div>;
};

export default OurNextCoolPageID;
