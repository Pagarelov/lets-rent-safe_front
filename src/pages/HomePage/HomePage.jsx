import React from 'react';
import styles from './HomePage.module.scss';

const HomePage = () => {
    return (
        <div className={styles.page}>
            <h1>Главная страница</h1>
            <p>Добро пожаловать в наш React-шаблон!</p>
            <p>Это содержимое главной страницы. Вы можете разместить здесь любой контент.</p>
        </div>
    );
};

export default HomePage;