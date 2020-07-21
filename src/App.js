import React from 'react';
import styles from './App.module.scss';
import {
  Link
} from "react-router-dom";
import Footer from './components/Footer/Footer';
import graphIcon from './assets/icons/graph.svg';
import {Helmet} from "react-helmet";

function App() {
  return (
    <div className={styles.app}>
        <Helmet>
          <title>Farming Simulator 19 server stats</title>
          <meta name="description" content="Szybki podgląd podstawowych statystyk serwera Alkofarmerzy z Polski B."/>
        </Helmet>
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
