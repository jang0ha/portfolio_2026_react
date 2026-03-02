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

    const image = !images
        ? null
        : isMobile
            ? images.mobile || images.pc
            : images.pc || images.mobile

    return { image }
}