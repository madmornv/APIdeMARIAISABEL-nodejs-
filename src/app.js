import './config.js'
import express from 'express'
import employeesRoutes from './routes/employees.routes.js'
import indexRoutes from './routes/index.routes.js'
import {PORT} from './config.js' // Importa la configuración de la base de datos


const app = express()

app.use(express.json())



app.use(indexRoutes)
app.use('/api', employeesRoutes)

// Middleware para rutas no encontradas (404)
        //si el cliente busca una ruta que no existe
app.use((req, res, next) => {
  res.status(404).json({
    message: 'endpoint Not found'
  });
});

export default app;
