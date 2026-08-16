// Project data for the Portfolio site — sourced from uday-portfolio-spec.md §4.4
// Grouped into three schematic-labeled clusters.

export const projects = {
  softwareAI: {
    id: '02-1',
    title: 'Software & AI',
    items: [
      {
        title: 'Fuserfy',
        description: 'Spotify playlist manager (search/create/rename/delete playlists).',
        tech: ['Flask', 'Spotify API'],
        links: {
          live: 'https://fuserfy.onrender.com/home',
          repo: 'https://github.com/Udaythedev/Fuserfy',
        },
      },
      {
        title: 'Zia',
        description: 'Offline-first PWA for task management, scheduling, and time tracking.',
        tech: ['TypeScript'],
        links: {
          repo: 'https://github.com/Udaythedev/Zia',
        },
      },
      {
        title: 'FileFlow',
        description: 'Storage management application.',
        tech: ['TypeScript'],
        links: {
          repo: 'https://github.com/Udaythedev/FileFlow-Storage-Manager',
        },
      },
      {
        title: 'LARS',
        description: 'Modular Python AI shell with dynamic feature loading and self-writing scripts.',
        tech: ['Python'],
        links: {
          repo: 'https://github.com/Udaythedev/LARS-AI-Shell',
        },
      },
      {
        title: 'Truth-Guard',
        description: 'AI-powered misinformation analyzer.',
        tech: ['Python'],
        links: {},
      },
      {
        title: 'Truth-Pod',
        description: 'ESP32 IoT device for voice-activated fake news detection with face-recognition-personalized news delivery.',
        tech: ['ESP32', 'IoT'],
        links: {},
      },
    ],
  },
  gameDev: {
    id: '02-2',
    title: 'Game Development',
    subtitle: '@gamesofuday',
    items: [
      {
        title: 'Slide-E',
        description: '3D mobile-style Unity game: player movement, obstacle collision, level progression.',
        tech: ['Unity', 'C#'],
        links: {
          repo: 'https://github.com/gamesofuday/Slide-E',
        },
      },
      {
        title: 'Bouncy Ball',
        description: '3D physics-based Unity game built on Rigidbody.',
        tech: ['Unity', 'C#'],
        links: {
          repo: 'https://github.com/gamesofuday/Bouncy-Ball',
        },
      },
      {
        title: 'Badmosh Run',
        description: '2D endless runner with enemies, coin pickups, jump mechanics.',
        tech: ['Unity', 'C#'],
        links: {
          repo: 'https://github.com/gamesofuday/Badmosh-Run',
        },
      },
    ],
  },
  collegeHackathon: {
    id: '02-3',
    title: 'College & Hackathon Builds',
    items: [
      {
        title: 'TechRoot 4.0',
        description: 'Website for Srinath University\'s tech fest (Sept 15–17, 2026).',
        tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS v4'],
        links: {
          live: 'https://techroots.vercel.app/',
        },
      },
      {
        title: 'AEGIS',
        description: 'Smartphone-based safety monitoring for elderly users, built at InnoFusion 3.0 Hackathon as captain of team "Bizarre Coders."',
        tech: ['Mobile', 'Safety'],
        links: {},
      },
    ],
  },
};
