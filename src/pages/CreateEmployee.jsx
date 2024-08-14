import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateEmployee = () => {
    const initialValues = {
        f_name: '',
        f_email: '',
        f_image: {},
        f_mobile: '',
        f_designation: '',
        f_course: '',
        f_gender: ''
    };
    const url = "http://localhost:8080/api/v1/employee/"

    const validationSchema = Yup.object({
        f_name: Yup.string().required('Name is required'),
        f_email: Yup.string().email('Invalid email format').required('Email is required'),
        f_mobile: Yup.string().required('Mobile Number is required'),
        f_designation: Yup.string().required('Designation is required'),
        f_course: Yup.string().required('Course is required'),
        f_gender: Yup.string().required('Gender is required')
    });

    const onSelectFile = (e, setFieldValue) => {
        const file = e.target.files?.[0];
        if (file) {
            setFieldValue('f_image', file);
        } else {
            setFieldValue('f_image', null);
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // Show a loading indicator
            Swal.fire({
                title: 'Creating Employee...',
                text: 'Please wait while we process your request.',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Send the request to the server
            const response = await axios.post(url, values);
            const { success, message } = response.data;

            // Handle successful creation
            if (success) {
                Swal.fire({
                    title: "Employee Created Successfully!",
                    text: "The employee has been added to the team.",
                    icon: "success",
                    confirmButtonText: 'OK'
                }).then(() => {
                    resetForm();  // Reset the form after successful submission
                });
            } else {
                // Handle failure with a custom message from the server
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Create Employee',
                    text: message || 'An unexpected error occurred. Please try again later.',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            // Handle network or server errors
            Swal.fire({
                icon: 'error',
                title: 'Failed to Create Employee',
                text: error.response?.data?.message || 'An unexpected error occurred. Please check your network connection and try again.',
                confirmButtonText: 'OK'
            });
        } finally {
            // Always set submitting to false to allow resubmission
            setSubmitting(false);
        }
    };


    return (
        <section className='w-full'>
            <div className='w-full lg:min-w-[550px] xl:max-w-[700px] h-full px-5 md:px-10 py-5 max-w-md rounded-md'>
                <h1 className='text-2xl lg:text-3xl font-medium'>Create Employee</h1>
                <h4>Fill out the form below to add a new employee to the team.</h4>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className='w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 md:mt-10'>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="f_name" className="text-base font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>
                                <Field type="text" name="f_name" id="f_name" placeholder='John Doe' className='py-2 rounded-md outline-none pl-3 border border-gray-300 focus:border-blue-500' />
                                <ErrorMessage name="f_name" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="f_email" className="text-base font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
                                <Field type="email" name="f_email" id="f_email" placeholder='info@example.com' className='py-2 rounded-md pl-3 outline-none border border-gray-300 focus:border-blue-500' />
                                <ErrorMessage name="f_email" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="f_image" className="text-base font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Image</label>
                                <input
                                    type="file"
                                    name="f_image"
                                    id="f_image"
                                    accept=".jpg, .png"
                                    className='py-2 rounded-md pl-3 outline-none border border-gray-300 focus:border-blue-500'
                                    onChange={(e) => onSelectFile(e, setFieldValue)}
                                />
                                <ErrorMessage name="f_image" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="f_mobile" className="text-base font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Mobile Number</label>
                                <Field type="tel" name="f_mobile" id="f_mobile" placeholder='(+21) 123 456 586' className='py-2 rounded-md outline-none pl-3 border border-gray-300 focus:border-blue-500' />
                                <ErrorMessage name="f_mobile" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="f_designation" className="text-base font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Designation</label>
                                <Field as="select" name="f_designation" id="f_designation" className='py-2 rounded-md pl-3 outline-none border border-gray-300 focus:border-blue-500'>
                                    <option value="" label="Select designation" />
                                    <option value="Manager" label="Manager" />
                                    <option value="HR" label="HR" />
                                    <option value="Sales" label="Sales" />
                                </Field>
                                <ErrorMessage name="f_designation" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="f_course" className="text-base font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Course</label>
                                <Field as="select" name="f_course" id="f_course" className='py-2 rounded-md pl-3 outline-none border border-gray-300 focus:border-blue-500'>
                                    <option value="" label="Select course" />
                                    <option value="MCA" label="MCA" />
                                    <option value="BCA" label="BCA" />
                                    <option value="BSC" label="BSC" />
                                </Field>
                                <ErrorMessage name="f_course" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="f_gender" className="text-base font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Gender</label>
                                <Field as="select" name="f_gender" id="f_gender" className='py-2 rounded-md pl-3 outline-none border border-gray-300 focus:border-blue-500'>
                                    <option value="" label="Select gender" />
                                    <option value="M" label="Male" />
                                    <option value="F" label="Female" />
                                </Field>
                                <ErrorMessage name="f_gender" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='w-full col-span-1 md:col-span-2'>
                                <button type='submit' className='py-2 px-6 bg-blue-500 text-white rounded-md font-medium cursor-pointer hover:bg-blue-700' disabled={isSubmitting}>Create Employee</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    )
}

export default CreateEmployee;