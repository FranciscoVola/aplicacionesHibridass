const express = require('express');
const { obtenerTodosCampeones, obtenerCampeonPorId, actualizarCampeon, eliminarCampeon } = require('../controllers/campeonController');
const autenticar = require('../middleware/auth');
const router = express.Router();

router.get('/', autenticar, obtenerTodosCampeones);
router.get('/:id', autenticar, obtenerCampeonPorId);
router.put('/:id', autenticar, actualizarCampeon);
router.delete('/:id', autenticar, eliminarCampeon);

module.exports = router;
