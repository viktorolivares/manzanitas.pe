import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import {
  Layers,
  Search,
  Maximize2,
  Minimize2,
  Smartphone,
  Columns,
  MonitorPlay,
  Eye,
  EyeOff,
  Code2,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Menu,
  ChevronRight,
  ChevronDown,
  Keyboard,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import {
  CATEGORIES_CONFIG,
  SCENES_REGISTRY,
  getSceneByPath,
  SceneMeta,
} from '../data/scenesRegistry';
import { COMPANY_NAME } from '../config/appConfig';

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Layout states: 'youtube' (Desktop horizontal con código) o 'mobile' (Solo vertical 9:16)
  const [activeTab, setActiveTab] = useState<'youtube' | 'mobile' | 'code'>('youtube');
  const [hideHeader, setHideHeader] = useState(false);
  const [topBarCollapsed, setTopBarCollapsed] = useState(false);

  // Sidebar behavior:
  // - sidebarOpen: false por defecto ("obviar menú lateral"), cuando se oculta ocupa todo (100%)
  // - sidebarCompact: modo íconos compacto
  // - Cuando se abre el menú, reduce el espacio de la aplicación sin taparla ni superponerse
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem('app_sidebar_open');
    return saved !== null ? saved === 'true' : false;
  });
  const [sidebarCompact, setSidebarCompact] = useState<boolean>(() => {
    const saved = localStorage.getItem('app_sidebar_compact');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('app_sidebar_open', String(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('app_sidebar_compact', String(sidebarCompact));
  }, [sidebarCompact]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  // Identify currently active scene based on URL
  const currentScene: SceneMeta = useMemo(() => {
    const scene = getSceneByPath(location.pathname);
    if (scene) return scene;
    // Fallback: match by partial path or default to first SUNAT scene
    const partialMatch = SCENES_REGISTRY.find((s) => location.pathname.includes(s.id));
    return partialMatch || SCENES_REGISTRY[0];
  }, [location.pathname]);

  // Solo se muestra / despliega la categoría activa
  const [expandedCategory, setExpandedCategory] = useState<string>(() => currentScene.category);

  const toggleCategory = (catId: string) => {
    // Solo una categoría abierta a la vez: si hace clic en otra, abre esa y cierra las demás
    setExpandedCategory((prev) => (prev === catId ? '' : catId));
  };

  // Filter scenes based on search query
  const filteredScenes = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    return SCENES_REGISTRY.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.shortTitle.toLowerCase().includes(query) ||
        s.categoryLabel.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Fullscreen toggle helper
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Keyboard shortcut listeners (global)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === '1') {
        setActiveTab('mobile');
      } else if (e.key === '2') {
        setActiveTab('youtube');
      } else if (e.key === '3') {
        setActiveTab('code');
      } else if (e.key.toLowerCase() === 'h') {
        setHideHeader((prev) => !prev);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'b') {
        setSidebarOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'm') {
        setSidebarCompact((prev) => !prev);
      } else if (e.key === '?') {
        setShowShortcutsModal((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  // Auto-expand current active category when route changes (only the active one is open)
  useEffect(() => {
    if (currentScene?.category) {
      setExpandedCategory(currentScene.category);
    }
  }, [currentScene?.category]);

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#c0caf5] flex font-sans selection:bg-[#38bdf8]/30 relative overflow-x-hidden">
      {/* ========================================================================= */}
      {/* FLOATING ACTION BAR IN CLEAN MODE (When Header is Hidden)                 */}
      {/* ========================================================================= */}
      {hideHeader && (
        topBarCollapsed ? (
          /* ESTADO REDUCIDO A UN ÍCONO FLOTANTE SUPERIOR */
          <button
            onClick={() => setTopBarCollapsed(false)}
            className="fixed top-3 right-4 z-50 w-11 h-11 rounded-full bg-[#111827]/90 hover:bg-[#1e293b] backdrop-blur-md border border-[#38bdf8]/50 text-[#38bdf8] shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group animate-in fade-in zoom-in-95 duration-200"
            title="Expandir controles de cabecera y menú (Modo Limpio)"
          >
            <Eye className="w-5 h-5 text-[#38bdf8] group-hover:scale-110 transition-transform" />
          </button>
        ) : (
          /* ESTADO EXPANDIDO CON ACCESOS COMPLETOS */
          <div className="fixed top-3 right-4 z-50 flex items-center gap-2 bg-[#111827]/95 backdrop-blur-md border border-[#374151]/80 p-1.5 rounded-2xl shadow-2xl transition-all animate-in fade-in slide-in-from-top-2">
            {/* Quick Scene Selector */}
            <select
              value={currentScene.path}
              onChange={(e) => navigate(e.target.value)}
              className="bg-[#1f2937] text-xs font-mono font-bold text-[#38bdf8] border border-[#374151] rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              {SCENES_REGISTRY.map((scene) => (
                <option key={scene.id} value={scene.path}>
                  [{scene.categoryLabel.toUpperCase()}] {scene.shortTitle}
                </option>
              ))}
            </select>

            {/* Quick Mode Switch */}
            <div className="flex items-center bg-[#1f2937] rounded-xl p-0.5 border border-[#374151]">
              <button
                onClick={() => setActiveTab('youtube')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'youtube'
                    ? 'bg-[#38bdf8] text-[#0f172a] font-bold shadow'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
                title="Modo YouTube: Desktop Horizontal (Atajo: 2)"
              >
                <MonitorPlay className="w-3.5 h-3.5" />
                <span>YouTube</span>
              </button>
              <button
                onClick={() => setActiveTab('mobile')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'mobile'
                    ? 'bg-[#38bdf8] text-[#0f172a] font-bold shadow'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
                title="Modo Móvil: Solo Celular 9:16 (Atajo: 1)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Móvil</span>
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-[#1f2937] hover:bg-[#374151] text-[#9ca3af] hover:text-white border border-[#374151] transition-all"
              title="Pantalla Completa (Atajo: F)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Restore Header and Sidebar Button */}
            <button
              onClick={() => {
                setHideHeader(false);
                setTopBarCollapsed(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#0f172a] font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#38bdf8]/20 transition-all active:scale-95"
              title="Salir de Modo Limpio y mostrar menú lateral y cabeceras (Atajo: H)"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mostrar Menú</span>
            </button>

            {/* Minimize Top Floating Bar to Icon */}
            <button
              onClick={() => setTopBarCollapsed(true)}
              className="p-2 rounded-xl bg-[#1f2937] hover:bg-[#374151] text-[#9ca3af] hover:text-white border border-[#374151] transition-all"
              title="Reducir a un ícono en la esquina superior derecha"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )
      )}

      {/* ========================================================================= */}
      {/* LEFT SIDEBAR (MENÚ LATERAL - Flujo Flex Responsivo)                       */}
      {/* ========================================================================= */}
      <aside
        id="app-navigation-sidebar"
        className={`sticky top-0 h-screen shrink-0 z-40 flex flex-col bg-[#0d131f] border-r border-[#1f2937]/90 transition-all duration-300 ease-in-out select-none shadow-2xl overflow-hidden ${
          !sidebarOpen || hideHeader
            ? 'w-0 min-w-0 max-w-0 border-r-0 opacity-0 pointer-events-none p-0'
            : sidebarCompact
            ? 'w-16 sm:w-20 min-w-[4rem] sm:min-w-[5rem] max-w-[4rem] sm:max-w-[5rem] opacity-100'
            : 'w-72 sm:w-80 min-w-[18rem] sm:min-w-[20rem] max-w-[18rem] sm:max-w-[20rem] opacity-100'
        }`}
      >
        {/* Brand / Logo Header */}
        {!sidebarCompact ? (
          <div className="h-16 px-4 border-b border-[#1f2937]/80 flex items-center justify-between gap-2 bg-[#0b0f19] shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-tr from-[#10b981] via-[#0284c7] to-[#e11d48] flex items-center justify-center shadow-lg shadow-[#10b981]/25 ring-1 ring-white/15">
                <Layers className="w-5 h-5 text-[#0a0e17] font-black" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-black text-base text-white tracking-wider">
                    {COMPANY_NAME.includes('.') ? (
                      <>
                        {COMPANY_NAME.substring(0, COMPANY_NAME.lastIndexOf('.'))}
                        <span className="text-[#38bdf8]">{COMPANY_NAME.substring(COMPANY_NAME.lastIndexOf('.'))}</span>
                      </>
                    ) : (
                      COMPANY_NAME
                    )}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#64748b] tracking-tight truncate flex items-center gap-1">
                  <span>Motion Canvas</span>
                  <span className="text-[#10b981] font-semibold">• v7.0</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Botón Minimizar a modo compacto */}
              <button
                onClick={() => setSidebarCompact(true)}
                className="p-1.5 rounded-lg text-[#64748b] hover:text-[#38bdf8] hover:bg-[#1f2937]/60 transition-colors"
                title="Minimizar menú a barra de íconos (Atajo: M)"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
              {/* Botón Ocultar menú completo */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg text-[#64748b] hover:text-[#ef4444] hover:bg-[#1f2937]/60 transition-colors"
                title="Ocultar menú lateral (la aplicación ocupará todo el espacio) (Atajo: B)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-16 border-b border-[#1f2937]/80 flex flex-col items-center justify-center bg-[#0b0f19] px-2 shrink-0">
            <button
              onClick={() => setSidebarCompact(false)}
              className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-tr from-[#10b981] via-[#0284c7] to-[#e11d48] flex items-center justify-center shadow-lg shadow-[#10b981]/25 ring-1 ring-white/15 hover:scale-105 transition-transform"
              title="Ampliar menú lateral"
            >
              <Layers className="w-5 h-5 text-[#0a0e17] font-black" />
            </button>
          </div>
        )}

        {/* Action buttons when Compact */}
        {sidebarCompact && (
          <div className="flex items-center justify-center gap-1 py-1.5 border-b border-[#1f2937]/40 shrink-0">
            <button
              onClick={() => setSidebarCompact(false)}
              className="p-1.5 rounded-lg text-[#64748b] hover:text-[#38bdf8] hover:bg-[#1f2937]/80 transition-colors"
              title="Ampliar menú lateral (Atajo: M)"
            >
              <PanelLeftOpen className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-[#64748b] hover:text-[#ef4444] hover:bg-[#1f2937]/80 transition-colors"
              title="Ocultar menú lateral (ocupa 100%) (Atajo: B)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Search Bar (Only shown when not compact) */}
        {!sidebarCompact && (
          <div className="px-3 pt-3 pb-2 border-b border-[#1f2937]/50 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar escenas..."
                className="w-full bg-[#151c2c]/80 text-xs text-white placeholder-[#64748b] pl-9 pr-7 py-2 rounded-xl border border-[#222f46] focus:border-[#38bdf8]/60 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white text-xs"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Sidebar Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 custom-scrollbar">
          {/* SEARCH RESULTS VIEW */}
          {filteredScenes !== null ? (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-mono text-[#94a3b8] uppercase tracking-wider flex items-center justify-between">
                <span>Resultados ({filteredScenes.length})</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[10px] text-[#38bdf8] hover:underline normal-case"
                >
                  Limpiar
                </button>
              </div>
              {filteredScenes.length === 0 ? (
                <div className="px-3 py-6 text-center text-xs text-[#64748b]">
                  No se encontraron escenas para "{searchQuery}"
                </div>
              ) : (
                filteredScenes.map((scene) => {
                  const Icon = scene.icon;
                  return (
                    <NavLink
                      key={scene.id}
                      to={scene.path}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all ${
                          isActive
                            ? 'bg-[#1e293b] text-white font-semibold border-l-4 border-[#38bdf8] shadow-sm shadow-black/40'
                            : 'text-[#94a3b8] hover:text-white hover:bg-[#151c2c]'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0 text-[#38bdf8]" />
                      <div className="truncate">
                        <div className="truncate font-medium">{scene.shortTitle}</div>
                        <div className="text-[10px] text-[#64748b] truncate">
                          {scene.categoryLabel}
                        </div>
                      </div>
                    </NavLink>
                  );
                })
              )}
            </div>
          ) : (
            /* ORGANIZED BY CATEGORIES (SUNAT, FRAUDE, IA DESARROLLO, ALGORITMOS) */
            CATEGORIES_CONFIG.map((category) => {
              const scenes = SCENES_REGISTRY.filter((s) => s.category === category.id);
              const isCurrentRouteCategory = currentScene.category === category.id;
              const isExpanded = expandedCategory === category.id;
              const CatIcon = category.icon;

              return (
                <div key={category.id} className="space-y-1">
                  {/* Category Header (Solo desplegado el activo) */}
                  {!sidebarCompact ? (
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className={`w-full px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider rounded-xl transition-all group cursor-pointer ${
                        isCurrentRouteCategory
                          ? 'text-white bg-[#162032] border border-[#223554] shadow-sm'
                          : 'text-[#94a3b8] hover:text-white hover:bg-[#151c2c]/80 border border-transparent'
                      }`}
                      aria-expanded={isExpanded}
                    >
                      <span className="flex items-center gap-2 font-bold transition-colors">
                        <CatIcon className={`w-4 h-4 ${isCurrentRouteCategory ? 'text-[#38bdf8]' : 'text-[#64748b] group-hover:text-[#94a3b8]'}`} />
                        <span className={isCurrentRouteCategory ? 'text-white font-black' : ''}>
                          {category.name}
                        </span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isCurrentRouteCategory && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#10b981]/15 text-[#10b981] font-semibold border border-[#10b981]/30">
                            ACTIVO
                          </span>
                        )}
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1e293b] text-[#94a3b8] font-semibold group-hover:bg-[#283548] group-hover:text-white transition-colors">
                          {scenes.length}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-[#64748b] group-hover:text-[#38bdf8] transition-transform duration-200 ${
                            isExpanded ? 'rotate-0' : '-rotate-90'
                          }`}
                        />
                      </div>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setSidebarCompact(false);
                        setExpandedCategory(category.id);
                      }}
                      className={`w-full py-2 flex justify-center text-sm rounded-lg transition-colors cursor-pointer ${
                        isCurrentRouteCategory
                          ? 'bg-[#1e293b] text-white ring-1 ring-[#38bdf8]/40'
                          : 'hover:bg-[#151c2c]'
                      }`}
                      title={`${category.name} (${scenes.length}) - Click para ampliar`}
                    >
                      <CatIcon className={`w-4 h-4 ${isCurrentRouteCategory ? 'text-[#38bdf8]' : 'text-[#64748b]'}`} />
                    </button>
                  )}

                  {/* Scenes Under This Category (Solo visible si está desplegado) */}
                  {(!sidebarCompact ? isExpanded : isCurrentRouteCategory) && (
                    <div className="space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-150 pl-0.5">
                      {scenes.map((scene) => {
                        const Icon = scene.icon;

                        return (
                          <NavLink
                            key={scene.id}
                            to={scene.path}
                            title={sidebarCompact ? `${scene.categoryLabel}: ${scene.shortTitle}` : undefined}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
                                isActive
                                  ? 'bg-gradient-to-r from-[#172338] to-[#111927] text-white border-l-4 font-bold shadow-md shadow-[#0284c7]/10'
                                  : 'text-[#94a3b8] hover:text-white hover:bg-[#131b2c]'
                              } ${
                                isActive
                                  ? scene.category === 'sunat'
                                    ? 'border-[#ef4444]'
                                    : scene.category === 'fraude'
                                    ? 'border-[#f43f5e]'
                                    : scene.category === 'ia-desarrollo'
                                    ? 'border-[#a855f7]'
                                    : 'border-[#10b981]'
                                  : 'border-transparent'
                              } ${sidebarCompact ? 'justify-center px-2' : ''}`
                            }
                          >
                            {({ isActive }) => (
                              <>
                                <div
                                  className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${
                                    isActive
                                      ? 'bg-[#1e293b] text-white shadow-sm'
                                      : 'bg-[#111726] text-[#64748b] group-hover:text-[#c0caf5]'
                                  }`}
                                >
                                  <Icon
                                    className="w-4 h-4"
                                    style={{
                                      color: isActive ? scene.colorScheme.accent : undefined,
                                    }}
                                  />
                                </div>

                                {!sidebarCompact && (
                                  <div className="flex-1 truncate">
                                    <div className="text-xs truncate tracking-tight font-medium flex items-center justify-between">
                                      <span className={isActive ? 'text-white' : ''}>
                                        {scene.shortTitle}
                                      </span>
                                      {isActive && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0"></span>
                                      )}
                                    </div>
                                    <div className="text-[10px] text-[#64748b] truncate mt-0.5">
                                      {scene.badge.split('•')[1]?.trim() || scene.badge}
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer with Shortcuts Hint */}
        <div className="p-3 border-t border-[#1f2937]/80 bg-[#0b0f19]/80 shrink-0">
          {!sidebarCompact ? (
            <div className="flex items-center justify-between text-xs text-[#64748b]">
              <button
                onClick={() => setShowShortcutsModal(true)}
                className="flex items-center gap-1.5 hover:text-[#38bdf8] transition-colors py-1 px-2 rounded-lg hover:bg-[#151c2c]"
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono">Atajos de Teclado</span>
              </button>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#151c2c] rounded border border-[#222f46]">
                ?
              </span>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => setShowShortcutsModal(true)}
                className="p-1.5 text-[#64748b] hover:text-[#38bdf8] rounded-lg hover:bg-[#151c2c]"
                title="Atajos de Teclado (?)"
              >
                <Keyboard className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA                                                         */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        {/* Top Header Bar (Hidden in Clean Mode) */}
        {!hideHeader && (
          <header className="border-b border-[#1f2937] bg-[#111827]/95 backdrop-blur-md px-3 sm:px-6 py-2.5 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 shadow-md">
            {/* Left: Universal Sidebar Toggle & Breadcrumbs */}
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Universal Sidebar Toggle Button */}
              <button
                onClick={() => setSidebarOpen((prev) => !prev)}
                className={`p-2 rounded-xl transition-all flex items-center gap-2 text-xs font-mono font-medium border shrink-0 ${
                  sidebarOpen
                    ? 'bg-[#1e293b] text-[#38bdf8] border-[#38bdf8]/40 shadow-sm'
                    : 'bg-[#151c2c] text-[#94a3b8] hover:text-white hover:bg-[#1e293b] border-[#222f46]'
                }`}
                title={sidebarOpen ? 'Ocultar menú lateral (ocupa 100% de la pantalla) (Atajo: B)' : 'Mostrar menú lateral (reduce la pantalla) (Atajo: B)'}
                aria-label={sidebarOpen ? 'Ocultar Menú Lateral' : 'Mostrar Menú Lateral'}
              >
                {sidebarOpen ? (
                  <PanelLeftClose className="w-4 h-4 text-[#38bdf8]" />
                ) : (
                  <PanelLeftOpen className="w-4 h-4 text-[#38bdf8]" />
                )}
                <span className="hidden sm:inline">
                  {sidebarOpen ? 'Ocultar Menú' : 'Menú'}
                </span>
              </button>

              {/* Minimize/Expand Toggle when Sidebar is open */}
              {sidebarOpen && (
                <button
                  onClick={() => setSidebarCompact((prev) => !prev)}
                  className="hidden md:flex p-2 rounded-xl bg-[#151c2c] hover:bg-[#1e293b] text-[#94a3b8] hover:text-white border border-[#222f46] text-xs transition-colors items-center gap-1.5 shrink-0"
                  title={sidebarCompact ? 'Ampliar menú lateral a ancho completo (Atajo: M)' : 'Minimizar menú lateral a barra de íconos (Atajo: M)'}
                >
                  {sidebarCompact ? (
                    <Maximize2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                  ) : (
                    <Minimize2 className="w-3.5 h-3.5 text-[#94a3b8]" />
                  )}
                  <span className="text-[11px] font-mono">
                    {sidebarCompact ? 'Ampliar' : 'Minimizar'}
                  </span>
                </button>
              )}

              {/* Breadcrumbs & Active Scene Info */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#64748b] uppercase tracking-wider font-semibold">
                    {currentScene.categoryLabel}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#475569]" />
                  <span className="text-white font-bold truncate">
                    {currentScene.shortTitle}
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono rounded-md bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 font-medium ml-1 shrink-0">
                    {currentScene.badge}
                  </span>
                </div>
                <p className="text-xs text-[#64748b] truncate hidden md:block max-w-xl">
                  {currentScene.description}
                </p>
              </div>
            </div>

            {/* Right: View Tabs & Controls */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Mode Switcher Tabs */}
              <div className="flex items-center bg-[#16161e] p-1 rounded-xl border border-[#414868]/40 text-xs">
                <button
                  onClick={() => setActiveTab('youtube')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'youtube'
                      ? 'bg-[#38bdf8] text-[#0f172a] font-bold shadow'
                      : 'text-[#565f89] hover:text-[#c0caf5]'
                  }`}
                  title="Modo YouTube (Desktop/Horizontal): Divide la pantalla en dos columnas (preview móvil a la izquierda y código a la derecha) (Atajo: 2)"
                >
                  <MonitorPlay className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Modo YouTube</span>
                  <span className="sm:hidden">YouTube</span>
                </button>

                <button
                  onClick={() => setActiveTab('mobile')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'mobile'
                      ? 'bg-[#38bdf8] text-[#0f172a] font-bold shadow'
                      : 'text-[#565f89] hover:text-[#c0caf5]'
                  }`}
                  title="Modo Móvil (Vertical): Muestra únicamente la vista previa móvil centrada (Atajo: 1)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Modo Móvil</span>
                  <span className="sm:hidden">Móvil</span>
                </button>

                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'code'
                      ? 'bg-[#38bdf8] text-[#0f172a] font-bold shadow'
                      : 'text-[#565f89] hover:text-[#c0caf5]'
                  }`}
                  title="Código Motion Canvas TypeScript (Atajo: 3)"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Código TS</span>
                  <span className="md:hidden">TS</span>
                </button>
              </div>

              {/* Clean View Button (Hide Sidebar and Headers for clean recording) */}
              <button
                onClick={() => setHideHeader(true)}
                className="px-2.5 py-1.5 rounded-xl bg-[#16161e] hover:bg-[#24283b] border border-[#414868]/40 hover:border-[#38bdf8]/50 text-[#94a3b8] hover:text-[#38bdf8] transition-all flex items-center gap-1.5 text-xs"
                title="Modo Limpio: Oculta completamente el menú lateral y las cabeceras para grabar pantalla limpia (Atajo: Tecla H)"
              >
                <EyeOff className="w-4 h-4 text-[#38bdf8]" />
                <span className="hidden xl:inline font-medium">Modo Limpio</span>
                <kbd className="hidden sm:inline text-[10px] font-mono bg-[#24283b] px-1 py-0.2 rounded border border-[#414868]/40">
                  H
                </kbd>
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-[#16161e] hover:bg-[#24283b] border border-[#414868]/40 text-[#565f89] hover:text-white transition-all"
                title="Pantalla Completa (Atajo: F)"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </header>
        )}

        {/* Page Content Rendered Here */}
        <main className="flex-1 p-3 sm:p-5 flex flex-col max-w-[1700px] w-full mx-auto">
          <Outlet
            context={{
              activeTab,
              setActiveTab,
              hideHeader,
              setHideHeader,
              toggleFullscreen,
              sidebarOpen,
              setSidebarOpen,
              sidebarCompact,
              setSidebarCompact,
              sidebarCollapsed: !sidebarOpen || sidebarCompact,
            }}
          />
        </main>
      </div>

      {/* ========================================================================= */}
      {/* KEYBOARD SHORTCUTS MODAL                                                 */}
      {/* ========================================================================= */}
      {showShortcutsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#111827] border border-[#374151] rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2937]">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Keyboard className="w-5 h-5 text-[#38bdf8]" />
                <span>Atajos de Teclado</span>
              </div>
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="p-1 rounded-lg text-[#9ca3af] hover:text-white hover:bg-[#1f2937]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#1f2937]/50">
                <span className="text-[#94a3b8]">Reproducir / Pausar escena</span>
                <kbd className="px-2 py-1 bg-[#111827] border border-[#374151] rounded text-[#38bdf8] font-bold">
                  Espacio
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#1f2937]/50">
                <span className="text-[#94a3b8]">Paso anterior / siguiente</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-[#111827] border border-[#374151] rounded text-[#38bdf8] flex items-center justify-center">
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </kbd>
                  <kbd className="px-2 py-1 bg-[#111827] border border-[#374151] rounded text-[#38bdf8] flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#1f2937]/50">
                <span className="text-[#94a3b8]">Modo Móvil (Vertical 9:16)</span>
                <kbd className="px-2 py-1 bg-[#111827] border border-[#374151] rounded text-[#38bdf8] font-bold">
                  1
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#1f2937]/50">
                <span className="text-[#94a3b8]">Modo YouTube (Desktop Horizontal con Código)</span>
                <kbd className="px-2 py-1 bg-[#111827] border border-[#374151] rounded text-[#38bdf8] font-bold">
                  2
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#1f2937]/50">
                <span className="text-[#94a3b8]">Vista Código Motion Canvas TS</span>
                <kbd className="px-2 py-1 bg-[#111827] border border-[#374151] rounded text-[#38bdf8] font-bold">
                  3
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#1f2937]/50">
                <span className="text-[#94a3b8]">Modo Limpio (Oculta menú lateral y cabeceras)</span>
                <kbd className="px-2 py-1 bg-[#111827] border border-[#374151] rounded text-[#38bdf8] font-bold">
                  H
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#1f2937]/50">
                <span className="text-[#94a3b8]">Mostrar / Ocultar Menú Lateral</span>
                <kbd className="px-2 py-1 bg-[#111827] border border-[#374151] rounded text-[#38bdf8] font-bold">
                  B
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#1f2937]/50">
                <span className="text-[#94a3b8]">Minimizar / Ampliar Menú Lateral</span>
                <kbd className="px-2 py-1 bg-[#111827] border border-[#374151] rounded text-[#38bdf8] font-bold">
                  M
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#1f2937]/50">
                <span className="text-[#94a3b8]">Pantalla Completa</span>
                <kbd className="px-2 py-1 bg-[#111827] border border-[#374151] rounded text-[#38bdf8] font-bold">
                  F
                </kbd>
              </div>
            </div>

            <button
              onClick={() => setShowShortcutsModal(false)}
              className="w-full py-2 bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#0f172a] font-bold rounded-xl text-xs transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
