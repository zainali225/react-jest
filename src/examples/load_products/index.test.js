import { render, screen, waitFor, } from '@testing-library/react';
import App from './index';
import user from '@testing-library/user-event';

test('show 6 products', async () => {
  render(<App />);

  const headings = await screen.findAllByRole("heading");
  expect(headings).toHaveLength(6);


});

test("load more 6 product", async () => {

  render(<App />);

  const btn = await screen.findByRole("button", {
    name: /load more/i
  })

  await user.click(btn);

  await waitFor(async () => {

    const headings = await screen.findAllByRole("heading");
    expect(headings).toHaveLength(12);

  })

})
