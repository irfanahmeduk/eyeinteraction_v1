"use client";
import { lazy, Suspense, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useMotionPolicy } from '../../lib/motion/index.jsx';
const Frame = lazy(() => import('../../lib/motion/DialogFrame.jsx'));
export function CrudModal({
  open,
  title,
  onCancel,
  onSave,
  children,
  loading
}) {
  const {
    enabled,
    duration
  } = useMotionPolicy();
  const [present, setPresent] = useState(open);
  useEffect(() => {
    if (open || !enabled) setPresent(open);
  }, [open, enabled]);
  return <Modal open={enabled ? open || present : open} title={title} onCancel={onCancel} onOk={onSave} confirmLoading={loading} okText="Save changes" width={600} destroyOnHidden modalRender={node => enabled ? <Suspense fallback={node}>
            <Frame open={open} duration={duration} onExit={() => setPresent(false)}>
              {node}
            </Frame>
          </Suspense> : node}>
      {children}
    </Modal>;
}

