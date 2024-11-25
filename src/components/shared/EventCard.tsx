import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Image from "next/image"
export default function EventCard() {
  return (
    <Card className="max-w-[350px] max-h-[225px]">
      <CardHeader>
        <Image src="/assets/images/event.png" alt="TA NANG TRAIL CHALLENGE 2025" width={600} height={400} className="rounded-t-lg" />
      </CardHeader>
      <CardContent>
        <CardTitle className="truncate whitespace-nowrap overflow-hidden text-ellipsis">TA NANG TRAIL CHALLENGE 2025 - LEAD YOUR JOURNEY</CardTitle>
        <CardDescription>

          <div className='flex items-center gap-4'>
            <div className='flex items-center'>
              <Image
                className='h-4 w-4'
                src='/assets/icons/template/date.svg'
                alt='twitter'
                height={30}
                width={30}
              />
              <span className='pl-1'>10/05/2024</span>
            </div>
            <div className='flex items-center'>
              <Image
                className='h-4 w-4'
                src='/assets/icons/template/image.svg'
                alt='twitter'
                height={30}
                width={30}
              />
              <span className='pl-1'>50.000 Ảnh</span>
            </div>
          </div>
        </CardDescription>
      </CardContent>
    </Card>);
}