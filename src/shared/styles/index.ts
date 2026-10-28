/**
 * Глобальные стили приложения. Подключаются один раз из `app/main.ts`.
 *
 * Порядок важен: шрифт → токены → база (использует токены) → движение (переопределяет токены
 * длительностей при `prefers-reduced-motion`).
 */
import './fonts.css'
import './tokens.css'
import './base.css'
import './motion.css'
