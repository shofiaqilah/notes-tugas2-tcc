const Notes = require("../schema/Notes");

const findAll = async () => {
  return await Notes.findAll({
    attributes: ["id", "judul", "isi", "tanggal_dibuat"],
    order: [["tanggal_dibuat","DESC"]]
  });
};

const create = async (notesData) => {
  return await Notes.create(notesData);
}

const findById = async (id) => {
  return await Notes.findByPk(id, {
    attributes: ["id", "judul", "isi", "tanggal_dibuat"],
  });
}

const updateById = async (id, notesData) => {
  return await Notes.update(notesData, {
    where: {
      id: id,
    },
  });
}

const deleteById = async (id) => {
  return await Notes.destroy({
    where: {
      id
    },
  });
}

module.exports = {
  findAll,
  create,
  findById,
  updateById,
  deleteById,
};
