import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kurian Jose Portfolio',
    short_name: 'Kurian.AI',
    description: 'AI & Systems Engineer — RAG, LangChain, legal-tech, automation',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0e1a',
    theme_color: '#00ff41',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
