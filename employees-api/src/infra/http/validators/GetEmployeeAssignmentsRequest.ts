import { MiddlewareHandler } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { RequireInteger } from '.'

/**
 * @swagger
 * /employees/:id/assignments:
 *   get:
 *     summary: Get all employee assignments
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
 *         description: Get All EmployeeAssignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/EmployeeAssignmentViewModel"
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */


const GetEmployeeAssignmentsRequest: MiddlewareHandler[] = [
  zValidator('param', z.object({
    employeeId: RequireInteger(),
  }))
]

export default GetEmployeeAssignmentsRequest
