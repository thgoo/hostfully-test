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
});
