import TreasuryYieldData from './components/TreasuryYieldData'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-8 text-center">10年国债收益率数据</h1>
      <TreasuryYieldData />
    </main>
  )
}

