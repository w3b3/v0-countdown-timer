# Countdown timer

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/daniel-ss-projects-bb7eac7f/v0-countdown-timer)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/Uw0dJ0p11tY)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/daniel-ss-projects-bb7eac7f/v0-countdown-timer](https://vercel.com/daniel-ss-projects-bb7eac7f/v0-countdown-timer)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/Uw0dJ0p11tY](https://v0.app/chat/projects/Uw0dJ0p11tY)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Link Tracking System

This project includes a comprehensive link tracking system that helps you understand where your traffic is coming from.

### Features

#### 1. UTM Parameters
All external links now include UTM (Urchin Tracking Module) parameters:
- `utm_source=personal-site` - Identifies your personal site as the source
- `utm_medium=link` - Indicates these are direct links
- `utm_campaign=contact-links` - Groups all contact links together

#### 2. Custom Analytics Tracking
- **Client-side tracking**: JavaScript function captures click events
- **Server-side tracking**: Custom API endpoint logs detailed analytics data
- **Platform-specific tracking**: Each platform (LinkedIn, GitHub, etc.) is tracked separately

#### 3. Analytics Dashboard
Visit `/analytics` to view:
- Click counts by platform
- Recent click history with timestamps
- Referrer information
- User agent data

### Tracked Destinations

| Platform | URL | UTM Tracking | Custom Tracking |
|----------|-----|--------------|-----------------|
| LinkedIn | linkedin.com/in/brasileiro | ✅ | ✅ |
| GitHub | github.com/w3b3 | ✅ | ✅ |
| WhatsApp | wa.me/18199195996 | ✅ | ✅ |
| Email | iam@w-b.dev | ✅ | ✅ |
| Tatame0 | tatame0.com | ✅ | ✅ |
| Willis Brown | willis-brown.com | ✅ | ✅ |

### Integration Options

#### Google Analytics
The tracking system automatically integrates with Google Analytics if it's installed on your site. It sends events with:
- Event category: `engagement`
- Event label: Platform name
- Custom parameter: Destination URL

#### Custom Analytics Endpoint
You can modify `/api/track-click/route.ts` to send data to your preferred analytics service:
- Database storage
- Third-party analytics platforms
- Custom dashboards

### Privacy Considerations

The tracking system collects:
- Click destination and platform
- Timestamp
- User agent (browser/device info)
- HTTP referrer (if available)
- IP address (server-side only)

Consider adding a privacy policy or cookie notice if collecting personal data.

### Customization

To add tracking to new links:
1. Add UTM parameters to the URL
2. Add an `onClick` handler: `onClick={() => trackLinkClick('Platform Name', 'platform-id')}`
3. Update the analytics dashboard if needed
