import React from 'react';
import styles from './StatsBox.module.scss';

function StatsBox(props) {
  let isServerEmpty = true
  if('playersData' in props && props.playersData.length > 0) {
    isServerEmpty = false;
  }

  return (
    <article className={styles.box}>
      <h2 className={styles.boxTitle}>{props.title}</h2>
        {props.type === "game" &&
          <ul className={styles.list}>
          <li className={styles.listElement}>
            <p className={styles.listParagraph}>Gra: <span className={styles.dataValue}>{props.data.game}</span></p>
          </li>
          <li className={styles.listElement}>
            <p className={styles.listParagraph}>Wersja: <span className={styles.dataValue}>{props.data.version}</span></p>
          </li>
          <li className={styles.listElement}>
            <p className={styles.listParagraph}>Serwer: <span className={styles.dataValue}>{props.data.serverLocation}</span></p>
          </li>
          <li className={styles.listElement}>
            <p className={styles.listParagraph}>Nazwa: <span className={styles.dataValue}>{props.data.serverName}</span></p>
          </li>
          <li className={styles.listElement}>
            <p className={styles.listParagraph}>Nazwa mapy: <span className={styles.dataValue}>{props.data.mapName}</span></p>
          </li>
        </ul>
        }

        {props.type === "players" &&

          <ul className={styles.list}>
             {props.playersData.map(player => {
              return <li key={player} className={styles.listElementDots}>
              <p className={styles.listParagraph}>{player}</p>
            </li>
            })}
          </ul>

        }
        {props.type === "players" && isServerEmpty &&
          <span className={styles.NoPlayerInfo}>Brak Graczy</span>
        }

    </article>
  )
}

export default StatsBox
