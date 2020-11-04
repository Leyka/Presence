import {
  Alignment,
  Button,
  Menu,
  MenuItem,
  Navbar,
  NavbarDivider,
  Popover,
} from '@blueprintjs/core';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface NavigationProps {
  userFullName: string;
  onLogOutClick();
}

export const NavigationBar: FC<NavigationProps> = (props) => {
  const { userFullName, onLogOutClick } = props;
  const history = useHistory();

  const onClassroomClick = () => {
    history.push('/classrooms');
  };

  const onHomeClick = () => {
    history.push('/attendance');
  };

  return (
    <Navbar className="bp3-dark">
      <Navbar.Group align={Alignment.LEFT}>
        <Button className="bp3-minimal" icon="home" text="Accueil" onClick={onHomeClick} />
        <NavbarDivider />
        <Button className="bp3-minimal" icon="people" text="Mes cours" onClick={onClassroomClick} />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Popover content={<ProfilMenu onLogOutClick={onLogOutClick} />} minimal>
          <Button
            className="bp3-minimal"
            icon="person"
            rightIcon="chevron-down"
            text={userFullName}
          />
        </Popover>
      </Navbar.Group>
    </Navbar>
  );
};

interface ProfileMenuProps {
  onLogOutClick();
}

const ProfilMenu: FC<ProfileMenuProps> = ({ onLogOutClick }) => (
  <Menu>
    <MenuItem text="Réglages" icon="cog" />
    <MenuItem text="Se déconnecter" icon="log-out" onClick={onLogOutClick} />
  </Menu>
);
