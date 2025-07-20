

import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';


import { Grid } from "@mui/material";
import ControlledExpansionTree from "@/components/muitrees/simpletree/ControlledExpansionTree";
import ApiMethodSetItemExpansion from "@/components/muitrees/simpletree/ApiMethodSetItemExpansion";
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

                <ControlledExpansionTree />


                <ApiMethodSetItemExpansion />

            </Grid>
        </PageContainer>
    );
};

export default SimpleTreeView;
