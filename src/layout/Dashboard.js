import * as React from "react";
import { Card, CardHeader } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import "./dashboard.css";
const Dashboard = () => (
  <Card>
    <CardHeader title="Welcome to the administration" />
    <CardContent>Welcome to Admin Dashboard .....</CardContent>
    <div class="Grid__Container">
      <div class="Stat__Card_1 Stat__Card">
        <div class="Stat__Container">
          <div class="Stat__Title">Clicks</div>
          <div class="Stat__Content">2,398</div>
        </div>
      </div>
      <div class="Stat__Card_2 Stat__Card">
        <div class="Stat__Container">
          <div class="Stat__Title">Impressions</div>
          <div class="Stat__Content">62,156</div>
        </div>
      </div>
      <div class="Stat__Card_3 Stat__Card">
        <div class="Stat__Container">
          <div class="Stat__Title">CTR</div>
          <div class="Stat__Content">3.9%</div>
        </div>
      </div>
      <div class="Stat__Card_4 Stat__Card">
        <div class="Stat__Container">
          <div class="Stat__Title">Clicks</div>
          <div class="Stat__Content">2,398</div>
        </div>
      </div>
      <div class="Stat__Card_5 Stat__Card">
        <div class="Stat__Container">
          <div class="Stat__Title">Impressions</div>
          <div class="Stat__Content">62,156</div>
        </div>
      </div>
      <div class="Stat__Card_6 Stat__Card">
        <div class="Stat__Container">
          <div class="Stat__Title">CTR</div>
          <div class="Stat__Content">3.9%</div>
        </div>
      </div>
    </div>
  </Card>
);

export default Dashboard;
