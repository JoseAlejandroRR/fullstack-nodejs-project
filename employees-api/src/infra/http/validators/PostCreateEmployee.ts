import { MiddlewareHandler } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { OptionalString, OptionalUUID, RequiredDate, RequireString } from '.'

/**
 * Request Schema for Create Employee.
 *
 * @swagger
 * components:
 *   schemas:
 *     PostCreateEmployeeInput:
 *       description: Request Schema for Create Employee.
 *       properties:
 *         firstname:
 *           type: string
 *           example: John
 *           required: true
 *         lastname:
 *           type: string
 *           example: Smith
 *           required: true
 *         fullName:
 *           type: string
 *           example: John Smith
 *         hiredAt:
 *           type: date
 *           example: 2020-02-15
 *           required: true
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
 * /employees:
 *   post:
 *     summary: Create new employee
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCreateEmployeeInput'
 *     responses:
 *       201:
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
