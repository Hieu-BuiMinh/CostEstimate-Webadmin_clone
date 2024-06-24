import React from 'react'

export default function UserInforBadge({ innerText, icon }: { innerText: string; icon: string }) {
	return (
		<div className="user-infor-badge flex items-center gap-2">
			<span className="material-symbols-outlined" style={{ fontSize: 22 }}>
				{icon}
			</span>
			<span className="truncate">{innerText}</span>
		</div>
	)
}
