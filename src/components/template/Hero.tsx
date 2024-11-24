import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'
import {Select, SelectTrigger, SelectContent, SelectItem} from '@/components/ui/select'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
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
const Hero = () => {
  const { t } = useTranslation('common')
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  return (
    <div className='container mx-auto mt-4 px-8 xl:px-16' id='about'>
              
      <ScrollAnimationWrapper>
        <motion.div
          variants={scrollAnimation}
        >
          <div className='row-start-2 flex flex-col items-center justify-center sm:row-start-1'>
            <h1 className='text-3xl font-bold leading-normal text-center text-white lg:text-4xl xl:text-5xl'>
              {t('Nhiếp ảnh')}<br/> {t('mang lại trải nghiệm khác biệt ')}
            </h1>
            <div className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg">
      {/* Dropdown */}
      <Select>
        <SelectTrigger className="w-64 text-left">
          <span className="text-gray-700">GIẢI CHẠY VIỆT NAM FAMILY MARATHON...</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
          <SelectItem value="3">Option 3</SelectItem>
        </SelectContent>
      </Select>

      {/* Input Field */}
      <Input placeholder="Nhập số BIB" className="w-48" />

      {/* Button with icon */}
      <Button className="bg-blue-500 text-white flex items-center">
        Tìm ảnh
      </Button>
    </div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <div className='relative flex w-full'>
      <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
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
