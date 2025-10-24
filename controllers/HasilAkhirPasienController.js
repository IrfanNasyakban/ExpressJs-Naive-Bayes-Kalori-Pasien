const HasilAkhirPasien = require("../models/HasilAkhirPasienModel.js");
const Users = require("../models/UserModel.js");

const { Op } = require("sequelize");

const getHasilAkhirPasien = async (req, res) => {
  try {
    if (req.role === "admin") {
      const response = await HasilAkhirPasien.findAll({
        include: [
          {
            model: Users,
            attributes: ["username", "email", "role"],
          },
        ],
      });
      res.status(200).json(response);
    } else {
      const response = await HasilAkhirPasien.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["username", "email", "role"],
          },
        ],
      });
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createHasilAkhirPasien = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID not found in the request" });
    }

    // Check if hasilAkhirPasien data array exists
    if (!req.body.hasilAkhirPasien || !Array.isArray(req.body.hasilAkhirPasien)) {
      return res
        .status(400)
        .json({ error: "Invalid hasil akhir pasien data. Expected an array." });
    }

    // Add userId to each Hasil Akhir Pasien object
    const hasilAkhirPasiensWithUserId = req.body.hasilAkhirPasien.map((hasilAkhirPasien) => ({
      ...hasilAkhirPasien,
      userId: userId,
    }));

    // Delete any existing Hasil Akhir Pasiens for this user to avoid duplicates
    await HasilAkhirPasien.destroy({ where: { userId: userId } });

    // Create all new Hasil Akhir Pasiens in a single transaction
    await HasilAkhirPasien.bulkCreate(hasilAkhirPasiensWithUserId);

    res.json({ msg: "Hasi Akhir Pasien Created Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create Hasil Akhir Pasien", details: error.message });
  }
};

const deleteAllHasilAkhirPasien = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID not found in the request" });
    }

    const confirm = req.query.confirm === "true";

    if (!confirm) {
      return res.status(400).json({
        error:
          "This action will delete ALL your Data. Add ?confirm=true to confirm.",
      });
    }

    const deleted = await HasilAkhirPasien.destroy({
      where: {
        userId: userId,
      },
    });

    return res.json({
      message: `Successfully deleted all your data hasil akhir (${deleted} records)`,
      deletedCount: deleted,
    });
  } catch (error) {
    console.error("Error deleting all data hasil akhir:", error);
    return res.status(500).json({
      error: "Failed to delete all data hasil akhir",
      details: error.message,
    });
  }
};

module.exports = {
  getHasilAkhirPasien,
  createHasilAkhirPasien,
  deleteAllHasilAkhirPasien,
};
