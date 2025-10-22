import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { usePageContext } from '../../context'
import ComposedChart from '../chart/ComposedChart'

const ReportOrg = () => {
  const { dataChart } = usePageContext()

  return (
    <div className='space-y-4 w-full mx-auto mt-10'>
      <div className='w-full flex flex-row gap-4'>
        <div className='w-full'>
          <Card className='h-full'>
            <CardHeader>
              <CardTitle className='text-xl'>Tổ chức</CardTitle>
            </CardHeader>
            <CardContent>
              <ComposedChart data={dataChart?.org?.composedChart ?? []}/>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ReportOrg
