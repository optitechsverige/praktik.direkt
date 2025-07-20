
"use client"
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';

import { Grid } from "@mui/material";
import BasicPieChart from "@/components/muicharts/piecharts/BasicPieChart";
import TwoLevelPieChart from "@/components/muicharts/piecharts/TwoLevelPieChart";
import StraightAnglePieChart from "@/components/muicharts/piecharts/StraightAnglePieChart";
import TwoSimplePieChart from "@/components/muicharts/piecharts/TwoSimplePieChart";
import PieChartWithCustomizedLabel from "@/components/muicharts/piecharts/PieChartWithCustomizedLabel";
import PieChartWithPaddingAngleChart from "@/components/muicharts/piecharts/PieChartWithPaddingAngleChart";
import PieChartWithCenterLabelChart from "@/components/muicharts/piecharts/PieChartWithCenterLabelChart";
import OnSeriesItemClickChart from "@/components/muicharts/piecharts/OnSeriesItemClickChart";

const BCrumb = [
    {
        to: "/",
        title: "Home",
    },
    {
        title: "PieCharts",
    },
];

const PieCharts = () => {
    return (
        <PageContainer title="PieCharts" description="this is PieCharts ">

            <Breadcrumb title="PieCharts" items={BCrumb} />
            <Grid container spacing={3}>

                <Grid
                    size={{
                        md: 6
                    }}
                >
                    <BasicPieChart />
                </Grid>
                <Grid
                    size={{
                        md: 6
                    }}
                >

                    <TwoLevelPieChart />
                </Grid>

                <Grid
                    size={{
                        md: 6
                    }}
                >
                    <StraightAnglePieChart />
                </Grid>


                <Grid
                    size={{
                        md: 6
                    }}
                >

                    <TwoSimplePieChart />
                </Grid>
                <Grid
                    size={{
                        md: 6
                    }}
                >
                    <PieChartWithCustomizedLabel />
                </Grid>

                <Grid
                    size={{
                        md: 6
                    }}
                >
                    <PieChartWithCenterLabelChart />
                </Grid>

                <Grid
                    size={{
                        md: 6
                    }}
                >
                    <PieChartWithPaddingAngleChart />

                </Grid>


                <Grid
                    size={{
                        md: 6
                    }}
                >
                    <OnSeriesItemClickChart />
                </Grid>



            </Grid>
        </PageContainer>
    );
};

export default PieCharts;
