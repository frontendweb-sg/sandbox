import classNames from 'classnames';

export type RowProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};

const Row = ({ children, className, ...rest }: RowProps) => {
	const classes = classNames('row', className);
	return (
		<div className={classes} {...rest}>
			{children}
		</div>
	);
};

export default Row;
