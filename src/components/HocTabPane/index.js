
import React, { Component } from 'react';

/**
 * @class Hoc
 * @param {Object} params  如{ namespace: ['queryStaff'], reducers: 'save' } namespace为需要清除的models namespace key为reducers里的能用save方法默认为save
 * @param {Component} ReactComponent - 组件
 */


const HocTabPane = (params = {}) => WrappedComponent => class extends Component {
    componentDidMount() {
    }

    shouldComponentUpdate(nextProps) {
    }


    componentWillUnmount () {
      this.resetModels()
    }

    /**
     * 清除models数据
     */
    resetModels = () => {
      const { namespace = [], reducers = 'save' } = params
      if (namespace.length) {
        const { dispatch } = window.g_app._store
        namespace.forEach(item => {
          dispatch({
            type: `${item}/${reducers}`,
            payload: this[item],
          })
        })
      }
    }

    /**
     * 创建一个刷新方法，调用super.componentDidMount()
     * 先改成直接注销组件方式吧，调用componentDidMountb子组件状态保存问题不好处理 条件处理问题如搜索 翻页 带条件查询问题
     */
    handleTabRefresh = () => {
      this.resetModels()
      this.setState({
        tabRefres: true,
      }, () => {
        this.setState({
          tabRefres: false,
        })
      })
    }

    render() {
      const { getRef } = this.props || {}
      const { tabRefres } = this.state || {}
      console.log('props+++++', this.props)
      return tabRefres ? null : (
        <WrappedComponent
          {...this.props}
          handleTabRefresh={this.handleTabRefresh}
         ref={getRef}
        />
      )
    }
  }


export default HocTabPane
