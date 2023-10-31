import Header from './Header';
export type LayoutProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="bg-dark">
			<Header />
			{children}
		</div>
	);
};
export default Layout;
