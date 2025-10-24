const KriteriaSurplus = require("../models/KriteriaSurplusModel.js");
const Users = require("../models/UserModel.js")

const { Op } = require("sequelize");

const getKriteriaSurplus = async (req, res) => {
    try {
        if (req.role === "admin") {
            const response = await KriteriaSurplus.findAll({
                include: [{
                    model: Users,
                    attributes: ['username', 'email', 'role']
                }],
            });
            res.status(200).json(response);
        } else {
            const response = await KriteriaSurplus.findAll({
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

const getKriteriaSurplusById = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await KriteriaSurplus.findOne({
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
            response = await KriteriaSurplus.findOne({
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

const createKriteriaSurplus = async (req, res) => {
    const namaKriteria = req.body.namaKriteria;

    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ error: "User ID not found in the request" });
        }

        await KriteriaSurplus.create({
            namaKriteria: namaKriteria,
            userId: req.userId
        });

        res.json({ msg: "Kriteria Created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create Kriteria" });
    }
};

const updateKriteriaSurplus = async (req, res) => {
    try {
        await KriteriaSurplus.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Kriteria Updated" })
    } catch (error) {
        console.log(error.message);
    }
};

const deleteKriteriaSurplus = async (req, res) => {
    try {
        await KriteriaSurplus.destroy({
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
    getKriteriaSurplus,
    getKriteriaSurplusById,
    createKriteriaSurplus,
    updateKriteriaSurplus,
    deleteKriteriaSurplus
};