import { MiddlewareHandler } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { OptionalDate, OptionalEnumValue, OptionalString, OptionalUUID } from '.'
import EmployeeStatus from '@/domain/enums/EmployeeStatus'

/**
 * Request Schema for Update Employee.
 *
 * @swagger
 * components:
 *   schemas:
 *     PutCreateEmployeeInput:
 *       description: Request Schema for Update Employee.
 *       properties:
 *         firstname:
 *           type: string
 *           example: John
 *         lastname:
 *           type: string
 *           example: Smith
 *         fullName:
 *           type: string
 *           example: John Smith
 *         hiredAt:
 *           type: date
 *           example: 2020-02-15
 *         phone:
 *           type: string
 *           example: +1-622-2343234
 *         address:
 *           type: string
 *           example: 4889 Railroad Street
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 */

/**
 * @swagger
 * /employees/:id:
 *   put:
 *     summary: Update an existing employee
 *     security:
 *       - bearerAuth: []
 *     tags:
 *      - employees
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         type: string
 *         example: Bearer xxxxx.yyyyy.zzzzz
 *         required: true
 *       - in: path
 *         name: id
 *         type: string
 *         example:  a8d56d51-1917-40ca-aa56-38a7acb2321b
 *         required: true
 *       - in: body
 *         name: body
 *         type: string
 *         required: true
 *         schema:
 *            $ref: "#/components/schemas/PutCreateEmployeeInput"
 *     responses:
 *       200:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EmployeeViewModel"
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

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
