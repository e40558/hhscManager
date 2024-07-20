import { Router } from "express";
import { addLocation, deleteLocation, getAllLocations, getLocationById, updateLocation } from "../handlers/locations";


const router= Router();

//const userController = new UserController();


router.get('/', getAllLocations);
router.get('/:id',getLocationById);
router.post('/', addLocation);
router.patch('/:id', updateLocation);
router.delete('/:id', deleteLocation)



export default router;