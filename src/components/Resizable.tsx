import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
interface ResizableProps {
	direction: 'horizontal' | 'vertical';
	children?: React.ReactNode;
	className?: string;
}
const Resizable = ({ direction, children, className }: ResizableProps) => {
	let resizableProps: ResizableBoxProps;
	const [points, setPoints] = useState({
		x: window.innerWidth,
		y: window.innerHeight,
	});

	useEffect(() => {
		const handler = () => {
			setPoints((prev) => ({
				...prev,
				x: window.innerWidth,
				y: window.innerHeight,
			}));
		};
		window.addEventListener('resize', handler);
		return () => {
			window.removeEventListener('resize', handler);
		};
	}, []);

	if (direction === 'horizontal') {
		resizableProps = {
			className: 'resize-horizontal',
			maxConstraints: [points.x * 0.75, Infinity],
			minConstraints: [points.x * 0.2, Infinity],
			width: points.x * 0.75,
			height: Infinity,
			resizeHandles: ['e'],
		};
	} else {
		resizableProps = {
			maxConstraints: [Infinity, points.y * 0.9],
			minConstraints: [Infinity, 24],
			width: Infinity,
			height: 300,
			resizeHandles: ['s'],
		};
	}
	return (
		<ResizableBox className={className} {...resizableProps}>
			{children}
		</ResizableBox>
	);
};

export default Resizable;
