const Notification = ({ message }) => {
	return message.text && (
		<div className={`notification ${message.type === 'success' ? 'success_notification' : 'error_notification'}`}>
			{message.text}
		</div>
	)
}

export default Notification
