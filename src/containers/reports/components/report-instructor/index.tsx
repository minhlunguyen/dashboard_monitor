import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { usePageContext } from '../../context'
import ComposedChart from '../chart/ComposedChart'

const ReportInstructor = () => {
  const { dataChart } = usePageContext()
  return (
    <div className='space-y-4 w-full mx-auto mt-10'>
      <div className='w-full flex flex-row gap-4'>
        <div className='w-full'>
          <Card className='h-full'>
            <CardHeader>
              <CardTitle className='text-xl'>Giảng viên</CardTitle>
            </CardHeader>
            <CardContent>
              <ComposedChart data={dataChart?.instructor?.composedChart ?? []}/>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ReportInstructor
