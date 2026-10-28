import { describe, expect, it } from 'vitest'

import {
  findCssClasses,
  findForeignClasses,
  findTemplateClasses,
  splitVueFile,
} from './css-classes.mjs'

describe('findCssClasses', () => {
  it('берёт классы из селекторов, включая :deep и составные', () => {
    const css = `.mv-a, .mv-b:hover > .mv-b__c { color: red; }
      .mv-x :deep(.mv-y) { margin: 0; }`

    expect(findCssClasses(css)).toEqual(['mv-a', 'mv-b', 'mv-b__c', 'mv-x', 'mv-y'])
  })

  it('не путает с классами точки в значениях, атрибутах и комментариях', () => {
    const css = `/* .comment */
      @font-face { src: url(./fonts/manrope.woff2); }
      .mv-a { transform: scale(0.97); }
      a[href$='.pdf'] { color: red; }
      @keyframes mv-spin { 33.3% { opacity: 1; } }`

    expect(findCssClasses(css)).toEqual(['mv-a'])
  })

  it('во вложенном правиле не захватывает объявления родителя', () => {
    const css = `.mv-a { background: url(./x.png); @starting-style { opacity: 0; } .mv-a__b { top: 0; } }`

    expect(findCssClasses(css)).toEqual(['mv-a', 'mv-a__b'])
  })
})

describe('findTemplateClasses', () => {
  it('разбирает статические class, пропуская :class', () => {
    const template = `<div class="mv-a  mv-a--x"><span :class="dynamic" class="row" /></div>`

    expect(findTemplateClasses(template)).toEqual(['mv-a', 'mv-a--x', 'row'])
  })
})

describe('splitVueFile', () => {
  it('отдаёт шаблон и встроенные стили, пропуская style src', () => {
    const source = `<script setup lang="ts"></script>
<template><div class="mv-a" /></template>
<style scoped src="./control.css"></style>
<style scoped>.mv-a { color: red; }</style>`

    const { template, styles } = splitVueFile(source)

    expect(template).toContain('class="mv-a"')
    expect(styles).toEqual(['.mv-a { color: red; }'])
  })
})

describe('findForeignClasses', () => {
  it('возвращает классы без префикса без повторов', () => {
    expect(findForeignClasses(['mv-a', 'row', 'is-open', 'row'])).toEqual(['row', 'is-open'])
  })
})
