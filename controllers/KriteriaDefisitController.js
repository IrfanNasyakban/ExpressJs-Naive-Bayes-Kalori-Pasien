const KriteriaDefisit = require("../models/KriteriaDefisitModel.js");
const Users = require("../models/UserModel.js")

const { Op } = require("sequelize");

const getKriteriaDefisit = async (req, res) => {
    try {
        if (req.role === "admin") {
            const response = await KriteriaDefisit.findAll({
                include: [{
                    model: Users,
                    attributes: ['username', 'email', 'role']
                }],
            });
            res.status(200).json(response);
        } else {
            const response = await KriteriaDefisit.findAll({
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

const getKriteriaDefisitById = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await KriteriaDefisit.findOne({
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
            response = await KriteriaDefisit.findOne({
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

const createKriteriaDefisit = async (req, res) => {
    const namaKriteria = req.body.namaKriteria;

    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ error: "User ID not found in the request" });
        }

        await KriteriaDefisit.create({
            namaKriteria: namaKriteria,
            userId: req.userId
        });

        res.json({ msg: "Kriteria Created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create Kriteria" });
    }
};

const updateKriteriaDefisit = async (req, res) => {
    try {
        await KriteriaDefisit.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Kriteria Updated" })
    } catch (error) {
        console.log(error.message);
    }
};

const deleteKriteriaDefisit = async (req, res) => {
    try {
        await KriteriaDefisit.destroy({
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
    getKriteriaDefisit,
    getKriteriaDefisitById,
    createKriteriaDefisit,
    updateKriteriaDefisit,
    deleteKriteriaDefisit
};