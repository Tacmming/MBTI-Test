import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'
import Footer from '../../components/Footer'

import headerBg from "../../assets/headerBg.jpg"
import questionResults from "../../data/question_results.json"
import Taro from '@tarojs/taro'
import { getBestQuestionResult } from '../../utils/bizUtils'
import questions from "../../data/questions.json"

/**
 * 结果页
 */
export default () => {
  // 获取答案
  const answerList = Taro.getStorageSync('answerList');
  // 判断答案是否为空
  if (!answerList || answerList.length < 1) {
    Taro.showToast({
      title: '答案为空',
      icon: 'error',
      duration: 3000,
    })
  }
  // 获取测试结果
  const result = getBestQuestionResult(answerList, questions, questionResults);

  return (
    <View className='resultPage'>
      <View className='at-article__h1 title'>
        {result.resultName}
      </View>
      <View className='at-article__h2 subTitle'>
        {result.resultDesc}
      </View>
      <AtButton type='primary' circle className='enterBtn' onClick={() => {
        Taro.reLaunch({
          url: '/pages/index/index',
        })
      }}>返回主页</AtButton>
      <Image className='headerBg' src={headerBg}></Image>
      <Footer></Footer>
    </View>
  )
}
