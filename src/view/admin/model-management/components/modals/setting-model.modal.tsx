import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { useState } from 'react'

import { InnerModal } from '@/components/modals'
import ParameterSettingModal from '@/view/admin/model-management/components/modals/parameter-setting.modal copy'

function SettingModelModal() {
	const [openSecond, setOpenSecond] = useState(false)

	const handleOpenInnerModal = () => {
		setOpenSecond(true)
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<p className="text-sm">Select model: </p>
				<DropDownListComponent
					className="bg-white"
					id="ddlelement"
					placeholder="Select model:"
					dataSource={['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis']}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-sm">Select model: </p>
				<DropDownListComponent
					id="ddlelement"
					placeholder="Select model:"
					dataSource={['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis']}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-sm">Select model: </p>
				<div className="flex gap-3">
					<DropDownListComponent
						id="ddlelement"
						placeholder="Select model:"
						className="flex-1"
						dataSource={['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis']}
					/>

					<button
						onClick={handleOpenInnerModal}
						type="button"
						className="material-symbols-outlined w-8 rounded border"
					>
						more_horiz
					</button>
				</div>
			</div>

			<InnerModal
				close={() => {
					setOpenSecond(false)
				}}
				isOpen={openSecond}
			>
				<ParameterSettingModal />
			</InnerModal>
		</div>
	)
}

export default SettingModelModal
