
import { Router } from "express";
import { addConsumer, deleteConsumer, getAllConsumers, getConsumerById, updateConsumer } from "../handlers/consumers";


const router= Router();

//const userController = new UserController();


router.get('/', getAllConsumers);
router.get('/:id',getConsumerById);
router.post('/', addConsumer);
router.patch('/:id', updateConsumer);
router.delete('/:id', deleteConsumer)



export default router;