import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { engine } from 'express-handlebars';
import './utils/handlebars-helpers.js';
import { router } from './routes.js';
import { loadData } from './init.js';

loadData();

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.use(fileUpload());
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use('/', router);

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log(
    `Weather Top App started on http://localhost:${listener.address().port}`,
  );
});
