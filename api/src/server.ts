import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORTA = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ mensagem: 'API do iRepair funcionando!' });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});