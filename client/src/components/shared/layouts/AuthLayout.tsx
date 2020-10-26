import { Callout } from '@blueprintjs/core';
import React, { FC, ReactElement } from 'react';
import './AuthLayout.scss';

interface Props {
  title: string;
  error: string;
  ActionLink?: ReactElement;
}

export const AuthLayout: FC<Props> = (props) => {
  const { children, title, error, ActionLink } = props;

  return (
    <div className="AuthLayout">
      <div className="AuthLayout__content">
        {error && <Callout intent="danger">{error}</Callout>}
        <div className="space-between">
          <h2>{title}</h2>
          {ActionLink}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
