import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import logo from "../assets/images/favicon.png";
import Hyperlink from "../components/hyperlink/HyperLink";
import GradientBar from "../components/button/GradientBar";
import Card from "../components/card/Card";
import FormSuccess from "../components/form/FormSuccess";
import FormError from "../components/form/FormError";
import Label from "../components/label/Label";
import FormInput from "../components/form/FormInput";
import GradientButton from "../components/button/GradientButton";
import { Navigate } from "react-router-dom";
import { useLoginMutation } from "../app/api/apiSlice";
import { setAuthInfo } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const LoginSchema = Yup.object().shape({
	email: Yup.string().required("Email is required"),
	password: Yup.string().required("Password is required")
});

const Login = () => {
	const dispatch = useDispatch();
	const [login, { isError, error, isSuccess, isLoading, data }] =
		useLoginMutation();

	const [redirectOnLogin, setRedirectOnLogin] = useState(false);

	const submitCredentials = async (credentials) => {
		try {
			const data = await login({ ...credentials }).unwrap();

			dispatch(setAuthInfo(data));

			setTimeout(() => {
				setRedirectOnLogin(true);
			}, 700);
		} catch (error) {
			console.log("Fail to login: ", error);
		}
	};

	return (
		<>
			{redirectOnLogin && <Navigate to='/dashboard' />}
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
									Log in to your account
								</h2>
								<p className='text-gray-600 text-center'>
									Don't have an account?{" "}
									<Hyperlink to='signup' text='Sign up now' />
								</p>
							</div>

							<Formik
								initialValues={{
									email: "",
									password: ""
								}}
								onSubmit={(values) => submitCredentials(values)}
								validationSchema={LoginSchema}
							>
								{() => (
									<Form className='mt-8'>
										{isSuccess && <FormSuccess text={data?.message} />}
										{isError && <FormError text={error?.data?.message} />}
										<div>
											<div className='mb-2'>
												<div className='mb-1'>
													<Label text='Email' />
												</div>
												<FormInput
													ariaLabel='Email'
													name='email'
													type='text'
													placeholder='Email'
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

										<div className='mt-6 flex justify-start'>
											<div className='text-sm leading-5'>
												<Hyperlink
													to='forgot-password'
													text='Forgot your password?'
												/>
											</div>
										</div>

										<div className='mt-6'>
											<GradientButton
												type='submit'
												text='Log In'
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

export default Login;
