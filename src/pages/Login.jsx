import React, { useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';

const Login = () => {
    const url = "http://localhost:8080/api/v1/auth/login";
    const navigate = useNavigate();

    // Define the initial values for the form fields
    const initialValues = {
        username: '',
        password: '',
    };

    const { login } = useContext(UserContext);

    // Define the validation schema using Yup
    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    useEffect(() => {
        if (localStorage.getItem('login')) {
            navigate('/');
        }
    }, [navigate]);

    // Define the function to handle form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post(url, values);
            const { data, success } = response.data;

            if (success) {
                login(data.f_userName, success);
                navigate('/');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid username or password!',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid username or password!',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md" data-v0-t="card">
                <div className="flex flex-col p-6 space-y-1 text-center">
                    <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Login</h3>
                    <p className="text-sm text-muted-foreground">Enter your username and password</p>
                </div>
                <div className="p-6 space-y-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="username"
                                    >
                                        Username
                                    </label>
                                    <Field
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="username"
                                        name="username"
                                        placeholder="Enter your username"
                                    />
                                    <ErrorMessage
                                        component="div"
                                        className="text-red-500 text-sm"
                                        name="username"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <Field
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    <ErrorMessage
                                        component="div"
                                        className="text-red-500 text-sm"
                                        name="password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="flex items-center justify-center h-10 w-full rounded-md border bg-black px-3 py-2 text-lg font-medium disabled:cursor-not-allowed disabled:opacity-50 text-white"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;