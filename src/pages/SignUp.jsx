import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import GradientBar from "../components/button/GradientBar";
import GradientButton from "../components/button/GradientButton";
import Card from "../components/card/Card";
import Hyperlink from "../components/hyperlink/HyperLink";
import FormSuccess from "../components/form/FormSuccess";
import FormError from "../components/form/FormError";
import Label from "../components/label/Label";
import FormInput from "../components/form/FormInput";
import logo from "../assets/images/favicon.png";
import { useSignupMutation } from "../app/api/apiSlice";
import { setAuthInfo } from "../features/auth/authSlice";

const SignUpSchema = Yup.object().shape({
	firstName: Yup.string().required("First name is required"),
	lastName: Yup.string().required("Last name is require"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().required("Password is required")
});

const SignUp = () => {
	const dispatch = useDispatch();
	const [signup, { isLoading, isError, error, data, isSuccess }] =
		useSignupMutation();

	const [redirectOnLogin, setRedirectOnLogin] = useState(false);

	const submitCredentials = async (credentials) => {
		try {
			const data = await signup({ ...credentials }).unwrap();

			dispatch(setAuthInfo(data));

			setTimeout(() => {
				setRedirectOnLogin(true);
			}, 700);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{redirectOnLogin && <Navigate to='/dashboard' replace={true} />}
			<section className='w-full sm:w-1/2 h-screen m-auto p-8 sm:pt-10'>
				<GradientBar />
				<Card>
					<div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
						<div className='max-w-md w-full'>
							<div>
								<div className='w-32 m-auto mb-6'>
									<img src={logo} alt='Logo' />
								</div>
								<h2 className='mb-2 text-center text-3xl leading-9 font-extrabold text-gray-900'>
									Sign up for an account
								</h2>
								<p className='text-gray-600 text-center'>
									Already have an account?{" "}
									<Hyperlink to='login' text='Log in now' />
								</p>
							</div>
							<Formik
								initialValues={{
									firstName: "",
									lastName: "",
									email: "",
									password: ""
								}}
								onSubmit={(values) => submitCredentials(values)}
								validationSchema={SignUpSchema}
							>
								{() => (
									<Form className='mt-8'>
										{isSuccess && <FormSuccess text={data?.message} />}
										{isError && <FormError text={error?.data?.message} />}
										<input type='hidden' name='remember' value='true' />
										<div>
											<div className='flex'>
												<div className='mb-2 mr-2 w-1/2'>
													<div className='mb-1'>
														<Label text='First Name' />
													</div>
													<FormInput
														ariaLabel='First Name'
														name='firstName'
														type='text'
														placeholder='First Name'
													/>
												</div>
												<div className='mb-2 ml-2 w-1/2'>
													<div className='mb-1'>
														<Label text='Last Name' />
													</div>
													<FormInput
														ariaLabel='Last Name'
														name='lastName'
														type='text'
														placeholder='Last Name'
													/>
												</div>
											</div>
											<div className='mb-2'>
												<div className='mb-1'>
													<Label text='Email address' />
												</div>
												<FormInput
													ariaLabel='Email address'
													name='email'
													type='email'
													placeholder='Email address'
												/>
											</div>
											<div>
												<div className='mb-1'>
													<Label text='Password' />
												</div>
												<FormInput
													ariaLabel='Password'
													name='password'
													type='password'
													placeholder='Password'
												/>
											</div>
										</div>

										<div className='mt-6'>
											<GradientButton
												type='submit'
												text='Sign Up'
												loading={isLoading}
											/>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</Card>
			</section>
		</>
	);
};

export default SignUp;
