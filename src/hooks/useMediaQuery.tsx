import { useState, useEffect } from 'react';

/**
 * Custom React hook to validate screen size
 * @param size string Screen size to validate
 * @returns Boolean (true|false) if screen is smaller than size
 */
export default function useMediaQuery2(size: string) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(`(max-width: ${size}px)`)
    result.addEventListener("change", onChange)
    setValue(result.matches)

    return () => result.removeEventListener("change", onChange)
  }, [size])

  return value
}