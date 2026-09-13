import {makeProject} from '@motion-canvas/core';

import error2119Scene from './scenes/error2119Scene?scene';
import pseOseScene from './scenes/pseOseScene?scene';
import facturacionSunatScene from './scenes/facturacionSunatScene?scene';
import fraudDetectionScene from './scenes/fraudDetectionScene?scene';
import googleMapsAStarScene from './scenes/googleMapsAStarScene?scene';
import embeddingScene from './scenes/embeddingScene?scene';
import cacheFlowScene from './scenes/cacheFlowScene?scene';
import eventLoopScene from './scenes/eventLoopScene?scene';
import bfsScene from './scenes/bfsScene?scene';

export default makeProject({
  scenes: [
    error2119Scene,
    pseOseScene,
    facturacionSunatScene,
    fraudDetectionScene,
    googleMapsAStarScene,
    embeddingScene,
    cacheFlowScene,
    eventLoopScene,
    bfsScene,
  ],
});
