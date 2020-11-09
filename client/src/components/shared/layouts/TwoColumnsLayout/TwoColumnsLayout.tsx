import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { MainLayout } from '../MainLayout/MainLayout';

interface Props {
  LeftElement: ReactElement;
  leftTitle?: string;
  LeftTitleElement?: ReactElement;
  RightElement: ReactElement;
  rightTitle?: string;
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100%;
`;

const StyledLeftColumn = styled.div`
  padding: 0 10px;
  border-right: 2px solid #3c4c5940;
  background: #f7f7f7;
`;

const StyledRightColumn = styled.div`
  padding: 0 10px;
`;

const StyledLeftColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TwoColumnsLayout: FC<Props> = (props) => {
  const { LeftElement, RightElement, leftTitle, rightTitle, LeftTitleElement } = props;

  return (
    <MainLayout>
      <StyledContainer>
        <StyledLeftColumn>
          <StyledLeftColumnHeader>
            {leftTitle && <h3>{leftTitle}</h3>}
            {LeftTitleElement && LeftTitleElement}
          </StyledLeftColumnHeader>
          {LeftElement}
        </StyledLeftColumn>
        <StyledRightColumn>
          {rightTitle && <h3>{rightTitle}</h3>}
          {RightElement}
        </StyledRightColumn>
      </StyledContainer>
    </MainLayout>
  );
};
