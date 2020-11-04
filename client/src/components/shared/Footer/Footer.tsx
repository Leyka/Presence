import { Button } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';
import buymecoffee from './buymecoffee.png';

const StyledFooter = styled.footer`
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  background: #2f3255;
  color: #fff;
  padding: 10px;
`;

const StyledButton = styled(Button)`
  & > span {
    color: #fff;
  }
`;

const CenteredTextContainer = styled.div`
  text-align: center;
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <div>
        Courage aux enseignants{' '}
        <span role="img" aria-label="heart">
          ❤️
        </span>
        <StyledButton minimal hidden>
          Reporter un bug
          <span role="img" aria-label="bug">
            🐛
          </span>
        </StyledButton>
      </div>
      <CenteredTextContainer>
        Copyright © {new Date().getFullYear()} | Skander Kchouk
      </CenteredTextContainer>
      <div>
        <a href="https://www.buymeacoffee.com/skander" target="_blank" rel="noopener noreferrer">
          <img src={buymecoffee} alt="Buy me a coffee" />
        </a>
      </div>
    </StyledFooter>
  );
};
