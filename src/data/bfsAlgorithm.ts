import { GridPos, StepSnapshot, CellType } from '../types';

export const GRID_ROWS = 5;
export const GRID_COLS = 5;

export const START_NODE: GridPos = { r: 0, c: 0 };
export const TARGET_NODE: GridPos = { r: 4, c: 4 };

// 0: passable, 1: wall/obstacle
export const INITIAL_GRID: number[][] = [
  [0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

export const PYTHON_CODE_LINES = [
  "from collections import deque",
  "def bfs(grid, start, target):",
  "    queue = deque([start])",
  "    visited = {start}",
  "    parent = {start: None}",
  "    while queue:",
  "        curr = queue.popleft()",
  "        if curr == target:",
  "            return reconstruct_path(parent, target)",
  "        for dr, dc in [(0,1), (1,0), (0,-1), (-1,0)]:",
  "            nr, nc = curr[0] + dr, curr[1] + dc",
  "            if 0 <= nr < 5 and 0 <= nc < 5 and grid[nr][nc] == 0:",
  "                if (nr, nc) not in visited:",
  "                    visited.add((nr, nc))",
  "                    parent[(nr, nc)] = curr",
  "                    queue.append((nr, nc))",
];

// Helper to format a pos
export const posKey = (p: GridPos) => `${p.r},${p.c}`;

export function generateBfsTimeline(): StepSnapshot[] {
  const snapshots: StepSnapshot[] = [];
  let stepCounter = 0;
  let simulatedTime = 0;

  // Track state
  const visitedSet = new Set<string>();
  const parentMap = new Map<string, GridPos | null>();
  const queue: GridPos[] = [];
  let path: GridPos[] = [];

  const createBaseGrid = (): CellType[][] => {
    return INITIAL_GRID.map((row, r) =>
      row.map((val, c) => {
        if (r === START_NODE.r && c === START_NODE.c) return 'start';
        if (r === TARGET_NODE.r && c === TARGET_NODE.c) return 'target';
        if (val === 1) return 'wall';
        return 'empty';
      })
    );
  };

  const getGridSnapshot = (curr: GridPos | null): CellType[][] => {
    const grid = createBaseGrid();

    // Mark visited
    visitedSet.forEach((key) => {
      const [r, c] = key.split(',').map(Number);
      if (!(r === START_NODE.r && c === START_NODE.c) && !(r === TARGET_NODE.r && c === TARGET_NODE.c)) {
        grid[r][c] = 'visited';
      }
    });

    // Mark in_queue
    queue.forEach((p) => {
      if (!(p.r === START_NODE.r && p.c === START_NODE.c) && !(p.r === TARGET_NODE.r && p.c === TARGET_NODE.c)) {
        grid[p.r][p.c] = 'in_queue';
      }
    });

    // Mark current
    if (curr) {
      if (!(curr.r === START_NODE.r && curr.c === START_NODE.c) && !(curr.r === TARGET_NODE.r && curr.c === TARGET_NODE.c)) {
        grid[curr.r][curr.c] = 'current';
      }
    }

    // Mark path
    path.forEach((p) => {
      grid[p.r][p.c] = 'path';
    });

    return grid;
  };

  const addSnapshot = (
    line: number,
    desc: string,
    curr: GridPos | null,
    timeDuration: number,
    vars: StepSnapshot['variableValues'] = {}
  ) => {
    snapshots.push({
      stepIndex: stepCounter++,
      timeSec: simulatedTime,
      activeLine: line,
      description: desc,
      gridState: getGridSnapshot(curr),
      currentNode: curr,
      queue: [...queue],
      visitedNodes: Array.from(visitedSet).map((k) => {
        const [r, c] = k.split(',').map(Number);
        return { r, c };
      }),
      pathNodes: [...path],
      variableValues: {
        curr: curr ? `(${curr.r}, ${curr.c})` : undefined,
        queue: `[${queue.map((p) => `(${p.r},${p.c})`).join(', ')}]`,
        visitedCount: visitedSet.size,
        ...vars,
      },
    });
    simulatedTime += timeDuration;
  };

  // Step 1: Init function
  addSnapshot(2, "Inicia BFS con el nodo inicial (0,0) y objetivo (4,4)", null, 1.2, {});

  // Step 2: queue = deque([start])
  queue.push(START_NODE);
  addSnapshot(3, "Encolar el nodo inicial en la estructura deque", START_NODE, 1.2, {
    queue: "[(0, 0)]",
  });

  // Step 3: visited = {start}
  visitedSet.add(posKey(START_NODE));
  parentMap.set(posKey(START_NODE), null);
  addSnapshot(4, "Marcar (0,0) en el conjunto 'visited' para evitar ciclos", START_NODE, 1.0, {
    visitedCount: 1,
  });

  // Directions: right, down, left, up
  const directions: [number, number, string][] = [
    [0, 1, "Derecha (+0, +1)"],
    [1, 0, "Abajo (+1, 0)"],
    [0, -1, "Izquierda (+0, -1)"],
    [-1, 0, "Arriba (-1, 0)"],
  ];

  let targetFound = false;

  while (queue.length > 0 && !targetFound) {
    // Step: while queue:
    addSnapshot(6, `Evalúa 'while queue:' (quedan ${queue.length} nodos por explorar)`, null, 0.8);

    // Step: curr = queue.popleft()
    const curr = queue.shift()!;
    addSnapshot(7, `Extrae de la cola curr = (${curr.r}, ${curr.c}) con popleft()`, curr, 1.1, {
      curr: `(${curr.r}, ${curr.c})`,
    });

    // Step: if curr == target:
    if (curr.r === TARGET_NODE.r && curr.c === TARGET_NODE.c) {
      addSnapshot(8, "¡Condición cumplida! curr == target (4,4)", curr, 1.4, {
        evalResult: "True",
      });

      // Step: return reconstruct_path(...)
      // Reconstruct path
      const reconstructed: GridPos[] = [];
      let trace: GridPos | null = TARGET_NODE;
      while (trace) {
        reconstructed.unshift(trace);
        const parentKey: string = posKey(trace);
        trace = parentMap.get(parentKey) ?? null;
      }
      path = reconstructed;

      addSnapshot(9, `Reconstruyendo el camino más corto: ${path.length} celdas`, curr, 2.5, {
        evalResult: "Retornando camino óptimo",
      });
      targetFound = true;
      break;
    } else {
      addSnapshot(8, `Verifica si (${curr.r}, ${curr.c}) == (4,4) -> False`, curr, 0.7, {
        evalResult: "False",
      });
    }

    // Step: for dr, dc in directions
    for (const [dr, dc, dirName] of directions) {
      const nr = curr.r + dr;
      const nc = curr.c + dc;
      const nPos: GridPos = { r: nr, c: nc };
      const nKey = posKey(nPos);

      // Check boundary and wall
      const inBounds = nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS;
      const isWall = inBounds && INITIAL_GRID[nr][nc] === 1;
      const isPassable = inBounds && !isWall;
      const isVisited = visitedSet.has(nKey);

      if (inBounds && !isWall && !isVisited) {
        // Line 11: nr, nc = curr[0] + dr, curr[1] + dc
        addSnapshot(11, `Explora vecino ${dirName} -> (${nr}, ${nc})`, curr, 0.6, {
          dr_dc: `(${dr}, ${dc})`,
        });

        // Line 13: not in visited
        visitedSet.add(nKey);
        parentMap.set(nKey, curr);

        addSnapshot(14, `Vecino (${nr}, ${nc}) válido y no visitado: se añade a visited`, nPos, 0.6, {
          visitedCount: visitedSet.size,
        });

        // Line 16: queue.append
        queue.push(nPos);
        addSnapshot(16, `queue.append((${nr}, ${nc})) en la frontera de búsqueda`, nPos, 0.7, {
          queue: `[${queue.map((p) => `(${p.r},${p.c})`).join(', ')}]`,
        });

        // Check if this neighbor is the target for quick discovery
        if (nr === TARGET_NODE.r && nc === TARGET_NODE.c) {
          // It's in queue, will be processed soon!
        }
      }
    }
  }

  return snapshots;
}
