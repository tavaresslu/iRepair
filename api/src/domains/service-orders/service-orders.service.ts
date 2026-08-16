import prisma from '../../config/prismaClient';

export const getAll = () => prisma.serviceOrder.findMany({ include: { client: true } });
export const getById = (id: number) => prisma.serviceOrder.findUnique({ where: { id }, include: { client: true } });
export const create = (data: { device: string; issue: string; clientId: number }) =>
  prisma.serviceOrder.create({ data });
export const remove = (id: number) => prisma.serviceOrder.delete({ where: { id } });