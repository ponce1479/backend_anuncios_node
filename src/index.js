const app = require('./app');

const PORT = process.env.PORT || 3000;

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
