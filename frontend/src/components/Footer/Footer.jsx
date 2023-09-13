import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
        <div className={styles.firstCol}>
            <h1 className={styles.companyName}>QEstate Homes</h1>
            <div className={styles.companyDescription}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ipsam necessitatibus exercitationem vitae cumque unde recusandae corrupti quasi saepe minus. Aliquid mollitia eligendi asperiores velit maxime recusandae atque ut laboriosam.
            </div>
        </div>
        <div className={styles.secondCol}>
            <h1 className={styles.linkHeader}>
                contact
            </h1>
            <ul className={styles.linkItems}>
                <li>Bengaluru, India</li>
                <li>qestate@example.com</li>
                <li>+91-8907654321</li>
                <li>021-932736</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer