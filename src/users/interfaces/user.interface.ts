import { Request } from 'express';

import { Prisma } from '@prisma/client';

type User = Prisma.UserGetPayload<{}>;

export default User;
