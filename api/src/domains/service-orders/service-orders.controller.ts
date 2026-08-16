import { Request, Response } from 'express';
import * as serviceOrdersService from './service-orders.service';

export async function getAll(req: Request, res: Response) {
  res.json(await serviceOrdersService.getAll());
}
export async function create(req: Request, res: Response) {
  res.status(201).json(await serviceOrdersService.create(req.body));
}
export async function remove(req: Request, res: Response) {
  await serviceOrdersService.remove(Number(req.params.id));
  res.status(204).send();
}