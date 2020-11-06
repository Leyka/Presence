import { MainLayout } from '@/components/shared/layouts/MainLayout/MainLayout';
import { SchoolService } from '@/services/school.service';
import { School } from '@/types';
import { Button, Tooltip } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';

export const Schools = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [addClicked, setAddClicked] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      const schools = await SchoolService.getSchools();
      setSchools(schools);
    };

    fetchSchools();
  }, []);

  console.log(schools);
  return (
    <MainLayout
      leftTitle="Toutes les écoles"
      LeftTitleElement={
        <Tooltip content="Ajouter une école" position="right" intent="success">
          <Button icon="add" minimal intent="success" onClick={() => setAddClicked(true)} />
        </Tooltip>
      }
      LeftElement={<div>École</div>}
      rightTitle="École"
      RightElement={<div>École</div>}
    />
  );
};
