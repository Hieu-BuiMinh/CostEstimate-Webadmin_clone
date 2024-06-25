'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { APP_ROUTER } from '@/common/config'
import { RHFDynamicInput } from '@/components/inputs'
import { useResponsiveDevice } from '@/hooks/custom-hooks/useMediaquery'
import { useAuthRegister } from '@/view/auth/hooks'
import type { IRegisterRequestDto } from '@/view/auth/types'
import { SignUpFormValidation } from '@/view/auth/validations'

type FormFields = z.infer<typeof SignUpFormValidation>

function SignUpForm() {
	const router = useRouter()
	const { mutate: handleRegister, isSuccess, isPending, data: registerData } = useAuthRegister()

	const methods = useForm<FormFields>({ resolver: zodResolver(SignUpFormValidation) })
	const device = useResponsiveDevice()

	const formFields = [
		{
			type: 'group',
			name: 'authname',
			children: [
				{ type: 'text', name: 'firstname', label: 'Firstname', required: true, placeholder: 'Enter firstname' },
				{ type: 'text', name: 'lastname', label: 'Lastname', required: true, placeholder: 'Enter lastname' },
			],
		},
		{ type: 'text', name: 'email', label: 'Email', required: true, placeholder: 'Enter email' },
		{ type: 'text', name: 'username', label: 'Username', required: true, placeholder: 'Enter username' },
		{ type: 'password', name: 'password', label: 'Password', required: true, placeholder: 'Enter password' },
		{ type: 'number', name: 'phoneNumber', label: 'Phone number' },
	]

	const onSubmit: SubmitHandler<FormFields> = (formData) => {
		handleRegister(formData as IRegisterRequestDto)
	}

	useEffect(() => {
		if (registerData?.statusCode === 200) {
			methods.reset()
			router.push(APP_ROUTER.paths.center.signIn.path)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess])

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className={clsx(
					{
						'flex w-[385px] flex-col gap-6 rounded border bg-[var(--color-login-form-bg)] p-3': true,
					},
					{ 'w-screen min-h-screen max-w-none': device === 'mobile' }
				)}
			>
				<section className="sign-up-section h-[93px] !py-0">
					<Image
						src="/assets/auth/imgs/auth_form_header_img.png"
						alt="auth_form_header_img"
						width={40}
						height={10}
						className="h-auto"
					/>
					<p className="text-center text-2xl font-medium uppercase text-[var(--color-surface-999)]">
						Sign up new account
					</p>
				</section>

				<section className="sign-up-section gap-2">
					{/* eslint-disable-next-line array-callback-return, consistent-return */}
					{formFields.map((field): any => {
						if (field.type === 'group') {
							return (
								<div key={field.name} className="grid grid-cols-2 gap-3">
									{field?.children?.map((child) => {
										return (
											<div key={child.name} className="flex w-full flex-col gap-1">
												<RHFDynamicInput
													name={child.name}
													type={child.type as 'text' | 'checkbox' | 'radio'}
													label={child?.label}
													placeholder={child?.placeholder}
													required={child?.required}
												/>
											</div>
										)
									})}
								</div>
							)
						}

						return (
							<div key={field.name} className="flex w-full flex-col gap-1">
								<RHFDynamicInput
									name={field.name}
									type={field.type as 'text' | 'checkbox' | 'radio'}
									label={field?.label}
									placeholder={field?.placeholder}
									required={field?.required}
								/>
							</div>
						)
					})}

					<div className="flex w-full flex-col gap-1">
						{registerData?.statusCode !== 200 && <p className="text-red-400">{registerData?.message}</p>}
						<ButtonComponent disabled={isPending} type="submit" className="e-primary mt-4 w-full">
							SUBMIT
						</ButtonComponent>
					</div>

					<div>
						Already have an account?{' '}
						<Link
							className="w-full justify-start text-sm font-semibold text-[var(--color-text-link)]"
							href={APP_ROUTER.paths.center.signIn.path}
						>
							Login here{' '}
						</Link>
					</div>
				</section>

				{/* <section className="sign-up-section gap-2 border-t">
				<span className="text-center">Or continue with</span>
				<div className="flex w-full items-center justify-center gap-3">
					<ButtonComponent className="e-normal h-[33px] w-[145px]">
						<div className="flex items-center gap-3">
							<Image
								src="/assets/auth/imgs/gg_icon.svg"
								alt="auth_form_header_img"
								width={20}
								height={20}
								className="h-auto"
							/>
							<span>Google</span>
						</div>
					</ButtonComponent>
					<ButtonComponent className="e-normal h-[33px] w-[145px]">
						<div className="flex items-center gap-3">
							<Image
								src="/assets/auth/imgs/git_icon.svg"
								alt="auth_form_header_img"
								width={20}
								height={20}
								className="h-auto"
							/>
							<span>Github</span>
						</div>
					</ButtonComponent>
				</div>
			</section> */}
			</form>
		</FormProvider>
	)
}

export default SignUpForm
