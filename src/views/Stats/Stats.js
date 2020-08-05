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

  componentDidMount() {
    this.makeRequest();
    this.setState({isComponentLoaded: true});

  }

  refreshStats = () => {
    this.makeRequest();
  }



  makeRequest = () => {
    this.setState({
      isComponentLoaded: false
    })


    fetch('https://farm-stats-backend.herokuapp.com/')
    .then((response) => response.json())
    .then(data  => {

      const slots = data.serverStats.Server.Slots[0].Player
      let playersArray = []
      const slotsFilteredArray = slots.filter(e => e !== '');

      let serverStats = this.state.serverStats
      let quickStats = this.state.quickStats;

       for(let i = 0; i < slotsFilteredArray.length; i++) {
        if(slotsFilteredArray[i].$.isUsed) {
          playersArray.push(slotsFilteredArray[i]._)
        }
       }

       playersArray = playersArray.filter(el => el !== undefined)

       this.setState({
        players: playersArray,
      });

       serverStats.game = data.serverStats.Server.$.game;
       serverStats.mapName = data.serverStats.Server.$.mapName;
       serverStats.serverName = data.serverStats.Server.$.name;
       serverStats.serverLocation = data.serverStats.Server.$.server;
       serverStats.version = data.serverStats.Server.$.version;

       quickStats.money = data.saveStats.careerSavegame.statistics[0].money[0];
       quickStats.online = data.serverStats.Server.Slots[0].$.numUsed;
       quickStats.slots = data.serverStats.Server.Slots[0].$.capacity;

      this.setState({
         serverStats: serverStats,
         quickStats: quickStats,
       })

    })
    .then(this.setState({
      isComponentLoaded: true
    }))
    .catch((error) => {
      console.log('Error fetching the feed: ', error);
    });

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
