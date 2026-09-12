export type CellType = 'empty' | 'start' | 'target' | 'wall' | 'visited' | 'in_queue' | 'current' | 'path';

export interface GridPos {
  r: number;
  c: number;
}

export interface StepSnapshot {
  stepIndex: number;
  timeSec: number;
  activeLine: number; // 1-indexed Python line number
  description: string;
  gridState: CellType[][];
  currentNode: GridPos | null;
  queue: GridPos[];
  visitedNodes: GridPos[];
  pathNodes: GridPos[];
  variableValues: {
    curr?: string;
    queue?: string;
    visitedCount?: number;
    dr_dc?: string;
    evalResult?: string;
  };
}

export interface AlgorithmStep {
  type: 'init' | 'check_queue' | 'pop_queue' | 'check_target' | 'explore_neighbors' | 'check_valid' | 'enqueue' | 'target_found' | 'reconstruct_path';
  line: number;
  node?: GridPos;
  neighbor?: GridPos;
  queue: GridPos[];
  visited: GridPos[];
  path?: GridPos[];
  desc: string;
}
