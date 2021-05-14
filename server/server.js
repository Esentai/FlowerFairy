const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const fileUpload = require('express-fileupload')
const exphbs = require('express-handlebars');

const app = express()
const port = process.env.PORT || 5000


app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(fileUpload());

app.use(express.static('public'));
app.use(express.static('upload'));

app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

const pool = mysql.createPool({
    connectionLimit : 5000,
    host: "127.0.0.1",
    user: "root",
    database: "flowerfairy",
    password: "root"
})

app.get('/', (req, res) => {
    res.send("Hello api")
})

app.post('/register', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params = req.body.params;
        console.log(params);
        let sql = 'INSERT INTO `users` (`id`,`email`, `fullname`, `password`) VALUES (? ,?, ?, ?)';
        let data = [null,params.email, params.fullname, params.password];
        connection.query(sql,data, (err, rows) => {
            connection.release()
            if(!err) {
                res.send(`success`)
            } else {
                res.send(err.sqlMessage);
                console.log(err)
            }
        })
    })
})

app.post('/login', function(request, response) {
    let email = request.body.params.email;
    let password = request.body.params.password;
    if (password && email) {
        pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
            if (results.length > 0) {
                response.send("success")
            } else {
                response.send('Incorrect email and/or password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter email and password!');
        response.end();
    }
});

app.post('/getName', function(request, response) {
    let email = request.body.params.email;
        pool.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
            response.send(results[0].fullname);
            response.end();
        });
})


app.post('/adverts', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body.params.advert;

        console.log(params);

        let sql = 'INSERT INTO `adverts` (`id`,`name`, `description`, `image`, `image_link`, `price`, `email`, `fullname`, `number`, `address`) VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [null, params.name, params.description, params.image, params.image_link, params.price, params.email, params.fullname ,params.number, params.address];
        connection.query(sql,data, (err, rows) => {
            connection.release()
            if(!err) {
                res.send(`success`)
            } else {
                res.send(err.sqlMessage);
                console.log(err)
            }
        })
    })

})



app.get('/adverts', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        pool.query('SELECT * FROM adverts', function(error, results, fields) {
            if (results.length > 0) {
                res.send(results)
            } else {
                res.send('empty');
            }
            res.end();
        });

    })

})


app.post('/getAdverts', function(request, response) {
    let email = request.body.params.email;
        pool.query('SELECT * FROM adverts WHERE email = ?', [email], function(error, results, fields) {
            if (results.length > 0) {
                response.send(results)
            } else {
                response.send('empty');
            }
            response.end();
        });

});

app.post('/getAdvert', function(request, response) {
    let id = request.body.params.id;
    pool.query('SELECT * FROM adverts WHERE id = ?', [id], function(error, results, fields) {
        response.send(results);
        response.end();
    });

});


app.post('/deleteAdvert', (req, res) => {
        let id = req.body.params.id;
        console.log("ID:",id);
        pool.query('DELETE FROM `adverts` WHERE `adverts`.`id` =  ?', [id], function(error, results, fields) {
            if (!error){
                res.send("success");
            } else{
                res.send(error)
            }
            res.end();
        });
})





app.listen(port, () => console.log(`Listen on port ${port}`))
