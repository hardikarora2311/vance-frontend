import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { code, timeline } = req.query;
  const url = `https://web-api.vance.club/public/api/currency-converter/forex?code=${code}&timeline=${timeline}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}