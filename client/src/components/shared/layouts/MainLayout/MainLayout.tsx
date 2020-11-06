import { useRootStore } from '@/store';
import { Observer } from 'mobx-react-lite';
import React, { FC, ReactElement } from 'react';
import { Footer } from '../../Footer/Footer';
import './MainLayout.scss';
import { NavigationBar } from './NavigationBar';

interface Props {
  LeftElement: ReactElement;
  leftTitle?: string;
  LeftTitleElement?: ReactElement;
  RightElement: ReactElement;
  rightTitle?: string;
}

export const MainLayout: FC<Props> = (props) => {
  const { LeftElement, RightElement, leftTitle, rightTitle, LeftTitleElement } = props;
  const { userStore } = useRootStore();

  return (
    <Observer>
      {() => (
        <div className="MainLayout">
          <div className="MainLayout__container">
            <NavigationBar
              userFullName={userStore.fullName}
              isUserAdmin={userStore.isAdmin}
              onLogOutClick={userStore.logOut}
            />
            <main>
              <section className="MainLayout__left">
                <div className="title">
                  {leftTitle && <h3>{leftTitle}</h3>}
                  {LeftTitleElement && LeftTitleElement}
                </div>
                {LeftElement}
              </section>
              <section className="MainLayout__right">
                {rightTitle && <h3>{rightTitle}</h3>}
                {RightElement}
              </section>
            </main>
          </div>
          <Footer />
        </div>
      )}
    </Observer>
  );
};
