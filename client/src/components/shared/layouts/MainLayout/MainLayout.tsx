import { useRootStore } from '@/store';
import { Observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Footer } from '../../Footer/Footer';
import { Navbar } from '../../Navbar/Navbar';

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

export const MainLayout: FC = ({ children }) => {
  const { userStore } = useRootStore();

  return (
    <Observer>
      {() => (
        <div>
          <StyledContainer>
            <Navbar
              userFullName={userStore.fullName}
              isUserAdmin={userStore.isAdmin}
              onLogOutClick={userStore.logOut}
            />
            <main>{children}</main>
          </StyledContainer>
          <Footer />
        </div>
      )}
    </Observer>
  );
};
