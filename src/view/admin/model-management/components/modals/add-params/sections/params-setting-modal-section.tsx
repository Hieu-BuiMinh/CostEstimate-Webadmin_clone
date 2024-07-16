import { ListBoxComponent } from '@syncfusion/ej2-react-dropdowns'
import clsx from 'clsx'
import { memo, useRef, useState } from 'react'

import { InnerModal } from '@/components/modals'
import { UpserModal } from '@/view/admin/model-management/components/modals/add-params/sub-modal'

interface IParamsSettingModalSection {
	dataSource: { text: string; id: string }[]
	title: string
	mutateUpsertCallback: () => void
	originDataSource?: any

	updateCurrentParam?: (_id: string) => void
}

function ParamsSettingModalSection({
	dataSource,
	title,
	mutateUpsertCallback,
	originDataSource,
	updateCurrentParam,
}: IParamsSettingModalSection) {
	const [currentId, setCurrentId] = useState<string>('')
	const [openSecond, setOpenSecond] = useState(false)

	const currentModal = useRef<React.ReactNode>(null)

	const handleOpenInnerModal = ({ type }: { type: 'ADD' | 'EDIT' | 'DELETE' | 'COPY' }) => {
		switch (type) {
			case 'ADD':
				currentModal.current = (
					<UpserModal
						type={type}
						close={() => {
							setOpenSecond(false)
						}}
						mutateUpserCallback={mutateUpsertCallback}
						originDataSource={originDataSource}
					/>
				)
				break
			case 'EDIT':
				currentModal.current = (
					<UpserModal
						type={type}
						close={() => {
							setOpenSecond(false)
						}}
						mutateUpserCallback={mutateUpsertCallback}
					/>
				)
				break
			case 'DELETE':
				currentModal.current = 'delete'
				break
			default:
				break
		}
		setOpenSecond(true)
	}

	return (
		<section className="col-span-1 flex flex-col gap-4">
			<div className="flex items-center justify-between gap-2">
				<span className="truncate">{title}</span>
				<div className="flex gap-1">
					<button
						// disabled={!currentId && !originDataSource}
						onClick={() => handleOpenInnerModal({ type: 'ADD' })}
						type="button"
						className={clsx({
							'material-symbols-outlined size-6 rounded border !text-sm': true,
							'cursor-pointer': currentId && originDataSource,
							// 'cursor-not-allowed': !currentId && !originDataSource,
						})}
					>
						add
					</button>
					<button
						type="button"
						onClick={() => handleOpenInnerModal({ type: 'EDIT' })}
						disabled={!currentId}
						className={clsx({
							'material-symbols-outlined size-6 rounded border !text-sm': true,
							'cursor-pointer': currentId,
							'cursor-not-allowed': !currentId,
						})}
					>
						edit
					</button>
					<button
						type="button"
						onClick={() => handleOpenInnerModal({ type: 'DELETE' })}
						disabled={!currentId}
						className={clsx({
							'material-symbols-outlined size-6 rounded border !text-sm': true,
							'cursor-pointer': currentId,
							'cursor-not-allowed': !currentId,
						})}
					>
						remove
					</button>
					<button
						type="button"
						disabled={!currentId}
						className={clsx({
							'material-symbols-outlined size-6 rounded border !text-sm': true,
							'cursor-pointer': currentId,
							'cursor-not-allowed': !currentId,
						})}
					>
						content_copy
					</button>
				</div>
			</div>

			<div className="h-[50vh] overflow-y-auto rounded-sm">
				<ListBoxComponent
					change={(e) => {
						setCurrentId(e.items[0].id)
						// eslint-disable-next-line @typescript-eslint/no-unused-expressions
						updateCurrentParam && updateCurrentParam(e.items[0].id)
					}}
					cssClass="h-full"
					dataSource={dataSource || []}
				/>
			</div>

			<InnerModal
				close={() => {
					setOpenSecond(false)
				}}
				isOpen={openSecond}
			>
				{currentModal.current}
			</InnerModal>
		</section>
	)
}

export default memo(ParamsSettingModalSection)
