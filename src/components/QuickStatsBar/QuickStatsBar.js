import React from 'react';
import styles from './QuickStatsBar.module.scss';
import moneyIcon from '../../assets/icons/money.svg';
import userIcon from '../../assets/icons/user.svg';
import databaseIcon from '../../assets/icons/database.svg';

function QuickStatsBar(props) {
  return (
    <aside className={styles.statsBar}>
      <div className={styles.statsBarBox}>
        <img src={moneyIcon} alt=""/>
        <h2 className={styles.statsBarName}>Pieniądze</h2>
        <span className={styles.statsBarValue} id="#money">{props.data.quickStats.money}</span>
      </div>

      <div className={styles.statsBarBox}>
        <img src={userIcon} alt=""/>
        <h2 className={styles.statsBarName}>Osób online</h2>
        <span className={styles.statsBarValue} id="#online">{props.data.quickStats.online}</span>
      </div>

      <div className={styles.statsBarBox}>
        <img src={databaseIcon} alt=""/>
        <h2 className={styles.statsBarName}>Licza slotów</h2>
        <span className={styles.statsBarValue} id="#slots">{props.data.quickStats.slots}</span>
      </div>
    </aside>
  )
}

export default QuickStatsBar
