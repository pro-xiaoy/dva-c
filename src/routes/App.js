import React, { useState } from "react";
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { withRouter } from 'dva/router';
import "./App.css";
import D1 from './d1'
import D2 from './d2'
const { Header, Content, Footer, Sider } = Layout;

const routerList = [
  {
    name: '说明',
    path: '/d1'
  },
  {
    name: '表格',
    path: '/d2', 
  },
  {
    name: '刷新dom',
    path: '/refresh'
  }
]

function AppPage(props) {
  const { history } = props


  console.log('props++++++++', props)

  const [collapsed, setCollapsed] = useState(false)
  
  const menuClick = (item) => {
    console.log('item+++++', item, props)
    history.push(item.path)
  }
  
  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: 0, height: 54 }}>header</Header>
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={() => { setCollapsed(!collapsed) }}>
            <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
              {routerList.map(((item, index) => (
                <Menu.Item key={index} onClick={() => {menuClick(item)}}>
                  <span>{item.name}</span>
                </Menu.Item>
              )))}
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
              {props.children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}


export default withRouter(connect()(AppPage));
