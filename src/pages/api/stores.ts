import { StoreApiResponse, StoreType } from "@/interface";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse>,
) {
  const { page, id, q }: { page?: string, id?: string, q?: string } = req.query;
  const prisma = new PrismaClient();

  if (page) {
    const count = await prisma.store.count();
    const skipPage = parseInt(page) - 1;
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      take: 10,
      skip: skipPage * 10,
      where: {
        name: q ? { contains: q } : {},
      }
    });

    res.status(200).json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        id: id ? parseInt(id) : {},
      },
    });

    return res.status(200).json(id ? stores[0] : stores);
  }
}
