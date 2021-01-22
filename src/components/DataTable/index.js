import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom';
import { Table, Tooltip } from 'antd'
import { Resizable } from 'react-resizable'
import classNames from 'classnames'
import styles from './style.less'


/**
 * @class DataTable
 * @param {Bool} autoHeight - 默认为true false不自动适应高度
 * @param {Number} current - 当前的页数
 * @param {Number} total - 总条数
 * @param {Number} pageSize - 每页展示条数
 */


const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
}


class DataTable extends PureComponent {
  state = {
    columns: [],
    height: 0,
  }

  components = {
    header: {
      cell: ResizeableTitle,
    },
  }

  componentDidMount() {
    const { innerHeight } = window
    const { y } = this.tableWarp.getBoundingClientRect()
    const height = innerHeight - y
    this.setState({
      height,
    })
    this.addHeaderCell()
  }

  // 动态表头，自定义表头时重新新添加
  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps
    if(dataSource !== this.props.dataSource) {
      const table = ReactDOM.findDOMNode(this.table)
      const tableBody = table.querySelector('.ant-table-body')
      let scrollTopVal = tableBody.scrollTop
      function step() {
        scrollTopVal -= 60;
        tableBody.scrollTop = scrollTopVal;
        if (scrollTopVal > 0) { // 在两秒后停止动画
          window.requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    }
  }

  // 拖拽表头
  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: [...nextColumns] };
    });
  };

  // 添加可拖拽表头
  addHeaderCell = () => {
    const { columns } = this.props
    const newColumns = columns.map((col, index) => ({
      ...col,
      ...this.addToastBox(col),
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }))
    this.setState({
      columns: [...newColumns].map(v => ({ ...v, align: 'center' })),
    })
  }

  // 添加一个toast浮层
  addToastBox = col => {
    const { ellipsis, render } = col
    if (ellipsis) {
      return {
        render(text, record, index) {
          const dom = render ? render(text, record, index) : text
          return (
            <Tooltip
             placement="top"
             title={ () => <div>{dom}</div>}>
              <div className={styles.ellipsis}>
               {dom}
              </div>
            </Tooltip>
          )
        },
      }
    }
    return {}
  }

  setTableHeight = () => {
    const { autoHeight = true, fixedHeight, scroll = {} } = this.props
    const { height } = this.state
    if (autoHeight) {
      return Math.floor(height - 50)
    }
    if (fixedHeight) {
      return scroll.y || 'auto'
    }
    return 'auto'
  }


  render() {
    const {
      current,
      pageSize,
      total,
      hideOnSinglePage,
      style = {},
      pagination = {},
      autoHeight = true,
      fixedHeight,
      key = '',
      ...otherSetting
    } = this.props
    const { columns, height } = this.state
    const { scroll = {}, dataSource = [] } = otherSetting
    const len = dataSource && dataSource.length
    const defaultSrcollHeight = pagination ? 145 : 110
    const smallSrcollHeight = pagination ? 80 : 35
    const heightParams = !fixedHeight && autoHeight ? {
      scroll: {
        ...scroll,
        y: height - defaultSrcollHeight,
     },
    } : fixedHeight ? { scroll: { ...scroll, y: scroll.y - smallSrcollHeight } } : {}
    // console.log('heightParams++++', heightParams)
    return (
      <div
        style={{
          height: this.setTableHeight(),
          ...style,
        }}
        key={key}
        ref={e => { this.tableWarp = e }}
        className={autoHeight || fixedHeight ?
          classNames(styles.table,
             !pagination ? styles.noPagination : '',
             !autoHeight || len ? '' : styles.noData)
          : ''}>
        <Table
          ref={(ref)=>this.table=ref}
          rowKey="id"
          components={this.components}
          pagination={pagination ? {
            current,
            pageSize,
            total,
            showQuickJumper: true,
            showTotal: totals => `总计 ${totals} 条`,
            showSizeChanger: true,
            hideOnSinglePage,
            ...pagination,
          } : false}
          {...otherSetting}
          // {...heightParams}
          scroll={{
            y: 300
          }}
          columns={[...columns]}
        />
      </div>
    )
  }
}

export default DataTable
