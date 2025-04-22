'use client'
import { notFound, useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'

export const isValidPolicySlug = (slug: string): boolean => {
  const validSlugs = [
    'quy-che-5bib-com',
    'chinh-sach-bao-mat-thong-tin',
    'chinh-sach-bao-mat-thong-tin-thanh-toan',
    'chinh-sach-thanh-toan',
    'thong-tin-ve-chu-so-huu',
    'quy-trinh-giai-quyet-tranh-chap-khieu-nai',
  ]

  return validSlugs.includes(slug)
}

const PrivacyPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const isCorrectSlug = typeof slug === 'string' && isValidPolicySlug(slug)
  return (
    <div className='h-[90vh] w-full'>
      <iframe src={`https://hotro.5bib.com/${slug}`} className='h-full w-full'></iframe>
    </div>
  )
}

export default PrivacyPage
