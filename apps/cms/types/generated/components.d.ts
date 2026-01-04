import type { Schema, Struct } from '@strapi/strapi';

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
