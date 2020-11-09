import { Classroom } from '@/types';
import { Callout, Card, Divider, Icon, Tag, Tooltip } from '@blueprintjs/core';
import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  classrooms: Classroom[];
  onSelectClassroom(classroom: Classroom): void;
  onDeleteClassroomClick(classroomId: number): void;
}

const StyledCard = styled(Card)`
  margin-bottom: 10px;
`;

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCardFooter = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const ClassroomsMenu: FC<Props> = (props) => {
  const { classrooms, onSelectClassroom, onDeleteClassroomClick } = props;

  if (classrooms?.length === 0) {
    return <Callout>Aucun cours</Callout>;
  }

  return (
    <div>
      {classrooms.map((classroom) => (
        <StyledCard
          key={`classroom-${classroom.id}`}
          interactive
          elevation={1}
          onClick={() => onSelectClassroom(classroom)}
        >
          <StyledCardHeader>
            <span>{classroom.name}</span>
            <Tag minimal>Gr. {classroom.group}</Tag>
          </StyledCardHeader>
          <StyledCardFooter>
            <small>
              <div>
                <Icon icon="time" iconSize={12} /> 14:00 à 18:00
              </div>
              <div>
                <Icon icon="time" iconSize={12} /> 14:00 à 18:00
              </div>
            </small>
            <Tooltip
              content={`Supprimer la classe ${classroom.name}`}
              position="right"
              intent="danger"
            >
              <Icon
                icon="trash"
                intent="danger"
                onClick={() => onDeleteClassroomClick(classroom.id)}
              />
            </Tooltip>
          </StyledCardFooter>
        </StyledCard>
      ))}
      <Divider />
    </div>
  );
};
