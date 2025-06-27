import React from 'react';
import styles from '../HomePage/HomePage.module.scss';

const ContactPage = () => {
    return (
        <div className={styles.page}>
            <h1>Контакты</h1>
            <p>Информация для связи: адреса, телефоны, форма обратной связи.</p>
        </div>
    );
};

export default ContactPage;