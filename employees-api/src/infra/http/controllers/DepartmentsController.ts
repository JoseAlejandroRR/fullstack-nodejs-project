import { inject, injectable } from 'tsyringe';
import { BaseController } from './BaseController';
import DepartmentManager from '@/application/managers/DepartmentManager';
import { Context } from 'hono';
import ViewModel from '@/domain/views/ViewModel';
import DepartmentViewModel from '@/domain/views/departments/DepartmentViewModel';

@injectable()
class DepartmentsController extends BaseController {

  constructor(
    @inject(DepartmentManager) private deparmentManager: DepartmentManager
  ) {
    super()
  }

  async getAllDepartments(ctx: Context){
    const departments = await this.deparmentManager.getAllDepartments()

    return ctx.json(ViewModel.createMany(DepartmentViewModel, departments))
  }

}

export default DepartmentsController
