import { importSchemesFromAPI } from '../controllers/schemeController.js';
import express from 'express';
import {
    getAllSchemes,
    getSchemeById,
    createScheme,
    updateScheme,
    deleteScheme,
    filterschemes,
    searchSchemes
} from '../controllers/schemeController.js'
import authMiddleware from '../middleware/authmiddleware.js';
import adminMiddleware from '../middleware/adminmiddleware.js';

const router = express.Router();

//public routes user can see schemes without login
router.get('/', getAllSchemes);
router.get('/filter', filterschemes);
router.get('/search', searchSchemes);
router.get('/:id', getSchemeById);

//for admin only
router.post('/', authMiddleware, adminMiddleware, createScheme);
router.put('/:id', authMiddleware, adminMiddleware, updateScheme);
router.delete('/:id', authMiddleware, adminMiddleware, deleteScheme);
router.post('/import', authMiddleware, adminMiddleware, importSchemesFromAPI);

export default router;