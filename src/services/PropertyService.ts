import { Property } from '@/types';
import properties from '@/mocks/properties.json';

class PropertyService {
  public getProperties(): Promise<Property[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(properties);
      });
    });
  }

  public getPropertyById(id: number): Promise<Property> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(properties.find((p: Property) => p.id === id) as Property);
      });
    });
  }
}

export default PropertyService;
