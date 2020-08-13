import express, {Application} from 'express';
import morgan from "morgan";
import userRoutes from "@routes/userRoute";
import photoRoutes from "@routes/photoRoute";
import authRoutes from "@routes/authRoute"
import path from 'path';
import helmet from 'helmet';
import cors from "cors";

const app: Application = express();

//setttings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet())
app.use(cors());//Me permite conectarme a bases de datos externas

//Routes
app.use('/api/photos', photoRoutes);//ruta base: /api -> luego se encarga indexRoutes de cada ruta
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

//this folder will be used for public files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;