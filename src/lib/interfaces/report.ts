export type TypeDate = 'daily' | 'weekly' | 'monthly' | 'yearly'
export type TypeChart = 'student' | 'instructor' | 'org'

export interface Chart {
  reportDate: string
  totalStudent: number
  newStudent: number
  totalInstructor: number
  newInstructor: number
  totalOrganization: number
  newOrganization: number
}

export interface ReportUserGrowth {
  totalStudent: number
  totalInstructor: number
  totalOrganization: number
  chart: Chart[]
}
