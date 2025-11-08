import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json()
    const { symbol = 'BTCUSDT', threshold = 2000000, timestamp } = body

    // 获取 binance-monitor 服务地址
    const MONITOR_URL = process.env.BINANCE_MONITOR_URL || 'http://localhost:8000'
    const MONITOR_API_KEY = process.env.BINANCE_MONITOR_API_KEY

    // 调用 binance-monitor 检查
    const response = await fetch(`${MONITOR_URL}/api/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MONITOR_API_KEY ? `Bearer ${MONITOR_API_KEY}` : '',
      },
      body: JSON.stringify({
        symbol,
        threshold,
        timestamp,
        source: 'vercel',
      }),
      // 10 秒超时
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      throw new Error(`Monitor service error: ${response.status}`)
    }

    const result = await response.json()

    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: '监控检查已触发',
      timestamp: new Date().toISOString(),
      symbol,
      threshold,
      result,
    })

  } catch (error) {
    console.error('Trigger monitor error:', error)

    return NextResponse.json({
      success: false,
      error: '触发监控检查失败',
      message: error instanceof Error ? error.message : '未知错误',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}

// 允许 GET 请求用于健康检查
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/monitor/trigger',
    message: 'POST to trigger a monitor check',
    timestamp: new Date().toISOString(),
  })
}
