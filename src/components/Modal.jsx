import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

function AppModal(props) {
  const {
    isOpen,
    onClose,
    title,
    className,
    children,
    showCloseButton,
    ...other
  } = props;

  return showCloseButton ? (
    <Modal
      isOpen={isOpen}
      className={`text--blue ${className}`}
      toggle={onClose}
      {...other}
    >
      <ModalHeader toggle={onClose}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  ) : (
    <Modal isOpen={isOpen} className={`text--blue ${className}`} {...other}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}

export default AppModal;
