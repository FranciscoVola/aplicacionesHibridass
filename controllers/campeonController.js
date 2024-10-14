const Campeon = require('../models/Campeon');

// Obtener todos los campeones
exports.obtenerTodosCampeones = async (req, res) => {
  try {
    const campeones = await Campeon.find();
    res.json(campeones);
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};

// Obtener un campeón por ID
exports.obtenerCampeonPorId = async (req, res) => {
  try {
    const campeon = await Campeon.findById(req.params.id);
    if (!campeon) return res.status(404).json({ msg: 'Campeón no encontrado' });
    res.json(campeon);
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};

// Actualizar un campeón
exports.actualizarCampeon = async (req, res) => {
  try {
    let campeon = await Campeon.findById(req.params.id);
    if (!campeon) return res.status(404).json({ msg: 'Campeón no encontrado' });

    campeon = await Campeon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(campeon);
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};

// Eliminar un campeón
exports.eliminarCampeon = async (req, res) => {
  try {
    const campeon = await Campeon.findById(req.params.id);
    if (!campeon) return res.status(404).json({ msg: 'Campeón no encontrado' });

    await Campeon.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Campeón eliminado' });
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};
