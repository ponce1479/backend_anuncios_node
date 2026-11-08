const express = require('express');

const app = express();

const router = require('./router');

const PORT = process.env.PORT || 3000;

// Permite leer JSON en el body de las peticiones.
app.use(express.json());

app.get('/', function (req, res) {
    return res.json({ mensaje: 'Bienvenido a mi Proyecto backend API' });
});

// Rutas de la API: /api/categorias y /api/publicaciones
app.use('/api', router);

// Middleware para rutas no encontradas (404)
app.use(function (req, res) {
    return res.status(404).json({
        mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
    });
});

// Middleware centralizado de errores (siempre debe ir al final)
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    // JSON mal formado en el body
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            mensaje: 'El body de la petición no contiene un JSON válido'
        });
    }

    // Body demasiado grande
    if (err.type === 'entity.too.large') {
        return res.status(413).json({
            mensaje: 'El body de la petición es demasiado grande'
        });
    }

    const status = err.status || err.statusCode || 500;
    const mensaje = status >= 500 ? 'Error interno del servidor' : err.message;

    // En errores 500 se registra el detalle completo en consola,
    // pero no se expone al cliente.
    if (status >= 500) {
        console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err);
    }

    return res.status(status).json({ mensaje });
});

const server = app.listen(PORT, function () {
    console.log(`Servidor iniciado en http://127.0.0.1:${PORT}`);
});

// Error al intentar levantar el servidor (por ejemplo, puerto ocupado)
server.on('error', function (error) {
    if (error.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} ya está en uso. Cambia el puerto con la variable PORT.`);
        process.exit(1);
    }

    throw error;
});
