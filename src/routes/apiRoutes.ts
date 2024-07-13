import { Router } from 'express';
import { createApi, getApis, updateApi, deleteApi } from '../controllers/apiController';

const router = Router();

router.post('/apis', createApi);
router.get('/apis/:company_name', getApis);
router.put('/apis/:id', updateApi);
router.delete('/apis/:id', deleteApi);

export default router;
