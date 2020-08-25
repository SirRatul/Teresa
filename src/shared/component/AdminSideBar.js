import React from 'react';
import Avatar from '../img/avatar.png'
import './AdminSideBar.css'

const AdminSideBar = () => {
    return <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src={Avatar} className="img-circle elevation-2 mt-3" alt="User Image" />
        </div>
        <div className="info">
          <p className="h4 d-block text-white">Ayon Mahmud</p>
          <p className='text-white'><span><i class="h6 text-success fas fa-circle"></i></span>  Online</p>
        </div>
      </div>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
          <li className="nav-item menu-open">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-th" />
              <p>
                Dash Board
              </p>
            </a>
          </li>
          <li className={"nav-item "+(window.location.pathname === '/admin-invoice-list' ? "active": "")}>
            <a href="pages/widgets.html" className="nav-link">
              <i className="nav-icon fas fa-th" />
              <p>
                Create Invoice
              </p>
            </a>
          </li>
          <li className="nav-item">
            <a href="pages/widgets.html" className="nav-link">
              <i className="nav-icon fas fa-th" />
              <p>
                Order Time Line
              </p>
            </a>
          </li>
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>;
};

export default AdminSideBar;