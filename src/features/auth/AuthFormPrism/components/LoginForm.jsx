import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../AuthFormPrism.module.scss';
import { loginStart, loginConfirm } from '../../../../api/endpoints/auth';
import AuthCallModal from '../../../../components/AuthCallModal';
import { authStorage } from '../../../../api/utils/auth-storage';

export const LoginForm = ({ onSignup }) => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        mode: 'onBlur',
        defaultValues: { loginUserType: 'user' }
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [callPhone, setCallPhone] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState(null);
    const [checkId, setCheckId] = useState(null);
    const [polling, setPolling] = useState(false);
    const pollingRef = useRef();

    const phoneValue = watch('loginPhone');
    const loginUserType = watch('loginUserType');
    const phoneNumbers = phoneValue ? phoneValue.replace(/\D/g, '') : '';

    useEffect(() => {
        if (phoneValue) {
            // Удаляем все нецифровые символы
            let numbers = phoneValue.replace(/\D/g, '');
            
            // Обеспечиваем начало с 8
            if (numbers.length > 0 && numbers[0] !== '8') {
                numbers = '8' + numbers.substring(1);
            }
            
            // Форматируем по шаблону
            let formatted = numbers;
            if (numbers.length > 1) {
                formatted = `8 (${numbers.substring(1, 4)}`;
                if (numbers.length > 4) {
                    formatted += `) ${numbers.substring(4, 7)}`;
                    if (numbers.length > 7) {
                        formatted += `-${numbers.substring(7, 9)}`;
                        if (numbers.length > 9) {
                            formatted += `-${numbers.substring(9, 11)}`;
                        }
                    }
                }
            }
            
            // Обрезаем лишние цифры (максимум 11 цифр: 8 + 10 цифр)
            if (numbers.length > 11) {
                formatted = formatted.substring(0, 17); // Максимальная длина форматированного номера
                numbers = numbers.substring(0, 11);
            }
            
            if (formatted !== phoneValue) {
                setValue('loginPhone', formatted);
            }
        }
    }, [phoneValue, setValue]);

    const validatePhone = (value) => {
        if (!value) return 'Номер не может быть пустым';
        const numbers = value.replace(/\D/g, '');
        if (numbers.length !== 11) return 'Номер должен содержать 11 цифр';
        if (numbers[0] !== '8') return 'Номер должен начинаться с 8';
        return true;
    };

    // Polling for login confirmation
    useEffect(() => {
        if (modalOpen && checkId && phoneNumbers) {
            setPolling(true);
            pollingRef.current = setInterval(async () => {
                try {
                    const resp = await loginConfirm({ phone: phoneNumbers, userType: loginUserType, checkId });
                    if (resp && resp.accessToken && resp.refreshToken) {
                        authStorage.setTokens(resp.accessToken, resp.refreshToken);
                        clearInterval(pollingRef.current);
                        setPolling(false);
                        setModalOpen(false);
                        window.location.href = '/';
                    }
                } catch (e) {
                    // Можно обработать ошибку, но не показываем пользователю при polling
                }
            }, 2000);
            return () => {
                clearInterval(pollingRef.current);
                setPolling(false);
            };
        }
    }, [modalOpen, checkId, phoneNumbers, loginUserType]);

    // Остановить polling при закрытии модалки
    useEffect(() => {
        if (!modalOpen && pollingRef.current) {
            clearInterval(pollingRef.current);
            setPolling(false);
        }
    }, [modalOpen]);

    const onLoginSubmit = async (data) => {
        setError(null);
        setIsVerifying(true);
        setCheckId(null);
        try {
            const phoneNumbers = data.loginPhone.replace(/\D/g, '');
            const response = await loginStart({ phone: phoneNumbers, userType: data.loginUserType });
            setCallPhone(response.callPhone || phoneNumbers);
            setCheckId(response.checkId);
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
                <input type="hidden" {...register('loginUserType', { required: true })} value={loginUserType} />
                <div className={styles.fieldWrapper}>
                    <input
                        type="text"
                        placeholder="8 (XXX) XXX-XX-XX"
                        {...register('loginPhone', { 
                            required: 'Номер не может быть пустым',
                            validate: validatePhone
                        })}
                        maxLength={17} // 8 (XXX) XXX-XX-XX
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