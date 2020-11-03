import { FormGroup, HTMLSelect, Label } from '@blueprintjs/core';
import React, { FC } from 'react';

interface Props {}

export const ConfigurationMenu: FC<Props> = () => {
  return (
    <div>
      <div>
        <FormGroup>
          <Label>
            Cours
            <HTMLSelect fill>
              <option value="1">CEM-430, Gr. #2</option>
            </HTMLSelect>
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            Tolérance
            <HTMLSelect fill>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="20">20 minutes</option>
              <option value="30">30 minutes</option>
            </HTMLSelect>
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            Logiciel de présence
            <HTMLSelect fill disabled>
              <option>Microsoft Teams</option>
            </HTMLSelect>
          </Label>
        </FormGroup>
      </div>
    </div>
  );
};
