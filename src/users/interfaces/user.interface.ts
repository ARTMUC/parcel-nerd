import { Request } from 'express';

import { Prisma } from '@prisma/client';

// this way we can create partial type from Prisma model

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface User extends Prisma.UserGetPayload<{}> {}

export default User;
