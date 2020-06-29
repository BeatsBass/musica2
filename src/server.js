const express = require('express');
const compression = require('compression');
const morgan = require('morgan')
const cors = require('cors');
const genreModel = require('./models/genreModel');


// Initializations
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use(compression());

// routes
const data = require('./Function/app');
const agoDate = require('./Function/agoDateFunction');
app.get('/get/genre/:id', async (req, res) => {
    try {
        const paramas = req.params.id
        const respuesta = await genreModel.findOne(
            { idGenre: paramas }
        )
        if (respuesta !== null) {
            const _id = respuesta._id
            const ago = agoDate(respuesta.createdAt)
            if (ago < 5) res.json(respuesta)
            else {
                const realInfo = await data(paramas)
                res.json(realInfo)
                await genreModel.findByIdAndUpdate(_id,{ contents: realInfo.contents })
            }
        }
        else {
            const realInfo = await data(paramas)
            const musicGenre = {
                'idGenre': realInfo.idGenre,
                'title': realInfo.title,
                'contents': realInfo.contents,
            }
            res.json(realInfo)
            console.log('Saved')
            await genreModel.create(musicGenre)
        }
    } catch (error) {
        console.log(error)
        res.json({})
    }
})
app.get('/', async (req, res) => {
    const id = 'ggMPOg1uXzNLR056a1lMSTdI'
    const respuesta = await genreModel.findOne(
        { idGenre: id }
    )
    const ago = agoDate(respuesta.createdAt)
    if (ago < 5) {
        console.log('db')
    }
    else {
        console.log('get')
    }
    console.log(ago)
    res.json(respuesta)
})

module.exports = app;