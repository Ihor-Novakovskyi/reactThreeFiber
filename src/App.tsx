import React, {useState, useEffect} from 'react';
import { createPortal } from 'react-dom';
import './App.css';
import MainPage from './Pages/MainPage/MainPage';
import LoadPage from './Pages/Loadpage/LoadPage';


export default function App() { 
  const [isLoadPageOpen, setLoadPageOpen] = useState(true);
  const closePage = () => setLoadPageOpen(false);
  return (
    <>
      <MainPage/>
      {isLoadPageOpen && createPortal(<LoadPage closeLoadPage={closePage}/>, document.body)}
    </>
  )
}
