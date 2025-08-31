
import { Link } from 'react-router-dom'
const InnerBanner = ({title}) => {
  return (
        <div
      className="h-[40vh] text-white text-4xl flex-col flex items-center justify-center bg-cover bg-no-repeat bg-center relative"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
          url('https://demoxml.com/html/ecom/images/about-bg.png')
        `,
      }}
    >
      <h1 className="mb-4 font-bold capitalize">{title}</h1>
      <p className="text-sm capitalize"><Link to="/">Home</Link> . {title}</p>
    </div>
  )
}

export default InnerBanner