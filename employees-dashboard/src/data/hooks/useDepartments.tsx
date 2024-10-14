import { useState  } from 'react'
import { DepartmentDto } from '../dto/DepartmentDto'
import DeparmentsService from '../services/DepartmentsAPI'

const departmentsService = new DeparmentsService()

const useDepartments = () => {
  const [departments, setDepartments] = useState<DepartmentDto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAllDepartments = async () => {
    setLoading(true)
    try {
      const data = await departmentsService.getAll()
      setDepartments(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return {
    departments,
    loading,
    error,
    getAllDepartments,
  }
}

export default useDepartments
