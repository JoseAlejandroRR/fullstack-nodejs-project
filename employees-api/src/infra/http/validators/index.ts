import { z } from 'zod';
import { validate as isUuid } from 'uuid';

export const RequireString = (minLength: number = 1, maxLength = 200) => z.string().min(minLength).max(maxLength)

export const OptionalString = (minLength: number = 0, maxLength = 200) => z.string().min(minLength).max(maxLength).optional()

export const RequireInteger = (min: number = 0, max: number = 10000000) => z.coerce.number().min(min).max(max)

export const OptionalInteger = (min: number = 0, max: number = 10000000) => z.coerce.number().min(min).max(max).optional()

export const RequireBoolean = () => z.boolean()

export const OptionalBoolean = () => z.boolean().optional()

export const RequiredDate = () => z.string().date()

export const OptionalDate = () => RequiredDate().optional()

export const RequiredJSON = () => z.unknown()

export const OptionalJSON = () => RequiredJSON().optional()

export const RequireStringArray = () => z.array(z.string()).min(1)

export const OptionalStringArray = () => z.array(z.string()).min(1).optional()


export const RequireEnumValue = <T extends string>(enumObj: Record<string, T>) => {
  const enumValues = Object.values(enumObj)
  return z.enum(enumValues as [T, ...T[]])
}

export const OptionalEnumValue = <T extends string>(enumObj: Record<string, T>) => RequireEnumValue(enumObj).optional()

export const RequireEmail = () => z.string().min(1).email('Invalid Email Address')

export const OptionalEmail = () => z.string().min(1).email('Invalid Email Address').optional()

export const RequireUUID = () => z.string()
  .refine((val) => isUuid(val) && val.split('-')[2][0] === '4', {
    message: 'Invalid UUID',
  })

export const OptionalUUID = () => RequireUUID().optional()
