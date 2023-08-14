import React from 'react'

// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Analytics Dashboard Component Imports
import AnalyticsProject from 'src/views/dashboards/analytics/AnalyticsProject'
import AnalyticsOrderVisits from 'src/views/dashboards/analytics/AnalyticsOrderVisits'
import AnalyticsTotalEarning from 'src/views/dashboards/analytics/AnalyticsTotalEarning'
import AnalyticsSourceVisits from 'src/views/dashboards/analytics/AnalyticsSourceVisits'
import AnalyticsEarningReports from 'src/views/dashboards/analytics/AnalyticsEarningReports'
import AnalyticsSupportTracker from 'src/views/dashboards/analytics/AnalyticsSupportTracker'
import AnalyticsSalesByCountries from 'src/views/dashboards/analytics/AnalyticsSalesByCountries'
import AnalyticsMonthlyCampaignState from 'src/views/dashboards/analytics/AnalyticsMonthlyCampaignState'
import AnalyticsWebsiteAnalyticsSlider from 'src/views/dashboards/analytics/AnalyticsWebsiteAnalyticsSlider'

// ** CRM Dashboard Component Imports
import CrmSessions from 'src/views/dashboards/crm/CrmSessions'
import CrmRevenueGrowth from 'src/views/dashboards/crm/CrmRevenueGrowth'
import CrmBrowserStates from 'src/views/dashboards/crm/CrmBrowserStates'
import CrmProjectStatus from 'src/views/dashboards/crm/CrmProjectStatus'
import CrmActiveProjects from 'src/views/dashboards/crm/CrmActiveProjects'
import CrmLastTransaction from 'src/views/dashboards/crm/CrmLastTransaction'
import CrmActivityTimeline from 'src/views/dashboards/crm/CrmActivityTimeline'
import CrmSalesWithAreaChart from 'src/views/dashboards/crm/CrmSalesWithAreaChart'
import CrmSalesWithRadarChart from 'src/views/dashboards/crm/CrmSalesWithRadarChart'
import CrmEarningReportsWithTabs from 'src/views/dashboards/crm/CrmEarningReportsWithTabs'

// ** Ecommerce Dashboard Component Imports
import EcommerceProfit from 'src/views/dashboards/ecommerce/EcommerceProfit'
import EcommerceOrders from 'src/views/dashboards/ecommerce/EcommerceOrders'
import EcommerceExpenses from 'src/views/dashboards/ecommerce/EcommerceExpenses'
import EcommerceEarningReports from 'src/views/dashboards/ecommerce/EcommerceEarningReports'
import EcommerceInvoiceTable from 'src/views/dashboards/ecommerce/EcommerceInvoiceTable'
import EcommerceRevenueReport from 'src/views/dashboards/ecommerce/EcommerceRevenueReport'
import EcommerceGeneratedLeads from 'src/views/dashboards/ecommerce/EcommerceGeneratedLeads'
import EcommercePopularProducts from 'src/views/dashboards/ecommerce/EcommercePopularProducts'
import EcommerceCongratulationsJohn from 'src/views/dashboards/ecommerce/EcommerceCongratulationsJohn'
import EcommerceTransactionsVertical from 'src/views/dashboards/ecommerce/EcommerceTransactionsVertical'
import EcommerceTransactionsHorizontal from 'src/views/dashboards/ecommerce/EcommerceTransactionsHorizontal'

// ** Custom Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import CardStatsWithAreaChart from 'src/@core/components/card-statistics/card-stats-with-area-chart'

// ** Import Material Compoents

import { Typography } from '@mui/material'

// ** import Ability from acl
import { useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'

const DropDrag = () => {
  const ability = useContext(AbilityContext)

  return (
    <>
      {/* Analytics Dashlets */}
      <ApexChartWrapper>
        <KeenSliderWrapper>
          <Grid container spacing={6}>
            {ability?.can('read', 'analytics') ? (
              <Grid item xs={12} lg={6}>
                <AnalyticsWebsiteAnalyticsSlider />
              </Grid>
            ) : null}

            {ability?.can('read', 'sales') ? (
              <Grid item xs={12} sm={6} lg={3}>
                <AnalyticsOrderVisits />
              </Grid>
            ) : null}

            {ability?.can('read', 'revenue') ? (
              <Grid item xs={12} sm={6} lg={3}>
                <CardStatsWithAreaChart
                  stats='97.5k'
                  chartColor='success'
                  avatarColor='success'
                  title='Revenue Generated'
                  avatarIcon='tabler:credit-card'
                  chartSeries={[{ data: [6, 35, 25, 61, 32, 84, 70] }]}
                />
              </Grid>
            ) : null}

            {ability?.can('read', 'earning-report') ? (
              <Grid item xs={12} md={6}>
                <AnalyticsEarningReports />
              </Grid>
            ) : null}

            {ability?.can('read', 'support-tracker') ? (
              <Grid item xs={12} md={6}>
                <AnalyticsSupportTracker />
              </Grid>
            ) : null}

            <Grid item xs={12} md={6} lg={4}>
              <AnalyticsSalesByCountries />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AnalyticsTotalEarning />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AnalyticsMonthlyCampaignState />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AnalyticsSourceVisits />
            </Grid>
            <Grid item xs={12} lg={8}>
              <AnalyticsProject />
            </Grid>
          </Grid>
        </KeenSliderWrapper>

        <Typography sx={{ fontSize: '34px', fontWeight: '600', py: '40px', pt: '45px' }}>CRM</Typography>

        <Grid container spacing={6}>
          <Grid item xs={6} sm={4} lg={2}>
            <CrmSalesWithAreaChart />
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CrmSessions />
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CardStatsVertical
              stats='1.28k'
              chipText='-12.2%'
              chipColor='default'
              avatarColor='error'
              title='Total Profit'
              subtitle='Last week'
              avatarIcon='tabler:currency-dollar'
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CardStatsVertical
              stats='24.67k'
              chipText='+25.2%'
              avatarColor='info'
              chipColor='default'
              title='Total Sales'
              subtitle='Last week'
              avatarIcon='tabler:chart-bar'
            />
          </Grid>
          <Grid item xs={12} sm={8} lg={4}>
            <CrmRevenueGrowth />
          </Grid>
          <Grid item xs={12} lg={8}>
            <CrmEarningReportsWithTabs />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CrmSalesWithRadarChart />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CrmBrowserStates />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CrmProjectStatus />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CrmActiveProjects />
          </Grid>
          <Grid item xs={12} md={6}>
            <CrmLastTransaction />
          </Grid>
          <Grid item xs={12} md={6}>
            <CrmActivityTimeline />
          </Grid>
        </Grid>

        <Typography sx={{ fontSize: '34px', fontWeight: '600', py: '40px', pt: '45px' }}>Ecommerce</Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <EcommerceCongratulationsJohn />
          </Grid>
          <Grid item xs={12} md={8}>
            <EcommerceTransactionsHorizontal />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={6}>
              <Grid item xs={6} md={3} lg={6}>
                <EcommerceExpenses />
              </Grid>
              <Grid item xs={6} md={3} lg={6}>
                <EcommerceProfit />
              </Grid>
              <Grid item xs={12} md={6} lg={12}>
                <EcommerceGeneratedLeads />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8}>
            <EcommerceRevenueReport />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <EcommerceEarningReports />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <EcommercePopularProducts />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <EcommerceOrders />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <EcommerceTransactionsVertical />
          </Grid>
          <Grid item xs={12} lg={8}>
            <EcommerceInvoiceTable />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </>
  )
}

DropDrag.acl = {
  action: 'manage',
  subject: 'dashboard'
}

export default DropDrag
