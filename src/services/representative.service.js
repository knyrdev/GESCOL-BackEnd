import { RepresentativeModel } from "../models/representative.model.js"
import { notFound, badRequest } from "../utils/AppError.js"

class RepresentativeService {
    /**
     * Create a new representative.
     */
    async createRepresentative(data) {
        // Check if CI already exists
        if (data.ci) {
            const existing = await RepresentativeModel.getRepresentativeByCi(data.ci)
            if (existing) throw badRequest("Representative with this CI already exists")
        }

        return await RepresentativeModel.createRepresentative(data)
    }

    /**
     * Get all representatives.
     */
    async getAllRepresentatives() {
        return await RepresentativeModel.getAllRepresentatives()
    }

    /**
     * Get representative by CI.
     */
    async getRepresentativeByCi(ci) {
        const representative = await RepresentativeModel.getRepresentativeByCi(ci)
        if (!representative) throw notFound("Representative not found")
        return representative
    }

    /**
     * Update representative data.
     */
    async updateRepresentative(ci, data) {
        const representative = await RepresentativeModel.updateRepresentative(ci, data)
        if (!representative) throw notFound("Representative not found")
        return representative
    }
}

export default new RepresentativeService()
