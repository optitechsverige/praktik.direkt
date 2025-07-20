
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import { Grid } from "@mui/material";
import MultiSelectTreeView from "@/components/muitrees/simpletree/MultiSelectTreeView";
import CheckboxSelection from "@/components/muitrees/simpletree/CheckboxSelection";
import ControlledSelectiontree from "@/components/muitrees/simpletree/ControlledSelectiontree";

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

                <MultiSelectTreeView />


                <CheckboxSelection />


                <ControlledSelectiontree />


            </Grid>
        </PageContainer>
    );
};

export default SimpleTreeView;
