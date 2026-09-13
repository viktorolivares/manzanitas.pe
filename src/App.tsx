import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { AppLayout } from './layouts/AppLayout';
import { ScenePlayerView } from './components/ScenePlayerView';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Default route */}
        <Route index element={<Navigate to="/sunat/error-2119" replace />} />

        {/* 1. SECCIÓN SUNAT */}
        <Route
          path="/sunat/error-2119"
          element={<ScenePlayerView sceneId="error_2119" />}
        />
        <Route
          path="/sunat/facturacion"
          element={<ScenePlayerView sceneId="facturacion" />}
        />
        <Route
          path="/sunat/pse-ose"
          element={<ScenePlayerView sceneId="pse_ose" />}
        />

        {/* 2. SECCIÓN FRAUDE */}
        <Route
          path="/fraude/grafos"
          element={<ScenePlayerView sceneId="fraud" />}
        />

        {/* 3. SECCIÓN IA DESARROLLO */}
        <Route
          path="/ia-desarrollo/embeddings"
          element={<ScenePlayerView sceneId="embedding" />}
        />

        {/* 4. SECCIÓN ALGORITMOS */}
        <Route
          path="/algoritmos/maps"
          element={<ScenePlayerView sceneId="maps" />}
        />
        <Route
          path="/algoritmos/cacheflow"
          element={<ScenePlayerView sceneId="cacheflow" />}
        />
        <Route
          path="/algoritmos/eventloop"
          element={<ScenePlayerView sceneId="eventloop" />}
        />
        <Route
          path="/algoritmos/bfs"
          element={<ScenePlayerView sceneId="bfs" />}
        />

        {/* Rutas de compatibilidad histórica / atajos directos */}
        <Route path="/error_2119" element={<Navigate to="/sunat/error-2119" replace />} />
        <Route path="/facturacion" element={<Navigate to="/sunat/facturacion" replace />} />
        <Route path="/pse_ose" element={<Navigate to="/sunat/pse-ose" replace />} />
        <Route path="/fraud" element={<Navigate to="/fraude/grafos" replace />} />
        <Route path="/embedding" element={<Navigate to="/ia-desarrollo/embeddings" replace />} />
        <Route path="/maps" element={<Navigate to="/algoritmos/maps" replace />} />
        <Route path="/cacheflow" element={<Navigate to="/algoritmos/cacheflow" replace />} />
        <Route path="/eventloop" element={<Navigate to="/algoritmos/eventloop" replace />} />
        <Route path="/bfs" element={<Navigate to="/algoritmos/bfs" replace />} />

        {/* Fallback 404 */}
        <Route path="*" element={<Navigate to="/sunat/error-2119" replace />} />
      </Route>
    </Routes>
  );
}
