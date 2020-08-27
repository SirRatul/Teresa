import React from 'react';
import Avatar from '../img/avatar.png'
import Logo from '../img/teresa.png'
import './AdminSideBar.css'

const AdminSideBar = () => {
    return <aside className="main-sidebar sidebar-dark-primary elevation-4 position-fixed">
     {/* Brand Logo */}
    <a href="index3.html" className="brand-link bg-white">
      <img src={Logo} alt="AdminLTE Logo" className='ml-0' style={{width: '60px', height: '50px'}} />
    </a>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src={Avatar} className="img-circle elevation-2 mt-3" alt="User" />
        </div>
        <div className="info">
          <p className="h4 d-block text-white">Ayon Mahmud</p>
          <div className="panel-body mt-n2">
            <div className="row">
              <span className="col-2"><span className="dot" /></span>
              <span className="col-6 ml-n3 text-light">Online</span>
            </div>
          </div>
          {/* <p className='text-white'><span><i class="h6 text-success fas fa-circle"></i></span>  Online</p> */}
        </div>
      </div>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
          <li className="nav-item nav-item-sidebar menu-open">
            <a href="#/" className="nav-link">
              <i className="nav-icon fas fa-th" />
              <p>
                Dash Board
              </p>
            </a>
          </li>
          <li className={"nav-item nav-item-sidebar "+(window.location.pathname === '/admin-invoice-list' ? "active": "")}>
            <a href="/admin-invoice-list" className="nav-link">
              <i className="nav-icon fa fa-plus-square" />
              <p>
                Create Invoice
              </p>
            </a>
          </li>
          <li className="nav-item nav-item-sidebar">
            <a href="#/" className="nav-link">
            <i className="nav-icon fas fa-box" />
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