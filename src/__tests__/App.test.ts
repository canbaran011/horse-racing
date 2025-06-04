import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue', () => {
  it('renders the game title', () => {
    const wrapper = mount(App)
    expect(wrapper.find('h1').text()).toBe('Horse Racing Game')
  })

  it('renders the Generate Program button', () => {
    const wrapper = mount(App)
    const generateButton = wrapper.find('button')
    expect(generateButton.exists()).toBe(true)
    expect(generateButton.text().toLowerCase()).toContain('generate')
  })

  it('renders the Start/Pause button', () => {
    const wrapper = mount(App)
    const buttons = wrapper.findAll('button')
    // There should be at least two buttons
    expect(buttons.length).toBeGreaterThanOrEqual(2)
    // The second button should contain Start or Pause
    const startPauseText = buttons[1].text().toLowerCase()
    expect(startPauseText.includes('start') || startPauseText.includes('pause')).toBe(true)
  })

  it('renders the HorseList component', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent({ name: 'HorseList' }).exists()).toBe(true)
  })

  it('renders the RaceTrack component', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent({ name: 'RaceTrack' }).exists()).toBe(true)
  })

  it('renders the RaceTables component', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent({ name: 'RaceTables' }).exists()).toBe(true)
  })
}) 