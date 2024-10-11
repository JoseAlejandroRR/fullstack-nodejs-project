import { MiddlewareHandler } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { OptionalDate, OptionalEnumValue, OptionalString, OptionalUUID } from '.';
import EmployeeStatus from '@/domain/enums/EmployeeStatus';

const PutUpdateEmployee: MiddlewareHandler[] = [
  zValidator('json', z.object({
    firstname: OptionalString(),
    lastname: OptionalString(),
    phone: OptionalString(),
    address: OptionalString(),
    status: OptionalEnumValue(EmployeeStatus),
    departmentId: OptionalUUID(),
    hiredAt: OptionalDate(),
  }))
]

export default PutUpdateEmployee
