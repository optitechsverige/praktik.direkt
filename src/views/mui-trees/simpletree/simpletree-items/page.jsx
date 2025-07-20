

import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import { Grid } from "@mui/material";
import BasicSimpleTreeView from "@/components/muitrees/simpletree/BasicSimpleTreeView";
import TrackitemclicksTree from "@/components/muitrees/simpletree/TrackitemclicksTree";

const BCrumb = [
    {
        to: "/",
        title: "Home",
    },
    {
        title: "Simple Treeview ",
    },
];

const SimpleTreeView = () => {
    return (
        <PageContainer title="Simple Treeview" description="this is Simple Treeview ">
            <Breadcrumb title="Simple Treeview" items={BCrumb} />
            <Grid container spacing={3}>

                <BasicSimpleTreeView />

                <TrackitemclicksTree />

            </Grid>
        </PageContainer>
    );
};

export default SimpleTreeView;
