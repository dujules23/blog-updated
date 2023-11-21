import { FC } from "react";
import ModalContainer, { ModalProps } from "./ModalContainer";
import { Modal } from "@chakra-ui/react";

interface Props extends ModalProps {
  title?: string;
  onCancel?(): void;
}

const WelcomeModal: FC<Props> = ({
  visible,
  onClose,
  title,
  onCancel,
}): JSX.Element => {
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="bg-primary-dark dark:bg-primary rounded p-3 max-w-[500px] max-h-[500px]">
        <button onClick={onCancel} className="pb-2 font-semibold">
          X
        </button>
        <div className="dark:text-primary-dark text-primary font-semibold text-lg pb-2">
          {title}
        </div>
        <p>
          pupil to master is a snapshot of my journey through software
          development. I will showcase the things I'm learning, what I've built,
          and what's new in software. Feel free to join me on the journey!
        </p>
      </div>
    </ModalContainer>
  );
};

export default WelcomeModal;
