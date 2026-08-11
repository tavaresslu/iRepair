import prisma from '../../config/prismaClient';

export const getAll = () => prisma.client.findMany();
export const getById = (id: number) => prisma.client.findUnique({ where: { id } });
export const create = (data: { name: string; phone?: string }) => prisma.client.create({ data });
export const remove = (id: number) => prisma.client.delete({ where: { id } });