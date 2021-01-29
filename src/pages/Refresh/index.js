import react, { useEffect } from 'react'
import HocTabPane from '@/components/HocTabPane'
import { Button } from 'antd'

const Explain = (props) => {
  console.log('props+++++', props)
  useEffect(() => {
    console.log('this+++++', this)
  }, [])

  const shuaxin = () => {
    console.log('1411++++')
    props.handleTabRefresh()
  }

  return (
    <div>
      <Button onClick={shuaxin}>刷新</Button>
      <div>
        <h2>刷新状态</h2>
      </div>
    </div>
  )
}

export default HocTabPane()(Explain)