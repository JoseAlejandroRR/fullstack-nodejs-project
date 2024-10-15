import { MiddlewareHandler } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { RequireInteger } from '.'

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
 *         type: number
 *         example:  1000
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
    employeeId: RequireInteger(),
  }))
]

export default GetEmployeeRequest
