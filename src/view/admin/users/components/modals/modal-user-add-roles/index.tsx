'use client'

import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'

import { useGetAllRoles } from '@/view/admin/roles/hooks/useGetAllRoles'
import { useGetUserById } from '@/view/admin/users/hooks/useGetUserById'
import type { IInsertUserRoleRequestDto, IUsers } from '@/view/admin/users/types'

import { useInsertUserRole } from '../../../hooks/useInsertUserRole'

interface IModalConfirmContent {
	onClose: () => void
	userData: IUsers | undefined
}

function ModalUserAddRolesContent({ onClose, userData }: IModalConfirmContent) {
	const translate = useTranslations('Page.User.AssignRole')
	const translateButton = useTranslations('Common.Button')
	const { data: userDataDetail } = useGetUserById(userData?.id || '')
	const { data: roleData } = useGetAllRoles()
	const { mutate: handleInsertUserRole, isSuccess: isUpdateRoleSuccess } = useInsertUserRole()
	const roleIdsRef = useRef<string[]>([])
	const [formData, setFormData] = useState<IInsertUserRoleRequestDto>({
		userId: userData?.id || '',
		roleIds: roleIdsRef.current,
	})
	const userRoles = userDataDetail?.userRoles as string
	useEffect(() => {
		if (userDataDetail?.userRoles) {
			roleIdsRef.current = userRoles.split(',')
			setFormData((prevFormData) => ({
				...prevFormData,
				roleIds: roleIdsRef.current,
			}))
		}
	}, [userDataDetail, userRoles])

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		const updatedFormData = {
			userId: formData.userId,
			roleIds: roleIdsRef.current,
		}
		handleInsertUserRole(updatedFormData)
	}
	if (isUpdateRoleSuccess) {
		onClose()
	}
	return (
		<div className="flex flex-col gap-8 p-2">
			<form onSubmit={onSubmit} className="flex flex-col gap-6 bg-[var(--color-login-form-bg)] md:w-[400px]">
				<section className="flex flex-col gap-5">
					<div className="flex w-full items-center justify-between  gap-3">
						<div className="text-xl font-semibold">{translate('title')}</div>
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

					<section className="flex flex-col gap-3">
						<p className="text-sm">{translate('title')}</p>
						<div className="flex w-full flex-col gap-3">
							{roleData?.data?.map((role) => {
								const isChecked = roleIdsRef.current.includes(role.id)
								return (
									<CheckBoxComponent
										key={role?.id}
										name={role?.name}
										type="checkbox"
										label={role?.name}
										checked={isChecked}
										change={(e: any) => {
											if (e?.checked) {
												roleIdsRef.current = [...roleIdsRef.current, role.id]
											} else {
												roleIdsRef.current = roleIdsRef.current.filter(
													(item) => item !== role.id
												)
											}
											setFormData((prevFormData) => ({
												...prevFormData,
												roleIds: roleIdsRef.current,
											}))
										}}
									/>
								)
							})}
						</div>
					</section>

					<div className="flex w-full flex-col gap-1">
						<ButtonComponent type="submit" className="e-primary w-full">
							{translateButton('update')}
						</ButtonComponent>
					</div>
				</section>
			</form>
		</div>
	)
}

export default ModalUserAddRolesContent
