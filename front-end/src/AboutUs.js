import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'

/**
 * A React component that represents the About Us page of the app.
 * Fetches page content (text and image URL) from the back-end API.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [aboutData, setAboutData] = useState(null)

  // fetch the about us data from the back-end when the component first loads
  useEffect(() => {
    axios
      .get(`http://localhost:5002/about`)
      .then(response => {
        setAboutData(response.data)
      })
      .catch(err => {
        console.error('Failed to load About Us data:', err)
      })
  }, [])

  if (!aboutData) {
    return <p>One second please...</p>
  }

  return (
    <div className="AboutUs">
      <h1>About Us</h1>

      <div className="AboutUs-photo-container">
        <img
          src={aboutData.imageUrl}
          alt={aboutData.name}
          className="AboutUs-photo"
        />
      </div>

      <h2>{aboutData.name}</h2>

      {/* Render each paragraph from the back-end JSON */}
      {aboutData.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

// make this component available to be imported into any other file
export default AboutUs
