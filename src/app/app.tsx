import React from 'react';
import './app.css';
import Products from '../features/products/products';

/**
 * Main component representing the entire application.
 * @component
 * @returns {JSX.Element} The rendered component.
 * @author Maheen Nasir
 */
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Products />
      </header>
    </div>
  );
};

export default App;
