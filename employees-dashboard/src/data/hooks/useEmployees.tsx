import { useState  } from 'react'
import EmployeesService from '../services/EmployeeAPI'
import { EmployeeDto } from '../dto/EmployeeDto'
import { CreateEmployeeDto } from '../dto/CreateEmployeeDto'
import { UpdateEmployeeDto } from '../dto/UpdateEmployeeDto'
import EmployeeStatus from '../dto/EmployeeStatus'

const employeesService = new EmployeesService()

const useEmployees = () => {
  const [employees, setEmployees] = useState<EmployeeDto[]>([])
  const [employee, setEmployee] = useState<EmployeeDto | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAllEmployees = async () => {
    setLoading(true)
    try {
      const data = await employeesService.getAll()
      setEmployees(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const getEmployeeById = async (id: string) => {
    setLoading(true)
    try {
      const data = await employeesService.get<any>(`/${id}`)
      setEmployee(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const createEmployee = async (data: CreateEmployeeDto) => {
    setLoading(true)
    try {
      const newEmployee = await employeesService.post<any>('/', data)
      setEmployees([...employees, newEmployee])
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const updateEmployee = async (
    id: string, data: UpdateEmployeeDto
  ): Promise<EmployeeDto | null> => {
    setLoading(true)
    try {
      const updatedEmployee = await employeesService.put<any>(`/${id}`, data)
      setEmployees(
        employees.map((emp) => (emp.id === id ? updatedEmployee : emp))
      )
      return updatedEmployee as EmployeeDto
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
    return null
  }

  const deleteEmployee = async (id: string) => {
    setLoading(true)
    try {
      await employeesService.delete(`/${id}`)
      setEmployees(employees.filter(emp => emp.id !== id))
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return {
    employees,
    employee,
    loading,
    error,
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  }
}

export default useEmployees
