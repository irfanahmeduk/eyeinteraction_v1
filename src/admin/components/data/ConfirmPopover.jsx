"use client";
import { Popconfirm } from 'antd';
export function ConfirmPopover({
  children,
  onConfirm,
  title = 'Delete this record?',
  description = 'This removes the record from this demo workspace.'
}) {
  return <Popconfirm title={title} description={description} onConfirm={onConfirm} okText="Delete" okButtonProps={{
    danger: true
  }} cancelText="Keep record">
      {children}
    </Popconfirm>;
}

