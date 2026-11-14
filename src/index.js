const app = require('./app');

var cors = require('cors');


const PORT = process.env.PORT || 3000;

app.use(cors()); // Habilitar CORS para todas las rutas

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
