import PropertyList from '@/components/PropertyList/PropertyList';
import Page from '@/components/Page/Page';
import DateRange from '@/components/DateRange/DateRange';

const HomePage = () => {
  return (
    <Page>
      <div className="mb-4">
        <DateRange />
      </div>
      <PropertyList />
    </Page>
  );
};

export default HomePage;
