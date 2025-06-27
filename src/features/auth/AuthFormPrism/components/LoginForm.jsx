// src/features/auth/components/LoginForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../AuthFormPrism.module.scss'; // Мы будем использовать те же стили

export const LoginForm = ({ onSignup }) => {
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
                        placeholder="Номер"
                        {...register('loginPhone', { required: 'Номер не может быть пустым' })}
                    />
                    <label>Номер телефона</label>
                    {errors.loginPhone && <span className={styles.error}>{errors.loginPhone.message}</span>}
                </div>
                <div className={styles.fieldWrapper}>
                    <input type="submit" value="Войти" />
                </div>
                <span className={styles.signup} onClick={onSignup}>Нет аккаунта? Регистрация</span>
            </form>
        </div>
    );
};