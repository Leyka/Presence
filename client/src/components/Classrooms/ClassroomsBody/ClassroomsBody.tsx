import { Classroom } from '@/types';
import React, { FC, useEffect, useState } from 'react';
import { AddClassrooms } from './AddClassrooms';
import { NoClassrooms } from './NoClassrooms';

interface Props {
  classrooms: Classroom[];
  currentClassroom?: Classroom;
  setPageTitle(title: string): void;
}

export const ClassroomsBody: FC<Props> = (props) => {
  const { classrooms, currentClassroom, setPageTitle } = props;

  const [addClicked, setAddClicked] = useState(false);

  useEffect(() => {
    // Update title
    if (addClicked) setPageTitle('Nouveau cours');
    else if (currentClassroom) setPageTitle(currentClassroom.name);
  }, [addClicked, setPageTitle, currentClassroom]);

  if (addClicked) {
    return <AddClassrooms />;
  }

  if (classrooms?.length === 0) {
    return <NoClassrooms onAddClassroomsClick={() => setAddClicked(true)} />;
  }

  return <div>Body</div>;
};
