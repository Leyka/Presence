import { ExcelDropZone } from '@/components/shared/DropZone/ExcelDropZone';
import { NonIdealState } from '@blueprintjs/core';
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledNonIdealState = styled(NonIdealState)`
  & > div {
    max-width: none;
    width: 80%;
  }
`;

interface Props {
  onAddClassroomsClick(): void;
}

export const NoClassrooms: FC<Props> = ({ onAddClassroomsClick }) => (
  <StyledNonIdealState
    icon="folder-open"
    title="Votre liste de cours est vide"
    description="Commencer par ajouter des cours"
  >
    <ExcelDropZone multiple onFilesUpload={() => {}} />
  </StyledNonIdealState>
);
