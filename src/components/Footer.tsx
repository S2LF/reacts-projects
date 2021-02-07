import React from 'react';

function Footer(): JSX.Element {
  return (
    <footer className="bg-primary p-3 d-flex align-items-center justify-content-center text-center">
      <div className="text-success">
        &copy;Syl20 -{' '}
        <a href="https://www.sylvainallain.fr" target="blanck">
          sylvainallain.fr
        </a>{' '}
        - @2021
      </div>
    </footer>
  );
}

export default Footer;
