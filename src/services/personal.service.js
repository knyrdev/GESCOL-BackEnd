import { PersonalModel } from '../models/personal.model.js';

class PersonalService {
  /**
   * Create new personal record
   * @param {Object} personalData 
   * @returns {Promise<Object>}
   */
  async createPersonal(personalData) {
    // Verify unique CI
    const existingByCi = await PersonalModel.findOneByCi(personalData.ci);
    if (existingByCi) {
      throw new Error('Ya existe personal con esta cédula');
    }

    // Verify unique email if provided
    if (personalData.email) {
      const existingByEmail = await PersonalModel.findOneByEmail(personalData.email);
      if (existingByEmail) {
        throw new Error('Ya existe personal con este email');
      }
    }

    return PersonalModel.create(personalData);
  }

  /**
   * Update personal record
   * @param {number|string} id 
   * @param {Object} updateData 
   * @returns {Promise<Object>}
   */
  async updatePersonal(id, updateData) {
    const personal = await this.getPersonalById(id);

    // Verify unique CI if changed
    if (updateData.ci && updateData.ci !== personal.ci) {
      const existingByCi = await PersonalModel.findOneByCi(updateData.ci);
      if (existingByCi && existingByCi.id !== id) {
        throw new Error('Ya existe personal con esta cédula');
      }
    }

    // Verify unique email if changed
    if (updateData.email && updateData.email !== personal.email) {
      const existingByEmail = await PersonalModel.findOneByEmail(updateData.email);
      if (existingByEmail && existingByEmail.id !== id) {
        throw new Error('Ya existe personal con este email');
      }
    }

    return PersonalModel.update(id, updateData);
  }

  /**
   * Get all personal records
   * @returns {Promise<Array>}
   */
  async getAllPersonal() {
    return PersonalModel.findAll();
  }

  /**
   * Get personal record by ID
   * @param {number|string} id 
   * @returns {Promise<Object>}
   */
  async getPersonalById(id) {
    const personal = await PersonalModel.findOneById(id);
    if (!personal) throw new Error('Personal no encontrado');
    return personal;
  }

  /**
   * Get personal records by role
   * @param {number} idRole 
   * @returns {Promise<Array>}
   */
  async getPersonalByRole(idRole) {
    return PersonalModel.findByRole(idRole);
  }

  /**
   * Get all teachers
   * @returns {Promise<Array>}
   */
  async getTeachers() {
    return PersonalModel.findTeachers();
  }

  /**
   * Get all administrators
   * @returns {Promise<Array>}
   */
  async getAdministrators() {
    return PersonalModel.findAdministrators();
  }

  /**
   * Get all maintenance staff
   * @returns {Promise<Array>}
   */
  async getMaintenanceStaff() {
    return PersonalModel.findMaintenance();
  }

  /**
   * Get personal without system access
   * @returns {Promise<Array>}
   */
  async getPersonalWithoutSystemAccess() {
    return PersonalModel.findWithoutSystemAccess();
  }

  /**
   * Get personal with system access
   * @returns {Promise<Array>}
   */
  async getPersonalWithSystemAccess() {
    return PersonalModel.findWithSystemAccess();
  }

  /**
   * Search personal by name
   * @param {string} name 
   * @returns {Promise<Array>}
   */
  async searchPersonalByName(name) {
    return PersonalModel.searchByName(name);
  }

  /**
   * Search personal by CI
   * @param {string} ci 
   * @returns {Promise<Array>}
   */
  async searchPersonalByCi(ci) {
    return PersonalModel.searchByCi(ci);
  }

  /**
   * Remove personal record
   * @param {number|string} id 
   * @returns {Promise<Object>}
   */
  async deletePersonal(id) {
    const personal = await this.getPersonalById(id);
    return PersonalModel.remove(id);
  }

  /**
   * Get all available roles
   * @returns {Promise<Array>}
   */
  async getRoles() {
    return PersonalModel.getRoles();
  }

  /**
   * Get all available parishes
   * @returns {Promise<Array>}
   */
  async getParishes() {
    return PersonalModel.getParishes();
  }

  // ─── Aliases for backward compatibility (Phase 3.3) ──────────────────
  crearPersonal = this.createPersonal;
  actualizarPersonal = this.updatePersonal;
  obtenerTodoPersonal = this.getAllPersonal;
  obtenerPorId = this.getPersonalById;
  obtenerPorRol = this.getPersonalByRole;
  obtenerDocentes = this.getTeachers;
  obtenerAdministradores = this.getAdministrators;
  obtenerMantenimiento = this.getMaintenanceStaff;
  obtenerSinAcceso = this.getPersonalWithoutSystemAccess;
  obtenerConAcceso = this.getPersonalWithSystemAccess;
  buscarPorNombre = this.searchPersonalByName;
  buscarPorCedula = this.searchPersonalByCi;
  eliminarPersonal = this.deletePersonal;
  obtenerRoles = this.getRoles;
  obtenerParroquias = this.getParishes;
}

export default new PersonalService();