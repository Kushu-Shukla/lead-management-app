import { render, screen } from '@testing-library/react'
import CaptureForm from '@/app/page'


global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: { id: "1" } }),
  })
) as jest.Mock;

describe('Public Capture Form', () => {
  it('renders a heading', () => {
    render(<CaptureForm />)
    const heading = screen.getByRole('heading', { name: /Interested in our services/i })
    expect(heading).toBeInTheDocument()
  })
  
  it('has required name and email fields', () => {
    render(<CaptureForm />)
    expect(screen.getByLabelText(/Full Name/i)).toBeRequired()
    expect(screen.getByLabelText(/Email Address/i)).toBeRequired()
  })
})
