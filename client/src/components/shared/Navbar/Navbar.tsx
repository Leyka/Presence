import {
  Alignment,
  Button,
  Menu,
  MenuItem,
  Navbar as BlueprintNavbar,
  NavbarDivider,
  Popover,
} from '@blueprintjs/core';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface NavigationProps {
  userFullName: string;
  isUserAdmin: boolean;
  onLogOutClick();
}

export const Navbar: FC<NavigationProps> = (props) => {
  const { userFullName, isUserAdmin, onLogOutClick } = props;
  const history = useHistory();

  const onClassroomClick = () => {
    history.push('/classrooms');
  };

  const onHomeClick = () => {
    history.push('/attendance');
  };

  const onSchoolClick = () => {
    history.push('/admin/schools');
  };

  return (
    <BlueprintNavbar className="bp3-dark">
      <BlueprintNavbar.Group align={Alignment.LEFT}>
        <Button className="bp3-minimal" icon="home" text="Accueil" onClick={onHomeClick} />
        <NavbarDivider />
        <Button className="bp3-minimal" icon="people" text="Mes cours" onClick={onClassroomClick} />
        {isUserAdmin && (
          <>
            <NavbarDivider />
            <Popover content={<AdminMenu onSchoolClick={onSchoolClick} />} minimal>
              <Button
                className="bp3-minimal"
                icon="settings"
                rightIcon="chevron-down"
                text="Administration"
              />
            </Popover>
          </>
        )}
      </BlueprintNavbar.Group>
      <BlueprintNavbar.Group align={Alignment.RIGHT}>
        <Popover content={<ProfilMenu onLogOutClick={onLogOutClick} />} minimal>
          <Button
            className="bp3-minimal"
            icon="person"
            rightIcon="chevron-down"
            text={userFullName}
          />
        </Popover>
      </BlueprintNavbar.Group>
    </BlueprintNavbar>
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

interface AdminMenuProps {
  onSchoolClick();
}

const AdminMenu: FC<AdminMenuProps> = ({ onSchoolClick }) => (
  <Menu>
    <MenuItem text="Écoles" icon="office" onClick={onSchoolClick} />
  </Menu>
);
