'use client'

import { useEffect, useState } from 'react'

interface YieldData {
  date: string
  yield: number
}

export default function TreasuryYieldData() {
  const [data, setData] = useState<YieldData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 获取当前日期，格式为 YYYY-MM-DD，时区为中国
    const currentDate = new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Shanghai'
    }).format(new Date()).replace(/\//g, '-');

    fetch('https://spider5-13-114035-5-1304011471.sh.run.tcloudbase.com/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('网络响应不正常')
        }
        return response.json()
      })
      .then(rawData => {
        console.log('Raw Data:', rawData); // 添加调试信息
        if (typeof rawData === 'object' && rawData !== null && 'data' in rawData) {
          const yieldValue = parseFloat(rawData.data.replace('%', '')); // 移除百分号并转换为数字
          setData({
            date: currentDate,
            yield: yieldValue
          })
        } else {
          throw new Error('数据格式不正确')
        }
      })
      .catch(error => {
        console.error('Fetch Error:', error); // 添加调试信息
        setError(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <div>加载中...</div>
  }

  if (error) {
    return <div>错误: {error}</div>
  }

  return (
    <div>
      <h2>日期: {data?.date}</h2>
      <p>收益率: {data?.yield}%</p> {/* 在这里手动添加百分号 */}
    </div>
  )
}

