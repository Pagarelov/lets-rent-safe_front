// src/features/auth/components/SignupForm.jsx
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../AuthFormPrism.module.scss';

export const SignupForm = ({ onLogin }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: 'onBlur'
    });

    const password = useRef({});
    password.current = watch("signupPassword", "");

    const onSignupSubmit = (data) => {
        console.log('Данные для регистрации:', data);
    };

    return (
        <div className={styles.content}>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit(onSignupSubmit)}>
                <div className={styles.fieldWrapper}>
                    <input
                        type="text"
                        placeholder="e-mail"
                        {...register('signupEmail', {
                            required: 'Email обязателен',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Введите корректный email'
                            }
                        })}
                    />
                    <label>e-mail</label>
                    {errors.signupEmail && <span className={styles.error}>{errors.signupEmail.message}</span>}
                </div>
                <div className={styles.fieldWrapper}>
                    <input
                        type="password"
                        placeholder="пароль"
                        {...register('signupPassword', {
                            required: 'Пароль обязателен',
                            minLength: {
                                value: 8,
                                message: 'Пароль должен быть не менее 8 символов'
                            }
                        })}
                    />
                    <label>пароль</label>
                    {errors.signupPassword && <span className={styles.error}>{errors.signupPassword.message}</span>}
                </div>
                <div className={styles.fieldWrapper}>
                    <input
                        type="password"
                        placeholder="повторите пароль"
                        {...register('confirmPassword', {
                            required: 'Подтвердите пароль',
                            validate: value => value === password.current || 'Пароли не совпадают'
                        })}
                    />
                    <label>повторите пароль</label>
                    {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
                </div>
                <div className={styles.fieldWrapper}>
                    <input type="submit" value="Создать аккаунт" />
                </div>
                <div className={styles.formLinks}>
                    <span className={styles.singin} onClick={onLogin}>Уже есть аккаунт? Войти</span>
                </div>
            </form>
        </div>
    );
};