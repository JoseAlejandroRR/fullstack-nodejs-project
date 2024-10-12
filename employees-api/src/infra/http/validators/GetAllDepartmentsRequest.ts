import { MiddlewareHandler } from 'hono'

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Get all Departments
 *     security:
 *       - bearerAuth: []
 *     tags:
 *      - departments
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         type: string
 *         example: Bearer xxxxx.yyyyy.zzzzz
 *         required: true
 *     responses:
 *       200:
 *         description: Get All Departments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/DepartmentViewModel"
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

const GetAllDepartmentsRequest: MiddlewareHandler[] = [

]

export default GetAllDepartmentsRequest
