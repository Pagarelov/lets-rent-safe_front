// src/features/auth/components/SignupForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../AuthFormPrism.module.scss';
import clsx from 'clsx';
import { registerStart } from '../../../../api/endpoints/auth';
import { checkClientExists } from '../../../../api/endpoints/client';

export const SignupForm = ({ onLogin }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
        setError: setFormError,
        clearErrors
    } = useForm({
        mode: 'onBlur',
        defaultValues: { userType: 'user' }
    });

    const userType = watch('userType');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Асинхронная валидация номера
    const validatePhoneAsync = async (value) => {
        if (!value) return 'Номер обязателен';
        try {
            const exists = await checkClientExists(value.replace(/\D/g, ''));
            if (exists && exists.exists) {
                return 'Пользователь с таким номером уже зарегистрирован';
            }
        } catch (e) {
            // Можно не блокировать регистрацию если API недоступно
        }
        return true;
    };

    const onSignupSubmit = async (data) => {
        setError(null);
        setSuccess(false);
        setLoading(true);
        try {
            // Для застройщика отправляем все поля, для пользователя только основные
            const payload = userType === 'developer'
                ? {
                    phone: data.phone,
                    userType: data.userType,
                    inn: data.inn,
                    name: data.companyName,
                    fullName: data.contactName
                }
                : {
                    phone: data.phone,
                    userType: data.userType
                };
            await registerStart(payload);
            setSuccess(true);
            reset();
        } catch (e) {
            setError(e.message || 'Ошибка регистрации');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.content}>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit(onSignupSubmit)}>
                {/* --- НАШ НОВЫЙ ПЕРЕКЛЮЧАТЕЛЬ --- */}
                <div className={styles.userTypeSwitcher}>
                    <button
                        type="button"
                        className={clsx(userType === 'user' && styles.activeType)}
                        onClick={() => setValue('userType', 'user', { shouldValidate: true })}
                    >
                        Пользователь
                    </button>
                    <button
                        type="button"
                        className={clsx(userType === 'developer' && styles.activeType)}
                        onClick={() => setValue('userType', 'developer', { shouldValidate: true })}
                    >
                        Застройщик
                    </button>
                </div>

                <input type="hidden" {...register('userType', { required: true })} />

                {/* Для пользователя */}
                {userType === 'user' && (
                  <>
                    <div className={styles.fieldWrapper}>
                        <input
                            type="text"
                            placeholder="Имя"
                            {...register('firstName', { required: 'Имя обязательно' })}
                        />
                        <label>Имя</label>
                        {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
                    </div>
                    <div className={styles.fieldWrapper}>
                        <input
                            type="text"
                            placeholder="Фамилия"
                            {...register('lastName', { required: 'Фамилия обязательна' })}
                        />
                        <label>Фамилия</label>
                        {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
                    </div>
                  </>
                )}

                {/* Для застройщика */}
                {userType === 'developer' && (
                  <>
                    <div className={styles.fieldWrapper}>
                        <input
                            type="text"
                            placeholder="ИНН"
                            {...register('inn', { required: userType === 'developer' ? 'ИНН обязателен' : false })}
                        />
                        <label>ИНН</label>
                        {errors.inn && <span className={styles.error}>{errors.inn.message}</span>}
                    </div>
                    <div className={styles.fieldWrapper}>
                        <input
                            type="text"
                            placeholder="Название компании"
                            {...register('companyName', { required: userType === 'developer' ? 'Название компании обязательно' : false })}
                        />
                        <label>Название компании</label>
                        {errors.companyName && <span className={styles.error}>{errors.companyName.message}</span>}
                    </div>
                    <div className={styles.fieldWrapper}>
                        <input
                            type="text"
                            placeholder="ФИО контактного лица"
                            {...register('contactName', { required: userType === 'developer' ? 'ФИО контактного лица обязательно' : false })}
                        />
                        <label>ФИО контактного лица</label>
                        {errors.contactName && <span className={styles.error}>{errors.contactName.message}</span>}
                    </div>
                  </>
                )}

                <div className={styles.fieldWrapper}>
                    <input
                        type="text"
                        placeholder="Номер"
                        {...register('phone', {
                            required: 'Номер обязателен',
                            validate: validatePhoneAsync
                        })}
                    />
                    <label>Номер телефона</label>
                    {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                </div>
                <div className={styles.fieldWrapper}>
                    <input type="submit" value={loading ? 'Создание...' : 'Создать аккаунт'} disabled={loading} />
                </div>
                {success && <div style={{ color: 'green', marginBottom: 10 }}>
                    Аккаунт успешно создан! Проверьте телефон для подтверждения.
                </div>}
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.formLinks}>
                    <span className={styles.singin} onClick={onLogin}>Уже есть аккаунт? Войти</span>
                </div>
            </form>
        </div>
    );
};