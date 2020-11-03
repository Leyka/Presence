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

export const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <StyledButton minimal hidden>
          <span role="img" aria-label="bug">
            🐛
          </span>{' '}
          Reporter un bug
        </StyledButton>
      </div>
      <div>
        <p>Fait par Skander Kchouk</p>
        <p>
          Courage aux enseignants!
          <span role="img" aria-label="heart">
            ❤️
          </span>
        </p>
      </div>
      <div>
        <a href="https://www.buymeacoffee.com/skander" target="_blank" rel="noopener noreferrer">
          <img src={buymecoffee} alt="Buy me a coffee" width={180} />
        </a>
      </div>
    </StyledFooter>
  );
};
