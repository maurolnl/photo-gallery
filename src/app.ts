import express from 'express';
import morgan from "morgan";
import indexRoutes from "@routes/index";
import path from 'path';

const app = express();



//setttings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api', indexRoutes);//ruta base: /api -> luego se encarga indexRoutes de cada ruta

//this folder will be used for public files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;