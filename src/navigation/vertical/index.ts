// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  // ** filter school setup sub category

  return [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'tabler:smart-home',
      action: 'read',
      subject: 'dashboardNavItem'
    },
    {
      sectionTitle: 'Apps & Pages'
    },
    {
      title: 'Chat',
      icon: 'tabler:messages',
      path: '/apps/chat',
      action: 'read',
      subject: 'chatNavItem'
    },
    {
      title: 'User',
      icon: 'tabler:user',
      children: [
        {
          title: 'View',
          children: [
            {
              title: 'Account',
              path: '/apps/user/view/account',
              action: 'read',
              subject: 'accountNavItem'
            }
          ]
        }
      ]
    },

    // ** Module

    {
      sectionTitle: 'Modules'
    },

    {
      // ** Stystem Admin Module

      title: 'System Admin',
      icon: 'tabler:category',
      children: [
        // ** School Setup Menus - Sub Menu Of Modules
        {
          title: 'School Setup',

          children: [
            {
              title: 'School Details',
              path: '/module/school-details',
              action: 'read',
              subject: 'school-details-navitem'
            },
            {
              title: 'Manage Program',
              path: '/module/manage-program',
              action: 'read',
              subject: 'manage-program'
            },
            {
              title: 'Manage Grades',
              path: '/module/manage-grades'
            },
            {
              title: 'Manage Sections',
              path: '/module/manage-sections'
            },
            {
              title: 'Manage Subjects',
              path: '/module/manage-subjects'
            },
            {
              title: 'Manage Departments',
              path: '/module/manage-departments'
            },
            {
              title: 'Manage Wings',
              path: '/module/manage-wings'
            },
            {
              title: 'Manage Coordinations',
              path: '/module/manage-coordinations'
            }
          ]
        },

        // ** System Setup Menus - Sub Menu Of Modules
        {
          title: 'System Setup',
          children: [
            {
              title: 'System Setup',
              path: '/module/system-setup'
            }
          ]
        },

        // ** Server Setup Menus - Sub Menu Of Modules
        {
          title: 'Server Setup',
          children: [
            {
              title: 'System Setup',
              path: '/module/system-setup'
            }
          ]
        },

        // ** Users and Roles Menus - Sub Menu Of Modules
        {
          title: 'Users & Roles',
          children: [
            {
              title: 'System Setup',
              path: '/module/system-setup'
            }
          ]
        },

        // ** Manage Online Payments Menus - Sub Menu Of Modules
        {
          title: 'Manage Online Payments',
          children: [
            {
              title: 'System Setup',
              path: '/module/system-setup'
            }
          ]
        },

        // ** Calendar Management Menus - Sub Menu Of Modules
        {
          title: 'Calendar Management',
          children: [
            {
              title: 'System Setup',
              path: '/module/system-setup'
            }
          ]
        },

        // ** System Reports Menus - Sub Menu Of Modules
        {
          title: 'System Reports',
          children: [
            {
              title: 'System Setup',
              path: '/module/system-setup'
            }
          ]
        },

        // ** Export Menus - Sub Menu Of Modules
        {
          title: 'Export',
          children: [
            {
              title: 'System Setup',
              path: '/module/system-setup'
            }
          ]
        }
      ]
    }
  ]
}

export default navigation
