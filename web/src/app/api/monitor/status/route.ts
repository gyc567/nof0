import { NextRequest, NextResponse } from 'next/server'

// 模拟监控状态数据
// 在实际部署中，这些数据应该从数据库或外部服务获取
let mockStatus = {
  running: true,
  lastCheck: new Date().toISOString(),
  symbols: ['BTCUSDT', 'ETHUSDT'],
  totalChecks: 0,
  alerts: 0,
  errors: 0,
}

export async function GET(request: NextRequest) {
  try {
    const MONITOR_URL = process.env.BINANCE_MONITOR_URL || 'http://localhost:8000'
    const MONITOR_API_KEY = process.env.BINANCE_MONITOR_API_KEY

    // 尝试从 binance-monitor 获取真实状态
    try {
      const response = await fetch(`${MONITOR_URL}/api/status`, {
        headers: {
          'Authorization': MONITOR_API_KEY ? `Bearer ${MONITOR_API_KEY}` : '',
        },
        // 5 秒超时
        signal: AbortSignal.timeout(5000),
      })

      if (response.ok) {
        const realStatus = await response.json()
        return NextResponse.json({
          success: true,
          data: realStatus,
          source: 'monitor-service',
          timestamp: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.log('Monitor service not available, using mock data:', error)
    }

    // 如果无法连接到 monitor 服务，返回模拟数据
    mockStatus.totalChecks++

    return NextResponse.json({
      success: true,
      data: mockStatus,
      source: 'mock',
      note: 'Monitor service is not available, showing mock data',
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Get status error:', error)

    return NextResponse.json({
      success: false,
      error: '获取状态失败',
      message: error instanceof Error ? error.message : '未知错误',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}
