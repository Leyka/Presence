import React from 'react';
import './MainLayout.scss';

export const MainLayout = () => {
  return (
    <div className="MainLayout">
      <div className="MainLayout__container">
        <nav>Navbar</nav>
        <main>
          <div>Left</div>
          <div>Right</div>
        </main>
      </div>
      <footer>Footer</footer>
    </div>
  );
};
