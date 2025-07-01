
import {pool} from '../db.js'

/**
 * Obtiene un empleado por id
 * - try: consulta la base de datos por id y responde con el empleado si existe
 * - catch: maneja errores de base de datos o ejecución
 */
export const getEmployee = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener empleado' });
    }
}


/**
 * Obtiene todos los empleados
 * - try: consulta la base de datos y responde con la lista
 * - catch: maneja errores de base de datos o ejecución
 */
export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee');
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No hay empleados registrados' });
        }
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener empleados' });
    }
}



/**
 * Crea un nuevo empleado
 * - try: valida datos, inserta en la base de datos y responde con el nuevo empleado
 * - catch: maneja errores de validación o base de datos
 */
export const createEmployee = async (req, res) => {
    try {
        const { name, salary } = req.body;
        // Validación de datos requeridos
        if (!name || !salary) {
            return res.status(400).json({ message: 'Nombre y salario son requeridos' });
        }
        // Inserta el nuevo empleado
        const [rows] = await pool.query('INSERT INTO employee (name,salary) VALUES (?,?)', [name, salary]);
        res.status(201).json({
            id: rows.insertId,
            name,
            salary
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear empleado' });
    }
}


/**
 * Actualiza un empleado por id (PUT/PATCH)
 * - try: valida datos, actualiza en la base de datos y responde con el empleado actualizado
 * - catch: maneja errores de validación o base de datos
 */
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, salary } = req.body;
        // Validación: al menos un campo requerido
        if (!name && !salary) {
            return res.status(400).json({ message: 'Se requiere al menos un campo para actualizar' });
        }
        // Actualiza el empleado
        const [result] = await pool.query(
            'UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',
            [name, salary, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        // Consulta y responde con el empleado actualizado
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado tras actualizar' });
        }
        return res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar empleado' });
    }
}


/**
 * Obtiene todos los empleados para eliminar (opcional)
 * - try: consulta la base de datos y responde con la lista
 * - catch: maneja errores de base de datos
 */
export const deleteEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee');
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No hay empleados para eliminar' });
        }
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener empleados para eliminar' });
    }
}

/**
 * Elimina un empleado por id
 * - try: elimina el empleado por id y responde con mensaje de éxito
 * - catch: maneja errores de base de datos
 */
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al borrar empleado' });
    }
}