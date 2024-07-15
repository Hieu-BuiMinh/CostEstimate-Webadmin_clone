'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import clsx from 'clsx'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { RHFDynamicInput } from '@/components/inputs'
import { useResponsiveDevice } from '@/hooks/custom-hooks/useMediaquery'
import { ForgotpasswordFormValidation } from '@/view/auth/validations'

type LoginFormFields = z.infer<typeof ForgotpasswordFormValidation>

function ForgotpasswordForm() {
	const translate = useTranslations('Page.Auth.Forgotpassword')

	const methods = useForm<LoginFormFields>({ resolver: zodResolver(ForgotpasswordFormValidation) })

	const device = useResponsiveDevice()

	const onSubmit: SubmitHandler<LoginFormFields> = (formData) => {
		console.log({ ...formData, callbackUrl: `${window.location.href}/reset?email=${formData.email}` })
	}

	const formFields = [
		{
			type: 'text',
			name: 'email',
			label: translate('email_label'),
			placeholder: translate('email_placeholder'),
			required: true,
		},
	]

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
						{translate('meta_title')}
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

					<div className="flex w-full flex-col gap-1">
						{/* {loginData?.statusCode === 200
							? ''
							: isSuccess && (
									<p className="text-sm text-red-400">
										{translateValidation(
											`Validation.Auth.SignIn.APIResponse.${loginData?.message}` as any
										)}
									</p>
								)} */}
						<ButtonComponent type="submit" className="e-primary w-full">
							{translate('button_submit')}
						</ButtonComponent>
					</div>
				</section>
			</form>
		</FormProvider>
	)
}

export default ForgotpasswordForm
