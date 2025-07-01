import { Router } from 'express';
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployees,
  deleteEmployee
} from '../controllers/employees.controllers.js';



const router = Router()


// Obtener todos los empleados
router.get('/employees', getEmployees)

// Obtener un empleado por id
router.get('/employees/:id', getEmployee)

// Crear un empleado
router.post('/employees', createEmployee)

// Actualizar un empleado por id (PUT)
router.put('/employees/:id', updateEmployee)


// Actualizar parcialmente un empleado por id (PATCH)
router.patch('/employees/:id', updateEmployee)

// Obtener todos los empleados para eliminar (opcional, para mostrar lista)
router.get('/employees-delete', deleteEmployees)

// Eliminar un empleado por id
router.delete('/employees/:id', deleteEmployee)

export  default router