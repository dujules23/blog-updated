import { FC } from "react";
import { useRouter } from "next/router";

interface Props {}

const OurCoolPage: FC<Props> = (props): JSX.Element => {
  const router = useRouter();

  console.log(router);
  return <div>OurCoolPage</div>;
};

export default OurCoolPage;
