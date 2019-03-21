export const OVERRIDEABLE_ACTIONS = {
  businesses: [
    'open_business',
    'subscribe',
  ],
  lab: [
    'lab_create',
    'lab_results_received',
    'lab_sign_up_button',
    'lab_login_button',
  ],
  add: [
    'business_created',
  ],
  edit: [
    'business_additional_info_updated',
    'business_address_updated',
    'business_contact_updated',
    'business_description_updated',
    'business_open_hours_updated',
  ],
  other: [
    'error',
    'no_eligible_business_click',
    'no_business_click',
    'pm_view_go_to_edit_click',
    'pm_view_go_to_partner_connection_click',
  ],
  partnerConnections: [],
  presenceManagement: [],
  reviewManagement: [],
};

export const PAGES = {
  businesses: 'Business List',
  add: 'Add a business',
  partnerConnections: 'Partner Connection',
  presenceManagement: 'Presence Management',
  reviewManagement: 'Review Management',
  lab: 'Lab',
};