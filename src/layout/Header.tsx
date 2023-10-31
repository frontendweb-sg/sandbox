import Container from '../components/Container';

type HeaderProps = {
	code?: string;
	ext?: string;
	onOpen?: () => void;
};
const Header = ({ onOpen }: HeaderProps) => {
	return (
		<header className="navbar navbar-expand-lg navbar-dark bg-dark">
			<Container>
				<a className="navbar-brand" href="#">
					Code
				</a>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<button className="nav-link" onClick={onOpen}>
								Open
							</button>
						</li>
						<li className="nav-item">
							<button className="nav-link" onClick={onOpen}>
								Edit
							</button>
						</li>
						<li className="nav-item">
							<button className="nav-link" onClick={onOpen}>
								Save
							</button>
						</li>
					</ul>
				</div>
			</Container>
		</header>
	);
};

export default Header;
