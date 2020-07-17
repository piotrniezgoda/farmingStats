import React from 'react';
import styles from './App.module.scss';
import {
  Link
} from "react-router-dom";
import Footer from './components/Footer/Footer';
import graphIcon from './assets/icons/graph.svg';

function App() {
  return (
    <div className={styles.app}>
        <header  className={styles.header}>
          <h1 className={styles.title}>Alkofarmerzy z Polski B</h1>
        </header>
        <main className={styles.main}>
          <nav className={styles.nav}>
            <ul className={styles.list}>
              <li className={styles.listElement}><Link className={styles.menuLink} to="/stats"><img src={graphIcon} alt=""/> Statystyki</Link></li>
            </ul>
          </nav>
        </main>
        <Footer />
    </div>
  );
}

export default App;
