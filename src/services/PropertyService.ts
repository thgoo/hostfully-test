import { Property } from '@/types';
import properties from '@/mocks/properties.json';

class PropertyService {
  public getProperties(): Promise<Property[]> {
    return new Promise<Property[]>(resolve => {
      setTimeout(() => {
        resolve(properties);
      });
    });
  }
}

export default PropertyService;
