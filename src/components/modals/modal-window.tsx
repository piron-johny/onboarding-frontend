import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

interface ModalWindowPrors extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  title: string
}

export const ModalWindow: FC<ModalWindowPrors> = ({
  children,
  isOpen,
  onClose,
  title,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pb={10}>
        <ModalHeader pb={5}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
