import { Property } from '@/types';

const endpoint = 'src/mocks/properties.json';

class PropertyService {
  public getProperties(): Promise<Property[]> {
    return fetch(endpoint)
      .then(response => response.json())
      .then(data => data);
  }

  public getPropertyById(id: number): Promise<Property> {
    return fetch(endpoint)
      .then(response => response.json())
      .then(data => data.find((p: Property) => p.id === id));
  }
}

export default PropertyService;
