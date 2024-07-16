'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { APP_ROUTER } from '@/common/config'
import { RHFDynamicInput } from '@/components/inputs'
import { useResponsiveDevice } from '@/hooks/custom-hooks/useMediaquery'
import { useAuthRegister } from '@/view/auth/hooks'
import { useReristerFormStore } from '@/view/auth/stores'
import type { IRegisterRequestDto } from '@/view/auth/types'
import { SignUpFormValidation } from '@/view/auth/validations'

type FormFields = z.infer<typeof SignUpFormValidation>

interface ISignUpForm {
	handleUpdateRegisterState: (_state: 'LOGIN_FORM' | 'VERIFY_OTP') => void
}

function SignUpForm({ handleUpdateRegisterState }: ISignUpForm) {
	const { setUser } = useReristerFormStore()
	const translate = useTranslations('Page.Auth.SignUp')
	const translateValidation = useTranslations()

	const { mutate: handleRegister, isSuccess, isPending, data: registerData } = useAuthRegister()

	const methods = useForm<FormFields>({ resolver: zodResolver(SignUpFormValidation) })
	const device = useResponsiveDevice()

	const formFields = [
		{
			type: 'group',
			name: 'authname',
			children: [
				{
					type: 'text',
					name: 'firstname',
					label: translate('label_firstname'),
					required: true,
					placeholder: translate('placeholder_firstname'),
				},
				{
					type: 'text',
					name: 'lastname',
					label: translate('label_lastname'),
					required: true,
					placeholder: translate('placeholder_lastname'),
				},
			],
		},
		// {
		// 	type: 'text',
		// 	name: 'fullName',
		// 	label: translate('label_fullname'),
		// 	required: true,
		// 	placeholder: translate('placeholder_fullname'),
		// },
		{
			type: 'text',
			name: 'email',
			label: translate('label_email'),
			required: true,
			placeholder: translate('placeholder_email'),
		},
		{
			type: 'text',
			name: 'username',
			label: translate('label_username'),
			required: true,
			placeholder: translate('placeholder_username'),
		},
		{
			type: 'password',
			name: 'password',
			label: translate('label_password'),
			required: true,
			placeholder: translate('placeholder_username'),
		},
		{
			type: 'number',
			name: 'phoneNumber',
			label: translate('label_phone_number'),
			placeholder: translate('placeholder_phone_number'),
		},
	]

	const onSubmit: SubmitHandler<FormFields> = (formData) => {
		handleRegister(formData as IRegisterRequestDto)
	}

	useEffect(() => {
		if (registerData?.statusCode === 200) {
			setUser({ email: methods.getValues('email'), userId: registerData?.data?.userId })
			handleUpdateRegisterState('VERIFY_OTP')
			methods.reset()
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
						{translate('meta_title')}
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
						{registerData?.statusCode === 200
							? ''
							: isSuccess && (
									<p className="text-sm text-red-400">
										{translateValidation(
											`Validation.Auth.SignUp.APIResponse.${registerData?.message}` as any
										)}
									</p>
								)}
						{/* {registerData?.statusCode !== 200 && <p className="text-red-400">{registerData?.message}</p>} */}
						<ButtonComponent disabled={isPending} type="submit" className="e-primary mt-4 w-full">
							{translate('button_sign_up')}
						</ButtonComponent>
					</div>

					<div>
						{translate('already_have_account')}?{' '}
						<Link
							className="w-full justify-start text-sm font-semibold text-[var(--color-text-link)]"
							href={APP_ROUTER.paths.center.signIn.path}
						>
							{translate('sign_in_link')}{' '}
						</Link>
					</div>
				</section>
			</form>
		</FormProvider>
	)
}

export default SignUpForm
