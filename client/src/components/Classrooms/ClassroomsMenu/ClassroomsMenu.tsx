import { Classroom } from '@/types';
import { Callout } from '@blueprintjs/core';
import React, { FC } from 'react';

interface Props {
  classrooms: Classroom[];
}

export const ClassroomsMenu: FC<Props> = (props) => {
  const { classrooms } = props;

  if (classrooms?.length === 0) {
    return <Callout>Aucun cours</Callout>;
  }

  return <div>Classes</div>;
};
