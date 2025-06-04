# Vue 3 + TypeScript + Vite + Tailwind

# HORSE RACING GAME

src/ <br>
├── components/ # Vue components <br>
│ ├── HorseList.vue # Displays list of horses <br>
│ ├── RaceTrack.vue # Visual race track with animations <br>
│ └── RaceTables.vue # Program and results tables <br>
├── store/ # Vuex store <br>
│ └── index.ts # State management logic <br>
├── types/ # TypeScript type definitions <br>
│ └── index.ts # Interface definitions <br>
├── ui/ # UI components <br>
│ └── UiCard.vue # Reusable card component <br>
└── App.vue # Main application component <br>

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

### Installation and Execution
``` npm install ```
``` npm run dev ```

