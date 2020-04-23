const express = require('express');
const path = require('path');
// const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cors = require('cors');
// const fs = require('fs');



const app = express();
app.use(cors())

//
// const hbs = exphbs.create({
//     defaultLayout:'main',
//     extname:'hbs'
// });
//
//
// app.engine('hbs', hbs.engine);
// app.set('view engine', 'hbs');
// app.set('views', 'views');


// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./routes')(app);


const PORT = process.env.PORT


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});



