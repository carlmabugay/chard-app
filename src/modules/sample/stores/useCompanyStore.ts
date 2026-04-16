import { defineStore} from 'pinia'
import { ref } from 'vue'
import { sampleRepository } from '../sampleRepository.ts'

export const useCompanyStore = defineStore('company', () => {

  const companies = ref([]);

  async function fetchCompanies() {
    const repo = new sampleRepository()
    companies.value = await repo.getAll()
  }

  return {
    companies,
    fetchCompanies
  }

});