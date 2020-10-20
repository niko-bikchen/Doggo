import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import Footer from '../components/Footer/Footer';
import DoggoBtn from '../components/DoggoBtn/DoggoBtn';
import { signInUser } from '../lib/authentication';
import styles from './styles/login.module.css';

const Login = () => {
    const [userJwt, setUserJwt] = useState('');
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
    const [credentialsValidated, setCredentialsValidated] = useState({ email: true, password: true });
    const [toast, setToast] = useState(null);

    const onInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setUserCredentials({ ...userCredentials, [name]: value });

        {
            let regex = '';

            if (name === 'email') {
                regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            } else {
                regex = /.+/;
            }

            setCredentialsValidated({ ...credentialsValidated, [name]: regex.test(value) });
        }
    };
    const handleSignIn = async () => {
        if (userCredentials.email && credentialsValidated.email && credentialsValidated.password) {
            const response = await signInUser(userCredentials);
            if (response.message && response.message.includes('400')) {
                toast.show({ severity: 'error', summary: 'Ошибка', detail: 'Пользователя с такими данными не существует', life: 7000 });
            } else {
                setUserJwt(response.data.jwt);
                toast.show({ severity: 'success', summary: 'Успех!', detail: 'Авторизация прошла успешно', life: 7000 });
            }
        }
    };

    return (
        <div>
            <Toast ref={(el) => setToast(el)} />
            <div className={styles["Login"]}>
                <div className={styles["Login-container"] + " py-4"}>
                    <MDBContainer>
                        <MDBRow className="mx-2 align-center align-items-center">
                            <MDBCol md="6" className="h3 text-center text-md-left">
                                Вход
                            </MDBCol>
                            <MDBCol md="6" className="text-center text-md-right text-muted">
                                <Button label="Регистрация" className="p-button-secondary p-button-text p-0" />
                            </MDBCol>
                        </MDBRow>
                        <div className="p-fluid mt-5">
                            <div className="p-field">
                                <div className="p-input-icon-left">
                                    <i className="pi pi-envelope" />
                                    <InputText placeholder="Почта" onChange={onInputChange} type="text" name="email" />
                                </div>
                                <small className="p-invalid" style={{ display: credentialsValidated.email ? 'none' : 'block' }}>
                                    Неправильная почта
                                </small>
                            </div>
                            <div className="p-field">
                                <div className="p-input-icon-left mt-3">
                                    <i className="pi pi-lock" />
                                    <InputText placeholder="Пароль" onChange={onInputChange} type="password" name="password" />
                                </div>
                                <small className="p-invalid" style={{ display: credentialsValidated.password ? 'none' : 'block' }}>
                                    Неправильний пароль
                                    </small>
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <DoggoBtn size="lg" onClick={handleSignIn}>
                                Войти
                            </DoggoBtn>
                        </div>
                    </MDBContainer>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
