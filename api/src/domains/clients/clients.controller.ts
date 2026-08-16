import { Request, Response } from 'express';
import * as clientsService from './clients.service';

export async function getAll(req: Request, res: Response) {
  res.json(await clientsService.getAll());
}
export async function create(req: Request, res: Response) {
  res.status(201).json(await clientsService.create(req.body));
}
export async function remove(req: Request, res: Response) {
  await clientsService.remove(Number(req.params.id));
  res.status(204).send();
}