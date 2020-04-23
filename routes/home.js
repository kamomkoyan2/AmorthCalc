const {Router} = require('express');
const router = Router();


const calc_controller = require('../controllers/CalculatorController')
const pdfTemplate = require('../documents')

router.get('/', calc_controller.amortizateCalc);
router.post('/create-pdf', pdfTemplate,calc_controller.createPdf);
router.get('/fetch-pdf', calc_controller.fetchPdf);

router.post('/', calc_controller.handleForm);

module.exports = router;