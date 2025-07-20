// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';
import ProfileBanner from '@/components/apps/userprofile/profile/ProfileBanner';
import FollowerCard from '@/components/apps/userprofile/followers/FollowerCard';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import { UserDataProvider } from "@/context/UserDataContext/index";

const Followers = () => {

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Followers',
    },
  ]
  return (

    <UserDataProvider>
      <PageContainer title="User Profile" description="this is User Profile page">
        <Breadcrumb title="User App" items={BCrumb} />


        <Grid container spacing={3}>
          <Grid
            size={{
              sm: 12
            }}>
            <ProfileBanner />
          </Grid>
          <Grid
            size={{
              sm: 12
            }}>
            <FollowerCard />
          </Grid>
        </Grid>
      </PageContainer>
    </UserDataProvider>
  );
};

export default Followers;
