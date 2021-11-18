import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { PORTAL_TARGET_ID } from './core';

interface Props {
  readonly children: ReactNode;
}

export default function Portal({ children }: Props) {
  const target = document.getElementById(PORTAL_TARGET_ID);
  if (!target) {
    throw new Error('Portal: Target element not found');
  }

  return createPortal(children, target);
}
