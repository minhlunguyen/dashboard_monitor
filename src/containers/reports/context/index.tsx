'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { format, startOfWeek, startOfMonth, startOfYear } from 'date-fns'
import { ReportService } from '@/lib/services/report'
import { Chart, ReportUserGrowth, TypeDate } from '@/lib/interfaces/report'

// Define date range types
type ChartEntry = { 
  label: string 
  new:number
  total: number
 }
type DataType = {
  student: {composedChart:ChartEntry[] }
  instructor: { composedChart:ChartEntry[] }
  org: { composedChart:ChartEntry[] }
  total: {
    student: number
    instructor: number
    org: number
  }
}

// Define the type for the context value
type PageContextType = {
  typeDate: TypeDate
  setTypeDate: (type: TypeDate) => void
  dateSelected: string
  setDateSelected: (date: string) => void
  valueDate: any
  setValueDate: (value: any) => void
  dataChart: DataType | null
}

// Create the context with an undefined default value
const PageContext = createContext<PageContextType | undefined>(undefined)

// Utility function to format chart data for each user type
const formatChartData = (data: Chart[], type: 'instructor' | 'student' | 'org', typeDate: TypeDate) => {
  return data.map((item: Chart) => {
    const label = format(
      new Date(item.reportDate),
      {
        weekly: 'dd',
        monthly: 'dd / MM',
        yearly: 'MM',
        daily: 'dd'
      }[typeDate]
    )
    switch (type) {
      case 'instructor':
        return {
          composedChart :{ label, new: item.newInstructor, total: item.totalInstructor }
        }
      case 'org':
        return {
          composedChart :{ label, new: item.newOrganization, total: item.totalOrganization }
        }
      case 'student':
        return {
          composedChart :{ label, new: item.newStudent, total: item.totalStudent }
        }
      default:
        return {
          composedChart :{ label, new: 0, total: 0 }

        }
    }
  })
}

// PageProvider component to provide context values
export const PageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [typeDate, setTypeDate] = useState<TypeDate>('weekly')
  const [dateSelected, setDateSelected] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
  const [valueDate, setValueDate] = useState<any>(null)
  const [dataChart, setDataChart] = useState<DataType | null>(null)

  // Get the starting date based on the selected type (weekly, monthly, yearly)
  const getStartDateByType = (startDate: string, typeDate: TypeDate): string => {
    switch (typeDate) {
      case 'weekly':
        return format(startOfWeek(new Date(startDate), { weekStartsOn: 1 }), 'yyyy-MM-dd')
      case 'monthly':
        return format(startOfMonth(new Date(startDate)), 'yyyy-MM-dd')
      case 'yearly':
        return format(startOfYear(new Date(startDate)), 'yyyy-MM-dd')
      default:
        return format(new Date(startDate), 'yyyy-MM-dd')
    }
  }

  // Fetch the report data based on the selected date and type
  const fetchDataReport = async () => {
    try {
      const { data }: { data: ReportUserGrowth } = await ReportService.getReportUserGrowth({
        startDate: getStartDateByType(dateSelected, typeDate),
        type: typeDate
      })

      if (!data || !data.chart) throw new Error('Invalid data response')

      const studentData = formatChartData(data.chart, 'student', typeDate)
      const instructorData = formatChartData(data.chart, 'instructor', typeDate)
      const orgData = formatChartData(data.chart, 'org', typeDate)

      setDataChart({
        total: {
          instructor: data.totalInstructor,
          student: data.totalStudent,
          org: data.totalOrganization
        },
        student: {
          composedChart:studentData.map((d) => d.composedChart)
        },
        instructor: {
          composedChart:instructorData.map((d) => d.composedChart)
        },
        org:{
          composedChart:orgData.map((d) => d.composedChart)
        },
      })
    } catch (error) {
      console.error('Failed to fetch report data:', error)
      setDataChart(null) // Set null or empty chart data in case of failure
    }
  }

  // Fetch data when typeDate or dateSelected changes
  useEffect(() => {
    fetchDataReport()
    const intervalId = setInterval(async () => {
      fetchDataReport()
    }, 30000);
    return () => clearInterval(intervalId);
  }, [typeDate, dateSelected])

  return (
    <PageContext.Provider
      value={{
        typeDate,
        setTypeDate,
        dateSelected,
        setDateSelected,
        valueDate,
        setValueDate,
        dataChart
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

// Custom hook to consume the context
export const usePageContext = (): PageContextType => {
  const context = useContext(PageContext)
  if (context === undefined) {
    throw new Error('usePageContext must be used within a PageProvider')
  }
  return context
}
