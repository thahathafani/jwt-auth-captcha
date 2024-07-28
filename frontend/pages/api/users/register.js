import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('http://localhost:8000/api/users/register', req.body, {
        headers: { 'Content-Type': 'application/json' },
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
