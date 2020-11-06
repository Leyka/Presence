import { ClassroomService } from '@/services/classroom.service';
import { useRootStore } from '@/store';
import { Button, Tooltip } from '@blueprintjs/core';
import { Observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { MainLayout } from '../shared/layouts/MainLayout/MainLayout';
import { ClassroomsBody } from './ClassroomsBody/ClassroomsBody';
import { ClassroomsMenu } from './ClassroomsMenu/ClassroomsMenu';

export const Classrooms = () => {
  const { classroomStore } = useRootStore();

  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const loadClassrooms = async () => {
      const classrooms = await ClassroomService.getClassrooms();
      classroomStore.classrooms = classrooms;
    };

    loadClassrooms();
  }, [classroomStore.classrooms]);

  return (
    <Observer>
      {() => (
        <MainLayout
          leftTitle="Mes cours"
          LeftElement={<ClassroomsMenu classrooms={classroomStore.classrooms} />}
          LeftTitleElement={
            <Tooltip content="Ajouter des cours" position="right" intent="success">
              <Button icon="add" minimal intent="success" />
            </Tooltip>
          }
          rightTitle={pageTitle}
          RightElement={
            <ClassroomsBody
              classrooms={classroomStore.classrooms}
              setPageTitle={(title) => setPageTitle(title)}
            />
          }
        ></MainLayout>
      )}
    </Observer>
  );
};
