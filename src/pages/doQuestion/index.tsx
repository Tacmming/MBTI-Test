import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { AtRadio } from 'taro-ui'
import './index.scss'
import Footer from '../../components/Footer'
import questions from '../../data/questions.json'
import Taro from '@tarojs/taro'


/**
 * 答题页面
 */
export default () => {
  // 当前题目序号（从1开始）
  const [current, setCurrent] = useState<number>(1);
  // 当前题目
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
  const questionOptions = currentQuestion.options.map(option => {
    return {
      label: `${option.key}. ${option.value}`, value: option.key
    }
  });
  // 当前答案 默认为空
  const [currentAnwser, setCurrentAnwser] = useState<string>();
  // 答案列表,记录历史选项
  const [answerList] = useState<string[]>([]);


  // 序号变化时切换当前题目和回答
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnwser(answerList[current - 1]);
  }, [current]);

  return (
    <View className='doQuestionPage'>
      {JSON.stringify(answerList)}
      <View className='at-article__h2 title'>
        {current}、{currentQuestion.title}
      </View>
      <View className='options-wrapper'>
        <AtRadio
          options={questionOptions} value={currentAnwser} onClick={(value) => {
            setCurrentAnwser(value);
            // 记录回答
            answerList[current - 1] = value;
          }}
        />
      </View>

      {current < questions.length && (
        <AtButton type='primary' circle className='controlBtn' disabled={!currentAnwser} onClick={() => setCurrent(current + 1)}>
          下一题
        </AtButton>
      )}

      {
        current == questions.length && (
          <AtButton type='primary' circle className='controlBtn'  disabled={!currentAnwser} onClick={() => {
            // 传递数据
            Taro.setStorageSync('answerList', answerList);
          //  跳转到结果页面
            Taro.navigateTo({
              url: '/pages/result/index',
            })
          }}>
            查看结果
          </AtButton>
        )}

      {
        current > 1 && (
          <AtButton circle className='controlBtn' onClick={() => setCurrent(current - 1)}>上一题</AtButton>
        )}
      <Footer></Footer>
    </View>
  )
}
