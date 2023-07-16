import Button from "@/components/common/Button";
import { FC, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import LinkForm, { linkOption } from "./LinkForm";

interface Props {
  onSubmit(link: linkOption): void;
}

const InsertLink: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      onKeyDown={({ key }) => {
        if (key === "Escape") setVisible(false);
      }}
      className="relative"
    >
      <Button onClick={() => setVisible(!visible)}>
        <BsLink45Deg />
      </Button>

      <div className="absolute top-full mt-4 z-50 right-0">
        <LinkForm visible={visible} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default InsertLink;
