'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { APP_ROUTER } from '@/common/config'
import { RHFDynamicInput } from '@/components/inputs'
import { ResetPasswordFormValidation } from '@/view/auth/validations'

import useAuthResetPassword from '../../hooks/userAuthResetPassword'

type ResetPasswordFormFields = z.infer<typeof ResetPasswordFormValidation>

function ResetPasswordForm() {
	const buttontranslate = useTranslations('Common.Button')
	const translate = useTranslations('Page.Auth.ResetPassword')
	const router = useRouter()
	const { mutate: handleResetPassword, isSuccess, isPending, data: resetPasswordData } = useAuthResetPassword()

	// const {
	// 	handleSubmit,
	// 	reset,
	// 	register,
	// 	formState: { errors },
	// } = useForm<ResetPasswordFormFields>({ resolver: zodResolver(ResetPasswordFormValidation) })
	const methods = useForm<ResetPasswordFormFields>({ resolver: zodResolver(ResetPasswordFormValidation) })

	const onSubmit: SubmitHandler<ResetPasswordFormFields> = (formData: any) => {
		handleResetPassword(formData)
		// console.log(formData);
	}

	const formFields = [
		{ type: 'text', name: 'curPassword', placeholder: translate('place_holder_cur_pass') },
		{ type: 'text', name: 'password', placeholder: translate('place_holder_new_pass') },
		{ type: 'text', name: 'confirmPassword', placeholder: translate('place_holder_confirm_pass'), label: '' },
	]

	useEffect(() => {
		if (resetPasswordData?.statusCode === 200) {
			methods.reset()
			router.push(APP_ROUTER.paths.center.signIn.path)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess])

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className="my-form flex max-w-[385px] flex-col gap-6 rounded border bg-[var(--color-login-form-bg)] p-3"
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
						{translate('meta_title')}
					</p>
				</section>

				<section className="login-section gap-4">
					{formFields.map((field) => {
						return (
							<div key={field.name} className="flex w-full flex-col gap-2">
								<RHFDynamicInput
									name={field.name}
									type={field.type as 'text' | 'checkbox' | 'radio'}
									placeholder={field?.placeholder}
									label={field?.label}
								/>
							</div>
						)
					})}
					<ButtonComponent disabled={isPending} type="submit" className="e-primary w-full">
						{buttontranslate('submit')}
					</ButtonComponent>
				</section>
			</form>
		</FormProvider>
	)
}

export default ResetPasswordForm
