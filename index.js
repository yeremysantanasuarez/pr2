// Cargar modelo de datos
const { Pool } = require( 'pg' );
const pool = new Pool(
    {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
)
//
const cool = require( 'cool-ascii-faces' )
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', 
    (req, res) =>
        res.send( cool() )
  )
  .get('/db',
    async (req, res) =>
        {
            try {
                const cliente = await pool.connect()
                const resultados = await cliente.query('SELECT * FROM test_table')
                const resultado = { 'results':(resultados) ? resultados.rows : null }
                res.render( 'pages/db', resultado )
                cliente.release()
                
            } catch ( error ) {
                console.error( error )
                res.send( 'Error' + err )
                
            }
        }
  )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
