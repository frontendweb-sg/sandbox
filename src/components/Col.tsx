import classNames from 'classnames';

export type ColProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
	isFull?: boolean;
};

const Col = ({
	children,
	xs,
	sm,
	md,
	lg,
	xl,
	isFull,
	className,
	...rest
}: ColProps) => {
	const classes = classNames({
		[`col-xs-${xs}`]: xs !== 0,
		[`col-sm-${sm}`]: sm !== 0,
		[`col-md-${md}`]: md !== 0,
		[`col-lg-${lg}`]: lg !== 0,
		[`col-xl-${xl}`]: xl !== 0,
		col: xs !== 0 || sm !== 0 || md !== 0 || lg !== 0 || xl !== 0,
	});
	return (
		<div className={classes} {...rest}>
			{children}
		</div>
	);
};

export default Col;
