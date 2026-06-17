import { useNavigate, useLocation } from 'react-router-dom'
import { useUIStore } from '@/store/uiStore'
import type { NavTab } from '@/types'

const tabs: Array<{ id: NavTab; icon: string; label: string; path: string }> = [
  { id: 'home', icon: 'home', label: 'Home', path: '/dashboard' },
  { id: 'focus', icon: 'timer', label: 'Focus', path: '/study/session' },
  { id: 'insights', icon: 'query_stats', label: 'Insights', path: '/analytics' },
  { id: 'profile', icon: 'school', label: 'Profile', path: '/settings' },
]

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { activeTab, setActiveTab } = useUIStore()

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.id)
    navigate(tab.path)
  }

  const getActiveTab = () => {
    const path = location.pathname
    if (path.startsWith('/dashboard')) return 'home'
    if (path.startsWith('/study') || path.startsWith('/planner')) return 'focus'
    if (path.startsWith('/analytics') || path.startsWith('/ai')) return 'insights'
    if (path.startsWith('/settings') || path.startsWith('/premium')) return 'profile'
    return activeTab
  }

  const currentTab = getActiveTab()

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-md pb-lg pt-md bg-surface-container/20 backdrop-blur-md border-t border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] rounded-t-xl">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`
              flex flex-col items-center justify-center gap-xs transition-all group
              ${isActive
                ? 'text-secondary drop-shadow-[0_0_8px_rgba(238,193,60,0.4)] scale-110'
                : 'text-on-surface-variant/70 hover:text-primary-fixed'
              }
            `}
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {tab.icon}
            </span>
            <span className="font-label-md text-label-md">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
