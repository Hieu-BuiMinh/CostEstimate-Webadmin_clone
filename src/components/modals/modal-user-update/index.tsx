'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { useTranslations } from 'next-intl'
import React from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { RHFDynamicInput } from '@/components/inputs'
import { useUpdateUserInfor } from '@/view/admin/users/hooks/useUpdateUserInfor'
import type { IUpdateUserInforRequestDto, IUsers } from '@/view/admin/users/types'
import { UpdateUserFormValidation } from '@/view/admin/users/validations'

interface IModalConfirmContent {
	onClose: () => void
	userData: IUsers | undefined
}
type UpdateFormFields = z.infer<typeof UpdateUserFormValidation>

function ModalUserUpdateContent({ onClose, userData }: IModalConfirmContent) {
	// const translate = useTranslations('U')
	const translate = useTranslations('Page.User.UpdateInsertUser')
	const methods = useForm<UpdateFormFields>({ resolver: zodResolver(UpdateUserFormValidation) })
	const { mutate: handleUpdate } = useUpdateUserInfor()

	const formFields = [
		{
			type: 'text',
			name: 'lastName',
			label: translate('label_lastname'),
			required: true,
			placeholder: translate('placeholder_lastname'),
			defaultValue: userData?.lastName || '',
		},
		{
			type: 'text',
			name: 'firstName',
			label: translate('label_firstname'),
			required: true,
			placeholder: translate('placeholder_firstname'),
			defaultValue: userData?.firstName || '',
		},
		{
			type: 'radio',
			name: 'isReverse',
			label: 'Chọn họ tên sau khi cập nhật',
			required: true,
			radioOptions: [
				{ value: false, label: 'Họ và tên', id: 'isReverse_02' },
				{ value: true, label: 'Tên và Họ', id: 'isReverse_01' },
			],
		},
	]

	const onSubmit: SubmitHandler<UpdateFormFields> = (_formData) => {
		const isReverse = _formData.isReverse === 'true'
		const id = userData?.id
		const data = {
			..._formData,
			isReverse,
			id,
		}
		handleUpdate(data as IUpdateUserInforRequestDto)
	}

	return (
		<div className="flex flex-col gap-5 text-[var(--color-surface-999)]">
			<div className="mt-5 flex flex-col gap-8">
				<div className="flex items-center justify-between gap-5">
					<div className="text-xl font-semibold">{translate('meta_title_update')}</div>
					<div className="text-xl font-semibold">
						<button
							type="button"
							className="material-symbols-outlined cursor-pointer"
							onClick={onClose}
							style={{ fontSize: 24 }}
						>
							close
						</button>
					</div>
				</div>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						className="flex min-w-[700px] flex-col gap-6 bg-[var(--color-login-form-bg)] p-3"
					>
						<section className="login-section gap-4">
							<div className="flex w-full items-center gap-3">
								<span className="e-avatar e-avatar-circle shrink-0">
									{userData?.username.substring(0, 2).toUpperCase()}
								</span>

								<div className="min-w-0">
									<p className="text-2xl font-bold">{userData?.fullName}</p>
								</div>
							</div>
							{formFields.map((field) => {
								return (
									<div key={field.name} className="flex w-full flex-col gap-1">
										<RHFDynamicInput
											name={field.name}
											type={field.type as 'text' | 'checkbox' | 'radio'}
											label={field?.label}
											placeholder={field?.placeholder}
											required={field?.required}
											defaultValue={field?.defaultValue}
											radioOptions={field?.radioOptions}
										/>
									</div>
								)
							})}

							<div className="flex w-full flex-col gap-1">
								<ButtonComponent type="submit" className="e-primary w-full">
									{translate('button_update')}
								</ButtonComponent>
							</div>
						</section>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}

export default ModalUserUpdateContent
