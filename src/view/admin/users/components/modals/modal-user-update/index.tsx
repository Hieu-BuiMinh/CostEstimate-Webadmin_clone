'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { useTranslations } from 'next-intl'
import React from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { RHFDynamicInput } from '@/components/inputs'
import { useGetUserById } from '@/view/admin/users/hooks/useGetUserById'
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
	const { data: userDataDetail } = useGetUserById(userData?.id || '')

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
			type: 'text',
			name: 'email',
			label: translate('label_email'),
			required: false,
			placeholder: translate('placeholder_email'),
			defaultValue: userData?.email || '',
		},
		{
			type: 'text',
			name: 'username',
			label: translate('label_username'),
			required: false,
			placeholder: translate('placeholder_username'),
			defaultValue: userData?.username || '',
		},
		{
			type: 'radio',
			name: 'isReverse',
			label: translate('label_fullname_required'),
			required: true,
			defaultValue: 'isReverse_01',
			radioOptions: [
				{ value: true, label: `${userData?.firstName} ${userData?.lastName}`, id: 'isReverse_01' },
				{ value: false, label: `${userData?.lastName} ${userData?.firstName}`, id: 'isReverse_02' },
			],
		},
	]

	const onSubmit: SubmitHandler<UpdateFormFields> = (_formData) => {
		const isReverse = _formData.isReverse === 'true'
		const id = userData?.id || ''
		const data = {
			..._formData,
			isReverse,
			id,
		}
		handleUpdate(data as IUpdateUserInforRequestDto)
		// handleInsertUserRole({
		// 	userId: id,
		// 	roleIds: roleIdsRef.current,
		// })
	}

	return (
		<div className="flex flex-col gap-8 p-3">
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className="flex flex-col gap-6 bg-[var(--color-login-form-bg)] md:w-[600px]"
				>
					<section className="flex flex-col gap-5">
						<div className="flex w-full items-center justify-between  gap-3">
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
						<div className="mb-4 flex w-full items-center gap-3">
							<span className="e-avatar e-avatar-circle shrink-0">
								{userDataDetail?.firstName.substring(0, 2).toUpperCase()}
							</span>

							<div className="min-w-0">
								<p className="text-xl font-bold">{userDataDetail?.fullName}</p>
							</div>
						</div>
						<div className="grid w-full gap-4 md:grid-cols-2">
							{formFields.map((field) => {
								return (
									<div
										key={field.name}
										className={`flex w-full flex-col gap-1 ${field.type === 'radio' && 'col-start-1 col-end-3'}`}
									>
										<RHFDynamicInput
											name={field.name}
											type={field.type as 'text' | 'checkbox' | 'radio'}
											label={field?.label}
											placeholder={field?.placeholder}
											required={field?.required}
											defaultValue={field?.defaultValue}
											radioOptions={field?.radioOptions}
											readonly={(field.name === 'email' || field.name === 'username') && true}
										/>
									</div>
								)
							})}
						</div>

						{/* <section className="flex flex-col gap-3">
								<p className='text-sm'>{translate('label_assign_role')}</p>
								<div className="flex w-full flex-wrap gap-3">
									{roleData?.items.map((role) => {
										return (
											<CheckBoxComponent
												key={role?.id}
												name={role?.name}
												type="checkbox"
												label={role?.name}
												change={(e: any) => {
													if (e?.checked) {
														roleIdsRef.current = [...roleIdsRef.current, role.id]
													} else {
														roleIdsRef.current = roleIdsRef.current.filter(
															(item) => item !== role.id
														)
													}
												}}
											/>
										)
									})}
								</div>
							</section> */}

						<div className="flex w-full flex-col gap-1">
							<ButtonComponent type="submit" className="e-primary w-full">
								{translate('button_update')}
							</ButtonComponent>
						</div>
					</section>
				</form>
			</FormProvider>
		</div>
	)
}

export default ModalUserUpdateContent
