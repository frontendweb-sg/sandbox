export type ModalProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	open?: boolean;
	onClose?: () => void;
	label?: string;
};
const Modal = ({ open, label, children, onClose, ...rest }: ModalProps) => {
	if (!open) return;
	return (
		<div className="modal" tabIndex={-1} role="dialog" {...rest}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{label}</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
							onClick={onClose}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
