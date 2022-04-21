import Grid from '@mui/material/Grid'
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Table from 'src/@core/components/dashboard/Table'
import Trophy from 'src/@core/components/dashboard/Trophy'
import TotalEarning from 'src/@core/components/dashboard/TotalEarning'
import StatisticsCard from 'src/@core/components/dashboard/StatisticsCard'
import WeeklyOverview from 'src/@core/components/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/@core/components/dashboard/DepositWithdraw'
import SalesByCountries from 'src/@core/components/dashboard/SalesByCountries'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
