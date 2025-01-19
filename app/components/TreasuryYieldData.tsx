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
    const currentDate = new Date().toISOString().split('T')[0] // 获取当前日期，格式为 YYYY-MM-DD

    fetch('https://spider5-13-114035-5-1304011471.sh.run.tcloudbase.com/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('网络响应不正常')
        }
        return response.json()
      })
      .then(rawData => {
        if (typeof rawData === 'object' && rawData !== null && 'data' in rawData) {
          setData({
            date: currentDate,
            yield: parseFloat(rawData.data as string)
          })
        } else {
          throw new Error('意外的数据格式')
        }
        setIsLoading(false)
      })
      .catch(error => {
        setError('获取数据失败: ' + error.message)
        setIsLoading(false)
        console.error('获取数据时出错:', error)
      })
  }, [])

  if (isLoading) return <div className="text-center">加载中...</div>
  if (error) return <div className="text-center text-red-500">错误: {error}</div>
  if (!data) return <div className="text-center">没有可用数据</div>

  return (
    <div className="w-full max-w-md">
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          <tr>
            <th className="border border-gray-300 p-2 text-center bg-gray-100">日期</th>
            <th className="border border-gray-300 p-2 text-center bg-gray-100">收益率 (%)</th>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 text-center">{data.date}</td>
            <td className="border border-gray-300 p-2 text-center">{data.yield.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

