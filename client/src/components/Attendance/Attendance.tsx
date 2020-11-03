import React, { FC } from 'react';
import { MainLayout } from '../shared/layouts/MainLayout/MainLayout';
import { ConfigurationMenu } from './ConfigurationMenu';
import { UploadFile } from './UploadFile';

export const Attendance: FC = () => {
  return (
    <MainLayout
      leftTitle="Configuration"
      LeftElement={<ConfigurationMenu />}
      rightTitle="Liste des présences"
      RightElement={<UploadFile />}
    />
  );
};
