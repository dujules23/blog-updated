import ModalContainer, { ModalProps } from "@/components/common/ModalContainer";
import { FC } from "react";

interface Props extends ModalProps {}

const GalleryModal: FC<Props> = ({ visible, onClose }): JSX.Element => {
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="bg-black p-20">
        <button className="bg-white p-3">Click Me</button>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;
