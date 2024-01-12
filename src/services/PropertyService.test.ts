import PropertyService from '@/services/PropertyService';

describe('PropertyService', () => {
  it('getProperties returns an array of properties', async () => {
    const propertyService = new PropertyService();

    const properties = await propertyService.getProperties();

    expect(Array.isArray(properties)).toBe(true);
    properties.forEach(property => {
      expect(property).toHaveProperty('id');
      expect(property).toHaveProperty('name');
      expect(property).toHaveProperty('description');
      expect(property).toHaveProperty('price');
    });
  });

  it('getPropertyById returns a property with a specific id', async () => {
    const propertyService = new PropertyService();
    const id = 1;

    const property = await propertyService.getPropertyById(id);

    expect(property).toHaveProperty('id', id);
    expect(property).toHaveProperty('name', 'Sunset Villa');
    expect(property).toHaveProperty(
      'description',
      'Luxurious villa with private pool and breathtaking sunset views.',
    );
    expect(property).toHaveProperty('price', 180);
  });
});
