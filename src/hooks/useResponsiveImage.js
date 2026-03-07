import { useEffect, useState } from 'react'

export function useResponsiveImage(images) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return
        if (!images) return

        const media = window.matchMedia('(max-width: 768px)')

        const updateMedia = () => {
            setIsMobile(media.matches)
        }

        updateMedia() // 초기값 설정
        media.addEventListener('change', updateMedia)

        return () => {
            media.removeEventListener('change', updateMedia)
        }
    }, [images])

    const pcImage = Array.isArray(images) ? images.find(img => img.device === 'pc') : images?.pc
    const mobileImage = Array.isArray(images) ? images.find(img => img.device === 'mobile') : images?.mobile

    const image = !images || (Array.isArray(images) && images.length === 0)
        ? null
        : isMobile
            ? mobileImage || pcImage
            : pcImage || mobileImage

    return { image }
}