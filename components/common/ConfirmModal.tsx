import { FC } from "react";
import { ImSpinner3 } from "react-icons/im";
import ModalContainer, { ModalProps } from "./ModalContainer";
import classNames from "classnames";

interface Props extends ModalProps {
  title: string;
  subTitle: string;
  busy?: boolean;
  onCancel?(): void;
  onConfirm?(): void;
}

const commonBtnClasses = "px-3 py-1 text-white rounded";

const ConfirmModal: FC<Props> = ({
  visible,
  onClose,
  title,
  subTitle,
  busy = false,
  onCancel,
  onConfirm,
}): JSX.Element => {
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="bg-primary-dark dark:bg-primary rounded p-3">
        {/* title */}
        <p className="dark:text-primary-dark text-primary font-semibold text-lg">
          {title}
        </p>
        {/* sub title */}
        <p className="dark:text-primary-dark text-primary">{subTitle}</p>
        {/* buttons */}
        {busy && (
          <p className="flex items-center space-x-2 dark:text-primary-dark text-primary pt-2">
            <ImSpinner3 className="animate-spin" />
            Please wait...
          </p>
        )}
        {!busy && (
          <div className="flex items-center space-x-2 pt-2">
            <button className={classNames(commonBtnClasses, "bg-red-500")}>
              Confirm
            </button>
            <button className={classNames(commonBtnClasses, "bg-blue-500")}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;
