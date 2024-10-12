import { MiddlewareHandler } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { RequireUUID } from '.'

/**
 * @swagger
 * /employees/:id:
 *   get:
 *     summary: Get an existing employee
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
 *     responses:
 *       200:
 *         description: Employee Entity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EmployeeViewModel"
 *       204:
 *         description: Not found
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

const GetEmployeeRequest: MiddlewareHandler[] = [
  zValidator('param', z.object({
    employeeId: RequireUUID(),
  }))
]

export default GetEmployeeRequest
