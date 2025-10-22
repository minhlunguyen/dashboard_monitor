import React from 'react'
import { PageProvider, usePageContext } from './context'
import withWarpProvider from '@/hocs/withWarpProvider'
import ReportInstructor from './components/report-instructor'
import ReportStudent from './components/report-student'
import ReportOrg from './components/report-org'
import DateTab from './components/date-filter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ReportPage: React.FC = () => {
  const { dataChart } = usePageContext()
  return (
    <div className='w-full min-h-screen flex flex-col mb-8 mx-auto px-6'>
      <div className='flex-1'>
        <div className='flex items-center w-full text-center justify-center pt-5'>        
          <DateTab />
        </div>

        <div className='flex gap-6 my-4 w-full'>
          <div className='w-full lg:w-1/3 flex flex-col h-full'>
            <Card className='flex-1'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-2xl font-medium'>Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-6xl font-bold'>
                  {Number(dataChart?.total.student).toLocaleString() ?? 0}
                </div>
              </CardContent>
            </Card>
            <div className='flex-1 h-full'>
              <ReportStudent />
            </div>
          </div>
          <div className='w-full lg:w-1/3 flex flex-col h-full'>
            <Card className='flex-1'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-2xl font-medium'>Total Instructors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-6xl font-bold'>
                  {Number(dataChart?.total.instructor).toLocaleString() ?? 0}
                </div>
              </CardContent>
            </Card>
            <div className='flex-1 h-full'>
              <ReportInstructor />
            </div>
          </div>
          <div className='w-full lg:w-1/3 flex flex-col h-full'>
            <Card className='flex-1'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-2xl font-medium'>Total Organizations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-6xl font-bold'>
                  {Number(dataChart?.total.org).toLocaleString() ?? 0}
                </div>
              </CardContent>
            </Card>
            <div className='flex-1 h-full'>
              <ReportOrg />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withWarpProvider(ReportPage, PageProvider)
