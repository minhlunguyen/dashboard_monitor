import { QueryParams } from '../interfaces/api'
import http from '@/lib/http/index'

export const ReportService = {
  getReportUserGrowth: async (params: QueryParams) => {
    const url = `report-user-growth/user-growth?startDate=${params?.startDate}&type=${params?.type}`
    const res = await http.getInstance('main', false).get(url)
    return res
  }
}
