import { TwoColumnsLayout } from '@/components/shared/layouts';
import React, { FC } from 'react';
import { ConfigurationMenu } from './ConfigurationMenu';
import { UploadFile } from './UploadFile';

export const Attendance: FC = () => {
  return (
    <TwoColumnsLayout
      leftTitle="Configuration"
      LeftElement={<ConfigurationMenu />}
      rightTitle="Liste des présences"
      RightElement={<UploadFile />}
    />
  );
};
