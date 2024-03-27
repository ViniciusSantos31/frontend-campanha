import { useState } from "react";

type CloseModalReturn = {
  closeModal: () => void;
  handleOpen: (open: boolean) => void;
  open?: boolean;
};

const useCloseModal = (): CloseModalReturn => {
  const [open, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(() => false);

  return { closeModal, open, handleOpen: setIsOpen };
};

export { useCloseModal };
