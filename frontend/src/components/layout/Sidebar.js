import React from 'react';
import { Link } from 'react-router-dom';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUsers,
	faTag,
	faWarehouse,
	faLaptop,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="logo-content">
				<Link to={'/'} className="logo">
					<div className="logo_name">Carnicería</div>
				</Link>
			</div>
			<ul className="nav_list">
				<li>
					<Link to={'/dashboard'} className="link">
						<FontAwesomeIcon icon={faLaptop} className="fontAwesome-icon" />
						<span className="links_name">Dashboard</span>
					</Link>
				</li>
				<li>
					<Link to={'/ventas'} className="link">
						<FontAwesomeIcon icon={faTag} className="fontAwesome-icon" />
						<span className="links_name">Ventas</span>
					</Link>
				</li>
				<li>
					<Link to={'/productos'} className="link">
						<FontAwesomeIcon icon={faWarehouse} className="fontAwesome-icon" />
						<span className="links_name">Productos</span>
					</Link>
				</li>
				<li>
					<Link to={'/usuarios'} className="link">
						<FontAwesomeIcon icon={faUsers} className="fontAwesome-icon" />
						<span className="links_name">Usuarios</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
