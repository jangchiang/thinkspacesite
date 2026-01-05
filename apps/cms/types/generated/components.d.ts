import type { Schema, Struct } from '@strapi/strapi';

export interface HomepageCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_cta_sections';
  info: {
    description: 'Call to action section content';
    displayName: 'CTA Section';
  };
  attributes: {
    primaryButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact'>;
    primaryButtonText: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    secondaryButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/works'>;
    secondaryButtonText: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface HomepageFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_homepage_feature_items';
  info: {
    description: 'A feature item for Why Choose Us section';
    displayName: 'Feature Item';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    icon: Schema.Attribute.Enumeration<
      [
        'Shield',
        'Clock',
        'Users',
        'Award',
        'Headphones',
        'TrendingUp',
        'CheckCircle',
        'Zap',
        'Target',
        'Heart',
      ]
    > &
      Schema.Attribute.DefaultTo<'CheckCircle'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface HomepageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_hero_sections';
  info: {
    description: 'Homepage hero section content';
    displayName: 'Hero Section';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    ctaButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact'>;
    ctaButtonText: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    secondaryButtonText: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    showPartners: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    titleHighlight: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    trustedByText: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface HomepageWhyChooseUsSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_why_choose_us_sections';
  info: {
    description: 'Why Choose Us section with header and features';
    displayName: 'Why Choose Us Section';
  };
  attributes: {
    features: Schema.Attribute.Component<'homepage.feature-item', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface ServiceFeature extends Struct.ComponentSchema {
  collectionName: 'components_service_features';
  info: {
    description: 'A service feature';
    displayName: 'Feature';
  };
  attributes: {
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface ServiceProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_service_process_steps';
  info: {
    description: 'A service process step with title and description';
    displayName: 'Process Step';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface ServiceTechnology extends Struct.ComponentSchema {
  collectionName: 'components_service_technologies';
  info: {
    description: 'A technology used in the service';
    displayName: 'Technology';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceUseCase extends Struct.ComponentSchema {
  collectionName: 'components_service_use_cases';
  info: {
    description: 'A service use case with title and description';
    displayName: 'Use Case';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedMilestoneItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_milestone_items';
  info: {
    description: 'A milestone event with year and details';
    displayName: 'Milestone Item';
  };
  attributes: {
    detail: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    event: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    year: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedResultItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_result_items';
  info: {
    description: 'A result metric with value and label';
    displayName: 'Result Item';
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_shared_team_members';
  info: {
    description: 'A team member with name, role, and optional photo';
    displayName: 'Team Member';
  };
  attributes: {
    bio: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'>;
    role: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedValueItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_value_items';
  info: {
    description: 'A value item with icon, title, and description';
    displayName: 'Value Item';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    iconName: Schema.Attribute.Enumeration<
      [
        'Target',
        'Award',
        'Users',
        'Globe',
        'Lightbulb',
        'Shield',
        'Rocket',
        'Heart',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Target'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'homepage.cta-section': HomepageCtaSection;
      'homepage.feature-item': HomepageFeatureItem;
      'homepage.hero-section': HomepageHeroSection;
      'homepage.why-choose-us-section': HomepageWhyChooseUsSection;
      'service.feature': ServiceFeature;
      'service.process-step': ServiceProcessStep;
      'service.technology': ServiceTechnology;
      'service.use-case': ServiceUseCase;
      'shared.milestone-item': SharedMilestoneItem;
      'shared.result-item': SharedResultItem;
      'shared.team-member': SharedTeamMember;
      'shared.value-item': SharedValueItem;
    }
  }
}
