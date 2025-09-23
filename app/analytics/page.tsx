'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
  destination: string;
  platform: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch('/analytics.json');
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      const data = await response.json();
      setAnalyticsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const getPlatformStats = () => {
    const stats: { [key: string]: number } = {};
    analyticsData.forEach(item => {
      stats[item.platform] = (stats[item.platform] || 0) + 1;
    });
    return stats;
  };

  const getRecentClicks = () => {
    return analyticsData
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  };

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div>Error: {error}</div>;

  const platformStats = getPlatformStats();
  const recentClicks = getRecentClicks();

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Link Click Analytics</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Platform Statistics</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {Object.entries(platformStats).map(([platform, count]) => (
            <div key={platform} style={{
              padding: '1rem',
              background: '#f0f0f0',
              borderRadius: '8px',
              minWidth: '120px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{count}</div>
              <div style={{ textTransform: 'capitalize' }}>{platform}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Recent Clicks</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={{ padding: '0.5rem', border: '1px solid #ddd', textAlign: 'left' }}>Platform</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ddd', textAlign: 'left' }}>Destination</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ddd', textAlign: 'left' }}>Time</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ddd', textAlign: 'left' }}>Referrer</th>
              </tr>
            </thead>
            <tbody>
              {recentClicks.map((click, index) => (
                <tr key={index}>
                  <td style={{ padding: '0.5rem', border: '1px solid #ddd', textTransform: 'capitalize' }}>
                    {click.platform}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                    {click.destination}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                    {new Date(click.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                    {click.referrer || 'Direct'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <p>Total clicks tracked: {analyticsData.length}</p>
        <p>Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
