import React, { memo } from 'react';
import { PORTAL_TARGET_ID } from './core';

function PortalTarget() {
  return (
    <div id={PORTAL_TARGET_ID} />
  );
}

export default memo(PortalTarget);
