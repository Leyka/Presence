import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { MainLayout } from '../MainLayout/MainLayout';

interface Props {
  headerTitle: string;
  headerElement?: ReactElement;
}

const StyledContainer = styled.div`
  height: 100%;
  margin: 0 5%;
  margin-top: 10px;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledHeaderElement = styled.div`
  margin-left: 20px;
`;

export const OneColumnLayout: FC<Props> = (props) => {
  const { headerTitle, headerElement, children } = props;
  return (
    <MainLayout>
      <StyledContainer>
        <StyledHeader>
          <div>
            <h2>{headerTitle}</h2>
          </div>
          <StyledHeaderElement>{headerElement && headerElement}</StyledHeaderElement>
        </StyledHeader>
        <div>{children}</div>
      </StyledContainer>
    </MainLayout>
  );
};
