import React from 'react';
import { Modal } from 'react-native';
import { useAlertDialog } from './AlertDialogContext';

export interface AlertDialogPortalProps {
  /** Portal content */
  children: React.ReactNode;
}

export function AlertDialogPortal({ children }: AlertDialogPortalProps) {
  const { open, onOpenChange } = useAlertDialog();

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange(false)}
    >
      {children}
    </Modal>
  );
}
