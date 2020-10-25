import React, { FC } from 'react';
import './AuthLayout.scss';

export const AuthLayout: FC = ({ children }) => {
  return <div className="AuthLayout">{children}</div>;
};
