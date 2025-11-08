import { NextRequest, NextResponse } from 'next/server'

// 模拟配置数据
let mockConfig = {
  symbols: ['BTCUSDT', 'ETHUSDT'],
  threshold: 2000000,
  timeWindow: 300,
  orderPriceTolerance: 0.001,
  orderTimeTolerance: 3,
  telegramEnabled: true,
  telegramBotToken: '', // 不返回敏感信息
  telegramChatId: '',
}

export async function GET(request: NextRequest) {
  try {
    const MONITOR_URL = process.env.BINANCE_MONITOR_URL || 'http://localhost:8000'
    const MONITOR_API_KEY = process.env.BINANCE_MONITOR_API_KEY

    // 尝试从 binance-monitor 获取真实配置
    try {
      const response = await fetch(`${MONITOR_URL}/api/config`, {
        headers: {
          'Authorization': MONITOR_API_KEY ? `Bearer ${MONITOR_API_KEY}` : '',
        },
        // 5 秒超时
        signal: AbortSignal.timeout(5000),
      })

      if (response.ok) {
        const realConfig = await response.json()
        return NextResponse.json({
          success: true,
          data: realConfig,
          source: 'monitor-service',
          timestamp: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.log('Monitor service not available, using mock data:', error)
    }

    // 返回模拟配置（隐藏敏感信息）
    const configToReturn = {
      ...mockConfig,
      telegramBotToken: '',
      telegramChatId: '',
    }

    return NextResponse.json({
      success: true,
      data: configToReturn,
      source: 'mock',
      note: 'Monitor service is not available, showing mock data',
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Get config error:', error)

    return NextResponse.json({
      success: false,
      error: '获取配置失败',
      message: error instanceof Error ? error.message : '未知错误',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      symbols,
      threshold,
      timeWindow,
      telegramBotToken,
      telegramChatId,
    } = body

    // 验证参数
    if (symbols && !Array.isArray(symbols)) {
      return NextResponse.json({
        success: false,
        error: 'symbols 必须是数组',
      }, { status: 400 })
    }

    if (threshold && (typeof threshold !== 'number' || threshold <= 0)) {
      return NextResponse.json({
        success: false,
        error: 'threshold 必须是正数',
      }, { status: 400 })
    }

    // 更新配置
    if (symbols) mockConfig.symbols = symbols
    if (threshold) mockConfig.threshold = threshold
    if (timeWindow) mockConfig.timeWindow = timeWindow
    if (telegramBotToken) mockConfig.telegramBotToken = telegramBotToken
    if (telegramChatId) mockConfig.telegramChatId = telegramChatId

    // 在实际部署中，这里应该调用 binance-monitor 的配置 API
    // 来更新监控服务的配置

    return NextResponse.json({
      success: true,
      message: '配置已更新',
      data: {
        symbols: mockConfig.symbols,
        threshold: mockConfig.threshold,
        timeWindow: mockConfig.timeWindow,
        telegramEnabled: mockConfig.telegramEnabled,
      },
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Update config error:', error)

    return NextResponse.json({
      success: false,
      error: '更新配置失败',
      message: error instanceof Error ? error.message : '未知错误',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}
