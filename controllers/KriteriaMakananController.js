const KriteriaMakanan = require("../models/KriteriaMakananModel.js");
const Users = require("../models/UserModel.js")

const { Op } = require("sequelize");

const getKriteriaMakanan = async (req, res) => {
    try {
        if (req.role === "admin") {
            const response = await KriteriaMakanan.findAll({
                include: [{
                    model: Users,
                    attributes: ['username', 'email', 'role']
                }],
            });
            res.status(200).json(response);
        } else {
            const response = await KriteriaMakanan.findAll({
                where: {
                    userId: req.userId,
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email', 'role']
                }],
            });
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getKriteriaMakananById = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await KriteriaMakanan.findOne({
                attributes: ['id', 'namaKriteria'],
                where: {
                    id: req.params.id
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email', 'role']
                }]
            })
        } else {
            response = await KriteriaMakanan.findOne({
                attributes: ['id', 'namaKriteria'],
                where: {
                    [Op.and]: [{ id: req.params.id }, { userId: req.userId }]
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email', 'role']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

const createKriteriaMakanan = async (req, res) => {
    const namaKriteria = req.body.namaKriteria;

    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ error: "User ID not found in the request" });
        }

        await KriteriaMakanan.create({
            namaKriteria: namaKriteria,
            userId: req.userId
        });

        res.json({ msg: "Kriteria Created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create Kriteria" });
    }
};

const updateKriteriaMakanan = async (req, res) => {
    try {
        await KriteriaMakanan.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Kriteria Updated" })
    } catch (error) {
        console.log(error.message);
    }
};

const deleteKriteriaMakanan = async (req, res) => {
    try {
        await KriteriaMakanan.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Kriteria Deleted" });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getKriteriaMakanan,
    getKriteriaMakananById,
    createKriteriaMakanan,
    updateKriteriaMakanan,
    deleteKriteriaMakanan
};