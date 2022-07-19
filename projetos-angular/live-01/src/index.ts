import express, {Request, Response, NextFunction} from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.router';


const app = express();

//config app
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//config route
app.use(usersRoute);
app.use(statusRoute);

//subir a app
app.listen(3000, () => {
    console.info("Application is running...");
});
