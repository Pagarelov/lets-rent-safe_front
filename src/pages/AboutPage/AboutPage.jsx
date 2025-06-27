import React from 'react';
import styles from '../HomePage/HomePage.module.scss';

const AboutPage = () => {
    return (
        <div className={styles.page}>
            <h1>О нас</h1>
            <p>Здесь вы можете рассказать о своей компании или проекте.</p>
        </div>
    );
};

export default AboutPage;