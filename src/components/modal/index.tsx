import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from "@chakra-ui/react";
import { ReactNode, useRef } from "react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: ReactNode;
}

export default function ModalComponent({ title, isOpen, onClose, size, children }: ModalProps) {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size={size || 'lg'}
    >
      <AlertDialogOverlay >
        <AlertDialogContent>
          <AlertDialogHeader>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {children}
          </AlertDialogBody>

          <AlertDialogFooter>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}