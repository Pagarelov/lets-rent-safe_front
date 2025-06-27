// src/features/auth/components/LoginForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../AuthFormPrism.module.scss'; // Мы будем использовать те же стили

export const LoginForm = ({ onForgotPassword, onSignup }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur'
    });

    const onLoginSubmit = (data) => {
        // data содержит { loginUsername: "...", loginPassword: "..." }
        console.log('Данные для входа:', data);
        // Здесь будет вызов API для входа
    };

    return (
        <div className={styles.content}>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit(onLoginSubmit)}>
                <div className={styles.fieldWrapper}>
                    <input
                        type="text"
                        placeholder="логин"
                        {...register('loginUsername', { required: 'Логин не может быть пустым' })}
                    />
                    <label>логин</label>
                    {errors.loginUsername && <span className={styles.error}>{errors.loginUsername.message}</span>}
                </div>
                <div className={styles.fieldWrapper}>
                    <input
                        type="password"
                        placeholder="пароль"
                        {...register('loginPassword', { required: 'Пароль не может быть пустым' })}
                    />
                    <label>пароль</label>
                    {errors.loginPassword && <span className={styles.error}>{errors.loginPassword.message}</span>}
                </div>
                <div className={styles.fieldWrapper}>
                    <input type="submit" value="Войти" />
                </div>
                <span className={styles.psw} onClick={onForgotPassword}>Забыли пароль?</span>
                <span className={styles.signup} onClick={onSignup}>Нет аккаунта? Регистрация</span>
            </form>
        </div>
    );
};