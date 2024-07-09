'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { APP_ROUTER } from '@/common/config'
import { RHFDynamicInput } from '@/components/inputs'
import { useResponsiveDevice } from '@/hooks/custom-hooks/useMediaquery'
import { useAuthLogin } from '@/view/auth/hooks'
import { type ILoginRequestDto } from '@/view/auth/types'
import { LoginFormValidation } from '@/view/auth/validations'

type LoginFormFields = z.infer<typeof LoginFormValidation>

function AuthLoginForm() {
	const router = useRouter()
	const translate = useTranslations('Page.Auth.SignIn')
	const translateValidation = useTranslations()

	const { mutate: handleLogin, isSuccess, isPending, data: loginData } = useAuthLogin()

	const methods = useForm<LoginFormFields>({ resolver: zodResolver(LoginFormValidation) })

	const device = useResponsiveDevice()

	const onSubmit: SubmitHandler<LoginFormFields> = (formData) => {
		handleLogin(formData as unknown as ILoginRequestDto)
	}

	const formFields = [
		{
			type: 'text',
			name: 'usernameOrEmail',
			label: translate('label_username_or_email'),
			required: true,
			placeholder: translate('placeholder_username_or_email'),
		},
		{
			type: 'password',
			name: 'password',
			label: translate('label_password'),
			required: true,
			placeholder: translate('placeholder_password'),
		},
		{ type: 'checkbox', name: 'remember', label: translate('remember_password') },
	]

	const handleGGLoginBtnClick = () => {
		signIn('google', { callbackUrl: APP_ROUTER.paths.center.signinWithGoogle.path, redirect: false })
	}
	const handleAutoDeskLoginBtnClick = () => {
		router.push(APP_ROUTER.paths.center.signinWithAutodesk.path)
	}

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) {
			methods.reset()
			router.push(APP_ROUTER.paths.admin.dashboard.path)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess])

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className={clsx(
					{
						'flex w-[385px] flex-col gap-6 rounded border bg-[var(--color-template-bg)] p-3': true,
					},
					{ 'w-screen h-screen max-w-none': device === 'mobile' }
				)}
			>
				<section className="login-section h-[93px] !py-0">
					<Image
						src="/assets/auth/imgs/auth_form_header_img.png"
						alt="auth_form_header_img"
						width={40}
						height={10}
						className="h-auto"
					/>
					<p className="text-center text-2xl font-medium uppercase text-[var(--color-surface-999)]">
						{/* Sign in to your account */}
						{translate('meta_description')}
					</p>
				</section>

				<section className="login-section gap-4">
					{formFields.map((field) => {
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
					<Link
						className="justify-start text-sm font-semibold text-[var(--color-text-link)]"
						href={APP_ROUTER.paths.center.signUp.path}
					>
						{translate('have_no_account')}
					</Link>

					<div className="flex w-full flex-col gap-1">
						{loginData?.statusCode === 200
							? ''
							: isSuccess && (
									<p className="text-sm text-red-400">
										{translateValidation(
											`Validation.Auth.SignIn.APIResponse.${loginData?.message}` as any
										)}
									</p>
								)}
						<ButtonComponent disabled={isPending} type="submit" className="e-primary w-full">
							{translate('button_sign_in')}
						</ButtonComponent>
					</div>

					<Link
						className="w-full text-sm font-semibold text-[var(--color-text-link)]"
						href={APP_ROUTER.paths.center.forgotPassword.path}
					>
						{translate('forgot_password')}
					</Link>
				</section>

				<section className="login-section gap-2 border-t">
					<span className="text-center">Or continue with</span>
					<div className="flex w-full items-center justify-center gap-3">
						<ButtonComponent
							onClick={handleGGLoginBtnClick}
							type="button"
							className="e-normal h-[33px] w-[145px]"
						>
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
						<ButtonComponent
							onClick={handleAutoDeskLoginBtnClick}
							type="button"
							className="e-normal h-[33px] w-[145px]"
						>
							<div className="flex items-center gap-3">
								<Image
									src="/assets/auth/imgs/autodesk_icon.svg"
									alt="auth_form_header_img"
									width={20}
									height={20}
									className="h-auto"
								/>
								<span>Autodesk</span>
							</div>
						</ButtonComponent>
					</div>
				</section>
			</form>
		</FormProvider>
	)
}

export default AuthLoginForm
