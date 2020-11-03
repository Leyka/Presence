import { DropZone } from '@/components/shared/DropZone/DropZone';
import { Callout, HTMLTable } from '@blueprintjs/core';
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledCallout = styled(Callout)`
  margin-bottom: 10px;
`;

export const UploadFile: FC = () => {
  const uploadFiles = (files: File[]) => {
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
        <p>
          Pour vérifier les présences, déposer un fichier sous format <strong>csv</strong>{' '}
          ci-dessous.
          <p>
            Présentement seul le format de{' '}
            <a href="https://www.microsoft.com/fr-ca/microsoft-365/microsoft-teams/group-chat-software">
              Microsoft Teams
            </a>{' '}
            est supporté. Voici un exemple du contenu Excel:
          </p>
        </p>
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
      <DropZone
        acceptFormat=".csv, application/vnd.ms-excel, text/csv"
        text="Glisser-déposer (drag and drop) ou cliquer ici pour téléverser un fichier Excel (.csv)"
        uploadFiles={uploadFiles}
        multiple={false}
      />
    </div>
  );
};
