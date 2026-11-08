"use client";
import { App, Empty, Skeleton } from 'antd';
import { useSound } from '../../lib/sound/useSound.js';
import { useMemo } from 'react';
export function useFeedback() {
  const {
    message
  } = App.useApp();
  const sound = useSound();
  return useMemo(() => ({
    success: text => {
      void message.success(text);
      sound('success');
    },
    error: text => {
      void message.error(text);
      sound('warning');
    },
    info: text => {
      void message.info(text);
      sound('notification');
    }
  }), [message, sound]);
}
export const EmptyState = () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No records match your search" />;
export const PageSkeleton = () => <div className="page-stack" aria-busy="true" aria-label="Loading page">
    <Skeleton active />
    <Skeleton active />
    <Skeleton active />
  </div>;

