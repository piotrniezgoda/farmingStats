import React from 'react';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import styles from './Stats.module.scss';

import arrowBack from '../../assets/icons/arrowBack.svg';
import refreshIcon from '../../assets/icons/refresh.svg';
import QuickStatsBar from '../../components/QuickStatsBar/QuickStatsBar';
import StatsBox from '../../components/StatsBox/StatsBox';
import Footer from '../../components/Footer/Footer';

class Stats extends React.Component {

  constructor(props) {
    super(props);
    this.serverStatsURL = "http://195.4.17.55:8080/feed/dedicated-server-stats.xml?code=15dd77dda9756f35ad891aa743ea87ca";
    this.saveStatsURL = "http://195.4.17.55:8080/feed/dedicated-server-savegame.html?code=15dd77dda9756f35ad891aa743ea87ca&file=careerSavegame";

    this.state = {
      isComponentLoaded: false,
      quickStats: {
        money: 0,
        online: 0,
        slots: 0,
      },
      serverStats: {
        game: '',
        mapName: '',
        serverName: '',
        serverLocation: '',
        version: '',
      },
      players: [],

    };
  }

  refreshStats = () => {
    this.makeRequest();
  }

  makeRequest = () => {
    this.setState({
      isComponentLoaded: false
    })
  fetch(this.serverStatsURL)
    .then((response) => response.text())
    .then(responseText => (new window.DOMParser()).parseFromString(responseText, "text/xml"))
    .then(data => {
      const xmlData = data.getElementsByTagName('Server');

      const playersData = data.getElementsByTagName('Slots')
      let playersArray = [];

      for(let i = 0; i < playersData[0].children.length; i++) {
        if(playersData[0].children[i].textContent !== "") {
          playersArray.push(playersData[0].children[i].textContent);
        }
      }

      this.setState({
        players: playersArray,
      });

      let serverStats = this.state.serverStats
      let quickStats = this.state.quickStats;

      serverStats.game = xmlData[0].attributes[0].nodeValue;
      serverStats.mapName = xmlData[0].attributes[4].nodeValue;
      serverStats.serverName = xmlData[0].attributes[3].nodeValue;
      serverStats.serverLocation = xmlData[0].attributes[2].nodeValue;
      serverStats.version = xmlData[0].attributes[1].nodeValue;

      quickStats.online = xmlData[0].childNodes[1].attributes[1].nodeValue;
      quickStats.slots = xmlData[0].childNodes[1].attributes[0].nodeValue;
      this.setState({
        serverStats: serverStats,
        quickStats: quickStats,
      })


    })
    .then(() => {
      this.setState({
        isComponentLoaded: true
      })
    })
    .catch((error) => {
      console.log('Error fetching the feed: ', error);
    });

    fetch(this.saveStatsURL)
    .then((response) => response.text())
    .then(responseText => (new window.DOMParser()).parseFromString(responseText, "text/xml"))
    .then(data => {
      const moneyData = data.getElementsByTagName('statistics');
      let quickStats = this.state.quickStats;
      quickStats.money = moneyData[0].children[0].childNodes[0].nodeValue;
      this.setState({
        quickStats: quickStats,
      })
    })
  }

  componentDidMount() {
    this.makeRequest();
    this.setState({isComponentLoaded: true});

  }

render() {
  return (
    <div className={styles.statsApp}>
        <Helmet>
          <title>Farming Simulator 19 server stats</title>
          <meta name="description" content="Szybki podgląd podstawowych statystyk serwera Alkofarmerzy z Polski B."/>
        </Helmet>
        <div className={[styles.loader, (!this.state.isComponentLoaded ? styles.loaderShow : '')].join(' ')}>
        <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
        </div>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link className={styles.navBackLink} to="/"><img src={arrowBack} alt=""/> Wróć</Link>
        </nav>

        <div className={styles.titlesBox}>
          <h1 className={styles.mainTitle}>Alkofarmerzy z Polski B</h1>
          <p data-text="Statystyki" className={styles.mainSubtitle}>Statystyki</p>
        </div>
      </header>

      <QuickStatsBar data={this.state} />

      <main className={styles.main}>
        <button id="refreshBtn" onClick={this.refreshStats} className={styles.refreshButton}><img src={refreshIcon} alt=""/> Odśwież statystyki</button>
        <div className={styles.statsBoxesContainer}>
          { this.state.isComponentLoaded && <StatsBox title="Gra" type="game" data={this.state.serverStats} /> }
          {/* { this.state.isComponentLoaded && <StatsBox title="Aktywne mody" type="mods" /> } */}
          { this.state.isComponentLoaded && <StatsBox title="Gracze" type="players" playersData={this.state.players} /> }
          {/* { this.state.isComponentLoaded && <StatsBox title="posiadane pola" type="fields" /> } */}
        </div>
      </main>
      <Footer />
    </div>
    )
  }
}

export default Stats
