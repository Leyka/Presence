import { DropZone } from '@/components/shared/DropZone/DropZone';
import { NonIdealState } from '@blueprintjs/core';
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledNonIdealState = styled(NonIdealState)`
  & > div {
    max-width: none;
    width: 90%;
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
    <DropZone
      acceptFormat=".csv, application/vnd.ms-excel, text/csv"
      text="Glisser-déposer (drag and drop) ou cliquer ici pour téléverser un fichier Excel (.csv)"
      uploadFiles={() => {}}
      multiple={false}
    />
  </StyledNonIdealState>
);
