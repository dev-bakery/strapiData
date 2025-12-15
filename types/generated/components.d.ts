import type { Schema, Struct } from '@strapi/strapi';

export interface LmosProduct extends Struct.ComponentSchema {
  collectionName: 'components_lmos_products';
  info: {
    displayName: 'product';
  };
  attributes: {
    lmoString: Schema.Attribute.String;
    lmoType: Schema.Attribute.String;
  };
}

export interface ReviewPointProduct extends Struct.ComponentSchema {
  collectionName: 'components_review_point_products';
  info: {
    displayName: 'product';
  };
  attributes: {
    reviewCount: Schema.Attribute.Integer;
    starPoint: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'lmos.product': LmosProduct;
      'review-point.product': ReviewPointProduct;
    }
  }
}
