import { Request } from 'express';

import { Prisma } from '@prisma/client';

interface User extends Prisma.UserGetPayload<{}> {}

export default User;
