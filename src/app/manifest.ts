import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kurian Jose Portfolio',
    short_name: 'Kurian Jose',
    description: 'AI Developer specializing in LangChain, RAG systems, and legal tech solutions',
    start_url: '/',
    display: 'standalone',
    background_color: '#121212',
    theme_color: '#a855f7',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
