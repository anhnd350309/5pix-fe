import axios from 'axios'

export default async function handler(req, res) {
  const { method, body, query } = req

  try {
    const response = await axios({
      method,
      url: `${query.path || ''}`, // Use query params to pass the path if dynamic
      headers: {
        ...req.headers, // Forward client headers if necessary
        Host: undefined, // Remove Host header if using AWS-specific endpoints
      },
      data: body, // Pass client request body
      responseType: 'stream', // Handle the response as a stream
    })

    // Set the appropriate headers for the image
    res.setHeader('Content-Type', response.headers['content-type'])
    res.setHeader('Content-Length', response.headers['content-length'])

    // Pipe the image data to the response
    response.data.pipe(res)
  } catch (error) {
    console.error('Error in API proxy:', error.response?.data || error.message)
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: 'Server error' })
  }
}
