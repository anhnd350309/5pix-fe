import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ScrollAnimationWrapper from 'components/layout/ScrollAnimationWrapper'
import ButtonPrimary from 'components/ui/button/ButtonPrimary'
import { getScrollAnimation } from 'utils/getScrollAnimation'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import EventCard from '../shared/EventCard'
const Hero = () => {
  const { t } = useTranslation('common')
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  return (
    <div className='container mx-auto mt-4 px-8 xl:px-16 space-y-5' id='about'>
      <div className='row-start-2 flex flex-col items-center justify-center sm:row-start-1 space-y-5'>
        <h1 className='text-3xl font-bold leading-normal text-center text-white lg:text-4xl xl:text-5xl'>
          {t('Nhiếp ảnh')}<br /> {t('mang lại trải nghiệm khác biệt ')}
        </h1>
        <div className="grid items-center space-x-4  shadow rounded-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-0">
          <Select >
            <SelectTrigger className="text-center bg-white rounded-full w-full">
              <span className="text-gray-700">GIẢI CHẠY VIỆT NAM FAMILY MARATHON...</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Option 1</SelectItem>
              <SelectItem value="2">Option 2</SelectItem>
              <SelectItem value="3">Option 3</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex bg-white rounded-full w-64">
            <Input placeholder="Nhập số BIB" className="w-48 !ml-0 border-none !important" />
            <Button className="bg-blue-500 text-white flex items-center rounded-full">
              Tìm ảnh
            </Button>
          </div>
        </div>
      </div>
      <div className='relative flex w-full justify-center'>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-[60%]"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/3">
                <div className="p-1">
                  <EventCard />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default Hero
