import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { ERROR_2119_SCENE_CODE } from '../src/motion-canvas/error2119SceneSource';
import { PSE_OSE_SCENE_CODE } from '../src/motion-canvas/pseOseSceneSource';
import { FACTURACION_SUNAT_SCENE_CODE } from '../src/motion-canvas/facturacionSunatSceneSource';
import { FRAUD_DETECTION_SCENE_CODE } from '../src/motion-canvas/fraudDetectionSceneSource';
import { GOOGLE_MAPS_ASTAR_SCENE_CODE } from '../src/motion-canvas/googleMapsAStarSceneSource';
import { EMBEDDING_SCENE_CODE } from '../src/motion-canvas/embeddingSceneSource';
import { CACHE_FLOW_SCENE_CODE } from '../src/motion-canvas/cacheFlowSceneSource';
import { EVENT_LOOP_SCENE_CODE } from '../src/motion-canvas/eventLoopSceneSource';
import { MOTION_CANVAS_CODE } from '../src/motion-canvas/bfsSceneSource';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../src/motion-canvas/scenes');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const scenes = [
  { name: 'error2119Scene.tsx', content: ERROR_2119_SCENE_CODE },
  { name: 'pseOseScene.tsx', content: PSE_OSE_SCENE_CODE },
  { name: 'facturacionSunatScene.tsx', content: FACTURACION_SUNAT_SCENE_CODE },
  { name: 'fraudDetectionScene.tsx', content: FRAUD_DETECTION_SCENE_CODE },
  { name: 'googleMapsAStarScene.tsx', content: GOOGLE_MAPS_ASTAR_SCENE_CODE },
  { name: 'embeddingScene.tsx', content: EMBEDDING_SCENE_CODE },
  { name: 'cacheFlowScene.tsx', content: CACHE_FLOW_SCENE_CODE },
  { name: 'eventLoopScene.tsx', content: EVENT_LOOP_SCENE_CODE },
  { name: 'bfsScene.tsx', content: MOTION_CANVAS_CODE },
];

for (const scene of scenes) {
  const filePath = path.join(targetDir, scene.name);
  fs.writeFileSync(filePath, scene.content.trim(), 'utf-8');
  console.log(`✓ Generado: ${scene.name}`);
}

console.log('¡Todas las escenas .tsx de Motion Canvas han sido exportadas!');
