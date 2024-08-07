export default function Icon({ className = "", width = 16, height = 16, src = "", alt = "" }) {
  return (
    <img
      className={className}
      width={width}
      height={height}
      src={'https://www.svgrepo.com/show/' + src}
      alt={alt}
    />
  )
}
