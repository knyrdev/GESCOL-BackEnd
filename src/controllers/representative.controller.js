import RepresentativeService from "../services/representative.service.js"

const createRepresentative = async (req, res, next) => {
  try {
    const representative = await RepresentativeService.createRepresentative(req.body)
    res.status(201).json({
      ok: true,
      msg: "Representante creado exitosamente",
      data: representative,
    })
  } catch (error) {
    next(error)
  }
}

const getAllRepresentatives = async (req, res, next) => {
  try {
    const representatives = await RepresentativeService.getAllRepresentatives()
    res.json({
      ok: true,
      representatives,
      total: representatives.length,
    })
  } catch (error) {
    next(error)
  }
}

const getRepresentativeByCi = async (req, res, next) => {
  try {
    const { ci } = req.params
    const representative = await RepresentativeService.getRepresentativeByCi(ci)
    res.json({
      ok: true,
      representative,
    })
  } catch (error) {
    next(error)
  }
}

const updateRepresentative = async (req, res, next) => {
  try {
    const { ci } = req.params
    const representative = await RepresentativeService.updateRepresentative(ci, req.body)
    res.json({
      ok: true,
      msg: "Representante actualizado exitosamente",
      representative,
    })
  } catch (error) {
    next(error)
  }
}

export const RepresentativeController = {
  createRepresentative,
  getAllRepresentatives,
  getRepresentativeByCi,
  updateRepresentative,
}
