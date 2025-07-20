import React from 'react';
import { Grid } from '@mui/material';

import PageContainer from '@/components/container/PageContainer';

import WeeklyStats from '@/components/dashboards/modern/WeeklyStats';
import YearlySales from '@/components/dashboards/ecommerce/YearlySales';
import PaymentGateways from '@/components/dashboards/ecommerce/PaymentGateways';
import WelcomeCard from '@/components/dashboards/ecommerce/WelcomeCard';
import Expence from '@/components/dashboards/ecommerce/Expence';
import Growth from '@/components/dashboards/ecommerce/Growth';
import RevenueUpdates from '@/components/dashboards/ecommerce/RevenueUpdates';
import SalesOverview from '@/components/dashboards/ecommerce/SalesOverview';
import SalesTwo from '@/components/dashboards/ecommerce/SalesTwo';
import Sales from '@/components/dashboards/ecommerce/Sales';
import MonthlyEarnings from '@/components/dashboards/ecommerce/MonthlyEarnings';
import ProductPerformances from '@/components/dashboards/ecommerce/ProductPerformances';
import RecentTransactions from '@/components/dashboards/ecommerce/RecentTransactions';

const Ecommerce = () => {
  return (
    <PageContainer title="eCommerce Dashboard" description="this is eCommerce Dashboard page">
      <Grid container spacing={3}>
        {/* column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <WelcomeCard />
        </Grid>

        {/* column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Grid spacing={3} container columns={{ xs: 12, sm: 6 }}>
            <Grid size={{ xs: 12, md: 6, lg: 'grow' }}>
              <Expence />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 'grow' }}>
              <Sales />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <RevenueUpdates />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <SalesOverview />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Grid container spacing={3} columns={{ xs: 12, sm: 6 }}>
            <Grid size={{ xs: 12, md: 6, lg: 'grow' }}>
              <SalesTwo />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 'grow' }}>
              <Growth />
            </Grid>
            <Grid size={12}>
              <MonthlyEarnings />
            </Grid>
          </Grid>
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <WeeklyStats />
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <YearlySales />
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <PaymentGateways />
        </Grid>
        {/* column */}

        <Grid size={{ xs: 12, lg: 4 }}>
          <RecentTransactions />
        </Grid>
        {/* column */}

        <Grid size={{ xs: 12, lg: 8 }}>
          <ProductPerformances />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Ecommerce;
