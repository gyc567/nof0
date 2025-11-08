import { NextRequest, NextResponse } from 'next/server'

// 模拟告警数据
// 在实际部署中，这些数据应该从数据库或外部服务获取
let mockAlerts: any[] = []

export async function GET(request: NextRequest) {
  try {
    const MONITOR_URL = process.env.BINANCE_MONITOR_URL || 'http://localhost:8000'
    const MONITOR_API_KEY = process.env.BINANCE_MONITOR_API_KEY

    // 解析查询参数
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol')
    const limit = parseInt(searchParams.get('limit') || '50')

    // 尝试从 binance-monitor 获取真实告警
    try {
      const url = new URL(`${MONITOR_URL}/api/alerts`)
      if (symbol) url.searchParams.set('symbol', symbol)
      url.searchParams.set('limit', limit.toString())

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': MONITOR_API_KEY ? `Bearer ${MONITOR_API_KEY}` : '',
        },
        // 5 秒超时
        signal: AbortSignal.timeout(5000),
      })

      if (response.ok) {
        const realAlerts = await response.json()
        return NextResponse.json({
          success: true,
          data: realAlerts,
          count: realAlerts.length,
          source: 'monitor-service',
          timestamp: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.log('Monitor service not available, using mock data:', error)
    }

    // 如果无法连接到 monitor 服务，返回模拟数据
    return NextResponse.json({
      success: true,
      data: mockAlerts,
      count: mockAlerts.length,
      source: 'mock',
      note: 'Monitor service is not available, showing mock data',
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Get alerts error:', error)

    return NextResponse.json({
      success: false,
      error: '获取告警失败',
      message: error instanceof Error ? error.message : '未知错误',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}

// POST 方法用于添加测试告警（开发用）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { symbol = 'BTCUSDT', amount = 2000000, direction = '买入' } = body

    // 添加模拟告警
    const alert = {
      id: Date.now(),
      symbol,
      amount,
      direction,
      timestamp: new Date().toISOString(),
      message: `大额${direction}: ${symbol} $${amount.toLocaleString()}`,
    }

    mockAlerts.unshift(alert)

    // 只保留最近 100 条告警
    if (mockAlerts.length > 100) {
      mockAlerts = mockAlerts.slice(0, 100)
    }

    return NextResponse.json({
      success: true,
      data: alert,
      message: '测试告警已添加',
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Add test alert error:', error)

    return NextResponse.json({
      success: false,
      error: '添加告警失败',
      message: error instanceof Error ? error.message : '未知错误',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}
