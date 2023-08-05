const router = require('express').Router()

const useController = require('./controllers/useController')
const authUserControllers = require('./controllers/authUserControllers')
const medicamentosControllers = require('./controllers/medicamentosControllers')

router.post('/posto', useController.createUser)
router.post('/login', authUserControllers.login)

router.post('/medicamentos', medicamentosControllers.createMedicamentos)
router.get('/medicamentos', medicamentosControllers.getMedicamentos)
router.get('/medicamentos/:id', medicamentosControllers.getMedicamento)
router.put('/medicamentos/:id', medicamentosControllers.updateMedicamento)
router.delete('/medicamentos/:id', medicamentosControllers.deleteMedicamento)

module.exports = router 