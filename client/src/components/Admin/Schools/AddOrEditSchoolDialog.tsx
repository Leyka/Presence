import { School } from '@/types';
import { Button, ButtonGroup, Classes, Dialog, FormGroup, InputGroup } from '@blueprintjs/core';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  isOpen: boolean;
  title: string;
  onClose(): void;
  onSaveClick(school: School): void;
  school?: School;
}

const StyledSameRows = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    width: 45%;
  }
`;

export const AddOrEditSchoolDialog: FC<Props> = (props) => {
  const { isOpen, title, onClose, onSaveClick, school } = props;

  const [name, setName] = useState(school?.name || '');
  const [firstNamePos, setFirstNamePos] = useState(school?.studentFirstNamePosition || 0);
  const [lastNamePos, setLastNamePos] = useState(school?.studentLastNamePosition || 0);
  const [regexPattern, setRegexPattern] = useState(school?.classNameGroupRegexPattern || '');

  useEffect(() => {
    if (school) {
      setName(school.name);
      setFirstNamePos(school.studentFirstNamePosition || 0);
      setLastNamePos(school.studentLastNamePosition || 0);
      setRegexPattern(school.classNameGroupRegexPattern || '');
    }

    // Cleanup
    return () => {
      setName('');
      setFirstNamePos(0);
      setLastNamePos(0);
      setRegexPattern('');
    };
  }, [isOpen, school]);

  return (
    <Dialog isOpen={isOpen} title={title} onClose={onClose}>
      <div className={Classes.DIALOG_BODY}>
        <FormGroup>
          Nom
          <InputGroup
            placeholder="Nom de l'école"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <StyledSameRows>
          <FormGroup>
            Position prénom
            <InputGroup
              placeholder="Position étudiant (ex. 1)"
              type="number"
              value={firstNamePos as any}
              onChange={(e) => setFirstNamePos(parseInt(e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            Position nom de famille
            <InputGroup
              placeholder="Position étudiant (ex. 1)"
              type="number"
              value={lastNamePos as any}
              onChange={(e) => setLastNamePos(parseInt(e.target.value))}
            />
          </FormGroup>
        </StyledSameRows>
        <FormGroup>
          Regex pattern nom fichier
          <InputGroup
            placeholder="Regex pattern"
            value={regexPattern}
            onChange={(e) => setRegexPattern(e.target.value)}
          />
        </FormGroup>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <ButtonGroup fill>
          <Button
            text="Enregistrer"
            intent="success"
            title="Add video to playlist"
            onClick={() =>
              onSaveClick({
                id: school?.id || -1,
                name,
                classNameGroupRegexPattern: regexPattern,
                studentFirstNamePosition: firstNamePos,
                studentLastNamePosition: lastNamePos,
              })
            }
          />
          <Button onClick={onClose}>Annuler</Button>
        </ButtonGroup>
      </div>
    </Dialog>
  );
};
