import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders the application header', () => {
    render(<App />)
    
    expect(screen.getByRole('heading', { name: 'Nexum' })).toBeInTheDocument()
    expect(screen.getByText('Customer Service & Mechanical Services Management')).toBeInTheDocument()
  })

  it('renders navigation tabs', () => {
    render(<App />)
    
    expect(screen.getByRole('button', { name: 'View customers' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'View mechanical services' })).toBeInTheDocument()
  })

  it('shows customers tab by default', () => {
    render(<App />)
    
    const customersButton = screen.getByRole('button', { name: 'View customers' })
    expect(customersButton).toHaveClass('bg-blue-600')
  })
})