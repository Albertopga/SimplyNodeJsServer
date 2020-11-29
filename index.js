// servidor creado con express pero sin ruta
const express = require('express')
const morgan = require('morgan') // middleware que nos da información de la petición
const app = express(); // esto es el servidor

/*Setting */
// establecemos una nueva "variable" por medio de (nombre, valor)
app.set('appName', 'Tutorial de express')
app.set('port', 80)
app.set('View engine', 'ejs') // motor de plantillas como index.ejs

/* Midlewares */
//Middleware. puede ser usado para validar un usuario antes de llegar a una ruta
function logger(req, res, next){
    console.log(req.get('host'));
    next();
}

app.use(express.json()); // middleware para que express entienda los objetos JSON
app.use(morgan('dev')); //usa el middleware antes de entrar en cualquier ruta

app.all("/user", (req, res, next)=>{// para todas las rutas antes de llegar a la específica
    console.log('Pasaba por aquí...');
    next() // permite terminar y continuar.
}) 

/* Rutas */
app.get("/", (req, res)=>{
    const data = [{name:"Al"},{name:"Ber"},{name:"To"}] // paso de datos a motor de plantilla index ejs
    res.render('index.ejs', {personas: data});
})

app.get("/user",(req, res)=>{ 
    res.send({
        name:"Alberto",
        lastnames:"Pérez"
    })
});
app.post("/user/:id", (req, res)=>{     
    console.log(req.params)//para ver los parámetros recibidos
    console.log(req.body)//para ver los datos recibidos

    res.send("REQUEST POST")
});
app.post("/user", (req, res)=>{     
    console.log(req.body)//para ver los datos recibidos

    res.send("REQUEST POST")
});
app.put("/user/:id", (req, res)=>{  // actualizar datos 
    console.log(req.body) // por body recibiremos los datos para actualizar
    console.log(req.params)//por params identificaremos el elemento a actualizar
    
    res.send(`El usuario ${req.params.id} se ha actualizado `)

});
app.delete("/user/:userId", (req, res)=>{
    
    res.send(`El usuario ${req.params.userId} se ha borrado`)
});

/*Midleware para devolver archivos que están dentro de la carpeta 'public' se ve desde el navegador*/
app.use(express.static('public'))

app.listen(app.get('port'),()=>{
    console.log(app.get('appName')); //obtengo la "variable" que he creado en app.set()
    console.log('Server listen on port', app.get('port'));
});
