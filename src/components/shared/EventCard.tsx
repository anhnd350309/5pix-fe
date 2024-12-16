import Image from 'next/image'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

interface EventCardProps {
  title?: string
  date?: string
  imageCount?: number
  imageUrl?: string
}

const EventCard: React.FC<EventCardProps> = ({ title, date, imageCount, imageUrl }) => {
  return (
    <Card className='h-[225px] w-[350px]'>
      <CardHeader>
        <Image
          src={imageUrl || '/assets/images/template/event.jpg'}
          alt={title || 'event'}
          width={600}
          height={400}
          className='rounded-t-lg h-[145px] w-full object-cover'
        />
      </CardHeader>
      <CardContent>
        <CardTitle className='font-reddit-sans text-ellipsis truncate whitespace-nowrap overflow-hidden'>
          {title}
        </CardTitle>
        <CardDescription>
          <div className='flex items-center gap-4'>
            <div className='flex items-center'>
              <Image
                className='w-4 h-4'
                src='/assets/icons/template/date.svg'
                alt='date'
                height={30}
                width={30}
              />
              <span className='pl-1'>{new Date(date || '').toLocaleDateString('en-GB')}</span>
            </div>
            <div className='flex items-center'>
              <Image
                className='w-4 h-4'
                src='/assets/icons/template/image.svg'
                alt='image count'
                height={30}
                width={30}
              />
              <span className='pl-1'>{imageCount} Ảnh</span>
            </div>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default EventCard
