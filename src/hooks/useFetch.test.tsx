import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import useFetch from './useFetch';

// Mock component that uses the hook
describe('useFetch', () => {
  function MockComponent({ fetchFunc }: { fetchFunc: () => Promise<string> }) {
    const { data, error, isLoading } = useFetch(fetchFunc);

    if (isLoading) return <div>loading</div>;
    if (error) return <div>{error.message}</div>;
    return <div>{data}</div>;
  }

  it('returns data after async function resolves', async () => {
    const fetchFunc = () =>
      new Promise<string>(resolve =>
        setTimeout(() => resolve('test data'), Math.random() * 50 + 50),
      );
    render(<MockComponent fetchFunc={fetchFunc} />);

    expect(await screen.findByText('loading')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText('loading'));

    expect(await screen.findByText('test data')).toBeInTheDocument();
  });

  it('returns error if async function rejects', async () => {
    const error = new Error('test error');
    const fetchFunc = () => Promise.reject(error);
    render(<MockComponent fetchFunc={fetchFunc} />);
    expect(await screen.findByText(error.message)).toBeInTheDocument();
  });
});
