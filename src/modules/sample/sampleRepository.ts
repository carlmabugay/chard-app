import { apiClient} from '../../shared/api/client.ts'

export class sampleRepository {
  async getAll() {
    const res = await apiClient.get('/companies')
    return res.data;
  }
}