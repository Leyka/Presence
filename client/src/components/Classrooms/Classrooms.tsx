import { ClassroomService } from '@/services/classroom.service';
import { Classroom } from '@/types';
import { Button, Tooltip } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { TwoColumnsLayout } from '../shared/layouts';
import { ClassroomsBody } from './ClassroomsBody/ClassroomsBody';
import { ClassroomsMenu } from './ClassroomsMenu/ClassroomsMenu';

export const Classrooms = () => {
  const [pageTitle, setPageTitle] = useState('');
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [selectedClass, setSelectedClass] = useState<Classroom>();

  useEffect(() => {
    const loadClassrooms = async () => {
      const classrooms = await ClassroomService.getClassrooms();
      setClassrooms(classrooms);
    };

    loadClassrooms();
  }, []);

  const isEmptyClassroom = classrooms.length === 0;

  const onSelectClassroom = (classroom: Classroom) => {
    setSelectedClass(classroom);
    setPageTitle(`${classroom.name} / Groupe: ${classroom.group}`);
  };

  const onDeleteClassroom = (classroomId: number) => {
    const res = window.confirm('Êtes vous sûr de vouloir supprimer?');
    if (res) {
      console.log('We will delete', classroomId);
    }
  };

  return (
    <TwoColumnsLayout
      leftTitle="Mes cours"
      LeftElement={
        <ClassroomsMenu
          classrooms={classrooms}
          onSelectClassroom={onSelectClassroom}
          onDeleteClassroomClick={onDeleteClassroom}
        />
      }
      LeftTitleElement={
        <Tooltip content="Ajouter des cours" position="right" intent="success">
          <Button icon="add" minimal intent="success" hidden={isEmptyClassroom} />
        </Tooltip>
      }
      rightTitle={pageTitle}
      RightElement={
        <ClassroomsBody classrooms={classrooms} setPageTitle={(title) => setPageTitle(title)} />
      }
    ></TwoColumnsLayout>
  );
};
