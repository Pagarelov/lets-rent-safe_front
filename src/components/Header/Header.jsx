// src/components/Header/Header.jsx

import React, { useState } from 'react';
import styles from './Header.module.scss';
import clsx from 'clsx';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <a href="/">Let’s Rent Safe</a>
            </div>

            <div className={styles.desktopNav}>
                <nav>
                    <NavLink to="/">Главная</NavLink>
                    <NavLink to="/about">О нас</NavLink>
                    <NavLink to="/contact">Контакты</NavLink>
                </nav>
                <ThemeSwitcher />
            </div>

            <div className={styles.mobileBurger}>
                <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
            </div>

            <div className={clsx(styles.mobileNav, isMenuOpen && styles.open)}>
                <nav>
                    <NavLink to="/" onClick={toggleMenu}>Главная</NavLink>
                    <NavLink to="/about" onClick={toggleMenu}>О нас</NavLink>
                    <NavLink to="/contact" onClick={toggleMenu}>Контакты</NavLink>
                </nav>
                <div className={styles.mobileThemeSwitcher}>
                    <p>Тема:</p>
                    <ThemeSwitcher />
                </div>
            </div>

            {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}

        </header>
    );
};

export default Header;