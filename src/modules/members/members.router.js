import { addMember, deleteMember, getMembers, updateMember ,getMembersInDetails} from './member.controllers.js';
import { beforAddMemberValidation,beforeUpdateMemberValidation } from './members-validation.middlewares.js';

import express from 'express'
const router = express.Router()

router.get('/', getMembers);
router.get('/in-details',getMembersInDetails)
router.post('/', beforAddMemberValidation, addMember)
router.put('/:id',beforeUpdateMemberValidation,updateMember)
router.delete('/:id',deleteMember)

export default router
