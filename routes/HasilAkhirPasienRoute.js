const express = require("express");
const {
    getHasilAkhirPasien,
    createHasilAkhirPasien,
    deleteAllHasilAkhirPasien
} = require("../controllers/HasilAkhirPasienController.js") 
const { verifyUser } = require("../middleware/AuthUser.js") 

const router = express.Router()

router.get('/hasil-akhir-pasien', verifyUser, getHasilAkhirPasien)
router.post('/hasil-akhir-pasien', verifyUser, createHasilAkhirPasien)
router.delete('/hasil-akhir-pasien', verifyUser, deleteAllHasilAkhirPasien)

module.exports = router;