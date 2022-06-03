// import { Router } from "express";
// import {validateTokenMiddleware} from "../middlewares/validateTokenMiddleware.js";
// // import { connection } from '../database.js';
// import * as items from "../controllers/itemsController.js";
// const formRouter = Router();
// formRouter.post('/forms', validateTokenMiddleware, items.createItem);
// formRouter.get('/forms', validateTokenMiddleware, items.getItems);
// // formRouter.delete('/forms/:id', validateTokenMiddleware, deleteItem);

// export default formRouter;

// // async function createItem(req,res){
// //     try{
// //         const {user} = res.locals;
// //         const form = req.body;
// //         await connection.query('INSERT INTO item("os","model", "userId","typeId") VALUES ($1, $2, $3, $4)', [form.os,form.model, user.id, form.type]);
// //         res.sendStatus(201);
// //     }catch(err){
// //         console.log(err);
// //         res.sendStatus(500);
// //     }

// // }

// // async function getItems(req,res){
// //     const filterByDate = req.query.datestart;
// //     const filterByDateEnd = req.query.dateend;
// //     const filterByType = req.query.type;
// //     const {user} = res.locals;
// //     console.log(filterByDate+' '+filterByDateEnd+' '+filterByType)

// //     try{
// //         if(filterByType&&!filterByDateEnd&&!filterByDate){
// //             const result = await connection.query('SELECT * FROM item WHERE "userId" = $1 AND "typeId" = $2', [user.id, filterByType]);
// //             return res.send(result.rows);
// //         }
// //         // if(filterByDate){
// //         //     const items = await connection.query('SELECT * FROM item WHERE "userId" = $1 AND "date" = $2', [user.id, filterByDate]);
// //         //     return res.send(items.rows);
// //         // }
// //         // if(filterByDate&&filterByType&&!filterByDateEnd){
// //         //     const items = await connection.query('SELECT * FROM item WHERE "userId" = $1 AND "datetime" > $2 AND "typeId" = $3', [user.id, filterByDate, filterByType]);
// //         //     return res.send(items.rows);
// //         // }
// //         if(filterByDateEnd&&filterByDate&&filterByType){
// //             const items = await connection.query(`
// //                 SELECT
// //                 *
// //                 FROM
// //                 item
// //                 WHERE
// //                 "userId" = $1
// //                 AND item."datetime" >= '${filterByDate} 00:00:00.000'
// //                 AND item."datetime" <= '${filterByDateEnd} 23:59:59.599'
// //                 AND "typeId" = $2;
// //             `, [user.id, filterByType]);
// //             return res.send(items.rows);
// //         }
// //         const {rows} = await connection.query('SELECT * FROM item WHERE "userId" = $1 ORDER BY datetime DESC LIMIT 5' , [user.id]);
// //         res.send(rows);

// //     }catch(err){
// //         console.log(err);
// //         res.sendStatus(500);
// //     }

// // }

// // async function deleteItem(req,res){
// //     try{
// //         const {user} = res.locals;
// //         const {id} = req.params;
// //         await connection.query('DELETE FROM item WHERE "id" = $1', [id]);
// //         res.sendStatus(200);
// //     }catch(err){
// //         console.log(err);
// //         res.sendStatus(500);
// //     }}
