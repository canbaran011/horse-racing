# Vue 3 + TypeScript + Vite + Tailwind

# HORSE RACING GAME

src/
├── components/ # Vue components
│ ├── HorseList.vue # Displays list of horses
│ ├── RaceTrack.vue # Visual race track with animations
│ └── RaceTables.vue # Program and results tables
├── store/ # Vuex store
│ └── index.ts # State management logic
├── types/ # TypeScript type definitions
│ └── index.ts # Interface definitions
├── ui/ # UI components
│ └── UiCard.vue # Reusable card component
└── App.vue # Main application component

## Key Features

### 1. Race Generation

- Random generation of horses with unique colors and conditions
- Configurable number of laps (currently 6)
- Different race distances (1200m to 2200m)

### 2. Race Simulation

- Real-time race visualization
- Horse position animations
- Lap-by-lap results tracking
- Pause/Resume functionality

### 3. UI Components

- Three-column layout:
  - Horse List: Shows all horses and their conditions
  - Race Track: Visual representation of the race
  - Program/Results: Shows race schedule and results
