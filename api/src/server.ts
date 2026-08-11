import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './domains/auth/auth.routes';
import clientsRoutes from './domains/clients/clients.routes';
import serviceOrdersRoutes from './domains/service-orders/service-orders.routes';

const app = express();
const PORTA = process.env.PORT || 3333;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/clients', clientsRoutes);
app.use('/service-orders', serviceOrdersRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ mensagem: 'API do iRepair funcionando!' });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});