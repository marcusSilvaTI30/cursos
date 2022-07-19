import { Request, Response, NextFunction, Router, response } from "express";
import StatusCode from "http-status-codes";

const usersRoute = Router();

usersRoute.get('/users', (req: Request, res:Response, next:NextFunction) => {
    const users = [{id:1,  userName:'Marcus Vinicius'}, {id:2, userName: "Caroline Ramos"}];
    res.status(StatusCode.OK).json(users);
});

usersRoute.get('/users/:id', (req: Request, res:Response, next:NextFunction) => {
    const id = req.params.id;
    res.status(StatusCode.OK).json(id);
});

usersRoute.post('/users', (req: Request, res:Response, next:NextFunction) => {
    const newUser = req.body;
    res.status(StatusCode.CREATED).send(newUser);
});

usersRoute.put('/users/:id', (req: Request<{id: string}>, res:Response, next:NextFunction) => {
    const id = req.params.id;
    const editUser = req.body;    
    res.status(StatusCode.OK).send(editUser);
});

usersRoute.delete('/users/:id', (req: Request<{id: string}>, res:Response, next:NextFunction) => {
    const id = req.params.id;     
    res.status(StatusCode.OK).send(id);
});
export default usersRoute;
