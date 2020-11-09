import { OneColumnLayout } from '@/components/shared/layouts';
import { SchoolService } from '@/services/school.service';
import { School } from '@/types';
import { Button, Callout, HTMLTable } from '@blueprintjs/core';
import { remove } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AddOrEditSchoolDialog } from './AddOrEditSchoolDialog';

const StyledTable = styled(HTMLTable)`
  width: 100%;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  & > button {
    margin-left: 10px;
  }
`;

export const Schools = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [titleDialog, setTitleDialog] = useState('');
  const [lastSelectedSchool, setLastSelectSchool] = useState<School | undefined>();
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      const schools = await SchoolService.getSchools();
      setSchools(schools);
    };

    fetchSchools();
  }, [openAddEditDialog]);

  const onOpenAddSchoolDialog = () => {
    setLastSelectSchool(undefined);
    setTitleDialog('Nouvelle école');
    setOpenAddEditDialog(true);
  };

  const onOpenEditSchoolDialog = (school: School) => {
    setLastSelectSchool(school);
    setTitleDialog(`Modifier école: ${school.name}`);
    setOpenAddEditDialog(true);
  };

  const onAddOrEditDialogClose = () => {
    setOpenAddEditDialog(false);
  };

  const onSaveSchoolClick = async (school: School) => {
    const isEdit = school.id > 0;
    if (isEdit) {
      await SchoolService.edit(school);
    } else {
      await SchoolService.add(school);
    }
    setOpenAddEditDialog(false);
  };

  const onDeleteSchool = async (id: number) => {
    const res = window.confirm('Êtes vous sûr de supprimer cette école?');
    if (res) {
      await SchoolService.delete(id);
      const updatedSchools = remove(schools, (school) => school.id !== id);
      setSchools(updatedSchools);
    }
  };

  return (
    <OneColumnLayout
      headerTitle="Toutes les écoles"
      headerElement={
        <Button intent="success" onClick={onOpenAddSchoolDialog}>
          Ajouter une école
        </Button>
      }
    >
      <AddOrEditSchoolDialog
        isOpen={openAddEditDialog}
        title={titleDialog}
        onClose={onAddOrEditDialogClose}
        onSaveClick={onSaveSchoolClick}
        school={lastSelectedSchool}
      />
      <div>
        {schools.length === 0 && <Callout>Aucune école</Callout>}
        {schools.length > 0 && (
          <StyledTable bordered striped>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Position prénom</th>
                <th>Position nom de famille</th>
                <th>Fichier (Pattern Regex)</th>
                <th>Enseignants</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id}>
                  <td width="30%">{school.name}</td>
                  <td width="10%">{school.studentFirstNamePosition}</td>
                  <td width="10%">{school.studentLastNamePosition}</td>
                  <td width="30%">{school.classNameGroupRegexPattern}</td>
                  <td width="10%">{school.teachers?.length || 0}</td>
                  <td width="10%">
                    <StyledButtons>
                      <Button
                        icon="edit"
                        intent="warning"
                        title="Editer"
                        onClick={() => onOpenEditSchoolDialog(school)}
                      />
                      <Button
                        icon="remove"
                        intent="danger"
                        title="Supprimer"
                        onClick={() => onDeleteSchool(school.id)}
                      />
                    </StyledButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        )}
      </div>
    </OneColumnLayout>
  );
};
