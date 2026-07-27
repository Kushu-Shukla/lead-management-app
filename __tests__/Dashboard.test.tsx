import { render, screen } from '@testing-library/react'
import Dashboard from '@/app/dashboard/page'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

jest.mock('next-auth/react')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Authenticated Dashboard', () => {
  it('redirects unauthenticated users', () => {
    const pushMock = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push: pushMock })
    ;(useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' })
    
    render(<Dashboard />)
    
    expect(pushMock).toHaveBeenCalledWith('/login')
  })

  it('renders dashboard for authenticated users', () => {
    ;(useSession as jest.Mock).mockReturnValue({ 
      data: { user: { name: 'Admin', role: 'ADMIN' } }, 
      status: 'authenticated' 
    })
    
    render(<Dashboard />)
    expect(screen.getByText(/Lead Dashboard/i)).toBeInTheDocument()
    expect(screen.getByText(/Logged in as Admin/i)).toBeInTheDocument()
  })
})
