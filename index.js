const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')
// Definindo o template engine EJS
app.set('view engine', 'EJS')

// Definindo arquivos publicos
// app.use(express.static(path.join(__dirname, 'views' )))
app.use(express.static(path.join(__dirname, 'public')))


// middleware para habilitar dados via post (form)
app.use(express.urlencoded({ extended: true }))


// lendo o arquivo json
const data = fs.readFileSync('./store/bd.json')
const posts = JSON.parse(data)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'TrsmSoft - Home'
    })
})

app.get('/posts', (req, res) => {
    res.render('posts', {
        title: 'TrsmSoft - Post',
        posts: posts

    })
})


// rota para salvar os posts
app.post('/save-post', (req, res) => {
    const { titulo, comentario } = req.body
    
    data
    posts

    posts.push({
        title: titulo,
        text: comentario,
    })


    const postString = JSON.stringify(posts)
    fs.writeFileSync('./store/bd.json', postString)

    res.redirect('/posts?cadastro=ok')
})


// 404 NOT FOUND
app.use((req, res) => {
    res.send('Página não encontrada')
})


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on ${port}`))