import { MiddlewareHandler } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { OptionalString, OptionalUUID, RequiredDate, RequireString } from '.';

const PostCreateEmployee: MiddlewareHandler[] = [
  zValidator('json', z.object({
    firstname: RequireString(),
    lastname: RequireString(),
    phone: OptionalString(),
    address: OptionalString(),
    departmentId: OptionalUUID(),
    hiredAt: RequiredDate(),
  }))
]

export default PostCreateEmployee
