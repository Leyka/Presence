import { ExcelDropZone } from '@/components/shared/DropZone/ExcelDropZone';
import { Callout, HTMLTable } from '@blueprintjs/core';
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledCallout = styled(Callout)`
  margin-bottom: 10px;
`;

export const UploadFile: FC = () => {
  const onFilesUpload = (files: File[]) => {
    if (files?.length === 0) return;
    console.log(files);
  };

  return (
    <div>
      <StyledCallout
        title="Téléverser le fichier de présence (.csv)"
        intent="success"
        icon="upload"
      >
        <div>
          Pour vérifier les présences, déposer un fichier sous format <strong>csv</strong>{' '}
          ci-dessous.
          <p>
            Présentement seul le format de{' '}
            <a href="https://www.microsoft.com/fr-ca/microsoft-365/microsoft-teams/group-chat-software">
              Microsoft Teams
            </a>{' '}
            est supporté. Voici un exemple du contenu Excel:
          </p>
        </div>
        <HTMLTable>
          <thead>
            <tr>
              <th>Nom complet</th>
              <th>Action de l’utilisateur</th>
              <th>Date et heure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Guy Tremblay</td>
              <td>Rejoint</td>
              <td>23/09/2020 à 16:02:27</td>
            </tr>
          </tbody>
        </HTMLTable>
      </StyledCallout>
      <ExcelDropZone onFilesUpload={onFilesUpload} multiple={false} />
    </div>
  );
};
