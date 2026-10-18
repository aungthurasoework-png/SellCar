import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors());
app.use(express.json({ limit: '12mb' }));

// Demo in-memory inventory. Replace with a database before production.
const inventory = [
  { id: 1, year: 2021, make: 'Honda', model: 'Civic EX', price: 21800, mileage: 28400, aiScore: 96 },
  { id: 2, year: 2020, make: 'Toyota', model: 'RAV4 XLE', price: 26400, mileage: 41200, aiScore: 92 },
  { id: 3, year: 2022, make: 'Mazda', model: 'CX-5 Touring', price: 23950, mileage: 19600, aiScore: 89 },
  { id: 4, year: 2019, make: 'BMW', model: '330i Sport', price: 22700, mileage: 48700, aiScore: 83 },
  { id: 5, year: 2021, make: 'Hyundai', model: 'Tucson SEL', price: 20400, mileage: 32200, aiScore: 91 },
  { id: 6, year: 2020, make: 'Tesla', model: 'Model 3 Long Range', price: 24900, mileage: 36500, aiScore: 87 }
];

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'AutoMatch AI API' }));
app.get('/api/cars', (req, res) => {
  let results = [...inventory];
  if (req.query.make) results = results.filter(car => car.make.toLowerCase() === String(req.query.make).toLowerCase());
  if (req.query.maxPrice) results = results.filter(car => car.price <= Number(req.query.maxPrice));
  if (req.query.minScore) results = results.filter(car => car.aiScore >= Number(req.query.minScore));
  res.json({ count: results.length, data: results });
});
app.get('/api/cars/:id', (req, res) => {
  const car = inventory.find(item => item.id === Number(req.params.id));
  if (!car) return res.status(404).json({ error: 'Vehicle not found' });
  res.json(car);
});
app.post('/api/listings', (req, res) => {
  const { year, make, model, mileage, price } = req.body || {};
  if (!year || !make || !model || !mileage) return res.status(400).json({ error: 'year, make, model and mileage are required' });
  const listing = { id: Date.now(), year: Number(year), make: String(make), model: String(model), mileage: Number(mileage), price: Number(price) || null, status: 'draft', createdAt: new Date().toISOString() };
  // Demo only: no persistence. Add auth, validation, storage, and moderation for production.
  res.status(201).json({ message: 'Draft created in demo mode', data: listing });
});

if (process.env.NODE_ENV === 'production') app.use(express.static(path.join(__dirname, 'dist')));
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`AutoMatch AI API listening on http://localhost:${port}`));
