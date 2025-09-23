import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destination, platform, timestamp, userAgent, referrer } = body;

    // Here you can save to your database, send to analytics service, etc.
    console.log('Click tracked:', {
      destination,
      platform,
      timestamp,
      userAgent,
      referrer,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    });

    // Example: Save to a simple JSON file (for development)
    // In production, you'd want to use a proper database
    const fs = require('fs');
    const path = require('path');

    const analyticsFile = path.join(process.cwd(), 'analytics.json');
    const existingData = fs.existsSync(analyticsFile)
      ? JSON.parse(fs.readFileSync(analyticsFile, 'utf8'))
      : [];

    existingData.push({
      destination,
      platform,
      timestamp,
      userAgent,
      referrer
    });

    fs.writeFileSync(analyticsFile, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.json({ error: 'Failed to track click' }, { status: 500 });
  }
}
