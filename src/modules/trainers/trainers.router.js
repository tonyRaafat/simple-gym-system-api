import express from 'express'
import { addTrainer, deleteTrainer, getTrainers, getTrainersInDetails, updateTrainer } from './trainers.controller.js';
import { beforAddTrainerValidation, beforeUpdateTrainerValidation } from './trainers-validation.middleware.js';
const router = express.Router()

router.get('/', getTrainers);
router.get('/in-details',getTrainersInDetails)
router.post('/',beforAddTrainerValidation,addTrainer)
router.put('/:id',beforeUpdateTrainerValidation,updateTrainer)
router.delete('/:id',deleteTrainer)

export default router
