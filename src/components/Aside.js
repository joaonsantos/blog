import React from 'react'

import styles from '../style/Aside.module.css'
import profileImg from '../imgs/profile.jpg'
import blogConfigs from '../blogConfigs'

class Aside extends React.Component {
  render () {
    return (
      <aside>
        <div className={styles.content}>
          <img className={styles.profile} src={profileImg} alt="João Santos"/>
          <p className={styles.description}>{blogConfigs.description}</p>
        </div>
      </aside>
    )
  }
}

export default Aside
