import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../AuthFormPrism.module.scss';
import { login } from '../../../../api/endpoints/auth';
import AuthCallModal from '../../../../components/AuthCallModal';

export const LoginForm = ({ onSignup }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur'
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [callPhone, setCallPhone] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState(null);

    const onLoginSubmit = async (data) => {
        setError(null);
        setIsVerifying(true);
        try {
            const response = await login({ phone: data.loginPhone });
            setCallPhone(response.callPhone || data.loginPhone);
            setModalOpen(true);
        } catch (e) {
            setError(e.message || 'Ошибка входа');
        } finally {
            setIsVerifying(false);
        }
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
                    <input type="submit" value={isVerifying ? 'Проверка...' : 'Войти'} disabled={isVerifying} />
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <span className={styles.signup} onClick={onSignup}>Нет аккаунта? Регистрация</span>
            </form>
            <AuthCallModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                callPhone={callPhone}
            />
        </div>
    );
};