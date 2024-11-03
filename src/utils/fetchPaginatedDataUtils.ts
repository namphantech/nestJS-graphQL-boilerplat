interface PrismaModel<T> {
  findMany: (args: {
    where?: object;
    orderBy?: object;
    skip?: number;
    take?: number;
    select?: object;
  }) => Promise<T[]>;
  count: (args: { where?: object }) => Promise<number>;
}

export async function fetchPaginatedData<T>(
  prismaModel: PrismaModel<T>,
  where: object = {},
  order: object = {},
  skip = 0,
  take = 10,
  selects: string[] = [],
): Promise<{ results: T[]; totalItems: number }> {
  const selectObject = selects.reduce(
    (acc, field) => {
      acc[field] = true;
      return acc;
    },
    {} as Record<string, boolean>,
  );

  const [results, totalItems] = await Promise.all([
    prismaModel.findMany({
      where,
      orderBy: order,
      skip,
      take,
      ...(selects.length > 0 && { select: selectObject }),
    }),
    prismaModel.count({ where }),
  ]);
  return { results, totalItems };
}

export function createOrderClause(
  orderQuery: string,
  allowedFields: string[],
): object {
  if (!orderQuery) return {};

  const orderBy = {};
  orderQuery.split(',').forEach((field) => {
    const [fieldName, direction] = field.split(':');
    if (allowedFields.includes(fieldName)) {
      orderBy[fieldName] = direction === 'desc' ? 'desc' : 'asc';
    }
  });

  return orderBy;
}
