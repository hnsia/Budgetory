import React from 'react';
import './App.css';
import MainRouter from './routers/MainRouter' ;
import LayoutContextProvider from './contexts/LayoutContext';

export default function App() {
  return (
    <div className="App">
      <LayoutContextProvider>
        <MainRouter />
      </LayoutContextProvider>
    </div>
  );
}
