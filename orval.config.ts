import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: 'https://dapi.5pix.org/openapi.json', // Đường dẫn tới file OpenAPI specification (có thể là .json hoặc .yaml)
    output: {
      mode: 'tags-split', // Chia mã nguồn thành nhiều thư mục dựa trên tags
      target: './src/services', // Thư mục nơi mã nguồn sẽ được tạo
      client: 'react-query', // Sử dụng React Query (có thể là axios hoặc fetch nếu muốn)
      schemas: './src/schemas', // Thư mục nơi các schema được tạo
      baseUrl: 'https://dapi.5pix.org', // Base URL cho các API
      mock: true, // Tạo mock data cho API khi chưa có server thực sự
    },
  },
})
