import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import { Grid } from "@mui/material";
import SimpleAreaChart from "@/components/muicharts/linescharts/areacharts/SimpleAreaChart";
import StackedAreaChart from "@/components/muicharts/linescharts/areacharts/StackedAreaChart";
import TinyAreaChart from "@/components/muicharts/linescharts/areacharts/TinyAreaChart";
import PercentAreaChart from "@/components/muicharts/linescharts/areacharts/PercentAreaChart";
import AreaChartConnectNulls from "@/components/muicharts/linescharts/areacharts/AreaChartConnectNullsChart";
import AreaChartFillByValueChart from "@/components/muicharts/linescharts/areacharts/AreaChartFillByValueChart";
const BCrumb = [
    {
        to: "/",
        title: "Home",
    },
    {
        title: " Area Charts",
    },
];

const AreaCharts = () => {
    return (
        <PageContainer title=" Area Charts" description="this is  Area Chart">
            <Breadcrumb title=" Area  Charts" items={BCrumb} />
            <Grid container spacing={3}>

                <SimpleAreaChart />


                <StackedAreaChart />


                <TinyAreaChart />


                <PercentAreaChart />


                <AreaChartConnectNulls />


                <AreaChartFillByValueChart />



            </Grid>
        </PageContainer>
    );
};

export default AreaCharts;
