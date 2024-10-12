import { MiddlewareHandler } from 'hono'

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
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
 *     responses:
 *       200:
 *         description: Get All Employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/EmployeeViewModel"
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

const GetAllEmployeesRequest: MiddlewareHandler[] = [

]

export default GetAllEmployeesRequest
