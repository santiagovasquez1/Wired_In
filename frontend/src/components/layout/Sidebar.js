import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUsers,
	faTag,
	faWarehouse,
	faLaptop,
	faUserTag,
	faBacon,
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
	return (
		<div className="sidebar">
			<div className="logo-content">
				<div className="logo">
					<FontAwesomeIcon icon={faBacon} />
					<div className="logo_name">Carnicería</div>
				</div>
			</div>
			<ul className="nav_list">
				<li>
					<Link to={'/dashboard'} className="link">
						<FontAwesomeIcon icon={faLaptop} className="fontAwesome-icon" />
						<span className="links_name">Dashboard</span>
					</Link>
				</li>
				<li>
					<Link to={'/dashboard'} className="link">
						<FontAwesomeIcon icon={faTag} className="fontAwesome-icon" />
						<span className="links_name">Ventas</span>
					</Link>
				</li>
				<li>
					<Link to={'/dashboard'} className="link">
						<FontAwesomeIcon icon={faWarehouse} className="fontAwesome-icon" />
						<span className="links_name">Productos</span>
					</Link>
				</li>
				<li>
					<Link to={'/dashboard'} className="link">
						<FontAwesomeIcon icon={faUserTag} className="fontAwesome-icon" />
						<span className="links_name">Vendedores</span>
					</Link>
				</li>
				<li>
					<Link to={'/dashboard'} className="link">
						<FontAwesomeIcon icon={faUsers} className="fontAwesome-icon" />
						<span className="links_name">Usuarios</span>
					</Link>
				</li>
			</ul>
		</div>
	);
}

export { Sidebar };
