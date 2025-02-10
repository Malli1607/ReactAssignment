import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import { useEffect, useState } from "react";
import './piechart.css';

import Axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PieCharts = () => {
  const [chartData, setChartData] = useState<any>([]);

  const people:any[] = useSelector((state : RootState) => state.person.people);

  
  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:3500/api/gender-count');
      console.log("Fetched data:", response.data);
      setChartData(response.data);   
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();  
     
    
  }, [people]);  


  useEffect(() => {
    if (chartData.length === 0) return;   

    const root = am5.Root.new("chartspan");

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",   
        categoryField: "category",   
        endAngle: 270,
      })
    );

 
    series.data.setAll(chartData);

 
    series.labels.template.set("text", "{category}");

  
    series.appear(1000, 100);

    console.log("chartData being passed to chart:", chartData);

     
    return () => {
      root.dispose();
    };
  }, [chartData]);   

  return (
    <div className="chart">
      <div id="chartspan" style={{ width: "100%", height: "200px" }}></div>
    </div>
  );
};

export default PieCharts;
