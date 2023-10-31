import classNames from 'classnames';

export type ContainerProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
	isFull?: boolean;
};

const Container = ({
	children,
	xs,
	sm,
	md,
	lg,
	xl,
	isFull,
	className,
	...rest
}: ContainerProps) => {
	const classes = classNames(
		isFull ? 'container-fluid' : 'container',
		{
			[`col-xs-${xs}`]: xs !== 0,
			[`col-sm-${sm}`]: sm !== 0,
			[`col-md-${md}`]: md !== 0,
			[`col-lg-${lg}`]: lg !== 0,
			[`col-xl-${xl}`]: xl !== 0,
		},
		className,
	);
	return (
		<div className={classes} {...rest}>
			{children}
		</div>
	);
};

export default Container;
