import { render, screen, } from '@testing-react/library';
import App from './App';

test('show 6 products', async () => {
  render(<App />);

  const headings = await screen.findAllByRole('heading');
  expect(headings).toHaveLength(6);


});